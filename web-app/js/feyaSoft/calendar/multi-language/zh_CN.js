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
    'CalendarWin':{
        'title':'FeyaSoft MyCalendar 2.5.3',
        'loadMask.msg':'请等待...'
    },

    'MainPanel':{
        'loadMask.msg':'请等待...'
    },

    'CalendarContainer':{
        'todayBtn.text':'今天',
        'dayBtn.text':'日模式',
        'weekBtn.text':'周模式',
        'monthBtn.text':'月模式',
        'weekMenu.showAll.text':'显示全部',
        'weekMenu.onlyWeek.text':'显示工作日',
        'monthMenu.showAll.text':'显示全部',
        'monthMenu.onlyWeek.text':'显示工作日',
        'moreMenu.setting.text':'设置',
        'moreMenu.about.text':'关于我的日历',
        'moreBtn.text':'其他',
        'searchCriteria.text':'搜索',
        'moreMenu.showAlert.text':'启动提醒功能',
        'moreMenu.language.text':'语言设置'
    },

    'WestPanel':{
        'myShowAllBtn.text':'显示全部',
        'myAddBtn.text':'新的日历',
        'myCalendarPanel.title':'我的日历'
    },
    
    'EventHandler':{
        'showOnlyItem.text':'只显示此日历',
        'viewItem.hide.text':'隐藏日历',
        'viewItem.show.text':'显示日历',
        'editItem.text':'编辑日历',
        'deleteItem.text':'删除日历',
        'clearItem.text':'清空日历',
        'wholeDay':'全天',
        'untitled':'无主题',
        'unlockItem.text':'解锁',
        'lockItem.text':'锁定',
        'editEvent.title':'编辑事件',
        'deleteEvent.title':'删除事件',
        'more':'更多',
        'deleteRepeatPopup.title':'Confirm',
        'deleteRepeatPopup.msg':'Click "Yes" to delete all this repeat events, or click "No" to only delete the current event?',
        'updateRepeatPopup.title':'Confirm',
        'updateRepeatPopup.msg':'Click "Yes" to update for all this repeat events, or click "No" to only update for the current event?'
    },
    
    'Editor':{
        'new.title':'新建事件',
        'edit.title':'编辑事件',
        'startDayField.label':'时间',
        'endDayField.label':'到',
        'wholeField.label':'全天',
        'subjectField.label':'主题',
        'contentField.label':'内容',
        'calendarField.label':'日历',
        'alertCB.label':'进行提示',
        'lockCB.label':'锁定',
        'deleteBtn.text':'删除',
        'saveBtn.text':'保存',
        'cancelBtn.text':'取消',
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
        'new.title':'新建日历',
        'edit.title':'编辑日历',
        'nameField.label':'名称',
        'descriptionField.label':'描述',
        'clearBtn.text':'清除',
        'saveBtn.text':'保存',
        'cancelBtn.text':'取消'
    },

    'ExpirePopup':{
        'title':'提醒事件',
        'hideCB.label':'不再显示',
        'tpl.calendar':'日历',
        'tpl.subject':'主题',
        'tpl.content':'内容',
        'tpl.leftTime':'剩余时间',
        'hour':'小时',
        'minute':'分钟',
        'untitled':'无主题',
        'noContent':'无内容'
    },

    'SettingPopup':{
        'title':'myCalendar设置',
        'hourFormatField.label':'小时格式',
        'dayFormatField.label':'日期格式（日模式）',
        'weekFormatField.label':'日期格式（周模式）',
        'monthFormatField.label':'日期格式（月模式）',
        'applyBtn.text':'应用',
        'resetBtn.text':'重置',
        'closeBtn.text':'关闭',
        'fromtoFormatField.label':'日期格式（当前范围）',
        'scrollStartRowField.label':'开始时间（日周模式滚动条）',
        'languageField.label':'语言',
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
        'cm.date':'日期',
        'cm.calendar':'日历',
        'cm.time':'时间',
        'cm.subject':'主题',
        'cm.content':'内容',
        'cm.expire':'剩余时间',
        'groupBtn.group.text':'分组',
        'groupBtn.unGroup.text':'取消分组',
        'returnBtn.text':'返回',
        'hour':'小时',
        'noSubject':'(无主题)',
        'noContent':'(无内容)',
        'loadMask.msg':'请等待...'
    },

    'DayView':{
        'loadMask.msg':'请等待...',
        'addItem.text':'新建事件',
        'events':'事件'
    },

    'MonthView':{
        'loadMask.msg':'请等待...',
        'overview':'情况',
        'showingEvents':'显示事件',
        'totalEvents':'全部事件',
        'dayPre':'周',
        'addItem.text':'新建事件',
        'clearItem.text':'清空事件',
        'cutItem.text':'剪切',
        'copyItem.text':'拷贝',
        'pasteItem.text':'粘贴',
        'events':'事件'
    },

    'Mask':{
        '12Hours':'12 小时',
        '24Hours':'24 小时',
        'ar': '阿拉伯语',
        'de': '德语',
        'en':'American English',
        'es': '西班牙',
        'fr': 'Français',
        'it': 'Italiano',
        'ja': '日语',
        'lt': 'Lietuvių',
        'nl': 'Nederlandse',
        'pl': 'Polski',
        'pt': '葡萄牙语',
        'ru': '俄文',
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