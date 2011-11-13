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
Ext.ns("Ext.ux.calendar");

Ext.ux.calendar.CalendarContainer = function(config){
    Ext.apply(this, config);
    var eh = this.ehandler;    
    
    var cs = eh.calendarSetting;
    
    var lan = Ext.ux.calendar.Mask.CalendarContainer;

    var now = new Date();
    this.startDate = now;
    this.endDate = now;        

    if(undefined==cs.initialView || false == Ext.ux.calendar.Mask.typeOf(cs.initialView)){
        this.currentIdx = 1;
    }else{
        this.currentIdx = parseInt(cs.initialView);
    }           
    this.dayView = new Ext.ux.calendar.view.DayView({
    	border:false,
        dayFormat:cs.dayFormat,
        offsetPercent:0.05,
        shiftDay:1,
        dayNum:1,
        startColIndex:0,
        endColIndex:1,
        ehandler:this.ehandler
    });
    
    this.weekView = new Ext.ux.calendar.view.DayView({
    	border:false,
        dayFormat:cs.weekFormat,                
        offsetPercent:0.1,
        shiftDay:7,
        dayNum:7,
        startColIndex:0,
        endColIndex:7,
        ehandler:this.ehandler
    });
    
    this.weekOnlyView = new Ext.ux.calendar.view.DayView({   
    	border:false,
        dayFormat:cs.weekFormat,
        offsetPercent:0.1,
        dayNum:5,
        shiftDay:7,
        startColIndex:0,
        endColIndex:5,
        ehandler:this.ehandler
    });
    
    this.monthView = new Ext.ux.calendar.view.MonthView({
    	border:false,
        dayFormat:cs.monthFormat,
        dayNum:7,
        shiftDay:7,
        startColIndex:0,
        endColIndex:7,
        ehandler:this.ehandler
    });
    
    this.resultView = new Ext.ux.calendar.view.ResultView({
    	border:false,
        ehandler:this.ehandler
    });

    this.detailEditor = new Ext.ux.calendar.editor.DetailEditor({
        ehandler:this.ehandler
    });
    
    this.backBtn = new Ext.Button({
        iconCls:'icon_feyaCalendar_back',
        handler:this.onBackFn,
        scope:this
    });
    
    this.nextBtn = new Ext.Button({
        iconCls:'icon_feyaCalendar_next',
        handler:this.onNextFn,
        scope:this
    });
    
    this.todayBtn = new Ext.Button({
        text:lan['todayBtn.text'],
        iconCls:'icon_feyaCalendar_today',
        handler:this.onTodayFn,
        scope:this
    });

    this.refreshBtn = new Ext.Button({
        iconCls:'x-tbar-loading',        
        handler:this.onRefreshFn,
        scope:this
    });

    this.dayBtn = new Ext.Button({
        iconCls:'icon_feyaCalendar_dayview',
        pressed:0 == this.currentIdx,
        text:lan['dayBtn.text'],
        handler:this.onDayFn,
        scope:this
    });
    
    this.weekMenu = new Ext.menu.Menu({
        items:[{
            text:lan['weekMenu.showAll.text'],
            checked:true,
            group: 'week',
            handler:this.onWeekAllFn,
            scope:this
        }, {
            text:lan['weekMenu.onlyWeek.text'],
            checked:false,
            group: 'week',
            handler:this.onWeekOnlyFn,
            scope:this
        }]
    });           
    
    this.weekBtn = new Ext.SplitButton({
        iconCls:'icon_feyaCalendar_weekview',
        text:lan['weekBtn.text'],
        pressed:1 == this.currentIdx,
        arrowAlign:'right',
        menu:this.weekMenu,
        handler:this.onWeekFn,
        scope:this
    });
    
    this.monthMenu = new Ext.menu.Menu({
        items:[{
            text:lan['monthMenu.showAll.text'],
            checked:true,
            group: 'month',
            handler:this.onMonthAllFn,
            scope:this
        }, {
            text:lan['monthMenu.onlyWeek.text'],
            checked:false,
            group: 'month',
            handler:this.onMonthOnlyFn,
            scope:this
        }]
    });   
    
    this.monthBtn = new Ext.SplitButton({
        iconCls:'icon_feyaCalendar_monthview',
        text:lan['monthBtn.text'],
        pressed:2 == this.currentIdx,
        arrowAlign:'right',
        menu:this.monthMenu,
        handler:this.onMonthFn,
        scope:this
    });

    var items = [];
    /*
     * below code is for language submenu, you can set SHOW_LANGUAGE_MENU to false if you don't need it
     */
    if(Ext.ux.calendar.CONST.SHOW_LANGUAGE_MENU){
        var data = Ext.ux.calendar.Mask.getLanguageConfig().data;
        for(var i = 0, len = data.length; i < len; i++){
            var d = data[i];
            items[items.length] = {
                group:'language',
                checked:d[0] == cs.language,
                text:d[1],
                name:d[0],
                handler:this.onLanguageSettingFn,
                scope:this
            };
        }
        this.lanMenu = new Ext.menu.Menu({
        	minWidth: 150,
            items:items
        });
        items = [];
        items.push({
            iconCls:'icon_feyacalendar_world',
            text:lan['moreMenu.language.text'],
            menu:this.lanMenu,
            scope:this
        });
    }
    items.push({
        iconCls:'icon_feyaCalendar_setting',
        text:lan['moreMenu.setting.text'],
        handler:this.onSettingFn,
        scope:this
    });
    items.push({
        iconCls:'icon_feyaCalendar_clock',
        text:lan['moreMenu.showAlert.text'],
        handler:this.onShowAlertFn,
        scope:this
    });
    items.push({
        iconCls: 'icon_feyaCalendar_feyasoft',
        text:lan['moreMenu.about.text'],
        handler:this.onAboutMyCalendarFn,
        scope:this
    });
    this.moreMenu = new Ext.menu.Menu({ 
    	minWidth:200,
        items:items
    });

    this.moreBtn = new Ext.Button({        
        iconCls:'icon_feyaCalendar_setting',
        text:lan['moreBtn.text'],
        menu:this.moreMenu
    });       
    
    this.searchField = new Ext.ux.form.SearchField({
        width:250,
        onTrigger1Click:Ext.bind(this.cancelSearchFn,this),
        onTrigger2Click:Ext.bind(this.onSearchFn,this)
    });

    items = [
        this.dayView,
        this.weekView,
        this.monthView,
        this.resultView,
        this.weekOnlyView,
        this.detailEditor
    ];
    this.currentView = items[this.currentIdx];
    var tobar=new Ext.Toolbar({   
    	items:[
            this.backBtn, this.nextBtn, this.todayBtn, '-',
            lan['searchCriteria.text'], this.searchField, '->',
            this.refreshBtn, '-', this.dayBtn, '-', this.weekBtn, '-', this.monthBtn, '-', this.moreBtn
        ]
    });
    Ext.ux.calendar.CalendarContainer.superclass.constructor.call(this, {
        border:false,
        region:'center',
        cls:'x-calendar-container',
        layout:{
        	type: 'card',
        	deferredRender: true
        },
        bodyStyle: 'border-top:none;background:none;',        
        activeItem:this.currentIdx,
        items:items,
        tbar:tobar

    });    
    this.addEvents(
        'refresh',
        'editcalendar'
    );    
    var options = {
        single:true
    };
    if(Ext.isIE){
        options['delay'] = 500;
    }
    this.currentView.on('afterresize', this.onAfterResizeFn, this, options);
    this.weekView.on('viewDay', this.onDayChangeFn, this);
    this.weekOnlyView.on('viewDay', this.onDayChangeFn, this);
    this.monthView.on('viewDay', this.onDayChangeFn, this);
    this.monthView.on('viewWeek', this.onWeekChangeFn, this);
    this.dayView.on('viewWeek', this.onWeekChangeFn, this);
    this.relayEvents(this.dayView, ['beforeremoteload', 'remoteload', 'hideeditor']);
    this.relayEvents(this.weekView, ['beforeremoteload', 'remoteload', 'hideeditor']);
    this.relayEvents(this.weekOnlyView, ['beforeremoteload', 'remoteload', 'hideeditor']);
    this.relayEvents(this.monthView, ['beforeremoteload', 'remoteload', 'hideeditor']);    
    this.dayView.relayEvents(this, ['canceldetail']);
    this.weekView.relayEvents(this, ['canceldetail']);
    this.weekOnlyView.relayEvents(this, ['canceldetail']);
    this.monthView.relayEvents(this, ['canceldetail']);
    this.on('mousedown', this.onMMouseDownFn, this);
    this.on('showdetailsetting', this.onShowDetailSettingFn, this);
    this.on('refresh', this.refresh, this);
    this.on('destroy', this.onDestroyFn, this);    
};

