var NMTdata = NMTdata || {}; // GLOBAL NMTdata object

// IF: prevent multiple loads of NMTdata.ads
if (typeof NMTdata.ads == 'undefined') {

NMTdata.ads = (function () {
	// REQUIRES: NMTdata.data module to be loaded prior to this module.
	// ads related methods and properties.
	console.log("NMTdata.ads init");
	var data = NMTdata.data;

	// MANAGE MAPPINGS HERE
	// TODO:2013-08-31:ldj:how do we provide UI and separate mappings for sites?
	var adunitMappings = [
		{'\/community\/clay':'/community/clay'},
		{'\/Dropbox\/':'dropbox'},
		{'tealium-test-tag\.html':'airshow'}
	];
	var cccMappings = [
		{'\/community\/clay':'clay'},
		{'\/Dropbox\/':'dropbox'},
		{'tealium-test-tag\.html':'airshow'}
	];

	///////////////////////////////////////////////
	// dfp data
	var dfp_adunit = '', // example: /11365842/jacksonville.com/autos
		dfp_ccc = data.pathnames[data.pathnames.length-1]; // customTargeting value
	
	// build dfp_adunit value
	for(var i=0,pathlength=data.pathnames.length;i<pathlength;i++) {
		if (data.pathnames[i] != '') {
			dfp_adunit += '/'+data.pathnames[i];
		}
	}

	// set homepage adunit
	if (data.pathnames[0] == '') { dfp_adunit = '/homepage'; }

	// Process URL mappings for adunit
	dfp_adunit = data.processURLMapping(adunitMappings,'');

	// Process URL mappings for adunit
	dfp_ccc = data.processURLMapping(cccMappings,'');

	// override dfp_ccc with query_string mmo_ccc
	{
		var mmo_ccc = data.getQueryParam('mmo_ccc');
		if (mmo_ccc !== undefined) { dfp_ccc = mmo_ccc; }
	};



	return { // return object
		dfp_adunit: dfp_adunit,
		dfp_ccc: dfp_ccc
	};
})();

}; // ENDIF: prevent multiple loads of NMTdata.ads
