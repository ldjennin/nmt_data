/*global NMTdata */
/***
 * Provides jacksonville data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 2013.09.01.$Id$
 * nmt_ads.js version: 2013.09.01.1306
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
        adunitPathMappings = new Array(),
        adunitURLMappings = new Array(),
        cccPathMappings = new Array(),
        cccURLMappings = new Array(),
        i = 0,
        mmo_ccc = '',
        pathlength = 0,
        dfp_adunit = '', // example: /11365842/jacksonville.com/autos
        dfp_ccc = ''; // customTargeting value
       	
////////////////////////////////////////////////////////////////////////
        // MANAGE MAPPINGS HERE
        // TODO:2013-08-31:ldj:how do we provide UI and separate mappings for sites?
        adunitURLMappings = [
                             // MBU custom mappings
                             // Common mappings
                      ];
        adunitPathMappings = [
                              // MBU custom mappings
                              {'\/business\/local': '/money'},
                              {'\/community\/my-arlington-sun': '/community/arlington'},
                              {'\/community\/my-nassau-sun': '/community/nassau'},
                              {'\/community\/shorelines': '/community/beaches'},
                              {'\/news\/georgia': '/community/south-georgia'},
                              {'\/jaguars': '/sports/jaguars'},
                              {'\/sports\/racing': '/sports/auto-racing'},
                              {'\/sports\/jacksonville_suns': '/sports/suns'},
                              {'\/taxonomy\/term\/5930': '/sports/uf-gators'},
                              {'\/taxonomy\/term\/5931': '/sports/fsu-seminoles'},
                              {'\/taxonomy\/term\/5992': '/sports/uga-bulldogs'},
                              {'\/taxonomy\/term\/5933': '/sports/unf-ospreys'},
                              {'\/taxonomy\/term\/5520': '/sports/high-schools'},
                              {'\/taxonomy\/term\/5515': '/sports/outdoors'},
                              {'\/taxonomy\/term\/5932': '/sports/ju-dolphins'},
                              {'\/taxonomy\/term\/6035': '/news/crime'},
                              {'\/taxonomy\/term\/17917': '/news/military'},
                              {'\/taxonomy\/term\/7914': '/news/politics-and-government'},
                              {'\/taxonomy\/term\/17928': '/money/small-business'},
                              {'\/taxonomy\/term\/6076': '/entertainment/arts'},
                              {'\/taxonomy\/term\/6077': '/entertainment/food-and-dining'},
                              {'\/taxonomy\/term\/6074': '/entertainment/home-garden'},
                              {'\/opinion\/blog\/business': '/money/blogs'},
                              {'\/business\/real-estate': '/money/real-estate'},
                              {'\/business\/submitnews': '/money/submitnews'},
                              {'\/business\/your-money': '/money/personal-finance'},
                              {'\/opinion\/blogs\/columnists': '/opinion/columnists'},
                              {'\/forum': '/opinion/forum'},
                              {'\/opinion\/letters-readers': '/opinion/letters-from-readers'},
                              {'\/opinion\/blog\/editorial-page-0': '/opinion/opinion-page-blog'},
                              {'\/forums\/rants-raves-forum': '/opinion/rants-and-raves'},
                              {'\/news\/savvy-citizen': '/opinion/savvy-citizen'},
                              {'\/greatparks': '/video/great-parks'},
                              {'\/video\/community': '/video/community-video'},
                              {'\/video': '/videos'},
                              // Common mappings
                              {'\/ap\/national': '/ap/nation'},
                              {'\/news\/ap\/world': '/ap/world'},
                              {'\/cars$': '/autos'},
                              {'\/cars\/': '/autos'},
                              {'\/news\/metro': '/news/local'},
                              {'\/$': '/homepage'}
                      ];
        cccURLMappings = [
                          // MBU custom mappings
                          // Common mappings
                   ];
        cccPathMappings = [
                           {'\/$': 'homepage'},
                           // MBU custom mappings
                           {'\/community\/clay': 'clay'},
                           {'\/(Dropbox|hello)\/': 'dropbox'},
                           // Common mappings
                           {'\/cars$': '/autos'},
                           {'\/cars\/': '/autos'},
                           {'\/$': '/homepage'}
                   ];
////////////////////////////////////////////////////////////////////////


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

        return { // return object
            dfp_adunit: dfp_adunit,
            dfp_ccc: dfp_ccc
        };
    }());

} // ENDIF: prevent multiple loads of NMTdata.ads