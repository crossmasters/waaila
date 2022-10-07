(results, waaila) => {
    /**
    * @const {number} dailyExportLimit - Daily limit for BigQuery Export for free GA properties
    * @default 1000000
    */
    const dailyExportLimit = 1000000;
    
    /**
    * @warn 1 - Evaluate daily limit
    * @score 80
    */
    const data90d = waaila.functions.normalizeGaResult(results);
    const summary90d = waaila.functions.summarizeGaResult(results);
    const totalHits = summary90d['eventCount']['total'];

    const warn_pass_message = `Estimated daily hits within export the limit of ${(dailyExportLimit/1000000).toFixed(2)} million hits daily.`;
    const warn_fail_message = `The estimated daily hits in UA property exceed the limit of ${(dailyExportLimit/1000000).toFixed(2)} million hits daily.`;
    const warn_fail_howtofix = 'The export to BigQuery can be filtered by the event name. Check the following table to decide about the export setting.';
    waaila.warn(totalHits/90 < dailyExportLimit, 80)
        .pass.message(warn_pass_message)
        .fail.message(warn_fail_message + '<br/><br/> How to fix: <br/>' +  warn_fail_howtofix);

    data90d.forEach(row => row['estimated eventCount per day'] = (row['eventCount']/90).toFixed(1));
    waaila.message('Overview of main events by type:');
    waaila.table(data90d.head(5));
}