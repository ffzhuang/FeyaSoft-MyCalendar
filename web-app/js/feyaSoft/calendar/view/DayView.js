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

Ext.ux.calendar.view.DayView = Ext.extend(Ext.ux.calendar.view.BasicView, {
    
	bodyStyle : 'background:none;',
	
    createByDblclick:false,

    hideInactiveRow:false,
    
    activeStartRow:0,

    activeEndRow:48,
    
    startRow:0,

    endRow:48,

    cls:'x-dayview-ct',

    lineNum:3,

	border:false,		

    weekNum:1,    

	dayNum:1,
	
	dayFormat:'m/d(D)',

    thin:4,

    leftWidth:70,

	scrollOffset:17,

	offsetPercent:0.1,

	headerHeight:30,

	rowHeight:26,

    poolMaxDepth:4,

    poolDepth:0,	  

    updateTimeline:function(){
    	var vDate=Ext.Date;
        var now = new Date();        
        var day =  vDate.format(now,'Y-m-d');
        for(var j = 0, len = this.daySet.length; j < len; j++){
            if(day ==  vDate.format(this.daySet[j],'Y-m-d')){
                break;
            }
        }
        if(this.timelinePn && this.timeindexPn){
            this.timeindexPn.removeCls('x-dayview-timeindex');
            this.timelinePn.removeCls('x-dayview-timeline');
        }
        if(j != len){
            var col = j%this.dayNum;
            var h = parseInt(vDate.format(now,'G'));
            var s = vDate.format(now,'i');            
            if('0' == s[0]){
                s = s.slice(1);                
            }
            var i = parseInt(s);
            var intervalSlot = this.intervalSlot;
            var numInHour = this.numInHour;
            var startRow = h*numInHour+Math.floor(i/intervalSlot);
            var r = i%intervalSlot;
            var pn = Ext.get(this.id+'-x-dayview-viewer-'+startRow+'-'+col);
            var lefter = Ext.get(this.id+'-x-dayview-lefter-'+startRow+'-0');
            if(pn && lefter){                
                var p = Math.floor(r/intervalSlot*100);
                pn.addCls('x-dayview-timeline');
                pn.setStyle('background-position', '0% '+p+'%');                
                lefter.addCls('x-dayview-timeindex');
                lefter.setStyle('background-position', '0% '+p+'%');
                this.timelinePn = pn;
                this.timeindexPn = lefter;
            }
        }
    },

	generateHTML:function(data){        		
		var lefter = '';
        var hnum = this.numInHour;
		for(var i = this.startRow; i < this.endRow; i++){
			lefter += '<tr id="'+this.id+'-x-dayview-lefter-row-'+i+'">';
			for(var j = 0; j < 1; j++){
                var hour = Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, i, this.hourFormat);
                var rest = i%hnum;
                if(0 != rest && i != this.activeStartRow){
                    hour = '<div class="x-dayview-viewer-row-height" style="text-align:right;">' +
                        '<i><b class="x-dayview-lefter-inner x-dayview-lefter-fine-inner">'+hour+'</b></i>' +
                    '</div>';
                }else{
                    hour = '<div class="x-dayview-viewer-row-height">' +
                        '<b class="x-dayview-lefter-inner">'+hour+'</b>' +
                    '</div>';
                }
				lefter += '<td id="'+this.id+'-x-dayview-lefter-'+i+'-'+j+'" ' +
					'class="'+this.id+'-x-dayview-lefter-td x-dayview-lefter-row-height x-dayview-lefter-cell ' +
                    ((0 != (i+1)%hnum)?'x-dayview-lefter-odd-row':'x-dayview-lefter-even-row')+'">' +
					hour +
				'</td>';
			}
			lefter += '</tr>';
		}
		var viewer = '';
		for(var i = this.startRow; i < this.endRow; i++){
			viewer += '<tr id="'+this.id+'-x-dayview-viewer-row-'+i+'">';
			for(var j = 0; j < this.dayNum; j++){
				viewer += '<td class="'+this.id+'-x-dayview-viewer-td '+this.id+'-x-dayview-viewer-col-'+j+' ' +
					((0 != (i+1)%hnum)?'x-dayview-odd-row':'x-dayview-even-row')+'">' +
					'<div id="'+this.id+'-x-dayview-viewer-'+i+'-'+j+'" class="x-dayview-viewer-row-height x-dayview-viewer-cell">' +                        
                    '</div>' +
				'</td>';
			}
			viewer += '</tr>';
		}
		var port = '<div id="'+this.id+'-x-dayview-port" class="x-dayview-port x-dayview-inactive" unselectable="on" onselectstart="return false;">' +
			'<div id="'+this.id+'-x-dayview-body" class="x-dayview-body x-dayview-inactive" unselectable="on" onselectstart="return false;">' +
				'<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>' +
					'<tr>' +
						'<td name="'+this.id+'-x-dayview-lefter-width" class="x-dayview-lefter">' +
							'<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>' +
								lefter +
							'</tbody></table>' +
						'</td>' +
						'<td class="x-dayview-viewer">' +                            
                            '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>' +
                                viewer +
                            '</tbody></table>' +
						'</td>' +
					'</tr>' +
				'</tbody></table>' +
			'</div>' +            
		'</div>';

		var days = '';
		this.dayTpl = new Ext.XTemplate(
			'<tpl for=".">' +
				'<td class="x-dayview-header-days">' +
                    '<div><b><u id="'+this.id+'-x-dayview-day-link-0-{idx}" class="x-dayview-header-day-link">{day}</u></b></div>' +
                '</td>' +
			'</tpl>'
		);
		var d = [];
		
		for(var j = 0; j < this.dayNum; j++){
			d.push({
                idx:j,
				day: Ext.Date.format(this.daySet[j],this.dayFormat)
			});
		}
		days = this.dayTpl.apply(d);
		var wdate = this.daySet[0];               
        var n = Ext.Date.format(wdate, 'N');
		if(7 == n){
			wdate = Ext.Date.add(wdate, Ext.Date.DAY, 1);
		}
		var week =  Ext.Date.getWeekOfYear(wdate);
        if(1 == this.dayNum){
            week = '<u><b id="'+this.id+'-x-dayview-wn" class="x-dayview-wn-link">'+week+'</b></u>';
        }else{
            week = '<b id="'+this.id+'-x-dayview-wn">'+week+'</b>';
        }
		var header = '<div id="'+this.id+'-x-dayview-header" class="x-dayview-header" unselectable="on" onselectstart="return false;">' +
			'<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>' +
				'<tr>' +
					'<td name="'+this.id+'-x-dayview-lefter-width" class="x-dayview-header-lefter">' +
						'<div class="x-dayview-wn">'+week+'</div>' +
					'</td>' +
					'<td class="x-dayview-header-viewer">' +
						'<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody>' +
							'<tr>'+days+'</tr>' +
						'</tbody></table>' +
					'</td>' +
					'<td width="'+this.scrollOffset+'px;">' +
					'</td>' +
				'</tr>' +
			'</tbody></table>' +
		'</div>';

        var bg = '';
        for(var i = 0; i < this.dayNum; i++){
            bg += '<td id="'+this.id+'-x-dayview-bg-0-'+i+'" class="x-dayview-bg-cell">&nbsp;</td>';
        }        
        bg = '<table class="x-dayview-bg" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody>' +
            '<tr>'+bg+'</tr>' +
        '</tbody></table>';
		var pool = '<div id="'+this.id+'-x-dayview-pool" class="x-dayview-pool" unselectable="on" onselectstart="return false;">' +
			'<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>' +
				'<tr>' +
					'<td name="'+this.id+'-x-dayview-lefter-width" class="x-dayview-header-lefter" style="vertical-align:top;">' +
						'<div id="'+this.id+'-x-dayview-pool-switch" class="x-dayview-pool-collapse"></div>' +
					'</td>' +
					'<td>' +
                        '<div id="'+this.id+'-x-dayview-pool-viewer" class="x-dayview-pool-viewer">' +
                            bg +
                            '<table id="'+this.id+'-x-dayview-pool-ct" width="100%" class="x-dayview-ct" cellspacing="0" cellpadding="0" border="0"><tbody>' +
                                '<tr></tr>' +
                            '</tbody></table>' +
                            '<div class="x-dayview-pool-rest"></div>' +
                        '</div>' +                        
					'</td>' +
                    '<td width="'+this.scrollOffset+'px;">' +
				'</tr>' +
			'</tbody></table>' +
		'</div>';        
		var html = header+pool+port;
		return html;
	},

	setToday:function(){      
		var today =  Ext.Date.format((new Date()),'Y-m-d');
        var len = this.daySet.length;
        var t;
		for(var i = 0; i < len; i++){
			var day =  Ext.Date.format(this.daySet[i],'Y-m-d');
			if(day === today){				
                t = i;
				break;
			}
		}
        for(var i = 0; i < this.dayNum; i++){
            var pbk = Ext.get(this.id+'-x-dayview-bg-0-'+i);
            if(pbk){
                pbk.setStyle('background-color', 'white');
            }
        }
        var flag = (t!=undefined&&false != Ext.ux.calendar.Mask.typeOf(t));
        if(flag){
            var pbk = Ext.get(this.id+'-x-dayview-bg-0-'+t);
            if(pbk){
                pbk.setStyle('background-color', 'rgb(255,255,214)');
            }
        }        
        for(var i = this.activeStartRow; i < this.activeEndRow; i++){            
            for(var j = 0; j < this.dayNum; j++){
                var div = Ext.get(this.id+'-x-dayview-viewer-'+i+'-'+j);
                if(div){
                    var td = Ext.get(div.dom.parentNode);
                    if(flag && j == t){
                        td.setStyle('background-color', 'rgb(255,255,214)');
                    }else{
                        td.setStyle('background-color', 'white');
                    }
                }
            }
        }        
	},

    getStartDate:function(date){
        var sDate;
        if(1 == this.dayNum){
            sDate = date;
        }else if(5 == this.dayNum){
            var n =  Ext.Date.format(date,'N');
            if(7 == n){
                n = 0;
            }
            n = 1-n;
            sDate =  Ext.Date.add(date,Ext.Date.DAY, n);
        }else{
            if(1 == this.startDay){
                var n =  Ext.Date.format(date,'N');
                n = 1-n;
                sDate =Ext.Date.add(date,Ext.Date.DAY, n);
            }else{
                var w =  Ext.Date.format(date,'w');
                sDate =  Ext.Date.add(date,Ext.Date.DAY, -w);
            }
        }
        return sDate;
    },

	initComponent:function(){        
		this.id = Ext.id();
		this.daySet = [];
        if(Ext.isIE){
            this.scrollOffset += 1;
        }
        this.ehandler.applyCalendarSetting(this);
        		
        var sDate = this.getStartDate(new Date());

		for(var i = 0, len = this.dayNum; i < len; i++){
			this.daySet[this.daySet.length]	=  Ext.Date.add(sDate,Ext.Date.DAY, i);
		}        

		this.html = this.generateHTML();

		Ext.ux.calendar.view.DayView.superclass.initComponent.call(this);
        this.addEvents(
            'checklayout',
            'sizechanged',
            'afterresize',
            'beforeremoteload',
            'remoteload',
            'canceldetail',
            'viewDay',
            'viewWeek'            
        );
		this.on('afterrender', this._onAfterRenderFn, this);
        this.on('checklayout', this.checkLayout, this);
        this.on('canceldetail', this.onCancelDetailFn, this);
        this.on('afterlayout', this._onReSizingFn, this);
        this.on('bodyresize', this._onReSizingFn, this);
        this.on('sizechanged', this.onSizeChangedFn, this, {buffer:100});
        Ext.EventManager.on(document, 'mouseup', this._onMouseUpFn, this);
	},

    _onReSizingFn:function(){
        this.fireEvent('sizechanged');
    },

    onSizeChangedFn:function(){
        this.handleResize(this.body.getWidth(), this.body.getHeight());
        //this.handleResize(this.getEl().getWidth(), this.getEl().getHeight());
    },

    onCancelDetailFn:function(){
        if(this.detailing){
            this.detailing = false;
            this.detailCt.setStyle('display', 'none');
        }
    },

    resetDragEventEl:function(){
        if(this.dragEventEl){
            var eh = this.ehandler;
            delete(this.dragEventEl.row);            
            delete(this.dragEventEl);
            delete(this.moving);
            eh.floating = false;
        }
    },

    resetPrepareEl:function(){
        if(this.preEl){
            var eh = this.ehandler;
            eh.showEditor(this.preEl, this, 'add');            
            delete(this.preEl);
        }
    },

    resetSCover:function(){
        delete(this.startPos);
        delete(this.endPos);
        this.hideSCovers();
    },

    endDragEventEl:function(coverEl, e){
        var cview = coverEl.cview;
        var eh = this.ehandler;
        eh.floating = false;
        var event = coverEl.bindEvent;
        var col = coverEl.col;        
        var nol = coverEl.nol;
        if(nol==undefined||false == Ext.ux.calendar.Mask.typeOf(nol)){
            nol = col;
            coverEl.nol = nol;
        }
        var oevent = event;
        event = Ext.apply({}, event);
        var row = coverEl.row || event.startRow;                
        var slot = event['endRow'] - event['startRow'];
        if(nol == col){
            event['startRow'] = row;
            event['endRow'] = row+slot;            
        }else{            
            event.startRow = row;
            event.endRow = row+slot;
            var day = cview.daySet[nol];
            var dnum = Ext.ux.calendar.Mask.getDayOffset(event.day, event.eday);
            event.day =  Ext.Date.format(day,'Y-m-d');
            day =  Ext.Date.add(day,Ext.Date.DAY, dnum);
            event.eday =  Ext.Date.format(day,'Y-m-d');            
        }        
        if(nol != col || event.startRow != event.oldStartRow || event.endRow !=  event.oldEndRow){
            if('string' == Ext.ux.calendar.Mask.typeOf(oevent.repeatType) && 'string' == Ext.ux.calendar.Mask.typeOf(event.repeatType)){                
                event.repeatType = oevent.repeatType;
                eh.updateEvent(event, cview, null, oevent);
            }else{
                event.repeatType = 'exception';
                oevent.startRow = oevent.oldStartRow;
                oevent.endRow = oevent.oldEndRow;
                eh.updateRepeatEvent(event, cview, oevent);
            }
        }else{
            this.resetEventEl(coverEl);
        }
    },

    endResizeEventEl:function(eventEl){
        var eh = this.ehandler;
        eh.floating = false;
        var event = eventEl.bindEvent;
        if(event.endRow != event.oldEndRow){
            if('string' == Ext.ux.calendar.Mask.typeOf(event.repeatType)){
                eh.updateEvent(event, this, eventEl.col);
            }else{
                var oevent = Ext.apply({}, event);
                event.repeatType = 'exception';
                oevent.startRow = oevent.oldStartRow;
                oevent.endRow = oevent.oldEndRow;
                eh.updateRepeatEvent(event, this, oevent);
            }
        }else{
            this.resetEventEl(eventEl);
        }
    },

    _onMouseUpFn:function(e){        
        var eh = this.ehandler;
        this.resetPrepareEl();        
        if(this.dragEventEl && this.moving){            
            this.endDragEventEl(this.dragEventEl, e);
        }
        this.resetDragEventEl();        
        if(!this.dragging){
            if(this.startPos){
                var spos = Ext.apply({}, this.startPos), epos = Ext.apply({}, this.endPos);
                this.startPos = null;
                eh.prepareLegend(Ext.get(this.id+'-x-dayview-bg-0-'+epos.y), spos, epos, this);
            }
        }
        if(this.resizeEventEl){
            this.endResizeEventEl(this.resizeEventEl);
        }
        this.resetResizeEventEl();        
    },

	getCellIndex:function(cellId){
		var parts = cellId.toString().split('-');
		var len = parts.length;
		var colIndex = parts[len-1];
		var rowIndex = parts[len-2];
		return {
			x:parseInt(rowIndex),
			y:parseInt(colIndex)
		};
	},

	_onAfterRenderFn:function(p){
        this.initEls();
		this.setToday();        
	},       

    _onPortClickFn:function(e){
        var eh = this.ehandler;
        var target = e.getTarget();
		var tgEl = Ext.get(target);    
		var iniclass=Ext.ux.calendar.Mask.includeIsClass
        if(iniclass(target.className,'x-event-pin')){            
            if(iniclass(target.className,'x-calendar-event-pin-off')){
                tgEl.removeCls('x-calendar-event-pin-off');
                tgEl.addCls('x-calendar-event-pin-on');
                eh.editDisabled = true;
            }else{
                tgEl.removeCls('x-calendar-event-pin-on');
                tgEl.addCls('x-calendar-event-pin-off');
                eh.editDisabled = false;
            }
        }else{
            var cEl;
            if(iniclass(target.className,'x-event-content-link')){
                cEl = tgEl.parent('.x-event-cover');
                if(!cEl.bindEvent.locked){                    
                    eh.showEditor(cEl, this, 'update');                    
                }
            }else{
                if(iniclass(target.className,'x-event-cover')){
                    cEl = tgEl;
                }else{
                    cEl = tgEl.parent('.x-event-cover');
                }
                if(cEl){
                    eh.setEditingStatus(cEl, true, false);
                }
            }
        }
    },

    _onPortMouseOverFn:function(e){
        var target = e.getTarget();
        var tgEl = Ext.get(target);
        var flag = false;
        var iniclass=Ext.ux.calendar.Mask.includeIsClass;
        if(iniclass(target.className,'x-event-cover')){
            flag = true;
        }else if((tgEl = tgEl.parent('.x-event-cover'))){
            flag = true;
        }
        if(flag){                        
            var eh = this.ehandler;
            if(!eh.editDisabled){
                eh.setEditingStatus(tgEl, true);
            }
        }
    },

	_onBodyClickFn:function(e){        
		var target = e.getTarget();
		var tgEl = Ext.get(target);
		var eh = this.ehandler;
	    var iniclass=Ext.ux.calendar.Mask.includeIsClass;
        if(iniclass(target.className,'x-dayview-pool-collapse')){
            tgEl.removeCls('x-dayview-pool-collapse');
            tgEl.addCls('x-dayview-pool-expand');
            this.lineNum = Math.floor(this.body.getHeight()/17)-5;
            this.checkLayout(Ext.isIE);
        }else if(iniclass(target.className,'x-dayview-pool-expand')){
            tgEl.addCls('x-dayview-pool-collapse');
            tgEl.removeCls('x-dayview-pool-expand');
            this.lineNum = 3;
            this.checkLayout(Ext.isIE);
        }else if(iniclass(target.className,'x-event-detail-tool-close')){
            this.fireEvent('canceldetail');
        }else{
            if(!eh.readOnly && (iniclass(target.className,'x-whole-title-b') || iniclass(target.className,'x-legend-title-b'))){
                var wEl = tgEl.parent('.x-whole-cover');
                if(wEl && !wEl.bindEvent.locked){
                    eh.showEditor(wEl, this, 'update');
                }
            }else if(iniclass(target.className,'x-dayview-header-day-link')){
                var pos = this.getCellIndex(tgEl.dom.id);
                var day = this.daySet[pos.y];
                this.fireEvent('viewDay', this, day);
            }else if(iniclass(target.className,'x-dayview-wn-link')){
                var sdate = this.daySet[0];
                this.fireEvent('viewWeek', sdate, sdate);
            }
        }        
	},
    
    _onBodyContextMenuFn:function(e){
        e.stopEvent();
        var eh = this.ehandler;
        var target = e.getTarget();
		var tgEl = Ext.get(target);  
		var iniclass=Ext.ux.calendar.Mask.includeIsClass;
        if(!iniclass(target.className,'x-calendar-event')){
            tgEl = tgEl.parent('.x-calendar-event');
        }
        if(tgEl){            
            eh.showContextMenu(e, tgEl);
            this.menu.hide();
        }else if(this.createByDblclick){
            var pvEl = Ext.get(target);;
            if(!iniclass(pvEl.dom.className,'x-dayview-pool-viewer')){
                pvEl = pvEl.parent('.x-dayview-pool-viewer')
            }
            if(pvEl){
                this.menu.pn = this.calculatePos(e);
                this.menu.showAt(e.getXY());
                eh.cmenu.hide();
            }
        }
    },

    _onBodyDblclickFn:function(e){
        var eh = this.ehandler;
        var target = e.getTarget();
		var tgEl = Ext.get(target);    
		var iniclass=Ext.ux.calendar.Mask.includeIsClass;
        if(!iniclass(target.className,'x-calendar-event')){
            tgEl = tgEl.parent('.x-calendar-event');
        }
        if(tgEl && !tgEl.bindEvent.locked){            
            eh.showEditor(tgEl, this, 'update');
        }else if(this.createByDblclick){
            var pvEl = Ext.get(target);
            if(!iniclass(pvEl.dom.className,'x-dayview-pool-viewer')){
                pvEl = pvEl.parent('.x-dayview-pool-viewer')
            }
            if(pvEl){
                var pos = this.calculatePos(e);
                var epos = Ext.apply({}, pos);
                this.selectRange(pos, epos);
                this.startPos = null;
                eh.prepareLegend(Ext.get(this.id+'-x-dayview-bg-0-'+pos.y), pos, epos, this);
            }
        }
    },

    resetResizeEventEl:function(){
        if(this.resizeEventEl){
            delete(this.resizeEventEl);
        }
    },

	_onPortMouseDownFn:function(e){
        e.stopEvent();
        this.fireEvent('hideeditor');
        this.fireEvent('canceldetail');
        var iniclass=Ext.ux.calendar.Mask.includeIsClass;
        if(0 == e.button){
            var target = e.getTarget();
            var tgEl = Ext.get(target);
            var eh = this.ehandler;
            if(iniclass(target.className,'x-dayview-viewer-cell')){
                if(!this.createByDblclick){
                    this.preEl = eh.prepareEvent(tgEl, this);
                    this.preEl.base = this.preEl.bindEvent.startRow;
                    eh.setEditingStatus(this.preEl, true);
                    eh.floating = true;
                }
            }else if(iniclass(target.className,'x-event-bottom-default')){
                var eEl = tgEl.parent('.x-event-cover');
                var event = eEl.bindEvent;
                if(event){
                if(!event.locked){
                	
                    event.oldStartRow = event.startRow;
                    event.oldEndRow = event.endRow;
                    this.resizeEventEl = eEl;                    
                }else{
                    this.resetResizeEventEl();
                }
                }
            }else if(!iniclass(target.className,'x-event-pin') && !iniclass(target.className,'x-event-content-link')){
                delete(this.preEl);
                var eEl = tgEl;
                if(!iniclass(eEl.dom.className,'x-event-cover')){
                    eEl = tgEl.parent('.x-event-cover');
                }
                if(eEl){
                    var event = eEl.bindEvent;
                    if(event){
	                    if(!event.locked){
	                        event.oldStartRow = event.startRow;
	                        event.oldEndRow = event.endRow;
	                        eEl.span = event.endRow-event.startRow;
	                        this.dragEventEl = eEl;
	                    }else{
	                        this.resetDragEventEl();
	                    }
                    }
                }
            }
        }
	},		   

    movePrepareEl:function(prepareEl, e){
        var event = prepareEl.bindEvent;
        var base = prepareEl.base;
        var baseEl = Ext.get(this.id+'-x-dayview-viewer-'+base+'-0');
        var top = baseEl.getTop();
        var bottom = baseEl.getBottom();
        var y = e.getXY()[1];
        if(y >= top){
            var h = y-top;
            var plot = Math.round(h/26);
            h = plot*26;
            event.startRow = base;
            event.endRow = base+plot+1;
            if(this.endRow < event.endRow){
                event.endRow = this.endRow;
                h = 26*(this.endRow-base-1);
            }
            prepareEl.contentEl.setHeight(h);
            prepareEl.titleEl.dom.innerHTML = '<b>'+this.ehandler.generateTitle(event)+'</b>';
            prepareEl.setY(top);
        }else{
            var h = bottom-y;
            var plot = Math.round(h/26);
            h = plot*26;
            event.startRow = base-plot;
            event.endRow = base+1;
            if(this.startRow > event.startRow){
                event.startRow = this.startRow;
                h = 26*(event.endRow-event.startRow-1);
            }
            prepareEl.contentEl.setHeight(h);
            prepareEl.titleEl.dom.innerHTML = '<b>'+this.ehandler.generateTitle(event)+'</b>';
            var t = bottom-prepareEl.getHeight();
            prepareEl.setY(t);
        }
    },

    resizingEventEl:function(eventEl, e){
        eventEl.setStyle('cursor', 's-resize');
        var event = eventEl.bindEvent;
        var eh = this.ehandler;        
        eh.floating = true;
        var xy = e.getXY();
        var bl = this.cbody.getLeft();
        var fn = Ext.get(this.id+'-x-dayview-viewer-'+this.startRow+'-0');
        var lt = fn.getXY(), cw = fn.getWidth(), ch = fn.getHeight()+1;
        var y = xy[1]-lt[1];
        var row = this.startRow+Math.ceil(y/ch);
        if(this.endRow < row){
            row = this.endRow;
        }                
        var r = (this.endRow == row)?this.endRow-1:row;
        var pn = Ext.get(this.id+'-x-dayview-viewer-'+r+'-'+eventEl.col) ;
        var left = pn.getLeft()-bl;                
        event.endRow = row;
        if(this.endRow < event.endRow){
            event.endRow = this.endRow;
        }
        if(event.endRow <= event.startRow){
            event.endRow = event.startRow+1;
        }
        if(!eventEl.ol){
            eventEl.ol = eventEl.getStyle('left');
            eventEl.ot = eventEl.getStyle('top');
            eventEl.ow = eventEl.getStyle('width');
            eventEl.oh = eventEl.contentEl.getHeight();
        }
        var h = ch*(event.endRow-event.startRow)-24;
        eventEl.setStyle('left', left+'px');        
        eventEl.setStyle('width', cw+'px');
        eventEl.contentEl.setHeight(h);
        eventEl.titleEl.dom.innerHTML = '<b>'+eh.generateTitle(event)+'</b>';
        eh.setEditingStatus(eventEl, true);
    },

    resetEventEl:function(eventEl){
        if(eventEl.ol){
            eventEl.setStyle('left', eventEl.ol);
            eventEl.setStyle('top', eventEl.ot);
            eventEl.setStyle('width', eventEl.ow);
            eventEl.contentEl.setHeight(eventEl.oh);
            delete(eventEl.ol);
            delete(eventEl.ot);
            delete(eventEl.ow);
            delete(eventEl.oh);
        }
    },
    
    moveEventEl:function(eventEl, e){        
        var eh = this.ehandler;
        var xy = e.getXY();
        var bl = this.cbody.getLeft(), bt = this.cbody.getTop();
        var fn = Ext.get(this.id+'-x-dayview-viewer-'+this.startRow+'-0');
        var lt = fn.getXY(), cw = fn.getWidth(), ch = fn.getHeight()+1;
        var x = xy[0]-lt[0], y = xy[1]-lt[1];
        var row = this.startRow+Math.ceil(y/ch), col = Math.floor(x/cw);
        row -= 1;
        if(this.startRow > row){
            row = this.startRow;
        }else if(this.endRow <= row){
            row = this.endRow-1;
        }
        if(0 > col){
            col = 0;
        }else if(this.dayNum <= col){
            col = this.dayNum-1;
        }        
        var pn = Ext.get(this.id+'-x-dayview-viewer-'+row+'-'+col) ;
        var left = pn.getLeft()-bl;
        var top = pn.getTop()-bt;        
        //save the origin position
        if(!eventEl.ol){
            eventEl.ol = eventEl.getStyle('left');
            eventEl.ot = eventEl.getStyle('top');
            eventEl.ow = eventEl.getStyle('width');
            eventEl.oh = eventEl.contentEl.getHeight();
        }
        eventEl.setStyle('left', left+'px');
        eventEl.setStyle('top', top+'px');
        eventEl.setStyle('width', cw+'px');
        eh.floating = true;
        eh.setEditingStatus(eventEl, true);

        var event = eventEl.bindEvent;
        var span = eventEl.span || event['endRow'] - event['startRow'];
        event['startRow'] = row;
        event['endRow'] = event['startRow']+span;
        if(this.endRow-1 < event['startRow']){
            event['startRow'] = this.endRow-1;
        }
        if(this.endRow < event['endRow']){
            event['endRow'] = this.endRow;
        }
        var h = 26*(event.endRow-event.startRow-1);
        eventEl.contentEl.setHeight(h);
        eventEl.titleEl.dom.innerHTML = '<b>'+eh.generateTitle(event)+'</b>';
        eventEl.nol = col;
        eventEl.row = row;
    },

	_onPortMouseMoveFn:function(e){        
        if(0 == e.button){
            if(this.preEl){
                this.movePrepareEl(this.preEl, e);
            }else if(this.dragEventEl){
                this.moving = true;
                this.moveEventEl(this.dragEventEl, e);
            }else if(this.resizeEventEl){
                this.resizingEventEl(this.resizeEventEl, e);
            }
        }else{
            this.resetResizeEventEl();
            this.resetDragEventEl();
            this.resetPrepareEl();            
        }
	},

    initEls:function(){        
    	this.port = Ext.get(this.id+'-x-dayview-port');
    	this.cbody = Ext.get(this.id+'-x-dayview-body');
        this.lefter = Ext.get(this.id+'-x-dayview-lefter');
        this.cheader = Ext.get(this.id+'-x-dayview-header');
        this.cpool = Ext.get(this.id+'-x-dayview-pool');
        this.cptable = Ext.get(this.id+'-x-dayview-pool-ct');
        this.pviewer = Ext.get(this.id+'-x-dayview-pool-viewer');
        this.pswitch = Ext.get(this.id+'-x-dayview-pool-switch');

        this.port.un('mouseover', this._onPortMouseOverFn, this);
        this.port.on('mouseover', this._onPortMouseOverFn, this);
        this.body.un('mousedown', this._onBodyMouseDownFn, this);
        this.body.on('mousedown', this._onBodyMouseDownFn, this);
        this.body.un('click', this._onBodyClickFn, this);
        this.body.on('click', this._onBodyClickFn, this);

        if(!this.ehandler.readOnly){            
            this.body.un('contextmenu', this._onBodyContextMenuFn, this);
            this.body.un('dblclick', this._onBodyDblclickFn, this);            
            this.body.un('mousemove', this._onBodyMouseMoveFn, this);
            this.port.un('mousedown', this._onPortMouseDownFn, this);
            this.port.un('mousemove', this._onPortMouseMoveFn, this);
            
            this.body.on('mousemove', this._onBodyMouseMoveFn, this);
            this.body.on('contextmenu', this._onBodyContextMenuFn, this);            
            this.body.on('dblclick', this._onBodyDblclickFn, this);            
            this.port.on('mousedown', this._onPortMouseDownFn, this);
            this.port.on('mousemove', this._onPortMouseMoveFn, this);
            if(this.createByDblclick){
                this.port.un('dblclick', this._onPortDblclickFn, this);
                this.port.on('dblclick', this._onPortDblclickFn, this);
            }

            
            this.port.un('click', this._onPortClickFn, this);
            this.port.un('contextmenu', this._PortContextMenuFn, this);
            
            this.port.on('click', this._onPortClickFn, this);
            this.port.on('contextmenu', this._PortContextMenuFn, this);
            this.initMenu();
            if(1 < this.dayNum){
                this.initDragZone(this.body);
            }
        }
        
        this.initSelectCover();
        this.initDetailCt();                
    },

    _PortContextMenuFn:function(e){
        e.preventDefault();
        var target = e.getTarget();
        var tgEl = Ext.get(target);   
        var iniclass=Ext.ux.calendar.Mask.includeIsClass;
        if(iniclass(target.className,'x-dayview-viewer-cell')){
            this.menu.pn = tgEl;
            this.menu.showAt(e.getXY());
            this.ehandler.cmenu.hide();
        }
    },

    initMenu:function(){
        var lan = Ext.ux.calendar.Mask.DayView;
		this.addItem = new Ext.menu.Item({
			iconCls:'icon_feyaCalendar_event_add',
			text:lan['addItem.text'],
			handler:this.onAddFn,
			scope:this
		});

		this.menu = new Ext.menu.Menu({
			items:[
				this.addItem
			]
		});
    	this.menu = Ext.menu.MenuMgr.get(this.menu);
    },

    onAddFn:function(item){
        var pn = item.parentMenu.pn;
        if(pn){
            if(pn instanceof Ext.Element){
                this.addEvent2Row(pn);
            }else{
                this.startPos = pn;
                this.endPos = pn;
                this.ehandler.prepareLegend(null, this);
            }
        }
    },

    addEvent2Row:function(pn){
        var eh = this.ehandler;
        eh.floating = true;
        this.preEl = eh.prepareEvent(pn, this);
        this.preEl.base = this.preEl.bindEvent.startRow;
        eh.showEditor(this.preEl, this, 'add');
        eh.floating = false;
        delete(this.preEl);
    },

    _onPortDblclickFn:function(e){
        var target = e.getTarget();
        var tgEl = Ext.get(target);
        var eh = this.ehandler;
        var iniclass=Ext.ux.calendar.Mask.includeIsClass;
        if(iniclass(target.className,'x-dayview-viewer-cell')){
            this.addEvent2Row(tgEl);
        }
    },
    
    initDetailCt:function(){
        var eh = this.ehandler;
        var html = eh.detailTpl.apply({});
        this.detailCt = Ext.core.DomHelper.append(this.body, html, true);
        this.detailCt.setStyle('display', 'none');
        this.detailTitle = this.detailCt.down('.x-event-detail-title-td');
        this.detailViewer = this.detailCt.down('.x-event-detail-viewer');
        this.detailFoot = this.detailCt.down('.x-event-detail-foot-text');
    },

    initDragZone:function(bindEl){
        var proxy = new Ext.dd.StatusProxy({
            dropNotAllowed:'x-dd-drop-ok'
        });
        bindEl.dragzone = new Ext.dd.DragZone(bindEl, {
            cview:this,
            ddGroup:'x-mycalendar',
            proxy:proxy,
            onStartDrag:function(){
                this.cview.dragging = true;
                 Ext.defer((function(){
                    var event = this.dragData.bindEvent;
                    var arr = Ext.DomQuery.select('div[name=x-event-'+event.day+'-'+event.eday+'-'+event.eventId+']', this.cview.body.dom);
                    for(var i = 0, len = arr.length; i < len; i++){
                        Ext.get(arr[i]).setOpacity(0.3);
                    }
                }),1, this);
            },
            getDragData:function(e){
                var target = e.getTarget();
                var tgEl = Ext.get(target);
                var iniclass=Ext.ux.calendar.Mask.includeIsClass;
                if(!iniclass(target.className,'x-calendar-event')){
                    tgEl = tgEl.parent('.x-calendar-event');
                }
                if(tgEl){
                    var event = tgEl.bindEvent;
                    if(!event.locked){
                        var ddel = tgEl.dom.cloneNode(true);
                        var w = tgEl.getWidth();
                        if(200 < w){
                            ddel.style.width = '200px';
                        }else{
                            ddel.style.width = w+'px';
                        }                        
                        return {
                            ddel:ddel,                            
                            bindEvent:event
                        };
                    }
                }
                return false;
            },
            getRepairXY: function() {
                return null;
            },
            onDrag:function(e){
                var event = this.dragData.bindEvent;
                var cview = this.cview;
                var eh = cview.ehandler;
                var span = Ext.ux.calendar.Mask.getDayOffset(event.day, event.eday);
                var pos = cview.calculatePos(e);
                var epos = cview.addSpan2Pos(pos, span);
                cview.selectRange(pos, epos);
            },
            endDrag:function(e){
                var event = this.dragData.bindEvent;
                var oevent = Ext.apply({}, event);
                var cview = this.cview;
                var spos = cview.startPos;
                var eh = cview.ehandler;
                var dnum = Ext.ux.calendar.Mask.getDayOffset(event.day, event.eday);
                var date = cview.daySet[spos.y];
                var day =  Ext.Date.format(date,'Y-m-d');
                if(event.day != day){
                    event.eday =   Ext.Date.format(Ext.Date.add(date,Ext.Date.DAY, dnum),'Y-m-d');
                    event.day = day;
                    delete(cview.startPos);
                    if('string' == Ext.ux.calendar.Mask.typeOf(event.repeatType)){
                        eh.updateEvent(event, cview, spos.y);
                    }else{
                        event.repeatType = 'exception';
                        eh.updateRepeatEvent(event, cview, oevent);
                    }
                }else{
                    var arr = Ext.core.DomQuery.select('div[name=x-event-'+event.day+'-'+event.eday+'-'+event.eventId+']', this.cview.body.dom);
                    for(var i = 0, len = arr.length; i < len; i++){
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

    addSpan2Pos:function(pos, span){
        var o = Ext.apply({}, pos);
        o.y += span;
        if(o.y >= this.dayNum){
            o.y = this.dayNum-1;
        }
        return o;
    },

    alignDetailCt:function(){
        if(this.detailing){
            var x = this.detailing.x, y = this.detailing.y, events = this.detailing.events;
            this.detailCt.setStyle('display', '');
            var cEl = Ext.get(this.id+'-x-dayview-bg-'+x+'-'+y);
            var h = events.length*17, mh = this.port.getBottom()-cEl.getTop()-30;
            var roffset = this.port.getRight()-cEl.getRight();
            var hpos;
            var offset = [0, 0];
            if(h > mh){
                this.detailViewer.setHeight(mh);
            }else{
                this.detailViewer.setStyle('height', '');
            }
            if(1 < this.dayNum && roffset < this.detailCt.getWidth()){
                hpos = 'r';
                offset[0] = -1;
            }else{
                hpos = 'l';
            }
            var cw = cEl.getWidth();
            if(200 < cw){
                this.detailCt.setWidth(cw);
            }else{
                this.detailCt.setWidth(200);
            }
            var str = 't'+hpos;
            this.detailCt.alignTo(cEl, str+'-'+str, offset);
        }
    },

    showDetails:function(day){
        var lan = Ext.ux.calendar.Mask.DayView;
        var eh = this.ehandler;
        var glayout = eh.calendarLayout;
        var events = glayout.getWholeList(this, day, false, true);
        var index = this.getIndexFromDay(day);
        var x = 0;
        var y = index%this.shiftDay;
        this.detailing = {
            x:x,
            y:y,
            events:events
        };

        this.detailTitle.dom.innerHTML = '<b><u id="'+Ext.id()+'x-dayview-day-link-'+x+'-'+y+'" class="x-dayview-header-day-link">'+day+'</u></b>';
        this.detailFoot.dom.innerHTML = events.length+' '+lan['events'];
        eh.bindEvent2Detail(this, events, this.detailViewer);

        this.alignDetailCt();
    },

    _onBodyMouseDownFn:function(e){
        e.stopEvent();
        this.fireEvent('hideeditor');
        var target = e.getTarget();
		var tgEl = Ext.get(target);
        var eEl;
        var iniclass=Ext.ux.calendar.Mask.includeIsClass;
        if(iniclass(target.className,'x-event-more')){
            var day = tgEl.dom.getAttribute('name');
            this.showDetails(day);
        }else{
            if(this.detailing){
                if(!(iniclass(target.className,'x-event-detail-ct') || tgEl.parent('.x-event-detail-ct'))){
                    this.fireEvent('canceldetail');
                }else{
                    return;
                }
            }
            if(!this.createByDblclick && !this.ehandler.readOnly){
                if(iniclass(target.className,'x-calendar-event')){
                    eEl = tgEl;
                }else{
                    eEl = tgEl.parent('.x-calendar-event');
                }
                if(!eEl){
                    eEl = tgEl.parent('.x-dayview-pool-viewer');
                    if(eEl){
                        var pos = this.calculatePos(e);
                        this.selectRange(pos, pos);
                    }
                }
            }
        }
    },

    calculatePos:function(e){
        var xy = e.getXY();
        var lt = this.pviewer.getXY();
        var y = Math.floor((xy[0]-lt[0])/this.cw);
        if(0 > y){
            y = 0;
        }else if(y >= this.dayNum){
            y = this.dayNum-1;
        }
        return {
            x:0,
            y:y
        };
    },

    _onBodyMouseMoveFn:function(e){
        if(0 == e.button){
            if(this.startPos){
                var pos = this.calculatePos(e);
                this.selectRange(null, pos);
            }
        }else{
            this.resetSCover();
        }
	},

    hideSCovers:function(){
        this.scover.dom.style.display = 'none';
    },

    selectRange:function(spos, epos){
        this.hideSCovers();
        if(spos){
            this.startPos = spos;
        }else{
            spos = this.startPos;
        }
        this.endPos = epos;        
        var sy, ey;
        if(this.startPos.y > this.endPos.y){
            sy = this.endPos.y;
            ey = this.startPos.y;
        }else{
            ey = this.endPos.y;
            sy = this.startPos.y;
        }
        var cw = this.cw;
        var ch = this.pviewer.getHeight();
        var w, l = cw*sy;        
        var sc = this.scover;
        
        sc.dom.style.display = '';
        w = cw*(ey-sy+1);
        sc.setWidth(w);
        sc.setHeight(ch);
        sc.setLeft(l+'px');
        sc.setTop('0px');
    },

    initSelectCover:function(){
        var div = document.createElement('div');
        div.className = 'x-event-select-cover';
        div = Ext.get(div);        
        this.pviewer.appendChild(div);
        this.scover = div;
    },

    resizePort:function(relayout){
        var bh = this.body.getHeight();
        var ph = this.cpool.getHeight();
        var ah = bh-this.cheader.getHeight()-ph-1;
        if(ah != this.port.getHeight()){
            this.port.setHeight(ah);
        }
        if(true == relayout){
            var eh = this.ehandler;
            var glayout = eh.calendarLayout;
            for(var i = 0, len = this.dayNum; i < len; i++){
                var layout = glayout.getLayout(this.daySet[i], this);
                if(layout){
                    var rs = layout.reLayout();
                    eh.renderEvent(this, rs.elist, i);
                }
            }
            this.adjustScroller();
        }
    },    
    
    handleResize:function(bw, bh, still){
    	if(typeof bw == 'number'){
            this.cheader.setWidth(bw);
            if(!Ext.isIE){
                bw -= 1;
            }            
            var pw = bw-this.scrollOffset;
            var r = pw%7;
            this.leftWidth = 70+r;
            var els = document.getElementsByName(this.id+'-x-dayview-lefter-width');            
            for(var i = 0, len = els.length; i < len; i++){
                var el = els[i];
                el.style.width = this.leftWidth+'px';
            }
            this.port.setWidth(bw);                        
            bw = pw-this.leftWidth;
            this.cw = Math.round(bw/this.dayNum);
    	}
        
    	if(typeof bh == 'number'){
            this.resizePort(true);
       	}                
        this.alignDetailCt();
        this.updateTimeline();
        this.fireEvent('afterresize', this, bw, bh);        
    },    
    
    adjustScroller:function(){
        if(!this.hideInactiveRow){
            var rh = Ext.get(this.id+'-x-dayview-viewer-'+this.activeStartRow+'-0');
            rh = Ext.get(rh.dom.parentNode);
            this.port.dom.scrollTop = rh.getHeight()*this.activeStartRow;
        }
    },

    checkLayout:function(force, refresh){    
    	var vDate=Ext.Date;
    	var eh = this.ehandler;    	
	    var startDate = this.daySet[0];
	    var endDate = this.daySet[this.daySet.length-1];
        if(1 == this.daySet.length){
            endDate =  vDate.add(endDate,Ext.Date.DAY, 1);
        }
	    if(eh.isInDayCache(startDate, endDate) && !refresh){/* if it in the eventCache, we don't need request server*/
            var glayout = eh.calendarLayout;
            var layoutSet = {};
            var whole = {};
            for(var i = 0, len = this.dayNum; i < len; i++){
                var day =  vDate.format(this.daySet[i],'Y-m-d');
                var layout = glayout.getLayout(day, this);
                whole[day] = glayout.getWholeList(this, day);
                if(true !== layout.visited[this.id] || force){                
                    layoutSet[i] = layout;
                    this.cleanup(i);
                }
            }
            glayout.showWeek(this, this.cptable.dom.firstChild, 0, whole, true);
            this.resizePort();
            for(var p in layoutSet){                
                var layout = layoutSet[p];
                var rs = layout.reLayout(false, true);                
                eh.renderEvent(this, rs.elist, p);                
            }
            if(force){
                this.adjustScroller();
            }
	    }else{  
	    	this.fireEvent('beforeremoteload');
            this.cleanup();
          
	      	eh.ds.loadEvent(startDate, endDate, function(eventSet){   
	      		
                var glayout = eh.calendarLayout;
                var wlist = eventSet['whole'];
                glayout.updateWholeList(wlist, 'add');   
                 
		        this.showEvents(eventSet, refresh);
                eh.pushDayCache(startDate, endDate);
                
                this.adjustScroller();
                if(eh.firstTime){
		        	eh.firstTime = false;
		            eh.checkExpireEvents();		            
		        }
                this.resizePort(Ext.isIE);
                this.fireEvent('remoteload');
		    }, this);	       	
	    }

	    this.setToday();        
	    this.updateTimeline();
    },

    showEvents:function(eventSet, refresh){
    	       // return ;
        var whole = {};        
        var eh = this.ehandler;
        var glayout = eh.calendarLayout;
        for(var i = 0, len = this.dayNum; i < len; i++){
            var day =  Ext.Date.format(this.daySet[i],'Y-m-d');
           
            var layout = glayout.getLayout(day, this, eventSet[day] || [], true, refresh);
            if(layout){
                var rs = layout.reLayout();                
                eh.renderEvent(this, rs.elist, i);
                whole[day] = rs.wlist;
            }
        }   

        /*
         * we need load at least 2 days event at first         
         */
        if(1 == this.dayNum){
            var day = Ext.Date.format(Ext.Date.add(this.daySet[0],Ext.Date.DAY, 1),'Y-m-d');
            var layout = glayout.getLayout(day, this, eventSet[day] || [], true, refresh);
            if(layout){
                layout.reLayout();
            }
        }
        glayout.showWeek(this, this.cptable.dom.firstChild, 0, whole, true);
    },    
	
	refreshLefter:function(){
        var hnum = this.numInHour;
		for(var i = 0; i < this.rowCount; i++){
			for(var j = 0; j < 1; j++){
                var hour = Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, i, this.hourFormat);
                var rest = i%hnum;
                if(0 != rest && i != this.activeStartRow){
                    hour = '<div class="x-dayview-viewer-row-height" style="text-align:right;">' +
                        '<i><b class="x-dayview-lefter-inner x-dayview-lefter-fine-inner">'+hour+'</b></i>' +
                    '</div>';
                }else{
                    hour = '<div class="x-dayview-viewer-row-height">' +
                        '<b class="x-dayview-lefter-inner">'+hour+'</b>' +
                    '</div>';
                }
				var hEl = Ext.get(this.id+'-x-dayview-lefter-'+i+'-'+j);
				if(hEl){
					hEl.dom.firstChild.innerHTML = hour;
				}				
			}
		}        
	},

    refreshDate:function(){
		for(var i = 0; i < this.dayNum; i++){
            var titleEl = Ext.get(this.id+'-x-dayview-day-link-0-'+i);
            if(titleEl){
                var day =Ext.Date.format( this.daySet[i],this.dayFormat);
                titleEl.dom.innerHTML = day;
            }
        }
		var wdate = this.daySet[0];
		var n = Ext.Date.format(wdate, 'N');
		if(7 == n){
			wdate = Ext.Date.add(wdate, Ext.Date.DAY, 1);
		}
        var wEl = Ext.get(this.id+'-x-dayview-wn');
        if(wEl){
            wEl.dom.innerHTML = Ext.Date.getWeekOfYear(wdate);
        }
	},
    
    resetView:function(){		   
        this.refreshDate();
        this.setToday();
    },
    
    cleanup:function(col, pool){
        if(!pool){
            if(col==undefined||false == Ext.ux.calendar.Mask.typeOf(col)){
                for(var i = 0; i < this.rowCount; i++){
                    for(var j = 0; j < this.dayNum; j++){
                        var El = Ext.get(this.id+'-x-dayview-viewer-'+i+'-'+j);
                        if(El){
                            El.dom.innerHTML = '';
                        }
                    }
                }
            }else{
                for(var i = 0; i < this.rowCount; i++){
                    var El = Ext.get(this.id+'-x-dayview-viewer-'+i+'-'+col);
                    if(El){
                        El.dom.innerHTML = '';
                    }
                }
            }
        }
        if(this.cptable){
            var tbody = this.cptable.dom.firstChild;
            while(0 < tbody.childNodes.length){
                Ext.get(tbody.lastChild).remove();
            }
        }
    },

    getIndexFromDay:function(day){
        for(var i = 0, len = this.daySet.length; i < len; i++){
            var iday = this.daySet[i];
            if(day ==  Ext.Date.format(iday,'Y-m-d')){
                return i;
            }
        }
    },        

    locateDay:function(day){
        var fd = this.getStartDate(day);
        this.daySet[0] = fd;        
        for(var i = 1; i < this.dayNum; i++){
            this.daySet[i] = Ext.Date.add(fd,Ext.Date.DAY, i);
        }        
    },

    showDay:function(day){
        this.locateDay(day);
        this.resetView();
        this.checkLayout(true);
    },

    goBack:function(){
    	var vDate=Ext.Date;
        var shiftDay = this.shiftDay || this.dayNum;
        var dayNum = this.dayNum;
        var sdate = this.daySet[0];
        var fdate =  vDate.add(sdate,Ext.Date.DAY, -1*shiftDay);
        var weekNum = this.weekNum || 1;
        this.daySet = [];
        for(var i = 0; i < weekNum; i++){
        	for(var j = 0; j < dayNum; j++){
        		this.daySet[this.daySet.length] = vDate.add(fdate,Ext.Date.DAY, i*shiftDay+j);
        	}
        }
        this.resetView();
        this.checkLayout(true);
    },

    goNext:function(){
    	var vDate=Ext.Date;
        var shiftDay = this.shiftDay || this.dayNum;
        var dayNum = this.dayNum;
        var sdate = this.daySet[0];
        var fdate =  vDate.add(sdate,Ext.Date.DAY, shiftDay);
        var weekNum = this.weekNum || 1;
        this.daySet = [];
        for(var i = 0; i < weekNum; i++){
        	for(var j = 0; j < dayNum; j++){
        		this.daySet[this.daySet.length] =  vDate.add(fdate,Ext.Date.DAY, i*shiftDay+j);
        	}
        }
        this.resetView();
        this.checkLayout(true);
    },

    isShift:function(startDate, endDate){
    	var vDate=Ext.Date;
        var maxmin, minmax;
        var day1 =  vDate.format(startDate,'Y-m-d');
        var day2 =  vDate.format(this.daySet[0],'Y-m-d')
        if(day1 < day2){
            maxmin = day2;
        }else{
            maxmin = day1;
        }
        day1 =  vDate.format(endDate,'Y-m-d');
        day2 = vDate.format(this.daySet[this.daySet.length-1],'Y-m-d');
        if(day1 > day2){
            minmax = day2;
        }else{
            minmax = day1;
        }
        if(maxmin > minmax){
            var sdate = this.getStartDate(startDate);            
            this.daySet = [];
            for(var i = 0; i < this.weekNum; i++){
                for(var j = 0; j < this.dayNum; j++){
                    this.daySet[this.daySet.length] = vDate.add(sdate,Ext.Date.DAY, i*this.shiftDay+j);
                }
            }
            return true;
        }else{
            return false;
        }
    },

    showRange:function(startDate, endDate, force){
        if(this.isShift(startDate, endDate)){
            force = true;
            this.resetView();
        }        
        this.checkLayout(force);
    }
});