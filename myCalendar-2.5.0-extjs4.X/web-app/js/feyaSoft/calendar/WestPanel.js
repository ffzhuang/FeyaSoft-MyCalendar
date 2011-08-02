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
	
Ext.define('Ext.ux.calendar.WestPanel', {
    extend : 'Ext.Panel',
    border : false,
    initComponent : function() {
        var eh = this.ehandler;
        eh.applyCalendarSetting(this);
        this.ds = eh.ds;
        var lan = Ext.ux.calendar.Mask.WestPanel;
        this.datePicker = new Ext.util.DatePicker({
        	style:'border:1px solid #a3bad9;',
        	cls:'x-west-datepicker',
            value : new Date(),
            startDay : this.startDay
        });
        this.poweredBy = "http://www.feyasoft.com";
        /*
			 * for my calendar panel
			 */
        /*=================Begin:No share function==================*/
        this.showAllBtn = new Ext.Button({
            iconCls : 'icon_feyaCalendar_calendar_show',
            text : lan['myShowAllBtn.text'],
            handler : this.onShowAllFn,
            scope : this
        });
	
        this.addBtn = new Ext.Button({
            iconCls : 'icon_feyaCalendar_add_calendar',
            text : lan['myAddBtn.text'],
            handler : this.onAddFn,
            scope : this
        });
        var bbar = [this.showAllBtn, '->'];
        if (!this.readOnly) {
            bbar.push(this.addBtn);
        }
        this.myCalendarPanel = new Ext.Panel({
            //style : 'padding-top:5px;',
            region : 'center',
            iconCls : 'icon_feyaCalendar_calendar',
            title : lan['myCalendarPanel.title'],
            bodyStyle : 'padding:2px;background-color:white;overflow-x:hidden;position:relative;border:#99bce8 solid 1px;',
            border:true,
            frame:true,
            autoScroll : true,
            bbar : bbar
        });
        this.myCalendarPanel.on('render', this.onMyCalendarRenderFn, this);
	
        this.formpanel = new Ext.form.FormPanel({
            border : false,
            cls : 'x-calendar-container',
            style : 'padding:0px 10px 10px 12px;',
            layout : 'border',
            items : [{
                border : false,
                region : 'north',
                height : 210,
                style : 'padding:5px 0px 0px 0px;',
                cls : 'x-dayview-west-date-span',
                //baseCls: 'x-panel-body-default-framed',
                items : [this.datePicker]
            }, this.myCalendarPanel]
        });
        Ext.apply(this, {
            border : false,
            layout : 'fit',
            //title:'www.cubedrive.com',
            //iconCls: 'icon_feyaCalendar_feyasoft',
            cls : 'x-calendar-west',
            collapsible : true,
            region : 'west',
            minWidth : 200,
            width : 200,
            cmargins:'35 5 5 5',
            items : [this.formpanel]
        });
        Ext.ux.calendar.WestPanel.superclass.initComponent.apply(this,arguments);
        this.addEvents('changedate');
        this.datePicker.on('render', this.onDatePickerRenderFn, this);
        this.datePicker.on('select', this.onSelectFn, this);
        this.on('changedate', this.changeDateLabel, this);
        this.on('render', this.onRenderFn, this);
        this.on('afterlayout', this.onAfterlayoutFn, this);
    },
    onAfterlayoutFn:function(){
        var f= this.el.first();
        f.removeCls('x-panel-header-default-top');
        f.removeCls('x-panel-header-default');
        this.body.removeCls('x-panel-body-default');
		  
    },
    onOtherCalendarRenderFn : function(p) {
        var eh = this.ehandler;
        eh.renderSharedCalendar(p.body);
    },
	
    onRenderFn : function(p) {
        p.header.on('click', this.onHeaderClickFn, this);
    },
	
    onHeaderClickFn : function(e) {
        var target = e.getTarget();
        var tgEl = Ext.get(target);
        if (tgEl.hasClass('x-calendar-link')) {
            window.open(this.poweredBy, '_blank');
        }
    },
	
    onShowAllFn : function() {
        this.ehandler.onShowAllFn();
    },
	
    onAddFn : function() {
        this.ehandler.ceditor.popup({
            action : 'add'
        });
    },
	
    onSelectFn : function(dp, date) {
        var calendarContainer = this.ownerCt.calendarContainer;
        calendarContainer.showDay(date);
    },
	
    onMyCalendarRenderFn : function(p) {
        var eh = this.ehandler;
        eh.renderOwnedCalendar(p.body);
    },
	
    changeDateLabel : function(fromDate, toDate) {
        this.updateDatePicker(fromDate, toDate);
    },
	
    updateDatePicker : function(fromDate, toDate) {
        if (fromDate && toDate) {
            var vDate = Ext.Date;
            var from = vDate.format(fromDate, this.fromtoFormat);
            this.datePicker.setRange(fromDate, toDate);
            var dnum = Ext.ux.calendar.Mask.getDayOffset(fromDate, toDate);
            if (7 < dnum) {
                var fd = vDate.getFirstDateOfMonth(fromDate);
                var fday = vDate.format(fd, 'Y-m-d');
                from = vDate.format(fromDate, 'Y-m-d');
                if (from != fday) {
                    fd = vDate.add(vDate.getLastDateOfMonth(fromDate),
                        Ext.Date.DAY, 1);
                }
                this.datePicker.setValue(fd);
            } else {
        //this.datePicker.setValue(fromDate);
        }
        }
    },
	
    onDatePickerRenderFn : function() {
        var cview = this.ownerCt.calendarContainer.currentView;
        this.updateDatePicker(cview.daySet[0], cview.daySet[cview.daySet.length
            - 1]);
    }
});