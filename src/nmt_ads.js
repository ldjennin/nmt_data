/*global NMTdata */
/***
 * Provides data and methods for serving ads.
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
        dfp_adunit_prefix = '/11365842/jacksonville.com',
        // MANAGE MAPPINGS HERE
        // TODO:2013-08-31:ldj:how do we provide UI and separate mappings for sites?
        adunitURLMappings = [
                             // MBU custom mappings
                             // Common mappings
                      ];
        adunitPathMappings = [
                              // MBU custom mappings
                              {'\/business\/local': '/money'},
                              {'\/business\/real-estate': '/money/real-estate'},
                              {'\/business\/submitnews': '/money/submitnews'},
                              {'\/business\/your-money': '/money/personal-finance'},
                              {'\/community\/my-arlington-sun': '/community/arlington'},
                              {'\/community\/my-nassau-sun': '/community/nassau'},
                              {'\/community\/shorelines': '/community/beaches'},
                              {'\/forum': '/opinion/forum'},
                              {'\/forums\/rants-raves-forum': '/opinion/rants-and-raves'},
                              {'\/greatparks': '/video/great-parks'},
                              {'\/jaguars': '/sports/jaguars'},
                              {'\/news\/georgia': '/community/south-georgia'},
                              {'\/news\/savvy-citizen': '/opinion/savvy-citizen'},
                              {'\/opinion\/blogs\/columnists': '/opinion/columnists'},
                              {'\/opinion\/blog\/business': '/money/blogs'},
                              {'\/opinion\/blog\/editorial-page-0': '/opinion/opinion-page-blog'},
                              {'\/opinion\/letters-readers': '/opinion/letters-from-readers'},
                              {'\/sports\/jacksonville_suns': '/sports/suns'},
                              {'\/sports\/racing': '/sports/auto-racing'},
                              {'\/taxonomy\/term\/17917': '/news/military'},
                              {'\/taxonomy\/term\/17928': '/money/small-business'},
                              {'\/taxonomy\/term\/5515': '/sports/outdoors'},
                              {'\/taxonomy\/term\/5520': '/sports/high-schools'},
                              {'\/taxonomy\/term\/5930': '/sports/uf-gators'},
                              {'\/taxonomy\/term\/5931': '/sports/fsu-seminoles'},
                              {'\/taxonomy\/term\/5932': '/sports/ju-dolphins'},
                              {'\/taxonomy\/term\/5933': '/sports/unf-ospreys'},
                              {'\/taxonomy\/term\/5992': '/sports/uga-bulldogs'},
                              {'\/taxonomy\/term\/6035': '/news/crime'},
                              {'\/taxonomy\/term\/6074': '/entertainment/home-garden'},
                              {'\/taxonomy\/term\/6076': '/entertainment/arts'},
                              {'\/taxonomy\/term\/6077': '/entertainment/food-and-dining'},
                              {'\/taxonomy\/term\/7914': '/news/politics-and-government'},
                              {'\/video': '/videos'},
                              {'\/video\/community': '/video/community-video'},
                              // Common mappings
                              {'\/ap\/national': '/ap/nation'},
                              {'\/cars$': '/autos'},
                              {'\/cars\/': '/autos'},
                              {'\/news\/metro': '/news/local'},
                              {'\/news\/ap\/world': '/ap/world'},
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
                           {'autos.jacksonville.com': '/11365842/autos.jacksonville.com'},
                           {'classifieds.jacksonville.com': '/11365842/jacksonville.com/classifieds'},
                           {'events.jacksonville.com': '/11365842/jacksonville.com/events'},
                           {'homes.jacksonville.com': '/11365842/jacksonville.com/homes'},
                           {'jaxairnews': '/11365842/jaxairnews.com'},
                           {'jobs\.': '/11365842/jobs.jacksonville.com'},
                           {'kingsbayperiscope': '/11365842/kingsbayperiscope.com'},
                           {'mayportmirror': '/11365842/mayportmirror.com'}
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
