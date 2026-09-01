using Microsoft.Playwright;
using Reqnroll;
using Travely.Tests.Hooks;

namespace Travely.Tests.StepDefinitions;

//binding to connect the steps to the feature files
[Binding]
public class LoginSteps
{
    private readonly Hooks.Hooks _hooks;

    //konstructor
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
}