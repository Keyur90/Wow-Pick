Feature: Supply quanity for Collectibles
   As A personal Shopper I should b be able to supply quantities for collectibles

Scenario: Verify information on collectibles screen
   Given I successfully login to RF application
   And I have trip with 1 Tote item, 1 collectible with 5 as ordered quantity
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   Then I should validate the labels for collectibles

Scenario Outline: Supply invalid quantities
   Given I successfully login to RF application
   And I have trip with 1 Tote item, 1 collectible with 5 as ordered quantity
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I enter <quantity> as invalid quantity
   Then I should see an error message with min quantity more than 0 and not more than 5

   Examples:
        | quantity |
        |    7     |
        |   -1     |
        |   0      |

Scenario Outline: Supply special characters as invalid quantities
   Given I successfully login to RF application
   And I have trip with 1 Tote item, 1 collectible with 5 as ordered quantity
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I enter <quantity> as invalid quantity
   Then I should see an error message to enter valid quantity

   Examples:
        | quantity |
        |   -      |
        |   ,      |
        |   .      |

 # here Enable Tote/Trolley Label scanning = canSkipToteBarcodeScan
 # and Disable Single Order Tote Label Scanning = showToteDialogForExpress
Scenario Outline: Tote label should be displayed to scan if it is or not Express Trip and Single Tote settings is disabled and enable tote settings is enabled
    Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
    And I have trip <isExpress> with 1 tote item, 1 collectible with ordered quantity 3 and bagType as <bagTypes>
    When I get this trip
    And I click on Start Trip button
    And I click on FWD button
    And I enter <quantity> as valid quantity for collectibles
    And I click on OK button
    Then I should validate the <bagTypes>, order number and location
    And I should validate the number of totes

    Examples:
      | showToteDialogForExpress | canSkipToteBarcodeScan | bagTypes    | quantity | isExpress |
      | true                     | false                  | No Bags     | 3        | true      |  
      | true                     | false                  | ONLINE BAG  | 3        | false     |  


 # Disable Single Order Tote Label Scanning = enabled
 # Enable Tote/Trolley Label scanning = Enabled     
Scenario Outline: No tote popup if it is Express trip and tote Single Tote setting is enabled and tote setting are disabled
    Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
    And I have trip <isExpress> with 1 tote item, 1 collectible with ordered quantity 3 and bagType as <bagTypes>
    When I get this trip
    And I click on Start Trip button
    And I click on FWD button
    And I enter <quantity> as valid quantity for collectibles
    And I click on OK button
    Then I should not see the pop up to scan the tote label

    Examples:
      | showToteDialogForExpress | canSkipToteBarcodeScan | bagTypes   | quantity | isExpress |
      | false                    | true                   | PAPER BAG  | 3        | true      |         

 # Disable Single Order Tote Label Scanning = disabled
 # Enable Tote/Trolley Label scanning = disabled  
Scenario Outline: Only tote information should display if Single order tote setting is disabled and tote label scanning is disabled
    Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
    And I have trip <isExpress> with 1 tote item, 1 collectible with ordered quantity 3 and bagType as <bagTypes>
    When I get this trip
    And I click on Start Trip button
    And I click on FWD button
    And I enter <quantity> as valid quantity for collectibles
    And I click on OK button
    Then I should see the tote pop up but no message to scan
    And I should verify the Order number and location and <bagTypes>

    Examples:
      | showToteDialogForExpress | canSkipToteBarcodeScan | bagTypes | quantity | isExpress |
      | true                     | true                   | No Bags  | 3        | true      |

Scenario: Don’t record the supplied quantity for the Collectible when the Personal shopper incorrectly scans the Tote label
    Given I successfully login to RF application
    And I have trip with 1 Tote item, 1 collectible with 5 as ordered quantity
    When I get this trip
    And I click on Start Trip button
    And I click on FWD button
    And I enter 3 as valid quantity for collectibles
    And I click on OK button
    Then I should see the pop up to scan the tote label
    When I scan the barcode 14003168800112 to place item into the tote
    Then I should see the error pop-up with message Incorrect label scanned
