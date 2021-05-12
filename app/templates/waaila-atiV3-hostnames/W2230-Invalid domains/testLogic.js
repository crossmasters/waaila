(results, waaila) => {
    /**
    * @assert 1 - It checks if there are hostnames containing localhost/google.translate/google.web.cache
    * @score 80
    */
    const hostnames = waaila.functions.normalizeAtiResult(results[0]);
    const hostnamesSummary = waaila.functions.summarizeAtiResult(results[0]);
    const totalVisits = +hostnamesSummary['Visits']['total'];
    const totalTransactions = +hostnamesSummary['Transactions']['total'];
    
    const assert_pass_message = 'There are no sessions or transactions on hostnames containing localhost/google.translate/google.we.cache.';
    const assert_fail_message = 'There are some sessions or transactions on hostnames containing localhost/google.translate/google.we.cache.';
    const assert_fail_howtofix = 'Check if there is some filter for exclusion of hostnames applied, if not, create one. It should be an exclude filter with defined hostnames you want to filter out.';
    waaila.assert((totalVisits == 0) && (totalTransactions == 0), 80)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix)
        .table(hostnames);
}