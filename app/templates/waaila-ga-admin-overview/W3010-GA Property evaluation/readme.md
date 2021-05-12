# W3010 - GA Property evaluation  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** warning  
**test version:** 2  
**maximal test score:** 60  
**test language:** en  
## Description:  
Each Google Analytics account has properties that group views of the data. The properties' information needs to be evaluated to ensure that the tracking is set appropriately.  
## Blocks:  
### 1 - warn
**description:** Prepares data and checks that there is a default view.  
**score:** 30  
**pass message:** There is a default view.  
**fail message:** There is no default view defined.  
### 2 - warn
**description:** Checks that the website URL has defined protocol.  
**score:** 30  
**pass message:** All website URLs have protocol defined.  
**fail message:** Some website URLs has no protocol.  
