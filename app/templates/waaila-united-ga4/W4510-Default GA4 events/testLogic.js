(results, waaila) => {
    /**
    * @const {array} includedEventLists - list of all types of events that should be included in the event check
    * @default ["default_web"]
    */
    const includedEventLists = ['default_web', 'recommended', 'ecommerce'];
    
    const events_default_object = {
		'default_web': [
			'click', 'file_download', 'first_visit', 'form_start', 'form_submit', 'page_view', 'scroll', 'session_start',
			'user_engagement', 'video_complete', 'video_progress', 'video_start', 'view_search_results'
		],
		'default_app': [
			'ad_click', 'ad_exposure', 'ad_impression', 'ad_query', 'ad_reward', 'adunit_exposure', 'app_clear_data', 'app_exception',
			'app_remove', 'app_store_refund', 'app_store_subscription_cancel', 'app_store_subscription_convert',
			'app_store_subscription_renew', 'app_update', 'dynamic_link_app_open', 'dynamic_link_app_update', 'dynamic_link_first_open',
			'error', 'firebase_campaign', 'firebase_in_app_message_action', 'firebase_in_app_message_dismiss',
			'firebase_in_app_message_impression', 'first_open', 'first_visit', 'in_app_purchase', 'notification_dismiss',
			'notification_foreground', 'notification_open', 'notification_receive', 'notification_send', 'os_update',
			'screen_view', 'session_start', 'user_engagement'
		],
		'recommended': [
			'earn_virtual_currency', 'generate_lead', 'join_group', 'login', 'purchase', 'refund', 'search', 'select_content',
			'share', 'sign_up', 'spend_virtual_currency', 'tutorial_begin', 'tutorial_complete'
		],
		'ecommerce': [
			'add_payment_info', 'add_shippment_info', 'add_to_cart', 'add_to_wishlist', 'begin_checkout', 'generate_lead', 'purchase',
			'refund', 'remove_from_cart', 'select_item', 'select_promotion', 'view_cart', 'view_item', 'view_item_list', 'view_promotion'
		],
		'game': [
			'earn_virtual_currency', 'join_group', 'level_end', 'level_start', 'level_up', 'post_score', 'select_content',
			'spend_virtual_currency', 'tutorial_begin', 'tutorial_complete', 'unlock_achievement'
		]
	};

	// Transform the data
	const events_data = waaila.functions.normalizeGaResult(results);
	const events_default_comparison = waaila.functions.normalizedData([]);
	const table_formatting = [{ column: 'status', cellColor: { condition: { EQUAL: 'measured' } } }];

	includedEventLists.forEach(list_name => {
		waaila.message('<b>' + list_name + '</b>')
		events_default_object[list_name].forEach(event_name => {
			var events_data_selected = events_data.find(row => row['eventName'] === event_name);
			if (events_data_selected) {
				events_default_comparison.push({ event_name: event_name, list: list_name, events_count: events_data_selected['eventCount'], status: 'measured' });
			} else {
				events_default_comparison.push({ event_name: event_name, list: list_name, events_count: 0, status: 'not measured' });
			}
		})
		waaila.table(events_default_comparison
			.filter(row => row['list'] === list_name)
			.select(['event_name', 'events_count', 'status']), 
			table_formatting);
	});

    /**
    * @assert 1 - Check if all default events are measured.
    * @score 100
    */
    const assert_pass_message_capital = 'All default events are measured.';
    const assert_fail_message_capital = 'Some default events are not measured. <br> For further information about the default GA4 events see <a href=https://support.google.com/analytics/answer/9322688?hl=en&ref_topic=9756175 target=_blank>official documentation</a>';
    waaila.assert(events_default_comparison.filter(row => row['status'] === 'not measured').length === 0, 100)
		.pass.message(assert_pass_message_capital)
		.fail.message(assert_fail_message_capital);
}