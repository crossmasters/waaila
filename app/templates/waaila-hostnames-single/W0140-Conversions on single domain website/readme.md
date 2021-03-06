# W0140 - Conversions on single domain website  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** check  
**test version:** 5  
**maximal test score:** 80  
**test language:** en  
## Description:  
In a single domain website, most of the conversions shall be aligned to only one hostname. If the conversions split among multiple hostnames, there is a potential of a badly configured google analytics. If most of the transactions do not come from the main hostname, it indicates that your users are converting using another hostname and this will result in a loss of data measured. Also, there should be minimum of conversions from other domains not belonging to the owners� websites (typically domains like: google translate, google web cache). Hostnames starting with �localhost...� are always wrong. In main view with clear data, these hostnames should be excluded.  
## Constants:  
### transactionThreshold
**type:** number  
**description:** share of transactions on the main domain should be above this threshold   
**example:** 0.98  
### nrHostnamesDisplayed
**type:** number  
**description:** maximum number of largest hostnames displayed in case of failure   
**example:** 10  
## Blocks:  
### 1 - warn
**description:** Loads data and checks for presence of data for transactions by hostname  
**score:** 0  
### 2 - assert
**description:** Evaluates the total of the transactions made and reports about the amount of transactions generated by each hostname to see the hostname detaining the most transactions among your websites.  
**score:** 80  
**pass message:** Ratio of transactions on the most frequent hostname  (${hostName}) to all transactions is higher than ${transactionThreshold\*100} %  
**fail message:** Ratio of transactions on the most frequent hostname  (${hostName}) to all transactions is not higher than ${transactionThreshold\*100} %  
**how to fix message:** Check if there is some filter for inclusion of hostnames applied, if not, create one. It should be include filter with defined main hostname.  
**table displayed in case of failure:** Sample of largest hostnames (${Math.min(nrHostnamesDisplayed, hostnamesLength)} / ${hostnamesLength})  
