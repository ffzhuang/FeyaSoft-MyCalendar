/**
 * FeyaSoft MyCalendar
 * Copyright(c) 2006-2011, FeyaSoft Inc. All right reserved.
 * info@feyasoft.com
 * http://www.feyasoft.com
 *
 * Please read license first before your use myCalendar, For more detail
 * information, please can visit our link: http://www.cubedrive.com/myCalendar
 *
 * You need buy one of the Feyasoft's License if you want to use MyCalendar in
 * your commercial product. You must not remove, obscure or interfere with any
 * FeyaSoft copyright, acknowledgment, attribution, trademark, warning or
 * disclaimer statement affixed to, incorporated in or otherwise applied in
 * connection with the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Ext.ns("Ext.ux.calendar.view");

Ext.ux.calendar.view.MonthView = Ext.extend(Ext.ux.calendar.view.BasicView, {
	
	bodyStyle : 'background:none;',
	
	legendHeight : 17,

	border : false,

	dayFormat : 'm/d',

	templateRowNum : 6,

	weekNum : 5,

	dayNum : 7,

	rowNum : 6,

	colNum : 7,

	menuAlign : "tr-br?",

	poolDepth : 0,

	leftWidth : 25,

	showMenu : function(El) {
		if (this.menu) {
			this.menu.bindEl = El;
			this.menu.showBy(Ext.get(El.dom.parentNode), this.menuAlign);
		}
		return this;
	},

	hideMenu : function() {
		if (this.menu) {
			this.menu.hide();
		}
		return this;
	},

	initMenu : function() {
		var lan = Ext.ux.calendar.Mask.MonthView;
		this.addItem = new Ext.menu.Item({
					iconCls : 'icon_feyaCalendar_new',
					text : lan['addItem.text'],
					handler : this.onAddFn,
					scope : this
				});
		this.clearItem = new Ext.menu.Item({
					iconCls : 'icon_feyaCalendar_clear_event',
					text : lan['clearItem.text'],
					handler : this.onClearFn,
					scope : this
				});
		this.cutItem = new Ext.menu.Item({
					iconCls : 'icon_feyaCalendar_cut',
					text : lan['cutItem.text'],
					handler : this.onCutFn,
					scope : this
				});

		this.copyItem = new Ext.menu.Item({
					iconCls : 'icon_feyaCalendar_copy',
					text : lan['copyItem.text'],
					handler : this.onCopyFn,
					scope : this
				});

		this.pasteItem = new Ext.menu.Item({
					iconCls : 'icon_feyaCalendar_paste',
					text : lan['pasteItem.text'],
					handler : this.onPasteFn,
					scope : this
				});
		this.menu = new Ext.menu.Menu({
					items : [this.addItem, this.clearItem, '-', this.cutItem,
							this.copyItem, this.pasteItem]
				});
		this.menu = Ext.menu.MenuMgr.get(this.menu);
	},

	getCellIndex : function(cellId) {
		var parts = cellId.toString().split('-');
		var len = parts.length;
		var colIndex = parts[len - 1];
		var rowIndex = parts[len - 2];
		return {
			x : parseInt(rowIndex),
			y : parseInt(colIndex)
		};
	},

	generateHTML : function(data) {
		// this.generateCSS();
		this.viewerTpl = new Ext.XTemplate([
				'<div id="',
				this.id,
				'-x-monthview-viewer">',
				'<table width="100%" cellspacing="0" cellpadding="0" border="0" unselectable="on" onselectstart="return false;"><tbody><tr>',
				'<td class="x-monthview-lefter">',
				'<div id="' + this.id + '-x-monthview-lefter">',
				'<tpl for=".">',
				'<div class="x-monthview-lefter-inner x-monthview-row">',
				'<u><b id="',
				this.id,
				'-x-monthview-week-{idx}-0" class="x-monthview-lefter-inner-b">{week}</b></u>',
				'</div>',
				'</tpl>',
				'</div>',
				'</td>',
				'<td class="x-monthview-port-td">',
				'<div id="',
				this.id,
				'-x-monthview-port" class="x-monthview-port">',
				'<tpl for=".">',
				'<div id="',
				this.id,
				'-x-monthview-row-{idx}" class="',
				this.id,
				'-x-monthview-row x-monthview-row" unselectable="on">',
				'<table class="x-monthview-bg" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody>',
				'<tr>',
				'<tpl for="arr">',
				'<td id="',
				this.id,
				'-x-monthview-viewer-{parent.idx}-{idx}" class="',
				this.id,
				'-x-monthview-viewer-col-{idx} x-monthview-viewer-cell">&nbsp;</td>',
				'</tpl>',
				'</tr>',
				'</tbody></table>',
				'<table id="',
				this.id,
				'-x-monthview-ct-{idx}" class="x-monthview-ct" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>',
				'<tr>',
				'<tpl for="arr">',
				'<td id="',
				this.id,
				'-x-monthview-viewer-title-{parent.idx}-{idx}" class="',
				this.id,
				'-x-monthview-viewer-col-{idx} x-monthview-viewer-title">',
				'<u id="',
				this.id,
				'-x-monthview-viewer-link-{parent.idx}-{idx}" class="x-monthview-viewer-link">{day}</u>',
				(this.ehandler.readOnly ? '' :
						// '<img
						// id="'+this.id+'-x-monthview-tool-add-{parent.idx}-{idx}"
						// ' +
						// 'class="x-monthview-tool-add"
						// src="'+Ext.BLANK_IMAGE_URL+'"></img>' +
						'<img id="' + this.id
								+ '-x-monthview-tool-drop-{parent.idx}-{idx}" '
								+ 'class="x-monthview-tool-drop" src="'
								+ Ext.BLANK_IMAGE_URL + '"></img>'), '</td>',
				'</tpl>', '</tr>', '</tbody></table>', '</div>', '</tpl>',
				'</div>', '</div>', '</td>', '</tr></tbody></table>'].join(''));
		this.viewerTpl.compile();

		var obj = [];
		var sdate = this.daySet[0];
		var week = Ext.Date.getWeekOfYear(sdate);
		for (var i = 0; i < this.templateRowNum; i++) {
			var arr = [];
			for (var j = 0; j < this.dayNum; j++) {
				arr[arr.length] = {
					idx : j,
					day : Ext.Date
							.format((Ext.Date.add(sdate, Ext.Date.DAY, i
													* this.dayNum + j)),
									this.dayFormat)
				};
			}
			var w = (week + i) % 53;
			if (0 == w) {
				w = 53;
			}
			obj[obj.length] = {
				idx : i,
				week : w,
				arr : arr
			}
		}
		var viewer = this.viewerTpl.apply(obj);

		var days = [];
		for (var j = 0; j < this.dayNum; j++) {
			days.push('<td class="', this.id, '-x-monthview-viewer-col-' + j,
					' x-dayview-header-days">');
			days.push('<div>');
			days.push('<b style="line-height:15px;">',
					Ext.ux.calendar.Mask.MonthView['dayPre'], Ext.Date.format(
							this.daySet[j], 'l'), '</b>');
			days.push('</div>');
			days.push('</td>');
		}
		var header = [];
		header.push('<div id="', this.id,
						'-x-monthview-header" class="x-monthview-header" unselectable="on">');
		header.push('<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody>');
		header.push('<tr>');
		header = header.concat(days);
		header.push('</tr>');
		header.push('</tbody></table>');
		header.push('</div>');

		var html = header.concat(viewer).join('');
		return html;
	},

	generateCSS : function() {
		var cssText = '.' + this.id + '-x-monthview-row{}';
		for (var i = 0; i < this.dayNum; i++) {
			cssText += '.' + this.id + '-x-monthview-viewer-col-' + i + '{}';
		}
		this.cssId = Ext.id() + '-x-calendar-monthview';
		Ext.util.CSS.createStyleSheet(cssText, this.cssId);
		return cssText;
	},

	setToday:function(){
        var sdate = this.daySet[0];
        var m = Number(Ext.Date.format(sdate,'n'));   
        
        if(1 != Ext.Date.format(sdate,'j')){
            m = (m+1)%12;
            if(0 == m) m = 12;
        }
        
		var today = Ext.Date.format((new Date()),'Y-m-d');
		for(var i = 0, len = this.daySet.length; i < len; i++){
			var day = Ext.Date.format(this.daySet[i],'Y-m-d');
            var month = Ext.Date.format(this.daySet[i],'n');
			if(day == today){
				var x = Math.floor(i/this.dayNum);
				var y = i%this.dayNum;
				var tEl = Ext.get(this.id+'-x-monthview-viewer-'+x+'-'+y);
				if(tEl){
					tEl.setStyle('background-color', 'rgb(255,255,200)');
				}                
			}else if(m != month){
                var x = Math.floor(i/this.dayNum);
				var y = i%this.dayNum;
				var tEl = Ext.get(this.id+'-x-monthview-viewer-'+x+'-'+y);
				if(tEl){
					tEl.setStyle('background-color', 'rgb(245,245,245)');
				}                
            }else{
                var x = Math.floor(i/this.dayNum);
				var y = i%this.dayNum;
				var tEl = Ext.get(this.id+'-x-monthview-viewer-'+x+'-'+y);
				if(tEl){
					tEl.setStyle('background-color', 'white');
				}               
            }
		}
	},
	
	getStartDate : function(date) {
		var sDate;
		if (1 == this.startDay) {
			var n = Ext.Date.format(date, 'N');
			n = 1 - n;
			sDate = Ext.Date.add(date, Ext.Date.DAY, n);
		} else {
			var w = Ext.Date.format(date, 'w');
			sDate = Ext.Date.add(date, Ext.Date.DAY, -w);
		}
		return sDate;
	},

	initComponent : function() {
		this.id = Ext.id();

		this.ehandler.applyCalendarSetting(this);

		var today = new Date();
		var first = Ext.Date.getFirstDateOfMonth(today);
		this.recalculateWeek(first);
		var sDate = this.getStartDate(first);
		this.daySet = [];
		for (var i = 0; i < this.weekNum; i++) {
			for (var j = 0; j < this.dayNum; j++) {
				this.daySet[this.daySet.length] = Ext.Date.add(sDate,
						Ext.Date.DAY, i * this.shiftDay + j);
			}
		}
		this.html = this.generateHTML();

		this.initMenu();

		Ext.ux.calendar.view.MonthView.superclass.initComponent.call(this);
		this.addEvents('checklayout', 'afterresize', 'beforeremoteload',
				'remoteload', 'canceldetail', 'viewDay', 'viewWeek');
		this.on('checklayout', this.checkLayout, this);
		this.on('canceldetail', this.onCancelDetailFn, this);
		this.on('afterrender', this._onAfterRenderFn, this);
		this.on('afterlayout', this._onReSizingFn, this);
		this.on('bodyresize', this._onReSizingFn, this);
		this.on('sizechanged', this.onSizeChangedFn, this, {
					buffer : 100
				});
		Ext.EventManager.on(document, 'mouseup', this._onMouseUpFn, this);
	},

	_onAfterRenderFn : function() {
		this.initEls();
	},

	_onReSizingFn : function() {
		this.fireEvent('sizechanged');
	},

	onSizeChangedFn : function() {
		this.handleResize(this.getEl().getWidth(), this.getEl().getHeight());
	},

	onCancelDetailFn : function(e) {
		if (this.detailing) {
			this.detailing = false;
			this.detailCt.setStyle('display', 'none');
		}
	},

	resetSCover : function() {
		delete(this.startPos);
		delete(this.endPos);
		this.hideSCovers();
	},

	_onMouseUpFn : function(e) {
		if (!this.dragging) {
			if (this.startPos) {
				var spos = Ext.apply({}, this.startPos), epos = Ext.apply({},
						this.endPos);
				this.startPos = null;
				var eh = this.ehandler;
				if (this.colNum != this.shiftDay && 1 != eh.startDay) {
					spos.y++;
					epos.y++;
				}
				eh.prepareLegend(Ext.get(this.id + '-x-monthview-viewer-title-'
								+ epos.x + '-' + epos.y), spos, epos, this);
			}
		}
	},

	getMinMaxFromStartEnd : function(startPos, endPos) {
		var stx = startPos.x;
		var sty = startPos.y;
		var edx = endPos.x;
		var edy = endPos.y;
		if (stx < edx || (stx == edx && sty <= edy)) {
			return {
				minPos : startPos,
				maxPos : endPos
			};
		} else {
			return {
				minPos : endPos,
				maxPos : startPos
			}
		}
	},

	hideSCovers : function() {
		for (var i = 0, len = this.scovers.length; i < len; i++) {
			this.scovers[i].dom.style.display = 'none';
		}
	},

	selectRange : function(spos, epos) {
		this.hideSCovers();
		if (spos) {
			this.startPos = spos;
		} else {
			spos = this.startPos;
		}
		this.endPos = epos;
		var rs = this.getMinMaxFromStartEnd(spos, epos);
		var sx = rs.minPos.x, sy = rs.minPos.y, ex = rs.maxPos.x, ey = rs.maxPos.y;
		var cw = this.cw;
		var ch = this.ch;
		var sc, fsc = this.scovers[sx];
		var w, l = Math.floor(cw * sy);
		if (sx == ex) {
			sc = this.scovers[sx];
			sc.dom.style.display = '';
			w = cw * (ey - sy + 1);
			sc.setWidth(w);
			sc.setHeight(ch);
			sc.setLeft(l + 'px');
		} else {
			sc = this.scovers[sx];
			sc.dom.style.display = '';
			w = cw * (this.colNum - sy);
			sc.setWidth(w);
			sc.setHeight(ch);
			sc.setLeft(l + 'px');
			for (var i = sx + 1; i < ex; i++) {
				sc = this.scovers[i];
				sc.dom.style.display = '';
				w = cw * this.colNum;
				sc.setWidth(w);
				sc.setHeight(ch);
				sc.setLeft('0px');
			}
			sc = this.scovers[ex];
			sc.dom.style.display = '';
			w = cw * (ey + 1);
			sc.setWidth(w);
			sc.setHeight(ch);
			sc.setLeft('0px');
		}
	},

	calculatePos : function(e) {
		var xy = e.getXY();
		var lt = this.port.getXY();
		var y = Math.floor((xy[0] - lt[0]) / this.cw);
		var x = Math.floor((xy[1] - lt[1]) / this.ch);
		if (0 > x) {
			x = 0;
		} else if (x >= this.weekNum) {
			x = this.weekNum - 1;
			y = this.colNum - 1;
		}
		if (0 > y) {
			y = 0;
		} else if (y >= this.colNum) {
			y = this.colNum - 1;
		}
		return {
			x : x,
			y : y
		};
	},

	getIndexFromDay : function(day) {
		for (var i = 0, len = this.daySet.length; i < len; i++) {
			var iday = this.daySet[i];
			if (day == Ext.Date.format(iday, 'Y-m-d')) {
				return i;
			}
		}
	},

	alignDetailCt : function() {
		if (this.detailing) {
			var x = this.detailing.x, y = this.detailing.y, events = this.detailing.events;
			this.detailCt.setStyle('display', '');
			var tEl = Ext.get(this.id + '-x-monthview-viewer-title-' + x + '-'
					+ y);
			var cEl = Ext.get(this.id + '-x-monthview-viewer-' + x + '-' + y);
			var tfh = this.detailTitle.getHeight()
					+ this.detailFoot.getHeight() + 20;
			var h = events.length * 17;
			var bh = this.port.getBottom() - tEl.getTop() - tfh, th = cEl
					.getBottom()
					- this.port.getTop() - tfh;
			var roffset = this.port.getRight() - tEl.getRight();
			var hpos, vpos = 't', mh = bh;
			var offset = [0, 0];
			var cw = cEl.getWidth();
			if (200 < cw) {
				this.detailCt.setWidth(cw);
			} else {
				this.detailCt.setWidth(200);
			}
			if (bh > h) {
				this.detailViewer.setStyle('height', '');
			} else if (th > h) {
				vpos = 'b';
				tEl = cEl;
				offset[1] = -4;
				this.detailViewer.setStyle('height', '');
			} else {
				if (th > bh) {
					vpos = 'b';
					mh = th;
					tEl = cEl;
					offset[1] = -4;
				}
				this.detailViewer.setHeight(mh);
			}
			if (roffset < this.detailCt.getWidth()) {
				hpos = 'r';
				offset[0] = -1;
			} else {
				hpos = 'l';
			}
			var str = vpos + hpos;
			this.detailCt.alignTo(tEl, str + '-' + str, offset);
		}
	},

	showDetails : function(day) {
		var lan = Ext.ux.calendar.Mask.MonthView;
		var eh = this.ehandler;
		var glayout = eh.calendarLayout;
		var layout = glayout.getLayout(day, this);
		var rs = layout.reLayout(true);
		var events = rs.wlist.concat(rs.elist);
		var index = this.getIndexFromDay(day);
		var x = Math.floor(index / this.dayNum);
		var y = index % this.dayNum;
		this.detailing = {
			x : x,
			y : y,
			events : events
		};

		this.detailTitle.dom.innerHTML = '<u id="' + Ext.id()
				+ '-x-monthview-viewer-link-' + x + '-' + y
				+ '" class="x-monthview-viewer-link">' + day + '</u>';
		this.detailFoot.dom.innerHTML = events.length + ' ' + lan['events'];
		eh.bindEvent2Detail(this, events, this.detailViewer);

		this.alignDetailCt();
	},

	_onPortMouseDownFn : function(e) {		
		e.stopEvent();
		this.fireEvent('hideeditor');
		var target = e.getTarget();
		var tgEl = Ext.get(target);
		if (Ext.ux.calendar.Mask.includeIsClass(target.className,
				'x-event-more')) {
			var day = tgEl.dom.getAttribute('name');
			this.showDetails(day);
		} else {
			if (this.detailing) {
				if (!(Ext.ux.calendar.Mask.includeIsClass(target.className,
						'x-event-detail-ct') || tgEl.parent('.x-event-detail-ct'))) {
					this.fireEvent('canceldetail');
				} else {
					return;
				}
			}
			if (!this.createByDblclick && !this.ehandler.readOnly) {
				if (!Ext.ux.calendar.Mask.includeIsClass(target.className, 'x-monthview-tool-drop') && !tgEl.hasCls('x-monthview-viewer-link')
						&& !tgEl.parent('.x-monthview-viewer-link')) {
					var eEl;
					if (Ext.ux.calendar.Mask.includeIsClass(target.className,
							'x-calendar-event')) {
						eEl = tgEl;
					} else {
						eEl = tgEl.parent('.x-calendar-event');
					}
					if (!eEl) {
						var pos = this.calculatePos(e);
						if (0 <= pos.x && 0 <= pos.y) {
							this.selectRange(pos, pos);
						}
					}
				}
			}
		}
	},

	_onPortMouseMoveFn : function(e) {
		if (0 == e.button) {
			if (this.startPos) {
				var pos = this.calculatePos(e);
				if (0 <= pos.x && 0 <= pos.y) {
					this.selectRange(null, pos);
				}
			}
		} else {
			this.resetSCover();
		}
	},

	initEls : function() {
		this.lefter = Ext.get(this.id + '-x-monthview-lefter');
		this.viewer = Ext.get(this.id + '-x-monthview-viewer');
		this.port = Ext.get(this.id + '-x-monthview-port');
		this.cheader = Ext.get(this.id + '-x-monthview-header');

		this.lefter.un('click', this._onLefterClickFn, this);
		this.lefter.on('click', this._onLefterClickFn, this);
		this.port.un('click', this._onPortClickFn, this);
		this.port.on('click', this._onPortClickFn, this);
		this.port.un('mousedown', this._onPortMouseDownFn, this);
		this.port.on('mousedown', this._onPortMouseDownFn, this);
		if (!this.ehandler.readOnly) {
			this.port.un('mousemove', this._onPortMouseMoveFn, this);
			this.port.un('mouseover', this._onPortMouseOverFn, this);
			this.port.un('contextmenu', this._onPortContextMenuFn, this);
			this.port.un('dblclick', this._onPortDblclickFn, this);

			this.port.on('mousemove', this._onPortMouseMoveFn, this);
			this.port.on('contextmenu', this._onPortContextMenuFn, this);
			this.port.on('mouseover', this._onPortMouseOverFn, this);
			this.port.on('dblclick', this._onPortDblclickFn, this);
			this.initDragZone(this.port);
		}
		this.initDetailCt();
		this.initSelectCover();
		this.setToday();
	},

	_onLefterClickFn : function(e) {
		e.stopEvent();
		var target = e.getTarget();
		var tgEl = Ext.get(target);
		var uxhasClass = Ext.ux.calendar.Mask.includeIsClass;
		if (uxhasClass(target.className, 'x-monthview-lefter-inner-b')) {
			var pos = this.getCellIndex(tgEl.dom.id);
			var x = pos.x;
			var sdate = this.daySet[x * this.shiftDay];
			var edate = this.daySet[(x + 1) * this.shiftDay - 1];
			this.fireEvent('viewWeek', sdate, edate);
		}
	},

	_onPortDblclickFn : function(e) {
		e.stopEvent();
		var eh = this.ehandler;
		var target = e.getTarget();
		var tgEl = Ext.get(target);
		var uxhasClass = Ext.ux.calendar.Mask.includeIsClass;
		if (!uxhasClass(target.className, 'x-calendar-event')) {
			tgEl = tgEl.parent('.x-calendar-event');
		}
		if (tgEl) {
			if (tgEl && eh.isEditable(tgEl.bindEvent)) {
				eh.showEditor(tgEl, this, 'update');
			}
		} else if (this.createByDblclick) {
			var pos = this.calculatePos(e);
			this.addLegend(pos);
		}
	},

	_onPortContextMenuFn : function(e) {
		e.stopEvent();
		var target = e.getTarget();
		var tgEl = Ext.get(target);
		var cEl;
		var uxhasClass = Ext.ux.calendar.Mask.includeIsClass;
		if (uxhasClass(target.className, 'x-calendar-event')) {
			cEl = tgEl;
		} else {
			cEl = tgEl.parent('.x-calendar-event');
		}
		if (cEl) {
			var eh = this.ehandler;
			eh.showContextMenu(e, cEl);
		}
	},

	_onPortMouseOverFn : function(e) {
		if (this.detailing) {
			return;
		}
		var target = e.getTarget();
		var tgEl = Ext.get(target);
		if (this.overEl) {
			this.overEl.removeCls('x-tool-btn-over');
			delete(this.overEl);
		}
		if (Ext.ux.calendar.Mask.includeIsClass(target.className,
				'x-monthview-tool-drop')
				|| Ext.ux.calendar.Mask.includeIsClass(target.className,
						'x-monthview-tool-add')) {
			tgEl.addCls('x-tool-btn-over');
			this.overEl = tgEl;
		}
	},

	addLegend : function(pos) {
		var eh = this.ehandler;
		var epos = Ext.apply({}, pos);
		this.selectRange(pos, epos);
		this.startPos = null;
		eh.prepareLegend(Ext.get(this.id + '-x-monthview-viewer-title-' + pos.x
						+ '-' + pos.y), pos, epos, this);
	},

	_onPortClickFn : function(e) {
		
		var eh = this.ehandler;
		var target = e.getTarget();
		var tgEl = Ext.get(target);
		var titleEl;
		
		if (Ext.ux.calendar.Mask.includeIsClass(target.className,
				'x-event-detail-tool-close')) {
			this.fireEvent('canceldetail');
		} else if (Ext.ux.calendar.Mask.includeIsClass(target.className,
				'x-monthview-viewer-link')) {
			var pos = this.getCellIndex(tgEl.dom.parentNode.id);
			var day = this.daySet[pos.x * this.dayNum + pos.y];
			this.fireEvent('viewDay', this, day);
		} else if (!eh.readOnly) {
			if (Ext.ux.calendar.Mask.includeIsClass(target.className,
					'x-monthview-tool-add')) {
				this.addLegend(this.getCellIndex(tgEl.dom.id));
			} else if (Ext.ux.calendar.Mask.includeIsClass(target.className,
					'x-monthview-tool-drop')) {
				this.showMenu(tgEl);
			} else {
				if (Ext.ux.calendar.Mask.includeIsClass(target.className,
						'x-whole-title-b')) {
					titleEl = tgEl;
				} else {
					titleEl = tgEl.parent('.x-whole-title-b');
				}
				if (titleEl) {
					var wEl = titleEl.parent('.x-whole-cover');
					if (wEl && eh.isEditable(wEl.bindEvent)) {
						eh.showEditor(wEl, this, 'update');
					}
				} else {
					if (Ext.ux.calendar.Mask.includeIsClass(target.className,
							'x-legend-title-b')) {
						titleEl = tgEl;
					} else {
						titleEl = tgEl.parent('.x-legend-title-b');
					}
					if (titleEl) {
						var lEl = titleEl.parent('.x-legend-cover');
						if (lEl && eh.isEditable(lEl.bindEvent)) {
							eh.showEditor(lEl, this, 'update');
						}
					}
				}
			}
		}
	},

	initDetailCt : function() {
		var eh = this.ehandler;
		var html = eh.detailTpl.apply({});
		this.detailCt = Ext.core.DomHelper.append(this.port, html, true);
		this.detailCt.setStyle('display', 'none');
		this.detailTitle = this.detailCt.down('.x-event-detail-title-td');
		this.detailViewer = this.detailCt.down('.x-event-detail-viewer');
		this.detailFoot = this.detailCt.down('.x-event-detail-foot-text');
	},

	initSelectCover : function() {
		this.scovers = [];
		for (var i = 0, len = this.templateRowNum; i < len; i++) {
			var div = document.createElement('div');
			div.className = 'x-event-select-cover';
			div = Ext.get(div);
			var row = Ext.get(this.port.dom.childNodes[i]);
			row.appendChild(div);
			this.scovers[this.scovers.length] = div;
		}
	},

	initDragZone : function(bindEl) {
		var eh = this.ehandler;
		var proxy = new Ext.dd.StatusProxy({
					dropNotAllowed : 'x-dd-drop-ok'
				});
		bindEl.dragzone = new Ext.dd.DragZone(bindEl, {
			scroll : false,
			ddGroup : 'x-mycalendar',
			proxy : proxy,
			cview : this,
			onStartDrag : function() {
				this.cview.dragging = true;
				Ext.defer((function() {
							var event = this.dragData.bindEvent;
							var arr = Ext.core.DomQuery.select(
									'div[name=x-event-' + event.day + '-'
											+ event.eday + '-' + event.eventId
											+ ']', this.cview.getEl().dom);
							for (var i = 0, len = arr.length; i < len; i++) {
								var eEl = Ext.get(arr[i]);
								eEl.setOpacity(0.3);
							}
						}), 1, this);
			},
			getDragData : function(e) {
				var target = e.getTarget();
				var tgEl = Ext.get(target);
				if (!Ext.ux.calendar.Mask.includeIsClass(target.className,
						'x-calendar-event')) {
					tgEl = tgEl.parent('.x-calendar-event')
				}
				if (tgEl) {
					var event = tgEl.bindEvent;
					if (eh.isEditable(event)) {
						var ddel = tgEl.dom.cloneNode(true);
						var w = tgEl.getWidth();
						if (200 < w) {
							ddel.style.width = '200px';
						} else {
							ddel.style.width = w + 'px';
						}
						return {
							ddel : ddel,
							bindEvent : event
						};
					}
				}
				return false;
			},
			getRepairXY : function(e, data) {
				return null;
			},
			onDrag : function(e) {
				var event = this.dragData.bindEvent;
				var cview = this.cview;
				var eh = cview.ehandler;
				var span = Ext.ux.calendar.Mask.getDayOffset(event.day,
						event.eday);
				var pos = cview.calculatePos(e);
				var epos = cview.addSpan2Pos(pos, span);
				cview.selectRange(pos, epos);
			},
			endDrag : function(e) {
				var cview = this.cview;
				var event = this.dragData.bindEvent;
				var oldevent = Ext.apply({}, event);
				var oevent;
				if (event.day == event.eday
						&& (0 != event.startRow || cview.rowCount != event.endRow)) {
					oevent = Ext.apply({}, event);
				}
				var spos = cview.startPos;
				var eh = cview.ehandler;
				var dnum = Ext.ux.calendar.Mask.getDayOffset(event.day,
						event.eday);
				/*
				 * need relayout for weekend too, or will have exception
				 */
				if (cview.colNum != cview.shiftDay && 1 != eh.startDay) {
					spos.y++;
				}
				var index = spos.x * cview.shiftDay + spos.y;
				var date = cview.daySet[index];
				var day = Ext.Date.format(date, 'Y-m-d');
				if (event.day != day) {
					event.eday = Ext.Date.format(Ext.Date.add(date,
									Ext.Date.DAY, dnum), 'Y-m-d');
					event.day = day;
					if ('string' == Ext.ux.calendar.Mask.typeOf(event.repeatType)) {
						eh.updateEvent(event, cview, null, oevent);
					} else {
						event.repeatType = 'exception';
						eh.updateRepeatEvent(event, cview, oldevent);
					}
				} else {
					var arr = Ext.core.DomQuery.select('div[name=x-event-'
									+ event.day + '-' + event.eday + '-'
									+ event.eventId + ']',
							this.cview.getEl().dom);
					for (var i = 0, len = arr.length; i < len; i++) {
						var eEl = Ext.get(arr[i]);
						eEl.setOpacity(1);
					}
				}
				cview.dragging = false;
				cview.resetSCover();
				cview.fireEvent('canceldetail');
			}
		});
	},

	addSpan2Pos : function(pos, span) {
		var o = Ext.apply({}, pos);
		o.y += span;
		var x = Math.floor(o.y / this.dayNum);
		o.y = o.y % this.shiftDay;
		o.x += x;
		if (o.x >= this.weekNum) {
			o.x = this.weekNum - 1;
			o.y = this.colNum - 1;
		}
		if (o.y >= this.colNum) {
			o.y = this.colNum - 1;
		}
		return o;
	},

	viewWeekend : function(display) {
		var css = this.id + '-x-monthview-viewer-col-6';
		var els = Ext.core.DomQuery.jsSelect('td[class*=' + css + ']',
				this.viewer.dom);
		for (var i = 0, len = els.length; i < len; i++) {
			Ext.get(els[i]).setStyle('display', display);
		}
		css = this.id + '-x-monthview-viewer-col-'
				+ (1 == this.startDay ? '5' : '0');
		els = Ext.core.DomQuery.jsSelect('td[class*=' + css + ']',
				this.viewer.dom);
		for (var i = 0, len = els.length; i < len; i++) {
			Ext.get(els[i]).setStyle('display', display);
		}
	},

	recalculateSize : function(bw, bh) {
		if (typeof bw == 'number') {
			this.cheader.setWidth(bw);
			bw -= this.leftWidth;
			this.port.setWidth(bw);
			if (7 == this.colNum) {
				this.viewWeekend('');
			} else if (5 == this.colNum) {
				this.viewWeekend('none');
			}
			this.cw = bw / this.colNum;
		}
		if (typeof bh == 'number') {
			var ah = bh - this.cheader.getHeight();
			this.ch = ah / this.rowNum;
			var th = Ext.get(this.id + '-x-monthview-viewer-title-0-1')
					.getHeight();
			this.lineNum = Math.floor((this.ch - th) / this.legendHeight);

			var lefter = Ext.get(this.id + '-x-monthview-lefter').dom;
			// var port = Ext.get(this.id+'-x-monthview-port');
			for (var i = 0, len = lefter.childNodes.length; i < len; i++) {
				Ext.get(lefter.childNodes[i]).setHeight(Math.ceil(this.ch));
			}

			for (var i = 0; i < 6; i++) {
				var el = Ext.get(this.id + '-x-monthview-row-' + i);
				if (el) {
					el.setHeight(Math.ceil(this.ch));
				}
			}
			// Ext.util.CSS.updateRule('.'+this.id+'-x-monthview-row', 'height',
			// Math.ceil(this.ch)+'px');
		}
	},

	handleResize : function(bw, bh) {
		var oldLineNum = this.lineNum;
		this.recalculateSize(bw, bh);
		if (oldLineNum != this.lineNum) {
			this.showCache();
		}
		this.alignDetailCt();
		this.fireEvent('afterresize', this, bw, bh);
	},

	checkCSHide : function(cs) {
		var eh = this.ehandler;
		var ecs = eh.calendarSet;
		var flag = false;
		for (var p in ecs) {
			var ec = ecs[p];
			var c = cs[p];
			if (ec && c) {
				if (false === ec.hide && false !== c.hide) {
					flag = true;
					break;
				}
			}
		}
		return flag;
	},

	showCache : function(startDate, endDate, force, refresh) {
		var eh = this.ehandler;
		startDate = startDate || this.daySet[0];
		endDate = endDate || this.daySet[this.daySet.length - 1];
		if (eh.isInDayCache(startDate, endDate) && !refresh) {
			var glayout = eh.calendarLayout;
			for (var i = 0, len = this.weekNum; i < len; i++) {
				var eventSet = {};
				for (var j = 0, count = this.dayNum; j < count; j++) {
					var index = i * this.dayNum + j;
					var day = Ext.Date.format(this.daySet[index], 'Y-m-d');
					var layout = glayout.getLayout(day, this);
					var rs = layout.reLayout();
					eventSet[day] = rs.wlist.concat(rs.elist);
				}
				var tbody = Ext.get(this.id + '-x-monthview-ct-' + i).dom.firstChild;
				glayout.showWeek(this, tbody, i, eventSet, true);
			}
			return true;
		}
		return false;
	},

	checkLayout : function(force, refresh) {
		var eh = this.ehandler;
		var startDate = this.daySet[0];
		var endDate = this.daySet[this.daySet.length - 1];
		if (!this.showCache(startDate, endDate, force, refresh)) {
			this.fireEvent('beforeremoteload');
			eh.ds.loadEvent(startDate, endDate, function(eventSet) {
						this.showEvents(eventSet, refresh);
						eh.pushDayCache(startDate, endDate);
						if (eh.firstTime) {
							eh.firstTime = false;
							eh.checkExpireEvents();
						}
						this.fireEvent('remoteload');
					}, this);
		}
		this.setToday();
	},

	showEvents : function(eventSet, refresh) {
		var eh = this.ehandler;
		var glayout = eh.calendarLayout;
		glayout.updateWholeList(eventSet['whole'], 'add');
		for (var i = 0; i < this.weekNum; i++) {
			var tbody = Ext.get(this.id + '-x-monthview-ct-' + i).dom.firstChild;
			glayout.showWeek(this, tbody, i, eventSet);
		}
	},

	onAddFn : function(item) {
		var menu = item.parentMenu;
		var pos = this.getCellIndex(menu.bindEl.dom.id);
		this.addLegend(pos);
	},

	onClearFn : function(item) {
		var menu = item.parentMenu;
		var pos = this.getCellIndex(menu.bindEl.dom.id);
		this.clearLegend(pos);
	},

	setCutStatus : function(pos) {
		var x = pos.x, y = pos.y;
		var cEl = Ext.get(this.id + '-x-monthview-viewer-' + x + '-' + y);
		if (cEl) {
			cEl.addCls('x-monthview-cell-cut');
		}
		var tEl = Ext.get(this.id + '-x-monthview-viewer-title-' + x + '-' + y);
		if (tEl) {
			tEl.addCls('x-monthview-cell-cut');
		}
		var eh = this.ehandler;
		eh.commentTip.showTip('Notice','Cross-day event and repeat event can not be cut/copied!', tEl,'bl-tl?');
	},

	resetCutStatus : function(pos) {
		var x = pos.x, y = pos.y;
		var cEl = Ext.get(this.id + '-x-monthview-viewer-' + x + '-' + y);
		if (cEl) {
			cEl.removeCls('x-monthview-cell-cut');
		}
		var tEl = Ext.get(this.id + '-x-monthview-viewer-title-' + x + '-' + y);
		if (tEl) {
			tEl.removeCls('x-monthview-cell-cut');
		}
	},

	onCutFn : function(item) {
		var menu = item.parentMenu;
		var pos = this.getCellIndex(menu.bindEl.dom.id);
		var x = pos.x, y = pos.y;
		var index = x * this.dayNum + y;
		var day = Ext.Date.format(this.daySet[index], 'Y-m-d');
		if (this.cpFlag) {
			this.resetCutStatus(this.cpFlag.pos);
		}
		this.setCutStatus(pos);
		this.cpFlag = {
			day : day,
			keep : false,
			pos : pos
		};
	},

	onCopyFn : function(item) {
		var menu = item.parentMenu;
		var pos = this.getCellIndex(menu.bindEl.dom.id);
		var index = pos.x * this.dayNum + pos.y;
		var day = Ext.Date.format(this.daySet[index], 'Y-m-d');
		if (this.cpFlag) {
			this.resetCutStatus(this.cpFlag.pos);
		}
		this.setCutStatus(pos);
		this.cpFlag = {
			day : day,
			keep : true,
			pos : pos
		};
	},

	onPasteFn : function(item) {
		if (this.cpFlag) {
			var keep = this.cpFlag.keep;
			var menu = item.parentMenu;
			var pos = this.getCellIndex(menu.bindEl.dom.id);
			var index = pos.x * this.dayNum + pos.y;
			var tday = Ext.Date.format(this.daySet[index],'Y-m-d');
			var eh = this.ehandler;
			var oday = this.cpFlag.day;
			eh.ds.changeDay(oday, tday, function(backObj) {
						var gLayout = eh.calendarLayout;
						/*
						 * delete oday wlist
						 */
						var wlist = gLayout.deleteDayFromWholeList(oday, oday,
								keep);
						var olayout = gLayout.getLayout(oday, this);
						/*
						 * get oday elist
						 */
						var olist = [], elist = olayout.reLayout(null, true).elist;
						var orlist = [];
						for (var i = 0, len = elist.length; i < len; i++) {
							var e = elist[i];
							if ('string' == Ext.ux.calendar.Mask.typeOf(e.repeatType)) {
								olist.push(Ext.apply({}, e));
							} else {
								orlist.push(Ext.apply({}, e));
							}
						}
						/*
						 * if it's copy, backend will return new id, here need
						 * replace the old id with new ones
						 */
						if (backObj && backObj.backids) {
							var bids = backObj.backids;
							for (var i = 0, len = wlist.length; i < len; i++) {
								var w = wlist[i];
								if (bids[w.eventId]) {
									w.eventId = bids[w.eventId];
								}
							}
							for (var i = 0, len = olist.length; i < len; i++) {
								var e = olist[i];
								if (bids[e.eventId]) {
									e.eventId = bids[e.eventId];
								}
							}
						}
						/*
						 * here need change the day and eday to the tday
						 */
						for (var i = 0, len = wlist.length; i < len; i++) {
							var w = wlist[i];
							w.day = tday;
							w.eday = tday;
						}
						/*
						 * add new wlist to glayout
						 */
						gLayout.updateWholeList(wlist, 'add');
						for (var i = 0, len = olist.length; i < len; i++) {
							var e = olist[i];
							e.day = tday;
							e.eday = tday;
						}
						var tlayout = gLayout.getLayout(tday, this);
						elist = tlayout.reLayout(null, true).elist;
						elist = gLayout.combine2List(elist, olist);
						/*
						 * relayout the target layout
						 */
						tlayout.layouted = false;
						tlayout.generateLayout(elist, true, null, true);
						if (!keep) {
							/*
							 * if it's cut, then need remove the elist in old
							 * layout
							 */
							olayout.layouted = false;
							olayout.generateLayout(orlist, true, null, true);
						}
						/*
						 * re-render the monthview
						 */
						this.checkLayout();
						eh.fireEvent('changeEventCache', eh);
					}, this, keep);
			if (!keep) {
				this.resetCutStatus(this.cpFlag.pos);
				delete(this.cpFlag);
			}
		}
	},

	clearLegend : function(pos) {
		var eh = this.ehandler;
		var cs = eh.calendarSet;
		var gLayout = eh.calendarLayout;
		var index = pos.x * this.dayNum + pos.y;
		var day = Ext.Date.format(this.daySet[index], 'Y-m-d');
		eh.ds.deleteDay(day, function() {
					gLayout.deleteDayFromWholeList(day);
					var layout = gLayout.getLayout(day, this);
					if (layout) {
						layout.layouted = false;
						layout.updateRepeat = true;
						layout.generateLayout([], true, null, true);
					}
					this.checkLayout(true);
					eh.fireEvent('changeEventCache', eh);
				}, this);
	},

	resizePort : Ext.emptyFn,

	refreshDate : function() {
		var week = Ext.Date.getWeekOfYear(this.daySet[0]);
		for (var i = 0; i < this.weekNum; i++) {
			for (var j = 0; j < this.dayNum; j++) {
				var titleEl = Ext.get(this.id + '-x-monthview-viewer-link-' + i
						+ '-' + j);
				if (titleEl) {
					var day = Ext.Date.format(this.daySet[i * this.dayNum + j],
							this.dayFormat);
					titleEl.dom.innerHTML = day;
				}
			}
			var weekEl = Ext.get(this.id + '-x-monthview-week-' + i + '-0');
			if (weekEl) {
				var w = (week + i) % 53;
				if (0 == w) {
					w = 53;
				}
				weekEl.dom.innerHTML = w;
			}
		}
	},

	resetView : function(callback, scope, params) {
		this.refreshDate();
		this.setToday();
	},
	cleanup : function(w) {
		var selfId = this.id;
		var fn = function(w) {
			var El = Ext.get(selfId + '-x-monthview-ct-' + w);
			if (El) {
				var tbody = El.dom.firstChild;
				var arr = [];
				for (var i = 1, len = tbody.childNodes.length; i < len; i++) {
					arr.push(tbody.childNodes[i]);
				}
				for (var i = 0, len = arr.length; i < len; i++) {
					Ext.removeNode(arr[i])
				}
			}
		}
		if (w == undefined || false == Ext.ux.calendar.Mask.typeOf(w)) {
			for (var i = 0; i < this.templateRowNum; i++) {
				fn([i])
				// Ext.defer(fn, 1,this,[([i])]);
				// Ext.bind(fn, this,[([i])]);
			}
		} else {
			fn(w)
			// Ext.defer(fn, 1,this, [w]);
			// Ext.bind(fn, this,[w]);
		}
	},
	locateDay : function(day) {
		var fd = Ext.Date.getFirstDateOfMonth(day);
		this.recalculateWeek(fd);
		this.recalculateSize(this.getEl().getWidth(), this.getEl().getHeight());
		fd = this.getStartDate(fd);
		this.daySet = [];
		for (var i = 0; i < this.weekNum; i++) {
			for (var j = 0; j < this.dayNum; j++) {
				var offset = i * this.shiftDay + j;
				this.daySet[this.daySet.length] = Ext.Date.add(fd,
						Ext.Date.DAY, offset);
			}
		}
	},

	showDay : function(day) {
		this.locateDay(day);
		this.resetView();
		this.checkLayout(true);
	},

	recalculateWeek : function(fdate) {
		if (1 == this.startDay) {
			var n = Ext.Date.format(fdate, 'N');
			if (7 == n && 30 <= Ext.Date.getDaysInMonth(fdate)) {
				this.rowNum = 6;
			} else if (6 == n && 31 == Ext.Date.getDaysInMonth(fdate)) {
				this.rowNum = 6;
			} else if (1 == n && 28 == Ext.Date.getDaysInMonth(fdate)) {
				this.rowNum = 4;
			} else {
				this.rowNum = 5;
			}
		} else {
			var w = Ext.Date.format(fdate, 'w');
			if (6 == w && 30 <= Ext.Date.getDaysInMonth(fdate)) {
				this.rowNum = 6;
			} else if (5 == w && 31 == Ext.Date.getDaysInMonth(fdate)) {
				this.rowNum = 6;
			} else if (0 == n && 28 == Ext.Date.getDaysInMonth(fdate)) {
				this.rowNum = 4;
			} else {
				this.rowNum = 5;
			}
		}
		this.weekNum = this.rowNum;
	},

	goBack : function() {
		var shiftDay = this.shiftDay || this.dayNum;
		var dayNum = this.dayNum;
		var sdate = this.daySet[0];

		var fdate = Ext.Date.getFirstDateOfMonth(sdate);
		if (Ext.Date.format(sdate, 'Y-m-d') == Ext.Date.format(fdate, 'Y-m-d')) {
			fdate = Ext.Date.add(fdate, Ext.Date.DAY, -1);
			fdate = Ext.Date.getFirstDateOfMonth(fdate);
		}
		this.recalculateWeek(fdate);
		fdate = this.getStartDate(fdate);
		var weekNum = this.weekNum;
		this.daySet = [];
		for (var i = 0; i < weekNum; i++) {
			for (var j = 0; j < dayNum; j++) {
				this.daySet[this.daySet.length] = Ext.Date.add(fdate,
						Ext.Date.DAY, i * shiftDay + j);
			}
		}
		this.resetView();
		this.recalculateSize(this.getEl().getWidth(), this.getEl().getHeight());
		this.checkLayout(true);
	},

	goNext : function() {
		var shiftDay = this.shiftDay || this.dayNum;
		var dayNum = this.dayNum;

		var edate = this.daySet[this.daySet.length - 1];
		var fdate = Ext.Date.getLastDateOfMonth(edate);
		if (Ext.Date.format(edate, 'Y-m-d') == Ext.Date.format(fdate, 'Y-m-d')) {
			fdate = Ext.Date.add(fdate, Ext.Date.DAY, 1);
		} else {
			fdate = Ext.Date.getFirstDateOfMonth(edate);
		}
		this.recalculateWeek(fdate);
		fdate = this.getStartDate(fdate);

		this.daySet = [];
		var weekNum = this.weekNum;
		for (var i = 0; i < weekNum; i++) {
			for (var j = 0; j < dayNum; j++) {
				this.daySet[this.daySet.length] = Ext.Date.add(fdate,
						Ext.Date.DAY, i * shiftDay + j);
			}
		}
		this.resetView();
		this.recalculateSize(this.getEl().getWidth(), this.getEl().getHeight());
		this.checkLayout(true);
	},

	isShift : function(startDate, endDate) {
		var maxmin, minmax;
		var day1 = Ext.Date.format(startDate, 'Y-m-d');
		var day2 = Ext.Date.format(this.daySet[0], 'Y-m-d');
		if (day1 < day2) {
			maxmin = day2;
		} else {
			maxmin = day1;
		}
		day1 = Ext.Date.format(endDate, 'Y-m-d');
		day2 = Ext.Date.format(this.daySet[this.daySet.length - 1], 'Y-m-d');
		if (day1 > day2) {
			minmax = day2;
		} else {
			minmax = day1;
		}
		if (maxmin > minmax) {
			var sdate = Ext.Date.getFirstDateOfMonth(startDate);
			this.recalculateWeek(sdate);
			sdate = this.getStartDate(sdate);
			this.daySet = [];
			for (var i = 0; i < this.weekNum; i++) {
				for (var j = 0; j < this.dayNum; j++) {
					this.daySet[this.daySet.length] = Ext.Date.add(sdate,
							Ext.Date.DAY, i * this.shiftDay + j);
				}
			}
			return true;
		} else {
			return false;
		}
	},

	showRange : function(startDate, endDate) {
		var force = false;
		if (this.isShift(startDate, endDate)) {
			this.resetView();
			force = true;
		}
		this.recalculateSize(this.getEl().getWidth(), this.getEl().getHeight());
		this.checkLayout(force);
	}
});