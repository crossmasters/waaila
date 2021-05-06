(results, waaila) => {
    /**
    * @const {number} sessionUserThreshold - minimal expected share of number of sessions to number of users
    * @default 1.05
    */
    const sessionUserThreshold = 1.05; 
    
    /**
    * @assert 1 - It compares the number of users on the website to the amount of sessions generated. The total amount of sessions should be higher than the total number of users. If the ratio is below the sessionUserThreshold, the test fails.
    * @score 150
    */
    const sessionUserRatio = waaila.functions.normalizeGaResult(results['sessionUserRatio'][0]);
    const sessionUserRatioSummary = waaila.functions.summarizeGaResult(results['sessionUserRatio'][0]);
    const totalRatio = +sessionUserRatioSummary['sessionUserRatio']['total'];

    let selectedDeviceArray = sessionUserRatio.filter(function (row) {
        return row['sessionUserRatio'] <= sessionUserThreshold;
    }).map(function (row){
        return row['deviceCategory'];
    });
    
    const selectedDeviceArrayJoined = selectedDeviceArray.join(', ');
    const assert_pass_message = `The total amount of sessions is higher than the total number of users - average Sessions per User is ${Math.round(totalRatio*10000)/10000}`;
    const assert_fail_message = `There is an unusually low number of users compared to visits for some devices: ${selectedDeviceArrayJoined} (the share of users to sessions is below the threshold of ${sessionUserThreshold})`;
    const assert_fail_howtofix = 'Check that pageview measurement is triggered correctly.';
    const assert_fail_tabledescribe = 'Table with ratios by device type';
    waaila.assert(typeof selectedDeviceArray[0] === 'undefined', 150).pass.message(assert_pass_message).fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix + '<br/>' + assert_fail_tabledescribe).table(sessionUserRatio).break;
}