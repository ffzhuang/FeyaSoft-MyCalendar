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
        'title':'FeyaSoft MyCalendar 2.5.3',
        'loadMask.msg':'Attendi...'
    },

    'MainPanel':{
        'loadMask.msg':'Attendi...'
    },
    
    'CalendarContainer':{
        'todayBtn.text':'Oggi',
        'dayBtn.text':'visualizza giorno',
        'weekBtn.text':'visualizza settimana',
        'monthBtn.text':'visualizza mese',
        'weekMenu.showAll.text':'Visualizza tutto',
        'weekMenu.onlyWeek.text':'Solo giorni lavorativi',
        'monthMenu.showAll.text':'Mostra tutto',
        'monthMenu.onlyWeek.text':'Solo giorni lavorativi',
        'moreMenu.setting.text':'Impostazioni',
        'moreMenu.about.text':'Info FeyaSoft MyCalendar',
        'moreBtn.text':'Altro',
        'searchCriteria.text':'Cerca',        
        'moreMenu.showAlert.text':'Attiva funzione avviso',
        'moreMenu.language.text':'Imposta lingua'
    },

    'WestPanel':{
        'myCalendarPanel.title':'I miei calendari',
        'myShowAllBtn.text':'Mostra tutto',
        'myAddBtn.text':'Crea'
    },

    'EventHandler':{
        'showOnlyItem.text':'Mostra solo questo',
        'viewItem.hide.text':'Nascondi calendario',
        'viewItem.show.text':'Mostra calendario',
        'editItem.text':'Modifica calendario',
        'deleteItem.text':'Elimina calendario',
        'clearItem.text':'Pulire calendario',
        'wholeDay':'Giorno intero',
        'untitled':'Senza titolo',
        'unlockItem.text':'Slocca',
        'lockItem.text':'Blocca',
        'editEvent.title':'Modifica Evento',
        'deleteEvent.title':'Rimuovi Evento',
        'more':'More',
        'deleteRepeatPopup.title':'Confirm',
        'deleteRepeatPopup.msg':'Click "Yes" to delete all this repeat events, or click "No" to only delete the current event?',
        'updateRepeatPopup.title':'Confirm',
        'updateRepeatPopup.msg':'Click "Yes" to update for all this repeat events, or click "No" to only update for the current event?'
    },

    'Editor':{
        'startDayField.label':'Ora',
        'endDayField.label':'A',
        'wholeField.label':'Giorno intero',
        'subjectField.label':'Oggetto',
        'contentField.label':'Contenuto',
        'calendarField.label':'Calendario',
        'alertCB.label':'Mostra avviso quando attivo',
        'lockCB.label':'Bloccato',
        'deleteBtn.text':'Rimuovi',
        'saveBtn.text':'Salva',
        'cancelBtn.text':'Annulla',
        'new.title':'Nuovo Evento',
        'edit.title':'Modifica Evento',
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
        'new.title':'Nuovo Calendario',
        'edit.title':'Modifica Calendario',
        'nameField.label':'Nome',
        'descriptionField.label':'Descrizione',
        'clearBtn.text':'Pulisci',
        'saveBtn.text':'Salva',
        'cancelBtn.text':'Annulla'
    },
    
    'ExpirePopup':{
        'hideCB.label':'Non mostrare più',
        'title':'Eventi avvisati',
        'tpl.calendar':'Calendario',
        'tpl.subject':'Oggetto',
        'tpl.content':'Contenuto',
        'tpl.leftTime':'Tempo rimasto',
        'hour':'Ora/e',
        'minute':'Minuto/i',
        'untitled':'Senza nome',
        'noContent':'Nessun contenuto'
    },

    'SettingPopup':{
        'title':'feyaCalendar Impostazioni',
        'hourFormatField.label':'Formato ora',
        'dayFormatField.label':'Formato giorno in visualizzazione giorno',
        'weekFormatField.label':'Formato giorno in visualizzazione settimane',
        'monthFormatField.label':'Formato giorno in visualizzazione mese',
        'applyBtn.text':'Applica',
        'resetBtn.text':'Resetta',
        'closeBtn.text':'Chiudi',
        'fromtoFormatField.label':'Formato da/a',
        'scrollStartRowField.label':'Riga inziale scroll',
        'languageField.label':'Lingua',
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
        'cm.date':'Data',
        'cm.calendar':'Calendario',
        'cm.time':'Ora',
        'cm.subject':'Oggetto',
        'cm.content':'Contenuto',
        'cm.expire':'Tempo rimasto',
        'groupBtn.group.text':'Raggruppa',
        'groupBtn.unGroup.text':'Dividi',
        'returnBtn.text':'Indietro',
        'hour':'Ora/e',
        'noSubject':'(Nessun oggetto)',
        'noContent':'(Nessun contenuto)',
        'loadMask.msg':'Attendi...'
    },

    'DayView':{
        'loadMask.msg':'Attendi...',
        'addItem.text':'Nuovo Evento',
        'events':'Evento'
    },

    'MonthView':{
        'loadMask.msg':'Attendi...',
        'overview':'Panoramica',
        'showingEvents':'Eventi mostrati',
        'totalEvents':'Eventi totali',
        'dayPre':'',
        'addItem.text':'Nuovo Evento',
        'clearItem.text':'Pulire Evento',
        'cutItem.text':'Tagliare',
        'copyItem.text':'Copiare',
        'pasteItem.text':'Pasta',
        'events':'Evento'
    },

    'Mask':{
        '12Hours':'12 Ore',
        '24Hours':'24 Ore',
        'ar': 'Arabo',
        'de': 'Tedesco',
        'en':'American English',
        'es': 'Spagnolo',
        'fr': 'Français',
        'it': 'Italiano',
        'ja': 'Giapponese',
        'lt': 'Lietuvių',
        'nl': 'Nederlandse',
        'pl': 'Polski',
        'pt': 'Portoghese',
        'ru': 'Russo',
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
