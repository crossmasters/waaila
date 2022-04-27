(results, waaila) => {
    /**
    * @info 1 - Table with sample of parameters found and their frequency (page views)
    * @score 0
    */
    const parameters = waaila.functions.normalizeGaResult(results['parameters'][0]);
	
    waaila.message('Sample of 10 page paths with their frequencies:');
    waaila.table(parameters.head(10));

    /**
    * @info 2 - List of all parameters found
    * @score 0
    */
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

        let keys = [],
            params = [];
        data.forEach(function (e, i, a) {
            var extractedParams = extractParams(e.dimensions[0]);
            params.push(extractedParams);	
            keys = keys.concat(Object.keys(extractedParams));            
        });

        keys = Array.from(new Set(keys));

        keys.forEach(function(e){
            waaila.message(e)
            });
}