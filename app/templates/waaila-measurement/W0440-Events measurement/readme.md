# W0440 - Events measurement  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** warning  
**test version:** 4  
**maximal test score:** 70  
**test language:** en  
## Description:  
Events are tracked separately from the loading of the webpage and can be for example a user downloading a file, a newsletter sign up, and more. They can be divided into two categories. Total events track the action taken by a visitor on a file on your website every time the action is performed. Unique events track user-based action made once and not repeated (i.e. log-in for the first time on the website). If your website’s events are not analyzed, knowledge about how your visitors interacts with your content won’t be available, and some important information might be missed.  
## Blocks:  
### 1 - warn
**description:** Test measures the amount of all events to track the interaction the users have made on your website and verify that this amount is positive. If no events are found, it shows warning.  
**score:** 70  
**pass message:** Data from events is measured. Up to 30 largest event categories  
**fail message:** No data from events found.  
**how to fix message:** Consider using events measurement. They may be set up using GTM tags.  
