(results, waaila) => {
    /**
    * @const {array} anomalyDetectionConfig - Settings of the anomaly detection analysis
    * @default {valueColumn: 'bounceRate'}
    */
    const anomalyDetectionConfig = {
        valueColumn: 'bounceRate', // the name of metric to be analysed (without ga: prefix)
        numberOfWeeks: 6, // how many weeks to use to calculate the weekly patterns (default 6)
        sensitivity: 80 // how sensitive to shocks (values 0-99, default 80)
    };
    
    /**
    * @assert 1 - Analyze the evolution of bounce rate
    * @score 70
    */
    const inputData = waaila.functions.normalizeGaResult(results['inputData'][0]);
    const processedData = waaila.functions.isDayOfWeekAnomaly(anomalyDetectionConfig, inputData);
    
    const valueColumnName = anomalyDetectionConfig['valueColumn'];
    const assert_pass_message = `No anomalies detected in the ${valueColumnName}`;
    const assert_fail_message = `There was an anomaly in the ${valueColumnName}`;
    
    if (processedData['data'].length == 0){
        processedData['messages'].forEach(message => waaila.table(message));
    } else {
        const anomalies = processedData['data'].filter(row => row['isAnomaly'] == 1);
        waaila.assert(typeof anomalies[0] === 'undefined', 70)
            .pass.message(assert_pass_message).fail.message(assert_fail_message);
    
        const processedDataLastDay = processedData['data'].filter(row => row['isAnomaly'] != null)
            .order(['expectedValue'], true);
        waaila.table(processedDataLastDay, [{ 'column': 'isAnomaly', 'condition': { 'EQUAL': false } }]);
    }
    
}