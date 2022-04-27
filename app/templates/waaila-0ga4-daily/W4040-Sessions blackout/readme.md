# W4040 - Sessions blackout  
## Main info:  
**created at:** 2022-04-27T07:01:18.7902974Z  
**test type:** assertion  
**test version:** 1  
**maximal test score:** 150  
**test language:** en  
## Description:  
If there are some technical difficulties on web and measurement will stop, data collection will be disturbed and continuity will be broken. It needs to be checked and solved ASAP.<br>Tip: you can duplicate this test and replace the metric name (in both Query logic and Test logic) to check its value in the last month.  
## Blocks:  
### 1 - warn
**description:** If there is no traffic for previous day detected, the test fails.  
**score:** 150  
**pass message:** Sessions were measured yesterday.  
**fail message:** There was no data collected yesterday!  
