# W0540 - BigQuery Export Limit  
## Main info:  
**created at:** 2022-05-31T11:22:14.0336709Z  
**test type:** warning  
**test version:** 8  
**maximal test score:** 80  
**test language:** en  
## Description:  
There is a limit on the BigQuery Export. If the daily export exceed 1 million events, it is paused. Learn more in the <a href="https://support.google.com/analytics/answer/9823238">documentation on BigQuery Export</a>. This test evaluates hits by type using the threshold for free GA property. For the 360 properties the limit is substantially higher (more information can be found in the <a href="https://support.google.com/analytics/answer/11202874">official documentation</a>.  
## Constants:  
### dailyExportLimit
**type:** number  
**description:** Daily limit for BigQuery Export for free GA properties  
**example:** 1000000  
### timingLimits
**type:** array  
**description:** Official caps on the amount timing hits processed daily based on the amount of pageview hits (https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings#sampling_considerations)  
**example:** "[{min: 0, max: 100000, value: 10000}, {min: 100000, multiple: 0.01}]"  
## Blocks:  
### 1 - warn
**description:** Evaluate daily limit  
**score:** 80  
