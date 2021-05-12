(results, waaila) => {
    /**
    * @const {array} anomalyDetectionConfig - Settings of the anomaly detection analysis
    * @default {valueColumn: 'sessions', dimensions: ['hostname']}
    */
    const anomalyDetectionConfig = {
        valueColumn: 'sessions', // the name of metric to be analysed (without ga: prefix)
        numberOfWeeks: 6, // how many weeks to use to calculate the weekly patterns (default 6)
        sensitivity: 80, // how sensitive to shocks (values 0-99, default 80)
        dimensions: ['hostname'] // the analysis is run for all combinations of listed dimensions separately (default [], i.e. run just once)
    };
    /**
    * @const {number} minExpectedSessions - minimal expected amount of sessions to be included in the results
    * @default 100
    */
    const minExpectedSessions = 100;
    
    /**
    * @assert 1 - Analyze presence of anomalies in sessions by hostname
    * @score 80
    */
    const inputData = waaila.functions.normalizeGaResult(results['inputData'][0]);
    const processedData = waaila.functions.isDayOfWeekAnomaly(anomalyDetectionConfig, inputData);
	
    const valueColumnName = anomalyDetectionConfig['valueColumn'];
    const assert_pass_message = `No anomalies detected in the ${valueColumnName}`;
    const assert_fail_message = `There was an anomaly in the ${valueColumnName}`;
    
    if (typeof processedData[0] === 'undefined') {
        waaila.table(processedData);
    } else {
        const anomalies = processedData.filter(row => ((row['isAnomaly'] == 1) && (row['expectedValue'] > minExpectedSessions)));
        waaila.assert(typeof anomalies[0] === 'undefined', 80)
            .pass.message(assert_pass_message).fail.message(assert_fail_message);

        const processedDataLastDay = processedData.filter(row => ((row['isAnomaly'] != null) 
                && (row['expectedValue'] > minExpectedSessions)))
            .order(['expectedValue'], true);
        waaila.table(processedDataLastDay, [{ 'column': 'isAnomaly', 'condition': { 'EQUAL': false } }]);
    }
}