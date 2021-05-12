(results, waaila) => {
    /**
    * @warn 1 - Test measures the amount of all events to track the interaction the users have made on your website and verify that this amount is positive. If no events are found, it shows warning.
    * @score 70
    */
    const events = waaila.functions.normalizeGaResult(results['events'][0]);
    const eventsSummary = waaila.functions.summarizeGaResult(results['events'][0]);
    const totalEvents = +eventsSummary['totalEvents']['total'];
    
    const warn_pass_message = 'Data from events is measured. Up to 30 largest event categories:';
    const warn_fail_message = 'No data from events found.';
    const warn_fail_howtofix = 'Consider using events measurement. They may be set up using GTM tags.';
    waaila.warn(totalEvents > 0, 70)
        .pass.message(warn_pass_message).table(events)
        .fail.message(warn_fail_message + '<br/><br/> How to fix: <br/>' +  warn_fail_howtofix);
}
