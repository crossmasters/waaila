(results, waaila) => {
    /**
    * @warn 1 - Loads data and checks for presence of transaction quantity data
    * @score 0
    */
    const filteredTransactions = waaila.functions.normalizeGaResult(results['transactions'][0]);
    const filteredTransactionsSummary = waaila.functions.summarizeGaResult(results['transactions'][0]);
    const totalTransactions = waaila.functions.normalizeGaResult(results['transactions'][1]);
    const emptyTransactions = +filteredTransactionsSummary['itemQuantity']['total'];
    
    waaila.warn(typeof totalTransactions[0] != 'undefined', 0).fail.message('No data returned for item quantity by transaction ID.').break;
    
    /**
    * @assert 2 - Test checks orders, if some empty order is found, it fails.
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