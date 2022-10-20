# W4160 - Own domain as source of traffic  
## Main info:  
**created at:** 2022-05-04T13:50:07.6469279Z  
**test type:** assertion  
**test version:** 4  
**maximal test score:** 100  
**test language:** en  
## Description:  
Own domain should not cover more than 5% of traffic in dimension Source. Sometimes it might happen that own domain is listed as a source of traffic. This happens typically during reload at the end of session (e.g. sessions through opened tabs). Session would then have source/medium own domain instead of direct/none and it would overwrite key source of traffic (e.g. paid campaign).  
## Constants:  
### sessionShareThreshold
**type:** number  
**description:** maximum share of own domain allowed among sources  
**example:** 0.05  
### ownHostnames
**type:** array  
**description:** list of own hostnames that should not be among the referrals  
**example:** "[]"  
## Blocks:  
### 1 - assert
**description:** If there is any session coming from the hostname with the highest number of sessions, the test fails.  
**score:** 100  
**pass message:** Own domains are not sources of traffic (share of sessions is below ${sessionShareThreshold\*100} %)  
**fail message:** Some own domains are sources of traffic (share of sessions above ${sessionShareThreshold\*100} %)  
**how to fix message:** Own domain should be excluded using „referral exclusion list“ on property level.  
