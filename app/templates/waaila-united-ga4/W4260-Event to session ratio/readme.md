# W4260 - Event to session ratio  
## Main info:  
**created at:** 2022-10-20T08:14:04.0776762Z  
**test type:** assertion  
**test version:** 7  
**maximal test score:** 150  
**test language:** en  
## Description:  
There must be significantly more events than sessions. If it doesn't hold, it means that the number of sessions created by users entering the website via a given browser does not correspond to the number of events to your website. This shows there might be a technical problem and requires a deeper analysis.  
## Constants:  
### eventSessionThreshold
**type:** number  
**description:** minimal expected share of number of events to number of sessions  
**example:** 1.05  
## Blocks:  
### 1 - assert
**description:** It compares the amount of events on the website to the amount of sessions generated. The total amount of events should be higher than the total amount of sessions. If the ratio is below the eventSessionThreshold, the test fails.  
**score:** 150  
**pass message:** The total amount of events is higher than the total amount of sessuibs - average Event per Session ratio is ${Math.round(totalRatio\*10000)/10000}  
**fail message:** There is an unusually low number of sessions compared to events for some devices: ${selectedDeviceArrayJoined} (the share of events to sessions is below the threshold of ${eventSessionThreshold})  
**how to fix message:** Check that pageview measurement is triggered correctly.  
**table displayed in case of failure:** Table with ratios by device type  
