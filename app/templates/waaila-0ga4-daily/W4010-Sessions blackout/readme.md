# W4010 - Sessions blackout  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** assertion  
**test version:** 7  
**maximal test score:** 150  
**test language:** en  
## Description:  
If there are some technical difficulties on web and measurement will stop, data collection will be disturbed and continuity will be broken. It needs to be checked and solved ASAP.<br>Tip: you can duplicate this test and replace the metric name in both Query logic and Test logic with a different metric to check its value (for example 'conversions' or 'totalUsers').  
## Blocks:  
### 1 - assert
**description:** If there is no traffic for previous day detected, the test fails.  
**score:** 150  
**pass message:** Sessions were measured yesterday.  
**fail message:** There was no data collected yesterday!  
