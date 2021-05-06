(results, waaila) => {
    /**
    * @info 1 - Table of all hostnames including metrics like sessions, transactions and pageviews 
    * @score 40
    */
    const hostnames = waaila.functions.normalizeGaResult(results['hostnames'][0]);
    waaila.table(hostnames);
}