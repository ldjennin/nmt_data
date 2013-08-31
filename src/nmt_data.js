var NMTdata = NMTdata || {}; // GLOBAL NMTdata object

// IF: prevent multiple loads of NMTdata.data
if (typeof NMTdata.data == 'undefined') {

NMTdata.data = (function () {
	// general data object methods and properties.
	console.log("NMTdata.data init");

	var pathnames = []; // up to 9 pathnames
	var a=location.pathname.split('/');a.shift();
	var b=(a.length>9)?9:a.length;
	for(var c=0;c<b;c++){pathnames[c]=(typeof a[c]!='undefined')?a[c]:''};
	
	return { // return the object methods and properties.
		getQueryParam: function (param) {
			var query = window.location.search.substring(1);
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				if (decodeURIComponent(pair[0]) == param) {
					return decodeURIComponent(pair[1]);
				}
			}
		},
		processURLMapping: function (hMappings, defaultValue) {
			var aBool=false;
			var aValue='';
			for(var i=0;i<hMappings.length;i++){
				for(var f in hMappings[i]){
					var g=new RegExp(f,'i');
					if(g.test(document.URL)){
						aValue=hMappings[i][f];
						aBool=true;
					};
				};
				if(aBool)break
			};
			if (aBool) {return aValue;} else {return defaultValue;}
		},
		pathnames: pathnames // pathnames array up to 9
	};
})();

}; // ENDIF: prevent multiple loads of NMTdata.data
