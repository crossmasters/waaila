# W0250 - Bounce rate  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** assertion  
**test version:** 3  
**maximal test score:** 70  
**test language:** en  
## Description:  
Bounce rate reflects a single page session. These sessions happen when a customer visits certain page and closes it without clicking on any link or doing any action. A too low or too high bounce rate on your website or a specific web page might indicate a measurement issue.   
## Constants:  
### lowerThreshold
**type:** number  
**description:** lower bound to bounce rate in percentages  
**example:** 10  
### upperThreshold
**type:** number  
**description:** upper bound to bounce rate in percentages  
**example:** 90  
## Blocks:  
### 1 - assert
**description:** It checks if the bounce rate on any page is not between 10% and 95%, if not, this test fails.  
**score:** 70  
**pass message:** Bounce Rate is within expected bounds ${lowerThreshold} % and ${upperThreshold} %  
**fail message:** Bounce Rate is not between ${lowerThreshold} % and ${upperThreshold} %  
**how to fix message:** Following points should be checked: <br/>1.	Pageview is not duplicated <br/> 2.	Pageview is triggered after on all pages <br/> 3.	Event has correctly setup non-interaction.  
