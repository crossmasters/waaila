(results, waaila) => {
    /**
    * @assert 1 - Checks if there are hostnames containing localhost/google.translate/google.we.cache
    * @score 80
    */
    const hostnames = waaila.functions.normalizeGaResult(results['hostnames'][0]);
    const hostnamesSummary = waaila.functions.summarizeGaResult(results['hostnames'][0]);
    const wrongHostnames = +hostnamesSummary['transactions']['total'];

    const assert_pass_message = 'There are no hostnames containing localhost/google.translate/google.we.cache.';
    const assert_fail_message = 'There is hostname containing localhost/google.translate/google.we.cache.';
    const assert_fail_howtofix = 'Check if there is some filter for exclusion of hostnames applied, if not, create one. It should be exclude filter with defined hostnames you want to filter out.';
    waaila.assert(wrongHostnames == 0, 80)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' 
            + assert_fail_howtofix).table(hostnames);
}
