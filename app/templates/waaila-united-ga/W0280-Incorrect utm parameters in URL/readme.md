# W0280 - Incorrect utm parameters in URL  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** check  
**test version:** 5  
**maximal test score:** 80  
**test language:** en  
## Description:  
UTM parameters are important for marketing campaign identification. If there are any parameters that start with utm_ but are different from utm_source, utm_medium, utm_campaign, utm_term and utm_content, it needs to be checked as it indicates an issue in measurement.  
## Constants:  
### nrPagesDisplayed
**type:** number  
**description:** number of example pagepaths displayed  
**example:** 10  
## Blocks:  
### 1 - warn
**description:** Loads data and checks for presence of data for pageviews by page path  
**score:** 0  
### 2 - assert
**description:** It checks if Pages dimension contains the “utm_”, but none of the following follows: source|medium|campaign|term|content.  
**score:** 80  
**pass message:** No pages were found that contain utm_ but not in combination with source, medium, campaign, term or content.  
**fail message:** Pages were found that contain only utm_ (it does not contain source|medium|campaign|term|content).  
**how to fix message:** It needs to be checked if syntax of URL is correct, there should be question marks used to separate query parameters or hash. Exclude parameters in view settings, type them in field „Strip out URL query parameters“ separated by comma.  
**table displayed in case of failure:** Sample pagePaths with incorrect utm parameters (${actualPageLength}/${lengthAddInfo}${filteredPageLength})  
