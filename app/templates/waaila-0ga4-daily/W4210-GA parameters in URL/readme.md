# W4210 - GA parameters in URL  
## Main info:  
**created at:** 2022-04-27T07:04:56.3065406Z  
**test type:** assertion  
**test version:** 3  
**maximal test score:** 80  
**test language:** en  
## Description:  
To reduce the length of the URL and to avoid duplicate data, Pageviews dimension page should not contain “utm”, “fbclid” or “gclid” (Facebook click ID, Google Click ID) because they are already automatically separated account and they are used in separate dimensions.   
## Constants:  
### nrPagesDisplayed
**type:** number  
**description:** maximum number of pages with most pageviews displayed in case of failure  
**example:** 10  
## Blocks:  
### 1 - assert
**description:** It checks if Pages dimension contains the “utm”, “fbclid”, “gclid”, “sznclid” or “msclkid”  parameters, in order to remove them.  
**score:** 80  
**pass message:** No pages were found that contain utm, fclid, gclid, sznclid or msclkid  
**fail message:** Pages were found that contain utm or some ID parameter  
**table displayed in case of failure:** Example of pages with utm, fclid, gclid, sznclid or msclkid (${actualPageLength}/${lengthAddInfo}${filteredPageLength})  
