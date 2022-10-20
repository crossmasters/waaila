# W4060 - Engaged session ratio (bounce rate)  
## Main info:  
**created at:** 2022-10-20T12:55:40.7100751Z  
**test type:** assertion  
**test version:** 7  
**maximal test score:** 70  
**test language:** en  
## Description:  
Bounce rate, the reverse of engagement rate, reflects a single page session. These sessions happen when a customer visits certain page and closes it without clicking on any link or doing any action. A too low or too high bounce rate on your website or a specific web page might indicate a measurement issue.  
## Constants:  
### lowerThreshold
**type:** number  
**description:** lower bound to engagement rate in percentages  
**example:** 45  
### upperThreshold
**type:** number  
**description:** upper bound to engagement rate in percentages  
**example:** 85  
## Blocks:  
### 1 - assert
**description:** It checks if the engagement rate on any page is not between 10% and 95%, if not, this test fails.  
**score:** 70  
**pass message:** Engagement rate is within expected bounds ${lowerThreshold} % and ${upperThreshold} %  
**fail message:** Engagement rate is not between ${lowerThreshold} % and ${upperThreshold} % (actual value is ${(totalEngagementRate\*100).toFixed(2)} %)  
**how to fix message:** Following points should be checked: <br/>1.	Pageview is not duplicated <br/> 2.	Pageview is triggered after on all pages <br/> 3.	Event has correctly setup non-interaction.  
