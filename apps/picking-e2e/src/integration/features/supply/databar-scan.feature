Feature: Supply articles through Databar scan

Background: 
   Given I successfully login to RF application with databar scan enabled

Scenario Outline: Databar scan for Each and Each Multiplier article with and without weight
   Given I have trip with first tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I verify that supplied quantity is 1
   When I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should be navigated to the next article in the trip with header displaying 5/5 left in trip
   And I verify that supplied quantity is 1

   Examples:
       | eachOrKG          | databar                                                |
       | EACH              | 010933968709474510123-ABC1722012539021234            |
       | EACH              | 010933968709474510123-ABC17220125310300500039021234  |
       | EACH Multiplier   | 010933968709474510123-ABC1722012539021234            |
       | EACH Multiplier   | 010933968709474510123-ABC17220125310300500039021234  |

Scenario Outline: Databar scan for a KG article without weight data
   Given I have trip with first tote item of type KG and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   And I enter 1000 as supplied quantity for a KG article
   And I click on Confirm button
   Then I verify that supplied quantity is 1
   When I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should be navigated to the next article in the trip with header displaying 5/5 left in trip
   And I verify that supplied quantity is 1
   
   Examples:
       | databar                                                |
       | 010933968709474510123-ABC1722012539021234            |

Scenario Outline: Databar scan for a KG article with weight data
   Given I have trip with first tote item of type KG and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I verify that supplied quantity is 1
   When I click on FWD button
   And I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should be navigated to the next article in the trip with header displaying 5/5 left in trip
   And I verify that supplied quantity is <suppliedQuantity>
   
   Examples:
       | databar                                                | suppliedQuantity   |
       | 010933968709474510123-ABC17220125310300100039021234  | 1                  |

Scenario Outline: Databar scan for a KG article with weight data equal to ordered quantity
   Given I have trip with first tote item of type KG and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should be navigated to the next article in the trip with header displaying 5/5 left in trip
   And I verify that supplied quantity is <suppliedQuantity>
   
   Examples:
       | databar                                                | suppliedQuantity  |
       | 010933968709474510123-ABC17220125310300500039021234  | 5                 |

Scenario Outline: Databar scan for a Weight Range article with weight data less than minimum weight
   Given I have trip with first tote item of type Weight Range and ordered quantity 1
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I verify that a pop up is displayed stating article is below the limit
   When I click on Close button
   Then I verify that the pop up is closed
   And I verify that supplied quantity is 0
   When I scan the barcode <databar1> to supply the article
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should be navigated to the next article in the trip with header displaying 5/5 left in trip
   And I verify that supplied quantity is <suppliedQuantity>
   
   Examples:
       | databar                                                | databar1                                              | suppliedQuantity   |
       | 010933968709474510123-ABC17220125310300199939021234  | 010933968709474510123-ABC17220125310300200039021234 | 1                  |

Scenario Outline: Databar scan for a Weight Range article with weight data within max weight
   Given I have trip with first tote item of type Weight Range and ordered quantity 1
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should be navigated to the next article in the trip with header displaying 5/5 left in trip
   And I verify that supplied quantity is <suppliedQuantity>
   
   Examples:
       | databar                                                | suppliedQuantity  |
       | 010933968709474510123-ABC17220125310300200039021234  | 1                 |
       | 010933968709474510123-ABC17220125310300230039021234  | 1                 |
       | 010933968709474510123-ABC17220125310300300039021234  | 1                 |

Scenario Outline: Databar scan for a KG and Weight Range article with weight data upto the primary tolerance limit
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag <weightOverrideFlag>
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <orderedQuantity>

   Examples:
       | eachOrKG       | orderedQuantity  | weightOverrideFlag     | databar                                                 |
       | KG             | 5                | true                   | 010933968709474510123-ABC17220125310300550039021234   |
       | KG             | 5                | false                  | 010933968709474510123-ABC17220125310300550039021234   |
       | Weight Range   | 1                | true                   | 010933968709474510123-ABC17220125310300330039021234   |
       | Weight Range   | 1                | false                  | 010933968709474510123-ABC17220125310300330039021234   |

Scenario Outline: Databar scan for a KG and Weight Range article with weight data exceeding primary tolerance limit and confirms the oversupply
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag true
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I verify the modal pop up displayed stating article exceeds tolerance
   When I click on Confirm button
   Then I should see the pop up to scan the tote label
   When I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <orderedQuantity>

   Examples:
       | eachOrKG       | orderedQuantity  | databar                                                 |
       | KG             | 5                | 010933968709474510123-ABC17220125310300550139021234   |
       | KG             | 5                | 010933968709474510123-ABC17220125310300600039021234   |
       | KG             | 5                | 010933968709474510123-ABC17220125310300600139021234   |
       | KG             | 5                | 010933968709474510123-ABC17220125310300800039021234   |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300330139021234   |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300360039021234   |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300360139021234   |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300460039021234   |

