(results, waaila) => {
    /**
    * @assert 1 - This test fails if in dimension source are „accounts.google.com“, in case of Facebook in full referrer facebook „auth“
    * @score 100
    */
    const socialNetworks = waaila.functions.normalizeGaResult(results);
    const socialNetworksSummary = waaila.functions.summarizeGaResult(results);
    const totalSocialNetworkSessions = +socialNetworksSummary['sessions']['total'];
    
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
