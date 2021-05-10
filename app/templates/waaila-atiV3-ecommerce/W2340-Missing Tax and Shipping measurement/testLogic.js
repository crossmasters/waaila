(results, waaila) => {
    /**
    * @warn 1 - Test checks if the sum of taxes across all transactions is not zero, if it is, it shows message.
    * @score 50
    */
    const transactionsSummary = waaila.functions.summarizeAtiResult(results[0]);
    const totalTax = +transactionsSummary['Turnover incl. tax (product)']['total'] - transactionsSummary['Turnover excl. tax (product)']['total'];
    
    const warn_pass_message_tax = 'Taxes are measured.';
    const warn_fail_message_tax = 'Taxes are not measured.';
    waaila.warn(totalTax > 0, 50).pass.message(warn_pass_message_tax).fail.message(warn_fail_message_tax);
    
    /**
    * @warn 2 - Test checks if the sum of shipping across all transactions is not zero, if it is, it shows message.
    * @score 50
    */
    const totalShipping = +transactionsSummary['Shipping costs excl. tax']['total'];
    
    const warn_pass_message_shipping = 'Shipping is measured.';
    const warn_fail_message_shipping = 'Shipping is not measured.';
    waaila.warn(totalShipping > 0, 50).pass.message(warn_pass_message_shipping).fail.message(warn_fail_message_shipping);
}