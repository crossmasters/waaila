# W0150 - Conversions on multi page domain by transactions  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** assertion  
**test version:** 3  
**maximal test score:** 80  
**test language:** en  
## Description:  
In a multi domain website, it is usual that conversions are divided to more than one hostname. But there should be minimal amount of transactions from other domains not belonging to owners’ websites (typically domains like: google translate, google web cache). Hostnames starting with „localhost..“ are always wrong. In main view with clear data, these hostnames should be excluded.  
## Blocks:  
### 1 - assert
**description:** Checks if there are hostnames containing localhost/google.translate/google.we.cache  
**score:** 80  
**pass message:** There are no hostnames containing localhost/google.translate/google.we.cache.  
**fail message:** There is hostname containing localhost/google.translate/google.we.cache.  
**how to fix message:** Check if there is some filter for exclusion of hostnames applied, if not, create one. It should be exclude filter with defined hostnames you want to filter out.  
