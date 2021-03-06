(results, waaila) => {
    /**
    * @const {number} visitRatioThreshold - minimal expected share of number of visits to number of visitors
    * @default 1.05
    */
    const visitRatioThreshold = 1.05; 
    /**
    * @const {array} excludedDevicesArray - devices listed in this array are excluded from the comparison, use empty list for no exclusion
    * @default ['N/A']
    */
    const excludedDevicesArray = ['N/A'];
    
    /**
    * @assert 1 - It compares the number of visitors on the website to the amount of visits generated. The total amount of visits should be higher than the total number of visitors. If the ratio is below 1.05, the test fails.
    * @score 150
    */
    const visitRatio = waaila.functions.normalizeAtiResult(results[0]);
    const visitRatioSummary = waaila.functions.summarizeAtiResult(results[0]);
    const totalVisits = +visitRatioSummary['Visits']['total'];
    const totalVisitors = +visitRatioSummary['Visitors']['total'];
    const totalRatio = totalVisits/totalVisitors;
    
    let selectedDeviceArray = visitRatio.filter(function (row) {
        return (row['Visits / visitor'] <= visitRatioThreshold) && !(excludedDevicesArray.includes(row['Device - Type']));
    }).map(function (row){
        return row['Device - Type'];
    });
    
    const selectedDeviceArrayJoined = selectedDeviceArray.join(', ');
    const assert_pass_message = `The total amount of visits is higher than the total number of visitors - average visits per visitor is ${Math.round(totalRatio*10000)/10000}`;
    const assert_fail_message = `There is an unusually low number of visitors compared to visits for some devices: ${selectedDeviceArrayJoined} (the share of visitors to visits is below the threshold of ${visitRatioThreshold})`;
    const assert_fail_howtofix = 'Check that pageview measurement is triggered correctly.';
    const assert_fail_tabledescribe = 'Shows the table with ratios by Device type.';
    waaila.assert(typeof selectedDeviceArray[0] === 'undefined', 150)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix 
            + '<br/><br/>' + assert_fail_tabledescribe).table(visitRatio);
}
