# W2140 - Organic and marketing sources  
## Main info:  
**created at:** 2021-01-06T00:00:00  
**test type:** assertion  
**test version:** 2  
**maximal test score:** 100  
**test language:** en  
## Description:  
1) The relative share of organic and marketing sources of visits should not change very much. <br> 2) more generally, the share of organic source vs paid source has not changed compared to same day previous week.  
## Constants:  
### maxRatioChangeSpec
**type:** number  
**description:** maximal allowed change in share of a source to total visits  
**example:** 0.1  
### maxRatioChangeAgg
**type:** number  
**description:** maximal allowed change in share of sum of all marketing or organic sources to total visits  
**example:** 0.05  
### minVisits
**type:** number  
**description:** minimal visits on a source (during previous period) to be included in the first part of the evaluation  
**example:** 100  
## Blocks:  
### 1 - assert
**description:** none of the organic or paid sources changed their relative share compared to the same day previous week  
**score:** 50  
**pass message:** Share of visits to total visits has not changed from any organic or paid sources compared to week before  
**fail message:** Share of visits from some organic or paid sources to total visits has changed by more than ${maxRatioChangeSpec\*100} % compared to week before  
### 2 - assert
**description:** more generally, the share of organic source vs paid source has not changed compared to same day previous week  
**score:** 50  
**pass message:** Share of organic vs. paid sources to total visits has not changed by more than ${maxRatioChangeAgg\*100} % compared to week before.  
**fail message:** Share of organic vs. paid sources to total visits has changed by more than ${maxRatioChangeAgg\*100} % compared to week before  
