# W1120 - Visit change 7days to 28 days  
## Main info:  
**created at:** 2021-01-06T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 150  
**test language:** en  
## Description:  
Observe the users’ interaction on your website per month. Measure the visits made by users over the past month and compare the weekly average to the amount of visits made during the last week.  
## Constants:  
### lowerRatioThreshold
**type:** number  
**description:** lower bound to share of sessions last 7 days to weekly average sessions last 28 days  
**example:** 0.7  
### upperRatioThreshold
**type:** number  
**description:** upper bound to share of sessions last 7 days to weekly average sessions last 28 days  
**example:** 1.4  
## Blocks:  
### 1 - assert
**description:** If the total of the visits for the new week is not between 70% and 140% of the weekly average, it can be due to a successful campaign implemented or an error in measurement or a deeper issue that needs to be investigated.  
**score:** 150  
**pass message:** Visits this week do not differ significantly from last week (they are between ${lowerRatioThreshold\*100} and ${upperRatioThreshold\*100} % of average visits for a week)  
**fail message:** Visits this week are not between ${lowerRatioThreshold\*100} and ${upperRatioThreshold\*100} % of average visits for a week  
**how to fix message:** Check, if the ATI measurement is set up correctly on your website.  
