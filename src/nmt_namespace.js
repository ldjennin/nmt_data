// Setup NMT namespace and global object.
/***
 * Provides global data and methods for serving ads.
 * @author: Duane.Jennings@niit-mediatech.com
 * @version: 2013.09.01.$Revision$
 */
var NMT = NMT || {};
NMT.namespace = function (name){
	// @description: builds a namespace object
	var parts = name.split('.'),
		parent=window,
		currentPart = '';
	for(var i = 0, partsLength = parts.length; i < partsLength; i++) {
		currentPart = parts[i];
		parent[currentPart] = parent[currentPart] || {};
		parent = parent[currentPart];
	}
	return parent;
};

var NMTdata = NMT.namespace('NMT.data');
