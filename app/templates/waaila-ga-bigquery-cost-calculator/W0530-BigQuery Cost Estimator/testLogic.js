(results, waaila) => {
    /**
    * @const {string} expectedAnalysisAmount - Expected amount of analysis (queries) you run on your data in BigQuery, options: 'low' (around the monthly amount of data), 'average' (around 10 times the monthly amount of data), 'high' (around 50 times the monthly amount of data)
    * @default average
    */
    const expectedAnalysisAmount = 'average';
    /**
    * @const {string} dataImportMethod - Used method of GA data import, options: 'streaming', 'batchLoad' (for more information https://cloud.google.com/bigquery/docs/loading-data)
    * @default streaming
    */
    const dataImportMethod = 'streaming';
    /**
    * @const {object} priceConfig - Settings of the prices for Big Query price calculation
    * @default {analysis: {unitPrice: 5,freeUnits: 1}, activeStorage: {unitPrice: 0.02,freeUnits: 10}, longTermStorage: {unitPrice: 0.01,freeUnits: 10}, streaming: {unitPrice: 0.01/200,freeUnits: 0}}
    */
    const priceConfig = {
        analysis: {
            unitPrice: 5,
            freeUnits: 1,
            unit: 'TiB'
        }, // pricing info per unit amount of analysis
        activeStorage: {
            unitPrice: 0.02,
            freeUnits: 10,
            unit: 'GiB'
        }, // pricing info per unit amount of recently stored data
        longTermStorage: {
            unitPrice: 0.01,
            freeUnits: 10,
            unit: 'GiB'
        }, // pricing info per unit amount of older (over 3 months) stored data
        streaming: {
            unitPrice: 0.00005,
            freeUnits: 0, 
            unit: 'MiB'
        } // pricing info per unit amount of streamed data
    };
    /**
    * @const {number} expectedHitSize - Expected size of hits in kiB units
    * @default 2
    */
    const expectedHitSize = 2;
    
    /**
    * @info 1 - Calculate the estimated monthly price for Big Query export
    * @score 0
    */
    const hitSummary3m = waaila.functions.summarizeGaResult(results['request1'][0]);
    const totalHits3m = hitSummary3m['hits']['total'];
    const hitSummary12m = waaila.functions.summarizeGaResult(results['request2'][0]);
    const totalHits12m = hitSummary12m['hits']['total'];
    var estimatedHits = 0;
    if (totalHits12m/12 >= totalHits3m/3){
        estimatedHits = totalHits3m/3;
    } else {
        estimatedHits = totalHits3m/3 + 1/3*(totalHits3m/3 - totalHits12m/12);
    }
    const estimatedMonthlyUnits = estimatedHits*expectedHitSize/1024;
    const estimatedActiveStorageUnits = estimatedMonthlyUnits*3/1024;
    const estimatedLongTermStorageUnits = estimatedMonthlyUnits*9/1024;
    const estimatedAnalysisUnits = (expectedAnalysisAmount === 'low' ? estimatedMonthlyUnits/(1024*1024) : 
        (expectedAnalysisAmount === 'high' ? 50*estimatedMonthlyUnits/(1024*1024) : 10*estimatedMonthlyUnits/(1024*1024)));
    const estimatedPriceAnalysis = Math.max(0,(estimatedAnalysisUnits - priceConfig['analysis']['freeUnits']))*priceConfig['analysis']['unitPrice'];
    const estimatedPriceActiveStorage = Math.max(0,(estimatedActiveStorageUnits - priceConfig['activeStorage']['freeUnits']))*priceConfig['activeStorage']['unitPrice'];
    const estimatedPriceLongTermStorage = Math.max(0,(estimatedLongTermStorageUnits - priceConfig['longTermStorage']['freeUnits']))*priceConfig['longTermStorage']['unitPrice'];
    const estimatedPriceImport = dataImportMethod === 'streaming' ? Math.max(0,(estimatedMonthlyUnits - priceConfig['streaming']['freeUnits']))*priceConfig['streaming']['unitPrice'] : 0;
    const estimatedTotalPrice = estimatedPriceAnalysis + estimatedPriceActiveStorage + estimatedPriceLongTermStorage + estimatedPriceImport;
    
    const dataImportResource = 'data import (configured method: ' + dataImportMethod + (dataImportMethod === 'streaming' ? ')' : ' - limit: 1 million hits)');
    const tableData = [
        {resource: 'analysis (configured usage: ' + expectedAnalysisAmount + ')', 'estimated size': estimatedAnalysisUnits.toFixed(2), units: 'TiB', 'estimated price': estimatedPriceAnalysis.toFixed(2)}, 
        {resource: 'active storage', 'estimated size': estimatedActiveStorageUnits.toFixed(2), units: 'GiB', 'estimated price': estimatedPriceActiveStorage.toFixed(2)},
        {resource: 'long-term storage (expected 1-year data retention)', 'estimated size': estimatedLongTermStorageUnits.toFixed(2), units: 'GiB', 'estimated price': estimatedPriceLongTermStorage.toFixed(2)}, 
        {resource: dataImportResource, 'estimated size': estimatedMonthlyUnits.toFixed(2), units: 'MiB', 'estimated price': estimatedPriceImport.toFixed(2)},
        {resource: 'TOTAL', 'estimated size': '-', units: '-', 'estimated price': estimatedTotalPrice.toFixed(2)}
    ];
    waaila.message('The estimated monthly price is <b>' + estimatedTotalPrice.toFixed(2) + ' USD</b> for ' + (estimatedHits/1000000).toFixed(3) + ' million hits monthly.');
    waaila.table(tableData);
}