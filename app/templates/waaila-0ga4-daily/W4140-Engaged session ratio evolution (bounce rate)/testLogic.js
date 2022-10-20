(results, waaila) => {
    /**
    * @const {array} anomalyDetectionConfig - Settings of the anomaly detection analysis
    * @default {valueColumn: 'engagementRate'}
    */
    const anomalyDetectionConfig = {
        valueColumn: 'engagementRate', // the name of metric to be analysed (without ga: prefix)
        sensitivity: 60, // how sensitive to shocks (values 0-99, default 80)
        overDimensions: ['hostname']
    };
    /**
    * @const {number} minRelevantDailyEvents - Minimal daily amount of events to include for the analysis
    * @default 100
    */
    const minRelevantDailyEvents = 100;
    
    /**
    * @assert 1 - Analyze the evolution of engagement rate
    * @score 70
    */
    const inputData = waaila.functions.normalizeGaResult(results);
    const hostnameList = [...new Set(inputData.map(row => row['hostname']))];
    const nrDays = [...new Set(inputData.map(row => row['date']))].length;
    const relevantHostnames = hostnameList.filter(hostname => {
        const eventCountSelected = inputData.filter(row => row['hostname'] === hostname).map(row => row['eventCount']).reduce((partialSum, a) => partialSum + a, 0);
        return (eventCountSelected/nrDays >= minRelevantDailyEvents)
        });
    const relevantInputData = inputData.filter(row => relevantHostnames.includes(row['hostname']));
    inputData.forEach(row => delete row['eventCount']);

    anomalyDetectionConfig['overCombinationsLimit'] = relevantHostnames.length;
    const processedData = waaila.functions.isDayOfWeekAnomaly(anomalyDetectionConfig, relevantInputData);
    const valueColumnName = anomalyDetectionConfig['valueColumn'];
    const assert_pass_message = `No anomalies detected in the ${valueColumnName}`;
    const assert_fail_message = `There was an anomaly in the ${valueColumnName}`;
    const tableFormatting = [
        { column: valueColumnName, numberFormat: { style: 'percent' } },
        { column: 'expectedValue', numberFormat: { style: 'percent' } },
        { column: 'lowerBound', numberFormat: { style: 'percent' } },
        { column: 'upperBound', numberFormat: { style: 'percent' } },
        { column: 'isAnomaly', cellColor: { condition: { EQUAL: false } } }
    ];
    
    if (processedData['data'].length === 0){
        waaila.table(processedData);
    } else {
        const anomalies = processedData['data'].filter(row => row['isAnomaly'] == 1);
        waaila.assert(typeof anomalies[0] === 'undefined', 70)
            .pass.message(assert_pass_message).fail.message(assert_fail_message);

        const processedDataLastDay = processedData['data'].filter(row => row['isAnomaly'] != null)
            .order(['expectedValue'], true);
        processedDataLastDay.forEach(row => {
            row[valueColumnName] = row[valueColumnName]/100;
            row['expectedValue'] = row['expectedValue']/100;
            row['lowerBound'] = row['lowerBound']/100;
            row['upperBound'] = row['upperBound']/100;
            delete row['isNegativeAnomaly'];
            delete row['isPositiveAnomaly'];
        })
        waaila.table(processedDataLastDay.order(['hostname'], false), tableFormatting);
    }
    
}