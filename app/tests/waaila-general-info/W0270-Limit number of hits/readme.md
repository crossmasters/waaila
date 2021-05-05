# W0270 - Limit number of hits 
## Main info: 
**created at:** 2020-06-01T00:00:00 
**test type:** check 
**test version:** 3 
**maximal test score:** 70 
**test language:** en 
## Description: 
Free version of google analytics has a limit on number of hits it can collect. Ingesting more than 10 million hits a month per property has impact on how your data are processed and stored.  Also, measurement will be slow and larger sampling errors will appear than before. In worst case it might even happen that Google is going to delete your property. This however happens rarely and only if you ingest a lot more hits than this limit. More likely you will receive emails from Google Sales to think about a paid solution of Google Analytics 360.  
## Further information: 
This test is mainly helpful for users that do not have GA 360 already.
## Constants: 
### warnThreshold
**type:** number 
**description:** above 10 million hits free GA are not functioning optimally 
**example:** 10000000 
### failThreshold
**type:** number 
**description:** hits very high above 10 millions increase the risk to have free GA property deleted 
**example:** 20000000 
## Blocks: 
### 1 - assert
**description:** If more than failThreshold (20 millions) of hits for last 28 days was measured, the test fails. 
**score:** 40 
**fail message:** The limit of ${failThreshold/1000000} million hits was reached, actual number is: ${totalHitsMillions} millions 
**how to fix message:** Consider upgrading to Google Analytics 360. 
### 2 - warn
**description:** If more than warnThreshold (10 millions) of hits for last 28 days was measured, test shows warning. 
**score:** 30 
**pass message:** The number of hits is: ${totalHitsMillions} millions 
**fail message:** The limit of ${warnThreshold/1000000} million hits was reached, actual number is: ${totalHitsMillions} millions 
**how to fix message:** If the traffic on your site is increasing, you may need to consider future upgrade to Google Analytics 360. 
