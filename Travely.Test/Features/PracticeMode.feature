Feature: Practice mode

Scenario: Practice mode capital to country
    Given I am logged in
	And I am on the practice page for "Europe"
    When I click the capitals button
    Then the switch mode is capital to country
	And I should get presented with a capital and 8 country options
	When I select the correct answer option
	Then I should get a correct answer message

Scenario: Failed practice mode capital to country
    Given I am logged in
	And I am on the practice page for "Europe"
    When I click the capitals button
    Then the switch mode is capital to country
	And I should get presented with a capital and 8 country options
	When I select the wrong answer option
	Then I should get a wrong answer error message

Scenario: Practice mode country to flag
    Given I am logged in
	And I am on the practice page for "Europe"
    When I click the flags button
	And I click the country to flag button
    Then the switch mode is country to flag
	And I should get presented with a country and 8 flag options
	When I select the correct answer option
	Then I should get a correct answer message

Scenario: Practice mode flag to country
    Given I am logged in
    And I am on the practice page for "Europe"
    When I click the flags button
    And I click the flag to country button
    Then the switch mode is flag to country
    And I should get presented with a flag and 8 country options
    When I select the correct answer option
    Then I should get a correct answer message

Scenario: Practice mode don't know
    Given I am logged in
    And I am on the practice page for "Europe"
    When I click the capitals button
    Then the switch mode is capital to country
    And I should get presented with a capital and 8 country options
    When I click the don't know button
    Then I should get the correct answer

Scenario: Practice mode next question
    Given I am logged in
    And I am on the practice page for "Europe"
    When I click the capitals button
    Then the switch mode is capital to country
    And I should get presented with a capital and 8 country options
    When I select the correct answer option
    Then I should get a correct answer message
    When I click the next question button
    Then I should get presented with a capital and 8 country options