# W0610 - Internal promotions, correct measurement of clicks and impressions  
## Main info:  
**created at:** 2020-04-04T00:00:00  
**test type:** check  
**test version:** 5  
**maximal test score:** 50  
**test language:** en  
## Description:  
It is important to measure the number of clicks and views generated in response to an internal promotion. They could be useful for customization of internal promotion spaces and page layout. If there are less impressions than clicks, it might mean that the measurement is not working.  
## Blocks:  
### 1 - warn
**description:** Test checks if there are some clicks on internal promotion banners measured. If there are no clicks measured, it shows message.  
**score:** 0  
**fail message:** No click data found.  
**how to fix message:** Check if measurement of promotion spaces is set up correctly.  
### 2 - warn
**description:** Test checks if there are some views on internal promotion banners measured. If there are no views measured, it shows message.  
**score:** 0  
**fail message:** No view data found.  
**how to fix message:** Check if measurement of promotion spaces is set up correctly.  
### 3 - assert
**description:** Test checks both impressions and clicks, if there are more clicks than impressions by some promotion banner, it fails and shows message and table.  
**score:** 50  
**pass message:** For every internal promotion the amount of impressions is higher than the amount of clicks.  
**fail message:** More clicks than impressions occurred.  
**how to fix message:** Check if measurement of promotion spaces is set up correctly.  
**table displayed in case of failure:** Sample of up to 10 internal promotions with more clicks than impressions  
