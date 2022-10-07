# W4050 - Events Overview  
## Main info:  
**created at:** 2022-04-27T07:01:18.7902974Z  
**test type:** assertion  
**test version:** 8  
**maximal test score:** 150  
**test language:** en  
## Description:  
Check data from yesterday:<br> 1) there are all required events, <br> 2) there are no events with unexpected event name, <br> 3) no required event have decreased significantly (compared to daily average in the last 28 days)  
## Constants:  
### allowedEventNames
**type:** array  
**description:** fill the parameters based on the configuration steps below (requiredEventNames contains all event names that have to be there every day)  
**example:** "[]"  
### allowedEventNames
**type:** array  
**description:** fill the parameters based on the configuration steps below (allowedEventNames contains all event names that can be in the data)  
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
**description:** check that all event names measured  
**score:** 50  
### 2 - assert
**description:** check that there is no unexpected event name  
**score:** 50  
### 3 - assert
**description:** check that no required event name has fallen extremely compared to last 28 days  
**score:** 50  
