# W0340 - Pointless or suspicious traffic from another country  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** info  
**test version:** 2  
**maximal test score:** 0  
**test language:** en  
## Description:  
Ensure that the majority of sessions are made using the hostname corresponding to the country.  If there is a high amount of sessions that was generated in a country (e.g. United States) to a hostname other than US (e.g. Poland), it indicates a suspicious traffic on the said hostname, and thus, an anomaly to observe in more detail.     
## Blocks:  
### 1 - info
**description:** Checks largest source countries of the traffic  
**score:** 0  
