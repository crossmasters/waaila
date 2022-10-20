# W4230 - GET parameters - detail  
## Main info:  
**created at:** 2022-10-19T14:48:42.4331182Z  
**test type:** info  
**test version:** 4  
**maximal test score:** 0  
**test language:** en  
## Description:  
GET parameters are used when performing HTTP request via a browser. Without them, it is not possible to see if your parameters are correctly set to track your website, or to see how users are moving on the website. Allowing dynamics URLs, the overview of those parameters is allowing you to know the parameters used in your URLs for you to exclude according to your objectives. That will help to reduce granularity of pages in GA reports.  
## Constants:  
### minParameterPageViews
**type:** number  
**description:** minimum amount of page views with given parameter to include the parameter in report  
**example:** 100  
### maxNrSamplePaths
**type:** number  
**description:** maximum number of unique paths without parameters displayed for each parameter  
**example:** 5  
### maxNrDisplayedValues
**type:** number  
**description:** maximum number of displayed unique values for each parameter  
**example:** 10  
## Blocks:  
### 1 - info
**description:** Tables with samples of paths for the parameters found and their frequency (page views)  
**score:** 0  