Scenario Outline: Databar scan for a KG and Weight Range article with weight data exceeding primary tolerance limit and cancels the oversupply
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag true
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I verify the modal pop up displayed stating article exceeds tolerance
   When I click on Close button
   Then I verify that the pop up is closed
   And I should validate that supplied quantity is 0
   When I scan the barcode <databar1> to supply the article
   And I click on Confirm button
   And I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <orderedQuantity>

   Examples:
       | eachOrKG       | orderedQuantity  | databar                                                 | databar1                                                |
       | KG             | 5                | 010933968709474510123-ABC17220125310300550139021234   | 010933968709474510123-ABC17220125310300550139021234   |
       | KG             | 5                | 010933968709474510123-ABC17220125310300600039021234   | 010933968709474510123-ABC17220125310300600039021234   |
       | KG             | 5                | 010933968709474510123-ABC17220125310300600139021234   | 010933968709474510123-ABC17220125310300600139021234   |
       | KG             | 5                | 010933968709474510123-ABC17220125310300800039021234   | 010933968709474510123-ABC17220125310300800039021234   |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300330139021234   | 010933968709474510123-ABC17220125310300330139021234   |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300360039021234   | 010933968709474510123-ABC17220125310300360039021234   |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300360139021234   | 010933968709474510123-ABC17220125310300360139021234   |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300460039021234   | 010933968709474510123-ABC17220125310300460039021234   |

Scenario Outline: Databar scan for a KG and Weight Range article with weight data exceeding primary tolerance limit and weight override flag disabled
   Given I have a trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity> with actual weight override flag false
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   Then I verify that a pop up is displayed stating article exceeds tolerance
   When I click on Close button
   Then I verify that the pop up is closed
   And I verify that supplied quantity is 0
   When I scan the barcode <databar1> to supply the article
   Then I should see the pop up to scan the tote label
   And I scan the barcode 140031688002 to place item into the tote
   Then I should be navigated to the next article in the trip with header displaying 4/5 left in trip
   When I click on Back button
   Then I should validate that supplied quantity is <orderedQuantity>

   Examples:
       | eachOrKG       | orderedQuantity  | databar                                                 | databar1                                                 |
       | KG             | 5                | 010933968709474510123-ABC17220125310300550139021234   | 010933968709474510123-ABC17220125310300550039021234    |
       | KG             | 5                | 010933968709474510123-ABC17220125310300600039021234   | 010933968709474510123-ABC17220125310300550039021234    |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300330139021234   | 010933968709474510123-ABC17220125310300330039021234    |
       | Weight Range   | 1                | 010933968709474510123-ABC17220125310300360039021234   | 010933968709474510123-ABC17220125310300330039021234    |

Scenario Outline: Databar scan for an article without weight data and user enters weight more than the primary tolerance limit
   Given I have trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity>
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
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
       | eachOrKG       | orderedQuantity | suppliedWeight     | databar                                                |
       | KG             | 5               | 5501               | 010933968709474510123-ABC1722012539021234            |
       | Weight Range   | 1               | 3301               | 010933968709474510123-ABC1722012539021234            |

Scenario Outline: Databar scan for an article without weight data and user enters weight more than the secondary tolerance limit
   Given I have trip with first tote item of type <eachOrKG> and ordered quantity <orderedQuantity>
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
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
       | eachOrKG       | orderedQuantity | suppliedWeight     | databar                                                |
       | KG             | 5               | 6001               | 010933968709474510123-ABC1722012539021234            |
       | Weight Range   | 1               | 3601               | 010933968709474510123-ABC1722012539021234            |

Scenario Outline: Databar scan for an article without weight data and user enters invalid weight data
   Given I have trip with first tote item of type <eachOrKG> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode <databar> to supply the article
   And I enter <quantity> as supplied quantity for a KG article
   And I click on Confirm button
   Then I should see an error message for <data> value

   Examples:
       | eachOrKG       | quantity | data         | databar                                                |
       | KG             | 0        | zero         | 010933968709474510123-ABC1722012539021234            |
       | KG             | -1       | negative     | 010933968709474510123-ABC1722012539021234            |
       | KG             | abcd     | non-numeric  | 010933968709474510123-ABC1722012539021234            |
       | KG             | 1.2      | decimal      | 010933968709474510123-ABC1722012539021234            |
       | Weight Range   | 0        | zero         | 010933968709474510123-ABC1722012539021234            |
       | Weight Range   | -1       | negative     | 010933968709474510123-ABC1722012539021234            |
       | Weight Range   | abcd     | non-numeric  | 010933968709474510123-ABC1722012539021234            |
       | Weight Range   | 1.2      | decimal      | 010933968709474510123-ABC1722012539021234            |