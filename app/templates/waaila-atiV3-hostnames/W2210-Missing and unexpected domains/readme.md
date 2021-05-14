# W2210 - Missing and unexpected domains  
## Main info:  
**created at:** 2021-01-06T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 100  
**test language:** en  
## Description:  
Compare measured domains to lists of expected domains. There are domains that should be always present in the data and there are domains that can be present in the data. We check data measured yesterday to verify that <br> 1) none of the necessary domains disappeared, <br> 2) there is no unexpected domain included. <br> This test needs to be configured. Run the test once to observe your output and adjust the test.  
## Constants:  
### necessaryDomainsArray
**type:** array  
**description:** list of domains that are required to be present in the data  
**example:** ["main-domain.com", "other-domain.com"]  
### permittedDomainsArray
**type:** array  
**description:** list of all domains that are allowed to be present in the data (N/A denotes undefined value)  
**example:** ["main-domain.com", "other-domain.com", "N/A"]  
## Blocks:  
### 1 - assert
**description:** Check that none of the necessary domains disappeared.  
**score:** 50  
**pass message:** No necessary domains are missing in the data yesterday.  
**fail message:** There are some necessary domains that are missing in the data yesterday: ${missingDomainsArrayJoined}  
### 2 - assert
**description:** Check that there is no unexpected domain included.  
**score:** 50  
**pass message:** There are no visits yesterday on unexpected domains.  
**fail message:** There are some visits yesterday on unexpected domains.  
