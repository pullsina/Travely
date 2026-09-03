using Microsoft.Playwright;
using Reqnroll;

namespace Travely.Tests.Hooks;

//hooks to set up and clean up the browser and page for the tests

//binding to connect hooks to the feature files
[Binding]
public class Hooks
{
    private IPlaywright _playwright = null!;
    private IBrowser _browser = null!;

    //the page playwright uses to do the tests
    public IPage Page { get; private set; } = null!;

    //keeps track of whether the test created a new user
    public bool DeleteRegisteredUser { get; set; }

    //SETUP - runs before each scenario to set up and prepare the browser and page for the tests
    [BeforeScenario]
    public async Task BeforeScenario()
    {
        _playwright = await Playwright.CreateAsync();

        _browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            //headless false for us to see the frontend during tests
            Headless = false
        });

        Page = await _browser.NewPageAsync();
    }

    //CLEANUP - runs after the tests to clean up and close the browser and page
    [AfterScenario]
    public async Task AfterScenario()
    {
        //delete the user only if the test created one (if DeleteRegisteredUser is true)
        if (DeleteRegisteredUser)
        {
            var response = await Page.Context.APIRequest.DeleteAsync(
                "https://localhost:7009/api/auth/delete",
                new()
                {
                    IgnoreHTTPSErrors = true
                });

            //if the response status is not 200, the test user could not be deleted after the test
            Assert.That(response.Status, Is.EqualTo(200),
                "The test user could not be deleted after the scenario.");
        }

        await _browser.CloseAsync();
        _playwright.Dispose();
    }
}