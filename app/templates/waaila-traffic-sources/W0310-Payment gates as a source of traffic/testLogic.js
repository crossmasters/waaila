(results, waaila) => {
    /**
    * @warn 1 - Loads data and checks for presence of sessions by source
    * @score 0
    */
    const paymentGates = waaila.functions.normalizeGaResult(results['paymentGates'][0]);
    const paymentGatesSummary = waaila.functions.summarizeGaResult(results['paymentGates'][0]);
    const sourceSessions = waaila.functions.normalizeGaResult(results['paymentGates'][1]);
    const totalPaymentGates = +paymentGatesSummary['sessions']['total'];
    
    const warn_fail_message = 'No data returned for sessions by source';
    waaila.warn(typeof sourceSessions[0] != 'undefined', 0).fail.message(warn_fail_message).break;

    /**
    * @assert 2 - The test compares the source of referral to a list of known payment gates. If there is a match, it fails.
    * @score 100
    */
    const assert_pass_message = 'There are no known payment gates among the sources of traffic';
    const assert_fail_message = 'Payment gates are source of traffic';
    const assert_fail_howtofix = 'All known payment gates should be excluded using „referral exclusion list“ on property level or by GTM.';
    waaila.assert(totalPaymentGates == 0, 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' 
            + assert_fail_howtofix).table(paymentGates);
}
