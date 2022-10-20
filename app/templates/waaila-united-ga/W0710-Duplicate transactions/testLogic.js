(results, waaila) => {
    /**
    * @warn 1 - Loads data and checks for presence of transaction data
    * @score 0
    */
    const transactions = waaila.functions.normalizeGaResult(results['transactions'][0]);
    const transactionsSummary = waaila.functions.summarizeGaResult(results['transactions'][0]);
    const invalidTransactions = waaila.functions.normalizeGaResult(results['transactions'][1]);
    const invalidTransactionsSummary = waaila.functions.summarizeGaResult(results['transactions'][1]);
    waaila.warn(typeof transactions[0] != 'undefined', 0).fail.message('No data returned for transactions by transaction ID').break;
    
    /**
    * @assert 2 - The test will detect the faulty transactions, which is when one transactionID is associated with multiple transactions 
    * @score 150
    */
    const totalTransactions = +transactionsSummary['transactions']['total'];    
    const totalInvalidTransactions = +invalidTransactionsSummary['transactions']['total']; 
    var assert_fail_message_insert = '';
    if (totalInvalidTransactions == 1000) {
        assert_fail_message_insert = ' more than';   
    }
    const assert_pass_message = 'Every transaction ID corresponds to a single transaction.';
    const assert_fail_message = `Duplicate transactions detected in${assert_fail_message_insert} ${Math.round(totalInvalidTransactions/totalTransactions*10000)/100} % of all transactions`;
    const assert_fail_howtofix = 'If the percentage of duplicate transactions is high, check if information is sent only on purchase page.';
    const assert_fail_tabledescribe = 'Sample of up to 10 invalid transactions:';
    waaila.assert(totalInvalidTransactions == 0, 150)
        .pass.message(assert_pass_message).fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' 
            + assert_fail_howtofix + '<br/><br/> ').table(invalidTransactions.head(10));
}
