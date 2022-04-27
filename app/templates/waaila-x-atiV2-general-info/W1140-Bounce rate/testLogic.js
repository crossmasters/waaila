(results, waaila) => {
    /**
    * @const {number} lowerThreshold - lower bound to bounce rate
    * @default 0.10
    */
    const lowerThreshold = 0.10; 
    /**
    * @const {number} upperThreshold - upper bound to bounce rate
    * @default 0.95
    */
    const upperThreshold = 0.95;

    /**
    * @assert 1 - It checks if the bounce rate on any page is not between 10% and 95%, if not, this test fails. 
    * @score 70
    */
    const bounceRateSummary = waaila.functions.summarizeAtiResult(results);
    const totalbounceRate = +bounceRateSummary['Bounce rate']['total'];

    const assert_pass_message = `Bounce Rate is within expected bounds ${lowerThreshold*100} and ${upperThreshold*100} %`;
    const assert_fail_message = `Bounce Rate (${totalbounceRate}) is not between ${lowerThreshold*100} and ${upperThreshold*100} %`;
    const assert_fail_howtofix = 'Following points should be checked: <br/>1.	Pageview is not duplicated <br/> 2.	Pageview is triggered after on all pages <br/> 3.	Event has correctly setup non-interaction. ';
    waaila.assert((totalbounceRate > lowerThreshold && totalbounceRate < upperThreshold), 70)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix);
}
