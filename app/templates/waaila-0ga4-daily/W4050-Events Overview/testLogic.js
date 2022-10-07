(results, waaila) => {
    /**
    * @const {array} allowedEventNames - fill the parameters based on the configuration steps below (requiredEventNames contains all event names that have to be there every day)
    * @default []
    */
    const requiredEventNames = [];
    /**
    * @const {array} allowedEventNames - fill the parameters based on the configuration steps below (allowedEventNames contains all event names that can be in the data)
    * @default []
    */
    const allowedEventNames = [];
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
	const eventsData = waaila.functions.normalizeGaResult(results, 0);
	const eventsLast28days = eventsData.filter(row => row['dateRange'] === 'date_range_0');
	eventsLast28days.forEach(row => delete row['dateRange']);
	var eventsYesterday = eventsData.filter(row => row['dateRange'] === 'date_range_1');
	eventsYesterday.forEach(row => delete row['dateRange']);
	
	if (requiredEventNames.length === 0) {
		/**
        * @info 0 - prepare the configuration (if empty)
        * @score 0
        */
        waaila.message('This test requires configuration. The following table contains all available event names from last 28 days.');
		waaila.message('<i>The configuration steps are below the table.</i>');
		waaila.table(eventsLast28days);
		waaila.message('');
		waaila.message('1. Copy the code below into the test logic and replace with it the definitions of requiredEventNames and allowedEventNames parameters.');
		waaila.message('2. Remove from requiredEventNames array all event names that do not have to be present every day.');
		waaila.message('3. You can add additional event names to the allowedEventNames array.');
		waaila.message('');
		eventsLast28days.forEach(row => {
			delete row['eventCount'];
		})
		waaila.message('<code>const requiredEventNames = ' + JSON.stringify(eventsLast28days) + ';</code>');
		waaila.message('<code>const allowedEventNames = ' + JSON.stringify(eventsLast28days) + ';</code>');
	} else {
		/**
        * @assert 1 - check that all event names measured
        * @score 50
        */
        requiredEventNames.forEach(comb => {
			comb['missing'] = true;
			eventsYesterday.forEach(row => {
				if (row['eventName'] === comb['eventName']) {
					comb['missing'] = row['eventCount'] > 0 ? false: true;
					row['isRequired'] = true;
				}
			})
		})
		const eventNamesMissing = requiredEventNames.filter(comb => comb['missing']);
		const fail_message_blackout = '1) There are some required event names missing in the data yesterday: ';
		waaila.assert(eventNamesMissing.length === 0, 50).fail.message(fail_message_blackout).table(eventNamesMissing);

		/**
        * @assert 2 - check that there is no unexpected event name
        * @score 50
        */
        eventsYesterday.forEach(row => {
			row['unexpected'] = true;
			allowedEventNames.forEach(comb => {
				if ((row['eventName'] === comb['eventName']) | (row['eventCount'] <= maxCountUnexpected)) {
					row['unexpected'] = false;
				}
			})
		})
		const eventNamesUnexpected = eventsYesterday.filter(row => row['unexpected']);
		const fail_message_unexpected = '2) There are some unexpected event names missing in the data yesterday: ';
		waaila.assert(eventNamesUnexpected.length === 0, 50).fail.message(fail_message_unexpected).table(eventNamesUnexpected);

		/**
        * @assert 3 - check that no required event name has fallen extremely compared to last 28 days
        * @score 50
        */
        eventsYesterday.forEach(row1d => {
			eventsLast28days.forEach(row28d => {
				if (row1d['eventName'] === row28d['eventName']) {
					row1d['dailyAverage28d'] = Math.round(row28d['eventCount']/28);
					row1d['eventsShare'] = Math.round(row1d['eventCount']/row1d['dailyAverage28d']*100)/100;
					row1d['isRequired'] = !row1d['isRequired'] ? false : row1d['isRequired'];
					row1d['belowLimit'] = row1d['eventsShare'] < minShareToDailyAverage;
				}
			})
		})
		eventsYesterday = eventsYesterday.filter(row => row['isRequired']);
		eventsYesterday.forEach(row => {
			delete row['isRequired'];
			delete row['unexpected'];
		});
		const tableFormatting = [
			{ column: 'belowLimit', cellColor: { condition: { EQUAL: false } } },
			{ column: 'eventsShare', numberFormat: { style: 'percent' } }
		];
		const fail_message_anomaly = `3) Some required event names yesterday have less than ${minShareToDailyAverage*100} % of the daily average last 28 days: `;
		waaila.assert(eventsYesterday.filter(row => row['belowLimit']).length === 0, 50)
			.fail.message(fail_message_anomaly)
			.table(eventsYesterday, tableFormatting);
	}	
}