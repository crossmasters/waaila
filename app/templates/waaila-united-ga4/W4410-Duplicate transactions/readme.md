# W4410 - Duplicate transactions  
## Main info:  
**created at:** 2022-10-20T12:10:55.4163418Z  
**test type:** assertion  
**test version:** 3  
**maximal test score:** 150  
**test language:** en  
## Description:  
If duplicate transactions are in your data, the same data will be evaluated more than once and bias your measurement. The transactionID must be unique for every transaction made on website.

  
## Blocks:  
### 1 - assert
**description:** The test will detect the faulty transactions, which is when one transactionID is associated with multiple transactions   
**score:** 150  
**pass message:** Every transaction ID corresponds to a single transaction.  
**fail message:** Duplicate transactions detected in${assert_fail_message_insert} ${totalInvalidTransactions} of transactions  
**how to fix message:** If the percentage of duplicate transactions is high, check if information is sent only on purchase page.  
**table displayed in case of failure:** Sample of up to 10 invalid transactions  
