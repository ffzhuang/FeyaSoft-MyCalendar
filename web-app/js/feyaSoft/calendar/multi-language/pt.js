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
        'loadMask.msg':'Please wait...'
    },

    'MainPanel':{
        'loadMask.msg':'Aguarde ...'
    },

    'CalendarContainer':{
        'todayBtn.text':'Hoje',
        'dayBtn.text':'Dia',
        'weekBtn.text':'Semana',
        'monthBtn.text':'Mês',
        'weekMenu.showAll.text':'Mostrar todos',
        'weekMenu.onlyWeek.text':'Apenas dias úteis',
        'monthMenu.showAll.text':'Mostrar todos',
        'monthMenu.onlyWeek.text':'Apenas dias úteis',
        'moreMenu.setting.text':'Configurações',
        'moreMenu.about.text':'Sobre FeyaSoft MyCalendar',
        'moreBtn.text':'Configuração',
        'searchCriteria.text':'Pesquisar',        
        'moreMenu.showAlert.text':'Ativar mensagens de alerta',
        'moreMenu.language.text':'Configuração de línguas'
    },

    'WestPanel':{
        'myCalendarPanel.title':'Meu Calendário',
        'myShowAllBtn.text':'Mostrar todos',
        'myAddBtn.text':'Novo'
    },

    'EventHandler':{
        'showOnlyItem.text':'Mostrar apenas este',
        'viewItem.hide.text':'Esconder calendário',
        'viewItem.show.text':'Mostrar calendário',
        'editItem.text':'Editar calendário',
        'deleteItem.text':'Remover calendário',
        'clearItem.text':'Esvaziar calendário',
        'wholeDay':'Dia todo',
        'untitled':'Sem título',
        'unlockItem.text':'Desbloquear',
        'lockItem.text':'Bloquear',
        'editEvent.title':'Editar evento',
        'deleteEvent.title':'Remover evento',
        'more':'More',
        'deleteRepeatPopup.title':'Confirm',
        'deleteRepeatPopup.msg':'Click "Yes" to delete all this repeat events, or click "No" to only delete the current event?',
        'updateRepeatPopup.title':'Confirm',
        'updateRepeatPopup.msg':'Click "Yes" to update for all this repeat events, or click "No" to only update for the current event?'
    },

    'Editor':{
        'startDayField.label':'Data',
        'endDayField.label':'até',
        'wholeField.label':'Dia todo',
        'subjectField.label':'Título',
        'contentField.label':'Observação',
        'calendarField.label':'Calendário',
        'alertCB.label':'Mostrar mensagem de alerta',
        'lockCB.label':'Bloqueado',
        'deleteBtn.text':'Remover',
        'saveBtn.text':'Salvar',
        'cancelBtn.text':'Cancelar',
        'new.title':'Novo Evento',
        'edit.title':'Editar Evento',
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
        'new.title':'Novo Calendário',
        'edit.title':'Editar Calendário',
        'nameField.label':'Nome',
        'descriptionField.label':'Descrição',
        'clearBtn.text':'Limpar',
        'saveBtn.text':'Salvar',
        'cancelBtn.text':'Cancelar'
    },
    
    'ExpirePopup':{
        'hideCB.label':'Não exibir mais esta mensagem',
        'title':'Alerta de Eventos',
        'tpl.calendar':'Calendário',
        'tpl.subject':'Título',
        'tpl.content':'Observação',
        'tpl.leftTime':'Tempo restante',
        'hour':'Hora(s)',
        'minute':'Minuto(s)',
        'untitled':'Sem título',
        'noContent':'Sem conteúdo'
    },

    'SettingPopup':{
        'title':'feyaCalendar Configuração',
        'hourFormatField.label':'Formato da hora',
        'dayFormatField.label':'Formato do dia quando visualizando Dia',
        'weekFormatField.label':'Formato do dia quando visualizando Semana.',
        'monthFormatField.label':'Formato do dia quando visualizando Mês.',
        'applyBtn.text':'Aplicar',
        'resetBtn.text':'Reset',
        'closeBtn.text':'Fechar',
        'fromtoFormatField.label':'De/Até Formato',
        'scrollStartRowField.label':'Primeira linha de rolagem',
        'languageField.label':'Língua',
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
        'cm.calendar':'Calendário',
        'cm.time':'Data',
        'cm.subject':'Título',
        'cm.content':'Observação',
        'cm.expire':'Tempo restante',
        'groupBtn.group.text':'Agrupar por Data',
        'groupBtn.unGroup.text':'Desagrupar',
        'returnBtn.text':'Voltar',
        'hour':'Hora(s)',
        'noSubject':'(Sem título)',
        'noContent':'(Sem observação)',
        'loadMask.msg':'Aguarde ...'
    },

    'DayView':{
        'loadMask.msg':'Aguarde ...',
        'addItem.text':'New Event',
        'events':'events'
    },

    'MonthView':{
        'loadMask.msg':'Aguarde ...',
        'overview':'Overview',
        'showingEvents':'Mostrar Eventos',
        'totalEvents':'Total de eventos',
        'dayPre':'',
        'addItem.text':'Novo Evento',
        'clearItem.text':'Limpar Eventos',
        'cutItem.text':'Cortar',
        'copyItem.text':'Copiar',
        'pasteItem.text':'Colar',
        'events':'events'
    },

    'Mask':{
        '12Hours':'12 Horas',
        '24Hours':'24 Horas',
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
