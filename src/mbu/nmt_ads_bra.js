/*global NMTdata,window*/
/***
 * Provides data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 201311071556:443263
 * 
 */
var NMTdata = NMTdata || {};

    NMTdata.ads = (function () {
        // REQUIRES: NMTdata.data module to be loaded prior to this module.
        // ads related methods and properties.
        if(!window.console){
            console={};
            console.log = function(){};
        }
        console.log("NMTdata.ads init");

        var data = NMTdata.data,
        adunitPrefixDomainMappings = new Array(),
        adunitPrefixURLMappings = new Array(),
        adunitPathMappings = new Array(),
        adunitURLMappings = new Array(),
        cccPathMappings = new Array(),
        cccURLMappings = new Array(),
        i = 0,
        mmo_ccc = '',
        mmo_console = '',
        pathlength = 0,
        maxAdunitPathLength = 3,  // limit the adunit path elements.
        dfp_adunit_prefix = '', // example: /11365842/peninsulaclarion.com
        dfp_adunit = '', // example: /news/local
		dfp_ccc = ''; // customTargeting value

        // AdPay global variable for classifieds category.
        if (typeof paperCategoryID == 'undefined') paperCategoryID = 'classifieds';

////////////////////////////////////////////////////////////////////////
/***
 * mapping_version: 201310231359:443793
 */
dfp_adunit_prefix = '/11365842/brainerddispatch.com';
        adunitPrefixDomainMappings = [
                                      // These mappings will do a contains match against domain host.
                                      // MBU custom mappings
                                      {'autos\.brainerddispatch\.com': '/11365842/brainerddispatch.com/autos'},
                                      {'autos\.upnorthautos\.com': '/11365842/brainerddispatch.com/autos'},
                                      {'brainerdhistory\.com': '/11365842/brainerddispatch.com/brainerdhistory'},
                                      {'brainerdlakesbound\.com': '/11365842/brainerddispatch.com/brainerdlakesbound'},
                                      {'brainerdwarriors\.com': '/11365842/brainerddispatch.com/brainerdwarriors'},
                                      {'classifieds\.brainerddispatch\.com': '/11365842/brainerddispatch.com/classifieds'},
                                      {'events\.brainerddispatch\.com': '/11365842/brainerddispatch.com/events'},
                                      {'go\.brainerddispatch\.com': '/11365842/brainerddispatch.com/go'},
                                      {'homes\.brainerddispatch\.com': '/11365842/brainerddispatch.com/homes'},
                                      {'jobs\.brainerddispatch': '/11365842/brainerddispatch.com/jobs'},
                                      {'local\.brainerddispatch': '/11365842/brainerddispatch.com/local'},
                                      {'^m\.brainerddispatch\.com': '/11365842/m.brainerddispatch.com'},
                                      {'^m\.pfbar': '/11365842/m.brainerddispatch.com'},
                                      {'rentals\.': '/11365842/brainerddispatch.com/rentals'},
                                      {'spotted\.': '/11365842/brainerddispatch.com/spotted'},
                                      {'themoviefargo\.com': '/11365842/brainerddispatch.com/themoviefargo'},
                                      {'legacy\.com': '/11365842/brainerddispatch.com/obituaries'}
                              ];
/***
 * common mappings: 201311061212:447642
 */
        adunitURLMappings.push({'\.adpay\.com': '/classifieds'});

        adunitPathMappings.push({'^\/home$': '/homepage'});
        adunitPathMappings.push({'^\/home/am$': '/homepage'});
        adunitPathMappings.push({'^\/home/pm$': '/homepage'});
        adunitPathMappings.push({'^\/index$': '/homepage'});
        adunitPathMappings.push({'^\/$': '/homepage'});

        cccURLMappings.push({'\/clicknbuy\.aspx': NMTdata.data.getQueryParam("pcatid") || paperCategoryID});
        cccURLMappings.push({'\/searchresults\.aspx': NMTdata.data.getQueryParam("pcatid") || paperCategoryID});

        cccPathMappings.push({'^\/$': 'homepage'});
////////////////////////////////////////////////////////////////////////

        // Process domain mapping for dfp_adunit_prefix
        dfp_adunit_prefix = data.processMapping(adunitPrefixDomainMappings, location.host, dfp_adunit_prefix);

        // Process URL mapping for dfp_adunit_prefix
        dfp_adunit_prefix = data.processMapping(adunitPrefixURLMappings, document.URL, dfp_adunit_prefix);

        // build dfp_adunit default value
        // Limit adunit to 3 path elements.
        pathlength = (data.pathnames.length > maxAdunitPathLength) ? maxAdunitPathLength : data.pathnames.length;
        for (i = 0; i < pathlength; i++) {
            if (data.pathnames[i] !== '') {
                dfp_adunit += '/' + data.pathnames[i].slice(0,100);
            }
        }

        // Process Path mappings for dfp_adunit
        dfp_adunit = data.processMapping(adunitPathMappings, window.location.pathname, dfp_adunit);
        // Process URL mappings for dfp_adunit
        dfp_adunit = data.processMapping(adunitURLMappings, document.URL, dfp_adunit);

        // dfp_ccc default value
        // Paths that have trailing slash will leave the last path element empty.
        // Let's check for this case and go back one more for the ccc value.
        if (data.pathnames.length > 1 && data.pathnames[data.pathnames.length-1] == '') {
            dfp_ccc = data.pathnames[data.pathnames.length - 2];
        } else {
            dfp_ccc = data.pathnames[data.pathnames.length - 1];
        }
        
        // Process Path mappings for dfp_ccc
        dfp_ccc = data.processMapping(cccPathMappings, window.location.pathname, dfp_ccc);
        // Process URL mappings for dfp_ccc
        dfp_ccc = data.processMapping(cccURLMappings, document.URL, dfp_ccc);

        // override dfp_ccc with query_string mmo_ccc
        mmo_ccc = data.getQueryParam('mmo_ccc');
        if (mmo_ccc !== undefined) { dfp_ccc = mmo_ccc; }

        // Google DFP has 40 character limit on targeting values.
        dfp_ccc = dfp_ccc.slice(0,40);

        // Google DFP does not allow certain characters for adunit values.
        dfp_adunit = dfp_adunit.replace(/\s/g, '-');
        dfp_adunit = dfp_adunit.replace(/,/g, '-');
        dfp_adunit = dfp_adunit.replace(/'/g, '');

        // output debug information to console
        mmo_console = data.getQueryParam('google_console');
        if (mmo_console !== undefined) {
            console.log("NMTdata.ads.dfp_adunit_prefix: "+dfp_adunit_prefix);
            console.log("NMTdata.ads.dfp_adunit: "+dfp_adunit);
            console.log("DFP AdUnit: "+dfp_adunit_prefix+dfp_adunit);
            console.log("NMTdata.ads.dfp_ccc: "+dfp_ccc);
        }

        // output debug information to console
        mmo_console = data.getQueryParam('nmt_console');
        if (mmo_console !== undefined) {
            document.write("<p>NMTdata.ads.dfp_adunit_prefix: "+dfp_adunit_prefix);
            document.write("<p>NMTdata.ads.dfp_adunit: "+dfp_adunit);
            document.write("<p>DFP AdUnit: "+dfp_adunit_prefix+dfp_adunit);
            document.write("<p>NMTdata.ads.dfp_ccc: "+data.escapeHtml(dfp_ccc));
        }

        return { // return object
            dfp_nmt_mapping_version: '201310231359:443793',
            dfp_nmt_ads_version: '201311071556:443263',
            dfp_adunit_prefix: dfp_adunit_prefix,
            dfp_adunit: dfp_adunit,
            dfp_ccc: data.escapeHtml(dfp_ccc)
        };

    }());

