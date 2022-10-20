# W4510 - Default GA4 events  
## Main info:  
**created at:** 2022-10-20T12:43:34.6087224Z  
**test type:** assertion  
**test version:** 3  
**maximal test score:** 100  
**test language:** en  
## Description:  
Check that default GA4 events are measured.  
## Constants:  
### includedEventLists
**type:** array  
**description:** list of all types of events that should be included in the event check  
**example:** "[\"default_web\"]"  
## Blocks:  
### 1 - assert
**description:** Check if all default events are measured.  
**score:** 100  
**pass message:** All default events are measured.  
**fail message:** Some default events are not measured. <br> For further information about the default GA4 events see <a href=https://support.google.com/analytics/answer/9322688?hl=en&ref_topic=9756175 target=_blank>official documentation</a>  
