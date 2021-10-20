Feature: Final Trip Summary Page

Background: 
   Given I successfully login to RF application

Scenario: Verify pre-summary screen - collectibles only - partial/unsupplied
   Given I have a trip with only 2 collectibles and 0 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on Close button
   And I supply 1 quantity of collectible item
   And I click on OK button
   And I scan the barcode 140031688002 to place item into the tote
   Then I verify pre-summary page is displayed
   And I verify the 2 Lines incomplete and 0 substituted in pre-summary page
   And I verify Return to current line button is disabled
   And I verify Pack this trolley button is enabled

Scenario: Verify pre-summary screen - free samples only - partial/unsupplied
   Given I have a trip with only 0 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on No button
   And I click on Yes button
   And I scan the barcode 140031688002 to place item into the tote
   Then I verify pre-summary page is displayed
   And I verify the 0 Lines incomplete and 0 substituted in pre-summary page
   And I verify Return to current line button is disabled
   And I verify Pack this trolley button is enabled

Scenario: Verify pre-summary screen - collectibles and free samples only - partial/unsupplied
   Given I have a trip with only 2 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on Close button
   And I click on OK button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on No button
   And I click on Yes button
   And I scan the barcode 140031688002 to place item into the tote
   Then I verify pre-summary page is displayed
   And I verify the 1 Lines incomplete and 0 substituted in pre-summary page
   And I verify Return to current line button is disabled
   And I verify Pack this trolley button is enabled

Scenario: Verify pre-summary screen - tote items only - partial/unsupplied
   Given I have a trip with 3 tote items and no collectibles and free samples
   When I get this trip
   And I click on Start Trip button
   And I click on Wont Scan button
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   Then I verify pre-summary page is displayed
   And I verify the 2 Lines incomplete and 0 substituted in pre-summary page
   And I verify Return to current line button is enabled
   And I verify Pack this trolley button is enabled

Scenario: Verify pre-summary screen - tote items with only collectibles - partial/unsupplied
   Given I have a trip with 3 tote items with 2 collectibles and 0 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on Wont Scan button
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote 
   And I click on Close button
   And I supply 1 quantity of collectible item
   And I click on OK button
   And I scan the barcode 140031688003 to place item into the tote
   Then I verify pre-summary page is displayed
   And I verify the 4 Lines incomplete and 0 substituted in pre-summary page
   And I verify Return to current line button is enabled
   And I verify Pack this trolley button is enabled

Scenario: Verify pre-summary screen - tote items with only free samples - partial/unsupplied
   Given I have a trip with 3 tote items with 0 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on Wont Scan button
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote 
   And I click on No button
   And I click on Yes button
   And I scan the barcode 140031688003 to place item into the tote
   Then I verify pre-summary page is displayed
   And I verify the 2 Lines incomplete and 0 substituted in pre-summary page
   And I verify Return to current line button is enabled
   And I verify Pack this trolley button is enabled

Scenario: Verify pre-summary screen - tote items with collectibles and free samples - partial/unsupplied
   Given I have a trip with 3 tote items with 2 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on Wont Scan button
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote 
   And I click on Close button
   And I supply 1 quantity of collectible item
   And I click on OK button
   And I scan the barcode 140031688003 to place item into the tote
   And I click on No button
   And I click on Yes button
   And I scan the barcode 140031688003 to place item into the tote
   Then I verify pre-summary page is displayed
   And I verify the 4 Lines incomplete and 0 substituted in pre-summary page
   And I verify Return to current line button is enabled
   And I verify Pack this trolley button is enabled
