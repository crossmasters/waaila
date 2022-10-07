(results, waaila) => {
    /**
    * @const {array} allowedEventCombinations - fill the parameters based on the configuration steps below (requiredEventCombinations contains all event combinations that have to be there every day)
    * @default []
    */
    const requiredEventCombinations = [];
    /**
    * @const {array} allowedEventCombinations - fill the parameters based on the configuration steps below (allowedEventCombinations contains all event combinations that can be in the data)
    * @default []
    */
    const allowedEventCombinations = [];
    /**
    * @const {number} maxCountUnexpected - maximal allowed number of events for an unexpected combination (to display all, set to 0)
    * @default 100
    */
    const maxCountUnexpected = 100;
    /**
    * @const {number} minShareToDailyAverage - minimal allowed share compared to daily average (e.g. for minShareToDailyAverage = 0.4, test fails if any combination has less than 40 % of its daily average)
    * @default 0.4
    */
    const minShareToDailyAverage = 0.4;

	// Transform the data
	const eventsLast28days = waaila.functions.normalizeGaResult(results['events'][0], 0);
	var eventsYesterday = waaila.functions.normalizeGaResult(results['events'][0], 1);
	
	if (requiredEventCombinations.length === 0) {
		/**
        * @info 0 - prepare the configuration (if empty)
        * @score 0
        */
        waaila.message('This test requires configuration. The following table contains all available event categories from last 28 days.');
		waaila.message('<i>The configuration steps are below the table.</i>');
		waaila.table(eventsLast28days);
		waaila.message('');
		waaila.message('1. Copy the code below into the test logic and replace with it the definitions of requiredEventCombinations and allowedEventCombinations parameters.');
		waaila.message('2. Remove from requiredEventCombinations array all event categories that do not have to be present every day.');
		waaila.message('3. You can add additional event categories to the allowedEventCombinations array.');
		waaila.message('');
		eventsLast28days.forEach(row => {
			delete row['totalEvents'];
		})
		waaila.message('<code>const requiredEventCombinations = ' + JSON.stringify(eventsLast28days) + ';</code>');
		waaila.message('<code>const allowedEventCombinations = ' + JSON.stringify(eventsLast28days) + ';</code>');
	} else {
		/**
        * @assert 1 - check that all events measured
        * @score 50
        */
        requiredEventCombinations.forEach(comb => {
			comb['missing'] = true;
			eventsYesterday.forEach(row => {
				if (row['eventCategory'] === comb['eventCategory']) {
					comb['missing'] = row['totalEvents'] > 0 ? false: true;
					row['isRequired'] = true;
				}
			})
		})
		const eventCombinationsMissing = requiredEventCombinations.filter(comb => comb['missing']);
		const fail_message_blackout = '1) There are some required event categories missing in the data yesterday: ';
		waaila.assert(eventCombinationsMissing.length === 0, 50).fail.message(fail_message_blackout).table(eventCombinationsMissing);

		/**
        * @assert 2 - check that there is no unexpected event
        * @score 50
        */
        eventsYesterday.forEach(row => {
			row['unexpected'] = true;
			allowedEventCombinations.forEach(comb => {
				if ((row['eventCategory'] === comb['eventCategory']) | (row['totalEvents'] <= maxCountUnexpected)) {
					row['unexpected'] = false;
				}
			})
		})
		const eventCombinationsUnexpected = eventsYesterday.filter(row => row['unexpected']);
		const fail_message_unexpected = '2) There are some unexpected event categories in the data yesterday: ';
		waaila.assert(eventCombinationsUnexpected.length === 0, 50).fail.message(fail_message_unexpected).table(eventCombinationsUnexpected);

		/**
        * @assert 3 - check that no required event has fallen extremely compared to last 28 days
        * @score 50
        */
        eventsYesterday.forEach(row1d => {
			eventsLast28days.forEach(row28d => {
				if (row1d['eventCategory'] === row28d['eventCategory']) {
					row1d['dailyAverage28d'] = Math.round(row28d['totalEvents']/28);
					row1d['eventsShare'] = Math.round(row1d['totalEvents']/row1d['dailyAverage28d']*100)/100;
					row1d['isRequired'] = !row1d['isRequired'] ? false : row1d['isRequired'];
					row1d['belowLimit'] = row1d['eventsShare'] < minShareToDailyAverage;
				}
			})
		})
		eventsYesterday = eventsYesterday.filter(row => row['isRequired'])
		eventsYesterday.forEach(row => {
			delete row['isRequired'];
			delete row['unexpected'];
		});
		const tableFormatting = [
			{ column: 'belowLimit', cellColor: { condition: { EQUAL: false } } },
			{ column: 'eventsShare', numberFormat: { style: 'percent' } }
		];
		const fail_message_anomaly = '3) Some required event categories yesterday have less than ' + minShareToDailyAverage * 100 + ' % of the daily average last 28 days: ';
		waaila.assert(eventsYesterday.filter(row => row['belowLimit']).length === 0, 50)
			.fail.message(fail_message_anomaly)
			.table(eventsYesterday, tableFormatting);
	}	
}