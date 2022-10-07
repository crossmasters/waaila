(results, waaila) => {
    /**
    * @assert 1 - If there is no traffic for previous day detected, the test fails.
    * @score 150
    */
    const eventsSummary = waaila.functions.summarizeGaResult(results);
    const totalEvents = +eventsSummary['eventCount']['total'];
    
    const assert_pass_message = 'Events were measured yesterday.';
    const assert_fail_message = 'There was no data collected yesterday!';
    waaila.assert(totalEvents > 0, 150)
        .pass.message(assert_pass_message).fail.message(assert_fail_message);
}