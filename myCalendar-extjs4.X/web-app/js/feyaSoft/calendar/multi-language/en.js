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

Ext.ux.calendar.Language = {

    // please help to transfer words after :. Thanks
    'CalendarWin':{
        'title':'FeyaSoft MyCalendar 2.5.1',
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
        'title':'MyCalendar Setting',
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

    getWeekDayInMonth:function(date){
        var d = date.format('d');
        var w = Math.floor(d/7)+1;
        var wd = date.format('l');
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
    }
};

Ext.apply(Ext.ux.calendar.Mask, Ext.ux.calendar.Language);