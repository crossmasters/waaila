# W0920 - Transaction anomalies  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** assertion  
**test version:** 4  
**maximal test score:** 100  
**test language:** en  
## Description:  
The anomaly detection allows you to follow the dynamics of your analytics data and informs you when the values jump significantly as compared to their trends and cyclical patterns. In particular, jumps in transactions could indicate measurement issues or even an attack on your e-commerce. This test is based on the Azure Anomaly Detector resource, therefore, it requires to enter the resource name and key. A step-by-step guide can be found in the <a href=https://waaila.com/en/docs/waaila/writing/anomaly-detection/#isanomaly>documentation</a>.  
## Constants:  
### anomalyDetectionConfig
**type:** object  
**description:** Settings of the anomaly detection analysis  
**example:** "{resourceName: '******', resourceKey: '******', timeColumn: 'date', valueColumn: 'transactions'}"  
## Blocks:  
### 1 - assert
**description:** Analyze presence of anomalies in transactions  
**score:** 100  
**pass message:** No anomalies detected in the ${valueColumnName}  
**fail message:** There was an anomaly in the ${valueColumnName}  
