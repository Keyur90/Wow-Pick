Feature: Tote label scan
   As a personal Shopper I should b be able to scan a tote label before moving to the next trip item


Scenario Outline: Verify that the next article is displayed after a correct tote label is scanned
   Given I successfully login to RF application
   And I have trip with first tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on FWD button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <suppliedQuantity>

   Examples:
       | eachOrKG    | quantity  | suppliedQuantity   |
       | EACH        | 1         |  1                 |
       | KG          | 1000      |  1                 |

Scenario Outline: Verify that Place items to tote popup is displayed when an incorrect tote label is scanned
   Given I successfully login to RF application
   And I have trip with first tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on FWD button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688001 to place item into the tote
   Then I should verify that a popup with header Label Scan and text Incorrect label scanned is displayed
   And I should see the Close button
   When I click on Close button
   Then I should be navigated to Place items to tote popup for a <eachOrKG> article
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <suppliedQuantity>

   Examples:
       | eachOrKG    | quantity  | suppliedQuantity   |
       | EACH        | 1         |  1                 |
       | KG          | 1000      |  1                 |


   Scenario: Verify that tote label scan is not required when user performs Reset current supplied and navigates to the next item
   Given I successfully login to RF application
   And I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Back button
   And I click on More Options button
   And I click on Reset current supplied
   And I click on Confirm button
   And I click on FWD button
   Then I should not see the pop up to scan the tote label
   When I click on Back button
   Then I should validate that supplied quantity is 0


Scenario Outline: Verify that tote label scan is required when user supplies an article after landing on tote item screen and navigates to the next item
   Given I successfully login to RF application
   And I have trip with first tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Back button
   And I click on Wont Scan button
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on FWD button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   And I click on Back button
   Then I should validate that supplied quantity is <suppliedQuantity>

   Examples:
       | eachOrKG    | quantity  | suppliedQuantity   |
       | EACH        | 1         |  1                 |
       | KG          | 1000      |  1                 |

Scenario Outline: Verify that the previous article is displayed after a correct tote label is scanned
   Given I successfully login to RF application
   And I have trip with second tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on Back button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the previous article in the trip with header displaying 5/5 left in trip
   When I click on FWD button
   Then I should validate that supplied quantity is <suppliedQuantity>

   Examples:
       | eachOrKG    | quantity  | suppliedQuantity   |
       | EACH        | 1         |  1                 |
       | KG          | 1000      |  1                 |

Scenario Outline: Verify that Place items to tote popup is displayed when an incorrect tote label is scanned
   Given I successfully login to RF application
   And I have trip with second tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on Back button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688001 to place item into the tote
   Then I should verify that a popup with header Label Scan and text Incorrect label scanned is displayed
   And I should see the Close button
   When I click on Close button
   Then I should be navigated to Place items to tote popup for a <eachOrKG> article
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the previous article in the trip with header displaying 5/5 left in trip
   When I click on FWD button
   Then I should validate that supplied quantity is <suppliedQuantity>

   Examples:
       | eachOrKG    | quantity  | suppliedQuantity   |
       | EACH        | 1         |  1                 |
       | KG          | 1000      |  1                 |

Scenario: Verify that tote label scan is not required when user performs Reset current supplied and navigates to the previous item
   Given I successfully login to RF application
   And I have trip with second tote item of type EACH and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on Wont Scan button
   And I enter 1 as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   And I click on Back button
   And I click on More Options button
   And I click on Reset current supplied
   And I click on Confirm button
   And I click on Back button
   Then I should not see the pop up to scan the tote label
   When I click on FWD button
   Then I should validate that supplied quantity is 0
