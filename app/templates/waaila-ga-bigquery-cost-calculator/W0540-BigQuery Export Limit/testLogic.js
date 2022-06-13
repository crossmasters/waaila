(results, waaila) => {
	/**
    * @const {number} dailyExportLimit - Daily limit for BigQuery Export for free GA properties
    * @default 1000000
    */
    const dailyExportLimit = 1000000;
    /**
    * @const {array} timingLimits - Official caps on the amount timing hits processed daily based on the amount of pageview hits (https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings#sampling_considerations)
    * @default [{min: 0, max: 100000, value: 10000, multiple: null}, {min: 100000, max: null, value: null, multiple: 0.01}]
    */
    const timingLimits = [
        {min: 0, max: 1000, value: 100, multiple: null},
        {min: 1000, max: 10000, value: null, multiple: 0.1},
        {min: 10000, max: 100000, value: 10000, multiple: null},
        {min: 100000, max: Infinity, value: null, multiple: 0.01}
    ]
    
    /**
    * @assert 1 - Evaluate daily limit
    * @score 80
    */
    const data90d = waaila.functions.normalizeGaResult(results['request1'][0]);
    const summary90d = waaila.functions.summarizeGaResult(results['request1'][0]);
    const totalHits = summary90d['hits']['total'];

    var expanded_data = [];
    var totalHits_data = [];
    Object.keys(summary90d).forEach(metricName => {
        var metricDataInsert = {
                'metric name': metricName, 
                'total 3 months': summary90d[metricName]['total'], 
                'average daily amount': (summary90d[metricName]['total']/90).toFixed(1)};
        var metricValues = data90d.map(row => row[metricName]);
        metricDataInsert['maximum daily amount'] = Math.max(...metricValues);
        if (metricName === 'hits') {
            metricDataInsert['share above threshold'] = metricValues.filter(val => (val > dailyExportLimit)).length/metricValues.length*100 + ' %';
            totalHits_data.push(metricDataInsert);
        } else {
            expanded_data.push(metricDataInsert);
        }
    })
    // add timings cap
    var dailyPageviews = summary90d['pageviews']['total']/90;
    timingLimits.forEach(limit => {
        if ((dailyPageviews >= limit['min']) && (dailyPageviews < limit['max'])) {
            if (limit['value']) {
                expanded_data.push({
                    'metric name': 'timings (up to)', 'total 3 months': limit['value']*90, 
                    'average daily amount': limit['value'], 'maximum daily amount': '-'
                    });
            } else {
                expanded_data.push({
                    'metric name': 'timings (up to)', 'total 3 months': (dailyPageviews*limit['multiple']*90).toFixed(1), 
                    'average daily amount': (dailyPageviews*limit['multiple']).toFixed(1), 'maximum daily amount': '-'
                    });
            }
        }
    });
    waaila.assert(totalHits/90 < dailyExportLimit, 80).fail.message(`The estimated daily hits in UA property exceed the limit of {(dailyExportLimit/1000000).toFixed(2)} million hits daily on average.`);
    waaila.message('<b>total hits:</b>')
    waaila.table(totalHits_data);
    waaila.message('<b>hits by type:</b>')
    waaila.table(expanded_data);
}