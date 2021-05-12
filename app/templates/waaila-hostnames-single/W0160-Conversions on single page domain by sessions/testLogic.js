(results, waaila) => {
    /**
    * @const {number} sessionThreshold - share of transactions on the main domain should be above this threshold 
    * @default 0.98
    */
    const transactionThreshold = 0.98;
    /**
    * @const {number} nrHostnamesDisplayed - maximum number of largest hostnames displayed in case of failure 
    * @default 10
    */
    const nrHostnamesDisplayed = 10;

    /**
    * @warn 1 - Loads data and checks for presence of transaction data
    * @score 0
    */
    const hostnameSessions = waaila.functions.normalizeGaResult(results['hostnameSessions'][0]);
    const aggregTransactions = waaila.functions.normalizeGaResult(results['aggregTransactions'][0]);
    const aggregTransactionsSummary = waaila.functions.summarizeGaResult(results['aggregTransactions'][0]);
    const filterTransactionsSummary = waaila.functions.summarizeGaResult(results['filterTransactions'][0]);
    waaila.warn(typeof aggregTransactions[0] != 'undefined', 0).fail.message('No transaction data returned').break;

    /**
    * @assert 2 - Evaluates the total of the transactions and reports about the amount of sessions transactions by each hostname to see the hostname detaining the most transactions among your websites.
    * @score 80
    */
    const totalTransactions = +aggregTransactionsSummary['transactions']['total'];
    const maxTransactions = +filterTransactionsSummary['transactions']['maximum'];
    const hostName = aggregTransactions[0]['ga:hostname'];

    const hostnamesLength = hostnameSessions.length;
    const assert_pass_message = `Ratio of transactions on the most visited hostname  (${hostName}) to all transactions is higher than ${transactionThreshold*100} %`;
    const assert_fail_message = `Ratio of transactions on the most visited hostname  (${hostName}) to all transactions is not higher than ${transactionThreshold*100} %`;
    const assert_fail_howtofix = 'Check if there is some filter for inclusion of hostnames applied, if not, create one. It should be include filter with defined main hostname.';
    const assert_fail_tabledescribe = `Sample of largest hostnames (${Math.min(nrHostnamesDisplayed, hostnamesLength)} / ${hostnamesLength} ):`;
    waaila.assert(maxTransactions / totalTransactions > transactionThreshold, 80)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix 
            + '<br/><br/> ' + assert_fail_tabledescribe)
        .table(hostnameSessions.head(nrHostnamesDisplayed));
}
