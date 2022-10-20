(results, waaila) => {
    /**
    * @warn 1 - It checks if demographic data are measured. If not, it shows a warning.
    * @score 50
    */
    const demographicsSummary = waaila.functions.summarizeGaResult(results);
    const totalDemographics = +demographicsSummary['sessions']['total'];
    
    const warn_pass_message = 'Demographic data is measured.';
    const warn_fail_message = 'No demographic data found.';
    const warn_fail_howtofix = 'Check, that demographic data measurement option is enabled in settings on property level. In other words, field Enable Demographics and Interests Reports should be turned on.';
    waaila.warn(totalDemographics > 0, 50)
        .pass.message(warn_pass_message)
        .fail.message(warn_fail_message + '<br/><br/> How to fix: <br/>' +  warn_fail_howtofix);
}