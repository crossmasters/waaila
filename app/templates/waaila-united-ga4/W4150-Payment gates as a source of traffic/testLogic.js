(results, waaila) => {
    /**
    * @assert 1 - The test compares the source of referral to a list of known payment gates. If there is a match, it fails.
    * @score 100
    */
    const paymentGates = waaila.functions.normalizeGaResult(results);
    const paymentGatesSummary = waaila.functions.summarizeGaResult(results);
    const totalPaymentGates = +paymentGatesSummary['sessions']['total'];

    const assert_pass_message = 'There are no known payment gates among the sources of traffic';
    const assert_fail_message = 'Payment gates are source of traffic';
    const assert_fail_howtofix = 'All known payment gates should be excluded using „referral exclusion list“ on property level or by GTM.';
    waaila.assert(totalPaymentGates == 0, 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' 
            + assert_fail_howtofix).table(paymentGates);
}
