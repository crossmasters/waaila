# W3020 - GA Views evaluation  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** warning  
**test version:** 3  
**maximal test score:** 60  
**test language:** en  
## Description:  
Google Analytics properties contain views of the data. The views' information needs to be evaluated to ensure that the tracking is set appropriately.  
## Constants:  
### expectedProfileTypes
**type:** array  
**description:** Set of main view types that are expected to be present, this can be extended based on client needs, eg. backup, bckp, test,...  
**example:** "['master', 'raw']"  
## Blocks:  
### 1 - warn
**description:** Prepares data and checks presence of expected profile types  
**score:** 20  
**pass message:** All expected profile types (${expectedProfileTypesJoined}) are present.  
**fail message:** Some of the expected types are missing: ${missingProfileTypesJoined}  
### 2 - warn
**description:** Checks if bot filtering is enabled  
**score:** 20  
**pass message:** Bot filtering is enabled on all views.  
**fail message:** Bot filtering not enabled at least on one of the views.  
### 3 - warn
**description:** Checks if there is any view with website that has no protocol  
**score:** 20  
**pass message:** All views have websites with protocol defined.  
**fail message:** For at least one of the views the website URLs has no protocol.  
