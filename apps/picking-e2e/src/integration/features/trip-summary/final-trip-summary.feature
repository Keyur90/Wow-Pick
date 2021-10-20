Feature: Final Trip Summary Page

Background:
   Given I successfully login to RF application

Scenario: Verify the Unsupplied items popup when user clicks on Pack this trolley
   Given I have a trip with 2 tote items
   When I get this trip
   And I click on Start Trip button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Wont Scan button
   And I enter 10000 as supplied quantity for a KG article
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click No button
   Then I should be see the pre-final trip summary page

Scenario: Verify the final trip summary page when some items are unsupplied but none of the totes are empty
   Given I have a trip with 2 tote items
   When I get this trip
   And I click on Start Trip button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Wont Scan button
   And I enter 10000 as supplied quantity for a KG article
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see goal time
   And I should see pick time
   And I should see Continue button


Scenario: Verify the final trip summary page when some items are unsupplied with 1 tote empty
   Given I have a trip with 2 tote items
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 10000 as supplied quantity for a KG article
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following label text with tote Tote 1 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button

Scenario: Verify the final trip summary page with 1 tote empty and an item partially supplied in another tote
   Given I have a trip with 3 tote items
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following label text with tote Tote 1 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button

Scenario: Verify the final trip summary page when some items are unsupplied with multiple totes empty
   Given I have a trip with 2 tote items
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Close button
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following labels text with tote Tote 1; Tote 2 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button

Scenario: Verify the final trip summary page when tote with only collectibles is empty
   Given I have a trip with 3 tote items with collectible in separate tote
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following labels text with tote Tote 1; Tote 3 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button

Scenario: Verify the final trip summary page when tote with only collectibles is not empty
   Given I have a trip with 3 tote items with collectible in separate tote
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on OK button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following label text with tote Tote 1 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button

Scenario: Verify the final trip summary page when tote with only free sample is empty
   Given I have a trip with 3 tote items with free sample in separate tote
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following labels text with tote Tote 1; Tote 3 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button

Scenario: Verify the final trip summary page when tote with only free sample is not empty
   Given I have a trip with 3 tote items with free sample in separate tote
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on Yes button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following label text with tote Tote 1 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button 

Scenario: Verify the final trip summary page when some items are unsupplied, no totes are empty with no collectibles and free samples
   Given I have a trip with 2 tote items and no collectibles and free samples
   When I get this trip
   And I click on Start Trip button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Wont Scan button
   And I enter 10000 as supplied quantity for a KG article
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see goal time
   And I should see pick time
   And I should see Continue button 

Scenario: Verify the final trip summary page when the trip has only collectible items
   Given I have a trip with only collectible item
   When I get this trip
   And I click on Start Trip button
   And I click on Close button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following label text with tote Tote 3 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button 

Scenario: Verify the final trip summary page when the trip has only free sample items
   Given I have a trip with only free sample item
   When I get this trip
   And I click on Start Trip button
   And I click on No button
   And I click on Pack This Trolley button
   Then I should see the Unsupplied items popup
   And I verify the message on the Unsupplied items popup
   And I should see Yes and No buttons on the Unsupplied items popup
   When I click Yes button
   Then I should see "Trip Summary" in the page header
   And I should see the message Remove the following label text with tote Tote 3 to be removed
   And I should see goal time
   And I should see pick time
   And I should see Continue button 

Scenario: Verify the final trip summary page when all items are supplied
   Given I have trip with 1 collectible and 1 free sample
   When I get this trip
   And I click on Start Trip button
   And I supply all items in the trip
   And I click on OK button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Yes button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Pack This Trolley button
   Then I should see "Trip Summary" in the page header
   And I should see goal time
   And I should see pick time
   And I should see Continue button
