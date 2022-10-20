# W0350 - Referrals  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 100  
**test language:** en  
## Description:  
Measured data on referrals provide a way to monitor traffic pointed to your website and to investigate whether the traffic is healthy. This tests verify that: </br>1) there is no significant referral yesterday which was not present the previous day, </br>2) sessions from none of the referrals have increased significantly yesterday.  
## Constants:  
### minimalCurrentSessionsUnexpected
**type:** number  
**description:** referrals included in check for unexpected referrals if they have more sessions  
**example:** 20  
### minimalPreviousSessionsIncrease
**type:** number  
**description:** referrals included in check for increase if they previously had more sessions  
**example:** 20  
### maximalAllowedPercIncrease
**type:** number  
**description:** percentage increase of sessions above this parameter is marked as significant unexpected increase  
**example:** 50  
## Blocks:  
### 1 - assert
**description:** There is no unexpected large source not present before  
**score:** 50  
**pass message:** No unexpected referrals yesterday with more than ${minimalCurrentSessionsUnexpected} sessions  
**fail message:** There are some unexpected referrals yesterday with more than ${minimalCurrentSessionsUnexpected} sessions  
### 2 - assert
**description:** There is no unexpected increase in any of the existing sources  
**score:** 50  
**pass message:** No referrals increased significantly yesterday compared to previous period.  
**fail message:** Some referrals increased by more than ${maximalAllowedPercIncrease} percent yesterday compared to previous period.  
