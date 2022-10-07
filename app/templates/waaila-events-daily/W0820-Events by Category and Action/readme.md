# W0820 - Events by Category and Action  
## Main info:  
**created at:** 2022-04-07T10:34:53.598772Z  
**test type:** assertion  
**test version:** 14  
**maximal test score:** 150  
**test language:** en  
## Description:  
Check data from yesterday:<br> 1) all required category-action combinations have events, <br> 2) there are no events with unexpected category-action combinations, <br> 3) no required category-action combinations have decreased significantly (compared to daily average in the last 28 days)  
## Constants:  
### allowedEventCombinations
**type:** array  
**description:** fill the parameters based on the configuration steps below (requiredEventCombinations contains all event combinations that have to be there every day)  
**example:** "[]"  
### allowedEventCombinations
**type:** array  
**description:** fill the parameters based on the configuration steps below (allowedEventCombinations contains all event combinations that can be in the data)  
**example:** "[]"  
### maxCountUnexpected
**type:** number  
**description:** maximal allowed number of events for an unexpected combination (to display all, set to 0)  
**example:** 100  
### minShareToDailyAverage
**type:** number  
**description:** minimal allowed share compared to daily average (e.g. for minShareToDailyAverage = 0.4, test fails if any combination has less than 40 % of its daily average)  
**example:** 0.4  
## Blocks:  
### 0 - info
**description:** prepare the configuration (if empty)  
**score:** 0  
### 1 - assert
**description:** check that all events measured  
**score:** 50  
### 2 - assert
**description:** check that there is no unexpected event  
**score:** 50  
### 3 - assert
**description:** check that no required event has fallen extremely compared to last 28 days  
**score:** 50  
