# W0131 - Hostname traffic evolution  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 80  
**test language:** en  
## Description:  
Verify that every domain has expected traffic based on pattern from previous weeks. If for any of the domains there is a large change in traffic, it could mean a measurement problem or problem with the website. A step-by-step guide for anomaly detection in Waaila can be found in the <a href=https://waaila.com/en/docs/waaila/writing/anomaly-detection/#isdayofweekanomaly>documentation</a>.  
## Constants:  
### anomalyDetectionConfig
**type:** array  
**description:** Settings of the anomaly detection analysis  
**example:** "{valueColumn: 'sessions', dimensions: ['hostname']}"  
### minExpectedSessions
**type:** number  
**description:** minimal expected amount of sessions to be included in the results  
**example:** 100  
## Blocks:  
### 1 - assert
**description:** Analyze presence of anomalies  
**score:** 80  
**pass message:** No anomalies detected in the ${valueColumnName}  
**fail message:** There was an anomaly in the ${valueColumnName}  
