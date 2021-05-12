(results, waaila) => {
    /**
    * @warn 1 - Loads data and checks for presence of sessions by source and referrers
    * @score 0
    */
    const socialNetworks = waaila.functions.normalizeGaResult(results['sourceSessions'][0]);
    const socialNetworksSummary = waaila.functions.summarizeGaResult(results['sourceSessions'][0]);
    const sourceSessions = waaila.functions.normalizeGaResult(results['sourceSessions'][1]);
    const referrerSessions = waaila.functions.normalizeGaResult(results['sourceSessions'][2]);
    const totalSocialNetworkSessions = +socialNetworksSummary['sessions']['total'];
    
    waaila.warn((typeof sourceSessions[0] != 'undefined') || (typeof referrerSessions[0] != 'undefined'), 0)
        .fail.message('No data returned for sessions by source or by fullReferrer').break;
    
    /**
    * @assert 2 - This test fails if in dimension source are „accounts.google.com“, in case of Facebook in full referrer facebook „auth“
    * @score 100
    */
    const assert_pass_message = 'There are no sign-ins through social networks among the source of traffic.';
    const assert_fail_message = 'Sign-ins through social networks are source of traffic.';
    const assert_fail_howtofix = 'Sign-ins through social networks should be excluded on „referral exclusion list“ on property level.';
    const assert_fail_tabledescribe = 'Sample of up to 10 sign-ins through social networks:';
    waaila.assert(totalSocialNetworkSessions == 0, 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix 
            + '<br/><br/>' + assert_fail_tabledescribe)
        .table(socialNetworks.head(10));
}
