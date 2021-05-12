# W4010 - Number of sessions for the past 28 days  
## Main info:  
**created at:** 2021-03-01T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 100  
**test language:** en  
## Description:  
Analysis of the traffic created over the past month can be compared to the previous reports to reflect trends and improve the website. A result of 0 sessions created over the past month indicates a technical issue or a faulty measurement of the data.   
## Blocks:  
### 1 - assert
**description:** Check if there are any sessions in the last 28 days  
**score:** 100  
**pass message:** There were ${totalSessions} sessions.  
**fail message:** No sessions were found.  
**how to fix message:** Check, if the GA code is triggered on the website.  
