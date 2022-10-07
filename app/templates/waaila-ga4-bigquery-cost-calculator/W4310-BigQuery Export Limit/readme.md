# W4310 - BigQuery Export Limit  
## Main info:  
**created at:** 2021-05-19T16:00:00  
**test type:** warning  
**test version:** 5  
**maximal test score:** 80  
**test language:** en  
## Description:  
There is a limit on the BigQuery Export. If the daily export exceed 1 million events, it is paused. Learn more in the <a href="https://support.google.com/analytics/answer/9823238">documentation on BigQuery Export</a>. The limit is substantially higher for the 360 properties (more information can be found in the <a href="https://support.google.com/analytics/answer/11202874">official documentation</a>.  
## Constants:  
### dailyExportLimit
**type:** number  
**description:** Daily limit for BigQuery Export for free GA properties  
**example:** 1000000  
## Blocks:  
### 1 - warn
**description:** Evaluate daily limit  
**score:** 80  
**pass message:** Estimated daily hits within export the limit of ${(dailyExportLimit/1000000).toFixed(2)} million hits daily.  
**fail message:** The estimated daily hits in UA property exceed the limit of ${(dailyExportLimit/1000000).toFixed(2)} million hits daily.  
**how to fix message:** The export to BigQuery can be filtered by the event name. Check the following table to decide about the export setting.  
