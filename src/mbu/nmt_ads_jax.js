/*global NMTdata,window*/
/***
 * Provides data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 201309201254:443263
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
        dfp_adunit = '', // example: /news/local
		dfp_ccc = ''; // customTargeting value

////////////////////////////////////////////////////////////////////////
/***
 * mapping_version: 201309242148:444002
 */
dfp_adunit_prefix = '/11365842/jacksonville.com',
        adunitPrefixDomainMappings = [
                                      // These mappings will do a contains match against domain host.
                                      // MBU custom mappings
                                      {'autos\.jacksonville.com': '/11365842/jacksonville.com/autos'},
                                      {'classifieds\.jacksonville.com': '/11365842/jacksonville.com/classifieds'},
                                      {'affiliate\.zap2it\.com': '/11365842/jacksonville.com/entertainment'},
                                      {'events\.jacksonville.com': '/11365842/jacksonville.com/events'},
                                      {'homes\.jacksonville.com': '/11365842/jacksonville.com/homes'},
                                      {'rentals\.jacksonville\.com': '/11365842/jacksonville.com/rentals'},
                                      {'runningsjacksonville\.com': '/11365842/runningjacksonville.com'},
                                      {'schools\.jacksonville\.com': '/11365842/jacksonville.com/schools'},
                                      {'jaxairnews': '/11365842/jaxairnews.com'},
                                      {'jobs\.': '/11365842/jacksonville.com/jobs'},
                                      {'kingsbayperiscope': '/11365842/kingsbayperiscope.com'},
                                      {'^m\.jacksonville\.com': '/11365842/m.jacksonville.com'},
                                      {'^m\.pfjax': '/11365842/m.jacksonville.com'},
                                      {'mayportmirror': '/11365842/mayportmirror.com'},
                                      {'legacy\.com': '/11365842/jacksonville.com/obituaries'},
                                      {'zap2it\.com': '/11365842/jacksonville.com/entertainment'},
                                      {'photos\.jacksonville\.com': '/11365842/jacksonville.com/photos'}
                              ];
        adunitURLMappings = [
                             // MBU custom mappings
                             {'events\.jacksonville\.com\/index': '/homepage'},
                             {'rentals\.jacksonville\.com': ''}
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
                              {'\/greatparks': '/video/great-parks'},
                              {'\/jaguars': '/sports/jaguars'},
                              {'\/news\/georgia': '/community/southgeorgia'},
                              {'\/opinion\/blog\/business': '/money/blogs'},
                              {'\/sports\/jacksonville_suns': '/sports/suns'},
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
                              {'\/video\/community': '/video/community-video'},
                              // Common mappings
                              {'^\/home$': '/homepage'},
                              {'^\/$': '/homepage'}
                      ];
        cccURLMappings = [
                          // MBU custom mappings
                          {'events.jacksonville.com\/index': 'homepage'},
                           {'\/news\/blog\?page': 'xfinity'}
                          // Common mappings
                   ];
        cccPathMappings = [
                           // MBU custom mappings
                           {'^\/news\/blog$': 'xfinity'},
                           // Common mappings
                           {'^\/$': 'homepage'}
                   ];
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
                dfp_adunit += '/' + data.pathnames[i];
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

        // output debug information to console
        mmo_console = data.getQueryParam('google_console');
        if (mmo_console !== undefined) {
            console.log("NMTdata.ads.dfp_adunit_prefix: "+dfp_adunit_prefix);
            console.log("NMTdata.ads.dfp_adunit: "+dfp_adunit);
            console.log("NMTdata.ads.dfp_ccc: "+dfp_ccc);
        }

        // output debug information to console
        mmo_console = data.getQueryParam('nmt_console');
        if (mmo_console !== undefined) {
            document.write("<p>NMTdata.ads.dfp_adunit_prefix: "+dfp_adunit_prefix);
            document.write("<p>NMTdata.ads.dfp_adunit: "+dfp_adunit);
            document.write("<p>NMTdata.ads.dfp_ccc: "+data.escapeHtml(dfp_ccc));
        }

        return { // return object
            dfp_nmt_mapping_version: '201309242148:444002',
            dfp_nmt_ads_version: '201309201254:443263',
            dfp_adunit_prefix: dfp_adunit_prefix,
            dfp_adunit: dfp_adunit,
            dfp_ccc: data.escapeHtml(dfp_ccc)
        };

    }());

