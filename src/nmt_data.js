/*global NMTdata,window*/
/***
 * Provides global data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 201310011257$Id$
 */
var NMTdata = NMTdata || {};

// IF: prevent multiple loads of NMTdata.data
if (typeof NMTdata.data === 'undefined') {

    NMTdata.data = (function () {
        // general data object methods and properties.
        if(!window.console){
            console={};
            console.log = function(){};
        }
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
            escapeHtml: function (sanitizeMe) {
                return sanitizeMe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
            },
            yearToAge: function (year) {
            	/***
            	 * Takes a year and converts it into an age range.
            	 */
            	var age = 0;
            	age = (new Date()).getFullYear() - year;
            	if (age < 13) return 'under 13';
            	else if (age < 18) return '13-17';
            	else if (age < 21) return '18-20';
            	else if (age < 25) return '21-24';
            	else if (age < 30) return '25-29';
            	else if (age < 35) return '30-34';
            	else if (age < 40) return '35-39';
            	else if (age < 45) return '40-44';
            	else if (age < 50) return '45-49';
            	else if (age < 55) return '50-54';
            	else if (age < 60) return '55-59';
            	else if (age < 65) return '60-64';
            	else return '65+';
            	
            },
            processMapping: function (hMappings, matchAgainst, defaultValue) {
            	/**
            	 * Takes hMappings and tests RegExp against value in matchAgainst.
            	 * First match in the list wins!
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

