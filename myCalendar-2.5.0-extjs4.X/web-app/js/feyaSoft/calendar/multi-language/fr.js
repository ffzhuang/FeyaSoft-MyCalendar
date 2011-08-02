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
        'title':'FeyaSoft MyCalendar 2.5.0',
        'loadMask.msg':'S\'il vous pla�t patienter...'
    },

    'MainPanel':{
        'loadMask.msg':'S\'il vous pla�t patienter...'
    },

    'CalendarContainer':{
        'todayBtn.text':'Aujourd\'hui',
        'dayBtn.text':'La vue Jour',
        'weekBtn.text':'Vue de la semaine',
        'monthBtn.text':'Vue par mois',
        'weekMenu.showAll.text':'Voir tout',
        'weekMenu.onlyWeek.text':'Seulement la semaine',
        'monthMenu.showAll.text':'Voir tout',
        'monthMenu.onlyWeek.text':'Seulement la semaine',
        'moreMenu.setting.text':'Param�tre',
        'moreMenu.about.text':'About FeyaSoft MyCalendar',
        'moreBtn.text':'Plus',
        'searchCriteria.text':'Recherche',        
        'moreMenu.showAlert.text':'Activer fonction d\'alerte',
        'moreMenu.language.text':'R�glage de la Langue'
    },

    'WestPanel':{
        'myCalendarPanel.title':'My Calendar',
        'myShowAllBtn.text':'Voir tout',
        'myAddBtn.text':'Nouveau'
    },

    'EventHandler':{
        'showOnlyItem.text':'Voir ce que',
        'viewItem.hide.text':'Masquer le calendrier',
        'viewItem.show.text':'Afficher le calendrier',
        'editItem.text':'Modification du calendrier',
        'deleteItem.text':'Supprimer l\'agenda',
        'clearItem.text':'Vider le calendrier',
        'wholeDay':'Journ�e enti�re',
        'untitled':'Untitled',
        'unlockItem.text':'Unlock',
        'lockItem.text':'Lock',
        'editEvent.title':'Modifier un �v�nement',
        'deleteEvent.title':'Supprimer l\'�v�nement',
        'more':'More',
        'deleteRepeatPopup.title':'Confirm',
        'deleteRepeatPopup.msg':'Click "Yes" to delete all this repeat events, or click "No" to only delete the current event?',
        'updateRepeatPopup.title':'Confirm',
        'updateRepeatPopup.msg':'Click "Yes" to update for all this repeat events, or click "No" to only update for the current event?'
    },

    'Editor':{
        'startDayField.label':'Heure',
        'wholeField.label':'Journ�e enti�re',
        'subjectField.label':'Sujet',
        'contentField.label':'Contenu',
        'calendarField.label':'Calendrier',
        'alertCB.label':'Alerte lorsque activ�',
        'lockCB.label':'Locked',
        'deleteBtn.text':'Supprimer',
        'saveBtn.text':'Sauver',
        'cancelBtn.text':'Annuler',
        'new.title':'New Event',
        'edit.title':'Modifier un �v�nement',
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
        'new.title':'Nouveau Calendrier',
        'edit.title':'Modifier l\'agenda',
        'nameField.label':'Nom',
        'descriptionField.label':'Description',
        'clearBtn.text':'Clair',
        'saveBtn.text':'Sauver',
        'cancelBtn.text':'Annuler'
    },
    
    'ExpirePopup':{
        'hideCB.label':'Don\'t popup any more',
        'title':'Alerted Events',
        'tpl.calendar':'Calendrier',
        'tpl.subject':'Sujet',
        'tpl.content':'Contenu',
        'tpl.leftTime':'Temps restant',
        'hour':'Hour(s)',
        'minute':'Minute(s)',
        'untitled':'Untitled',
        'noContent':'No Content'
    },

    'SettingPopup':{
        'title':'feyaCalendar Setting',
        'hourFormatField.label':'Format de l\'heure',
        'dayFormatField.label':'Day Format of DayView',
        'weekFormatField.label':'Day Format of WeekView',
        'monthFormatField.label':'Day Format of MonthView',
        'applyBtn.text':'Appliquer',
        'resetBtn.text':'Reset',
        'closeBtn.text':'Fermer',
        'fromtoFormatField.label':'FromTo Format',
        'scrollStartRowField.label':'Scroll Start Row',
        'languageField.label':'Langue',
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
        'cm.date':'',
        'cm.calendar':'Calendar',
        'cm.time':'Heure',
        'cm.subject':'Subject',
        'cm.content':'Content',
        'cm.expire':'Temps restant',
        'groupBtn.group.text':'Group',
        'groupBtn.unGroup.text':'Ungroup',
        'returnBtn.text':'Retour',
        'hour':'Hour(s)',
        'noSubject':'(No Subject)',
        'noContent':'(No Content)',
        'loadMask.msg':'S\'il vous pla�t patienter...'
    },

    'DayView':{
        'loadMask.msg':'S\'il vous pla�t patienter...',
        'addItem.text':'Nouvel événement',
        'events':'événement'
    },

    'MonthView':{
        'loadMask.msg':'S\'il vous pla�t patienter...',
        'overview':'Pr�sentation',
        'showingEvents':'Showing Events',
        'totalEvents':'Total des �v�nements',
        'dayPre':'',
        'addItem.text':'Nouvel événement',
        'clearItem.text':'Propreté de l\'événement',
        'cutItem.text':'Couper',
        'copyItem.text':'Copier',
        'pasteItem.text':'Coller',
        'events':'événement'
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