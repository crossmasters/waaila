(results, waaila) => {
    /**
    * @warn 1 - Prepares data and checks that there is a default view.
    * @score 30
    */
    var defaultProfileId = '';
    if ('defaultProfileId' in results){
        defaultProfileId = results['defaultProfileId'];
    }
    
    const checkData = [
        {'name': 'Property name', 'value': results['name']},
        {'name': 'Website URL', 'value': results['websiteUrl']},
        {'name': 'Industry', 'value': results['industryVertical']},
        {'name': 'Default profile id', 'value': defaultProfileId},
        {'name': 'Data retention', 'value': results['dataRetentionTtl']},
        {'name': 'Is data retention renewed on activity?', 'value': results['dataRetentionResetOnNewActivity']}
    ];
    
    const warn_pass_message_defview = 'There is a default view.';
    const warn_fail_message_defview = 'There is no default view defined.';
    waaila.warn(defaultProfileId, 30).pass.message(warn_pass_message_defview).fail.message(warn_fail_message_defview);
    
    /**
    * @warn 2 - Checks that the website URL has defined protocol.
    * @score 30
    */
    const urlContainsProtocol = (results['websiteUrl'].includes('https://') || results['websiteUrl'].includes('http://'));
    const warn_pass_message_urlprot = 'All website URLs have protocol defined.';
    const warn_fail_message_urlprot = 'Some website URLs has no protocol.';
    waaila.warn(urlContainsProtocol, 30).pass.message(warn_pass_message_urlprot).fail.message(warn_fail_message_urlprot);
    
    waaila.table(checkData);
}