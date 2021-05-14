(results, waaila) => {
    /**
    * @info 1 - It shows table with aggregated values. Metrics: Total revenue, shipping value, tax value and products revenue. When applicable, it shows also the local revenue, local shipping, local tax, local product revenue, product refund amount and the local refund amount.
    * @score 0
    */
    const transactionAgreg = waaila.functions.normalizeGaResult(results['transactionSetting'][0]);
    waaila.table(transactionAgreg);
    
    /**
    * @info 2 - It shows table with aggregated values. It shows a table with a sample of 10 transactions. Metrics: Total revenue, shipping value, tax value and products revenue. 
    * @score 0
    */
    const transactionExample = waaila.functions.normalizeGaResult(results['transactionSetting'][1]);
    waaila.message('Sample of 10 transactions:');
    waaila.table(transactionExample);
}
