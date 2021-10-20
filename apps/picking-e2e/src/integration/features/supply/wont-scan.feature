Feature: Supply via Won't Scan
   As A personal Shopper I should b be able to supply quantities manually by using won't scan button

Background: 
   Given I successfully login to RF application
 
Scenario Outline: Supply invalid quantities
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as invalid quantity
   And I click on Confirm button
   Then I should see an error message with min quantity more than 0 and not more than 5

   Examples:
        | quantity |
        |    7     |
        |   -1     |
        |   0      |
 
Scenario Outline: Supply valid quantities      
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as valid quantity
   Then I should be able to click confirm

   Examples:
        | quantity |
        |    4     |
        |    3     |
           

Scenario Outline: Verify modal popup displayed when user clicks on Wont Scan button
   Given I have trip with first tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   Then I validate the modal popup displayed for <eachOrKG> article

   Examples:
       | eachOrKG       |
       | EACH           | 
       | KG             |
       | Weight Range   |

Scenario Outline: Supply negative and zero quantity for a KG Article
   Given I have trip with first tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as supplied quantity for a KG article
   And I click on Confirm button
   Then I should see an error message for <data> value

   Examples:
       | eachOrKG       | quantity | data         |
       | KG             | 0        | zero         |
       | KG             | -1       | negative     |
       | KG             | abcd     | non-numeric  |
       | KG             | 10a      | non-numeric  |
       | KG             | $#@#     | non-numeric  |
       | KG             | 1.2      | decimal      |
       | Weight Range   | 0        | zero         |
       | Weight Range   | -1       | negative     |
       | Weight Range   | abcd     | non-numeric  |
       | Weight Range   | 10a      | non-numeric  |
       | Weight Range   | $#@#     | non-numeric  |
       | Weight Range   | 1.2      | decimal      |
Scenario Outline: Verify article picking screen is displayed when supplied weight is less than ordered weight
   Given I have trip with first tote item of type KG and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <quantity> as supplied quantity for a KG article
   And I click on Confirm button
   Then I verify that supplied quantity is <suppliedQuantity>

   Examples:
       | quantity | suppliedQuantity |
       | 1000     | 1                |

Scenario: Verify popup to scan tote label scan is displayed when supplied quantity is equal to ordered quantity
   Given I have trip with first tote item of type KG and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter 5000 as supplied quantity for a KG article
   And I click on Confirm button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is 5

Scenario: Verify an error is displayed when personal shopper clicks on Wont Scan button when ordered quantity is already supplied
   Given I have trip with first tote item of type KG and ordered quantity 5
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter 5000 as supplied quantity for a KG article
   And I click on Confirm button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   And I click on Wont Scan button
   Then I should see a popup stating that maximum quantity is already supplied
   When I click on Close button
   Then I verify that supplied quantity is 5

Scenario Outline: Verify popup to scan tote label scan is displayed when supplied quantity is within primary tolerance limits
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag <weightOverrideFlag>
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <suppliedWeight> as supplied quantity for a KG article
   And I click on Confirm button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <orderedQuantity>

   Examples:
       | eachOrKG       | orderedQuantity  | weightOverrideFlag     | suppliedWeight     |
       | KG             | 5                | true                   | 5500               |
       | KG             | 5                | false                  | 5500               |
       | Weight Range   | 1                | true                   | 3300               |
       | Weight Range   | 1                | false                  | 3300               |

Scenario Outline: User supplies weight up to the secondary tolerance and actual weights override is enabled and clicks Confirm
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag true
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <suppliedWeight> as supplied quantity for a KG article
   And I click on Confirm button
   Then I verify the modal popup displayed to confirm <suppliedWeight> supplied
   When I click on Confirm button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <orderedQuantity>

   Examples:
      | eachOrKG        | orderedQuantity    | suppliedWeight  |
      | KG              | 5                  | 5501            |
      | KG              | 5                  | 6000            |
      | Weight Range    | 1                  | 3301            |
      | Weight Range    | 1                  | 3600            |
   
Scenario Outline: User supplies weight up to the secondary tolerance and actual weights override is enabled and clicks Cancel
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag true
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <suppliedWeight> as supplied quantity for a KG article
   And I click on Confirm button
   Then I verify the modal popup displayed to confirm <suppliedWeight> supplied
   When I click on Cancel button
   Then I should validate that supplied quantity is 0

   Examples:
      | eachOrKG        | orderedQuantity    | suppliedWeight  |
      | KG              | 5                  | 5501            |
      | KG              | 5                  | 6000            |
      | Weight Range    | 1                  | 3301            |
      | Weight Range    | 1                  | 3600            |

Scenario Outline: User supplies weight exceeding secondary tolerance and actual weights override is enabled and re-enters weight correctly
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag true
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <suppliedWeight> as supplied quantity for a KG article
   And I click on Confirm button
   Then I verify the pop up displayed stating <suppliedWeight> exceeds secondary tolerance
   When I re-enter <suppliedWeight> as supplied quantity
   And I click on Confirm button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <orderedQuantity>

   Examples:
       | eachOrKG       | orderedQuantity    | suppliedWeight |
       | KG             | 5                  | 6001           |
       | Weight Range   | 1                  | 3601           |

Scenario Outline: User supplies weight exceeding secondary tolerance and actual weights override is enabled and re-enters weight incorrectly
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag true
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <suppliedWeight> as supplied quantity for a KG article
   And I click on Confirm button
   Then I verify the pop up displayed stating <suppliedWeight> exceeds secondary tolerance
   When I re-enter <retypeWeight> as supplied quantity
   And I click on Confirm button
   Then I verify the popup displayed stating the weights do not match
   When I click on OK button
   Then I should validate that supplied quantity is 0

   Examples:
       | eachOrKG       | orderedQuantity | suppliedWeight  | retypeWeight |
       | KG             | 5               | 6001            | 6002         |
       | Weight Range   | 1               | 3601            | 3602         |

Scenario Outline: User supplies weight exceeding tolerance and actual weight override is disabled
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag false
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <suppliedWeight> as supplied quantity for a KG article
   And I click on Confirm button
   Then I verify the inline error <errorMessage> stating that tolerance is exceeded
   When I click on Cancel button
   Then I should validate that supplied quantity is 0

   Examples:
       | eachOrKG       | orderedQuantity | suppliedWeight  | errorMessage                                        |
       | KG             | 5               | 5501            | Article exceeds tolerance - select an alternative   |
       | KG             | 5               | 6001            | Article exceeds tolerance - select an alternative   |
       | Weight Range   | 1               | 3301            | Article exceeds tolerance - select an alternative   |
       | Weight Range   | 1               | 3601            | Article exceeds tolerance - select an alternative   |

Scenario: For a weight range article, personal shopper supplies weight lesser than the minimum weight range
   Given I have trip with first tote item of type Weight Range and ordered quantity 1
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter 1500 as supplied quantity for a Weight Range article
   And I click on Confirm button 
   Then I verify that an inline error message is displayed stating article is below the limit

Scenario Outline: For a weight range article, user supplies weight within the weight range
   Given I have trip with first tote item of type Weight Range and ordered quantity 1
   When I get this trip
   And I start it and click won't scan button for first item
   And I enter <suppliedWeight> as supplied quantity for a Weight Range article
   And I click on Confirm button 
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is 1

   Examples:
       | suppliedWeight |
       | 2000           |
       | 2500           |
       | 3000           |
