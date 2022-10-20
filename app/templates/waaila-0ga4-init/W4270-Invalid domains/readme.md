# W4270 - Invalid domains  
## Main info:  
**created at:** 2022-10-20T08:39:12.6875799Z  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 80  
**test language:** en  
## Description:  
In a multi domain website, traffic is expected to be split into more hostnames. But there should be minimal amount of traffic from other domains not belonging to owners’ websites (typically domains like: google translate, google web cache). Hostnames starting with „localhost..“ are always wrong. In main view with clear data, these hostnames should be excluded.  
## Blocks:  
### 1 - assert
**description:** It checks if there are hostnames containing localhost/google.translate/google.web.cache  
**score:** 80  
**pass message:** There are no hostnames containing localhost/google.translate/google.we.cache.  
**fail message:** There is some hostname containing localhost/google.translate/google.we.cache.  
**how to fix message:** Check if there is some filter for exclusion of hostnames applied, if not, create one. It should be an exclude filter with defined hostnames you want to filter out.  
