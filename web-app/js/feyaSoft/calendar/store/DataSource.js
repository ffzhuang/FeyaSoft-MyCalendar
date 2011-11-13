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

Ext.ux.calendar.DataSource = function(config){
	Ext.apply(this, config);
	Ext.ux.calendar.DataSource.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.calendar.DataSource, Ext.util.Observable, {    
    /*
     * For show all calendars
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    showAllCalendar:function(sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.showAllCalendarURL,
            params:{
                userId:this.mainPanel.userId
            },
            success:function(response, options){
                /*
                 * The back json string should have a param "success", when it equal "false" means fail to create/update in server side
                 */
                var backObj = Ext.decode(response.responseText);
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For hide all calendars but only show this one
     * @param {int} calendarId: the id of the calendar
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    showOnlyCalendar:function(calendarId, sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.showOnlyCalendarURL,
            params:{
                id:calendarId,
                userId:this.mainPanel.userId
            },
            success:function(response, options){
                /*
                 * The back json string should have a param "success", when it equal "false" means fail to create/update in server side
                 */
                var backObj = Ext.decode(response.responseText);
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For create/update a calendar
     * @param {Obj} calendar: the object of a calendar, should contain all field of calendar table in db
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function     
     */
    createUpdateCalendar:function(calendar, sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.createUpdateCalendarURL,
            /* The params pass to db contains below fields:
             * id: int, the id of calendar, primary key
             * name: string, the name of calendar
             * description: string, the description of calendar
             * color: string, the color of calendar, it's a string, should be one of ["blue", "red", "cyan", "orange", "green", "purple"],
             *    see colorIndex in common/Mask.js for detail, if you want to add more color, you need add it in colorIndex array and colors array in Mask.js,
             *    and also you need add related css in css/calendar.css
             * hide: boolean, the status of calendar, true for hide, false for show
             */
            params:{
                id:calendar.id,
                name:calendar.name,
                description:calendar.description,
                color:calendar.color,
                hide:calendar.hide,
                userId:this.mainPanel.userId
            },
            success:function(response, options){
                /*
                 * The back json string should have a param "success", when it equal "false" means fail to create/update in server side
                 */
                var backObj = Ext.decode(response.responseText);
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For delete all events belong to a calendar
     * @param {int} calendarId: the id of a calendar
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    deleteEventsByCalendar:function(calendarId, sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.deleteEventsByCalendarURL,
            /*
             * pass the calendarId
             */
            params:{
                calendarId:calendarId
            },
            success:function(response, options){
                /*
                 * The back json string should have a param "success", when it equal "false" means fail to create/update in server side
                 */
                 var backObj = Ext.decode(response.responseText);
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For delete a calendar and all events belong to it
     * @param {int} calendarId: the id of a calendar
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    deleteCalendar:function(calendarId, sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.deleteCalendarURL,
            /*
             * pass the calendarId
             */
            params:{
                id:calendarId
            },
            success:function(response, options){
                /*
                 * The back json string should have a param "success", when it equal "false" means fail to create/update in server side
                 */
                 var backObj = Ext.decode(response.responseText);
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For load all calendars of a user
     * @param {int} userId: the id of a user
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    loadCalendar:function(successFn, scope){
        Ext.Ajax.request({
           url:Ext.ux.calendar.CONST.loadCalendarURL,
            params:{
                userId:this.mainPanel.userId
            },
            success:function(response, options){
                /*
                 * The back json string should like below:
                 * {    
                 *      "total":2,
                 *      "results":[{
                 *              "id":"1",
                 *              "color":"blue",
                 *              "description":null,
                 *              "hide":false,
                 *              "name":"Demo"
                 *       },{
                 *              "id":"2",
                 *              "color":"red",
                 *              "description":null,
                 *              "hide":false,
                 *              "name":"df"
                 *       }]
                 * }
                 */                
                var backObj = Ext.decode(response.responseText);
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    successFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For load all events from a day to another day
     * @param {Date} startData: the start date
     * @param {Date} endData: the end date
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function     
     */
    loadEvent:function(startDate, endDate, sucessFn, scope){
        startDate = startDate || new Date();
        endDate = endDate || new Date();
        var startDay =  Ext.Date.format(startDate,'Y-m-d');
        var endDay =  Ext.Date.format(endDate,'Y-m-d');
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.loadEventURL,
            /*
             * the params pass to server should contain:
             * startDay: the start Date, we just use 'Y-m-d' format here, you can change it as you like
             * endDay: the end Date, we just use 'Y-m-d' format here, you can change it as you like
             */
            params:{
                startDay:startDay,
                endDay:endDay,
                userId:this.mainPanel.userId
            },
            success:function(response, options){
                var backObj = Ext.decode(response.responseText);
                /*
                 * The back json string should like below:
                 * {
                 *      "total":1,
                 *      "results":[{
                 *              "id":"1",
                 *              "calendarId":0,
                 *              "color":"blue", // string; this color should be the same as the color of calendar "0"
                 *              "startRow":0, // int; startRow is in [0, 47], for 00:00-23:30
                 *              "endRow":2, //int; endRow is in [1, 48], for 00:30-24:00
                 *              "subject":"lunch", //string; the subject of this event
                 *              "description":"in hilton hotel", //string; the description of this event
                 *              "day":"2009-8-11", //string; the date of this event, need be 'Y-m-d' format
                 *              "alertFlag":[], //array; contain the alert information, in old version, it's just a boolean
                 *              "locked":false //boolean; true means this event is a locked event, nobody can change it, not use yet, in this version it should always be false
                 *       }]
                 * }
                 */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    var rs = backObj['results'];
                    var eventSet = {};
                    eventSet['whole'] = [];
                    var getRowFromHM = Ext.ux.calendar.Mask.getRowFromHM;
                    for(var i = 0, len = rs.length; i < len; i++){
                        var data = rs[i];
                        var startRow = getRowFromHM(data.startTime, this.intervalSlot);
                        var endRow = getRowFromHM(data.endTime, this.intervalSlot);
                        if(endRow == startRow){
                            endRow++;
                        }
                        if(!this.hideInactiveRow 
                            || (this.activeStartRow <= startRow && endRow <= this.activeEndRow)
                                || (0 == startRow && this.rowCount == endRow)){
                            var day = data.ymd;
                            var eday = data.eymd;
                            eventSet[day] = eventSet[day] || [];                            
                            var e = {
                                eventId:data.id,
                                calendarId:data.calendarId,
                                color:data.color,
                                startRow:startRow,
                                endRow:endRow,
                                subject:data.subject,
                                content:data.description,
                                day:day,
                                eday:eday,
                                alertFlag:Ext.decode(data.alertFlag),                                
                                locked:data.locked,
                                repeatType:data.repeatType
                            };
                            if(day != eday || (0 == startRow) && (this.rowCount == endRow)){
                                eventSet['whole'].push(e);
                            }else{
                                eventSet[day] = eventSet[day] || [];
                                eventSet[day].push(e);
                            }
                        }
                    }
                    sucessFn.call(scope, eventSet);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },

    loadRepeatEvent:function(sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.loadRepeatEventURL,
            params:{
                userId:this.mainPanel.userId
            },
            success:function(response, options){
                var backObj = Ext.decode(response.responseText);
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }else{
                    var rs = backObj['results'];
                    var eventSet = {};
                    var getRowFromHM = Ext.ux.calendar.Mask.getRowFromHM;
                    for(var i = 0, len = rs.length; i < len; i++){
                        var data = rs[i];
                        var startRow = getRowFromHM(data.startTime, this.intervalSlot);
                        var endRow = getRowFromHM(data.endTime, this.intervalSlot);
                        if(startRow == endRow){
                            endRow++;
                        }                        
                        var e = {
                            eventId:data.id,
                            calendarId:data.calendarId,
                            color:data.color,
                            startRow:startRow,
                            endRow:endRow,
                            subject:data.subject,
                            content:data.description,
                            repeatType:Ext.decode(data.repeatType),                            
                            alertFlag:Ext.decode(data.alertFlag),
                            locked:data.locked
                        };                        
                        eventSet[e.eventId] = e;
                    }
                    sucessFn.call(scope, eventSet);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For create an event
     * @param {Obj} event: the object of event
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
	createEvent:function(event, sucessFn, scope){
        var day = event.day || Ext.Date.format((new Date()),'Y-m-d');
        var eday = event.eday || day;        
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.createEventURL,
            /*
             * the params pass to server should contain:
             * calendarId: int, the id of the calendar this event belong to
             * selectedDay: string, 'Y-m-d' format, the day of this event
             * startHMTime: string, 'H:i' format, the start time of this event
             * endHMTime: string, 'H:i' format, the end time of this event
             * repeatType: boolean, not use yet, always false in this version
             * allDay: boolean, if true means this event is a whole event
             * flag: boolean, if true mean this event need alert a window when it's activing
             * locked: boolean, if true mean this event is locked, can not be changed
             * subject: string, the subject of this event
             * description: string, the description of this event
             */
            params:{
                'calendarId':event.calendarId,
                'startDay':day,
                'endDay':eday,
                'startHMTime':Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, event.startRow),
                'endHMTime':Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, event.endRow),
                'repeatType':event.repeatType,
                'alertFlag':Ext.encode(event.alertFlag),
                'locked':event.locked,
                'subject':event.subject,
                'description':event.content,
                'userId':this.mainPanel.userId
            },
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                /*
                 * The back json string should contain a param "id", which is the id of the event just created,
                 * it should also have a param "success", when it equal "false" means fail to create/update in server side,
                 * for example: {"success":"true","info":"Your have successful created event","id":17}
                 */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            }
        });
    },
    /*
     * For update an event
     * @param {Obj} event: the object of event
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    updateEvent:function(event, sucessFn, scope){
        var day = event.day || Ext.Date.format(new Date(),'Y-m-d');
        var eday = event.eday || day;        
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.updateEventURL,
            /*
             * the params pass to server should contain:
             * id: int, the id of the event
             * calendarId: int, the id of the calendar this event belong to
             * selectedDay: string, 'Y-m-d' format, the day of this event
             * startHMTime: string, 'H:i' format, the start time of this event
             * endHMTime: string, 'H:i' format, the end time of this event
             * repeatType: boolean, not use yet, always false in this version
             * allDay: boolean, if true means this event is a whole event
             * alertFlag:[], //array; contain the alert information, in old version, it's just a boolean
             * locked: boolean, if true mean this event is locked, can not be changed
             * subject: string, the subject of this event
             * description: string, the description of this event
             */
            params:{
                'id':event.eventId,
                'calendarId':event.calendarId,
                'startDay':day,
                'endDay':eday,
                'startHMTime':Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, event.startRow),
                'endHMTime':Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, event.endRow),
                'repeatType':event.repeatType,                
                'alertFlag':Ext.encode(event.alertFlag),
                'locked':event.locked,                
                'subject':event.subject,
                'description':event.content
            },
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                /*
                 * The back json string should have a param "success", when it equal "false" means fail to create/update in server side
                 */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For delete an event
     * @param {Obj} event: the object of event
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    deleteEvent:function(event, sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.deleteEventURL,
            /*
             * pass the id of event to delete
             */
            params:{
                'id':event.eventId
            },
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                /*
                 * The back json string should have a param "success", when it equal "false" means fail to delete in server side
                 */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },

    deleteRepeatEvent:function(event, makeException, sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.deleteRepeatEventURL,
            /*
             * pass the id of event to delete
             */
            params:{
                'id':event.eventId,
                'makeException':makeException,
                'repeatType':Ext.encode(event.repeatType)
            },
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                /*
                 * The back json string should have a param "success", when it equal "false" means fail to delete in server side
                 */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For change all events in a day to another day
     * @param {string} oday: the old day, all events belong to this day need be changed
     * @param {string} nday: the new day, all events belong to old day will change to this day
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     * @param {boolean} keep: if true will keep the events for old day, if false then delete events for old day
     */
    changeDay:function(oday, nday, sucessFn, scope, keep){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.changeDayURL,
            params:{
                'dragDay':oday,
                'dropDay':nday,
                'keep':keep
            },
            success:function(response, options){
                var backObj = Ext.decode(response.responseText);
                /*
                 * If keep is true, the back json string should contain a param "ids", which is an array keeps the id of the events just created for new day,
                 * for example: {"success":"true","info":"You have success update those events","backids":[18,19]};
                 * if keep is false, the back json is like: {"success":"true","info":"You have success update those events","backids":[]};
                 * it should also have a param "success", when it equal "false" means fail to change in server side
                 */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For delete all events in a day
     * @param {string} day: all events belong to this day need be deleted
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    deleteDay:function(day, sucessFn, scope){
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.deleteDayURL,
            /*
             * pass the day to server, it's a string, 'Y-m-d' format
             */
            params:{
                'day':day
            },
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                 /*
                  * The back json string should have a param "success", when it equal "false" means fail to delete in server side
                  */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For load setting of feyaCalendar   
     * @param {int} userId: the ID of current user
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function  
     */
    loadSetting:function(userId, sucessFn, scope){
    	Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.loadSettingURL,
            /*
             * pass the userId to server
             */
            params:{
                'userId':userId
            },
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                 /*
                  * The back json string should have a param "success", when it equal "false" means fail to delete in server side
                  */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },
    /*
     * For save setting of feyaCalendar   
     * @param {obj} obj: the obj of current setting
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function  
     */
    updateSetting:function(obj, sucessFn, scope){
        var params = {
            'userId':this.mainPanel.userId
        };
        Ext.apply(params, obj);
    	Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.updateSettingURL,
            /*
             * pass the userId to server
             */
            params:params,
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                 /*
                  * The back json string should have a param "success", when it equal "false" means fail to delete in server side
                  */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    },

    createUpdateRepeatEvent:function(event, oevent, sucessFn, scope){
        var stime = Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, event.startRow);
        var etime = Ext.ux.calendar.Mask.getIntervalFromRow(this.intervalSlot, event.endRow);        
        var params = {
            'calendarId':event.calendarId,
            'startDay':event.day,
            'endDay':event.eday,
            'startHMTime':stime,
            'endHMTime':etime,
            'repeatType': ('string' == Ext.ux.calendar.Mask.typeOf(event.repeatType))?event.repeatType:Ext.encode(event.repeatType),                  
            'alertFlag':Ext.encode(event.alertFlag),
            'locked':event.locked,
            'subject':event.subject,
            'description':event.content,
            'userId':this.mainPanel.userId
        };        
        if('prepare' != event.eventId){
            params.id = event.eventId;
        }
        if(oevent){
            if('string' == Ext.ux.calendar.Mask.typeOf(oevent.repeatType)){
                params.oldRepeatType = oevent.repeatType;
            }else{
                params.oldRepeatType = Ext.encode(oevent.repeatType);                
            }
        }
        Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.createUpdateRepeatEventURL,
            /*
             * the params pass to server should contain:
             * calendarId: int, the id of the calendar this event belong to
             * selectedDay: string, 'Y-m-d' format, the day of this event
             * startHMTime: string, 'H:i' format, the start time of this event
             * endHMTime: string, 'H:i' format, the end time of this event
             * repeatType: boolean, not use yet, always false in this version
             * allDay: boolean, if true means this event is a whole event
             * flag: boolean, if true mean this event need alert a window when it's activing
             * locked: boolean, if true mean this event is locked, can not be changed
             * subject: string, the subject of this event
             * description: string, the description of this event
             */
            params:params,
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                /*
                 * The back json string should contain a param "id", which is the id of the event just created,
                 * it should also have a param "success", when it equal "false" means fail to create/update in server side,
                 * for example: {"success":"true","info":"Your have successful created event","id":17}
                 */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {                    
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            }
        });
    },
    /*
     * For load setting and calendar from db
     * @param {int} userId: the ID of current user
     * @param {function} sucessFn: the callback function when request completed successfully
     * @param {obj} scope: the scope of sucessFn function
     */
    initialLoad:function(userId, sucessFn, scope){
    	Ext.Ajax.request({
            url:Ext.ux.calendar.CONST.initialLoadURL,
            /*
             * pass the userId to server
             */
            params:{
                'userId':userId
            },
            success:function(response, options){
                 var backObj = Ext.decode(response.responseText);
                 
                 /*
                  * The back json string should have a param "success", when it equal "false" means fail to delete in server side
                  */
                if (backObj.success == 'false') {
                    Ext.Msg.show({
                        title:'Error',
                        msg: backObj.errorInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    var cs = backObj.cs[0];                                       
                    cs = Ext.ux.calendar.Mask.calculateActiveRow(cs);
                    Ext.apply(this, cs);
                    backObj.cs = cs;                    
                    var re = backObj.re;
                    var eventSet = {};
                    var getRowFromHM = Ext.ux.calendar.Mask.getRowFromHM;
                    for(var i = 0, len = re.length; i < len; i++){
                        var data = re[i];
                        var startRow = getRowFromHM(data.startTime, this.intervalSlot);
                        var endRow = getRowFromHM(data.endTime, this.intervalSlot);
                        if(startRow == endRow){
                            endRow++;
                        }                        
                        var e = {
                            eventId:data.id,
                            calendarId:data.calendarId,
                            color:data.color,
                            startRow:startRow,
                            endRow:endRow,
                            subject:data.subject,
                            content:data.description,
                            repeatType:Ext.decode(data.repeatType),
                            alertFlag:Ext.decode(data.alertFlag),
                            locked:data.locked
                        };
                        eventSet[e.eventId] = e;
                    }
                    backObj.re = eventSet;
                    sucessFn.call(scope, backObj);
                }
            },
            failure:function(response, options){

            },
            scope:scope || this
        });
    }
});
