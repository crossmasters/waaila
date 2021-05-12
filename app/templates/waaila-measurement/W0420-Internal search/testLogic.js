(results, waaila) => {
    /**
    * @warn 1 - It checks if data from internal search are measured. If no data are found, it shows a warning.
    * @score 50
    */
    const searchSessionsSummary = waaila.functions.summarizeGaResult(results['searchSessions'][0]);
    const totalSearchSessions = +searchSessionsSummary['searchSessions']['total'];
    
    const warn_pass_message = 'Internal search data is measured.';
    const warn_fail_message = 'No internal search data found.';
    const warn_fail_howtofix = 'Check, that internal search option is present on web. If it is, check in view settings that internal search is enabled and parameter used in URL is set up correctly.';
    waaila.warn(totalSearchSessions > 0, 50)
        .pass.message(warn_pass_message)
        .fail.message(warn_fail_message + '<br/><br/> How to fix: <br/>' +  warn_fail_howtofix);
}
