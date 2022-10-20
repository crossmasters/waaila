# W4251 - Session to user ratio  
## Main info:  
**created at:** 2022-10-19T15:17:02.6211645Z  
**test type:** assertion  
**test version:** 11  
**maximal test score:** 150  
**test language:** en  
## Description:  
There must be significantly more sessions than users. If it doesn't hold, it means that the number of unique visitors entering the website via a given browser is greater than the number of visits to your website. This shows there might be a technical problem and requires a deeper analysis.  
## Constants:  
### sessionUserThreshold
**type:** number  
**description:** minimal expected share of number of sessions to number of users  
**example:** 1.05  
## Blocks:  
### 1 - assert
**description:** It compares the number of users on the website to the amount of sessions generated. The total amount of sessions should be higher than the total number of users. If the ratio is below the sessionUserThreshold, the test fails.  
**score:** 150  
**pass message:** The total amount of sessions is higher than the total number of users - average Sessions per User is ${Math.round(totalRatio\*10000)/10000}  
**fail message:** There is an unusually low number of users compared to visits for some devices: ${selectedDeviceArrayJoined} (the share of sessions to users is below the threshold of ${sessionUserThreshold})  
**how to fix message:** Check that pageview measurement is triggered correctly.  
**table displayed in case of failure:** Table with ratios by device type  
