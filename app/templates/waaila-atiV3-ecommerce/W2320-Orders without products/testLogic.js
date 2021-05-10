(results, waaila) => {
    /**
    * @assert 1 - Test checks orders, if some empty order is found, it fails.
    * @score 150
    */
    const transactionsSummary = waaila.functions.summarizeAtiResult(results[0]);
    const invalidTransactions = waaila.functions.normalizeAtiResult(results[1]);
    const invalidTransactionsSummary = waaila.functions.summarizeAtiResult(results[1]);
    
    const totalTransactions = +transactionsSummary['Transactions']['total'];    
    const totalInvalidTransactions = +invalidTransactionsSummary['Transactions']['total'];    
    var assert_fail_message_start = 'Orders without products were found in';
    if (totalInvalidTransactions == 1000) {
        assert_fail_message_start = assert_fail_message_start + ' more than';
    }
    const assert_pass_message = 'There are no orders without products.';
    const assert_fail_message = `${assert_fail_message_start} ${Math.round(totalInvalidTransactions/totalTransactions*10000)/100} % of all transactions`;
    const assert_fail_howtofix = 'Shows table with Ids of orders that has been detected as empty.';
    const assert_fail_tabledescribe = 'Sample of up to 10 orders without products';
    waaila.assert(totalInvalidTransactions == 0, 150).pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix + '<br/><br/>' + assert_fail_tabledescribe)
        .table(invalidTransactions.head(10)).break;
}