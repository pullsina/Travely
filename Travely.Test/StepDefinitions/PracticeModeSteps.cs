using Microsoft.Playwright;
using Reqnroll;
using System;
using System.Collections.Generic;
using System.Text;
using Travely.Tests.Hooks;
using static System.Net.Mime.MediaTypeNames;

namespace Travely.Tests.StepDefinitions
{
    //binding to connect the steps to the feature files
    [Binding]
    public class PracticeModeSteps
    {
        private readonly Hooks.Hooks _hooks;

        //constructor
        public PracticeModeSteps(Hooks.Hooks hooks)
        {
            _hooks = hooks;
        }

        //match the steps in the feauture file, word by word to the methods
        [Given("I am on the practice page for {string}")]
        public async Task GivenIAmOnThePracticePageForContinent(string continent)
        {
            //open page via hooks
            await _hooks.Page.GotoAsync($"http://localhost:5173/practice/{continent}");
        }

        [When("I click the capitals button")]
        public async Task WhenIClickTheCapitalsButton()
        {
            //find the button named "Capitals" and click it
            await _hooks.Page.GetByRole(AriaRole.Button, new()
            {
                Name = "Capitals"
            }).ClickAsync();
        }

        [Then("the switch mode is capital to country")]
        public async Task ThenTheSwitchModeIsCapitalToCountry()
        {
            //find the capitals group
            var capitalsGroup = _hooks.Page.GetByRole(AriaRole.Group, new()
            {
                Name = "Choose capitals practice direction"
            });

            //find the "Capital" button inside the group
            var capitalButton = capitalsGroup.GetByRole(AriaRole.Button, new()
            {
                Name = "Switch between capital questions"
            });

            //check if the "Capital" button (chosen practice mode) is pressed (aria-pressed = true)
            await Assertions.Expect(capitalButton)
                .ToHaveAttributeAsync("aria-pressed", "true");
        }

        [Then("I should get presented with a capital and {int} country options")]
        public async Task ThenIShouldGetPresentedWithACapitalAndCountryOptions(int numberOfOptions)
        {
            //check if the question is visible
            var question = _hooks.Page.Locator(".practice-question__text-question");

            await Assertions.Expect(question).ToBeVisibleAsync();

            var answers = _hooks.Page.Locator(".practice-question__answer");

            //make sure the number of options is equal to the number of country options written in .feature file
            await Assertions.Expect(answers).ToHaveCountAsync(numberOfOptions);
        }

        [When("I select the correct answer option")]
        public async Task WhenISelectTheCorrectAnswerOption()
        {
            //get the correct answer id from the sessionStorage set in the frontend
            var correctAnswerId = await _hooks.Page.EvaluateAsync<string>(
            //""" = allows us to write multi-line strings. This code is javascript, and we want to access the sessionStorage and get the correct answer id from frontend so we use EvaluateAsync to run javascript code in the browser context and return the correct answer id to the test

                """
        () => {
            // Get the current continent from the URL
            const continent = decodeURIComponent(
                window.location.pathname.split("/").pop()
            );

            // Get the current practice direction
            const direction = sessionStorage.getItem(
                `travely-practice-direction-${continent}`
            );

            // Get the saved practice question
            const savedState = sessionStorage.getItem(
                `travely-practice-${continent}-${direction}`
            );

            if (!savedState) {
                throw new Error("No practice question found in sessionStorage.");
            }

            const state = JSON.parse(savedState);

            if (!state?.question) {
                throw new Error("No question found in sessionStorage.");
            }

            return String(state.question.correctAnswerId);
        }
        """
            );

            await _hooks.Page
                .Locator($"[data-answer-id='{correctAnswerId}']")
                .ClickAsync();
        }

        [Then("I should get a correct answer message")]
        public async Task ThenIShouldGetACorrectAnswerMessage()
        {
            var correctAnswer = _hooks.Page
                .Locator(".practice-question__answer[data-correct='true']");

            await Assertions.Expect(correctAnswer).ToBeVisibleAsync();
        }

        [When("I select the wrong answer option")]
        public async Task WhenISelectTheWrongAnswerOption()
        {
            var correctAnswerId = await _hooks.Page.EvaluateAsync<string>(
            """
            () => {
                const savedState = sessionStorage.getItem("travely-practice-Europe-CapitalToCountry");
                const state = JSON.parse(savedState);
                return state.question.correctAnswerId;
            }
            """
            );

            var wrongAnswer = _hooks.Page
            .Locator($".practice-question__answer[data-answer-id]:not([data-answer-id='{correctAnswerId}'])")
            .First;

            await wrongAnswer.ClickAsync();
        }

        [Then("I should get a wrong answer error message")]
        public async Task ThenIShouldGetAWrongAnswerErrorMessage()
        {
            var incorrectAnswer = _hooks.Page
            .Locator(".practice-question__answer[data-incorrect='true']");

            await Assertions.Expect(incorrectAnswer).ToBeVisibleAsync();
        }

