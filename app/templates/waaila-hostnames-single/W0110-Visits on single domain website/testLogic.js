(results, waaila) => {
    /**
    * @const {number} sessionThreshold - share of sessions on the main domain should be above this threshold 
    * @default 0.98
    */
    const sessionThreshold = 0.98; 
    /**
    * @const {number} nrHostnamesDisplayed - maximum number of largest hostnames displayed in case of failure 
    * @default 10
    */
    const nrHostnamesDisplayed = 10; 

    /**
    * @warn 1 - Loads data and checks for presence of data for sessions by hostname
    * @score 0
    */
    const hostnameSessions = waaila.functions.normalizeGaResult(results['hostnameSessions'][0]);
    const hostnameSessionsSummary = waaila.functions.summarizeGaResult(results['hostnameSessions'][0]);

    const warn_fail_message = 'No data returned for sessions by hostname.';
    waaila.warn(typeof hostnameSessions[0] != 'undefined', 0).fail.message(warn_fail_message).break;

    /**
    * @assert 2 - It checks if the largest hostname has more than ${sessionThreshold} *100 % of all visits. Largest hostnames displayed in case of assert failure, based on ${nrHostnamesDisplayed} parameter
    * @score 80
    */
    const maxSessions = +hostnameSessionsSummary['sessions']['maximum'];
    const totalSessions = +hostnameSessionsSummary['sessions']['total'];
    const hostName = hostnameSessions[0]['hostname'];
    const hostnamesLength = hostnameSessions.length;

    const assert_pass_message = `Ratio of traffic on the most frequent hostname (${hostName}) to all traffic is higher than ${sessionThreshold*100} %`;
    const assert_fail_message = `Ratio of traffic on the most frequent hostname  (${hostName}) to all traffic is not higher than ${sessionThreshold*100} %`;
    const assert_fail_howtofix = 'Check if there is some filter for inclusion of hostnames applied, if not, create one. It should be an include filter with defined main hostname.';
    const assert_fail_tabledescribe = `Sample of largest hostnames (${Math.min(nrHostnamesDisplayed, hostnamesLength)} / ${hostnamesLength}):`; 
    
    waaila.assert(maxSessions / totalSessions > sessionThreshold, 80)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix 
            + '<br/><br/>'  + assert_fail_tabledescribe)
        .table(hostnameSessions.head(nrHostnamesDisplayed));
}