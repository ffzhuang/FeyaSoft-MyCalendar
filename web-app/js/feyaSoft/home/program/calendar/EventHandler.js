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

Ext.ux.calendar.EventHandler = function(config){
    Ext.apply(this, config);
    
    this.applyCalendarSetting(this);      
    
    this.calendarSet = {};          
    
    this.dayCache = {};
    
    this.id = Ext.id();
	
    Ext.ux.calendar.EventHandler.superclass.constructor.call(this);
	
    this.calendarLayout = new Ext.ux.calendar.CalendarLayout({
        ehandler:this
    });
    var initobj = this.ds.initialObj;
    if(initobj){
        for(var i = 0, len = initobj.owned.length; i < len; i++){
            var c = initobj.owned[i];
            this.calendarSet[c.id] = c;
        }
        for(var i = 0, len = initobj.shared.length; i < len; i++){
            var c = initobj.shared[i];
            this.calendarSet[c.id] = c;
        }
        this.calendarLayout.repeatSet = initobj.re;
    }

    this.detailTpl = new Ext.XTemplate(
        '<div class="x-event-detail-ct">' +
            '<div class="x-event-detail-title">' +
                '<table width="100%" border="0"><tbody><tr>' +
                    '<td class="x-event-detail-title-td">' +
                        '{title}' +
                    '</td>' +
                    '<td class="x-event-detail-tool">' +
                        '<img class="x-event-detail-tool-close" src="'+Ext.BLANK_IMAGE_URL+'"></img>' +
                    '</td>' +
                '</tr></tbody></table>' +
            '</div>'+
            '<div class="x-event-detail-viewer">' +
            '</div>' +
            '<div class="x-event-detail-foot">' +
                '<table width="100%" border="0"><tbody><tr>' +
                    '<td class="x-event-detail-foot-tool">' +
                        '<img class="x-event-detail-foot-info" src="'+Ext.BLANK_IMAGE_URL+'"></img>' +
                    '</td>' +
                    '<td>' +
                        '<b class="x-event-detail-foot-text"></b>' +
                    '</td>' +
                '</tr></tbody></table>' +
            '</div>' +
        '</div>'
    );
    /*
     * The XTemplate for an event render in Ext.ux.calendar.DayView
     */
    this.eventTpl = new Ext.XTemplate(
        '<div eid="{id}" name="x-event-{day}-{eday}-{id}" ' +
            'class="'+this.id+'-x-calendar-{calendarId}-event x-event-cover '+this.id+'-x-calendar-{calendarId} x-calendar-event" ' +
            'style="{cover-style}" unselectable="on" onselectstart="return false;">' +
            '<div style="height:18px;">' +
                '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>' +
                    '<td style="{left-style}">' +
                        '<div class="x-calendar-{color}-event-ltcorner-clear  x-event-lt-default">&nbsp;</div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="x-calendar-{color}-event-top-clear x-event-inner x-event-title-default" style="{title-style}">' +
                            '<b qtip="{time}<br><b><u>{subject}</u></b><br>{content}">{title}</b>' +
                        '</div>' +
                    '</td>' +
                    '<td style="{right-style}">' +
                        '<div class="x-calendar-{color}-event-rtcorner-clear  x-event-rt-default">&nbsp;</div>' +
                    '</td>' +
                '</tr></tbody></table>' +
            '</div>' +

            '<div class="x-calendar-{color}-event-lr x-event-content-default" style="{content-style}">' +
                '<img class="x-calendar-event-pin-off x-event-pin" src="'+Ext.BLANK_IMAGE_URL+'"></img>' +
                '<tpl if="this.isRepeat(repeatType)">' +
                    '<img class="x-repeat-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                '</tpl>' +
                '<tpl if="this.isException(repeatType)">' +
                    '<img class="x-exception-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                '</tpl>' +
                '<tpl if="this.isAlert(alertFlag)">' +
                    '<img class="x-alert-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                '</tpl>' +
                '<tpl if="this.isLocked(locked)">' +
                    '<img class="x-locked-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                '</tpl>' +
                '<u class="x-event-content-link" qtip="{time}<br><b><u>{subject}</u></b><br>{content}">{subject}</u><br>{content}' +
            '</div>' +

            '<div>' +
                '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>' +
                    '<td style="{left-style}">' +
                        '<div class="x-calendar-{color}-event-lbcorner">&nbsp;</div>' +
                    '</td>' +
                    '<td>' +
                        '<div style="{bottom-style}" class="x-calendar-{color}-event-bottom x-event-bottom-default">&nbsp;</div>' +
                    '</td>' +
                    '<td style="{right-style}">' +
                        '<div class="x-calendar-{color}-event-rbcorner">&nbsp;</div>' +
                    '</td>' +
                '</tr></tbody></table>' +
            '</div>' +            
        '</div>', {
            isRepeat:function(repeatType){
                return ('string' != Ext.type(repeatType));
            },
            isException:function(repeatType){
                return ('exception' == repeatType);
            },
            isAlert:function(alertFlag){
                return alertFlag;
            },
            isLocked:function(locked){
                return locked;
            }
        }
    );
    this.eventTpl.compile();
    /*
     * The XTemplate for an event render in Ext.ux.calendar.MonthView
     */
    this.legendTpl = new Ext.XTemplate(
        '<div eid="{id}" name="x-event-{day}-{eday}-{id}" class="'+this.id+'-x-calendar-{calendarId}-legend x-legend-cover '+this.id+'-x-calendar-{calendarId} x-calendar-event" unselectable="on" onselectstart="return false;">' + 
            '<b class="x-legend-title-b x-legend-title-{color}" qtip="{time}<br><b><u>{subject}</u></b><br>{content}">' +
                '<tpl if="this.isRepeat(repeatType)">' +
                    '<img class="x-repeat-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                '</tpl>' +
                '<tpl if="this.isException(repeatType)">' +
                    '<img class="x-exception-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                '</tpl>' +
                '<tpl if="this.isAlert(alertFlag)">' +
                    '<img class="x-alert-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                '</tpl>' +
                '<tpl if="this.isLocked(locked)">' +
                    '<img class="x-locked-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                '</tpl>' +
                '{title} {subject}' +
            '</b>' +
        '</div>', {
            isRepeat:function(repeatType){
                return ('string' != Ext.type(repeatType));
            },
            isException:function(repeatType){
                return ('exception' == repeatType);
            },
            isAlert:function(alertFlag){
                return alertFlag;
            },
            isLocked:function(locked){
                return locked;
            }
        }
    );
    this.legendTpl.compile();
    /*
     * The XTemplate for a whole day event render in both Ext.ux.calendar.DayView and Ext.ux.calendar.MonthView
     */    
    this.wholeTpl = new Ext.XTemplate(
        '<div eid="{id}" name="x-event-{day}-{eday}-{id}" class="'+this.id+'-x-calendar-{calendarId}-whole x-whole-cover '+this.id+'-x-calendar-{calendarId} x-calendar-event" unselectable="on" onselectstart="return false;">' +
            '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>' +
                '<td class="x-whole-td">' +
                    '<div class="x-calendar-{color}-whole-left x-whole-left">&nbsp;</div>' +
                    '<tpl if="this.isLeftJoin(lflag)">' +
                        '<div class="x-whole-left-join"></div>' +
                    '</tpl>' +
                '</td>' +
                '<td class="x-whole-title-{color} x-whole-title">&nbsp;' +
                    '<b class="x-whole-title-b" qtip="{time}<br><b><u>{subject}</u></b><br>{content}">' +
                        '<tpl if="this.isRepeat(repeatType)">' +
                            '<img class="x-repeat-white-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                        '</tpl>' +
                        '<tpl if="this.isException(repeatType)">' +
                            '<img class="x-exception-white-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                        '</tpl>' +
                        '<tpl if="this.isAlert(alertFlag)">' +
                            '<img class="x-alert-white-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                        '</tpl>' +
                        '<tpl if="this.isLocked(locked)">' +
                            '<img class="x-locked-white-event" src="'+Ext.BLANK_IMAGE_URL+'"></img> ' +
                        '</tpl>' +
                        '{subject}' +
                    '</b>' +
                '</td>' +
                '<td class="x-whole-td">' +
                    '<div class="x-calendar-{color}-whole-right x-whole-right">&nbsp;</div>' +
                    '<tpl if="this.isRightJoin(rflag)">' +
                        '<div class="x-whole-right-join"></div>' +
                    '</tpl>' +
                '</td>' +
            '</tr></tbody></table>' +
        '</div>', {
            isLeftJoin:function(lflag){
                return lflag;
            },
            isRightJoin:function(rflag){
                return rflag;
            },
            isRepeat:function(repeatType){
                return ('string' != Ext.type(repeatType));
            },
            isException:function(repeatType){
                return ('exception' == repeatType);
            },
            isAlert:function(alertFlag){
                return alertFlag;
            },
            isLocked:function(locked){
                return locked;
            }
        }
    );
    this.wholeTpl.compile();
    /*
     * The XTemplate for a calendar with drop menu, which render in Ext.ux.calendar.WestPanel
     */
    this.cTplStr = '<div id="'+this.id+'-x-calendar-{calendarId}" class="'+this.id+'-x-calendar-{calendarId}-whole x-calendar-cover" unselectable="on" onselectstart="return false;">' +
        '<div class="x-calendar-title-b" style="width:135px;"><b>{title}</b></div>' +
            '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>' +
                '<td class="x-calendar-td">' +
                    '<div class="x-calendar-{color}-whole-left x-whole-left">&nbsp;</div>' +
                '</td>' +
                '<td class="x-whole-title-{color} x-calendar-title">' +
                    '&nbsp;' +
                '</td>' +
                '<td class="x-calendar-td">' +
                    '<div class="x-calendar-{color}-whole-right x-whole-right">&nbsp;</div>' +
                '</td>' +
            '</tr></tbody></table>' +
        '</div>';
    this.calendarDropTpl = new Ext.XTemplate(
        '<div class="x-calendardrop-cover" hidefocus="true" unselectable="on" onselectstart="return false;">' +
            '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>' +
                '<td>' +
                    this.cTplStr +
                '</td>' +
                '<td class="x-legend-tool-td">' +
                    '<div class="x-legend-tool">' +
                    '</div>' +
                '</td>' +
            '</tr></tbody></table>' +
        '<div>'
    );
    this.calendarDropTpl.compile();

    /*
     * The XTemplate for a calendar, which render in Ext.ux.calendar.Editor and Ext.ux.calendar.ResultView
     */    
    this.calendarTpl = new Ext.XTemplate(this.cTplStr);
    this.calendarTpl.compile();
    
    this.initMenu();
    this.initContextMenu();
    /*
     * add some private events
     */    
    this.addEvents(
        'calendarloaded',
        'reloadCalendar',
        'createEvent',
        'updateEvent',
        'deleteEvent',
        /*
         * for change all events from one day to another
         */
        'changeDay',
        'deleteCalendar',
        /*
         * for clear all events belong to a calendar
         */
        'clearCalendar',
        'changeEventCache',
        'changeCalendarColor',
        'beforealertevent',
        'alertevent'
    );
    this.on('reloadCalendar', this.reloadCalendar, this);
    this.on('changeCalendarColor', this.onChangeCalendarColorFn, this);
    this.on('changeEventCache', this.onChangeEventCacheFn, this);
};

