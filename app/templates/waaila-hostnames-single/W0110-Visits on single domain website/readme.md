# W0110 - Visits on single domain website  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** check  
**test version:** 5  
**maximal test score:** 80  
**test language:** en  
## Description:  
In a single domain website, most of the traffic shall be aligned to only one hostname. If the traffic splits among multiple hostnames, there is a potential of a badly configured google analytics. Also, there should be minimum of traffic from other hostnames not belonging to owners’ website (typically hostnames like: google translate, google web cache). Hostnames starting with „localhost..“ are always wrong. In main view with clear data, these hostnames should be excluded.  
## Constants:  
### sessionThreshold
**type:** number  
**description:** share of sessions on the main domain should be above this threshold   
**example:** 0.98  
### nrHostnamesDisplayed
**type:** number  
**description:** maximum number of largest hostnames displayed in case of failure   
**example:** 10  
## Blocks:  
### 1 - warn
**description:** Loads data and checks for presence of data for sessions by hostname  
**score:** 0  
**fail message:** No data returned for sessions by hostname.  
### 2 - assert
**description:** It checks if the largest hostname has more than ${sessionThreshold} \*100 % of all visits. Largest hostnames displayed in case of assert failure, based on ${nrHostnamesDisplayed} parameter  
**score:** 80  
**pass message:** Ratio of traffic on the most frequent hostname (${hostName}) to all traffic is higher than ${sessionThreshold\*100} %  
**fail message:** Ratio of traffic on the most frequent hostname  (${hostName}) to all traffic is not higher than ${sessionThreshold\*100} %  
**how to fix message:** Check if there is some filter for inclusion of hostnames applied, if not, create one. It should be an include filter with defined main hostname.  
**description of table displayed in case of failure:** Sample of largest hostnames (${Math.min(nrHostnamesDisplayed, hostnamesLength)} / ${hostnamesLength})  
