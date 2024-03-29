(results, waaila) => {
    const filteredTransactions = waaila.functions.normalizeGaResult(results);
    const filteredTransactionsSummary = waaila.functions.summarizeGaResult(results);
    const emptyTransactions = +filteredTransactionsSummary['itemsPurchased']['total'];
    
    /**
    * @assert 1 - Test checks orders, if some empty order is found, it fails.
    * @score 150
    */
    const assert_pass_message = 'There are no orders without products.';
    const assert_fail_message = 'Orders without products were found.';
    const assert_fail_howtofix = 'Shows table with Ids of orders that has been detected as empty.';
    const assert_fail_tabledescribe = 'Sample of up to 10 orders without products';
    waaila.assert(emptyTransactions == 0, 150)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix + 
            '<br/><br/>' + assert_fail_tabledescribe).table(filteredTransactions.head(10));
}