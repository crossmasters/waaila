(results, waaila) => {
    /**
    * @const {number} permittedSumDeviation - level above which deviations are considered to be incorrect and not due to rounding of numbers
    * @default 1.5
    */
    const permittedSumDeviation = 1.5;
    
    /**
    * @warn 1 - Loads data and checks for presence of transaction revenue data
    * @score 0
    */
    const transactionsHighDiff = waaila.functions.normalizeGaResult(results['transactions'][0]);
    const sumTransactionsHighDiff = waaila.functions.summarizeGaResult(results['transactions'][0]);
    const transactionsLowDiff = waaila.functions.normalizeGaResult(results['transactions'][1]);
    const sumTransactionsLowDiff = waaila.functions.summarizeGaResult(results['transactions'][1]);
    
    const maxDiff = sumTransactionsHighDiff['sumDifference']['maximum'];
    const minDiff = sumTransactionsLowDiff['sumDifference']['minimum'];
    
    waaila.warn(typeof transactionsHighDiff[0] != 'undefined', 0).fail.message('No data about revenue by transaction ID were found.').break;
    
    /**
    * @assert 2 - The test compares sum of revenue of products in orders and the values of the whole order. If they do not match, it fails.
    * @score 150
    */
    const transactionsDiff = transactionsHighDiff.filter(function (row) {
        return +row['sumDifference'] > permittedSumDeviation;
    }).concat(transactionsLowDiff.filter(function (row) {
        return +row['sumDifference'] < - permittedSumDeviation;
    }));
    const assert_pass_message = 'For all orders the sum of products in order plus tax and shipping equals to the value of whole order.';
    const assert_fail_message = 'There are orders, by which the sum of products in order plus tax and shipping does not equal to the value of whole order.';
    const assert_fail_howtofix = 'First check the formula of sumDifference in the Query logic. If the calculation corresponds to expected revenue components, you need to check the measurement of order value.';
    const assert_fail_tabledescribe = 'Sample of up to 20 invalid orders (up to 10 highest and up to 10 lowest differences):';
    waaila.assert((maxDiff <= permittedSumDeviation) && (minDiff >= - permittedSumDeviation), 150)
        .pass.message(assert_pass_message).fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' 
            + assert_fail_howtofix + '<br/><br/> ' + assert_fail_tabledescribe ).table(transactionsDiff);
}