/*global NMTdata,window*/
/***
 * Provides data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 201507260903:443263
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
 * mapping_version: 201512080915:443265
 */
dfp_adunit_prefix = '/11365842/savannahnow.com';
        adunitPrefixDomainMappings = [
                                      // These mappings will do a contains match against domain host.
                                      // MBU custom mappings
                                      {'msms\.savannahnow\.com': '/11365842/msms.savannahnow.com'},
                                      {'dev\.savannahnow\.com': '/11365842/msms.savannahnow.com'},
                                      {'autos\.coastalautos\.com': '/11365842/savannahnow.com/autos'},
                                      {'bis\.yelvington\.com': '/11365842/businessinsavannah.com'},
                                      {'businessinsavannah\.com': '/11365842/businessinsavannah.com'},
                                      {'classifieds\.savannahnow\.com': '/11365842/savannahnow.com/classifieds'},
                                      {'class\.savannahnow\.com': '/11365842/savannahnow.com/classifieds'},
                                      {'coastalmommies\.com': '/11365842/coastalmommies.com'},
                                      {'^dining\.savannahnow\.com': '/11365842/savannahnow.com/diningguide'},
                                      {'dosavannah\.com': '/11365842/savannahnow.com/entertainment'},
                                      {'events\.savannahnow\.com': '/11365842/savannahnow.com/events'},
                                      {'giftguide\.': '/11365842/giftguide.savannahnow.com'},
                                      {'health\.': '/11365842/savannahnow.com/health'},
                                      {'physicianguide\.': '/11365842/savannahnow.com/physicianguide'},
                                      {'^m\.savannahnow\.com': '/11365842/m.savannahnow.com'},
                                      {'^m\.pfsav': '/11365842/m.savannahnow.com'},
                                      {'^www\.jaspersuntimes\.com': '/11365842/savannahnow.com/jaspersuntimes'},
                                      {'jaspercountysun\.com': '/11365842/savannahnow.com/jaspersuntimes'},
                                      {'jobs\.savannahnow\.com': '/11365842/savannahnow.com/jobs'},
                                      {'savannahhomesforsale\.com': '/11365842/savannahhomesforsale.com'},
                                      {'savannahmagazine\.com': '/11365842/savannahmagazine.com'},
                                      {'spotted\.savannahnow\.com': '/11365842/savannahnow.com/spotted'},
                                      {'rentals\.savannahnow\.com': '/11365842/savannahnow.com/rentals'},
                                      {'thebootandjetstream\.com': '/11365842/thebootandjetstream.com'},
                                      {'legacy\.com': '/11365842/savannahnow.com/obits'}
                              ];

        adunitPathMappings = [
                              // MBU custom mappings
                              {'^\/fast-physicianguide.php': '/physicianguide'},
                              // Common mappings
                              {'^\/homepageSMN$': '/homepage'}
                      ];

adunitPathMappings.push({'\/effinghamnow$': '/effinghamnow/homepage'});
adunitPathMappings.push({'\/bryancountynow$': '/bryancountynow/homepage'});

        cccPathMappings = [
                           // MBU custom mappings
                           {'^\/homepageSMN$': 'homepage'}
                   ];
/***
 * common mappings: 201504241333:447642
 */
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
            dfp_nmt_mapping_version: '201512080915:443265',
            dfp_nmt_ads_version: '201507260903:443263',
            dfp_adunit_prefix: dfp_adunit_prefix,
            dfp_adunit: dfp_adunit,
            dfp_ccc: data.escapeHtml(dfp_ccc)
        };

    }());

