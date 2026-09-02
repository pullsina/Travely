Feature: Register

Scenario: Successful register
    Given I am on the register page
    When I fill in username "test9", email "test9@test.com", password "Test123!" and confirm password "Test123!"
    And I click the register button
    Then I should get logged in
    And I should be redirected to the continents page