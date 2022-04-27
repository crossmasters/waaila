(results, waaila) => {
    /**
    * @info 1 - Table of all hostnames including metrics like sessions, transactions and pageviews 
    * @score 0
    */
    const hostnames = waaila.functions.normalizeGaResult(results['hostnames'][0]);
    waaila.table(hostnames);
}