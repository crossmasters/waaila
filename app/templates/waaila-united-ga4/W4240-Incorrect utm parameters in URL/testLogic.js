(results, waaila) => {
    /**
    * @const {number} nrPagesDisplayed - number of example pagepaths displayed
    * @default 10
    */
    const nrPagesDisplayed = 10;
    
    const filteredPageViews = waaila.functions.normalizeGaResult(results);
    const filteredPageViewsSummary = waaila.functions.summarizeGaResult(results);

    /**
    * @assert 1 - It checks if Pages dimension contains the “utm_”, but none of the following follows: source|medium|campaign|term|content.
    * @score 80
    */
    const pageViews = +filteredPageViewsSummary['screenPageViews']['total'];
    const filteredPageLength = filteredPageViews.length;
    var lengthAddInfo = '';
    if(filteredPageLength == 1000){
        lengthAddInfo = 'sample of first ';
    }
    const actualPageLength = Math.min(nrPagesDisplayed, filteredPageLength);
    const assert_pass_message = 'No pages were found that contain utm_ but not in combination with source, medium, campaign, term or content.';
    const assert_fail_message = 'Pages were found that contain only utm_ (it does not contain source|medium|campaign|term|content).';
    const assert_fail_howtofix = 'It needs to be checked if syntax of URL is correct, there should be question marks used to separate query parameters or hash. Exclude parameters in view settings, type them in field „Strip out URL query parameters“ separated by comma.';
    const assert_fail_tabledescribe = `Sample pagePaths with incorrect utm parameters (${actualPageLength}/${lengthAddInfo}${filteredPageLength}):`;
    
    waaila.assert(pageViews == 0, 80)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix 
            + '<br/><br/>' + assert_fail_tabledescribe)
        .table(filteredPageViews.head(nrPagesDisplayed));
}