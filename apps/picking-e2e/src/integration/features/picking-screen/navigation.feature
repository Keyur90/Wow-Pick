Feature: Navigate through tote items, collectibles and free samples for new trip, restart trip and return to current line
   As A personal Shopper I should be able to navigate between the articles

Background:
   Given I successfully login to RF application

Scenario: For a new trolley trip, personal shopper must be able to navigate between articles
   Given I have a trip with 3 tote items with 2 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   Then I should be navigated to the next article in the trip with header displaying 3/3 left in trip
   When I click on FWD button
   Then I should be navigated to the next article in the trip with header displaying 2/3 left in trip
   When I click on Back button
   Then I should be navigated to the next article in the trip with header displaying 3/3 left in trip
   When I click on FWD button
   And I click on FWD button
   And I click on FWD button
   Then I should be navigated to Collectibles screen
   When I click on Close button
   Then I should be navigated to Collectibles screen
   When I click on OK button
   And I scan the barcode 140031688003 to place item into the tote
   Then I should be navigated to Free Samples screen
   When I click on No button
   Then I should be navigated to Free Samples screen
   When I click on Yes button
   And I scan the barcode 140031688003 to place item into the tote
   Then I verify pre-summary page is displayed

Scenario: For a new trolley trip, personal shopper is navigated to last normal article after clicking Return on current line in View all articles mode
   Given I have a trip with 3 tote items with 2 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on Close button
   And I click on No button
   And I click on No button
   And I click on Return to current line button
   Then I should be navigated to the last article in the trip with header displaying 1/3 left in trip
   And I verify that the text All is present in the header
   When I click on Back button
   Then I should be navigated to the previous article in the trip with header displaying 2/3 left in trip
   When I click on FWD button
   And I click on FWD button
   Then I verify pre-summary page is displayed

Scenario: For a new trolley trip, personal shopper is navigated to last unsupplied article after clicking Return on current line in View unsupplied articles mode
   Given I have a trip with 3 tote items with 2 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Wont Scan button
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Close button
   And I click on Close button
   And I click on No button
   And I click on No button
   And I click on Return to current line button
   Then I should be navigated to the last article in the trip with header displaying 1/3 left in trip
   And I verify that the text All is present in the header
   When I click on More Options button
   And I click on View unsupplied articles
   Then I verify that the text All is not present in the header
   When I click on FWD button
   Then I verify pre-summary page is displayed
   When I click on Return to current line button
   Then I should be navigated to the last unsupplied article in the trip with header displaying 2/3 left in trip
   When I click on Back button
   Then I should be navigated to the previous article in the trip with header displaying 3/3 left in trip
   When I click on FWD button
   And I click on FWD button
   Then I verify pre-summary page is displayed

Scenario: Verify that clicking on Return to current line takes the user to the last normal article in the trip - normal articles with collectibles
   Given I have a trip with 3 tote items with 2 collectibles and 0 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on FWD button
   And I click on Close button
   And I click on Close button
   Then I verify pre-summary page is displayed
   When I click on Return to current line button
   Then I should be navigated to the last article in the trip with header displaying 1/3 left in trip
   When I click on FWD button
   Then I verify pre-summary page is displayed

Scenario: Verify that clicking on Return to current line takes the user to the last normal article in the trip - normal articles with free samples
   Given I have a trip with 3 tote items with 0 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on FWD button
   And I click on No button
   And I click on No button
   Then I verify pre-summary page is displayed
   When I click on Return to current line button
   Then I should be navigated to the last article in the trip with header displaying 1/3 left in trip
   When I click on FWD button
   Then I verify pre-summary page is displayed

Scenario: Verify that clicking on Return to current line takes the user to the last normal article in the trip - normal articles with collectibles and free samples
   Given I have a trip with 3 tote items with 2 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on FWD button
   And I click on Close button
   And I click on Close button
   And I click on No button
   And I click on No button
   Then I verify pre-summary page is displayed
   When I click on Return to current line button
   Then I should be navigated to the last article in the trip with header displaying 1/3 left in trip
   When I click on FWD button
   Then I verify pre-summary page is displayed

Scenario: Verify that clicking on Return to current line takes the user to the last normal article in the trip - normal articles only
   Given I have a trip with 3 tote items with 0 collectibles and 0 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on FWD button
   Then I verify pre-summary page is displayed
   When I click on Return to current line button
   Then I should be navigated to the last article in the trip with header displaying 1/3 left in trip
   When I click on FWD button
   Then I verify pre-summary page is displayed

Scenario: Verify that when personal shopper resumes a trip, normal articles and free samples are shown along with fully unsupplied collectibles
   Given I resume a trip with 3 tote items with 2 collectibles and 2 free samples
   When I get this trip
   And I click on Start Trip button
   And I click on OK button
   Then I should be navigated to the next article in the trip with header displaying 3/3 left in trip
   When I click on FWD button
   Then I should be navigated to the next article in the trip with header displaying 2/3 left in trip
   When I click on Back button
   Then I should be navigated to the next article in the trip with header displaying 3/3 left in trip
   When I click on FWD button
   And I click on FWD button
   And I click on FWD button
   Then I should be navigated to Collectibles screen
   And I verify the articleId 443314 for collectible displayed
   When I click on Close button
   Then I should be navigated to Free Samples screen
   When I click on No button
   Then I should be navigated to Free Samples screen
   When I click on No button
   Then I verify pre-summary page is displayed
   When I click on Return to current line button
   Then I should be navigated to the last article in the trip with header displaying 1/3 left in trip
   When I click on FWD button
   Then I verify pre-summary page is displayed
