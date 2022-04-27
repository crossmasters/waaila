# W0520 - Measurement blackout  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** assertion  
**test version:** 3  
**maximal test score:** 150  
**test language:** en  
## Description:  
If there are some technical difficulties on web and measurement will stop, data collection will be disturbed and continuity will be broken. It needs to be checked and solved ASAP.  
## Blocks:  
### 1 - warn
**description:** If there is no traffic for previous day detected, the test fails.  
**score:** 150  
**pass message:** Sessions were measured yesterday.  
**fail message:** There was no data collected yesterday!  
