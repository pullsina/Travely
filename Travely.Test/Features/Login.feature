Feature: Login

Scenario: Successful login
    Given I am on the login page
    When I fill in email "test3@" and password "Test123!"
    And I click the login button
    Then I should be redirected to the continents page