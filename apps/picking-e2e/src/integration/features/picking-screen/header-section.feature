Feature: Header seaction of Picking screen
   As A personal Shopper I should be able to view header section contents

Background:
   Given I successfully login to RF application

Scenario Outline: Verify the location of article and text left in trip on header section
   Given I have trip with first tote item with article location <aisle> <bay> <shelf>
   When I get this trip
   And I click on Start Trip button
   Then I verify the article location <aisle> <bay> <shelf> is displayed
   And I verify the navigation, pick progress with text left in trip

   Examples:
   | aisle | bay | shelf |
   |  52   |  22 |  10   |



