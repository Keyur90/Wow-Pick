Feature: Picking trip buttons and personal shopper notes
   As A personal Shopper I should be able to view article inventory information

Background:
   Given I successfully login to RF application

Scenario: Verify picking trip buttons - primary
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   Then I should validate the picking trip buttons - primary
   |    labels          |
   |    FWD             |
   |    More Options    |
   |    BACK            |
   |    Wont Scan       |
   |    Substitute      |

Scenario: Verify picking trip buttons - secondary
   Given I have trip with first tote item of type EACH and ordered quantity 5
   When I get this trip
   And I click on Start Trip button
   And I click on More Options button
   Then I should validate the picking trip buttons - secondary
   |    labels                       |
   |    Exit trolley trip            |
   |    Change article location      |
   |    View unsupplied articles     |
   |    Reset current supplied       |

Scenario Outline: Verify personal shopper notes
   Given I have trip with first tote item with personal shopper notes <personalShopperNotes>
   When I get this trip
   And I click on Start Trip button
   Then I verify the notes <personalShopperNotes> is displayed
   When I click on notes <personalShopperNotes>
   Then I should see a popup containing <personalShopperNotes>
   When I close the Customer Note popup
   Then I should be able to see the article picking screen

   Examples:
   | personalShopperNotes                                                           |
   | A short note                                                                   |
   | This is a sample note to test longgggggggg notessssssssssssssssssssssssss      |
   | Notes with special chars - ~`!@#$%^&*()_-+={[]}\|\:;"'<,>.?/                   |
