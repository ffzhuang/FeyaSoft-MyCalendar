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
Ext.ns('Ext.ux.calendar.editor');

Ext.ux.calendar.editor.EventEditor = function(config){
	Ext.apply(this, config);
    this.ehandler.applyCalendarSetting(this);    
    var lan = Ext.ux.calendar.Mask.Editor;

	this.timeField = this.timeField || new Ext.util.LabelField({
        fieldLabel:lan['startDayField.label'],        
        anchor:'99%'
    });

    this.subjectField = this.subjectField || new Ext.form.TextField({
		fieldLabel:lan['subjectField.label'],
		anchor:'99%'
	});

	this.contentField = this.contentField || new Ext.form.TextField({
		fieldLabel:lan['contentField.label'],        
		anchor:'99%'
	});

    var ctplstr=this.ehandler.cTplStr;
    this.calendarField= Ext.create('Ext.form.field.ComboBox', {
        fieldLabel:lan['calendarField.label'],		
        anchor:'99%',
        store:Ext.ux.calendar.Mask.getCalendarStore(),
		displayField:'title',
        valueField:'id' ,
        queryMode: 'local',
        listConfig: {
            getInnerTpl: function() {
                return '<div class="x-combo-list-item">' + ctplstr + '</div>';
            }
        }
    });

    this.alertCB = this.alertCB || new Ext.form.Checkbox({
        anchor:'99%',
        boxLabel:lan['alertCB.label']
    });

	this.deleteBtn = this.deleteBtn || new Ext.Button({
		iconCls:'icon_feyaCalendar_delete',		
		text:lan['deleteBtn.text'],
		disabled:true,
		handler:this.onRemoveFn,
		scope:this
	});
	
	this.saveBtn = this.saveBtn || new Ext.Button({
		iconCls:'icon_feyaCalendar_accept',		
		text:lan['saveBtn.text'],
		handler:this.onSaveFn,
		scope:this
	});	

    this.detailBtn = this.detailBtn || new Ext.Button({
        text:lan['detailSetting'],
        handler:this.onDetailFn,
        scope:this
    });

    this.cancelBtn = this.cancelBtn || new Ext.Button({
		iconCls:'icon_feyaCalendar_cancel',
		minWidth:80,
		text:lan['cancelBtn.text'],
		handler:this.onCancelFn,
		scope:this
	});

	Ext.ux.calendar.editor.EventEditor.superclass.constructor.call(this, {  
		bodyStyle: 'padding:5px 5px 10px 15px;',
		items:[
			this.timeField,
            this.subjectField,
            this.contentField,  
            {
				anchor:'99%',
				xtype:'container',
                layout:'column',
                items:[{
                	xtype:'container',
                    columnWidth:.6,                    
                    layout:'anchor',
                    items:[this.calendarField]
                }, {
                	xtype:'container',
	                columnWidth:.4,	                 	                
	                items:[this.alertCB]
	            }]
            }
		],
		buttonAlign:'center',
		buttons:[this.detailBtn, this.deleteBtn, this.saveBtn, this.cancelBtn]
	});
    this.addEvents(
        'showdetailsetting',
        'hided',
        'hideeditor',
        'showed'
    );
    this.on('render', this.onRenderFn, this);
	this.on('showed', this.onShowFn, this);
	this.on('hided', this.onHideFn, this);
    this.on('hideeditor', this.onHideEditorFn, this);
    this.calendarField.on('select', this.onCalendarSelectFn, this);
};

