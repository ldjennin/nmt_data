/*global NMTdata,window*/
/***
 * Provides global data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 2013.09.01.$Id$
 */
var NMTdata = NMTdata || {};

// IF: prevent multiple loads of NMTdata.data
if (typeof NMTdata.data === 'undefined') {

    NMTdata.data = (function () {
        // general data object methods and properties.
        console.log("NMTdata.data init");

        var pathnames = new Array(), // up to 9 pathnames
            a = window.location.pathname.split('/'),
            b = (a.length > 9) ? 9 : a.length-1,
            c = 0;
        a.shift();

        for (c = 0; c < b; c++) { pathnames[c] = (typeof a[c] !== 'undefined') ? a[c] : ''; }

        return { // return the object methods and properties.
            getQueryParam: function (param) {
                var query = window.location.search.substring(1),
                    vars = query.split('&'),
                    i = 0,
                    pair = null;
                for (i = 0; i < vars.length; i++) {
                    pair = vars[i].split('=');
                    if (decodeURIComponent(pair[0]) === param) {
                        return decodeURIComponent(pair[1]);
                    }
                }
            },
            processMapping: function (hMappings, matchAgainst, defaultValue) {
            	/**
            	 * Takes hMappings and tests RegExp against value in matchAgainst.
            	 */
                var aBool = false, aValue = defaultValue, i = 0, f = null, g = null;
                console.log("processMapping called: " + matchAgainst);
                for (i = 0; i < hMappings.length; i++) {
                    for (f in hMappings[i]) {
                        if (hMappings[i].hasOwnProperty(f)) {
                            g = new RegExp(f, 'i');
                            if (g.test(matchAgainst)) {
                                aValue = hMappings[i][f];
                                aBool = true;
                                console.log("processMapping matched: " + f);
                            }
                        }
                    }
                    if (aBool) { break; }
                }
                return aValue;
            },
            pathnames: pathnames // pathnames array
        };
    }());

} // ENDIF: prevent multiple loads of NMTdata.data
