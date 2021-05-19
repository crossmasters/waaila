# W0240 - GA parameters in URL  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** assertion  
**test version:** 6  
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
**description:** It checks if Pages dimension contains the “utm”, “fbclid” or “gclid”  parameters, in order to remove them.  
**score:** 80  
**pass message:** No pages were found that contain utm, fclid or gclid  
**fail message:** Pages were found that contain utm, fclid or gclid  
**how to fix message:** It needs to be checked if syntax of URL is correct, there should be question marks used to separate query parameters or hash. Exclude parameters in view settings, type them in field „Strip out URL query parameters“ separated by comma.  
**table displayed in case of failure:** Example of pages with utm, fclid or gclid (${actualPageLength}/${lengthAddInfo}${filteredPageLength})  
