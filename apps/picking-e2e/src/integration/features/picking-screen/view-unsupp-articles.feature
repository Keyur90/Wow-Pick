Feature: View unsupplied articles toggle
   As A personal Shopper I should be able to toggle between all and unsupplied articles

Background:
   Given I successfully login to RF application

Scenario: Verify the picking screen in view all articles mode
   Given I have trip with first tote item of type <eachOrKg> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   Then I verify that the text All is present in the header
   And I verify that all articles are displayed in picking screen

Scenario: Verify View unsupplied articles is visible in view all articles mode
   Given I have trip with first tote item of type <eachOrKg> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on More Options button
   Then I verify View unsupplied articles is visible

Scenario: Verify unsupplied/partially supplied articles are visible after clicking on View unsupplied articles
   Given I have trip with first tote item of type <eachOrKg> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on More Options button
   And I click on View unsupplied articles
   Then I verify that the text All is not present in the header
   And I verify all unsupplied or partially supplied articles are displayed in picking screen

Scenario: Verify View all articles is visible in view unsupplied articles mode
   Given I have trip with first tote item of type <eachOrKg> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on More Options button
   And I click on View unsupplied articles
   And I click on More Options button
   Then I verify View all articles is visible
