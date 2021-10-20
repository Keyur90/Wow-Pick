Feature: Restart trip with supplied/unsupplied articles/collectibles/free samples
   As a personal Shopper I should b be able to restart a normal trip and continue the picking

Scenario: Restart picking a trip with none of the articles in the trip was fully supplied
   Given I successfully login to RF application
   And I have an existing trip with 3 tote items unsupplied with quantity 1
   When I get this trip
   And I click on Start Trip button
   And I should see the pop up with heading Please note and text Check last item scanned correctly
   And I click on OK button
   Then I should validate the Back button as disabled
   And FWD button as enabled

Scenario: Restart picking a trip with the first article un-supplied and some articles supplied & unsupplied thereafter
   Given I successfully login to RF application
   And I have an existing trip with 3 tote items with 1 article supplied and quantity 3
   When I get this trip
   And I click on Start Trip button
   And I should see the pop up with heading Please note and text Check last item scanned correctly
   And I click on OK button
   Then I should validate the Back button as disabled
   And FWD button as enabled

Scenario: Restart and pick a trip with the first few articles fully supplied and unsupplied thereafter 
   Given I successfully login to RF application
   And I have an existing trip with 3 tote items with 2 articles fully supplied with quantity 3 and 30000 rest unsupplied
   When I get this trip
   And I click on Start Trip button
   And I should see the pop up with heading Please note and text Check last item scanned correctly
   And I click on OK button
   Then I should validate the Back button as enabled
   And FWD button as enabled

Scenario: Restart and pick a trip with one fully un-supplied collectible
   Given I successfully login to RF application
   And I have an existing trip with 3 tote items and 2 collectibles with 1 supplied qty as 12 and another un-supplied
   When I get this trip
   And I click on Start Trip button
   And I should see the pop up with heading Please note and text Check last item scanned correctly
   And I click on OK button
   And I click on FWD button 3 times
   Then I should see the 443314 article which is un-supplied collectible 

Scenario: Restart and pick a trip with partially or fully supplied collectible
   Given I successfully login to RF application
   And I have an existing trip with 3 tote items and 2 collectibles with 1 supplied qty as 12 and another 1 as partially supplied
   When I get this trip
   And I click on Start Trip button
   And I should see the pop up with heading Please note and text Check last item scanned correctly
   And I click on OK button
   And I click on FWD button 3 times 
   Then I should see the Free Samples screen

Scenario: Restart and pick a trip with all normal articles fully supplied with at least one collectible fully unsupplied
   Given I successfully login to RF application
   And I have an existing trip with 3 tote items fully supplied 3, 3, and 5 and 12 for collectibles un-supplied
   When I get this trip
   And I click on Start Trip button
   And I should see the pop up with heading Please note and text Check last item scanned correctly
   And I click on OK button
   Then I should validate the Back button as enabled
   And FWD button as enabled