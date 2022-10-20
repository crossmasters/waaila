(results, waaila) => {
    const sessions = waaila.functions.normalizeGaResult(results);
    
    function dateNdaysAgo(n) {
        var today = new Date(),
            nDaysAgo = new Date();
            nDaysAgo.setDate(today.getDate() - n);
        var month = ('0' + (nDaysAgo.getMonth() + 1)).slice(-2),
            day = ('0' + nDaysAgo.getDate()).slice(-2),
            year = nDaysAgo.getFullYear();
    return [year, month, day].join('');
    };
    const sessionsYesterday = sessions.find(row => row['date'] === dateNdaysAgo(1)) ? sessions.find(row => row['date'] === dateNdaysAgo(1))['sessions'] : 0;
    const sessions2daysAgo = sessions.find(row => row['date'] === dateNdaysAgo(2)) ? sessions.find(row => row['date'] === dateNdaysAgo(2))['sessions'] : 0;
    /**
    * @warn 1 - If there is no traffic for previous day detected, it may be an error in measurement but also may be a delay in Google Analytics.
    * @score 50
    */
    const warn_pass_message = 'Sessions were measured yesterday.';
    const warn_fail_message = 'There is no data collected for yesterday. It may be an error in measurement but also may be a delay in Google Analytics.';
    waaila.warn(sessionsYesterday > 0, 50)
        .fail.message(warn_fail_message);
    
    /**
    * @assert 2 - If there is no traffic for the last 2 days, the test fails as it indicates a serious problem with measurement.
    * @score 100
    */
    const assert_pass_message = 'Sessions were measured during last 2 days.';
    const assert_fail_message = 'There was no data collected in last 2 days!';
    waaila.assert(sessionsYesterday + sessions2daysAgo > 0, 100)
        .pass.message(assert_pass_message).fail.message(assert_fail_message);
}