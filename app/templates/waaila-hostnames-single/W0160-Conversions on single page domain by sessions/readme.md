# W0160 - Conversions on single page domain by sessions  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** check  
**test version:** 5  
**maximal test score:** 80  
**test language:** en  
## Description:  
In a single domain website, most of the sessions shall be aligned to only one hostname. This hostname should have not only most of the sessions but also most of the conversions.  
## Constants:  
### sessionThreshold
**type:** number  
**description:** share of transactions on the main domain should be above this threshold   
**example:** 0.98  
### nrHostnamesDisplayed
**type:** number  
**description:** maximum number of largest hostnames displayed in case of failure   
**example:** 10  
## Blocks:  
### 1 - warn
**description:** It checks presence of transaction data  
**score:** 0  
### 2 - assert
**description:** Evaluates the total of the transactions and reports about the amount of sessions transactions by each hostname to see the hostname detaining the most transactions among your websites.  
**score:** 80  
**pass message:** Ratio of transactions on the most visited hostname  (${hostName}) to all transactions is higher than ${transactionThreshold\*100} %  
**fail message:** Ratio of transactions on the most visited hostname  (${hostName}) to all transactions is not higher than ${transactionThreshold\*100} %  
**how to fix message:** Check if there is some filter for inclusion of hostnames applied, if not, create one. It should be include filter with defined main hostname.  
**description of table displayed in case of failure:** Sample of largest hostnames (${Math.min(nrHostnamesDisplayed, hostnamesLength)} / ${hostnamesLength} )  
