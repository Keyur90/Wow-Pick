Feature: Supply quanity and verify the tote labels for Free Samples
   As A personal Shopper I should b be able to supply quantities and verify the tote labels for Free Samples

Scenario Outline: Verify information on free Samples screen
   Given I successfully login to RF application
   And I have <isExpress> trip with 1 Tote item, 1 collectible and 1 free sample with description <desc> and bag Type <bagTypes>
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Close button
   Then I should see the title of free samples and details <desc> with tote and the bag type <bagTypes>
      Examples:
        | bagTypes    | desc                          | isExpress |
        | NO BAGS     | !@#$%^&*()_+{}":?><"          | false     |
        | ONLINE BAG  | This is a welcome pack        | true      |
        | PAPER BAG   | This is a free samples page   | false     |

Scenario Outline: Verify the tote label if label scanning is enabled 
   Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
   And I have <isExpress> trip with 1 Tote item, 1 collectible and 1 free sample with bag Type <bagTypes>
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Close button
   And I click on Yes button
   Then I should see the pop up to scan the tote label 
   And I should verify the Order number and location and <bagTypes>
   And I should validate the number of totes

      Examples:
        | bagTypes    | showToteDialogForExpress | canSkipToteBarcodeScan | isExpress |
        | NO BAGS     | true                     | false                  | true      |
        | ONLINE BAG  | true                     | false                  | false     |
        | PAPER BAG   | true                     | false                  | false     |

Scenario Outline: Verify the tote label if label scanning is disabled
   Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
   And I have <isExpress> trip with 1 Tote item, 1 collectible and 1 free sample with bag Type <bagTypes>
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Close button
   And I click on Yes button
   Then I should see the tote pop up but no message to scan
   And I should verify the Order number and location and <bagTypes>

      Examples:
        | bagTypes    | showToteDialogForExpress | canSkipToteBarcodeScan | isExpress |
        | NO BAGS     | true                     | true                   | true      |
        | ONLINE BAG  | true                     | true                   | false     |
        | PAPER BAG   | true                     | true                   | false     |

Scenario Outline: Place the articles in tote pop up was not shown for an Express trip when Disable Single Order Tote Label Scanning system parameter was enabled
   Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
   And I have <isExpress> trip with 1 Tote item, 1 collectible and 1 free sample
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Close button
   And I click on Yes button
   Then I should be navigated to the picking screen of the next article

      Examples:
        | showToteDialogForExpress | canSkipToteBarcodeScan | isExpress |
        | false                    | false                  | true      |
        | false                    | true                   | true      |
        | false                    | false                  | true      |

Scenario Outline: Place the articles in tote pop up was not shown for an Express trip when Disable Single Order Tote Label Scanning system parameter was enabled
   Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
   And I have <isExpress> trip with 1 Tote item, 1 collectible and 1 free sample 
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Close button
   And I click on No button
   Then I should be navigated to the picking screen of the next article

      Examples:
        | showToteDialogForExpress | canSkipToteBarcodeScan | isExpress |
        | false                    | false                  | true      |
        | true                     | true                   | false     |
        | true                     | true                   | true      |
        | false                    | true                   | false     |
        | true                     | false                  | true      |