(results, waaila) => {
    /**
    * @info 1 - It shows the overview of several metrics (sessions, revenue per user, new users ratio and page views per session ratio) by device category 
    * @score 0
    */
    const viewSessionRatio = waaila.functions.normalizeGaResult(results['viewSessionRatio'][0]);
    waaila.table(viewSessionRatio);
}
