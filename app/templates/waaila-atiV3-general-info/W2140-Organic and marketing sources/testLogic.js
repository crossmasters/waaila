(results, waaila) => {
    /**
    * @const {number} maxRatioChangeSpec - maximal allowed change in share of a source to total visits
    * @default 0.10
    */
    const maxRatioChangeSpec = 0.10;
    /**
    * @const {number} maxRatioChangeAgg - maximal allowed change in share of sum of all marketing or organic sources to total visits
    * @default 0.05
    */
    const maxRatioChangeAgg = 0.05;
    /**
    * @const {number} minVisits - minimal visits on a source (during previous period) to be included in the first part of the evaluation
    * @default 100
    */
    const minVisits = 100;
    
    /**
    * @assert 1 - none of the organic or paid sources changed their relative share compared to the same day previous week
    * @score 50
    */
    const visits = waaila.functions.normalizeAtiResult(results[0]);
    const totalVisits = waaila.functions.summarizeAtiResult(results[0]);
    
    const visits_L1 = +totalVisits['Visits (p1)']['total'];
    const visits_L8 = +totalVisits['Visits (p2)']['total'];
    
    const visitsFiltered = visits.filter(function (row) {
        return (Math.abs((+row['Visits (p1)']/visits_L1)/(+row['Visits (p2)']/visits_L8) - 1) >= maxRatioChangeSpec)
                && (+row['Visits (p2)'] >= minVisits);
    });
    visitsFiltered.forEach(function(row) {
        if(row['Visits (p2)'] == '-'){row['Visits (p2)'] = 0}
            row['Relative percent. change from (p2) to (p1)'] = Math.round(((+row['Visits (p1)']/visits_L1)/(+row['Visits (p2)']/visits_L8) - 1)*10000)/100;
    });
    
    const assert_pass_message_spec = 'Share of visits to total visits has not changed from any organic or paid sources compared to week before:';
    const assert_fail_message_spec = `Share of visits from some organic or paid sources to total visits has changed by more than ${maxRatioChangeSpec*100} % compared to week before:`;
    waaila.assert((typeof visitsFiltered[0] === 'undefined'), 50)
        .pass.message(assert_pass_message_spec)
        .fail.message(assert_fail_message_spec).table(visitsFiltered); 

    /**
    * @assert 2 - more generally, the share of organic source vs paid source has not changed compared to same day previous week
    * @score 50
    */
    const visitsAgg = [{'Campaign / Organic': 'Organic'}, {'Campaign / Organic': 'Campaigns'}];
    
    visitsAgg.forEach(function(rowAgg) {
        var sumSelectedVisits_L1 = 0;
        var sumSelectedVisits_L8 = 0;
        visits.forEach(function(rowRaw) {
            if(rowRaw['visits (p2)'] == '-'){rowRaw['Visits (p2)'] = 0}
            if (rowRaw['Campaign / Organic'] == rowAgg['Campaign / Organic']){
                sumSelectedVisits_L1 = sumSelectedVisits_L1 + rowRaw['Visits (p1)'];
                sumSelectedVisits_L8 = sumSelectedVisits_L8 + rowRaw['Visits (p2)'];
            }
        })
        rowAgg['Visits (p1)'] = sumSelectedVisits_L1;
        rowAgg['Visits (p2)'] = sumSelectedVisits_L8;
        rowAgg['Relative percent. change from (p2) to (p1)'] = Math.round(((+rowAgg['Visits (p1)']/visits_L1)/(+rowAgg['Visits (p2)']/visits_L8) - 1)*10000)/100;
    });
    
    const assert_pass_message_agg = `Share of organic vs. paid sources to total visits has not changed by more than ${maxRatioChangeAgg*100} % compared to week before.`;
    const assert_fail_message_agg = `Share of organic vs. paid sources to total visits has changed by more than ${maxRatioChangeAgg*100} % compared to week before:`;
    waaila.assert((Math.abs(visitsAgg[0]['Relative percent. change from (p2) to (p1)']) < maxRatioChangeAgg*100) 
            && (Math.abs(visitsAgg[1]['Relative percent. change from (p2) to (p1)']) < maxRatioChangeAgg*100), 50)
        .pass.message(assert_pass_message_agg).fail.message(assert_fail_message_agg).table(visitsAgg);
}
