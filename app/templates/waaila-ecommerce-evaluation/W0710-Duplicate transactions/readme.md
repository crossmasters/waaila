# W0710 - Duplicate transactions  
## Main info:  
**created at:** 2020-06-01T00:00:00  
**test type:** check  
**test version:** 5  
**maximal test score:** 150  
**test language:** en  
## Description:  
If duplicate transactions are in your data, the same data will be evaluated more than once and bias your measurement. The transactionID must be unique for every transaction made on website.   
## Blocks:  
### 1 - warn
**description:** Loads data and checks for presence of transaction data  
**score:** 0  
### 2 - assert
**description:** The test will detect the faulty transactions, which is when one transactionID is associated with multiple transactions   
**score:** 150  
**pass message:** Every transaction ID corresponds to a single transaction.  
**fail message:** Duplicate transactions detected in${assert_fail_message_insert} ${Math.round(totalInvalidTransactions/totalTransactions\*10000)/100} % of all transactions  
**how to fix message:** If the percentage of duplicate transactions is high, check if information is sent only on purchase page.  
**table displayed in case of failure:** Sample of up to 10 invalid transactions  
