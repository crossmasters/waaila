(results, waaila) => {
    /**
    * @info 1 - Checks largest source countries of the traffic
    * @score 0
    */
    const countryHostnames = waaila.functions.normalizeGaResult(results);
    waaila.message('Sample of largest up to 30 traffic source countries:');
    waaila.table(countryHostnames);
}