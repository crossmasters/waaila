(results, waaila) => {
    /**
    * @const {number} minParameterPageViews - minimum amount of page views with given parameter to include the parameter in report
    * @default 100
    */
    const minParameterPageViews = 100;
    /**
    * @const {number} maxNrSamplePaths - maximum number of unique paths without parameters displayed for each parameter
    * @default 5
    */
    const maxNrSamplePaths = 5;
    /**
    * @const {number} maxNrDisplayedValues - maximum number of displayed unique values for each parameter
    * @default 10
    */
    const maxNrDisplayedValues = 10;

    /**
    * @info 1 - Tables with samples of paths for the parameters found and their frequency (page views)
    * @score 0
    */
    const paths = waaila.functions.normalizeGaResult(results['parameters'][0]);
	
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
                    params[param[0]] = param[1] //filterInt(param[1]) ? filterInt(param[1]) : param[1];
                }
            });
        }
        return params;
    }

    let params = {};
    paths.forEach(row => {
        var extractedParams = extractParams(row.pagePath);
        Object.keys(extractedParams).forEach(par => {
            params[par] = params[par] || {count: 0, samplePaths: [], values: []};
            params[par].count += row.pageViews;
            let uriSimple = row.pagePath.substring(0,row.pagePath.indexOf(startAfter))
            if ((params[par].samplePaths.length < maxNrSamplePaths) && (params[par].samplePaths.indexOf(uriSimple) === -1)) {
                params[par].samplePaths.push(uriSimple);
            }

            let newVal = true;
            params[par].values.forEach(val => {
                if (val['value (up to ' + maxNrDisplayedValues + ' unique)'] === extractedParams[par]) {
                    val.pageViews += row.pageViews;
                    newVal = false;
                }
            })
            if (newVal && (params[par].values.length < maxNrDisplayedValues)) {
                let valueAddObject = {};
                valueAddObject['value (up to ' + maxNrDisplayedValues + ' unique)'] = extractedParams[par].replaceAll('"', '\\"');
                valueAddObject.pageViews = row.pageViews;
                params[par].values.push(valueAddObject);
            }
        })
    })

    
    Object.keys(params).forEach(par => {
        if (params[par].count >= minParameterPageViews){
            waaila.message('<b>' + par + '</b>');
            waaila.message('sample of url (up to ' + maxNrSamplePaths + ' unique):')
            params[par].samplePaths.forEach(samplePath => waaila.message(samplePath));
            waaila.table(params[par].values);
        }
    })
}