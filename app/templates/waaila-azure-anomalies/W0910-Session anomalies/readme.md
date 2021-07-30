# W0910 - Session anomalies  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** assertion  
**test version:** 3  
**maximal test score:** 100  
**test language:** en  
## Description:  
The anomaly detection allows you to follow the dynamics of your analytics data and informs you when the values jump significantly as compared to their trends and cyclical patterns. In particular, jumps in sessions could indicate measurement issues or some artificial boost or limitation to access to your website. This test is based on the Azure Anomaly Detector resource, therefore, it requires to enter the resource name and key. A step-by-step guide can be found in the <a href=https://waaila.com/en/docs/waaila/writing/anomaly-detection/#isanomaly>documentation</a>.  
## Constants:  
### anomalyDetectionConfig
**type:** object  
**description:** Settings of the anomaly detection analysis  
**example:** "{resourceName: '******', resourceKey: '******', timeColumn: 'date', valueColumn: 'sessions'}"  
## Blocks:  
### 1 - assert
**description:** Analyze presence of anomalies in sessions  
**score:** 100  
**pass message:** No anomalies detected in the ${valueColumnName}  
**fail message:** There was an anomaly in the ${valueColumnName}  
