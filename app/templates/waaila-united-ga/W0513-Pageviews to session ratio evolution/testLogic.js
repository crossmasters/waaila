(results, waaila) => {
    /**
    * @const {object} anomalyDetectionConfig - Settings of the anomaly detection analysis
    * @default {valueColumn: 'sessions', overDimensions: ['deviceCategory']}
    */
    const anomalyDetectionConfig = {
        valueColumn: 'pageviewsPerSession', // the name of metric to be analysed (without ga: prefix)
        sensitivity: 80, // how sensitive to shocks (values 0-99, default 80)
        overDimensions: ['deviceCategory'] // the analysis is run for all combinations of listed dimensions separately (default [], i.e. run just once)
    };
    
    /**
    * @assert 1 - Analyze presence of anomalies in session to user ratio by device category
    * @score 80
    */
    const inputData = waaila.functions.normalizeGaResult(results['inputData'][0]);
    const processedData = waaila.functions.isDayOfWeekAnomaly(anomalyDetectionConfig, inputData)
    
    const valueColumnName = anomalyDetectionConfig['valueColumn'];
    const assert_pass_message = `No anomalies detected in the ${valueColumnName}`;
    const assert_fail_message = `There was an anomaly in the ${valueColumnName}`;
    const tableFormatting = [
        { column: valueColumnName, numberFormat: { style: 'decimal' } },
        { column: 'expectedValue', numberFormat: { style: 'decimal' } },
        { column: 'lowerBound', numberFormat: { style: 'decimal' } },
        { column: 'upperBound', numberFormat: { style: 'decimal' } },
        { column: 'shareOfExpectedValue', numberFormat: { style: 'percent' } },
        { column: 'isAnomaly', cellColor: { condition: { EQUAL: false } } }
    ];
    
    if (processedData['data'].length === 0) {
        waaila.table(processedData);
    } else {
        const anomalies = processedData['data'].filter(row => row['isAnomaly'] == 1);
        waaila.assert(typeof anomalies[0] === 'undefined', 80)
            .pass.message(assert_pass_message).fail.message(assert_fail_message);

        const processedDataLastDay = processedData['data'].filter(row => row['isAnomaly'] != null)
            .order(['expectedValue'], true);
        processedDataLastDay.forEach(row => {
            row['shareOfExpectedValue'] = row[valueColumnName]/row['expectedValue'];
            delete row['isNegativeAnomaly'];
            delete row['isPositiveAnomaly'];
        })
        waaila.table(processedDataLastDay, tableFormatting);
    }
}