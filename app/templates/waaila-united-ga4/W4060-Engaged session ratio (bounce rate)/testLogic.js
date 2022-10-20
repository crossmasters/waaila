(results, waaila) => {
    /**
    * @const {number} lowerThreshold - lower bound to engagement rate in percentages
    * @default 45
    */
    const lowerThreshold = 45;
    /**
    * @const {number} upperThreshold - upper bound to engagement rate in percentages
    * @default 85
    */
    const upperThreshold = 85;

    /**
    * @assert 1 - It checks if the engagement rate on any page is not between 10% and 95%, if not, this test fails.
    * @score 70
    */
    const engagementRateSummary = waaila.functions.summarizeGaResult(results);
    const totalEngagementRate = +engagementRateSummary['engagementRate']['total'];

    const assert_pass_message = `Engagement rate is within expected bounds ${lowerThreshold} % and ${upperThreshold} %`;
    const assert_fail_message = `Engagement rate is not between ${lowerThreshold} % and ${upperThreshold} % (actual value is ${(totalEngagementRate*100).toFixed(2)} %)`;
    const assert_fail_howtofix = 'Following points should be checked: <br/>1.	Pageview is not duplicated <br/> 2.	Pageview is triggered after on all pages <br/> 3.	Event has correctly setup non-interaction.';
    waaila.assert((totalEngagementRate*100 > lowerThreshold && totalEngagementRate*100 < upperThreshold), 70)
        .pass.message(assert_pass_message)
		.fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix);
}