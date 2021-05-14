(results, waaila) => {
    /**
    * @const {number} permittedRefundDeviation - level above which deviations are considered to be incorrect and not due to rounding of numbers
    * @default 1.5
    */
    const permittedRefundDeviation = 1.5;

    /**
    * @warn 1 - Loads data and checks for presence of refund data
    * @score 0
    */
    const refundTransactions = waaila.functions.normalizeGaResult(results['transactions'][0]);
    const totalTransactions = waaila.functions.normalizeGaResult(results['transactions'][1]);
    
    waaila.warn((typeof totalTransactions[0] != 'undefined') && (typeof refundTransactions[0] != 'undefined'), 0)
        .fail.message('No data about refund were found.').break;
    
    /**
    * @assert 2 - Test checks, if refund amount is equal to value of product revenue/total revenue. If not, it fails.
    * @score 100
    */
    const invalidRefunds = refundTransactions.filter(function (row) {
        return (Math.abs(+row['diffTransRevRefund']) > permittedRefundDeviation) && ( Math.abs(+row['diffItemRevRefund']) > permittedRefundDeviation);
    });
    
    const assert_pass_message = 'No transactions with incorrect refund amount were found (refund amount is equal to value of product revenue/total revenue).';
    const assert_fail_message = 'Transactions with incorrect refund amount were found.';
    const assert_fail_howtofix = 'Check the correctness of the refund measurement.';
    const assert_fail_tabledescribe = 'Sample of up to 10 invalid transactions:';
    waaila.assert(typeof invalidRefunds[0] === 'undefined', 100)
        .pass.message(assert_pass_message).fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' 
            + assert_fail_howtofix + '<br/><br/>' + assert_fail_tabledescribe).table(invalidRefunds.head(10));
}
