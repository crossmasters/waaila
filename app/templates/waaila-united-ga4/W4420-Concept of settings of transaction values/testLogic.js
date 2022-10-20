(results, waaila) => {
    /**
    * @info 1 - It shows table with aggregated values. Metrics: Total revenue, shipping value, tax value and products revenue. When applicable, it shows also the local revenue, local shipping, local tax, local product revenue, product refund amount and the local refund amount.
    * @score 0
    */
    const transactionAgreg = waaila.functions.normalizeGaResult(results);
    const tableFormatting = [
        {column: 'purchaseRevenue', numberFormat: {style: 'decimal'}},
        {column: 'shippingAmount', numberFormat: {style: 'decimal'}},
        {column: 'taxAmount', numberFormat: {style: 'decimal'}},
        {column: 'itemRevenue', numberFormat: {style: 'decimal'}}
        ]
    waaila.table(transactionAgreg, tableFormatting);
}