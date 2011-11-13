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
        'title':'FeyaSoft MyCalendar 2.5.2',
        'loadMask.msg':'Bitte warten...'
    },

    'MainPanel':{
        'loadMask.msg':'Bitte warten...'
    },
    
    'SharingPopup':{
        'title':'Kalender freigeben'
    },

    'CalendarContainer':{
        'todayBtn.text':'Heute',
        'dayBtn.text':'Tag',
        'weekBtn.text':'Woche',
        'monthBtn.text':'Monat',
        'weekMenu.showAll.text':'Alle zeigen',
        'weekMenu.onlyWeek.text':'Arbeitstage',
        'monthMenu.showAll.text':'Alle zeigen',
        'monthMenu.onlyWeek.text':'Arbeitstage',
        'moreMenu.setting.text':'Einstellungen',
        'moreMenu.about.text':'About FeyaSoft MyCalendar',
        'moreBtn.text':'Mehr',
        'searchCriteria.text':'Suche',        
        'moreMenu.showAlert.text':'Benachrichtigungsfunktion aktivieren',
        'moreMenu.language.text':'Spracheinstellungen'
    },

    'WestPanel':{
        'myCalendarPanel.title':'Meine Kalender',
        'otherCalendarPanel.title':'Andere Kalender',
        'myShowAllBtn.text':'Alle zeigen',
        'myAddBtn.text':'Neu'
    },

    'EventHandler':{
        'showOnlyItem.text':'Nur diesen zeigen',
        'viewItem.hide.text':'Kalender ausblenden',
        'viewItem.show.text':'Kalender einblenden',
        'editItem.text':'Kalender &auml;ndern',
        'deleteItem.text':'Kalender l&ouml;schen',
        'clearItem.text':'Kalender leeren',
        'wholeDay':'Ganzer Tag',
        'untitled':'Unbenannt',
        'unlockItem.text':'entriegeln',
        'lockItem.text':'verriegeln',
        'editEvent.title':'Termin &auml;ndern',
        'deleteEvent.title':'Termin l&ouml;schen',
        'more':'Mehr',
        'deleteRepeatPopup.title':'Best&auml;tigen',
        'deleteRepeatPopup.msg':'Klicken Sie "Ja" um alle Termine dieser Serie zu l&ouml;schen, oder "Nein" um nur diesen Temin aus der Serie zu l&ouml;schen.',
        'updateRepeatPopup.title':'Best&auml;tigen',
        'updateRepeatPopup.msg':'Klicken Sie "Ja" um alle Termine dieser Serie zu &auml;ndern, oder "Nein" um nur diesen Temin aus der Serie zu &auml;ndern.',
        'shareItem.text':'Kalender freigeben'
    },

    'Editor':{
        'startDayField.label':'Zeit',
        'endDayField.label':'Bis',
        'wholeField.label':'Ganzer Tag',
        'subjectField.label':'Betreff',
        'contentField.label':'Beschreibung',
        'calendarField.label':'Kalender',
        'alertCB.label':'Erinnern',
        'lockCB.label':'Verriegelt',
        'deleteBtn.text':'L&ouml;schen',
        'saveBtn.text':'Speichern',
        'cancelBtn.text':'Abbrechen',
        'new.title':'Neuer Termin',
        'edit.title':'Termin bearbeiten',
        'repeatTypeField.label':'Terminserie',
        'repeatIntervalField.label':'Wiederholung ',
        'intervalUnitLabel.day.text':' Tag(e) ',
        'intervalUnitLabel.week.text':' Woche(n) ',
        'intervalUnitLabel.month.text':' Monat(e) ',
        'intervalUnitLabel.year.text':' Jahr(e) ',
        'detailSetting':'Details bearbeiten...',
        'returnBtn.text':'Zur&uuml;ck',
        'startAndEnd':'Start und Ende',
        'repeatStartField.label':'Start',
        'repeatNoEndRG.label':'Kein Enddatum',
        'repeatEndTimeRG.label':'Ende nach',
        'repeatEndDateRG.label':'Ende bis',
        'repeatEndTimeUnit':'Wiederhulung(en)',
        'weekCheckGroup.label':'Wiederholung Tag',
        'monthRadioGroup.label':'Wiederholung nach',
        'repeatByDate':'Datum',
        'repeatByDay':'Tag',
        'alertLabel':'Erinnerung',
        'alertEarly.label':'Vorlaufzeit',
        'newAlertBtn.text':'Neu',
        'deleteAlertBtn.label':'l&ouml;schen',
        'emailAlertEarlyInvalid':'Die Vorlaufzeit f&uuml;r Email-Benachrichtigungen sollte gr&ouml;sser als 30 Minuten sein.',
        'popupAlertEarlyInvalid':'Die Vorlaufzeit f&uuml;r Popup-Benachrichtigungen sollte kleiner als 24 Stundne sein.',
        'repeatIntervalInvalid':'Dieser Wert muss eine positive Zahl sein!',
        'repeatBeginDayInvalid':'Das Startdatum der Terminserie muss vor dem Enddatum liegen',
        'repeatEndDayInvalid':'Das Enddatum der Terminserie muss nach dem Startdatum liegen',
        'repeatTimeInvalid':'Dieser Wert muss eine positive Zahl sein!'
    },
    
    'CalendarEditor':{
        'new.title':'Neuer Kalender',
        'edit.title':'Kalender bearbeiten',
        'nameField.label':'Name',
        'descriptionField.label':'Beschreibung',
        'clearBtn.text':'L&ouml;schen',
        'saveBtn.text':'Speichern',
        'cancelBtn.text':'Abbrechen',
        'returnBtn.text':'Zur&uuml;ck',
        'shareCalendar':'Kalender freigeben',
        'shareColumns.user':'Benutzer',
        'shareColumns.permit':'Freigabe',
        'shareColumns.add':'Freigabe hinzuf&uuml;gen',
        'shareColumns.remove':'L&ouml;schen',
        'userField.emptyText':'Benutzername und Email-Adresse eingeben'
    },
    
    'ExpirePopup':{
        'hideCB.label':'Kein Popup mehr',
        'title':'Benachrichtigte Termine',
        'tpl.calendar':'Kalender',
        'tpl.subject':'Betreff',
        'tpl.content':'Beschreibung',
        'tpl.leftTime':'Restzeit',
        'hour':'Stunde(n)',
        'minute':'Minute(n)',
        'untitled':'Unbenannt',
        'noContent':'Kein Inhalt',
        'cancelReminder':'ABBRUCH',
        'editEvent':'&Auml;ndern'
    },
    
    'SettingPopup':{
        'title':'Einstellungen',
        'hourFormatField.label':'Stunden Format',
        'dayFormatField.label':'Tag Format f&uuml;r Tagesansicht',
        'weekFormatField.label':'Tag Format f&uuml;r Wochenansicht',
        'monthFormatField.label':'Tag Format f&uuml;r Monatsansicht',
        'applyBtn.text':'&Uuml;bernehmen',
        'resetBtn.text':'Zur&uuml;cksetzen',
        'closeBtn.text':'Schliessen',
        'fromtoFormatField.label':'Von-Bis Format',
        'scrollStartRowField.label':'Scroll Start Zeile',
        'languageField.label':'Sprache',
        'generalForm.title':'Generell',
        'dwViewForm.title':'Tagesansicht|Wochenansicht',
        'monthViewForm.title':'Wochenansicht',
        'createByDblClickField.label':'Termine mit Doppelklick erstellen',
        'singleDayField.label':'Tages&uuml;bergreifender Termin',
        'weekStartDayField.label': 'Start Wochentag',
        'activeStartTimeField.label':'Startzeit aktiv',
        'activeEndTimeField.label':'Endzeit aktiv',
        'hideInactiveTimeField.label':'Inaktive Zeit ausblenden',
        'readOnlyField.label':'Nur lesen',
        'intervalField.label':'Zeitintervall',
        'startEndInvalid':'Active Start Time should be earlier than Active End Time!',
        'startEndInvalid':'Startzeit aktiv muss vor der Endzeit aktiv liegen!',
        'formatInvalid':'Beispiel: 09:00',
        'initialViewField.label':'Initiale Sicht'
    },

    'ResultView':{
        'cm.date':'Datum',
        'cm.calendar':'Kalender',
        'cm.time':'Zeit',
        'cm.subject':'Betreff',
        'cm.content':'Beschreibung',
        'cm.expire':'Verbleibende Zeit',
        'groupBtn.group.text':'Guppieren',
        'groupBtn.unGroup.text':'Gruppierung aufheben',
        'returnBtn.text':'Zur&uuml;ck',
        'hour':'Stunde(n)',
        'noSubject':'(Kein Betreff)',
        'noContent':'(Keine Beschreibung)',
        'loadMask.msg':'Bitte warten...'
    },

    'DayView':{
        'loadMask.msg':'Bitte warten...',
        'addItem.text':'Neuer Termin',
        'events':'Termine'
    },

    'MonthView':{
        'loadMask.msg':'Bitte warten...',
        'overview':'&Uuml;bersicht',
        'showingEvents':'Termin anzeigen',
        'totalEvents':'Total Termine',
        'dayPre':'',
        'addItem.text':'Neuer Termin',
        'clearItem.text':'Inhalte l&ouml;schen',
        'cutItem.text':'Ausschneiden',
        'copyItem.text':'Kopieren',
        'pasteItem.text':'Einf&uuml;gen',
        'events':'Termine'
    },

    /* TODO: continue ... */
    'Mask':{
        '12Hours':'12 Stunden',
        '24Hours':'24 Stunden',
        'ar': 'Arabisch',
        'de': 'Deutsch',
        'en':'Englisch (Amerik.)',
        'es': 'Spanisch',
        'fr': 'Franz&ouml;sisch',
        'it': 'Italienisch',
        'ja': 'Japanisch',
        'lt': 'Lietuvių',
        'nl': 'Holl&auml;ndisch',
        'pl': 'Polnisch',
        'pt': 'Portugisisch',
        'ru': 'Russisch',
        'zh_CN':'Chinesisch',
        'enable':'aktivieren',
        'disable':'deaktivieren',
        'minute':'Minuten',
        'monday':'Montag',
        'sunday':'Sonntag',
        'permitData':[
            [0, 'Lesen, Schrieben und Freigeben'],
            [1, 'Lesen und Schreiben'],
            [2, 'nur Lesen']
        ],
        'alertType':[
            ['popup', 'Popup Benachrichtigung'],
            ['email', 'Email']
        ],
        'popupAlertUnit':[
            ['minute', 'Minute(n)'],
            ['hour', 'Stunde(n)']
        ],
        'alertUnit':[
            ['minute', 'Minute(n)'],
            ['hour', 'Stunde(n)'],
            ['day', 'Tag(e)'],
            ['wek', 'Woche(n)']
        ],
        'initialView':[
            [0, 'Tagesansicht'],
            [1, 'Wochenansicht'],
            [2, 'Monatsansicht']
        ]
    },

    repeatType:[
        ['no', 'Keine Wiederholung'],
        ['day', 'T&auml;glich'],
        ['week', 'W&ouml;chentlich'],
        ['month', 'Monatlich'],
        ['year', 'J&auml;hrlich']
    ],

    getWeekDayInMonth:function(date){
        var d = date.format('d');
        var w = Math.floor(d/7)+1;
        var wd = date.format('l');
        var str = 'den '+w;
        if(1 == w){
            str += 'ten';
        }else if(2 == w){
            str += 'ten';
        }else if(3 == w){
            str += 'ten';
        }else{
            str += 'ten';
        }
        return str+' '+wd;
    },

    getIntervalText:function(rtype, intervalSlot){
        var str = '';
        if('day' == rtype){
            if(1 == intervalSlot){
                str = 'Jeden Tag';
            }else{
                str = 'Jeden '+intervalSlot+' Tag';
            }
        }else if('week' == rtype){
            if(1 == intervalSlot){
                str = 'Jede woche am ';
            }else{
                str = 'Jede '+intervalSlot+' Woche um ';
            }
        }else if('month' == rtype){
            if(1 == intervalSlot){
                str = 'Jeden Monat am ';
            }else{
                str = 'Jeden '+intervalSlot+' Monat am ';
            }
        }else if('year' == rtype){
            if(1 == intervalSlot){
                str = 'Jedes Jahr am ';
            }else{
                str = 'Jedes '+intervalSlot+' Jahr am ';
            }
        }
        return str;
    }
};

Ext.apply(Ext.ux.calendar.Mask, Ext.ux.calendar.Language);