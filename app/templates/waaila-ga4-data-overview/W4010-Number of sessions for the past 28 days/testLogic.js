(results, waaila) => {
    /**
    * @assert 1 - Check if there are any sessions in the last 28 days
    * @score 100
    */
    const totalSessions = results['totals'][0]['metricValues'][0]['value'];
    const assert_pass_message = `There were ${totalSessions} sessions.`;
    const assert_fail_message = 'No sessions were found.';
    const assert_fail_howtofix = 'Check, if the GA code is triggered on the website.';
    waaila.assert(totalSessions > 0, 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix);
}