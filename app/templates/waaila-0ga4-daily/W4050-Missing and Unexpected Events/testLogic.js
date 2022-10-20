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
	const eventsData = waaila.functions.normalizeGaResult(results);

	function dateNdaysAgo(n) {
		var today = new Date(),
			nDaysAgo = new Date();
		nDaysAgo.setDate(today.getDate() - n);
		var month = ('0' + (nDaysAgo.getMonth() + 1)).slice(-2),
			day = ('0' + nDaysAgo.getDate()).slice(-2),
			year = nDaysAgo.getFullYear();
		return [year, month, day].join('');
	};
	
	var eventsYesterday = eventsData.filter(row => row['date'] === dateNdaysAgo(1));
	const eventNamesList = [...new Set(eventsData.map(row => row['eventName']))];
	const eventsAgg = waaila.functions.normalizedData([]);
	eventNamesList.forEach(event => {
		const eventCountSelected = eventsData.filter(row => row['eventName'] === event).map(row => row['eventCount']).reduce((partialSum, a) => partialSum + a, 0)
		eventsAgg.push({eventName: event, eventCount: eventCountSelected});
	});
	const nrDays = [...new Set(eventsData.map(row => row['date']))].length;
	
	if (requiredEventNames.length === 0) {
		/**
        * @info 0 - prepare the configuration (if empty)
        * @score 0
        */
        waaila.message('This test requires configuration. The following table contains all available event names from last (up to) 28 days.');
		waaila.message('<i>The configuration steps are below the table.</i>');
		waaila.table(eventsAgg);
		waaila.message('');
		waaila.message('1. Copy the code below into the test logic and replace with it the definitions of requiredEventNames and allowedEventNames parameters.');
		waaila.message('2. Remove from requiredEventNames array all event names that do not have to be present every day.');
		waaila.message('3. You can add additional event names to the allowedEventNames array.');
		waaila.message('');
		eventsAgg.forEach(row => {
			delete row['eventCount'];
		})
		waaila.message('<code>const requiredEventNames = ' + JSON.stringify(eventsAgg.map(row => row['eventName'])) + ';</code>');
		waaila.message('<code>const allowedEventNames = ' + JSON.stringify(eventsAgg.map(row => row['eventName'])) + ';</code>');
	} else {
		/**
        * @assert 1 - check that all event names measured
        * @score 50
        */
		const eventNamesMissing = [];
        requiredEventNames.forEach(eventName => {
			var comb = {'eventName': eventName};
			comb['missing'] = true;
			eventsYesterday.forEach(row => {
				if (row['eventName'] === comb['eventName']) {
					comb['missing'] = row['eventCount'] > 0 ? false: true;
					row['isRequired'] = true;
				}
			})
			if (comb['missing']) {
				eventNamesMissing.push(comb);
			}
		})
		const fail_message_blackout = '1) There are some required event names missing in the data yesterday: ';
		waaila.assert(eventNamesMissing.length === 0, 50).fail.message(fail_message_blackout).table(eventNamesMissing);

		/**
        * @assert 2 - check that there is no unexpected event name
        * @score 50
        */
		const eventNamesUnexpected = [];
        eventsYesterday.forEach(row => {
			row['unexpected'] = true;
			allowedEventNames.forEach(eventName => {
				if ((row['eventName'] === eventName) | (row['eventCount'] <= maxCountUnexpected)) {
					row['unexpected'] = false;
				}
			})
			if (row['unexpected']) {
				eventNamesUnexpected.push(row);
			}
		})
		const fail_message_unexpected = '2) There are some unexpected event names missing in the data yesterday: ';
		waaila.assert(eventNamesUnexpected.length === 0, 50).fail.message(fail_message_unexpected).table(eventNamesUnexpected);

		/**
        * @assert 3 - check that no required event name has fallen extremely compared to last (up to) 28 days
        * @score 50
        */
        eventsYesterday.forEach(row1d => {
			eventsAgg.forEach(rowAgg => {
				if (row1d['eventName'] === rowAgg['eventName']) {
					row1d['dailyAverage' + nrDays + 'd'] = Math.round(rowAgg['eventCount']/nrDays);
					row1d['eventsShare'] = Math.round(row1d['eventCount']/row1d['dailyAverage' + nrDays + 'd']*100)/100;
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
			{ column: 'eventsShare', numberFormat: { style: 'percent' } },
			{ column: 'eventCount', numberFormat: { style: 'decimal' } },
			{ column: 'dailyAverage' + nrDays + 'd', numberFormat: { style: 'decimal' } }
		];
		const fail_message_anomaly = `3) Some required event names yesterday have less than ${minShareToDailyAverage*100} % of the daily average last ${nrDays} days: `;
		waaila.assert(eventsYesterday.filter(row => row['belowLimit']).length === 0, 50)
			.fail.message(fail_message_anomaly)
			.table(eventsYesterday, tableFormatting);
	}	
}