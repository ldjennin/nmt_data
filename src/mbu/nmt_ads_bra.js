/*global NMTdata */
/***
 * Provides jacksonville data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 2013.09.10.$Id$
 * nmt_ads.js version: 2013.09.10.1625
 * 
 */
var NMTdata = NMTdata || {};

// IF: prevent multiple loads of NMTdata.ads.jax
if (typeof NMTdata.ads === 'undefined') {

    NMTdata.ads = (function () {
        // REQUIRES: NMTdata.data module to be loaded prior to this module.
        // ads related methods and properties.
        console.log("NMTdata.ads init");

        var data = NMTdata.data,
        adunitPrefixDomainMappings = new Array(),
        adunitPathMappings = new Array(),
        adunitURLMappings = new Array(),
        cccPathMappings = new Array(),
        cccURLMappings = new Array(),
        i = 0,
        mmo_ccc = '',
        mmo_console = '',
        pathlength = 0,
        dfp_adunit = '', // example: /news/local
		dfp_ccc = ''; // customTargeting value

////////////////////////////////////////////////////////////////////////
        // CUSTOMIZE VARIABLES AND MAPPINGS
        dfp_adunit_prefix = '/11365842/brainerddispatch.com',
        // MANAGE MAPPINGS HERE
        // TODO:2013-08-31:ldj:how do we provide UI and separate mappings for sites?
        adunitURLMappings = [
                             // MBU custom mappings
                             // Common mappings
                      ];
        adunitPathMappings = [
                              // MBU custom mappings
                              {'^\/births$': '/news/births'},
                              {'^\/business$': '/business/sectionfront'},
                              {'^\/entertainment$': '/entertainment/sectionfront'},
                              {'^\/lifestyle$': '/lifestyle/sectionfront'},
                              {'^\/news$': '/news/sectionfront'},
                              {'^\/outdoors$': '/outdoors/sectionfront'},
                              {'^\/sports$': '/sports/sectionfront'},
                              {'^\/weather$': '/weather/sectionfront'},
                              // Common mappings
                              {'^\/$': '/homepage'}
                      ];
        cccURLMappings = [
                          // MBU custom mappings
                          // Common mappings
                   ];
        cccPathMappings = [
                           // MBU custom mappings
                           // Common mappings
                           {'^\/$': '/homepage'}
                   ];
        adunitPrefixDomainMappings = [
                           // These mappings will do a contains match against domain host.
                           // MBU custom mappings
                           {'autos.brainerddispatch.com': '/11365842/autos.brainerddispatch.com'},
                           {'classifieds.brainerddispatch.com': '/11365842/brainerddispatch.com/classifieds'},
                           {'events.brainerddispatch.com': '/11365842/brainerddispatch.com/events'},
                           {'homes.jacksonville.com': '/11365842/brainerddispatch.com/homes'},
                           {'jobs\.brainerddispatch': '/11365842/jobs.brainerddispatch.com'}
                   ];
////////////////////////////////////////////////////////////////////////


        // Process domain mapping for dfp_adunit_prefix
        dfp_adunit_prefix = data.processMapping(adunitPrefixDomainMappings, location.host, dfp_adunit_prefix);

        // build dfp_adunit default value
        for (i = 0, pathlength = data.pathnames.length; i < pathlength; i++) {
            if (data.pathnames[i] !== '') {
                dfp_adunit += '/' + data.pathnames[i];
            }
        }

        // Process Path mappings for dfp_adunit
        dfp_adunit = data.processMapping(adunitPathMappings, window.location.pathname, dfp_adunit);
        // Process URL mappings for dfp_adunit
        dfp_adunit = data.processMapping(adunitURLMappings, document.URL, dfp_adunit);

        // dfp_ccc default value
        dfp_ccc = data.pathnames[data.pathnames.length - 1];
        
        // Process Path mappings for dfp_ccc
        dfp_ccc = data.processMapping(cccPathMappings, window.location.pathname, dfp_ccc);
        // Process URL mappings for dfp_ccc
        dfp_ccc = data.processMapping(cccURLMappings, document.URL, dfp_ccc);

        // override dfp_ccc with query_string mmo_ccc
        mmo_ccc = data.getQueryParam('mmo_ccc');
        if (mmo_ccc !== undefined) { dfp_ccc = mmo_ccc; }

        // Google DFP has 40 character limit on targeting values.
        dfp_ccc = dfp_ccc.slice(0,40);

        // output debug information to console
        mmo_console = data.getQueryParam('google_console');
        if (mmo_console !== undefined) {
            console.log("NMTdata.ads.dfp_adunit_prefix: "+dfp_adunit_prefix);
            console.log("NMTdata.ads.dfp_adunit: "+dfp_adunit);
            console.log("NMTdata.ads.dfp_ccc: "+dfp_ccc);
        }

        return { // return object
            dfp_adunit_prefix: dfp_adunit_prefix,
            dfp_adunit: dfp_adunit,
            dfp_ccc: dfp_ccc
        };
    }());

} // ENDIF: prevent multiple loads of NMTdata.ads
