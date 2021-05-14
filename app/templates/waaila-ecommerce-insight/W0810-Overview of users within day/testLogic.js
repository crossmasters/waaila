(results, waaila) => {
    /**
    * @info 1 - It shows the overview of revenue per user and user count in different phases of day
    * @score 0
    */
    const hourlyRevenue = waaila.functions.normalizeGaResult(results['hourlyRevenue'][0]);
    waaila.table(hourlyRevenue);
}
