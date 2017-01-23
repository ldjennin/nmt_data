/*global NMTdata,window*/
/***
 * Provides data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 201701111420:443263
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
 * mapping_version: 201611231506:444002
 */
dfp_default_adunit_prefix = '/11365842/jacksonville.com';
dfp_adunit_prefix = '/11365842/jacksonville.com';
        adunitPrefixDomainMappings = [
                                      // These mappings will do a contains match against domain host.
                                      // MBU custom mappings
                                      {'affiliate\.zap2it\.com': '/11365842/jacksonville.com/entertainment'},
                                      {'autosjacksonville\.motominer\.net': '/11365842/jacksonville.com/autos'},
                                      {'autos\.jacksonville.com': '/11365842/jacksonville.com/autos'},
                                      {'beta\.jacksonville\.com': '/11365842/msms.jacksonville.com'},
                                      {'classifieds\.jacksonville.com': '/11365842/jacksonville.com/classifieds'},
                                      {'dev\.jacksonville\.com': '/11365842/msms.jacksonville.com'},
                                      {'events\.jacksonville.com': '/11365842/jacksonville.com/events'},
                                      {'firstcoastvarsity.com': '/11365842/jacksonville.com/firstcoastvarsity.com'},
                                      {'highschoolsports\.jacksonville\.com': '/11365842/jacksonville.com/firstcoastvarsity.com'},
                                      {'homes\.jacksonville.com': '/11365842/jacksonville.com/homes'},
                                      {'jaxairnews': '/11365842/jaxairnews.com'},
                                      {'jobs\.': '/11365842/jacksonville.com/jobs'},
                                      {'kingsbayperiscope': '/11365842/kingsbayperiscope.com'},
                                      {'legacy\.com': '/11365842/jacksonville.com/obituaries'},
                                      {'mayportmirror': '/11365842/mayportmirror.com'},
                                      {'photos\.jacksonville\.com': '/11365842/jacksonville.com/photos'},
                                      {'prod\.jacksonville\.com': '/11365842/msms.jacksonville.com'},
                                      {'qa\.jacksonville\.com': '/11365842/msms.jacksonville.com'},
                                      {'rentals\.jacksonville\.com': '/11365842/jacksonville.com/rentals'},
                                      {'runningsjacksonville\.com': '/11365842/runningjacksonville.com'},
                                      {'schools\.jacksonville\.com': '/11365842/jacksonville.com/schools'},
                                      {'search\.jacksonville\.com': '/11365842/jacksonville.com'},
                                      {'zap2it\.com': '/11365842/jacksonville.com/entertainment'},
                                      {'^m\.jacksonville\.com': '/11365842/m.jacksonville.com'},
                                      {'^m\.pfjax': '/11365842/m.jacksonville.com'},
                                      {'^m\.wap\.jacksonville\.com': '/11365842/m.jacksonville.com'},
                                      {'^m\.wap\.pfjax': '/11365842/m.jacksonville.com'}
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
                              {'\/video\/community': '/video/community-video'}
                      ];
        cccURLMappings = [
                          // MBU custom mappings
                          {'\/news\/blog\?page': 'xfinity'}
                   ];
        cccPathMappings = [
                           // MBU custom mappings
                           {'^\/news\/blog$': 'xfinity'}
                   ];
/***
 * common mappings: 201701111102:447642
 */

        if (document.location.search.indexOf("@") > 0 || document.location.search.indexOf("%40") > 0 || (typeof data.getQueryParam('name') !== "undefined" && data.getQueryParam('name').indexOf('@') > 0) || (typeof data.getQueryParam('eid') !== "undefined" && data.getQueryParam('eid').indexOf('@') > 0) || typeof data.getQueryParam('email') !== "undefined" || typeof data.getQueryParam('email1') !== "undefined" || typeof data.getQueryParam('cm_lm') !== "undefined") {
			adunitURLMappings.unshift({'': '/user'});
			adunitPrefixDomainMappings.unshift({'': "/0000/PII"});
        } else {
			adunitURLMappings.unshift({'email': '/user'});
			adunitPrefixURLMappings.unshift({'email': "/0000/PII"});
			adunitURLMappings.unshift({'username': '/user'});
			adunitPrefixURLMappings.unshift({'username': "/0000/PII"});
			adunitURLMappings.unshift({'user_login': '/user'});
			adunitPrefixURLMappings.unshift({'user_login': "/0000/PII"});
		}

        adunitURLMappings.push({'\.adpay\.com': '/classifieds'});

        adunitPathMappings.push({'^\/home$': '/homepage'});
        adunitPathMappings.push({'^\/home/am$': '/homepage'});
        adunitPathMappings.push({'^\/home/pm$': '/homepage'});
        adunitPathMappings.push({'^\/index$': '/homepage'});
        adunitPathMappings.push({'^\/$': '/homepage'});

        cccURLMappings.push({'\/clicknbuy\.aspx': NMTdata.data.getQueryParam("pcatid") || paperCategoryID});
        cccURLMappings.push({'\/searchresults\.aspx': NMTdata.data.getQueryParam("pcatid") || paperCategoryID});

        cccURLMappings.push({'spotted.+\/mediadetail\/': NMTdata.data.getQueryParam("gId")});
        cccURLMappings.push({'spotted.+\/galleries\?': NMTdata.data.getQueryParam("groupId")});
        adunitURLMappings.push({'adiciotest\.': '/homes'});

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
        dfp_adunit = dfp_adunit.replace(/%20/g, '-');
        dfp_adunit = dfp_adunit.replace(/,/g, '-');
        dfp_adunit = dfp_adunit.replace(/%2C/g, '-');
        dfp_adunit = dfp_adunit.replace(/'/g, '');
        dfp_adunit = dfp_adunit.replace(/ñ/ig, '');
        dfp_adunit = dfp_adunit.replace(/á/ig, '');
        dfp_adunit = dfp_adunit.replace(/é/ig, '');
        dfp_adunit = dfp_adunit.replace(/í/ig, '');
        dfp_adunit = dfp_adunit.replace(/ó/ig, '');
        dfp_adunit = dfp_adunit.replace(/ú/ig, '');
        dfp_adunit = dfp_adunit.replace(/ü/ig, '');
        dfp_adunit = dfp_adunit.replace(/¿/ig, '');
        dfp_adunit = dfp_adunit.replace(/¡/ig, '');
        dfp_adunit = dfp_adunit.replace(/%/g, '');

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
            dfp_nmt_mapping_version: '201611231506:444002',
            dfp_nmt_ads_version: '201701111420:443263',
            dfp_adunit_prefix: dfp_adunit_prefix,
            dfp_adunit: dfp_adunit,
            dfp_ccc: data.escapeHtml(dfp_ccc)
        };

    }());

