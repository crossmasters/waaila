(results, waaila) => {
    /**
    * @const {number} maxRatioDiff - the difference between the number of ad clicks and sessions is expected to be smaller than maxRatioDiff*100 % of the number of sessions
    * @default 0.1
    */
    const maxRatioDiff = 0.1;
    
    /**
    * @warn 1 - Checks if there are some click data in GA. If not, warning is displayed.
    * @score 40
    */
    const clicksSummary = waaila.functions.summarizeGaResult(results['clicks'][0]);
    const totalClicks = +clicksSummary['adClicks']['total'];
    const totalSessions = +clicksSummary['sessions']['total'];
    const clicksSessionsRatio = totalClicks/ totalSessions;
    
    const warn_pass_message_total = 'Click data is measured.';
    const warn_fail_message_total = 'No click data found.';
    const warn_fail_howtofix_total = 'Check if Google Ads accounts are connected to this view. If not, it needs to be set up.';
    waaila.warn(totalClicks > 0, 40)
        .pass.message(warn_pass_message_total)
        .fail.message(warn_fail_message_total + '<br/><br/> How to fix: <br/>' +  warn_fail_howtofix_total).break;

    /**
    * @warn 2 - If there are clicks, check their ratio to sessions. It should be close to 1, otherwise a warning is displayed.
    * @score 40
    */
    const warn_pass_message_ratio = 'Click data corresponds to sessions data.';
    const warn_fail_message_ratio = `Click data does not correspond to sessions data: the number of clicks is ${Math.round(clicksSessionsRatio*10000)/100} % of the number of sessions`;
    const warn_fail_howtofix_ratio = 'Check if there has been no change in Google Ads accounts connection to this view recently.';
    waaila.warn(Math.abs(clicksSessionsRatio - 1) < maxRatioDiff, 40)
        .pass.message(warn_pass_message_ratio)
        .fail.message(warn_fail_message_ratio + '<br/><br/> How to fix: <br/>' +  warn_fail_howtofix_ratio);
}
