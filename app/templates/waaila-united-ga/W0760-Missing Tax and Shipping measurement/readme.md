# W0760 - Missing Tax and Shipping measurement  
## Main info:  
**created at:** 2020-04-04T00:00:00  
**test type:** warning  
**test version:** 3  
**maximal test score:** 100  
**test language:** en  
## Description:  
It is good to measure tax and shipping in order to have complete view on ecommerce dimensions.  
## Blocks:  
### 1 - warn
**description:** Test checks if the sum of taxes across all transactions is not zero, if it is, it shows message.  
**score:** 50  
**pass message:** Taxes are measured.  
**fail message:** Taxes are not measured.  
### 2 - warn
**description:** Test checks if the sum of shipping across all transactions is not zero, if it is, it shows message.  
**score:** 50  
**pass message:** Shipping is measured.  
**fail message:** Shipping is not measured.  
