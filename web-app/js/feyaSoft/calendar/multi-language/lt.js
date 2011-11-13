/**
 * CubeDrive MyCalendar
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

    'MainPanel':{
        'title':'CubeDrive MyCalendar 2.5.3',
        'loadMask.msg':'Prašome palaukti...'
    },
    
    'SharingPopup':{
        'title':'Dalinamas kalendorius'
    },

    'CalendarContainer':{
        'todayBtn.text':'Šiandien',
        'dayBtn.text':'Diena',
        'weekBtn.text':'Savaitė',
        'monthBtn.text':'Mėnesis',
        'weekMenu.showAll.text':'Rodyti visas',
        'weekMenu.onlyWeek.text':'Tik darbo dienos',
        'monthMenu.showAll.text':'Rodyti visas',
        'monthMenu.onlyWeek.text':'Tik darbo dienos',
        'moreMenu.about.text':'About CubeDrive MyCalendar',
        'moreMenu.setting.text':'Nustatymai',
        'moreBtn.text':'Daugiau',
        'searchCriteria.text':'Ieškoti',        
        'moreMenu.showAlert.text':'Aktyvuoti pranešimų funkciją',
        'moreMenu.language.text':'Kalbos nustatymai'
    },

    'WestPanel':{
        'myCalendarPanel.title':'Mano kalendoriai',
        'otherCalendarPanel.title':'Kiti kalendoriai',
        'myShowAllBtn.text':'Rodyti visus',
        'myAddBtn.text':'Naujas'
    },

    'EventHandler':{
        'showOnlyItem.text':'Rodyti tik šį',
        'viewItem.hide.text':'Paslėpti kalendorių',
        'viewItem.show.text':'Rodyti kalendorių',
        'editItem.text':'Redaguoti kalendorių',
        'deleteItem.text':'Ištrinti kalendorių',
        'clearItem.text':'Išvalyti kalendorių',
        'wholeDay':'Visa diena',
        'untitled':'Nepavadintas',
        'unlockItem.text':'Atrakinti',
        'lockItem.text':'Užrakinti',
        'editEvent.title':'Redaguoti įvykį',
        'deleteEvent.title':'Ištrinti įvykį',
        'more':'Daugiau',
        'deleteRepeatPopup.title':'Patvirtinimas',
        'deleteRepeatPopup.msg':'Norėdami ištrinti visą įvykių seką, spauskite "Taip". Norėdami ištrinti tik šį įvykį, spauskite "Ne".',
        'updateRepeatPopup.title':'Patvirtinimas',
        'updateRepeatPopup.msg':'Norėdami atnaujinti visą įvykių seką, spausite "Taip". Norėdami atnaujinti tik šį įvykį, spauskite "Ne".',
        'shareItem.text':'Dalintis kalendorium'
    },

    'Editor':{
        'startDayField.label':'Laikas nuo',
        'endDayField.label':'iki',
        'wholeField.label':'Visą dieną',
        'subjectField.label':'Tema',
        'contentField.label':'Turinys',
        'calendarField.label':'Kalendorius',
        'alertCB.label':'Priminti kai aktyvuotas',
        'lockCB.label':'Užrakintas',
        'deleteBtn.text':'Pašalinti',
        'saveBtn.text':'Išsaugoti',
        'cancelBtn.text':'Atšaukti',
        'new.title':'Naujas įvykis',
        'edit.title':'Redaguoti įvykį',
        'repeatTypeField.label':'Pasikartojimo tipas',
        'repeatIntervalField.label':'Kartojasi kas ',
        'intervalUnitLabel.day.text':' d, ',
        'intervalUnitLabel.week.text':' sav. ',
        'intervalUnitLabel.month.text':' mėn. ',
        'intervalUnitLabel.year.text':' m. ',
        'detailSetting':'Keisti detales...',
        'returnBtn.text':'Atgal',
        'startAndEnd':'Pradžia ir pabaiga',
        'repeatStartField.label':'Pradžia',
        'repeatNoEndRG.label':'Be pabaigos',
        'repeatEndTimeRG.label':'Pasiakrtojimų skaičius',
        'repeatEndDateRG.label':'Kartiojasi iki',
        'repeatEndTimeUnit':'',
        'weekCheckGroup.label':'Kartojimosi dienos',
        'monthRadioGroup.label':'Kartojimosi būdas',
        'repeatByDate':'Data',
        'repeatByDay':'Diena',
        'alertLabel':'Priminimo nustatymai',
        'alertEarly.label':'prieš įvykį',
        'newAlertBtn.text':'Naujas',
        'deleteAlertBtn.label':'Pašalinti',
        'emailAlertEarlyInvalid':'El. pašto priminimo laikas turėtų būti didesnis nei 30 minučių.',
        'popupAlertEarlyInvalid':'Iššokančio priminimo laikas turėtų būti mažesnis nei 24 valandos.',
        'repeatIntervalInvalid':'Ši reikšmė turi būti teigiamas sveikasis skaičius!',
        'repeatBeginDayInvalid':'Pasikartojimų pradžios data neturėtų būti vėlesnė už pabaigos datą',
        'repeatEndDayInvalid':'Pasikartojimų pabaigos data neturėtų būti ankstesnė už pradžios datą',
        'repeatTimeInvalid':'Ši reikšmė turi būti teigiamas sveikasis skaičius!'
    },
    
    'CalendarEditor':{
        'new.title':'Naujas kalendorius',
        'edit.title':'Redaguoti kalendorių',
        'nameField.label':'Pavadinimas',
        'descriptionField.label':'Aprašymas',
        'clearBtn.text':'Išvalyti',
        'saveBtn.text':'Išsaugoti',
        'cancelBtn.text':'Atšaukti',
        'returnBtn.text':'Atgal',
        'shareCalendar':'Dalintis kalendoriumi su žmonėmis',
        'shareColumns.user':'Vartotojas',
        'shareColumns.permit':'Leisti',
        'shareColumns.add':'Pridėti vartotoją į dalinimąsi',
        'shareColumns.remove':'Pašalinti',
        'userField.emptyText':'Įveskite vartotojo vardą arba el. pašto adresą'
    },
    
    'ExpirePopup':{
        'hideCB.label':'Nebepriminti',
        'title':'Įvykių priminimai',
        'tpl.calendar':'Kalendorius',
        'tpl.subject':'Tema',
        'tpl.content':'Turinys',
        'tpl.leftTime':'Liko laiko',
        'hour':'val.',
        'minute':'min.',
        'untitled':'Nepavadintas',
        'noContent':'Nėra turinio',
        'cancelReminder':'ATŠAUKTI',
        'editEvent':'REDAGUOTI'
    },

    'SettingPopup':{
        'title':'feyaCalendar nustatymai',
        'hourFormatField.label':'Valandų formatas',
        'dayFormatField.label':'Dienos vaizdo datos formatas',
        'weekFormatField.label':'Savaitės vaizdo datos formatas',
        'monthFormatField.label':'Mėnesio vaizdo datos formatas',
        'applyBtn.text':'Pritaikyti',
        'resetBtn.text':'Atstatyti',
        'closeBtn.text':'Uždaryti',
        'fromtoFormatField.label':'Nuo-iki formatas',
        'scrollStartRowField.label':'Pirma rodoma eilutė',
        'languageField.label':'Kalba',
        'generalForm.title':'Pagrindinis',
        'dwViewForm.title':'Diena|Savaitė',
        'monthViewForm.title':'Mėnesis',
        'createByDblClickField.label':'Įvykis kuriamas dvigubu paspaudimu',
        'singleDayField.label':'Kelių dienų įvykis',
        'weekStartDayField.label': 'Pirma savaitės diena',
        'activeStartTimeField.label':'Darbo pradžios laikas',
        'activeEndTimeField.label':'Darbo pabaigos laikas',
        'hideInactiveTimeField.label':'Paslėpti neaktyvų laiką',
        'readOnlyField.label':'Tik skaitymui',
        'intervalField.label':'Intervalas',
        'startEndInvalid':'Darbo pradžios laikas turi būti ankstesnis už darbo pabaigos laiką!',
        'formatInvalid':'Pavyzdys: 09:00',
        'initialViewField.label':'Pradinis vaizdas'
    },

    'ResultView':{
        'cm.date':'Data',
        'cm.calendar':'Kalendorius',
        'cm.time':'Laikas',
        'cm.subject':'Tema',
        'cm.content':'Turinys',
        'cm.expire':'Liko laiko',
        'groupBtn.group.text':'Sugrupuoti',
        'groupBtn.unGroup.text':'Išgrupuoti',
        'returnBtn.text':'Atgal',
        'hour':'val.',
        'noSubject':'(be temos)',
        'noContent':'(be turinio)',
        'loadMask.msg':'Prašome palaukti...'
    },

    'DayView':{
        'loadMask.msg':'Prašome palaukti...',
        'addItem.text':'Naujas įvykis',
        'events':'įvykiai'
    },

    'MonthView':{
        'loadMask.msg':'Prašome palaukti...',
        'overview':'Santrauka',
        'showingEvents':'Rodomi įvykiai',
        'totalEvents':'Iš viso įvykių',
        'dayPre':'',
        'addItem.text':'Naujas įvykis',
        'clearItem.text':'Ištrinti įvykius',
        'cutItem.text':'Iškirpti',
        'copyItem.text':'Kopijuoti',
        'pasteItem.text':'Įklijuoti',
        'events':'įvykiai'
    },

    'Mask':{
        '12Hours':'12 val.',
        '24Hours':'24 val.',
        'ar': 'Arabų',
        'de': 'Vokiečių',
        'en':'Amerikos anglų',
        'es': 'Ispanų',
        'fr': 'Prancūzų',
        'it': 'Italų',
        'ja': 'Japonų',
        'lt': 'Lietuvių',
        'nl': 'Olandų',
        'pl': 'Lenkų',
        'pt': 'Portugalų',
        'ru': 'Rusų',
        'zh_CN':'简体中文',
        'enable':'Įjungti',
        'disable':'Išjungti',
        'minute':'min.',
        'monday':'Pirmadienis',
        'sunday':'Sekmadienis',
        'permitData':[
            [0, 'Skaityti, rašyti ir dalintis'],
            [1, 'Skaityti ir rašyti'],
            [2, 'Tik skaityti']
        ],
        'alertType':[
            ['popup', 'Iššokanti žinutė'],
            ['email', 'El. paštas']
        ],
        'popupAlertUnit':[
            ['minute', 'min.'],
            ['hour', 'val.']
        ],
        'alertUnit':[
            ['minute', 'min.'],
            ['hour', 'val.'],
            ['day', 'd.'],
            ['wek', 'sav.']
        ],
        'initialView':[
            [0, 'Diena'],
            [1, 'Savaitė'],
            [2, 'Mėnesis']
        ]
    },

    repeatType:[
        ['no', 'Nesikartoja'],
        ['day', 'Kasdien'],
        ['week', 'Kas savaitę'],
        ['month', 'Kas mėnesį'],
        ['year', 'Kas metus']
    ],

    getWeekDayInMonth:function(date){
        var d = date.format('d');
        var w = Math.floor(d/7)+1;
        var wd = date.format('l');
        var str = '';

        switch (w) {
            case (1):
                str = 'pirmas';
                break;

            case (2):
                str = 'antras';
                break;

            case (3):
                str = 'trečias';
                break;

            case (4):
                str = 'ketvirtas';
                break;

            case (5):
                str = 'penktas';
                break;
        }

        return str+' '+wd;
    },

    getIntervalText:function(rtype, intervalSlot){
        var str = '';
        if('day' == rtype){
            if(1 == intervalSlot){
                str = 'Kas';
            }else{
                str = 'Kas '+intervalSlot+' d.';
            }
        }else if('week' == rtype){
            if(1 == intervalSlot){
                str = 'Kiekviena savaitė, ';
            }else{
                str = 'Kas '+intervalSlot+' sav., ';
            }
        }else if('month' == rtype){
            if(1 == intervalSlot){
                str = 'Kiekvienas mėnesis, ';
            }else{
                str = 'Kas '+intervalSlot+' mėn., ';
            }
        }else if('year' == rtype){
            if(1 == intervalSlot){
                str = 'Kiekvieni metai, ';
            }else{
                str = 'Kas '+intervalSlot+' m., ';
            }
        }
        return str;
    }
};

Ext.apply(Ext.ux.calendar.Mask, Ext.ux.calendar.Language);
