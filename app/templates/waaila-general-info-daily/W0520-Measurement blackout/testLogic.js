(results, waaila) => {
    /**
    * @warn 1 - If there is no traffic for previous day detected, the test fails.
    * @score 150
    */
    const sessionsSummary = waaila.functions.summarizeGaResult(results['sessions'][0]);
    const totalSessions = +sessionsSummary['sessions']['total'];
    
    const assert_pass_message = 'Sessions were measured yesterday.';
    const assert_fail_message = 'There was no data collected yesterday!';
    waaila.assert(totalSessions > 0, 150)
        .pass.message(assert_pass_message).fail.message(assert_fail_message);
}