Feature: Login

Scenario: Successful login
    Given I am on the login page
    When I fill in email "test3@" and password "Test123!"
    And I click the login button
    Then I should be redirected to the continents page

Scenario: Failed login with incorrect password
    Given I am on the login page
    When I fill in email "test3@" and password "Test1!"
    And I click the login button
    Then I should get an error message

Scenario: Failed login with empty fields
    Given I am on the login page
    When I leave email and password empty
    And I click the login button
    Then I should get an error message