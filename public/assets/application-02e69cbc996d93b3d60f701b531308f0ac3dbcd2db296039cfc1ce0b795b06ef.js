/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {


}).call(this);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
;
/*! Jssor */

var $JssorDebug$=new function(){this.$DebugMode=true;this.$Log=function(c,d){var a=window.console||{},b=this.$DebugMode;if(b&&a.log)a.log(c);else b&&d&&alert(c)};this.$Error=function(b,d){var c=window.console||{},a=this.$DebugMode;if(a&&c.error)c.error(b);else a&&alert(b);if(a)throw d||new Error(b);};this.$Fail=function(a){throw new Error(a);};this.$Assert=function(b,c){var a=this.$DebugMode;if(a)if(!b)throw new Error("Assert failed "+c||"");};this.$Trace=function(c){var a=window.console||{},b=this.$DebugMode;b&&a.log&&a.log(c)};this.$Execute=function(b){var a=this.$DebugMode;a&&b()};this.$LiveStamp=function(c,d){var b=this.$DebugMode;if(b){var a=document.createElement("DIV");a.setAttribute("id",d);c.$Live=a}};this.$C_AbstractProperty=function(){throw new Error("The property is abstract, it should be implemented by subclass.");};this.$C_AbstractMethod=function(){throw new Error("The method is abstract, it should be implemented by subclass.");};function a(b){if(b.constructor===a.caller)throw new Error("Cannot create instance of an abstract class.");}this.$C_AbstractClass=a},$JssorEasing$=window.$JssorEasing$={$EaseSwing:function(a){return-Math.cos(a*Math.PI)/2+.5},$EaseLinear:function(a){return a},$EaseInQuad:function(a){return a*a},$EaseOutQuad:function(a){return-a*(a-2)},$EaseInOutQuad:function(a){return(a*=2)<1?1/2*a*a:-1/2*(--a*(a-2)-1)},$EaseInCubic:function(a){return a*a*a},$EaseOutCubic:function(a){return(a-=1)*a*a+1},$EaseInOutCubic:function(a){return(a*=2)<1?1/2*a*a*a:1/2*((a-=2)*a*a+2)},$EaseInQuart:function(a){return a*a*a*a},$EaseOutQuart:function(a){return-((a-=1)*a*a*a-1)},$EaseInOutQuart:function(a){return(a*=2)<1?1/2*a*a*a*a:-1/2*((a-=2)*a*a*a-2)},$EaseInQuint:function(a){return a*a*a*a*a},$EaseOutQuint:function(a){return(a-=1)*a*a*a*a+1},$EaseInOutQuint:function(a){return(a*=2)<1?1/2*a*a*a*a*a:1/2*((a-=2)*a*a*a*a+2)},$EaseInSine:function(a){return 1-Math.cos(Math.PI/2*a)},$EaseOutSine:function(a){return Math.sin(Math.PI/2*a)},$EaseInOutSine:function(a){return-1/2*(Math.cos(Math.PI*a)-1)},$EaseInExpo:function(a){return a==0?0:Math.pow(2,10*(a-1))},$EaseOutExpo:function(a){return a==1?1:-Math.pow(2,-10*a)+1},$EaseInOutExpo:function(a){return a==0||a==1?a:(a*=2)<1?1/2*Math.pow(2,10*(a-1)):1/2*(-Math.pow(2,-10*--a)+2)},$EaseInCirc:function(a){return-(Math.sqrt(1-a*a)-1)},$EaseOutCirc:function(a){return Math.sqrt(1-(a-=1)*a)},$EaseInOutCirc:function(a){return(a*=2)<1?-1/2*(Math.sqrt(1-a*a)-1):1/2*(Math.sqrt(1-(a-=2)*a)+1)},$EaseInElastic:function(a){if(!a||a==1)return a;var b=.3,c=.075;return-(Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/b))},$EaseOutElastic:function(a){if(!a||a==1)return a;var b=.3,c=.075;return Math.pow(2,-10*a)*Math.sin((a-c)*2*Math.PI/b)+1},$EaseInOutElastic:function(a){if(!a||a==1)return a;var b=.45,c=.1125;return(a*=2)<1?-.5*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/b):Math.pow(2,-10*(a-=1))*Math.sin((a-c)*2*Math.PI/b)*.5+1},$EaseInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},$EaseOutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},$EaseInOutBack:function(a){var b=1.70158;return(a*=2)<1?1/2*a*a*(((b*=1.525)+1)*a-b):1/2*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},$EaseInBounce:function(a){return 1-$JssorEasing$.$EaseOutBounce(1-a)},$EaseOutBounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},$EaseInOutBounce:function(a){return a<1/2?$JssorEasing$.$EaseInBounce(a*2)*.5:$JssorEasing$.$EaseOutBounce(a*2-1)*.5+.5},$EaseGoBack:function(a){return 1-Math.abs(2-1)},$EaseInWave:function(a){return 1-Math.cos(a*Math.PI*2)},$EaseOutWave:function(a){return Math.sin(a*Math.PI*2)},$EaseOutJump:function(a){return 1-((a*=2)<1?(a=1-a)*a*a:(a-=1)*a*a)},$EaseInJump:function(a){return(a*=2)<1?a*a*a:(a=2-a)*a*a}},$Jease$=window.$Jease$={$Swing:$JssorEasing$.$EaseSwing,$Linear:$JssorEasing$.$EaseLinear,$InQuad:$JssorEasing$.$EaseInQuad,$OutQuad:$JssorEasing$.$EaseOutQuad,$InOutQuad:$JssorEasing$.$EaseInOutQuad,$InCubic:$JssorEasing$.$EaseInCubic,$OutCubic:$JssorEasing$.$EaseOutCubic,$InOutCubic:$JssorEasing$.$EaseInOutCubic,$InQuart:$JssorEasing$.$EaseInQuart,$OutQuart:$JssorEasing$.$EaseOutQuart,$InOutQuart:$JssorEasing$.$EaseInOutQuart,$InQuint:$JssorEasing$.$EaseInQuint,$OutQuint:$JssorEasing$.$EaseOutQuint,$InOutQuint:$JssorEasing$.$EaseInOutQuint,$InSine:$JssorEasing$.$EaseInSine,$OutSine:$JssorEasing$.$EaseOutSine,$InOutSine:$JssorEasing$.$EaseInOutSine,$InExpo:$JssorEasing$.$EaseInExpo,$OutExpo:$JssorEasing$.$EaseOutExpo,$InOutExpo:$JssorEasing$.$EaseInOutExpo,$InCirc:$JssorEasing$.$EaseInCirc,$OutCirc:$JssorEasing$.$EaseOutCirc,$InOutCirc:$JssorEasing$.$EaseInOutCirc,$InElastic:$JssorEasing$.$EaseInElastic,$OutElastic:$JssorEasing$.$EaseOutElastic,$InOutElastic:$JssorEasing$.$EaseInOutElastic,$InBack:$JssorEasing$.$EaseInBack,$OutBack:$JssorEasing$.$EaseOutBack,$InOutBack:$JssorEasing$.$EaseInOutBack,$InBounce:$JssorEasing$.$EaseInBounce,$OutBounce:$JssorEasing$.$EaseOutBounce,$InOutBounce:$JssorEasing$.$EaseInOutBounce,$GoBack:$JssorEasing$.$EaseGoBack,$InWave:$JssorEasing$.$EaseInWave,$OutWave:$JssorEasing$.$EaseOutWave,$OutJump:$JssorEasing$.$EaseOutJump,$InJump:$JssorEasing$.$EaseInJump},$JssorDirection$=window.$JssorDirection$={$TO_LEFT:1,$TO_RIGHT:2,$TO_TOP:4,$TO_BOTTOM:8,$HORIZONTAL:3,$VERTICAL:12,$GetDirectionHorizontal:function(a){return a&3},$GetDirectionVertical:function(a){return a&12},$IsHorizontal:function(a){return a&3},$IsVertical:function(a){return a&12}},$JssorKeyCode$={$BACKSPACE:8,$COMMA:188,$DELETE:46,$DOWN:40,$END:35,$ENTER:13,$ESCAPE:27,$HOME:36,$LEFT:37,$NUMPAD_ADD:107,$NUMPAD_DECIMAL:110,$NUMPAD_DIVIDE:111,$NUMPAD_ENTER:108,$NUMPAD_MULTIPLY:106,$NUMPAD_SUBTRACT:109,$PAGE_DOWN:34,$PAGE_UP:33,$PERIOD:190,$RIGHT:39,$SPACE:32,$TAB:9,$UP:38},$JssorServices$={},$Jssor$=window.$Jssor$=new function(){var b=this,rb=/\S+/g,B=1,Z=2,db=3,cb=4,hb=5,C,j=0,c=0,k=0,q=0,r=0,u=navigator,mb=u.appName,f=u.userAgent,p=document.documentElement,h=parseFloat;function zb(){if(!C){C={$Touchable:"ontouchstart"in window||"createTouch"in document};var a;if(u.pointerEnabled||(a=u.msPointerEnabled))C.$TouchActionAttr=a?"msTouchAction":"touchAction"}return C}function m(l){if(!j){j=-1;if(mb=="Microsoft Internet Explorer"&&!!window.attachEvent&&!!window.ActiveXObject){var g=f.indexOf("MSIE");j=B;k=h(f.substring(g+5,f.indexOf(";",g)));/*@cc_on q=@_jscript_version@*/;c=document.documentMode||k}else if(mb=="Netscape"&&!!window.addEventListener){var e=f.indexOf("Firefox"),b=f.indexOf("Safari"),i=f.indexOf("Chrome"),d=f.indexOf("AppleWebKit");if(e>=0){j=Z;c=h(f.substring(e+8))}else if(b>=0){var m=f.substring(0,b).lastIndexOf("/");j=i>=0?cb:db;c=h(f.substring(m+1,b))}else{var a=/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(f);if(a){j=B;c=k=h(a[1])}}if(d>=0)r=h(f.substring(d+12))}else{var a=/(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(f);if(a){j=hb;c=h(a[2])}}}return l==j}function i(){return m(B)}function J(){return i()&&(c<6||document.compatMode=="BackCompat")}function sb(){return m(Z)}function bb(){return m(db)}function vb(){return m(cb)}function gb(){return m(hb)}function W(){return bb()&&r>534&&r<535}function y(){m();return r>537||c>42||j==B&&c>=11}function H(){return i()&&c<9}function X(a){var b,c;return function(f){if(!b){b=true;var d=a.substr(0,1).toUpperCase()+a.substr(1);e([a].concat(["WebKit","ms","Moz","O","webkit"]),function(g,e){var b=a;if(e)b=g+d;if(f.style[b]!=undefined)return c=b})}return c}}function V(b){var a;return function(c){a=a||X(b)(c)||b;return a}}var D=V("transform");function lb(a){return{}.toString.call(a)}var ib={};e(["Boolean","Number","String","Function","Array","Date","RegExp","Object"],function(a){ib["[object "+a+"]"]=a.toLowerCase()});function e(b,d){var a,c;if(lb(b)=="[object Array]"){for(a=0;a<b.length;a++)if(c=d(b[a],a,b))return c}else for(a in b)if(c=d(b[a],a,b))return c}function w(a){return a==null?String(a):ib[lb(a)]||"object"}function jb(a){for(var b in a)return true}function s(a){try{return w(a)=="object"&&!a.nodeType&&a!=a.window&&(!a.constructor||{}.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))}catch(b){}}function g(a,b){return{x:a,y:b}}function pb(b,a){setTimeout(b,a||0)}function t(b,d,c){var a=!b||b=="inherit"?"":b;e(d,function(c){var b=c.exec(a);if(b){var d=a.substr(0,b.index),e=a.substr(b.index+b[0].length+1,a.length-1);a=d+e}});a=c+(!a.indexOf(" ")?"":" ")+a;return a}function K(b,a){if(c<9)b.style.filter=a}b.$Device=zb;b.$IsBrowserIE=i;b.$IsBrowserIeQuirks=J;b.$IsBrowserFireFox=sb;b.$IsBrowserSafari=bb;b.$IsBrowserChrome=vb;b.$IsBrowserOpera=gb;b.$IsBrowserBadTransform=W;b.$IsBrowser3dSafe=y;b.$IsBrowserIe9Earlier=H;b.$GetTransformProperty=X("transform");b.$BrowserVersion=function(){return c};b.$BrowserEngineVersion=function(){return k||c};b.$WebKitVersion=function(){m();return r};b.$Delay=pb;b.$Inherit=function(a,b){b.call(a);return v({},a)};function R(a){a.constructor===R.caller&&a.$Construct&&a.$Construct.apply(a,R.caller.arguments)}b.$Construct=R;b.$GetElement=function(a){if(b.$IsString(a))a=document.getElementById(a);return a};function l(a){return a||window.event}b.$GetEvent=l;b.$EvtSrc=function(c){c=l(c);var a=c.target||c.srcElement||document;if(a.nodeType==3)a=b.$ParentNode(a);return a};b.$EvtTarget=function(a){a=l(a);return a.relatedTarget||a.toElement};b.$EvtWhich=function(a){a=l(a);return a.which||([0,1,3,0,2])[a.button]||a.charCode||a.keyCode};b.$MousePosition=function(a){a=l(a);return{x:a.pageX||a.clientX||0,y:a.pageY||a.clientY||0}};b.$PageScroll=function(){var a=document.body;return{x:(window.pageXOffset||p.scrollLeft||a.scrollLeft||0)-(p.clientLeft||a.clientLeft||0),y:(window.pageYOffset||p.scrollTop||a.scrollTop||0)-(p.clientTop||a.clientTop||0)}};b.$WindowSize=function(){var a=document.body;return{x:a.clientWidth||p.clientWidth,y:a.clientHeight||p.clientHeight}};function x(c,d,a){if(a!==undefined)c.style[d]=a==undefined?"":a;else{var b=c.currentStyle||c.style;a=b[d];if(a==""&&window.getComputedStyle){b=c.ownerDocument.defaultView.getComputedStyle(c,null);b&&(a=b.getPropertyValue(d)||b[d])}return a}}function T(b,c,a,d){if(a!==undefined){if(a==null)a="";else d&&(a+="px");x(b,c,a)}else return h(x(b,c))}function Ab(b,c,a){return T(b,c,a,true)}function d(c,a){var d=a?T:x,b;if(a&4)b=V(c);return function(e,f){return d(e,b?b(e):c,f,a&2)}}function ub(b){if(i()&&k<9){var a=/opacity=([^)]*)/.exec(b.style.filter||"");return a?h(a[1])/100:1}else return h(b.style.opacity||"1")}function wb(b,a,e){if(i()&&k<9){var g=b.style.filter||"",h=new RegExp(/[\s]*alpha\([^\)]*\)/g),d=Math.round(100*a),c="";if(d<100||e)c="alpha(opacity="+d+") ";var f=t(g,[h],c);K(b,f)}else b.style.opacity=a==1?"":Math.round(a*100)/100}var E={$Rotate:["rotate"],$RotateX:["rotateX"],$RotateY:["rotateY"],$SkewX:["skewX"],$SkewY:["skewY"]};if(!y())E=v(E,{$ScaleX:["scaleX",2],$ScaleY:["scaleY",2],$TranslateZ:["translateZ",1]});function F(d,a){var b="";if(a){if(i()&&c&&c<10){delete a.$RotateX;delete a.$RotateY;delete a.$TranslateZ}$Jssor$.$Each(a,function(d,c){var a=E[c];if(a){var e=a[1]||0;if(G[c]!=d)b+=" "+a[0]+"("+d+(["deg","px",""])[e]+")"}});if(y()){if(a.$TranslateX||a.$TranslateY||a.$TranslateZ)b+=" translate3d("+(a.$TranslateX||0)+"px,"+(a.$TranslateY||0)+"px,"+(a.$TranslateZ||0)+"px)";if(a.$ScaleX==undefined)a.$ScaleX=1;if(a.$ScaleY==undefined)a.$ScaleY=1;if(a.$ScaleX!=1||a.$ScaleY!=1)b+=" scale3d("+a.$ScaleX+", "+a.$ScaleY+", 1)"}}d.style[D(d)]=b}b.$CssTransformOrigin=d("transformOrigin",4);b.$CssBackfaceVisibility=d("backfaceVisibility",4);b.$CssTransformStyle=d("transformStyle",4);b.$CssPerspective=d("perspective",6);b.$CssPerspectiveOrigin=d("perspectiveOrigin",4);b.$CssScale=function(a,b){if(i()&&k<9||k<10&&J())a.style.zoom=b==1?"":b;else{var c=D(a),f="scale("+b+")",e=a.style[c],g=new RegExp(/[\s]*scale\(.*?\)/g),d=t(e,[g],f);a.style[c]=d}};var fb=0,ab=0;b.$WindowResizeFilter=function(b,a){return H()?function(){var f=true,c=J()?b.document.body:b.document.documentElement;if(c){var e=c.offsetWidth-fb,d=c.offsetHeight-ab;if(e||d){fb+=e;ab+=d}else f=false}f&&a()}:a};b.$MouseOverOutFilter=function(c,a){$JssorDebug$.$Execute(function(){if(!a)throw new Error('Null reference, parameter "target".');});return function(d){d=l(d);var f=d.type,e=d.relatedTarget||(f=="mouseout"?d.toElement:d.fromElement);(!e||e!==a&&!b.$IsChild(a,e))&&c(d)}};b.$AddEvent=function(a,e,c,d){a=b.$GetElement(a);$JssorDebug$.$Execute(function(){!a&&$JssorDebug$.$Fail("Parameter 'elmt' not specified.");!c&&$JssorDebug$.$Fail("Parameter 'handler' not specified.");!a.addEventListener&&!a.attachEvent&&$JssorDebug$.$Fail("Unable to attach event handler, no known technique.")});if(a.addEventListener){e=="mousewheel"&&a.addEventListener("DOMMouseScroll",c,d);a.addEventListener(e,c,d)}else if(a.attachEvent){a.attachEvent("on"+e,c);d&&a.setCapture&&a.setCapture()}};b.$RemoveEvent=function(a,d,e,c){a=b.$GetElement(a);if(a.removeEventListener){d=="mousewheel"&&a.removeEventListener("DOMMouseScroll",e,c);a.removeEventListener(d,e,c)}else if(a.detachEvent){a.detachEvent("on"+d,e);c&&a.releaseCapture&&a.releaseCapture()}};b.$FireEvent=function(b,c){$JssorDebug$.$Execute(function(){!document.createEvent&&!document.createEventObject&&$JssorDebug$.$Fail("Unable to fire event, no known technique.");!b.dispatchEvent&&!b.fireEvent&&$JssorDebug$.$Fail("Unable to fire event, no known technique.")});var a;if(document.createEvent){a=document.createEvent("HTMLEvents");a.initEvent(c,false,false);b.dispatchEvent(a)}else{var d="on"+c;a=document.createEventObject();b.fireEvent(d,a)}};b.$CancelEvent=function(a){a=l(a);a.preventDefault&&a.preventDefault();a.cancel=true;a.returnValue=false};b.$StopEvent=function(a){a=l(a);a.stopPropagation&&a.stopPropagation();a.cancelBubble=true};b.$CreateCallback=function(d,c){var a=[].slice.call(arguments,2),b=function(){var b=a.concat([].slice.call(arguments,0));return c.apply(d,b)};return b};b.$InnerText=function(a,c){if(c==undefined)return a.textContent||a.innerText;var d=document.createTextNode(c);b.$Empty(a);a.appendChild(d)};b.$InnerHtml=function(a,b){if(b==undefined)return a.innerHTML;a.innerHTML=b};b.$GetClientRect=function(b){var a=b.getBoundingClientRect();return{x:a.left,y:a.top,w:a.right-a.left,h:a.bottom-a.top}};b.$ClearInnerHtml=function(a){a.innerHTML=""};b.$EncodeHtml=function(c){var a=b.$CreateDiv();b.$InnerText(a,c);return b.$InnerHtml(a)};b.$DecodeHtml=function(c){var a=b.$CreateDiv();b.$InnerHtml(a,c);return b.$InnerText(a)};b.$SelectElement=function(c){var b;if(window.getSelection)b=window.getSelection();var a=null;if(document.createRange){a=document.createRange();a.selectNode(c)}else{a=document.body.createTextRange();a.moveToElementText(c);a.select()}b&&b.addRange(a)};b.$DeselectElements=function(){if(document.selection)document.selection.empty();else window.getSelection&&window.getSelection().removeAllRanges()};b.$Children=function(d,c){for(var b=[],a=d.firstChild;a;a=a.nextSibling)(c||a.nodeType==1)&&b.push(a);return b};function kb(a,c,e,b){b=b||"u";for(a=a?a.firstChild:null;a;a=a.nextSibling)if(a.nodeType==1){if(O(a,b)==c)return a;if(!e){var d=kb(a,c,e,b);if(d)return d}}}b.$FindChild=kb;function M(a,d,f,b){b=b||"u";var c=[];for(a=a?a.firstChild:null;a;a=a.nextSibling)if(a.nodeType==1){O(a,b)==d&&c.push(a);if(!f){var e=M(a,d,f,b);if(e.length)c=c.concat(e)}}return c}b.$FindChildren=M;function eb(a,c,d){for(a=a?a.firstChild:null;a;a=a.nextSibling)if(a.nodeType==1){if(a.tagName==c)return a;if(!d){var b=eb(a,c,d);if(b)return b}}}b.$FindChildByTag=eb;function Y(a,c,e){var b=[];for(a=a?a.firstChild:null;a;a=a.nextSibling)if(a.nodeType==1){(!c||a.tagName==c)&&b.push(a);if(!e){var d=Y(a,c,e);if(d.length)b=b.concat(d)}}return b}b.$FindChildrenByTag=Y;b.$GetElementsByTag=function(b,a){return b.getElementsByTagName(a)};function v(){var e=arguments,d,c,b,a,g=1&e[0],f=1+g;d=e[f-1]||{};for(;f<e.length;f++)if(c=e[f])for(b in c){a=c[b];if(a!==undefined){a=c[b];var h=d[b];d[b]=g&&(s(h)||s(a))?v(g,{},h,a):a}}return d}b.$Extend=v;function S(g,f){$JssorDebug$.$Assert(f);var d={},c,a,b;for(c in g){a=g[c];b=f[c];if(a!==b){var e;if(s(a)&&s(b)){a=S(a,b);e=!jb(a)}!e&&(d[c]=a)}}return d}b.$Unextend=S;b.$IsFunction=function(a){return w(a)=="function"};b.$IsArray=function(a){return w(a)=="array"};b.$IsString=function(a){return w(a)=="string"};b.$IsNumeric=function(a){return!isNaN(h(a))&&isFinite(a)};b.$Type=w;b.$Each=e;b.$IsNotEmpty=jb;b.$IsPlainObject=s;function L(a){return document.createElement(a)}b.$CreateElement=L;b.$CreateDiv=function(){return L("DIV")};b.$CreateSpan=function(){return L("SPAN")};b.$EmptyFunction=function(){};function P(b,c,a){if(a==undefined)return b.getAttribute(c);b.setAttribute(c,a)}function O(a,b){return P(a,b)||P(a,"data-"+b)}b.$Attribute=P;b.$AttributeEx=O;function o(b,a){if(a==undefined)return b.className;b.className=a}b.$ClassName=o;function ob(b){var a={};e(b,function(b){a[b]=b});return a}function yb(b){var a=[];e(b,function(b){a.push(b)});return a}function qb(b,a){return b.match(a||rb)}function I(b,a){return ob(qb(b||"",a))}b.$ToHash=ob;b.$FromHash=yb;b.$Split=qb;function U(b,c){var a="";e(c,function(c){a&&(a+=b);a+=c});return a}function A(a,c,b){o(a,U(" ",v(S(I(o(a)),I(c)),I(b))))}b.$Join=U;b.$AddClass=function(b,a){A(b,null,a)};b.$RemoveClass=A;b.$ReplaceClass=A;b.$ParentNode=function(a){return a.parentNode};b.$HideElement=function(a){b.$CssDisplay(a,"none")};b.$EnableElement=function(a,c){if(c)b.$Attribute(a,"disabled",true);else b.$RemoveAttribute(a,"disabled")};b.$HideElements=function(c){for(var a=0;a<c.length;a++)b.$HideElement(c[a])};b.$ShowElement=function(a,c){b.$CssDisplay(a,c?"none":"")};b.$ShowElements=function(c,d){for(var a=0;a<c.length;a++)b.$ShowElement(c[a],d)};b.$RemoveAttribute=function(b,a){b.removeAttribute(a)};b.$CanClearClip=function(){return i()&&c<10};b.$SetStyleClip=function(b,a){if(a)b.style.clip="rect("+Math.round(a.$Top||a.$MoveY||0)+"px "+Math.round(a.$Right)+"px "+Math.round(a.$Bottom)+"px "+Math.round(a.$Left||a.$MoveX||0)+"px)";else if(a!==undefined){var e=b.style.cssText,d=[new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),new RegExp(/[\s]*cliptop: .*?[;]?/i),new RegExp(/[\s]*clipright: .*?[;]?/i),new RegExp(/[\s]*clipbottom: .*?[;]?/i),new RegExp(/[\s]*clipleft: .*?[;]?/i)],c=t(e,d,"");$Jssor$.$CssCssText(b,c)}};b.$GetNow=function(){return+new Date};b.$AppendChild=function(b,a){b.appendChild(a)};b.$AppendChildren=function(c,a){e(a,function(a){b.$AppendChild(c,a)})};b.$InsertBefore=function(b,a,c){(c||a.parentNode).insertBefore(b,a)};b.$InsertAfter=function(c,a,d){b.$InsertBefore(c,a.nextSibling,d||a.parentNode)};b.$InsertAdjacentHtml=function(b,a,c){b.insertAdjacentHTML(a,c)};b.$RemoveElement=function(b,a){a=a||b.parentNode;a&&a.removeChild(b)};b.$RemoveElements=function(a,c){e(a,function(a){b.$RemoveElement(a,c)})};b.$Empty=function(a){b.$RemoveElements(b.$Children(a,true),a)};b.$CenterElement=function(a,c){var d=b.$ParentNode(a);c&1&&b.$CssLeft(a,(b.$CssWidth(d)-b.$CssWidth(a))/2);c&2&&b.$CssTop(a,(b.$CssHeight(d)-b.$CssHeight(a))/2)};b.$ParseInt=function(b,a){return parseInt(b,a||10)};b.$ParseFloat=h;b.$IsChild=function(b,a){var c=document.body;while(a&&b!==a&&c!==a)try{a=a.parentNode}catch(d){return false}return b===a};function Q(e,d,c){var a=e.cloneNode(!d);!c&&b.$RemoveAttribute(a,"id");return a}b.$CloneNode=Q;b.$LoadImage=function(f,g){var a=new Image;function d(f,c){b.$RemoveEvent(a,"load",d);b.$RemoveEvent(a,"abort",e);b.$RemoveEvent(a,"error",e);g&&g(a,c)}function e(a){d(a,true)}if(gb()&&c<11.6||!f)d(!f);else{b.$AddEvent(a,"load",d);b.$AddEvent(a,"abort",e);b.$AddEvent(a,"error",e);a.src=f}};b.$LoadImages=function(f,a,g){var d=f.length+1;function c(b){d--;if(a&&b&&b.src==a.src)a=b;!d&&g&&g(a)}e(f,function(a){b.$LoadImage(a.src,c)});c()};b.$BuildElement=function(a,f,h,g){if(g)a=Q(a);var b=M(a,f);if(!b.length)b=$Jssor$.$GetElementsByTag(a,f);for(var e=b.length-1;e>-1;e--){var c=b[e],d=Q(h);o(d,o(c));$Jssor$.$CssCssText(d,c.style.cssText);$Jssor$.$InsertBefore(d,c);$Jssor$.$RemoveElement(c)}return a};function xb(a){var j=this,m="",p=["av","pv","ds","dn"],f=[],n,i=0,g=0,d=0;function h(){A(a,n,f[d||i||g&2||g]);$Jssor$.$Css(a,"pointer-events",d?"none":"")}function c(){i=0;h();b.$RemoveEvent(document,"mouseup",c);b.$RemoveEvent(document,"touchend",c);b.$RemoveEvent(document,"touchcancel",c)}function l(a){if(d)b.$CancelEvent(a);else{i=4;h();b.$AddEvent(document,"mouseup",c);b.$AddEvent(document,"touchend",c);b.$AddEvent(document,"touchcancel",c)}}j.$Selected=function(a){if(a===undefined)return g;g=a&2||a&1;h()};j.$Enable=function(a){if(a===undefined)return!d;d=a?0:3;h()};j.$Elmt=a=b.$GetElement(a);var k=$Jssor$.$Split(o(a));if(k)m=k.shift();e(p,function(a){f.push(m+a)});n=U(" ",f);f.unshift("");b.$AddEvent(a,"mousedown",l);b.$AddEvent(a,"touchstart",l)}b.$Buttonize=function(a){return new xb(a)};b.$Css=x;b.$CssN=T;b.$CssP=Ab;b.$CssOverflow=d("overflow");b.$CssTop=d("top",2);b.$CssLeft=d("left",2);b.$CssWidth=d("width",2);b.$CssHeight=d("height",2);b.$CssMarginLeft=d("marginLeft",2);b.$CssMarginTop=d("marginTop",2);b.$CssPosition=d("position");b.$CssDisplay=d("display");b.$CssZIndex=d("zIndex",1);b.$CssFloat=function(b,a){return x(b,i()?"styleFloat":"cssFloat",a)};b.$CssOpacity=function(b,a,c){if(a!=undefined)wb(b,a,c);else return ub(b)};b.$CssCssText=function(a,b){if(b!=undefined)a.style.cssText=b;else return a.style.cssText};var N={$Opacity:b.$CssOpacity,$Top:b.$CssTop,$Left:b.$CssLeft,$Width:b.$CssWidth,$Height:b.$CssHeight,$Position:b.$CssPosition,$Display:b.$CssDisplay,$ZIndex:b.$CssZIndex};b.$GetStyles=function(c,b){var a={};e(b,function(d,b){if(N[b])a[b]=N[b](c)});return a};function n(h,k){var f=H(),c=y(),d=W(),i=D(h);function j(b,c,a){var d=b.$TransformPoint(g(-c/2,-a/2)),e=b.$TransformPoint(g(c/2,-a/2)),f=b.$TransformPoint(g(c/2,a/2)),h=b.$TransformPoint(g(-c/2,a/2));b.$TransformPoint(g(300,300));return g(Math.min(d.x,e.x,f.x,h.x)+c/2,Math.min(d.y,e.y,f.y,h.y)+a/2)}function a(e,a){a=a||{};var g=a.$TranslateZ||0,k=(a.$RotateX||0)%360,l=(a.$RotateY||0)%360,n=(a.$Rotate||0)%360,o=a.$ScaleZ;if(f){g=0;k=0;l=0;o=0}var d=new tb(a.$TranslateX,a.$TranslateY,g);d.$RotateX(k);d.$RotateY(l);d.$RotateZ(n);d.$Skew(a.$SkewX,a.$SkewY);d.$Scale(a.$ScaleX,a.$ScaleY,o);if(c){d.$Move(a.$MoveX,a.$MoveY);e.style[i]=d.$Format3d()}else if(!q||q<9){var h="";if(n||a.$ScaleX!=undefined&&a.$ScaleX!=1||a.$ScaleY!=undefined&&a.$ScaleY!=1){var m=j(d,a.$OriginalWidth,a.$OriginalHeight);b.$CssMarginTop(e,m.y);b.$CssMarginLeft(e,m.x);h=d.$Format2d()}var r=e.style.filter,s=new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),p=t(r,[s],h);K(e,p)}}n=function(g,f){f=f||{};var i=f.$MoveX,j=f.$MoveY,h;e(N,function(a,b){h=f[b];h!==undefined&&a(g,h)});b.$SetStyleClip(g,f.$Clip);if(!c){i!=undefined&&b.$CssLeft(g,(f.$OriginalX||0)+i);j!=undefined&&b.$CssTop(g,(f.$OriginalY||0)+j)}if(f.$Transform)if(d)pb(b.$CreateCallback(null,F,g,f));else a(g,f)};b.$SetStyleTransform=F;if(d)b.$SetStyleTransform=n;if(f)b.$SetStyleTransform=a;else if(!c)a=F;b.$SetStyles=n;n(h,k)}b.$SetStyleTransform=n;b.$SetStyles=n;function tb(h,i,m){var c=this,b=[1,0,0,0,0,1,0,0,0,0,1,0,h||0,i||0,m||0,1],g=Math.sin,f=Math.cos,j=Math.tan;function e(a){return a*Math.PI/180}function l(a,b){return{x:a,y:b}}function k(b,c,f,g,i,l,n,o,q,t,u,w,y,A,C,F,a,d,e,h,j,k,m,p,r,s,v,x,z,B,D,E){return[b*a+c*j+f*r+g*z,b*d+c*k+f*s+g*B,b*e+c*m+f*v+g*D,b*h+c*p+f*x+g*E,i*a+l*j+n*r+o*z,i*d+l*k+n*s+o*B,i*e+l*m+n*v+o*D,i*h+l*p+n*x+o*E,q*a+t*j+u*r+w*z,q*d+t*k+u*s+w*B,q*e+t*m+u*v+w*D,q*h+t*p+u*x+w*E,y*a+A*j+C*r+F*z,y*d+A*k+C*s+F*B,y*e+A*m+C*v+F*D,y*h+A*p+C*x+F*E]}function d(c,a){return k.apply(null,(a||b).concat(c))}c.$Matrix=function(){return b};c.$Scale=function(a,c,e){if(a==undefined)a=1;if(c==undefined)c=1;if(e==undefined)e=1;if(a!=1||c!=1||e!=1)b=d([a,0,0,0,0,c,0,0,0,0,e,0,0,0,0,1])};c.$Translate=function(a,c,e){if(a||c||e)b=d([1,0,0,0,0,1,0,0,0,0,1,0,a||0,c||0,e||0,1])};c.$Move=function(a,c,d){b[12]+=a||0;b[13]+=c||0;b[14]+=d||0};c.$RotateX=function(c){if(c){a=e(c);var h=f(a),i=g(a);b=d([1,0,0,0,0,h,i,0,0,-i,h,0,0,0,0,1])}};c.$RotateY=function(c){if(c){a=e(c);var h=f(a),i=g(a);b=d([h,0,-i,0,0,1,0,0,i,0,h,0,0,0,0,1])}};c.$RotateZ=function(c){if(c){a=e(c);var h=f(a),i=g(a);b=d([h,i,0,0,-i,h,0,0,0,0,1,0,0,0,0,1])}};c.$Skew=function(a,c){if(a||c){h=e(a);i=e(c);b=d([1,j(i),0,0,j(h),1,0,0,0,0,1,0,0,0,0,1])}};c.$TransformPoint=function(c){var a=d(b,[1,0,0,0,0,1,0,0,0,0,1,0,c.x,c.y,0,1]);return l(a[12],a[13])};c.$Format3d=function(){return"matrix3d("+b.join(",")+")"};c.$Format2d=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+b[0]+", M12="+b[4]+", M21="+b[1]+", M22="+b[5]+", SizingMethod='auto expand')"}}new(function(){var a=this;function b(d,g){for(var j=d[0].length,i=d.length,h=g[0].length,f=[],c=0;c<i;c++)for(var k=f[c]=[],b=0;b<h;b++){for(var e=0,a=0;a<j;a++)e+=d[c][a]*g[a][b];k[b]=e}return f}a.$ScaleX=function(b,c){return a.$ScaleXY(b,c,0)};a.$ScaleY=function(b,c){return a.$ScaleXY(b,0,c)};a.$ScaleXY=function(a,c,d){return b(a,[[c,0],[0,d]])};a.$TransformPoint=function(d,c){var a=b(d,[[c.x],[c.y]]);return g(a[0][0],a[1][0])}});var G={$OriginalX:0,$OriginalY:0,$MoveX:0,$MoveY:0,$Zoom:1,$ScaleX:1,$ScaleY:1,$Rotate:0,$RotateX:0,$RotateY:0,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0};b.$FormatEasings=function(a){var b=a||{};if(a)if($Jssor$.$IsFunction(a))b={$Default:b};else if($Jssor$.$IsFunction(a.$Clip))b.$Clip={$Default:a.$Clip};return b};function nb(d,a){var c={};e(d,function(d,e){var f=d;if(a[e]!=undefined)if(b.$IsNumeric(d))f=d+a[e];else f=nb(d,a[e]);c[e]=f});return c}b.$AddDif=nb;b.$Cast=function(f,g,r,k,t,u,i){var a=g;if(f){a={};for(var c in g){var v=u[c]||1,q=t[c]||[0,1],b=(r-q[0])/q[1];b=Math.min(Math.max(b,0),1);b=b*v;var o=Math.floor(b);if(b!=o)b-=o;var d=k.$Default||$JssorEasing$.$EaseSwing,e,w=f[c],h=g[c];if($Jssor$.$IsNumeric(h)){d=k[c]||d;var s=d(b);e=w+h*s}else{$JssorDebug$.$Execute(function(){!$Jssor$.$IsPlainObject(h)&&$JssorDebug$.$Log("jssor cast, wrong difStyles")});e=$Jssor$.$Extend({$Offset:{}},f[c]);var p=k[c]||{};$Jssor$.$Each(h.$Offset||h,function(g,a){d=p[a]||p.$Default||d;var f=d(b),c=g*f;e.$Offset[a]=c;e[a]+=c})}a[c]=e}var n=$Jssor$.$Each(g,function(b,a){return G[a]!=undefined});n&&$Jssor$.$Each(G,function(c,b){if(a[b]==undefined&&f[b]!==undefined)a[b]=f[b]});if(n){if(a.$Zoom)a.$ScaleX=a.$ScaleY=a.$Zoom;a.$OriginalWidth=i.$OriginalWidth;a.$OriginalHeight=i.$OriginalHeight;a.$Transform=true}}if(g.$Clip&&i.$Move){var j=a.$Clip.$Offset,m=(j.$Top||0)+(j.$Bottom||0),l=(j.$Left||0)+(j.$Right||0);a.$Left=(a.$Left||0)+l;a.$Top=(a.$Top||0)+m;a.$Clip.$Left-=l;a.$Clip.$Right-=l;a.$Clip.$Top-=m;a.$Clip.$Bottom-=m}if(a.$Clip&&$Jssor$.$CanClearClip()&&!a.$Clip.$Top&&!a.$Clip.$Left&&!a.$Clip.$MoveY&&!a.$Clip.$MoveX&&a.$Clip.$Right==i.$OriginalWidth&&a.$Clip.$Bottom==i.$OriginalHeight)a.$Clip=null;return a}};function $JssorObject$(){var a=this,c=[],b=[];function g(a,b){$JssorDebug$.$Execute(function(){if(a==undefined||a==null)throw new Error("param 'eventName' is null or empty.");if(typeof b!="function")throw"param 'handler' must be a function.";$Jssor$.$Each(c,function(c){if(c.$EventName==a&&c.$Handler===b)throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");})});c.push({$EventName:a,$Handler:b})}function f(a,b){$JssorDebug$.$Execute(function(){if(a==undefined||a==null)throw new Error("param 'eventName' is null or empty.");if(typeof b!="function")throw"param 'handler' must be a function.";});$Jssor$.$Each(c,function(d,e){d.$EventName==a&&d.$Handler===b&&c.splice(e,1)})}function e(){c=[]}function d(){$Jssor$.$Each(b,function(a){$Jssor$.$RemoveEvent(a.$Obj,a.$EventName,a.$Handler)});b=[]}a.$Listen=function(d,a,c,e){$JssorDebug$.$Execute(function(){if(!d)throw new Error("param 'obj' is null or empty.");if(a==undefined||a==null)throw new Error("param 'eventName' is null or empty.");if(typeof c!="function")throw"param 'handler' must be a function.";$Jssor$.$Each(b,function(b){if(b.$Obj===d&&b.$EventName==a&&b.$Handler===c)throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");})});$Jssor$.$AddEvent(d,a,c,e);b.push({$Obj:d,$EventName:a,$Handler:c})};a.$Unlisten=function(d,a,c){$JssorDebug$.$Execute(function(){if(!d)throw new Error("param 'obj' is null or empty.");if(a==undefined||a==null)throw new Error("param 'eventName' is null or empty.");if(typeof c!="function")throw"param 'handler' must be a function.";});$Jssor$.$Each(b,function(e,f){if(e.$Obj===d&&e.$EventName==a&&e.$Handler===c){$Jssor$.$RemoveEvent(d,a,c);b.splice(f,1)}})};a.$UnlistenAll=d;a.$On=a.addEventListener=g;a.$Off=a.removeEventListener=f;a.$TriggerEvent=function(a){var b=[].slice.call(arguments,1);$Jssor$.$Each(c,function(c){c.$EventName==a&&c.$Handler.apply(window,b)})};a.$Destroy=function(){d();e();for(var b in a)delete a[b]};$JssorDebug$.$C_AbstractClass(a)}var $JssorAnimator$=window.$JssorAnimator$=function(t,x,d,G,D,v){t=t||0;var a=this,k,I,h,i,q,u=0,C,E,B,w,s=0,e=0,g=0,y,f,m,c,b,j,n=[],r;function J(a){c+=a;b+=a;f+=a;m+=a;e+=a;g+=a;s+=a}function p(m){var h=m;if(j&&(h>=b||h<=c))h=((h-c)%j+j)%j+c;if(!y||q||e!=h){var i=Math.min(h,b);i=Math.max(i,c);if(!y||q||i!=g){if(v){var k=(i-f)/(x||1);if(d.$Reverse)k=1-k;var l=$Jssor$.$Cast(D,v,k,C,B,E,d);if(r)$Jssor$.$Each(l,function(b,a){r[a]&&r[a](G,b)});else $Jssor$.$SetStyles(G,l)}a.$OnInnerOffsetChange(g-f,i-f);g=i;$Jssor$.$Each(n,function(b,c){var a=m<e?n[n.length-c-1]:b;a.$GoToPosition(g-s)});var p=e,o=g;e=h;y=true;a.$OnPositionChange(p,o)}}}function z(a,d,e){$JssorDebug$.$Execute(function(){d!==0&&d!==1&&$JssorDebug$.$Fail("Argument out of range, the value of 'combineMode' should be either 0 or 1.")});d&&a.$Shift(b);if(!e){c=Math.min(c,a.$GetPosition_OuterBegin()+s);b=Math.max(b,a.$GetPosition_OuterEnd()+s)}n.push(a)}var l=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame;if($Jssor$.$IsBrowserSafari()&&$Jssor$.$BrowserVersion()<7)l=null;l=l||function(a){$Jssor$.$Delay(a,d.$Interval)};function F(){if(k){var b=$Jssor$.$GetNow(),c=Math.min(b-u,d.$IntervalMax),a=e+c*i;u=b;if(a*i>=h*i)a=h;p(a);if(!q&&a*i>=h*i)H(w);else l(F)}}function o(d,f,g){if(!k){k=true;q=g;w=f;d=Math.max(d,c);d=Math.min(d,b);h=d;i=h<e?-1:1;a.$OnStart();u=$Jssor$.$GetNow();l(F)}}function H(b){if(k){q=k=w=false;a.$OnStop();b&&b()}}a.$Play=function(a,c,d){o(a?e+a:b,c,d)};a.$PlayToPosition=o;a.$PlayToBegin=function(a,b){o(c,a,b)};a.$PlayToEnd=function(a,c){o(b,a,c)};a.$Stop=H;a.$Continue=function(a){o(a)};a.$GetPosition=function(){return e};a.$GetPlayToPosition=function(){return h};a.$GetPosition_Display=function(){return g};a.$GoToPosition=p;a.$GoToBegin=function(){p(c,true)};a.$GoToEnd=function(){p(b,true)};a.$Move=function(a){p(e+a)};a.$CombineMode=function(){return I};a.$GetDuration=function(){return x};a.$IsPlaying=function(){return k};a.$IsOnTheWay=function(){return e>f&&e<=m};a.$SetLoopLength=function(a){j=a};a.$Shift=J;a.$Join=z;a.$Combine=function(a,b){z(a,0,b)};a.$Chain=function(a){z(a,1)};a.$Expand=function(a){b+=a};a.$GetPosition_InnerBegin=function(){return f};a.$GetPosition_InnerEnd=function(){return m};a.$GetPosition_OuterBegin=function(){return c};a.$GetPosition_OuterEnd=function(){return b};a.$OnPositionChange=a.$OnStart=a.$OnStop=a.$OnInnerOffsetChange=$Jssor$.$EmptyFunction;a.$Version=$Jssor$.$GetNow();$JssorDebug$.$Execute(function(){a.$NestedAnimators=n;a.$FromStyles=D;a.$DifStyles=v});d=$Jssor$.$Extend({$Interval:16,$IntervalMax:50},d);$JssorDebug$.$Execute(function(){d=$Jssor$.$Extend({$LoopLength:undefined,$Easing:undefined},d)});j=d.$LoopLength;r=d.$Setter;c=f=t;b=m=t+x;E=d.$Round||{};B=d.$During||{};C=$Jssor$.$FormatEasings(d.$Easing)};function $JssorPlayerClass$(){var b=this,a=[];function c(a){var f=this,c,b=[];function d(f){var e=$Jssor$.$EvtSrc(f);c=e.pInstance;$Jssor$.$RemoveEvent(e,"dataavailable",d);$Jssor$.$Each(b,function(a){a!=c&&a.$Remove()});a.pTagName=c.tagName;b=null}function e(c){var e;if(!c.pInstance){var f=$Jssor$.$AttributeEx(c,"pHandler");if($JssorPlayer$[f]){$Jssor$.$AddEvent(c,"dataavailable",d);e=new $JssorPlayer$[f](a,c);b.push(e);$JssorDebug$.$Execute(function(){$Jssor$.$Type(e.$Remove)!="function"&&$JssorDebug$.$Fail("'pRemove' interface not implemented for player handler '"+f+"'.")})}}return e}f.$InitPlayerController=function(){if(!a.pInstance&&!e(a)){var b=$Jssor$.$Children(a);$Jssor$.$Each(b,function(a){e(a)})}}}b.$EVT_SWITCH=21;b.$FetchPlayers=function(b){b=b||document.body;var d=$Jssor$.$FindChildren(b,"player");$Jssor$.$Each(d,function(b){if(!a[b.pId]){b.pId=a.length;a.push(new c(b))}var d=a[b.pId];d.$InitPlayerController()})}}var $JssorSlideshowFormations$=window.$JssorSlideshowFormations$=new function(){var f=this,b=0,a=1,d=2,c=3,q=1,p=2,r=4,o=8,u=256,v=512,t=1024,s=2048,h=s+q,g=s+p,m=v+q,k=v+p,l=u+r,i=u+o,j=t+r,n=t+o;function w(a){return(a&p)==p}function x(a){return(a&r)==r}function e(b,a,c){c.push(a);b[a]=b[a]||[];b[a].push(c)}f.$FormationStraight=function(n){for(var d=n.$Cols,f=n.$Rows,s=n.$Assembly,t=n.$Count,r=[],a=0,b=0,p=d-1,q=f-1,o=t-1,c,b=0;b<f;b++)for(a=0;a<d;a++){switch(s){case h:c=o-(a*f+(q-b));break;case j:c=o-(b*d+(p-a));break;case m:c=o-(a*f+b);case l:c=o-(b*d+a);break;case g:c=a*f+b;break;case i:c=b*d+(p-a);break;case k:c=a*f+(q-b);break;default:c=b*d+a}e(r,c,[b,a])}return r};f.$FormationSwirl=function(p){var w=p.$Cols,x=p.$Rows,A=p.$Assembly,v=p.$Count,z=[],y=[],t=0,f=0,n=0,q=w-1,r=x-1,s,o,u=0;switch(A){case h:f=q;n=0;o=[d,a,c,b];break;case j:f=0;n=r;o=[b,c,a,d];break;case m:f=q;n=r;o=[c,a,d,b];break;case l:f=q;n=r;o=[a,c,b,d];break;case g:f=0;n=0;o=[d,b,c,a];break;case i:f=q;n=0;o=[a,d,b,c];break;case k:f=0;n=r;o=[c,b,d,a];break;default:f=0;n=0;o=[b,d,a,c]}t=0;while(t<v){s=n+","+f;if(f>=0&&f<w&&n>=0&&n<x&&!y[s]){y[s]=true;e(z,t++,[n,f])}else switch(o[u++%o.length]){case b:f--;break;case d:n--;break;case a:f++;break;case c:n++}switch(o[u%o.length]){case b:f++;break;case d:n++;break;case a:f--;break;case c:n--}}return z};f.$FormationZigZag=function(p){var w=p.$Cols,x=p.$Rows,z=p.$Assembly,v=p.$Count,t=[],u=0,f=0,n=0,q=w-1,r=x-1,y,o,s=0;switch(z){case h:f=q;n=0;o=[d,a,c,a];break;case j:f=0;n=r;o=[b,c,a,c];break;case m:f=q;n=r;o=[c,a,d,a];break;case l:f=q;n=r;o=[a,c,b,c];break;case g:f=0;n=0;o=[d,b,c,b];break;case i:f=q;n=0;o=[a,d,b,d];break;case k:f=0;n=r;o=[c,b,d,b];break;default:f=0;n=0;o=[b,d,a,d]}u=0;while(u<v){y=n+","+f;if(f>=0&&f<w&&n>=0&&n<x&&typeof t[y]=="undefined"){e(t,u++,[n,f]);switch(o[s%o.length]){case b:f++;break;case d:n++;break;case a:f--;break;case c:n--}}else{switch(o[s++%o.length]){case b:f--;break;case d:n--;break;case a:f++;break;case c:n++}switch(o[s++%o.length]){case b:f++;break;case d:n++;break;case a:f--;break;case c:n--}}}return t};f.$FormationStraightStairs=function(q){var u=q.$Cols,v=q.$Rows,f=q.$Assembly,t=q.$Count,r=[],s=0,c=0,d=0,o=u-1,p=v-1,z=t-1;switch(f){case h:case k:case m:case g:var a=0,b=0;break;case i:case j:case l:case n:var a=o,b=0;break;default:f=n;var a=o,b=0}c=a;d=b;while(s<t){if(x(f)||w(f))e(r,z-s++,[d,c]);else e(r,s++,[d,c]);switch(f){case h:case k:c--;d++;break;case m:case g:c++;d--;break;case i:case j:c--;d--;break;case n:case l:default:c++;d++}if(c<0||d<0||c>o||d>p){switch(f){case h:case k:a++;break;case i:case j:case m:case g:b++;break;case n:case l:default:a--}if(a<0||b<0||a>o||b>p){switch(f){case h:case k:a=o;b++;break;case m:case g:b=p;a++;break;case i:case j:b=p;a--;break;case n:case l:default:a=0;b++}if(b>p)b=p;else if(b<0)b=0;else if(a>o)a=o;else if(a<0)a=0}d=b;c=a}}return r};f.$FormationSquare=function(h){var a=h.$Cols||1,b=h.$Rows||1,i=[],c,d,f,g,j;f=a<b?(b-a)/2:0;g=a>b?(a-b)/2:0;j=Math.round(Math.max(a/2,b/2))+1;for(c=0;c<a;c++)for(d=0;d<b;d++)e(i,j-Math.min(c+1+f,d+1+g,a-c+f,b-d+g),[d,c]);return i};f.$FormationRectangle=function(f){var c=f.$Cols||1,d=f.$Rows||1,g=[],a,b,h;h=Math.round(Math.min(c/2,d/2))+1;for(a=0;a<c;a++)for(b=0;b<d;b++)e(g,h-Math.min(a+1,b+1,c-a,d-b),[b,a]);return g};f.$FormationRandom=function(c){for(var d=[],a,b=0;b<c.$Rows;b++)for(a=0;a<c.$Cols;a++)e(d,Math.ceil(1e5*Math.random())%13,[b,a]);return d};f.$FormationCircle=function(c){for(var d=c.$Cols||1,f=c.$Rows||1,g=[],a,h=d/2-.5,i=f/2-.5,b=0;b<d;b++)for(a=0;a<f;a++)e(g,Math.round(Math.sqrt(Math.pow(b-h,2)+Math.pow(a-i,2))),[a,b]);return g};f.$FormationCross=function(c){for(var d=c.$Cols||1,f=c.$Rows||1,g=[],a,h=d/2-.5,i=f/2-.5,b=0;b<d;b++)for(a=0;a<f;a++)e(g,Math.round(Math.min(Math.abs(b-h),Math.abs(a-i))),[a,b]);return g};f.$FormationRectangleCross=function(f){for(var g=f.$Cols||1,h=f.$Rows||1,i=[],a,c=g/2-.5,d=h/2-.5,j=Math.max(c,d)+1,b=0;b<g;b++)for(a=0;a<h;a++)e(i,Math.round(j-Math.max(c-Math.abs(b-c),d-Math.abs(a-d)))-1,[a,b]);return i}},$JssorSlideshowRunner$=window.$JssorSlideshowRunner$=function(f,j,h,l,q){var c=this,m,b,a,p=0,o=l.$TransitionsOrder,i,d=8;function k(a){if(a.$Top)a.$MoveY=a.$Top;if(a.$Left)a.$MoveX=a.$Left;$Jssor$.$Each(a,function(a){$Jssor$.$IsPlainObject(a)&&k(a)})}function e(c,b){var a={$Interval:b,$Duration:1,$Delay:0,$Cols:1,$Rows:1,$Opacity:0,$Zoom:0,$Clip:0,$Move:false,$SlideOut:false,$Reverse:false,$Formation:$JssorSlideshowFormations$.$FormationRandom,$Assembly:1032,$ChessMode:{$Column:0,$Row:0},$Easing:$JssorEasing$.$EaseSwing,$Round:{},$Blocks:[],$During:{}};$Jssor$.$Extend(a,c);k(a);a.$Count=a.$Cols*a.$Rows;a.$Easing=$Jssor$.$FormatEasings(a.$Easing);a.$FramesCount=Math.ceil(a.$Duration/a.$Interval);a.$GetBlocks=function(c,b){c/=a.$Cols;b/=a.$Rows;var f=c+"x"+b;if(!a.$Blocks[f]){a.$Blocks[f]={$Width:c,$Height:b};for(var d=0;d<a.$Cols;d++)for(var e=0;e<a.$Rows;e++)a.$Blocks[f][e+","+d]={$Top:e*b,$Right:d*c+c,$Bottom:e*b+b,$Left:d*c}}return a.$Blocks[f]};if(a.$Brother){a.$Brother=e(a.$Brother,b);a.$SlideOut=true}return a}function g(w,e,a,r,j,h){var u=this,p,q={},f={},i=[],c,b,n,l=a.$ChessMode.$Column||0,m=a.$ChessMode.$Row||0,d=a.$GetBlocks(j,h),k=x(a),y=k.length-1,o=a.$Duration+a.$Delay*y,s=r+o,g=a.$SlideOut,t;s+=50;function x(a){var b=a.$Formation(a);return a.$Reverse?b.reverse():b}u.$EndTime=s;u.$ShowFrame=function(b){b-=r;var c=b<o;if(c||t){t=c;if(!g)b=o-b;var d=Math.ceil(b/a.$Interval);$Jssor$.$Each(f,function(a,c){var b=Math.max(d,a.$Min);b=Math.min(b,a.length-1);if(a.$LastFrameIndex!=b){if(!a.$LastFrameIndex&&!g)$Jssor$.$ShowElement(i[c]);else b==a.$Max&&g&&$Jssor$.$HideElement(i[c]);a.$LastFrameIndex=b;$Jssor$.$SetStyles(i[c],a[b])}})}};e=$Jssor$.$CloneNode(e);$Jssor$.$SetStyleTransform(e,null);if($Jssor$.$IsBrowserIe9Earlier()){var z=!e["no-image"],v=$Jssor$.$FindChildrenByTag(e);$Jssor$.$Each(v,function(a){(z||a["jssor-slider"])&&$Jssor$.$CssOpacity(a,$Jssor$.$CssOpacity(a),true)})}$Jssor$.$Each(k,function(e,i){$Jssor$.$Each(e,function(C){var G=C[0],F=C[1],r=G+","+F,k=false,o=false,t=false;if(l&&F%2){if(l&3)k=!k;if(l&12)o=!o;if(l&16)t=!t}if(m&&G%2){if(m&3)k=!k;if(m&12)o=!o;if(m&16)t=!t}a.$Top=a.$Top||a.$Clip&4;a.$Bottom=a.$Bottom||a.$Clip&8;a.$Left=a.$Left||a.$Clip&1;a.$Right=a.$Right||a.$Clip&2;var y=o?a.$Bottom:a.$Top,v=o?a.$Top:a.$Bottom,x=k?a.$Right:a.$Left,w=k?a.$Left:a.$Right;a.$Clip=y||v||x||w;n={};b={$MoveY:0,$MoveX:0,$Opacity:1,$Width:j,$Height:h};c=$Jssor$.$Extend({},b);p=$Jssor$.$Extend({},d[r]);if(a.$Opacity)b.$Opacity=2-a.$Opacity;if(a.$ZIndex){b.$ZIndex=a.$ZIndex;c.$ZIndex=0}var E=a.$Cols*a.$Rows>1||a.$Clip;if(a.$Zoom||a.$Rotate){var D=true;if($Jssor$.$IsBrowserIe9Earlier())if(a.$Cols*a.$Rows>1)D=false;else E=false;if(D){b.$Zoom=a.$Zoom?a.$Zoom-1:1;c.$Zoom=1;if($Jssor$.$IsBrowserIe9Earlier()||$Jssor$.$IsBrowserOpera())b.$Zoom=Math.min(b.$Zoom,2);var J=a.$Rotate||0;b.$Rotate=J*360*(t?-1:1);c.$Rotate=0}}if(E){var e=p.$Offset={};if(a.$Clip){var s=a.$ScaleClip||1;if(y&&v){e.$Top=d.$Height/2*s;e.$Bottom=-e.$Top}else if(y)e.$Bottom=-d.$Height*s;else if(v)e.$Top=d.$Height*s;if(x&&w){e.$Left=d.$Width/2*s;e.$Right=-e.$Left}else if(x)e.$Right=-d.$Width*s;else if(w)e.$Left=d.$Width*s}n.$Clip=p;c.$Clip=d[r]}var H=k?1:-1,I=o?1:-1;if(a.x)b.$MoveX+=j*a.x*H;if(a.y)b.$MoveY+=h*a.y*I;$Jssor$.$Each(b,function(a,b){if($Jssor$.$IsNumeric(a))if(a!=c[b])n[b]=a-c[b]});q[r]=g?c:b;var z=a.$FramesCount,u=Math.round(i*a.$Delay/a.$Interval);f[r]=new Array(u);f[r].$Min=u;f[r].$Max=u+z-1;for(var B=0;B<=z;B++){var A=$Jssor$.$Cast(c,n,B/z,a.$Easing,a.$During,a.$Round,{$Move:a.$Move,$OriginalWidth:j,$OriginalHeight:h});A.$ZIndex=A.$ZIndex||1;f[r].push(A)}})});k.reverse();$Jssor$.$Each(k,function(a){$Jssor$.$Each(a,function(b){var f=b[0],d=b[1],c=f+","+d,a=e;if(d||f)a=$Jssor$.$CloneNode(e);$Jssor$.$SetStyles(a,q[c]);$Jssor$.$CssOverflow(a,"hidden");$Jssor$.$CssPosition(a,"absolute");w.$AddClipElement(a);i[c]=a;$Jssor$.$ShowElement(a,!g)})})}function n(){var c=this,e=0;$JssorAnimator$.call(c,0,m);c.$OnPositionChange=function(f,c){if(c-e>d){e=c;a&&a.$ShowFrame(c);b&&b.$ShowFrame(c)}};c.$Transition=i}c.$GetTransition=function(){var a=0,b=l.$Transitions,c=b.length;if(o)a=p++%c;else a=Math.floor(Math.random()*c);b[a]&&(b[a].$Index=a);return b[a]};c.$Initialize=function(x,y,p,q,k){$JssorDebug$.$Execute(function(){b&&$JssorDebug$.$Fail("slideshow runner has not been cleared.")});i=k;k=e(k,d);var o=q.$Item,n=p.$Item;o["no-image"]=!q.$Image;n["no-image"]=!p.$Image;var t=o,u=n,w=k,l=k.$Brother||e({},d);if(!k.$SlideOut){t=n;u=o}var v=l.$Shift||0;b=new g(f,u,l,Math.max(v-l.$Interval,0),j,h);a=new g(f,t,w,Math.max(l.$Interval-v,0),j,h);b.$ShowFrame(0);a.$ShowFrame(0);m=Math.max(b.$EndTime,a.$EndTime);c.$Index=x};c.$Clear=function(){f.$Clear();b=null;a=null};c.$GetProcessor=function(){var b=null;if(a)b=new n;return b};if($Jssor$.$IsBrowserIe9Earlier()||$Jssor$.$IsBrowserOpera()||q&&$Jssor$.$WebKitVersion()<537)d=16;$JssorObject$.call(c);$JssorAnimator$.call(c,-1e7,1e7)},$JssorSlider$=window.$JssorSlider$=function(c,Xb){var b=this;function uc(){var a=this;$JssorAnimator$.call(a,-1e8,2e8);a.$GetCurrentSlideInfo=function(){var b=a.$GetPosition_Display(),c=Math.floor(b),e=f(c),d=b-Math.floor(b);return{$Index:e,$VirtualIndex:c,$Position:d}};a.$OnPositionChange=function(c,a){var d=Math.floor(a);if(d!=a&&a>c)d++;Ob(d,true);b.$TriggerEvent($JssorSlider$.$EVT_POSITION_CHANGE,f(a),f(c),a,c)}}function tc(){var a=this;$JssorAnimator$.call(a,0,0,{$LoopLength:d});$Jssor$.$Each(o,function(b){p&1&&b.$SetLoopLength(d);a.$Chain(b);b.$Shift(U/Ub)})}function sc(){var a=this,b=ob.$Elmt;$JssorAnimator$.call(a,-1,2,{$Easing:$JssorEasing$.$EaseLinear,$Setter:{$Position:Tb},$LoopLength:d},b,{$Position:1},{$Position:-2});a.$Wrapper=b;$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(ob.$Elmt,"debug-id","slide_container")})}function gc(m,l){var c=this,g,h,j,k,d;$JssorAnimator$.call(c,-1e8,2e8,{$IntervalMax:100});c.$OnStart=function(){D=true;I=null;b.$TriggerEvent($JssorSlider$.$EVT_SWIPE_START,f(i.$GetPosition()),i.$GetPosition())};c.$OnStop=function(){D=false;k=false;var a=i.$GetCurrentSlideInfo();b.$TriggerEvent($JssorSlider$.$EVT_SWIPE_END,f(i.$GetPosition()),i.$GetPosition());!a.$Position&&wc(a.$VirtualIndex,e)};c.$OnPositionChange=function(f,e){var b;if(k)b=d;else{b=h;if(j){var c=e/j;b=a.$SlideEasing(c)*(h-g)+g}}i.$GoToPosition(b)};c.$PlayCarousel=function(a,d,b,e){$JssorDebug$.$Execute(function(){c.$IsPlaying()&&$JssorDebug$.$Fail("The carousel is already playing.")});g=a;h=d;j=b;i.$GoToPosition(a);c.$GoToPosition(0);c.$PlayToPosition(b,e)};c.$StandBy=function(a){k=true;d=a;c.$Play(a,null,true)};c.$SetStandByPosition=function(a){d=a};c.$MoveCarouselTo=function(a){i.$GoToPosition(a)};i=new uc;i.$Combine(m);i.$Combine(l)}function hc(){var b=this,a=Rb();$Jssor$.$CssZIndex(a,0);$Jssor$.$Css(a,"pointerEvents","none");b.$Elmt=a;b.$AddClipElement=function(b){$Jssor$.$AppendChild(a,b);$Jssor$.$ShowElement(a)};b.$Clear=function(){$Jssor$.$HideElement(a);$Jssor$.$Empty(a)}}function qc(j,g){var c=this,q,u,r,i,w=[],t,z,Q,D,J,C,k,s,n,O;$JssorAnimator$.call(c,-h,h+1,{$SlideItemAnimator:true});function A(a){q&&q.$Revert();P(j,a,0);C=true;q=new v.$Class(j,v,$Jssor$.$ParseFloat($Jssor$.$AttributeEx(j,"idle"))||fc);$JssorDebug$.$LiveStamp(q,"caption_slider_"+Fb);$JssorDebug$.$Execute(function(){Fb++});q.$GoToPosition(0)}function T(){q.$Version<v.$Version&&A()}function G(l,n,k){if(!D){D=true;if(i&&k){var e=k.width,d=k.height,j=e,h=d;if(e&&d&&a.$FillMode){if(a.$FillMode&3&&(!(a.$FillMode&4)||e>y||d>x)){var f=false,m=y/x*d/e;if(a.$FillMode&1)f=m>1;else if(a.$FillMode&2)f=m<1;j=f?e*x/d:y;h=f?x:d*y/e}$Jssor$.$CssWidth(i,j);$Jssor$.$CssHeight(i,h);$Jssor$.$CssTop(i,(x-h)/2);$Jssor$.$CssLeft(i,(y-j)/2)}$Jssor$.$CssPosition(i,"absolute");b.$TriggerEvent($JssorSlider$.$EVT_LOAD_END,g)}}$Jssor$.$HideElement(n);l&&l(c)}function R(b,d,h,i){if(i==I&&e==g&&E)if(!vc){var a=f(b);m.$Initialize(a,g,d,c,h);d.$HideContentForSlideshow();L.$Shift(a-L.$GetPosition_OuterBegin()-1);L.$GoToPosition(a);l.$PlayCarousel(b,b,0)}}function V(b){if(b==I&&e==g){if(!k){var a=null;if(m)if(m.$Index==g)a=m.$GetProcessor();else m.$Clear();T();k=new oc(j,g,a,q);k.$SetPlayer(n)}!k.$IsPlaying()&&k.$Replay()}}function K(b,e,j){if(b==g){if(b!=e)o[e]&&o[e].$ParkOut();else!j&&k&&k.$AdjustIdleOnPark();n&&n.$Enable();var l=I=$Jssor$.$GetNow();c.$LoadImage($Jssor$.$CreateCallback(null,V,l))}else{var i=Math.min(g,b),f=Math.max(g,b),p=Math.min(f-i,i+d-f),m=h+a.$LazyLoading-1;(!J||p<=m)&&c.$LoadImage()}}function W(){if(e==g&&k){k.$Stop();n&&n.$Quit();n&&n.$Disable();k.$OpenSlideshowPanel()}}function X(){e==g&&k&&k.$Stop()}function U(a){!B&&b.$TriggerEvent($JssorSlider$.$EVT_CLICK,g,a)}function H(){n=s.pInstance;k&&k.$SetPlayer(n)}c.$LoadImage=function(c,a){a=a||r;if(w.length&&!D){$Jssor$.$ShowElement(a);if(!Q){Q=true;b.$TriggerEvent($JssorSlider$.$EVT_LOAD_START,g);$Jssor$.$Each(w,function(a){if(!$Jssor$.$Attribute(a,"src")){a.src=$Jssor$.$AttributeEx(a,"src2");$Jssor$.$CssDisplay(a,a["display-origin"])}})}$Jssor$.$LoadImages(w,i,$Jssor$.$CreateCallback(null,G,c,a))}else G(c,a)};c.$GoForNextSlide=function(){var i=g;if(a.$AutoPlaySteps<0)i-=d;var b=i+a.$AutoPlaySteps*mc;if(p&2)b=f(b);if(!(p&1)&&!S)b=Math.max(0,Math.min(b,d-h));if(b!=g){if(m){var c=m.$GetTransition(d);if(c){var j=I=$Jssor$.$GetNow(),e=o[f(b)];return e.$LoadImage($Jssor$.$CreateCallback(null,R,b,e,c,j),r)}}cb(b)}};c.$TryActivate=function(){K(g,g,true)};c.$ParkOut=function(){n&&n.$Quit();n&&n.$Disable();c.$UnhideContentForSlideshow();k&&k.$Abort();k=null;A()};c.$StampSlideItemElements=function(a){a=O+"_"+a;$JssorDebug$.$Execute(function(){i&&$Jssor$.$Attribute(i,"debug-id",a+"_slide_item_image_id");$Jssor$.$Attribute(j,"debug-id",a+"_slide_item_item_id")});$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(u,"debug-id",a+"_slide_item_wrapper_id")});$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(r,"debug-id",a+"_loading_container_id")})};c.$HideContentForSlideshow=function(){$Jssor$.$HideElement(j)};c.$UnhideContentForSlideshow=function(){$Jssor$.$ShowElement(j)};c.$EnablePlayer=function(){n&&n.$Enable()};function P(a,b,c){$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(a,"jssor-slider")&&$JssorDebug$.$Log("Child slider found.")});if($Jssor$.$Attribute(a,"jssor-slider"))return;if(!C){if(a.tagName=="IMG"){w.push(a);if(!$Jssor$.$Attribute(a,"src")){J=true;a["display-origin"]=$Jssor$.$CssDisplay(a);$Jssor$.$HideElement(a)}}$Jssor$.$IsBrowserIe9Earlier()&&$Jssor$.$CssZIndex(a,($Jssor$.$CssZIndex(a)||0)+1)}var d=$Jssor$.$Children(a);$Jssor$.$Each(d,function(d){var f=d.tagName,g=$Jssor$.$AttributeEx(d,"u");if(g=="player"&&!s){s=d;if(s.pInstance)H();else $Jssor$.$AddEvent(s,"dataavailable",H)}if(g=="caption"){if(b){$Jssor$.$CssTransformOrigin(d,$Jssor$.$AttributeEx(d,"to"));$Jssor$.$CssBackfaceVisibility(d,$Jssor$.$AttributeEx(d,"bf"));$Jssor$.$AttributeEx(d,"3d")&&$Jssor$.$CssTransformStyle(d,"preserve-3d")}else if(!$Jssor$.$IsBrowserIE()){var e=$Jssor$.$CloneNode(d,false,true);$Jssor$.$InsertBefore(e,d,a);$Jssor$.$RemoveElement(d,a);d=e;b=true}}else if(!C&&!c&&!i){if(f=="A"){if($Jssor$.$AttributeEx(d,"u")=="image"){i=$Jssor$.$FindChildByTag(d,"IMG");$JssorDebug$.$Execute(function(){!i&&$JssorDebug$.$Error("slide html code definition error, no 'IMG' found in a 'image with link' slide.\r\n"+a.outerHTML)})}else i=$Jssor$.$FindChild(d,"image",true);if(i){t=d;$Jssor$.$CssDisplay(t,"block");$Jssor$.$SetStyles(t,M);z=$Jssor$.$CloneNode(t,true);$Jssor$.$CssPosition(t,"relative");$Jssor$.$CssOpacity(z,0);$Jssor$.$Css(z,"backgroundColor","#000")}}else if(f=="IMG"&&$Jssor$.$AttributeEx(d,"u")=="image")i=d;if(i){i.border=0;$Jssor$.$SetStyles(i,M)}}P(d,b,c+1)})}c.$OnInnerOffsetChange=function(c,b){var a=h-b;Tb(u,a)};c.$Index=g;$JssorObject$.call(c);$Jssor$.$CssPerspective(j,$Jssor$.$AttributeEx(j,"p"));$Jssor$.$CssPerspectiveOrigin(j,$Jssor$.$AttributeEx(j,"po"));var F=$Jssor$.$FindChild(j,"thumb",true);if(F){c.$Thumb=$Jssor$.$CloneNode(F);$Jssor$.$HideElement(F)}$Jssor$.$ShowElement(j);r=$Jssor$.$CloneNode(N);$Jssor$.$CssZIndex(r,1e3);$Jssor$.$AddEvent(j,"click",U);A(true);c.$Image=i;c.$Link=z;c.$Item=j;c.$Wrapper=u=j;$Jssor$.$AppendChild(u,r);b.$On(203,K);b.$On(28,X);b.$On(24,W);$JssorDebug$.$Execute(function(){O=ec++});$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(u,"debug-id","slide-"+g)})}function oc(y,f,l,p){var a=this,j=0,u=0,g,h,d,c,i,t,s,k=o[f];$JssorAnimator$.call(a,0,0);function v(){$Jssor$.$Empty(C);Vb&&i&&k.$Link&&$Jssor$.$AppendChild(C,k.$Link);$Jssor$.$ShowElement(C,!i&&k.$Image)}function w(){a.$Replay()}function x(b){s=b;a.$Stop();a.$Replay()}a.$Replay=function(){var l=a.$GetPosition_Display();if(!n&&!D&&!s&&e==f){if(!l){if(g&&!i){i=true;a.$OpenSlideshowPanel(true);b.$TriggerEvent($JssorSlider$.$EVT_SLIDESHOW_START,f,j,u,g,c)}v()}var m,p=$JssorSlider$.$EVT_STATE_CHANGE;if(l!=c)if(l==d)m=c;else if(l==h)m=d;else if(!l)m=h;else m=a.$GetPlayToPosition();b.$TriggerEvent(p,f,l,j,h,d,c);var o=E&&(!q||r);if(l==c)(d!=c&&!(q&12)||o)&&k.$GoForNextSlide();else(o||l!=d)&&a.$PlayToPosition(m,w)}};a.$AdjustIdleOnPark=function(){d==c&&d==a.$GetPosition_Display()&&a.$GoToPosition(h)};a.$Abort=function(){m&&m.$Index==f&&m.$Clear();var e=a.$GetPosition_Display();e<c&&b.$TriggerEvent($JssorSlider$.$EVT_STATE_CHANGE,f,-e-1,j,h,d,c)};a.$OpenSlideshowPanel=function(a){l&&$Jssor$.$CssOverflow(W,a&&l.$Transition.$Outside?"":"hidden")};a.$OnInnerOffsetChange=function(e,a){if(i&&a>=g){i=false;v();k.$UnhideContentForSlideshow();m.$Clear();b.$TriggerEvent($JssorSlider$.$EVT_SLIDESHOW_END,f,j,u,g,c)}b.$TriggerEvent($JssorSlider$.$EVT_PROGRESS_CHANGE,f,a,j,h,d,c)};a.$SetPlayer=function(a){if(a&&!t){t=a;a.$On($JssorPlayer$.$EVT_SWITCH,x)}};l&&a.$Chain(l);g=a.$GetPosition_OuterEnd();a.$Chain(p);h=g+p.$IdleBegin;d=g+p.$IdleEnd;c=a.$GetPosition_OuterEnd()}function Db(a,b,c){$Jssor$.$CssLeft(a,b);$Jssor$.$CssTop(a,c)}function Tb(c,b){var a=j>0?j:G,d=sb*b*(a&1),e=tb*b*(a>>1&1);Db(c,d,e)}function Kb(){gb=D;Bb=l.$GetPlayToPosition();s=i.$GetPosition()}function Yb(){Kb();if(n||!r&&q&12){l.$Stop();b.$TriggerEvent($JssorSlider$.$EVT_FREEZE)}}function Wb(f){if(!n&&(r||!(q&12))&&!l.$IsPlaying()){var c=i.$GetPosition(),b=Math.ceil(s);if(f&&Math.abs(t)>=a.$MinDragOffsetToSlide){b=Math.ceil(c);b+=T}if(!(p&1))b=Math.min(d-h,Math.max(b,0));var e=Math.abs(b-c);e=1-Math.pow(1-e,5);if(!B&&gb)l.$Continue(Bb);else if(c==b){lb.$EnablePlayer();lb.$TryActivate()}else l.$PlayCarousel(c,b,e*Pb)}}function Ab(a){!$Jssor$.$AttributeEx($Jssor$.$EvtSrc(a),"nodrag")&&$Jssor$.$CancelEvent(a)}function kc(a){Sb(a,1)}function Sb(a,c){a=$Jssor$.$GetEvent(a);var g=$Jssor$.$EvtSrc(a);if(!z&&!$Jssor$.$AttributeEx(g,"nodrag")&&lc()&&(!c||a.touches.length==1)){n=true;rb=false;I=null;$Jssor$.$AddEvent(document,c?"touchmove":"mousemove",vb);$Jssor$.$GetNow();B=0;Yb();if(!gb)j=0;if(c){var e=a.touches[0];mb=e.clientX;nb=e.clientY}else{var d=$Jssor$.$MousePosition(a);mb=d.x;nb=d.y}t=0;R=0;T=0;b.$TriggerEvent($JssorSlider$.$EVT_DRAG_START,f(s),s,a)}}function vb(b){if(n){b=$Jssor$.$GetEvent(b);var c;if(b.type!="mousemove"){var o=b.touches[0];c={x:o.clientX,y:o.clientY}}else c=$Jssor$.$MousePosition(b);if(c){var k=c.x-mb,m=c.y-nb;if(Math.floor(s)!=s)j=j||G&z;if((k||m)&&!j){if(z==3)if(Math.abs(m)>Math.abs(k))j=2;else j=1;else j=z;if(Y&&j==1&&Math.abs(m)-Math.abs(k)>3)rb=true}if(j){var a=m,i=tb;if(j==1){a=k;i=sb}if(!(p&1)){if(a>0){var f=i*e,g=a-f;if(g>0)a=f+Math.sqrt(g)*5}if(a<0){var f=i*(d-h-e),g=-a-f;if(g>0)a=-f-Math.sqrt(g)*5}}if(t-R<-2)T=0;else if(t-R>2)T=-1;R=t;t=a;kb=s-t/i/(Q||1);if(t&&j&&!rb){$Jssor$.$CancelEvent(b);if(!D)l.$StandBy(kb);else l.$SetStandByPosition(kb)}}}}}function bb(){ic();if(n){n=false;$Jssor$.$GetNow();$Jssor$.$RemoveEvent(document,"mousemove",vb);$Jssor$.$RemoveEvent(document,"touchmove",vb);B=t;l.$Stop();var a=i.$GetPosition();b.$TriggerEvent($JssorSlider$.$EVT_DRAG_END,f(a),a,f(s),s);q&12&&Kb();Wb(true)}}function cc(b){if(B){$Jssor$.$StopEvent(b);var a=$Jssor$.$EvtSrc(b);while(a&&g!==a){a.tagName=="A"&&$Jssor$.$CancelEvent(b);try{a=a.parentNode}catch(c){break}}}}function Cb(a){o[e];e=f(a);lb=o[e];Ob(a);return e}function wc(a,c){j=0;Cb(a);b.$TriggerEvent($JssorSlider$.$EVT_PARK,f(a),c)}function Ob(a,b){pb=a;$Jssor$.$Each(J,function(c){c.$SetCurrentIndex(f(a),a,b)})}function lc(){var b=$JssorSlider$.$DragRegistry||0,a=P;if(Y)a&1&&(a&=1);$JssorSlider$.$DragRegistry|=a;return z=a&~b}function ic(){if(z){$JssorSlider$.$DragRegistry&=~P;z=0}}function Rb(){var a=$Jssor$.$CreateDiv();$Jssor$.$SetStyles(a,M);$Jssor$.$CssPosition(a,"absolute");return a}function f(a){return(a%d+d)%d}function dc(b,c){if(c)if(!p){b=Math.min(Math.max(b+pb,0),d-h);c=false}else if(p&2){b=f(b+pb);c=false}cb(b,a.$SlideDuration,c)}function qb(){$Jssor$.$Each(J,function(a){a.$Show(a.$Options.$ChanceToShow<=r)})}function ac(){if(!r){r=1;qb();if(!n){q&12&&Wb();q&3&&o[e].$TryActivate()}}}function Zb(){if(r){r=0;qb();n||!(q&12)||Yb()}}function bc(){M={$Width:y,$Height:x,$Top:0,$Left:0};$Jssor$.$Each(K,function(a){$Jssor$.$SetStyles(a,M);$Jssor$.$CssPosition(a,"absolute");$Jssor$.$CssOverflow(a,"hidden");$Jssor$.$HideElement(a)});$Jssor$.$SetStyles(N,M)}function ab(b,a){cb(b,a,true)}function cb(g,e,k){if(Mb&&(!n&&(r||!(q&12))||a.$NaviQuitDrag)){D=true;n=false;l.$Stop();if(e==undefined)e=Pb;var c=xb.$GetPosition_Display(),b=g;if(k){b=c+g;if(g>0)b=Math.ceil(b);else b=Math.floor(b)}if(p&2)b=f(b);if(!(p&1))b=Math.max(0,Math.min(b,d-h));var j=(b-c)%d;b=c+j;var i=c==b?0:e*Math.abs(j);i=Math.min(i,e*h*1.5);l.$PlayCarousel(c,b,i||1)}}b.$PlayTo=cb;b.$GoTo=function(a){i.$GoToPosition(Cb(a))};b.$Next=function(){ab(1)};b.$Prev=function(){ab(-1)};b.$Pause=function(){E=false};b.$Play=function(){if(!E){E=true;o[e]&&o[e].$TryActivate()}};b.$SetSlideshowTransitions=function(b){$JssorDebug$.$Execute(function(){(!b||!b.length)&&$JssorDebug$.$Error("Can not set slideshow transitions, no transitions specified.")});a.$SlideshowOptions.$Transitions=b};b.$SetCaptionTransitions=function(a){$JssorDebug$.$Execute(function(){(!a||!a.length)&&$JssorDebug$.$Error("Can not set caption transitions, no transitions specified")});v.$Transitions=a;v.$Version=$Jssor$.$GetNow()};b.$SlidesCount=function(){return K.length};b.$CurrentIndex=function(){return e};b.$IsAutoPlaying=function(){return E};b.$IsDragging=function(){return n};b.$IsSliding=function(){return D};b.$IsMouseOver=function(){return!r};b.$LastDragSucceded=function(){return B};function O(){return $Jssor$.$CssWidth(k||c)}function X(){return $Jssor$.$CssHeight(k||c)}b.$OriginalWidth=b.$GetOriginalWidth=O;b.$OriginalHeight=b.$GetOriginalHeight=X;function zb(d,e){if(d==undefined)return $Jssor$.$CssWidth(c);if(!k){$JssorDebug$.$Execute(function(){var b=$Jssor$.$Css(c,"width"),a=$Jssor$.$Css(c,"height"),e=$Jssor$.$CssP(c,"width"),d=$Jssor$.$CssP(c,"height");(!b||b.indexOf("px")==-1)&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not specified. Please specify 'width' in pixel. e.g. 'width: 600px;'");(!a||a.indexOf("px")==-1)&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not specified. Please specify 'height' in pixel. e.g. 'height: 300px;'");b.indexOf("%")!=-1&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. Please specify 'width' in pixel. e.g. 'width: 600px;'");a.indexOf("%")!=-1&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. Please specify 'height' in pixel. e.g. 'height: 300px;'");!e&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. 'width' of 'outer container' should be positive number. e.g. 'width: 600px;'");!d&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. 'height' of 'outer container' should be positive number. e.g. 'height: 300px;'")});var a=$Jssor$.$CreateDiv(document);$Jssor$.$ClassName(a,$Jssor$.$ClassName(c));$Jssor$.$CssCssText(a,$Jssor$.$CssCssText(c));$Jssor$.$CssDisplay(a,"block");$Jssor$.$CssPosition(a,"relative");$Jssor$.$CssTop(a,0);$Jssor$.$CssLeft(a,0);$Jssor$.$CssOverflow(a,"visible");k=$Jssor$.$CreateDiv(document);$Jssor$.$CssPosition(k,"absolute");$Jssor$.$CssTop(k,0);$Jssor$.$CssLeft(k,0);$Jssor$.$CssWidth(k,$Jssor$.$CssWidth(c));$Jssor$.$CssHeight(k,$Jssor$.$CssHeight(c));$Jssor$.$CssTransformOrigin(k,"0 0");$Jssor$.$AppendChild(k,a);var h=$Jssor$.$Children(c);$Jssor$.$AppendChild(c,k);$Jssor$.$Css(c,"backgroundImage","");$Jssor$.$Each(h,function(b){$Jssor$.$AppendChild($Jssor$.$AttributeEx(b,"noscale")?c:a,b);$Jssor$.$AttributeEx(b,"autocenter")&&Eb.push(b)})}$JssorDebug$.$Execute(function(){(!d||d<0)&&$JssorDebug$.$Fail("'$ScaleWidth' error, 'dimension' should be positive value.")});$JssorDebug$.$Execute(function(){if(!Gb)Gb=b.$Elmt.scrollWidth});Q=d/(e?$Jssor$.$CssHeight:$Jssor$.$CssWidth)(k);$Jssor$.$CssScale(k,Q);var g=e?Q*O():d,f=e?d:Q*X();$Jssor$.$CssWidth(c,g);$Jssor$.$CssHeight(c,f);$Jssor$.$Each(Eb,function(a){var b=$Jssor$.$ParseInt($Jssor$.$AttributeEx(a,"autocenter"));$Jssor$.$CenterElement(a,b)})}b.$ScaleHeight=b.$GetScaleHeight=function(a){if(a==undefined)return $Jssor$.$CssHeight(c);zb(a,true)};b.$ScaleWidth=b.$SetScaleWidth=b.$GetScaleWidth=zb;b.$GetVirtualIndex=function(a){var c=Math.ceil(f(U/Ub)),b=f(a-e+c);if(b>h){if(a-e>d/2)a-=d;else if(a-e<=-d/2)a+=d}else a=e+b-c;return a};$JssorObject$.call(b);$JssorDebug$.$Execute(function(){var a=$Jssor$.$GetElement(c);!a&&$JssorDebug$.$Fail("Outer container '"+c+"' not found.")});b.$Elmt=c=$Jssor$.$GetElement(c);var Gb,Fb=1,a=$Jssor$.$Extend({$FillMode:0,$LazyLoading:1,$ArrowKeyNavigation:1,$StartIndex:0,$AutoPlay:false,$Loop:1,$HWA:true,$NaviQuitDrag:true,$AutoPlaySteps:1,$AutoPlayInterval:3e3,$PauseOnHover:1,$SlideDuration:500,$SlideEasing:$JssorEasing$.$EaseOutQuad,$MinDragOffsetToSlide:20,$SlideSpacing:0,$Cols:1,$Align:0,$UISearchMode:1,$PlayOrientation:1,$DragOrientation:1},Xb);a.$HWA=a.$HWA&&$Jssor$.$IsBrowser3dSafe();if(a.$Idle!=undefined)a.$AutoPlayInterval=a.$Idle;if(a.$ParkingPosition!=undefined)a.$Align=a.$ParkingPosition;$JssorDebug$.$Execute(function(){a=$Jssor$.$Extend({$SlideWidth:undefined,$SlideHeight:undefined,$SlideshowOptions:undefined,$CaptionSliderOptions:undefined,$BulletNavigatorOptions:undefined,$ArrowNavigatorOptions:undefined,$ThumbnailNavigatorOptions:undefined},a)});var G=a.$PlayOrientation&3,mc=(a.$PlayOrientation&4)/-4||1,w=a.$SlideshowOptions,v=$Jssor$.$Extend({$Class:$JssorCaptionSliderBase$,$PlayInMode:1,$PlayOutMode:1,$HWA:a.$HWA},a.$CaptionSliderOptions);v.$Transitions=v.$Transitions||v.$CaptionTransitions;var F=a.$BulletNavigatorOptions,u=a.$ArrowNavigatorOptions,A=a.$ThumbnailNavigatorOptions;$JssorDebug$.$Execute(function(){w&&!w.$Class&&$JssorDebug$.$Fail("Option $SlideshowOptions error, class not specified.")});$JssorDebug$.$Execute(function(){a.$CaptionSliderOptions&&!a.$CaptionSliderOptions.$Class&&$JssorDebug$.$Fail("Option $CaptionSliderOptions error, class not specified.")});$JssorDebug$.$Execute(function(){F&&!F.$Class&&$JssorDebug$.$Fail("Option $BulletNavigatorOptions error, class not specified.")});$JssorDebug$.$Execute(function(){u&&!u.$Class&&$JssorDebug$.$Fail("Option $ArrowNavigatorOptions error, class not specified.")});$JssorDebug$.$Execute(function(){A&&!A.$Class&&$JssorDebug$.$Fail("Option $ThumbnailNavigatorOptions error, class not specified.")});var H=!a.$UISearchMode,k,g=$Jssor$.$FindChild(c,"slides",H),N=$Jssor$.$FindChild(c,"loading",H)||$Jssor$.$CreateDiv(document),fb=$Jssor$.$FindChild(c,"navigator",H),wb=$Jssor$.$FindChild(c,"arrowleft",H),ub=$Jssor$.$FindChild(c,"arrowright",H),eb=$Jssor$.$FindChild(c,"thumbnavigator",H);$JssorDebug$.$Execute(function(){if(fb&&!F)throw new Error("Bullet navigator container defined but $BulletNavigatorOptions not specified.");if((wb||ub)&&!u)throw new Error("arrowleft or arrowright defined, but $ArrowNavigatorOptions not specified.");if(eb&&!A)throw new Error("Thumbnail navigator container defined, but $ThumbnailNavigatorOptions not specified.");});var ib=$Jssor$.$CssWidth(g),hb=$Jssor$.$CssHeight(g);$JssorDebug$.$Execute(function(){isNaN(ib)&&$JssorDebug$.$Fail("Width of slides container wrong specification, it should be specified in pixel (like style='width: 600px;').");ib==undefined&&$JssorDebug$.$Fail("Width of slides container not specified, it should be specified in pixel (like style='width: 600px;').");isNaN(hb)&&$JssorDebug$.$Fail("Height of slides container wrong specification, it should be specified in pixel (like style='height: 300px;').");hb==undefined&&$JssorDebug$.$Fail("Height of slides container not specified, it should be specified in pixel (like style='height: 300px;').");var c=$Jssor$.$CssOverflow(g),a=$Jssor$.$Css(g,"overflowX"),b=$Jssor$.$Css(g,"overflowY");c!="hidden"&&(a!="hidden"||b!="hidden")&&$JssorDebug$.$Fail("Overflow of slides container wrong specification, it should be specified as 'hidden' (style='overflow:hidden;').")});$JssorDebug$.$Execute(function(){!$Jssor$.$IsNumeric(a.$Cols)&&$JssorDebug$.$Fail("Option $Cols error, it should be a numeric value and greater than or equal to 1.");a.$Cols<1&&$JssorDebug$.$Fail("Option $Cols error, it should be greater than or equal to 1.");a.$Cols>1&&a.$DragOrientation&&a.$DragOrientation!=G&&$JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $Cols is greater than 1.");!$Jssor$.$IsNumeric(a.$Align)&&$JssorDebug$.$Fail("Option $Align error, it should be a numeric value.");a.$Align&&a.$DragOrientation&&a.$DragOrientation!=G&&$JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $Align is not equal to 0.")});var M,K=[],nc=$Jssor$.$Children(g);$Jssor$.$Each(nc,function(a){if(a.tagName=="DIV"&&!$Jssor$.$AttributeEx(a,"u"))K.push(a);else $Jssor$.$IsBrowserIe9Earlier()&&$Jssor$.$CssZIndex(a,($Jssor$.$CssZIndex(a)||0)+1)});var ec=0,e=-1,pb,lb,d=K.length,y=a.$SlideWidth||ib,x=a.$SlideHeight||hb,Qb=a.$SlideSpacing,sb=y+Qb,tb=x+Qb,Ub=G&1?sb:tb,h=Math.min(a.$Cols,d),W,j,z,rb,J=[],Lb,Nb,Jb,Vb,vc,E,q=a.$PauseOnHover,fc=a.$AutoPlayInterval,Pb=a.$SlideDuration,jb,S,U,Mb=h<d,p=Mb?a.$Loop:0,P,B,r=1,D,n,I,mb=0,nb=0,t,R,T,xb,i,L,l,ob=new hc,Q,Eb=[];if(d){if(a.$HWA)Db=function(a,b,c){$Jssor$.$SetStyleTransform(a,{$TranslateX:b,$TranslateY:c})};E=a.$AutoPlay;b.$Options=Xb;bc();$Jssor$.$Attribute(c,"jssor-slider",true);$Jssor$.$CssZIndex(g,$Jssor$.$CssZIndex(g)||0);$Jssor$.$CssPosition(g,"absolute");W=$Jssor$.$CloneNode(g,true);$Jssor$.$InsertBefore(W,g);if(w){Vb=w.$ShowLink;jb=w.$Class;$JssorDebug$.$Execute(function(){(!w.$Transitions||!w.$Transitions.length)&&$JssorDebug$.$Error("Invalid '$SlideshowOptions', no '$Transitions' specified.")});S=h==1&&d>1&&jb&&(!$Jssor$.$IsBrowserIE()||$Jssor$.$BrowserVersion()>=8)}U=S||h>=d||!(p&1)?0:a.$Align;P=(h>1||U?G:-1)&a.$DragOrientation;var V=g,o=[],m,C,yb=$Jssor$.$Device(),Y=yb.$Touchable,s,gb,Bb,kb;yb.$TouchActionAttr&&$Jssor$.$Css(V,yb.$TouchActionAttr,([null,"pan-y","pan-x","none"])[P]||"");L=new sc;if(S)m=new jb(ob,y,x,w,Y);$Jssor$.$AppendChild(W,L.$Wrapper);$Jssor$.$CssOverflow(g,"hidden");C=Rb();$Jssor$.$Css(C,"backgroundColor","#000");$Jssor$.$CssOpacity(C,0);$Jssor$.$InsertBefore(C,V.firstChild,V);for(var db=0;db<K.length;db++){var pc=K[db],rc=new qc(pc,db);o.push(rc)}$Jssor$.$HideElement(N);$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(N,"debug-id","loading-container")});xb=new tc;l=new gc(xb,L);$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(V,"debug-id","slide-board")});if(P){$Jssor$.$AddEvent(g,"mousedown",Sb);$Jssor$.$AddEvent(g,"touchstart",kc);$Jssor$.$AddEvent(g,"dragstart",Ab);$Jssor$.$AddEvent(g,"selectstart",Ab);$Jssor$.$AddEvent(document,"mouseup",bb);$Jssor$.$AddEvent(document,"touchend",bb);$Jssor$.$AddEvent(document,"touchcancel",bb);$Jssor$.$AddEvent(window,"blur",bb)}q&=Y?10:5;if(fb&&F){Lb=new F.$Class(fb,F,O(),X());J.push(Lb)}if(u&&wb&&ub){u.$Loop=p;u.$Cols=h;Nb=new u.$Class(wb,ub,u,O(),X());J.push(Nb)}if(eb&&A){A.$StartIndex=a.$StartIndex;Jb=new A.$Class(eb,A);J.push(Jb)}$Jssor$.$Each(J,function(a){a.$Reset(d,o,N);a.$On($JssorNavigatorEvents$.$NAVIGATIONREQUEST,dc)});$Jssor$.$Css(c,"visibility","visible");zb(O());$Jssor$.$AddEvent(g,"click",cc,true);$Jssor$.$AddEvent(c,"mouseout",$Jssor$.$MouseOverOutFilter(ac,c));$Jssor$.$AddEvent(c,"mouseover",$Jssor$.$MouseOverOutFilter(Zb,c));qb();a.$ArrowKeyNavigation&&$Jssor$.$AddEvent(document,"keydown",function(b){if(b.keyCode==37)ab(-a.$ArrowKeyNavigation);else b.keyCode==39&&ab(a.$ArrowKeyNavigation)});var Z=a.$StartIndex;if(!(p&1))Z=Math.max(0,Math.min(Z,d-h));l.$PlayCarousel(Z,Z,0)}};$JssorSlider$.$EVT_CLICK=21;$JssorSlider$.$EVT_DRAG_START=22;$JssorSlider$.$EVT_DRAG_END=23;$JssorSlider$.$EVT_SWIPE_START=24;$JssorSlider$.$EVT_SWIPE_END=25;$JssorSlider$.$EVT_LOAD_START=26;$JssorSlider$.$EVT_LOAD_END=27;$JssorSlider$.$EVT_FREEZE=28;$JssorSlider$.$EVT_POSITION_CHANGE=202;$JssorSlider$.$EVT_PARK=203;$JssorSlider$.$EVT_SLIDESHOW_START=206;$JssorSlider$.$EVT_SLIDESHOW_END=207;$JssorSlider$.$EVT_PROGRESS_CHANGE=208;$JssorSlider$.$EVT_STATE_CHANGE=209;var $JssorNavigatorEvents$={$NAVIGATIONREQUEST:1,$INDEXCHANGE:2,$RESET:3},$JssorBulletNavigator$=window.$JssorBulletNavigator$=function(b,v){var d=this;$JssorObject$.call(d);b=$Jssor$.$GetElement(b);var l,t,s,k,g=0,a,h,f,p,q,e,c,j,i,u=[],r=[];function o(a){a!=-1&&r[a].$Selected(a==g)}function m(a){d.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST,a*h)}d.$Elmt=b;d.$GetCurrentIndex=function(){return k};d.$SetCurrentIndex=function(a){if(a!=k){var c=g,b=Math.floor(a/h);g=b;k=a;o(c);o(b)}};d.$Show=function(a){$Jssor$.$ShowElement(b,a)};var n;d.$Reset=function(A){if(!n){l=Math.ceil(A/h);g=0;var v=j+p,x=i+q,o=Math.ceil(l/f)-1;t=j+v*(!e?o:f-1);s=i+x*(e?o:f-1);$Jssor$.$CssWidth(b,t);$Jssor$.$CssHeight(b,s);for(var d=0;d<l;d++){var z=$Jssor$.$CreateSpan();$Jssor$.$InnerText(z,d+1);var k=$Jssor$.$BuildElement(c,"numbertemplate",z,true);$Jssor$.$CssPosition(k,"absolute");var y=d%(o+1);$Jssor$.$CssLeft(k,!e?v*y:d%f*v);$Jssor$.$CssTop(k,e?x*y:Math.floor(d/(o+1))*x);$Jssor$.$AppendChild(b,k);u[d]=k;a.$ActionMode&1&&$Jssor$.$AddEvent(k,"click",$Jssor$.$CreateCallback(null,m,d));a.$ActionMode&2&&$Jssor$.$AddEvent(k,"mouseover",$Jssor$.$MouseOverOutFilter($Jssor$.$CreateCallback(null,m,d),k));r[d]=$Jssor$.$Buttonize(k)}n=true}};d.$Options=a=$Jssor$.$Extend({$SpacingX:10,$SpacingY:10,$Orientation:1,$ActionMode:1},v);$JssorDebug$.$Execute(function(){a=$Jssor$.$Extend({$Steps:undefined,$Rows:undefined},a)});c=$Jssor$.$FindChild(b,"prototype");$JssorDebug$.$Execute(function(){!c&&$JssorDebug$.$Fail("Navigator item prototype not defined.");isNaN($Jssor$.$CssWidth(c))&&$JssorDebug$.$Fail("Width of 'navigator item prototype' not specified.");isNaN($Jssor$.$CssHeight(c))&&$JssorDebug$.$Fail("Height of 'navigator item prototype' not specified.")});j=$Jssor$.$CssWidth(c);i=$Jssor$.$CssHeight(c);$Jssor$.$RemoveElement(c,b);h=a.$Steps||1;f=a.$Rows||1;p=a.$SpacingX;q=a.$SpacingY;e=a.$Orientation-1;a.$Scale==false&&$Jssor$.$Attribute(b,"noscale",true);a.$AutoCenter&&$Jssor$.$Attribute(b,"autocenter",a.$AutoCenter)},$JssorArrowNavigator$=window.$JssorArrowNavigator$=function(a,b,f){var c=this;$JssorObject$.call(c);$JssorDebug$.$Execute(function(){!a&&$JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowleft' not defined. Define 'arrowleft' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");!b&&$JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowright' not defined. Define 'arrowright' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");isNaN($Jssor$.$CssWidth(a))&&$JssorDebug$.$Fail("Width of 'arrow left' not specified.");isNaN($Jssor$.$CssWidth(b))&&$JssorDebug$.$Fail("Width of 'arrow right' not specified.");isNaN($Jssor$.$CssHeight(a))&&$JssorDebug$.$Fail("Height of 'arrow left' not specified.");isNaN($Jssor$.$CssHeight(b))&&$JssorDebug$.$Fail("Height of 'arrow right' not specified.")});var l,k,d,e,g;$Jssor$.$CssWidth(a);$Jssor$.$CssHeight(a);function h(a){c.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST,a,true)}function j(c){$Jssor$.$ShowElement(a,c||!f.$Loop&&d==0);$Jssor$.$ShowElement(b,c||!f.$Loop&&d>=k-f.$Cols);l=c}c.$GetCurrentIndex=function(){return d};c.$SetCurrentIndex=function(b,a,c){if(c)d=a;else{d=b;j(l)}};c.$Show=j;var i;c.$Reset=function(c){k=c;d=0;if(!i){$Jssor$.$AddEvent(a,"click",$Jssor$.$CreateCallback(null,h,-g));$Jssor$.$AddEvent(b,"click",$Jssor$.$CreateCallback(null,h,g));$Jssor$.$Buttonize(a);$Jssor$.$Buttonize(b);i=true}};c.$Options=e=$Jssor$.$Extend({$Steps:1},f);g=e.$Steps;if(e.$Scale==false){$Jssor$.$Attribute(a,"noscale",true);$Jssor$.$Attribute(b,"noscale",true)}if(e.$AutoCenter){$Jssor$.$Attribute(a,"autocenter",e.$AutoCenter);$Jssor$.$Attribute(b,"autocenter",e.$AutoCenter)}},$JssorThumbnailNavigator$=window.$JssorThumbnailNavigator$=function(d,t){var e=this,r,h,a,n=[],p,o,b,i,j,m,l,g,k,c,f;$JssorObject$.call(e);d=$Jssor$.$GetElement(d);function s(m,d){var g=this,c,l,j;function n(){l.$Selected(h==d)}function i(g){if(g||!k.$LastDragSucceded()){var a=b-d%b,c=k.$GetVirtualIndex((d+a)/b-1),f=c*b+b-a;e.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST,f)}}$JssorDebug$.$Execute(function(){g.$Wrapper=undefined});g.$Index=d;g.$Highlight=n;j=m.$Thumb||m.$Image||$Jssor$.$CreateDiv();g.$Wrapper=c=$Jssor$.$BuildElement(f,"thumbnailtemplate",j,true);l=$Jssor$.$Buttonize(c);a.$ActionMode&1&&$Jssor$.$AddEvent(c,"click",$Jssor$.$CreateCallback(null,i,0));a.$ActionMode&2&&$Jssor$.$AddEvent(c,"mouseover",$Jssor$.$MouseOverOutFilter($Jssor$.$CreateCallback(null,i,1),c))}e.$GetCurrentIndex=function(){return h};e.$SetCurrentIndex=function(c,d,e){var a=h;h=c;a!=-1&&n[a].$Highlight();n[c].$Highlight();!e&&k.$PlayTo(k.$GetVirtualIndex(Math.floor(d/b)))};e.$Show=function(a){$Jssor$.$ShowElement(d,a)};var q;e.$Reset=function(A,y){if(!q){r=A;Math.ceil(r/b);h=-1;g=Math.min(g,y.length);var e=a.$Orientation&1,v=m+(m+i)*(b-1)*(1-e),t=l+(l+j)*(b-1)*e,x=v+(v+i)*(g-1)*e,w=t+(t+j)*(g-1)*(1-e);$Jssor$.$CssPosition(c,"absolute");$Jssor$.$CssOverflow(c,"hidden");a.$AutoCenter&1&&$Jssor$.$CssLeft(c,(p-x)/2);a.$AutoCenter&2&&$Jssor$.$CssTop(c,(o-w)/2);$Jssor$.$CssWidth(c,x);$Jssor$.$CssHeight(c,w);var f=[];$Jssor$.$Each(y,function(o,g){var h=new s(o,g),d=h.$Wrapper,a=Math.floor(g/b),k=g%b;$Jssor$.$CssLeft(d,(m+i)*k*(1-e));$Jssor$.$CssTop(d,(l+j)*k*e);if(!f[a]){f[a]=$Jssor$.$CreateDiv();$Jssor$.$AppendChild(c,f[a])}$Jssor$.$AppendChild(f[a],d);n.push(h)});var z=$Jssor$.$Extend({$AutoPlay:false,$NaviQuitDrag:false,$SlideWidth:v,$SlideHeight:t,$SlideSpacing:i*e+j*(1-e),$MinDragOffsetToSlide:12,$SlideDuration:200,$PauseOnHover:1,$PlayOrientation:a.$Orientation,$DragOrientation:a.$NoDrag||a.$DisableDrag?0:a.$Orientation},a);k=new $JssorSlider$(d,z);q=true}};e.$Options=a=$Jssor$.$Extend({$SpacingX:0,$SpacingY:0,$Cols:1,$Orientation:1,$AutoCenter:3,$ActionMode:1},t);$JssorDebug$.$Execute(function(){a=$Jssor$.$Extend({$Rows:undefined,$Width:undefined,$Height:undefined},a)});p=$Jssor$.$CssWidth(d);o=$Jssor$.$CssHeight(d);$JssorDebug$.$Execute(function(){!p&&$JssorDebug$.$Fail("width of 'thumbnavigator' container not specified.");!o&&$JssorDebug$.$Fail("height of 'thumbnavigator' container not specified.")});c=$Jssor$.$FindChild(d,"slides",true);f=$Jssor$.$FindChild(c,"prototype");$JssorDebug$.$Execute(function(){!f&&$JssorDebug$.$Fail("prototype of 'thumbnavigator' not defined.")});m=$Jssor$.$CssWidth(f);l=$Jssor$.$CssHeight(f);$Jssor$.$RemoveElement(f,c);b=a.$Rows||1;i=a.$SpacingX;j=a.$SpacingY;g=a.$Cols;a.$Scale==false&&$Jssor$.$Attribute(d,"noscale",true)};function $JssorCaptionSliderBase$(d,c,b){var a=this;$JssorAnimator$.call(a,0,b);a.$Revert=$Jssor$.$EmptyFunction;a.$IdleBegin=0;a.$IdleEnd=b}var $JssorCaptionSlideo$=window.$JssorCaptionSlideo$=function(j,c,i){$JssorDebug$.$Execute(function(){if(!c.$Transitions)$JssorDebug$.$Error("'$CaptionSlideoOptions' option error, '$CaptionSlideoOptions.$Transitions' not specified.");else!$Jssor$.$IsArray(c.$Transitions)&&$JssorDebug$.$Error("'$CaptionSlideoOptions' option error, '$CaptionSlideoOptions.$Transitions' is not an array.")});var a=this,k,e={},f=c.$Transitions,b=new $JssorAnimator$(0,0);$JssorAnimator$.call(a,0,0);function g(c,b){var a={};$Jssor$.$Each(c,function(c,f){var d=e[f];if(d){if($Jssor$.$IsPlainObject(c))c=g(c,b||f=="e");else if(b)if($Jssor$.$IsNumeric(c))c=k[c];a[d]=c}});return a}function h(d,b){var a=[],c=$Jssor$.$Children(d);$Jssor$.$Each(c,function(c){var i=$Jssor$.$AttributeEx(c,"u")=="caption";if(i){var d=$Jssor$.$AttributeEx(c,"t"),g=f[$Jssor$.$ParseInt(d)]||f[d],e={$Elmt:c,$Transition:g};a.push(e)}if(b<5)a=a.concat(h(c,b+1))});return a}function n(c,d,a){$Jssor$.$Each(d,function(f){var d=$Jssor$.$Extend(true,{},g(f)),e=$Jssor$.$FormatEasings(d.$Easing);delete d.$Easing;if(d.$Left){d.$MoveX=d.$Left;e.$MoveX=e.$Left;delete d.$Left}if(d.$Top){d.$MoveY=d.$Top;e.$MoveY=e.$Top;delete d.$Top}var i={$Easing:e,$OriginalWidth:a.$Width,$OriginalHeight:a.$Height},h=new $JssorAnimator$(f.b,f.d,i,c,a,d);$JssorDebug$.$Execute(function(){h.$CaptionAnimator=true});b.$Combine(h);a=$Jssor$.$AddDif(a,d)});return a}function m(a){$Jssor$.$Each(a,function(a,f){$JssorDebug$.$Execute(function(){if(a.length){var g=$Jssor$.$CssTop(a.$Elmt),e=$Jssor$.$CssLeft(a.$Elmt),d=$Jssor$.$CssWidth(a.$Elmt),c=$Jssor$.$CssHeight(a.$Elmt),b=null;if(isNaN(g))b="style 'top' not specified";else if(isNaN(e))b="style 'left' not specified";else if(isNaN(d))b="style 'width' not specified";else if(isNaN(c))b="style 'height' not specified";if(b)throw new Error("Caption "+(f+1)+" definition error, "+b+".\r\n"+a.$Elmt.outerHTML);}});var b=a.$Elmt,e=$Jssor$.$CssWidth(b),d=$Jssor$.$CssHeight(b),c={$Left:$Jssor$.$CssLeft(b),$Top:$Jssor$.$CssTop(b),$MoveX:0,$MoveY:0,$Opacity:1,$ZIndex:$Jssor$.$CssZIndex(b)||0,$Rotate:0,$RotateX:0,$RotateY:0,$ScaleX:1,$ScaleY:1,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0,$Width:e,$Height:d,$Clip:{$Top:0,$Right:e,$Bottom:d,$Left:0}};c.$OriginalX=c.$Left;c.$OriginalY=c.$Top;n(b,a.$Transition,c)})}function p(f,e,g){var d=f.b-e;if(d){var c=new $JssorAnimator$(e,d);$JssorDebug$.$Execute(function(){c.$TrunckedAnimator=true});c.$Combine(b,true);c.$Shift(g);a.$Combine(c)}a.$Expand(f.d);return d}function o(e){var c=b.$GetPosition_OuterBegin(),d=0;$Jssor$.$Each(e,function(b,e){b=$Jssor$.$Extend({d:i},b);p(b,c,d);c=b.b;d+=b.d;if(!e||b.t==2){a.$IdleBegin=c;a.$IdleEnd=c+b.d}})}a.$Revert=function(){a.$GoToPosition(-1,true)};$JssorDebug$.$Execute(function(){a.$CaptionSlider=true;b.$InnerAnimator=true});k=[$Jease$.$Swing,$Jease$.$Linear,$Jease$.$InQuad,$Jease$.$OutQuad,$Jease$.$InOutQuad,$Jease$.$InCubic,$Jease$.$OutCubic,$Jease$.$InOutCubic,$Jease$.$InQuart,$Jease$.$OutQuart,$Jease$.$InOutQuart,$Jease$.$InQuint,$Jease$.$OutQuint,$Jease$.$InOutQuint,$Jease$.$InSine,$Jease$.$OutSine,$Jease$.$InOutSine,$Jease$.$InExpo,$Jease$.$OutExpo,$Jease$.$InOutExpo,$Jease$.$InCirc,$Jease$.$OutCirc,$Jease$.$InOutCirc,$Jease$.$InElastic,$Jease$.$OutElastic,$Jease$.$InOutElastic,$Jease$.$InBack,$Jease$.$OutBack,$Jease$.$InOutBack,$Jease$.$InBounce,$Jease$.$OutBounce,$Jease$.$InOutBounce,$Jease$.$GoBack,$Jease$.$InWave,$Jease$.$OutWave,$Jease$.$OutJump,$Jease$.$InJump];var q={$Top:"y",$Left:"x",$Bottom:"m",$Right:"t",$Rotate:"r",$RotateX:"rX",$RotateY:"rY",$ScaleX:"sX",$ScaleY:"sY",$TranslateX:"tX",$TranslateY:"tY",$TranslateZ:"tZ",$SkewX:"kX",$SkewY:"kY",$Opacity:"o",$Easing:"e",$ZIndex:"i",$Clip:"c"};$Jssor$.$Each(q,function(b,a){e[b]=a});m(h(j,1));b.$GoToPosition(-1);var l=c.$Breaks||[],d=[].concat(l[$Jssor$.$ParseInt($Jssor$.$AttributeEx(j,"b"))]||[]);d.push({b:b.$GetPosition_OuterEnd(),d:d.length?0:i});o(d);a.$GoToPosition(-1)}
;
(function(k,f,c,j,d,l,g){/*! Jssor */
new(function(){this.$DebugMode=d;this.$Log=function(c,d){var a=k.console||{},b=this.$DebugMode;if(b&&a.log)a.log(c);else b&&d&&alert(c)};this.$Error=function(b,d){var c=k.console||{},a=this.$DebugMode;if(a&&c.error)c.error(b);else a&&alert(b);if(a)throw d||new Error(b);};this.$Fail=function(a){throw new Error(a);};this.$Assert=function(b,c){var a=this.$DebugMode;if(a)if(!b)throw new Error("Assert failed "+c||"");};this.$Trace=function(c){var a=k.console||{},b=this.$DebugMode;b&&a.log&&a.log(c)};this.$Execute=function(b){var a=this.$DebugMode;a&&b()};this.$LiveStamp=function(c,d){var b=this.$DebugMode;if(b){var a=f.createElement("DIV");a.setAttribute("id",d);c.$Live=a}};this.$C_AbstractProperty=function(){throw new Error("The property is abstract, it should be implemented by subclass.");};this.$C_AbstractMethod=function(){throw new Error("The method is abstract, it should be implemented by subclass.");};function a(b){if(b.constructor===a.caller)throw new Error("Cannot create instance of an abstract class.");}this.$C_AbstractClass=a});var e=k.$JssorEasing$={$EaseSwing:function(a){return-c.cos(a*c.PI)/2+.5},$EaseLinear:function(a){return a},$EaseInQuad:function(a){return a*a},$EaseOutQuad:function(a){return-a*(a-2)},$EaseInOutQuad:function(a){return(a*=2)<1?1/2*a*a:-1/2*(--a*(a-2)-1)},$EaseInCubic:function(a){return a*a*a},$EaseOutCubic:function(a){return(a-=1)*a*a+1},$EaseInOutCubic:function(a){return(a*=2)<1?1/2*a*a*a:1/2*((a-=2)*a*a+2)},$EaseInQuart:function(a){return a*a*a*a},$EaseOutQuart:function(a){return-((a-=1)*a*a*a-1)},$EaseInOutQuart:function(a){return(a*=2)<1?1/2*a*a*a*a:-1/2*((a-=2)*a*a*a-2)},$EaseInQuint:function(a){return a*a*a*a*a},$EaseOutQuint:function(a){return(a-=1)*a*a*a*a+1},$EaseInOutQuint:function(a){return(a*=2)<1?1/2*a*a*a*a*a:1/2*((a-=2)*a*a*a*a+2)},$EaseInSine:function(a){return 1-c.cos(c.PI/2*a)},$EaseOutSine:function(a){return c.sin(c.PI/2*a)},$EaseInOutSine:function(a){return-1/2*(c.cos(c.PI*a)-1)},$EaseInExpo:function(a){return a==0?0:c.pow(2,10*(a-1))},$EaseOutExpo:function(a){return a==1?1:-c.pow(2,-10*a)+1},$EaseInOutExpo:function(a){return a==0||a==1?a:(a*=2)<1?1/2*c.pow(2,10*(a-1)):1/2*(-c.pow(2,-10*--a)+2)},$EaseInCirc:function(a){return-(c.sqrt(1-a*a)-1)},$EaseOutCirc:function(a){return c.sqrt(1-(a-=1)*a)},$EaseInOutCirc:function(a){return(a*=2)<1?-1/2*(c.sqrt(1-a*a)-1):1/2*(c.sqrt(1-(a-=2)*a)+1)},$EaseInElastic:function(a){if(!a||a==1)return a;var b=.3,d=.075;return-(c.pow(2,10*(a-=1))*c.sin((a-d)*2*c.PI/b))},$EaseOutElastic:function(a){if(!a||a==1)return a;var b=.3,d=.075;return c.pow(2,-10*a)*c.sin((a-d)*2*c.PI/b)+1},$EaseInOutElastic:function(a){if(!a||a==1)return a;var b=.45,d=.1125;return(a*=2)<1?-.5*c.pow(2,10*(a-=1))*c.sin((a-d)*2*c.PI/b):c.pow(2,-10*(a-=1))*c.sin((a-d)*2*c.PI/b)*.5+1},$EaseInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},$EaseOutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},$EaseInOutBack:function(a){var b=1.70158;return(a*=2)<1?1/2*a*a*(((b*=1.525)+1)*a-b):1/2*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},$EaseInBounce:function(a){return 1-e.$EaseOutBounce(1-a)},$EaseOutBounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},$EaseInOutBounce:function(a){return a<1/2?e.$EaseInBounce(a*2)*.5:e.$EaseOutBounce(a*2-1)*.5+.5},$EaseGoBack:function(a){return 1-c.abs(2-1)},$EaseInWave:function(a){return 1-c.cos(a*c.PI*2)},$EaseOutWave:function(a){return c.sin(a*c.PI*2)},$EaseOutJump:function(a){return 1-((a*=2)<1?(a=1-a)*a*a:(a-=1)*a*a)},$EaseInJump:function(a){return(a*=2)<1?a*a*a:(a=2-a)*a*a}},h=k.$Jease$={$Swing:e.$EaseSwing,$Linear:e.$EaseLinear,$InQuad:e.$EaseInQuad,$OutQuad:e.$EaseOutQuad,$InOutQuad:e.$EaseInOutQuad,$InCubic:e.$EaseInCubic,$OutCubic:e.$EaseOutCubic,$InOutCubic:e.$EaseInOutCubic,$InQuart:e.$EaseInQuart,$OutQuart:e.$EaseOutQuart,$InOutQuart:e.$EaseInOutQuart,$InQuint:e.$EaseInQuint,$OutQuint:e.$EaseOutQuint,$InOutQuint:e.$EaseInOutQuint,$InSine:e.$EaseInSine,$OutSine:e.$EaseOutSine,$InOutSine:e.$EaseInOutSine,$InExpo:e.$EaseInExpo,$OutExpo:e.$EaseOutExpo,$InOutExpo:e.$EaseInOutExpo,$InCirc:e.$EaseInCirc,$OutCirc:e.$EaseOutCirc,$InOutCirc:e.$EaseInOutCirc,$InElastic:e.$EaseInElastic,$OutElastic:e.$EaseOutElastic,$InOutElastic:e.$EaseInOutElastic,$InBack:e.$EaseInBack,$OutBack:e.$EaseOutBack,$InOutBack:e.$EaseInOutBack,$InBounce:e.$EaseInBounce,$OutBounce:e.$EaseOutBounce,$InOutBounce:e.$EaseInOutBounce,$GoBack:e.$EaseGoBack,$InWave:e.$EaseInWave,$OutWave:e.$EaseOutWave,$OutJump:e.$EaseOutJump,$InJump:e.$EaseInJump};k.$JssorDirection$={$TO_LEFT:1,$TO_RIGHT:2,$TO_TOP:4,$TO_BOTTOM:8,$HORIZONTAL:3,$VERTICAL:12,$GetDirectionHorizontal:function(a){return a&3},$GetDirectionVertical:function(a){return a&12},$IsHorizontal:function(a){return a&3},$IsVertical:function(a){return a&12}};var b=k.$Jssor$=new function(){var h=this,Ab=/\S+/g,K=1,ib=2,mb=3,lb=4,qb=5,L,s=0,i=0,t=0,z=0,A=0,D=navigator,vb=D.appName,o=D.userAgent,y=f.documentElement,q=parseFloat;function Ib(){if(!L){L={$Touchable:"ontouchstart"in k||"createTouch"in f};var a;if(D.pointerEnabled||(a=D.msPointerEnabled))L.$TouchActionAttr=a?"msTouchAction":"touchAction"}return L}function v(h){if(!s){s=-1;if(vb=="Microsoft Internet Explorer"&&!!k.attachEvent&&!!k.ActiveXObject){var e=o.indexOf("MSIE");s=K;t=q(o.substring(e+5,o.indexOf(";",e)));/*@cc_on z=@_jscript_version@*/;i=f.documentMode||t}else if(vb=="Netscape"&&!!k.addEventListener){var d=o.indexOf("Firefox"),b=o.indexOf("Safari"),g=o.indexOf("Chrome"),c=o.indexOf("AppleWebKit");if(d>=0){s=ib;i=q(o.substring(d+8))}else if(b>=0){var j=o.substring(0,b).lastIndexOf("/");s=g>=0?lb:mb;i=q(o.substring(j+1,b))}else{var a=/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(o);if(a){s=K;i=t=q(a[1])}}if(c>=0)A=q(o.substring(c+12))}else{var a=/(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(o);if(a){s=qb;i=q(a[2])}}}return h==s}function r(){return v(K)}function S(){return r()&&(i<6||f.compatMode=="BackCompat")}function Bb(){return v(ib)}function kb(){return v(mb)}function Eb(){return v(lb)}function pb(){return v(qb)}function fb(){return kb()&&A>534&&A<535}function H(){v();return A>537||i>42||s==K&&i>=11}function Q(){return r()&&i<9}function gb(a){var b,c;return function(f){if(!b){b=d;var e=a.substr(0,1).toUpperCase()+a.substr(1);n([a].concat(["WebKit","ms","Moz","O","webkit"]),function(h,d){var b=a;if(d)b=h+e;if(f.style[b]!=g)return c=b})}return c}}function eb(b){var a;return function(c){a=a||gb(b)(c)||b;return a}}var M=eb("transform");function ub(a){return{}.toString.call(a)}var rb={};n(["Boolean","Number","String","Function","Array","Date","RegExp","Object"],function(a){rb["[object "+a+"]"]=a.toLowerCase()});function n(b,d){var a,c;if(ub(b)=="[object Array]"){for(a=0;a<b.length;a++)if(c=d(b[a],a,b))return c}else for(a in b)if(c=d(b[a],a,b))return c}function F(a){return a==j?String(a):rb[ub(a)]||"object"}function sb(a){for(var b in a)return d}function B(a){try{return F(a)=="object"&&!a.nodeType&&a!=a.window&&(!a.constructor||{}.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))}catch(b){}}function p(a,b){return{x:a,y:b}}function yb(b,a){setTimeout(b,a||0)}function C(b,d,c){var a=!b||b=="inherit"?"":b;n(d,function(c){var b=c.exec(a);if(b){var d=a.substr(0,b.index),e=a.substr(b.index+b[0].length+1,a.length-1);a=d+e}});a=c+(!a.indexOf(" ")?"":" ")+a;return a}function T(b,a){if(i<9)b.style.filter=a}h.$Device=Ib;h.$IsBrowserIE=r;h.$IsBrowserIeQuirks=S;h.$IsBrowserFireFox=Bb;h.$IsBrowserSafari=kb;h.$IsBrowserChrome=Eb;h.$IsBrowserOpera=pb;h.$IsBrowserBadTransform=fb;h.$IsBrowser3dSafe=H;h.$IsBrowserIe9Earlier=Q;h.$GetTransformProperty=gb("transform");h.$BrowserVersion=function(){return i};h.$BrowserEngineVersion=function(){return t||i};h.$WebKitVersion=function(){v();return A};h.$Delay=yb;h.$Inherit=function(a,b){b.call(a);return E({},a)};function ab(a){a.constructor===ab.caller&&a.$Construct&&a.$Construct.apply(a,ab.caller.arguments)}h.$Construct=ab;h.$GetElement=function(a){if(h.$IsString(a))a=f.getElementById(a);return a};function u(a){return a||k.event}h.$GetEvent=u;h.$EvtSrc=function(b){b=u(b);var a=b.target||b.srcElement||f;if(a.nodeType==3)a=h.$ParentNode(a);return a};h.$EvtTarget=function(a){a=u(a);return a.relatedTarget||a.toElement};h.$EvtWhich=function(a){a=u(a);return a.which||([0,1,3,0,2])[a.button]||a.charCode||a.keyCode};h.$MousePosition=function(a){a=u(a);return{x:a.pageX||a.clientX||0,y:a.pageY||a.clientY||0}};h.$PageScroll=function(){var a=f.body;return{x:(k.pageXOffset||y.scrollLeft||a.scrollLeft||0)-(y.clientLeft||a.clientLeft||0),y:(k.pageYOffset||y.scrollTop||a.scrollTop||0)-(y.clientTop||a.clientTop||0)}};h.$WindowSize=function(){var a=f.body;return{x:a.clientWidth||y.clientWidth,y:a.clientHeight||y.clientHeight}};function G(c,d,a){if(a!==g)c.style[d]=a==g?"":a;else{var b=c.currentStyle||c.style;a=b[d];if(a==""&&k.getComputedStyle){b=c.ownerDocument.defaultView.getComputedStyle(c,j);b&&(a=b.getPropertyValue(d)||b[d])}return a}}function cb(b,c,a,d){if(a!==g){if(a==j)a="";else d&&(a+="px");G(b,c,a)}else return q(G(b,c))}function Jb(b,c,a){return cb(b,c,a,d)}function m(c,a){var d=a?cb:G,b;if(a&4)b=eb(c);return function(e,f){return d(e,b?b(e):c,f,a&2)}}function Db(b){if(r()&&t<9){var a=/opacity=([^)]*)/.exec(b.style.filter||"");return a?q(a[1])/100:1}else return q(b.style.opacity||"1")}function Fb(b,a,f){if(r()&&t<9){var h=b.style.filter||"",i=new RegExp(/[\s]*alpha\([^\)]*\)/g),e=c.round(100*a),d="";if(e<100||f)d="alpha(opacity="+e+") ";var g=C(h,[i],d);T(b,g)}else b.style.opacity=a==1?"":c.round(a*100)/100}var N={$Rotate:["rotate"],$RotateX:["rotateX"],$RotateY:["rotateY"],$SkewX:["skewX"],$SkewY:["skewY"]};if(!H())N=E(N,{$ScaleX:["scaleX",2],$ScaleY:["scaleY",2],$TranslateZ:["translateZ",1]});function O(d,a){var c="";if(a){if(r()&&i&&i<10){delete a.$RotateX;delete a.$RotateY;delete a.$TranslateZ}b.$Each(a,function(d,b){var a=N[b];if(a){var e=a[1]||0;if(P[b]!=d)c+=" "+a[0]+"("+d+(["deg","px",""])[e]+")"}});if(H()){if(a.$TranslateX||a.$TranslateY||a.$TranslateZ)c+=" translate3d("+(a.$TranslateX||0)+"px,"+(a.$TranslateY||0)+"px,"+(a.$TranslateZ||0)+"px)";if(a.$ScaleX==g)a.$ScaleX=1;if(a.$ScaleY==g)a.$ScaleY=1;if(a.$ScaleX!=1||a.$ScaleY!=1)c+=" scale3d("+a.$ScaleX+", "+a.$ScaleY+", 1)"}}d.style[M(d)]=c}h.$CssTransformOrigin=m("transformOrigin",4);h.$CssBackfaceVisibility=m("backfaceVisibility",4);h.$CssTransformStyle=m("transformStyle",4);h.$CssPerspective=m("perspective",6);h.$CssPerspectiveOrigin=m("perspectiveOrigin",4);h.$CssScale=function(a,b){if(r()&&t<9||t<10&&S())a.style.zoom=b==1?"":b;else{var c=M(a),f="scale("+b+")",e=a.style[c],g=new RegExp(/[\s]*scale\(.*?\)/g),d=C(e,[g],f);a.style[c]=d}};var ob=0,jb=0;h.$WindowResizeFilter=function(b,a){return Q()?function(){var g=d,c=S()?b.document.body:b.document.documentElement;if(c){var f=c.offsetWidth-ob,e=c.offsetHeight-jb;if(f||e){ob+=f;jb+=e}else g=l}g&&a()}:a};h.$MouseOverOutFilter=function(b,a){return function(c){c=u(c);var e=c.type,d=c.relatedTarget||(e=="mouseout"?c.toElement:c.fromElement);(!d||d!==a&&!h.$IsChild(a,d))&&b(c)}};h.$AddEvent=function(a,c,d,b){a=h.$GetElement(a);if(a.addEventListener){c=="mousewheel"&&a.addEventListener("DOMMouseScroll",d,b);a.addEventListener(c,d,b)}else if(a.attachEvent){a.attachEvent("on"+c,d);b&&a.setCapture&&a.setCapture()}};h.$RemoveEvent=function(a,c,d,b){a=h.$GetElement(a);if(a.removeEventListener){c=="mousewheel"&&a.removeEventListener("DOMMouseScroll",d,b);a.removeEventListener(c,d,b)}else if(a.detachEvent){a.detachEvent("on"+c,d);b&&a.releaseCapture&&a.releaseCapture()}};h.$FireEvent=function(c,b){var a;if(f.createEvent){a=f.createEvent("HTMLEvents");a.initEvent(b,l,l);c.dispatchEvent(a)}else{var d="on"+b;a=f.createEventObject();c.fireEvent(d,a)}};h.$CancelEvent=function(a){a=u(a);a.preventDefault&&a.preventDefault();a.cancel=d;a.returnValue=l};h.$StopEvent=function(a){a=u(a);a.stopPropagation&&a.stopPropagation();a.cancelBubble=d};h.$CreateCallback=function(d,c){var a=[].slice.call(arguments,2),b=function(){var b=a.concat([].slice.call(arguments,0));return c.apply(d,b)};return b};h.$InnerText=function(a,b){if(b==g)return a.textContent||a.innerText;var c=f.createTextNode(b);h.$Empty(a);a.appendChild(c)};h.$InnerHtml=function(a,b){if(b==g)return a.innerHTML;a.innerHTML=b};h.$GetClientRect=function(b){var a=b.getBoundingClientRect();return{x:a.left,y:a.top,w:a.right-a.left,h:a.bottom-a.top}};h.$ClearInnerHtml=function(a){a.innerHTML=""};h.$EncodeHtml=function(b){var a=h.$CreateDiv();h.$InnerText(a,b);return h.$InnerHtml(a)};h.$DecodeHtml=function(b){var a=h.$CreateDiv();h.$InnerHtml(a,b);return h.$InnerText(a)};h.$SelectElement=function(c){var b;if(k.getSelection)b=k.getSelection();var a=j;if(f.createRange){a=f.createRange();a.selectNode(c)}else{a=f.body.createTextRange();a.moveToElementText(c);a.select()}b&&b.addRange(a)};h.$DeselectElements=function(){if(f.selection)f.selection.empty();else k.getSelection&&k.getSelection().removeAllRanges()};h.$Children=function(d,c){for(var b=[],a=d.firstChild;a;a=a.nextSibling)(c||a.nodeType==1)&&b.push(a);return b};function tb(a,c,e,b){b=b||"u";for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){if(X(a,b)==c)return a;if(!e){var d=tb(a,c,e,b);if(d)return d}}}h.$FindChild=tb;function V(a,d,f,b){b=b||"u";var c=[];for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){X(a,b)==d&&c.push(a);if(!f){var e=V(a,d,f,b);if(e.length)c=c.concat(e)}}return c}function nb(a,c,d){for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){if(a.tagName==c)return a;if(!d){var b=nb(a,c,d);if(b)return b}}}h.$FindChildByTag=nb;function hb(a,c,e){var b=[];for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){(!c||a.tagName==c)&&b.push(a);if(!e){var d=hb(a,c,e);if(d.length)b=b.concat(d)}}return b}h.$FindChildrenByTag=hb;h.$GetElementsByTag=function(b,a){return b.getElementsByTagName(a)};function E(){var e=arguments,d,c,b,a,h=1&e[0],f=1+h;d=e[f-1]||{};for(;f<e.length;f++)if(c=e[f])for(b in c){a=c[b];if(a!==g){a=c[b];var i=d[b];d[b]=h&&(B(i)||B(a))?E(h,{},i,a):a}}return d}h.$Extend=E;function bb(f,g){var d={},c,a,b;for(c in f){a=f[c];b=g[c];if(a!==b){var e;if(B(a)&&B(b)){a=bb(a,b);e=!sb(a)}!e&&(d[c]=a)}}return d}h.$Unextend=bb;h.$IsFunction=function(a){return F(a)=="function"};h.$IsArray=function(a){return F(a)=="array"};h.$IsString=function(a){return F(a)=="string"};h.$IsNumeric=function(a){return!isNaN(q(a))&&isFinite(a)};h.$Type=F;h.$Each=n;h.$IsNotEmpty=sb;h.$IsPlainObject=B;function U(a){return f.createElement(a)}h.$CreateElement=U;h.$CreateDiv=function(){return U("DIV")};h.$CreateSpan=function(){return U("SPAN")};h.$EmptyFunction=function(){};function Y(b,c,a){if(a==g)return b.getAttribute(c);b.setAttribute(c,a)}function X(a,b){return Y(a,b)||Y(a,"data-"+b)}h.$Attribute=Y;h.$AttributeEx=X;function x(b,a){if(a==g)return b.className;b.className=a}h.$ClassName=x;function xb(b){var a={};n(b,function(b){a[b]=b});return a}function Hb(b){var a=[];n(b,function(b){a.push(b)});return a}function zb(b,a){return b.match(a||Ab)}function R(b,a){return xb(zb(b||"",a))}h.$ToHash=xb;h.$FromHash=Hb;h.$Split=zb;function db(b,c){var a="";n(c,function(c){a&&(a+=b);a+=c});return a}function J(a,c,b){x(a,db(" ",E(bb(R(x(a)),R(c)),R(b))))}h.$Join=db;h.$AddClass=function(b,a){J(b,j,a)};h.$RemoveClass=J;h.$ReplaceClass=J;h.$ParentNode=function(a){return a.parentNode};h.$HideElement=function(a){h.$CssDisplay(a,"none")};h.$EnableElement=function(a,b){if(b)h.$Attribute(a,"disabled",d);else h.$RemoveAttribute(a,"disabled")};h.$HideElements=function(b){for(var a=0;a<b.length;a++)h.$HideElement(b[a])};h.$ShowElement=function(a,b){h.$CssDisplay(a,b?"none":"")};h.$ShowElements=function(b,c){for(var a=0;a<b.length;a++)h.$ShowElement(b[a],c)};h.$RemoveAttribute=function(b,a){b.removeAttribute(a)};h.$CanClearClip=function(){return r()&&i<10};h.$SetStyleClip=function(d,a){if(a)d.style.clip="rect("+c.round(a.$Top||a.$MoveY||0)+"px "+c.round(a.$Right)+"px "+c.round(a.$Bottom)+"px "+c.round(a.$Left||a.$MoveX||0)+"px)";else if(a!==g){var h=d.style.cssText,f=[new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),new RegExp(/[\s]*cliptop: .*?[;]?/i),new RegExp(/[\s]*clipright: .*?[;]?/i),new RegExp(/[\s]*clipbottom: .*?[;]?/i),new RegExp(/[\s]*clipleft: .*?[;]?/i)],e=C(h,f,"");b.$CssCssText(d,e)}};h.$GetNow=function(){return+new Date};h.$AppendChild=function(b,a){b.appendChild(a)};h.$AppendChildren=function(b,a){n(a,function(a){h.$AppendChild(b,a)})};h.$InsertBefore=function(b,a,c){(c||a.parentNode).insertBefore(b,a)};h.$InsertAfter=function(b,a,c){h.$InsertBefore(b,a.nextSibling,c||a.parentNode)};h.$InsertAdjacentHtml=function(b,a,c){b.insertAdjacentHTML(a,c)};h.$RemoveElement=function(b,a){a=a||b.parentNode;a&&a.removeChild(b)};h.$RemoveElements=function(a,b){n(a,function(a){h.$RemoveElement(a,b)})};h.$Empty=function(a){h.$RemoveElements(h.$Children(a,d),a)};h.$CenterElement=function(a,b){var c=h.$ParentNode(a);b&1&&h.$CssLeft(a,(h.$CssWidth(c)-h.$CssWidth(a))/2);b&2&&h.$CssTop(a,(h.$CssHeight(c)-h.$CssHeight(a))/2)};h.$ParseInt=function(b,a){return parseInt(b,a||10)};h.$ParseFloat=q;h.$IsChild=function(b,a){var c=f.body;while(a&&b!==a&&c!==a)try{a=a.parentNode}catch(d){return l}return b===a};function Z(d,c,b){var a=d.cloneNode(!c);!b&&h.$RemoveAttribute(a,"id");return a}h.$CloneNode=Z;h.$LoadImage=function(e,f){var a=new Image;function b(e,d){h.$RemoveEvent(a,"load",b);h.$RemoveEvent(a,"abort",c);h.$RemoveEvent(a,"error",c);f&&f(a,d)}function c(a){b(a,d)}if(pb()&&i<11.6||!e)b(!e);else{h.$AddEvent(a,"load",b);h.$AddEvent(a,"abort",c);h.$AddEvent(a,"error",c);a.src=e}};h.$LoadImages=function(d,a,e){var c=d.length+1;function b(b){c--;if(a&&b&&b.src==a.src)a=b;!c&&e&&e(a)}n(d,function(a){h.$LoadImage(a.src,b)});b()};h.$BuildElement=function(a,g,i,h){if(h)a=Z(a);var c=V(a,g);if(!c.length)c=b.$GetElementsByTag(a,g);for(var f=c.length-1;f>-1;f--){var d=c[f],e=Z(i);x(e,x(d));b.$CssCssText(e,d.style.cssText);b.$InsertBefore(e,d);b.$RemoveElement(d)}return a};function Gb(a){var l=this,p="",r=["av","pv","ds","dn"],e=[],q,k=0,i=0,d=0;function j(){J(a,q,e[d||k||i&2||i]);b.$Css(a,"pointer-events",d?"none":"")}function c(){k=0;j();h.$RemoveEvent(f,"mouseup",c);h.$RemoveEvent(f,"touchend",c);h.$RemoveEvent(f,"touchcancel",c)}function o(a){if(d)h.$CancelEvent(a);else{k=4;j();h.$AddEvent(f,"mouseup",c);h.$AddEvent(f,"touchend",c);h.$AddEvent(f,"touchcancel",c)}}l.$Selected=function(a){if(a===g)return i;i=a&2||a&1;j()};l.$Enable=function(a){if(a===g)return!d;d=a?0:3;j()};l.$Elmt=a=h.$GetElement(a);var m=b.$Split(x(a));if(m)p=m.shift();n(r,function(a){e.push(p+a)});q=db(" ",e);e.unshift("");h.$AddEvent(a,"mousedown",o);h.$AddEvent(a,"touchstart",o)}h.$Buttonize=function(a){return new Gb(a)};h.$Css=G;h.$CssN=cb;h.$CssP=Jb;h.$CssOverflow=m("overflow");h.$CssTop=m("top",2);h.$CssLeft=m("left",2);h.$CssWidth=m("width",2);h.$CssHeight=m("height",2);h.$CssMarginLeft=m("marginLeft",2);h.$CssMarginTop=m("marginTop",2);h.$CssPosition=m("position");h.$CssDisplay=m("display");h.$CssZIndex=m("zIndex",1);h.$CssFloat=function(b,a){return G(b,r()?"styleFloat":"cssFloat",a)};h.$CssOpacity=function(b,a,c){if(a!=g)Fb(b,a,c);else return Db(b)};h.$CssCssText=function(a,b){if(b!=g)a.style.cssText=b;else return a.style.cssText};var W={$Opacity:h.$CssOpacity,$Top:h.$CssTop,$Left:h.$CssLeft,$Width:h.$CssWidth,$Height:h.$CssHeight,$Position:h.$CssPosition,$Display:h.$CssDisplay,$ZIndex:h.$CssZIndex};h.$GetStyles=function(c,b){var a={};n(b,function(d,b){if(W[b])a[b]=W[b](c)});return a};function w(f,l){var e=Q(),b=H(),d=fb(),i=M(f);function k(b,d,a){var e=b.$TransformPoint(p(-d/2,-a/2)),f=b.$TransformPoint(p(d/2,-a/2)),g=b.$TransformPoint(p(d/2,a/2)),h=b.$TransformPoint(p(-d/2,a/2));b.$TransformPoint(p(300,300));return p(c.min(e.x,f.x,g.x,h.x)+d/2,c.min(e.y,f.y,g.y,h.y)+a/2)}function a(d,a){a=a||{};var f=a.$TranslateZ||0,l=(a.$RotateX||0)%360,m=(a.$RotateY||0)%360,o=(a.$Rotate||0)%360,p=a.$ScaleZ;if(e){f=0;l=0;m=0;p=0}var c=new Cb(a.$TranslateX,a.$TranslateY,f);c.$RotateX(l);c.$RotateY(m);c.$RotateZ(o);c.$Skew(a.$SkewX,a.$SkewY);c.$Scale(a.$ScaleX,a.$ScaleY,p);if(b){c.$Move(a.$MoveX,a.$MoveY);d.style[i]=c.$Format3d()}else if(!z||z<9){var j="";if(o||a.$ScaleX!=g&&a.$ScaleX!=1||a.$ScaleY!=g&&a.$ScaleY!=1){var n=k(c,a.$OriginalWidth,a.$OriginalHeight);h.$CssMarginTop(d,n.y);h.$CssMarginLeft(d,n.x);j=c.$Format2d()}var r=d.style.filter,s=new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),q=C(r,[s],j);T(d,q)}}w=function(e,c){c=c||{};var i=c.$MoveX,k=c.$MoveY,f;n(W,function(a,b){f=c[b];f!==g&&a(e,f)});h.$SetStyleClip(e,c.$Clip);if(!b){i!=g&&h.$CssLeft(e,(c.$OriginalX||0)+i);k!=g&&h.$CssTop(e,(c.$OriginalY||0)+k)}if(c.$Transform)if(d)yb(h.$CreateCallback(j,O,e,c));else a(e,c)};h.$SetStyleTransform=O;if(d)h.$SetStyleTransform=w;if(e)h.$SetStyleTransform=a;else if(!b)a=O;h.$SetStyles=w;w(f,l)}h.$SetStyleTransform=w;h.$SetStyles=w;function Cb(k,l,p){var d=this,b=[1,0,0,0,0,1,0,0,0,0,1,0,k||0,l||0,p||0,1],i=c.sin,h=c.cos,m=c.tan;function f(a){return a*c.PI/180}function o(a,b){return{x:a,y:b}}function n(b,c,f,g,i,l,n,o,q,t,u,w,y,A,C,F,a,d,e,h,j,k,m,p,r,s,v,x,z,B,D,E){return[b*a+c*j+f*r+g*z,b*d+c*k+f*s+g*B,b*e+c*m+f*v+g*D,b*h+c*p+f*x+g*E,i*a+l*j+n*r+o*z,i*d+l*k+n*s+o*B,i*e+l*m+n*v+o*D,i*h+l*p+n*x+o*E,q*a+t*j+u*r+w*z,q*d+t*k+u*s+w*B,q*e+t*m+u*v+w*D,q*h+t*p+u*x+w*E,y*a+A*j+C*r+F*z,y*d+A*k+C*s+F*B,y*e+A*m+C*v+F*D,y*h+A*p+C*x+F*E]}function e(c,a){return n.apply(j,(a||b).concat(c))}d.$Matrix=function(){return b};d.$Scale=function(a,c,d){if(a==g)a=1;if(c==g)c=1;if(d==g)d=1;if(a!=1||c!=1||d!=1)b=e([a,0,0,0,0,c,0,0,0,0,d,0,0,0,0,1])};d.$Translate=function(a,c,d){if(a||c||d)b=e([1,0,0,0,0,1,0,0,0,0,1,0,a||0,c||0,d||0,1])};d.$Move=function(a,c,d){b[12]+=a||0;b[13]+=c||0;b[14]+=d||0};d.$RotateX=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([1,0,0,0,0,d,g,0,0,-g,d,0,0,0,0,1])}};d.$RotateY=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([d,0,-g,0,0,1,0,0,g,0,d,0,0,0,0,1])}};d.$RotateZ=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([d,g,0,0,-g,d,0,0,0,0,1,0,0,0,0,1])}};d.$Skew=function(a,c){if(a||c){k=f(a);l=f(c);b=e([1,m(l),0,0,m(k),1,0,0,0,0,1,0,0,0,0,1])}};d.$TransformPoint=function(c){var a=e(b,[1,0,0,0,0,1,0,0,0,0,1,0,c.x,c.y,0,1]);return o(a[12],a[13])};d.$Format3d=function(){return"matrix3d("+b.join(",")+")"};d.$Format2d=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+b[0]+", M12="+b[4]+", M21="+b[1]+", M22="+b[5]+", SizingMethod='auto expand')"}}new(function(){var a=this;function b(d,g){for(var j=d[0].length,i=d.length,h=g[0].length,f=[],c=0;c<i;c++)for(var k=f[c]=[],b=0;b<h;b++){for(var e=0,a=0;a<j;a++)e+=d[c][a]*g[a][b];k[b]=e}return f}a.$ScaleX=function(b,c){return a.$ScaleXY(b,c,0)};a.$ScaleY=function(b,c){return a.$ScaleXY(b,0,c)};a.$ScaleXY=function(a,c,d){return b(a,[[c,0],[0,d]])};a.$TransformPoint=function(d,c){var a=b(d,[[c.x],[c.y]]);return p(a[0][0],a[1][0])}});var P={$OriginalX:0,$OriginalY:0,$MoveX:0,$MoveY:0,$Zoom:1,$ScaleX:1,$ScaleY:1,$Rotate:0,$RotateX:0,$RotateY:0,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0};h.$FormatEasings=function(a){var c=a||{};if(a)if(b.$IsFunction(a))c={$Default:c};else if(b.$IsFunction(a.$Clip))c.$Clip={$Default:a.$Clip};return c};function wb(c,a){var b={};n(c,function(c,d){var e=c;if(a[d]!=g)if(h.$IsNumeric(c))e=c+a[d];else e=wb(c,a[d]);b[d]=e});return b}h.$AddDif=wb;h.$Cast=function(l,m,x,q,z,A,n){var a=m;if(l){a={};for(var h in m){var B=A[h]||1,w=z[h]||[0,1],f=(x-w[0])/w[1];f=c.min(c.max(f,0),1);f=f*B;var u=c.floor(f);if(f!=u)f-=u;var i=q.$Default||e.$EaseSwing,k,C=l[h],p=m[h];if(b.$IsNumeric(p)){i=q[h]||i;var y=i(f);k=C+p*y}else{k=b.$Extend({$Offset:{}},l[h]);var v=q[h]||{};b.$Each(p.$Offset||p,function(d,a){i=v[a]||v.$Default||i;var c=i(f),b=d*c;k.$Offset[a]=b;k[a]+=b})}a[h]=k}var t=b.$Each(m,function(b,a){return P[a]!=g});t&&b.$Each(P,function(c,b){if(a[b]==g&&l[b]!==g)a[b]=l[b]});if(t){if(a.$Zoom)a.$ScaleX=a.$ScaleY=a.$Zoom;a.$OriginalWidth=n.$OriginalWidth;a.$OriginalHeight=n.$OriginalHeight;a.$Transform=d}}if(m.$Clip&&n.$Move){var o=a.$Clip.$Offset,s=(o.$Top||0)+(o.$Bottom||0),r=(o.$Left||0)+(o.$Right||0);a.$Left=(a.$Left||0)+r;a.$Top=(a.$Top||0)+s;a.$Clip.$Left-=r;a.$Clip.$Right-=r;a.$Clip.$Top-=s;a.$Clip.$Bottom-=s}if(a.$Clip&&b.$CanClearClip()&&!a.$Clip.$Top&&!a.$Clip.$Left&&!a.$Clip.$MoveY&&!a.$Clip.$MoveX&&a.$Clip.$Right==n.$OriginalWidth&&a.$Clip.$Bottom==n.$OriginalHeight)a.$Clip=j;return a}};function n(){var a=this,d=[],c=[];function h(a,b){d.push({$EventName:a,$Handler:b})}function g(a,c){b.$Each(d,function(b,e){b.$EventName==a&&b.$Handler===c&&d.splice(e,1)})}function f(){d=[]}function e(){b.$Each(c,function(a){b.$RemoveEvent(a.$Obj,a.$EventName,a.$Handler)});c=[]}a.$Listen=function(e,a,d,f){b.$AddEvent(e,a,d,f);c.push({$Obj:e,$EventName:a,$Handler:d})};a.$Unlisten=function(e,a,d){b.$Each(c,function(f,g){if(f.$Obj===e&&f.$EventName==a&&f.$Handler===d){b.$RemoveEvent(e,a,d);c.splice(g,1)}})};a.$UnlistenAll=e;a.$On=a.addEventListener=h;a.$Off=a.removeEventListener=g;a.$TriggerEvent=function(a){var c=[].slice.call(arguments,1);b.$Each(d,function(b){b.$EventName==a&&b.$Handler.apply(k,c)})};a.$Destroy=function(){e();f();for(var b in a)delete a[b]}}var m=k.$JssorAnimator$=function(z,C,h,L,O,J){z=z||0;var a=this,q,N,n,o,v,A=0,H,I,G,B,y=0,g=0,m=0,D,i,s,f,e,p,w=[],x;function P(a){f+=a;e+=a;i+=a;s+=a;g+=a;m+=a;y+=a}function u(o){var j=o;if(p&&(j>=e||j<=f))j=((j-f)%p+p)%p+f;if(!D||v||g!=j){var k=c.min(j,e);k=c.max(k,f);if(!D||v||k!=m){if(J){var l=(k-i)/(C||1);if(h.$Reverse)l=1-l;var n=b.$Cast(O,J,l,H,G,I,h);if(x)b.$Each(n,function(b,a){x[a]&&x[a](L,b)});else b.$SetStyles(L,n)}a.$OnInnerOffsetChange(m-i,k-i);m=k;b.$Each(w,function(b,c){var a=o<g?w[w.length-c-1]:b;a.$GoToPosition(m-y)});var r=g,q=m;g=j;D=d;a.$OnPositionChange(r,q)}}}function E(a,b,d){b&&a.$Shift(e);if(!d){f=c.min(f,a.$GetPosition_OuterBegin()+y);e=c.max(e,a.$GetPosition_OuterEnd()+y)}w.push(a)}var r=k.requestAnimationFrame||k.webkitRequestAnimationFrame||k.mozRequestAnimationFrame||k.msRequestAnimationFrame;if(b.$IsBrowserSafari()&&b.$BrowserVersion()<7)r=j;r=r||function(a){b.$Delay(a,h.$Interval)};function K(){if(q){var d=b.$GetNow(),e=c.min(d-A,h.$IntervalMax),a=g+e*o;A=d;if(a*o>=n*o)a=n;u(a);if(!v&&a*o>=n*o)M(B);else r(K)}}function t(h,i,j){if(!q){q=d;v=j;B=i;h=c.max(h,f);h=c.min(h,e);n=h;o=n<g?-1:1;a.$OnStart();A=b.$GetNow();r(K)}}function M(b){if(q){v=q=B=l;a.$OnStop();b&&b()}}a.$Play=function(a,b,c){t(a?g+a:e,b,c)};a.$PlayToPosition=t;a.$PlayToBegin=function(a,b){t(f,a,b)};a.$PlayToEnd=function(a,b){t(e,a,b)};a.$Stop=M;a.$Continue=function(a){t(a)};a.$GetPosition=function(){return g};a.$GetPlayToPosition=function(){return n};a.$GetPosition_Display=function(){return m};a.$GoToPosition=u;a.$GoToBegin=function(){u(f,d)};a.$GoToEnd=function(){u(e,d)};a.$Move=function(a){u(g+a)};a.$CombineMode=function(){return N};a.$GetDuration=function(){return C};a.$IsPlaying=function(){return q};a.$IsOnTheWay=function(){return g>i&&g<=s};a.$SetLoopLength=function(a){p=a};a.$Shift=P;a.$Join=E;a.$Combine=function(a,b){E(a,0,b)};a.$Chain=function(a){E(a,1)};a.$Expand=function(a){e+=a};a.$GetPosition_InnerBegin=function(){return i};a.$GetPosition_InnerEnd=function(){return s};a.$GetPosition_OuterBegin=function(){return f};a.$GetPosition_OuterEnd=function(){return e};a.$OnPositionChange=a.$OnStart=a.$OnStop=a.$OnInnerOffsetChange=b.$EmptyFunction;a.$Version=b.$GetNow();h=b.$Extend({$Interval:16,$IntervalMax:50},h);p=h.$LoopLength;x=h.$Setter;f=i=z;e=s=z+C;I=h.$Round||{};G=h.$During||{};H=b.$FormatEasings(h.$Easing)};var p=k.$JssorSlideshowFormations$=new function(){var h=this,b=0,a=1,f=2,e=3,s=1,r=2,t=4,q=8,w=256,x=512,v=1024,u=2048,j=u+s,i=u+r,o=x+s,m=x+r,n=w+t,k=w+q,l=v+t,p=v+q;function y(a){return(a&r)==r}function z(a){return(a&t)==t}function g(b,a,c){c.push(a);b[a]=b[a]||[];b[a].push(c)}h.$FormationStraight=function(f){for(var d=f.$Cols,e=f.$Rows,s=f.$Assembly,t=f.$Count,r=[],a=0,b=0,p=d-1,q=e-1,h=t-1,c,b=0;b<e;b++)for(a=0;a<d;a++){switch(s){case j:c=h-(a*e+(q-b));break;case l:c=h-(b*d+(p-a));break;case o:c=h-(a*e+b);case n:c=h-(b*d+a);break;case i:c=a*e+b;break;case k:c=b*d+(p-a);break;case m:c=a*e+(q-b);break;default:c=b*d+a}g(r,c,[b,a])}return r};h.$FormationSwirl=function(q){var x=q.$Cols,y=q.$Rows,B=q.$Assembly,w=q.$Count,A=[],z=[],u=0,c=0,h=0,r=x-1,s=y-1,t,p,v=0;switch(B){case j:c=r;h=0;p=[f,a,e,b];break;case l:c=0;h=s;p=[b,e,a,f];break;case o:c=r;h=s;p=[e,a,f,b];break;case n:c=r;h=s;p=[a,e,b,f];break;case i:c=0;h=0;p=[f,b,e,a];break;case k:c=r;h=0;p=[a,f,b,e];break;case m:c=0;h=s;p=[e,b,f,a];break;default:c=0;h=0;p=[b,f,a,e]}u=0;while(u<w){t=h+","+c;if(c>=0&&c<x&&h>=0&&h<y&&!z[t]){z[t]=d;g(A,u++,[h,c])}else switch(p[v++%p.length]){case b:c--;break;case f:h--;break;case a:c++;break;case e:h++}switch(p[v%p.length]){case b:c++;break;case f:h++;break;case a:c--;break;case e:h--}}return A};h.$FormationZigZag=function(p){var w=p.$Cols,x=p.$Rows,z=p.$Assembly,v=p.$Count,t=[],u=0,c=0,d=0,q=w-1,r=x-1,y,h,s=0;switch(z){case j:c=q;d=0;h=[f,a,e,a];break;case l:c=0;d=r;h=[b,e,a,e];break;case o:c=q;d=r;h=[e,a,f,a];break;case n:c=q;d=r;h=[a,e,b,e];break;case i:c=0;d=0;h=[f,b,e,b];break;case k:c=q;d=0;h=[a,f,b,f];break;case m:c=0;d=r;h=[e,b,f,b];break;default:c=0;d=0;h=[b,f,a,f]}u=0;while(u<v){y=d+","+c;if(c>=0&&c<w&&d>=0&&d<x&&typeof t[y]=="undefined"){g(t,u++,[d,c]);switch(h[s%h.length]){case b:c++;break;case f:d++;break;case a:c--;break;case e:d--}}else{switch(h[s++%h.length]){case b:c--;break;case f:d--;break;case a:c++;break;case e:d++}switch(h[s++%h.length]){case b:c++;break;case f:d++;break;case a:c--;break;case e:d--}}}return t};h.$FormationStraightStairs=function(q){var u=q.$Cols,v=q.$Rows,e=q.$Assembly,t=q.$Count,r=[],s=0,c=0,d=0,f=u-1,h=v-1,x=t-1;switch(e){case j:case m:case o:case i:var a=0,b=0;break;case k:case l:case n:case p:var a=f,b=0;break;default:e=p;var a=f,b=0}c=a;d=b;while(s<t){if(z(e)||y(e))g(r,x-s++,[d,c]);else g(r,s++,[d,c]);switch(e){case j:case m:c--;d++;break;case o:case i:c++;d--;break;case k:case l:c--;d--;break;case p:case n:default:c++;d++}if(c<0||d<0||c>f||d>h){switch(e){case j:case m:a++;break;case k:case l:case o:case i:b++;break;case p:case n:default:a--}if(a<0||b<0||a>f||b>h){switch(e){case j:case m:a=f;b++;break;case o:case i:b=h;a++;break;case k:case l:b=h;a--;break;case p:case n:default:a=0;b++}if(b>h)b=h;else if(b<0)b=0;else if(a>f)a=f;else if(a<0)a=0}d=b;c=a}}return r};h.$FormationSquare=function(i){var a=i.$Cols||1,b=i.$Rows||1,j=[],d,e,f,h,k;f=a<b?(b-a)/2:0;h=a>b?(a-b)/2:0;k=c.round(c.max(a/2,b/2))+1;for(d=0;d<a;d++)for(e=0;e<b;e++)g(j,k-c.min(d+1+f,e+1+h,a-d+f,b-e+h),[e,d]);return j};h.$FormationRectangle=function(f){var d=f.$Cols||1,e=f.$Rows||1,h=[],a,b,i;i=c.round(c.min(d/2,e/2))+1;for(a=0;a<d;a++)for(b=0;b<e;b++)g(h,i-c.min(a+1,b+1,d-a,e-b),[b,a]);return h};h.$FormationRandom=function(d){for(var e=[],a,b=0;b<d.$Rows;b++)for(a=0;a<d.$Cols;a++)g(e,c.ceil(1e5*c.random())%13,[b,a]);return e};h.$FormationCircle=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,b=0;b<e;b++)for(a=0;a<f;a++)g(h,c.round(c.sqrt(c.pow(b-i,2)+c.pow(a-j,2))),[a,b]);return h};h.$FormationCross=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,b=0;b<e;b++)for(a=0;a<f;a++)g(h,c.round(c.min(c.abs(b-i),c.abs(a-j))),[a,b]);return h};h.$FormationRectangleCross=function(f){for(var h=f.$Cols||1,i=f.$Rows||1,j=[],a,d=h/2-.5,e=i/2-.5,k=c.max(d,e)+1,b=0;b<h;b++)for(a=0;a<i;a++)g(j,c.round(k-c.max(d-c.abs(b-d),e-c.abs(a-e)))-1,[a,b]);return j}};k.$JssorSlideshowRunner$=function(k,s,q,u,z){var f=this,v,g,a,y=0,x=u.$TransitionsOrder,r,h=8;function t(a){if(a.$Top)a.$MoveY=a.$Top;if(a.$Left)a.$MoveX=a.$Left;b.$Each(a,function(a){b.$IsPlainObject(a)&&t(a)})}function i(g,f){var a={$Interval:f,$Duration:1,$Delay:0,$Cols:1,$Rows:1,$Opacity:0,$Zoom:0,$Clip:0,$Move:l,$SlideOut:l,$Reverse:l,$Formation:p.$FormationRandom,$Assembly:1032,$ChessMode:{$Column:0,$Row:0},$Easing:e.$EaseSwing,$Round:{},$Blocks:[],$During:{}};b.$Extend(a,g);t(a);a.$Count=a.$Cols*a.$Rows;a.$Easing=b.$FormatEasings(a.$Easing);a.$FramesCount=c.ceil(a.$Duration/a.$Interval);a.$GetBlocks=function(c,b){c/=a.$Cols;b/=a.$Rows;var f=c+"x"+b;if(!a.$Blocks[f]){a.$Blocks[f]={$Width:c,$Height:b};for(var d=0;d<a.$Cols;d++)for(var e=0;e<a.$Rows;e++)a.$Blocks[f][e+","+d]={$Top:e*b,$Right:d*c+c,$Bottom:e*b+b,$Left:d*c}}return a.$Blocks[f]};if(a.$Brother){a.$Brother=i(a.$Brother,f);a.$SlideOut=d}return a}function o(B,h,a,w,o,m){var z=this,u,v={},i={},n=[],f,e,s,q=a.$ChessMode.$Column||0,r=a.$ChessMode.$Row||0,g=a.$GetBlocks(o,m),p=C(a),D=p.length-1,t=a.$Duration+a.$Delay*D,x=w+t,k=a.$SlideOut,y;x+=50;function C(a){var b=a.$Formation(a);return a.$Reverse?b.reverse():b}z.$EndTime=x;z.$ShowFrame=function(d){d-=w;var e=d<t;if(e||y){y=e;if(!k)d=t-d;var f=c.ceil(d/a.$Interval);b.$Each(i,function(a,e){var d=c.max(f,a.$Min);d=c.min(d,a.length-1);if(a.$LastFrameIndex!=d){if(!a.$LastFrameIndex&&!k)b.$ShowElement(n[e]);else d==a.$Max&&k&&b.$HideElement(n[e]);a.$LastFrameIndex=d;b.$SetStyles(n[e],a[d])}})}};h=b.$CloneNode(h);b.$SetStyleTransform(h,j);if(b.$IsBrowserIe9Earlier()){var E=!h["no-image"],A=b.$FindChildrenByTag(h);b.$Each(A,function(a){(E||a["jssor-slider"])&&b.$CssOpacity(a,b.$CssOpacity(a),d)})}b.$Each(p,function(h,j){b.$Each(h,function(G){var K=G[0],J=G[1],t=K+","+J,n=l,p=l,x=l;if(q&&J%2){if(q&3)n=!n;if(q&12)p=!p;if(q&16)x=!x}if(r&&K%2){if(r&3)n=!n;if(r&12)p=!p;if(r&16)x=!x}a.$Top=a.$Top||a.$Clip&4;a.$Bottom=a.$Bottom||a.$Clip&8;a.$Left=a.$Left||a.$Clip&1;a.$Right=a.$Right||a.$Clip&2;var C=p?a.$Bottom:a.$Top,z=p?a.$Top:a.$Bottom,B=n?a.$Right:a.$Left,A=n?a.$Left:a.$Right;a.$Clip=C||z||B||A;s={};e={$MoveY:0,$MoveX:0,$Opacity:1,$Width:o,$Height:m};f=b.$Extend({},e);u=b.$Extend({},g[t]);if(a.$Opacity)e.$Opacity=2-a.$Opacity;if(a.$ZIndex){e.$ZIndex=a.$ZIndex;f.$ZIndex=0}var I=a.$Cols*a.$Rows>1||a.$Clip;if(a.$Zoom||a.$Rotate){var H=d;if(b.$IsBrowserIe9Earlier())if(a.$Cols*a.$Rows>1)H=l;else I=l;if(H){e.$Zoom=a.$Zoom?a.$Zoom-1:1;f.$Zoom=1;if(b.$IsBrowserIe9Earlier()||b.$IsBrowserOpera())e.$Zoom=c.min(e.$Zoom,2);var N=a.$Rotate||0;e.$Rotate=N*360*(x?-1:1);f.$Rotate=0}}if(I){var h=u.$Offset={};if(a.$Clip){var w=a.$ScaleClip||1;if(C&&z){h.$Top=g.$Height/2*w;h.$Bottom=-h.$Top}else if(C)h.$Bottom=-g.$Height*w;else if(z)h.$Top=g.$Height*w;if(B&&A){h.$Left=g.$Width/2*w;h.$Right=-h.$Left}else if(B)h.$Right=-g.$Width*w;else if(A)h.$Left=g.$Width*w}s.$Clip=u;f.$Clip=g[t]}var L=n?1:-1,M=p?1:-1;if(a.x)e.$MoveX+=o*a.x*L;if(a.y)e.$MoveY+=m*a.y*M;b.$Each(e,function(a,c){if(b.$IsNumeric(a))if(a!=f[c])s[c]=a-f[c]});v[t]=k?f:e;var D=a.$FramesCount,y=c.round(j*a.$Delay/a.$Interval);i[t]=new Array(y);i[t].$Min=y;i[t].$Max=y+D-1;for(var F=0;F<=D;F++){var E=b.$Cast(f,s,F/D,a.$Easing,a.$During,a.$Round,{$Move:a.$Move,$OriginalWidth:o,$OriginalHeight:m});E.$ZIndex=E.$ZIndex||1;i[t].push(E)}})});p.reverse();b.$Each(p,function(a){b.$Each(a,function(c){var f=c[0],e=c[1],d=f+","+e,a=h;if(e||f)a=b.$CloneNode(h);b.$SetStyles(a,v[d]);b.$CssOverflow(a,"hidden");b.$CssPosition(a,"absolute");B.$AddClipElement(a);n[d]=a;b.$ShowElement(a,!k)})})}function w(){var b=this,c=0;m.call(b,0,v);b.$OnPositionChange=function(d,b){if(b-c>h){c=b;a&&a.$ShowFrame(b);g&&g.$ShowFrame(b)}};b.$Transition=r}f.$GetTransition=function(){var a=0,b=u.$Transitions,d=b.length;if(x)a=y++%d;else a=c.floor(c.random()*d);b[a]&&(b[a].$Index=a);return b[a]};f.$Initialize=function(w,x,l,m,b){r=b;b=i(b,h);var j=m.$Item,e=l.$Item;j["no-image"]=!m.$Image;e["no-image"]=!l.$Image;var n=j,p=e,u=b,d=b.$Brother||i({},h);if(!b.$SlideOut){n=e;p=j}var t=d.$Shift||0;g=new o(k,p,d,c.max(t-d.$Interval,0),s,q);a=new o(k,n,u,c.max(d.$Interval-t,0),s,q);g.$ShowFrame(0);a.$ShowFrame(0);v=c.max(g.$EndTime,a.$EndTime);f.$Index=w};f.$Clear=function(){k.$Clear();g=j;a=j};f.$GetProcessor=function(){var b=j;if(a)b=new w;return b};if(b.$IsBrowserIe9Earlier()||b.$IsBrowserOpera()||z&&b.$WebKitVersion()<537)h=16;n.call(f);m.call(f,-1e7,1e7)};var i=k.$JssorSlider$=function(p,hc){var h=this;function Fc(){var a=this;m.call(a,-1e8,2e8);a.$GetCurrentSlideInfo=function(){var b=a.$GetPosition_Display(),d=c.floor(b),f=t(d),e=b-c.floor(b);return{$Index:f,$VirtualIndex:d,$Position:e}};a.$OnPositionChange=function(b,a){var e=c.floor(a);if(e!=a&&a>b)e++;Wb(e,d);h.$TriggerEvent(i.$EVT_POSITION_CHANGE,t(a),t(b),a,b)}}function Ec(){var a=this;m.call(a,0,0,{$LoopLength:r});b.$Each(C,function(b){D&1&&b.$SetLoopLength(r);a.$Chain(b);b.$Shift(gb/dc)})}function Dc(){var a=this,b=Vb.$Elmt;m.call(a,-1,2,{$Easing:e.$EaseLinear,$Setter:{$Position:bc},$LoopLength:r},b,{$Position:1},{$Position:-2});a.$Wrapper=b}function rc(o,n){var b=this,e,f,g,k,c;m.call(b,-1e8,2e8,{$IntervalMax:100});b.$OnStart=function(){O=d;R=j;h.$TriggerEvent(i.$EVT_SWIPE_START,t(w.$GetPosition()),w.$GetPosition())};b.$OnStop=function(){O=l;k=l;var a=w.$GetCurrentSlideInfo();h.$TriggerEvent(i.$EVT_SWIPE_END,t(w.$GetPosition()),w.$GetPosition());!a.$Position&&Hc(a.$VirtualIndex,s)};b.$OnPositionChange=function(i,h){var b;if(k)b=c;else{b=f;if(g){var d=h/g;b=a.$SlideEasing(d)*(f-e)+e}}w.$GoToPosition(b)};b.$PlayCarousel=function(a,d,c,h){e=a;f=d;g=c;w.$GoToPosition(a);b.$GoToPosition(0);b.$PlayToPosition(c,h)};b.$StandBy=function(a){k=d;c=a;b.$Play(a,j,d)};b.$SetStandByPosition=function(a){c=a};b.$MoveCarouselTo=function(a){w.$GoToPosition(a)};w=new Fc;w.$Combine(o);w.$Combine(n)}function sc(){var c=this,a=Zb();b.$CssZIndex(a,0);b.$Css(a,"pointerEvents","none");c.$Elmt=a;c.$AddClipElement=function(c){b.$AppendChild(a,c);b.$ShowElement(a)};c.$Clear=function(){b.$HideElement(a);b.$Empty(a)}}function Bc(k,f){var e=this,q,H,x,o,y=[],w,B,W,G,Q,F,g,v,p,fb;m.call(e,-u,u+1,{$SlideItemAnimator:d});function E(a){q&&q.$Revert();T(k,a,0);F=d;q=new I.$Class(k,I,b.$ParseFloat(b.$AttributeEx(k,"idle"))||qc);q.$GoToPosition(0)}function Y(){q.$Version<I.$Version&&E()}function N(p,r,n){if(!G){G=d;if(o&&n){var g=n.width,c=n.height,m=g,k=c;if(g&&c&&a.$FillMode){if(a.$FillMode&3&&(!(a.$FillMode&4)||g>K||c>J)){var j=l,q=K/J*c/g;if(a.$FillMode&1)j=q>1;else if(a.$FillMode&2)j=q<1;m=j?g*J/c:K;k=j?J:c*K/g}b.$CssWidth(o,m);b.$CssHeight(o,k);b.$CssTop(o,(J-k)/2);b.$CssLeft(o,(K-m)/2)}b.$CssPosition(o,"absolute");h.$TriggerEvent(i.$EVT_LOAD_END,f)}}b.$HideElement(r);p&&p(e)}function X(b,c,d,g){if(g==R&&s==f&&P)if(!Gc){var a=t(b);A.$Initialize(a,f,c,e,d);c.$HideContentForSlideshow();U.$Shift(a-U.$GetPosition_OuterBegin()-1);U.$GoToPosition(a);z.$PlayCarousel(b,b,0)}}function ab(b){if(b==R&&s==f){if(!g){var a=j;if(A)if(A.$Index==f)a=A.$GetProcessor();else A.$Clear();Y();g=new zc(k,f,a,q);g.$SetPlayer(p)}!g.$IsPlaying()&&g.$Replay()}}function S(d,h,l){if(d==f){if(d!=h)C[h]&&C[h].$ParkOut();else!l&&g&&g.$AdjustIdleOnPark();p&&p.$Enable();var m=R=b.$GetNow();e.$LoadImage(b.$CreateCallback(j,ab,m))}else{var k=c.min(f,d),i=c.max(f,d),o=c.min(i-k,k+r-i),n=u+a.$LazyLoading-1;(!Q||o<=n)&&e.$LoadImage()}}function bb(){if(s==f&&g){g.$Stop();p&&p.$Quit();p&&p.$Disable();g.$OpenSlideshowPanel()}}function eb(){s==f&&g&&g.$Stop()}function Z(a){!M&&h.$TriggerEvent(i.$EVT_CLICK,f,a)}function O(){p=v.pInstance;g&&g.$SetPlayer(p)}e.$LoadImage=function(c,a){a=a||x;if(y.length&&!G){b.$ShowElement(a);if(!W){W=d;h.$TriggerEvent(i.$EVT_LOAD_START,f);b.$Each(y,function(a){if(!b.$Attribute(a,"src")){a.src=b.$AttributeEx(a,"src2");b.$CssDisplay(a,a["display-origin"])}})}b.$LoadImages(y,o,b.$CreateCallback(j,N,c,a))}else N(c,a)};e.$GoForNextSlide=function(){var h=f;if(a.$AutoPlaySteps<0)h-=r;var d=h+a.$AutoPlaySteps*xc;if(D&2)d=t(d);if(!(D&1)&&!db)d=c.max(0,c.min(d,r-u));if(d!=f){if(A){var e=A.$GetTransition(r);if(e){var i=R=b.$GetNow(),g=C[t(d)];return g.$LoadImage(b.$CreateCallback(j,X,d,g,e,i),x)}}ob(d)}};e.$TryActivate=function(){S(f,f,d)};e.$ParkOut=function(){p&&p.$Quit();p&&p.$Disable();e.$UnhideContentForSlideshow();g&&g.$Abort();g=j;E()};e.$StampSlideItemElements=function(a){a=fb+"_"+a};e.$HideContentForSlideshow=function(){b.$HideElement(k)};e.$UnhideContentForSlideshow=function(){b.$ShowElement(k)};e.$EnablePlayer=function(){p&&p.$Enable()};function T(a,c,e){if(b.$Attribute(a,"jssor-slider"))return;if(!F){if(a.tagName=="IMG"){y.push(a);if(!b.$Attribute(a,"src")){Q=d;a["display-origin"]=b.$CssDisplay(a);b.$HideElement(a)}}b.$IsBrowserIe9Earlier()&&b.$CssZIndex(a,(b.$CssZIndex(a)||0)+1)}var f=b.$Children(a);b.$Each(f,function(f){var h=f.tagName,i=b.$AttributeEx(f,"u");if(i=="player"&&!v){v=f;if(v.pInstance)O();else b.$AddEvent(v,"dataavailable",O)}if(i=="caption"){if(c){b.$CssTransformOrigin(f,b.$AttributeEx(f,"to"));b.$CssBackfaceVisibility(f,b.$AttributeEx(f,"bf"));b.$AttributeEx(f,"3d")&&b.$CssTransformStyle(f,"preserve-3d")}else if(!b.$IsBrowserIE()){var g=b.$CloneNode(f,l,d);b.$InsertBefore(g,f,a);b.$RemoveElement(f,a);f=g;c=d}}else if(!F&&!e&&!o){if(h=="A"){if(b.$AttributeEx(f,"u")=="image")o=b.$FindChildByTag(f,"IMG");else o=b.$FindChild(f,"image",d);if(o){w=f;b.$CssDisplay(w,"block");b.$SetStyles(w,V);B=b.$CloneNode(w,d);b.$CssPosition(w,"relative");b.$CssOpacity(B,0);b.$Css(B,"backgroundColor","#000")}}else if(h=="IMG"&&b.$AttributeEx(f,"u")=="image")o=f;if(o){o.border=0;b.$SetStyles(o,V)}}T(f,c,e+1)})}e.$OnInnerOffsetChange=function(c,b){var a=u-b;bc(H,a)};e.$Index=f;n.call(e);b.$CssPerspective(k,b.$AttributeEx(k,"p"));b.$CssPerspectiveOrigin(k,b.$AttributeEx(k,"po"));var L=b.$FindChild(k,"thumb",d);if(L){e.$Thumb=b.$CloneNode(L);b.$HideElement(L)}b.$ShowElement(k);x=b.$CloneNode(cb);b.$CssZIndex(x,1e3);b.$AddEvent(k,"click",Z);E(d);e.$Image=o;e.$Link=B;e.$Item=k;e.$Wrapper=H=k;b.$AppendChild(H,x);h.$On(203,S);h.$On(28,eb);h.$On(24,bb)}function zc(y,f,p,q){var a=this,n=0,u=0,g,j,e,c,k,t,r,o=C[f];m.call(a,0,0);function v(){b.$Empty(N);fc&&k&&o.$Link&&b.$AppendChild(N,o.$Link);b.$ShowElement(N,!k&&o.$Image)}function w(){a.$Replay()}function x(b){r=b;a.$Stop();a.$Replay()}a.$Replay=function(){var b=a.$GetPosition_Display();if(!B&&!O&&!r&&s==f){if(!b){if(g&&!k){k=d;a.$OpenSlideshowPanel(d);h.$TriggerEvent(i.$EVT_SLIDESHOW_START,f,n,u,g,c)}v()}var l,p=i.$EVT_STATE_CHANGE;if(b!=c)if(b==e)l=c;else if(b==j)l=e;else if(!b)l=j;else l=a.$GetPlayToPosition();h.$TriggerEvent(p,f,b,n,j,e,c);var m=P&&(!E||F);if(b==c)(e!=c&&!(E&12)||m)&&o.$GoForNextSlide();else(m||b!=e)&&a.$PlayToPosition(l,w)}};a.$AdjustIdleOnPark=function(){e==c&&e==a.$GetPosition_Display()&&a.$GoToPosition(j)};a.$Abort=function(){A&&A.$Index==f&&A.$Clear();var b=a.$GetPosition_Display();b<c&&h.$TriggerEvent(i.$EVT_STATE_CHANGE,f,-b-1,n,j,e,c)};a.$OpenSlideshowPanel=function(a){p&&b.$CssOverflow(ib,a&&p.$Transition.$Outside?"":"hidden")};a.$OnInnerOffsetChange=function(b,a){if(k&&a>=g){k=l;v();o.$UnhideContentForSlideshow();A.$Clear();h.$TriggerEvent(i.$EVT_SLIDESHOW_END,f,n,u,g,c)}h.$TriggerEvent(i.$EVT_PROGRESS_CHANGE,f,a,n,j,e,c)};a.$SetPlayer=function(a){if(a&&!t){t=a;a.$On($JssorPlayer$.$EVT_SWITCH,x)}};p&&a.$Chain(p);g=a.$GetPosition_OuterEnd();a.$Chain(q);j=g+q.$IdleBegin;e=g+q.$IdleEnd;c=a.$GetPosition_OuterEnd()}function Mb(a,c,d){b.$CssLeft(a,c);b.$CssTop(a,d)}function bc(c,b){var a=x>0?x:hb,d=Bb*b*(a&1),e=Cb*b*(a>>1&1);Mb(c,d,e)}function Rb(){qb=O;Kb=z.$GetPlayToPosition();G=w.$GetPosition()}function ic(){Rb();if(B||!F&&E&12){z.$Stop();h.$TriggerEvent(i.$EVT_FREEZE)}}function gc(f){if(!B&&(F||!(E&12))&&!z.$IsPlaying()){var d=w.$GetPosition(),b=c.ceil(G);if(f&&c.abs(H)>=a.$MinDragOffsetToSlide){b=c.ceil(d);b+=fb}if(!(D&1))b=c.min(r-u,c.max(b,0));var e=c.abs(b-d);e=1-c.pow(1-e,5);if(!M&&qb)z.$Continue(Kb);else if(d==b){ub.$EnablePlayer();ub.$TryActivate()}else z.$PlayCarousel(d,b,e*Xb)}}function Ib(a){!b.$AttributeEx(b.$EvtSrc(a),"nodrag")&&b.$CancelEvent(a)}function vc(a){ac(a,1)}function ac(a,c){a=b.$GetEvent(a);var k=b.$EvtSrc(a);if(!L&&!b.$AttributeEx(k,"nodrag")&&wc()&&(!c||a.touches.length==1)){B=d;Ab=l;R=j;b.$AddEvent(f,c?"touchmove":"mousemove",Db);b.$GetNow();M=0;ic();if(!qb)x=0;if(c){var g=a.touches[0];vb=g.clientX;wb=g.clientY}else{var e=b.$MousePosition(a);vb=e.x;wb=e.y}H=0;bb=0;fb=0;h.$TriggerEvent(i.$EVT_DRAG_START,t(G),G,a)}}function Db(e){if(B){e=b.$GetEvent(e);var f;if(e.type!="mousemove"){var l=e.touches[0];f={x:l.clientX,y:l.clientY}}else f=b.$MousePosition(e);if(f){var j=f.x-vb,k=f.y-wb;if(c.floor(G)!=G)x=x||hb&L;if((j||k)&&!x){if(L==3)if(c.abs(k)>c.abs(j))x=2;else x=1;else x=L;if(kb&&x==1&&c.abs(k)-c.abs(j)>3)Ab=d}if(x){var a=k,i=Cb;if(x==1){a=j;i=Bb}if(!(D&1)){if(a>0){var g=i*s,h=a-g;if(h>0)a=g+c.sqrt(h)*5}if(a<0){var g=i*(r-u-s),h=-a-g;if(h>0)a=-g-c.sqrt(h)*5}}if(H-bb<-2)fb=0;else if(H-bb>2)fb=-1;bb=H;H=a;tb=G-H/i/(Z||1);if(H&&x&&!Ab){b.$CancelEvent(e);if(!O)z.$StandBy(tb);else z.$SetStandByPosition(tb)}}}}}function nb(){tc();if(B){B=l;b.$GetNow();b.$RemoveEvent(f,"mousemove",Db);b.$RemoveEvent(f,"touchmove",Db);M=H;z.$Stop();var a=w.$GetPosition();h.$TriggerEvent(i.$EVT_DRAG_END,t(a),a,t(G),G);E&12&&Rb();gc(d)}}function mc(c){if(M){b.$StopEvent(c);var a=b.$EvtSrc(c);while(a&&v!==a){a.tagName=="A"&&b.$CancelEvent(c);try{a=a.parentNode}catch(d){break}}}}function Lb(a){C[s];s=t(a);ub=C[s];Wb(a);return s}function Hc(a,b){x=0;Lb(a);h.$TriggerEvent(i.$EVT_PARK,t(a),b)}function Wb(a,c){yb=a;b.$Each(S,function(b){b.$SetCurrentIndex(t(a),a,c)})}function wc(){var b=i.$DragRegistry||0,a=Y;if(kb)a&1&&(a&=1);i.$DragRegistry|=a;return L=a&~b}function tc(){if(L){i.$DragRegistry&=~Y;L=0}}function Zb(){var a=b.$CreateDiv();b.$SetStyles(a,V);b.$CssPosition(a,"absolute");return a}function t(a){return(a%r+r)%r}function nc(b,d){if(d)if(!D){b=c.min(c.max(b+yb,0),r-u);d=l}else if(D&2){b=t(b+yb);d=l}ob(b,a.$SlideDuration,d)}function zb(){b.$Each(S,function(a){a.$Show(a.$Options.$ChanceToShow<=F)})}function kc(){if(!F){F=1;zb();if(!B){E&12&&gc();E&3&&C[s].$TryActivate()}}}function jc(){if(F){F=0;zb();B||!(E&12)||ic()}}function lc(){V={$Width:K,$Height:J,$Top:0,$Left:0};b.$Each(T,function(a){b.$SetStyles(a,V);b.$CssPosition(a,"absolute");b.$CssOverflow(a,"hidden");b.$HideElement(a)});b.$SetStyles(cb,V)}function mb(b,a){ob(b,a,d)}function ob(h,f,k){if(Tb&&(!B&&(F||!(E&12))||a.$NaviQuitDrag)){O=d;B=l;z.$Stop();if(f==g)f=Xb;var e=Eb.$GetPosition_Display(),b=h;if(k){b=e+h;if(h>0)b=c.ceil(b);else b=c.floor(b)}if(D&2)b=t(b);if(!(D&1))b=c.max(0,c.min(b,r-u));var j=(b-e)%r;b=e+j;var i=e==b?0:f*c.abs(j);i=c.min(i,f*u*1.5);z.$PlayCarousel(e,b,i||1)}}h.$PlayTo=ob;h.$GoTo=function(a){w.$GoToPosition(Lb(a))};h.$Next=function(){mb(1)};h.$Prev=function(){mb(-1)};h.$Pause=function(){P=l};h.$Play=function(){if(!P){P=d;C[s]&&C[s].$TryActivate()}};h.$SetSlideshowTransitions=function(b){a.$SlideshowOptions.$Transitions=b};h.$SetCaptionTransitions=function(a){I.$Transitions=a;I.$Version=b.$GetNow()};h.$SlidesCount=function(){return T.length};h.$CurrentIndex=function(){return s};h.$IsAutoPlaying=function(){return P};h.$IsDragging=function(){return B};h.$IsSliding=function(){return O};h.$IsMouseOver=function(){return!F};h.$LastDragSucceded=function(){return M};function X(){return b.$CssWidth(y||p)}function jb(){return b.$CssHeight(y||p)}h.$OriginalWidth=h.$GetOriginalWidth=X;h.$OriginalHeight=h.$GetOriginalHeight=jb;function Gb(c,d){if(c==g)return b.$CssWidth(p);if(!y){var a=b.$CreateDiv(f);b.$ClassName(a,b.$ClassName(p));b.$CssCssText(a,b.$CssCssText(p));b.$CssDisplay(a,"block");b.$CssPosition(a,"relative");b.$CssTop(a,0);b.$CssLeft(a,0);b.$CssOverflow(a,"visible");y=b.$CreateDiv(f);b.$CssPosition(y,"absolute");b.$CssTop(y,0);b.$CssLeft(y,0);b.$CssWidth(y,b.$CssWidth(p));b.$CssHeight(y,b.$CssHeight(p));b.$CssTransformOrigin(y,"0 0");b.$AppendChild(y,a);var i=b.$Children(p);b.$AppendChild(p,y);b.$Css(p,"backgroundImage","");b.$Each(i,function(c){b.$AppendChild(b.$AttributeEx(c,"noscale")?p:a,c);b.$AttributeEx(c,"autocenter")&&Nb.push(c)})}Z=c/(d?b.$CssHeight:b.$CssWidth)(y);b.$CssScale(y,Z);var h=d?Z*X():c,e=d?c:Z*jb();b.$CssWidth(p,h);b.$CssHeight(p,e);b.$Each(Nb,function(a){var c=b.$ParseInt(b.$AttributeEx(a,"autocenter"));b.$CenterElement(a,c)})}h.$ScaleHeight=h.$GetScaleHeight=function(a){if(a==g)return b.$CssHeight(p);Gb(a,d)};h.$ScaleWidth=h.$SetScaleWidth=h.$GetScaleWidth=Gb;h.$GetVirtualIndex=function(a){var d=c.ceil(t(gb/dc)),b=t(a-s+d);if(b>u){if(a-s>r/2)a-=r;else if(a-s<=-r/2)a+=r}else a=s+b-d;return a};n.call(h);h.$Elmt=p=b.$GetElement(p);var a=b.$Extend({$FillMode:0,$LazyLoading:1,$ArrowKeyNavigation:1,$StartIndex:0,$AutoPlay:l,$Loop:1,$HWA:d,$NaviQuitDrag:d,$AutoPlaySteps:1,$AutoPlayInterval:3e3,$PauseOnHover:1,$SlideDuration:500,$SlideEasing:e.$EaseOutQuad,$MinDragOffsetToSlide:20,$SlideSpacing:0,$Cols:1,$Align:0,$UISearchMode:1,$PlayOrientation:1,$DragOrientation:1},hc);a.$HWA=a.$HWA&&b.$IsBrowser3dSafe();if(a.$Idle!=g)a.$AutoPlayInterval=a.$Idle;if(a.$ParkingPosition!=g)a.$Align=a.$ParkingPosition;var hb=a.$PlayOrientation&3,xc=(a.$PlayOrientation&4)/-4||1,eb=a.$SlideshowOptions,I=b.$Extend({$Class:q,$PlayInMode:1,$PlayOutMode:1,$HWA:a.$HWA},a.$CaptionSliderOptions);I.$Transitions=I.$Transitions||I.$CaptionTransitions;var rb=a.$BulletNavigatorOptions,W=a.$ArrowNavigatorOptions,ab=a.$ThumbnailNavigatorOptions,Q=!a.$UISearchMode,y,v=b.$FindChild(p,"slides",Q),cb=b.$FindChild(p,"loading",Q)||b.$CreateDiv(f),Jb=b.$FindChild(p,"navigator",Q),ec=b.$FindChild(p,"arrowleft",Q),cc=b.$FindChild(p,"arrowright",Q),Hb=b.$FindChild(p,"thumbnavigator",Q),pc=b.$CssWidth(v),oc=b.$CssHeight(v),V,T=[],yc=b.$Children(v);b.$Each(yc,function(a){if(a.tagName=="DIV"&&!b.$AttributeEx(a,"u"))T.push(a);else b.$IsBrowserIe9Earlier()&&b.$CssZIndex(a,(b.$CssZIndex(a)||0)+1)});var s=-1,yb,ub,r=T.length,K=a.$SlideWidth||pc,J=a.$SlideHeight||oc,Yb=a.$SlideSpacing,Bb=K+Yb,Cb=J+Yb,dc=hb&1?Bb:Cb,u=c.min(a.$Cols,r),ib,x,L,Ab,S=[],Sb,Ub,Qb,fc,Gc,P,E=a.$PauseOnHover,qc=a.$AutoPlayInterval,Xb=a.$SlideDuration,sb,db,gb,Tb=u<r,D=Tb?a.$Loop:0,Y,M,F=1,O,B,R,vb=0,wb=0,H,bb,fb,Eb,w,U,z,Vb=new sc,Z,Nb=[];if(r){if(a.$HWA)Mb=function(a,c,d){b.$SetStyleTransform(a,{$TranslateX:c,$TranslateY:d})};P=a.$AutoPlay;h.$Options=hc;lc();b.$Attribute(p,"jssor-slider",d);b.$CssZIndex(v,b.$CssZIndex(v)||0);b.$CssPosition(v,"absolute");ib=b.$CloneNode(v,d);b.$InsertBefore(ib,v);if(eb){fc=eb.$ShowLink;sb=eb.$Class;db=u==1&&r>1&&sb&&(!b.$IsBrowserIE()||b.$BrowserVersion()>=8)}gb=db||u>=r||!(D&1)?0:a.$Align;Y=(u>1||gb?hb:-1)&a.$DragOrientation;var xb=v,C=[],A,N,Fb=b.$Device(),kb=Fb.$Touchable,G,qb,Kb,tb;Fb.$TouchActionAttr&&b.$Css(xb,Fb.$TouchActionAttr,([j,"pan-y","pan-x","none"])[Y]||"");U=new Dc;if(db)A=new sb(Vb,K,J,eb,kb);b.$AppendChild(ib,U.$Wrapper);b.$CssOverflow(v,"hidden");N=Zb();b.$Css(N,"backgroundColor","#000");b.$CssOpacity(N,0);b.$InsertBefore(N,xb.firstChild,xb);for(var pb=0;pb<T.length;pb++){var Ac=T[pb],Cc=new Bc(Ac,pb);C.push(Cc)}b.$HideElement(cb);Eb=new Ec;z=new rc(Eb,U);if(Y){b.$AddEvent(v,"mousedown",ac);b.$AddEvent(v,"touchstart",vc);b.$AddEvent(v,"dragstart",Ib);b.$AddEvent(v,"selectstart",Ib);b.$AddEvent(f,"mouseup",nb);b.$AddEvent(f,"touchend",nb);b.$AddEvent(f,"touchcancel",nb);b.$AddEvent(k,"blur",nb)}E&=kb?10:5;if(Jb&&rb){Sb=new rb.$Class(Jb,rb,X(),jb());S.push(Sb)}if(W&&ec&&cc){W.$Loop=D;W.$Cols=u;Ub=new W.$Class(ec,cc,W,X(),jb());S.push(Ub)}if(Hb&&ab){ab.$StartIndex=a.$StartIndex;Qb=new ab.$Class(Hb,ab);S.push(Qb)}b.$Each(S,function(a){a.$Reset(r,C,cb);a.$On(o.$NAVIGATIONREQUEST,nc)});b.$Css(p,"visibility","visible");Gb(X());b.$AddEvent(v,"click",mc,d);b.$AddEvent(p,"mouseout",b.$MouseOverOutFilter(kc,p));b.$AddEvent(p,"mouseover",b.$MouseOverOutFilter(jc,p));zb();a.$ArrowKeyNavigation&&b.$AddEvent(f,"keydown",function(b){if(b.keyCode==37)mb(-a.$ArrowKeyNavigation);else b.keyCode==39&&mb(a.$ArrowKeyNavigation)});var lb=a.$StartIndex;if(!(D&1))lb=c.max(0,c.min(lb,r-u));z.$PlayCarousel(lb,lb,0)}};i.$EVT_CLICK=21;i.$EVT_DRAG_START=22;i.$EVT_DRAG_END=23;i.$EVT_SWIPE_START=24;i.$EVT_SWIPE_END=25;i.$EVT_LOAD_START=26;i.$EVT_LOAD_END=27;i.$EVT_FREEZE=28;i.$EVT_POSITION_CHANGE=202;i.$EVT_PARK=203;i.$EVT_SLIDESHOW_START=206;i.$EVT_SLIDESHOW_END=207;i.$EVT_PROGRESS_CHANGE=208;i.$EVT_STATE_CHANGE=209;var o={$NAVIGATIONREQUEST:1,$INDEXCHANGE:2,$RESET:3};k.$JssorBulletNavigator$=function(e,C){var f=this;n.call(f);e=b.$GetElement(e);var s,A,z,r,k=0,a,m,i,w,x,h,g,q,p,B=[],y=[];function v(a){a!=-1&&y[a].$Selected(a==k)}function t(a){f.$TriggerEvent(o.$NAVIGATIONREQUEST,a*m)}f.$Elmt=e;f.$GetCurrentIndex=function(){return r};f.$SetCurrentIndex=function(a){if(a!=r){var d=k,b=c.floor(a/m);k=b;r=a;v(d);v(b)}};f.$Show=function(a){b.$ShowElement(e,a)};var u;f.$Reset=function(E){if(!u){s=c.ceil(E/m);k=0;var o=q+w,r=p+x,n=c.ceil(s/i)-1;A=q+o*(!h?n:i-1);z=p+r*(h?n:i-1);b.$CssWidth(e,A);b.$CssHeight(e,z);for(var f=0;f<s;f++){var C=b.$CreateSpan();b.$InnerText(C,f+1);var l=b.$BuildElement(g,"numbertemplate",C,d);b.$CssPosition(l,"absolute");var v=f%(n+1);b.$CssLeft(l,!h?o*v:f%i*o);b.$CssTop(l,h?r*v:c.floor(f/(n+1))*r);b.$AppendChild(e,l);B[f]=l;a.$ActionMode&1&&b.$AddEvent(l,"click",b.$CreateCallback(j,t,f));a.$ActionMode&2&&b.$AddEvent(l,"mouseover",b.$MouseOverOutFilter(b.$CreateCallback(j,t,f),l));y[f]=b.$Buttonize(l)}u=d}};f.$Options=a=b.$Extend({$SpacingX:10,$SpacingY:10,$Orientation:1,$ActionMode:1},C);g=b.$FindChild(e,"prototype");q=b.$CssWidth(g);p=b.$CssHeight(g);b.$RemoveElement(g,e);m=a.$Steps||1;i=a.$Rows||1;w=a.$SpacingX;x=a.$SpacingY;h=a.$Orientation-1;a.$Scale==l&&b.$Attribute(e,"noscale",d);a.$AutoCenter&&b.$Attribute(e,"autocenter",a.$AutoCenter)};k.$JssorArrowNavigator$=function(a,g,h){var c=this;n.call(c);var r,q,e,f,i;b.$CssWidth(a);b.$CssHeight(a);function k(a){c.$TriggerEvent(o.$NAVIGATIONREQUEST,a,d)}function p(c){b.$ShowElement(a,c||!h.$Loop&&e==0);b.$ShowElement(g,c||!h.$Loop&&e>=q-h.$Cols);r=c}c.$GetCurrentIndex=function(){return e};c.$SetCurrentIndex=function(b,a,c){if(c)e=a;else{e=b;p(r)}};c.$Show=p;var m;c.$Reset=function(c){q=c;e=0;if(!m){b.$AddEvent(a,"click",b.$CreateCallback(j,k,-i));b.$AddEvent(g,"click",b.$CreateCallback(j,k,i));b.$Buttonize(a);b.$Buttonize(g);m=d}};c.$Options=f=b.$Extend({$Steps:1},h);i=f.$Steps;if(f.$Scale==l){b.$Attribute(a,"noscale",d);b.$Attribute(g,"noscale",d)}if(f.$AutoCenter){b.$Attribute(a,"autocenter",f.$AutoCenter);b.$Attribute(g,"autocenter",f.$AutoCenter)}};k.$JssorThumbnailNavigator$=function(g,B){var h=this,y,p,a,v=[],z,x,e,q,r,u,t,m,s,f,k;n.call(h);g=b.$GetElement(g);function A(n,f){var g=this,c,m,l;function q(){m.$Selected(p==f)}function i(d){if(d||!s.$LastDragSucceded()){var a=e-f%e,b=s.$GetVirtualIndex((f+a)/e-1),c=b*e+e-a;h.$TriggerEvent(o.$NAVIGATIONREQUEST,c)}}g.$Index=f;g.$Highlight=q;l=n.$Thumb||n.$Image||b.$CreateDiv();g.$Wrapper=c=b.$BuildElement(k,"thumbnailtemplate",l,d);m=b.$Buttonize(c);a.$ActionMode&1&&b.$AddEvent(c,"click",b.$CreateCallback(j,i,0));a.$ActionMode&2&&b.$AddEvent(c,"mouseover",b.$MouseOverOutFilter(b.$CreateCallback(j,i,1),c))}h.$GetCurrentIndex=function(){return p};h.$SetCurrentIndex=function(b,d,f){var a=p;p=b;a!=-1&&v[a].$Highlight();v[b].$Highlight();!f&&s.$PlayTo(s.$GetVirtualIndex(c.floor(d/e)))};h.$Show=function(a){b.$ShowElement(g,a)};var w;h.$Reset=function(F,D){if(!w){y=F;c.ceil(y/e);p=-1;m=c.min(m,D.length);var h=a.$Orientation&1,n=u+(u+q)*(e-1)*(1-h),k=t+(t+r)*(e-1)*h,B=n+(n+q)*(m-1)*h,o=k+(k+r)*(m-1)*(1-h);b.$CssPosition(f,"absolute");b.$CssOverflow(f,"hidden");a.$AutoCenter&1&&b.$CssLeft(f,(z-B)/2);a.$AutoCenter&2&&b.$CssTop(f,(x-o)/2);b.$CssWidth(f,B);b.$CssHeight(f,o);var j=[];b.$Each(D,function(l,g){var i=new A(l,g),d=i.$Wrapper,a=c.floor(g/e),k=g%e;b.$CssLeft(d,(u+q)*k*(1-h));b.$CssTop(d,(t+r)*k*h);if(!j[a]){j[a]=b.$CreateDiv();b.$AppendChild(f,j[a])}b.$AppendChild(j[a],d);v.push(i)});var E=b.$Extend({$AutoPlay:l,$NaviQuitDrag:l,$SlideWidth:n,$SlideHeight:k,$SlideSpacing:q*h+r*(1-h),$MinDragOffsetToSlide:12,$SlideDuration:200,$PauseOnHover:1,$PlayOrientation:a.$Orientation,$DragOrientation:a.$NoDrag||a.$DisableDrag?0:a.$Orientation},a);s=new i(g,E);w=d}};h.$Options=a=b.$Extend({$SpacingX:0,$SpacingY:0,$Cols:1,$Orientation:1,$AutoCenter:3,$ActionMode:1},B);z=b.$CssWidth(g);x=b.$CssHeight(g);f=b.$FindChild(g,"slides",d);k=b.$FindChild(f,"prototype");u=b.$CssWidth(k);t=b.$CssHeight(k);b.$RemoveElement(k,f);e=a.$Rows||1;q=a.$SpacingX;r=a.$SpacingY;m=a.$Cols;a.$Scale==l&&b.$Attribute(g,"noscale",d)};function q(e,d,c){var a=this;m.call(a,0,c);a.$Revert=b.$EmptyFunction;a.$IdleBegin=0;a.$IdleEnd=c}k.$JssorCaptionSlideo$=function(n,f,l){var a=this,o,g={},i=f.$Transitions,c=new m(0,0);m.call(a,0,0);function j(d,c){var a={};b.$Each(d,function(d,f){var e=g[f];if(e){if(b.$IsPlainObject(d))d=j(d,c||f=="e");else if(c)if(b.$IsNumeric(d))d=o[d];a[e]=d}});return a}function k(e,c){var a=[],d=b.$Children(e);b.$Each(d,function(d){var h=b.$AttributeEx(d,"u")=="caption";if(h){var e=b.$AttributeEx(d,"t"),g=i[b.$ParseInt(e)]||i[e],f={$Elmt:d,$Transition:g};a.push(f)}if(c<5)a=a.concat(k(d,c+1))});return a}function r(e,f,a){b.$Each(f,function(h){var f=b.$Extend(d,{},j(h)),g=b.$FormatEasings(f.$Easing);delete f.$Easing;if(f.$Left){f.$MoveX=f.$Left;g.$MoveX=g.$Left;delete f.$Left}if(f.$Top){f.$MoveY=f.$Top;g.$MoveY=g.$Top;delete f.$Top}var i={$Easing:g,$OriginalWidth:a.$Width,$OriginalHeight:a.$Height},k=new m(h.b,h.d,i,e,a,f);c.$Combine(k);a=b.$AddDif(a,f)});return a}function q(a){b.$Each(a,function(f){var a=f.$Elmt,e=b.$CssWidth(a),d=b.$CssHeight(a),c={$Left:b.$CssLeft(a),$Top:b.$CssTop(a),$MoveX:0,$MoveY:0,$Opacity:1,$ZIndex:b.$CssZIndex(a)||0,$Rotate:0,$RotateX:0,$RotateY:0,$ScaleX:1,$ScaleY:1,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0,$Width:e,$Height:d,$Clip:{$Top:0,$Right:e,$Bottom:d,$Left:0}};c.$OriginalX=c.$Left;c.$OriginalY=c.$Top;r(a,f.$Transition,c)})}function t(g,f,h){var e=g.b-f;if(e){var b=new m(f,e);b.$Combine(c,d);b.$Shift(h);a.$Combine(b)}a.$Expand(g.d);return e}function s(f){var d=c.$GetPosition_OuterBegin(),e=0;b.$Each(f,function(c,f){c=b.$Extend({d:l},c);t(c,d,e);d=c.b;e+=c.d;if(!f||c.t==2){a.$IdleBegin=d;a.$IdleEnd=d+c.d}})}a.$Revert=function(){a.$GoToPosition(-1,d)};o=[h.$Swing,h.$Linear,h.$InQuad,h.$OutQuad,h.$InOutQuad,h.$InCubic,h.$OutCubic,h.$InOutCubic,h.$InQuart,h.$OutQuart,h.$InOutQuart,h.$InQuint,h.$OutQuint,h.$InOutQuint,h.$InSine,h.$OutSine,h.$InOutSine,h.$InExpo,h.$OutExpo,h.$InOutExpo,h.$InCirc,h.$OutCirc,h.$InOutCirc,h.$InElastic,h.$OutElastic,h.$InOutElastic,h.$InBack,h.$OutBack,h.$InOutBack,h.$InBounce,h.$OutBounce,h.$InOutBounce,h.$GoBack,h.$InWave,h.$OutWave,h.$OutJump,h.$InJump];var u={$Top:"y",$Left:"x",$Bottom:"m",$Right:"t",$Rotate:"r",$RotateX:"rX",$RotateY:"rY",$ScaleX:"sX",$ScaleY:"sY",$TranslateX:"tX",$TranslateY:"tY",$TranslateZ:"tZ",$SkewX:"kX",$SkewY:"kY",$Opacity:"o",$Easing:"e",$ZIndex:"i",$Clip:"c"};b.$Each(u,function(b,a){g[b]=a});q(k(n,1));c.$GoToPosition(-1);var p=f.$Breaks||[],e=[].concat(p[b.$ParseInt(b.$AttributeEx(n,"b"))]||[]);e.push({b:c.$GetPosition_OuterEnd(),d:e.length?0:l});s(e);a.$GoToPosition(-1)}})(window,document,Math,null,true,false)
;
(function(k,f,c,j,d,l,g){/*! Jssor */
new(function(){});var e=k.$JssorEasing$={$EaseSwing:function(a){return-c.cos(a*c.PI)/2+.5},$EaseLinear:function(a){return a},$EaseInQuad:function(a){return a*a},$EaseOutQuad:function(a){return-a*(a-2)},$EaseInOutQuad:function(a){return(a*=2)<1?1/2*a*a:-1/2*(--a*(a-2)-1)},$EaseInCubic:function(a){return a*a*a},$EaseOutCubic:function(a){return(a-=1)*a*a+1},$EaseInOutCubic:function(a){return(a*=2)<1?1/2*a*a*a:1/2*((a-=2)*a*a+2)},$EaseInQuart:function(a){return a*a*a*a},$EaseOutQuart:function(a){return-((a-=1)*a*a*a-1)},$EaseInOutQuart:function(a){return(a*=2)<1?1/2*a*a*a*a:-1/2*((a-=2)*a*a*a-2)},$EaseInQuint:function(a){return a*a*a*a*a},$EaseOutQuint:function(a){return(a-=1)*a*a*a*a+1},$EaseInOutQuint:function(a){return(a*=2)<1?1/2*a*a*a*a*a:1/2*((a-=2)*a*a*a*a+2)},$EaseInSine:function(a){return 1-c.cos(c.PI/2*a)},$EaseOutSine:function(a){return c.sin(c.PI/2*a)},$EaseInOutSine:function(a){return-1/2*(c.cos(c.PI*a)-1)},$EaseInExpo:function(a){return a==0?0:c.pow(2,10*(a-1))},$EaseOutExpo:function(a){return a==1?1:-c.pow(2,-10*a)+1},$EaseInOutExpo:function(a){return a==0||a==1?a:(a*=2)<1?1/2*c.pow(2,10*(a-1)):1/2*(-c.pow(2,-10*--a)+2)},$EaseInCirc:function(a){return-(c.sqrt(1-a*a)-1)},$EaseOutCirc:function(a){return c.sqrt(1-(a-=1)*a)},$EaseInOutCirc:function(a){return(a*=2)<1?-1/2*(c.sqrt(1-a*a)-1):1/2*(c.sqrt(1-(a-=2)*a)+1)},$EaseInElastic:function(a){if(!a||a==1)return a;var b=.3,d=.075;return-(c.pow(2,10*(a-=1))*c.sin((a-d)*2*c.PI/b))},$EaseOutElastic:function(a){if(!a||a==1)return a;var b=.3,d=.075;return c.pow(2,-10*a)*c.sin((a-d)*2*c.PI/b)+1},$EaseInOutElastic:function(a){if(!a||a==1)return a;var b=.45,d=.1125;return(a*=2)<1?-.5*c.pow(2,10*(a-=1))*c.sin((a-d)*2*c.PI/b):c.pow(2,-10*(a-=1))*c.sin((a-d)*2*c.PI/b)*.5+1},$EaseInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},$EaseOutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},$EaseInOutBack:function(a){var b=1.70158;return(a*=2)<1?1/2*a*a*(((b*=1.525)+1)*a-b):1/2*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},$EaseInBounce:function(a){return 1-e.$EaseOutBounce(1-a)},$EaseOutBounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},$EaseInOutBounce:function(a){return a<1/2?e.$EaseInBounce(a*2)*.5:e.$EaseOutBounce(a*2-1)*.5+.5},$EaseGoBack:function(a){return 1-c.abs(2-1)},$EaseInWave:function(a){return 1-c.cos(a*c.PI*2)},$EaseOutWave:function(a){return c.sin(a*c.PI*2)},$EaseOutJump:function(a){return 1-((a*=2)<1?(a=1-a)*a*a:(a-=1)*a*a)},$EaseInJump:function(a){return(a*=2)<1?a*a*a:(a=2-a)*a*a}},h=k.$Jease$={$Swing:e.$EaseSwing,$Linear:e.$EaseLinear,$InQuad:e.$EaseInQuad,$OutQuad:e.$EaseOutQuad,$InOutQuad:e.$EaseInOutQuad,$InCubic:e.$EaseInCubic,$OutCubic:e.$EaseOutCubic,$InOutCubic:e.$EaseInOutCubic,$InQuart:e.$EaseInQuart,$OutQuart:e.$EaseOutQuart,$InOutQuart:e.$EaseInOutQuart,$InQuint:e.$EaseInQuint,$OutQuint:e.$EaseOutQuint,$InOutQuint:e.$EaseInOutQuint,$InSine:e.$EaseInSine,$OutSine:e.$EaseOutSine,$InOutSine:e.$EaseInOutSine,$InExpo:e.$EaseInExpo,$OutExpo:e.$EaseOutExpo,$InOutExpo:e.$EaseInOutExpo,$InCirc:e.$EaseInCirc,$OutCirc:e.$EaseOutCirc,$InOutCirc:e.$EaseInOutCirc,$InElastic:e.$EaseInElastic,$OutElastic:e.$EaseOutElastic,$InOutElastic:e.$EaseInOutElastic,$InBack:e.$EaseInBack,$OutBack:e.$EaseOutBack,$InOutBack:e.$EaseInOutBack,$InBounce:e.$EaseInBounce,$OutBounce:e.$EaseOutBounce,$InOutBounce:e.$EaseInOutBounce,$GoBack:e.$EaseGoBack,$InWave:e.$EaseInWave,$OutWave:e.$EaseOutWave,$OutJump:e.$EaseOutJump,$InJump:e.$EaseInJump};var b=new function(){var h=this,Ab=/\S+/g,K=1,ib=2,mb=3,lb=4,qb=5,L,s=0,i=0,t=0,z=0,A=0,D=navigator,vb=D.appName,o=D.userAgent,q=parseFloat;function Ib(){if(!L){L={Wf:"ontouchstart"in k||"createTouch"in f};var a;if(D.pointerEnabled||(a=D.msPointerEnabled))L.nd=a?"msTouchAction":"touchAction"}return L}function v(h){if(!s){s=-1;if(vb=="Microsoft Internet Explorer"&&!!k.attachEvent&&!!k.ActiveXObject){var e=o.indexOf("MSIE");s=K;t=q(o.substring(e+5,o.indexOf(";",e)));/*@cc_on z=@_jscript_version@*/;i=f.documentMode||t}else if(vb=="Netscape"&&!!k.addEventListener){var d=o.indexOf("Firefox"),b=o.indexOf("Safari"),g=o.indexOf("Chrome"),c=o.indexOf("AppleWebKit");if(d>=0){s=ib;i=q(o.substring(d+8))}else if(b>=0){var j=o.substring(0,b).lastIndexOf("/");s=g>=0?lb:mb;i=q(o.substring(j+1,b))}else{var a=/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(o);if(a){s=K;i=t=q(a[1])}}if(c>=0)A=q(o.substring(c+12))}else{var a=/(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(o);if(a){s=qb;i=q(a[2])}}}return h==s}function r(){return v(K)}function S(){return r()&&(i<6||f.compatMode=="BackCompat")}function kb(){return v(mb)}function pb(){return v(qb)}function fb(){return kb()&&A>534&&A<535}function H(){v();return A>537||i>42||s==K&&i>=11}function Q(){return r()&&i<9}function gb(a){var b,c;return function(f){if(!b){b=d;var e=a.substr(0,1).toUpperCase()+a.substr(1);n([a].concat(["WebKit","ms","Moz","O","webkit"]),function(h,d){var b=a;if(d)b=h+e;if(f.style[b]!=g)return c=b})}return c}}function eb(b){var a;return function(c){a=a||gb(b)(c)||b;return a}}var M=eb("transform");function ub(a){return{}.toString.call(a)}var rb={};n(["Boolean","Number","String","Function","Array","Date","RegExp","Object"],function(a){rb["[object "+a+"]"]=a.toLowerCase()});function n(b,d){var a,c;if(ub(b)=="[object Array]"){for(a=0;a<b.length;a++)if(c=d(b[a],a,b))return c}else for(a in b)if(c=d(b[a],a,b))return c}function F(a){return a==j?String(a):rb[ub(a)]||"object"}function sb(a){for(var b in a)return d}function B(a){try{return F(a)=="object"&&!a.nodeType&&a!=a.window&&(!a.constructor||{}.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))}catch(b){}}function p(a,b){return{x:a,y:b}}function yb(b,a){setTimeout(b,a||0)}function C(b,d,c){var a=!b||b=="inherit"?"":b;n(d,function(c){var b=c.exec(a);if(b){var d=a.substr(0,b.index),e=a.substr(b.index+b[0].length+1,a.length-1);a=d+e}});a=c+(!a.indexOf(" ")?"":" ")+a;return a}function T(b,a){if(i<9)b.style.filter=a}h.kf=Ib;h.Nd=r;h.jf=kb;h.Dd=pb;h.nf=H;h.fb=Q;gb("transform");h.Jd=function(){return i};h.lf=function(){v();return A};h.$Delay=yb;function ab(a){a.constructor===ab.caller&&a.Md&&a.Md.apply(a,ab.caller.arguments)}h.Md=ab;h.gb=function(a){if(h.cf(a))a=f.getElementById(a);return a};function u(a){return a||k.event}h.Id=u;h.mc=function(b){b=u(b);var a=b.target||b.srcElement||f;if(a.nodeType==3)a=h.Bd(a);return a};h.Ed=function(a){a=u(a);return{x:a.pageX||a.clientX||0,y:a.pageY||a.clientY||0}};function G(c,d,a){if(a!==g)c.style[d]=a==g?"":a;else{var b=c.currentStyle||c.style;a=b[d];if(a==""&&k.getComputedStyle){b=c.ownerDocument.defaultView.getComputedStyle(c,j);b&&(a=b.getPropertyValue(d)||b[d])}return a}}function cb(b,c,a,d){if(a!==g){if(a==j)a="";else d&&(a+="px");G(b,c,a)}else return q(G(b,c))}function m(c,a){var d=a?cb:G,b;if(a&4)b=eb(c);return function(e,f){return d(e,b?b(e):c,f,a&2)}}function Db(b){if(r()&&t<9){var a=/opacity=([^)]*)/.exec(b.style.filter||"");return a?q(a[1])/100:1}else return q(b.style.opacity||"1")}function Fb(b,a,f){if(r()&&t<9){var h=b.style.filter||"",i=new RegExp(/[\s]*alpha\([^\)]*\)/g),e=c.round(100*a),d="";if(e<100||f)d="alpha(opacity="+e+") ";var g=C(h,[i],d);T(b,g)}else b.style.opacity=a==1?"":c.round(a*100)/100}var N={$Rotate:["rotate"],$RotateX:["rotateX"],$RotateY:["rotateY"],$SkewX:["skewX"],$SkewY:["skewY"]};if(!H())N=E(N,{$ScaleX:["scaleX",2],$ScaleY:["scaleY",2],$TranslateZ:["translateZ",1]});function O(d,a){var c="";if(a){if(r()&&i&&i<10){delete a.$RotateX;delete a.$RotateY;delete a.$TranslateZ}b.a(a,function(d,b){var a=N[b];if(a){var e=a[1]||0;if(P[b]!=d)c+=" "+a[0]+"("+d+(["deg","px",""])[e]+")"}});if(H()){if(a.$TranslateX||a.$TranslateY||a.$TranslateZ)c+=" translate3d("+(a.$TranslateX||0)+"px,"+(a.$TranslateY||0)+"px,"+(a.$TranslateZ||0)+"px)";if(a.$ScaleX==g)a.$ScaleX=1;if(a.$ScaleY==g)a.$ScaleY=1;if(a.$ScaleX!=1||a.$ScaleY!=1)c+=" scale3d("+a.$ScaleX+", "+a.$ScaleY+", 1)"}}d.style[M(d)]=c}h.Ic=m("transformOrigin",4);h.zf=m("backfaceVisibility",4);h.yf=m("transformStyle",4);h.xf=m("perspective",6);h.qf=m("perspectiveOrigin",4);h.pf=function(a,b){if(r()&&t<9||t<10&&S())a.style.zoom=b==1?"":b;else{var c=M(a),f="scale("+b+")",e=a.style[c],g=new RegExp(/[\s]*scale\(.*?\)/g),d=C(e,[g],f);a.style[c]=d}};h.Sb=function(b,a){return function(c){c=u(c);var e=c.type,d=c.relatedTarget||(e=="mouseout"?c.toElement:c.fromElement);(!d||d!==a&&!h.of(a,d))&&b(c)}};h.c=function(a,c,d,b){a=h.gb(a);if(a.addEventListener){c=="mousewheel"&&a.addEventListener("DOMMouseScroll",d,b);a.addEventListener(c,d,b)}else if(a.attachEvent){a.attachEvent("on"+c,d);b&&a.setCapture&&a.setCapture()}};h.R=function(a,c,d,b){a=h.gb(a);if(a.removeEventListener){c=="mousewheel"&&a.removeEventListener("DOMMouseScroll",d,b);a.removeEventListener(c,d,b)}else if(a.detachEvent){a.detachEvent("on"+c,d);b&&a.releaseCapture&&a.releaseCapture()}};h.Pb=function(a){a=u(a);a.preventDefault&&a.preventDefault();a.cancel=d;a.returnValue=l};h.rf=function(a){a=u(a);a.stopPropagation&&a.stopPropagation();a.cancelBubble=d};h.E=function(d,c){var a=[].slice.call(arguments,2),b=function(){var b=a.concat([].slice.call(arguments,0));return c.apply(d,b)};return b};h.Ig=function(a,b){if(b==g)return a.textContent||a.innerText;var c=f.createTextNode(b);h.qc(a);a.appendChild(c)};h.Ab=function(d,c){for(var b=[],a=d.firstChild;a;a=a.nextSibling)(c||a.nodeType==1)&&b.push(a);return b};function tb(a,c,e,b){b=b||"u";for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){if(X(a,b)==c)return a;if(!e){var d=tb(a,c,e,b);if(d)return d}}}h.C=tb;function V(a,d,f,b){b=b||"u";var c=[];for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){X(a,b)==d&&c.push(a);if(!f){var e=V(a,d,f,b);if(e.length)c=c.concat(e)}}return c}function nb(a,c,d){for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){if(a.tagName==c)return a;if(!d){var b=nb(a,c,d);if(b)return b}}}h.Jg=nb;function hb(a,c,e){var b=[];for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){(!c||a.tagName==c)&&b.push(a);if(!e){var d=hb(a,c,e);if(d.length)b=b.concat(d)}}return b}h.Ng=hb;h.Bg=function(b,a){return b.getElementsByTagName(a)};function E(){var e=arguments,d,c,b,a,h=1&e[0],f=1+h;d=e[f-1]||{};for(;f<e.length;f++)if(c=e[f])for(b in c){a=c[b];if(a!==g){a=c[b];var i=d[b];d[b]=h&&(B(i)||B(a))?E(h,{},i,a):a}}return d}h.o=E;function bb(f,g){var d={},c,a,b;for(c in f){a=f[c];b=g[c];if(a!==b){var e;if(B(a)&&B(b)){a=bb(a,b);e=!sb(a)}!e&&(d[c]=a)}}return d}h.Wc=function(a){return F(a)=="function"};h.cf=function(a){return F(a)=="string"};h.Hb=function(a){return!isNaN(q(a))&&isFinite(a)};h.a=n;h.Yc=B;function U(a){return f.createElement(a)}h.jb=function(){return U("DIV")};h.Dg=function(){return U("SPAN")};h.Sc=function(){};function Y(b,c,a){if(a==g)return b.getAttribute(c);b.setAttribute(c,a)}function X(a,b){return Y(a,b)||Y(a,"data-"+b)}h.v=Y;h.j=X;function x(b,a){if(a==g)return b.className;b.className=a}h.ad=x;function xb(b){var a={};n(b,function(b){a[b]=b});return a}function zb(b,a){return b.match(a||Ab)}function R(b,a){return xb(zb(b||"",a))}h.hg=zb;function db(b,c){var a="";n(c,function(c){a&&(a+=b);a+=c});return a}function J(a,c,b){x(a,db(" ",E(bb(R(x(a)),R(c)),R(b))))}h.Bd=function(a){return a.parentNode};h.Q=function(a){h.T(a,"none")};h.u=function(a,b){h.T(a,b?"none":"")};h.fg=function(b,a){b.removeAttribute(a)};h.ag=function(){return r()&&i<10};h.Zf=function(d,a){if(a)d.style.clip="rect("+c.round(a.$Top||a.H||0)+"px "+c.round(a.$Right)+"px "+c.round(a.$Bottom)+"px "+c.round(a.$Left||a.I||0)+"px)";else if(a!==g){var h=d.style.cssText,f=[new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),new RegExp(/[\s]*cliptop: .*?[;]?/i),new RegExp(/[\s]*clipright: .*?[;]?/i),new RegExp(/[\s]*clipbottom: .*?[;]?/i),new RegExp(/[\s]*clipleft: .*?[;]?/i)],e=C(h,f,"");b.ac(d,e)}};h.M=function(){return+new Date};h.J=function(b,a){b.appendChild(a)};h.Vb=function(b,a,c){(c||a.parentNode).insertBefore(b,a)};h.zb=function(b,a){a=a||b.parentNode;a&&a.removeChild(b)};h.xg=function(a,b){n(a,function(a){h.zb(a,b)})};h.qc=function(a){h.xg(h.Ab(a,d),a)};h.wg=function(a,b){var c=h.Bd(a);b&1&&h.A(a,(h.k(c)-h.k(a))/2);b&2&&h.z(a,(h.m(c)-h.m(a))/2)};h.zc=function(b,a){return parseInt(b,a||10)};h.rg=q;h.of=function(b,a){var c=f.body;while(a&&b!==a&&c!==a)try{a=a.parentNode}catch(d){return l}return b===a};function Z(d,c,b){var a=d.cloneNode(!c);!b&&h.fg(a,"id");return a}h.Z=Z;h.xb=function(e,f){var a=new Image;function b(e,d){h.R(a,"load",b);h.R(a,"abort",c);h.R(a,"error",c);f&&f(a,d)}function c(a){b(a,d)}if(pb()&&i<11.6||!e)b(!e);else{h.c(a,"load",b);h.c(a,"abort",c);h.c(a,"error",c);a.src=e}};h.af=function(d,a,e){var c=d.length+1;function b(b){c--;if(a&&b&&b.src==a.src)a=b;!c&&e&&e(a)}n(d,function(a){h.xb(a.src,b)});b()};h.Gc=function(a,g,i,h){if(h)a=Z(a);var c=V(a,g);if(!c.length)c=b.Bg(a,g);for(var f=c.length-1;f>-1;f--){var d=c[f],e=Z(i);x(e,x(d));b.ac(e,d.style.cssText);b.Vb(e,d);b.zb(d)}return a};function Gb(a){var l=this,p="",r=["av","pv","ds","dn"],e=[],q,k=0,i=0,d=0;function j(){J(a,q,e[d||k||i&2||i]);b.ab(a,"pointer-events",d?"none":"")}function c(){k=0;j();h.R(f,"mouseup",c);h.R(f,"touchend",c);h.R(f,"touchcancel",c)}function o(a){if(d)h.Pb(a);else{k=4;j();h.c(f,"mouseup",c);h.c(f,"touchend",c);h.c(f,"touchcancel",c)}}l.Jc=function(a){if(a===g)return i;i=a&2||a&1;j()};l.$Enable=function(a){if(a===g)return!d;d=a?0:3;j()};l.$Elmt=a=h.gb(a);var m=b.hg(x(a));if(m)p=m.shift();n(r,function(a){e.push(p+a)});q=db(" ",e);e.unshift("");h.c(a,"mousedown",o);h.c(a,"touchstart",o)}h.Tb=function(a){return new Gb(a)};h.ab=G;h.kb=m("overflow");h.z=m("top",2);h.A=m("left",2);h.k=m("width",2);h.m=m("height",2);h.Af=m("marginLeft",2);h.Qf=m("marginTop",2);h.B=m("position");h.T=m("display");h.F=m("zIndex",1);h.yb=function(b,a,c){if(a!=g)Fb(b,a,c);else return Db(b)};h.ac=function(a,b){if(b!=g)a.style.cssText=b;else return a.style.cssText};var W={$Opacity:h.yb,$Top:h.z,$Left:h.A,S:h.k,O:h.m,Db:h.B,Ih:h.T,$ZIndex:h.F};function w(f,l){var e=Q(),b=H(),d=fb(),i=M(f);function k(b,d,a){var e=b.mb(p(-d/2,-a/2)),f=b.mb(p(d/2,-a/2)),g=b.mb(p(d/2,a/2)),h=b.mb(p(-d/2,a/2));b.mb(p(300,300));return p(c.min(e.x,f.x,g.x,h.x)+d/2,c.min(e.y,f.y,g.y,h.y)+a/2)}function a(d,a){a=a||{};var f=a.$TranslateZ||0,l=(a.$RotateX||0)%360,m=(a.$RotateY||0)%360,o=(a.$Rotate||0)%360,p=a.Jh;if(e){f=0;l=0;m=0;p=0}var c=new Cb(a.$TranslateX,a.$TranslateY,f);c.$RotateX(l);c.$RotateY(m);c.Yd(o);c.Vd(a.$SkewX,a.$SkewY);c.$Scale(a.$ScaleX,a.$ScaleY,p);if(b){c.$Move(a.I,a.H);d.style[i]=c.Ne()}else if(!z||z<9){var j="";if(o||a.$ScaleX!=g&&a.$ScaleX!=1||a.$ScaleY!=g&&a.$ScaleY!=1){var n=k(c,a.$OriginalWidth,a.$OriginalHeight);h.Qf(d,n.y);h.Af(d,n.x);j=c.Qe()}var r=d.style.filter,s=new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),q=C(r,[s],j);T(d,q)}}w=function(e,c){c=c||{};var i=c.I,k=c.H,f;n(W,function(a,b){f=c[b];f!==g&&a(e,f)});h.Zf(e,c.$Clip);if(!b){i!=g&&h.A(e,(c.gd||0)+i);k!=g&&h.z(e,(c.Uc||0)+k)}if(c.Re)if(d)yb(h.E(j,O,e,c));else a(e,c)};h.Eb=O;if(d)h.Eb=w;if(e)h.Eb=a;else if(!b)a=O;h.K=w;w(f,l)}h.Eb=w;h.K=w;function Cb(k,l,p){var d=this,b=[1,0,0,0,0,1,0,0,0,0,1,0,k||0,l||0,p||0,1],i=c.sin,h=c.cos,m=c.tan;function f(a){return a*c.PI/180}function o(a,b){return{x:a,y:b}}function n(b,c,f,g,i,l,n,o,q,t,u,w,y,A,C,F,a,d,e,h,j,k,m,p,r,s,v,x,z,B,D,E){return[b*a+c*j+f*r+g*z,b*d+c*k+f*s+g*B,b*e+c*m+f*v+g*D,b*h+c*p+f*x+g*E,i*a+l*j+n*r+o*z,i*d+l*k+n*s+o*B,i*e+l*m+n*v+o*D,i*h+l*p+n*x+o*E,q*a+t*j+u*r+w*z,q*d+t*k+u*s+w*B,q*e+t*m+u*v+w*D,q*h+t*p+u*x+w*E,y*a+A*j+C*r+F*z,y*d+A*k+C*s+F*B,y*e+A*m+C*v+F*D,y*h+A*p+C*x+F*E]}function e(c,a){return n.apply(j,(a||b).concat(c))}d.$Scale=function(a,c,d){if(a==g)a=1;if(c==g)c=1;if(d==g)d=1;if(a!=1||c!=1||d!=1)b=e([a,0,0,0,0,c,0,0,0,0,d,0,0,0,0,1])};d.$Move=function(a,c,d){b[12]+=a||0;b[13]+=c||0;b[14]+=d||0};d.$RotateX=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([1,0,0,0,0,d,g,0,0,-g,d,0,0,0,0,1])}};d.$RotateY=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([d,0,-g,0,0,1,0,0,g,0,d,0,0,0,0,1])}};d.Yd=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([d,g,0,0,-g,d,0,0,0,0,1,0,0,0,0,1])}};d.Vd=function(a,c){if(a||c){k=f(a);l=f(c);b=e([1,m(l),0,0,m(k),1,0,0,0,0,1,0,0,0,0,1])}};d.mb=function(c){var a=e(b,[1,0,0,0,0,1,0,0,0,0,1,0,c.x,c.y,0,1]);return o(a[12],a[13])};d.Ne=function(){return"matrix3d("+b.join(",")+")"};d.Qe=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+b[0]+", M12="+b[4]+", M21="+b[1]+", M22="+b[5]+", SizingMethod='auto expand')"}}new(function(){var a=this;function b(d,g){for(var j=d[0].length,i=d.length,h=g[0].length,f=[],c=0;c<i;c++)for(var k=f[c]=[],b=0;b<h;b++){for(var e=0,a=0;a<j;a++)e+=d[c][a]*g[a][b];k[b]=e}return f}a.$ScaleX=function(b,c){return a.Xc(b,c,0)};a.$ScaleY=function(b,c){return a.Xc(b,0,c)};a.Xc=function(a,c,d){return b(a,[[c,0],[0,d]])};a.mb=function(d,c){var a=b(d,[[c.x],[c.y]]);return p(a[0][0],a[1][0])}});var P={gd:0,Uc:0,I:0,H:0,$Zoom:1,$ScaleX:1,$ScaleY:1,$Rotate:0,$RotateX:0,$RotateY:0,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0};h.fc=function(a){var c=a||{};if(a)if(b.Wc(a))c={hc:c};else if(b.Wc(a.$Clip))c.$Clip={hc:a.$Clip};return c};function wb(c,a){var b={};n(c,function(c,d){var e=c;if(a[d]!=g)if(h.Hb(c))e=c+a[d];else e=wb(c,a[d]);b[d]=e});return b}h.ze=wb;h.Tc=function(l,m,x,q,z,A,n){var a=m;if(l){a={};for(var h in m){var B=A[h]||1,w=z[h]||[0,1],f=(x-w[0])/w[1];f=c.min(c.max(f,0),1);f=f*B;var u=c.floor(f);if(f!=u)f-=u;var i=q.hc||e.$EaseSwing,k,C=l[h],p=m[h];if(b.Hb(p)){i=q[h]||i;var y=i(f);k=C+p*y}else{k=b.o({Jb:{}},l[h]);var v=q[h]||{};b.a(p.Jb||p,function(d,a){i=v[a]||v.hc||i;var c=i(f),b=d*c;k.Jb[a]=b;k[a]+=b})}a[h]=k}var t=b.a(m,function(b,a){return P[a]!=g});t&&b.a(P,function(c,b){if(a[b]==g&&l[b]!==g)a[b]=l[b]});if(t){if(a.$Zoom)a.$ScaleX=a.$ScaleY=a.$Zoom;a.$OriginalWidth=n.$OriginalWidth;a.$OriginalHeight=n.$OriginalHeight;a.Re=d}}if(m.$Clip&&n.$Move){var o=a.$Clip.Jb,s=(o.$Top||0)+(o.$Bottom||0),r=(o.$Left||0)+(o.$Right||0);a.$Left=(a.$Left||0)+r;a.$Top=(a.$Top||0)+s;a.$Clip.$Left-=r;a.$Clip.$Right-=r;a.$Clip.$Top-=s;a.$Clip.$Bottom-=s}if(a.$Clip&&b.ag()&&!a.$Clip.$Top&&!a.$Clip.$Left&&!a.$Clip.H&&!a.$Clip.I&&a.$Clip.$Right==n.$OriginalWidth&&a.$Clip.$Bottom==n.$OriginalHeight)a.$Clip=j;return a}};function n(){var a=this,d=[];function h(a,b){d.push({pc:a,oc:b})}function g(a,c){b.a(d,function(b,e){b.pc==a&&b.oc===c&&d.splice(e,1)})}a.$On=a.addEventListener=h;a.$Off=a.removeEventListener=g;a.l=function(a){var c=[].slice.call(arguments,1);b.a(d,function(b){b.pc==a&&b.oc.apply(k,c)})}}var m=function(z,C,h,L,O,J){z=z||0;var a=this,q,n,o,v,A=0,H,I,G,B,y=0,g=0,m=0,D,i,f,e,p,w=[],x;function P(a){f+=a;e+=a;i+=a;g+=a;m+=a;y+=a}function u(o){var j=o;if(p&&(j>=e||j<=f))j=((j-f)%p+p)%p+f;if(!D||v||g!=j){var k=c.min(j,e);k=c.max(k,f);if(!D||v||k!=m){if(J){var l=(k-i)/(C||1);if(h.$Reverse)l=1-l;var n=b.Tc(O,J,l,H,G,I,h);if(x)b.a(n,function(b,a){x[a]&&x[a](L,b)});else b.K(L,n)}a.nc(m-i,k-i);m=k;b.a(w,function(b,c){var a=o<g?w[w.length-c-1]:b;a.D(m-y)});var r=g,q=m;g=j;D=d;a.Ub(r,q)}}}function E(a,b,d){b&&a.$Shift(e);if(!d){f=c.min(f,a.jc()+y);e=c.max(e,a.Zb()+y)}w.push(a)}var r=k.requestAnimationFrame||k.webkitRequestAnimationFrame||k.mozRequestAnimationFrame||k.msRequestAnimationFrame;if(b.jf()&&b.Jd()<7)r=j;r=r||function(a){b.$Delay(a,h.$Interval)};function K(){if(q){var d=b.M(),e=c.min(d-A,h.Fc),a=g+e*o;A=d;if(a*o>=n*o)a=n;u(a);if(!v&&a*o>=n*o)M(B);else r(K)}}function t(h,i,j){if(!q){q=d;v=j;B=i;h=c.max(h,f);h=c.min(h,e);n=h;o=n<g?-1:1;a.Qc();A=b.M();r(K)}}function M(b){if(q){v=q=B=l;a.Kc();b&&b()}}a.$Play=function(a,b,c){t(a?g+a:e,b,c)};a.Lc=t;a.pb=M;a.Oe=function(a){t(a)};a.W=function(){return g};a.Hd=function(){return n};a.qb=function(){return m};a.D=u;a.$Move=function(a){u(g+a)};a.$IsPlaying=function(){return q};a.Ae=function(a){p=a};a.$Shift=P;a.wb=function(a,b){E(a,0,b)};a.rc=function(a){E(a,1)};a.Fe=function(a){e+=a};a.jc=function(){return f};a.Zb=function(){return e};a.Ub=a.Qc=a.Kc=a.nc=b.Sc;a.sc=b.M();h=b.o({$Interval:16,Fc:50},h);p=h.pd;x=h.Be;f=i=z;e=z+C;I=h.$Round||{};G=h.$During||{};H=b.fc(h.$Easing)};var p=k.$JssorSlideshowFormations$=new function(){var h=this,b=0,a=1,f=2,e=3,s=1,r=2,t=4,q=8,w=256,x=512,v=1024,u=2048,j=u+s,i=u+r,o=x+s,m=x+r,n=w+t,k=w+q,l=v+t,p=v+q;function y(a){return(a&r)==r}function z(a){return(a&t)==t}function g(b,a,c){c.push(a);b[a]=b[a]||[];b[a].push(c)}h.$FormationStraight=function(f){for(var d=f.$Cols,e=f.$Rows,s=f.$Assembly,t=f.Ib,r=[],a=0,b=0,p=d-1,q=e-1,h=t-1,c,b=0;b<e;b++)for(a=0;a<d;a++){switch(s){case j:c=h-(a*e+(q-b));break;case l:c=h-(b*d+(p-a));break;case o:c=h-(a*e+b);case n:c=h-(b*d+a);break;case i:c=a*e+b;break;case k:c=b*d+(p-a);break;case m:c=a*e+(q-b);break;default:c=b*d+a}g(r,c,[b,a])}return r};h.$FormationSwirl=function(q){var x=q.$Cols,y=q.$Rows,B=q.$Assembly,w=q.Ib,A=[],z=[],u=0,c=0,h=0,r=x-1,s=y-1,t,p,v=0;switch(B){case j:c=r;h=0;p=[f,a,e,b];break;case l:c=0;h=s;p=[b,e,a,f];break;case o:c=r;h=s;p=[e,a,f,b];break;case n:c=r;h=s;p=[a,e,b,f];break;case i:c=0;h=0;p=[f,b,e,a];break;case k:c=r;h=0;p=[a,f,b,e];break;case m:c=0;h=s;p=[e,b,f,a];break;default:c=0;h=0;p=[b,f,a,e]}u=0;while(u<w){t=h+","+c;if(c>=0&&c<x&&h>=0&&h<y&&!z[t]){z[t]=d;g(A,u++,[h,c])}else switch(p[v++%p.length]){case b:c--;break;case f:h--;break;case a:c++;break;case e:h++}switch(p[v%p.length]){case b:c++;break;case f:h++;break;case a:c--;break;case e:h--}}return A};h.$FormationZigZag=function(p){var w=p.$Cols,x=p.$Rows,z=p.$Assembly,v=p.Ib,t=[],u=0,c=0,d=0,q=w-1,r=x-1,y,h,s=0;switch(z){case j:c=q;d=0;h=[f,a,e,a];break;case l:c=0;d=r;h=[b,e,a,e];break;case o:c=q;d=r;h=[e,a,f,a];break;case n:c=q;d=r;h=[a,e,b,e];break;case i:c=0;d=0;h=[f,b,e,b];break;case k:c=q;d=0;h=[a,f,b,f];break;case m:c=0;d=r;h=[e,b,f,b];break;default:c=0;d=0;h=[b,f,a,f]}u=0;while(u<v){y=d+","+c;if(c>=0&&c<w&&d>=0&&d<x&&typeof t[y]=="undefined"){g(t,u++,[d,c]);switch(h[s%h.length]){case b:c++;break;case f:d++;break;case a:c--;break;case e:d--}}else{switch(h[s++%h.length]){case b:c--;break;case f:d--;break;case a:c++;break;case e:d++}switch(h[s++%h.length]){case b:c++;break;case f:d++;break;case a:c--;break;case e:d--}}}return t};h.$FormationStraightStairs=function(q){var u=q.$Cols,v=q.$Rows,e=q.$Assembly,t=q.Ib,r=[],s=0,c=0,d=0,f=u-1,h=v-1,x=t-1;switch(e){case j:case m:case o:case i:var a=0,b=0;break;case k:case l:case n:case p:var a=f,b=0;break;default:e=p;var a=f,b=0}c=a;d=b;while(s<t){if(z(e)||y(e))g(r,x-s++,[d,c]);else g(r,s++,[d,c]);switch(e){case j:case m:c--;d++;break;case o:case i:c++;d--;break;case k:case l:c--;d--;break;case p:case n:default:c++;d++}if(c<0||d<0||c>f||d>h){switch(e){case j:case m:a++;break;case k:case l:case o:case i:b++;break;case p:case n:default:a--}if(a<0||b<0||a>f||b>h){switch(e){case j:case m:a=f;b++;break;case o:case i:b=h;a++;break;case k:case l:b=h;a--;break;case p:case n:default:a=0;b++}if(b>h)b=h;else if(b<0)b=0;else if(a>f)a=f;else if(a<0)a=0}d=b;c=a}}return r};h.$FormationSquare=function(i){var a=i.$Cols||1,b=i.$Rows||1,j=[],d,e,f,h,k;f=a<b?(b-a)/2:0;h=a>b?(a-b)/2:0;k=c.round(c.max(a/2,b/2))+1;for(d=0;d<a;d++)for(e=0;e<b;e++)g(j,k-c.min(d+1+f,e+1+h,a-d+f,b-e+h),[e,d]);return j};h.$FormationRectangle=function(f){var d=f.$Cols||1,e=f.$Rows||1,h=[],a,b,i;i=c.round(c.min(d/2,e/2))+1;for(a=0;a<d;a++)for(b=0;b<e;b++)g(h,i-c.min(a+1,b+1,d-a,e-b),[b,a]);return h};h.$FormationRandom=function(d){for(var e=[],a,b=0;b<d.$Rows;b++)for(a=0;a<d.$Cols;a++)g(e,c.ceil(1e5*c.random())%13,[b,a]);return e};h.$FormationCircle=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,b=0;b<e;b++)for(a=0;a<f;a++)g(h,c.round(c.sqrt(c.pow(b-i,2)+c.pow(a-j,2))),[a,b]);return h};h.$FormationCross=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,b=0;b<e;b++)for(a=0;a<f;a++)g(h,c.round(c.min(c.abs(b-i),c.abs(a-j))),[a,b]);return h};h.$FormationRectangleCross=function(f){for(var h=f.$Cols||1,i=f.$Rows||1,j=[],a,d=h/2-.5,e=i/2-.5,k=c.max(d,e)+1,b=0;b<h;b++)for(a=0;a<i;a++)g(j,c.round(k-c.max(d-c.abs(b-d),e-c.abs(a-e)))-1,[a,b]);return j}};k.$JssorSlideshowRunner$=function(k,s,q,u,z){var f=this,v,g,a,y=0,x=u.$TransitionsOrder,r,h=8;function t(a){if(a.$Top)a.H=a.$Top;if(a.$Left)a.I=a.$Left;b.a(a,function(a){b.Yc(a)&&t(a)})}function i(g,f){var a={$Interval:f,$Duration:1,$Delay:0,$Cols:1,$Rows:1,$Opacity:0,$Zoom:0,$Clip:0,$Move:l,$SlideOut:l,$Reverse:l,$Formation:p.$FormationRandom,$Assembly:1032,$ChessMode:{$Column:0,$Row:0},$Easing:e.$EaseSwing,$Round:{},Kb:[],$During:{}};b.o(a,g);t(a);a.Ib=a.$Cols*a.$Rows;a.$Easing=b.fc(a.$Easing);a.Ud=c.ceil(a.$Duration/a.$Interval);a.Od=function(c,b){c/=a.$Cols;b/=a.$Rows;var f=c+"x"+b;if(!a.Kb[f]){a.Kb[f]={S:c,O:b};for(var d=0;d<a.$Cols;d++)for(var e=0;e<a.$Rows;e++)a.Kb[f][e+","+d]={$Top:e*b,$Right:d*c+c,$Bottom:e*b+b,$Left:d*c}}return a.Kb[f]};if(a.$Brother){a.$Brother=i(a.$Brother,f);a.$SlideOut=d}return a}function o(B,h,a,w,o,m){var z=this,u,v={},i={},n=[],f,e,s,q=a.$ChessMode.$Column||0,r=a.$ChessMode.$Row||0,g=a.Od(o,m),p=C(a),D=p.length-1,t=a.$Duration+a.$Delay*D,x=w+t,k=a.$SlideOut,y;x+=50;function C(a){var b=a.$Formation(a);return a.$Reverse?b.reverse():b}z.vd=x;z.dc=function(d){d-=w;var e=d<t;if(e||y){y=e;if(!k)d=t-d;var f=c.ceil(d/a.$Interval);b.a(i,function(a,e){var d=c.max(f,a.ke);d=c.min(d,a.length-1);if(a.ud!=d){if(!a.ud&&!k)b.u(n[e]);else d==a.ee&&k&&b.Q(n[e]);a.ud=d;b.K(n[e],a[d])}})}};h=b.Z(h);b.Eb(h,j);if(b.fb()){var E=!h["no-image"],A=b.Ng(h);b.a(A,function(a){(E||a["jssor-slider"])&&b.yb(a,b.yb(a),d)})}b.a(p,function(h,j){b.a(h,function(G){var K=G[0],J=G[1],t=K+","+J,n=l,p=l,x=l;if(q&&J%2){if(q&3)n=!n;if(q&12)p=!p;if(q&16)x=!x}if(r&&K%2){if(r&3)n=!n;if(r&12)p=!p;if(r&16)x=!x}a.$Top=a.$Top||a.$Clip&4;a.$Bottom=a.$Bottom||a.$Clip&8;a.$Left=a.$Left||a.$Clip&1;a.$Right=a.$Right||a.$Clip&2;var C=p?a.$Bottom:a.$Top,z=p?a.$Top:a.$Bottom,B=n?a.$Right:a.$Left,A=n?a.$Left:a.$Right;a.$Clip=C||z||B||A;s={};e={H:0,I:0,$Opacity:1,S:o,O:m};f=b.o({},e);u=b.o({},g[t]);if(a.$Opacity)e.$Opacity=2-a.$Opacity;if(a.$ZIndex){e.$ZIndex=a.$ZIndex;f.$ZIndex=0}var I=a.$Cols*a.$Rows>1||a.$Clip;if(a.$Zoom||a.$Rotate){var H=d;if(b.fb())if(a.$Cols*a.$Rows>1)H=l;else I=l;if(H){e.$Zoom=a.$Zoom?a.$Zoom-1:1;f.$Zoom=1;if(b.fb()||b.Dd())e.$Zoom=c.min(e.$Zoom,2);var N=a.$Rotate||0;e.$Rotate=N*360*(x?-1:1);f.$Rotate=0}}if(I){var h=u.Jb={};if(a.$Clip){var w=a.$ScaleClip||1;if(C&&z){h.$Top=g.O/2*w;h.$Bottom=-h.$Top}else if(C)h.$Bottom=-g.O*w;else if(z)h.$Top=g.O*w;if(B&&A){h.$Left=g.S/2*w;h.$Right=-h.$Left}else if(B)h.$Right=-g.S*w;else if(A)h.$Left=g.S*w}s.$Clip=u;f.$Clip=g[t]}var L=n?1:-1,M=p?1:-1;if(a.x)e.I+=o*a.x*L;if(a.y)e.H+=m*a.y*M;b.a(e,function(a,c){if(b.Hb(a))if(a!=f[c])s[c]=a-f[c]});v[t]=k?f:e;var D=a.Ud,y=c.round(j*a.$Delay/a.$Interval);i[t]=new Array(y);i[t].ke=y;i[t].ee=y+D-1;for(var F=0;F<=D;F++){var E=b.Tc(f,s,F/D,a.$Easing,a.$During,a.$Round,{$Move:a.$Move,$OriginalWidth:o,$OriginalHeight:m});E.$ZIndex=E.$ZIndex||1;i[t].push(E)}})});p.reverse();b.a(p,function(a){b.a(a,function(c){var f=c[0],e=c[1],d=f+","+e,a=h;if(e||f)a=b.Z(h);b.K(a,v[d]);b.kb(a,"hidden");b.B(a,"absolute");B.pe(a);n[d]=a;b.u(a,!k)})})}function w(){var b=this,c=0;m.call(b,0,v);b.Ub=function(d,b){if(b-c>h){c=b;a&&a.dc(b);g&&g.dc(b)}};b.yc=r}f.le=function(){var a=0,b=u.$Transitions,d=b.length;if(x)a=y++%d;else a=c.floor(c.random()*d);b[a]&&(b[a].ob=a);return b[a]};f.ge=function(w,x,l,m,b){r=b;b=i(b,h);var j=m.zd,e=l.zd;j["no-image"]=!m.Mb;e["no-image"]=!l.Mb;var n=j,p=e,u=b,d=b.$Brother||i({},h);if(!b.$SlideOut){n=e;p=j}var t=d.$Shift||0;g=new o(k,p,d,c.max(t-d.$Interval,0),s,q);a=new o(k,n,u,c.max(d.$Interval-t,0),s,q);g.dc(0);a.dc(0);v=c.max(g.vd,a.vd);f.ob=w};f.tb=function(){k.tb();g=j;a=j};f.Je=function(){var b=j;if(a)b=new w;return b};if(b.fb()||b.Dd()||z&&b.lf()<537)h=16;n.call(f);m.call(f,-1e7,1e7)};var i=k.$JssorSlider$=function(p,hc){var h=this;function Fc(){var a=this;m.call(a,-1e8,2e8);a.Le=function(){var b=a.qb(),d=c.floor(b),f=t(d),e=b-c.floor(b);return{ob:f,Xe:d,Db:e}};a.Ub=function(b,a){var e=c.floor(a);if(e!=a&&a>b)e++;Wb(e,d);h.l(i.$EVT_POSITION_CHANGE,t(a),t(b),a,b)}}function Ec(){var a=this;m.call(a,0,0,{pd:r});b.a(C,function(b){D&1&&b.Ae(r);a.rc(b);b.$Shift(gb/dc)})}function Dc(){var a=this,b=Vb.$Elmt;m.call(a,-1,2,{$Easing:e.$EaseLinear,Be:{Db:bc},pd:r},b,{Db:1},{Db:-2});a.Yb=b}function rc(o,n){var b=this,e,f,g,k,c;m.call(b,-1e8,2e8,{Fc:100});b.Qc=function(){O=d;R=j;h.l(i.$EVT_SWIPE_START,t(w.W()),w.W())};b.Kc=function(){O=l;k=l;var a=w.Le();h.l(i.$EVT_SWIPE_END,t(w.W()),w.W());!a.Db&&Hc(a.Xe,s)};b.Ub=function(i,h){var b;if(k)b=c;else{b=f;if(g){var d=h/g;b=a.$SlideEasing(d)*(f-e)+e}}w.D(b)};b.Ob=function(a,d,c,h){e=a;f=d;g=c;w.D(a);b.D(0);b.Lc(c,h)};b.ve=function(a){k=d;c=a;b.$Play(a,j,d)};b.ue=function(a){c=a};w=new Fc;w.wb(o);w.wb(n)}function sc(){var c=this,a=Zb();b.F(a,0);b.ab(a,"pointerEvents","none");c.$Elmt=a;c.pe=function(c){b.J(a,c);b.u(a)};c.tb=function(){b.Q(a);b.qc(a)}}function Bc(k,f){var e=this,q,H,x,o,y=[],w,B,W,G,Q,F,g,v,p;m.call(e,-u,u+1,{});function E(a){q&&q.Cd();T(k,a,0);F=d;q=new I.$Class(k,I,b.rg(b.j(k,"idle"))||qc);q.D(0)}function Y(){q.sc<I.sc&&E()}function N(p,r,n){if(!G){G=d;if(o&&n){var g=n.width,c=n.height,m=g,k=c;if(g&&c&&a.$FillMode){if(a.$FillMode&3&&(!(a.$FillMode&4)||g>K||c>J)){var j=l,q=K/J*c/g;if(a.$FillMode&1)j=q>1;else if(a.$FillMode&2)j=q<1;m=j?g*J/c:K;k=j?J:c*K/g}b.k(o,m);b.m(o,k);b.z(o,(J-k)/2);b.A(o,(K-m)/2)}b.B(o,"absolute");h.l(i.$EVT_LOAD_END,f)}}b.Q(r);p&&p(e)}function X(b,c,d,g){if(g==R&&s==f&&P)if(!Gc){var a=t(b);A.ge(a,f,c,e,d);c.Ye();U.$Shift(a-U.jc()-1);U.D(a);z.Ob(b,b,0)}}function ab(b){if(b==R&&s==f){if(!g){var a=j;if(A)if(A.ob==f)a=A.Je();else A.tb();Y();g=new zc(k,f,a,q);g.Fd(p)}!g.$IsPlaying()&&g.tc()}}function S(d,h,l){if(d==f){if(d!=h)C[h]&&C[h].De();else!l&&g&&g.Ke();p&&p.$Enable();var m=R=b.M();e.xb(b.E(j,ab,m))}else{var k=c.min(f,d),i=c.max(f,d),o=c.min(i-k,k+r-i),n=u+a.$LazyLoading-1;(!Q||o<=n)&&e.xb()}}function bb(){if(s==f&&g){g.pb();p&&p.$Quit();p&&p.$Disable();g.fd()}}function eb(){s==f&&g&&g.pb()}function Z(a){!M&&h.l(i.$EVT_CLICK,f,a)}function O(){p=v.pInstance;g&&g.Fd(p)}e.xb=function(c,a){a=a||x;if(y.length&&!G){b.u(a);if(!W){W=d;h.l(i.$EVT_LOAD_START,f);b.a(y,function(a){if(!b.v(a,"src")){a.src=b.j(a,"src2");b.T(a,a["display-origin"])}})}b.af(y,o,b.E(j,N,c,a))}else N(c,a)};e.Sd=function(){var h=f;if(a.$AutoPlaySteps<0)h-=r;var d=h+a.$AutoPlaySteps*xc;if(D&2)d=t(d);if(!(D&1)&&!db)d=c.max(0,c.min(d,r-u));if(d!=f){if(A){var e=A.le(r);if(e){var i=R=b.M(),g=C[t(d)];return g.xb(b.E(j,X,d,g,e,i),x)}}ob(d)}};e.Bc=function(){S(f,f,d)};e.De=function(){p&&p.$Quit();p&&p.$Disable();e.Hc();g&&g.de();g=j;E()};e.Ye=function(){b.Q(k)};e.Hc=function(){b.u(k)};e.fe=function(){p&&p.$Enable()};function T(a,c,e){if(b.v(a,"jssor-slider"))return;if(!F){if(a.tagName=="IMG"){y.push(a);if(!b.v(a,"src")){Q=d;a["display-origin"]=b.T(a);b.Q(a)}}b.fb()&&b.F(a,(b.F(a)||0)+1)}var f=b.Ab(a);b.a(f,function(f){var h=f.tagName,i=b.j(f,"u");if(i=="player"&&!v){v=f;if(v.pInstance)O();else b.c(v,"dataavailable",O)}if(i=="caption"){if(c){b.Ic(f,b.j(f,"to"));b.zf(f,b.j(f,"bf"));b.j(f,"3d")&&b.yf(f,"preserve-3d")}else if(!b.Nd()){var g=b.Z(f,l,d);b.Vb(g,f,a);b.zb(f,a);f=g;c=d}}else if(!F&&!e&&!o){if(h=="A"){if(b.j(f,"u")=="image")o=b.Jg(f,"IMG");else o=b.C(f,"image",d);if(o){w=f;b.T(w,"block");b.K(w,V);B=b.Z(w,d);b.B(w,"relative");b.yb(B,0);b.ab(B,"backgroundColor","#000")}}else if(h=="IMG"&&b.j(f,"u")=="image")o=f;if(o){o.border=0;b.K(o,V)}}T(f,c,e+1)})}e.nc=function(c,b){var a=u-b;bc(H,a)};e.ob=f;n.call(e);b.xf(k,b.j(k,"p"));b.qf(k,b.j(k,"po"));var L=b.C(k,"thumb",d);if(L){e.re=b.Z(L);b.Q(L)}b.u(k);x=b.Z(cb);b.F(x,1e3);b.c(k,"click",Z);E(d);e.Mb=o;e.Pc=B;e.zd=k;e.Yb=H=k;b.J(H,x);h.$On(203,S);h.$On(28,eb);h.$On(24,bb)}function zc(y,f,p,q){var a=this,n=0,u=0,g,j,e,c,k,t,r,o=C[f];m.call(a,0,0);function v(){b.qc(N);fc&&k&&o.Pc&&b.J(N,o.Pc);b.u(N,!k&&o.Mb)}function w(){a.tc()}function x(b){r=b;a.pb();a.tc()}a.tc=function(){var b=a.qb();if(!B&&!O&&!r&&s==f){if(!b){if(g&&!k){k=d;a.fd(d);h.l(i.$EVT_SLIDESHOW_START,f,n,u,g,c)}v()}var l,p=i.$EVT_STATE_CHANGE;if(b!=c)if(b==e)l=c;else if(b==j)l=e;else if(!b)l=j;else l=a.Hd();h.l(p,f,b,n,j,e,c);var m=P&&(!E||F);if(b==c)(e!=c&&!(E&12)||m)&&o.Sd();else(m||b!=e)&&a.Lc(l,w)}};a.Ke=function(){e==c&&e==a.qb()&&a.D(j)};a.de=function(){A&&A.ob==f&&A.tb();var b=a.qb();b<c&&h.l(i.$EVT_STATE_CHANGE,f,-b-1,n,j,e,c)};a.fd=function(a){p&&b.kb(ib,a&&p.yc.$Outside?"":"hidden")};a.nc=function(b,a){if(k&&a>=g){k=l;v();o.Hc();A.tb();h.l(i.$EVT_SLIDESHOW_END,f,n,u,g,c)}h.l(i.$EVT_PROGRESS_CHANGE,f,a,n,j,e,c)};a.Fd=function(a){if(a&&!t){t=a;a.$On($JssorPlayer$.se,x)}};p&&a.rc(p);g=a.Zb();a.rc(q);j=g+q.bd;e=g+q.hd;c=a.Zb()}function Mb(a,c,d){b.A(a,c);b.z(a,d)}function bc(c,b){var a=x>0?x:hb,d=Bb*b*(a&1),e=Cb*b*(a>>1&1);Mb(c,d,e)}function Rb(){qb=O;Kb=z.Hd();G=w.W()}function ic(){Rb();if(B||!F&&E&12){z.pb();h.l(i.gg)}}function gc(f){if(!B&&(F||!(E&12))&&!z.$IsPlaying()){var d=w.W(),b=c.ceil(G);if(f&&c.abs(H)>=a.$MinDragOffsetToSlide){b=c.ceil(d);b+=fb}if(!(D&1))b=c.min(r-u,c.max(b,0));var e=c.abs(b-d);e=1-c.pow(1-e,5);if(!M&&qb)z.Oe(Kb);else if(d==b){ub.fe();ub.Bc()}else z.Ob(d,b,e*Xb)}}function Ib(a){!b.j(b.mc(a),"nodrag")&&b.Pb(a)}function vc(a){ac(a,1)}function ac(a,c){a=b.Id(a);var k=b.mc(a);if(!L&&!b.j(k,"nodrag")&&wc()&&(!c||a.touches.length==1)){B=d;Ab=l;R=j;b.c(f,c?"touchmove":"mousemove",Db);b.M();M=0;ic();if(!qb)x=0;if(c){var g=a.touches[0];vb=g.clientX;wb=g.clientY}else{var e=b.Ed(a);vb=e.x;wb=e.y}H=0;bb=0;fb=0;h.l(i.$EVT_DRAG_START,t(G),G,a)}}function Db(e){if(B){e=b.Id(e);var f;if(e.type!="mousemove"){var l=e.touches[0];f={x:l.clientX,y:l.clientY}}else f=b.Ed(e);if(f){var j=f.x-vb,k=f.y-wb;if(c.floor(G)!=G)x=x||hb&L;if((j||k)&&!x){if(L==3)if(c.abs(k)>c.abs(j))x=2;else x=1;else x=L;if(kb&&x==1&&c.abs(k)-c.abs(j)>3)Ab=d}if(x){var a=k,i=Cb;if(x==1){a=j;i=Bb}if(!(D&1)){if(a>0){var g=i*s,h=a-g;if(h>0)a=g+c.sqrt(h)*5}if(a<0){var g=i*(r-u-s),h=-a-g;if(h>0)a=-g-c.sqrt(h)*5}}if(H-bb<-2)fb=0;else if(H-bb>2)fb=-1;bb=H;H=a;tb=G-H/i/(Z||1);if(H&&x&&!Ab){b.Pb(e);if(!O)z.ve(tb);else z.ue(tb)}}}}}function nb(){tc();if(B){B=l;b.M();b.R(f,"mousemove",Db);b.R(f,"touchmove",Db);M=H;z.pb();var a=w.W();h.l(i.$EVT_DRAG_END,t(a),a,t(G),G);E&12&&Rb();gc(d)}}function mc(c){if(M){b.rf(c);var a=b.mc(c);while(a&&v!==a){a.tagName=="A"&&b.Pb(c);try{a=a.parentNode}catch(d){break}}}}function Lb(a){C[s];s=t(a);ub=C[s];Wb(a);return s}function Hc(a,b){x=0;Lb(a);h.l(i.$EVT_PARK,t(a),b)}function Wb(a,c){yb=a;b.a(S,function(b){b.Ec(t(a),a,c)})}function wc(){var b=i.Zc||0,a=Y;if(kb)a&1&&(a&=1);i.Zc|=a;return L=a&~b}function tc(){if(L){i.Zc&=~Y;L=0}}function Zb(){var a=b.jb();b.K(a,V);b.B(a,"absolute");return a}function t(a){return(a%r+r)%r}function nc(b,d){if(d)if(!D){b=c.min(c.max(b+yb,0),r-u);d=l}else if(D&2){b=t(b+yb);d=l}ob(b,a.$SlideDuration,d)}function zb(){b.a(S,function(a){a.gc(a.Nb.$ChanceToShow<=F)})}function kc(){if(!F){F=1;zb();if(!B){E&12&&gc();E&3&&C[s].Bc()}}}function jc(){if(F){F=0;zb();B||!(E&12)||ic()}}function lc(){V={S:K,O:J,$Top:0,$Left:0};b.a(T,function(a){b.K(a,V);b.B(a,"absolute");b.kb(a,"hidden");b.Q(a)});b.K(cb,V)}function mb(b,a){ob(b,a,d)}function ob(h,f,k){if(Tb&&(!B&&(F||!(E&12))||a.$NaviQuitDrag)){O=d;B=l;z.pb();if(f==g)f=Xb;var e=Eb.qb(),b=h;if(k){b=e+h;if(h>0)b=c.ceil(b);else b=c.floor(b)}if(D&2)b=t(b);if(!(D&1))b=c.max(0,c.min(b,r-u));var j=(b-e)%r;b=e+j;var i=e==b?0:f*c.abs(j);i=c.min(i,f*u*1.5);z.Ob(e,b,i||1)}}h.$PlayTo=ob;h.$GoTo=function(a){w.D(Lb(a))};h.$Next=function(){mb(1)};h.$Prev=function(){mb(-1)};h.$Pause=function(){P=l};h.$Play=function(){if(!P){P=d;C[s]&&C[s].Bc()}};h.$SetSlideshowTransitions=function(b){a.$SlideshowOptions.$Transitions=b};h.$SetCaptionTransitions=function(a){I.$Transitions=a;I.sc=b.M()};h.$SlidesCount=function(){return T.length};h.$CurrentIndex=function(){return s};h.$IsAutoPlaying=function(){return P};h.$IsDragging=function(){return B};h.$IsSliding=function(){return O};h.$IsMouseOver=function(){return!F};h.$LastDragSucceded=function(){return M};function X(){return b.k(y||p)}function jb(){return b.m(y||p)}h.$OriginalWidth=h.$GetOriginalWidth=X;h.$OriginalHeight=h.$GetOriginalHeight=jb;function Gb(c,d){if(c==g)return b.k(p);if(!y){var a=b.jb(f);b.ad(a,b.ad(p));b.ac(a,b.ac(p));b.T(a,"block");b.B(a,"relative");b.z(a,0);b.A(a,0);b.kb(a,"visible");y=b.jb(f);b.B(y,"absolute");b.z(y,0);b.A(y,0);b.k(y,b.k(p));b.m(y,b.m(p));b.Ic(y,"0 0");b.J(y,a);var i=b.Ab(p);b.J(p,y);b.ab(p,"backgroundImage","");b.a(i,function(c){b.J(b.j(c,"noscale")?p:a,c);b.j(c,"autocenter")&&Nb.push(c)})}Z=c/(d?b.m:b.k)(y);b.pf(y,Z);var h=d?Z*X():c,e=d?c:Z*jb();b.k(p,h);b.m(p,e);b.a(Nb,function(a){var c=b.zc(b.j(a,"autocenter"));b.wg(a,c)})}h.$ScaleHeight=h.$GetScaleHeight=function(a){if(a==g)return b.m(p);Gb(a,d)};h.$ScaleWidth=h.$SetScaleWidth=h.$GetScaleWidth=Gb;h.kd=function(a){var d=c.ceil(t(gb/dc)),b=t(a-s+d);if(b>u){if(a-s>r/2)a-=r;else if(a-s<=-r/2)a+=r}else a=s+b-d;return a};n.call(h);h.$Elmt=p=b.gb(p);var a=b.o({$FillMode:0,$LazyLoading:1,$ArrowKeyNavigation:1,$StartIndex:0,$AutoPlay:l,$Loop:1,$HWA:d,$NaviQuitDrag:d,$AutoPlaySteps:1,$AutoPlayInterval:3e3,$PauseOnHover:1,$SlideDuration:500,$SlideEasing:e.$EaseOutQuad,$MinDragOffsetToSlide:20,$SlideSpacing:0,$Cols:1,$Align:0,$UISearchMode:1,$PlayOrientation:1,$DragOrientation:1},hc);a.$HWA=a.$HWA&&b.nf();if(a.$Idle!=g)a.$AutoPlayInterval=a.$Idle;if(a.$ParkingPosition!=g)a.$Align=a.$ParkingPosition;var hb=a.$PlayOrientation&3,xc=(a.$PlayOrientation&4)/-4||1,eb=a.$SlideshowOptions,I=b.o({$Class:q,$PlayInMode:1,$PlayOutMode:1,$HWA:a.$HWA},a.$CaptionSliderOptions);I.$Transitions=I.$Transitions||I.$CaptionTransitions;var rb=a.$BulletNavigatorOptions,W=a.$ArrowNavigatorOptions,ab=a.$ThumbnailNavigatorOptions,Q=!a.$UISearchMode,y,v=b.C(p,"slides",Q),cb=b.C(p,"loading",Q)||b.jb(f),Jb=b.C(p,"navigator",Q),ec=b.C(p,"arrowleft",Q),cc=b.C(p,"arrowright",Q),Hb=b.C(p,"thumbnavigator",Q),pc=b.k(v),oc=b.m(v),V,T=[],yc=b.Ab(v);b.a(yc,function(a){if(a.tagName=="DIV"&&!b.j(a,"u"))T.push(a);else b.fb()&&b.F(a,(b.F(a)||0)+1)});var s=-1,yb,ub,r=T.length,K=a.$SlideWidth||pc,J=a.$SlideHeight||oc,Yb=a.$SlideSpacing,Bb=K+Yb,Cb=J+Yb,dc=hb&1?Bb:Cb,u=c.min(a.$Cols,r),ib,x,L,Ab,S=[],Sb,Ub,Qb,fc,Gc,P,E=a.$PauseOnHover,qc=a.$AutoPlayInterval,Xb=a.$SlideDuration,sb,db,gb,Tb=u<r,D=Tb?a.$Loop:0,Y,M,F=1,O,B,R,vb=0,wb=0,H,bb,fb,Eb,w,U,z,Vb=new sc,Z,Nb=[];if(r){if(a.$HWA)Mb=function(a,c,d){b.Eb(a,{$TranslateX:c,$TranslateY:d})};P=a.$AutoPlay;h.Nb=hc;lc();b.v(p,"jssor-slider",d);b.F(v,b.F(v)||0);b.B(v,"absolute");ib=b.Z(v,d);b.Vb(ib,v);if(eb){fc=eb.$ShowLink;sb=eb.$Class;db=u==1&&r>1&&sb&&(!b.Nd()||b.Jd()>=8)}gb=db||u>=r||!(D&1)?0:a.$Align;Y=(u>1||gb?hb:-1)&a.$DragOrientation;var xb=v,C=[],A,N,Fb=b.kf(),kb=Fb.Wf,G,qb,Kb,tb;Fb.nd&&b.ab(xb,Fb.nd,([j,"pan-y","pan-x","none"])[Y]||"");U=new Dc;if(db)A=new sb(Vb,K,J,eb,kb);b.J(ib,U.Yb);b.kb(v,"hidden");N=Zb();b.ab(N,"backgroundColor","#000");b.yb(N,0);b.Vb(N,xb.firstChild,xb);for(var pb=0;pb<T.length;pb++){var Ac=T[pb],Cc=new Bc(Ac,pb);C.push(Cc)}b.Q(cb);Eb=new Ec;z=new rc(Eb,U);if(Y){b.c(v,"mousedown",ac);b.c(v,"touchstart",vc);b.c(v,"dragstart",Ib);b.c(v,"selectstart",Ib);b.c(f,"mouseup",nb);b.c(f,"touchend",nb);b.c(f,"touchcancel",nb);b.c(k,"blur",nb)}E&=kb?10:5;if(Jb&&rb){Sb=new rb.$Class(Jb,rb,X(),jb());S.push(Sb)}if(W&&ec&&cc){W.$Loop=D;W.$Cols=u;Ub=new W.$Class(ec,cc,W,X(),jb());S.push(Ub)}if(Hb&&ab){ab.$StartIndex=a.$StartIndex;Qb=new ab.$Class(Hb,ab);S.push(Qb)}b.a(S,function(a){a.wc(r,C,cb);a.$On(o.Lb,nc)});b.ab(p,"visibility","visible");Gb(X());b.c(v,"click",mc,d);b.c(p,"mouseout",b.Sb(kc,p));b.c(p,"mouseover",b.Sb(jc,p));zb();a.$ArrowKeyNavigation&&b.c(f,"keydown",function(b){if(b.keyCode==37)mb(-a.$ArrowKeyNavigation);else b.keyCode==39&&mb(a.$ArrowKeyNavigation)});var lb=a.$StartIndex;if(!(D&1))lb=c.max(0,c.min(lb,r-u));z.Ob(lb,lb,0)}};i.$EVT_CLICK=21;i.$EVT_DRAG_START=22;i.$EVT_DRAG_END=23;i.$EVT_SWIPE_START=24;i.$EVT_SWIPE_END=25;i.$EVT_LOAD_START=26;i.$EVT_LOAD_END=27;i.gg=28;i.$EVT_POSITION_CHANGE=202;i.$EVT_PARK=203;i.$EVT_SLIDESHOW_START=206;i.$EVT_SLIDESHOW_END=207;i.$EVT_PROGRESS_CHANGE=208;i.$EVT_STATE_CHANGE=209;var o={Lb:1};k.$JssorBulletNavigator$=function(e,C){var f=this;n.call(f);e=b.gb(e);var s,A,z,r,k=0,a,m,i,w,x,h,g,q,p,B=[],y=[];function v(a){a!=-1&&y[a].Jc(a==k)}function t(a){f.l(o.Lb,a*m)}f.$Elmt=e;f.Ec=function(a){if(a!=r){var d=k,b=c.floor(a/m);k=b;r=a;v(d);v(b)}};f.gc=function(a){b.u(e,a)};var u;f.wc=function(E){if(!u){s=c.ceil(E/m);k=0;var o=q+w,r=p+x,n=c.ceil(s/i)-1;A=q+o*(!h?n:i-1);z=p+r*(h?n:i-1);b.k(e,A);b.m(e,z);for(var f=0;f<s;f++){var C=b.Dg();b.Ig(C,f+1);var l=b.Gc(g,"numbertemplate",C,d);b.B(l,"absolute");var v=f%(n+1);b.A(l,!h?o*v:f%i*o);b.z(l,h?r*v:c.floor(f/(n+1))*r);b.J(e,l);B[f]=l;a.$ActionMode&1&&b.c(l,"click",b.E(j,t,f));a.$ActionMode&2&&b.c(l,"mouseover",b.Sb(b.E(j,t,f),l));y[f]=b.Tb(l)}u=d}};f.Nb=a=b.o({$SpacingX:10,$SpacingY:10,$Orientation:1,$ActionMode:1},C);g=b.C(e,"prototype");q=b.k(g);p=b.m(g);b.zb(g,e);m=a.$Steps||1;i=a.$Rows||1;w=a.$SpacingX;x=a.$SpacingY;h=a.$Orientation-1;a.$Scale==l&&b.v(e,"noscale",d);a.$AutoCenter&&b.v(e,"autocenter",a.$AutoCenter)};k.$JssorArrowNavigator$=function(a,g,h){var c=this;n.call(c);var r,q,e,f,i;b.k(a);b.m(a);function k(a){c.l(o.Lb,a,d)}function p(c){b.u(a,c||!h.$Loop&&e==0);b.u(g,c||!h.$Loop&&e>=q-h.$Cols);r=c}c.Ec=function(b,a,c){if(c)e=a;else{e=b;p(r)}};c.gc=p;var m;c.wc=function(c){q=c;e=0;if(!m){b.c(a,"click",b.E(j,k,-i));b.c(g,"click",b.E(j,k,i));b.Tb(a);b.Tb(g);m=d}};c.Nb=f=b.o({$Steps:1},h);i=f.$Steps;if(f.$Scale==l){b.v(a,"noscale",d);b.v(g,"noscale",d)}if(f.$AutoCenter){b.v(a,"autocenter",f.$AutoCenter);b.v(g,"autocenter",f.$AutoCenter)}};k.$JssorThumbnailNavigator$=function(g,B){var h=this,y,p,a,v=[],z,x,e,q,r,u,t,m,s,f,k;n.call(h);g=b.gb(g);function A(n,f){var g=this,c,m,l;function q(){m.Jc(p==f)}function i(d){if(d||!s.$LastDragSucceded()){var a=e-f%e,b=s.kd((f+a)/e-1),c=b*e+e-a;h.l(o.Lb,c)}}g.ob=f;g.qd=q;l=n.re||n.Mb||b.jb();g.Yb=c=b.Gc(k,"thumbnailtemplate",l,d);m=b.Tb(c);a.$ActionMode&1&&b.c(c,"click",b.E(j,i,0));a.$ActionMode&2&&b.c(c,"mouseover",b.Sb(b.E(j,i,1),c))}h.Ec=function(b,d,f){var a=p;p=b;a!=-1&&v[a].qd();v[b].qd();!f&&s.$PlayTo(s.kd(c.floor(d/e)))};h.gc=function(a){b.u(g,a)};var w;h.wc=function(F,D){if(!w){y=F;c.ceil(y/e);p=-1;m=c.min(m,D.length);var h=a.$Orientation&1,n=u+(u+q)*(e-1)*(1-h),k=t+(t+r)*(e-1)*h,B=n+(n+q)*(m-1)*h,o=k+(k+r)*(m-1)*(1-h);b.B(f,"absolute");b.kb(f,"hidden");a.$AutoCenter&1&&b.A(f,(z-B)/2);a.$AutoCenter&2&&b.z(f,(x-o)/2);b.k(f,B);b.m(f,o);var j=[];b.a(D,function(l,g){var i=new A(l,g),d=i.Yb,a=c.floor(g/e),k=g%e;b.A(d,(u+q)*k*(1-h));b.z(d,(t+r)*k*h);if(!j[a]){j[a]=b.jb();b.J(f,j[a])}b.J(j[a],d);v.push(i)});var E=b.o({$AutoPlay:l,$NaviQuitDrag:l,$SlideWidth:n,$SlideHeight:k,$SlideSpacing:q*h+r*(1-h),$MinDragOffsetToSlide:12,$SlideDuration:200,$PauseOnHover:1,$PlayOrientation:a.$Orientation,$DragOrientation:a.$NoDrag||a.$DisableDrag?0:a.$Orientation},a);s=new i(g,E);w=d}};h.Nb=a=b.o({$SpacingX:0,$SpacingY:0,$Cols:1,$Orientation:1,$AutoCenter:3,$ActionMode:1},B);z=b.k(g);x=b.m(g);f=b.C(g,"slides",d);k=b.C(f,"prototype");u=b.k(k);t=b.m(k);b.zb(k,f);e=a.$Rows||1;q=a.$SpacingX;r=a.$SpacingY;m=a.$Cols;a.$Scale==l&&b.v(g,"noscale",d)};function q(e,d,c){var a=this;m.call(a,0,c);a.Cd=b.Sc;a.bd=0;a.hd=c}k.$JssorCaptionSlideo$=function(n,f,l){var a=this,o,g={},i=f.$Transitions,c=new m(0,0);m.call(a,0,0);function j(d,c){var a={};b.a(d,function(d,f){var e=g[f];if(e){if(b.Yc(d))d=j(d,c||f=="e");else if(c)if(b.Hb(d))d=o[d];a[e]=d}});return a}function k(e,c){var a=[],d=b.Ab(e);b.a(d,function(d){var h=b.j(d,"u")=="caption";if(h){var e=b.j(d,"t"),g=i[b.zc(e)]||i[e],f={$Elmt:d,yc:g};a.push(f)}if(c<5)a=a.concat(k(d,c+1))});return a}function r(e,f,a){b.a(f,function(h){var f=b.o(d,{},j(h)),g=b.fc(f.$Easing);delete f.$Easing;if(f.$Left){f.I=f.$Left;g.I=g.$Left;delete f.$Left}if(f.$Top){f.H=f.$Top;g.H=g.$Top;delete f.$Top}var i={$Easing:g,$OriginalWidth:a.S,$OriginalHeight:a.O},k=new m(h.b,h.d,i,e,a,f);c.wb(k);a=b.ze(a,f)});return a}function q(a){b.a(a,function(f){var a=f.$Elmt,e=b.k(a),d=b.m(a),c={$Left:b.A(a),$Top:b.z(a),I:0,H:0,$Opacity:1,$ZIndex:b.F(a)||0,$Rotate:0,$RotateX:0,$RotateY:0,$ScaleX:1,$ScaleY:1,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0,S:e,O:d,$Clip:{$Top:0,$Right:e,$Bottom:d,$Left:0}};c.gd=c.$Left;c.Uc=c.$Top;r(a,f.yc,c)})}function t(g,f,h){var e=g.b-f;if(e){var b=new m(f,e);b.wb(c,d);b.$Shift(h);a.wb(b)}a.Fe(g.d);return e}function s(f){var d=c.jc(),e=0;b.a(f,function(c,f){c=b.o({d:l},c);t(c,d,e);d=c.b;e+=c.d;if(!f||c.t==2){a.bd=d;a.hd=d+c.d}})}a.Cd=function(){a.D(-1,d)};o=[h.$Swing,h.$Linear,h.$InQuad,h.$OutQuad,h.$InOutQuad,h.$InCubic,h.$OutCubic,h.$InOutCubic,h.$InQuart,h.$OutQuart,h.$InOutQuart,h.$InQuint,h.$OutQuint,h.$InOutQuint,h.$InSine,h.$OutSine,h.$InOutSine,h.$InExpo,h.$OutExpo,h.$InOutExpo,h.$InCirc,h.$OutCirc,h.$InOutCirc,h.$InElastic,h.$OutElastic,h.$InOutElastic,h.$InBack,h.$OutBack,h.$InOutBack,h.$InBounce,h.$OutBounce,h.$InOutBounce,h.$GoBack,h.$InWave,h.$OutWave,h.$OutJump,h.$InJump];var u={$Top:"y",$Left:"x",$Bottom:"m",$Right:"t",$Rotate:"r",$RotateX:"rX",$RotateY:"rY",$ScaleX:"sX",$ScaleY:"sY",$TranslateX:"tX",$TranslateY:"tY",$TranslateZ:"tZ",$SkewX:"kX",$SkewY:"kY",$Opacity:"o",$Easing:"e",$ZIndex:"i",$Clip:"c"};b.a(u,function(b,a){g[b]=a});q(k(n,1));c.D(-1);var p=f.$Breaks||[],e=[].concat(p[b.zc(b.j(n,"b"))]||[]);e.push({b:c.Zb(),d:e.length?0:l});s(e);a.D(-1)}})(window,document,Math,null,true,false)
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//





$('table a .sizeimg').hide();

$('table a').click(function() {
    var _this = $(this);
    _this.children().slideToggle();

    $('a > .sizeimg').not(_this).children('.sizeimg').show();
});
