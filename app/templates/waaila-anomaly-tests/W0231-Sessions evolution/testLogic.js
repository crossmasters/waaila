(results, waaila) => {
    /**
    * @const {object} anomalyDetectionConfig - Settings of the anomaly detection analysis
    * @default {valueColumn: 'sessions'}
    */
    const anomalyDetectionConfig = {
        valueColumn: 'sessions', // the name of metric to be analysed (without ga: prefix)
        sensitivity: 80 // how sensitive to shocks (values 0-99, default 80)
    };

    /**
    * @assert 1 - Analyze presence of anomalies in sessions
    * @score 150
    */
    const inputData = waaila.functions.normalizeGaResult(results['inputData'][0]);
    const processedData = waaila.functions.isDayOfWeekAnomaly(anomalyDetectionConfig, inputData)
    
    const valueColumnName = anomalyDetectionConfig['valueColumn'];
    const assert_pass_message = `No anomalies detected in the ${valueColumnName}`;
    const assert_fail_message = `There was an anomaly in the ${valueColumnName}`;
        
    if (typeof processedData['data'] === 'undefined') {
        processedData['messages'].forEach(message => waaila.table(message));
    } else {
        const anomalies = processedData['data'].filter(row => row['isAnomaly'] == 1);
        waaila.assert(typeof anomalies[0] === 'undefined', 150)
            .pass.message(assert_pass_message).fail.message(assert_fail_message);

        const processedDataLastDay = processedData['data'].filter(row => row['isAnomaly'] != null).order(['expectedValue'], true);
        waaila.table(processedDataLastDay, [{ 'column': 'isAnomaly', 'condition': { 'EQUAL': false } }]);
    }
}