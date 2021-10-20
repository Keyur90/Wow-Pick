Feature: Article Inventory Information
   As A personal Shopper I should be able to view article inventory information

Background:
   Given I successfully login to RF application

Scenario Outline: Verify article inventory information
   Given I have trip with first tote item of type <eachOrKg> and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   Then I should validate the labels for article inventory information for <eachOrKg> article

   Examples:
   | eachOrKg        |
   | EACH            |
   | KG              |
   | Weight Range    |
   | EACH Multiplier |

Scenario Outline: Verify SOH values
   Given I have trip with first tote item of type <eachOrKg> and stock on hand value <quantity>
   When I get this trip
   And I click on Start Trip button
   Then I should validate that stock on hand value is <quantity>

   Examples:
   | eachOrKg  |  quantity |
   |  EACH     |  -10      |
   |  EACH     |  0        |
   |  EACH     |  10       |
   |  KG       |  -10.550  |
   |  KG       |  0        |
   |  KG       |  10.550   |

Scenario Outline: Verify article inventory information for collectibles
   Given I have a trip with a collectible item of <eachOrKg> pricing unit
   When I get this trip
   And I click on Start Trip button
   And I click on FWD button
   Then I should validate the labels for article inventory information for <eachOrKg> article

   Examples:
       | eachOrKg |
       | EACH     |

Scenario: Verify that labels ORD, SUP and SOH are not visible for Free Samples
   Given I have a trip with only Free Sample item
   When I get this trip
   And I click on Start Trip button
   Then I verify the labels displayed in picking screen for free sample item
