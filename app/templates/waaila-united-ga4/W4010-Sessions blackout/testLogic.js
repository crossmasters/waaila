(results, waaila) => {
    /**
    * @assert 1 - If there is no traffic for previous day detected, the test fails.
    * @score 150
    */
    const sessions = waaila.functions.normalizeGaResult(results);

    const assert_pass_message = 'Sessions were measured last 7 days.';
    const assert_fail_message = 'There was no data for some of last 7 days!';
    waaila.assert(sessions.filter(row => row['sessions'] === 0).length === 0, 150)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message)
        .table(sessions, [{ column: 'sessions', cellColor: { condition: { GREATER_THAN: 0 } } }]);
}