(results, waaila) => {
    /**
    * @const {number} sessionShareThreshold - maximum share of own domain allowed among sources
    * @default 0.05
    */
    const sessionShareThreshold = 0.005;
    /**
    * @const {array} ownHostnames - list of own hostnames that should not be among the referrals
    * @default []
    */
    const ownHostnames = ['bezvasport.cz', 'bezvasport.sk'];
    
    /**
    * @assert 1 - If there is any session coming from the hostname with the highest number of sessions, the test fails.
    * @score 100
    */
    const sourceSessions = waaila.functions.normalizeGaResult(results);
    const sourceSessionsSummary = waaila.functions.summarizeGaResult(results);
    
    const totalSessions = +sourceSessionsSummary['sessions']['total'];
    const filteredSessions = sourceSessions.filter(row => (row['medium'] === 'referral') && (ownHostnames.includes(row['source'])));
    filteredSessions.forEach(row => row['sessionShare'] = Math.round(row['sessions']/totalSessions*100)/100);
    const fromHostnameSessions = filteredSessions.map(row => row['sessions']).reduce((a, b) => a + b, 0);
    
    const assert_pass_message = `Own domains are not sources of traffic (share of sessions is below ${sessionShareThreshold*100} %)`;
    const assert_fail_message = `Some own domains are sources of traffic (share of sessions above ${sessionShareThreshold*100} %)`;
    const assert_fail_howtofix = 'Own domain should be excluded using „referral exclusion list“ on property level.';
    waaila.assert(sessionShareThreshold * totalSessions > fromHostnameSessions, 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix).table(filteredSessions);
    
}
