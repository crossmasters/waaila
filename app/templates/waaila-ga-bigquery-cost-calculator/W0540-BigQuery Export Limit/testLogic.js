(results, waaila) => {
    /**
    * @const {number} dailyExportLimit - Daily limit for BigQuery Export for free GA properties
    * @default 1000000
    */
    const dailyExportLimit = 1000000;
    /**
    * @const {array} timingLimits - Official caps on the amount timing hits processed daily based on the amount of pageview hits (https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings#sampling_considerations)
    * @default [{min: 0, max: 100000, value: 10000}, {min: 100000, multiple: 0.01}]
    */
    const timingLimits = [
        {min: 0, max: 1000, value: 100},
        {min: 1000, max: 10000, multiple: 0.1},
        {min: 10000, max: 100000, value: 10000},
        {min: 100000, multiple: 0.01}
    ];
    
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
            metricDataInsert['share above threshold'] = metricValues.filter(val => (val > dailyExportLimit)).length/metricValues.length;
            totalHits_data.push(metricDataInsert);
        } else {
            expanded_data.push(metricDataInsert);
        }
    })
    // add timings cap
    const dailyPageviews = summary90d['pageviews']['total']/90;
    const timingHitsEstimated90d = totalHits_data[0]['total 3 months'] - expanded_data.map(row => row['total 3 months']).reduce((partialSum, a) => partialSum + a, 0);
    timingLimits.forEach(limit => {
        if (!limit['max']) limit['max'] = Infinity;
        if ((dailyPageviews >= limit['min']) && (dailyPageviews < limit['max'])) {
            if (limit['value']) {
                expanded_data.push({
                    'metric name': 'timings (estimated)', 'total 3 months': Math.min(limit['value']*90, timingHitsEstimated90d), 
                    'average daily amount': Math.min(limit['value'], timingHitsEstimated90d/90).toFixed(1), 'maximum daily amount': '-'
                    });
            } else {
                expanded_data.push({
                    'metric name': 'timings (estimated)', 'total 3 months': (Math.min(dailyPageviews*limit['multiple']*90), timingHitsEstimated90d).toFixed(1), 
                    'average daily amount': (Math.min(dailyPageviews*limit['multiple'], timingHitsEstimated90d/90)).toFixed(1), 'maximum daily amount': '-'
                    });
            }
        }
    });

    const formatting = [
        { column: 'total 3 months', numberFormat: { style: 'decimal' } },
        { column: 'average daily amount', numberFormat: { style: 'decimal' } },
        { column: 'maximum daily amount', numberFormat: { style: 'decimal' } },
        { column: 'share above threshold', numberFormat: { style: 'percent' } }
    ];

    const messageFail = `The estimated daily hits in UA property exceed the limit of ${(dailyExportLimit/1000000).toFixed(2)} million hits daily on average. You will not be able to use bulk export and will need to use paid stream export.`
    waaila.warn(totalHits/90 < dailyExportLimit, 80).fail.message(messageFail);
    waaila.message('<b>total hits:</b>')
    waaila.table(totalHits_data); // , formatting
    waaila.message('<b>hits by type:</b>')
    waaila.table(expanded_data); // , formatting
}