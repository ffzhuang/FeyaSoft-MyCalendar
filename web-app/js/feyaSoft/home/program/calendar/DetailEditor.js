/**
 * FeyaSoft MyCalendar
 * Copyright(c) 2006-2010, FeyaSoft Inc. All right reserved.
 * info@feyasoft.com
 * http://www.feyasoft.com
 *
 * Please read license first before your use myCalendar, For more detail
 * information, please can visit our link: http://www.feyasoft.com.
 *
 * You need buy one of the Feyasoft's License if you want to use MyCalendar in
 * your product. You must not remove, obscure or interfere with any FeyaSoft
 * copyright, acknowledgment, attribution, trademark, warning or disclaimer
 * statement affixed to, incorporated in or otherwise applied in connection
 * with the Software and User Interface.
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
Ext.ns('Ext.ux.calendar');

Ext.ux.calendar.DetailEditor = function(config){
	Ext.apply(this, config);
    this.ehandler.applyCalendarSetting(this);
    var lan = Ext.ux.calendar.Mask.Editor;

	this.startDayField = this.startDayField || new Ext.form.DateField({
		fieldLabel:lan['startDayField.label'],
		value:new Date(),
		format:'Y-m-d',
        allowBlank: false,
        anchor:'95%',
        editable:false,
        disabled:this.singleDay
	});
    this.startDayField.on('select', this.onStartEndDayCheckFn, this);

	this.startTimeField = this.startTimeField || new Ext.form.ComboBox({
		hideLabel:true,
		labelSeparator:'',
		store:Ext.ux.calendar.Mask.getTimeStore(),
		displayField:'hour',
        valueField:'row' ,
        typeAhead:true,
        mode:'local',
        triggerAction:'all',
        selectOnFocus:true,
        allowBlank: false,
        editable:false,
        anchor:'95%'
	});
    this.startTimeField.on('select', this.onStartTimeSelectFn, this);

	this.endDayField = this.endDayField || new Ext.form.DateField({
		fieldLabel:lan['endDayField.label'],
		labelSeparator:'',
		format:'Y-m-d',
		value:new Date(),
        allowBlank: false,
        anchor:'95%',
        editable:false,
        disabled:this.singleDay
	});
    this.endDayField.on('select', this.onStartEndDayCheckFn, this);

	this.endTimeField = this.endTimeField || new Ext.form.ComboBox({
		hideLabel:true,
		labelSeparator:'',
		store: Ext.ux.calendar.Mask.getTimeStore(),
		displayField:'hour',
        valueField:'row' ,
        typeAhead:true,
        mode:'local',
        triggerAction:'all',
        selectOnFocus:true,
        allowBlank: false,
        editable:false,
        anchor:'95%'
	});

	this.wholeField = this.wholeField || new Ext.form.Checkbox({
		hideLabel:true,
		labelSeparator:'',
		boxLabel:lan['wholeField.label']
	});
    this.wholeField.on('check', this.onWholeCheck, this);

    this.repeatTypeField = this.repeatTypeField || new Ext.form.ComboBox({
        fieldLabel:lan['repeatTypeField.label'],		
		store: Ext.ux.calendar.Mask.getRepeatTypeStore(),
		displayField:'display',
        valueField:'value' ,
        typeAhead:true,
        mode:'local',
        triggerAction:'all',
        selectOnFocus:true,
        allowBlank: false,
        editable:false,
        anchor:'95%'
	});

    this.subjectField = this.subjectField || new Ext.form.TextField({
		fieldLabel:lan['subjectField.label'],
		anchor:'95%'
	});

	this.contentField = this.contentField || new Ext.form.TextArea({
		fieldLabel:lan['contentField.label'],
        height:70,
		anchor:'95%'
	});

    var tpl = '<tpl for=".">' +
        '<div class="x-combo-list-item">' +
            this.ehandler.cTplStr +
        '</div>' +
    '</tpl>';

    this.calendarField = this.calendarField || new Ext.form.ComboBox({
        fieldLabel:lan['calendarField.label'],		
		store:Ext.ux.calendar.Mask.getCalendarStore(),
		displayField:'title',
        valueField:'id' ,
        typeAhead:true,
        mode:'local',
        triggerAction:'all',
        selectOnFocus:true,
        allowBlank: false,
        anchor:'95%',
        editable:false,
        tpl:tpl
	});

    this.alertCB = this.alertCB || new Ext.form.Checkbox({
        labelSeparator:'',
        anchor:'95%',
        boxLabel:lan['alertCB.label'],
        handler:this.onAlertCheckFn,
        scope:this
    });

    this.lockCB = this.lockCB || new Ext.form.Checkbox({
        labelSeparator:'',
        anchor:'95%',
        boxLabel:lan['lockCB.label']
    });

    this.returnBtn = this.returnBtn || new Ext.Button({
        iconCls:'icon_feyaCalendar_door_out',
        text:lan['returnBtn.text'],
        handler:this.onReturnFn,
        scope:this
    });

	this.saveBtn = this.saveBtn || new Ext.Button({
		iconCls:'icon_feyaCalendar_accept',
		minWidth:80,
		text:lan['saveBtn.text'],
		handler:this.onSaveFn,
		scope:this
	});

	this.cancelBtn = this.cancelBtn || new Ext.Button({
		iconCls:'icon_feyaCalendar_cancel',
		minWidth:80,
		text:lan['cancelBtn.text'],
		handler:this.onCancelFn,
		scope:this
	});

    this.timepanel = this.timepanel || new Ext.Panel({
        border:false,
        layout:'column',
        items:[{
            columnWidth:.32,
            border:false,
            layout:'form',
            items:[this.startDayField]
        }, {
            columnWidth:.15,
            border:false,
            layout:'form',
            items:[this.startTimeField]
        }, {
            columnWidth:.22,
            border:false,
            layout:'form',
            labelWidth:15,
            items:[this.endDayField]
        }, {
            columnWidth:.15,
            border:false,
            layout:'form',
            items:[this.endTimeField]
        }, {
            columnWidth:.15,
            border:false,            
            items:[this.wholeField]
        }]
    });

    this.repeatIntervalField = this.repeatIntervalField || new Ext.form.NumberField({
        fieldLabel:lan['repeatIntervalField.label'],        
        labelSeparator:'',
        value:1,
        allowBlank: false,
        anchor:'95%',
        validator:function(v){
            if(v && 0 < v){
                var str = v.toString();
                if(-1 == str.indexOf('.')){
                    return true;
                }
            }
            return Ext.ux.calendar.Mask.Editor['repeatIntervalInvalid'];
        }
    });
    this.repeatIntervalField.on('valid', this.onRepeatIntervalValidFn, this);

    this.intervalUnitLabel = this.intervalUnitLabel || new Ext.util.LabelField({
        hideLabel:true,
        labelSeparator:''        
    });

    this.repeatStartField = this.repeatStartField || new Ext.form.DateField({
        fieldLabel:lan['repeatStartField.label'],	
		format:'Y-m-d',
        allowBlank: false,
        anchor:'90%',
        sender:this,
        validator:function(v){
            var ed = this.sender.repeatEndDateField;            
            if(ed.disabled || v <= ed.getValue().format('Y-m-d')){
                return true;
            }
            return Ext.ux.calendar.Mask.Editor['repeatBeginDayInvalid'];
        }
    });
    this.repeatStartField.on('select', this.onRepeatStartSelectFn, this);

    this.repeatNoEndRG = this.repeatNoEndRG || new Ext.form.Radio({
        boxLabel:lan['repeatNoEndRG.label'],
        name:'repeat-end-type'        
    });

    this.repeatEndTimeRG = this.repeatEndTimeRG || new Ext.form.Radio({
        boxLabel:lan['repeatEndTimeRG.label'],
        name:'repeat-end-type'
    });

    this.repeatEndTimeField = this.repeatEndTimeField || new Ext.form.NumberField({
        width:50,
        value:10,
        allowBlank:false,
        disabled:true,
        validator:function(v){
            if(0 < v){
                return true;
            }
            return Ext.ux.calendar.Mask.Editor['repeatTimeInvalid']
        }
    });
    
    this.repeatEndDateRG = this.repeatEndDateRG || new Ext.form.Radio({
        boxLabel:lan['repeatEndDateRG.label'],
        name:'repeat-end-type'
    });

    this.repeatEndDateField = this.repeatEndDateField || new Ext.form.DateField({
        hideLabel:true,
		labelSeparator:'',
		format:'Y-m-d',
        allowBlank: false,
        anchor:'90%',
        disabled:true,
        value:(new Date()).add(Date.DAY, 365),
        sender:this,
        validator:function(v){
            var sd = this.sender.repeatStartField;
            if(v >= sd.getValue().format('Y-m-d')){
                return true;
            }
            return Ext.ux.calendar.Mask.Editor['repeatEndDayInvalid'];
        }
    });
    var checkListener = {
        'check':{
            fn:this.refreshRepeatInfo,
            scope:this
        }
    };
    var items = [];
    var nd = new Date();
    var n = nd.format('N');
    var mon = nd.add(Date.DAY, 1-n);
    for(var i = 0; i < 7; i++){
        items.push({
            boxLabel:mon.add(Date.DAY, i).format('D'),
            listeners:checkListener
        });
    }
    
    this.weekCheckGroup = this.weekCheckGroup || new Ext.form.CheckboxGroup({
        fieldLabel:lan['weekCheckGroup.label'],
        items:items,
        anchor:'100%'
    });

    this.monthRadioGroup = this.monthRadioGroup || new Ext.form.RadioGroup({
        fieldLabel:lan['monthRadioGroup.label'],
        items:[{
            boxLabel:lan['repeatByDate'],
            name:'repeat-month-group',
            checked:true
        }, {
            boxLabel:lan['repeatByDay'],
            name:'repeat-month-group',
            listeners:checkListener
        }],
        anchor:'60%'
    });

    this.alertContainer = this.alertContainer || new Ext.Panel({
        hidden:!(Ext.ux.calendar.CONST.VERSION >= '2.0.5'),
        sender:this,
        border:false,
        autoHeight:true,
        style:'padding: 0 0 0 100px;',
        buttons:[{
            text:lan['newAlertBtn.text'],
            handler:this.onAddAlertSettingFn,
            scope:this
        }],
        buttonAlign:'left'
    });

	this.generalForm = this.generalForm || new Ext.form.FormPanel({
		border:false,
		style:'padding:10px;',
        frame:true,
        autoHeight:true,
		labelWidth:80,
		items:[
			this.timepanel,
            this.subjectField,
			this.contentField,
            this.calendarField,
            this.alertCB,
            this.alertContainer,
            this.lockCB
		]		
	});

    this.repeatInfoPanel = this.repeatInfoPanel || new Ext.Panel({
        border:false,        
        html:'<div class="x-repeat-event-info-ct"><div class="x-repeat-event-info"></div></div>'
    });

    var cws;
    if(Ext.isIE){        
        if('3.0.3' == Ext.version){
            cws = [0.4, 0.2, 0.38, 0.4, 0.6];
        }else{
            cws = [0.2, 0.1, 0.3, 0.2, 0.3];
        }
    }else{
        cws = [0.4, 0.2, 0.38, 0.4, 0.6];
    }
    this.repeatForm = this.repeatForm || new Ext.form.FormPanel({
        border:false,
		style:'padding:10px;',
        frame:true,
        autoHeight:true,
		labelWidth:80,
		items:[
            this.repeatTypeField,
            {                
                border:false,                
                style:'padding-left:85px;',
                layout:'column',
                items:[{
                    border:false,
                    columnWidth:.25,
                    layout:'form',
                    items:[this.repeatIntervalField]
                }, {
                    border:false,
                    columnWidth:.2,                    
                    items:[this.intervalUnitLabel]
                }]
            },
            this.repeatInfoPanel,
            {                
                border:false,               
                style:'padding-left:85px;',
                layout:'form',
                items:[this.weekCheckGroup]
            }, {                
                border:false,                
                style:'padding-left:85px;',
                layout:'form',
                items:[this.monthRadioGroup]
            }, {                
                border:false,
                style:'padding-left:85px;',
                layout:'column',
                items:[{
                    border:false,
                    columnWidth:.5,
                    layout:'form',
                    labelWidth:75,
                    items:[this.repeatStartField]
                }, {
                    border:false,
                    columnWidth:.5,
                    items:[
                        this.repeatNoEndRG,
                        {
                            border:false,
                            layout:'column',
                            items:[{
                                border:false,
                                columnWidth:cws[0],
                                items:[this.repeatEndTimeRG]
                            }, {
                                border:false,
                                columnWidth:cws[1],
                                items:[this.repeatEndTimeField]
                            }, {
                                border:false,
                                columnWidth:cws[2],
                                layout:'form',
                                labelWidth:95,
                                items:[{
                                    xtype:'textfield',
                                    fieldLabel:lan['repeatEndTimeUnit'],
                                    labelSeparator:'',
                                    hidden:true
                                }]
                            }]
                        },
                        {
                            border:false,
                            layout:'column',
                            items:[{
                                border:false,
                                columnWidth:cws[3],
                                items:[this.repeatEndDateRG]
                            }, {
                                border:false,
                                columnWidth:cws[4],
                                layout:'form',                                
                                items:[this.repeatEndDateField]
                            }]
                        }
                    ]
                }]
            }
        ]
    });
        
	Ext.ux.calendar.DetailEditor.superclass.constructor.call(this, {		        
        items:[{            
            border:false,                        
            items:[
                this.generalForm,
                this.repeatForm
            ]
        }],        
		buttons:[this.returnBtn, this.saveBtn, this.cancelBtn]
	});
    this.addEvents(
        'showdetailsetting'
    );
    this.repeatTypeField.on('select', this.onRepeatTypeSelectFn, this);
    this.calendarField.on('select', this.onCalendarSelectFn, this);
    this.repeatNoEndRG.on('check', this.onRepeatNoEndCheckFn, this);
    this.repeatEndTimeRG.on('check', this.onRepeatEndTimeCheckFn, this);
    this.repeatEndDateRG.on('check', this.onRepeatEndDateCheckFn, this);
};

Ext.extend(Ext.ux.calendar.DetailEditor, Ext.ux.calendar.BasicView, {
    border:false,

    autoScroll:true,    

    buttonAlign:'center',
    
    onRepeatIntervalValidFn:function(){
        this.refreshRepeatInfo();
    },

    onRepeatStartSelectFn:function(df){
        this.refreshRepeatInfo();
    },

    refreshRepeatInfo:function(){
        var beginDate = this.repeatStartField.getValue();
        var intervalSlot = this.repeatIntervalField.getValue();
        var getIntervalText = Ext.ux.calendar.Mask.getIntervalText;
        var lan = Ext.ux.calendar.Mask.Editor;
        var v = this.repeatTypeField.getValue();
        var str = '';
        if('day' == v){
            this.updateRepeatInfo(getIntervalText(v, intervalSlot));
        }else if('week' == v){
            var monday = beginDate.add(Date.DAY, 1-beginDate.format('N'));
            var cbs = this.weekCheckGroup.items;
            var num = 0;
            for(var i = 0, len = cbs.getCount(); i < len; i++){
                var cb = cbs.get(i);
                if(cb.getValue()){
                    num++;
                    str += monday.add(Date.DAY, i).format('l')+' ';
                }
            }
            if(7 == num){
                str = lan['repeatDayInfo'];
            }else if(0 == num){
                str = beginDate.format('l')
            }
            this.updateRepeatInfo(getIntervalText(v, intervalSlot)+str);
        }else if('month' == v){
            var rds = this.monthRadioGroup.items;
            if(rds.get(1).getValue()){
                str = Ext.ux.calendar.Mask.getWeekDayInMonth(beginDate);
            }else{
                str = beginDate.format('d');
            }
            this.updateRepeatInfo(getIntervalText(v, intervalSlot)+str);
        }else if('year' == v){
            this.updateRepeatInfo(getIntervalText(v, intervalSlot)+beginDate.format('m-d'));
        }
    },

    updateRepeatInfo:function(html){
        var div = this.repeatInfoPanel.body.dom.firstChild.firstChild;
        div.innerHTML = html;
    },

    onRepeatTypeSelectFn:function(combo, rd, index){
        var v = combo.getValue();        
        this.resetRepeatSetting(v, this.bindEl.bindEvent);
    },

    resetRepeatSetting:function(v, event){
        var rt = event.repeatType || 'no';        
        var lan = Ext.ux.calendar.Mask.Editor;
        var items = this.repeatForm.items;
        if('no' == v || 'exception' == v){
            items.get(1).hide();
            items.get(2).hide();
            items.get(3).hide();
            items.get(4).hide();
            items.get(5).hide();
        }else{
            items.get(1).show();
            items.get(2).show();            
            if('day' == v || 'year' == v){
                if('day' == v){
                    this.intervalUnitLabel.setText(lan['intervalUnitLabel.day.text']);                    
                }else{
                    this.intervalUnitLabel.setText(lan['intervalUnitLabel.year.text']);                    
                }
                items.get(3).hide();
                items.get(4).hide();
            }else if('week' == v){
                this.intervalUnitLabel.setText(lan['intervalUnitLabel.week.text']);
                items.get(3).show();
                this.weekCheckGroup.reset();
                var cbs = this.weekCheckGroup.items;                              
                if('string' != Ext.type(rt)){
                    var rday = rt.rday;                    
                    for(var p in rday){                        
                        cbs.get(p-1).setValue(true);                        
                    }                    
                }                
                items.get(4).hide();
            }else if('month' == v){
                this.intervalUnitLabel.setText(lan['intervalUnitLabel.month.text']);
                items.get(3).hide();
                items.get(4).show();
                this.monthRadioGroup.reset();
                var rds = this.monthRadioGroup.items;                
                if('string' != Ext.type(rt)){
                    var rby = rt.rby;
                    if('day' == rby){
                        rds.get(1).setValue(true);                        
                    }else{
                        rds.get(0).setValue(true);                        
                    }
                }                
            }            
            items.get(5).show();
            this.repeatForm.doLayout();
            this.repeatNoEndRG.checked = false;
            this.repeatEndTimeRG.checked = false;
            this.repeatEndDateRG.checked = false;
            if('string' != Ext.type(rt)){
                this.repeatIntervalField.setValue(rt.intervalSlot);
                this.repeatStartField.setValue(rt.beginDay);
                if('no' == rt.endDay){
                    if(false != Ext.type(rt.rtime)){
                        this.repeatEndTimeRG.setValue(true);
                        this.repeatEndTimeField.setValue(rt.rtime)
                    }else{
                        this.repeatNoEndRG.setValue(true);
                    }
                }else{
                    this.repeatEndDateRG.setValue(true);
                    this.repeatEndDateField.setValue(rt.endDay);
                }
            }else{
                if('day' == v){
                    this.repeatIntervalField.setValue(Ext.ux.calendar.Mask.getDayOffset(event.day, event.eday)+1);
                }else{
                    this.repeatIntervalField.setValue(1);
                }
                this.repeatStartField.setValue(event.day);
                this.repeatNoEndRG.setValue(true);
            }
            this.refreshRepeatInfo();
        }        
    },

    onRepeatNoEndCheckFn:function(cb, checked){
        if(checked){
            this.repeatEndTimeField.disable();
            this.repeatEndDateField.disable();
        }
    },

    onRepeatEndTimeCheckFn:function(cb, checked){        
        if(checked){
            this.repeatEndTimeField.enable();
            this.repeatEndDateField.disable();
        }
    },

    onRepeatEndDateCheckFn:function(cb, checked){
        if(checked){
            this.repeatEndTimeField.disable();
            this.repeatEndDateField.enable();            
        }
        this.repeatEndDateField.setValue(this.repeatEndDateField.getValue());
        //this.repeatEndDateField.isValid();
    },

    onReturnFn:function(){
        var calendarContainer = this.ownerCt;
        var cview = this.bview;
        calendarContainer.getLayout().setActiveItem(cview);
        cview.checkLayout(true);        
    },

    onStartEndDayCheckFn:function(df){
        var sdate = this.startDayField.getValue();
        var sday = sdate.format('Y-m-d');
        var edate = this.endDayField.getValue();
        var eday = edate.format('Y-m-d');
        if(sday >= eday){
            if(df == this.startDayField){
                this.endDayField.setValue(sdate);
            }else if(df == this.endDayField){
                this.startDayField.setValue(edate);
            }
            var sv = this.startTimeField.getValue();
            var ev = this.endTimeField.getValue();
            this.reloadEndTimeStore(sv);
            if(sv > ev){
                ev = sv+this.numInHour;
                if(ev >= this.activeEndRow){
                    ev = this.activeEndRow-1;
                }
                this.endTimeField.setValue(ev);
            }
        }
    },

	reloadStartTimeStore:function(all){
        var store = this.startTimeField.store;
        store.removeAll();
        var data;
        if(all || !this.hideInactiveRow){
            data = Ext.ux.calendar.Mask.generateIntervalData(this.intervalSlot, 0, this.rowCount-1, this.ehandler.hourFormat);
        }else{
            data = Ext.ux.calendar.Mask.generateIntervalData(this.intervalSlot, this.activeStartRow, this.activeEndRow-1, this.ehandler.hourFormat);
        }
        store.loadData(data);
    },

    reloadEndTimeStore:function(sIndex, all){
        var store = this.endTimeField.store;
        store.removeAll();
        var data;
        if(all){
            data = Ext.ux.calendar.Mask.generateIntervalData(this.intervalSlot, 0, this.rowCount, this.ehandler.hourFormat);
        }else{
            if(false == Ext.type(sIndex)){
                sIndex = this.activeStartRow;
            }else{
                sIndex++;
            }
            if(this.hideInactiveRow){
                data = Ext.ux.calendar.Mask.generateIntervalData(this.intervalSlot, sIndex, this.activeEndRow, this.ehandler.hourFormat);
            }else{
                data = Ext.ux.calendar.Mask.generateIntervalData(this.intervalSlot, sIndex, this.rowCount, this.ehandler.hourFormat);
            }
        }
        store.loadData(data);
    },

    onStartTimeSelectFn:function(combo, rd, index){
        var v = combo.getValue();
        var eIndex;
        var sday = this.startDayField.getValue().format('Y-m-d');
        var eday = this.endDayField.getValue().format('Y-m-d');
        if(this.bindEl){
            var event = this.bindEl.bindEvent;
            if(sday != eday){
                this.reloadEndTimeStore();
            }else{
                var span = event.endRow-event.startRow;
                eIndex = v+span;
                this.reloadEndTimeStore(v);
            }
        }
        if(false != Ext.type(eIndex)){
            if(this.activeEndRow >= eIndex){
                this.endTimeField.setValue(eIndex);
            }else{
                this.endTimeField.setValue(this.activeEndRow);
            }
        }
    },

    onCalendarSelectFn:function(combo, rd, index){
        var coverEl = this.bindEl;
        if(coverEl && !coverEl.hold){
            var event = coverEl.bindEvent;
            var cview = coverEl.cview;
            var eh = cview.ehandler;
            var color = eh.calendarSet[rd.data.id].color;
            var arr = Ext.DomQuery.select('div[name=x-event-'+event.day+'-'+event.eday+'-'+event.eventId+']', cview.body.dom);
            for(var i = 0, len = arr.length; i < len; i++){
                coverEl = Ext.get(arr[i]);
                if(coverEl instanceof Ext.Element){
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
        }
        this.oldColor = color;
    },
    
    onWholeCheck:function(){
        var sday = this.startDayField.getValue().format('Y-m-d');
        var eday = this.endDayField.getValue().format('Y-m-d');
    	if(this.bindEl){
        	var event = this.bindEl.bindEvent;
        	if(this.wholeField.checked){
                var getHMFromRow = Ext.ux.calendar.Mask.getHMFromRow;
                this.reloadStartTimeStore(true);
                this.reloadEndTimeStore(null, true);
                this.startTimeField.setRawValue(getHMFromRow(this.intervalSlot, 0, this.hourFormat));
	            this.endTimeField.setRawValue(getHMFromRow(this.intervalSlot, this.rowCount, this.hourFormat));
	            this.startTimeField.disable();
	            this.endTimeField.disable();
			}else{
	            var startRow, endRow;
	            startRow = (this.activeStartRow <= event.startRow)?event.startRow:this.activeStartRow;
	            endRow = (this.activeEndRow >= event.endRow)?event.endRow:this.activeEndRow-1;
                this.reloadStartTimeStore();
	            this.startTimeField.setValue(startRow);
                if(sday == eday && this.rowCount != event.endRow){
                    this.reloadEndTimeStore(startRow);
                }else{
                    this.reloadEndTimeStore();
                }
	            this.endTimeField.setValue(endRow);
	            this.startTimeField.enable();
	            this.endTimeField.enable();
            }            
            this.startDayField.setValue(event.day);
            this.endDayField.setValue(event.eday);
        }
    },

    checkAlertValid:function(){
        var flag = true;
        this.alertContainer.items.each(function(it){
            if(!it.isValid()){
                flag = false;
                return false;
            }
        });
        return flag;
    },

	onSaveFn:function(){
		if(this.generalForm.getForm().isValid() && this.repeatForm.getForm().isValid() && this.checkAlertValid()){
			if(this.bindEl){
				var coverEl = this.bindEl;
				var event = coverEl.bindEvent;
                var oevent = Ext.apply({}, event);
				var cview = coverEl.cview;
				var eh = cview.ehandler;
				if('add' == this.action && !coverEl.hold){
		    		coverEl.remove();
		    	}
                // check whether this is all day
                if(this.wholeField.checked){
                    event.allDay = true;
                    event.startRow = 0;
                    event.endRow = this.rowCount;
                }else{
                    event.startRow = parseInt(this.startTimeField.getValue());
                    event.endRow = parseInt(this.endTimeField.getValue());
                }
                event.day = this.startDayField.getValue().format('Y-m-d');
                var edate = this.endDayField.getValue();
                if(0 == event.endRow){
                    edate = edate.add(Date.DAY, -1);
                    event.endRow = this.rowCount;
                }
                event.eday = edate.format('Y-m-d');
                event.subject = this.subjectField.getValue();
				event.content = this.contentField.getValue();
                event.calendarId = this.calendarField.getValue();
                event.color = eh.calendarSet[event.calendarId].color;
                if(this.alertCB.checked){
                    event.alertFlag = this.getAlertSetting();                    
                }else{
                    delete(event.alertFlag);                    
                }
                event.locked = this.lockCB.checked || false;
                // continue in repeat type
                event = this.handleRepeatType(event);

		        if('add' == this.action){
                    if('string' == Ext.type(event.repeatType)){
                        eh.createEvent(event, cview);
                    }else{
                        eh.createRepeatEvent(event, cview);
                    }
		        }else if('update' == this.action){
                    if(!Ext.ux.calendar.Mask.isEqualObj(oevent, event)){
                        if('string' == Ext.type(oevent.repeatType) && 'string' == Ext.type(event.repeatType)){
                            event.repeatType = oevent.repeatType;
                            eh.updateEvent(event, cview, null, oevent, this.noLayout);
                        }else{
                            if('string' != Ext.type(oevent.repeatType)){
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
			this.onReturnFn();
		}
	},

    handleRepeatType:function(e){        
        var event = Ext.apply({}, e);
        var nrt = this.repeatTypeField.getValue();
        if('no' == nrt){
            event.repeatType = 'no';
        }else{
            var o = {
                rtype:nrt,
                intervalSlot:this.repeatIntervalField.getValue(),
                dspan:Ext.ux.calendar.Mask.getDayOffset(e.day, e.eday),
                beginDay:this.repeatStartField.getValue().format('Y-m-d')
            };            
            if(this.repeatNoEndRG.checked){
                o.endDay = 'no';
            }else if(this.repeatEndTimeRG.getValue()){
                o.endDay = 'no';
                o.rtime = this.repeatEndTimeField.getValue();
            }else if(this.repeatEndDateRG.getValue()){
                o.endDay = this.repeatEndDateField.getValue().format('Y-m-d');
            }
            if('week' == nrt){
                var obj = {};
                var items = this.weekCheckGroup.items;
                var flag = false;
                for(var i = 0, len = items.getCount(); i < len; i++){
                    var it = items.get(i);
                    if(it.getValue()){
                        flag = true;
                       obj[i+1] = true;
                    }
                }
                if(!flag){
                    var n = Date.parseDate(event.day, 'Y-m-d').format('N');
                    obj[n] = true;
                }
                o.rday = obj;
            }else if('month' == nrt){
                var items = this.monthRadioGroup.items;
                if(true == items.get(0).getValue()){
                    o.rby = 'date';
                }else{
                    o.rby = 'day';
                }
            }
            event.repeatType = o;
        }        
        return event;
    },

	onCancelFn:function(){
        var coverEl = this.bindEl;
         var coverEl = this.bindEl;
        if(coverEl){
            var cview = coverEl.cview;
            var event = coverEl.bindEvent;
            var eh = cview.ehandler;
            if(!coverEl.hold){
                if('add' == this.action){
                    this.bindEl.remove();
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
            this.onReturnFn();
        }
	},

	setup:function(obj){
        this.noLayout = obj.noLayout;
		this.bindEl = obj.bindEl;
		this.action = obj.action;
        this.bview = obj.cview;
        if(this.bindEl){            
    		var coverEl = this.bindEl;
    		var cview = coverEl.cview;
    		var eh = cview.ehandler;
            if(coverEl instanceof Ext.Element){
                eh.setEditingStatus(coverEl, true);
            }
    		var bindEvent = coverEl.bindEvent;
            // check whether it is whole day
            if(bindEvent.endRow == this.rowCount && bindEvent.startRow == 0){
                this.wholeField.setValue(true);
            }else{
                if(this.wholeField.getValue()){
                    this.wholeField.setValue(false);
                }else{
                    this.reloadStartTimeStore();
                    if(bindEvent.day != bindEvent.eday){
                        this.reloadEndTimeStore();
                    }else{
                        this.reloadEndTimeStore(bindEvent.startRow);
                    }
                }
            }
            this.repeatStartField.setValue(bindEvent.day);
			this.startTimeField.setValue(bindEvent.startRow);
			this.endTimeField.setValue(bindEvent.endRow);
            this.subjectField.setValue(bindEvent.subject);
			this.contentField.setValue(bindEvent.content);
			this.startDayField.setValue(bindEvent.day);
            this.endDayField.setValue(bindEvent.eday);
            var v = 'no';
            var rt = bindEvent.repeatType;            
            if(rt && 'string' != Ext.type(rt)){
                v = rt.rtype;
            }
            if('exception' == v){
                v = 'no';
            }
            this.repeatTypeField.setValue(v);
            this.resetRepeatSetting(v, bindEvent);
            var alertFlag = bindEvent.alertFlag;
            if(alertFlag){
                this.alertCB.setValue(true);                
                this.setupAlertSetting(alertFlag);
            }else{
                this.alertCB.setValue(false);
                this.resetAlertSetting(alertFlag);                
            }
            if(bindEvent.locked){
                this.lockCB.setValue(true);
            }else{
                this.lockCB.setValue(false);
            }
            this.reloadCalendar(eh);
            this.calendarField.setValue(bindEvent.calendarId);
            this.oldColor = eh.calendarSet[bindEvent.calendarId].color;           
    	} else {
            this.wholeField.setValue(true);
        }
        this.generalForm.doLayout();
        this.repeatForm.doLayout();
	},	

    reloadCalendar:function(eh){
        var store = this.calendarField.store;
        store.removeAll();
        for(var p in eh.calendarSet){
            var calendar = eh.calendarSet[p];
            if(true !== calendar.hide){
                var rd = new (store.recordType)({
                    id:calendar.id,
                    title:calendar.name,
                    description:calendar.description,
                    color:calendar.color
                });
                store.add(rd);
            }
        }
    },

    onAlertCheckFn:function(cb, checked){
        if(Ext.ux.calendar.CONST.VERSION >= '2.0.5'){
            if(checked){
                this.alertContainer.show();
                if(!this.alertContainer.items || 0 == this.alertContainer.items.getCount()){
                    this.alertContainer.add(new Ext.ux.calendar.AlertSetting({
                        onRemoveAlertFn:this.onRemoveAlertFn
                    }));
                    this.alertContainer.doLayout();
                }
            }else{
                this.alertContainer.hide();
            }
        }
    },

    getAlertSetting:function(){
        if(Ext.ux.calendar.CONST.VERSION >= '2.0.5'){
            var arr = [];
            var act = this.alertContainer;
            for(var i = 0, len = act.items.getCount(); i < len; i++){
                arr.push(act.items.get(i).getSetting());
            }
            return arr;
        }else{
            return [{
                type:'popup',
                early:0,
                unit:'minute'
            }];
        }
    },    

    onAddAlertSettingFn:function(){
        this.alertContainer.add(new Ext.ux.calendar.AlertSetting({
            onRemoveAlertFn:this.onRemoveAlertFn
        }));
        this.alertContainer.doLayout();        
    },

    resetAlertSetting:function(){
        if(Ext.ux.calendar.CONST.VERSION >= '2.0.5'){
            var act = this.alertContainer;
            act.items.each(function(it){
                act.remove(it, true);
            });
            this.alertContainer.hide();
        }
    },

    setupAlertSetting:function(alertSetting){
        if(Ext.ux.calendar.CONST.VERSION >= '2.0.5'){
            this.alertContainer.show();
            var act = this.alertContainer;
            if(alertSetting && 0 < alertSetting.length){
                var len = alertSetting.length;
                var count = act.items.getCount();
                for(var i = count; i < len; i++){
                    act.add(new Ext.ux.calendar.AlertSetting({
                        onRemoveAlertFn:this.onRemoveAlertFn
                    }));
                }
                for(var i = 0; i < len; i++){
                    var as = act.items.get(i);
                    as.setup(alertSetting[i]);
                }
                this.alertContainer.doLayout();
            }
        }
    },

    onRemoveAlertFn:function(){
        var ct = this.ownerCt;
        ct.remove(this, true);
        if(0 == ct.items.getCount()){
            ct.sender.alertCB.setValue(false);
        }else{
            ct.doLayout();
        }
    }
});

Ext.ux.calendar.AlertSetting = function(config){
    Ext.apply(this, config);

    var lan = Ext.ux.calendar.Mask.Editor;
    
    this.deleteAlertBtn = this.deleteAlertBtn || new Ext.Button({
        text:lan['deleteAlertBtn.label'],
        handler:this.onRemoveAlertFn,
        scope:this
    });

    this.alertTypeField = this.alertTypeField || new Ext.form.ComboBox({
        hideLabel:true,
        labelSeparator:'',
		store:Ext.ux.calendar.Mask.getAlertTypeStore(),
		displayField:'display',
        valueField:'value' ,
        typeAhead:true,
        mode:'local',
        triggerAction:'all',
        selectOnFocus:true,
        allowBlank: false,
        anchor:'99%',
        editable:false,
        value:'popup'
	});
    this.alertTypeField.on('select', this.onAlertTypeSelectFn, this);

    this.alertEarlyTimeField = this.alertEarlyTimeField || new Ext.form.NumberField({
        hideLabel:true,
        labelSeparator:'',
        anchor:'99%',
        value:30,
        sender:this,
        validator:this.alertEarlyTimeValidator,
        allowBlank:false
    });

    this.alertUnitField = this.alertUnitField || new Ext.form.ComboBox({
        hideLabel:true,
        labelSeparator:'',
		store:Ext.ux.calendar.Mask.getAlertUnitStore(),
		displayField:'display',
        valueField:'value' ,
        typeAhead:true,
        mode:'local',
        triggerAction:'all',
        selectOnFocus:true,
        allowBlank: false,
        anchor:'99%',
        editable:false,
        value:'minute'
	});
    this.alertUnitField.on('select', this.onAlertUnitSelectFn, this);

    this.alertEarlyField = this.alertEarlyField || new Ext.form.TextField({
        fieldLabel:'&nbsp;'+lan['alertEarly.label'],
        labelSeparator:'',
        hidden:true
    });

    Ext.ux.calendar.AlertSetting.superclass.constructor.call(this, {
        items:[{
            border:false,
            layout:'column',
            items:[{
                border:false,
                columnWidth:.35,
                layout:'form',
                items:[this.alertTypeField]
            }, {
                border:false,
                columnWidth:.15,
                layout:'form',
                items:[this.alertEarlyTimeField]
            }, {
                border:false,
                columnWidth:.25,
                layout:'form',
                items:[this.alertUnitField]
            }, {
                border:false,
                columnWidth:.1,
                layout:'form',
                items:[this.alertEarlyField]
            }, {
                border:false,
                columnWidth:.15,
                items:[this.deleteAlertBtn]
            }]
        }]
    });
};

Ext.extend(Ext.ux.calendar.AlertSetting, Ext.Panel, {
    border:false,

    style:'padding: 0 0 0 5px;',

    autoHeight:true,

    labelWidth:50,

    onRemoveAlertFn:Ext.emptyFn,

    setup:function(setting){
        this.alertTypeField.setValue(setting.type);
        this.alertUnitField.setValue(setting.unit);
        this.alertEarlyTimeField.setValue(setting.early);
        this.onAlertTypeSelectFn();
    },

    getSetting:function(){
        return {
            type:this.alertTypeField.getValue(),
            early:this.alertEarlyTimeField.getValue(),
            unit:this.alertUnitField.getValue()
        };
    },

    onAlertTypeSelectFn:function(){                
        var alertType = this.alertTypeField.getValue();
        var store = this.alertUnitField.store;
        store.removeAll();
        var lan = Ext.ux.calendar.Mask.Mask;        
        if('popup' == alertType){
            store.loadData(lan['popupAlertUnit']);
        }else if('email' == alertType){
            store.loadData(lan['alertUnit']);
        }
        this.alertEarlyTimeField.setValue(this.alertEarlyTimeField.getValue());
    },

    onAlertUnitSelectFn:function(){
        this.alertEarlyTimeField.setValue(this.alertEarlyTimeField.getValue());
    },
    
    alertEarlyTimeValidator:function(v){
        var alertType = this.sender.alertTypeField.getValue();
        var unit = this.sender.alertUnitField.getValue();
        if(0 <= v){
            if('popup' == alertType){
                if('hour' == unit){
                    v = 60*v;
                }
                if(v <= 24*60){
                    return true;
                }
                return Ext.ux.calendar.Mask.Editor['popupAlertEarlyInvalid'];
            }else if('email' == alertType){                
                if('hour' == unit){
                    v = 60*v;
                }else if('day' == unit){
                    v = 60*24*v;
                }else if('week' == unit){
                    v = 60*24*7*v;
                }
                if(30 <= v){
                    return true;
                }
                return Ext.ux.calendar.Mask.Editor['emailAlertEarlyInvalid'];
            }
        }        
    },
    
    isValid:function(){
        return this.alertEarlyTimeField.isValid();
    }
});

