# W2110 - Number of visits for the past 28 days  
## Main info:  
**created at:** 2021-01-06T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 100  
**test language:** en  
## Description:  
Analysis of the traffic created over the past month can be compared to the previous reports to reflect trends and improve the website. A result of 0 visits created over the past month indicates a technical issue or a faulty measurement of the data.   
## Blocks:  
### 1 - assert
**description:** It checks if there are any visits in the last week, if not, this test fails.  
**score:** 100  
**pass message:** There were ${totalVisits} sessions.  
**fail message:** No visits we found.  
**how to fix message:** Check, if the ATI measurement is set up correctly on your website.  
