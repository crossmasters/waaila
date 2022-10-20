# W4130 - Hostname traffic evolution  
## Main info:  
**created at:** 2022-04-27T07:04:05.9640362Z  
**test type:** assertion  
**test version:** 9  
**maximal test score:** 160  
**test language:** en  
## Description:  
Verify that every domain has expected traffic based on pattern from previous weeks. If for any of the domains there is a large change in traffic, it could mean a measurement problem or problem with the website. A step-by-step guide for anomaly detection in Waaila can be found in the <a href=https://waaila.com/en/docs/waaila/testLogic/AI-functions/#waailafunctionsisdayofweekanomaly target = _blank>documentation</a>.  
## Constants:  
### anomalyDetectionConfigAgg
**type:** object  
**description:** Settings of the anomaly detection analysis - aggregated  
**example:** "{valueColumn: 'sessions'}"  
### anomalyDetectionConfigHostname
**type:** object  
**description:** Settings of the anomaly detection analysis - by hostname  
**example:** "{valueColumn: 'sessions', overDimensions: ['hostname']}"  
### minExpectedSessions
**type:** number  
**description:** minimal expected amount of sessions to be included in the results  
**example:** 100  
## Blocks:  
### 1 - assert
**description:** Analyze presence of anomalies in sessions aggregate  
**score:** 80  
**pass message:** No anomalies detected in the ${valueColumnName} aggregated  
**fail message:** There was an anomaly in the ${valueColumnName} aggregated  
### 2 - assert
**description:** Analyze presence of anomalies in sessions by hostname  
**score:** 80  
**pass message:** No anomalies detected in the ${valueColumnName}  
**fail message:** There was an anomaly in the ${valueColumnName}  
