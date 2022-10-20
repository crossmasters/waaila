(results, waaila) => {
    const invalidTransactions = waaila.functions.normalizeGaResult(results);
    const invalidTransactionsSummary = waaila.functions.summarizeGaResult(results);
    
    /**
    * @assert 1 - The test will detect the faulty transactions, which is when one transactionID is associated with multiple transactions 
    * @score 150
    */
    const totalInvalidTransactions = +invalidTransactionsSummary['transactions']['total']; 
    var assert_fail_message_insert = '';
    if (totalInvalidTransactions == 1000) {
        assert_fail_message_insert = ' more than';   
    }
    const assert_pass_message = 'Every transaction ID corresponds to a single transaction.';
    const assert_fail_message = `Duplicate transactions detected in${assert_fail_message_insert} ${totalInvalidTransactions} of transactions`;
    const assert_fail_howtofix = 'If the percentage of duplicate transactions is high, check if information is sent only on purchase page.';
    const assert_fail_tabledescribe = 'Sample of up to 10 invalid transactions:';
    waaila.assert(totalInvalidTransactions == 0, 150)
        .pass.message(assert_pass_message).fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' 
            + assert_fail_howtofix + '<br/><br/> ').table(invalidTransactions.head(10));
}