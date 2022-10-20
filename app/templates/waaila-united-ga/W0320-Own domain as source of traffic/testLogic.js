(results, waaila) => {
    /**
    * @const {number} sessionShareThreshold - maximum share of own domain allowed among sources
    * @default 0.05
    */
    const sessionShareThreshold = 0.05;
    
    /**
    * @warn 1 - Loads data and checks for presence in sessions by hostname
    * @score 0
    */
    const hostnameSessions = waaila.functions.normalizeGaResult(results['hostnameSessions'][0]);
    const hostnameSessionsSummary = waaila.functions.summarizeGaResult(results['hostnameSessions'][0]);
    const sourceFilteredSessionsSummary = waaila.functions.summarizeGaResult(results['sourceFilteredSessions'][0]);
    
    const totalSessions = +hostnameSessionsSummary['sessions']['total'];
    const fromHostnameSessions = +sourceFilteredSessionsSummary['sessions']['total'];
    
    const warn_fail_message = 'No data returned for sessions by hostname';
    waaila.warn(typeof hostnameSessions[0] != 'undefined', 0).fail.message(warn_fail_message).break;
    
    /**
    * @assert 2 - If there is any session coming from the hostname with the highest number of sessions, the test fails.
    * @score 100
    */
    const hostName = hostnameSessions[0]['hostname'];
    const assert_pass_message = `Own domain (${hostName}) is not a source of traffic (share of sessions is below ${sessionShareThreshold*100} %)`;
    const assert_fail_message = `Own domain (${hostName}) is a source of traffic (share of sessions above ${sessionShareThreshold*100} %)`;
    const assert_fail_howtofix = 'Own domain should be excluded using „referral exclusion list“ on property level.';
    waaila.assert(sessionShareThreshold * totalSessions > fromHostnameSessions, 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix);
    
}
