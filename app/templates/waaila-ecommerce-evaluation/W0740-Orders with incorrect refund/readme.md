# W0740 - Orders with incorrect refund  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** check  
**test version:** 4  
**maximal test score:** 100  
**test language:** en  
## Description:  
When a refund must be performed on your website, the user wishes to receive the correct amount back. Refund must be equal either to your Transaction revenue or to your Product revenue. An incorrect refund can mean a decrease of ROI.  
## Constants:  
### permittedRefundDeviation
**type:** number  
**description:** level above which deviations are considered to be incorrect and not due to rounding of numbers  
**example:** 1.5  
## Blocks:  
### 1 - warn
**description:** Loads data and checks for presence of refund data  
**score:** 0  
### 2 - assert
**description:** Test checks, if refund amount is equal to value of product revenue/total revenue. If not, it fails.  
**score:** 100  
**pass message:** No transactions with incorrect refund amount were found (refund amount is equal to value of product revenue/total revenue).  
**fail message:** Transactions with incorrect refund amount were found.  
**how to fix message:** Check the correctness of the refund measurement.  
**description of table displayed in case of failure:** Sample of up to 10 invalid transactions  
