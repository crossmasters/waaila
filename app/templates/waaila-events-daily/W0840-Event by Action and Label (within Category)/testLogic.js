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
	const eventsYesterday = waaila.functions.normalizeGaResult(results['events'][0], 1);

	const eventCategories = [...new Set(eventsLast28days.map(row => row['eventCategory']))];
	
	if (eventCategories.length > 1) {
		waaila.message('This test requires configuration. First you need to select a single eventCategory. The following table contains aggregate from last 28 days.');
		waaila.message('<i>The configuration steps are below the table.</i>');
		var eventCategoriesAggreg = [];
		eventCategories.forEach(category => {
			var categoryDict = {'eventCategory': category, 'totalEvents': 0, 'nrActionLabelCombinations': 0};
			eventsLast28days.forEach(row => {
				if (row['eventCategory'] === category){
					categoryDict['totalEvents'] += row['totalEvents'];
					categoryDict['nrActionLabelCombinations'] += 1;
				}
			})
			eventCategoriesAggreg.push(categoryDict);
		})
		waaila.table(eventCategoriesAggreg);
		waaila.message('');
		waaila.message('1. Select one of the categories displayed in the table.');
		waaila.message('2. In the Query logic replace XXXXXX with your selected category in the line "filtersExpression": "ga:eventCategory!=XXXXXX".');
		waaila.message('3. Change the inequality sign (!=) to equality (==)');
		waaila.message('(e.g. if you selected category "user", the line would read "filtersExpression": "ga:eventCategory==user"');
		waaila.message('');
	} else if (requiredEventCombinations.length === 0) {
		/**
        * @info 0 - prepare the configuration (if empty)
        * @score 0
        */
        waaila.message('This test requires further configuration. The following table contains all available event category-action-label combinations from last 28 days.');
		waaila.message('<i>The configuration steps are below the table.</i>');
		waaila.table(eventsLast28days);
		waaila.message('');
		waaila.message('1. Copy the code below into the Test logic and replace with it the definitions of requiredEventCombinations and allowedEventCombinations parameters.');
		waaila.message('2. Remove from requiredEventCombinations array all event category-action-label combinations that do not have to be present every day.');
		waaila.message('3. You can add additional event category-action-label combinations to the allowedEventCombinations array.');
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
				if ((row['eventCategory'] === comb['eventCategory']) && (row['eventAction'] === comb['eventAction']) && (row['eventLabel'] === comb['eventLabel'])) {
					comb['missing'] = row['totalEvents'] > 0 ? false: true;
					row['isRequired'] = true;
				}
			})
		})
		const eventCombinationsMissing = requiredEventCombinations.filter(comb => comb['missing']);
		const fail_message_blackout = '1) There are some required event category-action-label combinations missing in the data yesterday: ';
		waaila.assert(eventCombinationsMissing.length === 0, 50).fail.message(fail_message_blackout).table(eventCombinationsMissing);

		/**
        * @assert 2 - check that there is no unexpected event
        * @score 50
        */
        eventsYesterday.forEach(row => {
			row['unexpected'] = true;
			allowedEventCombinations.forEach(comb => {
				if (((row['eventCategory'] === comb['eventCategory']) && (row['eventAction'] === comb['eventAction']) && (row['eventLabel'] === comb['eventLabel'])) | (row['totalEvents'] <= maxCountUnexpected)) {
					row['unexpected'] = false;
				}
			})
		})
		const eventCombinationsUnexpected = eventsYesterday.filter(row => row['unexpected']);
		const fail_message_unexpected = '2) There are some unexpected event category-action-label combinations missing in the data yesterday: ';
		waaila.assert(eventCombinationsUnexpected.length === 0, 50).fail.message(fail_message_unexpected).table(eventCombinationsUnexpected);

		/**
        * @assert 3 - check that no required event has fallen extremely compared to last 28 days
        * @score 50
        */
        eventsYesterday.forEach(row1d => {
			eventsLast28days.forEach(row28d => {
				if ((row1d['eventCategory'] === row28d['eventCategory']) && (row1d['eventAction'] === row28d['eventAction']) && (row1d['eventLabel'] === row28d['eventLabel'])) {
					row1d['dailyAverage28d'] = Math.round(row28d['totalEvents']/28);
					row1d['eventsShare'] = Math.round(row1d['totalEvents']/row1d['dailyAverage28d']*100)/100;
					row1d['isRequired'] = !row1d['isRequired'] ? false : row1d['isRequired'];
					row1d['belowLimit'] = row1d['eventsShare'] < minShareToDailyAverage;
				}
			})
		})
		const eventsFiltered = eventsYesterday.filter(row => (row['belowLimit']) && (row['isRequired']));
		const fail_message_anomaly = '3) Some required event category-action-label combinations yesterday have less than ' + minShareToDailyAverage*100 + ' % of the daily average last 28 days: ';
		waaila.assert(eventsFiltered.length === 0, 50)
			.fail.message(fail_message_anomaly)
			.table(eventsYesterday.filter(row => row['isRequired']), [{ 'column': 'belowLimit', 'condition': { 'EQUAL': false } }]);
	}	
}