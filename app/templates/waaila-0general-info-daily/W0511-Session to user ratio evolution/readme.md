# W0511 - Session to user ratio evolution  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** assertion  
**test version:** 6  
**maximal test score:** 80  
**test language:** en  
## Description:  
For each device there must be significantly more sessions than users. If the ratio of sessions to users changes significantly for any device, it could indicate errors with measurement or access for the certain device. To evaluate significance of changes, anomaly detection framework is used. A step-by-step guide for anomaly detection in Waaila can be found in the <a href=https://waaila.com/en/docs/waaila/testLogic/AI-functions/#waailafunctionsisdayofweekanomaly target = _blank>documentation</a>.  
## Constants:  
### anomalyDetectionConfig
**type:** object  
**description:** Settings of the anomaly detection analysis  
**example:** "{valueColumn: 'sessions', overDimensions: ['deviceCategory']}"  
## Blocks:  
### 1 - assert
**description:** Analyze presence of anomalies in session to user ratio by device category  
**score:** 80  
**pass message:** No anomalies detected in the ${valueColumnName}  
**fail message:** There was an anomaly in the ${valueColumnName}  
