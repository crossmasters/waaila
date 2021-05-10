(results, waaila) => {
    /**
    * @const {number} nrPagesDisplayed - maximum number of pages with most pageviews displayed in case of failure
    * @default 10
    */
    const nrPagesDisplayed = 10;
    
    /**
    * @assert 1 - It checks if Pages dimension contains the “utm”, “fbclid” or “gclid”  parameters, in order to remove them.
    * @score 80
    */ 
    const filteredPageViews = waaila.functions.normalizeGaResult(results['pageViews'][0]);
    const filteredPageViewsSummary = waaila.functions.summarizeGaResult(results['pageViews'][0]);
        
    const pageViews = +filteredPageViewsSummary['pageviews']['total'];

    const filteredPageLength = filteredPageViews.length;
    const actualPageLength = Math.min(nrPagesDisplayed, filteredPageLength);
    if(filteredPageLength == 1000){lengthAddInfo = ' sample of first '} else {lengthAddInfo = ''};
    const assert_pass_message = 'No pages were found that contain utm, fclid or gclid';
    const assert_fail_message = 'Pages were found that contain utm, fclid or gclid';
    const assert_fail_howtofix = 'It needs to be checked if syntax of URL is correct, there should be question marks used to separate query parameters or hash. Exclude parameters in view settings, type them in field „Strip out URL query parameters“ separated by comma.';
    const assert_fail_tabledescribe = `Example of pages with utm, fclid or gclid (${actualPageLength}/${lengthAddInfo}${filteredPageLength}):`;
    waaila.assert(pageViews == 0, 80)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix + '<br/><br/>' + assert_fail_tabledescribe)
        .table(filteredPageViews.head(nrPagesDisplayed)).break;
}