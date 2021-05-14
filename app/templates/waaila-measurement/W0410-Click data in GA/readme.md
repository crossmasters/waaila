# W0410 - Click data in GA  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** warning  
**test version:** 5  
**maximal test score:** 80  
**test language:** en  
## Description:  
Every click is evaluated to measure the intensiveness of the usage of the Ads (cpc). If no clicks are recorded in Google Analytics, it can indicate that Google Ads is not connected to Google Analytics, or that a technical issue is occurring within your website.   
## Constants:  
### maxRatioDiff
**type:** number  
**description:** the difference between the number of ad clicks and sessions is expected to be smaller than maxRatioDiff\*100 % of the number of sessions  
**example:** 0.1  
## Blocks:  
### 1 - warn
**description:** Checks if there are some click data in GA. If not, warning is displayed.  
**score:** 40  
**pass message:** Click data is measured.  
**fail message:** No click data found.  
**how to fix message:** Check if Google Ads accounts are connected to this view. If not, it needs to be set up.  
### 2 - warn
**description:** If there are clicks, check their ratio to sessions. It should be close to 1, otherwise a warning is displayed.  
**score:** 40  
**pass message:** Click data corresponds to sessions data.  
**fail message:** Click data does not correspond to sessions data: the number of clicks is ${Math.round(clicksSessionsRatio\*10000)/100} % of the number of sessions  
**how to fix message:** Check if there has been no change in Google Ads accounts connection to this view recently.  
