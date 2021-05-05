# W0130 - Expected Domains 
## Main info: 
**created at:** 2020-06-01T00:00:00 
**test type:** assertion 
**test version:** 5 
**maximal test score:** 120 
**test language:** en 
## Description: 
For multiple domains website, it is possible that sometimes there will appear domains which are not wanted to be covered in measurement. This test checks if there are any unexpected and generally unwanted hostnames. The test needs to be configured by listing domains that are allowed and that are required to be measured in data. 
## Further information: 
This test depends on your insertion of acceptible values of hostnames in the data. For the first part of the test you need to input list of hostnames that need to appear always in your data (the parameter necessaryDomainsArray). For the second part of the test you need to add hostnames which are permitted to appear in your data. You do this by constructing the permittedDomainsArray parameter which needs to contain all the values from the necessaryDomainsArray and in addition the values of hostnames that are additionally allowed to appear.
You can run the test first with the default parameters. When running with the default parameters, you can disregard the first part which will inform you that 'main-domain.com' and 'other-domain.com' are missing in your data. The second part will provide you with an overview of all hostnames currently measured in your data. Use this overview by copying the values into both parameters to configure test for your case.
## Constants: 
### necessaryDomainsArray
**type:** array 
**description:** list of domains that are required to be present in the data 
**example:** ["main-domain.com", "other-domain.com"] 
### permittedDomainsArray
**type:** array 
**description:** list of all domains that are allowed to be present in the data 
**example:** ["main-domain.com", "other-domain.com", "N/A"] 
## Blocks: 
### 1 - assert
**description:** Check that none of the necessary domains disappeared. 
**score:** 60 
**pass message:** No necessary domains are missing in the data. 
**fail message:** There are some necessary domains that are missing in the data: ${missingDomainsArrayMessage} 
### 2 - assert
**description:** Check that there is no unexpected domain included. 
**score:** 60 
**pass message:** No unexpected domains are measured in the data. 
**fail message:** There are some sessions on unexpected domains 
