(results, waaila) => {
    /**
    * @warn 1 - Loads data and checks for presence of transaction data
    * @score 0
    */
    const transactionsSummary = waaila.functions.summarizeAtiResult(results[0]);
    const invalidTransactions = waaila.functions.normalizeAtiResult(results[1]);
    const invalidTransactionsSummary = waaila.functions.summarizeAtiResult(results[1]);
     
    const totalTransactions = +transactionsSummary['Transactions']['total']; 
    const totalInvalidTransactions = +invalidTransactionsSummary['Transactions']['total']; 
    const warn_fail_message = 'No data returned for transactions';
    waaila.warn(totalTransactions > 0, 0).fail.message(warn_fail_message).break;

    /**
    * @assert 2 - The test will detect the faulty transactions, which is when one transactionID is associated with multiple transactions
    * @score 150
    */
    var assert_fail_message_start = 'Duplicate transactions detected in';
    if (totalInvalidTransactions == 10000) {
        assert_fail_message_start = assert_fail_message_start + ' more than';
    }
    const assert_pass_message = 'Every transaction ID corresponds to a single transaction.';
    const assert_fail_message = `${assert_fail_message_start} ${Math.round(totalInvalidTransactions/totalTransactions*10000)/100} % of all transactions`;
    const assert_fail_howtofix = 'If the percentage of duplicate transactions is high, check if information is sent only on purchase page.';
    const assert_fail_tabledescribe = 'Sample of up to 10 invalid transactions:';
    waaila.assert(totalInvalidTransactions == 0, 150)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' + assert_fail_howtofix 
            + '<br/><br/> ' + assert_fail_tabledescribe)
        .table(invalidTransactions.head(10));
}