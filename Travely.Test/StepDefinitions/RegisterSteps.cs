using Microsoft.Playwright;
using Reqnroll;
using Travely.Tests.Hooks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Travely.Tests.StepDefinitions;

//binding to connect the steps to the feature files
[Binding]
public class RegisterSteps
{
    private readonly Hooks.Hooks _hooks;

    //constructor
    public RegisterSteps(Hooks.Hooks hooks)
    {
        _hooks = hooks;
    }

    //match the steps in the feauture file, word by word to the methods
    [Given("I am on the register page")]
    public async Task GivenIAmOnTheRegisterPage()
    {
        //open page via hooks
        await _hooks.Page.GotoAsync("http://localhost:5173/register");
    }

    [When("I fill in username {string}, email {string}, password {string} and confirm password {string}")]
    public async Task WhenIFillInUsernameEmailPasswordAndConfirmPasswordTest(string username, string email, string password, string confirmPassword)
    {
        //playwright searches for labels "Username", "Email", "Password", "Confirm Password" in frontend and fills with the values from the feature file
        await _hooks.Page.GetByLabel("Username", new()
        {
            //exact = true to make sure the label is the exact same as "Username"
            Exact = true
        }).FillAsync(username);

        await _hooks.Page.GetByLabel("Email", new()
        {
            Exact = true
        }).FillAsync(email);

        await _hooks.Page.GetByLabel("Password", new()
        {
            Exact = true
        }).FillAsync(password);

        await _hooks.Page.GetByLabel("Confirm password", new()
        {
            //exact = true to make sure the label is the exact same as "Confirm password"
            //prevents playwright from thinking Password and Confirm password is the element just because they both contain password (not case sensitive), now the element needs to be exactly "Confirm password"
            Exact = true
        }).FillAsync(confirmPassword);
    }

    [When("I click the register button")]
    public async Task WhenIClickTheRegisterButton()
    {
        //wait for the registration API response
        var responseTask = _hooks.Page.WaitForResponseAsync(
            response => response.Url.Contains("/api/auth/register")
        );

        //find the Register button and click it
        await _hooks.Page.GetByRole(AriaRole.Button, new()
        {
            Name = "Register"
        }).ClickAsync();

        var response = await responseTask;

        //delete the user only if registration actually succeeded
        if (response.Status == 200)
        {
            //this test created a user, the variable is used in the AfterScenario hook to delete the user after the test
            _hooks.DeleteRegisteredUser = true;
        }
    }

    [Then("I should get logged in")]
    public async Task ThenIShouldGetLoggedIn()
    {
        //get all cookies stored in the browser context after registration
        var cookies = await _hooks.Page.Context.CookiesAsync();

        //check that the ASP.NET Core Identity authentication cookie exists
        var authCookie = cookies.FirstOrDefault(
            cookie => cookie.Name == ".AspNetCore.Identity.Application");

        Assert.That(authCookie, Is.Not.Null,
            "Authentication cookie was not found after registration.");

        //call /me endpoint using the same browser context as the page where the registration took place
        var response = await _hooks.Page.Context.APIRequest.GetAsync(
            "https://localhost:7009/api/auth/me",
            new()
            {
                IgnoreHTTPSErrors = true
            });

        //make sure response is 200 since /me endpoint requires authentication (200 means logged in)
        Assert.That(response.Status, Is.EqualTo(200));
    }

    [Then("I should get a register error message")]
    public async Task ThenIShouldGetARegisterErrorMessage()
    {
        var errorMessage = _hooks.Page.Locator(
            ".register-page__message--error"
        );

        await Assertions.Expect(errorMessage).ToBeVisibleAsync();
    }

    [Then("I should remain on the register page")]
    public async Task ThenIShouldRemainOnTheRegisterPage()
    {
        //make sure the url is /register, if not the test fails
        Assert.That(_hooks.Page.Url, Does.Contain("/register"));
    }


}