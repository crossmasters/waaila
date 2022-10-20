# W4031 - Events blackout  
## Main info:  
**created at:** 2022-04-27T07:01:18.7902974Z  
**test type:** check  
**test version:** 7  
**maximal test score:** 150  
**test language:** en  
## Description:  
If there are some technical difficulties on web and measurement will stop, data collection will be disturbed and continuity will be broken. It needs to be checked and solved ASAP.<br>Tip: you can duplicate this test and replace the metric name in both Query logic and Test logic with a different metric to check its value (for example 'conversions' or 'totalUsers').  
## Blocks:  
### 1 - warn
**description:** If there is no traffic for previous day detected, it may be an error in measurement but also may be a delay in Google Analytics.  
**score:** 50  
**pass message:** Events were measured yesterday.  
**fail message:** There is no data collected for yesterday. It may be an error in measurement but also may be a delay in Google Analytics.  
### 2 - assert
**description:** If there is no traffic for the last 2 days, the test fails as it indicates a serious problem with measurement.  
**score:** 100  
**pass message:** Events were measured during last 2 days.  
**fail message:** There was no data collected in last 2 days!  
