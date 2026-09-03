Feature: Register

Scenario: Successful register
    Given I am on the register page
    When I fill in username "testRegister", email "test@register.com", password "Test123!" and confirm password "Test123!"
    And I click the register button
    Then I should get logged in
    And I should be redirected to the continents page

    #using seeded user testUser (already in database, should not be able to register with this username)
Scenario: Register with existing username but new email
    Given I am on the register page
    When I fill in username "testUser", email "test@email.com", password "Test123!" and confirm password "Test123!"
    And I click the register button
    Then I should get a register error message
    And I should remain on the register page

    #using seeded email test@user.com (already in database, should not be able to register with this email)
Scenario: Register with new username but existing email
    Given I am on the register page
    When I fill in username "test", email "test@user.com", password "Test123!" and confirm password "Test123!"
    And I click the register button
    Then I should get a register error message
    And I should remain on the register page

Scenario: Register with non-matching passwords
    Given I am on the register page
    When I fill in username "newUser", email "new@email.com", password "Test123!" and confirm password "test"
    And I click the register button in frontend
    Then I should get a register error message
    And I should remain on the register page

Scenario: Register with invalid email
    Given I am on the register page
    When I fill in username "newUser", email "email", password "Test123!" and confirm password "Test123!"
    And I click the register button in frontend
    Then I should get a register error message
    And I should remain on the register page

Scenario: Register with too short password
    Given I am on the register page
    When I fill in username "newUser", email "new@email.com", password "Test1" and confirm password "Test1"
    And I click the register button in frontend
    Then I should get a register error message
    And I should remain on the register page