Ext.extend(Ext.ux.calendar.EventHandler, Ext.util.Observable, {
    firstTime:true,
    /*
     *  for save the css element
     */
    ss:[],

    hourFormat:'',
    /*
     * The basic z-index for events
     */
    baseIndex:100,
    /*
     * widthRatio and posRatio are for caculate the overlap of events
     */
    widthRatio:0.95,

    posRatio:1.05,    

    applyCalendarSetting:function(source){
        var cs = this.calendarSetting;
        var o = Ext.apply({}, cs);
        delete(o.dayFormat);
        delete(o.weekFormat);
        delete(o.monthFormat);
        Ext.apply(source, o);
    },

    onChangeCalendarColorFn:function(){        
        this.checkExpireEvents.defer(1, this);
    },

    onChangeEventCacheFn:function(){
        this.checkExpireEvents.defer(1, this);
    },
    
    showMenu:function(cEl, dEl){
        if(this.menu){
            this.menu.calendarEl = cEl;
            var calendar = cEl.calendar;                        
            var lan = Ext.ux.calendar.Mask.EventHandler;
            if(true === this.calendarSet[calendar.id].hide){
                this.viewItem.setText(lan['viewItem.show.text']);
                this.viewItem.setIconClass('icon_feyaCalendar_calendar_show');
            }else{
                this.viewItem.setText(lan['viewItem.hide.text']);
                this.viewItem.setIconClass('icon_feyaCalendar_calendar_hide');
            }
            var c = 0;
            for(var p in this.calendarSet){
                c++;
            }
            if(1 >= c){
                this.deleteItem.hide();
            }else{
                this.deleteItem.show();
            }
            if(this.readOnly){
                for(var i = 2, len = this.menu.items.getCount(); i < len; i++){
                    var it = this.menu.items.get(i);
                    it.hide();
                }
            }
            this.menu.bindEl = dEl;            
            this.menu.show(dEl, this.menuAlign);            
        }
        return this;
    },

    onMenuShowFn:function(menu){
        var calendar = menu.calendarEl.calendar;
        var color = Ext.ux.calendar.Mask.getColorByIndex(calendar.color);
        if(color){
            menu.palette.still = true;
            menu.palette.select('#'+color);
            delete(menu.palette.still);
        }
    },

    hideMenu:function(){
        if(this.menu){
            this.menu.hide();
        }
        return this;
    },

    showContextMenu:function(e, eEl){
        e.stopEvent();
        if(this.cmenu){
            this.cmenu.eventEl = eEl;
            var event = eEl.bindEvent;
            if(event.locked){
                this.editItem.hide();
                this.lockItem.hide();
                this.unlockItem.show();
            }else{
                this.editItem.show();
                this.lockItem.show();
                this.unlockItem.hide();
            }
            this.cmenu.showAt(e.getXY());
        }
    },

    hideContextMenu:function(){
        if(this.cmenu){
            this.cmenu.hide();
        }
        return this;
    },
    /*
     * Init the drop menu for calendar
     */
    initMenu:function(){
        var lan = Ext.ux.calendar.Mask.EventHandler;
        this.showOnlyItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_calendar_show',
            text:lan['showOnlyItem.text'],
            handler:this.onShowOnlyFn,
            scope:this
        });
        this.viewItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_calendar_hide',
            text:lan['viewItem.hide.text'],
            handler:this.onViewFn,
            scope:this
        });        
        this.editItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_calendar_edit',
            text:lan['editItem.text'],
            handler:this.onEditFn,
            scope:this
        });
        this.deleteItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_delete',
            text:lan['deleteItem.text'],
            handler:this.onDeleteFn,
            scope:this
        });
        this.clearItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_clear_event',
            text:lan['clearItem.text'],
            handler:this.onClearFn,
            scope:this
        });
        var palette = new Ext.ColorPalette({
           
            });
        this.menu = new Ext.menu.Menu({
            cls:'x-calendar-menu',
            items:[
                this.showOnlyItem,
                this.viewItem,
                this.editItem,
                this.deleteItem,
                this.clearItem,
                '-',
                palette
            ]
        });
        this.menu.palette = palette;
        this.menu = Ext.menu.MenuMgr.get(this.menu);
        this.menu.palette.colors = Ext.ux.calendar.Mask.colors;
        this.menu.palette.on('select', this.onCalendarColorChangedFn, this);
        this.menu.on('show', this.onMenuShowFn, this);
    },
    /*
     * Init the contextmenu for event
     */
    initContextMenu:function(){
        var lan = Ext.ux.calendar.Mask.EventHandler;
        this.lockItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_event_lock',
            text:lan['lockItem.text'],
            handler:this.onLockEventFn,
            scope:this
        });
        this.unlockItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_event_unlock',
            text:lan['unlockItem.text'],
            handler:this.onUnlockEventFn,
            scope:this
        });
        this.editItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_event_edit',
            text:lan['editEvent.title'],
            handler:this.onEditEventFn,
            scope:this
        });
        this.deleteItem = new Ext.menu.Item({
            iconCls:'icon_feyaCalendar_delete',
            text:lan['deleteEvent.title'],
            handler:this.onDeleteEventFn,
            scope:this
        });
        this.cmenu = new Ext.menu.Menu({
            items:[
            this.lockItem,
            this.unlockItem,
            this.editItem,
            this.deleteItem
            ]
        });
        this.cmenu = Ext.menu.MenuMgr.get(this.cmenu);
    },

    onLockEventFn:function(item){
        var menu = item.parentMenu;
        var eEl = menu.eventEl;
        var cview = eEl.cview;
        var eh = cview.ehandler;
        var event = eEl.bindEvent;
        var oevent = Ext.apply({}, event);   
        event.locked = true;
        if('string' == Ext.type(event.repeatType)){
            eh.updateEvent(event, cview);
        }else{
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
                    }else{
                        event.locked = false;
                    }
                },
                icon: Ext.MessageBox.QUESTION
            });
        }
    },

    onUnlockEventFn:function(item){
        var menu = item.parentMenu;
        var eEl = menu.eventEl;
        var cview = eEl.cview;
        var eh = cview.ehandler;
        var event = eEl.bindEvent;
        var oevent = Ext.apply({}, event);
        event.locked = false;
        if('string' == Ext.type(event.repeatType)){
            eh.updateEvent(event, cview);
        }else{
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
                    }else{
                        event.locked = true;
                    }
                },
                icon: Ext.MessageBox.QUESTION
            });
        }
    },

    onEditEventFn:function(item){
        var menu = item.parentMenu;
        var eEl = menu.eventEl;
        var cview = eEl.cview;
        var eh = cview.ehandler;
        eh.showEditor(eEl, cview, 'update');
    },

    onDeleteEventFn:function(item){
        var lan = Ext.ux.calendar.Mask.EventHandler;
        var menu = item.parentMenu;
        var eEl = menu.eventEl;
        var cview = eEl.cview;
        var eh = cview.ehandler;
        var event = eEl.bindEvent;        
        if('string' == Ext.type(event.repeatType)){
            eh.freeEventEl(eEl);
            eh.deleteEvent(event, cview, eEl.col);
        }else{
            Ext.Msg.show({
                title:lan['deleteRepeatPopup.title'],
                msg:lan['deleteRepeatPopup.msg'],
                buttons: Ext.Msg.YESNOCANCEL,
                fn: function(bid, text){
                    if('yes' == bid){
                        eh.freeEventEl(eEl);
                        eh.deleteRepeatEvent(event, cview);
                    }else if('no' == bid){
                        eh.freeEventEl(eEl);
                        eh.deleteRepeatEvent(event, cview, true);
                    }
                },
                icon: Ext.MessageBox.QUESTION
            });
        }
    },
    /*
     * For clear all events belong a calendar
     */
    onClearFn:function(item){
        Ext.Msg.confirm('Hint',
            'Do you really want to delete all events of this calendar?',
            function(btn) {
                if(btn == 'yes'){
                    var menu = item.parentMenu;
                    var cEl = menu.calendarEl;
                    var calendar = cEl.calendar;
                    var calendarId = calendar.id;
                    this.ds.deleteEventsByCalendar(calendarId, function(backObj){
                        delete(this.calendarSet[calendarId]);                        
                       
                        var cc = this.mainPanel.calendarContainer;
                        var cview = cc.currentView;
                        this.calendarLayout.resetLayout({
                            hideCalendar:false,
                            deleteCalendar:true
                        }, true);
                        cview.checkLayout();
                        this.fireEvent('changeEventCache', this);
                        
                        this.calendarSet[calendarId] = calendar;
                    }, this);
                }
            },
            this
            );
    },
    /*
     * For delete a calendar and all events belong to it
     */
    onDeleteFn:function(item){
        Ext.Msg.confirm('Hint',
            'Do you really want to delete this calendar?',
            function(btn) {
                if(btn == 'yes'){
                    var menu = item.parentMenu;
                    var cEl = menu.calendarEl;
                    var calendar = cEl.calendar;
                    var calendarId = calendar.id;
                    this.ds.deleteCalendar(calendarId, function(backObj){                        
                        delete(this.calendarSet[calendarId]);                        

                        var cc = this.mainPanel.calendarContainer;
                        var cview = cc.currentView;
                        this.calendarLayout.resetLayout({
                            hideCalendar:false,
                            deleteCalendar:true
                        }, true);
                        cview.checkLayout();
                        this.fireEvent('changeEventCache', this);

                        cEl.remove();
                    }, this);
                }
            },
            this
            );
    },

    copyCalendarSet:function(){
        var o = {}, cs = this.calendarSet;
        for(var p in cs){
            o[p] = Ext.apply({}, cs[p]);
        }
        return o;
    },

    pickoutRepeat:function(events){
        var obj = {}, cleanup = [];
        for(var i = 0, len = events.length; i < len; i++){
            var e = events[i];
            if(!obj[e.eventId]){
                cleanup.push(e);
                obj[e.eventId] = true;
            }
        }
        return cleanup;
    },
    /*
     * For check event cache to see whether any event is actived or expired,
     * if yes where popup a window to show the actived events
     */
    checkExpireEvents:function(){        
        var now = new Date();
        var nowday = now.format('Y-m-d');
        var nextday = now.add(Date.DAY, 1).format('Y-m-d');
        var expire = [], events = [];
        var layout = this.calendarLayout.layoutSet[nowday];
        if(layout){
            events = layout.getAllEvents();
        }
        /*
         * for popup alert, we only allow user set 24 hours early as maximum value, so here we need check today and next day
         */
        layout = this.calendarLayout.layoutSet[nextday];
        if(layout){
            events = events.concat(layout.getAllEvents());
        }
        if(events && 0 < events.length){            
            var getHM = Ext.ux.calendar.Mask.getIntervalFromRow;
            for(var i = 0, len = events.length; i < len; i++){
                var event = events[i];
                var startHi = getHM(this.intervalSlot, event.startRow);
                var endHi = getHM(this.intervalSlot, event.endRow);
                var startTime = event.day+' '+startHi;
                startTime = Date.parseDate(startTime, 'Y-m-d H:i');
                var eday = event.eday;
                var endTime = eday+' '+endHi;
                var endDate = eday+' '+getHM(this.intervalSlot, event.endRow, this.hourFormat);
                if(this.rowCount == event.endRow){
                    eday = Date.parseDate(event.eday, 'Y-m-d').add(Date.DAY, 1).format('Y-m-d');
                    endTime = eday+' 00:00';
                    endDate = eday+' '+getHM(this.intervalSlot, 0, this.hourFormat);
                }
                endTime = Date.parseDate(endTime, 'Y-m-d H:i');
                var alertFlag = event.alertFlag;
                if(alertFlag){
                    var alen = alertFlag.length;
                    if(0 < alen){
                        for(var j = 0; j < alen; j++){
                            var obj = alertFlag[j];
                            var type = obj.type;
                            if('email' != type){
                                var early = obj.early;
                                var unit = obj.unit;
                                early = Ext.ux.calendar.Mask.getMinute(early, unit);
                                now = (new Date()).add(Date.MINUTE, early);                                
                                if(now.between(startTime, endTime)){
                                    expire.push(Ext.applyIf({
                                        color:'#'+Ext.ux.calendar.Mask.getColorByIndex(this.calendarSet[event.calendarId].color),
                                        startDate:event.day+' '+getHM(this.intervalSlot, event.startRow, this.hourFormat),
                                        endDate:endDate
                                    }, event));
                                }
                            }
                        }
                    }else{/*for old version*/
                        if(now.between(startTime, endTime)){
                            expire.push(Ext.applyIf({
                                color:'#'+Ext.ux.calendar.Mask.getColorByIndex(this.calendarSet[event.calendarId].color),
                                startDate:event.day+' '+getHM(this.intervalSlot, event.startRow, this.hourFormat),
                                endDate:endDate
                            }, event));
                        }
                    }
                }
            }            
        }
        if(!this.epopup){
            this.epopup = new Ext.ux.calendar.ExpirePopup({
                ehandler:this
            });
        }
        if(0 < expire.length){
            if(this.fireEvent("beforealertevent", this, expire) === false){
                return;
            }
            expire = this.pickoutRepeat(expire);
            if(this.epopup){
                this.epopup.popup(expire);
            } // for support extjs 2.2
            this.fireEvent('alertevent', this, expire);
        }else{
            this.epopup.activedEvents = null;
            try {
                this.epopup.hide();
            } catch(err) {}  // for support extjs 2.2
        }
    },    
    /*
     * For show all calendars belong to current user
     */
    onShowAllFn:function(item){
        var cview = this.mainPanel.calendarContainer.getLayout().activeItem;        
        this.ds.showAllCalendar(function(backObj){            
            var cs = this.calendarSet;
            for(var p in cs){
                var c = cs[p];
                c.hide = false;
                var calendarEl = Ext.get(this.id+'-x-calendar-'+p);
                this.showCalendarColor(calendarEl, c.color);                
            }
            this.calendarLayout.resetLayout({
                hideCalendar:true,
                deleteCalendar:false
            }, true);
            cview.checkLayout();
        }, this);
    },
    /*
     * For only show a calendar and hide all other calendars
     */
    onShowOnlyFn:function(item){
        var cview = this.mainPanel.calendarContainer.getLayout().activeItem;
        var menu = item.parentMenu;
        var cEl = menu.calendarEl;
        var calendar = cEl.calendar;        
        var id = calendar.id;
        calendar.hide = false;        
        this.ds.showOnlyCalendar(id, function(backObj){
            this.showCalendarColor(cEl, calendar.color);
            var cs = this.calendarSet;
            for(var p in cs){
                if(p != id){
                    var c = cs[p];
                    c.hide = true;
                    var calendarEl = Ext.get(this.id+'-x-calendar-'+p);
                    this.hideCalendarColor(calendarEl, c.color);                    
                }
            }            
            this.calendarLayout.resetLayout({
                hideCalendar:true,
                deleteCalendar:false
            }, true);
            cview.checkLayout();
        }, this);
    },
    /*
     * For show/hide a calendar and all events belong to it
     */
    onViewFn:function(item){
        var menu = item.parentMenu;
        var cEl = menu.calendarEl;
        var calendar = cEl.calendar;
        var lan = Ext.ux.calendar.Mask.EventHandler;
        calendar.hide = !calendar.hide;
        this.ds.createUpdateCalendar(calendar, function(backObj){
            if(lan['viewItem.hide.text'] == item.text){
                item.setText(lan['viewItem.show.text']);
                this.hideCalendar(calendar, true);
                this.hideCalendarColor(cEl, calendar.color);
            }else{
                item.setText(lan['viewItem.hide.text']);
                this.hideCalendar(calendar, false);
                this.showCalendarColor(cEl, calendar.color);
            }
        }, this);
    },
    /*
     * For show/hide a calendar and all events belong to it
     * @param {Boolean} flag, true for hide, false for show
     */
    hideCalendar:function(calendar, flag){
        var id = calendar.id;        
        var cview = this.mainPanel.calendarContainer.currentView;
        calendar.hide = flag;
        this.calendarSet[id].hide = flag;        
        this.calendarLayout.resetLayout({
            hideCalendar:true,
            deleteCalendar:false
        }, true);
        cview.checkLayout();
    },   

    /*
     * show the editor to edit an event
     */
    onEditFn:function(item){
        var menu = item.parentMenu;
        var cEl = menu.calendarEl;
        var calendar = cEl.calendar;
        this.ceditor.popup({            
            data:calendar,
            cEl:cEl
        });
    },

    prepareLegend:function(pn, spos, epos, cview){
        var eh = cview.ehandler;        
        var sindex = spos.x*cview.shiftDay+spos.y;
        var eindex = epos.x*cview.shiftDay+epos.y;
        var tmp = sindex;
        if(sindex > eindex){
            sindex = eindex;
            eindex = tmp;
        }
        var calendar;
        for(var p in eh.calendarSet){
            calendar = eh.calendarSet[p];
            if(true !== calendar.hide){
                break;
            }
        }
        var event = {
            eventId:'prepare',
            calendarId:calendar.id,
            color:calendar.color,
            startRow:0,
            endRow:this.rowCount,
            day:cview.daySet[sindex].format('Y-m-d'),
            eday:cview.daySet[eindex].format('Y-m-d'),
            repeatType:'no'
        };
        pn.hold = true;
        pn.cview = cview;
        pn.bindEvent = event;
        this.showEditor(pn, cview, 'add');
    },
    
    prepareEvent:function(pn, cview){
        var id = pn.dom.id;
        var pos = cview.getCellIndex(id);
        var eh = cview.ehandler;
        var x = pos.x, y = pos.y;
        var calendar;
        for(var p in eh.calendarSet){
            calendar = eh.calendarSet[p];
            if(true !== calendar.hide){
                break;
            }
        }
        var endRow = x+this.numInHour;
        var cs = this.calendarSetting;
        if(endRow > cs.rowCount){
            endRow = cs.rowCount;
        }        
        var event = {
            eventId:'prepare',
            calendarId:calendar.id,
            color:calendar.color,
            startRow:x,
            endRow:endRow,
            day:cview.daySet[y].format('Y-m-d'),
            eday:cview.daySet[y].format('Y-m-d'),
            span:1,
            colIndex:0,
            repeatType:'no'
        };
        return this.renderEvent(cview, [event], y, true);
    },

    generateInfo:function(event){
        var startRow = event.startRow;
        var endRow = event.endRow;
        var hm;
        if(0 == startRow && this.rowCount == endRow){
            hm = event.day;
            if(event.day != event.eday){
                hm += ' to '+event.eday;
            }
            hm += ' '+Ext.ux.calendar.Mask.EventHandler['wholeDay'];
            return hm;
        }else{
            hm = event.day+' '+Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, startRow, this.hourFormat)+' to ';
            if(event.day != event.eday){
                hm += event.eday+' ';
            }
            hm += Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, endRow, this.hourFormat);
            return hm;
        }
    },

    generateTitle:function(event){
        var startRow = event.startRow;
        var endRow = event.endRow;
        if(0 == startRow && this.rowCount == endRow){
            return Ext.ux.calendar.Mask.EventHandler['wholeDay'];
        }else{            
            var hm = Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, startRow, this.hourFormat)+'-'+
                Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, endRow, this.hourFormat);
            return hm;
        }
    },
    getContentEl:function(coverEl){
        return coverEl.child('.x-event-content-default');
    },
    getTitleEl:function(coverEl){
        return coverEl.child('.x-event-title-default');
    },
    getBottomEl:function(coverEl){
        return coverEl.child('.x-event-bottom-default');
    },
    getLeftTopEl:function(coverEl){
        return coverEl.child('.x-event-lt-default');
    },
    getRightTopEl:function(coverEl){
        return coverEl.child('.x-event-rt-default');
    },
    /*
     * this function is for render Event
     * @param {Class} cview: an instance of DayView or MonthView; the container where these events to render
     * @param {Array} rs: an array of events to render
     * @param {int} col: the index of column in cview to render the events,
     * for DayView, it's always 0, for WeekView, it's from 0 to 6, for MonthView, it's from 0 to 27
     */
    renderEvent:function(cview, rs, col, full){
        var bl = cview.cbody.getLeft(), bt = cview.cbody.getTop();
        var coverEl;
        
        for(var i = 0, len = rs.length; i < len; i++){
            var e = rs[i];            
            var arr = Ext.DomQuery.select('div[eid='+e.eventId+']', cview.body.dom);
            for(var j = 0, size = arr.length; j < size; j++){
                var eEl = Ext.get(arr[j]);                
                if(eEl.col == col || eEl.nol == col){
                    if(this.editingId == eEl.dom.id){
                        delete(this.editingId);
                        this.editDisabled = false;
                    }
                    this.freeEventEl(eEl);
                }
            }            
        }
        for(var i = 0, len = rs.length; i < len; i++){
            var e = rs[i];            
            var pn = Ext.get(cview.id+'-x-dayview-viewer-'+e.startRow+'-'+col);
            var cl = pn.getLeft();
            var tw = pn.getWidth();
            var offset = Math.round(tw*cview.offsetPercent);
            var cw = tw-offset;
            if(full){
                cw = tw;
            }
            var ct = pn.getTop();            
            var ch = (pn.getHeight()+1)*(e.endRow-e.startRow)-24;
            var r = cw/Math.pow(e.span, this.posRatio)*e.colIndex;
            var rest = cw-r;
            var x = Math.round(cl-bl+offset+r);
            if(full){
                x = Math.round(cl-bl+r);
            }
            var y = Math.round(ct-bt);
            if(true == e.last && 0 != e.colIndex){
                r = 1;
            }else{
                r = Math.pow(this.widthRatio, e.span-1-e.colIndex);
            }
            var w = Math.floor(rest*r);
            var leftStyle = 5, rightStyle = 5;
            var mw = w-leftStyle-rightStyle;
            var zindex = this.baseIndex+e.colIndex;
            var coverStyle = 'top:'+y+'px;left:'+x+'px;width:'+w+'px;z-index:'+zindex+';';
            var contentStyle = 'height:'+ch+'px;';
            if(Ext.isIE){
                contentStyle += 'width:'+w+'px;';
            }
            var titleStyle = 'width:'+mw+'px;';
            var bottomStyle = 'width:'+mw+'px;';            
            var subject = e.subject || '';
            if('' === subject.trim()){
                subject = Ext.ux.calendar.Mask.EventHandler['untitled'];
            }
            var color = e.color;
            if(this.calendarSet){
                color = this.calendarSet[e.calendarId].color;
            }
            var html = this.eventTpl.apply({
                'id':e.eventId,
                'calendarId':e.calendarId,
                'color':color,
                'cover-style':coverStyle,
                'content-style':contentStyle,
                'title-style':titleStyle,
                'bottom-style':bottomStyle,
                'left-style':'width:'+leftStyle+'px;',
                'right-style':'width:'+rightStyle+'px;',                
                'title':this.generateTitle(e),
                'time':this.generateInfo(e),
                'subject':subject,
                'content':e.content || '',
                'day':e.day,
                'eday':e.eday,
                'repeatType':e.repeatType,
                'alertFlag':e.alertFlag,
                'locked':e.locked
            });
            var coverel = Ext.DomHelper.insertHtml('beforeEnd', pn.dom, html);
            coverEl = Ext.get(coverel);
            if(coverEl){
                var contentEl = this.getContentEl(coverEl);
                var titleEl = this.getTitleEl(coverEl);
                var bottomEl = this.getBottomEl(coverEl);
                var ltEl = this.getLeftTopEl(coverEl);
                var rtEl = this.getRightTopEl(coverEl);

                e.eId = coverEl.id;
                coverEl.bindEvent = Ext.apply({}, e);
                coverEl.cview = cview;
                coverEl.col = col;
                coverEl.cEl = pn;
                coverEl.titleEl = titleEl;
                coverEl.contentEl = contentEl;
                coverEl.bottomEl = bottomEl;
                coverEl.ltEl = ltEl;
                coverEl.rtEl = rtEl;
                coverEl.leftStyle = leftStyle;
                coverEl.rightStyle = rightStyle;
                
                contentEl.coverEl = coverEl;
                contentEl.bindEvent = Ext.apply({}, e);
                contentEl.cview = cview;
                contentEl.cEl = pn;
                contentEl.col = col;                
            }
        }
        cview.resizePort();
        this.floating = false;
        return coverEl;
    },

    getIndexFromDay:function(cview, day){
        return cview.getIndexFromDay(day);
    },
    /*
     * For create an event and add it in LayoutGrid
     * @param {Object} event: the event config to create
     * @param {Class} cview: an instance of DayView or MonthView; the container where these events to render
     * @param {int} col: the index of column in cview to render the events,
     * for DayView, it's always 0, for WeekView, it's from 0 to 6, for MonthView, it's from 0 to 27
     */
    createEvent:function(event, cview, col){        
        this.ds.createEvent(event, function(backObj){
            event.eventId = backObj.id;
            this.createEventToLayout(event, cview, col);
            this.fireEvent('changeEventCache', this);
        }, this);
    },

    createEventToLayout:function(event, cview, col){
        if(false === Ext.type(col)){
            col = this.getIndexFromDay(cview, event.day);
        }
        var glayout = this.calendarLayout;
        var all = (0 == event.startRow && this.rowCount == event.endRow) || (event.day != event.eday);
        if(all){
            glayout.updateWholeList([event], 'add');
            cview.checkLayout(Ext.isIE);
        }else{
            var layout = glayout.getLayout(event.day, cview);
            if(layout){                
                var rs = layout.updateLayout(event, 'add');
                if(cview instanceof Ext.ux.calendar.DayView){
                    this.renderEvent(cview, rs.elist, col);
                }else{
                    cview.checkLayout();
                }
            }
        }
    },

    createRepeatEvent:function(event, cview, col){        
        this.ds.createUpdateRepeatEvent(event, null, function(backObj){
            event.eventId = backObj.id;
            var gLayout = this.calendarLayout;
            gLayout.updateRepeatEventList(cview, [event], 'add');
            this.fireEvent('changeEventCache', this);
        }, this);
    },
    /*
     * For update an event and update it in LayoutGrid
     * @param {Object} event: the event config to create
     * @param {Class} cview: an instance of DayView or MonthView; the container where these events to render
     * @param {int} col: the index of column in cview to render the events,
     * for DayView, it's always 0, for WeekView, it's from 0 to 6, for MonthView, it's from 0 to 27
     * @param {Object} oevent: the old event config
     * @param {boolean or function} noLayout: if not null means no need update LayoutGrid, also can be a callback function
     */
    updateEvent:function(event, cview, ocol, oevent, noLayout){
        this.ds.updateEvent(event, function(backObj){            
            this.updateEventCallback(event, cview, ocol, oevent, noLayout);
        }, this);
    },

    updateEventCallback:function(event, cview, ocol, oevent, noLayout){
        if('function' === Ext.type(noLayout)){
                noLayout(event);
            }
            var all = ((0 == event.startRow && this.rowCount == event.endRow) || (event.day != event.eday)), oall = false;
            var col;
            var glayout = this.calendarLayout;
            if(oevent){
                if(false === Ext.type(ocol)){
                    ocol = this.getIndexFromDay(cview, oevent.day);
                }
                oall = ((0 == oevent.startRow && this.rowCount == oevent.endRow) || (oevent.day != oevent.eday));
                var olayout = this.calendarLayout.getLayout(oevent.day, cview);
                if(oevent.day != event.day){
                    col = this.getIndexFromDay(cview, event.day);
                    var rs = olayout.updateLayout(oevent, 'delete');
                    if(rs.elist && cview instanceof Ext.ux.calendar.DayView){
                        var arr = Ext.DomQuery.select('div[name=x-event-'+oevent.day+'-'+oevent.eday+'-'+oevent.eventId+']', cview.body.dom);
                        for(var i = 0, len = arr.length; i < len; i++){
                            this.freeEventEl(Ext.get(arr[i]));
                        }
                        this.renderEvent(cview, rs.elist, ocol);
                    }
                }else{
                    col = ocol;
                    if(oall != all){
                        var rs = olayout.updateLayout(oevent, 'delete');
                        if(rs.elist && cview instanceof Ext.ux.calendar.DayView){
                            var arr = Ext.DomQuery.select('div[name=x-event-'+oevent.day+'-'+oevent.eday+'-'+oevent.eventId+']', cview.body.dom);
                            for(var i = 0, len = arr.length; i < len; i++){
                                this.freeEventEl(Ext.get(arr[i]));
                            }
                            this.renderEvent(cview, rs.elist, ocol);
                        }
                    }
                }
            }else{
                if(false == Ext.type(ocol)){
                    col = this.getIndexFromDay(cview, event.day);
                }else{
                    col = ocol;
                }
            }
            if(all){
                glayout.updateWholeList([event], 'update');
            }else{
                var layout = glayout.getLayout(event.day, cview);
                if(layout){
                    var rs = layout.updateLayout(event, 'update');
                    if(false != Ext.type(col) && rs.elist && cview instanceof Ext.ux.calendar.DayView){
                        this.renderEvent(cview, rs.elist, col);
                    }
                }
            }
            if((oall || all) && cview instanceof Ext.ux.calendar.DayView){
                cview.checkLayout(Ext.isIE);
            }
            if(cview instanceof Ext.ux.calendar.MonthView){
                cview.checkLayout(true);
            }
            this.fireEvent('changeEventCache', this);
    },
    /*
     * For delete an event and delete it in LayoutGrid
     * @param {Object} event: the event config to create
     * @param {Class} cview: an instance of DayView or MonthView; the container where these events to render
     * @param {int} col: the index of column in cview to render the events,
     * for DayView, it's always 0, for WeekView, it's from 0 to 6, for MonthView, it's from 0 to 27
     * @param {boolean} keep: whether keep the edit status for the editing event
     */
    deleteEvent:function(event, cview, col, keep){
        this.ds.deleteEvent(event, function(backObj){
            this.deleteEventFromLayout(event, cview, col);
            if(Ext.isIE && (event.day != event.eday || (0 == event.startRow) && (this.rowCount == event.endRow))){
                cview.checkLayout(true);
            }
            this.fireEvent('changeEventCache', this);
        }, this);
    },

    deleteEventFromLayout:function(event, cview, col){
        var glayout = this.calendarLayout;

        var all = (0 == event.startRow && this.rowCount == event.endRow) || (event.day != event.eday);
        if(all){
            glayout.updateWholeList([event], 'delete');
            cview.checkLayout();
        }else{
            var layout = glayout.getLayout(event.day, cview);
            if(layout){
                var rs = layout.updateLayout(event, 'delete');
                if(false != Ext.type(col) && cview instanceof Ext.ux.calendar.DayView){
                    this.renderEvent(cview, rs.elist, col);
                }
            }
        }
    },

    deleteRepeatEvent:function(event, cview, makeException){
        if(makeException){            
            var eps = event.repeatType.exceptions || {};
            eps[event.day] = true;
            event.repeatType.exceptions = eps;
        }
        this.ds.deleteRepeatEvent(event, makeException, function(backObj){
            var gLayout = this.calendarLayout;
            if(makeException){
                gLayout.updateRepeatEventList(cview, [event], 'update');
            }else{
                gLayout.updateRepeatEventList(cview, [event], 'delete');
            }            
            this.fireEvent('changeEventCache', this);
        }, this);
    },
		
    /*
     * For create an event and add it in LayoutGrid
     * @param {Element} eEl: the event element where the editor align to
     * @param {Class} cview: the view container
     * @param {boolean or function} noLayout: if not null means no need update the LayoutGrid, also can be a callback function
     */
    showEditor:function(eEl, cview, action, noLayout){        
        this.editor.popup({
            bindEl:eEl,
            cview:cview,
            action:action,            
            noLayout:noLayout
        });
    },
    /*
     * for set the pin-on class for event element
     */
    setPinOn:function(coverEl){
        var pinEl = coverEl.child('img');
        pinEl.removeClass('x-calendar-event-pin-off');
        pinEl.addClass('x-calendar-event-pin-on');
    },
    /*
     * for set the pin-off class for event element
     */
    setPinOff:function(coverEl){
        var pinEl = coverEl.child('img');
        pinEl.removeClass('x-calendar-event-pin-on');
        pinEl.addClass('x-calendar-event-pin-off');
    },

    onPinElClickFn:function(e){
        e.stopEvent();
        var target = e.getTarget();
        var tgEl = Ext.get(target);
        if(tgEl.hasClass('x-calendar-event-pin-off')){
            tgEl.removeClass('x-calendar-event-pin-off');
            tgEl.addClass('x-calendar-event-pin-on');
            this.editDisabled = true;
        }else{
            tgEl.removeClass('x-calendar-event-pin-on');
            tgEl.addClass('x-calendar-event-pin-off');
            this.editDisabled = false;
        }
    },
    
    /*
     * set the editing status for an event
     */
    setEditingStatus:function(coverEl, forceFlag, pinFlag){        
        var coverFlag = null;
        if(coverEl.hasClass('x-event-cover')){
            coverFlag = 'event';
        }
        var editCover = Ext.get(this.editingId);
        var bindEvent = coverEl.bindEvent;                
        var titleEl = coverEl.titleEl;
        var contentEl = coverEl.contentEl;
        var bottomEl = coverEl.bottomEl;
        var flag = false;        
        if(true != this.floating){
            if(true !== this.editDisabled){
                flag = true;
            }else if(true === forceFlag){
                flag = true;
                if(this.editingId != coverEl.dom.id){
                    this.editDisabled = false;
                }
                if(editCover){
                    this.setPinOff(editCover);
                }
            }
        }
        if(flag){            
            if(editCover){
                this.removeEditingStatus(editCover);
            }
            this.editingId = coverEl.dom.id;
            coverEl.setStyle('z-index', 3009);
            if(coverFlag){
                coverEl.addClass('x-event-editing');
            }
            var color = this.calendarSet[bindEvent.calendarId].color;
            if(coverEl.hasClass('x-event-cover')){
                if(titleEl){
                    titleEl.addClass('x-calendar-'+color+'-event-top');
                    titleEl.removeClass('x-calendar-'+color+'-event-top-clear');
                }
                var ltEl = coverEl.ltEl;
                if(ltEl){
                    ltEl.addClass('x-calendar-'+color+'-event-ltcorner');
                    ltEl.removeClass('x-calendar-'+color+'-event-ltcorner-clear');
                }
                var rtEl = coverEl.rtEl;
                if(rtEl){
                    rtEl.addClass('x-calendar-'+color+'-event-rtcorner');
                    rtEl.removeClass('x-calendar-'+color+'-event-rtcorner-clear');
                }
            }
        }
        var cw = coverEl.getWidth();
        var w = cw;
        if(coverEl.leftStyle && coverEl.rightStyle){
            w = cw-coverEl.leftStyle-coverEl.rightStyle;
        }        
        if(titleEl && coverFlag){
            titleEl.setWidth(w);
        }
        if(Ext.isIE && contentEl && coverFlag){
            contentEl.setWidth(cw);
        }
        if(bottomEl){
            bottomEl.setWidth(w);
        }
        if(false !== Ext.type(pinFlag)){
            this.editDisabled = pinFlag;
        }
        if(this.editDisabled){
            this.setPinOn(coverEl);
        }
    },

    removeEditingStatus:function(coverEl){
        var bindEvent = coverEl.bindEvent;
        var index = this.baseIndex;
        if(bindEvent.colIndex){
            index += bindEvent.colIndex;
        }
        coverEl.setStyle('z-index', index.toString());
        coverEl.removeClass('x-event-editing');
        var color = this.calendarSet[bindEvent.calendarId].color;        
        var titleEl = coverEl.titleEl;
        if(titleEl){
            titleEl.removeClass('x-calendar-'+color+'-event-top');
            if(coverEl.cview instanceof Ext.ux.calendar.DayView && !(0 == bindEvent.startRow && this.rowCount == bindEvent.endRow)){
                titleEl.addClass('x-calendar-'+color+'-event-top-clear');
            }
        }
        var ltEl = coverEl.ltEl;
        if(ltEl){
            ltEl.removeClass('x-calendar-'+color+'-event-ltcorner');
            ltEl.addClass('x-calendar-'+color+'-event-ltcorner-clear');
        }
        var rtEl = coverEl.rtEl;
        if(rtEl){
            rtEl.removeClass('x-calendar-'+color+'-event-rtcorner');
            rtEl.addClass('x-calendar-'+color+'-event-rtcorner-clear');
        }
    },        

    generateLegend:function(cview, e){        
        var subject = e.subject || '';
        if('' === subject.trim()){
            subject = Ext.ux.calendar.Mask.EventHandler['untitled'];
        }
        var html;
        var color = e.color;
        if(this.calendarSet){
            color = this.calendarSet[e.calendarId].color;
        }
        if((0 == e.startRow && this.rowCount == e.endRow) || (e.day != e.eday)){
            html = this.wholeTpl.apply({                
                'id':e.eventId,
                'lflag':e.lflag || false,
                'rflag':e.rflag || false,
                'calendarId':e.calendarId,
                'color':color,
                'title':this.generateTitle(e),
                'time':this.generateInfo(e),
                'subject':subject,
                'content':e.content || '',
                'day':e.day,
                'eday':e.eday,
                'repeatType':e.repeatType,
                'alertFlag':e.alertFlag,
                'locked':e.locked
            });
        }else{
            html = this.legendTpl.apply({
                'id':e.eventId,
                'calendarId':e.calendarId,
                'color':color,
                'title':this.generateTitle(e),
                'time':this.generateInfo(e),
                'subject':subject,
                'content':e.content || '',
                'day':e.day,
                'eday':e.eday,
                'repeatType':e.repeatType,
                'alertFlag':e.alertFlag,
                'locked':e.locked
            });
        }
        return html;
    },

    /*
     * for delete an event from monthView or the pool of DayView
     * @param {Class} cview: an instance of DayView or MonthView; the container where these events to render
     * @param {Array} rs: an array of events to render
     * @param {Element} pn: the parent node where this event Element belong to
     */
    deleteLegend:function(event, cview, pn){
        var pos = cview.getCellIndex(pn.dom.id);
        var index = pos.x*cview.dayNum+pos.y;
        var layout = this.calendarLayout.getLayout(cview.daySet[index], cview);
        var rs = layout.updateLayout(event, 'delete');
    },
    
    /*
     * for create a calendar
     * @param {Element} pn: the parent node where this event Element belong to
     * @param {Class} cview: an instance of DayView or MonthView; the container where these events to render
     * @param {string} pos: the postition to insert
     * @param {Class} calendar: the calendar ready to create
     */
    createCalendar:function(pnode, cview, pos, calendar){
        var legendStyle = 'height:9px;';
        var html = this.calendarDropTpl.apply({
            'legend-style':legendStyle,
            'title':calendar.name,
            'calendarId':calendar.id,
            'color':calendar.color
        });
        var nel, calendarEl;
        if('beforeBegin' == pos){
            nel = Ext.DomHelper.insertHtml('beforeBegin', pnode.dom.firstChild, html);
        }else{
            nel = Ext.DomHelper.insertHtml('beforeEnd', pnode.dom, html);
        }
        calendarEl = Ext.get(nel);
        if(calendarEl){
            calendarEl.addClassOnOver('x-calendar-over');
            calendarEl.calendar = calendar;            
            this.initCalendar(calendarEl);
        }
        return calendarEl;
    },

    initCalendar:function(calendarEl){
        calendarEl.on('click', this.onCalendarElClickFn, {
            cEl:calendarEl,
            sp:this
        });
        calendarEl.on('dblclick', this.onCalendarElDblClickFn, {
            cEl:calendarEl,
            sp:this
        });
    },

    onCalendarElDblClickFn:function(e){
        var sp = this.sp;
        var cEl = this.cEl;
        var calendar = cEl.calendar;
        sp.ceditor.popup({
            data:calendar,
            cEl:cEl
        });
    },

    onCalendarElClickFn:function(e){
        var sp = this.sp;
        var cEl = this.cEl;
        var calendar = cEl.calendar;
        var tgEl = Ext.get(e.getTarget());
        if(tgEl.hasClass('x-legend-tool')){
            sp.menu.palette.calendar = calendar;
            sp.showMenu(cEl, tgEl);
        }else{
            calendar.hide = !calendar.hide;
            sp.ds.createUpdateCalendar(calendar, function(backObj){
                if(calendar.hide){
                    sp.hideCalendar(calendar, true);
                    sp.hideCalendarColor(cEl, calendar.color);
                }else{
                    sp.hideCalendar(calendar, false);
                    sp.showCalendarColor(cEl, calendar.color);
                }
            }, this);
        }
    },
    /*
     * for change the color of a calendar
     */
    onCalendarColorChangedFn:function(cp, color){
        if(true !== cp.still){
            color = Ext.ux.calendar.Mask.getIndexByColor(color);
            if(color){
                this.changeColor(cp.calendar, color);
            }
            this.menu.hide();
        }
    },
    /*
     * for change the color of an event Element
     */
    changeEventColor:function(eEl, oldColor, color){
        var ltEl = eEl.child('.x-calendar-'+oldColor+'-event-ltcorner-clear');
        if(ltEl){
            ltEl.removeClass('x-calendar-'+oldColor+'-event-ltcorner-clear');
            ltEl.addClass('x-calendar-'+color+'-event-ltcorner-clear');
        }
        ltEl = eEl.child('.x-calendar-'+oldColor+'-event-ltcorner');
        if(ltEl){
            ltEl.removeClass('x-calendar-'+oldColor+'-event-ltcorner');
            ltEl.addClass('x-calendar-'+color+'-event-ltcorner');
        }

        var rtEl = eEl.child('.x-calendar-'+oldColor+'-event-rtcorner-clear');
        if(rtEl){
            rtEl.removeClass('x-calendar-'+oldColor+'-event-rtcorner-clear');
            rtEl.addClass('x-calendar-'+color+'-event-rtcorner-clear');
        }
        rtEl = eEl.child('.x-calendar-'+oldColor+'-event-rtcorner');
        if(rtEl){
            rtEl.removeClass('x-calendar-'+oldColor+'-event-rtcorner');
            rtEl.addClass('x-calendar-'+color+'-event-rtcorner');
        }

        var tEl = eEl.child('.x-calendar-'+oldColor+'-event-top-clear');
        if(tEl){
            tEl.removeClass('x-calendar-'+oldColor+'-event-top-clear');
            tEl.addClass('x-calendar-'+color+'-event-top-clear');
        }
        tEl = eEl.child('.x-calendar-'+oldColor+'-event-top');
        if(tEl){
            tEl.removeClass('x-calendar-'+oldColor+'-event-top');
            tEl.addClass('x-calendar-'+color+'-event-top');
        }

        var lrEl = eEl.child('.x-calendar-'+oldColor+'-event-lr');
        if(lrEl){
            lrEl.removeClass('x-calendar-'+oldColor+'-event-lr');
            lrEl.addClass('x-calendar-'+color+'-event-lr');
        }

        var lbEl = eEl.child('.x-calendar-'+oldColor+'-event-lbcorner');
        if(lbEl){
            lbEl.removeClass('x-calendar-'+oldColor+'-event-lbcorner');
            lbEl.addClass('x-calendar-'+color+'-event-lbcorner');
        }

        var rbEl = eEl.child('.x-calendar-'+oldColor+'-event-rbcorner');
        if(rbEl){
            rbEl.removeClass('x-calendar-'+oldColor+'-event-rbcorner');
            rbEl.addClass('x-calendar-'+color+'-event-rbcorner');
        }

        var bEl = eEl.child('.x-calendar-'+oldColor+'-event-bottom');
        if(bEl){
            bEl.removeClass('x-calendar-'+oldColor+'-event-bottom');
            bEl.addClass('x-calendar-'+color+'-event-bottom');
        }
    },

    changeWholeColor:function(wEl, oldColor, color){
        var titleEl = wEl.child('.x-whole-title-'+oldColor);
        if(titleEl){
            titleEl.removeClass('x-whole-title-'+oldColor);
            titleEl.addClass('x-whole-title-'+color);
        }
        var leftEl = wEl.child('.x-calendar-'+oldColor+'-whole-left');
        if(leftEl){
            leftEl.removeClass('x-calendar-'+oldColor+'-whole-left');
            leftEl.addClass('x-calendar-'+color+'-whole-left');
        }
        var rightEl = wEl.child('.x-calendar-'+oldColor+'-whole-right');
        if(rightEl){
            rightEl.removeClass('x-calendar-'+oldColor+'-whole-right');
            rightEl.addClass('x-calendar-'+color+'-whole-right');
        }
    },

    changeCalendarColor:function(cEl, oldColor, color){
        var hide;
        var titleEl = cEl.child('.x-whole-title-'+oldColor);
        if(titleEl){
            hide = false;
            titleEl.removeClass('x-whole-title-'+oldColor);            
            titleEl.addClass('x-whole-title-'+color);            
        }else{
            hide = true;            
            var bEl = cEl.child('.x-calendar-title-b');
            if(bEl){                
                bEl.setStyle('color', '#'+Ext.ux.calendar.Mask.getColorByIndex(color));
            }
        }
        if(false == hide){
            var leftEl = cEl.child('.x-calendar-'+oldColor+'-whole-left');
            if(leftEl){
                leftEl.removeClass('x-calendar-'+oldColor+'-whole-left');
                leftEl.addClass('x-calendar-'+color+'-whole-left');
            }
            var rightEl = cEl.child('.x-calendar-'+oldColor+'-whole-right');
            if(rightEl){
                rightEl.removeClass('x-calendar-'+oldColor+'-whole-right');
                rightEl.addClass('x-calendar-'+color+'-whole-right');
            }
        }
    },

    hideCalendarColor:function(cEl, oldColor){
        var leftEl = cEl.child('.x-calendar-'+oldColor+'-whole-left');
        if(leftEl){
            leftEl.removeClass('x-calendar-'+oldColor+'-whole-left');
        }
        var rightEl = cEl.child('.x-calendar-'+oldColor+'-whole-right');
        if(rightEl){
            rightEl.removeClass('x-calendar-'+oldColor+'-whole-right');
        }
        var titleEl = cEl.child('.x-whole-title-'+oldColor);
        if(titleEl){
            titleEl.removeClass('x-whole-title-'+oldColor);            
        }
        var bEl = cEl.child('.x-calendar-title-b');
        if(bEl){
            var color = Ext.ux.calendar.Mask.getColorByIndex(oldColor);
            bEl.setStyle('color', '#'+color);
        }
    },
    
    showCalendarColor:function(cEl, oldColor){
        var leftEl = cEl.child('.x-whole-left');
        if(leftEl){
            leftEl.addClass('x-calendar-'+oldColor+'-whole-left');
        }
        var rightEl = cEl.child('.x-whole-right');
        if(rightEl){
            rightEl.addClass('x-calendar-'+oldColor+'-whole-right');
        }
        var titleEl = cEl.child('.x-calendar-title');
        if(titleEl){
            titleEl.addClass('x-whole-title-'+oldColor);
        }
        var bEl = cEl.child('.x-calendar-title-b');
        if(bEl){            
            bEl.setStyle('color', 'white');
        }
    },

    changeLegendColor:function(lEl, oldColor, color){        
        var bEl = lEl.child('.x-legend-title-'+oldColor);
        if(bEl){
            bEl.removeClass('x-legend-title-'+oldColor);
            bEl.addClass('x-legend-title-'+color);
        }
    },
    /*
     * for change color of a calendar and all events belong to it
     * @param {Obj} calendar: the obj of calendar
     * @param {int} index: the index of the color
     */
    changeColor:function(calendar, index){
        var oldColor = calendar.color;
        calendar.color = index;
        this.ds.createUpdateCalendar(calendar, function(backObj){
            if("true" == backObj.success){
                this.calendarSet[calendar.id].color = index;
                var calendarEl = Ext.get(this.id+'-x-calendar-'+calendar.id);
                if(calendarEl){                    
                    this.changeCalendarColor(calendarEl, oldColor, calendar.color);
                }
                var mainBody = this.mainPanel.body;
                var events = Ext.DomQuery.select('.'+this.id+'-x-calendar-'+calendar.id+'-event', mainBody.dom);
                if(events){
                    for(var i = 0, len = events.length; i < len; i++){
                        var eEl = Ext.get(events[i]);
                        this.changeEventColor(eEl, oldColor, calendar.color);
                    }
                }
                var wholes = Ext.DomQuery.select('.'+this.id+'-x-calendar-'+calendar.id+'-whole', mainBody.dom);
                if(wholes){
                    for(var i = 0, len = wholes.length; i < len; i++){
                        var wEl = Ext.get(wholes[i]);
                        this.changeWholeColor(wEl, oldColor, calendar.color);
                    }
                }
                var legends = Ext.DomQuery.select('.'+this.id+'-x-calendar-'+calendar.id+'-legend', mainBody.dom);
                if(legends){
                    for(var i = 0, len = legends.length; i < len; i++){
                        var lEl = Ext.get(legends[i]);
                        this.changeLegendColor(lEl, oldColor, calendar.color);
                    }
                }                
                var cview = this.mainPanel.calendarContainer.getLayout().activeItem;
                if(cview instanceof Ext.ux.calendar.ResultView){
                    cview.list.getView().refresh();
                }
                this.fireEvent('changeCalendarColor', this, calendar, oldColor, calendar.color);                
            }
        }, this);
    },
    
    /*
     * For destory an Event and its Element
     */
    freeEventEl:function(El){        
        El.remove();
    },
    
    pushDayCache:function(startDate, endDate){
        var day = startDate.format('Y-m-d');
        var date = startDate;
        var endDay = endDate.format('Y-m-d');
        while(day <= endDay){
            this.dayCache[day] = date;
            date = date.add(Date.DAY, 1);
            day = date.format('Y-m-d');
        }
    },
    
    isInDayCache:function(startDate, endDate){
        var flag = true;
        var day = startDate.format('Y-m-d');
        var date = startDate;
        var endDay = endDate.format('Y-m-d');
        while(day <= endDay){
            if(!this.dayCache[day]){
                flag = false;
                break;
            }
            date = date.add(Date.DAY, 1);
            day = date.format('Y-m-d');
        }
        return flag;
    },   

    bindEvent2Detail:function(cview, events, detailCt){
        var html = '';
        for(var i = 0, len = events.length; i < len; i++){
            var e = events[i];
            html += this.generateLegend(this, e);
        }
        detailCt.dom.innerHTML = html;
        for(var i = 0, len = detailCt.dom.childNodes.length; i < len; i++){
            var e = Ext.apply({}, events[i]);
            var el = detailCt.dom.childNodes[i];
            var El = Ext.get(el);
            El.bindEvent = e;
            El.cview = cview;
        }
    },

    updateRepeatEvent:function(event, cview, oevent){
        if('string' == Ext.type(event.repeatType)){
            var eps = oevent.repeatType.exceptions || {};
            eps[oevent.day] = true;
            oevent.repeatType.exceptions = eps;            
        }
        this.ds.createUpdateRepeatEvent(event, oevent, function(backObj){
            var gLayout = this.calendarLayout;
            if(backObj.id){
                event.eventId = backObj.id;
            }
            if('string' == Ext.type(oevent.repeatType)){
                this.deleteEventFromLayout(oevent, cview);
                gLayout.updateRepeatEventList(cview, [event], 'update');
            }else if('string' == Ext.type(event.repeatType)){
                this.createEventToLayout(event, cview);
                if('exception' == event.repeatType){                    
                    gLayout.updateRepeatEventList(cview, [oevent], 'update');
                }else{
                    gLayout.updateRepeatEventList(cview, [oevent], 'delete');
                }                
            }else{
                gLayout.updateRepeatEventList(cview, [event], 'update');
            }
            this.fireEvent('changeEventCache', this);
        }, this);
    },

    loadRepeatEvent:function(fn, scope){
        this.ds.loadRepeatEvent(function(eventSet){            
            this.calendarLayout.repeatSet = eventSet;
            fn.call(scope);
        }, this);
    },

    getStartDateInWeek:function(date, cview){
        var sDate;
        if(1 == this.startDay){
            var n = date.format('N');
            sDate= date.add(Date.DAY, 1-n);
        }else{
            var w = -date.format('w');
            if((5 == cview.dayNum && cview instanceof Ext.ux.calendar.DayView) 
                || (5 == cview.colNum && cview instanceof Ext.ux.calendar.MonthView)){
                w++;
            }
            sDate= date.add(Date.DAY, w);
        }
        return sDate;
    },

    loadCalendar:function(ownedCt, sharedCt){
        this.ds.loadCalendar(function(backObj){            
            var owned = backObj.owned;
            var shared = backObj.shared;
            this.calendarSet = {};
            if(0 < owned.length || 0 < shared.length){
                var calendar;
                for(var i = 0, len = owned.length; i < len; i++){
                    calendar = owned[i];                    
                    this.calendarSet[calendar.id] = calendar;
                }
                for(var i = 0, len = shared.length; i < len; i++){
                    calendar = shared[i];                    
                    this.calendarSet[calendar.id] = calendar;
                }
                this.loadRepeatEvent(function(){
                    this.fireEvent('calendarloaded');
                }, this);
                if(ownedCt){
                    this.renderOwnedCalendar(ownedCt);
                }
                if(sharedCt){
                    this.renderSharedCalendar(sharedCt);
                }
            }
        }, this);
    },

    renderOwnedCalendar:function(container){
        var cs = this.calendarSet;
        container.dom.innerHTML = '';        
        for(var q in cs){
            var calendar = cs[q];
            if(!calendar.isShared){
                var cEl = this.createCalendar(container, null, null, calendar);
                if(calendar.hide){
                    this.hideCalendarColor(cEl, calendar.color);
                }
            }
        }
    },

    renderSharedCalendar:function(container){
        var cs = this.calendarSet;
        container.dom.innerHTML = '';
        for(var q in cs){
            var calendar = cs[q];
            if(calendar.isShared){
                var cEl = this.createCalendar(container, null, null, calendar);
                if(calendar.hide){
                    this.hideCalendarColor(cEl, calendar.color);
                }
            }
        }
    },

    reloadCalendar:function(ownedCt, sharedCt, cflag){
        this.dayCache = {};
        this.calendarLayout.layoutSet = {};
        this.calendarLayout.wholeList = [];
        if(cflag){
            this.loadCalendar(ownedCt, sharedCt);
        }else{
            this.loadRepeatEvent(function(){
                this.fireEvent('calendarloaded');
            }, this);
        }
    }
});