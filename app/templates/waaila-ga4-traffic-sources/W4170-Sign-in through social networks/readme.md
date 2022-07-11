# W4170 - Sign-in through social networks  
## Main info:  
**created at:** 2022-05-04T13:51:23.6766687Z  
**test type:** assertion  
**test version:** 1  
**maximal test score:** 100  
**test language:** en  
## Description:  
If there is an option to sign-in through social network, you have to be sure that original sources of traffic parameters are not overwritten.  
## Blocks:  
### 1 - assert
**description:** This test fails if in dimension source are „accounts.google.com“, in case of Facebook in full referrer facebook „auth“  
**score:** 100  
**pass message:** There are no sign-ins through social networks among the source of traffic.  
**fail message:** Sign-ins through social networks are source of traffic.  
**how to fix message:** Sign-ins through social networks should be excluded on „referral exclusion list“ on property level.  
**table displayed in case of failure:** Sample of up to 10 sign-ins through social networks  
