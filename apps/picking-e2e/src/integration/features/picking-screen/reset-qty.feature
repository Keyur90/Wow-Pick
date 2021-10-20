Feature: Reset supplied quantity
   As A personal Shopper I should be able to reset supplied quantity for an article

Background:
   Given I successfully login to RF application

Scenario: Verify Reset current supplied is visible and disabled for an unsupplied article
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on More Options button
   Then I verify that Reset current supplied is visible and disabled

Scenario: Verify Reset current supplied is visible and enabled for a partially supplied article
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on More Options button
   Then I verify that Reset current supplied is visible and enabled

Scenario: Verify Reset current supplied is visible and enabled for a fully supplied article
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on More Options button
   Then I verify that Reset current supplied is visible and enabled

Scenario: Verify the warning message on clicking Reset current supplied
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Back button
   And I click on More Options button
   And I click on Reset current supplied
   Then I verify the warning message displayed on clicking Reset current supplied
   |  Header                  |  Message                                                              |
   |  Reset Current Supplied  |  Are you sure you want to reset the supplied quantity back to zero?   |

Scenario: Verify that clicking on Cancel button closes the 'Reset current supplied' warning message
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Back button
   And I click on More Options button
   And I click on Reset current supplied
   And I click on Cancel button
   Then I verify that supplied quantity is unchanged

Scenario: Verify that personal shopper is able to reset the supplied quanity to zero when fully supplied
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Back button
   And I click on More Options button
   And I click on Reset current supplied
   And I click on Confirm button
   Then I verify that supplied quantity is reset to zero
   When I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Back button
   Then I verify that supplied quantity is 1

Scenario: Verify that personal shopper is able to navigate to previously supplied article and reset the quantity
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Back button
   And I click on More Options button
   And I click on Reset current supplied
   And I click on Confirm button
   Then I verify that supplied quantity is reset to zero
   When I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   Then I verify that supplied quantity is 1

Scenario: Verify that personal shopper is able to navigate to upcoming supplied article and reset the quantity previously supplied quantity
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as supplied quantity for a KG article
   And I click on Confirm button
   And I click on More Options button
   And I click on Reset current supplied
   And I click on Confirm button
   Then I verify that supplied quantity is reset to zero
   When I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   Then I verify that supplied quantity is 1

Scenario: Verify that supplied quantity is reset only for the current article which was previously supplied
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Wont Scan button
   And I enter 1000 as supplied quantity for a KG article
   And I click on Confirm button
   And I click on More Options button
   And I click on Reset current supplied
   And I click on Confirm button
   Then I verify that supplied quantity is reset to zero
   When I click on Back button
   Then I verify that supplied quantity is unchanged