Ext.extend(Ext.ux.calendar.editor.EventEditor, Ext.form.FormPanel, {
    style:'z-index:10000000;',
    
    title:' ',

	width:460,

	height:180,

    //baseCls:'x-tip',

    closable:true,

    closeAction:'onCancelFn',

    resizable:false,

    frame:true,
   
    floating:{shadow:true,shim:true,useDisplay:true,constrain:false},
    
    initComponent:function(){
        Ext.ux.calendar.editor.EventEditor.superclass.initComponent.call(this);
        if(this.closable && !this.title){
            this.elements += ',header';
        }
    },

    onRenderFn:function(p){
        p.getEl().on('mousedown', function(e){           
            this.mdFlag = true;
        }, this);
        p.getEl().on('mouseup', function(e){
            delete(this.mdFlag);
            e.stopPropagation();
        }, this);
    },

    onDetailFn:function(){
        this.hideEditor();        
        this.fireEvent('showdetailsetting', this.obj);
    },    

    onCalendarSelectFn:function(field, val, options){
        var coverEl = this.bindEl;
        if(coverEl && !coverEl.hold){
            var event = coverEl.bindEvent;
            var cview = coverEl.cview;
            var eh = cview.ehandler;
            /*
             * get the selected rd, fix bug74, it's because extjs4 changed the 'select' event of combobox
             */
            var store = this.calendarField.store;
            var value = this.calendarField.getValue();            
            var index = store.find('id', value);            
            var rd = store.getAt(index);
            var color = eh.calendarSet[rd.data.id].color;
            var arr = Ext.core.DomQuery.select('div[name=x-event-'+event.day+'-'+event.eday+'-'+event.eventId+']', cview.body.dom);
            for(var i = 0, len = arr.length; i < len; i++){
                coverEl = Ext.get(arr[i]);                                                
                if(0 == event.startRow && this.rowCount == event.endRow){
                    if(this.oldColor != color){
                        eh.changeWholeColor(coverEl, this.oldColor, color);
                    }
                }else{
                    if(this.oldColor != color){
                        if(cview instanceof Ext.ux.calendar.view.DayView){
                            eh.changeEventColor(coverEl, this.oldColor, color);
                        }else{
                            eh.changeLegendColor(coverEl, this.oldColor, color);
                        }
                    }
                }
            }
        }
        this.oldColor = color;
    },        
	
	onRemoveFn:function(){
        var lan = Ext.ux.calendar.Mask.EventHandler;
		var coverEl = this.bindEl;
		var be = coverEl.bindEvent;
		var cview = coverEl.cview;
		var eh = cview.ehandler;
		var col = coverEl.col;        
		if(coverEl){                        
            if('string' == Ext.ux.calendar.Mask.typeOf(be.repeatType)){
                eh.freeEventEl(coverEl);
                eh.deleteEvent(be, cview, col);
            }else{                
                Ext.Msg.show({
                    title:lan['deleteRepeatPopup.title'],
                    msg:lan['deleteRepeatPopup.msg'],
                    buttons: Ext.Msg.YESNOCANCEL,
                    fn: function(bid, text){
                        if('yes' == bid){
                            eh.freeEventEl(coverEl);
                            eh.deleteRepeatEvent(be, cview);
                        }else if('no' == bid){
                            eh.freeEventEl(coverEl);
                            eh.deleteRepeatEvent(be, cview, true);
                        }
                    },
                    icon: Ext.MessageBox.QUESTION
                });
            }
		}
        cview.fireEvent('canceldetail');
        this.hideEditor();
	},
	
	onSaveFn:function(){
		if(this.form.isValid()){
            var eh = this.ehandler;
            var cview = this.cview;
			if(this.bindEl){
				var coverEl = this.bindEl;
				var event = coverEl.bindEvent;               
                var oevent = Ext.apply({}, event);				
				if('add' == this.action && !coverEl.hold){
		    		coverEl.remove();
		    	}
                event.repeatType = event.repeatType || 'no';
                event.allDay = false;
                if(this.alertCB.checked){
                    if(!event.alertFlag){
                        event.alertFlag = this.getAlertSetting();
                    }
                }else{
                    delete(event.alertFlag);
                }
                event.locked = event.locked || false;
                event.subject = this.subjectField.getValue();
                event.content = this.contentField.getValue();
                event.calendarId = this.calendarField.getValue();
                event.color = eh.calendarSet[event.calendarId].color;                
		        if('add' == this.action){                    
		        	if('string' == Ext.ux.calendar.Mask.typeOf(event.repeatType)){
                        eh.createEvent(event, cview);
                    }else{
                        eh.createRepeatEvent(event, cview);
                    }
		        }else if('update' == this.action){
                    if(!Ext.ux.calendar.Mask.isEqualObj(oevent, event)){
                        if('string' == Ext.ux.calendar.Mask.typeOf(oevent.repeatType) && 'string' == Ext.ux.calendar.Mask.typeOf(event.repeatType)){
                            eh.updateEvent(event, cview, null, oevent, this.noLayout);
                        }else{
                            if('string' != Ext.ux.calendar.Mask.typeOf(oevent.repeatType)){
                                /*
                                 * need ask user to choose apply all or just current one
                                 */
                                var lan = Ext.ux.calendar.Mask.EventHandler;
                                Ext.Msg.show({
                                    title:lan['updateRepeatPopup.title'],
                                    msg:lan['updateRepeatPopup.msg'],
                                    buttons: Ext.Msg.YESNOCANCEL,
                                    fn: function(bid, text){
                                        if('yes' == bid){
                                            eh.updateRepeatEvent(event, cview, oevent);
                                        }else if('no' == bid){
                                            event.repeatType = 'exception';                                            
                                            eh.updateRepeatEvent(event, cview, oevent);
                                        }
                                    },
                                    icon: Ext.MessageBox.QUESTION
                                });
                            }else{
                                eh.updateRepeatEvent(event, cview, oevent);
                            }
                        }
                    }
                }
			}
            cview.fireEvent('canceldetail');
            this.hideEditor();
		}
	},

    getAlertSetting:function(){
        var arr;
        if(Ext.ux.calendar.CONST.VERSION >= '2.0.5'){
            arr = [{
                type:'popup',
                early:10,
                unit:'minute'
            }];
        }else{
            arr = [{
                type:'popup',
                early:0,
                unit:'minute'
            }];
        }
        return arr;
    },

	onCancelFn:function(){
        var coverEl = this.bindEl;
        if(coverEl){
            var cview = this.cview;
            var event = coverEl.bindEvent;
            var eh = this.ehandler;
            if(!coverEl.hold){
                if('add' == this.action){
                    coverEl.remove();
                }else{
                    var color = eh.calendarSet[event.calendarId].color;
                    if(0 == event.startRow && this.rowCount == event.endRow){
                        if(this.oldColor != color){
                            eh.changeWholeColor(coverEl, this.oldColor, color);
                        }
                    }else{
                        if(this.oldColor != color){
                            if(cview instanceof Ext.ux.calendar.DayView){
                                eh.changeEventColor(coverEl, this.oldColor, color);
                            }else{
                                eh.changeLegendColor(coverEl, this.oldColor, color);
                            }
                        }
                    }
                }
            }
            this.hideEditor();
        }
	},
	
	popup:function(obj){
        var eh = this.ehandler;
        eh.floating = true;
        this.obj = obj;
        this.noLayout = obj.noLayout;
		this.bindEl = obj.bindEl;
        this.cview = obj.cview;
		this.action = obj.action;
        var lan = Ext.ux.calendar.Mask.Editor;
		if('add' == this.action){            
			this.deleteBtn.disable();
            this.setIconCls('icon_feyaCalendar_event_add');
            this.setTitle(lan['new.title']);
		}else{
			this.deleteBtn.enable();
            this.setTitle(lan['edit.title']);
            this.setIconCls('icon_feyaCalendar_event_edit');
		}  
		var d=this.adjustXY(this.bindEl)
        this.showAt(this.adjustXY(this.bindEl));
	},		
	
	adjustXY:function(pn){
        var pxy = pn.getXY();
        var cview = pn.cview;
		var xy = [0, 0];
        var w = this.width, h = this.height;
		var r = pxy[0]+w;
		xy[0] = pxy[0];
        var right = cview.body.getRight();
		if(r > right){
			xy[0] = right-w;
		}
		xy[1] = pxy[1]-h;
        var top = cview.body.getTop();
		if(xy[1] < top){
			if(pxy[1] > top){
				xy[1] = pxy[1]+20;
			}else{
				xy[1] = top+20;
			}
		}
		return xy;
	},

    reloadCalendar:function(eh){
        var store = this.calendarField.store;
        store.removeAll();
        for(var p in eh.calendarSet){
            var calendar = eh.calendarSet[p];
            if(true !== calendar.hide){
                var rd = new (store.model)({
                    id:calendar.id,
                    title:calendar.name,
                    description:calendar.description,
                    color:calendar.color
                });
                store.add(rd);
            }
        }
    },

    onShowFn:function(){
        var eh = this.ehandler;                
    	if(this.bindEl){
    		var coverEl = this.bindEl;    				
            if(!coverEl.hold){
                eh.setEditingStatus(coverEl, true);                
            }
    		var bindEvent = coverEl.bindEvent;
            var time = '<b>'+eh.generateInfo(bindEvent)+'</b>';
            this.timeField.setText(time);
            this.subjectField.setValue(bindEvent.subject);
            this.contentField.setValue(bindEvent.content);
            if(bindEvent.alertFlag){
                this.alertCB.setValue(true);
            }else{
                this.alertCB.setValue(false);
            }
            this.reloadCalendar(eh);
            this.calendarField.setValue(bindEvent.calendarId);
            this.oldColor = eh.calendarSet[bindEvent.calendarId].color;            
    	}else{
            
        }        
    },
    
    onHideFn:function(){
        var eh = this.ehandler;
        eh.floating = false;
        var cview = this.cview;
    	if(this.bindEl){            
            //cview.resizePort();
            cview.resetSCover();
    	}
        delete(this.bindEl);
        delete(this.cview);        
        delete(this.noLayout);
        delete(this.action)
    },

    hideEditor:function(){
        if(!this.hided){
            this.hided = true;
            this.showAt([-1000, -1000], true);
            this.fireEvent('hided');
        }
    },

    showAt:function(xy, hold){
        if(!hold){
            this.fireEvent('showed');
            delete(this.hided);
        }
        this.setPagePosition(xy[0], xy[1]);
    },
    onHideEditorFn:function(){
        if(!this.mdFlag){
            this.onCancelFn();
        }
    }
});
