(results, waaila) => {
    /**
    * @const {number} lowerRatioThreshold - lower bound to share of sessions last 7 days to weekly average sessions last 28 days
    * @default 0.7
    */
    const lowerRatioThreshold = 0.7;
    /**
    * @const {number} upperRatioThreshold - upper bound to share of sessions last 7 days to weekly average sessions last 28 days
    * @default 1.4
    */
    const upperRatioThreshold = 1.4;
    
    /**
    * @assert 1 - If the total of the visits for the new week is not between 70% and 140% of the weekly average, it can be due to a successful campaign implemented or an error in measurement or a deeper issue that needs to be investigated.
    * @score 150
    */
    const visitsSummary = waaila.functions.summarizeAtiResult(results);
    const visits28d = +visitsSummary['Visits (p2)']['total'];
    const visits7avg = visits28d / 4;
    const visits7d = +visitsSummary['Visits (p1)']['total'];
    
    const assert_pass_message = `Visits this week do not differ significantly from last week (they are between ${lowerRatioThreshold*100} and ${upperRatioThreshold*100} % of average visits for a week)`;
    const assert_fail_message = `Visits this week are not between ${lowerRatioThreshold*100} and ${upperRatioThreshold*100} % of average visits for a week`;
    const assert_fail_howtofix = 'Check, if the ATI measurement is set up correctly on your website.';
    waaila.assert((visits7d > visits7avg * lowerRatioThreshold) && (visits7d < visits7avg * upperRatioThreshold), 150)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix);
}