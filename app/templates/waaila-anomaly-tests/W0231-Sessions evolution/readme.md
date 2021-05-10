# W0231 - Sessions evolution  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 150  
**test language:** en  
## Description:  
Observe the users' interaction on your website. Measure the sessions made by users over past months and based on the weekly pattern compare to the last observed value. If the last value is sufficiently far from the expected value, the test fails. A step-by-step guide can be found in the <a href=https://waaila.com/en/docs/waaila/writing/anomaly-detection/#isdayofweekanomaly>documentation</a>.  
## Constants:  
### anomalyDetectionConfig
**type:** array  
**description:** Settings of the anomaly detection analysis  
**example:** "{valueColumn: 'sessions'}"  
## Blocks:  
### 1 - assert
**description:** Analyze presence of anomalies  
**score:** 150  
**pass message:** No anomalies detected in the ${valueColumnName}  
**fail message:** There was an anomaly in the ${valueColumnName}  
