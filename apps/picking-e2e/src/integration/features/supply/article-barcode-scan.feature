Feature: Tote label scan
   As a personal Shopper I should b be able to scan an article with normal barcode (UPC/EAN)

Scenario Outline: The Personal shopper scans correctly the barcode of EACH article and supplies the weight
   Given I successfully login to RF application
   And I have trip with first tote item of type <eachOrKG> and ordered quantity 3
   When I get this trip
   And I click on Start Trip button
   And I scan the barcode 9339687094745 to supply the article
   Then I should validate that supplied quantity is <suppliedQuantity>

   Examples:
       | eachOrKG  | suppliedQuantity |
       | EACH      | 1                |


# Scenario Outline: The Personal shopper scans correctly the barcode of Weight Range article and supplies the weight
#    Given I successfully login to RF application
#    And I have trip with first tote item of type <eachOrKG> and ordered quantity 3
#    When I get this trip
#    And I click on Start Trip button
#    And I scan the barcode 9339687094745 to supply the article
#    And I enter <quantity> as valid quantity
#    And I click on Confirm button
#    And I scan the barcode 140031688003 to place item into the tote
#    Then I should validate that supplied quantity is <suppliedQuantity>


#    Examples:
#        | eachOrKG     | suppliedQuantity | quantity |
#        | Weight Range | 1                | 2000     |

# Scenario Outline: The Personal shopper scans correctly the barcode of KG article and supplies the weight
#    Given I successfully login to RF application
#    And I have trip with first tote item of type <eachOrKG> and ordered quantity 3
#    When I get this trip
#    And I click on Start Trip button
#    And I scan the barcode 9339687094745 to supply the article
#    And I enter <quantity> as valid quantity
#    And I click on Confirm button
#    Then I should validate that supplied quantity is <suppliedQuantity>


#    Examples:
#        | eachOrKG     | suppliedQuantity | quantity |
#        | KG           | 1                | 1000     |

#    Scenario Outline: Personal shopper in-correctly scans an article
#    Given I successfully login to RF application
#    And I have trip with first tote item of type <eachOrKG> and ordered quantity 3
#    When I get this trip
#    And I click on Start Trip button
#    And I scan the barcode 9339 to supply the article
#    Then I should see the pop up with heading Barcode Scan and text Article not found
#    And I click on Close button

#       Examples:
#        | eachOrKG  | suppliedQuantity |
#        | EACH      | 1                |
#        | KG        | 1                |

# Scenario Outline: Personal shopper correctly scans EACH Multiplier article
#    Given I successfully login to RF application
#    And I have trip with first tote item of type <eachOrKG> and ordered quantity 3
#    When I get this trip
#    And I click on Start Trip button
#    And I scan the barcode 9339687094745 to supply the article
#    Then I should validate that supplied quantity is <suppliedQuantity>

#    Examples:
#        | eachOrKG  | suppliedQuantity |
#        | EACH      | 1                |
