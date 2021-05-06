(results, waaila) => {
    /**
    * @assert 1 - If there are no sessions found in last 28 days, the test fails.
    * @score 100
    */
    const sessionsSummary = waaila.functions.summarizeGaResult(results['sessions'][0]);
    const totalSessions = +sessionsSummary['sessions']['total'];
    
    const assert_pass_message = `There were ${totalSessions} sessions.`;
    const assert_fail_message = 'No sessions were found.';
    const assert_fail_howtofix = 'Check, if the GA code is triggered on the website.';
    waaila.assert(totalSessions > 0, 100).pass.message(assert_pass_message).fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix).break;
}