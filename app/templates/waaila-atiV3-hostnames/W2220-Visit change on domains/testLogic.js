(results, waaila) => {
    /**
    * @const {number} maxRatioChange - maximal allowed increase or decrease od visits on a domain (as a ratio to visits a week ago)
    * @default 0.40
    */
    const maxRatioChange = 0.40;
    /**
    * @const {array} excludedDomainsArray - list of domains that should not excluded from the check, use empty list for no exclusion 
    * @default ['N/A','some-other-domain.cz']
    */
    const excludedDomainsArray = ['N/A','some-other-domain.cz'];
      
    /**
    * @assert 1 - Checks that every non-excluded domain has similar traffic as during the same day previous week
    * @score 100
    */
    const visits = waaila.functions.normalizeAtiResult(results[0]);
    visits.forEach(function(row) {
        if (row['Visits (p2)'] == '-'){
            row['Visits (p2)'] = 0;
        }
    })
    
    const varyingDomains = visits.filter(function (row) {
        return ((+row['Difference (m_visits (p2) - m_visits (p1))']/+row['Visits (p2)'] <= - maxRatioChange) 
                || (+row['Difference (m_visits (p2) - m_visits (p1))']/+row['Visits (p2)'] >= maxRatioChange))
                && !(excludedDomainsArray.includes(row['Site.domain']));
    }).map(function (row){ 
        return row['Site.domain'];
    });
    const varyingDomainsJoined = varyingDomains.join(', ');

    const visitsFiltered = visits.filter(function(row) {
        return !excludedDomainsArray.includes(row['site.domain']);
    })
    visitsFiltered.forEach(function(row) {
        row['Percent. change from (p2) to (p1)'] = Math.round(+row['Difference (m_visits (p2) - m_visits (p1))']/+row['Visits (p2)']*10000)/100;
        delete row['Difference (m_visits (p2) - m_visits (p1))'];
    })
    const assert_pass_message = 'Visits have not diverged more than ${maxRatioChange*100} % from visits week before on any included domains.';
    const assert_fail_message = 'Visits on some domains (${varyingDomainsJoined}) have diverged more than ${maxRatioChange*100} % from visits week before.';
    waaila.assert((typeof varyingDomains[0] === 'undefined'), 100)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message).table(visitsFiltered); 
}