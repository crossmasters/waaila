
(results, waaila) => {
    /**
    * @const {number} warnThreshold - above 10 million hits free GA are not functioning optimally
    * @default 10000000
    */
    const warnThreshold = 10000000;
    /**
    * @const {number} failThreshold - hits very high above 10 millions increase the risk to have free GA property deleted
    * @default 20000000
    */
    const failThreshold = 20000000;
    
    const hitsSummary = waaila.functions.summarizeGaResult(results['hits'][0]);
    const totalHits = +hitsSummary['summary']['hits']['total'];

    /**
    * @assert 1 - If more than failThreshold (20 millions) of hits for last 28 days was measured, the test fails.
    * @score 40
    */
    const totalHitsMillions = Math.round((totalHits/1000000 + Number.EPSILON) * 1000) / 1000;

    const assert_fail_message = `The limit of ${failThreshold/1000000} million hits was reached, actual number is: ${totalHitsMillions} millions`;
    const assert_fail_howtofix = 'Consider upgrading to Google Analytics 360.';
    waaila.assert(totalHits < failThreshold, 40).fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix).break;

    /**
    * @warn 2 - If more than warnThreshold (10 millions) of hits for last 28 days was measured, test shows warning.
    * @score 30
    */
    const warn_pass_message = `The number of hits is: ${totalHitsMillions} millions`;
    const warn_fail_message = `The limit of ${warnThreshold/1000000} million hits was reached, actual number is: ${totalHitsMillions} millions`;
    const warn_fail_howtofix = 'If the traffic on your site is increasing, you may need to consider future upgrade to Google Analytics 360.';
    waaila.warn(totalHits < warnThreshold, 30)
        .pass.message(warn_pass_message)
        .fail.message(warn_fail_message + '<br/><br/> How to fix: <br/>' +  warn_fail_howtofix).break;
}