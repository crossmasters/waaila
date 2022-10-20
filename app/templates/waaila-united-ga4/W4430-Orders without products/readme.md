# W4430 - Orders without products  
## Main info:  
**created at:** 2022-10-20T12:24:09.9466838Z  
**test type:** assertion  
**test version:** 4  
**maximal test score:** 150  
**test language:** en  
## Description:  
There might appear some empty orders in GA. To avoid empty orders, it will help to reflect anomalies that users have during their ordering process. Without it, the website will not make any difference between an order with products, and empty orders.  
## Blocks:  
### 1 - assert
**description:** Test checks orders, if some empty order is found, it fails.  
**score:** 150  
**pass message:** There are no orders without products.  
**fail message:** Orders without products were found.  
**how to fix message:** Shows table with Ids of orders that has been detected as empty.  
**table displayed in case of failure:** Sample of up to 10 orders without products  
