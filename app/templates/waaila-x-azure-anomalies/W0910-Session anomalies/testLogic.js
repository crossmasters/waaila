async (results, waaila, done) => {
    /**
    * @const {object} anomalyDetectionConfig - Settings of the anomaly detection analysis
    * @default {resourceName: '******', resourceKey: '******', timeColumn: 'date', valueColumn: 'sessions'}
    */
    const anomalyDetectionConfig = {
        resourceName: '******', // the Azure Anomaly Detector resource name
        resourceKey: '******', // the Azure Anomaly Detector resource key
        timeColumn: 'date', // the time dimension (at this point only date allowed)
        valueColumn: 'sessions', // the name of metric to be analysed (without ga: prefix)
        sensitivity: 95, // how sensitive to shocks (values 0-99, default 95)
        period: 7 // how long does one cyclical period last (default is 7, i.e. weekly cycles)
    };
    
    /**
    * @assert 1 - Analyze presence of anomalies in sessions
    * @score 100
    */
    const sessions = waaila.functions.normalizeGaResult(results['inputData'][0]);
    const processedData = await waaila.functions.isAnomaly(anomalyDetectionConfig, sessions);
    
    const valueColumnName = anomalyDetectionConfig['valueColumn'];
    const assert_pass_message = `No anomalies detected in the ${valueColumnName}`;
    const assert_fail_message = `There was an anomaly in the ${valueColumnName}`;
    
    if (processedData['data'].length === 0) {
        waaila.table(processedData);
    } else {
        const anomalies = processedData['data'].filter(row => row['isAnomaly'] == true);
        waaila.assert(typeof anomalies[0] === 'undefined', 100)
            .pass.message(assert_pass_message).fail.message(assert_fail_message);

        const processedDataLastDay = processedData['data'].filter(row => row['isAnomaly'] != null).order(['expectedValue'], true);
        waaila.table(processedDataLastDay, [{ 'column': 'isAnomaly', 'condition': { 'EQUAL': false } }]);
    }
    done();
}
