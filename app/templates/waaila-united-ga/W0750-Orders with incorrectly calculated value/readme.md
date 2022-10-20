# W0750 - Orders with incorrectly calculated value  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** check  
**test version:** 5  
**maximal test score:** 150  
**test language:** en  
## Description:  
It may happen that there are orders from which total revenue does not match the sum of revenue for each individual product in order. A different amount displayed for revenue and individual product revenue can indicate that a given price is not properly calculated in the subtotal of the order.   
## Constants:  
### permittedSumDeviation
**type:** number  
**description:** level above which deviations are considered to be incorrect and not due to rounding of numbers  
**example:** 1.5  
## Blocks:  
### 1 - warn
**description:** Loads data and checks for presence of transaction revenue data  
**score:** 0  
### 2 - assert
**description:** The test compares sum of revenue of products in orders and the values of the whole order. If they do not match, it fails.  
**score:** 150  
**pass message:** For all orders the sum of products in order plus tax and shipping equals to the value of whole order.  
**fail message:** There are orders, by which the sum of products in order plus tax and shipping does not equal to the value of whole order.  
**how to fix message:** First check the formula of sumDifference in the Query logic. If the calculation corresponds to expected revenue components, you need to check the measurement of order value.  
**table displayed in case of failure:** Sample of up to 20 invalid orders (up to 10 highest and up to 10 lowest differences)  
