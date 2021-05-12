# W2220 - Visit change on domains  
## Main info:  
**created at:** 2021-01-06T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 100  
**test language:** en  
## Description:  
Compare measured domains and verify that every domain has similar traffic as during the same day previous week. If for any of the domains there is a large change in traffic, it could mean a measurement problem or problem with the website. The test does not verify presence of domains, only change of domains that were measured this week (check other tests). The test should be configured to exclude non-required domains.  
## Constants:  
### maxRatioChange
**type:** number  
**description:** maximal allowed increase or decrease od visits on a domain (as a ratio to visits a week ago)  
**example:** 0.4  
### excludedDomainsArray
**type:** array  
**description:** list of domains that should not excluded from the check, use empty list for no exclusion   
**example:** ["N/A", "some-other-domain.cz"]  
## Blocks:  
### 1 - assert
**description:** Checks that every non-excluded domain has similar traffic as during the same day previous week  
**score:** 100  
**pass message:** Visits have not diverged more than ${maxRatioChange\*100} % from visits week before on any included domains.  
**fail message:** Visits on some domains (${varyingDomainsJoined}) have diverged more than ${maxRatioChange\*100} % from visits week before.  
