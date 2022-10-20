(results, waaila) => {
    /**
    * @const {number} lowerRatioThreshold - lower bound to share of events last 7 days to weekly average events last 28 days
    * @default 0.7
    */
    const lowerRatioThreshold = 0.7;
    /**
    * @const {number} upperRatioThreshold - upper bound to share of events last 7 days to weekly average events last 28 days
    * @default 1.4
    */
    const upperRatioThreshold = 1.4;
    
    /**
    * @assert 1 - If the total of the events for the latest week is not between 70% and 140% of the weekly average, it can be due to a successful campaign implemented or an error in measurement or a deeper issue that needs to be investigated.
    * @score 150
    */
    const events28dSummary = waaila.functions.summarizeGaResult(results, 0);
    const events7dSummary = waaila.functions.summarizeGaResult(results, 1);
    const events28d = +events28dSummary['eventCount']['total'];
    const events7avg = events28d / 4;
    const events7d = +events7dSummary['eventCount']['total'];
    const tableData = [{
        'metric name': 'eventCount', 'values last week': events7d, 'values last month': events28d,
        'average weekly values last month': events7avg, 'share to average': events7d / events7avg
    }];
    const tableFormatting = [
        { column: 'values last week', numberFormat: { style: 'decimal' } },
        { column: 'values last month', numberFormat: { style: 'decimal' } },
        { column: 'average weekly values last month', numberFormat: { style: 'decimal' } },
        { column: 'share to average', numberFormat: { style: 'percent' } }
    ];
    
    const assert_pass_message = `Events this week do not differ significantly from weekly average last month (they are between ${lowerRatioThreshold * 100} and ${upperRatioThreshold * 100} % of average events for a week)`;
    const assert_fail_message = `Events this week are not between ${lowerRatioThreshold * 100} and ${upperRatioThreshold * 100} % of average events for a week`;
    const assert_fail_howtofix = 'Check, if the GA code is triggered on the website.';
    
    waaila.assert((events7d > events7avg * lowerRatioThreshold) && (events7d < events7avg * upperRatioThreshold), 150)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' + assert_fail_howtofix)
        .table(tableData, tableFormatting);
}