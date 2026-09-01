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
        await _browser.CloseAsync();
        _playwright.Dispose();
    }
}