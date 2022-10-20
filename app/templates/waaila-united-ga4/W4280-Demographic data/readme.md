# W4280 - Demographic data  
## Main info:  
**created at:** 2022-10-20T08:45:24.8011401Z  
**test type:** warning  
**test version:** 3  
**maximal test score:** 50  
**test language:** en  
## Description:  
The Google Analytics collects demographic data such as the gender or the age of the users with their respective proportions. The data allows you to get a representation of your online customers to better serve their need.  
## Blocks:  
### 1 - warn
**description:** It checks if demographic data are measured. If not, it shows a warning.  
**score:** 50  
**pass message:** Demographic data is measured.  
**fail message:** No demographic data found.  
**how to fix message:** Check, that demographic data measurement option is enabled in settings on property level. In other words, field Enable Demographics and Interests Reports should be turned on.  
