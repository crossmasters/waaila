# W4040 - Event change 7 days to 28 days  
## Main info:  
**created at:** 2022-04-27T07:02:20.4051936Z  
**test type:** assertion  
**test version:** 7  
**maximal test score:** 150  
**test language:** en  
## Description:  
Observe the users’ interaction on your website per month. Measure the sessions made by users over the past month and compare the weekly average to the amount of session made during the latest week. The share of sessions should be within the expected range.<br>Tip: you can duplicate this test and replace the metric name in both Query logic and Test logic with a different metric to check its value (for example 'conversions' or 'totalUsers').  
## Constants:  
### lowerRatioThreshold
**type:** number  
**description:** lower bound to share of events last 7 days to weekly average events last 28 days  
**example:** 0.7  
### upperRatioThreshold
**type:** number  
**description:** upper bound to share of events last 7 days to weekly average events last 28 days  
**example:** 1.4  
## Blocks:  
### 1 - assert
**description:** If the total of the events for the latest week is not between 70% and 140% of the weekly average, it can be due to a successful campaign implemented or an error in measurement or a deeper issue that needs to be investigated.  
**score:** 150  
**pass message:** Events this week do not differ significantly from weekly average last month (they are between ${lowerRatioThreshold \* 100} and ${upperRatioThreshold \* 100} % of average events for a week)  
**fail message:** Events this week are not between ${lowerRatioThreshold \* 100} and ${upperRatioThreshold \* 100} % of average events for a week  
**how to fix message:** Check, if the GA code is triggered on the website.  
