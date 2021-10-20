@SmokeTests
Feature: Trip Summary Page Content

Background: 
   Given I successfully login to RF application

Scenario: Trip summary for bulk trip
   Given I have bulk trip with 4 totes, 5 articles and 4 labels
   When I get this trip
   Then I should see "Trip Summary" in the page header
   And I should see "Bulk Trolley Trip" title
   And I should see totes, articles and labels count to be 4, 5, 4
   And I should see goal time is 5 minutes

Scenario: Trip summary for express trip
   Given I have express trip with 5 articles
   When I get this trip
   Then I should see "Trip Summary" in the page header
   And I should see "No tote labels needed" title
   And I should see articles count to be 5
   And I should see bag type to be 'No Bags' and displayed in red color
   And I should see goal time is 5 minutes