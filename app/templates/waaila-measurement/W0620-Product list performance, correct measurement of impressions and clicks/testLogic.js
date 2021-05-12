(results, waaila) => {
    /**
    * @warn 1 - Test checks if there are some clicks on product list items measured. If there are no clicks measured, it shows message.
    * @score 0
    */
    const totalViewClicks = waaila.functions.normalizeGaResult(results['viewClicks'][0]);
    const totalViewClicksSummary = waaila.functions.summarizeGaResult(results['viewClicks'][0]);
    
    const totalClicks = totalViewClicksSummary['productListClicks']['total'];
    const warn_fail_message_click = 'No click data found.';
    const assert_fail_howtofix_click = 'Check if measurement of product list items from the table is set up correctly.';
    waaila.warn(totalClicks > 0, 0).fail.message(warn_fail_message_click + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix_click);
    /**
    * @warn 2 - Test checks if there are some views on product list items measured. If there are no views measured, it shows message.
    * @score 0
    */
    const totalViews = totalViewClicksSummary['productListViews']['total'];
    const warn_fail_message_view = 'No view data found.';
    const assert_fail_howtofix_view = 'Check if measurement of product list items from the table is set up correctly.';
    waaila.warn(totalViews > 0, 0).fail.message(warn_fail_message_view + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix_view).break;
    
    /**
    * @assert 3 - Test checks both impressions and clicks, if there are more clicks than impressions by some product list item, it fails and shows message and table.
    * @score 50
    */
    // 
    invalidClicks = totalViewClicks.filter(function (row) {
        return (+row['productListClicks'] > +row['productListViews']);
    });
    
    const assert_pass_message = 'For every product list the amount of impressions is higher than the amount of clicks.';
    const assert_fail_message = 'More clicks than impressions occurred';
    const assert_fail_tabledescribe = 'Sample of up to 10 product lists with more clicks than impressions';
    waaila.assert(typeof invalidClicks[0] === 'undefined', 50)
        .pass.message(assert_pass_message)
        .fail.message(assert_fail_message + '<br/><br/> How to fix: <br/>' +  assert_fail_howtofix 
            + '<br/><br/> ' + assert_fail_tabledescribe)
        .table(invalidClicks.head(10));
}
