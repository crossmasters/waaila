(results, waaila) => {
    /**
    * @const {number} nrPagesDisplayed - maximum number of pages with most pageviews displayed in case of failure
    * @default 10
    */
    const nrPagesDisplayed = 10;
    
    /**
    * @assert 1 - It checks if Pages dimension contains the “utm”, “fbclid”, “gclid”, “sznclid” or “msclkid”  parameters, in order to remove them.
    * @score 80
    */ 
    const filteredPageViews = waaila.functions.normalizeGaResult(results);
    const filteredPageViewsSummary = waaila.functions.summarizeGaResult(results);
        
    const pageViews = +filteredPageViewsSummary['screenPageViews']['total'];

    const filteredPageLength = filteredPageViews.length;
    const actualPageLength = Math.min(nrPagesDisplayed, filteredPageLength);
    if(filteredPageLength == 1000){lengthAddInfo = ' sample of first '} else {lengthAddInfo = ''};
    const assert_pass_message = 'No pages were found that contain utm, fclid, gclid, sznclid or msclkid';
    const assert_fail_message = 'Pages were found that contain utm or some ID parameter';
    const assert_fail_tabledescribe = `Example of pages with utm, fclid, gclid, sznclid or msclkid (${actualPageLength}/${lengthAddInfo}${filteredPageLength}):`;
    waaila.assert(pageViews == 0, 80)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/>' + assert_fail_tabledescribe)
        .table(filteredPageViews.head(nrPagesDisplayed));
}