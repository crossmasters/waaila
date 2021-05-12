(results, waaila) => {
    /**
    * @assert 1 - It checks if there are any visits in the last week, if not, this test fails.
    * @score 100
    */
    const visitsSummary = waaila.functions.summarizeAtiResult(results[0]);
    const totalVisits = +visitsSummary['Visits']['total'];
    const assert_pass_message = `There were ${totalVisits} sessions.`;
    const assert_fail_message = 'No visits we found.';
    const assert_fail_howtofix = 'Check, if the ATI measurement is set up correctly on your website.';
    waaila.assert(totalVisits > 0, 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix);
}