        [When("I click the flags button")]
        public async Task WhenIClickTheFlagsButton()
        {
            //find the button named "Flags" and click it
            await _hooks.Page.GetByRole(AriaRole.Button, new()
            {
                Name = "Flags"
            }).ClickAsync();
        }

        [When("I click the country to flag button")]
        public async Task WhenIClickTheCountryToFlagButton()
        {
            //find the flags group
            var flagsGroup = _hooks.Page.GetByRole(AriaRole.Group, new()
            {
                Name = "Choose flags practice direction"
            });

            //find the "Country" button inside the group
            var countryButton = flagsGroup.GetByRole(AriaRole.Button, new()
            {
                Name = "Switch between country questions"
            });

            await countryButton.ClickAsync();
        }

        [Then("the switch mode is country to flag")]
        public async Task ThenTheSwitchModeIsCountryToFlag()
        {
            //find the flags direction group
            var flagsGroup = _hooks.Page.GetByRole(AriaRole.Group, new()
            {
                Name = "Choose flags practice direction"
            });

            //find the Country button inside the flags group
            var countryToFlagButton = flagsGroup.GetByRole(AriaRole.Button, new()
            {
                Name = "Switch between country questions"
            });

            //check that the Country button is pressed
            await Assertions.Expect(countryToFlagButton)
                .ToHaveAttributeAsync("aria-pressed", "true");
        }

        [Then("I should get presented with a country and {int} flag options")]
        public async Task ThenIShouldGetPresentedWithACountryAndFlagOptions(int numberOfOptions)
        {
            //check if the question is visible
            var question = _hooks.Page.Locator(".practice-question__text-question");

            await Assertions.Expect(question).ToBeVisibleAsync();

            //make sure the number of options is equal to the number of flags options written in .feature file
            var answers = _hooks.Page.Locator(".practice-question__answer");

            await Assertions.Expect(answers).ToHaveCountAsync(numberOfOptions);

            //make sure the number of images is equal to the number of flags options written in .feature file
            var answerImages = answers.Locator("img");

            await Assertions.Expect(answerImages).ToHaveCountAsync(numberOfOptions);
        }

        [When("I click the flag to country button")]
        public async Task WhenIClickTheFlagToCountryButton()
        {
            var flagsGroup = _hooks.Page.GetByRole(AriaRole.Group, new()
            {
                Name = "Choose flags practice direction"
            });

            var flagToCountryButton = flagsGroup.GetByRole(AriaRole.Button, new()
            {
                Name = "Switch between flag questions"
            });

            await flagToCountryButton.ClickAsync();
        }

        [Then("the switch mode is flag to country")]
        public async Task ThenTheSwitchModeIsFlagToCountry()
        {
            //find the flags direction group
            var flagsGroup = _hooks.Page.GetByRole(AriaRole.Group, new()
            {
                Name = "Choose flags practice direction"
            });

            //find the Flag button inside the flags group
            var flagToCountryButton = flagsGroup.GetByRole(AriaRole.Button, new()
            {
                Name = "Switch between flag questions"
            });

            //check that the Flag button is pressed
            await Assertions.Expect(flagToCountryButton)
                .ToHaveAttributeAsync("aria-pressed", "true");
        }

        [Then("I should get presented with a flag and {int} country options")]
        public async Task ThenIShouldGetPresentedWithAFlagAndCountryOptions(int numberOfOptions)
        {
            //check if the flag is visible
            var question = _hooks.Page.Locator(".practice-question__flag");

            await Assertions.Expect(question).ToBeVisibleAsync();

            //make sure the number of options is equal to the number of flags options written in .feature file
            var answers = _hooks.Page.Locator(".practice-question__answer");

            await Assertions.Expect(answers).ToHaveCountAsync(numberOfOptions);

            //make sure the answer options are not flag images and not empty (they should be country names)
            for (var i = 0; i < numberOfOptions; i++)
            {
                await Assertions.Expect(answers.Nth(i)).Not.ToBeEmptyAsync();
            }
        }

        [When("I click the don't know button")]
        public async Task WhenIClickTheDontKnowButton()
        {
            await _hooks.Page.GetByRole(AriaRole.Button, new()
            {
                Name = "Don't know"
            }).ClickAsync();
        }

        [Then("I should get the correct answer")]
        public async Task ThenIShouldGetTheCorrectAnswer()
        {
            var correctAnswer = _hooks.Page
                .Locator(".practice-question__answer[data-correct='true']");

            await Assertions.Expect(correctAnswer).ToBeVisibleAsync();
        }

        [When("I click the next question button")]
        public async Task WhenIClickTheNextQuestionButton()
        {
            await _hooks.Page.GetByRole(AriaRole.Button, new()
            {
                Name = "Next question →"
            }).ClickAsync();
        }


    }
}
