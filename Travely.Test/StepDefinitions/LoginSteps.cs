using Microsoft.Playwright;
using Reqnroll;
using Travely.Tests.Hooks;

namespace Travely.Tests.StepDefinitions;

//binding to connect the steps to the feature files
[Binding]
public class LoginSteps
{
    private readonly Hooks.Hooks _hooks;

    //constructor
    public LoginSteps(Hooks.Hooks hooks)
    {
        _hooks = hooks;
    }

    //match the steps in the feauture file, word by word to the methods
    [Given("I am on the login page")]
    public async Task GivenIAmOnTheLoginPage()
    {
        //open page via hooks
        await _hooks.Page.GotoAsync("http://localhost:5173/login");
    }

    //match the steps in the feauture file, {string} means Reqnroll uses the values from the feature file as parameters (no hardcoded values)
    [When("I fill in email {string} and password {string}")]
    public async Task WhenIFillInEmailAndPassword(string email, string password)
    {
        //playwright searches for label "Email" in frontend and fills with the value from the feature file
        await _hooks.Page.GetByLabel("Email").FillAsync(email);
        await _hooks.Page.GetByLabel("Password").FillAsync(password);
    }

    [When("I click the login button")]
    public async Task WhenIClickTheLoginButton()
    {
        //find the button named "Login" and click it
        await _hooks.Page.GetByRole(AriaRole.Button, new()
        {
            Name = "Log in"
        }).ClickAsync();
    }

    [Then("I should be redirected to the continents page")]
    public async Task ThenIShouldBeRedirectedToTheContinentsPage()
    {
        //** = the url can contain whatever before /continents, avoids hardcoding the url in case it changes
        await _hooks.Page.WaitForURLAsync("**/continents");

        Assert.That(_hooks.Page.Url, Does.Contain("/continents"));
    }

    [Then("I should get an error message")]
    public async Task ThenIShouldGetAnErrorMessage()
    {
        //playwright finds the element with the matching class name 
        var errorMessage = _hooks.Page.Locator(".login-page__message--error");

        //waits for the element to be visible in frontend (if visible = error (great for this test, login failed as expected and the test passes), if not visible = no error in frontend, login succeeded and this test fails)
        await Assertions.Expect(errorMessage).ToBeVisibleAsync();

    }

    [When("I leave email and password empty")]
    public async Task WhenILeaveEmailAndPasswordEmpty()
    {
        //playwright searches for label "Email" in frontend but does not fill with any values
        await _hooks.Page.GetByLabel("Email").FillAsync("");
        await _hooks.Page.GetByLabel("Password").FillAsync("");
    }

    [Then("I should remain on the login page")]
    public async Task ThenIShouldRemainOnTheLoginPage()
    {
        //make sure the page is /login, if not the test fails
        Assert.That(_hooks.Page.Url, Does.Contain("/login"));
    }

    [When("I leave email empty and fill in password {string}")]
    public async Task WhenILeaveEmailEmptyAndFillInPassword(string password)
    {
        //playwright searches for label "Email" in frontend but does not fill with any values
        await _hooks.Page.GetByLabel("Email").FillAsync("");
        //playwright searches for label "Password" in frontend and fills with correct value
        await _hooks.Page.GetByLabel("Password").FillAsync(password);
    }

    [When("I fill in email {string} and leave password empty")]
    public async Task WhenIFillInEmailAndLeavePasswordEmpty(string email)
    {
        //playwright searches for label "Email" in frontend and fills with correct value
        await _hooks.Page.GetByLabel("Email").FillAsync(email);
        //playwright searches for label "Password" in frontend but does not fill with a value
        await _hooks.Page.GetByLabel("Password").FillAsync("");
    }

}