Scenario Outline: Verify that tote label scan is required when user supplies an article after landing on tote items screen and navigates to the previous item
   Given I successfully login to RF application
   And I have trip with first tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   And I click on FWD button
   And I click on Back button
   And I click on Wont Scan button
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on Back button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   And I click on FWD button
   Then I should validate that supplied quantity is <suppliedQuantity>

   Examples:
       | eachOrKG    | quantity  | suppliedQuantity   |
       | EACH        | 1         |  1                 |
       | KG          | 1000      |  1                 |



   Scenario Outline: Verify the totel label details when ORD>SUP and with EACH and KG articles
   Given I successfully login to RF application
   Given I have trip <isExpress> with first tote item of type <eachOrKG> with ordered quantity 3 and <bagTypes>
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on FWD button
   Then I should see the pop up to scan the tote label
   And I should validate the number of totes
   And I should validate the <bagTypes>, placed items as <quantity>, order number based on <eachOrKG> and location

    Examples:
       | eachOrKG    | quantity  | bagTypes   | isExpress |
       | EACH        | 2         | NO BAGS    | false     |
       | EACH        | 2         | ONLINE BAG | false     |
       | EACH        | 2         | PAPER BAG  | false     |
       | KG          | 2000      | NO BAGS    | false     |
       | KG          | 2000      | ONLINE BAG | false     |
       | KG          | 2000      | PAPER BAG  | false     |

   Scenario Outline: Verify the totel label details when ORD=SUP and with EACH and KG articles
   Given I successfully login to RF application
   Given I have trip <isExpress> with first tote item of type <eachOrKG> with ordered quantity 3 and <bagTypes>
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   Then I should see the pop up to scan the tote label
   And I should validate the number of totes
   And I should validate the <bagTypes>, placed items as <quantity>, order number based on <eachOrKG> and location

       Examples:
       | eachOrKG    | quantity  | bagTypes   | isExpress |
       | EACH        | 3         | NO BAGS    | false      |
       | EACH        | 3         | ONLINE BAG | false      |
       | EACH        | 3         | PAPER BAG  | false      |
       | KG          | 3000      | NO BAGS    |           |
       | KG          | 3000      | ONLINE BAG |           |
       | KG          | 3000      | PAPER BAG  |           |

   Scenario Outline: Tote label should be displayed with no scan if it is Express Trip and Single Tote settings is disabled
   Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
   Given I have trip <isExpress> with first tote item of type <eachOrKG> with ordered quantity 3 and <bagTypes>
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   Then I should see the tote pop up, but no message to scan for article <eachOrKG>

   Examples:
      | showToteDialogForExpress | canSkipToteBarcodeScan | eachOrKG | bagTypes | quantity | isExpress |
      | true                     | true                   | 3        | No Bags  | 3        | true      |

   Scenario Outline: Tote label should not been seen if it is Express Trip and Signle Tote settings is disabled
   Given I successfully login to RF application with <showToteDialogForExpress> and <canSkipToteBarcodeScan> flags
   Given I have trip <isExpress> with first tote item of type <eachOrKG> with ordered quantity 3 and <bagTypes>
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   Then I should not see the pop up to scan the tote label

   Examples:
      | showToteDialogForExpress | canSkipToteBarcodeScan | eachOrKG | bagTypes | quantity | isExpress |
      | false                    | false                  | 3        | No Bags  | 3        | true      |
      | false                    | true                   | 3        | No Bags  | 3        | true      |

   Scenario Outline: Verify the tote pop up for the change totes
   Given I successfully login to RF application    
   And I have trip <isExpress> with 2 tote items of type <eachOrKG> with same <orderNumber> and ORD 3 and <bagTypes>
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode <barCode> to place item into the tote
   And I should see the pop up with heading Label Scan and text Do you want to change totes?

   Examples:
       | eachOrKG | orderNumber | barCode      | bagTypes | quantity | isExpress | 
       | EACH     | 140031681   | 140031688003 | No Bags  | 1        | false     |

   Scenario Outline: The Personal shopper scans another Tote label of the same sale order and does not want to switch Totes
   Given I successfully login to RF application    
   And I have trip <isExpress> with 2 tote items of type <eachOrKG> with same <orderNumber> and ORD 3 and <bagTypes>
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode <barCode> to place item into the tote
   And I click on No button
   Then I should see the pop up to scan the tote label
   And I should validate the number of totes
   And I should validate the <bagTypes>, placed items as <quantity>, order number based on <eachOrKG> and location
   
   Examples:
       | eachOrKG | orderNumber | barCode      | bagTypes | quantity | isExpress | 
       | EACH     | 140031681   | 140031688003 | No Bags  | 1        | false     |
   
   Scenario Outline: The Personal shopper scans another Tote label of the same sale order and accepts to switch Totes
   Given I successfully login to RF application    
   And I have trip <isExpress> with 2 tote items of type <eachOrKG> with same <orderNumber> and ORD 3 and <bagTypes>
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   And I click on Confirm button
   And I click on FWD button
   And I scan the barcode <barCode> to place item into the tote
   And I click on Yes button
   And I click on Back button
   Then I should validate that supplied quantity value is <quantity>
   
   Examples:
       | eachOrKG | orderNumber | barCode      | bagTypes | quantity | isExpress | 
       | EACH     | 140031681   | 140031688003 | No Bags  | 1        | false     |