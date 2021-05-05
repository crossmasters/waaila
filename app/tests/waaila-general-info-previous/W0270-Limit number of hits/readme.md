# Test documentation
## Main information
guid : "c2f5ea6f-357d-4ea9-9ea2-be2e2691ef46",
maxScore : 70,
testType : "check",
version : 2,
lang : "en",
createdAt: "2020-06-01T00:00:00"

## Description
Free version of google analytics has a limit on number of hits it can collect. Ingesting more than 10 million hits a month per property has impact on how your data are processed and stored.  Also, measurement will be slow and larger sampling errors will appear than before. In worst case it might even happen that Google is going to delete your property. This however happens rarely and only if you ingest a lot more hits than this limit. More likely you will receive emails from Google Sales to think about a paid solution of Google Analytics 360.

If more than failThreshold (20 millions) of hits for last 28 days was measured, the test fails

If more than warnThreshold (10 millions) of hits for last 28 days was measured, test shows warning

## Test configuration
@var {number} warnThreshold - above 10 million hits free GA are not functioning optimally {@default 10000000}
@var {number} failThreshold - hits very high above 10 millions increase the risk to have free GA property deleted {@default 20000000}
	 
@var {string} warn_fail_message - {@default "No data returned for sessions by hostname."}

@var {string} assert_fail_message - {@default "The limit of failThreshold/1000000 million hits was reached, actual number is: totalHitsMillions millions"}
@var {string} assert_fail_howtofix - {@default "Consider upgrading to Google Analytics 360."}
@var {string} warn_pass_message - {@default "The number of hits is:  totalHitsMillions millions"}
@var {string} warn_fail_message - {@default "The limit of warnThreshold/1000000 million hits was reached, actual number is: totalHitsMillions millions"}
@var {string} warn_fail_howtofix - {@default "If the traffic on your site is increasing, you may need to consider future upgrade to Google Analytics 360."}
    

### Comment

this comment will be added from some additional source

