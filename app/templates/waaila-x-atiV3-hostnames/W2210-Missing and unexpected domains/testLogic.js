(results, waaila) => {
    // Run the test once and based on the results configure the following arrays (more information on [link-to-template]#further-information)
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
    * @score 50
    */
    const visits = waaila.functions.normalizeAtiResult(results[0]);
    const currentDomainsArray = visits.map(function (row){ 
        return row['Site.domain'];
    });
    let missingDomainsArray = necessaryDomainsArray.filter(function (domain) {
        return currentDomainsArray.includes(domain) == false;
    });
    const missingDomainsArrayJoined = missingDomainsArray.join(', ');
    const assert_pass_message_blackout = 'No necessary domains are missing in the data yesterday.';
    const assert_fail_message_blackout = `There are some necessary domains that are missing in the data yesterday: ${missingDomainsArrayJoined}`;
    waaila.assert(typeof missingDomainsArray[0] === 'undefined', 50)
        .pass.message(assert_pass_message_blackout).fail.message(assert_fail_message_blackout); 

    /**
    * @assert 2 - Check that there is no unexpected domain included.
    * @score 50
    */ 
    const newDomains = visits.filter(function (row) {
        return permittedDomainsArray.includes(row['Site.domain']) == false;
    });
    const assert_pass_message_unexpected = 'There are no visits yesterday on unexpected domains.';
    const assert_fail_message_unexpected = 'There are some visits yesterday on unexpected domains.';
    waaila.assert((typeof newDomains[0] === 'undefined'), 50)
        .pass.message(assert_pass_message_unexpected).fail.message(assert_fail_message_unexpected).table(newDomains); 
}