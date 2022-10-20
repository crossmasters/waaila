(results, waaila) => {
    /**
    * @warn 1 - It checks if all content groups have 0 page views. in that case it shows a warning.
    * @score 50
    */
    const contentGroups = waaila.functions.normalizeGaResult(results);
    const contentGroupsSummary = waaila.functions.summarizeGaResult(results);
    const contentGroupsViews = +contentGroupsSummary['screenPageViews']['total'];
    
    const warn_pass_message = 'Content groups measured (displayed up to 30 largest combinations of content group values)';
    const warn_fail_message = 'No content group measurement found.';
    const warn_fail_howtofix = 'Consider using content groups. They may be set up using GTM and defining in view settings. Suitable for measuring categories in an e-shop or blog.';
    waaila.warn(contentGroupsViews > 0, 50)
        .pass.message(warn_pass_message).table(contentGroups)
        .fail.message(warn_fail_message + '<br/><br/> How to fix: <br/>' +  warn_fail_howtofix);
}