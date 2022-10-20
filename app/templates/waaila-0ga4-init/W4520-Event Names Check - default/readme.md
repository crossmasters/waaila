# W4520 - Event Names Check - default  
## Main info:  
**created at:** 2022-10-20T12:44:41.6096451Z  
**test type:** assertion  
**test version:** 4  
**maximal test score:** 100  
**test language:** en  
## Description:  
Check that event names follow required criteria.  
## Constants:  
### minRelevantEvents
**type:** number  
**description:** minimum number of events to include for the check (to display all, set to 0)  
**example:** 100  
## Blocks:  
### 1 - assert
**description:** Check if event names contain capital letters  
**score:** 50  
**pass message:** No event names with capital letters.  
**fail message:** There are event names with capital letters  
### 2 - assert
**description:** Check if event names contain other symbols than letters and underscore  
**score:** 50  
**pass message:** No event names with other symbols than letters and underscore.  
**fail message:** There are event names with other symbols than letters and underscore  
