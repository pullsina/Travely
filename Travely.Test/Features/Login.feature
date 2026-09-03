Feature: Login

Scenario: Successful login
    Given I am on the login page
    When I fill in email "test@login.com" and password "Test123!"
    And I click the login button
    Then I should be redirected to the continents page

Scenario: Failed login with incorrect password
    Given I am on the login page
    When I fill in email "test@login.com" and password "Test1!"
    And I click the login button
    Then I should get an error message
    And I should remain on the login page

Scenario: Failed login with incorrect email
    Given I am on the login page
    When I fill in email "wrong@test.com" and password "Test123!"
    And I click the login button
    Then I should get a login error message
    And I should remain on the login page

Scenario: Failed login with empty fields
    Given I am on the login page
    When I leave email and password empty
    And I click the login button
    Then I should get an error message
    And I should remain on the login page

Scenario: Failed login with empty email
    Given I am on the login page
    When I leave email empty and fill in password "Test123!"
    And I click the login button
    Then I should get an error message
    And I should remain on the login page

Scenario: Failed login with empty password
    Given I am on the login page
    When I fill in email "test@login.com" and leave password empty
    And I click the login button
    Then I should get an error message
    And I should remain on the login page