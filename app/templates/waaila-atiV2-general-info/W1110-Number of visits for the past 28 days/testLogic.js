(results, waaila) => {
    /**
    * @assert 1 - Checks the number of visits in past 28 days, if there are no visits, it fails
    * @score 100
    */
    const visitsSummary = waaila.functions.summarizeAtiResult(results);
    const totalVisits = +visitsSummary['Visits']['total'];
    const assert_pass_message = `There were ${totalVisits} visits.`;
    const assert_fail_message = 'No visits we found.';
    const assert_fail_howtofix = 'Check, if the ATI measurement is set up correctly on your website.';
    waaila.assert(totalVisits > 0, 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix);
}