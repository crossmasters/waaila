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
    * @assert 1 - If the total of the sessions for the latest week is not between 70% and 140% of the weekly average, it can be due to a successful campaign implemented or an error in measurement or a deeper issue that needs to be investigated.
    * @score 150
    */
    const sessions28dSummary = waaila.functions.summarizeGaResult(results['sessions'][0], 0);
    const sessions7dSummary = waaila.functions.summarizeGaResult(results['sessions'][0], 1);
    const sessions28d = +sessions28dSummary['sessions']['total'];
    const sessions7avg = sessions28d / 4;
    const sessions7d = +sessions7dSummary['sessions']['total'];
    
    const assert_pass_message = `Sessions this week do not differ significantly from weekly average last month (they are between ${lowerRatioThreshold*100} and ${upperRatioThreshold*100} % of average sessions for a week)`;
    const assert_fail_message = `Sessions this week are not between ${lowerRatioThreshold*100} and ${upperRatioThreshold*100} % of average sessions for a week`;
    const assert_fail_howtofix = 'Check, if the GA code is triggered on the website.';
    waaila.assert((sessions7d > sessions7avg * lowerRatioThreshold) && (sessions7d < sessions7avg * upperRatioThreshold), 150)
        .pass.message(assert_pass_message).fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix);
}