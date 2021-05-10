(results, waaila) => {
    // Run the test once and based on the results configure the following arrays (more information on https://github.com/crossmasters/waaila/tree/master/app/templates/waaila-hostnames-multiple/W0130-Expected%20Domains#further-information)
    /**
    * @const {array} necessaryDomainsArray - list of domains that are required to be present in the data
    * @default ['main-domain.com', 'other-domain.com']
    */
    const necessaryDomainsArray = ['main-domain.com', 'other-domain.com']; 
    /**
    * @const {array} permittedDomainsArray - list of all domains that are allowed to be present in the data (N/A denotes undefined value)
    * @default ['main-domain.com', 'other-domain.com', 'N/A']
    */
    const permittedDomainsArray = ['main-domain.com', 'other-domain.com', 'N/A']; 
    
    /**
    * @assert 1 - Check that none of the necessary domains disappeared.
    * @score 60
    */
    const hostnameSessions = waaila.functions.normalizeGaResult(results['hostnameSessions'][0]);
    
    currentDomainsArray = hostnameSessions['data'].map(function (row){ 
        return row['hostname'];
    });
    let missingDomainsArray = necessaryDomainsArray.filter(function (domain) {
        return currentDomainsArray.includes(domain) == false;
    });
    const missingDomainsArrayMessage = missingDomainsArray.join(', ');
    const assert_pass_message_blackout = 'No necessary domains are missing in the data.';
    const assert_fail_message_blackout = `There are some necessary domains that are missing in the data: ${missingDomainsArrayMessage}`;
    waaila.assert(typeof missingDomainsArray[0] === 'undefined', 60)
        .pass.message(assert_pass_message_blackout).fail.message(assert_fail_message_blackout); 

    /**
    * @assert 2 - Check that there is no unexpected domain included.
    * @score 60
    */ 
    hostnameSessions['data'] = hostnameSessions['data'].filter(function (row) {
        return permittedDomainsArray.includes(row['hostname']) == false;

    });
    
    const assert_pass_message_unexpected = 'No unexpected domains are measured in the data.';
    const assert_fail_message_unexpected = 'There are some sessions on unexpected domains:';
    waaila.assert((typeof hostnameSessions['data'][0] === 'undefined'), 60)
        .pass.message(assert_pass_message_unexpected).fail.message(assert_fail_message_unexpected).table(hostnameSessions); 
}