# W4140 - Bounce rate  
## Main info:  
**created at:** 2022-04-27T07:05:48.7331608Z  
**test type:** assertion  
**test version:** 3  
**maximal test score:** 70  
**test language:** en  
## Description:  
Bounce rate reflects a single page session. These sessions happen when a customer visits certain page and closes it without clicking on any link or doing any action. A too low or too high bounce rate on your website or a specific web page might indicate a measurement issue. A step-by-step guide for anomaly detection in Waaila can be found in the <a href=https://waaila.com/en/docs/waaila/testLogic/AI-functions/#waailafunctionsisdayofweekanomaly target = _blank>documentation</a>.  
## Constants:  
### anomalyDetectionConfig
**type:** array  
**description:** Settings of the anomaly detection analysis  
**example:** "{valueColumn: 'bounceRate'}"  
## Blocks:  
### 1 - assert
**description:** Analyze the evolution of bounce rate  
**score:** 70  
**pass message:** No anomalies detected in the ${valueColumnName}  
**fail message:** There was an anomaly in the ${valueColumnName}  
