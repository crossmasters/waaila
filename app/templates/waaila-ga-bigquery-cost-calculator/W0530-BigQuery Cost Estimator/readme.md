# W0530 - BigQuery Cost Estimator  
## Main info:  
**created at:** 2021-05-19T16:00:00  
**test type:** info  
**test version:** 2  
**maximal test score:** 0  
**test language:** en  
## Description:  
The price of BigQuery export can be calculated based on the traffic and storage volume. The price depends on the location of the resource. Default values are provided for location EU (multi-region), for different locations values can be found on https://cloud.google.com/bigquery/pricing.  
## Constants:  
### priceConfig
**type:** object  
**description:** Settings of the prices for Big Query price calculation  
**example:** "{queries: {unitPrice: 5,freeUnits: 1}, activeStorage: {unitPrice: 0.02,freeUnits: 10}, longTermStorage: {unitPrice: 0.01,freeUnits: 10}, streaming: {unitPrice: 0.01/200,freeUnits: 0}}"  
### expectedQueryUnits
**type:** number  
**description:** Expected amount of queries in TiB units  
**example:** 3  
### expectedHitSize
**type:** number  
**description:** Expected size of hits in kiB units  
**example:** 2  
## Blocks:  
### 1 - info
**description:** Calculate the estimated monthly price for Big Query export  
**score:** 0  
