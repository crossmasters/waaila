(results, waaila) => {
    const events = waaila.functions.normalizeGaResult(results);

    function dateNdaysAgo(n) {
		var today = new Date(),
			nDaysAgo = new Date();
		nDaysAgo.setDate(today.getDate() - n);
		var month = ('0' + (nDaysAgo.getMonth() + 1)).slice(-2),
			day = ('0' + nDaysAgo.getDate()).slice(-2),
			year = nDaysAgo.getFullYear();
		return [year, month, day].join('');
	};
    const eventsYesterday = events.find(row => row['date'] === dateNdaysAgo(1)) ? events.find(row => row['date'] === dateNdaysAgo(1))['eventCount'] : 0;
    const events2daysAgo = events.find(row => row['date'] === dateNdaysAgo(2)) ? events.find(row => row['date'] === dateNdaysAgo(2))['eventCount'] : 0;
    /**
    * @warn 1 - If there is no traffic for previous day detected, it may be an error in measurement but also may be a delay in Google Analytics.
    * @score 50
    */
    const warn_pass_message = 'Events were measured yesterday.';
    const warn_fail_message = 'There is no data collected for yesterday. It may be an error in measurement but also may be a delay in Google Analytics.';
    waaila.warn(eventsYesterday > 0, 50)
        .fail.message(warn_fail_message);

    /**
    * @assert 2 - If there is no traffic for the last 2 days, the test fails as it indicates a serious problem with measurement.
    * @score 100
    */
    const assert_pass_message = 'Events were measured during last 2 days.';
    const assert_fail_message = 'There was no data collected in last 2 days!';
    waaila.assert(eventsYesterday + events2daysAgo > 0, 100)
        .pass.message(assert_pass_message).fail.message(assert_fail_message);
}