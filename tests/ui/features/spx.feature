Feature: Bottom Performers - SPX

    Scenario: Display bottom performers indexed by the change percentage (CHG%)
        Given I navigate to the Market Watch investing section for SPX
        When I view the bottom performers
        Then I should display the first 5 names, last prices (LAST) and change percentages (CHG%) of the bottom performers