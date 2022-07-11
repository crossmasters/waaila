# W2130 - Correct generation of CID (client ID)  
## Main info:  
**created at:** 2021-01-06T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 150  
**test language:** en  
## Description:  
There must be significantly more visits than visitors. If it doesn't hold, it means that the number of unique visitors entering the website via a given browser is greater than the number of visits to your website. This shows there might be a technical problem and requires a deeper analysis.   
## Constants:  
### visitRatioThreshold
**type:** number  
**description:** minimal expected share of number of visits to number of visitors  
**example:** 1.05  
### excludedDevicesArray
**type:** array  
**description:** devices listed in this array are excluded from the comparison, use empty list for no exclusion  
**example:** "['N/A']"  
## Blocks:  
### 1 - assert
**description:** It compares the number of visitors on the website to the amount of visits generated. The total amount of visits should be higher than the total number of visitors. If the ratio is below 1.05, the test fails.  
**score:** 150  
**pass message:** The total amount of visits is higher than the total number of visitors - average visits per visitor is ${Math.round(totalRatio\*10000)/10000}  
**fail message:** There is an unusually low number of visitors compared to visits for some devices: ${selectedDeviceArrayJoined} (the share of visitors to visits is below the threshold of ${visitRatioThreshold})  
**how to fix message:** Check that pageview measurement is triggered correctly.  
**table displayed in case of failure:** Shows the table with ratios by Device type.  
