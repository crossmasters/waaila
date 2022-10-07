(results, waaila) => {
    /**
    * @const {object} anomalyDetectionConfigAgg - Settings of the anomaly detection analysis - aggregated
    * @default {valueColumn: 'sessions'}
    */
    const anomalyDetectionConfigAgg = {
        valueColumn: 'sessions', // the name of metric to be analysed (without ga: prefix) - should be the same in both anomaly configs
        sensitivity: 90 // how sensitive to shocks (values 0-99, default 90)
    };
    /**
    * @const {object} anomalyDetectionConfigHostname - Settings of the anomaly detection analysis - by hostname
    * @default {valueColumn: 'sessions', overDimensions: ['hostname']}
    */
    const anomalyDetectionConfigHostname = {
        valueColumn: 'sessions', // the name of metric to be analysed (without ga: prefix) - should be the same in both anomaly configs
        sensitivity: 75, // how sensitive to shocks (values 0-99, default 75)
        overDimensions: ['hostname'] // the analysis is run for all combinations of listed dimensions separately (default [], i.e. run just once)
    };
    /**
    * @const {number} minExpectedSessions - minimal expected amount of sessions to be included in the results
    * @default 100
    */
    const minExpectedSessions = 100;
    
    /**
    * @assert 1 - Analyze presence of anomalies in sessions aggegate
    * @score 80
    */
    const inputDataAgg = waaila.functions.normalizeGaResult(results['inputData'][0]);
    const inputDataHostname = waaila.functions.normalizeGaResult(results['inputData'][1]);
    const valueColumnName = anomalyDetectionConfigAgg['valueColumn'];
    const tableFormatting = [
        { column: valueColumnName, numberFormat: { style: 'decimal' } },
        { column: 'expectedValue', numberFormat: { style: 'decimal' } },
        { column: 'lowerBound', numberFormat: { style: 'decimal' } },
        { column: 'upperBound', numberFormat: { style: 'decimal' } },
        { column: 'shareOfExpectedValue', numberFormat: { style: 'percent' } },
        { column: 'isAnomaly', cellColor: { condition: { EQUAL: false } } }
    ]
    
    const processedDataAgg = waaila.functions.isDayOfWeekAnomaly(anomalyDetectionConfigAgg, inputDataAgg);
    const assert_pass_message_agg = `No anomalies detected in the ${valueColumnName} aggregated`;
    const assert_fail_message_agg = `There was an anomaly in the ${valueColumnName} aggregated`;
    
    if (processedDataAgg['data'].length === 0) {
        waaila.table(processedDataAgg);
    } else {
        const anomalies = processedDataAgg['data'].filter(row => ((row['isAnomaly'] == 1) && (row['expectedValue'] > minExpectedSessions)));
        waaila.assert(typeof anomalies[0] === 'undefined', 80)
            .pass.message(assert_pass_message_agg).fail.message(assert_fail_message_agg);

        const processedDataAggLastDay = processedDataAgg['data'].filter(row => ((row['isAnomaly'] != null)
            && (row['expectedValue'] > minExpectedSessions)))
            .order(['expectedValue'], true);
        processedDataAggLastDay.forEach(row => {
            row['expectedValue'] = Math.round(row['expectedValue']);
            row['shareOfExpectedValue'] = row[valueColumnName]/row['expectedValue'];
            delete row['isNegativeAnomaly'];
            delete row['isPositiveAnomaly'];
        })
        waaila.table(processedDataAggLastDay, tableFormatting);
    }
    
    /**
    * @assert 2 - Analyze presence of anomalies in sessions by hostname
    * @score 80
    */
    const processedDataHostname = waaila.functions.isDayOfWeekAnomaly(anomalyDetectionConfigHostname, inputDataHostname);
    const assert_pass_message_hostname = `No anomalies detected in the ${valueColumnName}`;
    const assert_fail_message_hostname = `There was an anomaly in the ${valueColumnName}`;
    
    if (processedDataHostname['data'].length === 0) {
        waaila.table(processedDataHostname);
    } else {
        const anomalies = processedDataHostname['data'].filter(row => ((row['isAnomaly'] == 1) && (row['expectedValue'] > minExpectedSessions)));
        waaila.assert(typeof anomalies[0] === 'undefined', 80)
            .pass.message(assert_pass_message_hostname).fail.message(assert_fail_message_hostname);

        const processedDataHostnameLastDay = processedDataHostname['data'].filter(row => ((row['isAnomaly'] != null)
            && (row['expectedValue'] > minExpectedSessions)))
            .order(['expectedValue'], true);
        processedDataHostnameLastDay.forEach(row => {
            row['expectedValue'] = Math.round(row['expectedValue']);
            row['shareOfExpectedValue'] = row[valueColumnName]/row['expectedValue'];
            delete row['isNegativeAnomaly'];
            delete row['isPositiveAnomaly'];
        })
        waaila.table(processedDataHostnameLastDay, tableFormatting);
    }
}