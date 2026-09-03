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