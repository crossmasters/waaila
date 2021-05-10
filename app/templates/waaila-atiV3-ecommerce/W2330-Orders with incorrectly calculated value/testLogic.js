(results, waaila) => {
    /**
    * @const {number} permittedSumDeviation - level above which deviations are considered to be incorrect and not due to rounding of numbers
    * @default 1.5
    */
    const permittedSumDeviation = 1.5;
    
    /**
    * @assert 1 - The test compares sum of revenue of products in orders and the values of the whole order. If they do not match, it fails.
    * @score 150
    */
    const transactionsHighDiff = waaila.functions.normalizeAtiResult(results[0]);
    const transactionsHighDiffSummary = waaila.functions.summarizeAtiResult(results[0]);
    
    const transactionsLowDiff = waaila.functions.normalizeAtiResult(results[1]);
    const transactionsLowDiffSummary = waaila.functions.summarizeAtiResult(results[1]);
    
    const maxDiff = transactionsHighDiffSummary['Difference (m_transactions_turnover_withtax - m_prod_turnover_withtax)']['maximum'];
    const minDiff = transactionsLowDiffSummary['Difference (m_transactions_turnover_withtax - m_prod_turnover_withtax)']['minimum'];
    
    const transactionsDiff = transactionsHighDiff.filter(row => +row['Difference (m_transactions_turnover_withtax - m_prod_turnover_withtax)'] > permittedSumDeviation)
        .concat(transactionsLowDiff.filter(row => +row['Difference (m_transactions_turnover_withtax - m_prod_turnover_withtax)'] < - permittedSumDeviation));
    const assert_pass_message = 'For all orders the sum of products in order equals to the value of whole order.';
    const assert_fail_message = 'There are orders, by which the sum of products in order does not equal to the value of whole order.';
    const assert_fail_howtofix = 'You need to check the measurement of order value.';
    const assert_fail_tabledescribe = 'Sample of up to 20 invalid orders (up to 10 highest and up to 10 lowest differences):';
    waaila.assert((maxDiff <= permittedSumDeviation) || (minDiff >= - permittedSumDeviation), 150)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix 
            + '<br/><br/> ' + assert_fail_tabledescribe).table(transactionsDiff).break;   
}