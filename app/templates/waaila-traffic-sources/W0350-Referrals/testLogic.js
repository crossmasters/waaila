(results, waaila) => {
    /**
    * @const {number} minimalCurrentSessionsUnexpected - referrals included in check for unexpected referrals if they have more sessions
    * @default 20
    */
    const minimalCurrentSessionsUnexpected = 20;
    /**
    * @const {number} minimalPreviousSessionsIncrease - referrals included in check for increase if they previously had more sessions
    * @default 20
    */
    const minimalPreviousSessionsIncrease = 20;
    /**
    * @const {number} maximalAllowedPercIncrease - percentage increase of sessions above this parameter is marked as significant unexpected increase
    * @default 50
    */
    const maximalAllowedPercIncrease = 50;

    /**
    * @assert 1 - There is no unexpected large source not present before
    * @score 50
    */
    const current = waaila.functions.normalizeGaResult(results['current'][0]);
    const previous = waaila.functions.normalizeGaResult(results['previous'][0]);

    const previousReferralsArray = previous.map(row => row['source']);
    const unexpectedReferrals = current.filter(function (row) {
        return (previousReferralsArray.includes(row['source']) === false) && (row['sessions'] >= minimalCurrentSessionsUnexpected);
    })
    const assert_pass_message_blackout = `No unexpected referrals yesterday with more than ${minimalCurrentSessionsUnexpected} sessions`;
    const assert_fail_message_blackout = `There are some unexpected referrals yesterday with more than ${minimalCurrentSessionsUnexpected} sessions`;
    waaila.assert(typeof unexpectedReferrals[0] === 'undefined', 50)
        .pass.message(assert_pass_message_blackout)
        .fail.message(assert_fail_message_blackout).table(unexpectedReferrals); 

    /**
    * @assert 2 - There is no unexpected increase in any of the existing sources
    * @score 50
    */
    current.forEach(function (rowCurr) {
        var previousSessions = 0;
        previous.forEach(function (rowPrev) {
            if (rowPrev['source'] == rowCurr['source']){
                previousSessions = previousSessions + rowPrev['sessions'];
            }
        })
        rowCurr['sessionsPrevious'] = previousSessions;
        rowCurr['sessionsPercChange'] = Math.round((rowCurr['sessions'] - previousSessions)/previousSessions*10000)/100;
    })
    
    const increasingReferrals = current.filter(function (row) {
        return ((row['sessionsPercChange'] > maximalAllowedPercIncrease) && (row['sessionsPrevious'] > minimalPreviousSessionsIncrease))
    })

    const assert_pass_message_increase = 'No referrals increased significantly yesterday compared to previous period.';
    const assert_fail_message_increase = `2) Some referrals increased by more than ${maximalAllowedPercIncrease} percent yesterday compared to previous period.`;
    waaila.assert(typeof increasingReferrals[0] === 'undefined', 50)
        .pass.message(assert_pass_message_increase)
        .fail.message(assert_fail_message_increase).table(increasingReferrals); 
}