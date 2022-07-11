(results, waaila) => {
	// Transform the data
	const events = waaila.functions.normalizeGaResult(results['events'][0]);
	const totalEventsSummary = waaila.functions.summarizeGaResult(results['events'][1]);

	/**
    * @info 1 - Print out events by category, action and label for last 28 days
    * @score 0
    */
	const totalEvents = totalEventsSummary['totalEvents']['total'];
	events.forEach(row => {
		row['eventShare'] = (row['totalEvents']/totalEvents).toFixed(3);
	})
	waaila.table(events);

}