Ext.extend(Ext.ux.calendar.CalendarContainer, Ext.Panel, {
	
    onAfterResizeFn:function(){        
        this.ehandler.fireEvent('calendarloaded');
    },

    onShowDetailSettingFn:function(obj){
        this.getLayout().setActiveItem(5);
        this.detailEditor.setup(obj);
    },

    onLanguageSettingFn:function(item){
        var name = item.name;        
        var eh = this.ehandler;
        eh.ds.updateSetting({
            language:name
        }, function(){            
            window.location = window.location.href;
        }, this);
    },

    onShowAlertFn:function(item){
        var eh = this.ehandler;
        var epopup = eh.epopup;
        if(epopup){
            epopup.hideCB.setValue(false);
        }
        eh.checkExpireEvents();
    },
    
    onBackFn:function(btn){
        var cview = this.currentView;
        this.getLayout().setActiveItem(this.currentIdx);
        cview.goBack();
        this.changeLabel(cview);        
    },
	
    onNextFn:function(btn){
        var cview = this.currentView;
        this.getLayout().setActiveItem(this.currentIdx);
        cview.goNext();
        this.changeLabel(cview);        
    },
	
    onTodayFn:function(btn){
        this.showDay(new Date());
    },

    onDayFn:function(btn){
        if(this.currentView != this.dayView){            
            this.showPressed(btn);            
            var cview = this.dayView;            
            this.getLayout().setActiveItem(0);
            cview.showRange(this.startDate, this.endDate);
            this.changeLabel(cview);
        }
    },
	
    onWeekFn:function(btn){
        if(true === btn.weekdayFlag){
            this.onWeekOnlyFn();
        }else if(this.currentView != this.weekView){
            this.onWeekAllFn();
        }
    },
	
    onWeekAllFn:function(){
        if(this.currentView != this.weekView){
            var cview = this.weekView;
            this.weekBtn.weekdayFlag = false;            
            this.showPressed(this.weekBtn);            
            this.getLayout().setActiveItem(1);
            cview.showRange(this.startDate, this.endDate, true);
            this.changeLabel(cview);
        }
    },
	
    onWeekOnlyFn:function(){
        if(this.currentView != this.weekOnlyView){
            this.weekBtn.weekdayFlag = true;
            this.showPressed(this.weekBtn);
            var cview = this.weekOnlyView;            
            this.getLayout().setActiveItem(4);
            cview.showRange(this.startDate, this.endDate, true);
            this.changeLabel(cview);
        }
    },
	
    onMonthFn:function(btn){
        if(true == btn.weekdayFlag){
            this.onMonthOnlyFn();
        }else{
            this.onMonthAllFn();
        }
    },
	
    onMonthAllFn:function(){
        var cview = this.monthView;
        this.monthBtn.weekdayFlag = false;
        if(this.currentView != this.monthView){
            this.showPressed(this.monthBtn);                
            this.getLayout().setActiveItem(2);
            cview.startColIndex = 0;
            cview.endColIndex = 7;
            cview.colNum = 7;
            cview.showRange(this.startDate, this.endDate);
            this.changeLabel(cview);
        }else{
            cview.startColIndex = 0;
            cview.endColIndex = 7;
            cview.colNum = 7;
            cview.cleanup();
            cview.recalculateSize(cview.body.getWidth(), cview.body.getHeight());
            cview.showCache();
        }
    },
	
    onMonthOnlyFn:function(){
        var cview = this.monthView;
        this.monthBtn.weekdayFlag = true;
        var offset = (1 == cview.startDay?1:0);
        if(this.currentView != this.monthView){       
            this.showPressed(this.monthBtn);                    
            this.getLayout().setActiveItem(2);
            cview.colNum = 5;            
            cview.startColIndex = 1-offset;
            cview.endColIndex = 6-offset;
            cview.showRange(this.startDate, this.endDate);
            this.changeLabel(cview);
        }else{
            cview.colNum = 5;            
            cview.startColIndex = 1-offset;
            cview.endColIndex = 6-offset;
            cview.cleanup();            
            cview.recalculateSize(cview.body.getWidth(), cview.body.getHeight());
            cview.showCache();
        }
    },
	
    showPressed:function(btn){
        this.dayBtn.removeClsWithUI(btn.pressedCls)
        this.weekBtn.removeClsWithUI(btn.pressedCls)
        this.monthBtn.removeClsWithUI(btn.pressedCls)
        btn.addClsWithUI(btn.pressedCls)
        if(btn == this.dayBtn){
            this.currentIdx = 0;
            this.currentView = this.dayView;
        }else if(btn == this.weekBtn){
            if(true !== this.weekBtn.weekdayFlag){
                this.currentIdx = 1;
                this.currentView = this.weekView;
            }else{
                this.currentIdx = 4;
                this.currentView = this.weekOnlyView;
            }
        }else if(btn == this.monthBtn || btn == this.monthOnlyBtn){
            this.currentIdx = 2;
            this.currentView = this.monthView;
        }
    },

    showDay:function(day){
        var cview = this.currentView;        
        this.getLayout().setActiveItem(this.currentIdx);
        cview.showDay(day);
        this.changeLabel(cview);
    },

    showSingleDay:function(day){
        var cview = this.dayView;
        cview.daySet[0] = day;       
        if(this.currentView != this.dayView){
            this.showPressed(this.dayBtn);
            this.getLayout().setActiveItem(0);
            cview.resetView();
            cview.fireEvent('checklayout', true);
            this.changeLabel(cview);
        }
    },

    onDayChangeFn:function(cview, day){
        this.showSingleDay(day);
    },

    onWeekChangeFn:function(sdate, edate){
        this.showPressed(this.weekBtn);
        var cview = this.currentView;
        this.getLayout().setActiveItem(this.currentIdx);
        cview.showDay(sdate);
        this.changeLabel(cview);
    },

    changeLabel:function(cview){        
        this.startDate = cview.daySet[0];
        this.endDate = cview.daySet[cview.daySet.length-1];
        this.fireEvent('changedate', this.startDate, this.endDate);
    },

    cancelSearchFn:function(){
        var sf = this.searchField;
        var trigs=sf.triggerEl.elements;
        if(sf.hasSearch){
            sf.reset();
            var resultView = this.resultView;
            this.getLayout().setActiveItem(3);
            resultView.list.getStore().removeAll();
            trigs[0].hide();
            Ext.defer( resultView.loadEvents,1, resultView, ['']);
            sf.hasSearch = false;
        }
    },
    
    onSearchFn:function(){
        var sf = this.searchField;
        var trigs=sf.triggerEl.elements;
        var resultView = this.resultView;                
        this.getLayout().setActiveItem(3);
        resultView.list.getStore().removeAll();
        var sValue=sf.getValue();
        Ext.defer(resultView.loadEvents,1, resultView, [sValue]);
        if(sValue!=''){
           trigs[0].show();
           }
        
        sf.hasSearch = true;
    },

    onSettingFn:function(){
        var eh = this.ehandler;
        if(!eh.settingPop){
            eh.settingPop = new Ext.ux.calendar.popup.SettingPopup({
                calendarContainer:this
            });
        }
        var cs = eh.calendarSetting;
        eh.settingPop.popup(cs);
    },
    
    onAboutMyCalendarFn : function(){
        var myHtml = '<div style="float:left;width:240px;padding:25px;"><img src="'+Ext.ux.calendar.CONST.MAIN_PATH+'image/feyasoft_logo.jpg"/></div>' +
        '<div style="float:left;width:320px;padding-top:20px;">' +
        '    <span style="font-size:16px;"><b>FeyaSoft MyCalendar</b></span><br/>' +
        '    <font color="grey">Version ' + Ext.ux.calendar.CONST.VERSION +'</font>' +
        '    <br/><br/>' +
        '    Copyright &copy; 2006-2011 FeyaSoft Inc. <br>All right reserved<br/>' +
        '</div>' +
        '<div style="clear:left;padding: 0 20px 0 20px;">' +
        '    To query license information, please vist our site or ' +
        '    send the email to: <a href="mailto:info@feyasoft.com">info@feyasoft.com</a>.' +
        '    <br><br>For more detail information, please visit: <a href="http://www.cubedrive.com/myCalendar" target="_blank">http://www.cubedrive.com/myCalendar</a> and ' +
        '    <a href="http://www.feyasoft.com" target="_blank">http://www.feyasoft.com</a>' +
        '</div>';

        var aboutUsWin = new Ext.Window({
            iconCls:'icon_feyaCalendar_feyasoft',
            title:'About FeyaSoft MyCalendar',
            width: 600,
            height: 270,
            closable:true,
            resizable:false,
            modal:true,
            html: myHtml
        });
        aboutUsWin.show();
    },

    onCalendarLoadedFn:function(){
        var cview = this.currentView;
        cview.checkLayout(true);        
    },

    onRefreshFn:function(){
        this.refresh();
    },

    refresh:function(cflag){
        var eh = this.ehandler;
        var wp = this.ownerCt.westPanel;
        var ownedCt, sharedCt;
        if(wp.myCalendarPanel){
            ownedCt = wp.myCalendarPanel.body;
        }
        if(wp.otherCalendarPanel){
            sharedCt = wp.otherCalendarPanel.body;
        }
        eh.fireEvent('reloadCalendar', ownedCt, sharedCt, cflag);
    },

    onMMouseDownFn:function(e){
        this.fireEvent('canceldetail');        
        this.fireEvent('hideeditor');
    },

    onDestroyFn:function(){
        if(this.monthView.cssId){
            Ext.util.CSS.removeStyleSheet(this.monthView.cssId);
        }
    }
});