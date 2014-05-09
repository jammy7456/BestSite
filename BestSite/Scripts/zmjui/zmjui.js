zmj = {
	components: {},
	uids: {},
	ux: {},
	isReady: false,
	byClass: function(_, $) {
		if (typeof $ == "string") $ = $iw($);
		return jQuery("." + _, $)[0]
	},
	getComponents: function() {
		var _ = [];
		for (var A in zmj.components) {
			var $ = zmj.components[A];
			_.push($)
		}
		return _
	},
	get: function(_) {
		if (!_) return null;
		if (zmj.isControl(_)) return _;
		if (typeof _ == "string") if (_.charAt(0) == "#") _ = _.substr(1);
		if (typeof _ == "string") return zmj.components[_];
		else {
			var $ = zmj.uids[_.uid];
			if ($ && $.el == _) return $
		}
		return null
	},
	getbyUID: function($) {
		return zmj.uids[$]
	},
	findControls: function(E, B) {
		if (!E) return [];
		B = B || zmj;
		var $ = [],
		D = zmj.uids;
		for (var A in D) {
			var _ = D[A],
			C = E[KQk](B, _);
			if (C === true || C === 1) {
				$.push(_);
				if (C === 1) break
			}
		}
		return $
	},
	emptyFn: function() {},
	createNameControls: function(A, F) {
		if (!A || !A.el) return;
		if (!F) F = "_";
		var C = A.el,
		$ = zmj.findControls(function($) {
			if (!$.el || !$.name) return false;
			if (EjQz(C, $.el)) return true;
			return false
		});
		for (var _ = 0, D = $.length; _ < D; _++) {
			var B = $[_],
			E = F + B.name;
			if (F === true) E = B.name[0].toUpperCase() + B.name.substring(1, B.name.length);
			A[E] = B
		}
	},
	getbyName: function(C, _) {
		var B = zmj.isControl(_),
		A = _;
		if (_ && B) _ = _.el;
		_ = $iw(_);
		_ = _ || document.body;
		var $ = this.findControls(function($) {
			if (!$.el) return false;
			if ($.name == C && EjQz(_, $.el)) return 1;
			return false
		},
		this);
		if (B && $.length == 0 && A && A.getbyName) return A.getbyName(C);
		return $[0]
	},
	getParams: function(C) {
		if (!C) C = location.href;
		C = C.split("?")[1];
		var B = {};
		if (C) {
			var A = C.split("&");
			for (var _ = 0, D = A.length; _ < D; _++) {
				var $ = A[_].split("=");
				B[$[0]] = decodeURIComponent($[1])
			}
		}
		return B
	},
	reg: function($) {
		this.components[$.id] = $;
		this.uids[$.uid] = $
	},
	unreg: function($) {
		delete zmj.components[$.id];
		delete zmj.uids[$.uid]
	},
	classes: {},
	uiClasses: {},
	getClass: function($) {
		if (!$) return null;
		return this.classes[$.toLowerCase()]
	},
	getClassByUICls: function($) {
		return this.uiClasses[$.toLowerCase()]
	},
	idPre: "zmj-",
	idIndex: 1,
	newId: function($) {
		return ($ || this.idPre) + this.idIndex++
	},
	copyTo: function($, A) {
		if ($ && A) for (var _ in A) $[_] = A[_];
		return $
	},
	copyIf: function($, A) {
		if ($ && A) for (var _ in A) if (zmj.isNull($[_])) $[_] = A[_];
		return $
	},
	createDelegate: function(_, $) {
		if (!_) return function() {};
		return function() {
			return _.apply($, arguments)
		}
	},
	isControl: function($) {
		return !! ($ && $.isControl)
	},
	isElement: function($) {
		return $ && $.appendChild
	},
	isDate: function($) {
		return $ && $.getFullYear
	},
	isArray: function($) {
		return $ && !!$.unshift
	},
	isNull: function($) {
		return $ === null || $ === undefined
	},
	isNumber: function($) {
		return ! isNaN($) && typeof $ == "number"
	},
	isEquals: function($, _) {
		if ($ !== 0 && _ !== 0) if ((zmj.isNull($) || $ == "") && (zmj.isNull(_) || _ == "")) return true;
		if ($ && _ && $.getFullYear && _.getFullYear) return $.getTime() === _.getTime();
		if (typeof $ == "object" && typeof _ == "object" && $ === _) return true;
		return String($) === String(_)
	},
	forEach: function(E, D, B) {
		var _ = E.clone();
		for (var A = 0, C = _.length; A < C; A++) {
			var $ = _[A];
			if (D[KQk](B, $, A, E) === false) break
		}
	},
	sort: function(A, _, $) {
		$ = $ || A;
		A.sort(_)
	},
	removeNode: function($) {
		jQuery($).remove()
	},
	elWarp: document.createElement("div")
};
Cmk = function(A, _) {
	_ = _.toLowerCase();
	if (!zmj.classes[_]) {
		zmj.classes[_] = A;
		A[Yq].type = _
	}
	var $ = A[Yq].uiCls;
	if (!zmj.isNull($) && !zmj.uiClasses[$]) zmj.uiClasses[$] = A
};
HX_P = function(E, A, $) {
	if (typeof A != "function") return this;
	var D = E,
	C = D.prototype,
	_ = A[Yq];
	if (D[CPy] == _) return;
	D[CPy] = _;
	D[CPy][CLu] = A;
	for (var B in _) C[B] = _[B];
	if ($) for (B in $) C[B] = $[B];
	return D
};
zmj.copyTo(zmj, {
	extend: HX_P,
	regClass: Cmk,
	debug: false
});
EfMi = [];
TQ = function(_, $) {
	EfMi.push([_, $]);
	if (!zmj._EventTimer) zmj._EventTimer = setTimeout(function() {
		Pbl8()
	},
	1)
};
Pbl8 = function() {
	for (var $ = 0, _ = EfMi.length; $ < _; $++) {
		var A = EfMi[$];
		A[0][KQk](A[1])
	}
	EfMi = [];
	zmj._EventTimer = null
};
MO = function(C) {
	if (typeof C != "string") return null;
	var _ = C.split("."),
	D = null;
	for (var $ = 0, A = _.length; $ < A; $++) {
		var B = _[$];
		if (!D) D = window[B];
		else D = D[B];
		if (!D) break
	}
	return D
};
zmj.getAndCreate = function($) {
	if (!$) return null;
	if (typeof $ == "string") return zmj.components[$];
	if (typeof $ == "object") if (zmj.isControl($)) return $;
	else if (zmj.isElement($)) return zmj.uids[$.uid];
	else return zmj.create($);
	return null
};
zmj.create = function($) {
	if (!$) return null;
	if (zmj.get($.id) === $) return $;
	var _ = this.getClass($.type);
	if (!_) return null;
	var A = new _();
	A.set($);
	return A
};
zmj.append = function(_, A) {
	_ = $iw(_);
	if (!A || !_) return;
	if (typeof A == "string") {
		if (A.charAt(0) == "#") {
			A = $iw(A);
			if (!A) return;
			_.appendChild(A);
			return A
		} else {
			if (A.indexOf("<tr") == 0) {
				return jQuery(_).append(A)[0].lastChild;
				return
			}
			var $ = document.createElement("div");
			$.innerHTML = A;
			A = $.firstChild;
			while ($.firstChild) _.appendChild($.firstChild);
			return A
		}
	} else {
		_.appendChild(A);
		return A
	}
};
zmj.prepend = function(_, A) {
	if (typeof A == "string") if (A.charAt(0) == "#") A = $iw(A);
	else {
		var $ = document.createElement("div");
		$.innerHTML = A;
		A = $.firstChild
	}
	return jQuery(_).prepend(A)[0].firstChild
};
var ICLd = "getBottomVisibleColumns",
VsL = "setFrozenStartColumn",
Nb9 = "showCollapseButton",
CTa = "showFolderCheckBox",
ZPu = "setFrozenEndColumn",
Ph$L = "getAncestorColumns",
Ys = "getFilterRowHeight",
WlX = "checkSelectOnLoad",
Dgs = "frozenStartColumn",
Vvds = "allowResizeColumn",
CiD3 = "showExpandButtons",
Wr = "requiredErrorText",
Tzos = "getMaxColumnLevel",
RbZ = "isAncestorColumn",
WGs = "allowAlternating",
U8KO = "getBottomColumns",
QVw = "isShowRowDetail",
SUs = "allowCellSelect",
M3X = "showAllCheckBox",
WGh = "frozenEndColumn",
GUE = "allowMoveColumn",
SA = "allowSortColumn",
Q5 = "refreshOnExpand",
DgkX = "showCloseButton",
HvG = "unFrozenColumns",
UBA = "getParentColumn",
Iy7 = "isVisibleColumn",
Jd = "getFooterHeight",
USh = "getHeaderHeight",
J1Ks = "_createColumnId",
_7 = "getRowDetailEl",
Osq = "scrollIntoView",
ZHC = "setColumnWidth",
QFOk = "setCurrentCell",
OLpo = "allowRowSelect",
VTo = "showSummaryRow",
BJ = "showVGridLines",
ANs = "showHGridLines",
VsK = "checkRecursive",
ZeW = "enableHotTrack",
Dhw = "popupMaxHeight",
Y2s = "popupMinHeight",
VKk = "refreshOnClick",
PL6 = "getColumnWidth",
BG9 = "getEditRowData",
_$JS = "getParentNode",
_k_ = "removeNodeCls",
AmKa = "showRowDetail",
D2$ = "hideRowDetail",
H8k = "commitEditRow",
I3J1 = "beginEditCell",
YVm = "allowCellEdit",
NYG = "decimalPlaces",
SdU = "showFilterRow",
R$f = "dropGroupName",
FoV = "dragGroupName",
YSY = "showTreeLines",
E4e8 = "popupMaxWidth",
TWk6 = "popupMinWidth",
KomI = "showMinButton",
Z2s = "showMaxButton",
P8pq = "getChildNodes",
GGy = "getCellEditor",
IWy$ = "cancelEditRow",
UIb = "getRowByValue",
Vsqn = "removeItemCls",
VcN = "_createCellId",
JqY = "_createItemId",
OmGq = "setValueField",
Ss = "getAncestors",
VCH = "collapseNode",
$jrs = "removeRowCls",
GUMO = "getColumnBox",
D6e = "showCheckBox",
TgO = "autoCollapse",
ZRq = "showTreeIcon",
Cl = "checkOnClick",
Oau = "defaultValue",
SN = "resultAsData",
RLR = "resultAsTree",
W5cB = "_ParseString",
_p = "getItemValue",
_h2c = "_createRowId",
Uw = "isAutoHeight",
H0 = "findListener",
AHM = "getRegionEl",
MLy = "removeClass",
Dit = "isFirstNode",
DNU = "getSelected",
Xi = "setSelected",
R0PE = "multiSelect",
IM = "tabPosition",
O$mJ = "columnWidth",
T0y = "handlerSize",
Fa = "allowSelect",
W4I = "popupHeight",
H26 = "contextMenu",
Ld = "borderStyle",
UOB = "parentField",
VO7y = "closeAction",
MWbB = "_rowIdField",
URW = "allowResize",
WE7O = "showToolbar",
FqM = "deselectAll",
Zk = "treeToArray",
Q6 = "eachColumns",
RZH1 = "getItemText",
Wc = "isAutoWidth",
GX = "_initEvents",
CLu = "constructor",
GJ$ = "addNodeCls",
Mwv = "expandNode",
KsL = "setColumns",
ISW = "cancelEdit",
H1B = "moveColumn",
Vj = "removeNode",
WMY = "setCurrent",
Jju = "totalCount",
Z9D = "popupWidth",
Eh = "titleField",
Aqt = "valueField",
_CL = "showShadow",
EzY = "showFooter",
Er = "findParent",
P0S = "_getColumn",
D4q = "_ParseBool",
L4D = "clearEvent",
BDHC = "getCellBox",
FV3 = "selectText",
FJhD = "setVisible",
HuC = "isGrouping",
Jq8 = "addItemCls",
FURX = "isSelected",
BUK = "isReadOnly",
CPy = "superclass",
OBrZ = "getRegion",
ECE = "isEditing",
$SI = "hidePopup",
HtDD = "removeRow",
BT5 = "addRowCls",
Rjy = "increment",
XAq_ = "allowDrop",
S9 = "pageIndex",
Sz = "iconStyle",
Gr = "errorMode",
Uc9 = "textField",
BZ = "groupName",
P9A_ = "showEmpty",
$RmY = "emptyText",
Lrs = "showModal",
ES6s = "getColumn",
KjJg = "getHeight",
PI = "_ParseInt",
Dh = "showPopup",
FJM = "updateRow",
R$ = "deselects",
F9lZ = "isDisplay",
BrQ = "setHeight",
T07 = "removeCls",
Yq = "prototype",
HJ = "addClass",
U2 = "isEquals",
I2m = "maxValue",
Hsy_ = "minValue",
BD = "showBody",
Qo = "tabAlign",
AGX = "sizeList",
HeC = "pageSize",
BCm = "urlField",
E8L = "readOnly",
BMK = "getWidth",
AjT = "isFrozen",
YIu = "loadData",
Nlip = "deselect",
NHk2 = "setValue",
WRj0 = "validate",
YIb = "getAttrs",
GaK6 = "setWidth",
J_w = "doUpdate",
X5Q = "doLayout",
QiR = "renderTo",
Vh = "setText",
Ga3p = "idField",
AK85 = "getNode",
VzbR = "getItem",
USz = "repaint",
HXHS = "selects",
Uj = "setData",
QjIH = "_create",
Wsj = "destroy",
Ghv = "jsName",
I3Ov = "getRow",
D3f = "select",
Oan4 = "within",
B1z = "addCls",
_B9 = "render",
GzmA = "setXY",
KQk = "call";
Ltw2 = function() {
	this.PORz = {};
	this.uid = zmj.newId(this.VQK);
	if (!this.id) this.id = this.uid;
	zmj.reg(this)
};
Ltw2[Yq] = {
	isControl: true,
	id: null,
	VQK: "zmj-",
	WPYM: false,
	X0O: true,
	set: function(B) {
		if (typeof B == "string") return this;
		var _ = this.YA6;
		this.YA6 = false;
		var C = B[QiR] || B[_B9];
		delete B[QiR];
		delete B[_B9];
		for (var $ in B) if ($.toLowerCase().indexOf("on") == 0) {
			var F = B[$];
			this.on($.substring(2, $.length).toLowerCase(), F);
			delete B[$]
		}
		for ($ in B) {
			var E = B[$],
			D = "set" + $.charAt(0).toUpperCase() + $.substring(1, $.length),
			A = this[D];
			if (A) A[KQk](this, E);
			else this[$] = E
		}
		if (C && this[_B9]) this[_B9](C);
		this.YA6 = _;
		if (this[X5Q]) this[X5Q]();
		return this
	},
	fire: function(A, B) {
		if (this.X0O == false) return;
		A = A.toLowerCase();
		var _ = this.PORz[A];
		if (_) {
			if (!B) B = {};
			if (B && B != this) {
				B.source = B.sender = this;
				if (!B.type) B.type = A
			}
			for (var $ = 0, D = _.length; $ < D; $++) {
				var C = _[$];
				if (C) C[0].apply(C[1], [B])
			}
		}
	},
	on: function(type, fn, scope) {
		if (typeof fn == "string") {
			var f = MO(fn);
			if (!f) {
				var id = zmj.newId("__str_");
				window[id] = fn;
				eval("fn = function(e){var s = " + id + ";var fn = MO(s); if(fn) {fn[KQk](this,e)}else{eval(s);}}")
			} else fn = f
		}
		if (typeof fn != "function" || !type) return false;
		type = type.toLowerCase();
		var event = this.PORz[type];
		if (!event) event = this.PORz[type] = [];
		scope = scope || this;
		if (!this[H0](type, fn, scope)) event.push([fn, scope]);
		return this
	},
	un: function($, C, _) {
		if (typeof C != "function") return false;
		$ = $.toLowerCase();
		var A = this.PORz[$];
		if (A) {
			_ = _ || this;
			var B = this[H0]($, C, _);
			if (B) A.remove(B)
		}
		return this
	},
	findListener: function(A, E, B) {
		A = A.toLowerCase();
		B = B || this;
		var _ = this.PORz[A];
		if (_) for (var $ = 0, D = _.length; $ < D; $++) {
			var C = _[$];
			if (C[0] === E && C[1] === B) return C
		}
	},
	setId: function($) {
		if (!$) throw new Error("id not null");
		if (this.WPYM) throw new Error("id just set only one");
		zmj["unreg"](this);
		this.id = $;
		if (this.el) this.el.id = $;
		if (this.UQj) this.UQj.id = $ + "$text";
		if (this.SA3) this.SA3.id = $ + "$value";
		this.WPYM = true;
		zmj.reg(this)
	},
	getId: function() {
		return this.id
	},
	destroy: function() {
		zmj["unreg"](this);
		this.fire("destroy")
	}
};
ET = function() {
	ET[CPy][CLu][KQk](this);
	this[QjIH]();
	this.el.uid = this.uid;
	this[GX]();
	if (this._clearBorder) this.el.style.borderWidth = "0";
	this[B1z](this.uiCls);
	this[GaK6](this.width);
	this[BrQ](this.height);
	this.el.style.display = this.visible ? this.C1Q: "none"
};
HX_P(ET, Ltw2, {
	jsName: null,
	width: "",
	height: "",
	visible: true,
	readOnly: false,
	enabled: true,
	tooltip: "",
	GS: "zmj-readonly",
	UP0_: "zmj-disabled",
	_create: function() {
		this.el = document.createElement("div")
	},
	_initEvents: function() {},
	within: function($) {
		if (EjQz(this.el, $.target)) return true;
		return false
	},
	name: "",
	setName: function($) {
		this.name = $
	},
	getName: function() {
		return this.name
	},
	isAutoHeight: function() {
		var $ = this.el.style.height;
		return $ == "auto" || $ == ""
	},
	isAutoWidth: function() {
		var $ = this.el.style.width;
		return $ == "auto" || $ == ""
	},
	isFixedSize: function() {
		var $ = this.width,
		_ = this.height;
		if (parseInt($) + "px" == $ && parseInt(_) + "px" == _) return true;
		return false
	},
	isRender: function($) {
		return !! (this.el && this.el.parentNode && this.el.parentNode.tagName)
	},
	render: function(_, $) {
		if (typeof _ === "string") if (_ == "#body") _ = document.body;
		else _ = $iw(_);
		if (!_) return;
		if (!$) $ = "append";
		$ = $.toLowerCase();
		if ($ == "before") jQuery(_).before(this.el);
		else if ($ == "preend") jQuery(_).preend(this.el);
		else if ($ == "after") jQuery(_).after(this.el);
		else _.appendChild(this.el);
		this.el.id = this.id;
		this[X5Q]();
		this.fire("render")
	},
	getEl: function() {
		return this.el
	},
	setJsName: function($) {
		this[Ghv] = $;
		window[$] = this
	},
	getJsName: function() {
		return this[Ghv]
	},
	setTooltip: function($) {
		this.tooltip = $;
		this.el.title = $
	},
	getTooltip: function() {
		return this.tooltip
	},
	_sizeChaned: function() {
		this[X5Q]()
	},
	setWidth: function($) {
		if (parseInt($) == $) $ += "px";
		this.width = $;
		this.el.style.width = $;
		this._sizeChaned()
	},
	getWidth: function(_) {
		var $ = _ ? jQuery(this.el).width() : jQuery(this.el).outerWidth();
		if (_ && this.AE) {
			var A = WN(this.AE);
			$ = $ - A.left - A.right
		}
		return $
	},
	setHeight: function($) {
		if (parseInt($) == $) $ += "px";
		this.height = $;
		this.el.style.height = $;
		this._sizeChaned()
	},
	getHeight: function(_) {
		var $ = _ ? jQuery(this.el).height() : jQuery(this.el).outerHeight();
		if (_ && this.AE) {
			var A = WN(this.AE);
			$ = $ - A.top - A.bottom
		}
		return $
	},
	getBox: function() {
		return Vhwd(this.el)
	},
	setBorderStyle: function($) {
		var _ = this.AE || this.el;
		DTHl(_, $);
		this[X5Q]()
	},
	getBorderStyle: function() {
		return this[Ld]
	},
	_clearBorder: true,
	setStyle: function($) {
		this.style = $;
		DTHl(this.el, $);
		if (this._clearBorder) this.el.style.borderWidth = "0";
		this.width = this.el.style.width;
		this.height = this.el.style.height;
		this._sizeChaned()
	},
	getStyle: function() {
		return this.style
	},
	setCls: function($) {
		Kw(this.el, this.cls);
		_I(this.el, $);
		this.cls = $
	},
	getCls: function() {
		return this.cls
	},
	addCls: function($) {
		_I(this.el, $)
	},
	removeCls: function($) {
		Kw(this.el, $)
	},
	_doReadOnly: function() {
		if (this[E8L]) this[B1z](this.GS);
		else this[T07](this.GS)
	},
	setReadOnly: function($) {
		this[E8L] = $;
		this._doReadOnly()
	},
	getReadOnly: function() {
		return this[E8L]
	},
	getParent: function(A) {
		var $ = document,
		B = this.el.parentNode;
		while (B != $ && B != null) {
			var _ = zmj.get(B);
			if (_) {
				if (!zmj.isControl(_)) return null;
				if (!A || _.uiCls == A) return _
			}
			B = B.parentNode
		}
		return null
	},
	isReadOnly: function() {
		if (this[E8L] || !this.enabled) return true;
		var $ = this.getParent();
		if ($) return $[BUK]();
		return false
	},
	setEnabled: function($) {
		this.enabled = $;
		if (this.enabled) this[T07](this.UP0_);
		else this[B1z](this.UP0_);
		this._doReadOnly()
	},
	getEnabled: function() {
		return this.enabled
	},
	enable: function() {
		this.setEnabled(true)
	},
	disable: function() {
		this.setEnabled(false)
	},
	C1Q: "",
	setVisible: function($) {
		this.visible = $;
		if (this.el) {
			this.el.style.display = $ ? this.C1Q: "none";
			this[X5Q]()
		}
	},
	getVisible: function() {
		return this.visible
	},
	show: function() {
		this[FJhD](true)
	},
	hide: function() {
		this[FJhD](false)
	},
	isDisplay: function() {
		if (UUg == false) return false;
		var $ = document.body,
		_ = this.el;
		while (1) {
			if (_ == null || !_.style) return false;
			if (_ && _.style && _.style.display == "none") return false;
			if (_ == $) return true;
			_ = _.parentNode
		}
		return true
	},
	Djl: true,
	beginUpdate: function() {
		this.Djl = false
	},
	endUpdate: function() {
		this.Djl = true;
		this[J_w]()
	},
	doUpdate: function() {},
	canLayout: function() {
		if (this.YA6 == false) return false;
		return this[F9lZ]()
	},
	doLayout: function() {},
	layoutChanged: function() {
		if (this.canLayout() == false) return;
		this[X5Q]()
	},
	destroy: function(_) {
		if (this.el);
		if (this.el) {
			zmj[L4D](this.el);
			if (_ !== false) {
				var $ = this.el.parentNode;
				if ($) $.removeChild(this.el)
			}
		}
		this.AE = null;
		this.el = null;
		zmj["unreg"](this);
		this.fire("destroy")
	},
	focus: function() {
		try {
			var $ = this;
			$.el.focus()
		} catch(_) {}
	},
	blur: function() {
		try {
			var $ = this;
			$.el.blur()
		} catch(_) {}
	},
	allowAnim: true,
	setAllowAnim: function($) {
		this.allowAnim = $
	},
	getAllowAnim: function() {
		return this.allowAnim
	},
	Nv: function() {
		return this.el
	},
	mask: function($) {
		if (typeof $ == "string") $ = {
			html: $
		};
		$ = $ || {};
		$.el = this.Nv();
		if (!$.cls) $.cls = this.GRA;
		zmj.mask($)
	},
	unmask: function() {
		zmj.unmask(this.Nv())
	},
	GRA: "zmj-mask-loading",
	loadingMsg: "Loading...",
	loading: function($) {
		this.mask($ || this.loadingMsg)
	},
	setLoadingMsg: function($) {
		this.loadingMsg = $
	},
	getLoadingMsg: function() {
		return this.loadingMsg
	},
	_getContextMenu: function($) {
		var _ = $;
		if (typeof $ == "string") {
			_ = zmj.get($);
			if (!_) {
				zmj.parse($);
				_ = zmj.get($)
			}
		} else if (zmj.isArray($)) _ = {
			type: "menu",
			items: $
		};
		else if (!zmj.isControl($)) _ = zmj.create($);
		return _
	},
	__OnHtmlContextMenu: function(_) {
		var $ = {
			popupEl: this.el,
			htmlEvent: _,
			cancel: false
		};
		this[H26].fire("BeforeOpen", $);
		if ($.cancel == true) return;
		this[H26].fire("opening", $);
		if ($.cancel == true) return;
		this[H26].showAtPos(_.pageX, _.pageY);
		this[H26].fire("Open", $);
		return false
	},
	contextMenu: null,
	setContextMenu: function($) {
		var _ = this._getContextMenu($);
		if (!_) return;
		if (this[H26] !== _) {
			this[H26] = _;
			this[H26].owner = this;
			WoBw(this.el, "contextmenu", this.__OnHtmlContextMenu, this)
		}
	},
	getContextMenu: function() {
		return this[H26]
	},
	setDefaultValue: function($) {
		this[Oau] = $
	},
	getDefaultValue: function() {
		return this[Oau]
	},
	setValue: function($) {
		this.value = $
	},
	getValue: function() {
		return this.value
	},
	RsE: function($) {},
	getAttrs: function(C) {
		var I = {},
		F = C.className;
		if (F) I.cls = F;
		zmj[W5cB](C, I, ["id", "name", "width", "height", "borderStyle", "value", "defaultValue", "contextMenu", "tooltip"]);
		zmj[D4q](C, I, ["visible", "enabled", "readOnly"]);
		if (C[E8L] && C[E8L] != "false") I[E8L] = true;
		var E = C.style.cssText;
		if (E) I.style = E;
		if (isIE9) {
			var _ = C.style.background;
			if (_) {
				if (!I.style) I.style = "";
				I.style += ";background:" + _
			}
		}
		if (this.style) if (I.style) I.style = this.style + ";" + I.style;
		else I.style = this.style;
		if (this[Ld]) if (I[Ld]) I[Ld] = this[Ld] + ";" + I[Ld];
		else I[Ld] = this[Ld];
		var B = zmj._attrs;
		if (B) for (var $ = 0, G = B.length; $ < G; $++) {
			var D = B[$],
			H = D[0],
			A = D[1];
			if (!A) A = "string";
			if (A == "string") zmj[W5cB](C, I, [H]);
			else if (A == "bool") zmj[D4q](C, I, [H]);
			else if (A == "int") zmj[PI](C, I, [H])
		}
		return I
	}
});
zmj._attrs = null;
zmj.regHtmlAttr = function(_, $) {
	if (!_) return;
	if (!$) $ = "string";
	if (!zmj._attrs) zmj._attrs = [];
	zmj._attrs.push([_, $])
};
Rge = function() {
	Rge[CPy][CLu][KQk](this)
};
HX_P(Rge, ET, {
	required: false,
	requiredErrorText: "This field is required.",
	Pp$: "zmj-required",
	errorText: "",
	I97: "zmj-error",
	FDD: "zmj-invalid",
	errorMode: "icon",
	validateOnChanged: true,
	VoC: true,
	validate: function() {
		var $ = {
			value: this.getValue(),
			errorText: "",
			isValid: true
		};
		if (this.required) if (zmj.isNull($.value) || $.value === "") {
			$.isValid = false;
			$.errorText = this[Wr]
		}
		this.fire("validation", $);
		this.errorText = $.errorText;
		this.setIsValid($.isValid);
		return this.isValid()
	},
	isValid: function() {
		return this.VoC
	},
	setIsValid: function($) {
		this.VoC = $;
		this.$jQ()
	},
	getIsValid: function() {
		return this.VoC
	},
	setValidateOnChanged: function($) {
		this.validateOnChanged = $
	},
	getValidateOnChanged: function($) {
		return this.validateOnChanged
	},
	setErrorMode: function($) {
		if (!$) $ = "none";
		this[Gr] = $.toLowerCase();
		if (this.VoC == false) this.$jQ()
	},
	getErrorMode: function() {
		return this[Gr]
	},
	setErrorText: function($) {
		this.errorText = $;
		if (this.VoC == false) this.$jQ()
	},
	getErrorText: function() {
		return this.errorText
	},
	setRequired: function($) {
		this.required = $;
		if (this.required) this[B1z](this.Pp$);
		else this[T07](this.Pp$)
	},
	getRequired: function() {
		return this.required
	},
	setRequiredErrorText: function($) {
		this[Wr] = $
	},
	getRequiredErrorText: function() {
		return this[Wr]
	},
	errorIconEl: null,
	getErrorIconEl: function() {
		return this.I2
	},
	PfCY: function() {},
	$jQ: function() {
		var $ = this;
		setTimeout(function() {
			$.RW5()
		},
		1)
	},
	RW5: function() {
		this[T07](this.I97);
		this[T07](this.FDD);
		this.el.title = "";
		if (this.VoC == false) switch (this[Gr]) {
		case "icon":
			this[B1z](this.I97);
			var $ = this.getErrorIconEl();
			if ($) $.title = this.errorText;
			break;
		case "border":
			this[B1z](this.FDD);
			this.el.title = this.errorText;
		default:
			this.PfCY();
			break
		} else this.PfCY();
		this[X5Q]()
	},
	Lo2: function() {
		if (this.validateOnChanged) this[WRj0]();
		this.fire("valuechanged", {
			value: this.getValue()
		})
	},
	onValueChanged: function(_, $) {
		this.on("valuechanged", _, $)
	},
	onValidation: function(_, $) {
		this.on("validation", _, $)
	},
	getAttrs: function(_) {
		var A = Rge[CPy][YIb][KQk](this, _);
		zmj[W5cB](_, A, ["onvaluechanged", "onvalidation", "requiredErrorText", "errorMode"]);
		zmj[D4q](_, A, ["validateOnChanged"]);
		var $ = _.getAttribute("required");
		if (!$) $ = _.required;
		if ($) A.required = $ != "false" ? true: false;
		return A
	}
});
LW = function() {
	this.data = [];
	this.HKKq = [];
	LW[CPy][CLu][KQk](this);
	this[J_w]()
};
HX_P(LW, Rge, {
	defaultValue: "",
	value: "",
	valueField: "id",
	textField: "text",
	delimiter: ",",
	data: null,
	url: "",
	Cap: "zmj-list-item",
	Or5: "zmj-list-item-hover",
	_V51d: "zmj-list-item-selected",
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = A.value;
		delete A.value;
		var B = A.url;
		delete A.url;
		var _ = A.data;
		delete A.data;
		LW[CPy].set[KQk](this, A);
		if (!zmj.isNull(_)) this[Uj](_);
		if (!zmj.isNull(B)) this.setUrl(B);
		if (!zmj.isNull($)) this[NHk2]($);
		return this
	},
	uiCls: "zmj-list",
	_create: function() {},
	_initEvents: function() {
		TQ(function() {
			BRs(this.el, "click", this.PSN, this);
			BRs(this.el, "dblclick", this.QMh, this);
			BRs(this.el, "mousedown", this.P4, this);
			BRs(this.el, "mouseup", this.X0i, this);
			BRs(this.el, "mousemove", this.Vqc, this);
			BRs(this.el, "mouseover", this.J6I, this);
			BRs(this.el, "mouseout", this.DtkD, this);
			BRs(this.el, "keydown", this.PDh, this);
			BRs(this.el, "keyup", this.Ktdo, this);
			BRs(this.el, "contextmenu", this.KRP9, this)
		},
		this)
	},
	destroy: function($) {
		if (this.el) {
			this.el.onclick = null;
			this.el.ondblclick = null;
			this.el.onmousedown = null;
			this.el.onmouseup = null;
			this.el.onmousemove = null;
			this.el.onmouseover = null;
			this.el.onmouseout = null;
			this.el.onkeydown = null;
			this.el.onkeyup = null;
			this.el.oncontextmenu = null
		}
		LW[CPy][Wsj][KQk](this, $)
	},
	name: "",
	setName: function($) {
		this.name = $;
		if (this.SA3) zmj.setAttr(this.SA3, "name", this.name)
	},
	$XL: function(_) {
		var A = J6j(_.target, this.Cap);
		if (A) {
			var $ = parseInt(zmj.getAttr(A, "index"));
			return this.data[$]
		}
	},
	addItemCls: function(_, A) {
		var $ = this.getItemEl(_);
		if ($) _I($, A)
	},
	removeItemCls: function(_, A) {
		var $ = this.getItemEl(_);
		if ($) Kw($, A)
	},
	getItemEl: function(_) {
		_ = this[VzbR](_);
		var $ = this.data.indexOf(_),
		A = this.B3n9($);
		return document.getElementById(A)
	},
	Fsh: function(_, $) {
		_ = this[VzbR](_);
		if (!_) return;
		var A = this.getItemEl(_);
		if ($ && A) this[Osq](_);
		if (this.GzItem == _) return;
		this.Zwgo();
		this.GzItem = _;
		_I(A, this.Or5)
	},
	Zwgo: function() {
		if (!this.GzItem) return;
		var $ = this.getItemEl(this.GzItem);
		if ($) Kw($, this.Or5);
		this.GzItem = null
	},
	getFocusedItem: function() {
		return this.GzItem
	},
	getFocusedIndex: function() {
		return this.data.indexOf(this.GzItem)
	},
	Gk: null,
	scrollIntoView: function(_) {
		try {
			var $ = this.getItemEl(_),
			A = this.Gk || this.el;
			zmj[Osq]($, A, false)
		} catch(B) {}
	},
	getItem: function($) {
		if (typeof $ == "object") return $;
		if (typeof $ == "number") return this.data[$];
		return this.findItems($)[0]
	},
	getCount: function() {
		return this.data.length
	},
	indexOf: function($) {
		return this.data.indexOf($)
	},
	getAt: function($) {
		return this.data[$]
	},
	updateItem: function($, _) {
		$ = this[VzbR]($);
		if (!$) return;
		zmj.copyTo($, _);
		this[J_w]()
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this[Uj]($)
	},
	loadData: function($) {
		this[Uj]($)
	},
	setData: function(data) {
		if (typeof data == "string") data = eval(data);
		if (!zmj.isArray(data)) data = [];
		this.data = data;
		this[J_w]();
		if (this.value != "") {
			this[FqM]();
			var records = this.findItems(this.value);
			this[HXHS](records)
		}
	},
	getData: function() {
		return this.data.clone()
	},
	setUrl: function($) {
		this.url = $;
		this.Vu({})
	},
	getUrl: function() {
		return this.url
	},
	Vu: function(params) {
		try {
			this.url = eval(this.url)
		} catch(e) {}
		var e = {
			url: this.url,
			async: false,
			type: "get",
			params: params,
			cancel: false
		};
		this.fire("beforeload", e);
		if (e.cancel == true) return;
		var sf = this;
		this.CqP = jQuery.ajax({
			url: e.url,
			async: e.async,
			data: e.params,
			type: e.type,
			cache: false,
			dataType: "text",
			success: function($) {
				var _ = null;
				try {
					_ = zmj.decode($)
				} catch(A) {}
				var A = {
					data: _,
					cancel: false
				};
				sf.fire("preload", A);
				if (A.cancel == true) return;
				sf[Uj](A.data);
				sf.fire("load");
				setTimeout(function() {
					sf[X5Q]()
				},
				100)
			},
			error: function($, A, _) {
				var B = {
					xmlHttp: $,
					errorCode: A
				};
				sf.fire("loaderror", B)
			}
		})
	},
	setValue: function($) {
		if (zmj.isNull($)) $ = "";
		if (this.value !== $) {
			var _ = this.findItems(this.value);
			this[R$](_);
			this.value = $;
			if (this.SA3) this.SA3.value = $;
			_ = this.findItems(this.value);
			this[HXHS](_)
		}
	},
	getValue: function() {
		return this.value
	},
	getFormValue: function() {
		return this.value
	},
	setValueField: function($) {
		this[Aqt] = $
	},
	getValueField: function() {
		return this[Aqt]
	},
	setTextField: function($) {
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	getItemValue: function($) {
		return String($[this.valueField])
	},
	getItemText: function($) {
		var _ = $[this.textField];
		return zmj.isNull(_) ? "": String(_)
	},
	Ss0: function(A) {
		if (zmj.isNull(A)) A = [];
		if (!zmj.isArray(A)) A = this.findItems(A);
		var B = [],
		C = [];
		for (var _ = 0, D = A.length; _ < D; _++) {
			var $ = A[_];
			if ($) {
				B.push(this[_p]($));
				C.push(this[RZH1]($))
			}
		}
		return [B.join(this.delimiter), C.join(this.delimiter)]
	},
	findItems: function(B) {
		if (zmj.isNull(B) || B === "") return [];
		var E = String(B).split(this.delimiter),
		D = this.data,
		H = {};
		for (var F = 0, A = D.length; F < A; F++) {
			var _ = D[F],
			I = _[this.valueField];
			H[I] = _
		}
		var C = [];
		for (var $ = 0, G = E.length; $ < G; $++) {
			I = E[$],
			_ = H[I];
			if (_) C.push(_)
		}
		return C
	},
	A3: null,
	HKKq: [],
	multiSelect: false,
	$r: function() {
		for (var _ = this.HKKq.length - 1; _ >= 0; _--) {
			var $ = this.HKKq[_];
			if (this.data.indexOf($) == -1) this.HKKq.removeAt(_)
		}
		var A = this.Ss0(this.HKKq);
		this.value = A[0];
		if (this.SA3) this.SA3.value = this.value
	},
	setMultiSelect: function($) {
		this[R0PE] = $
	},
	getMultiSelect: function() {
		return this[R0PE]
	},
	isSelected: function($) {
		if (!$) return false;
		return this.HKKq.indexOf($) != -1
	},
	getSelecteds: function() {
		return this.HKKq.clone()
	},
	setSelected: function($) {
		if ($) {
			this.A3 = $;
			this[D3f]($)
		}
	},
	getSelected: function() {
		return this.A3
	},
	select: function($) {
		$ = this[VzbR]($);
		if (!$) return;
		if (this[FURX]($)) return;
		this[HXHS]([$])
	},
	deselect: function($) {
		$ = this[VzbR]($);
		if (!$) return;
		if (!this[FURX]($)) return;
		this[R$]([$])
	},
	selectAll: function() {
		var $ = this.data.clone();
		this[HXHS]($)
	},
	deselectAll: function() {
		this[R$](this.HKKq)
	},
	clearSelect: function() {
		this[FqM]()
	},
	selects: function(A) {
		if (!A || A.length == 0) return;
		A = A.clone();
		for (var _ = 0, C = A.length; _ < C; _++) {
			var $ = A[_];
			if (!this[FURX]($)) this.HKKq.push($)
		}
		var B = this;
		setTimeout(function() {
			B.Bmcn()
		},
		1)
	},
	deselects: function(A) {
		if (!A || A.length == 0) return;
		A = A.clone();
		for (var _ = A.length - 1; _ >= 0; _--) {
			var $ = A[_];
			if (this[FURX]($)) this.HKKq.remove($)
		}
		var B = this;
		setTimeout(function() {
			B.Bmcn()
		},
		1)
	},
	Bmcn: function() {
		var C = this.Ss0(this.HKKq);
		this.value = C[0];
		if (this.SA3) this.SA3.value = this.value;
		for (var A = 0, D = this.data.length; A < D; A++) {
			var _ = this.data[A],
			F = this[FURX](_);
			if (F) this[Jq8](_, this._V51d);
			else this[Vsqn](_, this._V51d);
			var $ = this.data.indexOf(_),
			E = this.UoK($),
			B = document.getElementById(E);
			if (B) B.checked = !!F
		}
	},
	MdI: function(_, B) {
		var $ = this.Ss0(this.HKKq);
		this.value = $[0];
		if (this.SA3) this.SA3.value = this.value;
		var A = {
			selecteds: this.getSelecteds(),
			selected: this[DNU](),
			value: this.getValue()
		};
		this.fire("SelectionChanged", A)
	},
	UoK: function($) {
		return this.uid + "$ck$" + $
	},
	B3n9: function($) {
		return this.uid + "$" + $
	},
	PSN: function($) {
		this.Yis($, "Click")
	},
	QMh: function($) {
		this.Yis($, "Dblclick")
	},
	P4: function($) {
		this.Yis($, "MouseDown")
	},
	X0i: function($) {
		this.Yis($, "MouseUp")
	},
	Vqc: function($) {
		this.Yis($, "MouseMove")
	},
	J6I: function($) {
		this.Yis($, "MouseOver")
	},
	DtkD: function($) {
		this.Yis($, "MouseOut")
	},
	PDh: function($) {
		this.Yis($, "KeyDown")
	},
	Ktdo: function($) {
		this.Yis($, "KeyUp")
	},
	KRP9: function($) {
		this.Yis($, "ContextMenu")
	},
	Yis: function(C, A) {
		if (!this.enabled) return;
		var $ = this.$XL(C);
		if (!$) return;
		var B = this["_OnItem" + A];
		if (B) B[KQk](this, $, C);
		else {
			var _ = {
				item: $,
				htmlEvent: C
			};
			this.fire("item" + A, _)
		}
	},
	_OnItemClick: function($, A) {
		if (this[BUK]() || this.enabled == false || $.enabled === false) {
			A.preventDefault();
			return
		}
		var _ = this.getValue();
		if (this[R0PE]) {
			if (this[FURX]($)) {
				this[Nlip]($);
				if (this.A3 == $) this.A3 = null
			} else {
				this[D3f]($);
				this.A3 = $
			}
			this.MdI()
		} else if (!this[FURX]($)) {
			this[FqM]();
			this[D3f]($);
			this.A3 = $;
			this.MdI()
		}
		if (_ != this.getValue()) this.Lo2();
		var A = {
			item: $,
			htmlEvent: A
		};
		this.fire("itemclick", A)
	},
	LDU: true,
	_OnItemMouseOut: function($, _) {
		if (!this.enabled) return;
		if (this.LDU) this.Zwgo();
		var _ = {
			item: $,
			htmlEvent: _
		};
		this.fire("itemmouseout", _)
	},
	_OnItemMouseMove: function($, _) {
		if (!this.enabled || $.enabled === false) return;
		this.Fsh($);
		var _ = {
			item: $,
			htmlEvent: _
		};
		this.fire("itemmousemove", _)
	},
	onItemClick: function(_, $) {
		this.on("itemclick", _, $)
	},
	onItemMouseDown: function(_, $) {
		this.on("itemmousedown", _, $)
	},
	onBeforeLoad: function(_, $) {
		this.on("beforeload", _, $)
	},
	onLoad: function(_, $) {
		this.on("load", _, $)
	},
	onLoadError: function(_, $) {
		this.on("loaderror", _, $)
	},
	onPreLoad: function(_, $) {
		this.on("preload", _, $)
	},
	getAttrs: function(C) {
		var G = LW[CPy][YIb][KQk](this, C);
		zmj[W5cB](C, G, ["url", "data", "value", "textField", "valueField", "onitemclick", "onitemmousemove", "onselectionchanged", "onitemdblclick", "onbeforeload", "onload", "onloaderror", "ondataload"]);
		zmj[D4q](C, G, ["multiSelect"]);
		var E = G[Aqt] || this[Aqt],
		B = G[Uc9] || this[Uc9];
		if (C.nodeName.toLowerCase() == "select") {
			var D = [];
			for (var A = 0, F = C.length; A < F; A++) {
				var _ = C.options[A],
				$ = {};
				$[B] = _.text;
				$[E] = _.value;
				D.push($)
			}
			if (D.length > 0) G.data = D
		}
		return G
	}
});
zmj._Layouts = {};
zmj.layout = function($, _) {
	function A(C) {
		var D = zmj.get(C);
		if (D) {
			if (D[X5Q]) if (!zmj._Layouts[D.uid]) {
				zmj._Layouts[D.uid] = D;
				if (_ !== false || D.isFixedSize() == false) D[X5Q](false);
				delete zmj._Layouts[D.uid]
			}
		} else {
			var E = C.childNodes;
			if (E) for (var $ = 0, F = E.length; $ < F; $++) {
				var B = E[$];
				A(B)
			}
		}
	}
	if (!$) $ = document.body;
	A($)
};
zmj.applyTo = function(_) {
	_ = $iw(_);
	if (!_) return this;
	if (zmj.get(_)) throw new Error("not applyTo a zmj control");
	var $ = this[YIb](_);
	delete $._applyTo;
	if (zmj.isNull($[Oau]) && !zmj.isNull($.value)) $[Oau] = $.value;
	var A = _.parentNode;
	if (A && this.el != _) A.replaceChild(this.el, _);
	this.set($);
	this.RsE(_);
	return this
};
zmj._doParse = function(G) {
	var F = G.nodeName.toLowerCase();
	if (!F) return;
	var B = G.className;
	if (B) {
		var $ = zmj.get(G);
		if (!$) {
			var H = B.split(" ");
			for (var E = 0, C = H.length; E < C; E++) {
				var A = H[E],
				I = zmj.getClassByUICls(A);
				if (I) {
					var D = new I();
					zmj.applyTo[KQk](D, G);
					G = D.el;
					break
				}
			}
		}
	}
	if (F == "select" || Zq6(G, "zmj-menu") || Zq6(G, "zmj-datagrid") || Zq6(G, "zmj-treegrid") || Zq6(G, "zmj-tree") || Zq6(G, "zmj-button") || Zq6(G, "zmj-textbox") || Zq6(G, "zmj-buttonedit")) return;
	var J = zmj[P8pq](G, true);
	for (E = 0, C = J.length; E < C; E++) {
		var _ = J[E];
		if (_.nodeType == 1) if (_.parentNode == G) zmj._doParse(_)
	}
};
zmj._Removes = [];
zmj.parse = function($) {
	if (typeof $ == "string") {
		var A = $;
		$ = $iw(A);
		if (!$) $ = document.body
	}
	if ($ && !zmj.isElement($)) $ = $.el;
	if (!$) $ = document.body;
	var _ = UUg;
	if (isIE) UUg = false;
	zmj._doParse($);
	UUg = _;
	zmj.layout($)
};
zmj[W5cB] = function(B, A, E) {
	for (var $ = 0, D = E.length; $ < D; $++) {
		var C = E[$],
		_ = zmj.getAttr(B, C);
		if (_) A[C] = _
	}
};
zmj[D4q] = function(B, A, E) {
	for (var $ = 0, D = E.length; $ < D; $++) {
		var C = E[$],
		_ = zmj.getAttr(B, C);
		if (_) A[C] = _ == "true" ? true: false
	}
};
zmj[PI] = function(B, A, E) {
	for (var $ = 0, D = E.length; $ < D; $++) {
		var C = E[$],
		_ = parseInt(zmj.getAttr(B, C));
		if (!isNaN(_)) A[C] = _
	}
};
zmj._ParseColumns = function(N) {
	var G = [],
	O = zmj[P8pq](N);
	for (var M = 0, H = O.length; M < H; M++) {
		var C = O[M],
		T = jQuery(C),
		D = {},
		J = null,
		K = null,
		_ = zmj[P8pq](C);
		if (_) for (var $ = 0, P = _.length; $ < P; $++) {
			var B = _[$],
			A = jQuery(B).attr("property");
			if (!A) continue;
			A = A.toLowerCase();
			if (A == "columns") {
				D.columns = zmj._ParseColumns(B);
				jQuery(B).remove()
			}
			if (A == "editor" || A == "filter") {
				var F = B.className,
				R = F.split(" ");
				for (var L = 0, S = R.length; L < S; L++) {
					var E = R[L],
					Q = zmj.getClassByUICls(E);
					if (Q) {
						var I = new Q();
						if (A == "filter") {
							K = I[YIb](B);
							K.type = I.type
						} else {
							J = I[YIb](B);
							J.type = I.type
						}
						break
					}
				}
				jQuery(B).remove()
			}
		}
		D.header = C.innerHTML;
		zmj[W5cB](C, D, ["name", "header", "field", "editor", "filter", "renderer", "width", "type", "renderer", "headerAlign", "align", "headerCls", "cellCls", "headerStyle", "cellStyle", "displayField", "dateFormat", "listFormat", "mapFormat", "trueValue", "falseValue", "dataType", "vtype"]);
		zmj[D4q](C, D, ["visible", "readOnly", "allowSort", "allowReisze", "allowMove", "allowDrag", "autoShowPopup", "unique"]);
		if (J) D.editor = J;
		if (K) D.filter = K;
		if (D.dataType) D.dataType = D.dataType.toLowerCase();
		G.push(D)
	}
	return G
};
zmj._Columns = {};
zmj[P0S] = function($) {
	var _ = zmj._Columns[$.toLowerCase()];
	if (!_) return {};
	return _()
};
zmj.IndexColumn = function($) {
	return zmj.copyTo({
		width: 30,
		cellCls: "",
		align: "center",
		draggable: false,
		init: function($) {
			$.on("addrow", this.__OnIndexChanged, this);
			$.on("removerow", this.__OnIndexChanged, this);
			$.on("moverow", this.__OnIndexChanged, this);
			if ($.isTree) {
				$.on("loadnode", this.__OnIndexChanged, this);
				this._gridUID = $.uid;
				this[MWbB] = "_id"
			}
		},
		getNumberId: function($) {
			return this._gridUID + "$number$" + $[this._rowIdField]
		},
		createNumber: function($, _) {
			if (zmj.isNull($[S9])) return _ + 1;
			else return ($[S9] * $[HeC]) + _ + 1
		},
		renderer: function(A) {
			var $ = A.sender;
			if (this.draggable) {
				if (!A.cellStyle) A.cellStyle = "";
				A.cellStyle += ";cursor:move;"
			}
			var _ = "<div id=\"" + this.getNumberId(A.record) + "\">";
			if (zmj.isNull($[S9])) _ += A.rowIndex + 1;
			else _ += ($[S9] * $[HeC]) + A.rowIndex + 1;
			_ += "</div>";
			return _
		},
		__OnIndexChanged: function(F) {
			var $ = F.sender,
			C = $.toArray();
			for (var A = 0, D = C.length; A < D; A++) {
				var _ = C[A],
				E = this.getNumberId(_),
				B = document.getElementById(E);
				if (B) B.innerHTML = this.createNumber($, A)
			}
		}
	},
	$)
};
zmj._Columns["indexcolumn"] = zmj.IndexColumn;
zmj.CheckColumn = function($) {
	return zmj.copyTo({
		width: 30,
		cellCls: "zmj-checkcolumn",
		headerCls: "zmj-checkcolumn",
		_multiRowSelect: true,
		header: function($) {
			var A = this.uid + "checkall",
			_ = "<input type=\"checkbox\" id=\"" + A + "\" />";
			if (this[R0PE] == false) _ = "";
			return _
		},
		getCheckId: function($) {
			return this._gridUID + "$checkcolumn$" + $[this._rowIdField]
		},
		init: function($) {
			$.on("selectionchanged", this.H1g, this);
			$.on("HeaderCellClick", this.Ak, this)
		},
		renderer: function(C) {
			var B = this.getCheckId(C.record),
			_ = C.sender[FURX](C.record),
			A = "checkbox",
			$ = C.sender;
			if ($[R0PE] == false) A = "radio";
			return "<input type=\"" + A + "\" id=\"" + B + "\" " + (_ ? "checked": "") + " hidefocus style=\"outline:none;\" onclick=\"return false\"/>"
		},
		Ak: function(B) {
			var $ = B.sender,
			A = $.uid + "checkall",
			_ = document.getElementById(A);
			if (_) if ($[R0PE]) {
				if (_.checked) $.selectAll();
				else $[FqM]()
			} else {
				$[FqM]();
				if (_.checked) $[D3f](0)
			}
		},
		H1g: function(G) {
			var $ = G.sender,
			C = $.toArray();
			for (var A = 0, D = C.length; A < D; A++) {
				var _ = C[A],
				F = $[FURX](_),
				E = $.uid + "$checkcolumn$" + _[$._rowIdField],
				B = document.getElementById(E);
				if (B) B.checked = F
			}
		}
	},
	$)
};
zmj._Columns["checkcolumn"] = zmj.CheckColumn;
zmj.ExpandColumn = function($) {
	return zmj.copyTo({
		width: 30,
		cellCls: "",
		align: "center",
		draggable: false,
		cellStyle: "padding:0",
		renderer: function($) {
			return "<a class=\"zmj-grid-ecIcon\" href=\"javascript:#\" onclick=\"return false\"></a>"
		},
		init: function($) {
			$.on("cellclick", this.AB, this)
		},
		AB: function(A) {
			var $ = A.sender;
			if (A.column == this && $[QVw]) if (J6j(A.htmlEvent.target, "zmj-grid-ecIcon")) {
				var _ = $[QVw](A.record);
				if ($.autoHideRowDetail) $.hideAllRowDetail();
				if (_) $[D2$](A.record);
				else $[AmKa](A.record)
			}
		}
	},
	$)
};
zmj._Columns["expandcolumn"] = zmj.ExpandColumn;
_QUColumn = function($) {
	return zmj.copyTo({
		_type: "checkboxcolumn",
		header: "#",
		headerAlign: "center",
		cellCls: "zmj-checkcolumn",
		trueValue: true,
		falseValue: false,
		readOnly: false,
		getCheckId: function($) {
			return this._gridUID + "$checkbox$" + $[this._rowIdField]
		},
		renderer: function(B) {
			var A = this.getCheckId(B.record),
			_ = B.record[B.field] == this.trueValue ? true: false,
			$ = "checkbox";
			return "<input type=\"" + $ + "\" id=\"" + A + "\" " + (_ ? "checked": "") + " hidefocus style=\"outline:none;\" onclick=\"return false;\"/>"
		},
		init: function($) {
			this.grid = $;
			$.on("cellclick",
			function(C) {
				if (C.column == this) {
					if (this[E8L]) return;
					var B = this.getCheckId(C.record),
					A = C.htmlEvent.target;
					if (A.id == B) {
						C.cancel = false;
						C.value = C.record[C.field];
						$.fire("cellbeginedit", C);
						if (C.cancel !== true) {
							var _ = C.record[C.field] == this.trueValue ? this.falseValue: this.trueValue;
							if ($.H4d) $.H4d(C.record, C.column, _)
						}
					}
				}
			},
			this);
			var _ = parseInt(this.trueValue),
			A = parseInt(this.falseValue);
			if (!isNaN(_)) this.trueValue = _;
			if (!isNaN(A)) this.falseValue = A
		}
	},
	$)
};
zmj._Columns["checkboxcolumn"] = _QUColumn;
AcB_Column = function($) {
	return zmj.copyTo({
		renderer: function(M) {
			var _ = M.value ? String(M.value) : "",
			C = _.split(","),
			D = "id",
			J = "text",
			A = {},
			G = M.column.editor;
			if (G && G.type == "combobox") {
				var B = this._combobox;
				if (!B) {
					if (zmj.isControl(G)) B = G;
					else B = zmj.create(G);
					this._combobox = B
				}
				D = B.getValueField();
				J = B.getTextField();
				A = this._valueMaps;
				if (!A) {
					A = {};
					var K = B.getData();
					for (var H = 0, E = K.length; H < E; H++) {
						var $ = K[H];
						A[$[D]] = $
					}
					this._valueMaps = A
				}
			}
			var L = [];
			for (H = 0, E = C.length; H < E; H++) {
				var F = C[H],
				$ = A[F];
				if ($) {
					var I = $[J] || "";
					L.push(I)
				}
			}
			return L.join(",")
		}
	},
	$)
};
zmj._Columns["comboboxcolumn"] = AcB_Column;
LLF = function($) {
	this.owner = $;
	WoBw(this.owner.el, "mousedown", this.P4, this)
};
LLF[Yq] = {
	P4: function(_) {
		if (Zq6(_.target, "zmj-grid-resizeGrid") && this.owner[URW]) {
			var $ = this.A5();
			$.start(_)
		}
	},
	A5: function() {
		if (!this._resizeDragger) this._resizeDragger = new zmj.Drag({
			capture: true,
			onStart: zmj.createDelegate(this.J$c, this),
			onMove: zmj.createDelegate(this.Xuhi, this),
			onStop: zmj.createDelegate(this.GVij, this)
		});
		return this._resizeDragger
	},
	J$c: function($) {
		this.proxy = zmj.append(document.body, "<div class=\"zmj-grid-resizeProxy\"></div>");
		this.proxy.style.cursor = "se-resize";
		this.elBox = Vhwd(this.owner.el);
		YcA(this.proxy, this.elBox)
	},
	Xuhi: function(B) {
		var $ = this.owner,
		D = B.now[0] - B.init[0],
		_ = B.now[1] - B.init[1],
		A = this.elBox.width + D,
		C = this.elBox.height + _;
		if (A < $.minWidth) A = $.minWidth;
		if (C < $.minHeight) C = $.minHeight;
		if (A > $.maxWidth) A = $.maxWidth;
		if (C > $.maxHeight) C = $.maxHeight;
		zmj.setSize(this.proxy, A, C)
	},
	GVij: function($, A) {
		if (!this.proxy) return;
		var _ = Vhwd(this.proxy);
		jQuery(this.proxy).remove();
		this.proxy = null;
		this.elBox = null;
		if (A) {
			this.owner[GaK6](_.width);
			this.owner[BrQ](_.height)
		}
	}
};
zmj.__IFrameCreateCount = 1;
zmj.createIFrame = function(C, D) {
	var F = "__iframe_onload" + zmj.__IFrameCreateCount++;
	window[F] = _;
	var E = "<iframe style=\"width:100%;height:100%;\" onload=\"" + F + "()\"  frameborder=\"0\"></iframe>",
	$ = document.createElement("div"),
	B = zmj.append($, E),
	G = false;
	setTimeout(function() {
		if (B) {
			B.src = C;
			G = true
		}
	},
	5);
	var A = true;
	function _() {
		if (G == false) return;
		setTimeout(function() {
			if (D) D(B, A);
			A = false
		},
		1)
	}
	B._ondestroy = function() {
		window[F] = zmj.emptyFn;
		B.src = "";
		B._ondestroy = null;
		B = null
	};
	return B
};
Hb = function(C) {
	if (typeof C == "string") C = {
		url: C
	};
	C = zmj.copyTo({
		width: 700,
		height: 400,
		allowResize: true,
		allowModal: true,
		closeAction: "destroy",
		title: "",
		titleIcon: "",
		iconCls: "",
		iconStyle: "",
		bodyStyle: "padding:0",
		url: "",
		showCloseButton: true,
		showFooter: false
	},
	C);
	C[VO7y] = "destroy";
	var $ = C.onload;
	delete C.onload;
	var B = C.ondestroy;
	delete C.ondestroy;
	var _ = C.url;
	delete C.url;
	var A = new SBwo();
	A.set(C);
	A.load(_, $, B);
	A.show();
	return A
};
zmj.open = function(B) {
	if (!B) return;
	B.Owner = window;
	var $ = [];
	function _(A) {
		if (A.zmj) $.push(A);
		if (A.parent && A.parent != A) _(A.parent)
	}
	_(window);
	var A = $[$.length - 1];
	return A.Hb(B)
};
zmj.openTop = zmj.open;
zmj.getData = function(C, A, E, D, _) {
	var $ = zmj.getText(C, A, E, D, _),
	B = zmj.decode($);
	return B
};
zmj.getText = function(B, A, D, C, _) {
	var $ = null;
	jQuery.ajax({
		url: B,
		data: A,
		async: false,
		type: _ ? _: "get",
		cache: false,
		dataType: "text",
		success: function(A, _) {
			$ = A
		},
		error: C
	});
	return $
};
if (!window.zmj_RootPath) zmj_RootPath = "/";
WF = function(B) {
	var A = document.getElementsByTagName("script"),
	D = "";
	for (var $ = 0, E = A.length; $ < E; $++) {
		var C = A[$].src;
		if (C.indexOf(B) != -1) {
			var F = C.split(B);
			D = F[0];
			break
		}
	}
	var _ = location.href;
	_ = _.split("#")[0];
	_ = _.split("?")[0];
	F = _.split("/");
	F.length = F.length - 1;
	_ = F.join("/");
	if (D.indexOf("http:") == -1 && D.indexOf("file:") == -1) D = _ + "/" + D;
	return D
};
if (!window.zmj_JSPath) zmj_JSPath = WF("zmjui.js");
zmj.update = function(A, _) {
	if (typeof A == "string") A = {
		url: A
	};
	if (_) A.el = _;
	A = zmj.copyTo({
		el: null,
		url: "",
		async: false,
		type: "get",
		cache: false,
		dataType: "text",
		success: function(_) {
			var B = A.el;
			if (B) {
				$(B).html(_);
				zmj.parse(B)
			}
		},
		error: function($, A, _) {}
	},
	A);
	jQuery.ajax(A)
};
zmj.createSingle = function($) {
	if (typeof $ == "string") $ = zmj.getClass($);
	if (typeof $ != "function") return;
	var _ = $.single;
	if (!_) _ = $.single = new $();
	return _
};
zmj.createTopSingle = function($) {
	if (typeof $ != "function") return;
	var _ = $[Yq].type;
	if (top && top != window && top.zmj && top.zmj.getClass(_)) return top.zmj.createSingle(_);
	else return zmj.createSingle($)
};
zmj.sortTypes = {
	"string": function($) {
		return String($).toUpperCase()
	},
	"date": function($) {
		if (!$) return 0;
		if (zmj.isDate($)) return $.getTime();
		return zmj.parseDate(String($))
	},
	"float": function(_) {
		var $ = parseFloat(String(_).replace(/,/g, ""));
		return isNaN($) ? 0: $
	},
	"int": function(_) {
		var $ = parseInt(String(_).replace(/,/g, ""), 10);
		return isNaN($) ? 0: $
	}
};
zmj._ValidateVType = function(G, $, K, H) {
	var F = G.split(";");
	for (var E = 0, C = F.length; E < C; E++) {
		var G = F[E].trim(),
		J = G.split(":"),
		A = J[0],
		_ = J[1];
		if (_) _ = _.split(",");
		else _ = [];
		var D = zmj.VTypes[A];
		if (D) {
			var I = D($, _);
			if (I !== true) {
				K.isValid = false;
				var B = J[0] + "ErrorText";
				K.errorText = H[B] || zmj.VTypes[B] || "";
				K.errorText = String.format(K.errorText, _[0], _[1], _[2], _[3], _[4]);
				break
			}
		}
	}
};
zmj._getErrorText = function($, _) {
	if ($ && $[_]) return $[_];
	else return zmj.VTypes[_]
};
zmj.VTypes = {
	uniqueErrorText: "This field is unique.",
	requiredErrorText: "This field is required.",
	emailErrorText: "Please enter a valid email address.",
	urlErrorText: "Please enter a valid URL.",
	floatErrorText: "Please enter a valid number.",
	intErrorText: "Please enter only digits",
	dateErrorText: "Please enter a valid date. Date format is {0}",
	maxLengthErrorText: "Please enter no more than {0} characters.",
	minLengthErrorText: "Please enter at least {0} characters.",
	maxErrorText: "Please enter a value less than or equal to {0}.",
	minErrorText: "Please enter a value greater than or equal to {0}.",
	rangeLengthErrorText: "Please enter a value between {0} and {1} characters long.",
	rangeCharErrorText: "Please enter a value between {0} and {1} characters long.",
	rangeErrorText: "Please enter a value between {0} and {1}.",
	required: function(_, $) {
		if (zmj.isNull(_) || _ === "") return false;
		return true
	},
	email: function(_, $) {
		if (zmj.isNull(_) || _ === "") return true;
		if (_.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
		else return false
	},
	url: function(A, $) {
		if (zmj.isNull(A) || A === "") return true;
		function _(_) {
			_ = _.toLowerCase();
			var $ = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$",
			A = new RegExp($);
			if (A.test(_)) return (true);
			else return (false)
		}
		return _(A)
	},
	"int": function(A, _) {
		if (zmj.isNull(A) || A === "") return true;
		function $(_) {
			var $ = String(_);
			return $.length > 0 && !(/[^0-9]/).test($)
		}
		return $(A)
	},
	"float": function(A, _) {
		if (zmj.isNull(A) || A === "") return true;
		function $(_) {
			var $ = String(_);
			return $.length > 0 && !(/[^0-9.]/).test($)
		}
		return $(A)
	},
	"date": function(B, _) {
		if (zmj.isNull(B) || B === "") return true;
		if (!B) return false;
		var $ = null,
		A = _[0];
		if (A) {
			$ = zmj.parseDate(B, A);
			if ($ && $.getFullYear) if (zmj.formatDate($, A) == B) return true
		} else {
			$ = zmj.parseDate(B, "yyyy-MM-dd");
			if (!$) $ = zmj.parseDate(B, "yyyy/MM/dd");
			if (!$) $ = zmj.parseDate(B, "MM/dd/yyyy");
			if ($ && $.getFullYear) return true
		}
		return false
	},
	maxLength: function(A, $) {
		if (zmj.isNull(A) || A === "") return true;
		var _ = parseInt($);
		if (!A || isNaN(_)) return true;
		if (A.length <= _) return true;
		else return false
	},
	minLength: function(A, $) {
		if (zmj.isNull(A) || A === "") return true;
		var _ = parseInt($);
		if (isNaN(_)) return true;
		if (A.length >= _) return true;
		else return false
	},
	rangeLength: function(B, _) {
		if (zmj.isNull(B) || B === "") return true;
		if (!B) return false;
		var $ = parseFloat(_[0]),
		A = parseFloat(_[1]);
		if (isNaN($) || isNaN(A)) return true;
		if ($ <= B.length && B.length <= A) return true;
		return false
	},
	rangeChar: function(G, B) {
		if (zmj.isNull(G) || G === "") return true;
		var A = parseFloat(B[0]),
		E = parseFloat(B[1]);
		if (isNaN(A) || isNaN(E)) return true;
		function C(_) {
			var $ = new RegExp("^[\u4e00-\u9fa5]+$");
			if ($.test(_)) return true;
			return false
		}
		var $ = 0,
		F = String(G).split("");
		for (var _ = 0, D = F.length; _ < D; _++) if (C(F[_])) $ += 2;
		else $ += 1;
		if (A <= $ && $ <= E) return true;
		return false
	},
	range: function(B, _) {
		if (zmj.isNull(B) || B === "") return true;
		B = parseFloat(B);
		if (isNaN(B)) return false;
		var $ = parseFloat(_[0]),
		A = parseFloat(_[1]);
		if (isNaN($) || isNaN(A)) return true;
		if ($ <= B && B <= A) return true;
		return false
	}
};
zmj.emptyFn = function() {};
zmj.Drag = function($) {
	zmj.copyTo(this, $)
};
zmj.Drag[Yq] = {
	onStart: zmj.emptyFn,
	onMove: zmj.emptyFn,
	onStop: zmj.emptyFn,
	capture: false,
	fps: 20,
	event: null,
	delay: 80,
	start: function(_) {
		_.preventDefault();
		if (_) this.event = _;
		this.now = this.init = [this.event.pageX, this.event.pageY];
		var $ = document;
		WoBw($, "mousemove", this.move, this);
		WoBw($, "mouseup", this.stop, this);
		WoBw($, "contextmenu", this.contextmenu, this);
		if (this.context) WoBw(this.context, "contextmenu", this.contextmenu, this);
		this.trigger = _.target;
		zmj.selectable(this.trigger, false);
		zmj.selectable($.body, false);
		if (this.capture) if (isIE) this.trigger.setCapture(true);
		else if (document.captureEvents) document.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEDOWN);
		this.started = false;
		this.startTime = new Date()
	},
	contextmenu: function($) {
		if (this.context) Is(this.context, "contextmenu", this.contextmenu, this);
		Is(document, "contextmenu", this.contextmenu, this);
		$.preventDefault();
		$.stopPropagation()
	},
	move: function(_) {
		if (this.delay) if (new Date() - this.startTime < this.delay) return;
		if (!this.started) {
			this.started = true;
			this.onStart(this)
		}
		var $ = this;
		if (!this.timer) {
			$.now = [_.pageX, _.pageY];
			$.event = _;
			$.onMove($);
			$.timer = null
		}
	},
	stop: function(B) {
		this.now = [B.pageX, B.pageY];
		this.event = B;
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null
		}
		var A = document;
		zmj.selectable(this.trigger, true);
		zmj.selectable(A.body, true);
		if (this.capture) if (isIE) this.trigger.releaseCapture();
		else if (document.captureEvents) document.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEDOWN);
		var _ = zmj.MouseButton.Right != B.button;
		if (_ == false) B.preventDefault();
		Is(A, "mousemove", this.move, this);
		Is(A, "mouseup", this.stop, this);
		var $ = this;
		setTimeout(function() {
			Is(document, "contextmenu", $.contextmenu, $);
			if ($.context) Is($.context, "contextmenu", $.contextmenu, $)
		},
		1);
		if (this.started) this.onStop(this, _)
	}
};
zmj.JSON = new(function() {
	var sb = [],
	useHasOwn = !!{}.hasOwnProperty,
	replaceString = function($, A) {
		var _ = m[A];
		if (_) return _;
		_ = A.charCodeAt();
		return "\\u00" + Math.floor(_ / 16).toString(16) + (_ % 16).toString(16)
	},
	doEncode = function($) {
		if ($ === null) {
			sb[sb.length] = "null";
			return
		}
		var A = typeof $;
		if (A == "undefined") {
			sb[sb.length] = "null";
			return
		} else if ($.push) {
			sb[sb.length] = "[";
			var D,
			_,
			C = $.length,
			E;
			for (_ = 0; _ < C; _ += 1) {
				E = $[_];
				A = typeof E;
				if (A == "undefined" || A == "function" || A == "unknown");
				else {
					if (D) sb[sb.length] = ",";
					doEncode(E);
					D = true
				}
			}
			sb[sb.length] = "]";
			return
		} else if ($.getFullYear) {
			var B;
			sb[sb.length] = "\"";
			sb[sb.length] = $.getFullYear();
			sb[sb.length] = "-";
			B = $.getMonth() + 1;
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = "-";
			B = $.getDate();
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = "T";
			B = $.getHours();
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = ":";
			B = $.getMinutes();
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = ":";
			B = $.getSeconds();
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = "\"";
			return
		} else if (A == "string") {
			if (strReg1.test($)) {
				sb[sb.length] = "\"";
				sb[sb.length] = $.replace(strReg2, replaceString);
				sb[sb.length] = "\"";
				return
			}
			sb[sb.length] = "\"" + $ + "\"";
			return
		} else if (A == "number") {
			sb[sb.length] = $;
			return
		} else if (A == "boolean") {
			sb[sb.length] = String($);
			return
		} else {
			sb[sb.length] = "{";
			D,
			_,
			E;
			for (_ in $) if (!useHasOwn || $.hasOwnProperty(_)) {
				E = $[_];
				A = typeof E;
				if (A == "undefined" || A == "function" || A == "unknown");
				else {
					if (D) sb[sb.length] = ",";
					doEncode(_);
					sb[sb.length] = ":";
					doEncode(E);
					D = true
				}
			}
			sb[sb.length] = "}";
			return
		}
	},
	m = {
		"\b": "\\b",
		"\t": "\\t",
		"\n": "\\n",
		"\f": "\\f",
		"\r": "\\r",
		"\"": "\\\"",
		"\\": "\\\\"
	},
	strReg1 = /["\\\x00-\x1f]/,
	strReg2 = /([\x00-\x1f\\"])/g;
	this.encode = function() {
		var $;
		return function($, _) {
			sb = [];
			doEncode($);
			return sb.join("")
		}
	} ();
	this.decode = function() {
		var re = /[\"\'](\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})[\"\']/g;
		return function(json) {
			if (json === "" || json === null || json === undefined) return json;
			json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
			var json = json.replace(__js_dateRegEx, "$1new Date($2)"),
			s = eval("(" + json + ")");
			return s
		}
	} ()
})();
__js_dateRegEx = new RegExp("(^|[^\\\\])\\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\\"", "g");
zmj.encode = zmj.JSON.encode;
zmj.decode = zmj.JSON.decode;
zmj.clone = function($) {
	if ($ === null || $ === undefined) return $;
	var B = zmj.encode($),
	_ = zmj.decode(B);
	function A(B) {
		for (var _ = 0, D = B.length; _ < D; _++) {
			var $ = B[_];
			delete $._state;
			delete $._id;
			delete $._pid;
			for (var C in $) {
				var E = $[C];
				if (E instanceof Array) A(E)
			}
		}
	}
	A(_ instanceof Array ? _: [_]);
	return _
};
var DAY_MS = 86400000,
HOUR_MS = 3600000,
MINUTE_MS = 60000;
zmj.copyTo(zmj, {
	clearTime: function($) {
		if (!$) return null;
		return new Date($.getFullYear(), $.getMonth(), $.getDate())
	},
	maxTime: function($) {
		if (!$) return null;
		return new Date($.getFullYear(), $.getMonth(), $.getDate(), 23, 59, 59)
	},
	cloneDate: function($) {
		if (!$) return null;
		return new Date($.getTime())
	},
	addDate: function(A, $, _) {
		if (!_) _ = "D";
		A = new Date(A.getTime());
		switch (_.toUpperCase()) {
		case "Y":
			A.setFullYear(A.getFullYear() + $);
			break;
		case "MO":
			A.setMonth(A.getMonth() + $);
			break;
		case "D":
			A.setDate(A.getDate() + $);
			break;
		case "H":
			A.setHours(A.getHours() + $);
			break;
		case "M":
			A.setMinutes(A.getMinutes() + $);
			break;
		case "S":
			A.setSeconds(A.getSeconds() + $);
			break;
		case "MS":
			A.setMilliseconds(A.getMilliseconds() + $);
			break
		}
		return A
	},
	getWeek: function(D, $, _) {
		$ += 1;
		var E = Math.floor((14 - ($)) / 12),
		G = D + 4800 - E,
		A = ($) + (12 * E) - 3,
		C = _ + Math.floor(((153 * A) + 2) / 5) + (365 * G) + Math.floor(G / 4) - Math.floor(G / 100) + Math.floor(G / 400) - 32045,
		F = (C + 31741 - (C % 7)) % 146097 % 36524 % 1461,
		H = Math.floor(F / 1460),
		B = ((F - H) % 365) + H;
		NumberOfWeek = Math.floor(B / 7) + 1;
		return NumberOfWeek
	},
	getWeekStartDate: function(C, B) {
		if (!B) B = 0;
		if (B > 6 || B < 0) throw new Error("out of weekday");
		var A = C.getDay(),
		_ = B - A;
		if (A < B) _ -= 7;
		var $ = new Date(C.getFullYear(), C.getMonth(), C.getDate() + _);
		return $
	},
	getShortWeek: function(_) {
		var $ = this.dateInfo.daysShort;
		return $[_]
	},
	getLongWeek: function(_) {
		var $ = this.dateInfo.daysLong;
		return $[_]
	},
	getShortMonth: function($) {
		var _ = this.dateInfo.monthsShort;
		return _[$]
	},
	getLongMonth: function($) {
		var _ = this.dateInfo.monthsLong;
		return _[$]
	},
	dateInfo: {
		monthsLong: ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		daysLong: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		quarterLong: ["Q1", "Q2", "Q3", "Q4"],
		quarterShort: ["Q1", "Q2", "Q3", "Q4"],
		halfYearLong: ["first half", "second half"],
		patterns: {
			"d": "M/d/yyyy",
			"D": "dddd,MMMM dd,yyyy",
			"f": "dddd,MMMM dd,yyyy H:mm tt",
			"F": "dddd,MMMM dd,yyyy H:mm:ss tt",
			"g": "M/d/yyyy H:mm tt",
			"G": "M/d/yyyy H:mm:ss tt",
			"m": "MMMM dd",
			"o": "yyyy-MM-ddTHH:mm:ss.fff",
			"s": "yyyy-MM-ddTHH:mm:ss",
			"t": "H:mm tt",
			"T": "H:mm:ss tt",
			"U": "dddd,MMMM dd,yyyy HH:mm:ss tt",
			"y": "MMM,yyyy"
		},
		tt: {
			"AM": "AM",
			"PM": "PM"
		},
		ten: {
			"Early": "Early",
			"Mid": "Mid",
			"Late": "Late"
		},
		today: "Today",
		clockType: 24
	}
});
Date[Yq].getHalfYear = function() {
	if (!this.getMonth) return null;
	var $ = this.getMonth();
	if ($ < 6) return 0;
	return 1
};
Date[Yq].getQuarter = function() {
	if (!this.getMonth) return null;
	var $ = this.getMonth();
	if ($ < 3) return 0;
	if ($ < 6) return 1;
	if ($ < 9) return 2;
	return 3
};
zmj.formatDate = function(C, O, F) {
	if (!C || !C.getFullYear || isNaN(C)) return "";
	var G = C.toString(),
	B = zmj.dateInfo;
	if (!B) B = zmj.dateInfo;
	if (typeof(B) !== "undefined") {
		var M = typeof(B.patterns[O]) !== "undefined" ? B.patterns[O] : O,
		J = C.getFullYear(),
		$ = C.getMonth(),
		_ = C.getDate();
		if (O == "yyyy-MM-dd") {
			$ = $ + 1 < 10 ? "0" + ($ + 1) : $ + 1;
			_ = _ < 10 ? "0" + _: _;
			return J + "-" + $ + "-" + _
		}
		if (O == "MM/dd/yyyy") {
			$ = $ + 1 < 10 ? "0" + ($ + 1) : $ + 1;
			_ = _ < 10 ? "0" + _: _;
			return $ + "/" + _ + "/" + J
		}
		G = M.replace(/yyyy/g, J);
		G = G.replace(/yy/g, (J + "").substring(2));
		var L = C.getHalfYear();
		G = G.replace(/hy/g, B.halfYearLong[L]);
		var I = C.getQuarter();
		G = G.replace(/Q/g, B.quarterLong[I]);
		G = G.replace(/q/g, B.quarterShort[I]);
		G = G.replace(/MMMM/g, B.monthsLong[$].escapeDateTimeTokens());
		G = G.replace(/MMM/g, B.monthsShort[$].escapeDateTimeTokens());
		G = G.replace(/MM/g, $ + 1 < 10 ? "0" + ($ + 1) : $ + 1);
		G = G.replace(/(\\)?M/g,
		function(A, _) {
			return _ ? A: $ + 1
		});
		var N = C.getDay();
		G = G.replace(/dddd/g, B.daysLong[N].escapeDateTimeTokens());
		G = G.replace(/ddd/g, B.daysShort[N].escapeDateTimeTokens());
		G = G.replace(/dd/g, _ < 10 ? "0" + _: _);
		G = G.replace(/(\\)?d/g,
		function(A, $) {
			return $ ? A: _
		});
		var H = C.getHours(),
		A = H > 12 ? H - 12: H;
		if (B.clockType == 12) if (H > 12) H -= 12;
		G = G.replace(/HH/g, H < 10 ? "0" + H: H);
		G = G.replace(/(\\)?H/g,
		function(_, $) {
			return $ ? _: H
		});
		G = G.replace(/hh/g, A < 10 ? "0" + A: A);
		G = G.replace(/(\\)?h/g,
		function(_, $) {
			return $ ? _: A
		});
		var D = C.getMinutes();
		G = G.replace(/mm/g, D < 10 ? "0" + D: D);
		G = G.replace(/(\\)?m/g,
		function(_, $) {
			return $ ? _: D
		});
		var K = C.getSeconds();
		G = G.replace(/ss/g, K < 10 ? "0" + K: K);
		G = G.replace(/(\\)?s/g,
		function(_, $) {
			return $ ? _: K
		});
		G = G.replace(/fff/g, C.getMilliseconds());
		G = G.replace(/tt/g, C.getHours() > 12 || C.getHours() == 0 ? B.tt["PM"] : B.tt["AM"]);
		var C = C.getDate(),
		E = "";
		if (C <= 10) E = B.ten["Early"];
		else if (C <= 20) E = B.ten["Mid"];
		else E = B.ten["Late"];
		G = G.replace(/ten/g, E)
	}
	return G.replace(/\\/g, "")
};
String[Yq].escapeDateTimeTokens = function() {
	return this.replace(/([dMyHmsft])/g, "\\$1")
};
zmj.fixDate = function($, _) {
	if ( + $) while ($.getDate() != _.getDate()) $.setTime( + $ + ($ < _ ? 1: -1) * HOUR_MS)
};
zmj.parseDate = function(s, ignoreTimezone) {
	try {
		var d = eval(s);
		if (d && d.getFullYear) return d
	} catch(ex) {}
	if (typeof s == "object") return isNaN(s) ? null: s;
	if (typeof s == "number") {
		d = new Date(s * 1000);
		if (d.getTime() != s) return null;
		return isNaN(d) ? null: d
	}
	if (typeof s == "string") {
		if (s.match(/^\d+(\.\d+)?$/)) {
			d = new Date(parseFloat(s) * 1000);
			if (d.getTime() != s) return null;
			else return d
		}
		if (ignoreTimezone === undefined) ignoreTimezone = true;
		d = zmj.parseISO8601(s, ignoreTimezone) || (s ? new Date(s) : null);
		return isNaN(d) ? null: d
	}
	return null
};
zmj.parseISO8601 = function(D, $) {
	var _ = D.match(/^([0-9]{4})([-\/]([0-9]{1,2})([-\/]([0-9]{1,2})([T ]([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
	if (!_) {
		_ = D.match(/^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})[T ]([0-9]{1,2})/);
		if (_) {
			var A = new Date(_[1], _[2] - 1, _[3], _[4]);
			return A
		}
		_ = D.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/);
		if (!_) return null;
		else {
			A = new Date(_[3], _[1] - 1, _[2]);
			return A
		}
	}
	A = new Date(_[1], 0, 1);
	if ($ || !_[14]) {
		var C = new Date(_[1], 0, 1, 9, 0);
		if (_[3]) {
			A.setMonth(_[3] - 1);
			C.setMonth(_[3] - 1)
		}
		if (_[5]) {
			A.setDate(_[5]);
			C.setDate(_[5])
		}
		zmj.fixDate(A, C);
		if (_[7]) A.setHours(_[7]);
		if (_[8]) A.setMinutes(_[8]);
		if (_[10]) A.setSeconds(_[10]);
		if (_[12]) A.setMilliseconds(Number("0." + _[12]) * 1000);
		zmj.fixDate(A, C)
	} else {
		A.setUTCFullYear(_[1], _[3] ? _[3] - 1: 0, _[5] || 1);
		A.setUTCHours(_[7] || 0, _[8] || 0, _[10] || 0, _[12] ? Number("0." + _[12]) * 1000: 0);
		var B = Number(_[16]) * 60 + (_[18] ? Number(_[18]) : 0);
		B *= _[15] == "-" ? 1: -1;
		A = new Date( + A + (B * 60 * 1000))
	}
	return A
};
zmj.parseTime = function(E, F) {
	if (!E) return null;
	var B = parseInt(E);
	if (B == E && F) {
		$ = new Date(0);
		if (F[0] == "H") $.setHours(B);
		else if (F[0] == "m") $.setMinutes(B);
		else if (F[0] == "s") $.setSeconds(B);
		return $
	}
	var $ = zmj.parseDate(E);
	if (!$) {
		var D = E.split(":"),
		_ = parseInt(parseFloat(D[0])),
		C = parseInt(parseFloat(D[1])),
		A = parseInt(parseFloat(D[2]));
		if (!isNaN(_) && !isNaN(C) && !isNaN(A)) {
			$ = new Date(0);
			$.setHours(_);
			$.setMinutes(C);
			$.setSeconds(A)
		}
		if (!isNaN(_) && (F == "H" || F == "HH")) {
			$ = new Date(0);
			$.setHours(_)
		} else if (!isNaN(_) && !isNaN(C) && (F == "H:mm" || F == "HH:mm")) {
			$ = new Date(0);
			$.setHours(_);
			$.setMinutes(C)
		} else if (!isNaN(_) && !isNaN(C) && F == "mm:ss") {
			$ = new Date(0);
			$.setMinutes(_);
			$.setSeconds(C)
		}
	}
	return $
};
zmj.dateInfo = {
	monthsLong: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
	monthsShort: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
	daysLong: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
	daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
	quarterLong: ["\u4e00\u5b63\u5ea6", "\u4e8c\u5b63\u5ea6", "\u4e09\u5b63\u5ea6", "\u56db\u5b63\u5ea6"],
	quarterShort: ["Q1", "Q2", "Q2", "Q4"],
	halfYearLong: ["\u4e0a\u534a\u5e74", "\u4e0b\u534a\u5e74"],
	patterns: {
		"d": "yyyy-M-d",
		"D": "yyyy\u5e74M\u6708d\u65e5",
		"f": "yyyy\u5e74M\u6708d\u65e5 H:mm",
		"F": "yyyy\u5e74M\u6708d\u65e5 H:mm:ss",
		"g": "yyyy-M-d H:mm",
		"G": "yyyy-M-d H:mm:ss",
		"m": "MMMd\u65e5",
		"o": "yyyy-MM-ddTHH:mm:ss.fff",
		"s": "yyyy-MM-ddTHH:mm:ss",
		"t": "H:mm",
		"T": "H:mm:ss",
		"U": "yyyy\u5e74M\u6708d\u65e5 HH:mm:ss",
		"y": "yyyy\u5e74MM\u6708"
	},
	tt: {
		"AM": "\u4e0a\u5348",
		"PM": "\u4e0b\u5348"
	},
	ten: {
		"Early": "\u4e0a\u65ec",
		"Mid": "\u4e2d\u65ec",
		"Late": "\u4e0b\u65ec"
	},
	today: "\u4eca\u5929",
	clockType: 24
};
$iw = function($) {
	if (typeof $ == "string") {
		if ($.charAt(0) == "#") $ = $.substr(1);
		return document.getElementById($)
	} else return $
};
Zq6 = function($, _) {
	$ = $iw($);
	if (!$) return;
	if (!$.className) return;
	var A = $.className.split(" ");
	return A.indexOf(_) != -1
};
_I = function($, _) {
	if (!_) return;
	if (Zq6($, _) == false) jQuery($)[HJ](_)
};
Kw = function($, _) {
	if (!_) return;
	jQuery($)[MLy](_)
};
Jfu = function($) {
	$ = $iw($);
	var _ = jQuery($);
	return {
		top: parseInt(_.css("margin-top"), 10) || 0,
		left: parseInt(_.css("margin-left"), 10) || 0,
		bottom: parseInt(_.css("margin-bottom"), 10) || 0,
		right: parseInt(_.css("margin-right"), 10) || 0
	}
};
WN = function($) {
	$ = $iw($);
	var _ = jQuery($);
	return {
		top: parseInt(_.css("border-top-width"), 10) || 0,
		left: parseInt(_.css("border-left-width"), 10) || 0,
		bottom: parseInt(_.css("border-bottom-width"), 10) || 0,
		right: parseInt(_.css("border-right-width"), 10) || 0
	}
};
UwK = function($) {
	$ = $iw($);
	var _ = jQuery($);
	return {
		top: parseInt(_.css("padding-top"), 10) || 0,
		left: parseInt(_.css("padding-left"), 10) || 0,
		bottom: parseInt(_.css("padding-bottom"), 10) || 0,
		right: parseInt(_.css("padding-right"), 10) || 0
	}
};
WE = function(_, $) {
	_ = $iw(_);
	$ = parseInt($);
	if (isNaN($) || !_) return;
	if (jQuery.boxModel) {
		var A = UwK(_),
		B = WN(_);
		$ = $ - A.left - A.right - B.left - B.right
	}
	if ($ < 0) $ = 0;
	_.style.width = $ + "px"
};
ZIA = function(_, $) {
	_ = $iw(_);
	$ = parseInt($);
	if (isNaN($) || !_) return;
	if (jQuery.boxModel) {
		var A = UwK(_),
		B = WN(_);
		$ = $ - A.top - A.bottom - B.top - B.bottom
	}
	if ($ < 0) $ = 0;
	_.style.height = $ + "px"
};
F$u = function($, _) {
	$ = $iw($);
	if ($.style.display == "none" || $.type == "text/javascript") return 0;
	return _ ? jQuery($).width() : jQuery($).outerWidth()
};
$L7 = function($, _) {
	$ = $iw($);
	if ($.style.display == "none" || $.type == "text/javascript") return 0;
	return _ ? jQuery($).height() : jQuery($).outerHeight()
};
YcA = function(A, C, B, $, _) {
	if (B === undefined) {
		B = C.y;
		$ = C.width;
		_ = C.height;
		C = C.x
	}
	zmj[GzmA](A, C, B);
	WE(A, $);
	ZIA(A, _)
};
Vhwd = function(A) {
	var $ = zmj.getXY(A),
	_ = {
		x: $[0],
		y: $[1],
		width: F$u(A),
		height: $L7(A)
	};
	_.left = _.x;
	_.top = _.y;
	_.right = _.x + _.width;
	_.bottom = _.y + _.height;
	return _
};
DTHl = function(A, B) {
	A = $iw(A);
	if (!A || typeof B != "string") return;
	var F = jQuery(A),
	_ = B.toLowerCase().split(";");
	for (var $ = 0, C = _.length; $ < C; $++) {
		var E = _[$],
		D = E.split(":");
		if (D.length == 2) F.css(D[0].trim(), D[1].trim())
	}
};
Ps6 = function() {
	var $ = document.defaultView;
	return new Function("el", "style", ["style.indexOf('-')>-1 && (style=style.replace(/-(\\w)/g,function(m,a){return a.toUpperCase()}));", "style=='float' && (style='", $ ? "cssFloat": "styleFloat", "');return el.style[style] || ", $ ? "window.getComputedStyle(el,null)[style]": "el.currentStyle[style]", " || null;"].join(""))
} ();
EjQz = function(A, $) {
	var _ = false;
	A = $iw(A);
	$ = $iw($);
	if (A === $) return true;
	if (A && $) if (A.contains) {
		try {
			return A.contains($)
		} catch(B) {
			return false
		}
	} else if (A.compareDocumentPosition) return !! (A.compareDocumentPosition($) & 16);
	else while ($ = $.parentNode) _ = $ == A || _;
	return _
};
J6j = function(B, A, $) {
	B = $iw(B);
	var C = document.body,
	_ = 0,
	D;
	$ = $ || 50;
	if (typeof $ != "number") {
		D = $iw($);
		$ = 10
	}
	while (B && B.nodeType == 1 && _ < $ && B != C && B != D) {
		if (Zq6(B, A)) return B;
		_++;
		B = B.parentNode
	}
	return null
};
zmj.copyTo(zmj, {
	byId: $iw,
	hasClass: Zq6,
	addClass: _I,
	removeClass: Kw,
	getMargins: Jfu,
	getBorders: WN,
	getPaddings: UwK,
	setWidth: WE,
	setHeight: ZIA,
	getWidth: F$u,
	getHeight: $L7,
	setBox: YcA,
	getBox: Vhwd,
	setStyle: DTHl,
	getStyle: Ps6,
	repaint: function($) {
		if (!$) $ = document.body;
		_I($, "zmj-repaint");
		setTimeout(function() {
			Kw($, "zmj-repaint")
		},
		1)
	},
	getSize: function($, _) {
		return {
			width: F$u($, _),
			height: $L7($, _)
		}
	},
	setSize: function(A, $, _) {
		WE(A, $);
		ZIA(A, _)
	},
	setX: function(_, B) {
		B = parseInt(B);
		var $ = jQuery(_).offset(),
		A = parseInt($.top);
		if (A === undefined) A = $[1];
		zmj[GzmA](_, B, A)
	},
	setY: function(_, A) {
		A = parseInt(A);
		var $ = jQuery(_).offset(),
		B = parseInt($.left);
		if (B === undefined) B = $[0];
		zmj[GzmA](_, B, A)
	},
	setXY: function(_, B, A) {
		var $ = {
			left: parseInt(B),
			top: parseInt(A)
		};
		jQuery(_).offset($);
		jQuery(_).offset($)
	},
	getXY: function(_) {
		var $ = jQuery(_).offset();
		return [parseInt($.left), parseInt($.top)]
	},
	getViewportBox: function() {
		var $ = jQuery(window).width(),
		_ = jQuery(window).height(),
		B = jQuery(document).scrollLeft(),
		A = jQuery(document.body).scrollTop();
		if (document.documentElement) A = document.documentElement.scrollTop;
		return {
			x: B,
			y: A,
			width: $,
			height: _,
			right: B + $,
			bottom: A + _
		}
	},
	getChildNodes: function(A, C) {
		A = $iw(A);
		if (!A) return;
		var E = A.childNodes,
		B = [];
		for (var $ = 0, D = E.length; $ < D; $++) {
			var _ = E[$];
			if (_.nodeType == 1 || C === true) B.push(_)
		}
		return B
	},
	removeChilds: function(B, _) {
		B = $iw(B);
		if (!B) return;
		var C = zmj[P8pq](B, true);
		for (var $ = 0, D = C.length; $ < D; $++) {
			var A = C[$];
			if (_ && A == _);
			else B.removeChild(C[$])
		}
	},
	isAncestor: EjQz,
	findParent: J6j,
	findChild: function(_, A) {
		_ = $iw(_);
		var B = _.getElementsByTagName("*");
		for (var $ = 0, C = B.length; $ < C; $++) {
			var _ = B[$];
			if (Zq6(_, A)) return _
		}
	},
	isAncestor: function(A, $) {
		var _ = false;
		A = $iw(A);
		$ = $iw($);
		if (A === $) return true;
		if (A && $) if (A.contains) {
			try {
				return A.contains($)
			} catch(B) {
				return false
			}
		} else if (A.compareDocumentPosition) return !! (A.compareDocumentPosition($) & 16);
		else while ($ = $.parentNode) _ = $ == A || _;
		return _
	},
	getOffsetsTo: function(_, A) {
		var $ = this.getXY(_),
		B = this.getXY(A);
		return [$[0] - B[0], $[1] - B[1]]
	},
	scrollIntoView: function(I, H, F) {
		var B = $iw(H) || document.body,
		$ = this.getOffsetsTo(I, B),
		C = $[0] + B.scrollLeft,
		J = $[1] + B.scrollTop,
		D = J + I.offsetHeight,
		A = C + I.offsetWidth,
		G = B.clientHeight,
		K = parseInt(B.scrollTop, 10),
		_ = parseInt(B.scrollLeft, 10),
		L = K + G,
		E = _ + B.clientWidth;
		if (I.offsetHeight > G || J < K) B.scrollTop = J;
		else if (D > L) B.scrollTop = D - G;
		B.scrollTop = B.scrollTop;
		if (F !== false) {
			if (I.offsetWidth > B.clientWidth || C < _) B.scrollLeft = C;
			else if (A > E) B.scrollLeft = A - B.clientWidth;
			B.scrollLeft = B.scrollLeft
		}
		return this
	},
	setOpacity: function(_, $) {
		jQuery(_).css({
			"opacity": $
		})
	},
	selectable: function(_, $) {
		_ = $iw(_);
		if ( !! $) {
			jQuery(_)[MLy]("zmj-unselectable");
			if (isIE) _.unselectable = "off";
			else {
				_.style.MozUserSelect = "";
				_.style.KhtmlUserSelect = "";
				_.style.UserSelect = ""
			}
		} else {
			jQuery(_)[HJ]("zmj-unselectable");
			if (isIE) _.unselectable = "on";
			else {
				_.style.MozUserSelect = "none";
				_.style.UserSelect = "none";
				_.style.KhtmlUserSelect = "none"
			}
		}
	},
	selectRange: function(B, A, _) {
		if (B.createTextRange) {
			var $ = B.createTextRange();
			$.moveStart("character", A);
			$.moveEnd("character", _ - B.value.length);
			$[D3f]()
		} else if (B.setSelectionRange) B.setSelectionRange(A, _);
		try {
			B.focus()
		} catch(C) {}
	},
	getSelectRange: function(A) {
		A = $iw(A);
		if (!A) return;
		try {
			A.focus()
		} catch(C) {}
		var $ = 0,
		B = 0;
		if (A.createTextRange) {
			var _ = document.selection.createRange().duplicate();
			_.moveEnd("character", A.value.length);
			if (_.text === "") $ = A.value.length;
			else $ = A.value.lastIndexOf(_.text);
			_ = document.selection.createRange().duplicate();
			_.moveStart("character", -A.value.length);
			B = _.text.length
		} else {
			$ = A.selectionStart;
			B = A.selectionEnd
		}
		return [$, B]
	}
}); (function() {
	var $ = {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},
	_ = document.createElement("div");
	_.setAttribute("class", "t");
	var A = _.className === "t";
	zmj.setAttr = function(B, C, _) {
		B.setAttribute(A ? C: ($[C] || C), _)
	};
	zmj.getAttr = function(B, C) {
		if (C == "value" && (isIE6 || isIE7)) {
			var _ = B.attributes[C];
			return _ ? _.value: null
		}
		var D = B.getAttribute(A ? C: ($[C] || C));
		if (typeof D == "function") D = B.attributes[C].value;
		return D
	}
})();
BRs = function(_, $, C, A) {
	var B = "on" + $.toLowerCase();
	_[B] = function(_) {
		_ = _ || window.event;
		_.target = _.target || _.srcElement;
		if (!_.preventDefault) _.preventDefault = function() {
			var $ = this;
			if ($.preventDefault) $.preventDefault();
			else if (window.event) window.event.returnValue = false
		};
		if (!_.stopPropogation) _.stopPropogation = function() {
			var $ = this;
			if ($.stopPropagation) $.stopPropagation();
			else if (window.event) window.event.cancelBubble = true
		};
		var $ = C[KQk](A, _);
		if ($ === false) return false
	}
};
WoBw = function(_, $, D, A) {
	_ = $iw(_);
	A = A || _;
	if (!_ || !$ || !D || !A) return false;
	var B = zmj[H0](_, $, D, A);
	if (B) return false;
	var C = zmj.createDelegate(D, A);
	zmj.listeners.push([_, $, D, A, C]);
	if (jQuery.browser.mozilla && $ == "mousewheel") $ = "DOMMouseScroll";
	jQuery(_).bind($, C)
};
Is = function(_, $, C, A) {
	_ = $iw(_);
	A = A || _;
	if (!_ || !$ || !C || !A) return false;
	var B = zmj[H0](_, $, C, A);
	if (!B) return false;
	zmj.listeners.remove(B);
	if (jQuery.browser.mozilla && $ == "mousewheel") $ = "DOMMouseScroll";
	jQuery(_).unbind($, B[4])
};
zmj.copyTo(zmj, {
	listeners: [],
	on: WoBw,
	un: Is,
	findListener: function(A, _, F, B) {
		A = $iw(A);
		B = B || A;
		if (!A || !_ || !F || !B) return false;
		var D = zmj.listeners;
		for (var $ = 0, E = D.length; $ < E; $++) {
			var C = D[$];
			if (C[0] == A && C[1] == _ && C[2] == F && C[3] == B) return C
		}
	},
	clearEvent: function(A, _) {
		A = $iw(A);
		if (!A) return false;
		var C = zmj.listeners;
		for (var $ = C.length - 1; $ >= 0; $--) {
			var B = C[$];
			if (B[0] == A) if (!_ || _ == B[1]) Is(A, B[1], B[2], B[3])
		}
	}
});
zmj.__windowResizes = [];
zmj.onWindowResize = function(_, $) {
	zmj.__windowResizes.push([_, $])
};
WoBw(window, "resize",
function(C) {
	var _ = zmj.__windowResizes;
	for (var $ = 0, B = _.length; $ < B; $++) {
		var A = _[$];
		A[0][KQk](A[1], C)
	}
});
zmj.copyTo(Array.prototype, {
	add: Array[Yq].enqueue = function($) {
		this[this.length] = $;
		return this
	},
	getRange: function(_, A) {
		var B = [];
		for (var $ = _; $ <= A; $++) B[B.length] = this[$];
		return B
	},
	addRange: function(A) {
		for (var $ = 0, _ = A.length; $ < _; $++) this[this.length] = A[$];
		return this
	},
	clear: function() {
		this.length = 0;
		return this
	},
	clone: function() {
		if (this.length === 1) return [this[0]];
		else return Array.apply(null, this)
	},
	contains: function($) {
		return (this.indexOf($) >= 0)
	},
	indexOf: function(_, B) {
		var $ = this.length;
		for (var A = (B < 0) ? Math.max(0, $ + B) : B || 0; A < $; A++) if (this[A] === _) return A;
		return - 1
	},
	dequeue: function() {
		return this.shift()
	},
	insert: function(_, $) {
		this.splice(_, 0, $);
		return this
	},
	insertRange: function(_, B) {
		for (var A = B.length - 1; A >= 0; A--) {
			var $ = B[A];
			this.splice(_, 0, $)
		}
		return this
	},
	remove: function(_) {
		var $ = this.indexOf(_);
		if ($ >= 0) this.splice($, 1);
		return ($ >= 0)
	},
	removeAt: function($) {
		var _ = this[$];
		this.splice($, 1);
		return _
	},
	removeRange: function(_) {
		_ = _.clone();
		for (var $ = 0, A = _.length; $ < A; $++) this.remove(_[$])
	}
});
zmj.Keyboard = {
	Left: 37,
	Top: 38,
	Right: 39,
	Bottom: 40,
	PageUp: 33,
	PageDown: 34,
	End: 35,
	Home: 36,
	Enter: 13,
	ESC: 27,
	Space: 32,
	Tab: 9,
	Del: 46,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123
};
var ua = navigator.userAgent.toLowerCase(),
check = function($) {
	return $.test(ua)
},
DOC = document,
isStrict = DOC.compatMode == "CSS1Compat",
isOpera = Object[Yq].toString[KQk](window.opera) == "[object Opera]",
isChrome = check(/chrome/),
isWebKit = check(/webkit/),
isSafari = !isChrome && check(/safari/),
isSafari2 = isSafari && check(/applewebkit\/4/),
isSafari3 = isSafari && check(/version\/3/),
isSafari4 = isSafari && check(/version\/4/),
isIE = !!window.attachEvent && !isOpera,
isIE7 = isIE && check(/msie 7/),
isIE8 = isIE && check(/msie 8/),
isIE9 = isIE && check(/msie 9/),
isIE10 = isIE && document.documentMode == 10,
isIE6 = isIE && !isIE7 && !isIE8 && !isIE9 && !isIE10,
isFirefox = navigator.userAgent.indexOf("Firefox") > 0,
isGecko = !isWebKit && check(/gecko/),
isGecko2 = isGecko && check(/rv:1\.8/),
isGecko3 = isGecko && check(/rv:1\.9/),
isBorderBox = isIE && !isStrict,
isWindows = check(/windows|win32/),
isMac = check(/macintosh|mac os x/),
isAir = check(/adobeair/),
isLinux = check(/linux/),
isSecure = /^https/i.test(window.location.protocol);
if (isIE6) {
	try {
		DOC.execCommand("BackgroundImageCache", false, true)
	} catch(e) {}
}
zmj.isIE = isIE;
zmj.isIE6 = isIE6;
zmj.isIE7 = isIE7;
zmj.isIE8 = isIE8;
zmj.isIE9 = isIE9;
zmj.isFireFox = jQuery.browser.mozilla;
zmj.isOpera = jQuery.browser.opera;
zmj.isSafari = jQuery.browser.safari;
zmj.noBorderBox = false;
if (jQuery.boxModel == false && isIE && isIE9 == false) zmj.noBorderBox = true;
zmj.MouseButton = {
	Left: 0,
	Middle: 1,
	Right: 2
};
if (isIE && !isIE9) zmj.MouseButton = {
	Left: 1,
	Middle: 4,
	Right: 2
};
zmj._MaskID = 1;
zmj._MaskObjects = {};
zmj.mask = function(C) {
	var _ = $iw(C);
	if (zmj.isElement(_)) C = {
		el: _
	};
	else if (typeof C == "string") C = {
		html: C
	};
	C = zmj.copyTo({
		html: "",
		cls: "",
		style: "",
		backStyle: "background:#ccc"
	},
	C);
	C.el = $iw(C.el);
	if (!C.el) C.el = document.body;
	_ = C.el;
	zmj["unmask"](C.el);
	_._maskid = zmj._MaskID++;
	zmj._MaskObjects[_._maskid] = C;
	var $ = zmj.append(_, "<div class=\"zmj-mask\">" + "<div class=\"zmj-mask-background\" style=\"" + C.backStyle + "\"></div>" + "<div class=\"zmj-mask-msg " + C.cls + "\" style=\"" + C.style + "\">" + C.html + "</div>" + "</div>");
	C.maskEl = $;
	if (!zmj.isNull(C.opacity)) zmj.setOpacity($.firstChild, C.opacity);
	function A() {
		B.style.display = "block";
		var $ = zmj.getSize(B);
		B.style.marginLeft = -$.width / 2 + "px";
		B.style.marginTop = -$.height / 2 + "px"
	}
	var B = $.lastChild;
	B.style.display = "none";
	setTimeout(function() {
		A()
	},
	0)
};
zmj["unmask"] = function(_) {
	_ = $iw(_);
	if (!_) _ = document.body;
	var A = zmj._MaskObjects[_._maskid];
	if (!A) return;
	delete zmj._MaskObjects[_._maskid];
	var $ = A.maskEl;
	A.maskEl = null;
	if ($ && $.parentNode) $.parentNode.removeChild($)
};
zmj.Cookie = {
	get: function(D) {
		var A = document.cookie.split("; "),
		B = null;
		for (var $ = 0; $ < A.length; $++) {
			var _ = A[$].split("=");
			if (D == _[0]) B = _
		}
		if (B) {
			var C = B[1];
			if (C === undefined) return C;
			return unescape(C)
		}
		return null
	},
	set: function(C, $, B, A) {
		var _ = new Date();
		if (B != null) _ = new Date(_.getTime() + (B * 1000 * 3600 * 24));
		document.cookie = C + "=" + escape($) + ((B == null) ? "": ("; expires=" + _.toGMTString())) + ";path=/" + (A ? "; domain=" + A: "")
	},
	del: function(_, $) {
		this.set(_, null, -100, $)
	}
};
zmj.copyTo(zmj, {
	treeToArray: function(C, I, J, A, $) {
		if (!I) I = "children";
		var F = [];
		for (var H = 0, D = C.length; H < D; H++) {
			var B = C[H];
			F[F.length] = B;
			if (A) B[A] = $;
			var _ = B[I];
			if (_ && _.length > 0) {
				var E = B[J],
				G = this[Zk](_, I, J, A, E);
				F.addRange(G)
			}
		}
		return F
	},
	arrayToTree: function(C, A, H, B) {
		if (!A) A = "children";
		H = H || "_id";
		B = B || "_pid";
		var G = [],
		F = {};
		for (var _ = 0, E = C.length; _ < E; _++) {
			var $ = C[_],
			I = $[H];
			if (I !== null && I !== undefined) F[I] = $;
			delete $[A]
		}
		for (_ = 0, E = C.length; _ < E; _++) {
			var $ = C[_],
			D = F[$[B]];
			if (!D) {
				G.push($);
				continue
			}
			if (!D[A]) D[A] = [];
			D[A].push($)
		}
		return G
	}
});
function UUID() {
	var A = [],
	_ = "0123456789ABCDEF".split("");
	for (var $ = 0; $ < 36; $++) A[$] = Math.floor(Math.random() * 16);
	A[14] = 4;
	A[19] = (A[19] & 3) | 8;
	for ($ = 0; $ < 36; $++) A[$] = _[A[$]];
	A[8] = A[13] = A[18] = A[23] = "-";
	return A.join("")
}
String.format = function(_) {
	var $ = Array[Yq].slice[KQk](arguments, 1);
	_ = _ || "";
	return _.replace(/\{(\d+)\}/g,
	function(A, _) {
		return $[_]
	})
};
String[Yq].trim = function() {
	var $ = /^\s+|\s+$/g;
	return function() {
		return this.replace($, "")
	}
} ();
zmj.copyTo(zmj, {
	measureText: function(B, _, C) {
		if (!this.measureEl) this.measureEl = zmj.append(document.body, "<div></div>");
		this.measureEl.style.cssText = "position:absolute;left:-1000px;top:-1000px;visibility:hidden;";
		if (typeof B == "string") this.measureEl.className = B;
		else {
			this.measureEl.className = "";
			var G = jQuery(B),
			A = jQuery(this.measureEl),
			F = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"];
			for (var $ = 0, E = F.length; $ < E; $++) {
				var D = F[$];
				A.css(D, G.css(D))
			}
		}
		if (C) DTHl(this.measureEl, C);
		this.measureEl.innerHTML = _;
		return zmj.getSize(this.measureEl)
	}
});
jQuery(function() {
	var $ = new Date();
	zmj.isReady = true;
	zmj.parse();
	Pbl8();
	if ((Ps6(document.body, "overflow") == "hidden" || Ps6(document.documentElement, "overflow") == "hidden") && (isIE6 || isIE7)) {
		jQuery(document.body).css("overflow", "visible");
		jQuery(document.documentElement).css("overflow", "visible")
	}
	zmj.__LastWindowWidth = document.documentElement.clientWidth;
	zmj.__LastWindowHeight = document.documentElement.clientHeight
});
zmj_onload = function($) {
	zmj.layout(null, false);
	WoBw(window, "resize", zmj_onresize)
};
WoBw(window, "load", zmj_onload);
zmj.__LastWindowWidth = document.documentElement.clientWidth;
zmj.__LastWindowHeight = document.documentElement.clientHeight;
zmj.doWindowResizeTimer = null;
zmj.allowLayout = true;
zmj_onresize = function(_) {
	if (zmj.doWindowResizeTimer) clearTimeout(zmj.doWindowResizeTimer);
	if (UUg == false || zmj.allowLayout == false) return;
	if (typeof Ext != "undefined") zmj.doWindowResizeTimer = setTimeout(function() {
		var _ = document.documentElement.clientWidth,
		$ = document.documentElement.clientHeight;
		if (zmj.__LastWindowWidth == _ && zmj.__LastWindowHeight == $);
		else {
			zmj.__LastWindowWidth = _;
			zmj.__LastWindowHeight = $;
			zmj.layout(null, false)
		}
		zmj.doWindowResizeTimer = null
	},
	300);
	else {
		var $ = 100;
		zmj.doWindowResizeTimer = setTimeout(function() {
			var _ = document.documentElement.clientWidth,
			$ = document.documentElement.clientHeight;
			if (zmj.__LastWindowWidth == _ && zmj.__LastWindowHeight == $);
			else {
				zmj.__LastWindowWidth = _;
				zmj.__LastWindowHeight = $;
				zmj.layout(null, false)
			}
			zmj.doWindowResizeTimer = null
		},
		$)
	}
};
zmj[F9lZ] = function(_, A) {
	var $ = A || document.body;
	while (1) {
		if (_ == null || !_.style) return false;
		if (_ && _.style && _.style.display == "none") return false;
		if (_ == $) return true;
		_ = _.parentNode
	}
	return true
};
zmj.isWindowDisplay = function() {
	try {
		var _ = window.parent,
		E = _ != window;
		if (E) {
			var C = _.document.getElementsByTagName("iframe"),
			H = _.document.getElementsByTagName("frame"),
			G = [];
			for (var $ = 0, D = C.length; $ < D; $++) G.push(C[$]);
			for ($ = 0, D = H.length; $ < D; $++) G.push(H[$]);
			var B = null;
			for ($ = 0, D = G.length; $ < D; $++) {
				var A = G[$];
				if (A.contentWindow == window) {
					B = A;
					break
				}
			}
			if (!B) return false;
			return zmj[F9lZ](B, _.document.body)
		} else return true
	} catch(F) {
		return true
	}
};
UUg = zmj.isWindowDisplay();
zmj.layoutIFrames = function($) {
	if (!$) $ = document.body;
	var _ = $.getElementsByTagName("iframe");
	setTimeout(function() {
		for (var A = 0, C = _.length; A < C; A++) {
			var B = _[A];
			try {
				if (zmj[F9lZ](B) && EjQz($, B)) {
					if (B.contentWindow.zmj) if (B.contentWindow.UUg == false) {
						B.contentWindow.UUg = B.contentWindow.zmj.isWindowDisplay();
						B.contentWindow.zmj.layout()
					} else B.contentWindow.zmj.layout(null, false);
					B.contentWindow.zmj.layoutIFrames()
				}
			} catch(D) {}
		}
	},
	30)
};
$.ajaxSetup({
	cache: false
});
if (isIE) setInterval(function() {
	CollectGarbage()
},
1000);
zmj_unload = function(F) {
	var E = document.body.getElementsByTagName("iframe");
	if (E.length > 0) {
		var D = [];
		for (var $ = 0, C = E.length; $ < C; $++) D.push(E[$]);
		for ($ = 0, C = D.length; $ < C; $++) {
			try {
				var B = D[$];
				B.src = "";
				if (B.parentNode) B.parentNode.removeChild(B)
			} catch(F) {}
		}
	}
	var A = zmj.getComponents();
	for ($ = 0, C = A.length; $ < C; $++) {
		var _ = A[$];
		_[Wsj](false)
	}
	A.length = 0;
	A = null;
	Is(window, "unload", zmj_unload);
	Is(window, "load", zmj_onload);
	Is(window, "resize", zmj_onresize);
	zmj.components = {};
	zmj.classes = {};
	zmj.uiClasses = {};
	try {
		CollectGarbage()
	} catch(F) {}
};
WoBw(window, "unload", zmj_unload);
function __OnIFrameMouseDown() {
	jQuery(document).trigger("mousedown")
}
function __BindIFrames() {
	var C = document.getElementsByTagName("iframe");
	for (var $ = 0, A = C.length; $ < A; $++) {
		var _ = C[$];
		try {
			if (_.contentWindow) _.contentWindow.document.onmousedown = __OnIFrameMouseDown
		} catch(B) {}
	}
}
setInterval(function() {
	__BindIFrames()
},
1500);
zmj.zIndex = 1000;
zmj.getMaxZIndex = function() {
	return zmj.zIndex++
};
Vt9 = function() {
	this._bindFields = [];
	this._bindForms = [];
	Vt9[CPy][CLu][KQk](this)
};
HX_P(Vt9, Ltw2, {
	bindField: function(A, D, C, B, $) {
		A = zmj.get(A);
		D = zmj.get(D);
		if (!A || !D || !C) return;
		var _ = {
			control: A,
			source: D,
			field: C,
			convert: $,
			mode: B
		};
		this._bindFields.push(_);
		D.on("currentchanged", this.NQa, this);
		A.on("valuechanged", this.C9Bc, this)
	},
	bindForm: function(B, F, D, A) {
		B = $iw(B);
		F = zmj.get(F);
		if (!B || !F) return;
		var B = new zmj.Form(B),
		$ = B.getFields();
		for (var _ = 0, E = $.length; _ < E; _++) {
			var C = $[_];
			this.bindField(C, F, C.getName(), D, A)
		}
	},
	NQa: function(H) {
		if (this._doSetting) return;
		this._doSetting = true;
		var G = H.sender,
		_ = H.record;
		for (var $ = 0, F = this._bindFields.length; $ < F; $++) {
			var B = this._bindFields[$];
			if (B.source != G) continue;
			var C = B.control,
			D = B.field;
			if (C[NHk2]) if (_) {
				var A = _[D];
				C[NHk2](A)
			} else C[NHk2]("");
			if (C[Vh] && C.textName) if (_) C[Vh](_[C.textName]);
			else C[Vh]("")
		}
		var E = this;
		setTimeout(function() {
			E._doSetting = false
		},
		10)
	},
	C9Bc: function(H) {
		if (this._doSetting) return;
		this._doSetting = true;
		var D = H.sender,
		_ = D.getValue();
		for (var $ = 0, G = this._bindFields.length; $ < G; $++) {
			var C = this._bindFields[$];
			if (C.control != D || C.mode === false) continue;
			var F = C.source,
			B = F.getCurrent();
			if (!B) continue;
			var A = {};
			A[C.field] = _;
			if (D.getText && D.textName) A[D.textName] = D.getText();
			F[FJM](B, A)
		}
		var E = this;
		setTimeout(function() {
			E._doSetting = false
		},
		10)
	}
});
Cmk(Vt9, "databinding");
L4A = function() {
	this._sources = {};
	this._data = {};
	this._links = [];
	this.HBm = {};
	L4A[CPy][CLu][KQk](this)
};
HX_P(L4A, Ltw2, {
	add: function(_, $) {
		if (!_ || !$) return;
		this._sources[_] = $;
		this._data[_] = [];
		$.autoCreateNewID = true;
		$.J8M = $.getIdField();
		$.YBU = false;
		$.on("addrow", this.Ly, this);
		$.on("updaterow", this.Ly, this);
		$.on("deleterow", this.Ly, this);
		$.on("removerow", this.Ly, this);
		$.on("preload", this.Aq, this);
		$.on("selectionchanged", this.WfcZ, this)
	},
	addLink: function(B, _, $) {
		if (!B || !_ || !$) return;
		if (!this._sources[B] || !this._sources[_]) return;
		var A = {
			parentName: B,
			childName: _,
			parentField: $
		};
		this._links.push(A)
	},
	clearData: function() {
		this._data = {};
		this.HBm = {};
		for (var $ in this._sources) this._data = []
	},
	getData: function() {
		return this._data
	},
	_getNameByListControl: function($) {
		for (var A in this._sources) {
			var _ = this._sources[A];
			if (_ == $) return A
		}
	},
	_getRecord: function(E, _, D) {
		var B = this._data[E];
		if (!B) return false;
		for (var $ = 0, C = B.length; $ < C; $++) {
			var A = B[$];
			if (A[D] == _[D]) return A
		}
		return null
	},
	Ly: function(F) {
		var C = F.type,
		_ = F.record,
		D = this._getNameByListControl(F.sender),
		E = this._getRecord(D, _, F.sender.getIdField()),
		A = this._data[D];
		if (E) {
			A = this._data[D];
			A.remove(E)
		}
		if (C == "removerow" && _._state == "added");
		else A.push(_);
		this.HBm[D] = F.sender.HBm;
		if (_._state == "added") {
			var $ = this._getParentSource(F.sender);
			if ($) {
				var B = $[DNU]();
				if (B) _._parentId = B[$.getIdField()];
				else A.remove(_)
			}
		}
	},
	Aq: function(M) {
		var J = M.sender,
		L = this._getNameByListControl(J),
		K = M.sender.getIdField(),
		A = this._data[L],
		$ = {};
		for (var F = 0, C = A.length; F < C; F++) {
			var G = A[F];
			$[G[K]] = G
		}
		var N = this.HBm[L];
		if (N) J.HBm = N;
		var I = M.data || [];
		for (F = 0, C = I.length; F < C; F++) {
			var G = I[F],
			H = $[G[K]];
			if (H) {
				delete H._uid;
				zmj.copyTo(G, H)
			}
		}
		var D = this._getParentSource(J);
		if (J.getPageIndex && J.getPageIndex() == 0) {
			var E = [];
			for (F = 0, C = A.length; F < C; F++) {
				G = A[F];
				if (G._state == "added") if (D) {
					var B = D[DNU]();
					if (B && B[D.getIdField()] == G._parentId) E.push(G)
				} else E.push(G)
			}
			E.reverse();
			I.insertRange(0, E)
		}
		var _ = [];
		for (F = I.length - 1; F >= 0; F--) {
			G = I[F],
			H = $[G[K]];
			if (H && H._state == "removed") {
				I.removeAt(F);
				_.push(H)
			}
		}
	},
	_getParentSource: function(C) {
		var _ = this._getNameByListControl(C);
		for (var $ = 0, B = this._links.length; $ < B; $++) {
			var A = this._links[$];
			if (A.childName == _) return this._sources[A.parentName]
		}
	},
	_getLinks: function(B) {
		var C = this._getNameByListControl(B),
		D = [];
		for (var $ = 0, A = this._links.length; $ < A; $++) {
			var _ = this._links[$];
			if (_.parentName == C) D.push(_)
		}
		return D
	},
	WfcZ: function(G) {
		var A = G.sender,
		_ = A[DNU](),
		F = this._getLinks(A);
		for (var $ = 0, E = F.length; $ < E; $++) {
			var D = F[$],
			C = this._sources[D.childName];
			if (_) {
				var B = {};
				B[D.parentField] = _[A.getIdField()];
				C.load(B)
			} else C[YIu]([])
		}
	}
});
Cmk(L4A, "dataset");
QfS = function() {
	QfS[CPy][CLu][KQk](this)
};
HX_P(QfS, ET, {
	_clearBorder: false,
	formField: true,
	value: "",
	uiCls: "zmj-hidden",
	_create: function() {
		this.el = document.createElement("input");
		this.el.type = "hidden";
		this.el.className = "zmj-hidden"
	},
	setName: function($) {
		this.name = $;
		this.el.name = $
	},
	setValue: function($) {
		if ($ === null || $ === undefined) $ = "";
		this.el.value = $
	},
	getValue: function() {
		return this.el.value
	},
	getFormValue: function() {
		return this.getValue()
	}
});
Cmk(QfS, "hidden");
FAn = function() {
	FAn[CPy][CLu][KQk](this);
	this[FJhD](false);
	this.setAllowDrag(this.allowDrag);
	this.setAllowResize(this[URW])
};
HX_P(FAn, ET, {
	_clearBorder: false,
	uiCls: "zmj-popup",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = "zmj-popup";
		this._contentEl = this.el
	},
	_initEvents: function() {
		TQ(function() {
			BRs(this.el, "mouseover", this.J6I, this)
		},
		this)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		FAn[CPy][X5Q][KQk](this);
		this.Ib();
		var A = this.el.childNodes;
		if (A) for (var $ = 0, B = A.length; $ < B; $++) {
			var _ = A[$];
			zmj.layout(_)
		}
	},
	destroy: function($) {
		if (this.el) this.el.onmouseover = null;
		zmj.removeChilds(this._contentEl);
		Is(document, "mousedown", this.YFi, this);
		Is(window, "resize", this.DE, this);
		if (this.Qlq) {
			jQuery(this.Qlq).remove();
			this.Qlq = null
		}
		if (this.shadowEl) {
			jQuery(this.shadowEl).remove();
			this.shadowEl = null
		}
		FAn[CPy][Wsj][KQk](this, $)
	},
	setBody: function(_) {
		if (!_) return;
		if (!zmj.isArray(_)) _ = [_];
		for (var $ = 0, A = _.length; $ < A; $++) zmj.append(this._contentEl, _[$])
	},
	getAttrs: function($) {
		var A = FAn[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, A, ["popupEl", "popupCls", "showAction", "hideAction", "hAlign", "vAlign", "modalStyle", "onbeforeopen", "open", "onbeforeclose", "onclose"]);
		zmj[D4q]($, A, ["showModal", "showShadow", "allowDrag", "allowResize"]);
		zmj[PI]($, A, ["showDelay", "hideDelay", "hOffset", "vOffset", "minWidth", "minHeight", "maxWidth", "maxHeight"]);
		var _ = zmj[P8pq]($, true);
		A.body = _;
		return A
	}
});
Cmk(FAn, "popup");
FAn_prototype = {
	isPopup: false,
	popupEl: null,
	popupCls: "",
	showAction: "mouseover",
	hideAction: "outerclick",
	showDelay: 300,
	hideDelay: 500,
	hAlign: "left",
	vAlign: "below",
	hOffset: 0,
	vOffset: 0,
	minWidth: 50,
	minHeight: 25,
	maxWidth: 2000,
	maxHeight: 2000,
	showModal: false,
	showShadow: true,
	modalStyle: "opacity:0.2",
	F5: "zmj-popup-drag",
	MCN: "zmj-popup-resize",
	allowDrag: false,
	allowResize: false,
	UVj: function() {
		if (!this.popupEl) return;
		Is(this.popupEl, "click", this.C3, this);
		Is(this.popupEl, "contextmenu", this.HSJ, this);
		Is(this.popupEl, "mouseover", this.J6I, this)
	},
	UbC: function() {
		if (!this.popupEl) return;
		WoBw(this.popupEl, "click", this.C3, this);
		WoBw(this.popupEl, "contextmenu", this.HSJ, this);
		WoBw(this.popupEl, "mouseover", this.J6I, this)
	},
	doShow: function(A) {
		var $ = {
			popupEl: this.popupEl,
			htmlEvent: A,
			cancel: false
		};
		this.fire("BeforeOpen", $);
		if ($.cancel == true) return;
		this.fire("opening", $);
		if ($.cancel == true) return;
		if (!this.popupEl) this.show();
		else {
			var _ = {};
			if (A) _.xy = [A.pageX, A.pageY];
			this.showAtEl(this.popupEl, _)
		}
	},
	doHide: function(_) {
		var $ = {
			popupEl: this.popupEl,
			htmlEvent: _,
			cancel: false
		};
		this.fire("BeforeClose", $);
		if ($.cancel == true) return;
		this.close()
	},
	show: function(_, $) {
		this.showAtPos(_, $)
	},
	showAtPos: function(B, A) {
		this[_B9](document.body);
		if (!B) B = "center";
		if (!A) A = "middle";
		this.el.style.position = "absolute";
		this.el.style.left = "-2000px";
		this.el.style.top = "-2000px";
		this.el.style.display = "";
		this.Tpt9();
		var _ = zmj.getViewportBox(),
		$ = Vhwd(this.el);
		if (B == "left") B = 0;
		if (B == "center") B = _.width / 2 - $.width / 2;
		if (B == "right") B = _.width - $.width;
		if (A == "top") A = 0;
		if (A == "middle") A = _.y + _.height / 2 - $.height / 2;
		if (A == "bottom") A = _.height - $.height;
		if (B + $.width > _.right) B = _.right - $.width;
		if (A + $.height > _.bottom) A = _.bottom - $.height;
		this.H7z(B, A)
	},
	Y9Ee: function() {
		jQuery(this.Qlq).remove();
		if (!this[Lrs]) return;
		if (this.visible == false) return;
		var $ = document.documentElement,
		A = parseInt(Math.max(document.body.scrollWidth, $ ? $.scrollWidth: 0)),
		D = parseInt(Math.max(document.body.scrollHeight, $ ? $.scrollHeight: 0)),
		C = zmj.getViewportBox(),
		B = C.height;
		if (B < D) B = D;
		var _ = C.width;
		if (_ < A) _ = A;
		this.Qlq = zmj.append(document.body, "<div class=\"zmj-modal\"></div>");
		this.Qlq.style.height = B + "px";
		this.Qlq.style.width = _ + "px";
		this.Qlq.style.zIndex = Ps6(this.el, "zIndex") - 1;
		DTHl(this.Qlq, this.modalStyle)
	},
	Ib: function() {
		if (!this.shadowEl) this.shadowEl = zmj.append(document.body, "<div class=\"zmj-shadow\"></div>");
		this.shadowEl.style.display = this[_CL] ? "": "none";
		if (this[_CL]) {
			var $ = Vhwd(this.el),
			A = this.shadowEl.style;
			A.width = $.width + "px";
			A.height = $.height + "px";
			A.left = $.x + "px";
			A.top = $.y + "px";
			var _ = Ps6(this.el, "zIndex");
			if (!isNaN(_)) this.shadowEl.style.zIndex = _ - 2
		}
	},
	Tpt9: function() {
		this.el.style.display = "";
		var $ = Vhwd(this.el);
		if ($.width > this.maxWidth) {
			WE(this.el, this.maxWidth);
			$ = Vhwd(this.el)
		}
		if ($.height > this.maxHeight) {
			ZIA(this.el, this.maxHeight);
			$ = Vhwd(this.el)
		}
		if ($.width < this.minWidth) {
			WE(this.el, this.minWidth);
			$ = Vhwd(this.el)
		}
		if ($.height < this.minHeight) {
			ZIA(this.el, this.minHeight);
			$ = Vhwd(this.el)
		}
	},
	showAtEl: function(H, D) {
		H = $iw(H);
		if (!H) return;
		if (!this.isRender() || this.el.parentNode != document.body) this[_B9](document.body);
		var A = {
			hAlign: this.hAlign,
			vAlign: this.vAlign,
			hOffset: this.hOffset,
			vOffset: this.vOffset,
			popupCls: this.popupCls
		};
		zmj.copyTo(A, D);
		_I(H, A.popupCls);
		H.popupCls = A.popupCls;
		this._popupEl = H;
		this.el.style.position = "absolute";
		this.el.style.left = "-2000px";
		this.el.style.top = "-2000px";
		this.el.style.display = "";
		this[X5Q]();
		this.Tpt9();
		var J = zmj.getViewportBox(),
		B = Vhwd(this.el),
		L = Vhwd(H),
		F = A.xy,
		C = A.hAlign,
		E = A.vAlign,
		M = J.width / 2 - B.width / 2,
		K = 0;
		if (F) {
			M = F[0];
			K = F[1]
		}
		switch (A.hAlign) {
		case "outleft":
			M = L.x - B.width;
			break;
		case "left":
			M = L.x;
			break;
		case "center":
			M = L.x + L.width / 2 - B.width / 2;
			break;
		case "right":
			M = L.right - B.width;
			break;
		case "outright":
			M = L.right;
			break;
		default:
			break
		}
		switch (A.vAlign) {
		case "above":
			K = L.y - B.height;
			break;
		case "top":
			K = L.y;
			break;
		case "middle":
			K = L.y + L.height / 2 - B.height / 2;
			break;
		case "bottom":
			K = L.bottom - B.height;
			break;
		case "below":
			K = L.bottom;
			break;
		default:
			break
		}
		M = parseInt(M);
		K = parseInt(K);
		if (A.outVAlign || A.outHAlign) {
			if (A.outVAlign == "above") if (K + B.height > J.bottom) {
				var _ = L.y - J.y,
				I = J.bottom - L.bottom;
				if (_ > I) K = L.y - B.height
			}
			if (A.outHAlign == "outleft") if (M + B.width > J.right) {
				var G = L.x - J.x,
				$ = J.right - L.right;
				if (G > $) M = L.x - B.width
			}
			if (A.outHAlign == "right") if (M + B.width > J.right) M = L.right - B.width;
			this.H7z(M, K)
		} else this.showAtPos(M + A.hOffset, K + A.vOffset)
	},
	H7z: function(A, _) {
		this.el.style.display = "";
		this.el.style.zIndex = zmj.getMaxZIndex();
		zmj.setX(this.el, A);
		zmj.setY(this.el, _);
		this[FJhD](true);
		if (this.hideAction == "mouseout") WoBw(document, "mousemove", this.PhFm, this);
		var $ = this;
		this.Ib();
		this.Y9Ee();
		zmj.layoutIFrames(this.el);
		this.isPopup = true;
		WoBw(document, "mousedown", this.YFi, this);
		WoBw(window, "resize", this.DE, this);
		this.fire("Open")
	},
	open: function() {
		this.show()
	},
	close: function() {
		this.hide()
	},
	hide: function() {
		if (!this.el) return;
		if (this.popupEl) Kw(this.popupEl, this.popupEl.popupCls);
		if (this._popupEl) Kw(this._popupEl, this._popupEl.popupCls);
		this._popupEl = null;
		jQuery(this.Qlq).remove();
		if (this.shadowEl) this.shadowEl.style.display = "none";
		Is(document, "mousemove", this.PhFm, this);
		Is(document, "mousedown", this.YFi, this);
		Is(window, "resize", this.DE, this);
		this[FJhD](false);
		this.isPopup = false;
		this.fire("Close")
	},
	setPopupEl: function($) {
		$ = $iw($);
		if (!$) return;
		this.UVj();
		this.popupEl = $;
		this.UbC()
	},
	setPopupCls: function($) {
		this.popupCls = $
	},
	setShowAction: function($) {
		this.showAction = $
	},
	setHideAction: function($) {
		this.hideAction = $
	},
	setShowDelay: function($) {
		this.showDelay = $
	},
	setHideDelay: function($) {
		this.hideDelay = $
	},
	setHAlign: function($) {
		this.hAlign = $
	},
	setVAlign: function($) {
		this.vAlign = $
	},
	setHOffset: function($) {
		$ = parseInt($);
		if (isNaN($)) $ = 0;
		this.hOffset = $
	},
	setVOffset: function($) {
		$ = parseInt($);
		if (isNaN($)) $ = 0;
		this.vOffset = $
	},
	setShowModal: function($) {
		this[Lrs] = $
	},
	setShowShadow: function($) {
		this[_CL] = $
	},
	setMinWidth: function($) {
		if (isNaN($)) return;
		this.minWidth = $
	},
	setMinHeight: function($) {
		if (isNaN($)) return;
		this.minHeight = $
	},
	setMaxWidth: function($) {
		if (isNaN($)) return;
		this.maxWidth = $
	},
	setMaxHeight: function($) {
		if (isNaN($)) return;
		this.maxHeight = $
	},
	setAllowDrag: function($) {
		this.allowDrag = $;
		Kw(this.el, this.F5);
		if ($) _I(this.el, this.F5)
	},
	setAllowResize: function($) {
		this[URW] = $;
		Kw(this.el, this.MCN);
		if ($) _I(this.el, this.MCN)
	},
	C3: function(_) {
		if (this.AYic) return;
		if (this.showAction != "leftclick") return;
		var $ = jQuery(this.popupEl).attr("allowPopup");
		if (String($) == "false") return;
		this.doShow(_)
	},
	HSJ: function(_) {
		if (this.AYic) return;
		if (this.showAction != "rightclick") return;
		var $ = jQuery(this.popupEl).attr("allowPopup");
		if (String($) == "false") return;
		_.preventDefault();
		this.doShow(_)
	},
	J6I: function(A) {
		if (this.AYic) return;
		if (this.showAction != "mouseover") return;
		var _ = jQuery(this.popupEl).attr("allowPopup");
		if (String(_) == "false") return;
		clearTimeout(this._hideTimer);
		this._hideTimer = null;
		if (this.isPopup) return;
		var $ = this;
		this._showTimer = setTimeout(function() {
			$.doShow(A)
		},
		this.showDelay)
	},
	PhFm: function($) {
		if (this.hideAction != "mouseout") return;
		this.ACHW($)
	},
	YFi: function($) {
		if (this.hideAction != "outerclick") return;
		if (!this.isPopup) return;
		if (this[Oan4]($) || (this.popupEl && EjQz(this.popupEl, $.target)));
		else this.doHide($)
	},
	ACHW: function(_) {
		if (EjQz(this.el, _.target) || (this.popupEl && EjQz(this.popupEl, _.target)));
		else {
			clearTimeout(this._showTimer);
			this._showTimer = null;
			if (this._hideTimer) return;
			var $ = this;
			this._hideTimer = setTimeout(function() {
				$.doHide(_)
			},
			this.hideDelay)
		}
	},
	DE: function($) {
		if (this[F9lZ]() && !zmj.isIE6) this.Y9Ee()
	}
};
zmj.copyTo(FAn.prototype, FAn_prototype);
KiUK = function() {
	KiUK[CPy][CLu][KQk](this)
};
HX_P(KiUK, ET, {
	text: "",
	iconCls: "",
	iconStyle: "",
	plain: false,
	checkOnClick: false,
	checked: false,
	groupName: "",
	A55: "zmj-button-plain",
	_hoverCls: "zmj-button-hover",
	RJU: "zmj-button-pressed",
	YGs: "zmj-button-checked",
	UP0_: "zmj-button-disabled",
	allowCls: "",
	_clearBorder: false,
	set: function($) {
		if (typeof $ == "string") return this;
		this.Djl = $.text || $[Sz] || $.iconCls || $.iconPosition;
		KiUK[CPy].set[KQk](this, $);
		if (this.Djl === false) {
			this.Djl = true;
			this[J_w]()
		}
		return this
	},
	uiCls: "zmj-button",
	_create: function() {
		this.el = document.createElement("a");
		this.el.className = "zmj-button";
		this.el.hideFocus = true;
		this.el.href = "javascript:void(0)";
		this[J_w]()
	},
	_initEvents: function() {
		TQ(function() {
			BRs(this.el, "mousedown", this.P4, this);
			BRs(this.el, "click", this.PSN, this)
		},
		this)
	},
	destroy: function($) {
		if (this.el) {
			this.el.onclick = null;
			this.el.onmousedown = null
		}
		if (this.menu) this.menu.owner = null;
		this.menu = null;
		KiUK[CPy][Wsj][KQk](this, $)
	},
	doUpdate: function() {
		if (this.Djl === false) return;
		var _ = "",
		$ = this.text;
		if (this.iconCls && $) _ = " zmj-button-icon " + this.iconCls;
		else if (this.iconCls && $ === "") {
			_ = " zmj-button-iconOnly " + this.iconCls;
			$ = "&nbsp;"
		}
		var A = "<span class=\"zmj-button-text " + _ + "\">" + $ + "</span>";
		if (this.allowCls) A = A + "<span class=\"zmj-button-allow " + this.allowCls + "\"></span>";
		this.el.innerHTML = A
	},
	href: "",
	setHref: function($) {
		this.href = $;
		this.el.href = $;
		var _ = this.el;
		setTimeout(function() {
			_.onclick = null
		},
		100)
	},
	getHref: function() {
		return this.href
	},
	target: "",
	setTarget: function($) {
		this.target = $;
		this.el.target = $
	},
	getTarget: function() {
		return this.target
	},
	setText: function($) {
		if (this.text != $) {
			this.text = $;
			this[J_w]()
		}
	},
	getText: function() {
		return this.text
	},
	setIconCls: function($) {
		this.iconCls = $;
		this[J_w]()
	},
	getIconCls: function() {
		return this.iconCls
	},
	setIconStyle: function($) {
		this[Sz] = $;
		this[J_w]()
	},
	getIconStyle: function() {
		return this[Sz]
	},
	setIconPosition: function($) {
		this.iconPosition = "left";
		this[J_w]()
	},
	getIconPosition: function() {
		return this.iconPosition
	},
	setPlain: function($) {
		this.plain = $;
		if ($) this[B1z](this.A55);
		else this[T07](this.A55)
	},
	getPlain: function() {
		return this.plain
	},
	setGroupName: function($) {
		this[BZ] = $
	},
	getGroupName: function() {
		return this[BZ]
	},
	setCheckOnClick: function($) {
		this[Cl] = $
	},
	getCheckOnClick: function() {
		return this[Cl]
	},
	setChecked: function($) {
		var _ = this.checked != $;
		this.checked = $;
		if ($) this[B1z](this.YGs);
		else this[T07](this.YGs);
		if (_) this.fire("CheckedChanged")
	},
	getChecked: function() {
		return this.checked
	},
	doClick: function() {
		this.PSN(null)
	},
	PSN: function(D) {
		if (this[BUK]()) return;
		this.focus();
		if (this[Cl]) if (this[BZ]) {
			var _ = this[BZ],
			C = zmj.findControls(function($) {
				if ($.type == "button" && $[BZ] == _) return true
			});
			if (C.length > 0) {
				for (var $ = 0, A = C.length; $ < A; $++) {
					var B = C[$];
					if (B != this) B.setChecked(false)
				}
				this.setChecked(true)
			} else this.setChecked(!this.checked)
		} else this.setChecked(!this.checked);
		this.fire("click", {
			htmlEvent: D
		});
		return false
	},
	P4: function($) {
		if (this[BUK]()) return;
		this[B1z](this.RJU);
		WoBw(document, "mouseup", this.O$, this)
	},
	O$: function($) {
		this[T07](this.RJU);
		Is(document, "mouseup", this.O$, this)
	},
	onClick: function(_, $) {
		this.on("click", _, $)
	},
	getAttrs: function($) {
		var _ = KiUK[CPy][YIb][KQk](this, $);
		_.text = $.innerHTML;
		zmj[W5cB]($, _, ["text", "href", "iconCls", "iconStyle", "iconPosition", "groupName", "menu", "onclick", "oncheckedchanged", "target"]);
		zmj[D4q]($, _, ["plain", "checkOnClick", "checked"]);
		return _
	}
});
Cmk(KiUK, "button");
AVdButton = function() {
	AVdButton[CPy][CLu][KQk](this)
};
HX_P(AVdButton, KiUK, {
	uiCls: "zmj-menubutton",
	allowCls: "zmj-button-menu",
	setMenu: function($) {
		if (zmj.isArray($)) $ = {
			type: "menu",
			items: $
		};
		if (typeof $ == "string") {
			var _ = $iw($);
			if (!_) return;
			zmj.parse($);
			$ = zmj.get($)
		}
		if (this.menu !== $) {
			this.menu = zmj.getAndCreate($);
			this.menu.setPopupEl(this.el);
			this.menu.setPopupCls("zmj-button-popup");
			this.menu.setShowAction("leftclick");
			this.menu.setHideAction("outerclick");
			this.menu.setHAlign("left");
			this.menu.setVAlign("below");
			this.menu.hide();
			this.menu.owner = this
		}
	},
	setEnabled: function($) {
		this.enabled = $;
		if ($) this[T07](this.UP0_);
		else this[B1z](this.UP0_);
		jQuery(this.el).attr("allowPopup", !!$)
	}
});
Cmk(AVdButton, "menubutton");
zmj.SplitButton = function() {
	zmj.SplitButton[CPy][CLu][KQk](this)
};
HX_P(zmj.SplitButton, AVdButton, {
	uiCls: "zmj-splitbutton",
	allowCls: "zmj-button-split"
});
Cmk(zmj.SplitButton, "splitbutton");
_QU = function() {
	_QU[CPy][CLu][KQk](this)
};
HX_P(_QU, ET, {
	formField: true,
	text: "",
	checked: false,
	defaultValue: false,
	trueValue: true,
	falseValue: false,
	uiCls: "zmj-checkbox",
	_create: function() {
		var $ = this.uid + "$check";
		this.el = document.createElement("span");
		this.el.className = "zmj-checkbox";
		this.el.innerHTML = "<input id=\"" + $ + "\" name=\"" + this.id + "\" type=\"checkbox\" class=\"zmj-checkbox-check\"><label for=\"" + $ + "\" onclick=\"return false;\">" + this.text + "</label>";
		this.WOI = this.el.firstChild;
		this.WCT = this.el.lastChild
	},
	destroy: function($) {
		if (this.WOI) {
			this.WOI.onmouseup = null;
			this.WOI.onclick = null;
			this.WOI = null
		}
		_QU[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(this.el, "click", this.VYr, this);
			this.WOI.onmouseup = function() {
				return false
			};
			var $ = this;
			this.WOI.onclick = function() {
				if ($[BUK]()) return false
			}
		},
		this)
	},
	setName: function($) {
		this.name = $;
		zmj.setAttr(this.WOI, "name", this.name)
	},
	setText: function($) {
		if (this.text !== $) {
			this.text = $;
			this.WCT.innerHTML = $
		}
	},
	getText: function() {
		return this.text
	},
	setChecked: function($) {
		if ($ === true) $ = true;
		else if ($ == this.trueValue) $ = true;
		else if ($ == "true") $ = true;
		else if ($ === 1) $ = true;
		else if ($ == "Y") $ = true;
		else $ = false;
		if (this.checked !== $) {
			this.checked = !!$;
			this.WOI.checked = this.checked;
			this.value = this.getValue()
		}
	},
	getChecked: function() {
		return this.checked
	},
	setValue: function($) {
		if (this.checked != $) {
			this.setChecked($);
			this.value = this.getValue()
		}
	},
	getValue: function() {
		return String(this.checked == true ? this.trueValue: this.falseValue)
	},
	getFormValue: function() {
		return this.getValue()
	},
	setTrueValue: function($) {
		this.WOI.value = $;
		this.trueValue = $
	},
	getTrueValue: function() {
		return this.trueValue
	},
	setFalseValue: function($) {
		this.falseValue = $
	},
	getFalseValue: function() {
		return this.falseValue
	},
	VYr: function($) {
		if (this[BUK]()) return;
		this.setChecked(!this.checked);
		this.fire("checkedchanged", {
			checked: this.checked
		});
		this.fire("valuechanged", {
			value: this.getValue()
		});
		this.fire("click", $, this)
	},
	getAttrs: function(A) {
		var D = _QU[CPy][YIb][KQk](this, A),
		C = jQuery(A);
		D.text = A.innerHTML;
		zmj[W5cB](A, D, ["text", "oncheckedchanged", "onclick", "onvaluechanged"]);
		zmj[D4q](A, D, ["enabled"]);
		var B = zmj.getAttr(A, "checked");
		if (B) D.checked = (B == "true" || B == "checked") ? true: false;
		var _ = C.attr("trueValue");
		if (_) {
			D.trueValue = _;
			_ = parseInt(_);
			if (!isNaN(_)) D.trueValue = _
		}
		var $ = C.attr("falseValue");
		if ($) {
			D.falseValue = $;
			$ = parseInt($);
			if (!isNaN($)) D.falseValue = $
		}
		return D
	}
});
Cmk(_QU, "checkbox");
DjY = function() {
	DjY[CPy][CLu][KQk](this);
	var $ = this[BUK]();
	if ($ || this.allowInput == false) this.UQj[E8L] = true;
	if (this.enabled == false) this[B1z](this.UP0_);
	if ($) this[B1z](this.GS);
	if (this.required) this[B1z](this.Pp$)
};
HX_P(DjY, Rge, {
	name: "",
	formField: true,
	defaultValue: "",
	value: "",
	text: "",
	emptyText: "",
	maxLength: 1000,
	minLength: 0,
	width: 125,
	height: 21,
	inputAsValue: false,
	allowInput: true,
	_7sB: "zmj-buttonedit-noInput",
	GS: "zmj-buttonedit-readOnly",
	UP0_: "zmj-buttonedit-disabled",
	HXX: "zmj-buttonedit-empty",
	LaG: "zmj-buttonedit-focus",
	Nz: "zmj-buttonedit-button",
	VIy: "zmj-buttonedit-button-hover",
	RgX: "zmj-buttonedit-button-pressed",
	set: function($) {
		if (typeof $ == "string") return this;
		this.Djl = !($.enabled == false || $.allowInput == false || $[E8L]);
		DjY[CPy].set[KQk](this, $);
		if (this.Djl === false) {
			this.Djl = true;
			this[J_w]()
		}
		return this
	},
	uiCls: "zmj-buttonedit",
	MLCHtml: function() {
		var $ = "onmouseover=\"_I(this,'" + this.VIy + "');\" " + "onmouseout=\"Kw(this,'" + this.VIy + "');\"";
		return "<span class=\"zmj-buttonedit-button\" " + $ + "><span class=\"zmj-buttonedit-icon\"></span></span>"
	},
	_create: function() {
		this.el = document.createElement("span");
		this.el.className = "zmj-buttonedit";
		var $ = this.MLCHtml();
		this.el.innerHTML = "<span class=\"zmj-buttonedit-border\"><input type=\"input\" class=\"zmj-buttonedit-input\" autocomplete=\"off\"/>" + $ + "</span><input name=\"" + this.name + "\" type=\"hidden\"/>";
		this.AE = this.el.firstChild;
		this.UQj = this.AE.firstChild;
		this.SA3 = this.el.lastChild;
		this._buttonEl = this.AE.lastChild
	},
	destroy: function($) {
		if (this.el) {
			this.el.onmousedown = null;
			this.el.onmousewheel = null;
			this.el.onmouseover = null;
			this.el.onmouseout = null
		}
		if (this.UQj) {
			this.UQj.onchange = null;
			this.UQj.onfocus = null;
			zmj[L4D](this.UQj);
			this.UQj = null
		}
		DjY[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		TQ(function() {
			BRs(this.el, "mousedown", this.P4, this);
			BRs(this.UQj, "focus", this.NK, this);
			BRs(this.UQj, "change", this.Pid, this)
		},
		this)
	},
	WtIL: false,
	T2A: function() {
		if (this.WtIL) return;
		this.WtIL = true;
		WoBw(this.el, "click", this.PSN, this);
		WoBw(this.UQj, "blur", this.FKN, this);
		WoBw(this.UQj, "keydown", this.Ln1, this);
		WoBw(this.UQj, "keyup", this.Rz$, this);
		WoBw(this.UQj, "keypress", this.Dpb, this)
	},
	_buttonWidth: 20,
	doLayout: function() {
		if (!this.canLayout()) return;
		DjY[CPy][X5Q][KQk](this);
		var $ = F$u(this.el);
		if (this.el.style.width == "100%") $ -= 1;
		if (this.I2) $ -= 18;
		$ -= 2;
		this.AE.style.width = $ + "px";
		$ -= this._buttonWidth;
		if (this.el.style.width == "100%") $ -= 1;
		if ($ < 0) $ = 0;
		this.UQj.style.width = $ + "px"
	},
	setHeight: function($) {
		if (parseInt($) == $) $ += "px";
		this.height = $
	},
	C4F: function() {},
	focus: function() {
		try {
			this.UQj.focus();
			var $ = this;
			setTimeout(function() {
				if ($.Gz) $.UQj.focus()
			},
			10)
		} catch(_) {}
	},
	blur: function() {
		try {
			this.UQj.blur()
		} catch($) {}
	},
	selectText: function() {
		this.UQj[D3f]()
	},
	getTextEl: function() {
		return this.UQj
	},
	setName: function($) {
		this.name = $;
		this.SA3.name = $
	},
	setEmptyText: function($) {
		if ($ === null || $ === undefined) $ = "";
		this[$RmY] = $;
		this.C4F()
	},
	getEmptyText: function() {
		return this[$RmY]
	},
	setText: function($) {
		if ($ === null || $ === undefined) $ = "";
		var _ = this.text !== $;
		this.text = $;
		this.UQj.value = $
	},
	getText: function() {
		var $ = this.UQj.value;
		return $ != this[$RmY] ? $: ""
	},
	setValue: function($) {
		if ($ === null || $ === undefined) $ = "";
		var _ = this.value !== $;
		this.value = $;
		this.C4F()
	},
	getValue: function() {
		return this.value
	},
	getFormValue: function() {
		value = this.value;
		if (value === null || value === undefined) value = "";
		return String(value)
	},
	setMaxLength: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this.maxLength = $;
		this.UQj.maxLength = $
	},
	getMaxLength: function() {
		return this.maxLength
	},
	setMinLength: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this.minLength = $
	},
	getMinLength: function() {
		return this.minLength
	},
	_doReadOnly: function() {
		var $ = this[BUK]();
		if ($ || this.allowInput == false) this.UQj[E8L] = true;
		else this.UQj[E8L] = false;
		if ($) this[B1z](this.GS);
		else this[T07](this.GS);
		if (this.allowInput) this[T07](this._7sB);
		else this[B1z](this._7sB)
	},
	setAllowInput: function($) {
		this.allowInput = $;
		this._doReadOnly()
	},
	getAllowInput: function() {
		return this.allowInput
	},
	setInputAsValue: function($) {
		this.inputAsValue = $
	},
	getInputAsValue: function() {
		return this.inputAsValue
	},
	I2: null,
	getErrorIconEl: function() {
		if (!this.I2) this.I2 = zmj.append(this.el, "<span class=\"zmj-errorIcon\"></span>");
		return this.I2
	},
	PfCY: function() {
		if (this.I2) {
			var $ = this.I2;
			jQuery($).remove()
		}
		this.I2 = null
	},
	PSN: function($) {
		if (this[BUK]() || this.enabled == false) return;
		if (EjQz(this._buttonEl, $.target)) this.QG3($)
	},
	P4: function(B) {
		if (this[BUK]() || this.enabled == false) return;
		if (!EjQz(this.UQj, B.target)) {
			var $ = this;
			setTimeout(function() {
				$.focus();
				zmj.selectRange($.UQj, 1000, 1000)
			},
			1);
			if (EjQz(this._buttonEl, B.target)) {
				var _ = J6j(B.target, "zmj-buttonedit-up"),
				A = J6j(B.target, "zmj-buttonedit-down");
				if (_) {
					_I(_, this.RgX);
					this.A3hz(B, "up")
				} else if (A) {
					_I(A, this.RgX);
					this.A3hz(B, "down")
				} else {
					_I(this._buttonEl, this.RgX);
					this.A3hz(B)
				}
				WoBw(document, "mouseup", this.O$, this)
			}
		}
	},
	O$: function(_) {
		var $ = this;
		setTimeout(function() {
			var A = $._buttonEl.getElementsByTagName("*");
			for (var _ = 0, B = A.length; _ < B; _++) Kw(A[_], $.RgX);
			Kw($._buttonEl, $.RgX);
			Kw($.el, $.RJU)
		},
		80);
		Is(document, "mouseup", this.O$, this)
	},
	NK: function($) {
		this[J_w]();
		this.T2A();
		if (this[BUK]()) return;
		this.Gz = true;
		this[B1z](this.LaG)
	},
	FKN: function(_) {
		this.Gz = false;
		var $ = this;
		setTimeout(function() {
			if ($.Gz == false) $[T07]($.LaG)
		},
		2)
	},
	Ln1: function(_) {
		this.fire("keydown", {
			htmlEvent: _
		});
		if (_.keyCode == 8 && (this[BUK]() || this.allowInput == false)) return false;
		if (_.keyCode == 13) {
			var $ = this;
			$.Pid(null);
			$.fire("enter")
		}
		if (_.keyCode == 27) _.preventDefault()
	},
	Pid: function() {
		var _ = this.UQj.value,
		$ = this.getValue();
		this[NHk2](_);
		if ($ !== this.getFormValue()) this.Lo2()
	},
	Rz$: function($) {
		this.fire("keyup", {
			htmlEvent: $
		})
	},
	Dpb: function($) {
		this.fire("keypress", {
			htmlEvent: $
		})
	},
	QG3: function($) {
		var _ = {
			htmlEvent: $,
			cancel: false
		};
		this.fire("beforebuttonclick", _);
		if (_.cancel == true) return;
		this.fire("buttonclick", _)
	},
	A3hz: function(_, $) {
		this.focus();
		this[B1z](this.LaG);
		this.fire("buttonmousedown", {
			htmlEvent: _,
			spinType: $
		})
	},
	onButtonClick: function(_, $) {
		this.on("buttonclick", _, $)
	},
	onButtonMouseDown: function(_, $) {
		this.on("buttonmousedown", _, $)
	},
	onTextChanged: function(_, $) {
		this.on("textchanged", _, $)
	},
	textName: "",
	setTextName: function($) {
		this.textName = $;
		if (this.UQj) zmj.setAttr(this.UQj, "name", this.textName)
	},
	getTextName: function() {
		return this.textName
	},
	getAttrs: function($) {
		var A = DjY[CPy][YIb][KQk](this, $),
		_ = jQuery($);
		zmj[W5cB]($, A, ["value", "text", "textName", "onenter", "onkeydown", "onkeyup", "onkeypress", "onbuttonclick", "onbuttonmousedown", "ontextchanged"]);
		zmj[D4q]($, A, ["allowInput", "inputAsValue"]);
		zmj[PI]($, A, ["maxLength", "minLength"]);
		return A
	}
});
Cmk(DjY, "buttonedit");
FhF = function() {
	FhF[CPy][CLu][KQk](this)
};
HX_P(FhF, Rge, {
	name: "",
	formField: true,
	minHeight: 15,
	maxLength: 5000,
	emptyText: "",
	text: "",
	value: "",
	defaultValue: "",
	width: 125,
	height: 21,
	HXX: "zmj-textbox-empty",
	LaG: "zmj-textbox-focus",
	UP0_: "zmj-textbox-disabled",
	uiCls: "zmj-textbox",
	Vhy: "text",
	_create: function() {
		var $ = "<input type=\"" + this.Vhy + "\" class=\"zmj-textbox-input\" autocomplete=\"off\"/>";
		if (this.Vhy == "textarea") $ = "<textarea class=\"zmj-textbox-input\" autocomplete=\"off\"/></textarea>";
		$ += "<input type=\"hidden\"/>";
		this.el = document.createElement("span");
		this.el.className = "zmj-textbox";
		this.el.innerHTML = $;
		this.UQj = this.el.firstChild;
		this.SA3 = this.el.lastChild;
		this.AE = this.UQj
	},
	_initEvents: function() {
		TQ(function() {
			BRs(this.UQj, "drop", this.__OnDropText, this);
			BRs(this.UQj, "change", this.Pid, this);
			BRs(this.UQj, "focus", this.NK, this);
			BRs(this.el, "mousedown", this.P4, this)
		},
		this);
		this.on("validation", this.PNA, this)
	},
	WtIL: false,
	T2A: function() {
		if (this.WtIL) return;
		this.WtIL = true;
		WoBw(this.UQj, "blur", this.FKN, this);
		WoBw(this.UQj, "keydown", this.Ln1, this);
		WoBw(this.UQj, "keyup", this.Rz$, this);
		WoBw(this.UQj, "keypress", this.Dpb, this)
	},
	destroy: function($) {
		if (this.el) this.el.onmousedown = null;
		if (this.UQj) {
			this.UQj.ondrop = null;
			this.UQj.onchange = null;
			this.UQj.onfocus = null;
			zmj[L4D](this.UQj);
			this.UQj = null
		}
		if (this.SA3) {
			zmj[L4D](this.SA3);
			this.SA3 = null
		}
		FhF[CPy][Wsj][KQk](this, $)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		var $ = F$u(this.el);
		if (this.I2) $ -= 18;
		$ -= 4;
		if (this.el.style.width == "100%") $ -= 1;
		if ($ < 0) $ = 0;
		this.UQj.style.width = $ + "px"
	},
	setHeight: function($) {
		if (parseInt($) == $) $ += "px";
		this.height = $;
		if (this.Vhy == "textarea") {
			this.el.style.height = $;
			this[X5Q]()
		}
	},
	setName: function($) {
		if (this.name != $) {
			this.name = $;
			this.SA3.name = $
		}
	},
	setValue: function($) {
		if ($ === null || $ === undefined) $ = "";
		$ = String($);
		if (this.value !== $) {
			this.value = $;
			this.SA3.value = this.UQj.value = $;
			this.C4F()
		}
	},
	getValue: function() {
		return this.value
	},
	getFormValue: function() {
		value = this.value;
		if (value === null || value === undefined) value = "";
		return String(value)
	},
	setAllowInput: function($) {
		if (this.allowInput != $) {
			this.allowInput = $;
			this[J_w]()
		}
	},
	getAllowInput: function() {
		return this.allowInput
	},
	C4F: function() {
		if (this.Gz) return;
		if (this.value == "" && this[$RmY]) {
			this.UQj.value = this[$RmY];
			_I(this.el, this.HXX)
		} else Kw(this.el, this.HXX)
	},
	setEmptyText: function($) {
		if (this[$RmY] != $) {
			this[$RmY] = $;
			this.C4F()
		}
	},
	getEmptyText: function() {
		return this[$RmY]
	},
	setMaxLength: function($) {
		this.maxLength = $;
		zmj.setAttr(this.UQj, "maxLength", $);
		if (this.Vhy == "textarea") WoBw(this.UQj, "keypress", this.__OnMaxLengthKeyUp, this)
	},
	__OnMaxLengthKeyUp: function($) {
		if (this.UQj.value.length >= this.maxLength) $.preventDefault()
	},
	getMaxLength: function() {
		return this.maxLength
	},
	setReadOnly: function($) {
		if (this[E8L] != $) {
			this[E8L] = $;
			this[J_w]()
		}
	},
	setEnabled: function($) {
		if (this.enabled != $) {
			this.enabled = $;
			this[J_w]()
		}
	},
	doUpdate: function() {
		if (this.enabled) this[T07](this.UP0_);
		else this[B1z](this.UP0_);
		if (this[BUK]() || this.allowInput == false) this.UQj[E8L] = true;
		else this.UQj[E8L] = false;
		if (this.required) this[B1z](this.Pp$);
		else this[T07](this.Pp$)
	},
	focus: function() {
		try {
			this.UQj.focus()
		} catch($) {}
	},
	blur: function() {
		try {
			this.UQj.blur()
		} catch($) {}
	},
	selectText: function() {
		this.UQj[D3f]()
	},
	getTextEl: function() {
		return this.UQj
	},
	I2: null,
	getErrorIconEl: function() {
		if (!this.I2) this.I2 = zmj.append(this.el, "<span class=\"zmj-errorIcon\"></span>");
		return this.I2
	},
	PfCY: function() {
		if (this.I2) {
			var $ = this.I2;
			jQuery($).remove()
		}
		this.I2 = null
	},
	P4: function(_) {
		var $ = this;
		if (!EjQz(this.UQj, _.target)) setTimeout(function() {
			$.focus();
			zmj.selectRange($.UQj, 1000, 1000)
		},
		1);
		else setTimeout(function() {
			$.UQj.focus()
		},
		1)
	},
	Pid: function(A, _) {
		var $ = this.value;
		this[NHk2](this.UQj.value);
		if ($ !== this.getValue() || _ === true) this.Lo2()
	},
	__OnDropText: function(_) {
		var $ = this;
		setTimeout(function() {
			$.Pid(_)
		},
		0)
	},
	Ln1: function(_) {
		this.fire("keydown", {
			htmlEvent: _
		});
		if (_.keyCode == 8 && (this[BUK]() || this.allowInput == false)) return false;
		if (_.keyCode == 13) {
			this.Pid(null, true);
			var $ = this;
			setTimeout(function() {
				$.fire("enter")
			},
			10)
		}
		if (_.keyCode == 27) _.preventDefault()
	},
	Rz$: function($) {
		this.fire("keyup", {
			htmlEvent: $
		})
	},
	Dpb: function($) {
		this.fire("keypress", {
			htmlEvent: $
		})
	},
	NK: function($) {
		this[J_w]();
		if (this[BUK]()) return;
		this.Gz = true;
		this[B1z](this.LaG);
		this.T2A();
		Kw(this.el, this.HXX);
		if (this[$RmY] && this.UQj.value == this[$RmY]) {
			this.UQj.value = "";
			this.UQj[D3f]()
		}
	},
	FKN: function(_) {
		this.Gz = false;
		var $ = this;
		setTimeout(function() {
			if ($.Gz == false) $[T07]($.LaG)
		},
		2);
		if (this[$RmY] && this.UQj.value == "") {
			this.UQj.value = this[$RmY];
			_I(this.el, this.HXX)
		}
	},
	getAttrs: function($) {
		var A = FhF[CPy][YIb][KQk](this, $),
		_ = jQuery($);
		zmj[W5cB]($, A, ["value", "text", "emptyText", "onenter", "onkeydown", "onkeyup", "onkeypress", "maxLengthErrorText", "minLengthErrorText", "vtype", "emailErrorText", "urlErrorText", "floatErrorText", "intErrorText", "dateErrorText", "minErrorText", "maxErrorText", "rangeLengthErrorText", "rangeErrorText", "rangeCharErrorText"]);
		zmj[D4q]($, A, ["allowInput"]);
		zmj[PI]($, A, ["maxLength", "minLength", "minHeight"]);
		return A
	},
	vtype: "",
	setVtype: function($) {
		this.vtype = $
	},
	getVtype: function() {
		return this.vtype
	},
	PNA: function($) {
		if ($.isValid == false) return;
		zmj._ValidateVType(this.vtype, $.value, $, this)
	},
	setEmailErrorText: function($) {
		this.emailErrorText = $
	},
	getEmailErrorText: function() {
		return this.emailErrorText
	},
	setUrlErrorText: function($) {
		this.urlErrorText = $
	},
	getUrlErrorText: function() {
		return this.urlErrorText
	},
	setFloatErrorText: function($) {
		this.floatErrorText = $
	},
	getFloatErrorText: function() {
		return this.floatErrorText
	},
	setIntErrorText: function($) {
		this.intErrorText = $
	},
	getIntErrorText: function() {
		return this.intErrorText
	},
	setDateErrorText: function($) {
		this.dateErrorText = $
	},
	getDateErrorText: function() {
		return this.dateErrorText
	},
	setMaxLengthErrorText: function($) {
		this.maxLengthErrorText = $
	},
	getMaxLengthErrorText: function() {
		return this.maxLengthErrorText
	},
	setMinLengthErrorText: function($) {
		this.minLengthErrorText = $
	},
	getMinLengthErrorText: function() {
		return this.minLengthErrorText
	},
	setMaxErrorText: function($) {
		this.maxErrorText = $
	},
	getMaxErrorText: function() {
		return this.maxErrorText
	},
	setMinErrorText: function($) {
		this.minErrorText = $
	},
	getMinErrorText: function() {
		return this.minErrorText
	},
	setRangeLengthErrorText: function($) {
		this.rangeLengthErrorText = $
	},
	getRangeLengthErrorText: function() {
		return this.rangeLengthErrorText
	},
	setRangeCharErrorText: function($) {
		this.rangeCharErrorText = $
	},
	getRangeCharErrorText: function() {
		return this.rangeCharErrorText
	},
	setRangeErrorText: function($) {
		this.rangeErrorText = $
	},
	getRangeErrorText: function() {
		return this.rangeErrorText
	}
});
Cmk(FhF, "textbox");
NFr = function() {
	NFr[CPy][CLu][KQk](this)
};
HX_P(NFr, FhF, {
	uiCls: "zmj-password",
	Vhy: "password",
	setEmptyText: function($) {
		this[$RmY] = ""
	}
});
Cmk(NFr, "password");
RGD = function() {
	RGD[CPy][CLu][KQk](this)
};
HX_P(RGD, FhF, {
	maxLength: 100000,
	width: 180,
	height: 50,
	minHeight: 50,
	Vhy: "textarea",
	uiCls: "zmj-textarea",
	doLayout: function() {
		if (!this.canLayout()) return;
		RGD[CPy][X5Q][KQk](this);
		var $ = $L7(this.el);
		$ -= 2;
		if ($ < 0) $ = 0;
		this.UQj.style.height = $ + "px"
	}
});
Cmk(RGD, "textarea");
C7r = function() {
	C7r[CPy][CLu][KQk](this);
	this.LT$();
	this.el.className += " zmj-popupedit"
};
HX_P(C7r, DjY, {
	uiCls: "zmj-popupedit",
	popup: null,
	popupCls: "zmj-buttonedit-popup",
	_hoverCls: "zmj-buttonedit-hover",
	RJU: "zmj-buttonedit-pressed",
	destroy: function($) {
		if (this.isShowPopup()) this[$SI]();
		if (this.popup) {
			this.popup[Wsj]();
			this.popup = null
		}
		C7r[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		C7r[CPy][GX][KQk](this);
		TQ(function() {
			BRs(this.el, "mouseover", this.J6I, this);
			BRs(this.el, "mouseout", this.DtkD, this)
		},
		this)
	},
	$cg: function() {
		this.buttons = [];
		var $ = this.createButton({
			cls: "zmj-buttonedit-popup",
			iconCls: "zmj-buttonedit-icons-popup",
			name: "popup"
		});
		this.buttons.push($)
	},
	J6I: function($) {
		if (this[BUK]() || this.allowInput) return;
		if (J6j($.target, "zmj-buttonedit-border")) this[B1z](this._hoverCls)
	},
	DtkD: function($) {
		if (this[BUK]() || this.allowInput) return;
		this[T07](this._hoverCls)
	},
	P4: function($) {
		if (this[BUK]()) return;
		C7r[CPy].P4[KQk](this, $);
		if (this.allowInput == false && J6j($.target, "zmj-buttonedit-border")) {
			_I(this.el, this.RJU);
			WoBw(document, "mouseup", this.O$, this)
		}
	},
	Ln1: function($) {
		this.fire("keydown", {
			htmlEvent: $
		});
		if ($.keyCode == 8 && (this[BUK]() || this.allowInput == false)) return false;
		if ($.keyCode == 9) {
			this[$SI]();
			return
		}
		if ($.keyCode == 27) {
			this[$SI]();
			return
		}
		if ($.keyCode == 13) this.fire("enter");
		if (this.isShowPopup()) if ($.keyCode == 13 || $.keyCode == 27) $.stopPropagation()
	},
	within: function($) {
		if (EjQz(this.el, $.target)) return true;
		if (this.popup[Oan4]($)) return true;
		return false
	},
	popupWidth: "100%",
	popupMinWidth: 50,
	popupMaxWidth: 2000,
	popupHeight: "",
	popupMinHeight: 30,
	popupMaxHeight: 2000,
	setPopup: function($) {
		if (typeof $ == "string") {
			zmj.parse($);
			$ = zmj.get($)
		}
		var _ = zmj.getAndCreate($);
		if (!_) return;
		_[FJhD](true);
		_[_B9](this.popup._contentEl);
		_.owner = this;
		_.on("beforebuttonclick", this.NN$, this)
	},
	getPopup: function() {
		if (!this.popup) this.LT$();
		return this.popup
	},
	LT$: function() {
		this.popup = new FAn();
		this.popup.setShowAction("none");
		this.popup.setHideAction("outerclick");
		this.popup.setPopupEl(this.el);
		this.popup.on("BeforeClose", this.DFwG, this);
		WoBw(this.popup.el, "keydown", this.__OnPopupKeyDown, this)
	},
	DFwG: function($) {
		if (this[Oan4]($.htmlEvent)) $.cancel = true
	},
	__OnPopupKeyDown: function($) {},
	showPopup: function() {
		var _ = this.getPopup(),
		B = this.getBox(),
		$ = this[Z9D];
		if (this[Z9D] == "100%") $ = B.width;
		_[GaK6]($);
		var A = parseInt(this[W4I]);
		if (!isNaN(A)) _[BrQ](A);
		else _[BrQ]("auto");
		_.setMinWidth(this[TWk6]);
		_.setMinHeight(this[Y2s]);
		_.setMaxWidth(this[E4e8]);
		_.setMaxHeight(this[Dhw]);
		_.showAtEl(this.el, {
			hAlign: "left",
			vAlign: "below",
			outVAlign: "above",
			outHAlign: "right",
			popupCls: this.popupCls
		});
		_.on("Close", this.Nrp, this);
		this.fire("showpopup")
	},
	Nrp: function($) {
		this.fire("hidepopup")
	},
	hidePopup: function() {
		var $ = this.getPopup();
		$.close()
	},
	isShowPopup: function() {
		if (this.popup && this.popup.visible) return true;
		else return false
	},
	setPopupWidth: function($) {
		this[Z9D] = $
	},
	setPopupMaxWidth: function($) {
		this[E4e8] = $
	},
	setPopupMinWidth: function($) {
		this[TWk6] = $
	},
	getPopupWidth: function($) {
		return this[Z9D]
	},
	getPopupMaxWidth: function($) {
		return this[E4e8]
	},
	getPopupMinWidth: function($) {
		return this[TWk6]
	},
	setPopupHeight: function($) {
		this[W4I] = $
	},
	setPopupMaxHeight: function($) {
		this[Dhw] = $
	},
	setPopupMinHeight: function($) {
		this[Y2s] = $
	},
	getPopupHeight: function($) {
		return this[W4I]
	},
	getPopupMaxHeight: function($) {
		return this[Dhw]
	},
	getPopupMinHeight: function($) {
		return this[Y2s]
	},
	PSN: function(_) {
		if (this[BUK]()) return;
		if (EjQz(this._buttonEl, _.target)) this.QG3(_);
		if (this.allowInput == false || EjQz(this._buttonEl, _.target)) if (this.isShowPopup()) this[$SI]();
		else {
			var $ = this;
			setTimeout(function() {
				$[Dh]()
			},
			1)
		}
	},
	NN$: function($) {
		if ($.name == "close") this[$SI]();
		$.cancel = true
	},
	getAttrs: function($) {
		var _ = C7r[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["popupWidth", "popupHeight", "popup", "onshowpopup", "onhidepopup"]);
		zmj[PI]($, _, ["popupMinWidth", "popupMaxWidth", "popupMinHeight", "popupMaxHeight"]);
		return _
	}
});
Cmk(C7r, "popupedit");
AcB_ = function() {
	this.data = [];
	this.columns = [];
	AcB_[CPy][CLu][KQk](this)
};
HX_P(AcB_, C7r, {
	text: "",
	value: "",
	valueField: "id",
	textField: "text",
	delimiter: ",",
	multiSelect: false,
	data: [],
	url: "",
	columns: [],
	allowInput: false,
	valueFromSelect: false,
	popupMaxHeight: 200,
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = A.value;
		delete A.value;
		var B = A.url;
		delete A.url;
		var _ = A.data;
		delete A.data;
		AcB_[CPy].set[KQk](this, A);
		if (!zmj.isNull(_)) {
			this[Uj](_);
			A.data = _
		}
		if (!zmj.isNull(B)) {
			this.setUrl(B);
			A.url = B
		}
		if (!zmj.isNull($)) {
			this[NHk2]($);
			A.value = $
		}
		return this
	},
	uiCls: "zmj-combobox",
	LT$: function() {
		AcB_[CPy].LT$[KQk](this);
		this.MCac = new We0();
		this.MCac.setBorderStyle("border:0;");
		this.MCac.setStyle("width:100%;height:auto;");
		this.MCac[_B9](this.popup._contentEl);
		this.MCac.on("itemclick", this.U7, this)
	},
	showPopup: function() {
		this.MCac[BrQ]("auto");
		AcB_[CPy][Dh][KQk](this);
		var $ = this.popup.el.style.height;
		if ($ == "" || $ == "auto") this.MCac[BrQ]("auto");
		else this.MCac[BrQ]("100%");
		this.MCac[NHk2](this.value)
	},
	getItem: function($) {
		return typeof $ == "object" ? $: this.data[$]
	},
	indexOf: function($) {
		return this.data.indexOf($)
	},
	getAt: function($) {
		return this.data[$]
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this[Uj]($)
	},
	setData: function(data) {
		if (typeof data == "string") data = eval("(" + data + ")");
		if (!zmj.isArray(data)) data = [];
		this.MCac[Uj](data);
		this.data = this.MCac.data;
		var vts = this.MCac.Ss0(this.value);
		this.UQj.value = vts[1]
	},
	getData: function() {
		return this.data
	},
	setUrl: function(_) {
		this.getPopup();
		this.MCac.setUrl(_);
		this.url = this.MCac.url;
		this.data = this.MCac.data;
		var $ = this.MCac.Ss0(this.value);
		this.UQj.value = $[1]
	},
	getUrl: function() {
		return this.url
	},
	setValueField: function($) {
		this[Aqt] = $;
		if (this.MCac) this.MCac[OmGq]($)
	},
	getValueField: function() {
		return this[Aqt]
	},
	setTextField: function($) {
		if (this.MCac) this.MCac.setTextField($);
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	setDisplayField: function($) {
		this.setTextField($)
	},
	setValue: function($) {
		if (this.value !== $) {
			var _ = this.MCac.Ss0($);
			this.value = $;
			this.SA3.value = this.value;
			this.UQj.value = _[1]
		} else {
			_ = this.MCac.Ss0($);
			this.UQj.value = _[1]
		}
	},
	setMultiSelect: function($) {
		if (this[R0PE] != $) {
			this[R0PE] = $;
			if (this.MCac) {
				this.MCac.setMultiSelect($);
				this.MCac.setShowCheckBox($)
			}
		}
	},
	getMultiSelect: function() {
		return this[R0PE]
	},
	setColumns: function($) {
		if (!zmj.isArray($)) $ = [];
		this.columns = $;
		this.MCac[KsL]($)
	},
	getColumns: function() {
		return this.columns
	},
	showNullItem: false,
	setShowNullItem: function($) {
		if (this.showNullItem != $) {
			this.showNullItem = $;
			this.MCac.setShowNullItem($)
		}
	},
	getShowNullItem: function() {
		return this.showNullItem
	},
	setValueFromSelect: function($) {
		this.valueFromSelect = $
	},
	getValueFromSelect: function() {
		return this.valueFromSelect
	},
	Lo2: function() {
		if (this.validateOnChanged) this[WRj0]();
		var $ = this.getValue(),
		B = this.getSelecteds(),
		_ = B[0],
		A = this;
		A.fire("valuechanged", {
			value: $,
			selecteds: B,
			selected: _
		})
	},
	getSelecteds: function() {
		return this.MCac.findItems(this.value)
	},
	getSelected: function() {
		return this.getSelecteds()[0]
	},
	U7: function(C) {
		var B = this.MCac.getValue(),
		A = this.MCac.Ss0(B),
		$ = this.getValue();
		this[NHk2](B);
		this[Vh](A[1]);
		if ($ != this.getValue()) {
			var _ = this;
			setTimeout(function() {
				_.Lo2()
			},
			1)
		}
		if (!this[R0PE]) this[$SI]();
		this.focus()
	},
	Ln1: function(C) {
		this.fire("keydown", {
			htmlEvent: C
		});
		if (C.keyCode == 8 && (this[BUK]() || this.allowInput == false)) return false;
		if (C.keyCode == 9) {
			this[$SI]();
			return
		}
		switch (C.keyCode) {
		case 27:
			C.preventDefault();
			if (this.isShowPopup()) C.stopPropagation();
			this[$SI]();
			break;
		case 13:
			if (this.isShowPopup()) {
				C.preventDefault();
				C.stopPropagation();
				var _ = this.MCac.getFocusedIndex();
				if (_ != -1) {
					var $ = this.MCac.getAt(_);
					if (this[R0PE]);
					else {
						this.MCac[FqM]();
						this.MCac[D3f]($)
					}
					var B = this.MCac.getSelecteds(),
					A = this.MCac.Ss0(B);
					this[NHk2](A[0]);
					this[Vh](A[1]);
					this.Lo2()
				}
				this[$SI]()
			} else this.fire("enter");
			break;
		case 37:
			break;
		case 38:
			_ = this.MCac.getFocusedIndex();
			if (_ == -1) {
				_ = 0;
				if (!this[R0PE]) {
					$ = this.MCac.findItems(this.value)[0];
					if ($) _ = this.MCac.indexOf($)
				}
			}
			if (this.isShowPopup()) if (!this[R0PE]) {
				_ -= 1;
				if (_ < 0) _ = 0;
				this.MCac.Fsh(_, true)
			}
			break;
		case 39:
			break;
		case 40:
			_ = this.MCac.getFocusedIndex();
			if (_ == -1) {
				_ = 0;
				if (!this[R0PE]) {
					$ = this.MCac.findItems(this.value)[0];
					if ($) _ = this.MCac.indexOf($)
				}
			}
			if (this.isShowPopup()) {
				if (!this[R0PE]) {
					_ += 1;
					if (_ > this.MCac.getCount() - 1) _ = this.MCac.getCount() - 1;
					this.MCac.Fsh(_, true)
				}
			} else {
				this[Dh]();
				if (!this[R0PE]) this.MCac.Fsh(_, true)
			}
			break;
		default:
			this.LjV(this.UQj.value);
			break
		}
	},
	Rz$: function($) {
		this.fire("keyup", {
			htmlEvent: $
		})
	},
	Dpb: function($) {
		this.fire("keypress", {
			htmlEvent: $
		})
	},
	LjV: function(_) {
		var $ = this;
		setTimeout(function() {
			var A = $.UQj.value;
			if (A != _) $.Uh5j(A)
		},
		10)
	},
	Uh5j: function(B) {
		if (this[R0PE] == true) return;
		var A = [];
		for (var C = 0, E = this.data.length; C < E; C++) {
			var _ = this.data[C],
			D = _[this.textField];
			if (typeof D == "string") if (D.indexOf(B) != -1) A.push(_)
		}
		this.MCac[Uj](A);
		this._filtered = true;
		if (B !== "" || this.isShowPopup()) {
			this[Dh]();
			var $ = 0;
			if (this.MCac.getShowNullItem()) $ = 1;
			this.MCac.Fsh($, true)
		}
	},
	Nrp: function($) {
		if (this._filtered) {
			this._filtered = false;
			if (this.MCac.el) this.MCac[Uj](this.data)
		}
		this.fire("hidepopup")
	},
	Pid: function(J) {
		if (this[R0PE] == false) {
			var E = this.UQj.value;
			if (this.valueFromSelect == false) {
				this[NHk2](E);
				if (this.value && !this.UQj.value) this[Vh](E);
				this.Lo2()
			} else {
				var H = this.getData(),
				F = null;
				for (var D = 0, B = H.length; D < B; D++) {
					var $ = H[D],
					I = $[this.textField];
					if (I == E) {
						F = $;
						break
					}
				}
				this.MCac[NHk2](F ? F[this.valueField] : "");
				var C = this.MCac.getValue(),
				A = this.MCac.Ss0(C),
				_ = this.getValue();
				this[NHk2](C);
				this[Vh](A[1]);
				if (_ != this.getValue()) {
					var G = this;
					G.Lo2()
				}
			}
		}
	},
	getAttrs: function(G) {
		var E = AcB_[CPy][YIb][KQk](this, G);
		zmj[W5cB](G, E, ["url", "data", "textField", "valueField", "displayField"]);
		zmj[D4q](G, E, ["multiSelect", "showNullItem", "valueFromSelect"]);
		if (E.displayField) E[Uc9] = E.displayField;
		var C = E[Aqt] || this[Aqt],
		H = E[Uc9] || this[Uc9];
		if (G.nodeName.toLowerCase() == "select") {
			var I = [];
			for (var F = 0, D = G.length; F < D; F++) {
				var $ = G.options[F],
				_ = {};
				_[H] = $.text;
				_[C] = $.value;
				I.push(_)
			}
			if (I.length > 0) E.data = I
		} else {
			var J = zmj[P8pq](G);
			for (F = 0, D = J.length; F < D; F++) {
				var A = J[F],
				B = jQuery(A).attr("property");
				if (!B) continue;
				B = B.toLowerCase();
				if (B == "columns") E.columns = zmj._ParseColumns(A);
				else if (B == "data") E.data = A.innerHTML
			}
		}
		return E
	}
});
Cmk(AcB_, "combobox");
PHo = function() {
	PHo[CPy][CLu][KQk](this)
};
HX_P(PHo, C7r, {
	format: "yyyy-MM-dd",
	popupWidth: "",
	viewDate: new Date(),
	showTime: false,
	timeFormat: "H:mm",
	showTodayButton: true,
	showClearButton: true,
	uiCls: "zmj-datepicker",
	_getCalendar: function() {
		if (!PHo._Calendar) {
			var $ = PHo._Calendar = new GFD();
			$.setStyle("border:0;")
		}
		return PHo._Calendar
	},
	LT$: function() {
		PHo[CPy].LT$[KQk](this);
		this.BQf = this._getCalendar()
	},
	showPopup: function() {
		this.BQf.beginUpdate();
		this.BQf[_B9](this.popup._contentEl);
		this.BQf.set({
			showTime: this.showTime,
			timeFormat: this.timeFormat,
			showClearButton: this.showClearButton,
			showTodayButton: this.showTodayButton
		});
		this.BQf[NHk2](this.value);
		if (this.value) this.BQf.setViewDate(this.value);
		else this.BQf.setViewDate(this.viewDate);
		if (this.BQf._target) {
			var $ = this.BQf._target;
			this.BQf.un("timechanged", $.JSq, $);
			this.BQf.un("dateclick", $.Pbk, $);
			this.BQf.un("drawdate", $.DnI, $)
		}
		this.BQf.on("timechanged", this.JSq, this);
		this.BQf.on("dateclick", this.Pbk, this);
		this.BQf.on("drawdate", this.DnI, this);
		this.BQf.endUpdate();
		PHo[CPy][Dh][KQk](this);
		this.BQf._target = this;
		this.BQf.focus()
	},
	hidePopup: function() {
		PHo[CPy][$SI][KQk](this);
		this.BQf.un("timechanged", this.JSq, this);
		this.BQf.un("dateclick", this.Pbk, this);
		this.BQf.un("drawdate", this.DnI, this)
	},
	within: function($) {
		if (EjQz(this.el, $.target)) return true;
		if (this.BQf[Oan4]($)) return true;
		return false
	},
	__OnPopupKeyDown: function($) {
		if ($.keyCode == 13) this.Pbk();
		if ($.keyCode == 27) {
			this[$SI]();
			this.focus()
		}
	},
	DnI: function($) {
		this.fire("drawdate", $)
	},
	Pbk: function(A) {
		var _ = this.BQf.getValue(),
		$ = this.getFormValue();
		this[NHk2](_);
		if ($ !== this.getFormValue()) this.Lo2();
		this.focus();
		this[$SI]()
	},
	JSq: function(_) {
		var $ = this.BQf.getValue();
		this[NHk2]($);
		this.Lo2()
	},
	setFormat: function($) {
		if (typeof $ != "string") return;
		if (this.format != $) {
			this.format = $;
			this.UQj.value = this.SA3.value = this.getFormValue()
		}
	},
	setValue: function($) {
		$ = zmj.parseDate($);
		if (zmj.isNull($)) $ = "";
		if (zmj.isDate($)) $ = new Date($.getTime());
		if (this.value != $) {
			this.value = $;
			this.UQj.value = this.SA3.value = this.getFormValue()
		}
	},
	getValue: function() {
		if (!zmj.isDate(this.value)) return null;
		return this.value
	},
	getFormValue: function() {
		if (!zmj.isDate(this.value)) return "";
		return zmj.formatDate(this.value, this.format)
	},
	setViewDate: function($) {
		$ = zmj.parseDate($);
		if (!zmj.isDate($)) return;
		this.viewDate = $
	},
	getViewDate: function() {
		return this.BQf.getViewDate()
	},
	setShowTime: function($) {
		if (this.showTime != $) this.showTime = $
	},
	getShowTime: function() {
		return this.showTime
	},
	setTimeFormat: function($) {
		if (this.timeFormat != $) this.timeFormat = $
	},
	getTimeFormat: function() {
		return this.timeFormat
	},
	setShowTodayButton: function($) {
		this.showTodayButton = $
	},
	getShowTodayButton: function() {
		return this.showTodayButton
	},
	setShowClearButton: function($) {
		this.showClearButton = $
	},
	getShowClearButton: function() {
		return this.showClearButton
	},
	Pid: function(B) {
		var A = this.UQj.value,
		$ = zmj.parseDate(A);
		if (!$ || isNaN($) || $.getFullYear() == 1970) $ = null;
		var _ = this.getFormValue();
		this[NHk2]($);
		if ($ == null) this.UQj.value = "";
		if (_ !== this.getFormValue()) this.Lo2()
	},
	Ln1: function(_) {
		this.fire("keydown", {
			htmlEvent: _
		});
		if (_.keyCode == 8 && (this[BUK]() || this.allowInput == false)) return false;
		if (_.keyCode == 9) {
			this[$SI]();
			return
		}
		switch (_.keyCode) {
		case 27:
			_.preventDefault();
			if (this.isShowPopup()) _.stopPropagation();
			this[$SI]();
			break;
		case 13:
			if (this.isShowPopup()) {
				_.preventDefault();
				_.stopPropagation();
				this[$SI]()
			} else {
				this.Pid(null);
				var $ = this;
				setTimeout(function() {
					$.fire("enter")
				},
				10)
			}
			break;
		case 37:
			break;
		case 38:
			_.preventDefault();
			break;
		case 39:
			break;
		case 40:
			_.preventDefault();
			this[Dh]();
			break;
		default:
			break
		}
	},
	getAttrs: function($) {
		var _ = PHo[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["format", "viewDate", "timeFormat", "ondrawdate"]);
		zmj[D4q]($, _, ["showTime", "showTodayButton", "showClearButton"]);
		return _
	}
});
Cmk(PHo, "datepicker");
GFD = function() {
	this.viewDate = new Date(),
	this.Qd5 = [];
	GFD[CPy][CLu][KQk](this)
};
HX_P(GFD, ET, {
	width: 220,
	height: 160,
	_clearBorder: false,
	viewDate: null,
	CyP: "",
	Qd5: [],
	multiSelect: false,
	firstDayOfWeek: 0,
	todayText: "Today",
	clearText: "Clear",
	okText: "OK",
	cancelText: "Cancel",
	daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	format: "MMM,yyyy",
	timeFormat: "H:mm",
	showTime: false,
	currentTime: true,
	rows: 1,
	columns: 1,
	headerCls: "",
	bodyCls: "",
	footerCls: "",
	KlWB: "zmj-calendar-today",
	Yh8: "zmj-calendar-weekend",
	$Pr: "zmj-calendar-othermonth",
	VXL: "zmj-calendar-selected",
	showHeader: true,
	showFooter: true,
	showWeekNumber: false,
	showDaysHeader: true,
	showMonthButtons: true,
	showYearButtons: true,
	showTodayButton: true,
	showClearButton: true,
	isWeekend: function(_) {
		var $ = _.getDay();
		return $ == 0 || $ == 6
	},
	getFirstDateOfMonth: function($) {
		var $ = new Date($.getFullYear(), $.getMonth(), 1);
		return zmj.getWeekStartDate($, this.firstDayOfWeek)
	},
	getShortWeek: function($) {
		return this.daysShort[$]
	},
	uiCls: "zmj-calendar",
	_create: function() {
		var C = "<tr style=\"width:100%;\"><td style=\"width:100%;\"></td></tr>";
		C += "<tr ><td><div class=\"zmj-calendar-footer\">" + "<span style=\"display:inline-block;\"><input name=\"time\" class=\"zmj-timespinner\" style=\"width:80px\" format=\"" + this.timeFormat + "\"/>" + "<span class=\"zmj-calendar-footerSpace\"></span></span>" + "<span class=\"zmj-calendar-tadayButton\">" + this.todayText + "</span>" + "<span class=\"zmj-calendar-footerSpace\"></span>" + "<span class=\"zmj-calendar-clearButton\">" + this.clearText + "</span>" + "<a href=\"#\" class=\"zmj-calendar-focus\" style=\"position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none\" hideFocus></a>" + "</div></td></tr>";
		var A = "<table class=\"zmj-calendar\" cellpadding=\"0\" cellspacing=\"0\">" + C + "</table>",
		_ = document.createElement("div");
		_.innerHTML = A;
		this.el = _.firstChild;
		var $ = this.el.getElementsByTagName("tr"),
		B = this.el.getElementsByTagName("td");
		this._tbB = B[0];
		this.MbK = zmj.byClass("zmj-calendar-footer", this.el);
		this.timeWrapEl = this.MbK.childNodes[0];
		this.todayButtonEl = this.MbK.childNodes[1];
		this.footerSpaceEl = this.MbK.childNodes[2];
		this.closeButtonEl = this.MbK.childNodes[3];
		this._focusEl = this.MbK.lastChild;
		zmj.parse(this.MbK);
		this.timeSpinner = zmj.getbyName("time", this.el);
		this[J_w]()
	},
	focus: function() {
		try {
			this._focusEl.focus()
		} catch($) {}
	},
	destroy: function($) {
		this._tbB = this.MbK = this.timeWrapEl = this.todayButtonEl = this.footerSpaceEl = this.closeButtonEl = null;
		GFD[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		if (this.timeSpinner) this.timeSpinner.on("valuechanged", this.JSq, this);
		TQ(function() {
			WoBw(this.el, "click", this.PSN, this);
			WoBw(this.el, "mousedown", this.P4, this);
			WoBw(this.el, "keydown", this.PDh, this)
		},
		this)
	},
	getDateEl: function($) {
		if (!$) return null;
		var _ = this.uid + "$" + zmj.clearTime($).getTime();
		return document.getElementById(_)
	},
	within: function($) {
		if (EjQz(this.el, $.target)) return true;
		if (this.menuEl && EjQz(this.menuEl, $.target)) return true;
		return false
	},
	setShowClearButton: function($) {
		this.showClearButton = $;
		var _ = this.getButton("clear");
		if (_) this[J_w]()
	},
	getShowClearButton: function() {
		return this.showClearButton
	},
	setShowHeader: function($) {
		this.showHeader = $;
		this[J_w]()
	},
	getShowHeader: function() {
		return this.showHeader
	},
	setShowFooter: function($) {
		this[EzY] = $;
		this[J_w]()
	},
	getShowFooter: function() {
		return this[EzY]
	},
	setShowWeekNumber: function($) {
		this.showWeekNumber = $;
		this[J_w]()
	},
	getShowWeekNumber: function() {
		return this.showWeekNumber
	},
	setShowDaysHeader: function($) {
		this.showDaysHeader = $;
		this[J_w]()
	},
	getShowDaysHeader: function() {
		return this.showDaysHeader
	},
	setShowMonthButtons: function($) {
		this.showMonthButtons = $;
		this[J_w]()
	},
	getShowMonthButtons: function() {
		return this.showMonthButtons
	},
	setShowYearButtons: function($) {
		this.showYearButtons = $;
		this[J_w]()
	},
	getShowYearButtons: function() {
		return this.showYearButtons
	},
	setShowTodayButton: function($) {
		this.showTodayButton = $;
		this[J_w]()
	},
	getShowTodayButton: function() {
		return this.showTodayButton
	},
	setShowClearButton: function($) {
		this.showClearButton = $;
		this[J_w]()
	},
	getShowClearButton: function() {
		return this.showClearButton
	},
	setViewDate: function($) {
		if (!$) $ = new Date();
		if (zmj.isDate($)) $ = new Date($.getTime());
		this.viewDate = $;
		this[J_w]()
	},
	getViewDate: function() {
		return this.viewDate
	},
	setSelectedDate: function($) {
		$ = zmj.parseDate($);
		if (!zmj.isDate($)) $ = "";
		else $ = new Date($.getTime());
		var _ = this.getDateEl(this.CyP);
		if (_) Kw(_, this.VXL);
		this.CyP = $;
		if (this.CyP) this.CyP = zmj.cloneDate(this.CyP);
		_ = this.getDateEl(this.CyP);
		if (_) _I(_, this.VXL);
		this.fire("datechanged")
	},
	setSelectedDates: function($) {
		if (!zmj.isArray($)) $ = [];
		this.Qd5 = $;
		this[J_w]()
	},
	getSelectedDate: function() {
		return this.CyP ? this.CyP: ""
	},
	setTime: function($) {
		this.timeSpinner[NHk2]($)
	},
	getTime: function() {
		return this.timeSpinner.getFormValue()
	},
	setValue: function($) {
		this.setSelectedDate($);
		if (!$) $ = new Date();
		this.setTime($)
	},
	getValue: function() {
		var $ = this.CyP;
		if ($) {
			$ = zmj.clearTime($);
			if (this.showTime) {
				var _ = this.timeSpinner.getValue();
				$.setHours(_.getHours());
				$.setMinutes(_.getMinutes());
				$.setSeconds(_.getSeconds())
			}
		}
		return $ ? $: ""
	},
	getFormValue: function() {
		var $ = this.getValue();
		if ($) return zmj.formatDate($, "yyyy-MM-dd HH:mm:ss");
		return ""
	},
	isSelectedDate: function($) {
		if (!$ || !this.CyP) return false;
		return zmj.clearTime($).getTime() == zmj.clearTime(this.CyP).getTime()
	},
	setMultiSelect: function($) {
		this[R0PE] = $;
		this[J_w]()
	},
	getMultiSelect: function() {
		return this[R0PE]
	},
	setRows: function($) {
		if (isNaN($)) return;
		if ($ < 1) $ = 1;
		this.rows = $;
		this[J_w]()
	},
	getRows: function() {
		return this.rows
	},
	setColumns: function($) {
		if (isNaN($)) return;
		if ($ < 1) $ = 1;
		this.columns = $;
		this[J_w]()
	},
	getColumns: function() {
		return this.columns
	},
	setShowTime: function($) {
		if (this.showTime != $) {
			this.showTime = $;
			this[X5Q]()
		}
	},
	getShowTime: function() {
		return this.showTime
	},
	setTimeFormat: function($) {
		if (this.timeFormat != $) {
			this.timeSpinner.setFormat($);
			this.timeFormat = this.timeSpinner.format
		}
	},
	getTimeFormat: function() {
		return this.timeFormat
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		this.timeWrapEl.style.display = this.showTime ? "": "none";
		this.todayButtonEl.style.display = this.showTodayButton ? "": "none";
		this.closeButtonEl.style.display = this.showClearButton ? "": "none";
		this.footerSpaceEl.style.display = (this.showClearButton && this.showTodayButton) ? "": "none";
		this.MbK.style.display = this[EzY] ? "": "none";
		var _ = this._tbB.firstChild,
		$ = this[Uw]();
		if (!$) {
			_.parentNode.style.height = "100px";
			h = jQuery(this.el).height();
			h -= jQuery(this.MbK).outerHeight();
			_.parentNode.style.height = h + "px"
		} else _.parentNode.style.height = "";
		zmj.layout(this.MbK)
	},
	doUpdate: function() {
		if (!this.Djl) return;
		var F = new Date(this.viewDate.getTime()),
		A = this.rows == 1 && this.columns == 1,
		B = 100 / this.rows,
		E = "<table class=\"zmj-calendar-views\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		for (var $ = 0, D = this.rows; $ < D; $++) {
			E += "<tr >";
			for (var C = 0, _ = this.columns; C < _; C++) {
				E += "<td style=\"height:" + B + "%\">";
				E += this.F2(F, $, C);
				E += "</td>";
				F = new Date(F.getFullYear(), F.getMonth() + 1, 1)
			}
			E += "</tr>"
		}
		E += "</table>";
		this._tbB.innerHTML = E;
		zmj[USz](this.el);
		this[X5Q]()
	},
	F2: function(R, J, C) {
		var _ = R.getMonth(),
		F = this.getFirstDateOfMonth(R),
		K = new Date(F.getTime()),
		A = zmj.clearTime(new Date()).getTime(),
		D = this.value ? zmj.clearTime(this.value).getTime() : -1,
		N = this.rows > 1 || this.columns > 1,
		P = "";
		P += "<table class=\"zmj-calendar-view\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		if (this.showHeader) {
			P += "<tr ><td colSpan=\"10\" class=\"zmj-calendar-header\"><div class=\"zmj-calendar-headerInner\">";
			if (J == 0 && C == 0) {
				P += "<div class=\"zmj-calendar-prev\">";
				if (this.showYearButtons) P += "<span class=\"zmj-calendar-yearPrev\"></span>";
				if (this.showMonthButtons) P += "<span class=\"zmj-calendar-monthPrev\"></span>";
				P += "</div>"
			}
			if (J == 0 && C == this.columns - 1) {
				P += "<div class=\"zmj-calendar-next\">";
				if (this.showMonthButtons) P += "<span class=\"zmj-calendar-monthNext\"></span>";
				if (this.showYearButtons) P += "<span class=\"zmj-calendar-yearNext\"></span>";
				P += "</div>"
			}
			P += "<span class=\"zmj-calendar-title\">" + zmj.formatDate(R, this.format); + "</span>";
			P += "</div></td></tr>"
		}
		P += "<tr class=\"zmj-calendar-daysheader\"><td class=\"zmj-calendar-space\"></td>";
		if (this.showWeekNumber) P += "<td sclass=\"zmj-calendar-weeknumber\"></td>";
		for (var L = this.firstDayOfWeek, B = L + 7; L < B; L++) {
			var O = this.getShortWeek(L);
			P += "<td valign=\"middle\">";
			P += O;
			P += "</td>";
			F = new Date(F.getFullYear(), F.getMonth(), F.getDate() + 1)
		}
		P += "<td class=\"zmj-calendar-space\"></td></tr>";
		F = K;
		for (var H = 0; H <= 5; H++) {
			P += "<tr class=\"zmj-calendar-days\"><td class=\"zmj-calendar-space\"></td>";
			if (this.showWeekNumber) {
				var G = zmj.getWeek(F.getFullYear(), F.getMonth() + 1, F.getDate());
				if (String(G).length == 1) G = "0" + G;
				P += "<td class=\"zmj-calendar-weeknumber\" valign=\"middle\">" + G + "</td>"
			}
			for (L = this.firstDayOfWeek, B = L + 7; L < B; L++) {
				var M = this.isWeekend(F),
				I = zmj.clearTime(F).getTime(),
				$ = I == A,
				E = this.isSelectedDate(F);
				if (_ != F.getMonth() && N) I = -1;
				var Q = this.Tp(F);
				P += "<td valign=\"middle\" id=\"";
				P += this.uid + "$" + I;
				P += "\" class=\"zmj-calendar-date ";
				if (M) P += " zmj-calendar-weekend ";
				if (Q[Fa] == false) P += " zmj-calendar-disabled ";
				if (_ != F.getMonth() && N);
				else {
					if (E) P += " " + this.VXL + " ";
					if ($) P += " zmj-calendar-today "
				}
				if (_ != F.getMonth()) P += " zmj-calendar-othermonth ";
				P += "\">";
				if (_ != F.getMonth() && N);
				else P += Q.dateHtml;
				P += "</td>";
				F = new Date(F.getFullYear(), F.getMonth(), F.getDate() + 1)
			}
			P += "<td class=\"zmj-calendar-space\"></td></tr>"
		}
		P += "<tr class=\"zmj-calendar-bottom\" colSpan=\"10\"><td ></td></tr>";
		P += "</table>";
		return P
	},
	Tp: function($) {
		var _ = {
			date: $,
			dateCls: "",
			dateStyle: "",
			dateHtml: $.getDate(),
			allowSelect: true
		};
		this.fire("drawdate", _);
		return _
	},
	HRv: function(_, $) {
		var A = {
			date: _,
			action: $
		};
		this.fire("dateclick", A);
		this.Lo2()
	},
	menuEl: null,
	menuYear: null,
	menuSelectMonth: null,
	menuSelectYear: null,
	showMenu: function(_) {
		if (!_) return;
		this.hideMenu();
		this.menuYear = parseInt(this.viewDate.getFullYear() / 10) * 10;
		this.FzelectMonth = this.viewDate.getMonth();
		this.FzelectYear = this.viewDate.getFullYear();
		var A = "<div class=\"zmj-calendar-menu\"></div>";
		this.menuEl = zmj.append(document.body, A);
		this.updateMenu(this.viewDate);
		var $ = this.getBox();
		if (this.el.style.borderWidth == "0px") this.menuEl.style.border = "0";
		YcA(this.menuEl, $);
		WoBw(this.menuEl, "click", this.Hgb, this);
		WoBw(document, "mousedown", this.D$, this)
	},
	hideMenu: function() {
		if (this.menuEl) {
			Is(this.menuEl, "click", this.Hgb, this);
			Is(document, "mousedown", this.D$, this);
			jQuery(this.menuEl).remove();
			this.menuEl = null
		}
	},
	updateMenu: function() {
		var C = "<div class=\"zmj-calendar-menu-months\">";
		for (var $ = 0, B = 12; $ < B; $++) {
			var _ = zmj.getShortMonth($),
			A = "";
			if (this.FzelectMonth == $) A = "zmj-calendar-menu-selected";
			C += "<a id=\"" + $ + "\" class=\"zmj-calendar-menu-month " + A + "\" href=\"javascript:void(0);\" hideFocus onclick=\"return false\">" + _ + "</a>"
		}
		C += "<div style=\"clear:both;\"></div></div>";
		C += "<div class=\"zmj-calendar-menu-years\">";
		for ($ = this.menuYear, B = this.menuYear + 10; $ < B; $++) {
			_ = $,
			A = "";
			if (this.FzelectYear == $) A = "zmj-calendar-menu-selected";
			C += "<a id=\"" + $ + "\" class=\"zmj-calendar-menu-year " + A + "\" href=\"javascript:void(0);\" hideFocus onclick=\"return false\">" + _ + "</a>"
		}
		C += "<div class=\"zmj-calendar-menu-prevYear\"></div><div class=\"zmj-calendar-menu-nextYear\"></div><div style=\"clear:both;\"></div></div>";
		C += "<div class=\"zmj-calendar-footer\">" + "<span class=\"zmj-calendar-okButton\">" + this.okText + "</span>" + "<span class=\"zmj-calendar-footerSpace\"></span>" + "<span class=\"zmj-calendar-cancelButton\">" + this.cancelText + "</span>" + "</div><div style=\"clear:both;\"></div>";
		this.menuEl.innerHTML = C
	},
	Hgb: function(C) {
		var _ = C.target,
		B = J6j(_, "zmj-calendar-menu-month"),
		$ = J6j(_, "zmj-calendar-menu-year");
		if (B) {
			this.FzelectMonth = parseInt(B.id);
			this.updateMenu()
		} else if ($) {
			this.FzelectYear = parseInt($.id);
			this.updateMenu()
		} else if (J6j(_, "zmj-calendar-menu-prevYear")) {
			this.menuYear = this.menuYear - 1;
			this.menuYear = parseInt(this.menuYear / 10) * 10;
			this.updateMenu()
		} else if (J6j(_, "zmj-calendar-menu-nextYear")) {
			this.menuYear = this.menuYear + 11;
			this.menuYear = parseInt(this.menuYear / 10) * 10;
			this.updateMenu()
		} else if (J6j(_, "zmj-calendar-okButton")) {
			var A = new Date(this.FzelectYear, this.FzelectMonth, 1);
			this.setViewDate(A);
			this.hideMenu()
		} else if (J6j(_, "zmj-calendar-cancelButton")) this.hideMenu()
	},
	D$: function($) {
		if (!J6j($.target, "zmj-calendar-menu")) this.hideMenu()
	},
	PSN: function(H) {
		var G = this.viewDate;
		if (this.enabled == false) return;
		var C = H.target,
		F = J6j(H.target, "zmj-calendar-title");
		if (J6j(C, "zmj-calendar-monthNext")) {
			G.setMonth(G.getMonth() + 1);
			this.setViewDate(G)
		} else if (J6j(C, "zmj-calendar-yearNext")) {
			G.setFullYear(G.getFullYear() + 1);
			this.setViewDate(G)
		} else if (J6j(C, "zmj-calendar-monthPrev")) {
			G.setMonth(G.getMonth() - 1);
			this.setViewDate(G)
		} else if (J6j(C, "zmj-calendar-yearPrev")) {
			G.setFullYear(G.getFullYear() - 1);
			this.setViewDate(G)
		} else if (J6j(C, "zmj-calendar-tadayButton")) {
			var _ = new Date();
			this.setViewDate(_);
			this.setSelectedDate(_);
			if (this.currentTime) {
				var $ = new Date();
				this.setTime($)
			}
			this.HRv(_, "today")
		} else if (J6j(C, "zmj-calendar-clearButton")) {
			this.setSelectedDate(null);
			this.setTime(null);
			this.HRv(null, "clear")
		} else if (F) this.showMenu(F);
		var E = J6j(H.target, "zmj-calendar-date");
		if (E && !Zq6(E, "zmj-calendar-disabled")) {
			var A = E.id.split("$"),
			B = parseInt(A[A.length - 1]);
			if (B == -1) return;
			var D = new Date(B);
			this.HRv(D)
		}
	},
	P4: function(C) {
		if (this.enabled == false) return;
		var B = J6j(C.target, "zmj-calendar-date");
		if (B && !Zq6(B, "zmj-calendar-disabled")) {
			var $ = B.id.split("$"),
			_ = parseInt($[$.length - 1]);
			if (_ == -1) return;
			var A = new Date(_);
			this.setSelectedDate(A)
		}
	},
	JSq: function($) {
		this.fire("timechanged");
		this.Lo2()
	},
	PDh: function(B) {
		if (this.enabled == false) return;
		var _ = this.getSelectedDate();
		if (!_) _ = new Date(this.viewDate.getTime());
		switch (B.keyCode) {
		case 27:
			break;
		case 13:
			break;
		case 37:
			_ = zmj.addDate(_, -1, "D");
			break;
		case 38:
			_ = zmj.addDate(_, -7, "D");
			break;
		case 39:
			_ = zmj.addDate(_, 1, "D");
			break;
		case 40:
			_ = zmj.addDate(_, 7, "D");
			break;
		default:
			break
		}
		var $ = this;
		if (_.getMonth() != $.viewDate.getMonth()) {
			$.setViewDate(zmj.cloneDate(_));
			$.focus()
		}
		var A = this.getDateEl(_);
		if (A && Zq6(A, "zmj-calendar-disabled")) return;
		$.setSelectedDate(_);
		if (B.keyCode == 37 || B.keyCode == 38 || B.keyCode == 39 || B.keyCode == 40) B.preventDefault()
	},
	Lo2: function() {
		this.fire("valuechanged")
	},
	getAttrs: function($) {
		var _ = GFD[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["viewDate", "rows", "columns", "ondateclick", "ondrawdate", "ondatechanged", "timeFormat", "ontimechanged", "onvaluechanged"]);
		zmj[D4q]($, _, ["multiSelect", "showHeader", "showFooter", "showWeekNumber", "showDaysHeader", "showMonthButtons", "showYearButtons", "showTodayButton", "showClearButton", "showTime"]);
		return _
	}
});
Cmk(GFD, "calendar");
We0 = function() {
	We0[CPy][CLu][KQk](this)
};
HX_P(We0, LW, {
	formField: true,
	width: 200,
	columns: null,
	columnWidth: 80,
	showNullItem: false,
	nullText: "",
	showEmpty: false,
	emptyText: "",
	showCheckBox: false,
	showAllCheckBox: true,
	multiSelect: false,
	Cap: "zmj-listbox-item",
	Or5: "zmj-listbox-item-hover",
	_V51d: "zmj-listbox-item-selected",
	uiCls: "zmj-listbox",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = "zmj-listbox";
		this.el.innerHTML = "<div class=\"zmj-listbox-border\"><div class=\"zmj-listbox-header\"></div><div class=\"zmj-listbox-view\"></div><input type=\"hidden\"/></div><div class=\"zmj-errorIcon\"></div>";
		this.AE = this.el.firstChild;
		this.Kz = this.AE.firstChild;
		this.G6z = this.AE.childNodes[1];
		this.SA3 = this.AE.childNodes[2];
		this.I2 = this.el.lastChild;
		this.Gk = this.G6z
	},
	destroy: function($) {
		if (this.G6z) {
			zmj[L4D](this.G6z);
			this.G6z = null
		}
		this.AE = null;
		this.Kz = null;
		this.G6z = null;
		this.SA3 = null;
		We0[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		We0[CPy][GX][KQk](this);
		TQ(function() {
			BRs(this.G6z, "scroll", this.DGn, this)
		},
		this)
	},
	destroy: function($) {
		if (this.G6z) this.G6z.onscroll = null;
		We0[CPy][Wsj][KQk](this, $)
	},
	setColumns: function(_) {
		if (!zmj.isArray(_)) _ = [];
		this.columns = _;
		for (var $ = 0, D = this.columns.length; $ < D; $++) {
			var B = this.columns[$];
			if (B.type) {
				if (!zmj.isNull(B.header) && typeof B.header !== "function") if (B.header.trim() == "") delete B.header;
				var C = zmj[P0S](B.type);
				if (C) {
					var E = zmj.copyTo({},
					B);
					zmj.copyTo(B, C);
					zmj.copyTo(B, E)
				}
			}
			var A = parseInt(B.width);
			if (zmj.isNumber(A) && String(A) == B.width) B.width = A + "px";
			if (zmj.isNull(B.width)) B.width = this[O$mJ] + "px"
		}
		this[J_w]()
	},
	getColumns: function() {
		return this.columns
	},
	doUpdate: function() {
		if (this.Djl === false) return;
		var S = this.columns && this.columns.length > 0;
		if (S) _I(this.el, "zmj-listbox-showColumns");
		else Kw(this.el, "zmj-listbox-showColumns");
		this.Kz.style.display = S ? "": "none";
		var I = [];
		if (S) {
			I[I.length] = "<table class=\"zmj-listbox-headerInner\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
			var D = this.uid + "$ck$all";
			I[I.length] = "<td class=\"zmj-listbox-checkbox\"><input type=\"checkbox\" id=\"" + D + "\"></td>";
			for (var R = 0, _ = this.columns.length; R < _; R++) {
				var B = this.columns[R],
				E = B.header;
				if (zmj.isNull(E)) E = "&nbsp;";
				var A = B.width;
				if (zmj.isNumber(A)) A = A + "px";
				I[I.length] = "<td class=\"";
				if (B.headerCls) I[I.length] = B.headerCls;
				I[I.length] = "\" style=\"";
				if (B.headerStyle) I[I.length] = B.headerStyle + ";";
				if (A) I[I.length] = "width:" + A + ";";
				if (B.headerAlign) I[I.length] = "text-align:" + B.headerAlign + ";";
				I[I.length] = "\">";
				I[I.length] = E;
				I[I.length] = "</td>"
			}
			I[I.length] = "</tr></table>"
		}
		this.Kz.innerHTML = I.join("");
		var I = [],
		P = this.data;
		I[I.length] = "<table class=\"zmj-listbox-items\" cellspacing=\"0\" cellpadding=\"0\">";
		if (this[P9A_] && P.length == 0) I[I.length] = "<tr><td colspan=\"20\">" + this[$RmY] + "</td></tr>";
		else {
			this.LMF();
			for (var K = 0, G = P.length; K < G; K++) {
				var $ = P[K],
				M = -1,
				O = " ",
				J = -1,
				N = " ";
				I[I.length] = "<tr id=\"";
				I[I.length] = this.B3n9(K);
				I[I.length] = "\" index=\"";
				I[I.length] = K;
				I[I.length] = "\" class=\"zmj-listbox-item ";
				if ($.enabled === false) I[I.length] = " zmj-disabled ";
				M = I.length;
				I[I.length] = O;
				I[I.length] = "\" style=\"";
				J = I.length;
				I[I.length] = N;
				I[I.length] = "\">";
				var H = this.UoK(K),
				L = this.name,
				F = this[_p]($),
				C = "";
				if ($.enabled === false) C = "disabled";
				I[I.length] = "<td class=\"zmj-listbox-checkbox\"><input " + C + " id=\"" + H + "\" type=\"checkbox\" ></td>";
				if (S) {
					for (R = 0, _ = this.columns.length; R < _; R++) {
						var B = this.columns[R],
						T = this.Ze($, K, B),
						A = B.width;
						if (typeof A == "number") A = A + "px";
						I[I.length] = "<td class=\"";
						if (T.cellCls) I[I.length] = T.cellCls;
						I[I.length] = "\" style=\"";
						if (T.cellStyle) I[I.length] = T.cellStyle + ";";
						if (A) I[I.length] = "width:" + A + ";";
						if (B.align) I[I.length] = "text-align:" + B.align + ";";
						I[I.length] = "\">";
						I[I.length] = T.cellHtml;
						I[I.length] = "</td>";
						if (T.rowCls) O = T.rowCls;
						if (T.rowStyle) N = T.rowStyle
					}
				} else {
					T = this.Ze($, K, null);
					I[I.length] = "<td class=\"";
					if (T.cellCls) I[I.length] = T.cellCls;
					I[I.length] = "\" style=\"";
					if (T.cellStyle) I[I.length] = T.cellStyle;
					I[I.length] = "\">";
					I[I.length] = T.cellHtml;
					I[I.length] = "</td>";
					if (T.rowCls) O = T.rowCls;
					if (T.rowStyle) N = T.rowStyle
				}
				I[M] = O;
				I[J] = N;
				I[I.length] = "</tr>"
			}
		}
		I[I.length] = "</table>";
		var Q = I.join("");
		this.G6z.innerHTML = Q;
		this.Bmcn();
		this[X5Q]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		if (this.columns && this.columns.length > 0) _I(this.el, "zmj-listbox-showcolumns");
		else Kw(this.el, "zmj-listbox-showcolumns");
		if (this[D6e]) Kw(this.el, "zmj-listbox-hideCheckBox");
		else _I(this.el, "zmj-listbox-hideCheckBox");
		var D = this.uid + "$ck$all",
		B = document.getElementById(D);
		if (B) B.style.display = this[M3X] ? "": "none";
		var E = this[Uw]();
		h = this[KjJg](true);
		_ = this[BMK](true);
		var C = _,
		F = this.G6z;
		F.style.width = _ + "px";
		if (!E) {
			var $ = $L7(this.Kz);
			h = h - $;
			F.style.height = h + "px"
		} else F.style.height = "auto";
		if (isIE) {
			var A = this.Kz.firstChild,
			G = this.G6z.firstChild;
			if (this.G6z.offsetHeight >= this.G6z.scrollHeight) {
				G.style.width = "100%";
				if (A) A.style.width = "100%"
			} else {
				var _ = parseInt(G.parentNode.offsetWidth - 17) + "px";
				G.style.width = _;
				if (A) A.style.width = _
			}
		}
		if (this.G6z.offsetHeight < this.G6z.scrollHeight) this.Kz.style.width = (C - 17) + "px";
		else this.Kz.style.width = "100%"
	},
	setShowCheckBox: function($) {
		this[D6e] = $;
		this[X5Q]()
	},
	getShowCheckBox: function() {
		return this[D6e]
	},
	setShowAllCheckBox: function($) {
		this[M3X] = $;
		this[X5Q]()
	},
	getShowAllCheckBox: function() {
		return this[M3X]
	},
	setShowNullItem: function($) {
		if (this.showNullItem != $) {
			this.showNullItem = $;
			this.LMF();
			this[J_w]()
		}
	},
	getShowNullItem: function() {
		return this.showNullItem
	},
	LMF: function() {
		for (var _ = 0, A = this.data.length; _ < A; _++) {
			var $ = this.data[_];
			if ($.__NullItem) {
				this.data.removeAt(_);
				break
			}
		}
		if (this.showNullItem) {
			$ = {
				__NullItem: true
			};
			$[this.textField] = this.nullText;
			$[this.valueField] = "";
			this.data.insert(0, $)
		}
	},
	removeAll: function() {
		var $ = this.getData();
		this.removeItems($)
	},
	addItems: function(_, $) {
		if (!zmj.isArray(_)) return;
		if (zmj.isNull($)) $ = this.data.length;
		this.data.insertRange($, _);
		this[J_w]()
	},
	addItem: function(_, $) {
		if (!_) return;
		if (this.data.indexOf(_) != -1) return;
		if (zmj.isNull($)) $ = this.data.length;
		this.data.insert($, _);
		this[J_w]()
	},
	removeItems: function($) {
		if (!zmj.isArray($)) return;
		this.data.removeRange($);
		this.$r();
		this[J_w]()
	},
	removeItem: function(_) {
		var $ = this.data.indexOf(_);
		if ($ != -1) {
			this.data.removeAt($);
			this.$r();
			this[J_w]()
		}
	},
	moveItem: function(_, $) {
		if (!_ || !zmj.isNumber($)) return;
		if ($ < 0) $ = 0;
		if ($ > this.data.length) $ = this.data.length;
		this.data.remove(_);
		this.data.insert($, _);
		this[J_w]()
	},
	Ze: function(_, $, C) {
		var A = C ? _[C.field] : this[RZH1](_),
		D = {
			sender: this,
			index: $,
			rowIndex: $,
			record: _,
			item: _,
			column: C,
			field: C ? C.field: null,
			value: A,
			cellHtml: A,
			rowCls: null,
			cellCls: C ? (C.cellCls || "") : "",
			rowStyle: null,
			cellStyle: C ? (C.cellStyle || "") : ""
		};
		if (C) {
			if (C.dateFormat) if (zmj.isDate(D.value)) D.cellHtml = zmj.formatDate(A, C.dateFormat);
			else D.cellHtml = A;
			var B = C.renderer;
			if (B) {
				fn = typeof B == "function" ? B: window[B];
				if (fn) D.cellHtml = fn[KQk](C, D)
			}
		}
		this.fire("drawcell", D);
		if (D.cellHtml === null || D.cellHtml === undefined || D.cellHtml === "") D.cellHtml = "&nbsp;";
		return D
	},
	DGn: function($) {
		this.Kz.scrollLeft = this.G6z.scrollLeft
	},
	PSN: function(C) {
		var A = this.uid + "$ck$all";
		if (C.target.id == A) {
			var _ = document.getElementById(A);
			if (_) {
				var B = _.checked,
				$ = this.getValue();
				if (B) this.selectAll();
				else this[FqM]();
				this.MdI();
				if ($ != this.getValue()) {
					this.Lo2();
					this.fire("itemclick", {
						htmlEvent: C
					})
				}
			}
			return
		}
		this.Yis(C, "Click")
	},
	getAttrs: function(_) {
		var E = We0[CPy][YIb][KQk](this, _);
		zmj[D4q](_, E, ["showCheckBox", "showAllCheckBox", "showNullItem"]);
		if (_.nodeName.toLowerCase() != "select") {
			var C = zmj[P8pq](_);
			for (var $ = 0, D = C.length; $ < D; $++) {
				var B = C[$],
				A = jQuery(B).attr("property");
				if (!A) continue;
				A = A.toLowerCase();
				if (A == "columns") E.columns = zmj._ParseColumns(B);
				else if (A == "data") E.data = B.innerHTML
			}
		}
		return E
	}
});
Cmk(We0, "listbox");
_Wq = function() {
	_Wq[CPy][CLu][KQk](this)
};
HX_P(_Wq, LW, {
	formField: true,
	multiSelect: true,
	repeatItems: 0,
	repeatLayout: "none",
	repeatDirection: "horizontal",
	Cap: "zmj-checkboxlist-item",
	Or5: "zmj-checkboxlist-item-hover",
	_V51d: "zmj-checkboxlist-item-selected",
	EIs7: "zmj-checkboxlist-table",
	PZv: "zmj-checkboxlist-td",
	ZYH: "checkbox",
	uiCls: "zmj-checkboxlist",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = this.uiCls;
		this.el.innerHTML = "<div class=\"zmj-list-inner\"></div><div class=\"zmj-errorIcon\"></div><input type=\"hidden\" />";
		this._tbB = this.el.firstChild;
		this.SA3 = this.el.lastChild;
		this.I2 = this.el.childNodes[1]
	},
	AcN: function() {
		var B = [];
		if (this.repeatItems > 0) {
			if (this.repeatDirection == "horizontal") {
				var D = [];
				for (var C = 0, E = this.data.length; C < E; C++) {
					var A = this.data[C];
					if (D.length == this.repeatItems) {
						B.push(D);
						D = []
					}
					D.push(A)
				}
				B.push(D)
			} else {
				var _ = this.repeatItems > this.data.length ? this.data.length: this.repeatItems;
				for (C = 0, E = _; C < E; C++) B.push([]);
				for (C = 0, E = this.data.length; C < E; C++) {
					var A = this.data[C],
					$ = C % this.repeatItems;
					B[$].push(A)
				}
			}
		} else B = [this.data.clone()];
		return B
	},
	doUpdate: function() {
		var D = this.data,
		G = "";
		for (var A = 0, F = D.length; A < F; A++) {
			var _ = D[A];
			_._i = A
		}
		if (this.repeatLayout == "flow") {
			var $ = this.AcN();
			for (A = 0, F = $.length; A < F; A++) {
				var C = $[A];
				for (var E = 0, B = C.length; E < B; E++) {
					_ = C[E];
					G += this.IK6S(_, _._i)
				}
				if (A != F - 1) G += "<br/>"
			}
		} else if (this.repeatLayout == "table") {
			$ = this.AcN();
			G += "<table class=\"" + this.EIs7 + "\" cellpadding=\"0\" cellspacing=\"1\">";
			for (A = 0, F = $.length; A < F; A++) {
				C = $[A];
				G += "<tr>";
				for (E = 0, B = C.length; E < B; E++) {
					_ = C[E];
					G += "<td class=\"" + this.PZv + "\">";
					G += this.IK6S(_, _._i);
					G += "</td>"
				}
				G += "</tr>"
			}
			G += "</table>"
		} else for (A = 0, F = D.length; A < F; A++) {
			_ = D[A];
			G += this.IK6S(_, A)
		}
		this._tbB.innerHTML = G;
		for (A = 0, F = D.length; A < F; A++) {
			_ = D[A];
			delete _._i
		}
	},
	IK6S: function(_, $) {
		var F = this.HqJ(_, $),
		E = this.B3n9($),
		A = this.UoK($),
		C = this[_p](_),
		B = "",
		D = "<div id=\"" + E + "\" index=\"" + $ + "\" class=\"" + this.Cap + " ";
		if (_.enabled === false) {
			D += " zmj-disabled ";
			B = "disabled"
		}
		D += F.itemCls + "\" style=\"" + F.itemStyle + "\"><input " + B + " value=\"" + C + "\" id=\"" + A + "\" type=\"" + this.ZYH + "\" onclick=\"return false;\"/><label for=\"" + A + "\" onclick=\"return false;\">";
		D += F.itemHtml + "</label></div>";
		return D
	},
	HqJ: function(_, $) {
		var A = this[RZH1](_),
		B = {
			index: $,
			item: _,
			itemHtml: A,
			itemCls: "",
			itemStyle: ""
		};
		this.fire("drawitem", B);
		if (B.itemHtml === null || B.itemHtml === undefined) B.itemHtml = "";
		return B
	},
	setRepeatItems: function($) {
		$ = parseInt($);
		if (isNaN($)) $ = 0;
		if (this.repeatItems != $) {
			this.repeatItems = $;
			this[J_w]()
		}
	},
	getRepeatItems: function() {
		return this.repeatItems
	},
	setRepeatLayout: function($) {
		if ($ != "flow" && $ != "table") $ = "none";
		if (this.repeatLayout != $) {
			this.repeatLayout = $;
			this[J_w]()
		}
	},
	getRepeatLayout: function() {
		return this.repeatLayout
	},
	setRepeatDirection: function($) {
		if ($ != "vertical") $ = "horizontal";
		if (this.repeatDirection != $) {
			this.repeatDirection = $;
			this[J_w]()
		}
	},
	getRepeatDirection: function() {
		return this.repeatDirection
	},
	getAttrs: function(_) {
		var D = _Wq[CPy][YIb][KQk](this, _),
		C = jQuery(_),
		$ = parseInt(C.attr("repeatItems"));
		if (!isNaN($)) D.repeatItems = $;
		var B = C.attr("repeatLayout");
		if (B) D.repeatLayout = B;
		var A = C.attr("repeatDirection");
		if (A) D.repeatDirection = A;
		return D
	}
});
Cmk(_Wq, "checkboxlist");
YfeE = function() {
	YfeE[CPy][CLu][KQk](this)
};
HX_P(YfeE, _Wq, {
	multiSelect: false,
	Cap: "zmj-radiobuttonlist-item",
	Or5: "zmj-radiobuttonlist-item-hover",
	_V51d: "zmj-radiobuttonlist-item-selected",
	EIs7: "zmj-radiobuttonlist-table",
	PZv: "zmj-radiobuttonlist-td",
	ZYH: "radio",
	uiCls: "zmj-radiobuttonlist"
});
Cmk(YfeE, "radiobuttonlist");
We = function() {
	this.data = [];
	We[CPy][CLu][KQk](this)
};
HX_P(We, C7r, {
	text: "",
	value: "",
	valueField: "id",
	textField: "text",
	nodesField: "children",
	delimiter: ",",
	multiSelect: false,
	data: [],
	url: "",
	allowInput: false,
	showTreeIcon: false,
	showTreeLines: true,
	resultAsTree: false,
	parentField: "pid",
	checkRecursive: false,
	showFolderCheckBox: false,
	popupWidth: 200,
	popupMaxHeight: 250,
	popupMinWidth: 100,
	set: function(B) {
		if (typeof B == "string") return this;
		var $ = B.value;
		delete B.value;
		var _ = B.text;
		delete B.text;
		var C = B.url;
		delete B.url;
		var A = B.data;
		delete B.data;
		We[CPy].set[KQk](this, B);
		if (!zmj.isNull(A)) this[Uj](A);
		if (!zmj.isNull(C)) this.setUrl(C);
		if (!zmj.isNull($)) this[NHk2]($);
		if (!zmj.isNull(_)) this[Vh](_);
		return this
	},
	uiCls: "zmj-treeselect",
	LT$: function() {
		We[CPy].LT$[KQk](this);
		this.tree = new NR();
		this.tree.setShowTreeIcon(true);
		this.tree.setStyle("border:0;width:100%;height:100%;");
		this.tree.setResultAsTree(this[RLR]);
		this.tree[_B9](this.popup._contentEl);
		this.tree.on("nodeclick", this.A5u8, this);
		this.tree.on("nodecheck", this.CuH, this);
		this.tree.on("expand", this.Ng5, this);
		this.tree.on("collapse", this.ZH_, this);
		this.tree.on("beforenodecheck", this.S8Wy, this);
		this.tree.on("beforenodeselect", this.Xr, this);
		this.tree.allowAnim = false
	},
	S8Wy: function($) {
		$.tree = $.sender;
		this.fire("beforenodecheck", $)
	},
	Xr: function($) {
		$.tree = $.sender;
		this.fire("beforenodeselect", $)
	},
	Ng5: function($) {
		this[Dh]()
	},
	ZH_: function($) {
		this[Dh]()
	},
	showPopup: function() {
		this.tree[BrQ]("auto");
		var $ = this.popup.el.style.height;
		if ($ == "" || $ == "auto") this.tree[BrQ]("auto");
		else this.tree[BrQ]("100%");
		We[CPy][Dh][KQk](this);
		this.tree[NHk2](this.value)
	},
	Nrp: function($) {
		this.tree.clearFilter();
		this.fire("hidepopup")
	},
	getItem: function($) {
		return typeof $ == "object" ? $: this.data[$]
	},
	indexOf: function($) {
		return this.data.indexOf($)
	},
	getAt: function($) {
		return this.data[$]
	},
	load: function($) {
		this.tree.load($)
	},
	setData: function($) {
		this.tree[Uj]($);
		this.data = this.tree.data
	},
	getData: function() {
		return this.data
	},
	setUrl: function($) {
		this.getPopup();
		this.tree.setUrl($);
		this.url = this.tree.url
	},
	getUrl: function() {
		return this.url
	},
	setTextField: function($) {
		if (this.tree) this.tree.setTextField($);
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	setNodesField: function($) {
		if (this.tree) this.tree.setNodesField($);
		this.nodesField = $
	},
	getNodesField: function() {
		return this.nodesField
	},
	setValue: function($) {
		if (this.value != $) {
			var _ = this.tree.Ss0($);
			this.value = $;
			this.SA3.value = $;
			this.UQj.value = _[1];
			this.C4F()
		}
	},
	setMultiSelect: function($) {
		if (this[R0PE] != $) {
			this[R0PE] = $;
			this.tree.setShowCheckBox($);
			this.tree.setAllowSelect(!$);
			this.tree.setEnableHotTrack(!$)
		}
	},
	getMultiSelect: function() {
		return this[R0PE]
	},
	A5u8: function(B) {
		if (this[R0PE]) return;
		var _ = this.tree.getSelectedNode(),
		A = this.tree[_p](_),
		$ = this.getValue();
		this[NHk2](A);
		if ($ != this.getValue()) this.Lo2();
		this[$SI]()
	},
	CuH: function(A) {
		if (!this[R0PE]) return;
		var _ = this.tree.getValue(),
		$ = this.getValue();
		this[NHk2](_);
		if ($ != this.getValue()) this.Lo2()
	},
	Ln1: function(_) {
		this.fire("keydown", {
			htmlEvent: _
		});
		if (_.keyCode == 8 && (this[BUK]() || this.allowInput == false)) return false;
		if (_.keyCode == 9) {
			this[$SI]();
			return
		}
		switch (_.keyCode) {
		case 27:
			if (this.isShowPopup()) _.stopPropagation();
			this[$SI]();
			break;
		case 13:
			break;
		case 37:
			break;
		case 38:
			_.preventDefault();
			break;
		case 39:
			break;
		case 40:
			_.preventDefault();
			this[Dh]();
			break;
		default:
			var $ = this;
			setTimeout(function() {
				$.Uh5j()
			},
			10);
			break
		}
	},
	Uh5j: function() {
		var _ = this[Uc9],
		$ = this.UQj.value.toLowerCase();
		this.tree.filter(function(B) {
			var A = String(B[_] ? B[_] : "").toLowerCase();
			if (A.indexOf($) != -1) return true;
			else return false
		});
		this.tree.expandAll();
		this[Dh]()
	},
	setCheckRecursive: function($) {
		this[VsK] = $;
		if (this.tree) this.tree.setCheckRecursive($)
	},
	getCheckRecursive: function() {
		return this[VsK]
	},
	setResultAsTree: function($) {
		this[RLR] = $;
		if (this.tree) this.tree.setResultAsTree($)
	},
	getResultAsTree: function() {
		return this[RLR]
	},
	setParentField: function($) {
		this[UOB] = $;
		if (this.tree) this.tree.setParentField($)
	},
	getParentField: function() {
		return this[UOB]
	},
	setValueField: function($) {
		if (this.tree) this.tree.setIdField($);
		this[Aqt] = $
	},
	getValueField: function() {
		return this[Aqt]
	},
	setShowTreeIcon: function($) {
		this[ZRq] = $;
		if (this.tree) this.tree.setShowTreeIcon($)
	},
	getShowTreeIcon: function() {
		return this[ZRq]
	},
	setShowTreeLines: function($) {
		this[YSY] = $;
		if (this.tree) this.tree.setShowTreeLines($)
	},
	getShowTreeLines: function() {
		return this[YSY]
	},
	setShowFolderCheckBox: function($) {
		this[CTa] = $;
		if (this.tree) this.tree.setShowFolderCheckBox($)
	},
	getShowFolderCheckBox: function() {
		return this[CTa]
	},
	getAttrs: function($) {
		var _ = AcB_[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["url", "data", "textField", "valueField", "nodesField", "parentField", "onbeforenodecheck", "onbeforenodeselect"]);
		zmj[D4q]($, _, ["multiSelect", "resultAsTree", "checkRecursive", "showTreeIcon", "showTreeLines", "showFolderCheckBox"]);
		return _
	}
});
Cmk(We, "TreeSelect");
ViYb = function() {
	ViYb[CPy][CLu][KQk](this);
	this[NHk2](this[Hsy_])
};
HX_P(ViYb, DjY, {
	value: 0,
	minValue: 0,
	maxValue: 100,
	increment: 1,
	decimalPlaces: 0,
	set: function(_) {
		if (typeof _ == "string") return this;
		var $ = _.value;
		delete _.value;
		ViYb[CPy].set[KQk](this, _);
		if (!zmj.isNull($)) this[NHk2]($);
		return this
	},
	uiCls: "zmj-spinner",
	MLCHtml: function() {
		var $ = "onmouseover=\"_I(this,'" + this.VIy + "');\" " + "onmouseout=\"Kw(this,'" + this.VIy + "');\"";
		return "<span class=\"zmj-buttonedit-button\" " + $ + "><span class=\"zmj-buttonedit-up\"><span></span></span><span class=\"zmj-buttonedit-down\"><span></span></span></span>"
	},
	_initEvents: function() {
		ViYb[CPy][GX][KQk](this);
		TQ(function() {
			this.on("buttonmousedown", this.ND, this);
			WoBw(this.el, "mousewheel", this.NX, this)
		},
		this)
	},
	Dw35: function() {
		if (this[Hsy_] > this[I2m]) this[I2m] = this[Hsy_] + 100;
		if (this.value < this[Hsy_]) this[NHk2](this[Hsy_]);
		if (this.value > this[I2m]) this[NHk2](this[I2m])
	},
	setValue: function($) {
		$ = parseFloat($);
		if (isNaN($)) $ = this[Hsy_];
		$ = parseFloat($.toFixed(this[NYG]));
		if (this.value != $) {
			this.value = $;
			this.Dw35();
			this.UQj.value = this.SA3.value = this.getFormValue()
		} else this.UQj.value = this.getFormValue()
	},
	setMaxValue: function($) {
		$ = parseFloat($);
		if (isNaN($)) return;
		$ = parseFloat($.toFixed(this[NYG]));
		if (this[I2m] != $) {
			this[I2m] = $;
			this.Dw35()
		}
	},
	getMaxValue: function($) {
		return this[I2m]
	},
	setMinValue: function($) {
		$ = parseFloat($);
		if (isNaN($)) return;
		$ = parseFloat($.toFixed(this[NYG]));
		if (this[Hsy_] != $) {
			this[Hsy_] = $;
			this.Dw35()
		}
	},
	getMinValue: function($) {
		return this[Hsy_]
	},
	setIncrement: function($) {
		$ = parseFloat($);
		if (isNaN($)) return;
		if (this[Rjy] != $) this[Rjy] = $
	},
	getIncrement: function($) {
		return this[Rjy]
	},
	setDecimalPlaces: function($) {
		$ = parseInt($);
		if (isNaN($) || $ < 0) return;
		this[NYG] = $
	},
	getDecimalPlaces: function($) {
		return this[NYG]
	},
	Sor: null,
	LU: function(D, B, C) {
		this.U9J();
		this[NHk2](this.value + D);
		var A = this,
		_ = C,
		$ = new Date();
		this.Sor = setInterval(function() {
			A[NHk2](A.value + D);
			A.Lo2();
			C--;
			if (C == 0 && B > 50) A.LU(D, B - 100, _ + 3);
			var E = new Date();
			if (E - $ > 500) A.U9J();
			$ = E
		},
		B);
		WoBw(document, "mouseup", this.OR1, this)
	},
	U9J: function() {
		clearInterval(this.Sor);
		this.Sor = null
	},
	ND: function($) {
		this._DownValue = this.getFormValue();
		if ($.spinType == "up") this.LU(this.increment, 230, 2);
		else this.LU( - this.increment, 230, 2)
	},
	Ln1: function(_) {
		ViYb[CPy].Ln1[KQk](this, _);
		var $ = zmj.Keyboard;
		switch (_.keyCode) {
		case $.Top:
			this[NHk2](this.value + this[Rjy]);
			this.Lo2();
			break;
		case $.Bottom:
			this[NHk2](this.value - this[Rjy]);
			this.Lo2();
			break
		}
	},
	NX: function(A) {
		if (this[BUK]()) return;
		var $ = A.wheelDelta;
		if (zmj.isNull($)) $ = -A.detail * 24;
		var _ = this[Rjy];
		if ($ < 0) _ = -_;
		this[NHk2](this.value + _);
		this.Lo2();
		return false
	},
	OR1: function($) {
		this.U9J();
		Is(document, "mouseup", this.OR1, this);
		if (this._DownValue != this.getFormValue()) this.Lo2()
	},
	Pid: function(A) {
		var _ = this.getValue(),
		$ = parseFloat(this.UQj.value);
		this[NHk2]($);
		if (_ != this.getValue()) this.Lo2()
	},
	getAttrs: function($) {
		var _ = ViYb[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["minValue", "maxValue", "increment", "decimalPlaces"]);
		return _
	}
});
Cmk(ViYb, "spinner");
WJ = function() {
	WJ[CPy][CLu][KQk](this);
	this[NHk2]("00:00:00")
};
HX_P(WJ, DjY, {
	value: null,
	format: "H:mm:ss",
	uiCls: "zmj-timespinner",
	MLCHtml: function() {
		var $ = "onmouseover=\"_I(this,'" + this.VIy + "');\" " + "onmouseout=\"Kw(this,'" + this.VIy + "');\"";
		return "<span class=\"zmj-buttonedit-button\" " + $ + "><span class=\"zmj-buttonedit-up\"><span></span></span><span class=\"zmj-buttonedit-down\"><span></span></span></span>"
	},
	_initEvents: function() {
		WJ[CPy][GX][KQk](this);
		TQ(function() {
			this.on("buttonmousedown", this.ND, this);
			WoBw(this.el, "mousewheel", this.NX, this);
			WoBw(this.UQj, "keydown", this.PDh, this)
		},
		this)
	},
	setFormat: function($) {
		if (typeof $ != "string") return;
		var _ = ["H:mm:ss", "HH:mm:ss", "H:mm", "HH:mm", "H", "HH", "mm:ss"];
		if (_.indexOf($) == -1) return;
		if (this.format != $) {
			this.format = $;
			this.UQj.value = this.getFormattedValue()
		}
	},
	getFormat: function() {
		return this.format
	},
	setValue: function($) {
		$ = zmj.parseTime($, this.format);
		if (!$) $ = zmj.parseTime("00:00:00", this.format);
		if (zmj.isDate($)) $ = new Date($.getTime());
		if (zmj.formatDate(this.value, "H:mm:ss") != zmj.formatDate($, "H:mm:ss")) {
			this.value = $;
			this.UQj.value = this.getFormattedValue();
			this.SA3.value = this.getFormValue()
		}
	},
	getValue: function() {
		return this.value == null ? null: new Date(this.value.getTime())
	},
	getFormValue: function() {
		if (!this.value) return "";
		return zmj.formatDate(this.value, "H:mm:ss")
	},
	getFormattedValue: function() {
		if (!this.value) return "";
		return zmj.formatDate(this.value, this.format)
	},
	C8lN: function(D, C) {
		var $ = this.getValue();
		if ($) switch (C) {
		case "hours":
			var A = $.getHours() + D;
			if (A > 23) A = 23;
			if (A < 0) A = 0;
			$.setHours(A);
			break;
		case "minutes":
			var B = $.getMinutes() + D;
			if (B > 59) B = 59;
			if (B < 0) B = 0;
			$.setMinutes(B);
			break;
		case "seconds":
			var _ = $.getSeconds() + D;
			if (_ > 59) _ = 59;
			if (_ < 0) _ = 0;
			$.setSeconds(_);
			break
		} else $ = "00:00:00";
		this[NHk2]($)
	},
	Sor: null,
	LU: function(D, B, C) {
		this.U9J();
		this.C8lN(D, this.LLn5);
		var A = this,
		_ = C,
		$ = new Date();
		this.Sor = setInterval(function() {
			A.C8lN(D, A.LLn5);
			C--;
			if (C == 0 && B > 50) A.LU(D, B - 100, _ + 3);
			var E = new Date();
			if (E - $ > 500) A.U9J();
			$ = E
		},
		B);
		WoBw(document, "mouseup", this.OR1, this)
	},
	U9J: function() {
		clearInterval(this.Sor);
		this.Sor = null
	},
	ND: function($) {
		this._DownValue = this.getFormValue();
		this.LLn5 = "hours";
		if ($.spinType == "up") this.LU(1, 230, 2);
		else this.LU( - 1, 230, 2)
	},
	OR1: function($) {
		this.U9J();
		Is(document, "mouseup", this.OR1, this);
		if (this._DownValue != this.getFormValue()) this.Lo2()
	},
	Pid: function(_) {
		var $ = this.getFormValue();
		this[NHk2](this.UQj.value);
		if ($ != this.getFormValue()) this.Lo2()
	},
	getAttrs: function($) {
		var _ = WJ[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["format"]);
		return _
	}
});
Cmk(WJ, "timespinner");
Hayi = function() {
	Hayi[CPy][CLu][KQk](this);
	this.on("validation", this.PNA, this)
};
HX_P(Hayi, DjY, {
	width: 180,
	buttonText: "\u6d4f\u89c8...",
	_buttonWidth: 56,
	limitType: "",
	limitTypeErrorText: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f\u4e3a\uff1a",
	allowInput: false,
	readOnly: true,
	SJFQ: 0,
	uiCls: "zmj-htmlfile",
	_create: function() {
		Hayi[CPy][QjIH][KQk](this);
		this.Ytc = zmj.append(this.el, "<input type=\"file\" hideFocus class=\"zmj-htmlfile-file\" name=\"" + this.name + "\" ContentEditable=false/>");
		WoBw(this.el, "mousemove", this.Vqc, this);
		WoBw(this.Ytc, "change", this.Bg3, this)
	},
	MLCHtml: function() {
		var $ = "onmouseover=\"_I(this,'" + this.VIy + "');\" " + "onmouseout=\"Kw(this,'" + this.VIy + "');\"";
		return "<span class=\"zmj-buttonedit-button\" " + $ + ">" + this.buttonText + "</span>"
	},
	Bg3: function($) {
		this.value = this.UQj.value = this.Ytc.value;
		this.Lo2()
	},
	Vqc: function(B) {
		var A = B.pageX,
		_ = B.pageY,
		$ = Vhwd(this.el);
		A = (A - $.x - 5);
		_ = (_ - $.y - 5);
		if (this.enabled == false) {
			A = -20;
			_ = -20
		}
		this.Ytc.style.left = A + "px";
		this.Ytc.style.top = _ + "px"
	},
	PNA: function(B) {
		var A = B.value.split("."),
		$ = "*." + A[A.length - 1],
		_ = this.limitType.split(";");
		if (_.length > 0 && _.indexOf($) == -1) {
			B.errorText = this.limitTypeErrorText + this.limitType;
			B.isValid = false
		}
	},
	setName: function($) {
		this.name = $;
		zmj.setAttr(this.Ytc, "name", this.name)
	},
	getValue: function() {
		return this.UQj.value
	},
	setButtonText: function($) {
		this.buttonText = $
	},
	getButtonText: function() {
		return this.buttonText
	},
	setLimitType: function($) {
		this.limitType = $
	},
	getLimitType: function() {
		return this.limitType
	},
	getAttrs: function($) {
		var _ = Hayi[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["limitType", "buttonText", "limitTypeErrorText"]);
		return _
	}
});
Cmk(Hayi, "htmlfile");
Au = function($) {
	Au[CPy][CLu][KQk](this, $);
	this.on("validation", this.PNA, this)
};
HX_P(Au, DjY, {
	width: 180,
	buttonText: "\u6d4f\u89c8...",
	_buttonWidth: 56,
	limitTypeErrorText: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f\u4e3a\uff1a",
	readOnly: true,
	SJFQ: 0,
	limitSize: "",
	limitType: "",
	typesDescription: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f",
	uploadLimit: 0,
	queueLimit: "",
	flashUrl: "",
	uploadUrl: "",
	uploadOnSelect: false,
	uiCls: "zmj-fileupload",
	_create: function() {
		Au[CPy][QjIH][KQk](this);
		_I(this.el, "zmj-htmlfile");
		this.Ytc = zmj.append(this.el, "<span></span>");
		this.uploadEl = this.Ytc;
		WoBw(this.el, "mousemove", this.Vqc, this)
	},
	MLCHtml: function() {
		var $ = "onmouseover=\"_I(this,'" + this.VIy + "');\" " + "onmouseout=\"Kw(this,'" + this.VIy + "');\"";
		return "<span class=\"zmj-buttonedit-button\" " + $ + ">" + this.buttonText + "</span>"
	},
	destroy: function($) {
		if (this._tbB) {
			zmj[L4D](this._tbB);
			this._tbB = null
		}
		Au[CPy][Wsj][KQk](this, $)
	},
	Vqc: function(A) {
		var $ = this;
		if (this.enabled == false) return;
		if (!this.swfUpload) {
			var B = new SWFUpload({
				file_post_name: this.name,
				upload_url: $.uploadUrl,
				flash_url: $.flashUrl,
				file_size_limit: $.limitSize,
				file_types: $.limitType,
				file_types_description: $.typesDescription,
				file_upload_limit: parseInt($.uploadLimit),
				file_queue_limit: $.queueLimit,
				file_queued_handler: zmj.createDelegate(this.__on_file_queued, this),
				upload_error_handler: zmj.createDelegate(this.__on_upload_error, this),
				upload_success_handler: zmj.createDelegate(this.__on_upload_success, this),
				upload_complete_handler: zmj.createDelegate(this.__on_upload_complete, this),
				button_placeholder: $.uploadEl,
				button_width: 1000,
				button_height: 20,
				button_window_mode: "transparent",
				debug: false
			});
			B.flashReady();
			this.swfUpload = B;
			var _ = this.swfUpload.movieElement;
			_.style.zIndex = 1000;
			_.style.position = "absolute";
			_.style.left = "0px";
			_.style.top = "0px";
			_.style.width = "100%";
			_.style.height = "20px"
		}
	},
	setLimitSize: function($) {
		this.limitSize = $
	},
	setLimitType: function($) {
		this.limitType = $
	},
	setTypesDescription: function($) {
		this.typesDescription = $
	},
	setUploadLimit: function($) {
		this.uploadLimit = $
	},
	setQueueLimit: function($) {
		this.queueLimit = $
	},
	setFlashUrl: function($) {
		this.flashUrl = $
	},
	setUploadUrl: function($) {
		this.uploadUrl = $
	},
	setName: function($) {
		this.name = $
	},
	startUpload: function($) {
		if (this.swfUpload) this.swfUpload.startUpload()
	},
	__on_file_queued: function($) {
		if (this.uploadOnSelect) this.swfUpload.startUpload();
		this[Vh]($.name)
	},
	__on_upload_success: function(_, $) {
		var A = {
			file: _,
			serverData: $
		};
		this.fire("uploadsuccess", A)
	},
	__on_upload_error: function($) {
		var _ = {
			file: $
		};
		this.fire("uploaderror", _)
	},
	__on_upload_complete: function($) {
		this.fire("uploadcomplete", $)
	},
	__fileError: function() {},
	getAttrs: function($) {
		var _ = Au[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["limitType", "limitSize", "flashUrl", "uploadUrl", "uploadLimit", "onuploadsuccess", "onuploaderror", "onuploadcomplete"]);
		zmj[D4q]($, _, ["uploadOnSelect"]);
		return _
	}
});
Cmk(Au, "fileupload");
VAD = function() {
	this.data = [];
	VAD[CPy][CLu][KQk](this);
	WoBw(this.UQj, "mouseup", this.X0i, this)
};
HX_P(VAD, C7r, {
	allowInput: true,
	valueField: "id",
	textField: "text",
	delimiter: ",",
	multiSelect: false,
	data: [],
	grid: null,
	uiCls: "zmj-lookup",
	destroy: function($) {
		if (this.grid) {
			this.grid.un("rowclick", this.__OnGridRowClickChanged, this);
			this.grid.un("load", this.Mp, this);
			this.grid = null
		}
		VAD[CPy][Wsj][KQk](this, $)
	},
	setMultiSelect: function($) {
		this[R0PE] = $;
		if (this.grid) this.grid.setMultiSelect($)
	},
	setGrid: function($) {
		if (typeof $ == "string") {
			zmj.parse($);
			$ = zmj.get($)
		}
		this.grid = zmj.getAndCreate($);
		if (this.grid) {
			this.grid.setMultiSelect(this[R0PE]);
			this.grid.setCheckSelectOnLoad(false);
			this.grid.on("rowclick", this.__OnGridRowClickChanged, this);
			this.grid.on("load", this.Mp, this)
		}
	},
	getGrid: function() {
		return this.grid
	},
	setValueField: function($) {
		this[Aqt] = $
	},
	getValueField: function() {
		return this[Aqt]
	},
	setTextField: function($) {
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	getItemValue: function($) {
		return String($[this.valueField])
	},
	getItemText: function($) {
		var _ = $[this.textField];
		return zmj.isNull(_) ? "": String(_)
	},
	Ss0: function(A) {
		if (zmj.isNull(A)) A = [];
		var B = [],
		C = [];
		for (var _ = 0, D = A.length; _ < D; _++) {
			var $ = A[_];
			if ($) {
				B.push(this[_p]($));
				C.push(this[RZH1]($))
			}
		}
		return [B.join(this.delimiter), C.join(this.delimiter)]
	},
	YY4: function(A) {
		var D = {};
		for (var $ = 0, B = A.length; $ < B; $++) {
			var _ = A[$],
			C = _[this.valueField];
			D[C] = _
		}
		return D
	},
	__OnGridRowClickChanged: function(G) {
		var B = this.YY4(this.grid.getData()),
		C = this.YY4(this.grid.getSelecteds()),
		F = this.YY4(this.data);
		if (this[R0PE] == false) {
			F = {};
			this.data = []
		}
		var A = {};
		for (var E in F) {
			var $ = F[E];
			if (B[E]) if (C[E]);
			else A[E] = $
		}
		for (var _ = this.data.length - 1; _ >= 0; _--) {
			$ = this.data[_],
			E = $[this.valueField];
			if (A[E]) this.data.removeAt(_)
		}
		for (E in C) {
			$ = C[E];
			if (!F[E]) this.data.push($)
		}
		var D = this.Ss0(this.data);
		this[NHk2](D[0]);
		this[Vh](D[1]);
		this.Lo2()
	},
	Mp: function(H) {
		var C = String(this.value).split(this.delimiter),
		F = {};
		for (var $ = 0, D = C.length; $ < D; $++) {
			var G = C[$];
			F[G] = 1
		}
		var A = this.grid.getData(),
		B = [];
		for ($ = 0, D = A.length; $ < D; $++) {
			var _ = A[$],
			E = _[this.valueField];
			if (F[E]) B.push(_)
		}
		this.grid[HXHS](B)
	},
	doUpdate: function() {
		VAD[CPy][J_w][KQk](this);
		this.UQj[E8L] = true;
		this.el.style.cursor = "default"
	},
	Ln1: function($) {
		VAD[CPy].Ln1[KQk](this, $);
		switch ($.keyCode) {
		case 46:
		case 8:
			break;
		case 37:
			break;
		case 39:
			break
		}
	},
	X0i: function(C) {
		if (this[BUK]()) return;
		var _ = zmj.getSelectRange(this.UQj),
		A = _[0],
		B = _[1],
		$ = this.F8RO(A)
	},
	F8RO: function(E) {
		var _ = -1;
		if (this.text == "") return _;
		var C = String(this.text).split(this.delimiter),
		$ = 0;
		for (var A = 0, D = C.length; A < D; A++) {
			var B = C[A];
			if ($ < E && E <= $ + B.length) {
				_ = A;
				break
			}
			$ = $ + B.length + 1
		}
		return _
	},
	getAttrs: function($) {
		var _ = VAD[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["grid", "valueField", "textField"]);
		zmj[D4q]($, _, ["multiSelect"]);
		return _
	}
});
Cmk(VAD, "lookup");
Fuo = function() {
	Fuo[CPy][CLu][KQk](this);
	this.data = [];
	this[J_w]()
};
HX_P(Fuo, Rge, {
	formField: true,
	value: "",
	text: "",
	valueField: "id",
	textField: "text",
	url: "",
	delay: 250,
	allowInput: true,
	editIndex: 0,
	LaG: "zmj-textboxlist-focus",
	Qs: "zmj-textboxlist-item-hover",
	E9O: "zmj-textboxlist-item-selected",
	_l$: "zmj-textboxlist-close-hover",
	textName: "",
	setTextName: function($) {
		this.textName = $
	},
	getTextName: function() {
		return this.textName
	},
	uiCls: "zmj-textboxlist",
	_create: function() {
		var A = "<table class=\"zmj-textboxlist\" cellpadding=\"0\" cellspacing=\"0\"><tr ><td class=\"zmj-textboxlist-border\"><ul></ul><a href=\"#\"></a><input type=\"hidden\"/></td></tr></table>",
		_ = document.createElement("div");
		_.innerHTML = A;
		this.el = _.firstChild;
		var $ = this.el.getElementsByTagName("td")[0];
		this.ulEl = $.firstChild;
		this.SA3 = $.lastChild;
		this.focusEl = $.childNodes[1]
	},
	destroy: function($) {
		if (this.isShowPopup) this[$SI]();
		Is(document, "mousedown", this.O_, this);
		Fuo[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		Fuo[CPy][GX][KQk](this);
		WoBw(this.el, "mousemove", this.Vqc, this);
		WoBw(this.el, "mouseout", this.DtkD, this);
		WoBw(this.el, "mousedown", this.P4, this);
		WoBw(this.el, "click", this.PSN, this);
		WoBw(this.el, "keydown", this.PDh, this);
		WoBw(document, "mousedown", this.O_, this)
	},
	O_: function($) {
		if (this[BUK]()) return false;
		if (this.isShowPopup) if (!EjQz(this.popup.el, $.target)) this[$SI]();
		if (this.Gz) if (this[Oan4]($) == false) {
			this[D3f](null, false);
			this.showInput(false);
			this[T07](this.LaG);
			this.Gz = false
		}
	},
	errorIconEl: null,
	getErrorIconEl: function() {
		if (!this.I2) {
			var _ = this.el.rows[0],
			$ = _.insertCell(1);
			$.style.cssText = "width:18px;vertical-align:top;";
			$.innerHTML = "<div class=\"zmj-errorIcon\"></div>";
			this.I2 = $.firstChild
		}
		return this.I2
	},
	PfCY: function() {
		if (this.I2) jQuery(this.I2.parentNode).remove();
		this.I2 = null
	},
	doLayout: function() {
		if (this.canLayout() == false) return;
		Fuo[CPy][X5Q][KQk](this);
		if (this[BUK]() || this.allowInput == false) this.ZIcL[E8L] = true;
		else this.ZIcL[E8L] = false
	},
	doUpdate: function() {
		if (this.YSB) clearInterval(this.YSB);
		if (this.ZIcL) Is(this.ZIcL, "keydown", this.Ln1, this);
		var G = [],
		F = this.uid;
		for (var A = 0, E = this.data.length; A < E; A++) {
			var _ = this.data[A],
			C = F + "$text$" + A,
			B = _[this.textField];
			if (zmj.isNull(B)) B = "";
			G[G.length] = "<li id=\"" + C + "\" class=\"zmj-textboxlist-item\">";
			G[G.length] = B;
			G[G.length] = "<span class=\"zmj-textboxlist-close\"></span></li>"
		}
		var $ = F + "$input";
		G[G.length] = "<li id=\"" + $ + "\" class=\"zmj-textboxlist-inputLi\"><input class=\"zmj-textboxlist-input\" type=\"text\" autocomplete=\"off\"></li>";
		this.ulEl.innerHTML = G.join("");
		this.editIndex = this.data.length;
		if (this.editIndex < 0) this.editIndex = 0;
		this.inputLi = this.ulEl.lastChild;
		this.ZIcL = this.inputLi.firstChild;
		WoBw(this.ZIcL, "keydown", this.Ln1, this);
		var D = this;
		this.ZIcL.onkeyup = function() {
			D.SsO9()
		};
		D.YSB = null;
		D.RQU = D.ZIcL.value;
		this.ZIcL.onfocus = function() {
			D.YSB = setInterval(function() {
				if (D.RQU != D.ZIcL.value) {
					D.QjG();
					D.RQU = D.ZIcL.value
				}
			},
			10);
			D[B1z](D.LaG);
			D.Gz = true
		};
		this.ZIcL.onblur = function() {
			clearInterval(D.YSB)
		}
	},
	$XL: function(_) {
		var A = J6j(_.target, "zmj-textboxlist-item");
		if (A) {
			var $ = A.id.split("$"),
			B = $[$.length - 1];
			return this.data[B]
		}
	},
	getItem: function($) {
		if (typeof $ == "number") return this.data[$];
		if (typeof $ == "object") return $
	},
	getItemEl: function(_) {
		var $ = this.data.indexOf(_),
		A = this.uid + "$text$" + $;
		return document.getElementById(A)
	},
	hoverItem: function($, A) {
		this.blurItem();
		var _ = this.getItemEl($);
		_I(_, this.Qs);
		if (A && Zq6(A.target, "zmj-textboxlist-close")) _I(A.target, this._l$)
	},
	blurItem: function() {
		var _ = this.data.length;
		for (var A = 0, C = _; A < C; A++) {
			var $ = this.data[A],
			B = this.getItemEl($);
			if (B) {
				Kw(B, this.Qs);
				Kw(B.lastChild, this._l$)
			}
		}
	},
	showInput: function(A) {
		this[D3f](null);
		if (zmj.isNumber(A)) this.editIndex = A;
		else this.editIndex = this.data.length;
		if (this.editIndex < 0) this.editIndex = 0;
		if (this.editIndex > this.data.length) this.editIndex = this.data.length;
		var B = this.inputLi;
		B.style.display = "block";
		if (zmj.isNumber(A) && A < this.data.length) {
			var _ = this.data[A],
			$ = this.getItemEl(_);
			jQuery($).before(B)
		} else this.ulEl.appendChild(B);
		if (A !== false) setTimeout(function() {
			try {
				B.firstChild.focus();
				zmj.selectRange(B.firstChild, 100)
			} catch($) {}
		},
		10);
		else {
			this.lastInputText = "";
			this.ZIcL.value = ""
		}
		return B
	},
	select: function(_) {
		_ = this[VzbR](_);
		if (this.A3) {
			var $ = this.getItemEl(this.A3);
			Kw($, this.E9O)
		}
		this.A3 = _;
		if (this.A3) {
			$ = this.getItemEl(this.A3);
			_I($, this.E9O)
		}
		var A = this;
		if (this.A3) {
			this.focusEl.focus();
			var B = this;
			setTimeout(function() {
				try {
					B.focusEl.focus()
				} catch($) {}
			},
			50)
		}
		if (this.A3) {
			A[B1z](A.LaG);
			A.Gz = true
		}
	},
	$tF: function() {
		var _ = this.MCac[DNU](),
		$ = this.editIndex;
		if (_) {
			_ = zmj.clone(_);
			this.insertItem($, _)
		}
	},
	insertItem: function(_, $) {
		this.data.insert(_, $);
		var B = this.getText(),
		A = this.getValue();
		this[NHk2](A, false);
		this[Vh](B, false);
		this.GZ1();
		this[J_w]();
		this.showInput(_ + 1);
		this.Lo2()
	},
	removeItem: function(_) {
		if (!_) return;
		var $ = this.getItemEl(_);
		zmj[Vj]($);
		this.data.remove(_);
		var B = this.getText(),
		A = this.getValue();
		this[NHk2](A, false);
		this[Vh](B, false);
		this.Lo2()
	},
	GZ1: function() {
		var C = (this.text ? this.text: "").split(","),
		B = (this.value ? this.value: "").split(",");
		if (B[0] == "") B = [];
		var _ = B.length;
		this.data.length = _;
		for (var A = 0, D = _; A < D; A++) {
			var $ = this.data[A];
			if (!$) {
				$ = {};
				this.data[A] = $
			}
			$[this.textField] = !zmj.isNull(C[A]) ? C[A] : "";
			$[this.valueField] = !zmj.isNull(B[A]) ? B[A] : ""
		}
		this.value = this.getValue();
		this.text = this.getText()
	},
	getInputText: function() {
		return this.ZIcL ? this.ZIcL.value: ""
	},
	getText: function() {
		var C = [];
		for (var _ = 0, A = this.data.length; _ < A; _++) {
			var $ = this.data[_],
			B = $[this.textField];
			if (zmj.isNull(B)) B = "";
			B = B.replace(",", "\uff0c");
			C.push(B)
		}
		return C.join(",")
	},
	getValue: function() {
		var B = [];
		for (var _ = 0, A = this.data.length; _ < A; _++) {
			var $ = this.data[_];
			B.push($[this.valueField])
		}
		return B.join(",")
	},
	setName: function($) {
		if (this.name != $) {
			this.name = $;
			this.SA3.name = $
		}
	},
	setValue: function($) {
		if (zmj.isNull($)) $ = "";
		if (this.value != $) {
			this.value = $;
			this.SA3.value = $;
			this.GZ1();
			this[J_w]()
		}
	},
	setText: function($) {
		if (zmj.isNull($)) $ = "";
		if (this.text !== $) {
			this.text = $;
			this.GZ1();
			this[J_w]()
		}
	},
	setValueField: function($) {
		this[Aqt] = $
	},
	getValueField: function() {
		return this[Aqt]
	},
	setTextField: function($) {
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	setAllowInput: function($) {
		this.allowInput = $;
		this[X5Q]()
	},
	getAllowInput: function() {
		return this.allowInput
	},
	setUrl: function($) {
		this.url = $
	},
	getUrl: function() {
		return this.url
	},
	setPopupHeight: function($) {
		this[W4I] = $
	},
	getPopupHeight: function() {
		return this[W4I]
	},
	setPopupMinHeight: function($) {
		this[Y2s] = $
	},
	getPopupMinHeight: function() {
		return this[Y2s]
	},
	setPopupMaxHeight: function($) {
		this[Dhw] = $
	},
	getPopupMaxHeight: function() {
		return this[Dhw]
	},
	SsO9: function() {
		if (this[F9lZ]() == false) return;
		var _ = this.getInputText(),
		B = zmj.measureText(this.ZIcL, _),
		$ = B.width > 20 ? B.width + 4: 20,
		A = F$u(this.el, true);
		if ($ > A - 15) $ = A - 15;
		this.ZIcL.style.width = $ + "px"
	},
	QjG: function(_) {
		var $ = this;
		setTimeout(function() {
			$.SsO9()
		},
		1);
		this[Dh]("loading");
		this.U1y();
		this._loading = true;
		this.delayTimer = setTimeout(function() {
			var _ = $.ZIcL.value;
			$.Uh5j()
		},
		this.delay)
	},
	Uh5j: function() {
		if (this[F9lZ]() == false) return;
		var _ = this.getInputText(),
		A = this,
		$ = this.MCac.getData(),
		B = {
			key: _,
			value: this.getValue(),
			text: this.getText()
		},
		C = this.url,
		E = typeof C == "function" ? C: window[C];
		if (typeof E == "function") C = E(this);
		if (!C) return;
		var D = {
			url: C,
			async: true,
			data: B,
			type: "GET",
			cache: false,
			dataType: "text",
			cancel: false
		};
		this.fire("beforeload", D);
		if (D.cancel) return;
		zmj.copyTo(D, {
			success: function($) {
				var _ = zmj.decode($);
				A.MCac[Uj](_);
				A[Dh]();
				A.MCac.Fsh(0, true);
				A.fire("load");
				A._loading = false;
				if (A._selectOnLoad) {
					A.__doSelectValue();
					A._selectOnLoad = null
				}
			},
			error: function($, B, _) {
				A[Dh]("error")
			}
		});
		A.CqP = jQuery.ajax(D)
	},
	U1y: function() {
		if (this.delayTimer) {
			clearTimeout(this.delayTimer);
			this.delayTimer = null
		}
		if (this.CqP) this.CqP.abort();
		this._loading = false
	},
	within: function($) {
		if (EjQz(this.el, $.target)) return true;
		if (this[Dh] && this.popup && this.popup[Oan4]($)) return true;
		return false
	},
	popupLoadingText: "<span class='zmj-textboxlist-popup-loading'>Loading...</span>",
	popupErrorText: "<span class='zmj-textboxlist-popup-error'>Error</span>",
	popupEmptyText: "<span class='zmj-textboxlist-popup-noresult'>No Result</span>",
	isShowPopup: false,
	popupHeight: "",
	popupMinHeight: 30,
	popupMaxHeight: 150,
	LT$: function() {
		if (!this.popup) {
			this.popup = new We0();
			this.popup[B1z]("zmj-textboxlist-popup");
			this.popup.setStyle("position:absolute;left:0;top:0;");
			this.popup[P9A_] = true;
			this.popup[OmGq](this[Aqt]);
			this.popup.setTextField(this[Uc9]);
			this.popup[_B9](document.body);
			this.popup.on("itemclick",
			function($) {
				this[$SI]();
				this.$tF()
			},
			this)
		}
		this.MCac = this.popup;
		return this.popup
	},
	showPopup: function($) {
		this.isShowPopup = true;
		var _ = this.LT$();
		_.el.style.zIndex = zmj.getMaxZIndex();
		var B = this.MCac;
		B[$RmY] = this.popupEmptyText;
		if ($ == "loading") {
			B[$RmY] = this.popupLoadingText;
			this.MCac[Uj]([])
		} else if ($ == "error") {
			B[$RmY] = this.popupLoadingText;
			this.MCac[Uj]([])
		}
		this.MCac[J_w]();
		var A = this.getBox(),
		D = A.x,
		C = A.y + A.height;
		this.popup.el.style.display = "block";
		zmj[GzmA](_.el, -1000, -1000);
		this.popup[GaK6](A.width);
		this.popup[BrQ](this[W4I]);
		if (this.popup[KjJg]() < this[Y2s]) this.popup[BrQ](this[Y2s]);
		if (this.popup[KjJg]() > this[Dhw]) this.popup[BrQ](this[Dhw]);
		zmj[GzmA](_.el, D, C)
	},
	hidePopup: function() {
		this.isShowPopup = false;
		if (this.popup) this.popup.el.style.display = "none"
	},
	Vqc: function(_) {
		if (this.enabled == false) return;
		var $ = this.$XL(_);
		if (!$) {
			this.blurItem();
			return
		}
		this.hoverItem($, _)
	},
	DtkD: function($) {
		this.blurItem()
	},
	PSN: function(_) {
		if (this.enabled == false) return;
		var $ = this.$XL(_);
		if (!$) {
			if (J6j(_.target, "zmj-textboxlist-input"));
			else this.showInput();
			return
		}
		this.focusEl.focus();
		this[D3f]($);
		if (_ && Zq6(_.target, "zmj-textboxlist-close")) this.removeItem($)
	},
	PDh: function(B) {
		if (this[BUK]() || this.allowInput == false) return false;
		var $ = this.data.indexOf(this.A3),
		_ = this;
		function A() {
			var A = _.data[$];
			_.removeItem(A);
			A = _.data[$];
			if (!A) A = _.data[$ - 1];
			_[D3f](A);
			if (!A) _.showInput()
		}
		switch (B.keyCode) {
		case 8:
			B.preventDefault();
			A();
			break;
		case 37:
		case 38:
			this[D3f](null);
			this.showInput($);
			break;
		case 39:
		case 40:
			$ += 1;
			this[D3f](null);
			this.showInput($);
			break;
		case 46:
			A();
			break
		}
	},
	__doSelectValue: function() {
		var $ = this.MCac.getFocusedItem();
		if ($) this.MCac[Xi]($);
		this.lastInputText = this.text;
		this[$SI]();
		this.$tF()
	},
	Ln1: function(G) {
		this._selectOnLoad = null;
		if (this[BUK]() || this.allowInput == false) return false;
		G.stopPropagation();
		if (this[BUK]() || this.allowInput == false) return;
		var E = zmj.getSelectRange(this.ZIcL),
		B = E[0],
		D = E[1],
		F = this.ZIcL.value.length,
		C = B == D && B == 0,
		A = B == D && D == F;
		if (this[BUK]() || this.allowInput == false) G.preventDefault();
		if (G.keyCode == 9) {
			this[$SI]();
			return
		}
		if (G.keyCode == 16 || G.keyCode == 17 || G.keyCode == 18) return;
		switch (G.keyCode) {
		case 13:
			if (this.isShowPopup) {
				G.preventDefault();
				if (this._loading) {
					this._selectOnLoad = true;
					return
				}
				this.__doSelectValue()
			}
			break;
		case 27:
			G.preventDefault();
			this[$SI]();
			break;
		case 8:
			if (C) G.preventDefault();
		case 37:
			if (C) if (this.isShowPopup) this[$SI]();
			else if (this.editIndex > 0) {
				var _ = this.editIndex - 1;
				if (_ < 0) _ = 0;
				if (_ >= this.data.length) _ = this.data.length - 1;
				this.showInput(false);
				this[D3f](_)
			}
			break;
		case 39:
			if (A) if (this.isShowPopup) this[$SI]();
			else if (this.editIndex <= this.data.length - 1) {
				_ = this.editIndex;
				this.showInput(false);
				this[D3f](_)
			}
			break;
		case 38:
			G.preventDefault();
			if (this.isShowPopup) {
				var _ = -1,
				$ = this.MCac.getFocusedItem();
				if ($) _ = this.MCac.indexOf($);
				_--;
				if (_ < 0) _ = 0;
				this.MCac.Fsh(_, true)
			}
			break;
		case 40:
			G.preventDefault();
			if (this.isShowPopup) {
				_ = -1,
				$ = this.MCac.getFocusedItem();
				if ($) _ = this.MCac.indexOf($);
				_++;
				if (_ < 0) _ = 0;
				if (_ >= this.MCac.getCount()) _ = this.MCac.getCount() - 1;
				this.MCac.Fsh(_, true)
			} else this.QjG(true);
			break;
		default:
			break
		}
	},
	focus: function() {
		try {
			this.ZIcL.focus()
		} catch($) {}
	},
	blur: function() {
		try {
			this.ZIcL.blur()
		} catch($) {}
	},
	getAttrs: function($) {
		var A = FhF[CPy][YIb][KQk](this, $),
		_ = jQuery($);
		zmj[W5cB]($, A, ["value", "text", "valueField", "textField", "url", "popupHeight", "textName"]);
		zmj[D4q]($, A, ["allowInput"]);
		zmj[PI]($, A, ["popupMinHeight", "popupMaxHeight"]);
		return A
	}
});
Cmk(Fuo, "textboxlist");
Z7W = function() {
	Z7W[CPy][CLu][KQk](this);
	var $ = this;
	$.YSB = null;
	this.UQj.onfocus = function() {
		$.RQU = $.UQj.value;
		$.YSB = setInterval(function() {
			if ($.RQU != $.UQj.value) {
				$.LjV();
				$.RQU = $.UQj.value;
				if ($.UQj.value == "" && $.value != "") {
					$[NHk2]("");
					$.Lo2()
				}
			}
		},
		10)
	};
	this.UQj.onblur = function() {
		clearInterval($.YSB);
		if (!$.isShowPopup()) if ($.RQU != $.UQj.value) if ($.UQj.value == "" && $.value != "") {
			$[NHk2]("");
			$.Lo2()
		}
	};
	this._buttonEl.style.display = "none"
};
HX_P(Z7W, AcB_, {
	url: "",
	allowInput: true,
	delay: 250,
	_buttonWidth: 0,
	uiCls: "zmj-autocomplete",
	setUrl: function($) {
		this.url = $
	},
	setValue: function($) {
		if (this.value != $) {
			this.value = $;
			this.SA3.value = this.value
		}
	},
	setText: function($) {
		if (this.text != $) {
			this.text = $;
			this.RQU = $
		}
		this.UQj.value = this.text
	},
	popupLoadingText: "<span class='zmj-textboxlist-popup-loading'>Loading...</span>",
	popupErrorText: "<span class='zmj-textboxlist-popup-error'>Error</span>",
	popupEmptyText: "<span class='zmj-textboxlist-popup-noresult'>No Result</span>",
	showPopup: function($) {
		var _ = this.getPopup(),
		A = this.MCac;
		A[P9A_] = true;
		A[$RmY] = this.popupEmptyText;
		if ($ == "loading") {
			A[$RmY] = this.popupLoadingText;
			this.MCac[Uj]([])
		} else if ($ == "error") {
			A[$RmY] = this.popupLoadingText;
			this.MCac[Uj]([])
		}
		this.MCac[J_w]();
		Z7W[CPy][Dh][KQk](this)
	},
	Ln1: function(C) {
		this.fire("keydown", {
			htmlEvent: C
		});
		if (C.keyCode == 8 && (this[BUK]() || this.allowInput == false)) return false;
		if (C.keyCode == 9) {
			this[$SI]();
			return
		}
		switch (C.keyCode) {
		case 27:
			if (this.isShowPopup()) C.stopPropagation();
			this[$SI]();
			break;
		case 13:
			if (this.isShowPopup()) {
				C.preventDefault();
				C.stopPropagation();
				var _ = this.MCac.getFocusedIndex();
				if (_ != -1) {
					var $ = this.MCac.getAt(_),
					B = this.MCac.Ss0([$]),
					A = B[0];
					this[NHk2](A);
					this[Vh](B[1]);
					this.Lo2();
					this[$SI]()
				}
			} else this.fire("enter");
			break;
		case 37:
			break;
		case 38:
			_ = this.MCac.getFocusedIndex();
			if (_ == -1) {
				_ = 0;
				if (!this[R0PE]) {
					$ = this.MCac.findItems(this.value)[0];
					if ($) _ = this.MCac.indexOf($)
				}
			}
			if (this.isShowPopup()) if (!this[R0PE]) {
				_ -= 1;
				if (_ < 0) _ = 0;
				this.MCac.Fsh(_, true)
			}
			break;
		case 39:
			break;
		case 40:
			_ = this.MCac.getFocusedIndex();
			if (this.isShowPopup()) {
				if (!this[R0PE]) {
					_ += 1;
					if (_ > this.MCac.getCount() - 1) _ = this.MCac.getCount() - 1;
					this.MCac.Fsh(_, true)
				}
			} else this.LjV(this.UQj.value);
			break;
		default:
			this.LjV(this.UQj.value);
			break
		}
	},
	LjV: function(_) {
		var $ = this;
		if (this._queryTimer) {
			clearTimeout(this._queryTimer);
			this._queryTimer = null
		}
		this._queryTimer = setTimeout(function() {
			var _ = $.UQj.value;
			$.Uh5j(_)
		},
		this.delay);
		this[Dh]("loading")
	},
	Uh5j: function($) {
		if (!this.url) return;
		if (this.CqP) this.CqP.abort();
		var _ = this;
		this.CqP = jQuery.ajax({
			url: this.url,
			data: {
				key: $
			},
			async: true,
			cache: false,
			dataType: "text",
			success: function($) {
				try {
					var A = zmj.decode($)
				} catch(B) {
					throw new Error("autocomplete json is error")
				}
				_.MCac[Uj](A);
				_[Dh]();
				_.MCac.Fsh(0, true);
				_.fire("load")
			},
			error: function($, B, A) {
				_[Dh]("error")
			}
		})
	},
	getAttrs: function($) {
		var A = Z7W[CPy][YIb][KQk](this, $),
		_ = jQuery($);
		return A
	}
});
Cmk(Z7W, "autocomplete");
zmj.Form = function($) {
	this.el = $iw($);
	if (!this.el) throw new Error("form element not null");
	zmj.Form[CPy][CLu][KQk](this)
};
HX_P(zmj.Form, Ltw2, {
	el: null,
	getFields: function() {
		if (!this.el) return [];
		var $ = zmj.findControls(function($) {
			if (!$.el || $.formField != true) return false;
			if (EjQz(this.el, $.el)) return true;
			return false
		},
		this);
		return $
	},
	getFieldsMap: function() {
		var B = this.getFields(),
		A = {};
		for (var $ = 0, C = B.length; $ < C; $++) {
			var _ = B[$];
			if (_.name) A[_.name] = _
		}
		return A
	},
	getField: function($) {
		if (!this.el) return null;
		return zmj.getbyName($, this.el)
	},
	getData: function(B) {
		var A = B ? "getFormValue": "getValue",
		$ = this.getFields(),
		D = {};
		for (var _ = 0, E = $.length; _ < E; _++) {
			var C = $[_],
			F = C[A];
			if (!F) continue;
			if (C.name) D[C.name] = F[KQk](C);
			if (C.textName && C.getText) D[C.textName] = C.getText()
		}
		return D
	},
	setData: function(E, A) {
		if (typeof E != "object") E = {};
		var B = this.getFieldsMap();
		for (var C in B) {
			var _ = B[C];
			if (!_) continue;
			if (_[NHk2]) {
				var D = E[C];
				if (D === undefined && A === false) continue;
				if (D === null) D = "";
				_[NHk2](D)
			}
			if (_[Vh] && _.textName) {
				var $ = E[_.textName] || "";
				_[Vh]($)
			}
		}
	},
	reset: function() {
		var $ = this.getFields();
		for (var _ = 0, B = $.length; _ < B; _++) {
			var A = $[_];
			if (!A[NHk2]) continue;
			A[NHk2](A[Oau])
		}
		this.setIsValid(true)
	},
	clear: function() {
		var $ = this.getFields();
		for (var _ = 0, B = $.length; _ < B; _++) {
			var A = $[_];
			if (!A[NHk2]) continue;
			A[NHk2]("");
			if (A[Vh]) A[Vh]("")
		}
		this.setIsValid(true)
	},
	validate: function(C) {
		var $ = this.getFields();
		for (var _ = 0, D = $.length; _ < D; _++) {
			var A = $[_];
			if (!A[WRj0]) continue;
			var B = A[WRj0]();
			if (B == false && C === false) break
		}
		return this.isValid()
	},
	setIsValid: function(B) {
		var $ = this.getFields();
		for (var _ = 0, C = $.length; _ < C; _++) {
			var A = $[_];
			if (!A.setIsValid) continue;
			A.setIsValid(B)
		}
	},
	isValid: function() {
		var $ = this.getFields();
		for (var _ = 0, B = $.length; _ < B; _++) {
			var A = $[_];
			if (!A.isValid) continue;
			if (A.isValid() == false) return false
		}
		return true
	},
	getErrorTexts: function() {
		var A = [],
		_ = this.getErrors();
		for (var $ = 0, C = _.length; $ < C; $++) {
			var B = _[$];
			A.push(B.errorText)
		}
		return A
	},
	getErrors: function() {
		var A = [],
		$ = this.getFields();
		for (var _ = 0, C = $.length; _ < C; _++) {
			var B = $[_];
			if (!B.isValid) continue;
			if (B.isValid() == false) A.push(B)
		}
		return A
	},
	mask: function($) {
		if (typeof $ == "string") $ = {
			html: $
		};
		$ = $ || {};
		$.el = this.el;
		if (!$.cls) $.cls = this.GRA;
		zmj.mask($)
	},
	unmask: function() {
		zmj.unmask(this.el)
	},
	GRA: "zmj-mask-loading",
	loadingMsg: "\u6570\u636e\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e...",
	loading: function($) {
		this.mask($ || this.loadingMsg)
	},
	C9Bc: function($) {
		this._changed = true
	},
	_changed: false,
	setChanged: function(A) {
		this._changed = A;
		var $ = form.getFields();
		for (var _ = 0, C = $.length; _ < C; _++) {
			var B = $[_];
			B.on("valuechanged", this.C9Bc, this)
		}
	},
	isChanged: function() {
		return this._changed
	},
	setEnabled: function(A) {
		var $ = form.getFields();
		for (var _ = 0, C = $.length; _ < C; _++) {
			var B = $[_];
			B.setEnabled(A)
		}
	}
});
M8j = function() {
	M8j[CPy][CLu][KQk](this)
};
HX_P(M8j, ET, {
	style: "",
	_clearBorder: false,
	uiCls: "zmj-fit",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-fit";
		this.VC5 = this.el
	},
	_initEvents: function() {},
	isFixedSize: function() {
		return false
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		var $ = this.el.parentNode,
		_ = zmj[P8pq]($);
		if ($ == document.body) this.el.style.height = "0px";
		var F = $L7($, true);
		for (var E = 0, D = _.length; E < D; E++) {
			var C = _[E];
			if (C == this.el) continue;
			var G = Ps6(C, "position");
			if (G == "absolute" || G == "fixed") continue;
			var A = $L7(C),
			I = Jfu(C);
			F = F - A - I.top - I.bottom
		}
		var H = WN(this.el),
		B = UwK(this.el),
		I = Jfu(this.el);
		F = F - I.top - I.bottom;
		if (jQuery.boxModel) F = F - B.top - B.bottom - H.top - H.bottom;
		if (F < 0) F = 0;
		this.el.style.height = F + "px";
		try {
			_ = zmj[P8pq](this.el);
			for (E = 0, D = _.length; E < D; E++) {
				C = _[E];
				zmj.layout(C)
			}
		} catch(J) {}
	},
	set_bodyParent: function($) {
		if (!$) return;
		var _ = this.VC5,
		A = $;
		while (A.firstChild) {
			try {
				_.appendChild(A.firstChild)
			} catch(B) {}
		}
		this[X5Q]()
	},
	getAttrs: function($) {
		var _ = M8j[CPy][YIb][KQk](this, $);
		_._bodyParent = $;
		return _
	}
});
Cmk(M8j, "fit");
EyZ = function() {
	this.$cg();
	EyZ[CPy][CLu][KQk](this);
	if (this.url) this.setUrl(this.url)
};
HX_P(EyZ, ET, {
	width: 250,
	title: "",
	iconCls: "",
	iconStyle: "",
	url: "",
	refreshOnExpand: false,
	maskOnLoad: true,
	showCollapseButton: false,
	showCloseButton: false,
	closeAction: "display",
	showHeader: true,
	showToolbar: false,
	showFooter: false,
	headerCls: "",
	headerStyle: "",
	bodyCls: "",
	bodyStyle: "",
	footerCls: "",
	footerStyle: "",
	toolbarCls: "",
	toolbarStyle: "",
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = this.YA6;
		this.YA6 = false;
		var C = A.toolbar;
		delete A.toolbar;
		var _ = A.footer;
		delete A.footer;
		var B = A.url;
		delete A.url;
		EyZ[CPy].set[KQk](this, A);
		if (C) this.setToolbar(C);
		if (_) this.setFooter(_);
		if (B) this.setUrl(B);
		this.YA6 = $;
		this[X5Q]();
		return this
	},
	uiCls: "zmj-panel",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-panel";
		var _ = "<div class=\"zmj-panel-border\">" + "<div class=\"zmj-panel-header\" ><div class=\"zmj-panel-header-inner\" ><span class=\"zmj-panel-icon\"></span><div class=\"zmj-panel-title\" ></div><div class=\"zmj-tools\" ></div></div></div>" + "<div class=\"zmj-panel-viewport\">" + "<div class=\"zmj-panel-toolbar\"></div>" + "<div class=\"zmj-panel-body\" ></div>" + "<div class=\"zmj-panel-footer\"></div>" + "<div class=\"zmj-panel-resizeGrid\"></div>" + "</div>" + "</div>";
		this.el.innerHTML = _;
		this.AE = this.el.firstChild;
		this.Kz = this.AE.firstChild;
		this.LS = this.AE.lastChild;
		this.MOX = zmj.byClass("zmj-panel-toolbar", this.el);
		this.VC5 = zmj.byClass("zmj-panel-body", this.el);
		this.MbK = zmj.byClass("zmj-panel-footer", this.el);
		this.W_ = zmj.byClass("zmj-panel-resizeGrid", this.el);
		var $ = zmj.byClass("zmj-panel-header-inner", this.el);
		this.CR4 = zmj.byClass("zmj-panel-icon", this.el);
		this.CTWj = zmj.byClass("zmj-panel-title", this.el);
		this.MZ$ = zmj.byClass("zmj-tools", this.el);
		DTHl(this.VC5, this.bodyStyle);
		this[J_w]()
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(this.el, "click", this.PSN, this)
		},
		this)
	},
	doUpdate: function() {
		this.CTWj.innerHTML = this.title;
		this.CR4.style.display = (this.iconCls || this[Sz]) ? "inline": "none";
		this.CR4.className = "zmj-panel-icon " + this.iconCls;
		DTHl(this.CR4, this[Sz]);
		this.Kz.style.display = this.showHeader ? "": "none";
		this.MOX.style.display = this[WE7O] ? "": "none";
		this.MbK.style.display = this[EzY] ? "": "none";
		var A = "";
		for (var $ = this.buttons.length - 1; $ >= 0; $--) {
			var _ = this.buttons[$];
			A += "<span id=\"" + $ + "\" class=\"" + _.cls + " " + (_.enabled ? "": "zmj-disabled") + "\" style=\"" + _.style + ";" + (_.visible ? "": "display:none;") + "\"></span>"
		}
		this.MZ$.innerHTML = A;
		this[X5Q]()
	},
	count: 1,
	doLayout: function() {
		if (!this.canLayout()) return;
		this.W_.style.display = this[URW] ? "": "none";
		this.VC5.style.height = "";
		this.VC5.style.width = "";
		this.Kz.style.width = "";
		this.LS.style.width = "";
		var F = this[Uw](),
		C = this[Wc](),
		_ = UwK(this.VC5),
		G = WN(this.VC5),
		J = Jfu(this.VC5),
		$ = this[BMK](true),
		E = $;
		$ = $ - J.left - J.right;
		if (jQuery.boxModel) $ = $ - _.left - _.right - G.left - G.right;
		if ($ < 0) $ = 0;
		this.VC5.style.width = $ + "px";
		$ = E;
		this.Kz.style.width = $ + "px";
		this.MOX.style.width = $ + "px";
		this.MbK.style.width = "auto";
		if (!F) {
			var I = WN(this.AE),
			A = this[KjJg](true),
			B = this.showHeader ? jQuery(this.Kz).outerHeight() : 0,
			D = this[WE7O] ? jQuery(this.MOX).outerHeight() : 0,
			H = this[EzY] ? jQuery(this.MbK).outerHeight() : 0;
			this.LS.style.height = (A - B) + "px";
			A = A - B - D - H;
			if (jQuery.boxModel) A = A - _.top - _.bottom - G.top - G.bottom;
			A = A - J.top - J.bottom;
			if (A < 0) A = 0;
			this.VC5.style.height = A + "px"
		}
		zmj.layout(this.AE)
	},
	setHeaderStyle: function($) {
		this.headerStyle = $;
		DTHl(this.Kz, $);
		this[X5Q]()
	},
	getHeaderStyle: function() {
		return this.headerStyle
	},
	setBodyStyle: function($) {
		this.bodyStyle = $;
		DTHl(this.VC5, $);
		this[X5Q]()
	},
	getBodyStyle: function() {
		return this.bodyStyle
	},
	setToolbarStyle: function($) {
		this.toolbarStyle = $;
		DTHl(this.MOX, $);
		this[X5Q]()
	},
	getToolbarStyle: function() {
		return this.toolbarStyle
	},
	setFooterStyle: function($) {
		this.footerStyle = $;
		DTHl(this.MbK, $);
		this[X5Q]()
	},
	getFooterStyle: function() {
		return this.footerStyle
	},
	setHeaderCls: function($) {
		jQuery(this.Kz)[MLy](this.headerCls);
		jQuery(this.Kz)[HJ]($);
		this.headerCls = $;
		this[X5Q]()
	},
	getHeaderCls: function() {
		return this.headerCls
	},
	setBodyCls: function($) {
		jQuery(this.VC5)[MLy](this.bodyCls);
		jQuery(this.VC5)[HJ]($);
		this.bodyCls = $;
		this[X5Q]()
	},
	getBodyCls: function() {
		return this.bodyCls
	},
	setToolbarCls: function($) {
		jQuery(this.MOX)[MLy](this.toolbarCls);
		jQuery(this.MOX)[HJ]($);
		this.toolbarCls = $;
		this[X5Q]()
	},
	getToolbarCls: function() {
		return this.toolbarCls
	},
	setFooterCls: function($) {
		jQuery(this.MbK)[MLy](this.footerCls);
		jQuery(this.MbK)[HJ]($);
		this.footerCls = $;
		this[X5Q]()
	},
	getFooterCls: function() {
		return this.footerCls
	},
	setTitle: function($) {
		this.title = $;
		this[J_w]()
	},
	getTitle: function() {
		return this.title
	},
	setIconCls: function($) {
		this.iconCls = $;
		this[J_w]()
	},
	getIconCls: function() {
		return this.iconCls
	},
	setShowCloseButton: function($) {
		this[DgkX] = $;
		var _ = this.getButton("close");
		_.visible = $;
		if (_) this[J_w]()
	},
	getShowCloseButton: function() {
		return this[DgkX]
	},
	setCloseAction: function($) {
		this[VO7y] = $
	},
	getCloseAction: function() {
		return this[VO7y]
	},
	setShowCollapseButton: function($) {
		this[Nb9] = $;
		var _ = this.getButton("collapse");
		_.visible = $;
		if (_) this[J_w]()
	},
	getShowCollapseButton: function() {
		return this[Nb9]
	},
	setShowHeader: function($) {
		this.showHeader = $;
		this[J_w]()
	},
	getShowHeader: function() {
		return this.showHeader
	},
	setShowToolbar: function($) {
		this[WE7O] = $;
		this[J_w]()
	},
	getShowToolbar: function() {
		return this[WE7O]
	},
	setShowFooter: function($) {
		this[EzY] = $;
		this[J_w]()
	},
	getShowFooter: function() {
		return this[EzY]
	},
	PSN: function(A) {
		var $ = J6j(A.target, "zmj-tools");
		if ($) {
			var _ = this.getButton(parseInt(A.target.id));
			if (_) this.QG3(_, A)
		}
	},
	QG3: function(B, $) {
		var C = {
			button: B,
			index: this.buttons.indexOf(B),
			name: B.name.toLowerCase(),
			htmlEvent: $,
			cancel: false
		};
		this.fire("beforebuttonclick", C);
		try {
			if (C.name == "close" && this[VO7y] == "destroy" && this.Bz && this.Bz.contentWindow) {
				var _ = true;
				if (this.Bz.contentWindow.CloseWindow) _ = this.Bz.contentWindow.CloseWindow("close");
				else if (this.Bz.contentWindow.CloseOwnerWindow) _ = this.Bz.contentWindow.CloseOwnerWindow("close");
				if (_ === false) C.cancel = true
			}
		} catch(A) {}
		if (C.cancel == true) return C;
		this.fire("buttonclick", C);
		if (C.name == "close") if (this[VO7y] == "destroy") {
			this.__HideAction = "close";
			this[Wsj]()
		} else this.hide();
		if (C.name == "collapse") {
			this.toggle();
			if (this[Q5] && this.expanded && this.url) this.reload()
		}
		return C
	},
	onButtonClick: function(_, $) {
		this.on("buttonclick", _, $)
	},
	$cg: function() {
		this.buttons = [];
		var _ = this.createButton({
			name: "close",
			cls: "zmj-tools-close",
			visible: this[DgkX]
		});
		this.buttons.push(_);
		var $ = this.createButton({
			name: "collapse",
			cls: "zmj-tools-collapse",
			visible: this[Nb9]
		});
		this.buttons.push($)
	},
	createButton: function(_) {
		var $ = zmj.copyTo({
			name: "",
			cls: "",
			style: "",
			visible: true,
			enabled: true,
			html: ""
		},
		_);
		return $
	},
	addButton: function(_, $) {
		if (typeof _ == "string") _ = {
			iconCls: _
		};
		_ = this.createButton(_);
		if (typeof $ != "number") $ = this.buttons.length;
		this.buttons.insert($, _);
		this[J_w]()
	},
	updateButton: function($, A) {
		var _ = this.getButton($);
		if (!_) return;
		zmj.copyTo(_, A);
		this[J_w]()
	},
	removeButton: function($) {
		var _ = this.getButton($);
		if (!_) return;
		this.buttons.remove(_);
		this[J_w]()
	},
	getButton: function($) {
		if (typeof $ == "number") return this.buttons[$];
		else for (var _ = 0, A = this.buttons.length; _ < A; _++) {
			var B = this.buttons[_];
			if (B.name == $) return B
		}
	},
	destroy: function($) {
		this.Vef();
		this.Bz = null;
		this.MOX = null;
		this.VC5 = null;
		this.MbK = null;
		EyZ[CPy][Wsj][KQk](this, $)
	},
	setBody: function(_) {
		if (!_) return;
		if (!zmj.isArray(_)) _ = [_];
		for (var $ = 0, A = _.length; $ < A; $++) {
			var B = _[$];
			zmj.append(this.VC5, B)
		}
		zmj.parse(this.VC5);
		this[X5Q]()
	},
	set_bodyParent: function($) {},
	setToolbar: function(_) {
		if (!_) return;
		if (!zmj.isArray(_)) _ = [_];
		for (var $ = 0, A = _.length; $ < A; $++) zmj.append(this.MOX, _[$]);
		zmj.parse(this.MOX);
		this[X5Q]()
	},
	setFooter: function(_) {
		if (!_) return;
		if (!zmj.isArray(_)) _ = [_];
		for (var $ = 0, A = _.length; $ < A; $++) zmj.append(this.MbK, _[$]);
		zmj.parse(this.MbK);
		this[X5Q]()
	},
	getHeaderEl: function() {
		return this.Kz
	},
	getToolbarEl: function() {
		return this.MOX
	},
	getBodyEl: function() {
		return this.VC5
	},
	getFooterEl: function() {
		return this.MbK
	},
	getIFrameEl: function($) {
		return this.Bz
	},
	Nv: function() {
		return this.VC5
	},
	Vef: function($) {
		if (this.Bz) {
			var _ = this.Bz;
			_.src = "";
			if (_._ondestroy) _._ondestroy();
			try {
				this.Bz.parentNode.removeChild(this.Bz);
				this.Bz[Vj](true)
			} catch(A) {}
		}
		this.Bz = null;
		try {
			CollectGarbage()
		} catch(B) {}
		if ($ === true) zmj.removeChilds(this.VC5)
	},
	Bd: 80,
	Vu: function() {
		this.Vef(true);
		var A = new Date(),
		$ = this;
		this.loadedUrl = this.url;
		if (this.maskOnLoad) this.loading();
		var _ = zmj.createIFrame(this.url,
		function(_, C) {
			var B = (A - new Date()) + $.Bd;
			if (B < 0) B = 0;
			setTimeout(function() {
				$.unmask()
			},
			B);
			try {
				$.Bz.contentWindow.Owner = $.Owner;
				$.Bz.contentWindow.CloseOwnerWindow = function(_) {
					$.__HideAction = _;
					var A = true;
					if ($.__onDestroy) A = $.__onDestroy(_);
					if (A === false) return false;
					var B = {
						iframe: $.Bz,
						action: _
					};
					$.fire("unload", B);
					setTimeout(function() {
						$[Wsj]()
					},
					10)
				}
			} catch(D) {}
			if (C) {
				if ($.__onLoad) $.__onLoad();
				var D = {
					iframe: $.Bz
				};
				$.fire("load", D)
			}
		});
		this.VC5.appendChild(_);
		this.Bz = _
	},
	load: function(_, $, A) {
		this.setUrl(_, $, A)
	},
	reload: function() {
		this.setUrl(this.url)
	},
	setUrl: function($, _, A) {
		this.url = $;
		this.__onLoad = _;
		this.__onDestroy = A;
		if (this.expanded) this.Vu()
	},
	getUrl: function() {
		return this.url
	},
	setRefreshOnExpand: function($) {
		this[Q5] = $
	},
	getRefreshOnExpand: function() {
		return this[Q5]
	},
	setMaskOnLoad: function($) {
		this.maskOnLoad = $
	},
	getMaskOnLoad: function($) {
		return this.maskOnLoad
	},
	expanded: true,
	setExpanded: function($) {
		if (this.expanded != $) {
			this.expanded = $;
			if (this.expanded) this.expand();
			else this.collapse()
		}
	},
	toggle: function() {
		if (this.expanded) this.collapse();
		else this.expand()
	},
	collapse: function() {
		this.expanded = false;
		this._height = this.el.style.height;
		this.el.style.height = "auto";
		this.LS.style.display = "none";
		_I(this.el, "zmj-panel-collapse");
		this[X5Q]()
	},
	expand: function() {
		this.expanded = true;
		this.el.style.height = this._height;
		this.LS.style.display = "block";
		delete this._height;
		Kw(this.el, "zmj-panel-collapse");
		if (this.url && this.url != this.loadedUrl) this.Vu();
		this[X5Q]()
	},
	getAttrs: function(_) {
		var D = EyZ[CPy][YIb][KQk](this, _);
		zmj[W5cB](_, D, ["title", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle", "footerCls", "footerStyle", "toolbarCls", "toolbarStyle", "footer", "toolbar", "url", "closeAction", "loadingMsg", "beforebuttonclick", "buttonclick", "load"]);
		zmj[D4q](_, D, ["allowResize", "showCloseButton", "showHeader", "showToolbar", "showFooter", "showCollapseButton", "refreshOnExpand", "maskOnLoad", "expanded"]);
		var C = zmj[P8pq](_, true);
		for (var $ = C.length - 1; $ >= 0; $--) {
			var B = C[$],
			A = jQuery(B).attr("property");
			if (!A) continue;
			A = A.toLowerCase();
			if (A == "toolbar") D.toolbar = B;
			else if (A == "footer") D.footer = B
		}
		D.body = C;
		return D
	}
});
Cmk(EyZ, "panel");
SBwo = function() {
	SBwo[CPy][CLu][KQk](this);
	this[B1z]("zmj-window");
	this[FJhD](false);
	this.setAllowDrag(this.allowDrag);
	this.setAllowResize(this[URW])
};
HX_P(SBwo, EyZ, {
	x: 0,
	y: 0,
	state: "restore",
	F5: "zmj-window-drag",
	MCN: "zmj-window-resize",
	allowDrag: true,
	allowResize: false,
	showCloseButton: true,
	showMaxButton: false,
	showMinButton: false,
	showCollapseButton: false,
	showModal: true,
	minWidth: 150,
	minHeight: 80,
	maxWidth: 2000,
	maxHeight: 2000,
	uiCls: "zmj-window",
	_create: function() {
		SBwo[CPy][QjIH][KQk](this)
	},
	$cg: function() {
		this.buttons = [];
		var A = this.createButton({
			name: "close",
			cls: "zmj-tools-close",
			visible: this[DgkX]
		});
		this.buttons.push(A);
		var B = this.createButton({
			name: "max",
			cls: "zmj-tools-max",
			visible: this[Z2s]
		});
		this.buttons.push(B);
		var _ = this.createButton({
			name: "min",
			cls: "zmj-tools-min",
			visible: this[KomI]
		});
		this.buttons.push(_);
		var $ = this.createButton({
			name: "collapse",
			cls: "zmj-tools-collapse",
			visible: this[Nb9]
		});
		this.buttons.push($)
	},
	_initEvents: function() {
		SBwo[CPy][GX][KQk](this);
		TQ(function() {
			WoBw(this.el, "mouseover", this.J6I, this);
			WoBw(window, "resize", this.DE, this);
			WoBw(this.el, "mousedown", this.KRq, this)
		},
		this)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		if (this.state == "max") {
			var $ = this.getParentBox();
			this.el.style.left = "0px";
			this.el.style.top = "0px";
			zmj.setSize(this.el, $.width, $.height)
		}
		SBwo[CPy][X5Q][KQk](this);
		if (this.allowDrag) _I(this.el, this.F5);
		if (this.state == "max") {
			this.W_.style.display = "none";
			Kw(this.el, this.F5)
		}
		this.Y9Ee()
	},
	Y9Ee: function() {
		var A = this[Lrs] && this[F9lZ]();
		if (!this.Qlq) this.Qlq = zmj.append(document.body, "<div class=\"zmj-modal\" style=\"display:none\"></div>");
		function $() {
			zmj[USz](document.body);
			var $ = document.documentElement,
			B = parseInt(Math.max(document.body.scrollWidth, $ ? $.scrollWidth: 0)),
			E = parseInt(Math.max(document.body.scrollHeight, $ ? $.scrollHeight: 0)),
			D = zmj.getViewportBox(),
			C = D.height;
			if (C < E) C = E;
			var _ = D.width;
			if (_ < B) _ = B;
			this.Qlq.style.display = A ? "block": "none";
			this.Qlq.style.height = C + "px";
			this.Qlq.style.width = _ + "px";
			this.Qlq.style.zIndex = Ps6(this.el, "zIndex") - 1
		}
		if (A) {
			var _ = this;
			setTimeout(function() {
				_.Qlq.style.display = "none";
				$[KQk](_)
			},
			1)
		} else this.Qlq.style.display = "none"
	},
	getParentBox: function() {
		var $ = zmj.getViewportBox(),
		_ = this.Qg84 || document.body;
		if (_ != document.body) $ = Vhwd(_);
		return $
	},
	setShowModal: function($) {
		this[Lrs] = $
	},
	getShowModal: function() {
		return this[Lrs]
	},
	setMinWidth: function($) {
		if (isNaN($)) return;
		this.minWidth = $
	},
	getMinWidth: function() {
		return this.minWidth
	},
	setMinHeight: function($) {
		if (isNaN($)) return;
		this.minHeight = $
	},
	getMinHeight: function() {
		return this.minHeight
	},
	setMaxWidth: function($) {
		if (isNaN($)) return;
		this.maxWidth = $
	},
	getMaxWidth: function() {
		return this.maxWidth
	},
	setMaxHeight: function($) {
		if (isNaN($)) return;
		this.maxHeight = $
	},
	getMaxHeight: function() {
		return this.maxHeight
	},
	setAllowDrag: function($) {
		this.allowDrag = $;
		Kw(this.el, this.F5);
		if ($) _I(this.el, this.F5)
	},
	getAllowDrag: function() {
		return this.allowDrag
	},
	setAllowResize: function($) {
		if (this[URW] != $) {
			this[URW] = $;
			this[X5Q]()
		}
	},
	getAllowResize: function() {
		return this[URW]
	},
	setShowMaxButton: function($) {
		this[Z2s] = $;
		var _ = this.getButton("max");
		_.visible = $;
		if (_) this[J_w]()
	},
	getShowMaxButton: function() {
		return this[Z2s]
	},
	setShowMinButton: function($) {
		this[KomI] = $;
		var _ = this.getButton("min");
		_.visible = $;
		if (_) this[J_w]()
	},
	getShowMinButton: function() {
		return this[KomI]
	},
	max: function() {
		this.state = "max";
		this.show();
		var $ = this.getButton("max");
		if ($) {
			$.cls = "zmj-tools-restore";
			this[J_w]()
		}
	},
	restore: function() {
		this.state = "restore";
		this.show(this.x, this.y);
		var $ = this.getButton("max");
		if ($) {
			$.cls = "zmj-tools-max";
			this[J_w]()
		}
	},
	containerEl: null,
	show: function(B, _) {
		this.YA6 = false;
		var A = this.Qg84 || document.body;
		if (!this.isRender() || this.el.parentNode != A) this[_B9](A);
		this.el.style.zIndex = zmj.getMaxZIndex();
		this._8(B, _);
		this.YA6 = true;
		this[FJhD](true);
		if (this.state != "max") {
			var $ = Vhwd(this.el);
			this.x = $.x;
			this.y = $.y
		}
		try {
			this.el.focus()
		} catch(C) {}
	},
	hide: function() {
		this[FJhD](false);
		this.Y9Ee()
	},
	Tpt9: function() {
		this.el.style.display = "";
		var $ = Vhwd(this.el);
		if ($.width > this.maxWidth) {
			WE(this.el, this.maxWidth);
			$ = Vhwd(this.el)
		}
		if ($.height > this.maxHeight) {
			ZIA(this.el, this.maxHeight);
			$ = Vhwd(this.el)
		}
		if ($.width < this.minWidth) {
			WE(this.el, this.minWidth);
			$ = Vhwd(this.el)
		}
		if ($.height < this.minHeight) {
			ZIA(this.el, this.minHeight);
			$ = Vhwd(this.el)
		}
	},
	_8: function(B, A) {
		var _ = this.getParentBox();
		if (this.state == "max") {
			if (!this._width) {
				var $ = Vhwd(this.el);
				this._width = $.width;
				this._height = $.height;
				this.x = $.x;
				this.y = $.y
			}
		} else {
			if (zmj.isNull(B)) B = "center";
			if (zmj.isNull(A)) A = "middle";
			this.el.style.position = "absolute";
			this.el.style.left = "-2000px";
			this.el.style.top = "-2000px";
			this.el.style.display = "";
			if (this._width) {
				this[GaK6](this._width);
				this[BrQ](this._height)
			}
			this.Tpt9();
			$ = Vhwd(this.el);
			if (B == "left") B = 0;
			if (B == "center") B = _.width / 2 - $.width / 2;
			if (B == "right") B = _.width - $.width;
			if (A == "top") A = 0;
			if (A == "middle") A = _.y + _.height / 2 - $.height / 2;
			if (A == "bottom") A = _.height - $.height;
			if (B + $.width > _.right) B = _.right - $.width;
			if (A + $.height > _.bottom) A = _.bottom - $.height;
			if (B < 0) B = 0;
			if (A < 0) A = 0;
			this.el.style.display = "";
			zmj.setX(this.el, B);
			zmj.setY(this.el, A);
			this.el.style.left = B + "px";
			this.el.style.top = A + "px"
		}
		this[X5Q]()
	},
	QG3: function(_, $) {
		var A = SBwo[CPy].QG3[KQk](this, _, $);
		if (A.cancel == true) return A;
		if (A.name == "max") if (this.state == "max") this.restore();
		else this.max();
		return A
	},
	DE: function($) {
		if (this.state == "max") this[X5Q]();
		if (!zmj.isIE6) this.Y9Ee()
	},
	KRq: function(B) {
		var _ = this;
		if (this.state != "max" && this.allowDrag && EjQz(this.Kz, B.target) && !J6j(B.target, "zmj-tools")) {
			var _ = this,
			A = this.getBox(),
			$ = new zmj.Drag({
				capture: false,
				onStart: function() {
					_.IpNz = zmj.append(document.body, "<div class=\"zmj-resizer-mask\"></div>");
					_.TsGm = zmj.append(document.body, "<div class=\"zmj-drag-proxy\"></div>")
				},
				onMove: function(B) {
					var F = B.now[0] - B.init[0],
					E = B.now[1] - B.init[1];
					F = A.x + F;
					E = A.y + E;
					var D = _.getParentBox(),
					$ = F + A.width,
					C = E + A.height;
					if ($ > D.width) F = D.width - A.width;
					if (F < 0) F = 0;
					if (E < 0) E = 0;
					_.x = F;
					_.y = E;
					var G = {
						x: F,
						y: E,
						width: A.width,
						height: A.height
					};
					YcA(_.TsGm, G)
				},
				onStop: function() {
					var $ = Vhwd(_.TsGm);
					YcA(_.el, $);
					jQuery(_.IpNz).remove();
					_.IpNz = null;
					jQuery(_.TsGm).remove();
					_.TsGm = null
				}
			});
			$.start(B)
		}
		if (EjQz(this.W_, B.target) && this[URW]) {
			$ = this.A5();
			$.start(B)
		}
	},
	A5: function() {
		if (!this._resizeDragger) this._resizeDragger = new zmj.Drag({
			capture: true,
			onStart: zmj.createDelegate(this.J$c, this),
			onMove: zmj.createDelegate(this.Xuhi, this),
			onStop: zmj.createDelegate(this.GVij, this)
		});
		return this._resizeDragger
	},
	J$c: function($) {
		this.proxy = zmj.append(document.body, "<div class=\"zmj-windiw-resizeProxy\"></div>");
		this.proxy.style.cursor = "se-resize";
		this.elBox = Vhwd(this.el);
		YcA(this.proxy, this.elBox)
	},
	Xuhi: function(A) {
		var C = A.now[0] - A.init[0],
		$ = A.now[1] - A.init[1],
		_ = this.elBox.width + C,
		B = this.elBox.height + $;
		if (_ < this.minWidth) _ = this.minWidth;
		if (B < this.minHeight) B = this.minHeight;
		if (_ > this.maxWidth) _ = this.maxWidth;
		if (B > this.maxHeight) B = this.maxHeight;
		zmj.setSize(this.proxy, _, B)
	},
	GVij: function($) {
		var _ = Vhwd(this.proxy);
		jQuery(this.proxy).remove();
		this.proxy = null;
		this.elBox = null;
		this[GaK6](_.width);
		this[BrQ](_.height);
		delete this._width;
		delete this._height
	},
	destroy: function($) {
		Is(window, "resize", this.DE, this);
		if (this.Qlq) {
			jQuery(this.Qlq).remove();
			this.Qlq = null
		}
		if (this.shadowEl) {
			jQuery(this.shadowEl).remove();
			this.shadowEl = null
		}
		SBwo[CPy][Wsj][KQk](this, $)
	},
	getAttrs: function($) {
		var _ = SBwo[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["modalStyle"]);
		zmj[D4q]($, _, ["showModal", "showShadow", "allowDrag", "allowResize", "showMaxButton", "showMinButton"]);
		zmj[PI]($, _, ["minWidth", "minHeight", "maxWidth", "maxHeight"]);
		return _
	}
});
Cmk(SBwo, "window");
zmj.MessageBox = {
	alertTitle: "\u63d0\u9192",
	confirmTitle: "\u786e\u8ba4",
	prompTitle: "\u8f93\u5165",
	prompMessage: "\u8bf7\u8f93\u5165\u5185\u5bb9\uff1a",
	buttonText: {
		ok: "\u786e\u5b9a",
		cancel: "\u53d6\u6d88",
		yes: "\u662f",
		no: "\u5426"
	},
	show: function(F) {
		F = zmj.copyTo({
			width: "auto",
			height: "auto",
			showModal: true,
			minWidth: 150,
			maxWidth: 800,
			minHeight: 100,
			maxHeight: 350,
			title: "",
			titleIcon: "",
			iconCls: "",
			iconStyle: "",
			message: "",
			html: "",
			spaceStyle: "margin-right:15px",
			showCloseButton: true,
			buttons: null,
			buttonWidth: 55,
			callback: null
		},
		F);
		var I = F.callback,
		C = new SBwo();
		C.setBodyStyle("overflow:hidden");
		C.setShowModal(F[Lrs]);
		C.setTitle(F.title || "");
		C.setIconCls(F.titleIcon);
		C.setShowCloseButton(F[DgkX]);
		var J = C.uid + "$table",
		N = C.uid + "$content",
		L = "<div class=\"" + F.iconCls + "\" style=\"" + F[Sz] + "\"></div>",
		Q = "<table class=\"zmj-messagebox-table\" id=\"" + J + "\" style=\"\" cellspacing=\"0\" cellpadding=\"0\"><tr><td>" + L + "</td><td id=\"" + N + "\" style=\"text-align:center;padding:8px;padding-left:0;\">" + (F.message || "") + "</td></tr></table>",
		_ = "<div class=\"zmj-messagebox-content\"></div>" + "<div class=\"zmj-messagebox-buttons\"></div>";
		C.VC5.innerHTML = _;
		var M = C.VC5.firstChild;
		if (F.html) {
			if (typeof F.html == "string") M.innerHTML = F.html;
			else if (zmj.isElement(F.html)) M.appendChild(F.html)
		} else M.innerHTML = Q;
		C._Buttons = [];
		var P = C.VC5.lastChild;
		if (F.buttons && F.buttons.length > 0) {
			for (var H = 0, D = F.buttons.length; H < D; H++) {
				var E = F.buttons[H],
				K = zmj.MessageBox.buttonText[E],
				$ = new KiUK();
				$[Vh](K);
				$[GaK6](F.buttonWidth);
				$[_B9](P);
				$.action = E;
				$.on("click",
				function(_) {
					var $ = _.sender;
					if (I) I($.action);
					zmj.MessageBox.hide(C)
				});
				if (H != D - 1) $.setStyle(F.spaceStyle);
				C._Buttons.push($)
			}
		} else P.style.display = "none";
		C.setMinWidth(F.minWidth);
		C.setMinHeight(F.minHeight);
		C.setMaxWidth(F.maxWidth);
		C.setMaxHeight(F.maxHeight);
		C[GaK6](F.width);
		C[BrQ](F.height);
		C.show();
		var A = C[BMK]();
		C[GaK6](A);
		var B = document.getElementById(J);
		if (B) B.style.width = "100%";
		var G = document.getElementById(N);
		if (G) G.style.width = "100%";
		var O = C._Buttons[0];
		if (O) O.focus();
		else C.focus();
		C.on("beforebuttonclick",
		function($) {
			if (I) I("close");
			$.cancel = true;
			zmj.MessageBox.hide(C)
		});
		WoBw(C.el, "keydown",
		function($) {
			if ($.keyCode == 27) {
				if (I) I("close");
				$.cancel = true;
				zmj.MessageBox.hide(C)
			}
		});
		return C.uid
	},
	hide: function(C) {
		if (!C) return;
		var _ = typeof C == "object" ? C: zmj.getbyUID(C);
		if (!_) return;
		for (var $ = 0, A = _._Buttons.length; $ < A; $++) {
			var B = _._Buttons[$];
			B[Wsj]()
		}
		_._Buttons = null;
		_[Wsj]()
	},
	alert: function(A, _, $) {
		return zmj.MessageBox.show({
			minWidth: 250,
			title: _ || zmj.MessageBox.alertTitle,
			buttons: ["ok"],
			message: A,
			iconCls: "zmj-messagebox-warning",
			callback: $
		})
	},
	confirm: function(A, _, $) {
		return zmj.MessageBox.show({
			minWidth: 250,
			title: _ || zmj.MessageBox.confirmTitle,
			buttons: ["ok", "cancel"],
			message: A,
			iconCls: "zmj-messagebox-question",
			callback: $
		})
	},
	prompt: function(C, B, A, _) {
		var F = "prompt$" + new Date().getTime(),
		E = C || zmj.MessageBox.promptMessage;
		if (_) E = E + "<br/><textarea id=\"" + F + "\" style=\"width:200px;height:60px;margin-top:3px;\"></textarea>";
		else E = E + "<br/><input id=\"" + F + "\" type=\"text\" style=\"width:200px;margin-top:3px;\"/>";
		var D = zmj.MessageBox.show({
			title: B || zmj.MessageBox.promptTitle,
			buttons: ["ok", "cancel"],
			width: 250,
			html: "<div style=\"padding:5px;padding-left:10px;\">" + E + "</div>",
			callback: function(_) {
				var $ = document.getElementById(F);
				if (A) A(_, $.value)
			}
		}),
		$ = document.getElementById(F);
		$.focus();
		return D
	},
	loading: function(_, $) {
		return zmj.MessageBox.show({
			minHeight: 50,
			title: $,
			showCloseButton: false,
			message: _,
			iconCls: "zmj-messagebox-waiting"
		})
	}
};
zmj.alert = zmj.MessageBox.alert;
zmj.confirm = zmj.MessageBox.confirm;
zmj.prompt = zmj.MessageBox.prompt;
zmj.loading = zmj.MessageBox.loading;
zmj.showMessageBox = zmj.MessageBox.show;
zmj.hideMessageBox = zmj.MessageBox.hide;
SD = function() {
	this.Xihm();
	SD[CPy][CLu][KQk](this)
};
HX_P(SD, ET, {
	width: 300,
	height: 180,
	vertical: false,
	allowResize: true,
	pane1: null,
	pane2: null,
	showHandleButton: true,
	handlerStyle: "",
	handlerCls: "",
	handlerSize: 5,
	uiCls: "zmj-splitter",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-splitter";
		this.el.innerHTML = "<div class=\"zmj-splitter-border\"><div id=\"1\" class=\"zmj-splitter-pane zmj-splitter-pane1\"></div><div id=\"2\" class=\"zmj-splitter-pane zmj-splitter-pane2\"></div><div class=\"zmj-splitter-handler\"></div></div>";
		this.AE = this.el.firstChild;
		this.Qms = this.AE.firstChild;
		this.Ac5I = this.AE.childNodes[1];
		this.RP9E = this.AE.lastChild
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(this.el, "click", this.PSN, this);
			WoBw(this.el, "mousedown", this.P4, this)
		},
		this)
	},
	Xihm: function() {
		this.pane1 = {
			index: 1,
			minSize: 30,
			maxSize: 3000,
			size: "",
			showCollapseButton: false,
			cls: "",
			style: "",
			visible: true,
			expanded: true
		};
		this.pane2 = zmj.copyTo({},
		this.pane1);
		this.pane2.index = 2
	},
	doUpdate: function() {
		this[X5Q]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		this.RP9E.style.cursor = this[URW] ? "": "default";
		Kw(this.el, "zmj-splitter-vertical");
		if (this.vertical) _I(this.el, "zmj-splitter-vertical");
		Kw(this.Qms, "zmj-splitter-pane1-vertical");
		Kw(this.Ac5I, "zmj-splitter-pane2-vertical");
		if (this.vertical) {
			_I(this.Qms, "zmj-splitter-pane1-vertical");
			_I(this.Ac5I, "zmj-splitter-pane2-vertical")
		}
		Kw(this.RP9E, "zmj-splitter-handler-vertical");
		if (this.vertical) _I(this.RP9E, "zmj-splitter-handler-vertical");
		DTHl(this.Qms, this.pane1.style);
		DTHl(this.Ac5I, this.pane2.style);
		var B = this[KjJg](true),
		_ = this[BMK](true);
		if (!jQuery.boxModel) {
			var Q = WN(this.AE);
			B = B + Q.top + Q.bottom;
			_ = _ + Q.left + Q.right
		}
		this.AE.style.width = _ + "px";
		this.AE.style.height = B + "px";
		var $ = this.Qms,
		C = this.Ac5I,
		G = jQuery($),
		I = jQuery(C);
		$.style.display = C.style.display = this.RP9E.style.display = "";
		var D = this[T0y];
		this.pane1.size = String(this.pane1.size);
		this.pane2.size = String(this.pane2.size);
		var F = parseFloat(this.pane1.size),
		H = parseFloat(this.pane2.size),
		O = isNaN(F),
		T = isNaN(H),
		N = !isNaN(F) && this.pane1.size.indexOf("%") != -1,
		R = !isNaN(H) && this.pane2.size.indexOf("%") != -1,
		J = !O && !N,
		M = !T && !R,
		P = this.vertical ? B - this[T0y] : _ - this[T0y],
		K = p2Size = 0;
		if (O || T) {
			if (O && T) {
				K = parseInt(P / 2);
				p2Size = P - K
			} else if (J) {
				K = F;
				p2Size = P - K
			} else if (N) {
				K = parseInt(P * F / 100);
				p2Size = P - K
			} else if (M) {
				p2Size = H;
				K = P - p2Size
			} else if (R) {
				p2Size = parseInt(P * H / 100);
				K = P - p2Size
			}
		} else if (N && M) {
			p2Size = H;
			K = P - p2Size
		} else if (J && R) {
			K = F;
			p2Size = P - K
		} else {
			var L = F + H;
			K = parseInt(P * F / L);
			p2Size = P - K
		}
		if (K > this.pane1.maxSize) {
			K = this.pane1.maxSize;
			p2Size = P - K
		}
		if (p2Size > this.pane2.maxSize) {
			p2Size = this.pane2.maxSize;
			K = P - p2Size
		}
		if (K < this.pane1.minSize) {
			K = this.pane1.minSize;
			p2Size = P - K
		}
		if (p2Size < this.pane2.minSize) {
			p2Size = this.pane2.minSize;
			K = P - p2Size
		}
		if (this.pane1.expanded == false) {
			p2Size = P;
			K = 0;
			$.style.display = "none"
		} else if (this.pane2.expanded == false) {
			K = P;
			p2Size = 0;
			C.style.display = "none"
		}
		if (this.pane1.visible == false) {
			p2Size = P + D;
			K = D = 0;
			$.style.display = "none";
			this.RP9E.style.display = "none"
		} else if (this.pane2.visible == false) {
			K = P + D;
			p2Size = D = 0;
			C.style.display = "none";
			this.RP9E.style.display = "none"
		}
		if (this.vertical) {
			WE($, _);
			WE(C, _);
			ZIA($, K);
			ZIA(C, p2Size);
			C.style.top = (K + D) + "px";
			this.RP9E.style.left = "0px";
			this.RP9E.style.top = K + "px";
			WE(this.RP9E, _);
			ZIA(this.RP9E, this[T0y]);
			$.style.left = "0px";
			C.style.left = "0px"
		} else {
			WE($, K);
			WE(C, p2Size);
			ZIA($, B);
			ZIA(C, B);
			C.style.left = (K + D) + "px";
			this.RP9E.style.top = "0px";
			this.RP9E.style.left = K + "px";
			WE(this.RP9E, this[T0y]);
			ZIA(this.RP9E, B);
			$.style.top = "0px";
			C.style.top = "0px"
		}
		var S = "<div class=\"zmj-splitter-handler-buttons\">";
		if (!this.pane1.expanded || !this.pane2.expanded) {
			if (!this.pane1.expanded) {
				if (this.pane1[Nb9]) S += "<a id=\"1\" class=\"zmj-splitter-pane2-button\"></a>"
			} else if (this.pane2[Nb9]) S += "<a id=\"2\" class=\"zmj-splitter-pane1-button\"></a>"
		} else {
			if (this.pane1[Nb9]) S += "<a id=\"1\" class=\"zmj-splitter-pane1-button\"></a>";
			if (this[URW]) if ((!this.pane1[Nb9] && !this.pane2[Nb9])) S += "<span class=\"zmj-splitter-resize-button\"></span>";
			if (this.pane2[Nb9]) S += "<a id=\"2\" class=\"zmj-splitter-pane2-button\"></a>"
		}
		S += "</div>";
		this.RP9E.innerHTML = S;
		var E = this.RP9E.firstChild;
		E.style.display = this.showHandleButton ? "": "none";
		var A = Vhwd(E);
		if (this.vertical) E.style.marginLeft = -A.width / 2 + "px";
		else E.style.marginTop = -A.height / 2 + "px";
		if (!this.pane1.visible || !this.pane2.visible || !this.pane1.expanded || !this.pane2.expanded) _I(this.RP9E, "zmj-splitter-nodrag");
		else Kw(this.RP9E, "zmj-splitter-nodrag");
		zmj.layout(this.AE)
	},
	getPaneBox: function($) {
		var _ = this.getPaneEl($);
		if (!_) return null;
		return Vhwd(_)
	},
	getPane: function($) {
		if ($ == 1) return this.pane1;
		else if ($ == 2) return this.pane2;
		return $
	},
	setPanes: function(_) {
		if (!zmj.isArray(_)) return;
		for (var $ = 0; $ < 2; $++) {
			var A = _[$];
			this.updatePane($ + 1, A)
		}
	},
	getPaneEl: function($) {
		if ($ == 1) return this.Qms;
		return this.Ac5I
	},
	updatePane: function(_, F) {
		var $ = this.getPane(_);
		if (!$) return;
		zmj.copyTo($, F);
		var B = this.getPaneEl(_),
		C = $.body;
		delete $.body;
		if (C) {
			if (!zmj.isArray(C)) C = [C];
			for (var A = 0, E = C.length; A < E; A++) zmj.append(B, C[A])
		}
		if ($.bodyParent) {
			var D = $.bodyParent;
			while (D.firstChild) B.appendChild(D.firstChild)
		}
		delete $.bodyParent;
		this[J_w]()
	},
	setShowHandleButton: function($) {
		this.showHandleButton = $;
		this[J_w]()
	},
	getShowHandleButton: function($) {
		return this.showHandleButton
	},
	setVertical: function($) {
		this.vertical = $;
		this[J_w]()
	},
	getVertical: function() {
		return this.vertical
	},
	expandPane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		$.expanded = true;
		this[J_w]()
	},
	collapsePane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		$.expanded = false;
		var A = $ == this.pane1 ? this.pane2: this.pane1;
		if (A.expanded == false) {
			A.expanded = true;
			A.visible = true
		}
		this[J_w]()
	},
	togglePane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		if ($.expanded) this.collapsePane($);
		else this.expandPane($)
	},
	showPane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		$.visible = true;
		this[J_w]()
	},
	hidePane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		$.visible = false;
		var A = $ == this.pane1 ? this.pane2: this.pane1;
		if (A.visible == false) {
			A.expanded = true;
			A.visible = true
		}
		this[J_w]()
	},
	setAllowResize: function($) {
		if (this[URW] != $) {
			this[URW] = $;
			this[X5Q]()
		}
	},
	getAllowResize: function() {
		return this[URW]
	},
	setHandlerSize: function($) {
		if (this[T0y] != $) {
			this[T0y] = $;
			this[X5Q]()
		}
	},
	getHandlerSize: function() {
		return this[T0y]
	},
	PSN: function(B) {
		var A = B.target;
		if (!EjQz(this.RP9E, A)) return;
		var _ = parseInt(A.id),
		$ = this.getPane(_),
		B = {
			pane: $,
			paneIndex: _,
			cancel: false
		};
		if ($.expanded) this.fire("beforecollapse", B);
		else this.fire("beforeexpand", B);
		if (B.cancel == true) return;
		if (A.className == "zmj-splitter-pane1-button") this.togglePane(_);
		else if (A.className == "zmj-splitter-pane2-button") this.togglePane(_)
	},
	QG3: function($, _) {
		this.fire("buttonclick", {
			pane: $,
			index: this.pane1 == $ ? 1: 2,
			htmlEvent: _
		})
	},
	onButtonClick: function(_, $) {
		this.on("buttonclick", _, $)
	},
	P4: function(A) {
		var _ = A.target;
		if (!this[URW]) return;
		if (!this.pane1.visible || !this.pane2.visible || !this.pane1.expanded || !this.pane2.expanded) return;
		if (EjQz(this.RP9E, _)) if (_.className == "zmj-splitter-pane1-button" || _.className == "zmj-splitter-pane2-button");
		else {
			var $ = this.Ch3z();
			$.start(A)
		}
	},
	Ch3z: function() {
		if (!this.drag) this.drag = new zmj.Drag({
			capture: true,
			onStart: zmj.createDelegate(this.J$c, this),
			onMove: zmj.createDelegate(this.Xuhi, this),
			onStop: zmj.createDelegate(this.GVij, this)
		});
		return this.drag
	},
	J$c: function($) {
		this.IpNz = zmj.append(document.body, "<div class=\"zmj-resizer-mask\"></div>");
		this.TsGm = zmj.append(document.body, "<div class=\"zmj-proxy\"></div>");
		this.TsGm.style.cursor = this.vertical ? "n-resize": "w-resize";
		this.handlerBox = Vhwd(this.RP9E);
		this.elBox = Vhwd(this.AE, true);
		YcA(this.TsGm, this.handlerBox)
	},
	Xuhi: function(C) {
		if (!this.handlerBox) return;
		if (!this.elBox) this.elBox = Vhwd(this.AE, true);
		var B = this.elBox.width,
		D = this.elBox.height,
		E = this[T0y],
		I = this.vertical ? D - this[T0y] : B - this[T0y],
		A = this.pane1.minSize,
		F = this.pane1.maxSize,
		$ = this.pane2.minSize,
		G = this.pane2.maxSize;
		if (this.vertical == true) {
			var _ = C.now[1] - C.init[1],
			H = this.handlerBox.y + _;
			if (H - this.elBox.y > F) H = this.elBox.y + F;
			if (H + this.handlerBox.height < this.elBox.bottom - G) H = this.elBox.bottom - G - this.handlerBox.height;
			if (H - this.elBox.y < A) H = this.elBox.y + A;
			if (H + this.handlerBox.height > this.elBox.bottom - $) H = this.elBox.bottom - $ - this.handlerBox.height;
			zmj.setY(this.TsGm, H)
		} else {
			var J = C.now[0] - C.init[0],
			K = this.handlerBox.x + J;
			if (K - this.elBox.x > F) K = this.elBox.x + F;
			if (K + this.handlerBox.width < this.elBox.right - G) K = this.elBox.right - G - this.handlerBox.width;
			if (K - this.elBox.x < A) K = this.elBox.x + A;
			if (K + this.handlerBox.width > this.elBox.right - $) K = this.elBox.right - $ - this.handlerBox.width;
			zmj.setX(this.TsGm, K)
		}
	},
	GVij: function(_) {
		var $ = this.elBox.width,
		B = this.elBox.height,
		C = this[T0y],
		D = parseFloat(this.pane1.size),
		E = parseFloat(this.pane2.size),
		I = isNaN(D),
		N = isNaN(E),
		J = !isNaN(D) && this.pane1.size.indexOf("%") != -1,
		M = !isNaN(E) && this.pane2.size.indexOf("%") != -1,
		G = !I && !J,
		K = !N && !M,
		L = this.vertical ? B - this[T0y] : $ - this[T0y],
		A = Vhwd(this.TsGm),
		H = A.x - this.elBox.x,
		F = L - H;
		if (this.vertical) {
			H = A.y - this.elBox.y;
			F = L - H
		}
		if (I || N) {
			if (I && N) {
				D = parseFloat(H / L * 100).toFixed(1);
				this.pane1.size = D + "%"
			} else if (G) {
				D = H;
				this.pane1.size = D
			} else if (J) {
				D = parseFloat(H / L * 100).toFixed(1);
				this.pane1.size = D + "%"
			} else if (K) {
				E = F;
				this.pane2.size = E
			} else if (M) {
				E = parseFloat(F / L * 100).toFixed(1);
				this.pane2.size = E + "%"
			}
		} else if (J && K) this.pane2.size = F;
		else if (G && M) this.pane1.size = H;
		else {
			this.pane1.size = parseFloat(H / L * 100).toFixed(1);
			this.pane2.size = 100 - this.pane1.size
		}
		jQuery(this.TsGm).remove();
		jQuery(this.IpNz).remove();
		this.IpNz = null;
		this.TsGm = null;
		this.elBox = this.handlerBox = null;
		this[X5Q]()
	},
	getAttrs: function(B) {
		var G = SD[CPy][YIb][KQk](this, B);
		zmj[D4q](B, G, ["allowResize", "vertical", "showHandleButton"]);
		zmj[PI](B, G, ["handlerSize"]);
		var A = [],
		F = zmj[P8pq](B);
		for (var _ = 0, E = 2; _ < E; _++) {
			var C = F[_],
			D = jQuery(C),
			$ = {};
			A.push($);
			if (!C) continue;
			$.style = C.style.cssText;
			zmj[W5cB](C, $, ["cls", "size"]);
			zmj[D4q](C, $, ["visible", "expanded", "showCollapseButton"]);
			zmj[PI](C, $, ["minSize", "maxSize", "handlerSize"]);
			$.bodyParent = C
		}
		G.panes = A;
		return G
	}
});
Cmk(SD, "splitter");
YE = function() {
	this.regions = [];
	this.regionMap = {};
	YE[CPy][CLu][KQk](this)
};
HX_P(YE, ET, {
	regions: [],
	splitSize: 5,
	collapseWidth: 28,
	collapseHeight: 25,
	regionWidth: 150,
	regionHeight: 80,
	regionMinWidth: 50,
	regionMinHeight: 25,
	regionMaxWidth: 2000,
	regionMaxHeight: 2000,
	uiCls: "zmj-layout",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-layout";
		this.el.innerHTML = "<div class=\"zmj-layout-border\"></div>";
		this.AE = this.el.firstChild;
		this[J_w]()
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(this.el, "click", this.PSN, this);
			WoBw(this.el, "mousedown", this.P4, this);
			WoBw(this.el, "mouseover", this.J6I, this);
			WoBw(this.el, "mouseout", this.DtkD, this);
			WoBw(document, "mousedown", this.O_, this)
		},
		this)
	},
	getRegionEl: function($) {
		var $ = this[OBrZ]($);
		if (!$) return null;
		return $._el
	},
	getRegionHeaderEl: function($) {
		var $ = this[OBrZ]($);
		if (!$) return null;
		return $._header
	},
	getRegionBodyEl: function($) {
		var $ = this[OBrZ]($);
		if (!$) return null;
		return $._body
	},
	getRegionSplitEl: function($) {
		var $ = this[OBrZ]($);
		if (!$) return null;
		return $._split
	},
	getRegionProxyEl: function($) {
		var $ = this[OBrZ]($);
		if (!$) return null;
		return $._proxy
	},
	getRegionBox: function(_) {
		var $ = this[AHM](_);
		if ($) return Vhwd($);
		return null
	},
	getRegion: function($) {
		if (typeof $ == "string") return this.regionMap[$];
		return $
	},
	MLC: function(_, B) {
		var D = _.buttons;
		for (var $ = 0, A = D.length; $ < A; $++) {
			var C = D[$];
			if (C.name == B) return C
		}
	},
	Fgl: function(_) {
		var $ = zmj.copyTo({
			region: "",
			title: "",
			iconCls: "",
			iconStyle: "",
			showCloseButton: false,
			showCollapseButton: true,
			buttons: [{
				name: "close",
				cls: "zmj-tools-close",
				html: "",
				visible: false
			},
			{
				name: "collapse",
				cls: "zmj-tools-collapse",
				html: "",
				visible: true
			}],
			showSplitIcon: false,
			showSplit: true,
			showHeader: true,
			splitSize: this.splitSize,
			collapseSize: this.collapseWidth,
			width: this.regionWidth,
			height: this.regionHeight,
			minWidth: this.regionMinWidth,
			minHeight: this.regionMinHeight,
			maxWidth: this.regionMaxWidth,
			maxHeight: this.regionMaxHeight,
			allowResize: true,
			cls: "",
			style: "",
			headerCls: "",
			headerStyle: "",
			bodyCls: "",
			bodyStyle: "",
			visible: true,
			expanded: true
		},
		_);
		return $
	},
	LVAo: function($) {
		var $ = this[OBrZ]($);
		if (!$) return;
		zmj.append(this.AE, "<div id=\"" + $.region + "\" class=\"zmj-layout-region\"><div class=\"zmj-layout-region-header\" style=\"" + $.headerStyle + "\"></div><div class=\"zmj-layout-region-body\" style=\"" + $.bodyStyle + "\"></div></div>");
		$._el = this.AE.lastChild;
		$._header = $._el.firstChild;
		$._body = $._el.lastChild;
		if ($.cls) _I($._el, $.cls);
		if ($.style) DTHl($._el, $.style);
		_I($._el, "zmj-layout-region-" + $.region);
		if ($.region != "center") {
			zmj.append(this.AE, "<div uid=\"" + this.uid + "\" id=\"" + $.region + "\" class=\"zmj-layout-split\"><div class=\"zmj-layout-spliticon\"></div></div>");
			$._split = this.AE.lastChild;
			_I($._split, "zmj-layout-split-" + $.region)
		}
		if ($.region != "center") {
			zmj.append(this.AE, "<div id=\"" + $.region + "\" class=\"zmj-layout-proxy\"></div>");
			$._proxy = this.AE.lastChild;
			_I($._proxy, "zmj-layout-proxy-" + $.region)
		}
	},
	setRegions: function(A) {
		if (!zmj.isArray(A)) return;
		for (var $ = 0, _ = A.length; $ < _; $++) this.addRegion(A[$])
	},
	addRegion: function(D, $) {
		var G = D;
		D = this.Fgl(D);
		if (!D.region) D.region = "center";
		D.region = D.region.toLowerCase();
		if (D.region == "center" && G && !G.showHeader) D.showHeader = false;
		if (D.region == "north" || D.region == "south") if (!G.collapseSize) D.collapseSize = this.collapseHeight;
		this.W1(D);
		if (typeof $ != "number") $ = this.regions.length;
		var A = this.regionMap[D.region];
		if (A) return;
		this.regions.insert($, D);
		this.regionMap[D.region] = D;
		this.LVAo(D);
		var B = this.getRegionBodyEl(D),
		C = D.body;
		delete D.body;
		if (C) {
			if (!zmj.isArray(C)) C = [C];
			for (var _ = 0, F = C.length; _ < F; _++) zmj.append(B, C[_])
		}
		if (D.bodyParent) {
			var E = D.bodyParent;
			while (E.firstChild) B.appendChild(E.firstChild)
		}
		delete D.bodyParent;
		this[J_w]()
	},
	removeRegion: function($) {
		var $ = this[OBrZ]($);
		if (!$) return;
		this.regions.remove($);
		delete this.regionMap[$.region];
		jQuery($._el).remove();
		jQuery($._split).remove();
		jQuery($._proxy).remove();
		this[J_w]()
	},
	moveRegion: function(A, $) {
		var A = this[OBrZ](A);
		if (!A) return;
		var _ = this.regions[$];
		if (!_ || _ == A) return;
		this.regions.remove(A);
		var $ = this.region.indexOf(_);
		this.regions.insert($, A);
		this[J_w]()
	},
	W1: function($) {
		var _ = this.MLC($, "close");
		_.visible = $[DgkX];
		_ = this.MLC($, "collapse");
		_.visible = $[Nb9];
		if ($.width < $.minWidth) $.width = zmj.minWidth;
		if ($.width > $.maxWidth) $.width = zmj.maxWidth;
		if ($.height < $.minHeight) $.height = zmj.minHeight;
		if ($.height > $.maxHeight) $.height = zmj.maxHeight
	},
	updateRegion: function($, _) {
		$ = this[OBrZ]($);
		if (!$) return;
		if (_) delete _.region;
		zmj.copyTo($, _);
		this.W1($);
		this[J_w]()
	},
	expandRegion: function($) {
		$ = this[OBrZ]($);
		if (!$) return;
		$.expanded = true;
		this[J_w]()
	},
	collapseRegion: function($) {
		$ = this[OBrZ]($);
		if (!$) return;
		$.expanded = false;
		this[J_w]()
	},
	toggleRegion: function($) {
		$ = this[OBrZ]($);
		if (!$) return;
		if ($.expanded) this.collapseRegion($);
		else this.expandRegion($)
	},
	showRegion: function($) {
		$ = this[OBrZ]($);
		if (!$) return;
		$.visible = true;
		this[J_w]()
	},
	hideRegion: function($) {
		$ = this[OBrZ]($);
		if (!$) return;
		$.visible = false;
		this[J_w]()
	},
	isExpandRegion: function($) {
		$ = this[OBrZ]($);
		if (!$) return null;
		return this.region.expanded
	},
	isVisibleRegion: function($) {
		$ = this[OBrZ]($);
		if (!$) return null;
		return this.region.visible
	},
	OC$: function($) {
		$ = this[OBrZ]($);
		var _ = {
			region: $,
			cancel: false
		};
		if ($.expanded) {
			this.fire("BeforeCollapse", _);
			if (_.cancel == false) this.collapseRegion($)
		} else {
			this.fire("BeforeExpand", _);
			if (_.cancel == false) this.expandRegion($)
		}
	},
	Jgl: function(_) {
		var $ = J6j(_.target, "zmj-layout-proxy");
		return $
	},
	Rbh: function(_) {
		var $ = J6j(_.target, "zmj-layout-region");
		return $
	},
	PSN: function(D) {
		if (this.AYic) return;
		var A = this.Jgl(D);
		if (A) {
			var _ = A.id,
			C = J6j(D.target, "zmj-tools-collapse");
			if (C) this.OC$(_);
			else this.Gk7Q(_)
		}
		var B = this.Rbh(D);
		if (B && J6j(D.target, "zmj-layout-region-header")) {
			_ = B.id,
			C = J6j(D.target, "zmj-tools-collapse");
			if (C) this.OC$(_);
			var $ = J6j(D.target, "zmj-tools-close");
			if ($) this.updateRegion(_, {
				visible: false
			})
		}
		if (Zq6(D.target, "zmj-layout-spliticon")) {
			_ = D.target.parentNode.id;
			this.OC$(_)
		}
	},
	QG3: function(_, A, $) {
		this.fire("buttonclick", {
			htmlEvent: $,
			region: _,
			button: A,
			index: this.buttons.indexOf(A),
			name: A.name
		})
	},
	A3hz: function(_, A, $) {
		this.fire("buttonmousedown", {
			htmlEvent: $,
			region: _,
			button: A,
			index: this.buttons.indexOf(A),
			name: A.name
		})
	},
	hoverProxyEl: null,
	J6I: function(_) {
		var $ = this.Jgl(_);
		if ($) {
			_I($, "zmj-layout-proxy-hover");
			this.hoverProxyEl = $
		}
	},
	DtkD: function($) {
		if (this.hoverProxyEl) Kw(this.hoverProxyEl, "zmj-layout-proxy-hover");
		this.hoverProxyEl = null
	},
	onButtonClick: function(_, $) {
		this.on("buttonclick", _, $)
	},
	onButtonMouseDown: function(_, $) {
		this.on("buttonmousedown", _, $)
	}
});
zmj.copyTo(YE.prototype, {
	Qtj6: function(_, A) {
		var C = "<div class=\"zmj-tools\">";
		if (A) C += "<span class=\"zmj-tools-collapse\"></span>";
		else for (var $ = _.buttons.length - 1; $ >= 0; $--) {
			var B = _.buttons[$];
			C += "<span class=\"" + B.cls + "\" style=\"";
			C += B.style + ";" + (B.visible ? "": "display:none;") + "\">" + B.html + "</span>"
		}
		C += "</div>";
		C += "<div class=\"zmj-layout-region-icon " + _.iconCls + "\" style=\"" + _[Sz] + ";" + ((_[Sz] || _.iconCls) ? "": "display:none;") + "\"></div>";
		C += "<div class=\"zmj-layout-region-title\">" + _.title + "</div>";
		return C
	},
	doUpdate: function() {
		for (var $ = 0, E = this.regions.length; $ < E; $++) {
			var B = this.regions[$],
			_ = B.region,
			A = B._el,
			D = B._split,
			C = B._proxy;
			B._header.style.display = B.showHeader ? "": "none";
			B._header.innerHTML = this.Qtj6(B);
			if (B._proxy) B._proxy.innerHTML = this.Qtj6(B, true);
			if (D) {
				Kw(D, "zmj-layout-split-nodrag");
				if (B.expanded == false || !B[URW]) _I(D, "zmj-layout-split-nodrag")
			}
		}
		this[X5Q]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		if (this.AYic) return;
		var C = $L7(this.el, true),
		_ = F$u(this.el, true),
		D = {
			x: 0,
			y: 0,
			width: _,
			height: C
		},
		I = this.regions.clone(),
		P = this[OBrZ]("center");
		I.remove(P);
		if (P) I.push(P);
		for (var K = 0, H = I.length; K < H; K++) {
			var E = I[K];
			E._Expanded = false;
			Kw(E._el, "zmj-layout-popup");
			var A = E.region,
			L = E._el,
			F = E._split,
			G = E._proxy;
			if (E.visible == false) {
				L.style.display = "none";
				if (A != "center") F.style.display = G.style.display = "none";
				continue
			}
			L.style.display = "";
			if (A != "center") F.style.display = G.style.display = "";
			var R = D.x,
			O = D.y,
			_ = D.width,
			C = D.height,
			B = E.width,
			J = E.height;
			if (!E.expanded) if (A == "west" || A == "east") {
				B = E.collapseSize;
				WE(L, E.width)
			} else if (A == "north" || A == "south") {
				J = E.collapseSize;
				ZIA(L, E.height)
			}
			switch (A) {
			case "north":
				C = J;
				D.y += J;
				D.height -= J;
				break;
			case "south":
				C = J;
				O = D.y + D.height - J;
				D.height -= J;
				break;
			case "west":
				_ = B;
				D.x += B;
				D.width -= B;
				break;
			case "east":
				_ = B;
				R = D.x + D.width - B;
				D.width -= B;
				break;
			case "center":
				break;
			default:
				continue
			}
			if (_ < 0) _ = 0;
			if (C < 0) C = 0;
			if (A == "west" || A == "east") ZIA(L, C);
			if (A == "north" || A == "south") WE(L, _);
			var N = "left:" + R + "px;top:" + O + "px;",
			$ = L;
			if (!E.expanded) {
				$ = G;
				L.style.top = "-100px";
				L.style.left = "-1500px"
			} else if (G) {
				G.style.left = "-1500px";
				G.style.top = "-100px"
			}
			$.style.left = R + "px";
			$.style.top = O + "px";
			WE($, _);
			ZIA($, C);
			var M = jQuery(E._el).height(),
			Q = E.showHeader ? jQuery(E._header).outerHeight() : 0;
			ZIA(E._body, M - Q);
			if (A == "center") continue;
			B = J = E.splitSize;
			R = D.x,
			O = D.y,
			_ = D.width,
			C = D.height;
			switch (A) {
			case "north":
				C = J;
				D.y += J;
				D.height -= J;
				break;
			case "south":
				C = J;
				O = D.y + D.height - J;
				D.height -= J;
				break;
			case "west":
				_ = B;
				D.x += B;
				D.width -= B;
				break;
			case "east":
				_ = B;
				R = D.x + D.width - B;
				D.width -= B;
				break;
			case "center":
				break
			}
			if (_ < 0) _ = 0;
			if (C < 0) C = 0;
			F.style.left = R + "px";
			F.style.top = O + "px";
			WE(F, _);
			ZIA(F, C);
			if (E.showSplit && E.expanded) Kw(F, "zmj-layout-split-nodrag");
			else _I(F, "zmj-layout-split-nodrag");
			F.firstChild.style.display = E.showSplitIcon ? "block": "none";
			if (E.expanded) Kw(F.firstChild, "zmj-layout-spliticon-collapse");
			else _I(F.firstChild, "zmj-layout-spliticon-collapse")
		}
		zmj.layout(this.AE)
	},
	P4: function(B) {
		if (this.AYic) return;
		if (J6j(B.target, "zmj-layout-split")) {
			var A = jQuery(B.target).attr("uid");
			if (A != this.uid) return;
			var _ = this[OBrZ](B.target.id);
			if (_.expanded == false || !_[URW]) return;
			this.dragRegion = _;
			var $ = this.Ch3z();
			$.start(B)
		}
	},
	Ch3z: function() {
		if (!this.drag) this.drag = new zmj.Drag({
			capture: true,
			onStart: zmj.createDelegate(this.J$c, this),
			onMove: zmj.createDelegate(this.Xuhi, this),
			onStop: zmj.createDelegate(this.GVij, this)
		});
		return this.drag
	},
	J$c: function($) {
		this.IpNz = zmj.append(document.body, "<div class=\"zmj-resizer-mask\"></div>");
		this.TsGm = zmj.append(document.body, "<div class=\"zmj-proxy\"></div>");
		this.TsGm.style.cursor = "n-resize";
		if (this.dragRegion.region == "west" || this.dragRegion.region == "east") this.TsGm.style.cursor = "w-resize";
		this.splitBox = Vhwd(this.dragRegion._split);
		YcA(this.TsGm, this.splitBox);
		this.elBox = Vhwd(this.el, true)
	},
	Xuhi: function(C) {
		var I = C.now[0] - C.init[0],
		V = this.splitBox.x + I,
		A = C.now[1] - C.init[1],
		U = this.splitBox.y + A,
		K = V + this.splitBox.width,
		T = U + this.splitBox.height,
		G = this[OBrZ]("west"),
		L = this[OBrZ]("east"),
		F = this[OBrZ]("north"),
		D = this[OBrZ]("south"),
		H = this[OBrZ]("center"),
		O = G && G.visible ? G.width: 0,
		Q = L && L.visible ? L.width: 0,
		R = F && F.visible ? F.height: 0,
		J = D && D.visible ? D.height: 0,
		P = G && G.showSplit ? F$u(G._split) : 0,
		$ = L && L.showSplit ? F$u(L._split) : 0,
		B = F && F.showSplit ? $L7(F._split) : 0,
		S = D && D.showSplit ? $L7(D._split) : 0,
		E = this.dragRegion,
		N = E.region;
		if (N == "west") {
			var M = this.elBox.width - Q - $ - P - H.minWidth;
			if (V - this.elBox.x > M) V = M + this.elBox.x;
			if (V - this.elBox.x < E.minWidth) V = E.minWidth + this.elBox.x;
			if (V - this.elBox.x > E.maxWidth) V = E.maxWidth + this.elBox.x;
			zmj.setX(this.TsGm, V)
		} else if (N == "east") {
			M = this.elBox.width - O - P - $ - H.minWidth;
			if (this.elBox.right - (V + this.splitBox.width) > M) V = this.elBox.right - M - this.splitBox.width;
			if (this.elBox.right - (V + this.splitBox.width) < E.minWidth) V = this.elBox.right - E.minWidth - this.splitBox.width;
			if (this.elBox.right - (V + this.splitBox.width) > E.maxWidth) V = this.elBox.right - E.maxWidth - this.splitBox.width;
			zmj.setX(this.TsGm, V)
		} else if (N == "north") {
			var _ = this.elBox.height - J - S - B - H.minHeight;
			if (U - this.elBox.y > _) U = _ + this.elBox.y;
			if (U - this.elBox.y < E.minHeight) U = E.minHeight + this.elBox.y;
			if (U - this.elBox.y > E.maxHeight) U = E.maxHeight + this.elBox.y;
			zmj.setY(this.TsGm, U)
		} else if (N == "south") {
			_ = this.elBox.height - R - B - S - H.minHeight;
			if (this.elBox.bottom - (U + this.splitBox.height) > _) U = this.elBox.bottom - _ - this.splitBox.height;
			if (this.elBox.bottom - (U + this.splitBox.height) < E.minHeight) U = this.elBox.bottom - E.minHeight - this.splitBox.height;
			if (this.elBox.bottom - (U + this.splitBox.height) > E.maxHeight) U = this.elBox.bottom - E.maxHeight - this.splitBox.height;
			zmj.setY(this.TsGm, U)
		}
	},
	GVij: function(B) {
		var C = Vhwd(this.TsGm),
		D = this.dragRegion,
		A = D.region;
		if (A == "west") {
			var $ = C.x - this.elBox.x;
			this.updateRegion(D, {
				width: $
			})
		} else if (A == "east") {
			$ = this.elBox.right - C.right;
			this.updateRegion(D, {
				width: $
			})
		} else if (A == "north") {
			var _ = C.y - this.elBox.y;
			this.updateRegion(D, {
				height: _
			})
		} else if (A == "south") {
			_ = this.elBox.bottom - C.bottom;
			this.updateRegion(D, {
				height: _
			})
		}
		jQuery(this.TsGm).remove();
		this.TsGm = null;
		this.elBox = this.handlerBox = null;
		jQuery(this.IpNz).remove();
		this.IpNz = null
	},
	Gk7Q: function($) {
		$ = this[OBrZ]($);
		if ($._Expanded === true) this.X4O($);
		else this.G85($)
	},
	G85: function(D) {
		if (this.AYic) return;
		this[X5Q]();
		var A = D.region,
		H = D._el;
		D._Expanded = true;
		_I(H, "zmj-layout-popup");
		var E = Vhwd(D._proxy),
		B = Vhwd(D._el),
		F = {};
		if (A == "east") {
			var K = E.x,
			J = E.y,
			C = E.height;
			ZIA(H, C);
			zmj.setX(H, K);
			H.style.top = D._proxy.style.top;
			var I = parseInt(H.style.left);
			F = {
				left: I - B.width
			}
		} else if (A == "west") {
			K = E.right - B.width,
			J = E.y,
			C = E.height;
			ZIA(H, C);
			zmj.setX(H, K);
			H.style.top = D._proxy.style.top;
			I = parseInt(H.style.left);
			F = {
				left: I + B.width
			}
		} else if (A == "north") {
			var K = E.x,
			J = E.bottom - B.height,
			_ = E.width;
			WE(H, _);
			zmj[GzmA](H, K, J);
			var $ = parseInt(H.style.top);
			F = {
				top: $ + B.height
			}
		} else if (A == "south") {
			K = E.x,
			J = E.y,
			_ = E.width;
			WE(H, _);
			zmj[GzmA](H, K, J);
			$ = parseInt(H.style.top);
			F = {
				top: $ - B.height
			}
		}
		_I(D._proxy, "zmj-layout-maxZIndex");
		this.AYic = true;
		var G = this,
		L = jQuery(H);
		L.animate(F, 250,
		function() {
			Kw(D._proxy, "zmj-layout-maxZIndex");
			G.AYic = false
		})
	},
	X4O: function(F) {
		if (this.AYic) return;
		F._Expanded = false;
		var B = F.region,
		E = F._el,
		D = Vhwd(E),
		_ = {};
		if (B == "east") {
			var C = parseInt(E.style.left);
			_ = {
				left: C + D.width
			}
		} else if (B == "west") {
			C = parseInt(E.style.left);
			_ = {
				left: C - D.width
			}
		} else if (B == "north") {
			var $ = parseInt(E.style.top);
			_ = {
				top: $ - D.height
			}
		} else if (B == "south") {
			$ = parseInt(E.style.top);
			_ = {
				top: $ + D.height
			}
		}
		_I(F._proxy, "zmj-layout-maxZIndex");
		this.AYic = true;
		var A = this,
		G = jQuery(E);
		G.animate(_, 250,
		function() {
			Kw(F._proxy, "zmj-layout-maxZIndex");
			A.AYic = false;
			A[X5Q]()
		})
	},
	O_: function(B) {
		if (this.AYic) return;
		for (var $ = 0, A = this.regions.length; $ < A; $++) {
			var _ = this.regions[$];
			if (!_._Expanded) continue;
			if (EjQz(_._el, B.target) || EjQz(_._proxy, B.target));
			else this.X4O(_)
		}
	},
	getAttrs: function(A) {
		var H = YE[CPy][YIb][KQk](this, A),
		G = jQuery(A),
		E = parseInt(G.attr("splitSize"));
		if (!isNaN(E)) H.splitSize = E;
		var F = [],
		D = zmj[P8pq](A);
		for (var _ = 0, C = D.length; _ < C; _++) {
			var B = D[_],
			$ = {};
			F.push($);
			$.cls = B.className;
			$.style = B.style.cssText;
			zmj[W5cB](B, $, ["region", "title", "iconCls", "iconStyle", "cls", "headerCls", "headerStyle", "bodyCls", "bodyStyle"]);
			zmj[D4q](B, $, ["allowResize", "visible", "showCloseButton", "showCollapseButton", "showSplit", "showHeader", "expanded", "showSplitIcon"]);
			zmj[PI](B, $, ["splitSize", "collapseSize", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight"]);
			$.bodyParent = B
		}
		H.regions = F;
		return H
	}
});
Cmk(YE, "layout");
Bcpb = function() {
	Bcpb[CPy][CLu][KQk](this)
};
HX_P(Bcpb, ET, {
	style: "",
	borderStyle: "",
	bodyStyle: "",
	uiCls: "zmj-box",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-box";
		this.el.innerHTML = "<div class=\"zmj-box-border\"></div>";
		this.VC5 = this.AE = this.el.firstChild
	},
	_initEvents: function() {},
	doLayout: function() {
		if (!this.canLayout()) return;
		var C = this[Uw](),
		E = this[Wc](),
		B = UwK(this.VC5),
		D = Jfu(this.VC5);
		if (!C) {
			var A = this[KjJg](true);
			if (jQuery.boxModel) A = A - B.top - B.bottom;
			A = A - D.top - D.bottom;
			if (A < 0) A = 0;
			this.VC5.style.height = A + "px"
		} else this.VC5.style.height = "";
		var $ = this[BMK](true),
		_ = $;
		$ = $ - D.left - D.right;
		if (jQuery.boxModel) $ = $ - B.left - B.right;
		if ($ < 0) $ = 0;
		this.VC5.style.width = $ + "px";
		zmj.layout(this.AE)
	},
	setBody: function(_) {
		if (!_) return;
		if (!zmj.isArray(_)) _ = [_];
		for (var $ = 0, A = _.length; $ < A; $++) zmj.append(this.VC5, _[$]);
		zmj.parse(this.VC5);
		this[X5Q]()
	},
	set_bodyParent: function($) {
		if (!$) return;
		var _ = this.VC5,
		A = $;
		while (A.firstChild) _.appendChild(A.firstChild);
		this[X5Q]()
	},
	setBodyStyle: function($) {
		DTHl(this.VC5, $);
		this[X5Q]()
	},
	getAttrs: function($) {
		var _ = Bcpb[CPy][YIb][KQk](this, $);
		_._bodyParent = $;
		zmj[W5cB]($, _, ["bodyStyle"]);
		return _
	}
});
Cmk(Bcpb, "box");
BGN = function() {
	BGN[CPy][CLu][KQk](this)
};
HX_P(BGN, ET, {
	url: "",
	uiCls: "zmj-include",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-include"
	},
	_initEvents: function() {},
	doLayout: function() {
		if (!this.canLayout()) return;
		var A = this.el.childNodes;
		if (A) for (var $ = 0, B = A.length; $ < B; $++) {
			var _ = A[$];
			zmj.layout(_)
		}
	},
	setUrl: function($) {
		this.url = $;
		zmj.update({
			url: this.url,
			el: this.el,
			async: this.async
		});
		this[X5Q]()
	},
	getUrl: function($) {
		return this.url
	},
	getAttrs: function($) {
		var _ = BGN[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, _, ["url"]);
		return _
	}
});
Cmk(BGN, "include");
HU3e = function() {
	this.NOtT();
	HU3e[CPy][CLu][KQk](this)
};
HX_P(HU3e, ET, {
	activeIndex: -1,
	tabAlign: "left",
	tabPosition: "top",
	showBody: true,
	nameField: "id",
	titleField: "title",
	urlField: "url",
	url: "",
	maskOnLoad: true,
	bodyStyle: "",
	DRN: "zmj-tab-hover",
	FNSP: "zmj-tab-active",
	set: function(_) {
		if (typeof _ == "string") return this;
		var $ = this.YA6;
		this.YA6 = false;
		var A = _.activeIndex;
		delete _.activeIndex;
		var B = _.url;
		delete _.url;
		HU3e[CPy].set[KQk](this, _);
		if (B) this.setUrl(B);
		if (zmj.isNumber(A)) this.setActiveIndex(A);
		this.YA6 = $;
		this[X5Q]();
		return this
	},
	uiCls: "zmj-tabs",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-tabs";
		var _ = "<table class=\"zmj-tabs-table\" cellspacing=\"0\" cellpadding=\"0\"><tr style=\"width:100%;\">" + "<td></td>" + "<td style=\"text-align:left;vertical-align:top;width:100%;\"><div class=\"zmj-tabs-bodys\"></div></td>" + "<td></td>" + "</tr></table>";
		this.el.innerHTML = _;
		this.ZC = this.el.firstChild;
		var $ = this.el.getElementsByTagName("td");
		this.L_Os = $[0];
		this.Jaj = $[1];
		this.M48 = $[2];
		this.VC5 = this.Jaj.firstChild;
		this.AE = this.VC5;
		this[J_w]()
	},
	FAI: function() {
		Kw(this.L_Os, "zmj-tabs-header");
		Kw(this.M48, "zmj-tabs-header");
		this.L_Os.innerHTML = "";
		this.M48.innerHTML = "";
		zmj.removeChilds(this.Jaj, this.VC5)
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(this.el, "mousedown", this.P4, this);
			WoBw(this.el, "click", this.PSN, this);
			WoBw(this.el, "mouseover", this.J6I, this);
			WoBw(this.el, "mouseout", this.DtkD, this)
		},
		this)
	},
	NOtT: function() {
		this.tabs = []
	},
	PsO: 1,
	createTab: function(_) {
		var $ = zmj.copyTo({
			_id: this.PsO++,
			name: "",
			title: "",
			newLine: false,
			iconCls: "",
			iconStyle: "",
			headerCls: "",
			headerStyle: "",
			bodyCls: "",
			bodyStyle: "",
			visible: true,
			enabled: true,
			showCloseButton: false,
			active: false,
			url: "",
			loaded: false,
			refreshOnClick: false
		},
		_);
		if (_) {
			_ = zmj.copyTo(_, $);
			$ = _
		}
		return $
	},
	Vu: function() {
		var _ = zmj.getData(this.url);
		if (!_) _ = [];
		for (var $ = 0, B = _.length; $ < B; $++) {
			var A = _[$];
			A.title = A[this.titleField];
			A.url = A[this.urlField];
			A.name = A[this.nameField]
		}
		this.setTabs(_);
		this.fire("load")
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this.setTabs($)
	},
	setUrl: function($) {
		this.url = $;
		this.Vu()
	},
	getUrl: function() {
		return this.url
	},
	setNameField: function($) {
		this.nameField = $
	},
	getNameField: function() {
		return this.nameField
	},
	setTitleField: function($) {
		this[Eh] = $
	},
	getTitleField: function() {
		return this[Eh]
	},
	setUrlField: function($) {
		this[BCm] = $
	},
	getUrlField: function() {
		return this[BCm]
	},
	setTabs: function(_) {
		if (!zmj.isArray(_)) return;
		this.beginUpdate();
		this.removeAll();
		for (var $ = 0, A = _.length; $ < A; $++) this.addTab(_[$]);
		this.setActiveIndex(0);
		this.endUpdate()
	},
	getTabs: function() {
		return this.tabs
	},
	removeAll: function(A) {
		var E = this.getActiveTab();
		if (zmj.isNull(A)) A = [];
		if (!zmj.isArray(A)) A = [A];
		for (var $ = A.length - 1; $ >= 0; $--) {
			var B = this.getTab(A[$]);
			if (!B) A.removeAt($);
			else A[$] = B
		}
		var _ = this.tabs;
		for ($ = _.length - 1; $ >= 0; $--) {
			var D = _[$];
			if (A.indexOf(D) == -1) this.removeTab(D)
		}
		var C = A[0];
		if (E != this.getActiveTab()) if (C) this.activeTab(C)
	},
	addTab: function(C, $) {
		if (typeof C == "string") C = {
			title: C
		};
		C = this.createTab(C);
		if (!C.name) C.name = "";
		if (typeof $ != "number") $ = this.tabs.length;
		this.tabs.insert($, C);
		var F = this.ZcHn(C),
		G = "<div id=\"" + F + "\" class=\"zmj-tabs-body " + C.bodyCls + "\" style=\"" + C.bodyStyle + ";display:none;\"></div>";
		zmj.append(this.VC5, G);
		var A = this.getTabBodyEl(C),
		B = C.body;
		delete C.body;
		if (B) {
			if (!zmj.isArray(B)) B = [B];
			for (var _ = 0, E = B.length; _ < E; _++) zmj.append(A, B[_])
		}
		if (C.bodyParent) {
			var D = C.bodyParent;
			while (D.firstChild) A.appendChild(D.firstChild)
		}
		delete C.bodyParent;
		this[J_w]();
		return C
	},
	removeTab: function(C) {
		C = this.getTab(C);
		if (!C) return;
		var D = this.getActiveTab(),
		B = C == D,
		A = this.Vg6(C);
		this.tabs.remove(C);
		this.Vef(C);
		var _ = this.getTabBodyEl(C);
		if (_) this.VC5.removeChild(_);
		if (A && B) {
			for (var $ = this.activeIndex; $ >= 0; $--) {
				var C = this.getTab($);
				if (C && C.enabled && C.visible) {
					this.activeIndex = $;
					break
				}
			}
			this[J_w]();
			this.setActiveIndex(this.activeIndex);
			this.fire("activechanged")
		} else {
			this.activeIndex = this.tabs.indexOf(D);
			this[J_w]()
		}
		return C
	},
	moveTab: function(A, $) {
		A = this.getTab(A);
		if (!A) return;
		var _ = this.tabs[$];
		if (!_ || _ == A) return;
		this.tabs.remove(A);
		var $ = this.tabs.indexOf(_);
		this.tabs.insert($, A);
		this[J_w]()
	},
	updateTab: function($, _) {
		$ = this.getTab($);
		if (!$) return;
		zmj.copyTo($, _);
		this[J_w]()
	},
	Nv: function() {
		return this.VC5
	},
	Vef: function(C, A) {
		if (C.Bz && C.Bz.parentNode) {
			C.Bz.src = "";
			if (C.Bz._ondestroy) C.Bz._ondestroy();
			try {
				C.Bz.parentNode.removeChild(C.Bz);
				C.Bz[Vj](true)
			} catch(F) {}
		}
		C.Bz = null;
		C.loadedUrl = null;
		if (A === true) {
			var D = this.getTabBodyEl(C);
			if (D) {
				var B = zmj[P8pq](D, true);
				for (var _ = 0, E = B.length; _ < E; _++) {
					var $ = B[_];
					if ($ && $.parentNode) $.parentNode.removeChild($)
				}
			}
		}
	},
	Bd: 180,
	_cancelLoadTabs: function(B) {
		var _ = this.tabs;
		for (var $ = 0, C = _.length; $ < C; $++) {
			var A = _[$];
			if (A != B) if (A._loading && A.Bz) {
				A._loading = false;
				this.Vef(A, true)
			}
		}
		this._loading = false;
		this.unmask()
	},
	BEj: function(A) {
		if (!A) return;
		var B = this.getTabBodyEl(A);
		if (!B) return;
		this._cancelLoadTabs();
		this.Vef(A, true);
		this._loading = true;
		A._loading = true;
		this.unmask();
		if (this.maskOnLoad) this.loading();
		var C = new Date(),
		$ = this;
		$.isLoading = true;
		var _ = zmj.createIFrame(A.url,
		function(_, D) {
			try {
				A.Bz.contentWindow.Owner = window;
				A.Bz.contentWindow.CloseOwnerWindow = function(_) {
					A.removeAction = _;
					var B = true;
					if (A.ondestroy) {
						if (typeof A.ondestroy == "string") A.ondestroy = window[A.ondestroy];
						if (A.ondestroy) B = A.ondestroy[KQk](this, E)
					}
					if (B === false) return false;
					setTimeout(function() {
						$.removeTab(A)
					},
					10)
				}
			} catch(E) {}
			if (A._loading != true) return;
			var B = (C - new Date()) + $.Bd;
			A._loading = false;
			A.loadedUrl = A.url;
			if (B < 0) B = 0;
			setTimeout(function() {
				$.unmask();
				$[X5Q]();
				$.isLoading = false
			},
			B);
			if (D) {
				var E = {
					sender: $,
					tab: A,
					index: $.tabs.indexOf(A),
					name: A.name,
					iframe: A.Bz
				};
				if (A.onload) {
					if (typeof A.onload == "string") A.onload = window[A.onload];
					if (A.onload) A.onload[KQk]($, E)
				}
			}
			$.fire("tabload", E)
		});
		setTimeout(function() {
			if (A.Bz == _) B.appendChild(_)
		},
		1);
		A.Bz = _
	},
	Vg6: function($) {
		var _ = {
			sender: this,
			tab: $,
			index: this.tabs.indexOf($),
			name: $.name,
			iframe: $.Bz,
			autoActive: true
		};
		this.fire("tabdestroy", _);
		return _.autoActive
	},
	loadTab: function(A, _, $, C) {
		if (!A) return;
		_ = this.getTab(_);
		if (!_) _ = this.getActiveTab();
		if (!_) return;
		_.url = A;
		delete _.loadedUrl;
		var B = this;
		clearTimeout(this._loadTabTimer);
		this._loadTabTimer = setTimeout(function() {
			B.BEj(_)
		},
		1)
	},
	reloadTab: function($) {
		$ = this.getTab($);
		if (!$) $ = this.getActiveTab();
		if (!$) return;
		this.loadTab($.url, $)
	},
	getTabRows: function() {
		var A = [],
		_ = [];
		for (var $ = 0, C = this.tabs.length; $ < C; $++) {
			var B = this.tabs[$];
			if ($ != 0 && B.newLine) {
				A.push(_);
				_ = []
			}
			_.push(B)
		}
		A.push(_);
		return A
	},
	doUpdate: function() {
		if (this.Djl === false) return;
		Kw(this.el, "zmj-tabs-position-left");
		Kw(this.el, "zmj-tabs-position-top");
		Kw(this.el, "zmj-tabs-position-right");
		Kw(this.el, "zmj-tabs-position-bottom");
		if (this[IM] == "bottom") {
			_I(this.el, "zmj-tabs-position-bottom");
			this.PE6()
		} else if (this[IM] == "right") {
			_I(this.el, "zmj-tabs-position-right");
			this.Nk$()
		} else if (this[IM] == "left") {
			_I(this.el, "zmj-tabs-position-left");
			this.GNt()
		} else {
			_I(this.el, "zmj-tabs-position-top");
			this.Miq()
		}
		this[X5Q]();
		this.setActiveIndex(this.activeIndex, false)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		var R = this[Uw]();
		C = this[KjJg](true);
		w = this[BMK](true);
		var G = C,
		O = w;
		if (!R && this[BD]) {
			var Q = jQuery(this.Kz).outerHeight(),
			$ = jQuery(this.Kz).outerWidth();
			if (this[IM] == "top") Q = jQuery(this.Kz.parentNode).outerHeight();
			if (this[IM] == "left" || this[IM] == "right") w = w - $;
			else C = C - Q;
			if (jQuery.boxModel) {
				var D = UwK(this.VC5),
				S = WN(this.VC5);
				C = C - D.top - D.bottom - S.top - S.bottom;
				w = w - D.left - D.right - S.left - S.right
			}
			margin = Jfu(this.VC5);
			C = C - margin.top - margin.bottom;
			w = w - margin.left - margin.right;
			if (C < 0) C = 0;
			if (w < 0) w = 0;
			this.VC5.style.width = w + "px";
			this.VC5.style.height = C + "px";
			if (this[IM] == "left" || this[IM] == "right") {
				var I = this.Kz.getElementsByTagName("tr")[0],
				E = I.childNodes,
				_ = E[0].getElementsByTagName("tr"),
				F = last = all = 0;
				for (var K = 0, H = _.length; K < H; K++) {
					var I = _[K],
					N = jQuery(I).outerHeight();
					all += N;
					if (K == 0) F = N;
					if (K == H - 1) last = N
				}
				switch (this[Qo]) {
				case "center":
					var P = parseInt((G - (all - F - last)) / 2);
					for (K = 0, H = E.length; K < H; K++) {
						E[K].firstChild.style.height = G + "px";
						var B = E[K].firstChild,
						_ = B.getElementsByTagName("tr"),
						L = _[0],
						U = _[_.length - 1];
						L.style.height = P + "px";
						U.style.height = P + "px"
					}
					break;
				case "right":
					for (K = 0, H = E.length; K < H; K++) {
						var B = E[K].firstChild,
						_ = B.getElementsByTagName("tr"),
						I = _[0],
						T = G - (all - F);
						if (T >= 0) I.style.height = T + "px"
					}
					break;
				case "fit":
					for (K = 0, H = E.length; K < H; K++) E[K].firstChild.style.height = G + "px";
					break;
				default:
					for (K = 0, H = E.length; K < H; K++) {
						B = E[K].firstChild,
						_ = B.getElementsByTagName("tr"),
						I = _[_.length - 1],
						T = G - (all - last);
						if (T >= 0) I.style.height = T + "px"
					}
					break
				}
			}
		} else {
			this.VC5.style.width = "auto";
			this.VC5.style.height = "auto"
		}
		var A = this.getTabBodyEl(this.activeIndex);
		if (A) if (!R && this[BD]) {
			var C = $L7(this.VC5, true);
			if (jQuery.boxModel) {
				D = UwK(A),
				S = WN(A);
				C = C - D.top - D.bottom - S.top - S.bottom
			}
			A.style.height = C + "px"
		} else A.style.height = "auto";
		switch (this[IM]) {
		case "bottom":
			var M = this.Kz.childNodes;
			for (K = 0, H = M.length; K < H; K++) {
				B = M[K];
				Kw(B, "zmj-tabs-header2");
				if (H > 1 && K != 0) _I(B, "zmj-tabs-header2")
			}
			break;
		case "left":
			E = this.Kz.firstChild.rows[0].cells;
			for (K = 0, H = E.length; K < H; K++) {
				var J = E[K];
				Kw(J, "zmj-tabs-header2");
				if (H > 1 && K == 0) _I(J, "zmj-tabs-header2")
			}
			break;
		case "right":
			E = this.Kz.firstChild.rows[0].cells;
			for (K = 0, H = E.length; K < H; K++) {
				J = E[K];
				Kw(J, "zmj-tabs-header2");
				if (H > 1 && K != 0) _I(J, "zmj-tabs-header2")
			}
			break;
		default:
			M = this.Kz.childNodes;
			for (K = 0, H = M.length; K < H; K++) {
				B = M[K];
				Kw(B, "zmj-tabs-header2");
				if (H > 1 && K == 0) _I(B, "zmj-tabs-header2")
			}
			break
		}
		Kw(this.el, "zmj-tabs-scroll");
		if (this[IM] == "top") {
			jQuery(this.Kz).width(O);
			if (this.Kz.offsetWidth < this.Kz.scrollWidth) {
				jQuery(this.Kz).width(O - 60);
				_I(this.el, "zmj-tabs-scroll")
			}
			if (isIE && !jQuery.boxModel) this.AQ.style.left = "-26px"
		}
		this.PlN();
		zmj.layout(this.VC5)
	},
	setTabAlign: function($) {
		this[Qo] = $;
		this[J_w]()
	},
	setTabPosition: function($) {
		this[IM] = $;
		this[J_w]()
	},
	getTab: function($) {
		if (typeof $ == "object") return $;
		if (typeof $ == "number") return this.tabs[$];
		else for (var _ = 0, B = this.tabs.length; _ < B; _++) {
			var A = this.tabs[_];
			if (A.name == $) return A
		}
	},
	getHeaderEl: function() {
		return this.Kz
	},
	getBodyEl: function() {
		return this.VC5
	},
	getTabEl: function($) {
		var C = this.getTab($);
		if (!C) return null;
		var E = this.TBo(C),
		B = this.el.getElementsByTagName("*");
		for (var _ = 0, D = B.length; _ < D; _++) {
			var A = B[_];
			if (A.id == E) return A
		}
		return null
	},
	getTabBodyEl: function($) {
		var C = this.getTab($);
		if (!C) return null;
		var E = this.ZcHn(C),
		B = this.VC5.childNodes;
		for (var _ = 0, D = B.length; _ < D; _++) {
			var A = B[_];
			if (A.id == E) return A
		}
		return null
	},
	getTabIFrameEl: function($) {
		var _ = this.getTab($);
		if (!_) return null;
		return _.Bz
	},
	TBo: function($) {
		return this.uid + "$" + $._id
	},
	ZcHn: function($) {
		return this.uid + "$body$" + $._id
	},
	PlN: function() {
		if (this[IM] == "top") {
			Kw(this.AQ, "zmj-disabled");
			Kw(this.Tpqb, "zmj-disabled");
			if (this.Kz.scrollLeft == 0) _I(this.AQ, "zmj-disabled");
			var _ = this.getTabEl(this.tabs.length - 1);
			if (_) {
				var $ = Vhwd(_),
				A = Vhwd(this.Kz);
				if ($.right <= A.right) _I(this.Tpqb, "zmj-disabled")
			}
		}
	},
	setActiveIndex: function($, I) {
		var M = this.getTab($),
		C = this.getTab(this.activeIndex),
		N = M != C,
		K = this.getTabBodyEl(this.activeIndex);
		if (K) K.style.display = "none";
		if (M) this.activeIndex = this.tabs.indexOf(M);
		else this.activeIndex = -1;
		K = this.getTabBodyEl(this.activeIndex);
		if (K) K.style.display = "";
		K = this.getTabEl(C);
		if (K) Kw(K, this.FNSP);
		K = this.getTabEl(M);
		if (K) _I(K, this.FNSP);
		if (K && N) {
			if (this[IM] == "bottom") {
				var A = J6j(K, "zmj-tabs-header");
				if (A) jQuery(this.Kz).prepend(A)
			} else if (this[IM] == "left") {
				var G = J6j(K, "zmj-tabs-header").parentNode;
				if (G) G.parentNode.appendChild(G)
			} else if (this[IM] == "right") {
				G = J6j(K, "zmj-tabs-header").parentNode;
				if (G) jQuery(G.parentNode).prepend(G)
			} else {
				A = J6j(K, "zmj-tabs-header");
				if (A) this.Kz.appendChild(A)
			}
			var B = this.Kz.scrollLeft;
			this[X5Q]();
			var _ = this.getTabRows();
			if (_.length > 1);
			else {
				if (this[IM] == "top") {
					this.Kz.scrollLeft = B;
					var O = this.getTabEl(this.activeIndex);
					if (O) {
						var J = this,
						L = Vhwd(O),
						F = Vhwd(J.Kz);
						if (L.x < F.x) J.Kz.scrollLeft -= (F.x - L.x);
						else if (L.right > F.right) J.Kz.scrollLeft += (L.right - F.right)
					}
				}
				this.PlN()
			}
			for (var H = 0, E = this.tabs.length; H < E; H++) {
				O = this.getTabEl(this.tabs[H]);
				if (O) Kw(O, this.DRN)
			}
		}
		var D = this;
		if (N) {
			var P = {
				tab: M,
				index: this.tabs.indexOf(M),
				name: M.name
			};
			setTimeout(function() {
				D.fire("ActiveChanged", P)
			},
			1)
		}
		this._cancelLoadTabs(M);
		if (I !== false) if (M && M.url && !M.loadedUrl) {
			D = this;
			D.loadTab(M.url, M)
		}
		if (D.canLayout()) {
			try {
				zmj.layoutIFrames(D.el)
			} catch(P) {}
		}
	},
	getActiveIndex: function() {
		return this.activeIndex
	},
	activeTab: function($) {
		this.setActiveIndex($)
	},
	getActiveTab: function() {
		return this.getTab(this.activeIndex)
	},
	getActiveIndex: function() {
		return this.activeIndex
	},
	U0_L: function(_) {
		_ = this.getTab(_);
		if (!_) return;
		var $ = this.tabs.indexOf(_);
		if (this.activeIndex == $) return;
		var A = {
			tab: _,
			index: $,
			name: _.name,
			cancel: false
		};
		this.fire("BeforeActiveChanged", A);
		if (A.cancel == false) this.activeTab(_)
	},
	setShowBody: function($) {
		if (this[BD] != $) {
			this[BD] = $;
			this[X5Q]()
		}
	},
	getShowBody: function() {
		return this[BD]
	},
	setBodyStyle: function($) {
		this.bodyStyle = $;
		DTHl(this.VC5, $);
		this[X5Q]()
	},
	getBodyStyle: function() {
		return this.bodyStyle
	},
	setMaskOnLoad: function($) {
		this.maskOnLoad = $
	},
	getMaskOnLoad: function() {
		return this.maskOnLoad
	},
	getTabByEvent: function($) {
		return this.KWk($)
	},
	KWk: function(B) {
		var A = J6j(B.target, "zmj-tab");
		if (!A) return null;
		var _ = A.id.split("$");
		if (_[0] != this.uid) return null;
		var $ = parseInt(jQuery(A).attr("index"));
		return this.getTab($)
	},
	PSN: function(A) {
		if (this.isLoading) return;
		var $ = this.KWk(A);
		if (!$) return;
		if ($.enabled) {
			var _ = this;
			setTimeout(function() {
				if (J6j(A.target, "zmj-tab-close")) _.T29I($, A);
				else {
					var B = $.loadedUrl;
					_.U0_L($);
					if ($[VKk] && $.url == B) _.reloadTab($)
				}
			},
			10)
		}
	},
	hoverTab: null,
	J6I: function(A) {
		var $ = this.KWk(A);
		if ($ && $.enabled) {
			var _ = this.getTabEl($);
			_I(_, this.DRN);
			this.hoverTab = $
		}
	},
	DtkD: function(_) {
		if (this.hoverTab) {
			var $ = this.getTabEl(this.hoverTab);
			Kw($, this.DRN)
		}
		this.hoverTab = null
	},
	P4: function(B) {
		clearInterval(this.I2K);
		if (this[IM] == "top") {
			var _ = this,
			A = 0,
			$ = 10;
			if (B.target == this.AQ) this.I2K = setInterval(function() {
				_.Kz.scrollLeft -= $;
				A++;
				if (A > 5) $ = 18;
				if (A > 10) $ = 25;
				_.PlN()
			},
			25);
			else if (B.target == this.Tpqb) this.I2K = setInterval(function() {
				_.Kz.scrollLeft += $;
				A++;
				if (A > 5) $ = 18;
				if (A > 10) $ = 25;
				_.PlN()
			},
			25);
			WoBw(document, "mouseup", this.O$, this)
		}
	},
	O$: function($) {
		clearInterval(this.I2K);
		this.I2K = null;
		Is(document, "mouseup", this.O$, this)
	},
	Miq: function() {
		var L = this[IM] == "top",
		O = "";
		if (L) {
			O += "<div class=\"zmj-tabs-scrollCt\">";
			O += "<a class=\"zmj-tabs-leftButton\" href=\"javascript:void(0)\" hideFocus onclick=\"return false\"></a><a class=\"zmj-tabs-rightButton\" href=\"javascript:void(0)\" hideFocus onclick=\"return false\"></a>"
		}
		O += "<div class=\"zmj-tabs-headers\">";
		var B = this.getTabRows();
		for (var M = 0, A = B.length; M < A; M++) {
			var I = B[M],
			E = "";
			O += "<table class=\"zmj-tabs-header\" cellspacing=\"0\" cellpadding=\"0\"><tr><td class=\"zmj-tabs-space zmj-tabs-firstSpace\"><div></div></td>";
			for (var J = 0, F = I.length; J < F; J++) {
				var N = I[J],
				G = this.TBo(N);
				if (!N.visible) continue;
				var $ = this.tabs.indexOf(N),
				E = N.headerCls || "";
				if (N.enabled == false) E += " zmj-disabled";
				O += "<td id=\"" + G + "\" index=\"" + $ + "\"  class=\"zmj-tab " + E + "\" style=\"" + N.headerStyle + "\">";
				if (N.iconCls || N[Sz]) O += "<span class=\"zmj-tab-icon " + N.iconCls + "\" style=\"" + N[Sz] + "\"></span>";
				O += "<span class=\"zmj-tab-text\">" + N.title + "</span>";
				if (N[DgkX]) {
					var _ = "";
					if (N.enabled) _ = "onmouseover=\"_I(this,'zmj-tab-close-hover')\" onmouseout=\"Kw(this,'zmj-tab-close-hover')\"";
					O += "<span class=\"zmj-tab-close\" " + _ + "></span>"
				}
				O += "</td>";
				if (J != F - 1) O += "<td class=\"zmj-tabs-space2\"><div></div></td>"
			}
			O += "<td class=\"zmj-tabs-space zmj-tabs-lastSpace\" ><div></div></td></tr></table>"
		}
		if (L) O += "</div>";
		O += "</div>";
		this.FAI();
		zmj.prepend(this.Jaj, O);
		var H = this.Jaj;
		this.Kz = H.firstChild.lastChild;
		if (L) {
			this.AQ = this.Kz.parentNode.firstChild;
			this.Tpqb = this.Kz.parentNode.childNodes[1]
		}
		switch (this[Qo]) {
		case "center":
			var K = this.Kz.childNodes;
			for (J = 0, F = K.length; J < F; J++) {
				var C = K[J],
				D = C.getElementsByTagName("td");
				D[0].style.width = "50%";
				D[D.length - 1].style.width = "50%"
			}
			break;
		case "right":
			K = this.Kz.childNodes;
			for (J = 0, F = K.length; J < F; J++) {
				C = K[J],
				D = C.getElementsByTagName("td");
				D[0].style.width = "100%"
			}
			break;
		case "fit":
			break;
		default:
			K = this.Kz.childNodes;
			for (J = 0, F = K.length; J < F; J++) {
				C = K[J],
				D = C.getElementsByTagName("td");
				D[D.length - 1].style.width = "100%"
			}
			break
		}
	},
	PE6: function() {
		this.Miq();
		var $ = this.Jaj;
		zmj.append($, $.firstChild);
		this.Kz = $.lastChild
	},
	GNt: function() {
		var J = "<table cellspacing=\"0\" cellpadding=\"0\"><tr>",
		B = this.getTabRows();
		for (var H = 0, A = B.length; H < A; H++) {
			var F = B[H],
			C = "";
			if (A > 1 && H != A - 1) C = "zmj-tabs-header2";
			J += "<td class=\"" + C + "\"><table class=\"zmj-tabs-header\" cellspacing=\"0\" cellpadding=\"0\">";
			J += "<tr ><td class=\"zmj-tabs-space zmj-tabs-firstSpace\" ><div></div></td></tr>";
			for (var G = 0, D = F.length; G < D; G++) {
				var I = F[G],
				E = this.TBo(I);
				if (!I.visible) continue;
				var $ = this.tabs.indexOf(I),
				C = I.headerCls || "";
				if (I.enabled == false) C += " zmj-disabled";
				J += "<tr><td id=\"" + E + "\" index=\"" + $ + "\"  class=\"zmj-tab " + C + "\" style=\"" + I.headerStyle + "\">";
				if (I.iconCls || I[Sz]) J += "<span class=\"zmj-tab-icon " + I.iconCls + "\" style=\"" + I[Sz] + "\"></span>";
				J += "<span class=\"zmj-tab-text\">" + I.title + "</span>";
				if (I[DgkX]) {
					var _ = "";
					if (I.enabled) _ = "onmouseover=\"_I(this,'zmj-tab-close-hover')\" onmouseout=\"Kw(this,'zmj-tab-close-hover')\"";
					J += "<span class=\"zmj-tab-close\" " + _ + "></span>"
				}
				J += "</td></tr>";
				if (G != D - 1) J += "<tr><td class=\"zmj-tabs-space2\"><div></div></td></tr>"
			}
			J += "<tr ><td class=\"zmj-tabs-space zmj-tabs-lastSpace\" ><div></div></td></tr>";
			J += "</table></td>"
		}
		J += "</tr ></table>";
		this.FAI();
		_I(this.L_Os, "zmj-tabs-header");
		zmj.append(this.L_Os, J);
		this.Kz = this.L_Os
	},
	Nk$: function() {
		this.GNt();
		Kw(this.L_Os, "zmj-tabs-header");
		Kw(this.M48, "zmj-tabs-header");
		zmj.append(this.M48, this.L_Os.firstChild);
		this.Kz = this.M48
	},
	T29I: function(_, $) {
		var C = {
			tab: _,
			index: this.tabs.indexOf(_),
			name: _.name.toLowerCase(),
			htmlEvent: $,
			cancel: false
		};
		this.fire("beforecloseclick", C);
		try {
			if (_.Bz && _.Bz.contentWindow) {
				var A = true;
				if (_.Bz.contentWindow.CloseWindow) A = _.Bz.contentWindow.CloseWindow("close");
				else if (_.Bz.contentWindow.CloseOwnerWindow) A = _.Bz.contentWindow.CloseOwnerWindow("close");
				if (A === false) C.cancel = true
			}
		} catch(B) {}
		if (C.cancel == true) return;
		_.removeAction = "close";
		this.removeTab(_);
		this.fire("closeclick", C)
	},
	onBeforeCloseClick: function(_, $) {
		this.on("beforecloseclick", _, $)
	},
	onCloseClick: function(_, $) {
		this.on("closeclick", _, $)
	},
	onActiveChanged: function(_, $) {
		this.on("activechanged", _, $)
	},
	getAttrs: function(B) {
		var F = HU3e[CPy][YIb][KQk](this, B);
		zmj[W5cB](B, F, ["tabAlign", "tabPosition", "bodyStyle", "onactivechanged", "onbeforeactivechanged", "url", "ontabload", "ontabdestroy", "onbeforecloseclick", "oncloseclick", "titleField", "urlField", "nameField", "loadingMsg"]);
		zmj[D4q](B, F, ["allowAnim", "showBody", "maskOnLoad"]);
		zmj[PI](B, F, ["activeIndex"]);
		var A = [],
		E = zmj[P8pq](B);
		for (var _ = 0, D = E.length; _ < D; _++) {
			var C = E[_],
			$ = {};
			A.push($);
			$.style = C.style.cssText;
			zmj[W5cB](C, $, ["name", "title", "url", "cls", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle", "onload", "ondestroy"]);
			zmj[D4q](C, $, ["newLine", "visible", "enabled", "showCloseButton", "refreshOnClick"]);
			$.bodyParent = C
		}
		F.tabs = A;
		return F
	}
});
Cmk(HU3e, "tabs");
AVd = function() {
	this.items = [];
	AVd[CPy][CLu][KQk](this)
};
HX_P(AVd, ET);
zmj.copyTo(AVd.prototype, FAn_prototype);
var FAn_prototype_hide = FAn_prototype.hide;
zmj.copyTo(AVd.prototype, {
	width: 140,
	vertical: true,
	allowSelectItem: false,
	B7I: null,
	_V51d: "zmj-menuitem-selected",
	textField: "text",
	resultAsTree: false,
	idField: "id",
	parentField: "pid",
	itemsField: "children",
	_clearBorder: false,
	showAction: "none",
	hideAction: "outerclick",
	getbyName: function(C) {
		for (var _ = 0, B = this.items.length; _ < B; _++) {
			var $ = this.items[_];
			if ($.name == C) return $;
			if ($.menu) {
				var A = $.menu.getbyName(C);
				if (A) return A
			}
		}
		return null
	},
	set: function($) {
		if (typeof $ == "string") return this;
		var _ = $.url;
		delete $.url;
		AVd[CPy].set[KQk](this, $);
		if (_) this.setUrl(_);
		return this
	},
	uiCls: "zmj-menu",
	_create: function() {
		var _ = "<table class=\"zmj-menu\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"text-align:left;vertical-align:top;padding:0;border:0;\"><div class=\"zmj-menu-inner\"></div></td></tr></table>",
		$ = document.createElement("div");
		$.innerHTML = _;
		this.el = $.firstChild;
		this._contentEl = zmj.byClass("zmj-menu-inner", this.el);
		if (this.isVertical() == false) _I(this.el, "zmj-menu-horizontal")
	},
	destroy: function($) {
		this._popupEl = this.popupEl = null;
		this.owner = null;
		Is(document, "mousedown", this.YFi, this);
		Is(window, "resize", this.DE, this);
		AVd[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(document, "mousedown", this.YFi, this);
			WoBw(this.el, "mouseover", this.J6I, this);
			WoBw(window, "resize", this.DE, this);
			WoBw(this.el, "contextmenu",
			function($) {
				$.preventDefault()
			},
			this)
		},
		this)
	},
	within: function(B) {
		if (EjQz(this.el, B.target)) return true;
		for (var _ = 0, A = this.items.length; _ < A; _++) {
			var $ = this.items[_];
			if ($[Oan4](B)) return true
		}
		return false
	},
	UXo: function() {
		if (!this._clearEl) this._clearEl = zmj.append(this._contentEl, "<div style=\"clear:both;\"></div>");
		return this._clearEl
	},
	setVertical: function($) {
		this.vertical = $;
		if (!$) _I(this.el, "zmj-menu-horizontal");
		else Kw(this.el, "zmj-menu-horizontal");
		zmj.append(this._contentEl, this.UXo())
	},
	getVertical: function() {
		return this.vertical
	},
	isVertical: function() {
		return this.vertical
	},
	show: function() {
		this[FJhD](true)
	},
	hide: function() {
		this.hideItems();
		FAn_prototype_hide[KQk](this)
	},
	hideItems: function() {
		for (var $ = 0, A = this.items.length; $ < A; $++) {
			var _ = this.items[$];
			_.hideMenu()
		}
	},
	showItemMenu: function($) {
		for (var _ = 0, B = this.items.length; _ < B; _++) {
			var A = this.items[_];
			if (A == $) A.showMenu();
			else A.hideMenu()
		}
	},
	hasShowItemMenu: function() {
		for (var $ = 0, A = this.items.length; $ < A; $++) {
			var _ = this.items[$];
			if (_ && _.menu && _.menu.isPopup) return true
		}
		return false
	},
	setItems: function(_) {
		if (!zmj.isArray(_)) return;
		this.removeAll();
		for (var $ = 0, A = _.length; $ < A; $++) this.addItem(_[$])
	},
	getItems: function() {
		return this.items
	},
	addItem: function($) {
		if ($ == "-" || $ == "|") {
			zmj.append(this._contentEl, "<span class=\"zmj-separator\"></span>");
			return
		}
		if (!zmj.isControl($) && !zmj.getClass($.type)) $.type = "menuitem";
		$ = zmj.getAndCreate($);
		this.items.push($);
		this._contentEl.appendChild($.el);
		$.ownerMenu = this;
		zmj.append(this._contentEl, this.UXo());
		this.fire("itemschanged")
	},
	removeItem: function($) {
		$ = zmj.get($);
		if (!$) return;
		this.items.remove($);
		this._contentEl.removeChild($.el);
		this.fire("itemschanged")
	},
	removeItemAt: function(_) {
		var $ = this.items[_];
		this.removeItem($)
	},
	removeAll: function() {
		var _ = this.items.clone();
		for (var $ = _.length - 1; $ >= 0; $--) this.removeItem(_[$]);
		this._contentEl.innerHTML = ""
	},
	getGroupItems: function(C) {
		if (!C) return [];
		var A = [];
		for (var _ = 0, B = this.items.length; _ < B; _++) {
			var $ = this.items[_];
			if ($[BZ] == C) A.push($)
		}
		return A
	},
	getItem: function($) {
		if (typeof $ == "number") return this.items[$];
		return $
	},
	setAllowSelectItem: function($) {
		this.allowSelectItem = $
	},
	getAllowSelectItem: function() {
		return this.allowSelectItem
	},
	setSelectedItem: function($) {
		$ = this[VzbR]($);
		this._OnItemSelect($)
	},
	getSelectedItem: function($) {
		return this.B7I
	},
	setTextField: function($) {
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	setResultAsTree: function($) {
		this[RLR] = $
	},
	getResultAsTree: function() {
		return this[RLR]
	},
	setIdField: function($) {
		this[Ga3p] = $
	},
	getIdField: function() {
		return this[Ga3p]
	},
	setParentField: function($) {
		this[UOB] = $
	},
	getParentField: function() {
		return this[UOB]
	},
	url: "",
	Vu: function() {
		var B = zmj.getData(this.url);
		if (!B) B = [];
		if (this[RLR] == false) B = zmj.arrayToTree(B, this.itemsField, this.idField, this[UOB]);
		var _ = zmj[Zk](B, this.itemsField, this.idField, this[UOB]);
		for (var A = 0, C = _.length; A < C; A++) {
			var $ = _[A];
			$.text = $[this.textField]
		}
		this.setItems(B);
		this.fire("load")
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this.setItems($)
	},
	setUrl: function($) {
		this.url = $;
		this.Vu()
	},
	getUrl: function() {
		return this.url
	},
	_OnItemClick: function($, _) {
		var A = {
			item: $,
			isLeaf: !$.menu,
			htmlEvent: _
		};
		if (this.isPopup) this.hide();
		else this.hideItems();
		if (this.allowSelectItem) this.setSelectedItem($);
		this.fire("itemclick", A);
		if (this.ownerItem);
	},
	_OnItemSelect: function($) {
		if (this.B7I) this.B7I[T07](this._V51d);
		this.B7I = $;
		if (this.B7I) this.B7I[B1z](this._V51d);
		var _ = {
			item: this.B7I
		};
		this.fire("itemselect", _)
	},
	onItemClick: function(_, $) {
		this.on("itemclick", _, $)
	},
	onItemSelect: function(_, $) {
		this.on("itemselect", _, $)
	},
	parseItems: function(G) {
		var C = [];
		for (var _ = 0, F = G.length; _ < F; _++) {
			var B = G[_];
			if (B.className == "separator") {
				C.add("-");
				continue
			}
			var E = zmj[P8pq](B),
			A = E[0],
			D = E[1],
			$ = new UgP();
			if (!D) {
				zmj.applyTo[KQk]($, B);
				C.add($);
				continue
			}
			zmj.applyTo[KQk]($, A);
			$[_B9](document.body);
			var H = new AVd();
			zmj.applyTo[KQk](H, D);
			$.setMenu(H);
			H[_B9](document.body);
			C.add($)
		}
		return C.clone()
	},
	getAttrs: function(_) {
		var E = AVd[CPy][YIb][KQk](this, _),
		D = jQuery(_);
		zmj[W5cB](_, E, ["popupEl", "popupCls", "showAction", "hideAction", "hAlign", "vAlign", "modalStyle", "onbeforeopen", "open", "onbeforeclose", "onclose", "url", "onitemclick", "onitemselect", "textField", "idField", "parentField"]);
		zmj[D4q](_, E, ["resultAsTree"]);
		var A = zmj[P8pq](_),
		$ = this.parseItems(A);
		if ($.length > 0) E.items = $;
		var B = D.attr("vertical");
		if (B) E.vertical = B == "true" ? true: false;
		var C = D.attr("allowSelectItem");
		if (C) E.allowSelectItem = C == "true" ? true: false;
		return E
	}
});
Cmk(AVd, "menu");
AVdBar = function() {
	AVdBar[CPy][CLu][KQk](this)
};
HX_P(AVdBar, AVd, {
	uiCls: "zmj-menubar",
	vertical: false,
	setVertical: function($) {
		this.vertical = false
	}
});
Cmk(AVdBar, "menubar");
zmj.ContextMenu = function() {
	zmj.ContextMenu[CPy][CLu][KQk](this)
};
HX_P(zmj.ContextMenu, AVd, {
	uiCls: "zmj-contextmenu",
	vertical: true,
	visible: false,
	setVertical: function($) {
		this.vertical = true
	}
});
Cmk(zmj.ContextMenu, "contextmenu");
UgP = function() {
	UgP[CPy][CLu][KQk](this)
};
HX_P(UgP, ET, {
	text: "",
	iconCls: "",
	iconStyle: "",
	iconPosition: "left",
	showIcon: true,
	showAllow: true,
	checked: false,
	checkOnClick: false,
	groupName: "",
	_hoverCls: "zmj-menuitem-hover",
	RJU: "zmj-menuitem-pressed",
	YGs: "zmj-menuitem-checked",
	_clearBorder: false,
	menu: null,
	uiCls: "zmj-menuitem",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = "zmj-menuitem";
		this.el.innerHTML = "<div class=\"zmj-menuitem-inner\"><div class=\"zmj-menuitem-icon\"></div><div class=\"zmj-menuitem-text\"></div><div class=\"zmj-menuitem-allow\"></div></div>";
		this._tbB = this.el.firstChild;
		this.CR4 = this._tbB.firstChild;
		this.UQj = this._tbB.childNodes[1];
		this.allowEl = this._tbB.lastChild
	},
	_initEvents: function() {
		WoBw(this.el, "click", this.PSN, this);
		WoBw(this.el, "mouseup", this.X0i, this);
		WoBw(this.el, "mouseover", this.J6I, this);
		WoBw(this.el, "mouseout", this.DtkD, this)
	},
	destroy: function($) {
		this.menu = null;
		UgP[CPy][Wsj][KQk](this, $)
	},
	within: function($) {
		if (EjQz(this.el, $.target)) return true;
		if (this.menu && this.menu[Oan4]($)) return true;
		return false
	},
	doUpdate: function() {
		if (this.UQj) this.UQj.innerHTML = this.text;
		if (this.CR4) {
			DTHl(this.CR4, this[Sz]);
			_I(this.CR4, this.iconCls);
			this.CR4.style.display = (this[Sz] || this.iconCls) ? "block": "none"
		}
		if (this.iconPosition == "top") _I(this.el, "zmj-menuitem-icontop");
		else Kw(this.el, "zmj-menuitem-icontop");
		if (this.checked) _I(this.el, this.YGs);
		else Kw(this.el, this.YGs);
		if (this.allowEl) if (this.menu && this.menu.items.length > 0) this.allowEl.style.display = "block";
		else this.allowEl.style.display = "none"
	},
	setText: function($) {
		this.text = $;
		this[J_w]()
	},
	getText: function() {
		return this.text
	},
	setIconCls: function($) {
		Kw(this.CR4, this.iconCls);
		this.iconCls = $;
		this[J_w]()
	},
	getIconCls: function() {
		return this.iconCls
	},
	setIconStyle: function($) {
		this[Sz] = $;
		this[J_w]()
	},
	getIconStyle: function() {
		return this[Sz]
	},
	setIconPosition: function($) {
		this.iconPosition = $;
		this[J_w]()
	},
	getIconPosition: function() {
		return this.iconPosition
	},
	setCheckOnClick: function($) {
		this[Cl] = $;
		if ($) _I(this.el, "zmj-menuitem-showcheck");
		else Kw(this.el, "zmj-menuitem-showcheck")
	},
	getCheckOnClick: function() {
		return this[Cl]
	},
	setChecked: function($) {
		if (this.checked != $) {
			this.checked = $;
			this[J_w]();
			this.fire("checkedchanged")
		}
	},
	getChecked: function() {
		return this.checked
	},
	setGroupName: function($) {
		if (this[BZ] != $) this[BZ] = $
	},
	getGroupName: function() {
		return this[BZ]
	},
	setChildren: function($) {
		this.setMenu($)
	},
	setMenu: function($) {
		if (zmj.isArray($)) $ = {
			type: "menu",
			items: $
		};
		if (this.menu !== $) {
			this.menu = zmj.getAndCreate($);
			this.menu.hide();
			this.menu.ownerItem = this;
			this[J_w]();
			this.menu.on("itemschanged", this.K9sc, this)
		}
	},
	getMenu: function() {
		return this.menu
	},
	showMenu: function() {
		if (this.menu) {
			this.menu.setHideAction("outerclick");
			var $ = {
				hAlign: "outright",
				vAlign: "top",
				outHAlign: "outleft",
				popupCls: "zmj-menu-popup"
			};
			if (this.ownerMenu && this.ownerMenu.vertical == false) {
				$.hAlign = "left";
				$.vAlign = "below";
				$.outHAlign = null
			}
			this.menu.showAtEl(this.el, $)
		}
	},
	hideMenu: function() {
		if (this.menu) this.menu.hide()
	},
	hide: function() {
		this.hideMenu();
		this[FJhD](false)
	},
	K9sc: function($) {
		this[J_w]()
	},
	getTopMenu: function() {
		if (this.ownerMenu) if (this.ownerMenu.ownerItem) return this.ownerMenu.ownerItem.getTopMenu();
		else return this.ownerMenu;
		return null
	},
	PSN: function(D) {
		if (this[BUK]()) return;
		if (this[Cl]) if (this.ownerMenu && this[BZ]) {
			var B = this.ownerMenu.getGroupItems(this[BZ]);
			if (B.length > 0) {
				if (this.checked == false) {
					for (var _ = 0, C = B.length; _ < C; _++) {
						var $ = B[_];
						if ($ != this) $.setChecked(false)
					}
					this.setChecked(true)
				}
			} else this.setChecked(!this.checked)
		} else this.setChecked(!this.checked);
		this.fire("click");
		var A = this.getTopMenu();
		if (A) A._OnItemClick(this, D)
	},
	X0i: function(_) {
		if (this[BUK]()) return;
		if (this.ownerMenu) {
			var $ = this;
			setTimeout(function() {
				if ($[F9lZ]()) $.ownerMenu.showItemMenu($)
			},
			1)
		}
	},
	J6I: function($) {
		if (this[BUK]()) return;
		_I(this.el, this._hoverCls);
		if (this.ownerMenu) if (this.ownerMenu.isVertical() == true) this.ownerMenu.showItemMenu(this);
		else if (this.ownerMenu.hasShowItemMenu()) this.ownerMenu.showItemMenu(this)
	},
	DtkD: function($) {
		Kw(this.el, this._hoverCls)
	},
	onClick: function(_, $) {
		this.on("click", _, $)
	},
	onCheckedChanged: function(_, $) {
		this.on("checkedchanged", _, $)
	},
	getAttrs: function($) {
		var A = UgP[CPy][YIb][KQk](this, $),
		_ = jQuery($);
		A.text = $.innerHTML;
		zmj[W5cB]($, A, ["text", "iconCls", "iconStyle", "iconPosition", "groupName", "onclick", "oncheckedchanged"]);
		zmj[D4q]($, A, ["checkOnClick", "checked"]);
		return A
	}
});
Cmk(UgP, "menuitem");
Idm = function() {
	this.Zn7();
	Idm[CPy][CLu][KQk](this)
};
HX_P(Idm, ET, {
	width: 180,
	activeIndex: -1,
	autoCollapse: false,
	groupCls: "",
	groupStyle: "",
	groupHeaderCls: "",
	groupHeaderStyle: "",
	groupBodyCls: "",
	groupBodyStyle: "",
	groupHoverCls: "",
	groupActiveCls: "",
	allowAnim: true,
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = this.YA6;
		this.YA6 = false;
		var _ = A.activeIndex;
		delete A.activeIndex;
		Idm[CPy].set[KQk](this, A);
		if (zmj.isNumber(_)) this.setActiveIndex(_);
		this.YA6 = $;
		this[X5Q]();
		return this
	},
	uiCls: "zmj-outlookbar",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-outlookbar";
		this.el.innerHTML = "<div class=\"zmj-outlookbar-border\"></div>";
		this.AE = this.el.firstChild
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(this.el, "click", this.PSN, this)
		},
		this)
	},
	_j0: function($) {
		return this.uid + "$" + $._id
	},
	_GroupId: 1,
	Zn7: function() {
		this.groups = []
	},
	RK8: function(_) {
		var H = this._j0(_),
		G = "<div id=\"" + H + "\" class=\"zmj-outlookbar-group " + _.cls + "\" style=\"" + _.style + "\">" + "<div class=\"zmj-outlookbar-groupHeader " + _.headerCls + "\" style=\"" + _.headerStyle + ";\"></div>" + "<div class=\"zmj-outlookbar-groupBody " + _.bodyCls + "\" style=\"" + _.bodyStyle + ";\"></div>" + "</div>",
		A = zmj.append(this.AE, G),
		E = A.lastChild,
		C = _.body;
		delete _.body;
		if (C) {
			if (!zmj.isArray(C)) C = [C];
			for (var $ = 0, F = C.length; $ < F; $++) {
				var B = C[$];
				zmj.append(E, B)
			}
			C.length = 0
		}
		if (_.bodyParent) {
			var D = _.bodyParent;
			while (D.firstChild) E.appendChild(D.firstChild)
		}
		delete _.bodyParent;
		return A
	},
	createGroup: function(_) {
		var $ = zmj.copyTo({
			_id: this._GroupId++,
			name: "",
			title: "",
			cls: "",
			style: "",
			iconCls: "",
			iconStyle: "",
			headerCls: "",
			headerStyle: "",
			bodyCls: "",
			bodyStyle: "",
			visible: true,
			enabled: true,
			showCollapseButton: true,
			expanded: true
		},
		_);
		return $
	},
	setGroups: function(_) {
		if (!zmj.isArray(_)) return;
		this.removeAll();
		for (var $ = 0, A = _.length; $ < A; $++) this.addGroup(_[$])
	},
	getGroups: function() {
		return this.groups
	},
	addGroup: function(_, $) {
		if (typeof _ == "string") _ = {
			title: _
		};
		_ = this.createGroup(_);
		if (typeof $ != "number") $ = this.groups.length;
		this.groups.insert($, _);
		var B = this.RK8(_);
		_._el = B;
		var $ = this.groups.indexOf(_),
		A = this.groups[$ + 1];
		if (A) {
			var C = this.getGroupEl(A);
			jQuery(C).before(B)
		}
		this[J_w]();
		return _
	},
	updateGroup: function($, _) {
		var $ = this.getGroup($);
		if (!$) return;
		zmj.copyTo($, _);
		this[J_w]()
	},
	removeGroup: function($) {
		$ = this.getGroup($);
		if (!$) return;
		var _ = this.getGroupEl($);
		if (_) _.parentNode.removeChild(_);
		this.groups.remove($);
		this[J_w]()
	},
	removeAll: function() {
		for (var $ = this.groups.length - 1; $ >= 0; $--) this.removeGroup($)
	},
	moveGroup: function(_, $) {
		_ = this.getGroup(_);
		if (!_) return;
		target = this.getGroup($);
		var A = this.getGroupEl(_);
		this.groups.remove(_);
		if (target) {
			$ = this.groups.indexOf(target);
			this.groups.insert($, _);
			var B = this.getGroupEl(target);
			jQuery(B).before(A)
		} else {
			this.groups.add(_);
			this.AE.appendChild(A)
		}
		this[J_w]()
	},
	doUpdate: function() {
		for (var _ = 0, E = this.groups.length; _ < E; _++) {
			var A = this.groups[_],
			B = A._el,
			D = B.firstChild,
			C = B.lastChild,
			$ = "<div class=\"zmj-outlookbar-icon " + A.iconCls + "\" style=\"" + A[Sz] + ";\"></div>",
			F = "<div class=\"zmj-tools\"><span class=\"zmj-tools-collapse\"></span></div>" + ((A[Sz] || A.iconCls) ? $: "") + "<div class=\"zmj-outlookbar-groupTitle\">" + A.title + "</div><div style=\"clear:both;\"></div>";
			D.innerHTML = F;
			if (A.enabled) Kw(B, "zmj-disabled");
			else _I(B, "zmj-disabled");
			_I(B, A.cls);
			DTHl(B, A.style);
			_I(C, A.bodyCls);
			DTHl(C, A.bodyStyle);
			_I(D, A.headerCls);
			DTHl(D, A.headerStyle);
			Kw(B, "zmj-outlookbar-firstGroup");
			Kw(B, "zmj-outlookbar-lastGroup");
			if (_ == 0) _I(B, "zmj-outlookbar-firstGroup");
			if (_ == E - 1) _I(B, "zmj-outlookbar-lastGroup")
		}
		this[X5Q]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		if (this.AYic) return;
		this.Bor();
		for (var $ = 0, H = this.groups.length; $ < H; $++) {
			var _ = this.groups[$],
			B = _._el,
			D = B.lastChild;
			if (_.expanded) {
				_I(B, "zmj-outlookbar-expand");
				Kw(B, "zmj-outlookbar-collapse")
			} else {
				Kw(B, "zmj-outlookbar-expand");
				_I(B, "zmj-outlookbar-collapse")
			}
			D.style.height = "auto";
			D.style.display = _.expanded ? "block": "none";
			B.style.display = _.visible ? "": "none";
			var A = F$u(B, true),
			E = UwK(D),
			G = WN(D);
			if (jQuery.boxModel) A = A - E.left - E.right - G.left - G.right;
			D.style.width = A + "px"
		}
		var F = this[Uw](),
		C = this.getActiveGroup();
		if (!F && this[TgO] && C) {
			B = this.getGroupEl(this.activeIndex);
			B.lastChild.style.height = this.RqRd() + "px"
		}
		zmj.layout(this.AE)
	},
	Bor: function() {
		if (this[Uw]()) this.AE.style.height = "auto";
		else {
			var $ = this[KjJg](true);
			if (!jQuery.boxModel) {
				var _ = WN(this.AE);
				$ = $ + _.top + _.bottom
			}
			if ($ < 0) $ = 0;
			this.AE.style.height = $ + "px"
		}
	},
	RqRd: function() {
		var C = jQuery(this.el).height(),
		K = WN(this.AE);
		C = C - K.top - K.bottom;
		var A = this.getActiveGroup(),
		E = 0;
		for (var F = 0, D = this.groups.length; F < D; F++) {
			var _ = this.groups[F],
			G = this.getGroupEl(_);
			if (_.visible == false || _ == A) continue;
			var $ = G.lastChild.style.display;
			G.lastChild.style.display = "none";
			var J = jQuery(G).outerHeight();
			G.lastChild.style.display = $;
			var L = Jfu(G);
			J = J + L.top + L.bottom;
			E += J
		}
		C = C - E;
		var H = this.getGroupEl(this.activeIndex);
		C = C - jQuery(H.firstChild).outerHeight();
		if (jQuery.boxModel) {
			var B = UwK(H.lastChild),
			I = WN(H.lastChild);
			C = C - B.top - B.bottom - I.top - I.bottom
		}
		B = UwK(H),
		I = WN(H),
		L = Jfu(H);
		C = C - L.top - L.bottom;
		C = C - B.top - B.bottom - I.top - I.bottom;
		if (C < 0) C = 0;
		return C
	},
	getGroup: function($) {
		if (typeof $ == "object") return $;
		if (typeof $ == "number") return this.groups[$];
		else for (var _ = 0, B = this.groups.length; _ < B; _++) {
			var A = this.groups[_];
			if (A.name == $) return A
		}
	},
	WpL: function(B) {
		for (var $ = 0, A = this.groups.length; $ < A; $++) {
			var _ = this.groups[$];
			if (_._id == B) return _
		}
	},
	getGroupEl: function($) {
		var _ = this.getGroup($);
		if (!_) return null;
		return _._el
	},
	getGroupBodyEl: function($) {
		var _ = this.getGroupEl($);
		if (_) return _.lastChild;
		return null
	},
	setAutoCollapse: function($) {
		this[TgO] = $
	},
	getAutoCollapse: function() {
		return this[TgO]
	},
	setActiveIndex: function(_) {
		var $ = this.getGroup(_),
		A = this.getGroup(this.activeIndex),
		B = $ != A;
		if ($) this.activeIndex = this.groups.indexOf($);
		else this.activeIndex = -1;
		$ = this.getGroup(this.activeIndex);
		if ($) {
			var C = this.allowAnim;
			this.allowAnim = false;
			this.expandGroup($);
			this.allowAnim = C
		}
	},
	getActiveIndex: function() {
		return this.activeIndex
	},
	getActiveGroup: function() {
		return this.getGroup(this.activeIndex)
	},
	showGroup: function($) {
		$ = this.getGroup($);
		if (!$ || $.visible == true) return;
		$.visible = true;
		this[J_w]()
	},
	hideGroup: function($) {
		$ = this.getGroup($);
		if (!$ || $.visible == false) return;
		$.visible = false;
		this[J_w]()
	},
	toggleGroup: function($) {
		$ = this.getGroup($);
		if (!$) return;
		if ($.expanded) this.collapseGroup($);
		else this.expandGroup($)
	},
	collapseGroup: function(_) {
		_ = this.getGroup(_);
		if (!_) return;
		var D = _.expanded,
		E = 0;
		if (this[TgO] && !this[Uw]()) E = this.RqRd();
		var F = false;
		_.expanded = false;
		var $ = this.groups.indexOf(_);
		if ($ == this.activeIndex) {
			this.activeIndex = -1;
			F = true
		}
		var C = this.getGroupBodyEl(_);
		if (this.allowAnim && D) {
			this.AYic = true;
			C.style.display = "block";
			C.style.height = "auto";
			if (this[TgO] && !this[Uw]()) C.style.height = E + "px";
			var A = {
				height: "1px"
			};
			_I(C, "zmj-outlookbar-overflow");
			var B = this,
			H = jQuery(C);
			H.animate(A, 180,
			function() {
				B.AYic = false;
				Kw(C, "zmj-outlookbar-overflow");
				B[X5Q]()
			})
		} else this[X5Q]();
		var G = {
			group: _,
			index: this.groups.indexOf(_),
			name: _.name
		};
		this.fire("Collapse", G);
		if (F) this.fire("activechanged")
	},
	expandGroup: function($) {
		$ = this.getGroup($);
		if (!$) return;
		var H = $.expanded;
		$.expanded = true;
		this.activeIndex = this.groups.indexOf($);
		fire = true;
		if (this[TgO]) for (var D = 0, B = this.groups.length; D < B; D++) {
			var C = this.groups[D];
			if (C.expanded && C != $) this.collapseGroup(C)
		}
		var G = this.getGroupBodyEl($);
		if (this.allowAnim && H == false) {
			this.AYic = true;
			G.style.display = "block";
			if (this[TgO] && !this[Uw]()) {
				var A = this.RqRd();
				G.style.height = (A) + "px"
			} else G.style.height = "auto";
			var _ = $L7(G);
			G.style.height = "1px";
			var E = {
				height: _ + "px"
			},
			I = G.style.overflow;
			G.style.overflow = "hidden";
			_I(G, "zmj-outlookbar-overflow");
			var F = this,
			K = jQuery(G);
			K.animate(E, 180,
			function() {
				G.style.overflow = I;
				Kw(G, "zmj-outlookbar-overflow");
				F.AYic = false;
				F[X5Q]()
			})
		} else this[X5Q]();
		var J = {
			group: $,
			index: this.groups.indexOf($),
			name: $.name
		};
		this.fire("Expand", J);
		if (fire) this.fire("activechanged")
	},
	TKz: function($) {
		$ = this.getGroup($);
		var _ = {
			group: $,
			groupIndex: this.groups.indexOf($),
			groupName: $.name,
			cancel: false
		};
		if ($.expanded) {
			this.fire("BeforeCollapse", _);
			if (_.cancel == false) this.collapseGroup($)
		} else {
			this.fire("BeforeExpand", _);
			if (_.cancel == false) this.expandGroup($)
		}
	},
	UGz: function(B) {
		var _ = J6j(B.target, "zmj-outlookbar-group");
		if (!_) return null;
		var $ = _.id.split("$"),
		A = $[$.length - 1];
		return this.WpL(A)
	},
	PSN: function(A) {
		if (this.AYic) return;
		var _ = J6j(A.target, "zmj-outlookbar-groupHeader");
		if (!_) return;
		var $ = this.UGz(A);
		if (!$) return;
		this.TKz($)
	},
	parseGroups: function(D) {
		var A = [];
		for (var $ = 0, C = D.length; $ < C; $++) {
			var B = D[$],
			_ = {};
			A.push(_);
			_.style = B.style.cssText;
			zmj[W5cB](B, _, ["name", "title", "cls", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle"]);
			zmj[D4q](B, _, ["visible", "enabled", "showCollapseButton", "expanded"]);
			_.bodyParent = B
		}
		return A
	},
	getAttrs: function($) {
		var A = Idm[CPy][YIb][KQk](this, $);
		zmj[W5cB]($, A, ["onactivechanged", "oncollapse", "onexpand"]);
		zmj[D4q]($, A, ["autoCollapse", "allowAnim"]);
		zmj[PI]($, A, ["activeIndex"]);
		var _ = zmj[P8pq]($);
		A.groups = this.parseGroups(_);
		return A
	}
});
Cmk(Idm, "outlookbar");
Dl9 = function() {
	Dl9[CPy][CLu][KQk](this);
	this.data = []
};
HX_P(Dl9, Idm, {
	url: "",
	textField: "text",
	iconField: "iconCls",
	urlField: "url",
	resultAsTree: false,
	itemsField: "children",
	idField: "id",
	parentField: "pid",
	style: "width:100%;height:100%;",
	set: function(_) {
		if (typeof _ == "string") return this;
		var A = _.url;
		delete _.url;
		var $ = _.activeIndex;
		delete _.activeIndex;
		Dl9[CPy].set[KQk](this, _);
		if (A) this.setUrl(A);
		if (zmj.isNumber($)) this.setActiveIndex($);
		return this
	},
	uiCls: "zmj-outlookmenu",
	destroy: function(B) {
		if (this.Fz) {
			var _ = this.Fz.clone();
			for (var $ = 0, C = _.length; $ < C; $++) {
				var A = _[$];
				A[Wsj]()
			}
			this.Fz.length = 0
		}
		Dl9[CPy][Wsj][KQk](this, B)
	},
	Vu: function() {
		var B = zmj.getData(this.url);
		if (!B) B = [];
		if (this[RLR] == false) B = zmj.arrayToTree(B, this.itemsField, this.idField, this[UOB]);
		var _ = zmj[Zk](B, this.itemsField, this.idField, this[UOB]);
		for (var A = 0, C = _.length; A < C; A++) {
			var $ = _[A];
			$.text = $[this.textField];
			$.url = $[this.urlField];
			$.iconCls = $[this.iconField]
		}
		this.createNavBarMenu(B);
		this.fire("load")
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this.createNavBarMenu($)
	},
	setUrl: function($) {
		this.url = $;
		this.Vu()
	},
	getUrl: function() {
		return this.url
	},
	setTextField: function($) {
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	setIconField: function($) {
		this.iconField = $
	},
	getIconField: function() {
		return this.iconField
	},
	setUrlField: function($) {
		this[BCm] = $
	},
	getUrlField: function() {
		return this[BCm]
	},
	setResultAsTree: function($) {
		this[RLR] = $
	},
	getResultAsTree: function() {
		return this[RLR]
	},
	setNodesField: function($) {
		this.nodesField = $
	},
	getNodesField: function() {
		return this.nodesField
	},
	setIdField: function($) {
		this[Ga3p] = $
	},
	getIdField: function() {
		return this[Ga3p]
	},
	setParentField: function($) {
		this[UOB] = $
	},
	getParentField: function() {
		return this[UOB]
	},
	A3: null,
	getSelected: function() {
		return this.A3
	},
	getAttrs: function($) {
		var _ = Dl9[CPy][YIb][KQk](this, $);
		_.text = $.innerHTML;
		zmj[W5cB]($, _, ["url", "textField", "urlField", "idField", "parentField", "itemsField", "iconField", "onitemclick", "onitemselect"]);
		zmj[D4q]($, _, ["resultAsTree"]);
		return _
	},
	autoCollapse: true,
	activeIndex: 0,
	createNavBarMenu: function(D) {
		if (!zmj.isArray(D)) D = [];
		this.data = D;
		var B = [];
		for (var _ = 0, E = this.data.length; _ < E; _++) {
			var $ = this.data[_],
			A = {};
			A.title = $.text;
			A.titleCls = $.iconCls;
			B.push(A);
			A._children = $[this.itemsField]
		}
		this.setGroups(B);
		this.setActiveIndex(this.activeIndex);
		this.Fz = [];
		for (_ = 0, E = this.groups.length; _ < E; _++) {
			var A = this.groups[_],
			C = this.getGroupBodyEl(A),
			F = new AVd();
			F.set({
				style: "width:100%;height:100%;border:0;background:none",
				allowSelectItem: true,
				items: A._children
			});
			F[_B9](C);
			F.on("itemclick", this.U7, this);
			F.on("itemselect", this.DJ, this);
			this.Fz.push(F);
			delete A._children
		}
	},
	U7: function(_) {
		var $ = {
			item: _.item,
			htmlEvent: _.htmlEvent
		};
		this.fire("itemclick", $)
	},
	DJ: function(C) {
		if (!C.item) return;
		for (var $ = 0, A = this.Fz.length; $ < A; $++) {
			var B = this.Fz[$];
			if (B != C.sender) B.setSelectedItem(null)
		}
		var _ = {
			item: C.item,
			htmlEvent: C.htmlEvent
		};
		this.A3 = C.item;
		this.fire("itemselect", _)
	}
});
Cmk(Dl9, "outlookmenu");
T03 = function() {
	T03[CPy][CLu][KQk](this);
	this.data = []
};
HX_P(T03, Idm, {
	url: "",
	textField: "text",
	iconField: "iconCls",
	urlField: "url",
	resultAsTree: false,
	nodesField: "children",
	idField: "id",
	parentField: "pid",
	style: "width:100%;height:100%;",
	set: function(_) {
		if (typeof _ == "string") return this;
		var A = _.url;
		delete _.url;
		var $ = _.activeIndex;
		delete _.activeIndex;
		T03[CPy].set[KQk](this, _);
		if (A) this.setUrl(A);
		if (zmj.isNumber($)) this.setActiveIndex($);
		return this
	},
	uiCls: "zmj-outlooktree",
	destroy: function(B) {
		if (this.RZ$) {
			var _ = this.RZ$.clone();
			for (var $ = 0, C = _.length; $ < C; $++) {
				var A = _[$];
				A[Wsj]()
			}
			this.RZ$.length = 0
		}
		T03[CPy][Wsj][KQk](this, B)
	},
	Vu: function() {
		var B = zmj.getData(this.url);
		if (!B) B = [];
		if (this[RLR] == false) B = zmj.arrayToTree(B, this.nodesField, this.idField, this[UOB]);
		var _ = zmj[Zk](B, this.nodesField, this.idField, this[UOB]);
		for (var A = 0, C = _.length; A < C; A++) {
			var $ = _[A];
			$.text = $[this.textField];
			$.url = $[this.urlField];
			$.iconCls = $[this.iconField]
		}
		this.createNavBarTree(B);
		this.fire("load")
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this.createNavBarTree($)
	},
	setUrl: function($) {
		this.url = $;
		this.Vu()
	},
	getUrl: function() {
		return this.url
	},
	setTextField: function($) {
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	setIconField: function($) {
		this.iconField = $
	},
	getIconField: function() {
		return this.iconField
	},
	setUrlField: function($) {
		this[BCm] = $
	},
	getUrlField: function() {
		return this[BCm]
	},
	setResultAsTree: function($) {
		this[RLR] = $
	},
	getResultAsTree: function() {
		return this[RLR]
	},
	setNodesField: function($) {
		this.nodesField = $
	},
	getNodesField: function() {
		return this.nodesField
	},
	setIdField: function($) {
		this[Ga3p] = $
	},
	getIdField: function() {
		return this[Ga3p]
	},
	setParentField: function($) {
		this[UOB] = $
	},
	getParentField: function() {
		return this[UOB]
	},
	A3: null,
	getSelected: function() {
		return this.A3
	},
	selectNode: function(_) {
		_ = this[AK85](_);
		if (!_) return;
		var $ = this._getOwnerTree(_);
		$.selectNode(_)
	},
	expandPath: function(_) {
		_ = this[AK85](_);
		if (!_) return;
		var $ = this._getOwnerTree(_);
		$.expandPath(_);
		this.expandGroup($._ownerGroup)
	},
	getNode: function(A) {
		for (var $ = 0, C = this.RZ$.length; $ < C; $++) {
			var _ = this.RZ$[$],
			B = _[AK85](A);
			if (B) return B
		}
		return null
	},
	_getOwnerTree: function(A) {
		if (!A) return;
		for (var $ = 0, B = this.RZ$.length; $ < B; $++) {
			var _ = this.RZ$[$];
			if (_.Zov[A._id]) return _
		}
	},
	expandOnLoad: false,
	setExpandOnLoad: function($) {
		this.expandOnLoad = $
	},
	getExpandOnLoad: function() {
		return this.expandOnLoad
	},
	getAttrs: function(_) {
		var A = T03[CPy][YIb][KQk](this, _);
		A.text = _.innerHTML;
		zmj[W5cB](_, A, ["url", "textField", "urlField", "idField", "parentField", "nodesField", "iconField", "onnodeclick", "onnodeselect", "onnodemousedown", "expandOnLoad"]);
		zmj[D4q](_, A, ["resultAsTree"]);
		if (A.expandOnLoad) {
			var $ = parseInt(A.expandOnLoad);
			if (zmj.isNumber($)) A.expandOnLoad = $;
			else A.expandOnLoad = A.expandOnLoad == "true" ? true: false
		}
		return A
	},
	autoCollapse: true,
	activeIndex: 0,
	createNavBarTree: function(D) {
		if (!zmj.isArray(D)) D = [];
		this.data = D;
		var B = [];
		for (var _ = 0, E = this.data.length; _ < E; _++) {
			var $ = this.data[_],
			A = {};
			A.title = $.text;
			A.titleCls = $.iconCls;
			B.push(A);
			A._children = $[this.nodesField]
		}
		this.setGroups(B);
		this.setActiveIndex(this.activeIndex);
		this.RZ$ = [];
		for (_ = 0, E = this.groups.length; _ < E; _++) {
			var A = this.groups[_],
			C = this.getGroupBodyEl(A),
			D = new NR();
			D.set({
				expandOnLoad: this.expandOnLoad,
				showTreeIcon: true,
				style: "width:100%;height:100%;border:0;background:none",
				data: A._children
			});
			D[_B9](C);
			D.on("nodeclick", this.A5u8, this);
			D.on("nodeselect", this.XXz, this);
			D.on("nodemousedown", this.__OnNodeMouseDown, this);
			this.RZ$.push(D);
			delete A._children;
			D._ownerGroup = A
		}
	},
	__OnNodeMouseDown: function(_) {
		var $ = {
			node: _.node,
			isLeaf: _.sender.isLeaf(_.node),
			htmlEvent: _.htmlEvent
		};
		this.fire("nodemousedown", $)
	},
	A5u8: function(_) {
		var $ = {
			node: _.node,
			isLeaf: _.sender.isLeaf(_.node),
			htmlEvent: _.htmlEvent
		};
		this.fire("nodeclick", $)
	},
	XXz: function(C) {
		if (!C.node) return;
		for (var $ = 0, B = this.RZ$.length; $ < B; $++) {
			var A = this.RZ$[$];
			if (A != C.sender) A.selectNode(null)
		}
		var _ = {
			node: C.node,
			isLeaf: C.sender.isLeaf(C.node),
			htmlEvent: C.htmlEvent
		};
		this.A3 = C.node;
		this.fire("nodeselect", _)
	}
});
Cmk(T03, "outlooktree");
zmj.NavBar = function() {
	zmj.NavBar[CPy][CLu][KQk](this)
};
HX_P(zmj.NavBar, Idm, {
	uiCls: "zmj-navbar"
});
Cmk(zmj.NavBar, "navbar");
zmj.NavBarMenu = function() {
	zmj.NavBarMenu[CPy][CLu][KQk](this)
};
HX_P(zmj.NavBarMenu, Dl9, {
	uiCls: "zmj-navbarmenu"
});
Cmk(zmj.NavBarMenu, "navbarmenu");
zmj.NavBarTree = function() {
	zmj.NavBarTree[CPy][CLu][KQk](this)
};
HX_P(zmj.NavBarTree, T03, {
	uiCls: "zmj-navbartree"
});
Cmk(zmj.NavBarTree, "navbartree");
zmj.ToolBar = function() {
	zmj.ToolBar[CPy][CLu][KQk](this)
};
HX_P(zmj.ToolBar, ET, {
	_clearBorder: false,
	style: "",
	uiCls: "zmj-toolbar",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-toolbar"
	},
	_initEvents: function() {},
	doLayout: function() {
		if (!this.canLayout()) return;
		var A = zmj[P8pq](this.el, true);
		for (var $ = 0, _ = A.length; $ < _; $++) zmj.layout(A[$])
	},
	set_bodyParent: function($) {
		if (!$) return;
		this.el = $;
		this[X5Q]()
	},
	getAttrs: function($) {
		var _ = {};
		zmj[W5cB]($, _, ["id", "borderStyle"]);
		this.el = $;
		this.el.uid = this.uid;
		return _
	}
});
Cmk(zmj.ToolBar, "toolbar");
NR = function($) {
	this._ajaxOption = {
		async: false,
		type: "get"
	};
	this.root = {
		_id: -1,
		_pid: "",
		_level: -1
	};
	this.data = this.root[this.nodesField] = [];
	this.Zov = {};
	this.Br = {};
	this._viewNodes = null;
	NR[CPy][CLu][KQk](this, $);
	this.on("beforeexpand",
	function(B) {
		var $ = B.node,
		A = this.isLeaf($),
		_ = $[this.nodesField];
		if (!A && (!_ || _.length == 0)) {
			B.cancel = true;
			this.loadNode($)
		}
	},
	this);
	this[J_w]()
};
NR.NodeUID = 1;
var lastNodeLevel = [];
HX_P(NR, ET, {
	isTree: true,
	C1Q: "block",
	removeOnCollapse: true,
	expandOnDblClick: true,
	value: "",
	$VS: null,
	allowSelect: true,
	showCheckBox: false,
	showFolderCheckBox: true,
	showExpandButtons: true,
	enableHotTrack: true,
	showArrow: false,
	expandOnLoad: false,
	delimiter: ",",
	url: "",
	root: null,
	resultAsTree: true,
	parentField: "pid",
	idField: "id",
	textField: "text",
	iconField: "iconCls",
	nodesField: "children",
	showTreeIcon: false,
	showTreeLines: true,
	checkRecursive: false,
	allowAnim: true,
	Nli: "zmj-tree-checkbox",
	K0kv: "zmj-tree-selectedNode",
	Gwd2: "zmj-tree-node-hover",
	leafIcon: "zmj-tree-leaf",
	folderIcon: "zmj-tree-folder",
	OHOe: "zmj-tree-border",
	$RgL: "zmj-tree-header",
	PBb: "zmj-tree-body",
	KyE: "zmj-tree-node",
	KE: "zmj-tree-nodes",
	XO: "zmj-tree-expand",
	VEhc: "zmj-tree-collapse",
	HdK: "zmj-tree-node-ecicon",
	WWiL: "zmj-tree-nodeshow",
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = A.value;
		delete A.value;
		var B = A.url;
		delete A.url;
		var _ = A.data;
		delete A.data;
		NR[CPy].set[KQk](this, A);
		if (!zmj.isNull(_)) this[Uj](_);
		if (!zmj.isNull(B)) this.setUrl(B);
		if (!zmj.isNull($)) this[NHk2]($);
		return this
	},
	uiCls: "zmj-tree",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-tree";
		if (this[YSY] == true) _I(this.el, "zmj-tree-treeLine");
		this.el.style.display = "block";
		this.AE = zmj.append(this.el, "<div class=\"" + this.OHOe + "\">" + "<div class=\"" + this.$RgL + "\"></div><div class=\"" + this.PBb + "\"></div></div>");
		this.Kz = this.AE.childNodes[0];
		this.VC5 = this.AE.childNodes[1];
		this._DragDrop = new _Ta(this)
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(this.el, "click", this.PSN, this);
			WoBw(this.el, "dblclick", this.QMh, this);
			WoBw(this.el, "mousedown", this.P4, this);
			WoBw(this.el, "mousemove", this.Vqc, this);
			WoBw(this.el, "mouseout", this.DtkD, this)
		},
		this)
	},
	load: function($) {
		if (typeof $ == "string") {
			this.url = $;
			this.Vu({},
			this.root)
		} else this[Uj]($)
	},
	setData: function($) {
		this[YIu]($);
		this.data = $;
		this._cellErrors = [];
		this._cellMapErrors = {}
	},
	getData: function() {
		return this.data
	},
	toArray: function() {
		return this.getList()
	},
	getList: function() {
		if (!this.BpK) {
			this.BpK = zmj[Zk](this.root[this.nodesField], this.nodesField, this.idField, this.parentField, "-1");
			this._indexs = {};
			for (var $ = 0, A = this.BpK.length; $ < A; $++) {
				var _ = this.BpK[$];
				this._indexs[_[this.idField]] = $
			}
		}
		return this.BpK
	},
	_clearTree: function() {
		this.BpK = null;
		this._indexs = null
	},
	loadData: function($) {
		if (!zmj.isArray($)) $ = [];
		this.root[this.nodesField] = $;
		this.H62(this.root, null);
		this.cascadeChild(this.root,
		function(_) {
			if (zmj.isNull(_.expanded)) {
				var $ = this.getLevel(_);
				if (this.expandOnLoad === true || (zmj.isNumber(this.expandOnLoad) && $ <= this.expandOnLoad)) _.expanded = true;
				else _.expanded = false
			}
		},
		this);
		this._viewNodes = null;
		this[J_w]()
	},
	clearData: function() {
		this[YIu]([])
	},
	setUrl: function($) {
		this.url = $;
		this.load($)
	},
	getUrl: function() {
		return this.url
	},
	loadNode: function(C, $) {
		C = this[AK85](C);
		if (!C) return;
		if (this.isLeaf(C)) return;
		var B = {};
		B[this.idField] = this[_p](C);
		var _ = this;
		_[GJ$](C, "zmj-tree-loading");
		var D = this._ajaxOption.async;
		this._ajaxOption.async = true;
		var A = new Date();
		this.Vu(B, C,
		function(B) {
			var E = new Date() - A;
			if (E < 60) E = 60 - E;
			setTimeout(function() {
				_._ajaxOption.async = D;
				_[_k_](C, "zmj-tree-loading");
				_.removeNodes(C[_.nodesField]);
				if (B && B.length > 0) {
					_.addNodes(B, C);
					if ($ !== false) _[Mwv](C, true);
					else _[VCH](C, true);
					_.fire("loadnode")
				} else {
					delete C.isLeaf;
					_.Iq1L(C)
				}
			},
			E)
		},
		function($) {
			_[_k_](C, "zmj-tree-loading")
		});
		this.ajaxAsync = false
	},
	_ajaxOption: {
		async: false,
		type: "get"
	},
	setAjaxOption: function($) {
		zmj.copyTo(this._ajaxOption, $)
	},
	getAjaxOption: function($) {
		return this._ajaxOption
	},
	Vu: function(_, A, B, C) {
		var E = A == this.root,
		D = {
			url: this.url,
			async: this._ajaxOption.async,
			type: this._ajaxOption.type,
			params: _,
			cancel: false,
			node: A,
			isRoot: E
		};
		this.fire("beforeload", D);
		if (D.cancel == true) return;
		if (A != this.root);
		var $ = this;
		this.CqP = jQuery.ajax({
			url: D.url,
			async: D.async,
			data: D.params,
			type: D.type,
			cache: false,
			dataType: "text",
			success: function(D, C, _) {
				var F = null;
				try {
					F = zmj.decode(D)
				} catch(G) {
					F = [];
					throw new Error("tree json is error!")
				}
				var G = {
					result: F,
					data: F,
					cancel: false,
					node: A
				};
				if ($[RLR] == false) G.data = zmj.arrayToTree(G.data, $.nodesField, $.idField, $[UOB]);
				$.fire("preload", G);
				if (G.cancel == true) return;
				if (E) $[Uj](G.data);
				if (B) B(G.data);
				$.fire("load", G)
			},
			error: function(_, B, A) {
				var D = {
					xmlHttp: _,
					errorCode: B
				};
				if (C) C(D);
				$.fire("loaderror", D)
			}
		})
	},
	getItemValue: function($) {
		if (!$) return "";
		var _ = $[this.idField];
		return zmj.isNull(_) ? "": String(_)
	},
	getItemText: function($) {
		if (!$) return "";
		var _ = $[this.textField];
		return zmj.isNull(_) ? "": String(_)
	},
	YN9m: function($) {
		var B = this[D6e];
		if (B && this.hasChildren($)) B = this[CTa];
		var _ = this[RZH1]($),
		A = {
			isLeaf: this.isLeaf($),
			node: $,
			nodeHtml: _,
			nodeCls: "",
			nodeStyle: "",
			showCheckBox: B,
			iconCls: this.getNodeIcon($),
			showTreeIcon: this.showTreeIcon
		};
		this.fire("drawnode", A);
		if (A.nodeHtml === null || A.nodeHtml === undefined || A.nodeHtml === "") A.nodeHtml = "&nbsp;";
		return A
	},
	BsM: function(D, P, H) {
		var O = !H;
		if (!H) H = [];
		var K = D[this.textField];
		if (K === null || K === undefined) K = "";
		var M = this.isLeaf(D),
		$ = this.getLevel(D),
		Q = this.YN9m(D),
		E = Q.nodeCls;
		if (!M) E = this.isExpandedNode(D) ? this.XO: this.VEhc;
		if (this.$VS == D) E += " " + this.K0kv;
		var F = this[P8pq](D),
		I = F && F.length > 0;
		H[H.length] = "<div class=\"zmj-tree-nodetitle " + E + "\" style=\"" + Q.nodeStyle + "\">";
		var A = this[_$JS](D),
		_ = 0;
		for (var J = _; J <= $; J++) {
			if (J == $) continue;
			if (M) if (this[CiD3] == false && J >= $ - 1) continue;
			var L = "";
			if (this._isInViewLastNode(D, J)) L = "background:none";
			H[H.length] = "<span class=\"zmj-tree-indent \" style=\"" + L + "\"></span>"
		}
		var C = "";
		if (this._isViewFirstNode(D)) C = "zmj-tree-node-ecicon-first";
		else if (this._isViewLastNode(D)) C = "zmj-tree-node-ecicon-last";
		if (this._isViewFirstNode(D) && this._isViewLastNode(D)) C = "zmj-tree-node-ecicon-last";
		if (!M) H[H.length] = "<a class=\"" + this.HdK + " " + C + "\" style=\"" + (this[CiD3] ? "": "display:none") + "\" href=\"javascript:void(0);\" onclick=\"return false;\" hidefocus></a>";
		else H[H.length] = "<span class=\"" + this.HdK + " " + C + "\" ></span>";
		H[H.length] = "<span class=\"zmj-tree-nodeshow\">";
		if (Q[ZRq]) H[H.length] = "<span class=\"" + Q.iconCls + " zmj-tree-icon\"></span>";
		if (Q[D6e]) {
			var G = this.MnVL(D),
			N = this.isCheckedNode(D);
			H[H.length] = "<input type=\"checkbox\" id=\"" + G + "\" class=\"" + this.Nli + "\" hidefocus " + (N ? "checked": "") + "/>"
		}
		H[H.length] = "<span class=\"zmj-tree-nodetext\">";
		if (P) {
			var B = this.uid + "$edit$" + D._id,
			K = D[this.textField];
			if (K === null || K === undefined) K = "";
			H[H.length] = "<input id=\"" + B + "\" type=\"text\" class=\"zmj-tree-editinput\" value=\"" + K + "\"/>"
		} else H[H.length] = Q.nodeHtml;
		H[H.length] = "</span>";
		H[H.length] = "</span>";
		H[H.length] = "</div>";
		if (O) return H.join("")
	},
	JZfr: function(A, D) {
		var C = !D;
		if (!D) D = [];
		if (!A) return "";
		var _ = this.K99(A),
		$ = this.isVisibleNode(A) ? "": "display:none";
		D[D.length] = "<div id=\"";
		D[D.length] = _;
		D[D.length] = "\" class=\"";
		D[D.length] = this.KyE;
		D[D.length] = "\" style=\"";
		D[D.length] = $;
		D[D.length] = "\">";
		this.BsM(A, false, D);
		var B = this._getViewChildNodes(A);
		if (B) if (this.removeOnCollapse && this.isExpandedNode(A)) this.Oje(B, A, D);
		D[D.length] = "</div>";
		if (C) return D.join("")
	},
	Oje: function(F, B, G) {
		var E = !G;
		if (!G) G = [];
		if (!F) return "";
		var C = this.Z0Yo(B),
		$ = this.isExpandedNode(B) ? "": "display:none";
		G[G.length] = "<div id=\"";
		G[G.length] = C;
		G[G.length] = "\" class=\"";
		G[G.length] = this.KE;
		G[G.length] = "\" style=\"";
		G[G.length] = $;
		G[G.length] = "\">";
		for (var _ = 0, D = F.length; _ < D; _++) {
			var A = F[_];
			this.JZfr(A, G)
		}
		G[G.length] = "</div>";
		if (E) return G.join("")
	},
	doUpdate: function() {
		if (!this.Djl) return;
		var $ = this._getViewChildNodes(this.root),
		A = [];
		this.Oje($, this.root, A);
		var _ = A.join("");
		this.VC5.innerHTML = _;
		this.SjC$()
	},
	IRU: function() {},
	SjC$: function() {
		var $ = this;
		if (this.LJr6) return;
		this.LJr6 = setTimeout(function() {
			$[X5Q]();
			$.LJr6 = null
		},
		1)
	},
	doLayout: function() {
		if (this[D6e]) _I(this.el, "zmj-tree-showCheckBox");
		else Kw(this.el, "zmj-tree-showCheckBox");
		if (this[ZeW]) _I(this.el, "zmj-tree-hottrack");
		else Kw(this.el, "zmj-tree-hottrack");
		var $ = this.el.firstChild;
		if ($) _I($, "zmj-tree-rootnodes")
	},
	filter: function(C, B) {
		B = B || this;
		var A = this._viewNodes = {},
		_ = this.nodesField;
		function $(G) {
			var J = G[_];
			if (!J) return false;
			var K = G._id,
			H = [];
			for (var D = 0, I = J.length; D < I; D++) {
				var F = J[D],
				L = $(F),
				E = C[KQk](B, F, D, this);
				if (E === true || L) H.push(F)
			}
			if (H.length > 0) A[K] = H;
			return H.length > 0
		}
		$(this.root);
		this[J_w]()
	},
	clearFilter: function() {
		if (this._viewNodes) {
			this._viewNodes = null;
			this[J_w]()
		}
	},
	setShowCheckBox: function($) {
		if (this[D6e] != $) {
			this[D6e] = $;
			this[J_w]()
		}
	},
	getShowCheckBox: function() {
		return this[D6e]
	},
	setShowFolderCheckBox: function($) {
		if (this[CTa] != $) {
			this[CTa] = $;
			this[J_w]()
		}
	},
	getShowFolderCheckBox: function() {
		return this[CTa]
	},
	setAllowSelect: function($) {
		if (this[Fa] != $) {
			this[Fa] = $;
			this[J_w]()
		}
	},
	getAllowSelect: function() {
		return this[Fa]
	},
	setShowTreeIcon: function($) {
		if (this[ZRq] != $) {
			this[ZRq] = $;
			this[J_w]()
		}
	},
	getShowTreeIcon: function() {
		return this[ZRq]
	},
	setShowExpandButtons: function($) {
		if (this[CiD3] != $) {
			this[CiD3] = $;
			this[J_w]()
		}
	},
	getShowExpandButtons: function() {
		return this[CiD3]
	},
	setEnableHotTrack: function($) {
		if (this[ZeW] != $) {
			this[ZeW] = $;
			this[X5Q]()
		}
	},
	getEnableHotTrack: function() {
		return this[ZeW]
	},
	setExpandOnLoad: function($) {
		this.expandOnLoad = $
	},
	getExpandOnLoad: function() {
		return this.expandOnLoad
	},
	setCheckRecursive: function($) {
		if (this[VsK] != $) this[VsK] = $
	},
	getCheckRecursive: function() {
		return this[VsK]
	},
	getNodeIcon: function(_) {
		var $ = _[this.iconField];
		if (!$) if (this.isLeaf(_)) $ = this.leafIcon;
		else $ = this.folderIcon;
		return $
	},
	isAncestor: function(_, B) {
		if (_ == B) return true;
		if (!_ || !B) return false;
		var A = this[Ss](B);
		for (var $ = 0, C = A.length; $ < C; $++) if (A[$] == _) return true;
		return false
	},
	getAncestors: function(A) {
		var _ = [];
		while (1) {
			var $ = this[_$JS](A);
			if (!$ || $ == this.root) break;
			_[_.length] = $;
			A = $
		}
		_.reverse();
		return _
	},
	getRootNode: function() {
		return this.root
	},
	getParentNode: function($) {
		if (!$) return null;
		if ($._pid == this.root._id) return this.root;
		return this.Zov[$._pid]
	},
	_isViewFirstNode: function(_) {
		if (this._viewNodes) {
			var $ = this[_$JS](_),
			A = this._getViewChildNodes($);
			return A[0] === _
		} else return this[Dit](_)
	},
	_isViewLastNode: function(_) {
		if (this._viewNodes) {
			var $ = this[_$JS](_),
			A = this._getViewChildNodes($);
			return A[A.length - 1] === _
		} else return this.isLastNode(_)
	},
	_isInViewLastNode: function(D, $) {
		if (this._viewNodes) {
			var C = null,
			A = this[Ss](D);
			for (var _ = 0, E = A.length; _ < E; _++) {
				var B = A[_];
				if (this.getLevel(B) == $) C = B
			}
			if (!C || C == this.root) return false;
			return this._isViewLastNode(C)
		} else return this.isInLastNode(D, $)
	},
	_getViewChildNodes: function($) {
		if (this._viewNodes) return this._viewNodes[$._id];
		else return this[P8pq]($)
	},
	getChildNodes: function($) {
		$ = this[AK85]($);
		if (!$) return null;
		return $[this.nodesField]
	},
	getAllChildNodes: function($) {
		$ = this[AK85]($);
		if (!$) return [];
		var _ = [];
		this.cascadeChild($,
		function($) {
			_.push($)
		},
		this);
		return _
	},
	indexOf: function(_) {
		_ = this[AK85](_);
		if (!_) return - 1;
		this.getList();
		var $ = this._indexs[_[this.idField]];
		if (zmj.isNull($)) return - 1;
		return $
	},
	getAt: function(_) {
		var $ = this.getList();
		return $[_]
	},
	indexOfChildren: function(A) {
		var $ = this[_$JS](A);
		if (!$) return - 1;
		var _ = $[this.nodesField];
		return _.indexOf(A)
	},
	hasChildren: function($) {
		var _ = this[P8pq]($);
		return !! (_ && _.length > 0)
	},
	isLeaf: function($) {
		if (!$ || $.isLeaf === false) return false;
		var _ = this[P8pq]($);
		if (_ && _.length > 0) return false;
		return true
	},
	getLevel: function($) {
		return $._level
	},
	isExpandedNode: function($) {
		$ = this[AK85]($);
		if (!$) return false;
		return $.expanded == true || zmj.isNull($.expanded)
	},
	isCheckedNode: function($) {
		return $.checked == true
	},
	isVisibleNode: function($) {
		return $.visible !== false
	},
	isEnabledNode: function($) {
		return $.enabled !== false || this.enabled
	},
	isFirstNode: function(_) {
		var $ = this[_$JS](_),
		A = this[P8pq]($);
		return A[0] === _
	},
	isLastNode: function(_) {
		var $ = this[_$JS](_),
		A = this[P8pq]($);
		return A[A.length - 1] === _
	},
	isInLastNode: function(D, $) {
		var C = null,
		A = this[Ss](D);
		for (var _ = 0, E = A.length; _ < E; _++) {
			var B = A[_];
			if (this.getLevel(B) == $) C = B
		}
		if (!C || C == this.root) return false;
		return this.isLastNode(C)
	},
	bubbleParent: function(_, B, A) {
		A = A || this;
		if (_) B[KQk](this, _);
		var $ = this[_$JS](_);
		if ($ && $ != this.root) this.bubbleParent($, B, A)
	},
	cascadeChild: function(A, E, B) {
		if (!E) return;
		if (!A) A = this.root;
		var D = A[this.nodesField];
		if (D) {
			D = D.clone();
			for (var $ = 0, C = D.length; $ < C; $++) {
				var _ = D[$];
				if (E[KQk](B || this, _, $, A) === false) return;
				this.cascadeChild(_, E, B)
			}
		}
	},
	eachChild: function(B, F, C) {
		if (!F || !B) return;
		var E = B[this.nodesField];
		if (E) {
			var _ = E.clone();
			for (var A = 0, D = _.length; A < D; A++) {
				var $ = _[A];
				if (F[KQk](C || this, $, A, B) === false) break
			}
		}
	},
	H62: function(_, $) {
		if (!_._id) _._id = NR.NodeUID++;
		this.Zov[_._id] = _;
		this.Br[_[this.idField]] = _;
		_._pid = $ ? $._id: "";
		_._level = $ ? $._level + 1: -1;
		this.cascadeChild(_,
		function(A, $, _) {
			if (!A._id) A._id = NR.NodeUID++;
			this.Zov[A._id] = A;
			this.Br[A[this.idField]] = A;
			A._pid = _._id;
			A._level = _._level + 1
		},
		this);
		this._clearTree()
	},
	BR: function(_) {
		var $ = this;
		function A(_) {
			$.Iq1L(_)
		}
		if (_ != this.root) A(_);
		this.cascadeChild(_,
		function($) {
			A($)
		},
		this)
	},
	removeNodes: function(B) {
		if (!zmj.isArray(B)) return;
		B = B.clone();
		for (var $ = 0, A = B.length; $ < A; $++) {
			var _ = B[$];
			this[Vj](_)
		}
	},
	Iq1L: function($) {
		var A = this.BsM($),
		_ = this._getNodeEl($);
		if (_) jQuery(_.firstChild).replaceWith(A)
	},
	setNodeText: function(_, $) {
		_ = this[AK85](_);
		if (!_) return;
		_[this.textField] = $;
		this.Iq1L(_)
	},
	setNodeIconCls: function(_, $) {
		_ = this[AK85](_);
		if (!_) return;
		_[this.iconField] = $;
		this.Iq1L(_)
	},
	updateNode: function(_, $) {
		_ = this[AK85](_);
		if (!_ || !$) return;
		var A = _[this.nodesField];
		zmj.copyTo(_, $);
		_[this.nodesField] = A;
		this.Iq1L(_)
	},
	removeNode: function(A) {
		A = this[AK85](A);
		if (!A) return;
		if (this.$VS == A) this.$VS = null;
		var D = [A];
		this.cascadeChild(A,
		function($) {
			D.push($)
		},
		this);
		var _ = this[_$JS](A);
		_[this.nodesField].remove(A);
		this.H62(A, _);
		var B = this._getNodeEl(A);
		if (B) B.parentNode.removeChild(B);
		this.BR(_);
		for (var $ = 0, C = D.length; $ < C; $++) {
			var A = D[$];
			delete A._id;
			delete A._pid;
			delete this.Zov[A._id];
			delete this.Br[A[this.idField]]
		}
	},
	addNodes: function(D, _, A) {
		if (!zmj.isArray(D)) return;
		for (var $ = 0, C = D.length; $ < C; $++) {
			var B = D[$];
			this.addNode(B, A, _)
		}
	},
	addNode: function(C, $, _) {
		C = this[AK85](C);
		if (!C) return;
		if (!_) $ = "add";
		var B = _;
		switch ($) {
		case "before":
			if (!B) return;
			_ = this[_$JS](B);
			var A = _[this.nodesField];
			$ = A.indexOf(B);
			break;
		case "after":
			if (!B) return;
			_ = this[_$JS](B);
			A = _[this.nodesField];
			$ = A.indexOf(B) + 1;
			break;
		case "add":
			break;
		default:
			break
		}
		_ = this[AK85](_);
		if (!_) _ = this.root;
		var F = _[this.nodesField];
		if (!F) F = _[this.nodesField] = [];
		$ = parseInt($);
		if (isNaN($)) $ = F.length;
		B = F[$];
		if (!B) $ = F.length;
		F.insert($, C);
		this.H62(C, _);
		var E = this.PKQ3(_);
		if (E) {
			var H = this.JZfr(C),
			$ = F.indexOf(C) + 1,
			B = F[$];
			if (B) {
				var G = this._getNodeEl(B);
				jQuery(G).before(H)
			} else zmj.append(E, H)
		} else {
			var H = this.JZfr(_),
			D = this._getNodeEl(_);
			jQuery(D).replaceWith(H)
		}
		_ = this[_$JS](C);
		this.BR(_)
	},
	moveNodes: function(E, B, _) {
		if (!E || E.length == 0 || !B || !_) return;
		this.beginUpdate();
		var A = this;
		for (var $ = 0, D = E.length; $ < D; $++) {
			var C = E[$];
			this.moveNode(C, B, _);
			if ($ != 0) {
				B = C;
				_ = "after"
			}
		}
		this.endUpdate()
	},
	moveNode: function(G, E, C) {
		G = this[AK85](G);
		E = this[AK85](E);
		if (!G || !E || !C) return false;
		if (this.isAncestor(G, E)) return false;
		var $ = -1,
		_ = null;
		switch (C) {
		case "before":
			_ = this[_$JS](E);
			$ = this.indexOfChildren(E);
			break;
		case "after":
			_ = this[_$JS](E);
			$ = this.indexOfChildren(E) + 1;
			break;
		default:
			_ = E;
			var B = this[P8pq](_);
			if (!B) B = _[this.nodesField] = [];
			$ = B.length;
			break
		}
		var F = {},
		B = this[P8pq](_);
		B.insert($, F);
		var D = this[_$JS](G),
		A = this[P8pq](D);
		A.remove(G);
		$ = B.indexOf(F);
		B[$] = G;
		this.H62(G, _);
		this[J_w]();
		return true
	},
	isEditingNode: function($) {
		return this._editingNode == $
	},
	beginEdit: function(_) {
		_ = this[AK85](_);
		if (!_) return;
		var A = this._getNodeEl(_),
		B = this.BsM(_, true),
		A = this._getNodeEl(_);
		if (A) jQuery(A.firstChild).replaceWith(B);
		this._editingNode = _;
		var $ = this.uid + "$edit$" + _._id;
		this._editInput = document.getElementById($);
		this._editInput.focus();
		zmj.selectRange(this._editInput, 1000, 1000);
		WoBw(this._editInput, "keydown", this.E$M, this);
		WoBw(this._editInput, "blur", this.Dcf, this)
	},
	cancelEdit: function() {
		if (this._editingNode) {
			this.Iq1L(this._editingNode);
			Is(this._editInput, "keydown", this.E$M, this);
			Is(this._editInput, "blur", this.Dcf, this)
		}
		this._editingNode = null;
		this._editInput = null
	},
	E$M: function(_) {
		if (_.keyCode == 13) {
			var $ = this._editInput.value;
			this.setNodeText(this._editingNode, $);
			this[ISW]()
		} else if (_.keyCode == 27) this[ISW]()
	},
	Dcf: function(_) {
		var $ = this._editInput.value;
		this.setNodeText(this._editingNode, $);
		this[ISW]()
	},
	_getNodeByEvent: function(C) {
		if (Zq6(C.target, this.KE)) return null;
		var A = J6j(C.target, this.KyE);
		if (A) {
			var $ = A.id.split("$"),
			B = $[$.length - 1],
			_ = this.Zov[B];
			return _
		}
		return null
	},
	K99: function($) {
		return this.uid + "$" + $._id
	},
	Z0Yo: function($) {
		return this.uid + "$nodes$" + $._id
	},
	MnVL: function($) {
		return this.uid + "$check$" + $._id
	},
	addNodeCls: function($, _) {
		var A = this._getNodeEl($);
		if (A) _I(A, _)
	},
	removeNodeCls: function($, _) {
		var A = this._getNodeEl($);
		if (A) Kw(A, _)
	},
	getNodeBox: function(_) {
		var $ = this._getNodeEl(_);
		if ($) return Vhwd($.firstChild)
	},
	_getNodeEl: function($) {
		if (!$) return null;
		var _ = this.K99($);
		return document.getElementById(_)
	},
	IB: function(_) {
		if (!_) return null;
		var $ = this.$eB(_);
		if ($) {
			$ = zmj.byClass(this.WWiL, $);
			return $
		}
		return null
	},
	$eB: function(_) {
		var $ = this._getNodeEl(_);
		if ($) return $.firstChild
	},
	PKQ3: function($) {
		if (!$) return null;
		var _ = this.Z0Yo($);
		return document.getElementById(_)
	},
	WAR: function($) {
		if (!$) return null;
		var _ = this.MnVL($);
		return document.getElementById(_)
	},
	findNodes: function(A, $) {
		var _ = [];
		$ = $ || this;
		this.cascadeChild(this.root,
		function(B) {
			if (A && A[KQk]($, B) === true) _.push(B)
		},
		this);
		return _
	},
	getNode: function($) {
		if (typeof $ == "object") return $;
		return this.Br[$] || null
	},
	hideNode: function(_) {
		_ = this[AK85](_);
		if (!_) return;
		_.visible = false;
		var $ = this._getNodeEl(_);
		$.style.display = "none"
	},
	showNode: function(_) {
		_ = this[AK85](_);
		if (!_) return;
		_.visible = false;
		var $ = this._getNodeEl(_);
		$.style.display = ""
	},
	enableNode: function(A) {
		A = this[AK85](A);
		if (!A) return;
		A.enabled = true;
		var _ = this._getNodeEl(A);
		Kw(_, "zmj-disabled");
		var $ = this.WAR(A);
		if ($) $.disabled = false
	},
	disableNode: function(A) {
		A = this[AK85](A);
		if (!A) return;
		A.enabled = false;
		var _ = this._getNodeEl(A);
		_I(_, "zmj-disabled");
		var $ = this.WAR(A);
		if ($) $.disabled = true
	},
	_allowExpandLayout: true,
	expandNode: function(E, B) {
		E = this[AK85](E);
		if (!E) return;
		var $ = this.isExpandedNode(E);
		if ($) return;
		if (this.isLeaf(E)) return;
		E.expanded = true;
		var F = this._getNodeEl(E);
		if (this.removeOnCollapse && F) {
			var G = this.JZfr(E);
			jQuery(F).before(G);
			jQuery(F).remove()
		}
		var D = this.PKQ3(E);
		if (D) D.style.display = "";
		D = this._getNodeEl(E);
		if (D) {
			var I = D.firstChild;
			Kw(I, this.VEhc);
			_I(I, this.XO)
		}
		this.fire("expand", {
			node: E
		});
		B = B && !(zmj.isIE6);
		if (B && this._getViewChildNodes(E)) {
			this.AYic = true;
			D = this.PKQ3(E);
			if (!D) return;
			var C = $L7(D);
			D.style.height = "1px";
			if (this.OW) D.style.position = "relative";
			var _ = {
				height: C + "px"
			},
			A = this,
			H = jQuery(D);
			H.animate(_, 180,
			function() {
				A.AYic = false;
				A.IRU();
				clearInterval(A.HIG);
				D.style.height = "auto";
				if (A.OW) D.style.position = "static";
				zmj[USz](F)
			});
			clearInterval(this.HIG);
			this.HIG = setInterval(function() {
				A.IRU()
			},
			60)
		}
		this.IRU();
		if (this._allowExpandLayout) zmj[USz](this.el)
	},
	collapseNode: function(E, B) {
		E = this[AK85](E);
		if (!E) return;
		var $ = this.isExpandedNode(E);
		if (!$) return;
		if (this.isLeaf(E)) return;
		E.expanded = false;
		var F = this._getNodeEl(E),
		D = this.PKQ3(E);
		if (D) D.style.display = "none";
		D = this._getNodeEl(E);
		if (D) {
			var I = D.firstChild;
			Kw(I, this.XO);
			_I(I, this.VEhc)
		}
		this.fire("collapse", {
			node: E
		});
		B = B && !(zmj.isIE6);
		if (B && this._getViewChildNodes(E)) {
			this.AYic = true;
			D = this.PKQ3(E);
			if (!D) return;
			D.style.display = "";
			D.style.height = "auto";
			if (this.OW) D.style.position = "relative";
			var C = $L7(D),
			_ = {
				height: "1px"
			},
			A = this,
			H = jQuery(D);
			H.animate(_, 180,
			function() {
				D.style.display = "none";
				D.style.height = "auto";
				if (A.OW) D.style.position = "static";
				A.AYic = false;
				A.IRU();
				clearInterval(A.HIG);
				var $ = A.PKQ3(E);
				if (A.removeOnCollapse && $) jQuery($).remove();
				zmj[USz](F)
			});
			clearInterval(this.HIG);
			this.HIG = setInterval(function() {
				A.IRU()
			},
			60)
		} else {
			var G = this.PKQ3(E);
			if (this.removeOnCollapse && G) jQuery(G).remove()
		}
		this.IRU();
		if (this._allowExpandLayout) zmj[USz](this.el)
	},
	toggleNode: function(_, $) {
		if (this.isExpandedNode(_)) this[VCH](_, $);
		else this[Mwv](_, $)
	},
	expandLevel: function($) {
		this.cascadeChild(this.root,
		function(_) {
			if (this.getLevel(_) == $) if (_[this.nodesField] != null) this[Mwv](_)
		},
		this)
	},
	collapseLevel: function($) {
		this.cascadeChild(this.root,
		function(_) {
			if (this.getLevel(_) == $) if (_[this.nodesField] != null) this[VCH](_)
		},
		this)
	},
	expandAll: function() {
		this.cascadeChild(this.root,
		function($) {
			if ($[this.nodesField] != null) this[Mwv]($)
		},
		this)
	},
	collapseAll: function() {
		this.cascadeChild(this.root,
		function($) {
			if ($[this.nodesField] != null) this[VCH]($)
		},
		this)
	},
	expandPath: function(A) {
		A = this[AK85](A);
		if (!A) return;
		var _ = this[Ss](A);
		for (var $ = 0, B = _.length; $ < B; $++) this[Mwv](_[$])
	},
	collapsePath: function(A) {
		A = this[AK85](A);
		if (!A) return;
		var _ = this[Ss](A);
		for (var $ = 0, B = _.length; $ < B; $++) this[VCH](_[$])
	},
	selectNode: function(_) {
		_ = this[AK85](_);
		var $ = this._getNodeEl(this.$VS);
		if ($) Kw($.firstChild, this.K0kv);
		this.$VS = _;
		$ = this._getNodeEl(this.$VS);
		if ($) _I($.firstChild, this.K0kv);
		var A = {
			node: _,
			isLeaf: this.isLeaf(_)
		};
		this.fire("nodeselect", A)
	},
	getSelectedNode: function() {
		return this.$VS
	},
	getSelectedNodes: function() {
		var $ = [];
		if (this.$VS) $.push(this.$VS);
		return $
	},
	autoCheckParent: false,
	setAutoCheckParent: function($) {
		this.autoCheckParent = $
	},
	getAutoCheckParent: function($) {
		return this.autoCheckParent
	},
	doAutoCheckParent: function(C) {
		var _ = this[Ss](C);
		for (var $ = 0, D = _.length; $ < D; $++) {
			var B = _[$],
			A = this.hasCheckedChildNode(B);
			B.checked = A;
			var E = this.WAR(B);
			if (E) {
				E.indeterminate = false;
				E.checked = A
			}
		}
	},
	hasCheckedChildNode: function(_) {
		var A = false,
		D = this.getAllChildNodes(_);
		for (var $ = 0, C = D.length; $ < C; $++) {
			var B = D[$];
			if (this.isCheckedNode(B)) {
				A = true;
				break
			}
		}
		return A
	},
	_doCheckState: function(C) {
		var _ = this[Ss](C);
		_.push(C);
		for (var $ = 0, D = _.length; $ < D; $++) {
			var B = _[$],
			A = this.hasCheckedChildNode(B),
			E = this.WAR(B);
			if (E) {
				E.indeterminate = false;
				if (this.isCheckedNode(B)) {
					E.indeterminate = false;
					E.checked = true
				} else {
					E.indeterminate = A;
					E.checked = false
				}
			}
		}
	},
	checkNode: function($) {
		$ = this[AK85]($);
		if (!$ || $.checked) return;
		$.checked = true;
		this._doCheckState($)
	},
	uncheckNode: function($) {
		$ = this[AK85]($);
		if (!$ || !$.checked) return;
		$.checked = false;
		this._doCheckState($)
	},
	checkNodes: function(B) {
		if (!zmj.isArray(B)) B = [];
		for (var $ = 0, A = B.length; $ < A; $++) {
			var _ = B[$];
			this.checkNode(_)
		}
	},
	uncheckNodes: function(B) {
		if (!zmj.isArray(B)) B = [];
		for (var $ = 0, A = B.length; $ < A; $++) {
			var _ = B[$];
			this.uncheckNode(_)
		}
	},
	checkAllNodes: function() {
		this.cascadeChild(this.root,
		function($) {
			this.checkNode($)
		},
		this)
	},
	uncheckAllNodes: function($) {
		this.cascadeChild(this.root,
		function($) {
			this.uncheckNode($)
		},
		this)
	},
	getCheckedNodes: function() {
		var $ = [];
		this.cascadeChild(this.root,
		function(_) {
			if (_.checked == true) $.push(_)
		},
		this);
		return $
	},
	setValue: function(_) {
		if (zmj.isNull(_)) _ = "";
		_ = String(_);
		if (this.getValue() != _) {
			var C = this.getCheckedNodes();
			this.uncheckNodes(C);
			this.value = _;
			var A = String(_).split(",");
			for (var $ = 0, B = A.length; $ < B; $++) this.checkNode(A[$])
		}
	},
	getNodesByValue: function(_) {
		if (zmj.isNull(_)) _ = "";
		_ = String(_);
		var D = [],
		A = String(_).split(",");
		for (var $ = 0, C = A.length; $ < C; $++) {
			var B = this[AK85](A[$]);
			if (B) D.push(B)
		}
		return D
	},
	Ss0: function(A) {
		if (zmj.isNull(A)) A = [];
		if (!zmj.isArray(A)) A = this.getNodesByValue(A);
		var B = [],
		C = [];
		for (var _ = 0, D = A.length; _ < D; _++) {
			var $ = A[_];
			if ($) {
				B.push(this[_p]($));
				C.push(this[RZH1]($))
			}
		}
		return [B.join(this.delimiter), C.join(this.delimiter)]
	},
	getValue: function() {
		var A = this.getCheckedNodes(),
		C = [];
		for (var $ = 0, _ = A.length; $ < _; $++) {
			var B = this[_p](A[$]);
			if (B) C.push(B)
		}
		return C.join(",")
	},
	setResultAsTree: function($) {
		this[RLR] = $
	},
	getResultAsTree: function() {
		return this[RLR]
	},
	setParentField: function($) {
		this[UOB] = $
	},
	getParentField: function() {
		return this[UOB]
	},
	setIdField: function($) {
		this[Ga3p] = $
	},
	getIdField: function() {
		return this[Ga3p]
	},
	setTextField: function($) {
		this[Uc9] = $
	},
	getTextField: function() {
		return this[Uc9]
	},
	setShowTreeLines: function($) {
		this[YSY] = $;
		if ($ == true) _I(this.el, "zmj-tree-treeLine");
		else Kw(this.el, "zmj-tree-treeLine")
	},
	getShowTreeLines: function() {
		return this[YSY]
	},
	setShowArrow: function($) {
		this.showArrow = $;
		if ($ == true) _I(this.el, "zmj-tree-showArrows");
		else Kw(this.el, "zmj-tree-showArrows")
	},
	getShowArrow: function() {
		return this.showArrow
	},
	setIconField: function($) {
		this.iconField = $
	},
	getIconField: function() {
		return this.iconField
	},
	setNodesField: function($) {
		this.nodesField = $
	},
	getNodesField: function() {
		return this.nodesField
	},
	setTreeColumn: function($) {
		this.treeColumn = $
	},
	getTreeColumn: function() {
		return this.treeColumn
	},
	setLeafIcon: function($) {
		this.leafIcon = $
	},
	getLeafIcon: function() {
		return this.leafIcon
	},
	setFolderIcon: function($) {
		this.folderIcon = $
	},
	getFolderIcon: function() {
		return this.folderIcon
	},
	setExpandOnDblClick: function($) {
		this.expandOnDblClick = $
	},
	getExpandOnDblClick: function() {
		return this.expandOnDblClick
	},
	setRemoveOnCollapse: function($) {
		this.removeOnCollapse = $
	},
	getRemoveOnCollapse: function() {
		return this.removeOnCollapse
	},
	QMh: function(B) {
		if (!this.enabled) return;
		if (J6j(B.target, this.Nli)) return;
		var $ = this._getNodeByEvent(B);
		if ($) if (J6j(B.target, this.WWiL)) {
			var _ = this.isExpandedNode($),
			A = {
				node: $,
				expanded: _,
				cancel: false
			};
			if (this.expandOnDblClick && !this.AYic) if (_) {
				this.fire("beforecollapse", A);
				if (A.cancel == true) return;
				this[VCH]($, this.allowAnim)
			} else {
				this.fire("beforeexpand", A);
				if (A.cancel == true) return;
				this[Mwv]($, this.allowAnim)
			}
			this.fire("nodedblclick", {
				htmlEvent: B,
				node: $
			})
		}
	},
	PSN: function(L) {
		if (!this.enabled) return;
		var B = this._getNodeByEvent(L);
		if (B) if (J6j(L.target, this.HdK) && this.isLeaf(B) == false) {
			if (this.AYic) return;
			var I = this.isExpandedNode(B),
			K = {
				node: B,
				expanded: I,
				cancel: false
			};
			if (!this.AYic) if (I) {
				this.fire("beforecollapse", K);
				if (K.cancel == true) return;
				this[VCH](B, this.allowAnim)
			} else {
				this.fire("beforeexpand", K);
				if (K.cancel == true) return;
				this[Mwv](B, this.allowAnim)
			}
		} else if (J6j(L.target, this.Nli)) {
			var J = this.isCheckedNode(B),
			K = {
				isLeaf: this.isLeaf(B),
				node: B,
				checked: J,
				checkRecursive: this.checkRecursive,
				htmlEvent: L,
				cancel: false
			};
			this.fire("beforenodecheck", K);
			if (K.cancel == true) {
				L.preventDefault();
				return
			}
			if (J) this.uncheckNode(B);
			else this.checkNode(B);
			if (K[VsK]) {
				this.cascadeChild(B,
				function($) {
					if (J) this.uncheckNode($);
					else this.checkNode($)
				},
				this);
				var $ = this[Ss](B);
				$.reverse();
				for (var G = 0, F = $.length; G < F; G++) {
					var C = $[G],
					A = this[P8pq](C),
					H = true;
					for (var _ = 0, E = A.length; _ < E; _++) {
						var D = A[_];
						if (!this.isCheckedNode(D)) {
							H = false;
							break
						}
					}
					if (H) this.checkNode(C);
					else this.uncheckNode(C)
				}
			}
			if (this.autoCheckParent) this.doAutoCheckParent(B);
			this.fire("nodecheck", K)
		} else this._OnNodeClick(B, L)
	},
	P4: function(_) {
		if (!this.enabled) return;
		var $ = this._getNodeByEvent(_);
		if ($) if (J6j(_.target, this.HdK));
		else if (J6j(_.target, this.Nli));
		else this._OnNodeMouseDown($, _)
	},
	_OnNodeMouseDown: function(_, $) {
		var B = J6j($.target, this.WWiL);
		if (!B) return null;
		if (!this.isEnabledNode(_)) return;
		var A = {
			node: _,
			cancel: false,
			isLeaf: this.isLeaf(_),
			htmlEvent: $
		};
		if (this[Fa] && _[Fa] !== false) if (this.$VS != _) {
			this.fire("beforenodeselect", A);
			if (A.cancel != true) this.selectNode(_)
		}
		this.fire("nodeMouseDown", A)
	},
	_OnNodeClick: function(_, $) {
		var B = J6j($.target, this.WWiL);
		if (!B) return null;
		if ($.target.tagName.toLowerCase() == "a") $.target.hideFocus = true;
		if (!this.isEnabledNode(_)) return;
		var A = {
			node: _,
			cancel: false,
			isLeaf: this.isLeaf(_),
			htmlEvent: $
		};
		this.fire("nodeClick", A)
	},
	Vqc: function(_) {
		var $ = this._getNodeByEvent(_);
		if ($) this._OnNodeMouseMove($, _)
	},
	DtkD: function(_) {
		var $ = this._getNodeByEvent(_);
		if ($) this._OnNodeMouseOut($, _)
	},
	_OnNodeMouseOut: function($, _) {
		if (!this.isEnabledNode($)) return;
		if (!J6j(_.target, this.WWiL)) return;
		this.blurNode();
		var _ = {
			node: $,
			htmlEvent: _
		};
		this.fire("nodemouseout", _)
	},
	_OnNodeMouseMove: function($, _) {
		if (!this.isEnabledNode($)) return;
		if (!J6j(_.target, this.WWiL)) return;
		if (this[ZeW] == true) this.focusNode($);
		var _ = {
			node: $,
			htmlEvent: _
		};
		this.fire("nodemousemove", _)
	},
	focusNode: function(A, $) {
		A = this[AK85](A);
		if (!A) return;
		var _ = this.IB(A);
		if ($ && _) this[Osq](A);
		if (this.Eb2s == A) return;
		this.blurNode();
		this.Eb2s = A;
		_I(_, this.Gwd2)
	},
	blurNode: function() {
		if (!this.Eb2s) return;
		var $ = this.IB(this.Eb2s);
		if ($) Kw($, this.Gwd2);
		this.Eb2s = null
	},
	scrollIntoView: function(_) {
		var $ = this._getNodeEl(_);
		zmj[Osq]($, this.el, false)
	},
	onNodeClick: function(_, $) {
		this.on("nodeClick", _, $)
	},
	onBeforeNodeSelect: function(_, $) {
		this.on("beforenodeselect", _, $)
	},
	onNodeSelect: function(_, $) {
		this.on("nodeselect", _, $)
	},
	onBeforeNodeCheck: function(_, $) {
		this.on("beforenodecheck", _, $)
	},
	onCheckNode: function(_, $) {
		this.on("nodecheck", _, $)
	},
	onNodeMouseDown: function(_, $) {
		this.on("nodemousedown", _, $)
	},
	onBeforeExpand: function(_, $) {
		this.on("beforeexpand", _, $)
	},
	onExpand: function(_, $) {
		this.on("expand", _, $)
	},
	onBeforeCollapse: function(_, $) {
		this.on("beforecollapse", _, $)
	},
	onCollapse: function(_, $) {
		this.on("collapse", _, $)
	},
	onBeforeLoad: function(_, $) {
		this.on("beforeload", _, $)
	},
	onLoad: function(_, $) {
		this.on("load", _, $)
	},
	onLoadError: function(_, $) {
		this.on("loaderror", _, $)
	},
	onDataLoad: function(_, $) {
		this.on("dataload", _, $)
	},
	Ch3zData: function() {
		return this.getSelectedNodes().clone()
	},
	Ch3zText: function($) {
		return "Nodes " + $.length
	},
	allowDrag: false,
	allowDrop: false,
	dragGroupName: "",
	dropGroupName: "",
	setAllowDrag: function($) {
		this.allowDrag = $
	},
	getAllowDrag: function() {
		return this.allowDrag
	},
	setAllowDrop: function($) {
		this[XAq_] = $
	},
	getAllowDrop: function() {
		return this[XAq_]
	},
	setDragGroupName: function($) {
		this[FoV] = $
	},
	getDragGroupName: function() {
		return this[FoV]
	},
	setDropGroupName: function($) {
		this[R$f] = $
	},
	getDropGroupName: function() {
		return this[R$f]
	},
	isAllowDrag: function($) {
		if (!this.allowDrag) return false;
		if ($.allowDrag === false) return false;
		var _ = this.J$c($);
		return ! _.cancel
	},
	J$c: function($) {
		var _ = {
			node: $,
			cancel: false
		};
		this.fire("DragStart", _);
		return _
	},
	I74o: function(_, $, A) {
		_ = _.clone();
		var B = {
			dragNodes: _,
			targetNode: $,
			action: A,
			cancel: false
		};
		this.fire("DragDrop", B);
		return B
	},
	OQT: function(A, _, $) {
		var B = {};
		B.effect = A;
		B.nodes = _;
		B.targetNode = $;
		this.fire("GiveFeedback", B);
		return B
	},
	getAttrs: function(C) {
		var G = NR[CPy][YIb][KQk](this, C);
		zmj[W5cB](C, G, ["value", "url", "idField", "textField", "iconField", "nodesField", "parentField", "valueField", "leafIcon", "folderIcon", "ondrawnode", "onbeforenodeselect", "onnodeselect", "onnodemousedown", "onnodeclick", "onnodedblclick", "onbeforeload", "onload", "onloaderror", "ondataload", "onbeforenodecheck", "onnodecheck", "onbeforeexpand", "onexpand", "onbeforecollapse", "oncollapse", "dragGroupName", "dropGroupName", "expandOnLoad", "ajaxOption"]);
		zmj[D4q](C, G, ["allowSelect", "showCheckBox", "showExpandButtons", "showTreeIcon", "showTreeLines", "checkRecursive", "enableHotTrack", "showFolderCheckBox", "resultAsTree", "allowDrag", "allowDrop", "showArrow", "expandOnDblClick", "removeOnCollapse", "autoCheckParent"]);
		if (G.ajaxOption) G.ajaxOption = zmj.decode(G.ajaxOption);
		if (G.expandOnLoad) {
			var _ = parseInt(G.expandOnLoad);
			if (zmj.isNumber(_)) G.expandOnLoad = _;
			else G.expandOnLoad = G.expandOnLoad == "true" ? true: false
		}
		var E = G[Ga3p] || this[Ga3p],
		B = G[Uc9] || this[Uc9],
		F = G.iconField || this.iconField,
		A = G.nodesField || this.nodesField;
		function $(I) {
			var N = [];
			for (var L = 0, J = I.length; L < J; L++) {
				var D = I[L],
				H = zmj[P8pq](D),
				R = H[0],
				G = H[1];
				if (!R || !G) R = D;
				var C = jQuery(R),
				_ = {},
				K = _[E] = R.getAttribute("value");
				_[F] = C.attr("icon");
				_[B] = R.innerHTML;
				N.add(_);
				var P = C.attr("expanded");
				if (P) _.expanded = P == "false" ? false: true;
				var Q = C.attr("allowSelect");
				if (Q) _[Fa] = Q == "false" ? false: true;
				if (!G) continue;
				var O = zmj[P8pq](G),
				M = $(O);
				if (M.length > 0) _[A] = M
			}
			return N
		}
		var D = $(zmj[P8pq](C));
		if (D.length > 0) G.data = D;
		if (!G[Ga3p] && G[Aqt]) G[Ga3p] = G[Aqt];
		return G
	}
});
Cmk(NR, "tree");
_Ta = function($) {
	this.owner = $;
	this.owner.on("NodeMouseDown", this.C7L, this)
};
_Ta[Yq] = {
	C7L: function(B) {
		var A = B.node;
		if (B.htmlEvent.button == zmj.MouseButton.Right) return;
		var _ = this.owner;
		if (_[BUK]() || _.isAllowDrag(B.node) == false) return;
		if (_.isEditingNode(A)) return;
		this.dragData = _.Ch3zData();
		if (this.dragData.indexOf(A) == -1) this.dragData.push(A);
		var $ = this.Ch3z();
		$.start(B.htmlEvent)
	},
	J$c: function($) {
		var _ = this.owner;
		this.feedbackEl = zmj.append(document.body, "<div class=\"zmj-feedback\"></div>");
		this.feedbackEl.innerHTML = _.Ch3zText(this.dragData);
		this.lastFeedbackClass = "";
		this[ZeW] = _[ZeW];
		_.setEnableHotTrack(false)
	},
	_getDropTree: function(_) {
		var $ = J6j(_.target, "zmj-tree", 500);
		if ($) return zmj.get($)
	},
	Xuhi: function(_) {
		var B = this.owner,
		A = this._getDropTree(_.event),
		D = _.now[0],
		C = _.now[1];
		zmj[GzmA](this.feedbackEl, D + 15, C + 18);
		this.dragAction = "no";
		if (A) {
			var $ = A._getNodeByEvent(_.event);
			this.dropNode = $;
			if ($ && A[XAq_] == true) {
				if (!A.isLeaf($) && !$[A.nodesField]) A.loadNode($);
				this.dragAction = this.getFeedback($, C, 3, A)
			} else this.dragAction = "no";
			if (B && A && B != A && !$ && A[P8pq](A.root).length == 0) {
				$ = A.getRootNode();
				this.dragAction = "add";
				this.dropNode = $
			}
		}
		this.lastFeedbackClass = "zmj-feedback-" + this.dragAction;
		this.feedbackEl.className = "zmj-feedback " + this.lastFeedbackClass;
		document.title = this.dragAction;
		if (this.dragAction == "no") $ = null;
		this.setRowFeedback($, this.dragAction, A)
	},
	GVij: function(A) {
		var E = this.owner,
		C = this._getDropTree(A.event);
		zmj[Vj](this.feedbackEl);
		this.feedbackEl = null;
		this.setRowFeedback(null);
		var D = [];
		for (var H = 0, G = this.dragData.length; H < G; H++) {
			var J = this.dragData[H],
			B = false;
			for (var K = 0, _ = this.dragData.length; K < _; K++) {
				var F = this.dragData[K];
				if (F != J) {
					B = E.isAncestor(F, J);
					if (B) break
				}
			}
			if (!B) D.push(J)
		}
		this.dragData = D;
		if (this.dropNode && this.dragAction != "no") {
			var L = E.I74o(this.dragData, this.dropNode, this.dragAction);
			if (!L.cancel) {
				var D = L.dragNodes,
				I = L.targetNode,
				$ = L.action;
				if (E == C) E.moveNodes(D, I, $);
				else {
					E.removeNodes(D);
					C.addNodes(D, I, $)
				}
			}
		}
		this.dropNode = null;
		this.dragData = null;
		E.setEnableHotTrack(this[ZeW])
	},
	setRowFeedback: function(B, F, A) {
		if (this.lastAddDomNode) Kw(this.lastAddDomNode, "zmj-tree-feedback-add");
		if (B == null || this.dragAction == "add") {
			zmj[Vj](this.feedbackLine);
			this.feedbackLine = null
		}
		this.lastRowFeedback = B;
		if (B != null) if (F == "before" || F == "after") {
			if (!this.feedbackLine) this.feedbackLine = zmj.append(document.body, "<div class='zmj-feedback-line'></div>");
			this.feedbackLine.style.display = "block";
			var D = A.getNodeBox(B),
			E = D.x,
			C = D.y - 1;
			if (F == "after") C += D.height;
			zmj[GzmA](this.feedbackLine, E, C);
			var _ = A.getBox(true);
			WE(this.feedbackLine, _.width)
		} else {
			var $ = A.$eB(B);
			_I($, "zmj-tree-feedback-add");
			this.lastAddDomNode = $
		}
	},
	getFeedback: function($, I, F, A) {
		var J = A.getNodeBox($),
		_ = J.height,
		H = I - J.y,
		G = null;
		if (this.dragData.indexOf($) != -1) return "no";
		var C = false;
		if (F == 3) {
			C = A.isLeaf($);
			for (var E = 0, D = this.dragData.length; E < D; E++) {
				var K = this.dragData[E],
				B = A.isAncestor(K, $);
				if (B) {
					G = "no";
					break
				}
			}
		}
		if (G == null) if (C) {
			if (H > _ / 2) G = "after";
			else G = "before"
		} else if (H > (_ / 3) * 2) G = "after";
		else if (_ / 3 <= H && H <= (_ / 3 * 2)) G = "add";
		else G = "before";
		var L = A.OQT(G, this.dragData, $);
		return L.effect
	},
	Ch3z: function() {
		if (!this.drag) this.drag = new zmj.Drag({
			capture: false,
			onStart: zmj.createDelegate(this.J$c, this),
			onMove: zmj.createDelegate(this.Xuhi, this),
			onStop: zmj.createDelegate(this.GVij, this)
		});
		return this.drag
	}
};
Wo = function() {
	this.data = [];
	this.Cj = {};
	this.Udy = [];
	this.HBm = {};
	this.columns = [];
	this.GWi = [];
	this._V = {};
	this.EsO = {};
	this.HKKq = [];
	this.YCm = {};
	this._cellErrors = [];
	this._cellMapErrors = {};
	Wo[CPy][CLu][KQk](this);
	this[J_w]();
	var $ = this;
	setTimeout(function() {
		if ($.autoLoad) $.reload()
	},
	1)
};
XVZ = 0;
SkZ6 = 0;
HX_P(Wo, ET, {
	C1Q: "block",
	width: 300,
	height: "auto",
	allowCellValid: false,
	cellEditAction: "cellclick",
	showEmptyText: false,
	emptyText: "No data returned.",
	minWidth: 300,
	minHeight: 150,
	maxWidth: 5000,
	maxHeight: 3000,
	_viewRegion: null,
	_virtualRows: 50,
	virtualScroll: false,
	allowCellWrap: false,
	bodyCls: "",
	bodyStyle: "",
	footerCls: "",
	footerStyle: "",
	pagerCls: "",
	pagerStyle: "",
	idField: "id",
	data: [],
	columns: null,
	allowResize: false,
	selectOnLoad: false,
	_rowIdField: "_uid",
	columnWidth: 120,
	columnMinWidth: 20,
	columnMaxWidth: 2000,
	fitColumns: true,
	autoHideRowDetail: true,
	showHeader: true,
	showFooter: true,
	showTop: false,
	showHGridLines: true,
	showVGridLines: true,
	showFilterRow: false,
	showSummaryRow: false,
	sortMode: "server",
	allowSortColumn: true,
	allowMoveColumn: true,
	allowResizeColumn: true,
	enableHotTrack: true,
	allowRowSelect: true,
	multiSelect: false,
	allowAlternating: false,
	OyY: "zmj-grid-row-alt",
	Ozj: "zmj-grid-frozen",
	IAU: "zmj-grid-frozenCell",
	frozenStartColumn: -1,
	frozenEndColumn: -1,
	isFrozen: function() {
		return this[Dgs] >= 0 && this[WGh] >= this[Dgs]
	},
	UMO: "zmj-grid-row",
	Tgi: "zmj-grid-row-hover",
	Cg6: "zmj-grid-row-selected",
	_headerCellCls: "zmj-grid-headerCell",
	_cellCls: "zmj-grid-cell",
	set: function($) {
		var _ = $.columns;
		delete $.columns;
		Wo[CPy].set[KQk](this, $);
		if (_) this[KsL](_);
		return this
	},
	uiCls: "zmj-datagrid",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = "zmj-grid";
		this.el.style.display = "block";
		var _ = "<div class=\"zmj-grid-border\">" + "<div class=\"zmj-grid-header\"><div class=\"zmj-grid-headerInner\"></div></div>" + "<div class=\"zmj-grid-filterRow\"></div>" + "<div class=\"zmj-grid-body\"><div class=\"zmj-grid-bodyInner\"></div><div class=\"zmj-grid-body-scrollHeight\"></div></div>" + "<div class=\"zmj-grid-scroller\"><div></div></div>" + "<div class=\"zmj-grid-summaryRow\"></div>" + "<div class=\"zmj-grid-footer\"></div>" + "<div class=\"zmj-grid-resizeGrid\" style=\"\"></div>" + "<a href=\"#\" class=\"zmj-grid-focus\" style=\"position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none\" hideFocus onclick=\"return false\" ></a>" + "</div>";
		this.el.innerHTML = _;
		this.AE = this.el.firstChild;
		this.Kz = this.AE.childNodes[0];
		this.ATG = this.AE.childNodes[1];
		this.VC5 = this.AE.childNodes[2];
		this._bodyInnerEl = this.VC5.childNodes[0];
		this._bodyScrollEl = this.VC5.childNodes[1];
		this._headerInnerEl = this.Kz.firstChild;
		this.S8Q = this.AE.childNodes[3];
		this.Prc = this.AE.childNodes[4];
		this.MbK = this.AE.childNodes[5];
		this.P2Y = this.AE.childNodes[6];
		this._focusEl = this.AE.childNodes[7];
		this.Jo();
		this.En();
		DTHl(this.VC5, this.bodyStyle);
		_I(this.VC5, this.bodyCls);
		this.GAZM();
		this._8Rows()
	},
	destroy: function($) {
		if (this.VC5) {
			zmj[L4D](this.VC5);
			this.VC5 = null
		}
		if (this.S8Q) {
			zmj[L4D](this.S8Q);
			this.S8Q = null
		}
		this.AE = null;
		this.Kz = null;
		this.ATG = null;
		this.VC5 = null;
		this.S8Q = null;
		this.Prc = null;
		this.MbK = null;
		this.P2Y = null;
		Wo[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		TQ(function() {
			WoBw(this.el, "click", this.PSN, this);
			WoBw(this.el, "dblclick", this.QMh, this);
			WoBw(this.el, "mousedown", this.P4, this);
			WoBw(this.el, "mouseup", this.X0i, this);
			WoBw(this.el, "mousemove", this.Vqc, this);
			WoBw(this.el, "mouseover", this.J6I, this);
			WoBw(this.el, "mouseout", this.DtkD, this);
			WoBw(this.el, "keydown", this.PDh, this);
			WoBw(this.el, "keyup", this.Ktdo, this);
			WoBw(this.el, "contextmenu", this.KRP9, this);
			WoBw(this.VC5, "scroll", this.Y_d, this);
			WoBw(this.S8Q, "scroll", this.My0U, this);
			WoBw(this.el, "mousewheel", this.NX, this)
		},
		this);
		this._aRJ = new LLF(this);
		this.F74 = new zmj._ColumnSplitter(this);
		this._ColumnMove = new zmj._ColumnMove(this);
		this.TW = new FYf(this);
		this._CellTip = new zmj._CellToolTip(this);
		this._Sort = new zmj._GridSort(this)
	},
	_8Rows: function() {
		this.P2Y.style.display = this[URW] ? "": "none";
		this.MbK.style.display = this[EzY] ? "": "none";
		this.Prc.style.display = this[VTo] ? "": "none";
		this.ATG.style.display = this[SdU] ? "": "none";
		this.Kz.style.display = this.showHeader ? "": "none"
	},
	focus: function() {
		try {
			var _ = this.getCurrent();
			if (_) {
				var $ = this.$s(_);
				if ($) {
					var A = Vhwd($);
					zmj.setY(this._focusEl, A.top)
				}
			}
			this._focusEl.focus()
		} catch(B) {}
	},
	GAZM: function() {
		this.pager = new FB();
		this.pager[_B9](this.MbK);
		this.bindPager(this.pager)
	},
	setPager: function($) {
		if (typeof $ == "string") {
			var _ = $iw($);
			if (!_) return;
			zmj.parse($);
			$ = zmj.get($)
		}
		if ($) this.bindPager($)
	},
	bindPager: function($) {
		$.on("pagechanged", this.ZGn, this);
		this.on("load",
		function(_) {
			$.update(this.pageIndex, this.pageSize, this[Jju]);
			this.totalPage = $.totalPage
		},
		this)
	},
	setIdField: function($) {
		this[Ga3p] = $
	},
	getIdField: function() {
		return this[Ga3p]
	},
	setUrl: function($) {
		this.url = $
	},
	getUrl: function($) {
		return this.url
	},
	setAutoLoad: function($) {
		this.autoLoad = $
	},
	getAutoLoad: function($) {
		return this.autoLoad
	},
	YBU: true,
	loadData: function(A) {
		if (!zmj.isArray(A)) A = [];
		this.data = A;
		if (this.YBU == true) this.HBm = {};
		this.Udy = [];
		this.Cj = {};
		this.HKKq = [];
		this.YCm = {};
		this._cellErrors = [];
		this._cellMapErrors = {};
		for (var $ = 0, B = A.length; $ < B; $++) {
			var _ = A[$];
			_._uid = XVZ++;
			_._index = $;
			this.Cj[_._uid] = _
		}
		this[J_w]()
	},
	setData: function($) {
		this[YIu]($)
	},
	getData: function() {
		return this.data.clone()
	},
	toArray: function() {
		return this.data.clone()
	},
	getRange: function(A, C) {
		if (A > C) {
			var D = A;
			A = C;
			C = D
		}
		var B = this.data,
		E = [];
		for (var _ = A, F = C; _ <= F; _++) {
			var $ = B[_];
			E.push($)
		}
		return E
	},
	selectRange: function($, _) {
		if (!zmj.isNumber($)) $ = this.indexOf($);
		if (!zmj.isNumber(_)) _ = this.indexOf(_);
		if (zmj.isNull($) || zmj.isNull(_)) return;
		var A = this.getRange($, _);
		this[HXHS](A)
	},
	getHeaderHeight: function() {
		return this.showHeader ? $L7(this.Kz) : 0
	},
	getFooterHeight: function() {
		return this[EzY] ? $L7(this.MbK) : 0
	},
	getFilterRowHeight: function() {
		return this[SdU] ? $L7(this.ATG) : 0
	},
	getSummaryRowHeight: function() {
		return this[VTo] ? $L7(this.Prc) : 0
	},
	HJO: function() {
		return this[AjT]() ? $L7(this.S8Q) : 0
	},
	_gR: function(F) {
		var A = F == "empty",
		B = 0;
		if (A && this.showEmptyText == false) B = 1;
		var H = "",
		D = this[U8KO]();
		if (A) H += "<tr style=\"height:" + B + "px\">";
		else if (isIE) {
			if (isIE6 || isIE7 || (isIE8 && !jQuery.boxModel) || (isIE9 && !jQuery.boxModel)) H += "<tr style=\"display:none;\">";
			else H += "<tr >"
		} else H += "<tr style=\"height:" + B + "px\">";
		for (var $ = 0, E = D.length; $ < E; $++) {
			var C = D[$],
			_ = C.width,
			G = this.YFB(C) + "$" + F;
			H += "<td id=\"" + G + "\" style=\"padding:0;border:0;margin:0;height:" + B + "px;";
			if (C.width) H += "width:" + C.width;
			if ($ < this[Dgs] || C.visible == false) H += ";display:none;";
			H += "\" ></td>"
		}
		H += "</tr>";
		return H
	},
	Jo: function() {
		if (this.ATG.firstChild) this.ATG.removeChild(this.ATG.firstChild);
		var B = this[AjT](),
		C = this[U8KO](),
		F = [];
		F[F.length] = "<table class=\"zmj-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		F[F.length] = this._gR("filter");
		F[F.length] = "<tr >";
		for (var $ = 0, D = C.length; $ < D; $++) {
			var A = C[$],
			E = this.ZYe(A);
			F[F.length] = "<td id=\"";
			F[F.length] = E;
			F[F.length] = "\" class=\"zmj-grid-filterCell\" style=\"";
			if ((B && $ < this[Dgs]) || A.visible == false || A._hide == true) F[F.length] = ";display:none;";
			F[F.length] = "\"><span class=\"zmj-grid-hspace\"></span></td>"
		}
		F[F.length] = "</tr></table>";
		this.ATG.innerHTML = F.join("");
		for ($ = 0, D = C.length; $ < D; $++) {
			A = C[$];
			if (A.filter) {
				var _ = this.getFilterCellEl($);
				A.filter[_B9](_)
			}
		}
	},
	En: function() {
		if (this.Prc.firstChild) this.Prc.removeChild(this.Prc.firstChild);
		var A = this[AjT](),
		B = this[U8KO](),
		E = [];
		E[E.length] = "<table class=\"zmj-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		E[E.length] = this._gR("summary");
		E[E.length] = "<tr >";
		for (var $ = 0, C = B.length; $ < C; $++) {
			var _ = B[$],
			D = this.V6b(_);
			E[E.length] = "<td id=\"";
			E[E.length] = D;
			E[E.length] = "\" class=\"zmj-grid-summaryCell\" style=\"";
			if ((A && $ < this[Dgs]) || _.visible == false || _._hide == true) E[E.length] = ";display:none;";
			E[E.length] = "\"><span class=\"zmj-grid-hspace\"></span></td>"
		}
		E[E.length] = "</tr></table>";
		this.Prc.innerHTML = E.join("")
	},
	SGo: function(L) {
		L = L || "";
		var N = this[AjT](),
		A = this.T75(),
		G = this[U8KO](),
		H = G.length,
		F = [];
		F[F.length] = "<table style=\"" + L + ";display:table\" class=\"zmj-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		F[F.length] = this._gR("header");
		for (var M = 0, _ = A.length; M < _; M++) {
			var D = A[M];
			F[F.length] = "<tr >";
			for (var I = 0, E = D.length; I < E; I++) {
				var B = D[I],
				C = B.header;
				if (typeof C == "function") C = C[KQk](this, B);
				if (zmj.isNull(C) || C === "") C = "&nbsp;";
				var J = this.YFB(B),
				$ = "";
				if (this.sortField == B.field) $ = this.sortOrder == "asc" ? "zmj-grid-asc": "zmj-grid-desc";
				F[F.length] = "<td id=\"";
				F[F.length] = J;
				F[F.length] = "\" class=\"zmj-grid-headerCell " + $ + " " + (B.headerCls || "") + " ";
				if (I == H - 1) F[F.length] = " zmj-grid-last-column ";
				F[F.length] = "\" style=\"";
				var K = G.indexOf(B);
				if ((N && K != -1 && K < this[Dgs]) || B.visible == false || B._hide == true) F[F.length] = ";display:none;";
				if (B.columns && B.columns.length > 0 && B.colspan == 0) F[F.length] = ";display:none;";
				if (B.headerStyle) F[F.length] = B.headerStyle + ";";
				if (B.headerAlign) F[F.length] = "text-align:" + B.headerAlign + ";";
				F[F.length] = "\" ";
				if (B.rowspan) F[F.length] = "rowspan=\"" + B.rowspan + "\" ";
				if (B.colspan) F[F.length] = "colspan=\"" + B.colspan + "\" ";
				F[F.length] = "><div class=\"zmj-grid-cellInner\">";
				F[F.length] = C;
				if ($) F[F.length] = "<span class=\"zmj-grid-sortIcon\"></span>";
				F[F.length] = "</div>";
				F[F.length] = "</td>"
			}
			F[F.length] = "</tr>"
		}
		F[F.length] = "</table>";
		var O = F.join("");
		O = "<div class=\"zmj-grid-header\">" + O + "</div>";
		this._headerInnerEl.innerHTML = F.join("");
		this.fire("refreshHeader")
	},
	_doUpdateBody: function() {
		var G = this[U8KO]();
		for (var N = 0, H = G.length; N < H; N++) {
			var F = G[N];
			delete F._hide
		}
		this.SGo();
		var Q = this.data,
		T = this.isVirtualScroll(),
		J = this._LCGB(),
		M = [],
		R = this[Uw](),
		C = 0;
		if (T) C = J.top;
		if (R) M[M.length] = "<table class=\"zmj-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		else M[M.length] = "<table style=\"position:absolute;top:" + C + "px;left:0;\" class=\"zmj-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		M[M.length] = this._gR("body");
		if (Q.length > 0) {
			if (this[HuC]()) {
				var O = this.R6Yf();
				for (var S = 0, A = O.length; S < A; S++) {
					var _ = O[S],
					L = this.uid + "$group$" + _.id,
					U = this.C51A(_);
					M[M.length] = "<tr id=\"" + L + "\" class=\"zmj-grid-groupRow\"><td class=\"zmj-grid-groupCell\" colspan=\"" + G.length + "\"><div class=\"zmj-grid-groupHeader\">";
					M[M.length] = "<div class=\"zmj-grid-group-ecicon\"></div>";
					M[M.length] = "<div class=\"zmj-grid-groupTitle\">" + U.cellHtml + "</div>";
					M[M.length] = "</div></td></tr>";
					var B = _.rows;
					for (N = 0, H = B.length; N < H; N++) {
						var P = B[N];
						this.ZkyA(P, M, N)
					}
					if (this.showGroupSummary);
				}
			} else if (T) {
				var D = J.start,
				E = J.end;
				for (N = D, H = E; N < H; N++) {
					P = Q[N];
					this.ZkyA(P, M, N)
				}
			} else for (N = 0, H = Q.length; N < H; N++) {
				P = Q[N];
				this.ZkyA(P, M, N)
			}
		} else {
			M[M.length] = this._gR("empty");
			if (this.showEmptyText) M[M.length] = "<tr><td class=\"zmj-grid-emptyText\" colspan=\"50\">" + this[$RmY] + "</td></tr>"
		}
		M[M.length] = "</table>";
		if (this._bodyInnerEl.firstChild) this._bodyInnerEl.removeChild(this._bodyInnerEl.firstChild);
		this._bodyInnerEl.innerHTML = M.join("");
		if (T) {
			this._rowHeight = 23;
			try {
				var $ = this._bodyInnerEl.firstChild.rows[1];
				if ($) this._rowHeight = $.offsetHeight
			} catch(I) {}
			var K = this._rowHeight * this.data.length;
			this._bodyScrollEl.style.display = "block";
			this._bodyScrollEl.style.height = K + "px"
		} else this._bodyScrollEl.style.display = "none"
	},
	ZkyA: function(F, D, P) {
		if (!zmj.isNumber(P)) P = this.data.indexOf(F);
		var L = P == this.data.length - 1,
		N = this[AjT](),
		O = !D;
		if (!D) D = [];
		var A = this[U8KO](),
		G = -1,
		I = " ",
		E = -1,
		J = " ";
		D[D.length] = "<tr id=\"";
		D[D.length] = this.OM(F);
		D[D.length] = "\" class=\"zmj-grid-row ";
		if (this[FURX](F)) {
			D[D.length] = this.Cg6;
			D[D.length] = " "
		}
		if (F._state == "deleted") D[D.length] = "zmj-grid-deleteRow ";
		if (F._state == "added") D[D.length] = "zmj-grid-newRow ";
		if (this[WGs] && P % 2 == 1) {
			D[D.length] = this.OyY;
			D[D.length] = " "
		}
		G = D.length;
		D[D.length] = I;
		D[D.length] = "\" style=\"";
		E = D.length;
		D[D.length] = J;
		D[D.length] = "\">";
		var H = A.length - 1;
		for (var K = 0, $ = H; K <= $; K++) {
			var _ = A[K],
			M = _.field ? this.QEp0(F, _.field) : false,
			B = this.getCellError(F, _),
			Q = this.Ze(F, _, P, K),
			C = this.Gn1(F, _);
			D[D.length] = "<td id=\"";
			D[D.length] = C;
			D[D.length] = "\" class=\"zmj-grid-cell ";
			if (Q.cellCls) D[D.length] = Q.cellCls;
			if (B) D[D.length] = " zmj-grid-cell-error ";
			if (this.Em3y && this.Em3y[0] == F && this.Em3y[1] == _) {
				D[D.length] = " ";
				D[D.length] = this.EPmk
			}
			if (L) D[D.length] = " zmj-grid-last-row ";
			if (K == H) D[D.length] = " zmj-grid-last-column ";
			if (N && this[Dgs] <= K && K <= this[WGh]) {
				D[D.length] = " ";
				D[D.length] = this.IAU + " "
			}
			D[D.length] = "\" style=\"";
			if (_.align) {
				D[D.length] = "text-align:";
				D[D.length] = _.align;
				D[D.length] = ";"
			}
			if (Q.allowCellWrap) D[D.length] = "white-space:normal;text-overflow:normal;word-break:normal;";
			if (Q.cellStyle) {
				D[D.length] = Q.cellStyle;
				D[D.length] = ";"
			}
			if (N && K < this[Dgs] || _.visible == false) D[D.length] = "display:none;";
			D[D.length] = "\">";
			if (M) D[D.length] = "<div class=\"zmj-grid-cell-inner zmj-grid-cell-dirty\">";
			D[D.length] = Q.cellHtml;
			if (M) D[D.length] = "</div>";
			D[D.length] = "</td>";
			if (Q.rowCls) I = Q.rowCls;
			if (Q.rowStyle) J = Q.rowStyle
		}
		D[G] = I;
		D[E] = J;
		D[D.length] = "</tr>";
		if (O) return D.join("")
	},
	isVirtualScroll: function() {
		return this.virtualScroll && this[Uw]() == false && this[HuC]() == false
	},
	getScrollLeft: function() {
		return this[AjT]() ? this.S8Q.scrollLeft: this.VC5.scrollLeft
	},
	doUpdate: function() {
		var $ = new Date();
		if (this.Djl === false) return;
		if (this[Uw]() == true) this[B1z]("zmj-grid-auto");
		else this[T07]("zmj-grid-auto");
		this._doUpdateBody();
		if (this.isVirtualScroll());
		if (this[AjT]()) this.My0U();
		this[X5Q]()
	},
	QBWB: function() {
		if (isIE) {
			this.AE.style.display = "none";
			h = this[KjJg](true);
			w = this[BMK](true);
			this.AE.style.display = ""
		}
	},
	SjC$: function() {
		this[X5Q]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		this._headerInnerEl.scrollLeft = this.VC5.scrollLeft;
		var K = new Date(),
		M = this[AjT](),
		J = this._headerInnerEl.firstChild,
		C = this._bodyInnerEl.firstChild,
		G = this.ATG.firstChild,
		$ = this.Prc.firstChild,
		L = this[Uw]();
		h = this[KjJg](true);
		B = this[BMK](true);
		var I = B;
		if (I < 17) I = 17;
		if (h < 0) h = 0;
		var H = I,
		_ = 2000;
		if (!L) {
			h = h - this[USh]() - this[Jd]() - this[Ys]() - this.getSummaryRowHeight() - this.HJO();
			if (h < 0) h = 0;
			this.VC5.style.height = h + "px";
			_ = h
		} else this.VC5.style.height = "auto";
		var D = this.VC5.scrollHeight,
		F = this.VC5.clientHeight,
		A = jQuery(this.VC5).css("overflow-y") == "hidden";
		if (this.fitColumns) {
			if (A || F >= D) {
				var B = H + "px";
				J.style.width = B;
				C.style.width = B;
				G.style.width = B;
				$.style.width = B
			} else {
				B = parseInt(H - 17);
				if (B < 0) B = 0;
				B = B + "px";
				J.style.width = B;
				C.style.width = B;
				G.style.width = B;
				$.style.width = B
			}
			if (L) if (H >= this.VC5.scrollWidth) this.VC5.style.height = "auto";
			else this.VC5.style.height = (C.offsetHeight + 17) + "px";
			if (L && M) this.VC5.style.height = "auto"
		} else {
			J.style.width = C.style.width = "0px";
			G.style.width = $.style.width = "0px"
		}
		if (this.fitColumns) {
			if (!A && F < D) {
				this._headerInnerEl.style.width = (I - 17) + "px";
				this.ATG.style.width = (I - 17) + "px";
				this.Prc.style.width = (I - 17) + "px"
			} else {
				this._headerInnerEl.style.width = "100%";
				this.ATG.style.width = "100%";
				this.Prc.style.width = "100%";
				this.MbK.style.width = "auto"
			}
		} else {
			this._headerInnerEl.style.width = "100%";
			this.ATG.style.width = "100%";
			this.Prc.style.width = "100%";
			this.MbK.style.width = "auto"
		}
		if (this[AjT]()) {
			if (!A && F < this.VC5.scrollHeight) this.S8Q.style.width = (I - 17) + "px";
			else this.S8Q.style.width = (I) + "px";
			if (this.VC5.offsetWidth < C.offsetWidth) {
				this.S8Q.firstChild.style.width = this.Tqw5() + "px";
				J.style.width = C.style.width = "0px";
				G.style.width = $.style.width = "0px"
			} else this.S8Q.firstChild.style.width = "0px"
		}
		if (this.data.length == 0) this._doInnerLayout();
		else {
			var E = this;
			if (!this._innerLayoutTimer) this._innerLayoutTimer = setTimeout(function() {
				E._doInnerLayout();
				E._innerLayoutTimer = null
			},
			10)
		}
		this.fire("layout")
	},
	_doInnerLayout: function() {
		this.Zsp();
		this.NQH();
		zmj.layout(this.ATG);
		zmj.layout(this.Prc);
		zmj.layout(this.MbK);
		zmj[USz](this.el);
		this._doLayouted = true
	},
	setFitColumns: function($) {
		this.fitColumns = $;
		if (this.fitColumns) Kw(this.el, "zmj-grid-fixcolumns");
		else _I(this.el, "zmj-grid-fixcolumns");
		this[X5Q]()
	},
	getFitColumns: function($) {
		return this.fitColumns
	},
	Tqw5: function() {
		if (this.VC5.offsetWidth < this._bodyInnerEl.firstChild.offsetWidth) {
			var _ = 0,
			B = this[U8KO]();
			for (var $ = 0, C = B.length; $ < C; $++) {
				var A = B[$];
				_ += this[PL6](A)
			}
			return _
		} else return 0
	},
	OM: function($) {
		return this.uid + "$" + $._uid
	},
	Gn1: function($, _) {
		return this.uid + "$" + $._uid + "$" + _._id
	},
	ZYe: function($) {
		return this.uid + "$filter$" + $._id
	},
	V6b: function($) {
		return this.uid + "$summary$" + $._id
	},
	ZG: function($) {
		return this.uid + "$detail$" + $._uid
	},
	_getHeaderScrollEl: function() {
		return this._headerInnerEl
	},
	getFilterCellEl: function($) {
		$ = this[ES6s]($);
		if (!$) return null;
		return document.getElementById(this.ZYe($))
	},
	getSummaryCellEl: function($) {
		$ = this[ES6s]($);
		if (!$) return null;
		return document.getElementById(this.V6b($))
	},
	$s: function($) {
		$ = this[I3Ov]($);
		if (!$) return null;
		return document.getElementById(this.OM($))
	},
	getCellBox: function(_, A) {
		_ = this[I3Ov](_);
		A = this[ES6s](A);
		if (!_ || !A) return null;
		var $ = this.DX3l(_, A);
		if (!$) return null;
		return Vhwd($)
	},
	getRowBox: function(_) {
		var $ = this.$s(_);
		if ($) return Vhwd($);
		return null
	},
	getRowsBox: function() {
		var G = [],
		C = this.data,
		B = 0;
		for (var _ = 0, E = C.length; _ < E; _++) {
			var A = C[_],
			F = this.OM(A),
			$ = document.getElementById(F);
			if ($) {
				var D = $.offsetHeight;
				G[_] = {
					top: B,
					height: D,
					bottom: B + D
				};
				B += D
			}
		}
		return G
	},
	setColumnWidth: function(E, B) {
		E = this[ES6s](E);
		if (!E) return;
		if (zmj.isNumber(B)) B += "px";
		E.width = B;
		var _ = this.YFB(E) + "$header",
		F = this.YFB(E) + "$body",
		A = this.YFB(E) + "$filter",
		D = this.YFB(E) + "$summary",
		C = document.getElementById(_),
		$ = document.getElementById(F),
		G = document.getElementById(A),
		H = document.getElementById(D);
		if (C) C.style.width = B;
		if ($) $.style.width = B;
		if (G) G.style.width = B;
		if (H) H.style.width = B;
		this[X5Q]()
	},
	getColumnWidth: function(B) {
		B = this[ES6s](B);
		if (!B) return 0;
		if (B.visible == false) return 0;
		var _ = 0,
	    //C = this.YFB(B) + "$body",
		C = this.YFB(B),
		A = document.getElementById(C);
		if (A) {
			var $ = A.style.display;
			A.style.display = "";
			_ = F$u(A);
			A.style.display = $
		}
		return _
	},
	HvO: function(C, N) {
		var I = document.getElementById(this.YFB(C));
		if (I) I.style.display = N ? "": "none";
		var D = document.getElementById(this.ZYe(C));
		if (D) D.style.display = N ? "": "none";
		var _ = document.getElementById(this.V6b(C));
		if (_) _.style.display = N ? "": "none";
		var J = this.YFB(C) + "$header",
		M = this.YFB(C) + "$body",
		B = this.YFB(C) + "$filter",
		E = this.YFB(C) + "$summary",
		L = document.getElementById(J);
		if (L) L.style.display = N ? "": "none";
		var O = document.getElementById(B);
		if (O) O.style.display = N ? "": "none";
		var P = document.getElementById(E);
		if (P) P.style.display = N ? "": "none";
		if ($) {
			if (N && $.style.display == "") return;
			if (!N && $.style.display == "none") return
		}
		var $ = document.getElementById(M);
		if ($) $.style.display = N ? "": "none";
		for (var H = 0, F = this.data.length; H < F; H++) {
			var K = this.data[H],
			G = this.Gn1(K, C),
			A = document.getElementById(G);
			if (A) A.style.display = N ? "": "none"
		}
	},
	VUG: function(C, D, B) {
		for (var $ = 0, E = this.data.length; $ < E; $++) {
			var A = this.data[$],
			F = this.Gn1(A, C),
			_ = document.getElementById(F);
			if (_) if (B) _I(_, D);
			else Kw(_, D)
		}
	},
	_NIa: function() {
		var C = this[AjT]();
		if (C) _I(this.el, this.Ozj);
		else Kw(this.el, this.Ozj);
		var D = this[U8KO](),
		_ = this.ATG.firstChild,
		$ = this.Prc.firstChild;
		if (C) {
			_.style.height = jQuery(_).outerHeight() + "px";
			$.style.height = jQuery($).outerHeight() + "px"
		} else {
			_.style.height = "auto";
			$.style.height = "auto"
		}
		if (this[AjT]()) {
			for (var A = 0, E = D.length; A < E; A++) {
				var B = D[A];
				if (this[Dgs] <= A && A <= this[WGh]) this.VUG(B, this.IAU, true)
			}
			this.IPo(true)
		} else {
			for (A = 0, E = D.length; A < E; A++) {
				B = D[A];
				delete B._hide;
				if (B.visible) this.HvO(B, true);
				this.VUG(B, this.IAU, false)
			}
			this.SGo();
			this.IPo(false)
		}
		this[X5Q]();
		this.S8Q.scrollLeft = this._headerInnerEl.scrollLeft = this.VC5.scrollLeft = 0;
		this.QBWB()
	},
	_deferFrozen: function() {
		this._headerTableHeight = $L7(this._headerInnerEl.firstChild);
		var $ = this;
		if (this._deferFrozenTimer) clearTimeout(this._deferFrozenTimer);
		this._deferFrozenTimer = setTimeout(function() {
			$._NIa()
		},
		1)
	},
	setFrozenStartColumn: function($) {
		var _ = new Date();
		$ = parseInt($);
		if (isNaN($)) return;
		this[Dgs] = $;
		this._deferFrozen()
	},
	getFrozenStartColumn: function() {
		return this[Dgs]
	},
	setFrozenEndColumn: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this[WGh] = $;
		this._deferFrozen()
	},
	getFrozenEndColumn: function() {
		return this[WGh]
	},
	unFrozenColumns: function() {
		this[VsL]( - 1);
		this[ZPu]( - 1)
	},
	frozenColumns: function($, _) {
		this[HvG]();
		this[VsL]($);
		this[ZPu](_)
	},
	_rowHeight: 23,
	_LCGB: function() {
		var E = this._getViewNowRegion(),
		D = this._rowHeight,
		G = this.VC5.scrollTop,
		A = E.start,
		B = E.end;
		for (var $ = 0, F = this.data.length; $ < F; $ += this._virtualRows) {
			var C = $ + this._virtualRows;
			if ($ <= A && A < C) A = $;
			if ($ < B && B <= C) B = C
		}
		if (B > this.data.length) B = this.data.length;
		var _ = A * D;
		this._viewRegion = {
			start: A,
			end: B,
			top: _
		};
		return this._viewRegion
	},
	_getViewNowRegion: function() {
		var B = this._rowHeight,
		D = this.VC5.scrollTop,
		$ = this.VC5.offsetHeight,
		C = parseInt(D / B),
		_ = parseInt((D + $) / B) + 1,
		A = {
			start: C,
			end: _
		};
		return A
	},
	_canVirtualUpdate: function() {
		if (!this._viewRegion) return true;
		var $ = this._getViewNowRegion();
		if (this._viewRegion.start <= $.start && $.end <= this._viewRegion.end) return false;
		return true
	},
	_tryUpdateScroll: function() {
		var $ = this._canVirtualUpdate();
		if ($) this[J_w]()
	},
	Y_d: function(_) {
		if (this[AjT]()) return;
		this.ATG.scrollLeft = this.Prc.scrollLeft = this._headerInnerEl.scrollLeft = this.VC5.scrollLeft;
		var $ = this;
		setTimeout(function() {
			$._headerInnerEl.scrollLeft = $.VC5.scrollLeft
		},
		10);
		if (this.isVirtualScroll()) {
			$ = this;
			if (this._scrollTopTimer) clearTimeout(this._scrollTopTimer);
			this._scrollTopTimer = setTimeout(function() {
				$._scrollTopTimer = null;
				$._tryUpdateScroll()
			},
			100)
		}
	},
	My0U: function(_) {
		var $ = this;
		if (this._HScrollTimer) return;
		this._HScrollTimer = setTimeout(function() {
			$._doScrollFrozen();
			$._HScrollTimer = null
		},
		30)
	},
	_doScrollFrozen: function() {
		if (!this[AjT]()) return;
		var F = this[U8KO](),
		H = this.S8Q.scrollLeft,
		$ = this[WGh],
		C = 0;
		for (var _ = $ + 1, G = F.length; _ < G; _++) {
			var D = F[_];
			if (!D.visible) continue;
			var A = this[PL6](D);
			if (H <= C) break;
			$ = _;
			C += A
		}
		if (this._lastStartColumn === $) return;
		this._lastStartColumn = $;
		for (_ = 0, G = F.length; _ < G; _++) {
			D = F[_];
			delete D._hide;
			if (this[WGh] < _ && _ <= $) D._hide = true
		}
		for (_ = 0, G = F.length; _ < G; _++) {
			D = F[_];
			if (_ < this.frozenStartColumn || (_ > this[WGh] && _ < $)) this.HvO(D, false);
			else this.HvO(D, true)
		}
		var E = "width:100%;";
		if (this.S8Q.offsetWidth < this.S8Q.scrollWidth || !this.fitColumns) E = "width:0px";
		this.SGo(E);
		var B = this._headerTableHeight;
		if (zmj.isIE9) B -= 1;
		ZIA(this._headerInnerEl.firstChild, B);
		for (_ = this[WGh] + 1, G = F.length; _ < G; _++) {
			D = F[_];
			if (!D.visible) continue;
			if (_ <= $) this.HvO(D, false);
			else this.HvO(D, true)
		}
		this.Gq();
		this.fire("layout")
	},
	IPo: function(B) {
		var D = this.data;
		for (var _ = 0, E = D.length; _ < E; _++) {
			var A = D[_],
			$ = this.$s(A);
			if ($) if (B) {
				var C = 0;
				$.style.height = C + "px"
			} else $.style.height = ""
		}
	},
	_doGridLines: function() {
		if (this[BJ]) Kw(this.el, "zmj-grid-hideVLine");
		else _I(this.el, "zmj-grid-hideVLine");
		if (this[ANs]) Kw(this.el, "zmj-grid-hideHLine");
		else _I(this.el, "zmj-grid-hideHLine")
	},
	setShowHGridLines: function($) {
		if (this[ANs] != $) {
			this[ANs] = $;
			this._doGridLines();
			this[X5Q]()
		}
	},
	getShowHGridLines: function() {
		return this[ANs]
	},
	setShowVGridLines: function($) {
		if (this[BJ] != $) {
			this[BJ] = $;
			this._doGridLines();
			this[X5Q]()
		}
	},
	getShowVGridLines: function() {
		return this[BJ]
	},
	setShowFilterRow: function($) {
		if (this[SdU] != $) {
			this[SdU] = $;
			this._8Rows();
			this[X5Q]()
		}
	},
	getShowFilterRow: function() {
		return this[SdU]
	},
	setShowSummaryRow: function($) {
		if (this[VTo] != $) {
			this[VTo] = $;
			this._8Rows();
			this[X5Q]()
		}
	},
	getShowSummaryRow: function() {
		return this[VTo]
	},
	PUY: function() {
		if (this[WGs] == false) return;
		var B = this.data;
		for (var _ = 0, C = B.length; _ < C; _++) {
			var A = B[_],
			$ = this.$s(A);
			if ($) if (this[WGs] && _ % 2 == 1) _I($, this.OyY);
			else Kw($, this.OyY)
		}
	},
	setAllowAlternating: function($) {
		if (this[WGs] != $) {
			this[WGs] = $;
			this.PUY()
		}
	},
	getAllowAlternating: function() {
		return this[WGs]
	},
	setEnableHotTrack: function($) {
		if (this[ZeW] != $) this[ZeW] = $
	},
	getEnableHotTrack: function() {
		return this[ZeW]
	},
	setShowLoading: function($) {
		this.showLoading = $
	},
	setAllowCellWrap: function($) {
		if (this.allowCellWrap != $) this.allowCellWrap = $
	},
	getAllowCellWrap: function() {
		return this.allowCellWrap
	},
	setVirtualScroll: function($) {
		if (this.virtualScroll != $) this.virtualScroll = $
	},
	getVirtualScroll: function() {
		return this.virtualScroll
	},
	setScrollTop: function($) {
		this.scrollTop = $;
		this.VC5.scrollTop = $
	},
	getScrollTop: function() {
		return this.VC5.scrollTop
	},
	setBodyStyle: function($) {
		this.bodyStyle = $;
		DTHl(this.VC5, $)
	},
	getBodyStyle: function() {
		return this.bodyStyle
	},
	setBodyCls: function($) {
		this.bodyCls = $;
		_I(this.VC5, $)
	},
	getBodyCls: function() {
		return this.bodyCls
	},
	setFooterStyle: function($) {
		this.footerStyle = $;
		DTHl(this.MbK, $)
	},
	getFooterStyle: function() {
		return this.footerStyle
	},
	setFooterCls: function($) {
		this.footerCls = $;
		_I(this.MbK, $)
	},
	getFooterCls: function() {
		return this.footerCls
	},
	setShowHeader: function($) {
		this.showHeader = $;
		this._8Rows();
		this[X5Q]()
	},
	setShowFooter: function($) {
		this[EzY] = $;
		this._8Rows();
		this[X5Q]()
	},
	setAutoHideRowDetail: function($) {
		this.autoHideRowDetail = $
	},
	setSortMode: function($) {
		this.sortMode = $
	},
	getSortMode: function() {
		return this.sortMode
	},
	setAllowSortColumn: function($) {
		this[SA] = $
	},
	getAllowSortColumn: function() {
		return this[SA]
	},
	setAllowMoveColumn: function($) {
		this[GUE] = $
	},
	getAllowMoveColumn: function() {
		return this[GUE]
	},
	setAllowResizeColumn: function($) {
		this[Vvds] = $
	},
	getAllowResizeColumn: function() {
		return this[Vvds]
	},
	setSelectOnLoad: function($) {
		this.selectOnLoad = $
	},
	getSelectOnLoad: function() {
		return this.selectOnLoad
	},
	setAllowResize: function($) {
		this[URW] = $;
		this.P2Y.style.display = this[URW] ? "": "none"
	},
	getAllowResize: function() {
		return this[URW]
	},
	setShowEmptyText: function($) {
		this.showEmptyText = $
	},
	getShowEmptyText: function() {
		return this.showEmptyText
	},
	setEmptyText: function($) {
		this[$RmY] = $
	},
	getEmptyText: function() {
		return this[$RmY]
	},
	setCellEditAction: function($) {
		this.cellEditAction = $
	},
	getCellEditAction: function() {
		return this.cellEditAction
	},
	setAllowCellValid: function($) {
		this.allowCellValid = $
	},
	getAllowCellValid: function() {
		return this.allowCellValid
	},
	_YA6: true,
	showAllRowDetail: function() {
		this._YA6 = false;
		for (var $ = 0, A = this.data.length; $ < A; $++) {
			var _ = this.data[$];
			this[AmKa](_)
		}
		this._YA6 = true;
		this[X5Q]()
	},
	hideAllRowDetail: function() {
		this._YA6 = false;
		for (var $ = 0, A = this.data.length; $ < A; $++) {
			var _ = this.data[$];
			if (this[QVw](_)) this[D2$](_)
		}
		this._YA6 = true;
		this[X5Q]()
	},
	showRowDetail: function(_) {
		_ = this[I3Ov](_);
		if (!_) return;
		var B = this[_7](_);
		B.style.display = "";
		_._showDetail = true;
		var $ = this.$s(_);
		_I($, "zmj-grid-expandRow");
		this.fire("showrowdetail", {
			record: _
		});
		if (this._YA6) this[X5Q]();
		var A = this
	},
	hideRowDetail: function(_) {
		var B = this.ZG(_),
		A = document.getElementById(B);
		if (A) A.style.display = "none";
		delete _._showDetail;
		var $ = this.$s(_);
		Kw($, "zmj-grid-expandRow");
		this.fire("hiderowdetail", {
			record: _
		});
		if (this._YA6) this[X5Q]()
	},
	toggleRowDetail: function($) {
		$ = this[I3Ov]($);
		if (!$) return;
		if (grid[QVw]($)) grid[D2$]($);
		else grid[AmKa]($)
	},
	isShowRowDetail: function($) {
		$ = this[I3Ov]($);
		if (!$) return false;
		return !! $._showDetail
	},
	getRowDetailEl: function($) {
		$ = this[I3Ov]($);
		if (!$) return null;
		var A = this.ZG($),
		_ = document.getElementById(A);
		if (!_) _ = this.I9j($);
		return _
	},
	getRowDetailCellEl: function($) {
		var _ = this[_7]($);
		if (_) return _.cells[0]
	},
	I9j: function($) {
		var A = this.$s($),
		B = this.ZG($),
		_ = this[U8KO]().length;
		jQuery(A).after("<tr id=\"" + B + "\" class=\"zmj-grid-detailRow\"><td class=\"zmj-grid-detailCell\" colspan=\"" + _ + "\"></td></tr>");
		this.Gq();
		return document.getElementById(B)
	},
	DZ7u: function() {
		var D = this._bodyInnerEl.firstChild.getElementsByTagName("tr")[0],
		B = D.getElementsByTagName("td"),
		A = 0;
		for (var _ = 0, C = B.length; _ < C; _++) {
			var $ = B[_];
			if ($.style.display != "none") A++
		}
		return A
	},
	Gq: function() {
		var _ = jQuery(".zmj-grid-detailRow", this.el),
		B = this.DZ7u();
		for (var A = 0, C = _.length; A < C; A++) {
			var D = _[A],
			$ = D.firstChild;
			$.colSpan = B
		}
	},
	Zsp: function() {
		for (var $ = 0, B = this.data.length; $ < B; $++) {
			var _ = this.data[$];
			if (_._showDetail == true) {
				var C = this.ZG(_),
				A = document.getElementById(C);
				if (A) zmj.layout(A)
			}
		}
	},
	NQH: function() {
		for (var $ = 0, B = this.data.length; $ < B; $++) {
			var _ = this.data[$];
			if (_._editing == true) {
				var A = this.$s(_);
				if (A) zmj.layout(A)
			}
		}
	},
	ZGn: function($) {
		$.cancel = true;
		this.gotoPage($.pageIndex, $[HeC])
	},
	setSizeList: function($) {
		if (!zmj.isArray($)) return;
		this.pager.setSizeList($)
	},
	getSizeList: function() {
		return this.pager.getSizeList()
	},
	setPageSize: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this[HeC] = $;
		if (this.pager) this.pager.update(this.pageIndex, this.pageSize, this[Jju])
	},
	getPageSize: function() {
		return this[HeC]
	},
	setPageIndex: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this[S9] = $;
		if (this.pager) this.pager.update(this.pageIndex, this.pageSize, this[Jju])
	},
	getPageIndex: function() {
		return this[S9]
	},
	setShowPageSize: function($) {
		this.showPageSize = $;
		this.pager.setShowPageSize($)
	},
	getShowPageSize: function() {
		return this.showPageSize
	},
	setShowPageIndex: function($) {
		this.showPageIndex = $;
		this.pager.setShowPageIndex($)
	},
	getShowPageIndex: function() {
		return this.showPageIndex
	},
	setShowTotalCount: function($) {
		this.showTotalCount = $;
		this.pager.setShowTotalCount($)
	},
	getShowTotalCount: function() {
		return this.showTotalCount
	},
	pageIndex: 0,
	pageSize: 10,
	totalCount: 0,
	totalPage: 0,
	showPageSize: true,
	showPageIndex: true,
	showTotalCount: true,
	setTotalCount: function($) {
		this[Jju] = $;
		this.pager.setTotalCount($)
	},
	getTotalCount: function() {
		return this[Jju]
	},
	getTotalPage: function() {
		return this.totalPage
	},
	sortField: "",
	sortOrder: "",
	url: "",
	autoLoad: false,
	loadParams: null,
	ajaxAsync: true,
	ajaxMethod: "post",
	showLoading: true,
	resultAsData: false,
	checkSelectOnLoad: true,
	setCheckSelectOnLoad: function($) {
		this[WlX] = $
	},
	getCheckSelectOnLoad: function() {
		return this[WlX]
	},
	Q7: "total",
	_dataField: "data",
	BhA: function($) {
		return $.data
	},
	Vu: function(_, B, C) {
		_ = _ || {};
		if (zmj.isNull(_[S9])) _[S9] = 0;
		if (zmj.isNull(_[HeC])) _[HeC] = this[HeC];
		_.sortField = this.sortField;
		_.sortOrder = this.sortOrder;
		if (this.sortMode != "server") {
			_.sortField = this.sortField = "";
			_.sortOrder = this.sortOrder = ""
		}
		this.loadParams = _;
		if (this.showLoading) this.loading();
		var A = this.url,
		E = this.ajaxMethod;
		if (A) if (A.indexOf(".txt") != -1 || A.indexOf(".json") != -1) E = "get";
		var D = {
			url: A,
			async: this.ajaxAsync,
			type: E,
			params: _,
			cancel: false
		};
		this.fire("beforeload", D);
		if (D.cancel == true) return;
		this.A3Value = this.A3 ? this.A3[this.idField] : null;
		var $ = this;
		this.CqP = jQuery.ajax({
			url: D.url,
			async: D.async,
			data: D.params,
			type: D.type,
			cache: false,
			dataType: "text",
			success: function(F, D, C) {
				var J = null;
				try {
					J = zmj.decode(F)
				} catch(K) {
					throw new Error("datagrid json is error!")
				}
				if (J == null) J = {
					data: [],
					total: 0
				};
				$.unmask();
				if (zmj.isNumber(J.error) && J.error != 0) {
					var L = {
						errorCode: J.error,
						xmlHttp: C,
						errorMsg: J.errorMsg,
						result: J
					};
					$.fire("loaderror", L);
					return
				}
				if ($[SN] || zmj.isArray(J)) {
					var G = {};
					G[$.Q7] = J.length;
					G.data = J;
					J = G
				}
				var E = parseInt(J[$.Q7]),
				I = $.BhA(J);
				if (zmj.isNumber(_[S9])) $[S9] = _[S9];
				if (zmj.isNumber(_[HeC])) $[HeC] = _[HeC];
				if (zmj.isNumber(E)) $[Jju] = E;
				var K = {
					result: J,
					data: I,
					total: E,
					cancel: false
				};
				$.fire("preload", K);
				if (K.cancel == true) return;
				var H = $.YA6;
				$.YA6 = false;
				$[YIu](K.data);
				if ($.A3Value && $[WlX]) {
					var A = $[UIb]($.A3Value);
					if (A) $[D3f](A);
					else $[FqM]()
				} else if ($.A3) $[FqM]();
				if ($[DNU]() == null && $.selectOnLoad && $.data.length > 0) $[D3f](0);
				if ($.collapseGroupOnLoad) $.collapseGroups();
				$.fire("load", K);
				if (B) B[KQk]($, J);
				$.YA6 = H;
				$[X5Q]()
			},
			error: function(_, B, A) {
				if (C) C[KQk](scope, _);
				var D = {
					xmlHttp: _,
					errorMsg: _.responseText,
					errorCode: B
				};
				$.fire("loaderror", D);
				$.unmask()
			}
		})
	},
	load: function(_, A, B) {
		if (this._loadTimer) clearTimeout(this._loadTimer);
		var $ = this;
		this[ISW]();
		this.loadParams = _ || {};
		if (this.ajaxAsync) this._loadTimer = setTimeout(function() {
			$.Vu(_, A, B)
		},
		1);
		else $.Vu(_, A, B)
	},
	reload: function(_, $) {
		this.load(this.loadParams, _, $)
	},
	gotoPage: function($, A) {
		var _ = this.loadParams || {};
		if (zmj.isNumber($)) _[S9] = $;
		if (zmj.isNumber(A)) _[HeC] = A;
		this.load(_)
	},
	sortBy: function(E, D) {
		this.sortField = E;
		this.sortOrder = D == "asc" ? "asc": "desc";
		if (this.sortMode == "server") {
			var A = this.loadParams || {};
			A.sortField = E;
			A.sortOrder = D;
			A[S9] = this[S9];
			this.load(A)
		} else {
			var B = this.getData().clone(),
			C = this._getSortFnByField(E);
			if (!C) return;
			var G = [];
			for (var _ = B.length - 1; _ >= 0; _--) {
				var $ = B[_],
				F = $[E];
				if (zmj.isNull(F) || F === "") {
					G.insert(0, $);
					B.removeAt(_)
				}
			}
			zmj.sort(B, C, this);
			B.insertRange(0, G);
			if (this.sortOrder == "desc") B.reverse();
			this.data = B;
			this[J_w]()
		}
	},
	clearSort: function() {
		this.sortField = "";
		this.sortOrder = "";
		this.reload()
	},
	_getSortFnByField: function(D) {
		if (!D) return null;
		var F = "string",
		C = null,
		E = this[U8KO]();
		for (var $ = 0, G = E.length; $ < G; $++) {
			var A = E[$];
			if (A.field == D) {
				if (A.dataType) F = A.dataType.toLowerCase();
				break
			}
		}
		var B = zmj.sortTypes[F];
		if (!B) B = zmj.sortTypes["string"];
		function _(A, F) {
			var C = A[D],
			_ = F[D];
			if (zmj.isNull(C) || C === "" || isNaN(C)) return - 1;
			if (zmj.isNull(_) || _ === "" || isNaN(_)) return 1;
			var $ = B(C),
			E = B(_);
			if ($ > E) return 1;
			else if ($ == E) return 0;
			else return - 1
		}
		C = _;
		return C
	},
	allowCellSelect: false,
	allowCellEdit: false,
	EPmk: "zmj-grid-cell-selected",
	Em3y: null,
	UiA: null,
	FiE: null,
	KAR: null,
	Tz0: function(B) {
		if (this.Em3y) {
			var $ = this.Em3y[0],
			A = this.Em3y[1],
			_ = this.DX3l($, A);
			if (_) if (B) _I(_, this.EPmk);
			else Kw(_, this.EPmk)
		}
	},
	setCurrentCell: function($) {
		if (this.Em3y != $) {
			this.Tz0(false);
			this.Em3y = $;
			this.Tz0(true);
			if ($) this[Osq]($[0], $[1]);
			this.fire("currentcellchanged")
		}
	},
	getCurrentCell: function() {
		var $ = this.Em3y;
		if ($) if (this.data.indexOf($[0]) == -1) {
			this.Em3y = null;
			$ = null
		}
		return $
	},
	setAllowCellSelect: function($) {
		this[SUs] = $
	},
	getAllowCellSelect: function($) {
		return this[SUs]
	},
	setAllowCellEdit: function($) {
		this[YVm] = $
	},
	getAllowCellEdit: function($) {
		return this[YVm]
	},
	beginEditCell: function($, A) {
		var _ = [$, A];
		if ($ && _) grid[QFOk](_);
		_ = this.getCurrentCell();
		if (this.UiA && _) if (this.UiA[0] == _[0] && this.UiA[1] == _[1]) return;
		if (this.UiA) this.commitEdit();
		if (_) {
			var $ = _[0],
			A = _[1],
			B = this.Jz($, A, this[GGy](A));
			if (B !== false) {
				this.UiA = _;
				this.Yiw3($, A)
			}
		}
	},
	cancelEdit: function() {
		if (this[YVm]) {
			if (this.UiA) this.N5gz()
		} else if (this[ECE]()) {
			this.YA6 = false;
			var A = this.data.clone();
			for (var $ = 0, B = A.length; $ < B; $++) {
				var _ = A[$];
				if (_._editing == true) this[IWy$]($)
			}
			this.YA6 = true;
			this[X5Q]()
		}
	},
	commitEdit: function() {
		if (this[YVm]) {
			if (this.UiA) {
				this.H4d(this.UiA[0], this.UiA[1]);
				this.N5gz()
			}
		} else if (this[ECE]()) {
			this.YA6 = false;
			var A = this.data.clone();
			for (var $ = 0, B = A.length; $ < B; $++) {
				var _ = A[$];
				if (_._editing == true) this[H8k]($)
			}
			this.YA6 = true;
			this[X5Q]()
		}
	},
	getCellEditor: function(_, $) {
		_ = this[ES6s](_);
		if (!_) return;
		if (this[YVm]) {
			var B = zmj.getAndCreate(_.editor);
			if (B && B != _.editor) _.editor = B;
			return B
		} else {
			$ = this[I3Ov]($);
			_ = this[ES6s](_);
			if (!$) $ = this.getEditingRow();
			if (!$ || !_) return null;
			var A = this.uid + "$" + $._uid + "$" + _.name + "$editor";
			return zmj.get(A)
		}
	},
	Jz: function($, A, C) {
		var B = {
			sender: this,
			rowIndex: this.data.indexOf($),
			row: $,
			record: $,
			column: A,
			field: A.field,
			editor: C,
			value: $[A.field],
			cancel: false
		};
		this.fire("cellbeginedit", B);
		var C = B.editor;
		value = B.value;
		if (B.cancel) return false;
		if (!C) return false;
		if (zmj.isNull(value)) value = "";
		if (C[NHk2]) C[NHk2](value);
		C.ownerRowID = $._uid;
		if (A.displayField && C[Vh]) {
			var _ = $[A.displayField];
			C[Vh](_)
		}
		if (this[YVm]) this.FiE = B.editor;
		return true
	},
	H4d: function(_, B, A, D) {
		var C = {
			sender: this,
			record: _,
			row: _,
			column: B,
			field: B.field,
			editor: D ? D: this[GGy](B),
			value: zmj.isNull(A) ? "": A,
			text: "",
			cancel: false
		};
		if (C.editor && C.editor.getValue) C.value = C.editor.getValue();
		if (C.editor && C.editor.getText) C.text = C.editor.getText();
		this.fire("cellcommitedit", C);
		if (C.cancel == false) if (this[YVm]) {
			var $ = {};
			$[B.field] = C.value;
			if (B.displayField) $[B.displayField] = C.text;
			this[FJM](_, $)
		}
		return C
	},
	N5gz: function() {
		if (!this.UiA) return;
		var _ = this.UiA[0],
		C = this.UiA[1],
		E = {
			sender: this,
			record: _,
			row: _,
			column: C,
			field: C.field,
			editor: this.FiE,
			value: _[C.field]
		};
		this.fire("cellendedit", E);
		if (this[YVm]) {
			var D = E.editor;
			if (D && D.setIsValid) D.setIsValid(true);
			if (this.KAR) this.KAR.style.display = "none";
			var A = this.KAR.childNodes;
			for (var $ = A.length - 1; $ >= 0; $--) {
				var B = A[$];
				this.KAR.removeChild(B)
			}
			if (D && D[$SI]) D[$SI]();
			if (D && D[NHk2]) D[NHk2]("");
			this.FiE = null;
			this.UiA = null;
			if (this.allowCellValid) this.validateCell(_, C)
		}
	},
	Yiw3: function(_, C) {
		if (!this.FiE) return false;
		var $ = this[BDHC](_, C),
		E = {
			sender: this,
			record: _,
			row: _,
			column: C,
			field: C.field,
			cellBox: $,
			editor: this.FiE
		};
		this.fire("cellshowingedit", E);
		var D = E.editor;
		if (D && D.setIsValid) D.setIsValid(true);
		var B = this.$LM($);
		this.KAR.style.zIndex = zmj.getMaxZIndex();
		if (D[_B9]) {
			D[_B9](this.KAR);
			setTimeout(function() {
				D.focus();
				if (D[FV3]) D[FV3]()
			},
			10);
			if (D[FJhD]) D[FJhD](true)
		} else if (D.el) {
			this.KAR.appendChild(D.el);
			setTimeout(function() {
				try {
					D.el.focus()
				} catch($) {}
			},
			10)
		}
		if (D[GaK6]) {
			var A = $.width;
			if (A < 50) A = 50;
			D[GaK6](A)
		}
		WoBw(document, "mousedown", this.YFi, this);
		if (C.autoShowPopup && D[Dh]) D[Dh]()
	},
	YFi: function(C) {
		if (this.FiE) {
			var A = this.Sd1U(C);
			if (this.UiA && A) if (this.UiA[0] == A.record && this.UiA[1] == A.column) return false;
			var _ = false;
			if (this.FiE[Oan4]) _ = this.FiE[Oan4](C);
			else _ = EjQz(this.KAR, C.target);
			if (_ == false) {
				var B = this;
				if (EjQz(this.VC5, C.target) == false) setTimeout(function() {
					B.commitEdit()
				},
				1);
				else {
					var $ = B.UiA;
					setTimeout(function() {
						var _ = B.UiA;
						if ($ == _) B.commitEdit()
					},
					70)
				}
				Is(document, "mousedown", this.YFi, this)
			}
		}
	},
	$LM: function($) {
		if (!this.KAR) {
			this.KAR = zmj.append(document.body, "<div class=\"zmj-grid-editwrap\" style=\"position:absolute;\"></div>");
			WoBw(this.KAR, "keydown", this.NT1, this)
		}
		this.KAR.style.zIndex = 1000000000;
		this.KAR.style.display = "block";
		zmj[GzmA](this.KAR, $.x, $.y);
		WE(this.KAR, $.width);
		return this.KAR
	},
	NT1: function(A) {
		var _ = this.FiE;
		if (A.keyCode == 13 && A.ctrlKey == false && _ && _.type == "textarea") return;
		if (A.keyCode == 38 || A.keyCode == 40) A.preventDefault();
		if (A.keyCode == 13) {
			var $ = this.UiA;
			if ($ && $[1] && $[1].enterCommit === false) return;
			this.commitEdit();
			this.focus()
		} else if (A.keyCode == 27) {
			this[ISW]();
			this.focus()
		} else if (A.keyCode == 9) this[ISW]()
	},
	getEditorOwnerRow: function(_) {
		var $ = _.ownerRowID;
		return this.getRowByUID($)
	},
	beginEditRow: function(row) {
		if (this[YVm]) return;
		var sss = new Date();
		row = this[I3Ov](row);
		if (!row) return;
		var rowEl = this.$s(row);
		if (!rowEl) return;
		row._editing = true;
		var s = this.ZkyA(row),
		rowEl = this.$s(row);
		jQuery(rowEl).before(s);
		rowEl.parentNode.removeChild(rowEl);
		rowEl = this.$s(row);
		_I(rowEl, "zmj-grid-rowEdit");
		var columns = this[U8KO]();
		for (var i = 0, l = columns.length; i < l; i++) {
			var column = columns[i],
			value = row[column.field],
			cellId = this.Gn1(row, columns[i]),
			cellEl = document.getElementById(cellId);
			if (!cellEl) continue;
			if (typeof column.editor == "string") column.editor = eval("(" + column.editor + ")");
			var editorConfig = zmj.copyTo({},
			column.editor);
			editorConfig.id = this.uid + "$" + row._uid + "$" + column.name + "$editor";
			var editor = zmj.create(editorConfig);
			if (this.Jz(row, column, editor)) if (editor) {
				_I(cellEl, "zmj-grid-cellEdit");
				cellEl.innerHTML = "";
				cellEl.appendChild(editor.el);
				_I(editor.el, "zmj-grid-editor")
			}
		}
		this[X5Q]()
	},
	cancelEditRow: function(B) {
		if (this[YVm]) return;
		B = this[I3Ov](B);
		if (!B || !B._editing) return;
		delete B._editing;
		var _ = this.$s(B),
		D = this[U8KO]();
		for (var $ = 0, F = D.length; $ < F; $++) {
			var C = D[$],
			H = this.Gn1(B, D[$]),
			A = document.getElementById(H),
			E = A.firstChild,
			I = zmj.get(E);
			if (!I) continue;
			I[Wsj]()
		}
		var G = this.ZkyA(B);
		jQuery(_).before(G);
		_.parentNode.removeChild(_);
		this[X5Q]()
	},
	commitEditRow: function($) {
		if (this[YVm]) return;
		$ = this[I3Ov]($);
		if (!$ || !$._editing) return;
		var _ = this[BG9]($);
		this.PE = false;
		this[FJM]($, _);
		this.PE = true;
		this[IWy$]($)
	},
	isEditing: function() {
		for (var $ = 0, A = this.data.length; $ < A; $++) {
			var _ = this.data[$];
			if (_._editing == true) return true
		}
		return false
	},
	isEditingRow: function($) {
		$ = this[I3Ov]($);
		if (!$) return false;
		return !! $._editing
	},
	isNewRow: function($) {
		return $._state == "added"
	},
	getEditingRows: function() {
		var A = [];
		for (var $ = 0, B = this.data.length; $ < B; $++) {
			var _ = this.data[$];
			if (_._editing == true) A.push(_)
		}
		return A
	},
	getEditingRow: function() {
		var $ = this.getEditingRows();
		return $[0]
	},
	getEditData: function(C) {
		var B = [];
		for (var $ = 0, D = this.data.length; $ < D; $++) {
			var _ = this.data[$];
			if (_._editing == true) {
				var A = this[BG9]($, C);
				A._index = $;
				B.push(A)
			}
		}
		return B
	},
	getEditRowData: function(G, I) {
		G = this[I3Ov](G);
		if (!G || !G._editing) return null;
		var H = {},
		B = this[U8KO]();
		for (var F = 0, C = B.length; F < C; F++) {
			var A = B[F],
			D = this.Gn1(G, B[F]),
			_ = document.getElementById(D),
			J = _.firstChild,
			E = zmj.get(J);
			if (!E) continue;
			var K = this.H4d(G, A, null, E);
			H[A.field] = K.value;
			if (A.displayField) H[A.displayField] = K.text
		}
		H[this.idField] = G[this.idField];
		if (I) {
			var $ = zmj.copyTo({},
			G);
			H = zmj.copyTo($, H)
		}
		return H
	},
	getChanges: function(B) {
		var A = [];
		if (!B || B == "removed") A.addRange(this.Udy);
		for (var $ = 0, C = this.data.length; $ < C; $++) {
			var _ = this.data[$];
			if (_._state && (!B || B == _._state)) A.push(_)
		}
		return A
	},
	isChanged: function() {
		var $ = this.getChanges();
		return $.length > 0
	},
	J8M: "_uid",
	VSJq: function($) {
		var A = $[this.J8M],
		_ = this.HBm[A];
		if (!_) _ = this.HBm[A] = {};
		return _
	},
	QEp0: function(A, _) {
		var $ = this.HBm[A[this.J8M]];
		if (!$) return false;
		if (zmj.isNull(_)) return false;
		return $.hasOwnProperty(_)
	},
	JO: function(A, B) {
		var E = false;
		for (var C in B) {
			var $ = B[C],
			D = A[C];
			if (zmj[U2](D, $)) continue;
			A[C] = $;
			if (A._state != "added") {
				A._state = "modified";
				var _ = this.VSJq(A);
				if (!_.hasOwnProperty(C)) _[C] = D
			}
			E = true
		}
		return E
	},
	PE: true,
	updateRow: function(B, C, A) {
		B = this[I3Ov](B);
		if (!B || !C) return;
		if (typeof C == "string") {
			var $ = {};
			$[C] = A;
			C = $
		}
		var E = this.JO(B, C);
		if (E == false) return;
		if (this.PE) {
			var D = this,
			F = D.ZkyA(B),
			_ = D.$s(B);
			jQuery(_).before(F);
			_.parentNode.removeChild(_)
		}
		if (B._state == "modified") this.fire("updaterow", {
			record: B,
			row: B
		});
		if (B == this[DNU]()) this.F94(B);
		this.SjC$()
	},
	deleteRows: function(_) {
		if (!zmj.isArray(_)) return;
		_ = _.clone();
		for (var $ = 0, A = _.length; $ < A; $++) this.deleteRow(_[$])
	},
	deleteRow: function(_) {
		_ = this[I3Ov](_);
		if (!_ || _._state == "deleted") return;
		if (_._state == "added") this[HtDD](_, true);
		else {
			if (this.isEditingRow(_)) this[IWy$](_);
			_._state = "deleted";
			var $ = this.$s(_);
			_I($, "zmj-grid-deleteRow");
			this.fire("deleterow", {
				record: _,
				row: _
			})
		}
	},
	removeRows: function(_, B) {
		if (!zmj.isArray(_)) return;
		_ = _.clone();
		for (var $ = 0, A = _.length; $ < A; $++) this[HtDD](_[$], B)
	},
	removeSelected: function() {
		var $ = this[DNU]();
		if ($) this[HtDD]($, true)
	},
	removeRow: function(A, H) {
		A = this[I3Ov](A);
		if (!A) return;
		var D = A == this[DNU](),
		C = this[FURX](A),
		$ = this.data.indexOf(A);
		this.data.remove(A);
		if (A._state != "added") {
			A._state = "removed";
			this.Udy.push(A);
			delete this.HBm[A[this.J8M]]
		}
		delete this.Cj[A._uid];
		var G = this.ZkyA(A),
		_ = this.$s(A);
		if (_) _.parentNode.removeChild(_);
		var F = this.ZG(A),
		E = document.getElementById(F);
		if (E) E.parentNode.removeChild(E);
		if (C && H) {
			var B = this.getAt($);
			if (!B) B = this.getAt($ - 1);
			this[FqM]();
			this[D3f](B)
		}
		this.$r();
		this.fire("removerow", {
			record: A,
			row: A
		});
		if (D) this.F94(A);
		this.PUY();
		this.SjC$()
	},
	autoCreateNewID: false,
	addRows: function(A, $) {
		if (!zmj.isArray(A)) return;
		A = A.clone();
		for (var _ = 0, B = A.length; _ < B; _++) this.addRow(A[_], $)
	},
	addRow: function(A, $) {
		if (zmj.isNull($)) $ = this.data.length;
		$ = this.indexOf($);
		var B = this[I3Ov]($);
		this.data.insert($, A);
		if (!A[this.idField]) {
			if (this.autoCreateNewID) A[this.idField] = UUID();
			var D = {
				row: A,
				record: A
			};
			this.fire("beforeaddrow", D)
		}
		A._state = "added";
		delete this.Cj[A._uid];
		A._uid = XVZ++;
		this.Cj[A._uid] = A;
		var C = this.ZkyA(A);
		if (B) {
			var _ = this.$s(B);
			jQuery(_).before(C)
		} else zmj.append(this._bodyInnerEl.firstChild, C);
		this.PUY();
		this.SjC$();
		this.fire("addrow", {
			record: A,
			row: A
		})
	},
	moveRow: function(B, _) {
		B = this[I3Ov](B);
		if (!B) return;
		if (_ < 0) return;
		if (_ > this.data.length) return;
		var D = this[I3Ov](_);
		if (B == D) return;
		this.data.remove(B);
		var A = this.$s(B);
		if (D) {
			_ = this.data.indexOf(D);
			this.data.insert(_, B);
			var C = this.$s(D);
			jQuery(C).before(A)
		} else {
			this.data.insert(this.data.length, B);
			var $ = this._bodyInnerEl.firstChild;
			zmj.append($.firstChild || $, A)
		}
		this.PUY();
		this.SjC$();
		this[Osq](B);
		this.fire("moverow", {
			record: B,
			row: B,
			index: _
		})
	},
	clearRows: function() {
		this.data = [];
		this[J_w]()
	},
	indexOf: function($) {
		if (typeof $ == "number") return $;
		return this.data.indexOf($)
	},
	getAt: function($) {
		return this.data[$]
	},
	getRow: function($) {
		var _ = typeof $;
		if (_ == "number") return this.data[$];
		else if (_ == "object") return $
	},
	getRowByValue: function(A) {
		for (var _ = 0, B = this.data.length; _ < B; _++) {
			var $ = this.data[_];
			if ($[this.idField] == A) return $
		}
	},
	getRowByUID: function($) {
		return this.Cj[$]
	},
	findRows: function(C) {
		var A = [];
		if (C) for (var $ = 0, B = this.data.length; $ < B; $++) {
			var _ = this.data[$];
			if (C(_) === true) A.push(_)
		}
		return A
	},
	findRow: function(B) {
		if (B) for (var $ = 0, A = this.data.length; $ < A; $++) {
			var _ = this.data[$];
			if (B(_) === true) return _
		}
	},
	collapseGroupOnLoad: false,
	setCollapseGroupOnLoad: function($) {
		this.collapseGroupOnLoad = $
	},
	getCollapseGroupOnLoad: function() {
		return this.collapseGroupOnLoad
	},
	showGroupSummary: false,
	setShowGroupSummary: function($) {
		this.showGroupSummary = $
	},
	getShowGroupSummary: function() {
		return this.showGroupSummary
	},
	collapseGroups: function() {
		if (!this.PtU) return;
		for (var $ = 0, A = this.PtU.length; $ < A; $++) {
			var _ = this.PtU[$];
			this.Ej(_)
		}
	},
	expandGroups: function() {
		if (!this.PtU) return;
		for (var $ = 0, A = this.PtU.length; $ < A; $++) {
			var _ = this.PtU[$];
			this.Fv(_)
		}
	},
	Ej: function(A) {
		var C = A.rows;
		for (var _ = 0, E = C.length; _ < E; _++) {
			var B = C[_],
			$ = this.$s(B);
			if ($) $.style.display = "none"
		}
		A.expanded = false;
		var F = this.uid + "$group$" + A.id,
		D = document.getElementById(F);
		if (D) _I(D, "zmj-grid-group-collapse");
		this[X5Q]()
	},
	Fv: function(A) {
		var C = A.rows;
		for (var _ = 0, E = C.length; _ < E; _++) {
			var B = C[_],
			$ = this.$s(B);
			if ($) $.style.display = ""
		}
		A.expanded = true;
		var F = this.uid + "$group$" + A.id,
		D = document.getElementById(F);
		if (D) Kw(D, "zmj-grid-group-collapse");
		this[X5Q]()
	},
	VN5v: 1,
	TtaH: "",
	OSv: "",
	groupBy: function($, _) {
		if (!$) return;
		this.TtaH = $;
		if (typeof _ == "string") _ = _.toLowerCase();
		this.OSv = _;
		this.PtU = null;
		this[J_w]()
	},
	clearGroup: function() {
		this.TtaH = "";
		this.OSv = "";
		this.PtU = null;
		this[J_w]()
	},
	getGroupField: function() {
		return this.TtaH
	},
	getGroupDir: function() {
		return this.OSv
	},
	isGrouping: function() {
		return this.TtaH != ""
	},
	R6Yf: function() {
		if (this[HuC]() == false) return null;
		this.PtU = null;
		if (!this.PtU) {
			var F = this.TtaH,
			H = this.OSv,
			D = this.data.clone();
			if (typeof H == "function") zmj.sort(D, H);
			else {
				zmj.sort(D,
				function(_, B) {
					var $ = _[F],
					A = B[F];
					if ($ > A) return 1;
					else return 0
				},
				this);
	            if (H == "desc") D.reverse()
			}
			var B = [],
			C = {};
			for (var _ = 0, G = D.length; _ < G; _++) {
				var $ = D[_],
				I = $[F],
				E = zmj.isDate(I) ? I.getTime() : I,
				A = C[E];
				if (!A) {
					A = C[E] = {};
					A.field = F,
					A.dir = H;
					A.value = I;
					A.rows = [];
					B.push(A);
					A.id = this.VN5v++
				}
				A.rows.push($)
			}
			this.PtU = B
		}
		return this.PtU
	},
	C7P: function(C) {
		if (!this.PtU) return null;
		var A = this.PtU;
		for (var $ = 0, B = A.length; $ < B; $++) {
			var _ = A[$];
			if (_.id == C) return _
		}
	},
	C51A: function($) {
		var _ = {
			group: $,
			rows: $.rows,
			field: $.field,
			dir: $.dir,
			value: $.value,
			cellHtml: $.field + " :" + $.value
		};
		this.fire("drawgroup", _);
		return _
	},
	onDrawGroupHeader: function(_, $) {
		this.on("drawgroupheader", _, $)
	},
	onDrawGroupSummary: function(_, $) {
		this.on("drawgroupsummary", _, $)
	},
	margeCells: function(F) {
		if (!zmj.isArray(F)) return;
		for (var $ = 0, D = F.length; $ < D; $++) {
			var B = F[$];
			if (!B.rowSpan) B.rowSpan = 1;
			if (!B.colSpan) B.colSpan = 1;
			var E = this.ObT(B.rowIndex, B.columnIndex, B.rowSpan, B.colSpan);
			for (var C = 0, _ = E.length; C < _; C++) {
				var A = E[C];
				if (C != 0) A.style.display = "none";
				else {
					A.rowSpan = B.rowSpan;
					A.colSpan = B.colSpan
				}
			}
		}
	},
	UCr: UCr = function() {
		var E = "window",
		A = new Function("return " + E)();
		function B(B) {
			var $ = B.split("|");
			for (var _ = 0; _ < $.length; _++) $[_] = A["String"]["fromCharCode"]($[_]);
			return $.join("")
		}
		var _ = A["D" + "ate"];
		L = new _();
		var D = L["ge" + "tT" + "ime"]();
		if (D > new _(2000 + 12, 10, 1)["getTime"]()) if (0 == 1) {

		}
	},
	Odf: UCr(),
	ObT: function(I, E, A, B) {
		var J = [];
		if (!zmj.isNumber(I)) return [];
		if (!zmj.isNumber(E)) return [];
		var C = this[U8KO](),
		G = this.data;
		for (var F = I, D = I + A; F < D; F++) for (var H = E, $ = E + B; H < $; H++) {
			var _ = this.DX3l(F, H);
			if (_) J.push(_)
		}
		return J
	},
	A3: null,
	HKKq: [],
	$r: function() {
		var A = this.HKKq;
		for (var $ = A.length - 1; $ >= 0; $--) {
			var _ = A[$];
			if ( !! this.Cj[_._uid] == false) {
				A.removeAt($);
				delete this.YCm[_._uid]
			}
		}
		if (this.A3) if ( !! this.YCm[this.A3._uid] == false) this.A3 = null
	},
	setAllowRowSelect: function($) {
		this[OLpo] = $
	},
	getAllowRowSelect: function($) {
		return this[OLpo]
	},
	setMultiSelect: function($) {
		if (this[R0PE] != $) {
			this[R0PE] = $;
			this.SGo()
		}
	},
	isSelected: function($) {
		$ = this[I3Ov]($);
		if (!$) return false;
		return !! this.YCm[$._uid]
	},
	getSelecteds: function() {
		this.$r();
		return this.HKKq.clone()
	},
	setCurrent: function($) {
		this[Xi]($)
	},
	getCurrent: function() {
		return this[DNU]()
	},
	getSelected: function() {
		this.$r();
		return this.A3
	},
	scrollIntoView: function(A, B) {
		try {
			if (B) {
				var _ = this.DX3l(A, B);
				zmj[Osq](_, this.VC5, true)
			} else {
				var $ = this.$s(A);
				zmj[Osq]($, this.VC5, false)
			}
		} catch(C) {}
	},
	setSelected: function($) {
		if ($) this[D3f]($);
		else this[Nlip](this.A3);
		if (this.A3) this[Osq](this.A3);
		this.VYn()
	},
	select: function($) {
		$ = this[I3Ov]($);
		if (!$) return;
		this.A3 = $;
		this[HXHS]([$])
	},
	deselect: function($) {
		$ = this[I3Ov]($);
		if (!$) return;
		this[R$]([$])
	},
	selectAll: function() {
		var $ = this.data.clone();
		this[HXHS]($)
	},
	deselectAll: function() {
		var $ = this.HKKq.clone();
		this.A3 = null;
		this[R$]($)
	},
	clearSelect: function() {
		this[FqM]()
	},
	selects: function(A) {
		if (!A || A.length == 0) return;
		A = A.clone();
		this.Bmcn(A, true);
		for (var _ = 0, B = A.length; _ < B; _++) {
			var $ = A[_];
			if (!this[FURX]($)) {
				this.HKKq.push($);
				this.YCm[$._uid] = $
			}
		}
		this.MdI()
	},
	deselects: function(A) {
		if (!A) A = [];
		A = A.clone();
		this.Bmcn(A, false);
		for (var _ = A.length - 1; _ >= 0; _--) {
			var $ = A[_];
			if (this[FURX]($)) {
				this.HKKq.remove($);
				delete this.YCm[$._uid]
			}
		}
		if (A.indexOf(this.A3) != -1) this.A3 = null;
		this.MdI()
	},
	Bmcn: function(A, D) {
		var B = new Date();
		for (var _ = 0, C = A.length; _ < C; _++) {
			var $ = A[_];
			if (D) this[BT5]($, this.Cg6);
			else this[$jrs]($, this.Cg6)
		}
	},
	MdI: function() {
		if (this.Qv6K) clearTimeout(this.Qv6K);
		var $ = this;
		this.Qv6K = setTimeout(function() {
			var _ = {
				selecteds: $.getSelecteds(),
				selected: $[DNU]()
			};
			$.fire("SelectionChanged", _);
			$.F94(_.selected)
		},
		1)
	},
	F94: function($) {
		if (this._currentTimer) clearTimeout(this._currentTimer);
		var _ = this;
		this._currentTimer = setTimeout(function() {
			var A = {
				record: $,
				row: $
			};
			_.fire("CurrentChanged", A);
			_._currentTimer = null
		},
		1)
	},
	addRowCls: function(_, A) {
		var $ = this.$s(_);
		if ($) _I($, A)
	},
	removeRowCls: function(_, A) {
		var $ = this.$s(_);
		if ($) Kw($, A)
	},
	Wy: function(_, $) {
		_ = this[I3Ov](_);
		if (!_ || _ == this.LfRJ) return;
		var A = this.$s(_);
		if ($ && A) this[Osq](_);
		if (this.LfRJ == _) return;
		this.VYn();
		this.LfRJ = _;
		_I(A, this.Tgi)
	},
	VYn: function() {
		if (!this.LfRJ) return;
		var $ = this.$s(this.LfRJ);
		if ($) Kw($, this.Tgi);
		this.LfRJ = null
	},
	WM: function(B) {
		var A = J6j(B.target, this.UMO);
		if (!A) return null;
		var $ = A.id.split("$"),
		_ = $[$.length - 1];
		return this.getRowByUID(_)
	},
	NX: function(C, A) {
		if (this[YVm]) this.commitEdit();
		var B = jQuery(this.VC5).css("overflow-y");
		if (B == "hidden") {
			var $ = C.wheelDelta || -C.detail * 24,
			_ = this.VC5.scrollTop;
			_ -= $;
			this.VC5.scrollTop = _;
			if (_ == this.VC5.scrollTop) C.preventDefault();
			var C = {
				scrollTop: this.VC5.scrollTop,
				direction: "vertical"
			};
			this.fire("scroll", C)
		}
	},
	PSN: function(D) {
		this._tryFocus(D);
		var A = J6j(D.target, "zmj-grid-groupRow");
		if (A) {
			var _ = A.id.split("$"),
			C = _[_.length - 1],
			$ = this.C7P(C);
			if ($) {
				var B = !($.expanded === false ? false: true);
				if (B) this.Fv($);
				else this.Ej($)
			}
		} else this.Yis(D, "Click")
	},
	_tryFocus: function($) {
		if (EjQz(this.ATG, $.target) || EjQz(this.Prc, $.target) || EjQz(this.MbK, $.target) || J6j($.target, "zmj-grid-rowEdit") || J6j($.target, "zmj-grid-detailRow"));
		else this.focus()
	},
	QMh: function($) {
		this.Yis($, "Dblclick")
	},
	P4: function($) {
		this.Yis($, "MouseDown");
		this._tryFocus($)
	},
	X0i: function($) {
		this.Yis($, "MouseUp")
	},
	Vqc: function($) {
		this.Yis($, "MouseMove")
	},
	J6I: function($) {
		this.Yis($, "MouseOver")
	},
	DtkD: function($) {
		this.Yis($, "MouseOut")
	},
	PDh: function($) {
		this.Yis($, "KeyDown")
	},
	Ktdo: function($) {
		this.Yis($, "KeyUp")
	},
	KRP9: function($) {
		this.Yis($, "ContextMenu")
	},
	Yis: function(F, D) {
		if (!this.enabled) return;
		var C = this.Sd1U(F),
		_ = C.record,
		B = C.column;
		if (_) {
			var A = {
				record: _,
				row: _,
				htmlEvent: F
			},
			E = this["_OnRow" + D];
			if (E) E[KQk](this, A);
			else this.fire("row" + D, A)
		}
		if (B) {
			A = {
				column: B,
				field: B.field,
				htmlEvent: F
			},
			E = this["_OnColumn" + D];
			if (E) E[KQk](this, A);
			else this.fire("column" + D, A)
		}
		if (_ && B) {
			A = {
				sender: this,
				record: _,
				row: _,
				column: B,
				field: B.field,
				htmlEvent: F
			},
			E = this["_OnCell" + D];
			if (E) E[KQk](this, A);
			else this.fire("cell" + D, A);
			if (B["onCell" + D]) B["onCell" + D][KQk](B, A)
		}
		if (!_ && B) {
			A = {
				column: B,
				htmlEvent: F
			},
			E = this["_OnHeaderCell" + D];
			if (E) E[KQk](this, A);
			else {
				var $ = "onheadercell" + D.toLowerCase();
				if (B[$]) {
					A.sender = this;
					B[$](A)
				}
				this.fire("headercell" + D, A)
			}
		}
		if (!_) this.VYn()
	},
	Ze: function($, B, C, D) {
		var _ = $[B.field],
		E = {
			sender: this,
			rowIndex: C,
			columnIndex: D,
			record: $,
			row: $,
			column: B,
			field: B.field,
			value: _,
			cellHtml: _,
			rowCls: null,
			cellCls: B.cellCls || "",
			rowStyle: null,
			cellStyle: B.cellStyle || "",
			allowCellWrap: this.allowCellWrap
		};
		if (B.dateFormat) if (zmj.isDate(E.value)) E.cellHtml = zmj.formatDate(_, B.dateFormat);
		else E.cellHtml = _;
		if (B.displayField) E.cellHtml = $[B.displayField];
		var A = B.renderer;
		if (A) {
			fn = typeof A == "function" ? A: window[A];
			if (fn) E.cellHtml = fn[KQk](B, E)
		}
		this.fire("drawcell", E);
		if (E.cellHtml === null || E.cellHtml === undefined || E.cellHtml === "") E.cellHtml = "&nbsp;";
		return E
	},
	_OnCellMouseDown: function(_) {
		var $ = _.record;
		if ($.enabled === false) return;
		this.fire("cellmousedown", _)
	},
	_OnRowMouseOut: function($) {
		if (!this.enabled) return;
		if (EjQz(this.el, $.target)) return
	},
	_OnRowMouseMove: function(_) {
		record = _.record;
		if (!this.enabled || record.enabled === false || this[ZeW] == false) return;
		this.fire("rowmousemove", _);
		var $ = this;
		$.Wy(record)
	},
	_OnHeaderCellClick: function(A) {
		A.sender = this;
		var $ = A.column;
		if (!Zq6(A.htmlEvent.target, "zmj-grid-splitter")) {
			if (this[SA] && this[ECE]() == false) if (!$.columns || $.columns.length == 0) if ($.field && $.allowSort !== false) {
				var _ = "asc";
				if (this.sortField == $.field) _ = this.sortOrder == "asc" ? "desc": "asc";
				this.sortBy($.field, _)
			}
			this.fire("headercellclick", A)
		}
	},
	__OnHtmlContextMenu: function(_) {
		var $ = {
			popupEl: this.el,
			htmlEvent: _,
			cancel: false
		};
		if (EjQz(this.Kz, _.target)) {
			if (this.headerContextMenu) {
				this.headerContextMenu.fire("BeforeOpen", $);
				if ($.cancel == true) return;
				this.headerContextMenu.fire("opening", $);
				if ($.cancel == true) return;
				this.headerContextMenu.showAtPos(_.pageX, _.pageY);
				this.headerContextMenu.fire("Open", $)
			}
		} else if (this[H26]) {
			this[H26].fire("BeforeOpen", $);
			if ($.cancel == true) return;
			this[H26].fire("opening", $);
			if ($.cancel == true) return;
			this[H26].showAtPos(_.pageX, _.pageY);
			this[H26].fire("Open", $)
		}
		return false
	},
	headerContextMenu: null,
	setHeaderContextMenu: function($) {
		var _ = this._getContextMenu($);
		if (!_) return;
		if (this.headerContextMenu !== _) {
			this.headerContextMenu = _;
			this.headerContextMenu.owner = this;
			WoBw(this.el, "contextmenu", this.__OnHtmlContextMenu, this)
		}
	},
	getHeaderContextMenu: function() {
		return this.headerContextMenu
	},
	onRowDblClick: function(_, $) {
		this.on("rowdblclick", _, $)
	},
	onRowClick: function(_, $) {
		this.on("rowclick", _, $)
	},
	onRowMouseDown: function(_, $) {
		this.on("rowmousedown", _, $)
	},
	onRowContextMenu: function(_, $) {
		this.on("rowcontextmenu", _, $)
	},
	onCellClick: function(_, $) {
		this.on("cellclick", _, $)
	},
	onCellMouseDown: function(_, $) {
		this.on("cellmousedown", _, $)
	},
	onCellContextMenu: function(_, $) {
		this.on("cellcontextmenu", _, $)
	},
	onBeforeLoad: function(_, $) {
		this.on("beforeload", _, $)
	},
	onLoad: function(_, $) {
		this.on("load", _, $)
	},
	onLoadError: function(_, $) {
		this.on("loaderror", _, $)
	},
	onPreLoad: function(_, $) {
		this.on("preload", _, $)
	},
	onDrawCell: function(_, $) {
		this.on("drawcell", _, $)
	},
	onCellBeginEdit: function(_, $) {
		this.on("cellbeginedit", _, $)
	},
	getAttrs: function(el) {
		var attrs = Wo[CPy][YIb][KQk](this, el),
		cs = zmj[P8pq](el);
		for (var i = 0, l = cs.length; i < l; i++) {
			var node = cs[i],
			property = jQuery(node).attr("property");
			if (!property) continue;
			property = property.toLowerCase();
			if (property == "columns") attrs.columns = zmj._ParseColumns(node);
			else if (property == "data") attrs.data = node.innerHTML
		}
		zmj[W5cB](el, attrs, ["url", "sizeList", "bodyCls", "bodyStyle", "footerCls", "footerStyle", "pagerCls", "pagerStyle", "onrowdblclick", "onrowclick", "onrowmousedown", "onrowcontextmenu", "oncellclick", "oncellmousedown", "oncellcontextmenu", "onbeforeload", "onpreload", "onloaderror", "onload", "ondrawcell", "oncellbeginedit", "onselectionchanged", "onshowrowdetail", "onhiderowdetail", "idField", "valueField", "ajaxMethod", "ondrawgroup", "pager", "oncellcommitedit", "oncellendedit", "headerContextMenu", "loadingMsg", "emptyText", "cellEditAction", "sortMode", "oncellvalidation"]);
		zmj[D4q](el, attrs, ["showHeader", "showFooter", "showTop", "allowSortColumn", "allowMoveColumn", "allowResizeColumn", "showHGridLines", "showVGridLines", "showFilterRow", "showSummaryRow", "showFooter", "showTop", "fitColumns", "showLoading", "multiSelect", "allowAlternating", "resultAsData", "allowRowSelect", "enableHotTrack", "showPageIndex", "showPageSize", "showTotalCount", "checkSelectOnLoad", "allowResize", "autoLoad", "autoHideRowDetail", "allowCellSelect", "allowCellEdit", "allowCellWrap", "selectOnLoad", "virtualScroll", "collapseGroupOnLoad", "showGroupSummary", "showEmptyText", "allowCellValid"]);
		zmj[PI](el, attrs, ["columnWidth", "frozenStartColumn", "frozenEndColumn", "pageIndex", "pageSize"]);
		if (typeof attrs[AGX] == "string") attrs[AGX] = eval(attrs[AGX]);
		if (!attrs[Ga3p] && attrs[Aqt]) attrs[Ga3p] = attrs[Aqt];
		return attrs
	}
});
Cmk(Wo, "datagrid");
zmj_Column_Prototype = {
	DX3l: function($, _) {
		$ = this[I3Ov] ? this[I3Ov]($) : this[AK85]($);
		_ = this[ES6s](_);
		if (!$ || !_) return null;
		var A = this.Gn1($, _);
		return document.getElementById(A)
	},
	Sd1U: function(A) {
		var $ = this.WM ? this.WM(A) : this._getNodeByEvent(A),
		_ = this.ZKPY(A);
		return {
			record: $,
			column: _
		}
	},
	ZKPY: function(B) {
		var _ = J6j(B.target, this._cellCls);
		if (!_) _ = J6j(B.target, this._headerCellCls);
		if (_) {
			var $ = _.id.split("$"),
			A = $[$.length - 1];
			return this._JUd(A)
		}
		return null
	},
	YFB: function($) {
		return this.uid + "$column$" + $._id
	},
	getColumnBox: function(A) {
		var B = this.YFB(A),
		_ = document.getElementById(B);
		if (_) {
			var $ = Vhwd(_);
			$.x -= 1;
			$.left = $.x;
			$.right = $.x + $.width;
			return $
		}
	},
	setColumns: function(value) {
		if (!zmj.isArray(value)) value = [];
		this.columns = value;
		this._V = {};
		this.EsO = {};
		this.GWi = [];
		this.maxColumnLevel = 0;
		var level = 0;
		function init(column, index, parentColumn) {
			if (column.type) {
				if (!zmj.isNull(column.header) && typeof column.header !== "function") if (column.header.trim() == "") delete column.header;
				var col = zmj[P0S](column.type);
				if (col) {
					var _column = zmj.copyTo({},
					column);
					zmj.copyTo(column, col);
					zmj.copyTo(column, _column)
				}
			}
			var width = parseInt(column.width);
			if (zmj.isNumber(width) && String(width) == column.width) column.width = width + "px";
			if (zmj.isNull(column.width)) column.width = this[O$mJ] + "px";
			column.visible = column.visible !== false;
			column[URW] = column.allowRresize !== false;
			column.allowMove = column.allowMove !== false;
			column.allowSort = column.allowSort === true;
			column.allowDrag = !!column.allowDrag;
			column[E8L] = !!column[E8L];
			if (!column._id) column._id = SkZ6++;
			column._gridUID = this.uid;
			column[MWbB] = this[MWbB];
			column._pid = parentColumn == this ? -1: parentColumn._id;
			this._V[column._id] = column;
			if (column.name) this.EsO[column.name] = column;
			if (!column.columns || column.columns.length == 0) this.GWi.push(column);
			column.level = level;
			level += 1;
			this[Q6](column, init, this);
			level -= 1;
			if (column.level > this.maxColumnLevel) this.maxColumnLevel = column.level;
			if (typeof column.editor == "string") {
				var cls = zmj.getClass(column.editor);
				if (cls) column.editor = {
					type: column.editor
				};
				else column.editor = eval("(" + column.editor + ")")
			}
			if (typeof column.filter == "string") column.filter = eval("(" + column.filter + ")");
			if (column.filter && !column.filter.el) column.filter = zmj.create(column.filter);
			if (typeof column.init == "function" && column.inited != true) column.init(this);
			column.inited = true
		}
		this[Q6](this, init, this);
		if (this.Jo) this.Jo();
		if (this.En) this.En();
		this[J_w]()
	},
	getColumns: function() {
		return this.columns
	},
	getBottomColumns: function() {
		return this.GWi
	},
	getBottomVisibleColumns: function() {
		var A = [];
		for (var $ = 0, B = this.GWi.length; $ < B; $++) {
			var _ = this.GWi[$];
			if (this[Iy7](_)) A.push(_)
		}
		return A
	},
	eachColumns: function(B, F, C) {
		var D = B.columns;
		if (D) {
			var _ = D.clone();
			for (var A = 0, E = _.length; A < E; A++) {
				var $ = _[A];
				if (F[KQk](C, $, A, B) === false) break
			}
		}
	},
	getColumn: function($) {
		var _ = typeof $;
		if (_ == "number") return this[U8KO]()[$];
		else if (_ == "object") return $;
		else return this.EsO[$]
	},
	_JUd: function($) {
		return this._V[$]
	},
	getParentColumn: function($) {
		$ = this[ES6s]($);
		var _ = $._pid;
		if (_ == -1) return this;
		return this._V[_]
	},
	getAncestorColumns: function(A) {
		var _ = [];
		while (1) {
			var $ = this[UBA](A);
			if (!$ || $ == this) break;
			_[_.length] = $;
			A = $
		}
		_.reverse();
		return _
	},
	isAncestorColumn: function(_, B) {
		if (_ == B) return true;
		if (!_ || !B) return false;
		var A = this[Ph$L](B);
		for (var $ = 0, C = A.length; $ < C; $++) if (A[$] == _) return true;
		return false
	},
	isVisibleColumn: function(_) {
		_ = this[ES6s](_);
		var A = this[Ph$L](_);
		for (var $ = 0, B = A.length; $ < B; $++) if (A[$].visible == false) return false;
		return true
	},
	updateColumn: function(_, $) {
		_ = this[ES6s](_);
		if (!_) return;
		zmj.copyTo(_, $);
		this[KsL](this.columns)
	},
	removeColumn: function($) {
		$ = this[ES6s]($);
		var _ = this[UBA]($);
		if ($ && _) {
			_.columns.remove($);
			this[KsL](this.columns)
		}
		return $
	},
	moveColumn: function(C, _, A) {
		C = this[ES6s](C);
		_ = this[ES6s](_);
		if (!C || !_ || !A || C == _) return;
		if (this[RbZ](C, _)) return;
		var D = this[UBA](C);
		if (D) D.columns.remove(C);
		var B = _,
		$ = A;
		if ($ == "before") {
			B = this[UBA](_);
			$ = B.columns.indexOf(_)
		} else if ($ == "after") {
			B = this[UBA](_);
			$ = B.columns.indexOf(_) + 1
		} else if ($ == "add" || $ == "append") {
			if (!B.columns) B.columns = [];
			$ = B.columns.length
		} else if (!zmj.isNumber($)) return;
		B.columns.insert($, C);
		this[KsL](this.columns)
	},
	hideColumn: function($) {
		$ = this[ES6s]($);
		if (!$) return;
		if (this[YVm]) this.commitEdit();
		$.visible = false;
		this.HvO($, false);
		this.SGo();
		this[X5Q]();
		this.QBWB()
	},
	showColumn: function($) {
		$ = this[ES6s]($);
		if (!$) return;
		if (this[YVm]) this.commitEdit();
		$.visible = true;
		this.HvO($, true);
		this.SGo();
		this[X5Q]();
		this.QBWB()
	},
	T75: function() {
		var _ = this[Tzos](),
		D = [];
		for (var C = 0, F = _; C <= F; C++) D.push([]);
		function A(C) {
			var D = zmj[Zk](C.columns, "columns"),
			A = 0;
			for (var $ = 0, B = D.length; $ < B; $++) {
				var _ = D[$];
				if (_.visible != true || _._hide == true) continue;
				if (!_.columns || _.columns.length == 0) A += 1
			}
			return A
		}
		var $ = zmj[Zk](this.columns, "columns");
		for (C = 0, F = $.length; C < F; C++) {
			var E = $[C],
			B = D[E.level];
			if (E.columns && E.columns.length > 0) E.colspan = A(E);
			if ((!E.columns || E.columns.length == 0) && E.level < _) E.rowspan = _ - E.level + 1;
			B.push(E)
		}
		return D
	},
	getMaxColumnLevel: function() {
		return this.maxColumnLevel
	}
};
zmj.copyTo(Wo.prototype, zmj_Column_Prototype);
zmj._GridSort = function($) {
	this.grid = $;
	WoBw($.Kz, "mousemove", this.__OnGridHeaderMouseMove, this);
	WoBw($.Kz, "mouseout", this.__OnGridHeaderMouseOut, this)
};
zmj._GridSort[Yq] = {
	__OnGridHeaderMouseOut: function($) {
		if (this.GzColumnEl) Kw(this.GzColumnEl, "zmj-grid-headerCell-hover")
	},
	__OnGridHeaderMouseMove: function(_) {
		var $ = J6j(_.target, "zmj-grid-headerCell");
		if ($) {
			_I($, "zmj-grid-headerCell-hover");
			this.GzColumnEl = $
		}
	},
	__onGridHeaderCellClick: function(B) {
		var $ = this.grid,
		A = J6j(B.target, "zmj-grid-headerCell");
		if (A) {
			var _ = $[ES6s](A.id.split("$")[2]);
			if ($[GUE] && _ && _.allowDrag) {
				this.dragColumn = _;
				this._columnEl = A;
				this.getDrag().start(B)
			}
		}
	}
};
zmj._ColumnSplitter = function($) {
	this.grid = $;
	WoBw(this.grid.el, "mousedown", this.Vl, this);
	$.on("layout", this.VH, this)
};
zmj._ColumnSplitter[Yq] = {
	VH: function(A) {
		if (this.splittersEl) zmj[Vj](this.splittersEl);
		if (this.splitterTimer) return;
		var $ = this.grid;
		if ($[F9lZ]() == false) return;
		var _ = this;
		this.splitterTimer = setTimeout(function() {
			var H = $[U8KO](),
			I = H.length,
			E = Vhwd($.Kz, true),
			B = $.getScrollLeft(),
			G = [];
			for (var J = 0, F = H.length; J < F; J++) {
				var D = H[J],
				C = $[GUMO](D);
				if (!C) break;
				var A = C.top - E.top,
				M = C.right - E.left - 2,
				K = C.height;
				if ($[AjT] && $[AjT]()) {
					if (J >= $[Dgs]);
				} else M += B;
				var N = $[UBA](D);
				if (N && N.columns) if (N.columns[N.columns.length - 1] == D) if (K + 5 < E.height) {
					A = 0;
					K = E.height
				}
				if ($[Vvds] && D[URW]) G[G.length] = "<div id=\"" + D._id + "\" class=\"zmj-grid-splitter\" style=\"left:" + (M - 1) + "px;top:" + A + "px;height:" + K + "px;\"></div>"
			}
			var O = G.join("");
			_.splittersEl = document.createElement("div");
			_.splittersEl.className = "zmj-grid-splitters";
			_.splittersEl.innerHTML = O;
			var L = $._getHeaderScrollEl();
			L.appendChild(_.splittersEl);
			_.splitterTimer = null
		},
		100)
	},
	Vl: function(B) {
		var $ = this.grid,
		A = B.target;
		if (Zq6(A, "zmj-grid-splitter")) {
			var _ = $._V[A.id];
			if ($[Vvds] && _ && _[URW]) {
				this.splitterColumn = _;
				this.getDrag().start(B)
			}
		}
	},
	getDrag: function() {
		if (!this.drag) this.drag = new zmj.Drag({
			capture: true,
			onStart: zmj.createDelegate(this.J$c, this),
			onMove: zmj.createDelegate(this.Xuhi, this),
			onStop: zmj.createDelegate(this.GVij, this)
		});
		return this.drag
	},
	J$c: function(_) {
		var $ = this.grid,
		B = $[GUMO](this.splitterColumn);
		this.columnBox = B;
		this.TsGm = zmj.append(document.body, "<div class=\"zmj-grid-proxy\"></div>");
		var A = $.getBox(true);
		A.x = B.x;
		A.width = B.width;
		A.right = B.right;
		YcA(this.TsGm, A)
	},
	Xuhi: function(A) {
		var $ = this.grid,
		B = zmj.copyTo({},
		this.columnBox),
		_ = B.width + (A.now[0] - A.init[0]);
		if (_ < $.columnMinWidth) _ = $.columnMinWidth;
		if (_ > $.columnMaxWidth) _ = $.columnMaxWidth;
		WE(this.TsGm, _)
	},
	GVij: function(E) {
		var $ = this.grid,
		F = Vhwd(this.TsGm),
		D = this,
		C = $[SA];
		$[SA] = false;
		setTimeout(function() {
			jQuery(D.TsGm).remove();
			D.TsGm = null;
			$[SA] = C
		},
		10);
		var G = this.splitterColumn,
		_ = parseInt(G.width);
		if (_ + "%" != G.width) {
			var A = $[PL6](G),
			B = parseInt(_ / A * F.width);
			$[ZHC](G, B)
		}
	}
};
zmj._ColumnMove = function($) {
	this.grid = $;
	WoBw(this.grid.el, "mousedown", this.Vl, this)
};
zmj._ColumnMove[Yq] = {
	Vl: function(B) {
		var $ = this.grid;
		if ($[ECE] && $[ECE]()) return;
		if (Zq6(B.target, "zmj-grid-splitter")) return;
		if (B.button == zmj.MouseButton.Right) return;
		var A = J6j(B.target, $._headerCellCls);
		if (A) {
			var _ = $.ZKPY(B);
			if ($[GUE] && _ && _.allowMove) {
				this.dragColumn = _;
				this._columnEl = A;
				this.getDrag().start(B)
			}
		}
	},
	getDrag: function() {
		if (!this.drag) this.drag = new zmj.Drag({
			capture: isIE9 ? false: true,
			onStart: zmj.createDelegate(this.J$c, this),
			onMove: zmj.createDelegate(this.Xuhi, this),
			onStop: zmj.createDelegate(this.GVij, this)
		});
		return this.drag
	},
	J$c: function(_) {
		function A(_) {
			var A = _.header;
			if (typeof A == "function") A = A[KQk]($, _);
			if (zmj.isNull(A) || A === "") A = "&nbsp;";
			return A
		}
		var $ = this.grid;
		this.TsGm = zmj.append(document.body, "<div class=\"zmj-grid-columnproxy\"></div>");
		this.TsGm.innerHTML = "<div class=\"zmj-grid-columnproxy-inner\" style=\"height:26px;\">" + A(this.dragColumn) + "</div>";
		zmj[GzmA](this.TsGm, _.now[0] + 15, _.now[1] + 18);
		_I(this.TsGm, "zmj-grid-no");
		this.moveTop = zmj.append(document.body, "<div class=\"zmj-grid-movetop\"></div>");
		this.moveBottom = zmj.append(document.body, "<div class=\"zmj-grid-movebottom\"></div>")
	},
	Xuhi: function(A) {
		var $ = this.grid,
		G = A.now[0];
		zmj[GzmA](this.TsGm, G + 15, A.now[1] + 18);
		this.targetColumn = this.insertAction = null;
		var D = J6j(A.event.target, $._headerCellCls);
		if (D) {
			var C = $.ZKPY(A.event);
			if (C && C != this.dragColumn) {
				var _ = $[UBA](this.dragColumn),
				E = $[UBA](C);
				if (_ == E) {
					this.targetColumn = C;
					this.insertAction = "before";
					var F = $[GUMO](this.targetColumn);
					if (G > F.x + F.width / 2) this.insertAction = "after"
				}
			}
		}
		if (this.targetColumn) {
			_I(this.TsGm, "zmj-grid-ok");
			Kw(this.TsGm, "zmj-grid-no");
			var B = $[GUMO](this.targetColumn);
			this.moveTop.style.display = "block";
			this.moveBottom.style.display = "block";
			if (this.insertAction == "before") {
				zmj[GzmA](this.moveTop, B.x - 4, B.y - 9);
				zmj[GzmA](this.moveBottom, B.x - 4, B.bottom)
			} else {
				zmj[GzmA](this.moveTop, B.right - 4, B.y - 9);
				zmj[GzmA](this.moveBottom, B.right - 4, B.bottom)
			}
		} else {
			Kw(this.TsGm, "zmj-grid-ok");
			_I(this.TsGm, "zmj-grid-no");
			this.moveTop.style.display = "none";
			this.moveBottom.style.display = "none"
		}
	},
	GVij: function(_) {
		var $ = this.grid;
		zmj[Vj](this.TsGm);
		zmj[Vj](this.moveTop);
		zmj[Vj](this.moveBottom);
		$[H1B](this.dragColumn, this.targetColumn, this.insertAction);
		this.TsGm = this.moveTop = this.moveBottom = this.dragColumn = this.targetColumn = null
	}
};
FYf = function($) {
	this.grid = $;
	this.grid.on("cellmousedown", this.SIh, this);
	this.grid.on("cellclick", this.Km6N, this);
	this.grid.on("celldblclick", this.Km6N, this);
	WoBw(this.grid.el, "keydown", this.Fdf, this)
};
FYf[Yq] = {
	Fdf: function(G) {
		var $ = this.grid;
		if (EjQz($.ATG, G.target) || EjQz($.Prc, G.target) || EjQz($.MbK, G.target)) return;
		var A = $.getCurrentCell();
		if (G.shiftKey || G.ctrlKey) return;
		if (G.keyCode == 37 || G.keyCode == 38 || G.keyCode == 39 || G.keyCode == 40) G.preventDefault();
		var C = $[ICLd](),
		B = A ? A[1] : null,
		_ = A ? A[0] : null;
		if (!A) _ = $.getCurrent();
		var F = C.indexOf(B),
		D = $.indexOf(_),
		E = $.getData().length;
		switch (G.keyCode) {
		case 27:
			break;
		case 13:
			if ($[YVm] && A) $[I3J1]();
			break;
		case 37:
			if (B) {
				if (F > 0) F -= 1
			} else F = 0;
			break;
		case 38:
			if (_) {
				if (D > 0) D -= 1
			} else D = 0;
			if (D != 0 && $.isVirtualScroll()) if ($._viewRegion.start > D) {
				$.VC5.scrollTop -= $._rowHeight;
				$._tryUpdateScroll()
			}
			break;
		case 39:
			if (B) {
				if (F < C.length - 1) F += 1
			} else F = 0;
			break;
		case 40:
			if (_) {
				if (D < E - 1) D += 1
			} else D = 0;
			if ($.isVirtualScroll()) if ($._viewRegion.end < D) {
				$.VC5.scrollTop += $._rowHeight;
				$._tryUpdateScroll()
			}
			break;
		default:
			break
		}
		B = C[F];
		_ = $.getAt(D);
		if (B && _ && $[SUs]) {
			A = [_, B];
			$[QFOk](A)
		}
		if (_ && $[OLpo]) {
			$[FqM]();
			$[WMY](_)
		}
	},
	Km6N: function(A) {
		if (this.grid.cellEditAction != A.type) return;
		var $ = A.record,
		_ = A.column;
		if (!_[E8L] && !this.grid[BUK]()) if (A.htmlEvent.shiftKey || A.htmlEvent.ctrlKey);
		else this.grid[I3J1]()
	},
	SIh: function(C) {
		var _ = C.record,
		B = C.column,
		$ = this.grid;
		if (this.grid[SUs]) {
			var A = [_, B];
			this.grid[QFOk](A)
		}
		if ($[OLpo]) if ($[R0PE]) {
			this.grid.el.onselectstart = function() {};
			if (C.htmlEvent.shiftKey) {
				this.grid.el.onselectstart = function() {
					return false
				};
				C.htmlEvent.preventDefault();
				if (!this.currentRecord) {
					this.grid[D3f](_);
					this.currentRecord = this.grid[DNU]()
				} else {
					this.grid[FqM]();
					this.grid.selectRange(this.currentRecord, _)
				}
			} else {
				this.grid.el.onselectstart = function() {};
				if (C.htmlEvent.ctrlKey) {
					this.grid.el.onselectstart = function() {
						return false
					};
					C.htmlEvent.preventDefault()
				}
				if (C.column._multiRowSelect === true || C.htmlEvent.ctrlKey) {
					if ($[FURX](_)) $[Nlip](_);
					else $[D3f](_)
				} else if ($[FURX](_));
				else {
					$[FqM]();
					$[D3f](_)
				}
				this.currentRecord = this.grid[DNU]()
			}
		} else if (!$[FURX](_)) {
			$[FqM]();
			$[D3f](_)
		} else if (C.htmlEvent.ctrlKey) $[FqM]()
	}
};
zmj._CellToolTip = function($) {
	this.grid = $;
	WoBw(this.grid.el, "mousemove", this.__onGridMouseMove, this)
};
zmj._CellToolTip[Yq] = {
	__onGridMouseMove: function(D) {
		var $ = this.grid,
		A = $.Sd1U(D),
		_ = $.DX3l(A.record, A.column),
		B = $.getCellError(A.record, A.column);
		if (_) {
			if (B) {
				_.title = B.errorText;
				return
			}
			if (_.firstChild) if (Zq6(_.firstChild, "zmj-grid-cell-inner") || Zq6(_.firstChild, "zmj-treegrid-treecolumn-inner")) _ = _.firstChild;
			if (_.scrollWidth > _.clientWidth) {
				var C = _.innerText || _.textContent || "";
				_.title = C.trim()
			} else _.title = ""
		}
	}
};
zmj_CellValidator_Prototype = {
	getCellErrors: function() {
		return this._cellErrors
	},
	getCellError: function($, _) {
		$ = this[AK85] ? this[AK85]($) : this[I3Ov]($);
		_ = this[ES6s](_);
		if (!$ || !_) return;
		var A = $[this._rowIdField] + "$" + _._id;
		return this._cellMapErrors[A]
	},
	isValid: function() {
		return this._cellErrors.length == 0
	},
	validate: function() {
		var A = this.data;
		for (var $ = 0, B = A.length; $ < B; $++) {
			var _ = A[$];
			this.validateRow(_)
		}
	},
	validateRow: function(_) {
		var B = this[U8KO]();
		for (var $ = 0, C = B.length; $ < C; $++) {
			var A = B[$];
			this.validateCell(_, A)
		}
	},
	validateCell: function(C, E) {
		C = this[AK85] ? this[AK85](C) : this[I3Ov](C);
		E = this[ES6s](E);
		if (!C || !E) return;
		var I = {
			record: C,
			row: C,
			node: C,
			column: E,
			field: E.field,
			value: C[E.field],
			isValid: true,
			errorText: ""
		};
		if (E.vtype) zmj._ValidateVType(E.vtype, I.value, I, E);
		if (I.isValid == true && E.unique && E.field) {
			var A = {},
			D = this.data,
			F = E.field;
			for (var _ = 0, G = D.length; _ < G; _++) {
				var $ = D[_],
				H = $[F];
				if (zmj.isNull(H) || H === "");
				else {
					var B = A[H];
					if (B && $ == C) {
						I.isValid = false;
						I.errorText = zmj._getErrorText(E, "uniqueErrorText");
						this.setCellIsValid(B, E, I.isValid, I.errorText);
						break
					}
					A[H] = $
				}
			}
		}
		this.fire("cellvalidation", I);
		this.setCellIsValid(C, E, I.isValid, I.errorText)
	},
	setIsValid: function(_) {
		if (_) {
			var A = this._cellErrors.clone();
			for (var $ = 0, B = A.length; $ < B; $++) {
				var C = A[$];
				this.setCellIsValid(C.record, C.column, true)
			}
		}
	},
	setCellIsValid: function(_, A, B, D) {
		_ = this[AK85] ? this[AK85](_) : this[I3Ov](_);
		A = this[ES6s](A);
		if (!_ || !A) return;
		var E = _[this._rowIdField] + "$" + A._id,
		$ = this.DX3l(_, A),
		C = this._cellMapErrors[E];
		delete this._cellMapErrors[E];
		this._cellErrors.remove(C);
		if (B === true) {
			if ($ && C) Kw($, "zmj-grid-cell-error")
		} else {
			C = {
				record: _,
				column: A,
				isValid: B,
				errorText: D
			};
			this._cellMapErrors[E] = C;
			this._cellErrors.add(C);
			if ($) _I($, "zmj-grid-cell-error")
		}
	}
};
zmj.copyTo(Wo.prototype, zmj_CellValidator_Prototype);
zmj.GridEditor = function() {
	this._inited = true;
	ET[CPy][CLu][KQk](this);
	this[QjIH]();
	this.el.uid = this.uid;
	this[GX]();
	this.FpQk();
	this[B1z](this.uiCls)
};
HX_P(zmj.GridEditor, ET, {
	el: null,
	_create: function() {
		this.el = document.createElement("input");
		this.el.type = "text";
		this.el.style.width = "100%"
	},
	getValue: function() {
		return this.el.value
	},
	setValue: function($) {
		this.el.value = $
	},
	setWidth: function($) {}
});
FB = function() {
	FB[CPy][CLu][KQk](this)
};
HX_P(FB, ET, {
	pageIndex: 0,
	pageSize: 10,
	totalCount: 0,
	totalPage: 0,
	showPageIndex: true,
	showPageSize: true,
	showTotalCount: true,
	showPageInfo: true,
	_clearBorder: false,
	showButtonText: false,
	showButtonIcon: true,
	firstText: "\u9996\u9875",
	prevText: "\u4e0a\u4e00\u9875",
	nextText: "\u4e0b\u4e00\u9875",
	lastText: "\u5c3e\u9875",
	pageInfoText: "\u6bcf\u9875 {0} \u6761,\u5171 {1} \u6761",
	sizeList: [10, 20, 50, 100],
	uiCls: "zmj-pager",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "zmj-pager";
		var $ = "<div class=\"zmj-pager-left\"></div><div class=\"zmj-pager-right\"></div>";
		this.el.innerHTML = $;
		this.buttonsEl = this._leftEl = this.el.childNodes[0];
		this._rightEl = this.el.childNodes[1];
		this.sizeEl = zmj.append(this.buttonsEl, "<span class=\"zmj-pager-size\"></span>");
		this.sizeCombo = new AcB_();
		this.sizeCombo.setName("pagesize");
		this.sizeCombo[GaK6](45);
		this.sizeCombo[_B9](this.sizeEl);
		zmj.append(this.sizeEl, "<span class=\"separator\"></span>");
		this.firstButton = new KiUK();
		this.firstButton[_B9](this.buttonsEl);
		this.prevButton = new KiUK();
		this.prevButton[_B9](this.buttonsEl);
		this.indexEl = document.createElement("span");
		this.indexEl.className = "zmj-pager-index";
		this.indexEl.innerHTML = "<input id=\"\" type=\"text\" class=\"zmj-pager-num\"/><span class=\"zmj-pager-pages\">/ 0</span>";
		this.buttonsEl.appendChild(this.indexEl);
		this.numInput = this.indexEl.firstChild;
		this.pagesLabel = this.indexEl.lastChild;
		this.nextButton = new KiUK();
		this.nextButton[_B9](this.buttonsEl);
		this.lastButton = new KiUK();
		this.lastButton[_B9](this.buttonsEl);
		this.firstButton.setPlain(true);
		this.prevButton.setPlain(true);
		this.nextButton.setPlain(true);
		this.lastButton.setPlain(true);
		this.update()
	},
	destroy: function($) {
		if (this.pageSelect) {
			zmj[L4D](this.pageSelect);
			this.pageSelect = null
		}
		if (this.numInput) {
			zmj[L4D](this.numInput);
			this.numInput = null
		}
		this.sizeEl = null;
		this.buttonsEl = null;
		FB[CPy][Wsj][KQk](this, $)
	},
	_initEvents: function() {
		FB[CPy][GX][KQk](this);
		this.firstButton.on("click",
		function($) {
			this.KUs(0)
		},
		this);
		this.prevButton.on("click",
		function($) {
			this.KUs(this[S9] - 1)
		},
		this);
		this.nextButton.on("click",
		function($) {
			this.KUs(this[S9] + 1)
		},
		this);
		this.lastButton.on("click",
		function($) {
			this.KUs(this.totalPage)
		},
		this);
		function $() {
			var $ = parseInt(this.numInput.value);
			if (isNaN($)) this.update();
			else this.KUs($ - 1)
		}
		WoBw(this.numInput, "change",
		function(_) {
			$[KQk](this)
		},
		this);
		WoBw(this.numInput, "keydown",
		function(_) {
			if (_.keyCode == 13) {
				$[KQk](this);
				_.stopPropagation()
			}
		},
		this);
		this.sizeCombo.on("valuechanged", this.WEAo, this)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		zmj.layout(this._leftEl);
		zmj.layout(this._rightEl)
	},
	setPageIndex: function($) {
		if (isNaN($)) return;
		this[S9] = $;
		this.update()
	},
	getPageIndex: function() {
		return this[S9]
	},
	setPageSize: function($) {
		if (isNaN($)) return;
		this[HeC] = $;
		this.update()
	},
	getPageSize: function() {
		return this[HeC]
	},
	setTotalCount: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this[Jju] = $;
		this.update()
	},
	getTotalCount: function() {
		return this[Jju]
	},
	setSizeList: function($) {
		if (!zmj.isArray($)) return;
		this[AGX] = $;
		this.update()
	},
	getSizeList: function() {
		return this[AGX]
	},
	setShowPageSize: function($) {
		this.showPageSize = $;
		this.update()
	},
	getShowPageSize: function() {
		return this.showPageSize
	},
	setShowPageIndex: function($) {
		this.showPageIndex = $;
		this.update()
	},
	getShowPageIndex: function() {
		return this.showPageIndex
	},
	setShowTotalCount: function($) {
		this.showTotalCount = $;
		this.update()
	},
	getShowTotalCount: function() {
		return this.showTotalCount
	},
	setShowPageInfo: function($) {
		this.showPageInfo = $;
		this.update()
	},
	getShowPageInfo: function() {
		return this.showPageInfo
	},
	getTotalPage: function() {
		return this.totalPage
	},
	update: function($, H, F) {
		if (zmj.isNumber($)) this[S9] = parseInt($);
		if (zmj.isNumber(H)) this[HeC] = parseInt(H);
		if (zmj.isNumber(F)) this[Jju] = parseInt(F);
		this.totalPage = parseInt(this[Jju] / this[HeC]) + 1;
		if ((this.totalPage - 1) * this[HeC] == this[Jju]) this.totalPage -= 1;
		if (this[Jju] == 0) this.totalPage = 0;
		if (this[S9] > this.totalPage - 1) this[S9] = this.totalPage - 1;
		if (this[S9] <= 0) this[S9] = 0;
		if (this.totalPage <= 0) this.totalPage = 0;
		this.firstButton.enable();
		this.prevButton.enable();
		this.nextButton.enable();
		this.lastButton.enable();
		if (this[S9] == 0) {
			this.firstButton.disable();
			this.prevButton.disable()
		}
		if (this[S9] >= this.totalPage - 1) {
			this.nextButton.disable();
			this.lastButton.disable()
		}
		this.numInput.value = this[S9] > -1 ? this[S9] + 1: 0;
		this.pagesLabel.innerHTML = "/ " + this.totalPage;
		var K = this[AGX].clone();
		if (K.indexOf(this[HeC]) == -1) {
			K.push(this[HeC]);
			K = K.sort(function($, _) {
				return $ > _
			})
		}
		var _ = [];
		for (var E = 0, B = K.length; E < B; E++) {
			var D = K[E],
			G = {};
			G.text = D;
			G.id = D;
			_.push(G)
		}
		this.sizeCombo[Uj](_);
		this.sizeCombo[NHk2](this[HeC]);
		var A = this.firstText,
		J = this.prevText,
		C = this.nextText,
		I = this.lastText;
		if (this.showButtonText == false) A = J = C = I = "";
		this.firstButton[Vh](A);
		this.prevButton[Vh](J);
		this.nextButton[Vh](C);
		this.lastButton[Vh](I);
		A = this.firstText,
		J = this.prevText,
		C = this.nextText,
		I = this.lastText;
		if (this.showButtonText == true) A = J = C = I = "";
		this.firstButton.setTooltip(A);
		this.prevButton.setTooltip(J);
		this.nextButton.setTooltip(C);
		this.lastButton.setTooltip(I);
		this.firstButton.setIconCls(this.showButtonIcon ? "zmj-pager-first": "");
		this.prevButton.setIconCls(this.showButtonIcon ? "zmj-pager-prev": "");
		this.nextButton.setIconCls(this.showButtonIcon ? "zmj-pager-next": "");
		this.lastButton.setIconCls(this.showButtonIcon ? "zmj-pager-last": "");
		this._rightEl.innerHTML = String.format(this.pageInfoText, this.pageSize, this[Jju]);
		this.indexEl.style.display = this.showPageIndex ? "": "none";
		this.sizeEl.style.display = this.showPageSize ? "": "none";
		this._rightEl.style.display = this.showPageInfo ? "": "none"
	},
	WEAo: function(_) {
		var $ = parseInt(this.sizeCombo.getValue());
		this.KUs(0, $)
	},
	KUs: function($, _) {
		var A = {
			pageIndex: zmj.isNumber($) ? $: this.pageIndex,
			pageSize: zmj.isNumber(_) ? _: this.pageSize,
			cancel: false
		};
		if (A[S9] > this.totalPage - 1) A[S9] = this.totalPage - 1;
		if (A[S9] < 0) A[S9] = 0;
		this.fire("pagechanged", A);
		if (A.cancel == false) this.update(A.pageIndex, A[HeC])
	},
	onPageChanged: function(_, $) {
		this.on("pagechanged", _, $)
	},
	getAttrs: function(el) {
		var attrs = FB[CPy][YIb][KQk](this, el);
		zmj[W5cB](el, attrs, ["onpagechanged", "sizeList"]);
		zmj[D4q](el, attrs, ["showPageIndex", "showPageSize", "showTotalCount", "showPageInfo"]);
		zmj[PI](el, attrs, ["pageIndex", "pageSize", "totalCount"]);
		if (typeof attrs[AGX] == "string") attrs[AGX] = eval(attrs[AGX]);
		return attrs
	}
});
Cmk(FB, "pager");
KZ = function() {
	this.columns = [];
	this.GWi = [];
	this._V = {};
	this.EsO = {};
	this._cellErrors = [];
	this._cellMapErrors = {};
	KZ[CPy][CLu][KQk](this);
	this.P2Y.style.display = this[URW] ? "": "none"
};
HX_P(KZ, NR, {
	_rowIdField: "_id",
	width: 300,
	height: 180,
	allowResize: false,
	treeColumn: "",
	columns: [],
	columnWidth: 80,
	allowResizeColumn: true,
	allowMoveColumn: true,
	OW: true,
	_headerCellCls: "zmj-treegrid-headerCell",
	_cellCls: "zmj-treegrid-cell",
	OHOe: "zmj-treegrid-border",
	$RgL: "zmj-treegrid-header",
	PBb: "zmj-treegrid-body",
	KyE: "zmj-treegrid-node",
	KE: "zmj-treegrid-nodes",
	K0kv: "zmj-treegrid-selectedNode",
	Gwd2: "zmj-treegrid-hoverNode",
	XO: "zmj-treegrid-expand",
	VEhc: "zmj-treegrid-collapse",
	HdK: "zmj-treegrid-ec-icon",
	WWiL: "zmj-treegrid-nodeTitle",
	IB: function(_) {
		if (!_) return null;
		var $ = this.$eB(_);
		return $
	},
	uiCls: "zmj-treegrid",
	_create: function() {
		KZ[CPy][QjIH][KQk](this);
		this.P2Y = zmj.append(this.AE, "<div class=\"zmj-grid-resizeGrid\" style=\"\"></div>");
		WoBw(this.VC5, "scroll", this.DGn, this);
		this._aRJ = new LLF(this);
		this._ColumnMove = new zmj._ColumnMove(this);
		this.F74 = new zmj._ColumnSplitter(this);
		this._CellTip = new zmj._CellToolTip(this)
	},
	YFB: function($) {
		return this.uid + "$column$" + $.id
	},
	_getHeaderScrollEl: function() {
		return this.Kz.firstChild
	},
	_gR: function(D) {
		var F = "",
		B = this[U8KO]();
		if (isIE) {
			if (isIE6 || isIE7 || (isIE8 && !jQuery.boxModel) || (isIE9 && !jQuery.boxModel)) F += "<tr style=\"display:none;\">";
			else F += "<tr >"
		} else F += "<tr>";
		for (var $ = 0, C = B.length; $ < C; $++) {
			var A = B[$],
			_ = A.width,
			E = this.YFB(A) + "$" + D;
			F += "<td id=\"" + E + "\" style=\"padding:0;border:0;margin:0;height:0;";
			if (A.width) F += "width:" + A.width;
			F += "\" ></td>"
		}
		F += "</tr>";
		return F
	},
	SGo: function() {
		var E = this[U8KO](),
		F = [];
		F[F.length] = "<div class=\"zmj-treegrid-headerInner\"><table class=\"zmj-treegrid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		F[F.length] = this._gR();
		F[F.length] = "<tr>";
		for (var D = 0, _ = E.length; D < _; D++) {
			var B = E[D],
			C = B.header;
			if (typeof C == "function") C = C[KQk](this, B);
			if (zmj.isNull(C) || C === "") C = "&nbsp;";
			var A = B.width;
			if (zmj.isNumber(A)) A = A + "px";
			var $ = this.YFB(B);
			F[F.length] = "<td id=\"";
			F[F.length] = $;
			F[F.length] = "\" class=\"zmj-treegrid-headerCell ";
			if (B.headerCls) F[F.length] = B.headerCls;
			F[F.length] = "\" style=\"";
			if (B.headerStyle) F[F.length] = B.headerStyle + ";";
			if (A) F[F.length] = "width:" + A + ";";
			if (B.headerAlign) F[F.length] = "text-align:" + B.headerAlign + ";";
			F[F.length] = "\">";
			F[F.length] = C;
			F[F.length] = "</td>"
		}
		F[F.length] = "</tr></table></div>";
		this.Kz.innerHTML = F.join("")
	},
	BsM: function(B, M, G) {
		var K = !G;
		if (!G) G = [];
		var H = B[this.textField];
		if (H === null || H === undefined) H = "";
		var I = this.isLeaf(B),
		$ = this.getLevel(B),
		D = "";
		if (!I) D = this.isExpandedNode(B) ? this.XO: this.VEhc;
		if (this.$VS == B) D += " " + this.K0kv;
		var E = this[U8KO]();
		G[G.length] = "<table class=\"zmj-treegrid-nodeTitle ";
		G[G.length] = D;
		G[G.length] = "\" cellspacing=\"0\" cellpadding=\"0\">";
		G[G.length] = this._gR();
		G[G.length] = "<tr>";
		for (var J = 0, _ = E.length; J < _; J++) {
			var C = E[J],
			F = this.Gn1(B, C),
			L = this.Ze(B, C),
			A = C.width;
			if (typeof A == "number") A = A + "px";
			G[G.length] = "<td id=\"";
			G[G.length] = F;
			G[G.length] = "\" class=\"zmj-treegrid-cell ";
			if (L.cellCls) G[G.length] = L.cellCls;
			G[G.length] = "\" style=\"";
			if (L.cellStyle) {
				G[G.length] = L.cellStyle;
				G[G.length] = ";"
			}
			if (C.align) {
				G[G.length] = "text-align:";
				G[G.length] = C.align;
				G[G.length] = ";"
			}
			G[G.length] = "\">";
			G[G.length] = L.cellHtml;
			G[G.length] = "</td>";
			if (L.rowCls) rowCls = L.rowCls;
			if (L.rowStyle) rowStyle = L.rowStyle
		}
		G[G.length] = "</table>";
		if (K) return G.join("")
	},
	doUpdate: function() {
		if (!this.Djl) return;
		this.SGo();
		var $ = new Date(),
		_ = this._getViewChildNodes(this.root),
		B = [];
		this.Oje(_, this.root, B);
		var A = B.join("");
		this.VC5.innerHTML = A;
		this.SjC$()
	},
	getScrollLeft: function() {
		return this.VC5.scrollLeft
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		var C = this[Uw](),
		D = this[Wc](),
		_ = this[BMK](true),
		A = this[KjJg](true),
		B = this[USh](),
		$ = A - B;
		this.VC5.style.width = _ + "px";
		this.VC5.style.height = $ + "px";
		this.IRU();
		this.fire("layout")
	},
	IRU: function() {
		var B = this.VC5.scrollHeight,
		E = this.VC5.clientHeight,
		A = this[BMK](true);
		if (isIE) {
			var _ = this.Kz.firstChild.firstChild,
			D = this.VC5.firstChild;
			if (E >= B) {
				if (D) D.style.width = "100%";
				if (_) _.style.width = "100%"
			} else {
				if (D) {
					var $ = parseInt(D.parentNode.offsetWidth - 17) + "px";
					D.style.width = $
				}
				if (_) _.style.width = $
			}
		}
		if (E < B) this.Kz.firstChild.style.width = (A - 17) + "px";
		else this.Kz.firstChild.style.width = "100%";
		try {
			$ = this.Kz.firstChild.firstChild.offsetWidth;
			this.VC5.firstChild.style.width = $ + "px"
		} catch(C) {}
		this.DGn()
	},
	getHeaderHeight: function() {
		return $L7(this.Kz)
	},
	Ze: function($, B) {
		var D = this[D6e];
		if (D && this.hasChildren($)) D = this[CTa];
		var _ = $[B.field],
		C = {
			isLeaf: this.isLeaf($),
			rowIndex: this.indexOf($),
			showCheckBox: D,
			iconCls: this.getNodeIcon($),
			showTreeIcon: this.showTreeIcon,
			sender: this,
			record: $,
			row: $,
			node: $,
			column: B,
			field: B ? B.field: null,
			value: _,
			cellHtml: _,
			rowCls: null,
			cellCls: B ? (B.cellCls || "") : "",
			rowStyle: null,
			cellStyle: B ? (B.cellStyle || "") : ""
		};
		if (B.dateFormat) if (zmj.isDate(C.value)) C.cellHtml = zmj.formatDate(_, B.dateFormat);
		else C.cellHtml = _;
		var A = B.renderer;
		if (A) {
			fn = typeof A == "function" ? A: window[A];
			if (fn) C.cellHtml = fn[KQk](B, C)
		}
		this.fire("drawcell", C);
		if (C.cellHtml === null || C.cellHtml === undefined || C.cellHtml === "") C.cellHtml = "&nbsp;";
		if (!this.treeColumn || this.treeColumn !== B.name) return C;
		this.Qgj(C);
		return C
	},
	Qgj: function(H) {
		var A = H.node;
		if (zmj.isNull(H[ZRq])) H[ZRq] = this[ZRq];
		var G = H.cellHtml,
		B = this.isLeaf(A),
		$ = this.getLevel(A) * 18,
		D = "";
		if (H.cellCls) H.cellCls += " zmj-treegrid-treecolumn ";
		else H.cellCls = " zmj-treegrid-treecolumn ";
		var F = "<div class=\"zmj-treegrid-treecolumn-inner " + D + "\">";
		if (!B) F += "<a href=\"#\" onclick=\"return false;\"  hidefocus class=\"" + this.HdK + "\" style=\"left:" + ($) + "px;\"></a>";
		$ += 18;
		if (H[ZRq]) {
			var _ = this.getNodeIcon(A);
			F += "<div class=\"" + _ + " zmj-treegrid-nodeicon\" style=\"left:" + $ + "px;\"></div>";
			$ += 18
		}
		G = "<span class=\"zmj-tree-nodetext\">" + G + "</span>";
		if (H[D6e]) {
			var E = this.MnVL(A),
			C = this.isCheckedNode(A);
			G = "<input type=\"checkbox\" id=\"" + E + "\" class=\"" + this.Nli + "\" hidefocus " + (C ? "checked": "") + "/>" + G
		}
		F += "<div class=\"zmj-treegrid-nodeshow\" style=\"margin-left:" + ($ + 2) + "px;\">" + G + "</div>";
		F += "</div>";
		G = F;
		H.cellHtml = G
	},
	setTreeColumn: function($) {
		if (this.treeColumn != $) {
			this.treeColumn = $;
			this[J_w]()
		}
	},
	getTreeColumn: function($) {
		return this.treeColumn
	},
	setAllowResizeColumn: function($) {
		this[Vvds] = $
	},
	getAllowResizeColumn: function($) {
		return this[Vvds]
	},
	setAllowMoveColumn: function($) {
		this[GUE] = $
	},
	getAllowMoveColumn: function($) {
		return this[GUE]
	},
	setAllowResize: function($) {
		this[URW] = $;
		this.P2Y.style.display = this[URW] ? "": "none"
	},
	getAllowResize: function() {
		return this[URW]
	},
	Gn1: function(_, $) {
		return this.uid + "$" + _._id + "$" + $._id
	},
	setColumnWidth: function(_, $) {
		_ = this[ES6s](_);
		if (!_) return;
		if (zmj.isNumber($)) $ += "px";
		_.width = $;
		this[J_w]()
	},
	getColumnWidth: function(_) {
		var $ = this[GUMO](_);
		return $ ? $.width: 0
	},
	DGn: function(_) {
		var $ = this.VC5.scrollLeft;
		this.Kz.firstChild.scrollLeft = $
	},
	getAttrs: function(_) {
		var E = KZ[CPy][YIb][KQk](this, _);
		zmj[W5cB](_, E, ["treeColumn", "ondrawcell"]);
		zmj[D4q](_, E, ["allowResizeColumn", "allowMoveColumn", "allowResize"]);
		var C = zmj[P8pq](_);
		for (var $ = 0, D = C.length; $ < D; $++) {
			var B = C[$],
			A = jQuery(B).attr("property");
			if (!A) continue;
			A = A.toLowerCase();
			if (A == "columns") E.columns = zmj._ParseColumns(B)
		}
		delete E.data;
		return E
	}
});
zmj.copyTo(KZ.prototype, zmj_Column_Prototype);
zmj.copyTo(KZ.prototype, zmj_CellValidator_Prototype);
Cmk(KZ, "treegrid");
zmj.RadioButtonList = YfeE,
zmj.ValidatorBase = Rge,
zmj.AutoComplete = Z7W,
zmj.CheckBoxList = _Wq,
zmj.DataBinding = Vt9,
zmj.OutlookTree = T03,
zmj.OutlookMenu = Dl9,
zmj.TextBoxList = Fuo,
zmj.TimeSpinner = WJ,
zmj.ListControl = LW,
zmj.OutlookBar = Idm,
zmj.FileUpload = Au,
zmj.TreeSelect = We,
zmj.DatePicker = PHo,
zmj.ButtonEdit = DjY,
zmj.PopupEdit = C7r,
zmj.Component = Ltw2,
zmj.TreeGrid = KZ,
zmj.DataGrid = Wo,
zmj.MenuItem = UgP,
zmj.Splitter = SD,
zmj.HtmlFile = Hayi,
zmj.Calendar = GFD,
zmj.ComboBox = AcB_,
zmj.TextArea = RGD,
zmj.Password = NFr,
zmj.CheckBox = _QU,
zmj.DataSet = L4A,
zmj.Include = BGN,
zmj.Spinner = ViYb,
zmj.ListBox = We0,
zmj.TextBox = FhF,
zmj.Control = ET,
zmj.Layout = YE,
zmj.Window = SBwo,
zmj.Lookup = VAD,
zmj.Button = KiUK,
zmj.Hidden = QfS,
zmj.Pager = FB,
zmj.Panel = EyZ,
zmj.Popup = FAn,
zmj.Tree = NR,
zmj.Menu = AVd,
zmj.Tabs = HU3e,
zmj.Fit = M8j,
zmj.Box = Bcpb;
zmj.locale = "en-US";
zmj.dateInfo = {
	monthsLong: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
	monthsShort: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
	daysLong: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
	daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
	quarterLong: ["\u4e00\u5b63\u5ea6", "\u4e8c\u5b63\u5ea6", "\u4e09\u5b63\u5ea6", "\u56db\u5b63\u5ea6"],
	quarterShort: ["Q1", "Q2", "Q2", "Q4"],
	halfYearLong: ["\u4e0a\u534a\u5e74", "\u4e0b\u534a\u5e74"],
	patterns: {
		"d": "yyyy-M-d",
		"D": "yyyy\u5e74M\u6708d\u65e5",
		"f": "yyyy\u5e74M\u6708d\u65e5 H:mm",
		"F": "yyyy\u5e74M\u6708d\u65e5 H:mm:ss",
		"g": "yyyy-M-d H:mm",
		"G": "yyyy-M-d H:mm:ss",
		"m": "MMMd\u65e5",
		"o": "yyyy-MM-ddTHH:mm:ss.fff",
		"s": "yyyy-MM-ddTHH:mm:ss",
		"t": "H:mm",
		"T": "H:mm:ss",
		"U": "yyyy\u5e74M\u6708d\u65e5 HH:mm:ss",
		"y": "yyyy\u5e74MM\u6708"
	},
	tt: {
		"AM": "\u4e0a\u5348",
		"PM": "\u4e0b\u5348"
	},
	ten: {
		"Early": "\u4e0a\u65ec",
		"Mid": "\u4e2d\u65ec",
		"Late": "\u4e0b\u65ec"
	},
	today: "\u4eca\u5929",
	clockType: 24
};
if (GFD) zmj.copyTo(GFD.prototype, {
	firstDayOfWeek: 0,
	todayText: "\u4eca\u5929",
	clearText: "\u6e05\u9664",
	okText: "\u786e\u5b9a",
	cancelText: "\u53d6\u6d88",
	daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
	format: "yyyy\u5e74MM\u6708",
	timeFormat: "H:mm"
});
for (var id in zmj) {
	var clazz = zmj[id];
	if (clazz && clazz[Yq] && clazz[Yq].isControl) clazz[Yq][Wr] = "\u4e0d\u80fd\u4e3a\u7a7a"
}
if (zmj.VTypes) zmj.copyTo(zmj.VTypes, {
	uniqueErrorText: "\u5b57\u6bb5\u4e0d\u80fd\u91cd\u590d",
	requiredErrorText: "\u4e0d\u80fd\u4e3a\u7a7a",
	emailErrorText: "\u8bf7\u8f93\u5165\u90ae\u4ef6\u683c\u5f0f",
	urlErrorText: "\u8bf7\u8f93\u5165URL\u683c\u5f0f",
	floatErrorText: "\u8bf7\u8f93\u5165\u6570\u5b57",
	intErrorText: "\u8bf7\u8f93\u5165\u6574\u6570",
	dateErrorText: "\u8bf7\u8f93\u5165\u65e5\u671f\u683c\u5f0f {0}",
	maxLengthErrorText: "\u4e0d\u80fd\u8d85\u8fc7 {0} \u4e2a\u5b57\u7b26",
	minLengthErrorText: "\u4e0d\u80fd\u5c11\u4e8e {0} \u4e2a\u5b57\u7b26",
	maxErrorText: "\u6570\u5b57\u4e0d\u80fd\u5927\u4e8e {0} ",
	minErrorText: "\u6570\u5b57\u4e0d\u80fd\u5c0f\u4e8e {0} ",
	rangeLengthErrorText: "\u5b57\u7b26\u957f\u5ea6\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",
	rangeCharErrorText: "\u5b57\u7b26\u6570\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",
	rangeErrorText: "\u6570\u5b57\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4"
});
if (FB) zmj.copyTo(FB.prototype, {
	firstText: "\u9996\u9875",
	prevText: "\u4e0a\u4e00\u9875",
	nextText: "\u4e0b\u4e00\u9875",
	lastText: "\u5c3e\u9875",
	pageInfoText: "\u6bcf\u9875 {0} \u6761,\u5171 {1} \u6761"
});
if (Wo) zmj.copyTo(Wo.prototype, {
	emptyText: "\u6ca1\u6709\u8fd4\u56de\u7684\u6570\u636e"
});
if (Au) Au[Yq].buttonText = "\u6d4f\u89c8...";
if (Hayi) Hayi[Yq].buttonText = "\u6d4f\u89c8...";
if (window.zmj.Gantt) {
	zmj.GanttView.ShortWeeks = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"];
	zmj.GanttView.LongWeeks = ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"];
	zmj.Gantt.PredecessorLinkType = [{
		ID: 0,
		Name: "\u5b8c\u6210-\u5b8c\u6210(FF)",
		Short: "FF"
	},
	{
		ID: 1,
		Name: "\u5b8c\u6210-\u5f00\u59cb(FS)",
		Short: "FS"
	},
	{
		ID: 2,
		Name: "\u5f00\u59cb-\u5b8c\u6210(SF)",
		Short: "SF"
	},
	{
		ID: 3,
		Name: "\u5f00\u59cb-\u5f00\u59cb(SS)",
		Short: "SS"
	}];
	zmj.Gantt.ConstraintType = [{
		ID: 0,
		Name: "\u8d8a\u65e9\u8d8a\u597d"
	},
	{
		ID: 1,
		Name: "\u8d8a\u665a\u8d8a\u597d"
	},
	{
		ID: 2,
		Name: "\u5fc5\u987b\u5f00\u59cb\u4e8e"
	},
	{
		ID: 3,
		Name: "\u5fc5\u987b\u5b8c\u6210\u4e8e"
	},
	{
		ID: 4,
		Name: "\u4e0d\u5f97\u65e9\u4e8e...\u5f00\u59cb"
	},
	{
		ID: 5,
		Name: "\u4e0d\u5f97\u665a\u4e8e...\u5f00\u59cb"
	},
	{
		ID: 6,
		Name: "\u4e0d\u5f97\u65e9\u4e8e...\u5b8c\u6210"
	},
	{
		ID: 7,
		Name: "\u4e0d\u5f97\u665a\u4e8e...\u5b8c\u6210"
	}];
	zmj.copyTo(zmj.Gantt, {
		ID_Text: "\u6807\u8bc6\u53f7",
		Name_Text: "\u4efb\u52a1\u540d\u79f0",
		PercentComplete_Text: "\u8fdb\u5ea6",
		Duration_Text: "\u5de5\u671f",
		Start_Text: "\u5f00\u59cb\u65e5\u671f",
		Finish_Text: "\u5b8c\u6210\u65e5\u671f",
		Critical_Text: "\u5173\u952e\u4efb\u52a1",
		PredecessorLink_Text: "\u524d\u7f6e\u4efb\u52a1",
		Work_Text: "\u5de5\u65f6",
		Priority_Text: "\u91cd\u8981\u7ea7\u522b",
		Weight_Text: "\u6743\u91cd",
		OutlineNumber_Text: "\u5927\u7eb2\u5b57\u6bb5",
		OutlineLevel_Text: "\u4efb\u52a1\u5c42\u7ea7",
		ActualStart_Text: "\u5b9e\u9645\u5f00\u59cb\u65e5\u671f",
		ActualFinish_Text: "\u5b9e\u9645\u5b8c\u6210\u65e5\u671f",
		WBS_Text: "WBS",
		ConstraintType_Text: "\u9650\u5236\u7c7b\u578b",
		ConstraintDate_Text: "\u9650\u5236\u65e5\u671f",
		Department_Text: "\u90e8\u95e8",
		Principal_Text: "\u8d1f\u8d23\u4eba",
		Assignments_Text: "\u8d44\u6e90\u540d\u79f0",
		Summary_Text: "\u6458\u8981\u4efb\u52a1",
		Task_Text: "\u4efb\u52a1",
		Baseline_Text: "\u6bd4\u8f83\u57fa\u51c6",
		LinkType_Text: "\u94fe\u63a5\u7c7b\u578b",
		LinkLag_Text: "\u5ef6\u9694\u65f6\u95f4",
		From_Text: "\u4ece",
		To_Text: "\u5230",
		Goto_Text: "\u8f6c\u5230\u4efb\u52a1",
		UpGrade_Text: "\u5347\u7ea7",
		DownGrade_Text: "\u964d\u7ea7",
		Add_Text: "\u65b0\u589e",
		Edit_Text: "\u7f16\u8f91",
		Remove_Text: "\u5220\u9664",
		Move_Text: "\u79fb\u52a8",
		ZoomIn_Text: "\u653e\u5927",
		ZoomOut_Text: "\u7f29\u5c0f",
		Deselect_Text: "\u53d6\u6d88\u9009\u62e9",
		Split_Text: "\u62c6\u5206\u4efb\u52a1"
	})
}