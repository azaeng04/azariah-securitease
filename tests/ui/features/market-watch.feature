
Feature: Market Watch

    Scenario: Retrieving articles from the "Market Watch" tab
        Given I navigate to MarketWatch
        When I view the latest news
        Then I print out the name of the first 7 articles
