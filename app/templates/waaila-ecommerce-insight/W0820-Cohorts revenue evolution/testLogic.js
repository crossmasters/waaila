(results, waaila) => {
    /**
    * @info 1 - It shows the overview of selected cohorts over following periods (the test should be customized to display optimal data)
    * @score 0
    */
    const monthlyCohorts = waaila.functions.normalizeGaResult(results['monthlyCohorts'][0]);
    waaila.table(monthlyCohorts);
}
