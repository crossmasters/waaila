# W0310 - Payment gates as a source of traffic  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** check  
**test version:** 3  
**maximal test score:** 100  
**test language:** en  
## Description:  
Once the payment has been through for a user, the redirection to the webpage cannot be counted as a new source of visit (session) because it is the same user that made the purchase and it would cut the session and bias the data.   
## Blocks:  
### 1 - warn
**description:** Loads data and checks for presence of sessions by source  
**score:** 0  
**fail message:** No data returned for sessions by source  
### 2 - assert
**description:** The test compares the source of referral to a list of known payment gates. If there is a match, it fails.  
**score:** 100  
**pass message:** There are no known payment gates among the sources of traffic  
**fail message:** Payment gates are source of traffic  
**how to fix message:** All known payment gates should be excluded using „referral exclusion list“ on property level or by GTM.  
