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

Ext.ux.calendar.Mask = {
    'CalendarWin':{
        'title':'FeyaSoft MyCalendar 2.5.2',
        'loadMask.msg':'Please wait...'
    },

    'MainPanel':{
        'loadMask.msg':'Please wait...'
    },

    'SharingPopup':{
        'title':'Sharing Calendar'
    },

    'CalendarContainer':{
        'todayBtn.text':'Today',
        'dayBtn.text':'Day view',
        'weekBtn.text':'Week view',
        'monthBtn.text':'Month view',
        'weekMenu.showAll.text':'Show All',
        'weekMenu.onlyWeek.text':'Only Weekday',
        'monthMenu.showAll.text':'Show All',
        'monthMenu.onlyWeek.text':'Only Weekday',
        'moreMenu.setting.text':'Setting',
        'moreMenu.about.text':'About FeyaSoft MyCalendar',
        'moreBtn.text':'More',
        'searchCriteria.text':'Search',
        'moreMenu.showAlert.text':'Activate Alert Function',
        'moreMenu.language.text':'Language Setting'
    },

    'WestPanel':{
        'myCalendarPanel.title':'My Calendar',
        'otherCalendarPanel.title':'Other Calendar',
        'myShowAllBtn.text':'Show All',
        'myAddBtn.text':'New'
    },

    'EventHandler':{
        'showOnlyItem.text':'Show this only',
        'viewItem.hide.text':'Hide calendar',
        'viewItem.show.text':'Show calendar',
        'editItem.text':'Edit calendar',
        'deleteItem.text':'Delete calendar',
        'clearItem.text':'Empty calendar',
        'wholeDay':'Whole day',
        'untitled':'Untitled',
        'unlockItem.text':'Unlock',
        'lockItem.text':'Lock',
        'editEvent.title':'Edit Event',
        'deleteEvent.title':'Delete Event',
        'more':'More',
        'deleteRepeatPopup.title':'Confirm',
        'deleteRepeatPopup.msg':'Click "Yes" to delete all this repeat events, or click "No" to only delete the current event?',
        'updateRepeatPopup.title':'Confirm',
        'updateRepeatPopup.msg':'Click "Yes" to update for all this repeat events, or click "No" to only update for the current event?',
        'shareItem.text':'Share Calendar'
    },

    'Editor':{
        'startDayField.label':'Time',
        'endDayField.label':'To',
        'wholeField.label':'Whole day',
        'subjectField.label':'Subject',
        'contentField.label':'Content',
        'calendarField.label':'Calendar',
        'alertCB.label':'Remind when actived',
        'lockCB.label':'Locked',
        'deleteBtn.text':'Remove',
        'saveBtn.text':'Save',
        'cancelBtn.text':'Cancel',
        'new.title':'New Event',
        'edit.title':'Edit Event',
        'repeatTypeField.label':'Repeat Type',
        'repeatIntervalField.label':'Recur every ',
        'intervalUnitLabel.day.text':' Day(s) ',
        'intervalUnitLabel.week.text':' Week(s) ',
        'intervalUnitLabel.month.text':' Month(s) ',
        'intervalUnitLabel.year.text':' Year(s) ',
        'detailSetting':'Modify Detail...',
        'returnBtn.text':'Back',
        'startAndEnd':'Start and End',
        'repeatStartField.label':'Start',
        'repeatNoEndRG.label':'No end date',
        'repeatEndTimeRG.label':'End after',
        'repeatEndDateRG.label':'End by',
        'repeatEndTimeUnit':'occurrence(s)',
        'weekCheckGroup.label':'Repeat Day',
        'monthRadioGroup.label':'Repeat By',
        'repeatByDate':'Date',
        'repeatByDay':'Day',
        'alertLabel':'Reminder Setting',
        'alertEarly.label':'Early',
        'newAlertBtn.text':'New',
        'deleteAlertBtn.label':'Remove',
        'emailAlertEarlyInvalid':'The early time of Email Alert should be larger than 30 minutes.',
        'popupAlertEarlyInvalid':'The early time of Popup Alert should be less than 24 hours.',
        'repeatIntervalInvalid':'This value should be a positive integer!',
        'repeatBeginDayInvalid':'The repeat start date should not be later than repeat end date',
        'repeatEndDayInvalid':'The repeat end date should not be earlier than repeat start date',
        'repeatTimeInvalid':'This value should be a positive integer!'
    },

    'CalendarEditor':{
        'new.title':'New Calendar',
        'edit.title':'Edit Calendar',
        'nameField.label':'Name',
        'descriptionField.label':'Description',
        'clearBtn.text':'Clear',
        'saveBtn.text':'Save',
        'cancelBtn.text':'Cancel',
        'returnBtn.text':'Back',
        'shareCalendar':'Share Calendar With People',
        'shareColumns.user':'User',
        'shareColumns.permit':'Permit',
        'shareColumns.add':'Add User to Share',
        'shareColumns.remove':'Remove',
        'userField.emptyText':'Please input username or email address'
    },

    'ExpirePopup':{
        'hideCB.label':'Don\'t popup any more',
        'title':'Alerted Events',
        'tpl.calendar':'Calendar',
        'tpl.subject':'Subject',
        'tpl.content':'Content',
        'tpl.leftTime':'Left time',
        'hour':'Hour(s)',
        'minute':'Minute(s)',
        'untitled':'Untitled',
        'noContent':'No Content',
        'cancelReminder':'CANCEL',
        'editEvent':'EDIT'
    },

    'SettingPopup':{
        'title':'feyaCalendar Setting',
        'hourFormatField.label':'Hour Format',
        'dayFormatField.label':'Day Format of DayView',
        'weekFormatField.label':'Day Format of WeekView',
        'monthFormatField.label':'Day Format of MonthView',
        'applyBtn.text':'Apply',
        'resetBtn.text':'Reset',
        'closeBtn.text':'Close',
        'fromtoFormatField.label':'FromTo Format',
        'scrollStartRowField.label':'Scroll Start Row',
        'languageField.label':'Language',
        'generalForm.title':'General',
        'dwViewForm.title':'DayView|WeekView',
        'monthViewForm.title':'MonthView',
        'createByDblClickField.label':'Create Event by Double click',
        'singleDayField.label':'Cross Day Event',
        'weekStartDayField.label': 'Start Week Day',
        'activeStartTimeField.label':'Active Start Time',
        'activeEndTimeField.label':'Active End Time',
        'hideInactiveTimeField.label':'Hide Inactive Time',
        'readOnlyField.label':'Read Only',
        'intervalField.label':'Interval Slot',
        'startEndInvalid':'Active Start Time should be earlier than Active End Time!',
        'formatInvalid':'Example: 09:00',
        'initialViewField.label':'Initial View'
    },

    'ResultView':{
        'cm.date':'Date',
        'cm.calendar':'Calendar',
        'cm.time':'Time',
        'cm.subject':'Subject',
        'cm.content':'Content',
        'cm.expire':'Left time',
        'groupBtn.group.text':'Group',
        'groupBtn.unGroup.text':'Ungroup',
        'returnBtn.text':'Back',
        'hour':'Hour(s)',
        'noSubject':'(No Subject)',
        'noContent':'(No Content)',
        'loadMask.msg':'Please wait...'
    },

    'DayView':{
        'loadMask.msg':'Please wait...',
        'addItem.text':'New Event',
        'events':'events'
    },

    'MonthView':{
        'loadMask.msg':'Please wait...',
        'overview':'Overview',
        'showingEvents':'Showing Events',
        'totalEvents':'Total Events',
        'dayPre':'',
        'addItem.text':'New Event',
        'clearItem.text':'Clean Event',
        'cutItem.text':'Cut',
        'copyItem.text':'Copy',
        'pasteItem.text':'Paste',
        'events':'events'
    },

    'Mask':{
        '12Hours':'12 Hours',
        '24Hours':'24 Hours',
        'ar': 'Arabic',
        'de': 'German',
        'en':'American English',
        'es': 'Spanish',
        'fr': 'Français',
        'it': 'Italiano',
        'ja': 'Japanese',
        'lt': 'Lietuvių',
        'nl': 'Nederlandse',
        'pl': 'Polski',
        'pt': 'Portuguese',
        'ru': 'Russian',
        'zh_CN':'简体中文',
        'enable':'Enable',
        'disable':'Disable',
        'minute':'Minutes',
        'monday':'Monday',
        'sunday':'Sunday',
        'permitData':[
            [0, 'Read, Write and Share'],
            [1, 'Read and Write'],
            [2, 'Read only']
        ],
        'alertType':[
            ['popup', 'Popup Message'],
            ['email', 'Email']
        ],
        'popupAlertUnit':[
            ['minute', 'Minute(s)'],
            ['hour', 'Hour(s)']
        ],
        'alertUnit':[
            ['minute', 'Minute(s)'],
            ['hour', 'Hour(s)'],
            ['day', 'Day(s)'],
            ['wek', 'Week(s)']
        ],
        'initialView':[
            [0, 'Day View'],
            [1, 'Week View'],
            [2, 'Month View']
        ]
    },

    repeatType:[
        ['no', 'Not Repeat'],
        ['day', 'Daily'],
        ['week', 'Weekly'],
        ['month', 'Monthly'],
        ['year', 'Yearly']
    ],

    colors:['668CD9', 'D96666', '59BFB3', 'F2A442', '4CB052', 'B373B3'],

    colorIndex:["blue", "red", "cyan", "orange", "green", "purple"],

    getMinute:function(t, u){
        t = parseInt(t);
        if('hour' == u){
            t = t*60;
        }else if('day' == u){
            t = t*60*24;
        }else if('week' == u){
            t = t*60*24*7;
        }
        return t;
    },

    getColorByIndex:function(colorIndex){
        var mask = Ext.ux.calendar.Mask;
        for(var i = 0, len = mask.colorIndex.length; i < len; i++){
            if(colorIndex == mask.colorIndex[i]){
                return mask.colors[i];
            }
        }
        return null;
    },

    getIndexByColor:function(color){
        var mask = Ext.ux.calendar.Mask;
        for(var i = 0, len = mask.colors.length; i < len; i++){
            if(color == mask.colors[i]){
                return mask.colorIndex[i];
            }
        }
        return null;
    },
	
    getRepeatTypeStore:function() {
        var store = new Ext.data.SimpleStore({
                fields:['value', 'display'],
                data:Ext.ux.calendar.Mask.repeatType
        });
        return store;
    },
	getEventStore : function(url,pageSize) {
		var store = Ext.create('Ext.data.Store', {
					//sorters : ['ymd'],
					pageSize : pageSize,
					proxy : {
						type : 'ajax',
						url : url,
						reader : {
							type : 'json',
							root : 'results',
							totalProperty : 'total'
						}
					},
					groupField : 'ymd',
					fields :[{name: "id"},
			                {name: "calendarId"},
			                {name: "startTime"},
			                {name: "endTime"},
			                {name: "subject"},
			                {name: "description"},
			                {name: "ymd"},
			                {name: "eymd"},
			                {name: "color"},
			                {name: "isShared"},                
			                {name: "alertFlag"},
			                {name: "locked"},
			                {name: "repeatType"}]
					
				})
		return store;
	},
    getCalendarStore:function(){
        var store = new Ext.data.SimpleStore({
                fields:['id', 'title', 'description', 'color'],
                data:[]
        });
        return store;
    },
    
    getHourFormatStore:function(){
        var lan = Ext.ux.calendar.Mask.Mask;
    	var store = new Ext.data.SimpleStore({
                fields:['id', 'text'],
                data:[
                        ['12', lan['12Hours']],
                        ['24', lan['24Hours']]
                ]
        });
        return store;
    },

    getLanguageConfig:function(){
        /*
         * you can change the data here, add/substract languages. But notice you need have the related file under multi-language folder first;
         * For example, ['en', 'American English'], this means there is a file named en_US.js under multi-language folder
         */
        var lan = Ext.ux.calendar.Mask.Mask;
        var data = [
            ['en', lan['en']],
            ['es', lan['es']],
            ['de', lan['de']],
            ['fr', lan['fr']],
            ['it', lan['it']],
            ['lt', lan['lt']],
            ['nl', lan['nl']],
            ['pl', lan['pl']],
            ['pt', lan['pt']],
            ['zh_CN', lan['zh_CN']]
        ];
        var store = new Ext.data.SimpleStore({
                fields:['name', 'display'],
                data:data
        });

        return {
            data:data,
            store:store
        };
    },

    parseHM:function(hm){
        var h, m;
        var parts = hm.split(':');
        h = parts[0];
        if('0' == h.charAt(0)){
            h = h.charAt(1);
        }
        h = parseInt(h);
        m = parts[1];
        if('0' == m.charAt(0)){
            m = m.charAt(1);
        }
        m = parseInt(m);
        return {
            h:h,
            m:m
        };
    },

    calculateActiveRow:function(cs){        
        var obj = {};
        var hm = this.parseHM(cs.activeStartTime);
        var st = hm.h*60+hm.m;
        hm = this.parseHM(cs.activeEndTime);
        var et = hm.h*60+hm.m;
        obj.intervalSlot = parseInt(cs.intervalSlot);
        obj.rowCount = 24*60/obj.intervalSlot;
        obj.activeStartRow = Math.floor(st/obj.intervalSlot);
        obj.activeEndRow = Math.floor(et/obj.intervalSlot);
        obj.numInHour = Math.floor(60/obj.intervalSlot);
        delete(cs['id']);
        delete(cs['class']); 
        obj = Ext.apply(obj, cs);
        obj.startDay = parseInt(obj.startDay);        
        obj.startRow = 0;
        obj.endRow = obj.rowCount;
        if(obj.hideInactiveRow){
            obj.startRow = obj.activeStartRow;
            obj.endRow = obj.activeEndRow;
        }        
        return obj;
    },

    getTimeStore:function(){
        var store = new Ext.data.SimpleStore({
			fields:['row', 'hour'],
			data:[]
		});
		return store;
    },

    getHMFromRow:function(intervalSlot, row, hourFormat){
        var m = intervalSlot*row;
        var h = Math.floor(m/60);
        m = m%60;
        if(10 > m){
            m = '0'+m;
        }
        if(10 > h){
            h = '0'+h;
        }
        var s = h+':'+m;
        if('12' == hourFormat){
            var dt = Ext.Date.parseDate(h+':'+m, 'H:i');
            s =  Ext.Date.format(dt,'h:i A');
        }
        return s;
    },

    generateIntervalData:function(intervalSlot, start, end, hourFormat){
        var num = Math.floor(24*60/intervalSlot);
        start = start || 0;
        end = end || num;
        var data = [];
        for(var i = start; i <= end; i++){
            var o = [];
            o.push(i);
            var s = this.getHMFromRow(intervalSlot, i, hourFormat);
            o.push(s);
            data.push(o);
        }
        return data;
    },

    getIntervalFromRow:function(intervalSlot, row, hourFormat){
        var m = intervalSlot*row;
        var h = Math.floor(m/60);
        m = m%60;
        if(10 > m){
            m = '0'+m;
        }
        if(10 > h){
            h = '0'+h;
        }
        var s = h+':'+m;
        if('12' == hourFormat){
            var dt = Ext.Date.parseDate(h+':'+m, 'H:i');
            s = Ext.Date.format(dt,'h:i A');
        }
        return s;
    },

    getRowFromHM:function(hm, intervalSlot){
        if('23:59' == hm){
            hm = '24:00';
        }
        hm = Ext.ux.calendar.Mask.parseHM(hm);
        var row = Math.floor(hm.h*60/intervalSlot+hm.m/intervalSlot);
        return row;
    },

    getEDStore:function(){
        var lan = Ext.ux.calendar.Mask.Mask;
        var store = new Ext.data.SimpleStore({
			fields:['value', 'display'],
			data:[
                [true, lan['enable']],
                [false, lan['disable']]
            ]
		});
		return store;
    },

    getStartDayStore:function(){
        var lan = Ext.ux.calendar.Mask.Mask;
        var store = new Ext.data.SimpleStore({
			fields:['value', 'display'],
			data:[
                [0, lan['sunday']],
                [1, lan['monday']]
            ]
		});
		return store;
    },

    getIntervalStore:function(){
        var lan = Ext.ux.calendar.Mask.Mask;
        var store = new Ext.data.SimpleStore({
			fields:['value', 'display'],
			data:[
                [10, '10 '+lan['minute']],
                [15, '15 '+lan['minute']],
                [20, '20 '+lan['minute']],
                [30, '30 '+lan['minute']],
                [60, '60 '+lan['minute']]
            ]
		});
		return store;
    },

    getDayOffset:function(sday, eday){
    	var vDate=Ext.Date;
        if(!(sday instanceof Date)){
            sday = vDate.parseDate(sday, 'Y-m-d');
        }
        if(!(eday instanceof Date)){
            eday = vDate.parseDate(eday, 'Y-m-d');
        }
        var offset =  vDate.getElapsed(sday,eday);
        offset = Math.round(offset/(3600000*24));
        return offset;
    },

    getWeekDayInMonth:function(date){   
    	var vDate=Ext.Date;
        var d =  vDate.format(date,'d');
        var w = Math.floor(d/7)+1;
        var wd =  vDate.format(date,'l');
        var str = 'the '+w;
        if(1 == w){
            str += 'st';
        }else if(2 == w){
            str += 'nd';
        }else if(3 == w){
            str += 'rd';
        }else{
            str += 'th';
        }
        return str+' '+wd;
    },

    getIntervalText:function(rtype, intervalSlot){
        var str = '';
        if('day' == rtype){
            if(1 == intervalSlot){
                str = 'Everyday';
            }else{
                str = 'Every '+intervalSlot+' days';
            }
        }else if('week' == rtype){
            if(1 == intervalSlot){
                str = 'Every week at ';
            }else{
                str = 'Every '+intervalSlot+' weeks at ';
            }
        }else if('month' == rtype){
            if(1 == intervalSlot){
                str = 'Every month at ';
            }else{
                str = 'Every '+intervalSlot+' months at ';
            }
        }else if('year' == rtype){
            if(1 == intervalSlot){
                str = 'Every year at ';
            }else{
                str = 'Every '+intervalSlot+' years at ';
            }
        }
        return str;
    },

    getPermitStore:function(){
        var lan = Ext.ux.calendar.Mask.Mask;
        var store = new Ext.data.SimpleStore({
			fields:['value', 'display'],
			data:lan['permitData']
		});
		return store;
    },

    getUserStore:function(){        
        var store = new Ext.data.Store({
            proxy:new Ext.data.HttpProxy({
                url:Ext.ux.calendar.CONST.listUserURL
            }),
			reader:new Ext.data.JsonReader({
                root: 'results',
                id: 'id',
                totalProperty: 'total'
            }, [
                {name: "id"},
                {name: "username"},
                {name: "email"}
            ])
		});
		return store;
    },

    getAlertTypeStore:function(){
        var lan = Ext.ux.calendar.Mask.Mask;
        var store = new Ext.data.SimpleStore({
			fields:['value', 'display'],
			data:lan['alertType']
		});
		return store;
    },

    getAlertUnitStore:function(){
        var lan = Ext.ux.calendar.Mask.Mask;
        var store = new Ext.data.SimpleStore({
			fields:['value', 'display'],
			data:lan['popupAlertUnit']
		});
		return store;
    },

    getInitialViewStore:function(){
        var lan = Ext.ux.calendar.Mask.Mask;
        var store = new Ext.data.SimpleStore({
			fields:['value', 'display'],
			data:lan['initialView']
		});
		return store;
    },

    cleanObj:function(o){
        o = Ext.apply({}, o);
        var n = {};
        for(var p in o){
            var f = Ext.ux.calendar.Mask.typeOf(o[p]);
            if(false == f){
                delete(o[p]);
            }else if('string' == f){
                o[p] = o[p].trim();
                if('' == o[p]){
                    delete(o[p]);
                }
            }else if('boolean' == f){
                if(false == o[p]){
                    delete(o[p]);
                }
            }
            if(o[p]){
                n[p] = o[p];
            }
        }
        return n;
    },

    isEqualObj:function(o, n){
        try{
            o = Ext.ux.calendar.Mask.cleanObj(o);
            n = Ext.ux.calendar.Mask.cleanObj(n);            
            return Ext.encode(o) == Ext.encode(n);
        }catch(e){
            return false;
        }
    },
    
    includeIsClass : function(className, merclass) {
		return className
				&& (' ' + className + ' ').indexOf(' ' + merclass + ' ') != -1;
	},
	
	typeOf : function(v){	
		if(undefined === v || null === v){
			return false;
		}
		var t = Ext.type(v);		
		return t;
	}
};