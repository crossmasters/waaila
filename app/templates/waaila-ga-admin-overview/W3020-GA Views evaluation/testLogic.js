(results, waaila) => {
    /**
    * @const {array} expectedProfileTypes - Set of main view types that are expected to be present, this can be extended based on client needs, eg. backup, bckp, test,...
    * @default ['master', 'raw']
    */
    const expectedProfileTypes = ['master', 'raw'];

    /**
    * @warn 1 - Prepares data and checks presence of expected profile types
    * @score 20
    */
    const excludeVars = ['kind', 'selfLink', 'accountId', 'webPropertyId', 'internalWebPropertyId', 'type',
        'permissions', 'created', 'updated', 'parentLink', 'childLink'];
    results['items'].forEach(function(p) {
        excludeVars.forEach(function (key) {
            delete p[key];
        });
    });

    const missingProfileTypes = expectedProfileTypes.filter(function (type) {
        var included = false;
        results['items'].forEach(function (p){
            included = p['name'].includes(type) || included;
        });
        return included == false;
    });
    const missingProfileTypesJoined = missingProfileTypes.join(', ');
    const expectedProfileTypesJoined = expectedProfileTypes.join(', ');
    const warn_pass_message_proftype = `All expected profile types (${expectedProfileTypesJoined}) are present.`;
    const warn_fail_message_proftype = `Some of the expected types are missing: ${missingProfileTypesJoined}`;
    waaila.warn(typeof missingProfileTypes[0] === undefined, 20).pass.message(warn_pass_message_proftype).fail.message(warn_fail_message_proftype);

    /**
    * @warn 2 - Checks if bot filtering is enabled
    * @score 20
    */
    const botFilteringEnabled = Math.min(...results['items'].map(p => p['botFilteringEnabled']));
    const warn_pass_message_bot = 'Bot filtering is enabled on all views.';
    const warn_fail_message_bot = 'Bot filtering not enabled at least on one of the views.';
    waaila.warn(botFilteringEnabled, 20).pass.message(warn_pass_message_bot).fail.message(warn_fail_message_bot);

    /**
    * @warn 3 - Checks if there is any view with website that has no protocol
    * @score 20
    */
    const urlContainsProtocol = Math.min(...results['items'].map(p => (p['websiteUrl'].includes('https://') || p['websiteUrl'].includes('http://'))));   
    const warn_pass_message_urlprot = 'All views have websites with protocol defined.';
    const warn_fail_message_urlprot = 'For at least one of the views the website URLs has no protocol.';
    waaila.warn(urlContainsProtocol, 20).pass.message(warn_pass_message_urlprot).fail.message(warn_fail_message_urlprot);

    waaila.table(results['items']);
}