(results, waaila) => {
    /**
    * @const {number} nrIncludedDays - The number of last days of data included in the price calculation
    * @default 90
    */
    const nrIncludedDays = 90;
    /**
    * @const {object} priceConfig - Settings of the prices for Big Query price calculation
    * @default {queries: {unitPrice: 5,freeUnits: 1}, activeStorage: {unitPrice: 0.02,freeUnits: 10}, longTermStorage: {unitPrice: 0.01,freeUnits: 10}, streaming: {unitPrice: 0.01/200,freeUnits: 0}}
    */
    const priceConfig = {
        queries: {
            unitPrice: 5,
            freeUnits: 1,
            unit: 'TiB'
        }, // pricing info per unit amount of queries
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
    * @const {number} expectedQueryUnits - Expected amount of queries in TiB units
    * @default 3
    */
    const expectedQueryUnits = 3;
    /**
    * @const {number} expectedEventSize - Expected size of events in kiB units
    * @default 2
    */
    const expectedEventSize = 2;
    
    /**
    * @info 1 - Calculate the estimated monthly price for Big Query export
    * @score 0
    */
    const events = waaila.functions.normalizeGaResult(results);
    const eventsLastNdays = events.order(['date'], true).head(nrIncludedDays)
    const estimatedMonthlyEvents = eventsLastNdays.map(row => row['eventCount']).reduce((a, b) => a + b, 0)/nrIncludedDays*(365.25/12);
    
    const estimatedStreamingUnits = estimatedMonthlyEvents*expectedEventSize/1024;
    const estimatedActiveStorageUnits = estimatedStreamingUnits*3/1024;
    const estimatedLongTermStorageUnits = estimatedStreamingUnits*9/1024;
    
    const estimatedPriceQueries = Math.max(0,(expectedQueryUnits - priceConfig['queries']['freeUnits']))*priceConfig['queries']['unitPrice'];
    const estimatedPriceActiveStorage = Math.max(0,(estimatedActiveStorageUnits - priceConfig['activeStorage']['freeUnits']))*priceConfig['activeStorage']['unitPrice'];
    const estimatedPriceLongTermStorage = Math.max(0,(estimatedLongTermStorageUnits - priceConfig['longTermStorage']['freeUnits']))*priceConfig['longTermStorage']['unitPrice'];
    const estimatedPriceStreaming = Math.max(0,(estimatedStreamingUnits - priceConfig['streaming']['freeUnits']))*priceConfig['streaming']['unitPrice'];
    
    const estimatedTotalPrice = estimatedPriceQueries + estimatedPriceActiveStorage + estimatedPriceLongTermStorage + estimatedPriceStreaming;
    waaila.message(`The estimated monthly price is ${estimatedTotalPrice.toFixed(2)} USD (for estimated ${(estimatedMonthlyEvents/1000000).toFixed(3)} million hits monthly). <br><i>(using last ${nrIncludedDays} days - editable inside test)</i>`)
}