(results, waaila) => {
    /**
    * @const {number} eventSessionThreshold - minimal expected share of number of events to number of sessions
    * @default 1.05
    */
    const eventSessionThreshold = 1.05; 
    
    /**
    * @assert 1 - It compares the amount of events on the website to the amount of sessions generated. The total amount of events should be higher than the total amount of sessions. If the ratio is below the eventSessionThreshold, the test fails.
    * @score 150
    */
    const eventSessionRatio = waaila.functions.normalizeGaResult(results);
    const eventSessionRatioSummary = waaila.functions.summarizeGaResult(results);
    const totalRatio = +eventSessionRatioSummary['eventSessionRatio']['total'];

    let selectedDeviceArray = eventSessionRatio.filter(function (row) {
        return row['eventSessionRatio'] <= eventSessionThreshold;
    }).map(function (row){
        return row['deviceCategory'];
    });
    
    const selectedDeviceArrayJoined = selectedDeviceArray.join(', ');
    const assert_pass_message = `The total amount of events is higher than the total amount of sessuibs - average Event per Session ratio is ${Math.round(totalRatio*10000)/10000}`;
    const assert_fail_message = `There is an unusually low number of sessions compared to events for some devices: ${selectedDeviceArrayJoined} (the share of events to sessions is below the threshold of ${eventSessionThreshold})`;
    const assert_fail_howtofix = 'Check that pageview measurement is triggered correctly.';
    const assert_fail_tabledescribe = 'Table with ratios by device type';
    waaila.assert(typeof selectedDeviceArray[0] === 'undefined', 150)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix 
            + '<br/>' + assert_fail_tabledescribe).table(eventSessionRatio);
}