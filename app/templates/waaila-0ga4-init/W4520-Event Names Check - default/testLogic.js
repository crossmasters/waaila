(results, waaila) => {
    /**
    * @const {number} minRelevantEvents - minimum number of events to include for the check (to display all, set to 0)
    * @default 100
    */
    const minRelevantEvents = 0;
    
    // Transform the data
    const eventsData = waaila.functions.normalizeGaResult(results);
    
    /**
    * @assert 1 - Check if event names contain capital letters
    * @score 50
    */
    eventsCapitalLetters = eventsData.filter(row => (row['eventName'].match(/[A-Z]/g)) && (row['eventCount'] >= minRelevantEvents))
    const assert_pass_message_capital = 'No event names with capital letters.';
    const assert_fail_message_capital = 'There are event names with capital letters:';
    waaila.assert(eventsCapitalLetters.length === 0, 50)
        .pass.message(assert_pass_message_capital)
        .fail.message(assert_fail_message_capital).table(eventsCapitalLetters);

    /**
    * @assert 2 - Check if event names contain other symbols than letters and underscore
    * @score 50
    */
    eventsSpecialSymbols = eventsData.filter(row => (row['eventName'].match(/[^a-zA-Z_]/g)) && (row['eventCount'] >= minRelevantEvents))
    const assert_pass_message_symbols = 'No event names with other symbols than letters and underscore.';
    const assert_fail_message_symbols = 'There are event names with other symbols than letters and underscore:';
    waaila.assert(eventsSpecialSymbols.length === 0, 50)
        .pass.message(assert_pass_message_symbols)
        .fail.message(assert_fail_message_symbols).table(eventsSpecialSymbols);

}