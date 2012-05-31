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
Ext.ns("Ext.ux.calendar");

Ext.ux.calendar.WestPanel = function(config){
    Ext.apply(this, config);

    var eh = this.ehandler;
    
    eh.applyCalendarSetting(this);
    
    this.ds = eh.ds;
    
    var lan = Ext.ux.calendar.Mask.WestPanel;        
    
    this.datePicker = new Ext.util.DatePicker({
        value:new Date(),
        startDay:this.startDay
    });

    this.poweredBy = "http://www.feyasoft.com";    
    /*
     * for my calendar panel
     */
    /*=================Begin:No share function==================*/
    this.showAllBtn = new Ext.Button({
        iconCls:'icon_feyaCalendar_calendar_show',
        text:lan['myShowAllBtn.text'],
        handler:this.onShowAllFn,
        scope:this
    });

    this.addBtn = new Ext.Button({
        iconCls:'icon_feyaCalendar_add_calendar',
        text:lan['myAddBtn.text'],
        handler:this.onAddFn,
        scope:this
    });
    var bbar = [this.showAllBtn, '->'];
    if(!this.readOnly){
        bbar.push(this.addBtn);
    }
    this.myCalendarPanel = new Ext.Panel({
        style:'padding-top:5px;',
        region:'center',
        iconCls:'icon_feyaCalendar_calendar',
        title: lan['myCalendarPanel.title'],        
        bodyStyle:'padding:2px;background-color:white;overflow-x:hidden;position:relative;',
        autoScroll:true,
        bbar:bbar
    });    
    this.myCalendarPanel.on('render', this.onMyCalendarRenderFn, this);
   
    this.formpanel = new Ext.form.FormPanel({
        border:false,
        cls:'x-calendar-container',
        style:'padding:0px 10px 10px 12px;',
        layout:'border',
        items:[{
                border:false,
                region:'north',
                height:210,
                style:'padding:5px 0px 0px 0px;',
                cls:'x-dayview-west-date-span',
                items:[                    
                    this.datePicker
                ]
            },             
            this.myCalendarPanel
        ]
    });    
    Ext.ux.calendar.WestPanel.superclass.constructor.call(this, {
        border:false,        
        cls:'x-calendar-west',
        collapsible:true,
        iconCls: 'icon_feyaCalendar_feyasoft',
        title:'<b class="x-calendar-link">Powered By FeyaSoft</b>',
        collapseMode:'mini',        
        region:'west',
        minWidth:200,
        width:200,
        layout:'fit',
        items:[this.formpanel]
    });
    this.addEvents(        
        'changedate'
    );    
    this.datePicker.on('render', this.onDatePickerRenderFn, this);
    this.datePicker.on('select', this.onSelectFn, this);
    this.on('changedate', this.changeDateLabel, this);    
    this.on('render', this.onRenderFn, this);    
};

Ext.extend(Ext.ux.calendar.WestPanel, Ext.Panel, {
    
    onOtherCalendarRenderFn:function(p){
        var eh = this.ehandler;
        eh.renderSharedCalendar(p.body);
	},

    onRenderFn:function(p){        
        p.header.on('click', this.onHeaderClickFn, this);
    },

    onHeaderClickFn:function(e){
        var target = e.getTarget();
        var tgEl = Ext.get(target);
        if(tgEl.hasClass('x-calendar-link')){
            window.open(this.poweredBy, '_blank');
        }
    }, 

    onShowAllFn:function(){        
        this.ehandler.onShowAllFn();
    },

    onAddFn:function(){
        this.ehandler.ceditor.popup({
            action:'add'
        });
    },

    onSelectFn:function(dp, date){        
        var calendarContainer = this.ownerCt.calendarContainer;
        calendarContainer.showDay(date);
    },

	onMyCalendarRenderFn:function(p){                
        var eh = this.ehandler;
        eh.renderOwnedCalendar(p.body);
	},

    changeDateLabel:function(fromDate, toDate){                
        this.updateDatePicker(fromDate, toDate);
    },        
    
    updateDatePicker:function(fromDate, toDate){
        var from = fromDate.format(this.fromtoFormat);
        this.datePicker.setRange(fromDate, toDate);        
        var dnum = Ext.ux.calendar.Mask.getDayOffset(fromDate, toDate);
        if(7 < dnum){
            var fd = fromDate.getFirstDateOfMonth();
            var fday = fd.format('Y-m-d');
            from = fromDate.format('Y-m-d');
            if(from != fday){
                fd = fromDate.getLastDateOfMonth().add(Date.DAY, 1);
            }            
            this.datePicker.setValue(fd);
        }else{
            this.datePicker.setValue(fromDate);
        }
    },    

    onDatePickerRenderFn:function(){
        var cview = this.ownerCt.calendarContainer.currentView;
        this.updateDatePicker(cview.daySet[0], cview.daySet[cview.daySet.length-1]);
    }
});

