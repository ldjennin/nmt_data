/*global NMTdata */
/***
 * Provides jacksonville data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 2013.09.01.$Id$
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
                              {'\/jaguars': '/sports/jaguars'},
                              {'\/news\/metro': '/news/local'},
                              {'tealium-test-tag.html': 'airshow'},
                              // Common mappings
                              {'\/cars$': '/autos'},
                              {'\/cars\/': '/autos'},
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