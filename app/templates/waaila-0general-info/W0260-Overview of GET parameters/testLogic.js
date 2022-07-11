(results, waaila) => {
    /**
    * @const {number} minParameterPageviews - minimum amount of pageviews with given parameter to include the parameter in report
    * @default 100
    */
    const minParameterPageviews = 100;
    /**
    * @const {number} nrSamplePaths - number of paths displayed for each parameter
    * @default 10
    */
    const nrSamplePaths = 10;

    /**
    * @info 1 - Tables with samples of paths for the parameters found and their frequency (page views)
    * @score 0
    */
    const paths = waaila.functions.normalizeGaResult(results['parameters'][0]);
	
    waaila.message('All parameters found:');
    const delimiter = '&',
        keyValueSeparator = '=',
        startAfter = '?',
        data = results['parameters'][0].data.rows || [];


    function filterInt(value) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
            return Number(value);
        }
        return NaN;
    }

    function extractParams(uri) {
        let params = {};
        if (uri && (uri.indexOf(startAfter) > 0 || uri.indexOf(keyValueSeparator) > 0)) {
            uri.substring(uri.indexOf(startAfter) + 1).split(delimiter).forEach(function (e, i, a) {
                var param = e.split(keyValueSeparator, 2);
                if (param[0].length > 0) {
                    params[param[0]] = filterInt(param[1]) ? filterInt(param[1]) : param[1];
                }
            });
        }
        return params;
    }

    let params = {};
    paths.forEach(row => {
        var extractedParams = extractParams(row.pagePath);
        Object.keys(extractedParams).forEach(par => {
            params[par] = params[par] || {count: 0, samplePaths: []};
            params[par].count += row.pageViews;
            if (params[par].samplePaths.length < nrSamplePaths) {
                let pushPathObject = {};
                pushPathObject[par] = row.pagePath;
                pushPathObject.pageviews = row.pageViews;
                params[par].samplePaths.push(pushPathObject);
            }
        })
    })

    Object.keys(params).forEach(par => {
        if (params[par].count >= minParameterPageviews){
            waaila.table(params[par].samplePaths)
        }
    })
}