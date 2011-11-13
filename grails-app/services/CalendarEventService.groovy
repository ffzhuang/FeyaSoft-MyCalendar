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
import java.util.HashMap
import java.util.HashSet
import org.json.JSONObject
import groovy.sql.Sql
import org.json.JSONArray

class CalendarEventService {
    def mailService
    def calendarEventReminderService
    def dataSource
    
    boolean transactional = true

    def isRepeatEvent(repeatType) {
        if("no" == repeatType || "exception" == repeatType){
            return false;
        }
        return true;
    }
    
    // This will return a list of events
    def getListOfEvents(CalendarEventSearchCriteria eventSC) {
        // json string
        def uiEventLists = []

        Date startTime = DateUtil.getDMYDate(eventSC.getStartTime())
        Date date = DateUtil.getDMYDate(eventSC.getEndTime())
        Date endTime = DateUtil.addHourMin(date, 23, 59)

        def calendars = CalendarShare.withCriteria{
            or{
                eq("owner.id", eventSC.author.id)
                eq("user.id", eventSC.author.id)
            }
        }
        
        def events = CalendarEvent.withCriteria{
            and{
                or{
                    calendars.each{
                        eq("calendarType.id", it.calendarType.id)
                    }
                }
                or{
                    eq("repeatType", "no")
                    eq("repeatType", "exception")
                }
                or{
                    between("startTime", startTime, endTime)
                    between("endTime", startTime, endTime)                    
                    and {
                        le("startTime", startTime)
                        ge("endTime", endTime)
                    }
                }
            }
            order "startTime"
            order ("endTime", "desc")
        }
        
        // ok now, start play with events for UI...
        events.each {
            // get start/end date            
            String ymd = DateUtil.format(it.startTime);
            String eymd = DateUtil.format(it.endTime);
            String sTime = DateUtil.format(it.startTime, "HH:mm");
            String eTime = DateUtil.format(it.endTime, "HH:mm");            
            String subject = ""
            if (it.subject != null) {subject = "${it.subject}"}

            // ok now I need check event reminder, and return this to the UI
            def calendarEventReminder = calendarEventReminderService.getReminder(it);

            def uiEvent = new CalendarEventUIModel(
                id: "${it.id}",
                calendarId: it.calendarType.id,
                color:it.calendarType.color,
                subject: subject,
                description: it.description,
                ymd: ymd,
                eymd: eymd,
                alertFlag: calendarEventReminder,                
                startTime: sTime,
                endTime: eTime,                 
                locked:it.locked,
                repeatType:it.repeatType
            )
            uiEventLists.add uiEvent
        }

        // add this - seems grails have some problem to Gargbarge clean
        // if really necessary, maybe need call this - System.gc()
        events = null

        def json = [            
            total: uiEventLists.size(),
            results: uiEventLists
        ]

        // clean - do not know whetehr thisis necessary
        uiEventLists = null

        return json
    }

    // This will return a list of repeat events
    def getListOfRepeatEvents(CalendarEventSearchCriteria eventSC) {
        // json string
        def uiEventLists = []

        def calendars = CalendarShare.withCriteria{
            or{
                eq("owner.id", eventSC.author.id)
                eq("user.id", eventSC.author.id)
            }
        }

        def events = CalendarEvent.withCriteria{
            and{
                or{
                    calendars.each{
                        eq("calendarType.id", it.calendarType.id)
                    }
                }
                ne("repeatType", "no")
                ne("repeatType", "exception")
            }
        }

        // ok now, start play with events for UI...
        events.each {                            
            String sTime = DateUtil.format(it.startTime, "HH:mm");
            String eTime = DateUtil.format(it.endTime, "HH:mm");

            // get reminder
            def calendarEventReminder = calendarEventReminderService.getReminder(it);

            def uiEvent = new CalendarEventUIModel(
                id: "${it.id}",
                calendarId: it.calendarType.id,
                color:it.calendarType.color,
                subject: it.subject,
                description: it.description,
                alertFlag: calendarEventReminder,                
                startTime: sTime,
                endTime: eTime,                
                locked:it.locked,
                repeatType:it.repeatType
            )
            uiEventLists.add uiEvent
        }

        // clean now
        events = null

        def json = [            
            total: uiEventLists.size(),
            results: uiEventLists
        ]

        uiEventLists = null

        return json
    }

    // ok this will only return size
    // update something ....
    def getTotalOfEvents(CalendarEventSearchCriteria eventSC) {
        def eventCounts = 0

        if("" == eventSC.subject && "" == eventSC.description){
            eventCounts = CalendarEvent.withCriteria{
                and{
                    eq("author.id", eventSC.author.id)
                }                
                projections {
                    count("id")
                }
            }
        }else{
            eventCounts = CalendarEvent.withCriteria{
                and{
                    eq("author.id", eventSC.author.id)
                    or{
                        ilike("subject", '%'+eventSC.subject+'%')
                        ilike("description", '%'+eventSC.description+'%')
                    }
                }                
                projections {
                    count("id")
                }
            }
        }

        return eventCounts[0]
    }
    
    // This will return a list of events
    def searchListOfEvents(CalendarEventSearchCriteria eventSC) {
        // json string
        def uiEventLists = []
        def events

        if("" == eventSC.subject && "" == eventSC.description){
            events = CalendarEvent.withCriteria{
                and{
                    eq("author.id", eventSC.author.id)
                }
                firstResult(eventSC.start)
                maxResults(eventSC.limit)
                order 'startTime'
                order ('endTime', 'desc')
            }
        }else{
            events = CalendarEvent.withCriteria{
                and{
                    eq("author.id", eventSC.author.id)
                    or{
                        ilike("subject", '%'+eventSC.subject+'%')
                        ilike("description", '%'+eventSC.description+'%')
                    }
                }
                firstResult(eventSC.start)
                maxResults(eventSC.limit)
                order 'startTime'
                order ('endTime', 'desc')
            }
        }                

        // ok now, start play with events for UI...
        events.each {
            // get start/end date
            String ymd = DateUtil.format(it.startTime);
            String eymd = DateUtil.format(it.endTime);
            String sTime = DateUtil.format(it.startTime, "HH:mm");
            String eTime = DateUtil.format(it.endTime, "HH:mm");
            String subject = ""
            if (it.subject != null) {subject = "${it.subject}"}

            // get reminder
            def calendarEventReminder = calendarEventReminderService.getReminder(it);

            def uiEvent = new CalendarEventUIModel(
                id: "${it.id}",
                calendarId: it.calendarType.id,
                color:it.calendarType.color,
                subject: subject,
                description: it.description,
                ymd: ymd,
                eymd: eymd,
                alertFlag: calendarEventReminder,                
                startTime: sTime,
                endTime: eTime,                
                repeatType:it.repeatType,
                locked:it.locked
            )
            uiEventLists.add uiEvent
        }

        // force clean
        events = null

        def json = [            
            total: getTotalOfEvents(eventSC),
            results: uiEventLists
        ]

        // force clean
        uiEventLists = null

        return json
    }
    
    // save a event this will based on the pass parameter and create related event
    // passed params should be include: startTime, endTime, day
    //  subject, description, color
    def createEditEvent(params) {

        String startDate = params.startDay + " " + params.startHMTime
        Date sTime = DateUtil.parse(startDate, "yyyy-MM-dd HH:mm")
        params.startTime = sTime

        if (params.endHMTime == '24:00') params.endHMTime = '23:59'
        String endDate = params.endDay + " " + params.endHMTime
        Date eTime = DateUtil.parse(endDate, "yyyy-MM-dd HH:mm")
        params.endTime = eTime

        def event = null
        if (params.id) {
            event = CalendarEvent.get(params.id)
            if (params.calendarType) {event.calendarType = params.calendarType}
            if (params.subject || "" == params.subject) {event.subject = params.subject}
            if (params.description || "" == params.subject) {event.description = params.description}
            if (params.startTime) {event.startTime = params.startTime}
            if (params.endTime) {event.endTime = params.endTime}
            if (params.repeatType) {event.repeatType = params.repeatType}  
            if ("true" == params.locked) {
                event.locked = true
            }else{
                event.locked = false;
            }
            calendarEventReminderService.delete(event)
        } else {            
            event = new CalendarEvent(params)        
        }        
        
        //def error message
        def json = [failure : "true", errorInfo : "Internal Error, please try again"]
        if(!event.hasErrors()) {
            if (event.save()){
                calendarEventReminderService.delete(event)
                // create event reminder based on this event ...
                if (params.alertFlag) {
                    try{
                        // delete all reminder stuff for this event and add this new one
                        def alertJson = new JSONArray(params.alertFlag)
                        def len = alertJson.length()
                        for(int i = 0; i < len; i++){
                            def alertObj = alertJson.getJSONObject(i)
                            def alertType = alertObj.getString('type')
                            def timeUnit = alertObj.getString('unit')
                            def earlyTime = alertObj.getInt('early')
                            def eventReminder = calendarEventReminderService.create(event, earlyTime, alertType, timeUnit);
                            /*
                            if('email' == alertType){                                
                                calendarEventReminderService.checkSendEmail(eventReminder, false);
                            } */
                        }                        
                    }catch(e){

                    }
                }

                json = [success : "true", info : "Your have successful created event", id: event.id]
                if (params.id) json = [success : "true", info : "Your have successful updated this event", id: event.id]  
            } else {
                def errors = "Error is: "
                event.errors.allErrors.each {
                    errors = errors + it
                }
                log.error(errors)
            }
        }

        // force clean
        event = null

        return json;
    }
    
    // save a event this will based on the pass parameter and create related event
    // passed params should be include: startTime, endTime, day
    //  subject, description, color
    def createEditRepeatEvent(params){        
        String startDate = params.startDay + " " + params.startHMTime
        Date sTime = DateUtil.parse(startDate, "yyyy-MM-dd HH:mm")
        params.startTime = sTime

        if (params.endHMTime == '24:00') params.endHMTime = '23:59'
        String endDate = params.endDay + " " + params.endHMTime
        Date eTime = DateUtil.parse(endDate, "yyyy-MM-dd HH:mm")
        params.endTime = eTime

        def event = null
        if (params.id) {
            def oflag = this.isRepeatEvent(params.oldRepeatType)
            def flag = this.isRepeatEvent(params.repeatType)
            if(true == oflag && true == flag){
                event = CalendarEvent.get(params.id)
                if (params.calendarType) {event.calendarType = params.calendarType}
                if (params.subject || "" == params.subject) {event.subject = params.subject}
                if (params.description || "" == params.subject) {event.description = params.description}
                if (params.startTime) {event.startTime = params.startTime}
                if (params.endTime) {event.endTime = params.endTime}
                if (params.repeatType) {event.repeatType = params.repeatType}                
                if ("true" == params.locked) {
                    event.locked = true
                }else{
                    event.locked = false;
                }
                calendarEventReminderService.delete(event)
            }else if(true == oflag){
                if("exception" == params.repeatType){
                    def oevent = CalendarEvent.get(params.id)                    
                    if (params.oldRepeatType) {oevent.repeatType = params.oldRepeatType}
                    oevent.save()
                }else{
                    def oevent = CalendarEvent.get(params.id)

                    calendarEventReminderService.delete(oevent)
                    oevent.delete()
                }                
                params.id = null                
                event = new CalendarEvent(params)                
            }else if(true == flag){
                def oevent = CalendarEvent.get(params.id)

                calendarEventReminderService.delete(oevent)
                oevent.delete()
                
                params.id = null
                event = new CalendarEvent(params)
            }
        } else {            
            event = new CalendarEvent(params)
        }        
        
        //def error message
        def json = [failure : "true", errorInfo : "Internal Error, please try again"]
        if(!event.hasErrors()) {
            if (event.save()){
                // create event reminder based on this event ...
                if (params.alertFlag) {
                    // delete all reminder stuff for this event and add this new one
                    try{                        
                        def alertJson = new JSONArray(params.alertFlag)
                        def len = alertJson.length()
                        for(int i = 0; i < len; i++){
                            def alertObj = alertJson.getJSONObject(i)
                            def alertType = alertObj.getString('type')
                            def timeUnit = alertObj.getString('unit')
                            def earlyTime = alertObj.getInt('early')
                            def eventReminder = calendarEventReminderService.create(event, earlyTime, alertType, timeUnit);
                            /*
                            if('email' == alertType){                                
                                calendarEventReminderService.checkSendEmail(eventReminder, true);
                            }*/
                        }
                    }catch(e){
                        
                    }
                }

                json = [success : "true", info : "Your have successful created repeat event", id: event.id]
                if (params.id) json = [success : "true", info : "Your have successful updated this repeat event", id: event.id]
            } else {
                def errors = "Error is: "
                event.errors.allErrors.each {
                    errors = errors + it
                }
                log.error(errors)
            }
        }

        // force clean
        event = null

        return json;
    }

    def deleteRepeatEvent(params){
        def json = [success : "true", info : "You have success delete this repeat event"]

        def event = CalendarEvent.get(params.id)
        if("true" == params.makeException){
            if (params.repeatType) {event.repeatType = params.repeatType}
            event.save()
        }else{
            calendarEventReminderService.delete(event)
            event.delete()
        }

        // force clean
        event = null

        return json
    }

    def deleteEvent(params){
        def json = [success : "true", info : "You have success delete this event"]

        def event = CalendarEvent.get(params.id)

        calendarEventReminderService.delete(event)
        event.delete()

        // force clean
        event = null

        return json
    }

    def deleteByCalendar(eventSC){
        def events = CalendarEvent.withCriteria{
            and{
                eq("author.id", eventSC.author.id)
                eq("calendarType.id", eventSC.calendarType.id)
            }
        }

        // ok we need delete a bunch of events
        deleteEvents(events)

        // force clean
        events = null

        return [success : "true", info : "You have success delete all events of this calendar"]
    }

    def deleteDayEvents(eventSC){
        def events = CalendarEvent.withCriteria{
            and{
                eq("author.id", eventSC.author.id)
                calendarType {
                    eq("hide", false)
                }
                or{
                    eq("repeatType", "no")
                    eq("repeatType", "exception")
                }
                between("startTime", eventSC.startTime, eventSC.endTime)
                between("endTime", eventSC.startTime, eventSC.endTime)
            }
        }

        deleteEvents(events)

        // force clean
        events = null

        return [success : "true", info : "You have success delete those events"]
    }

    def updateDayEvents(eventSC, keep){

        def events = CalendarEvent.withCriteria{
            and{
                eq("author.id", eventSC.author.id)
                calendarType {
                    eq("hide", false)
                }
                or{
                    eq("repeatType", "no")
                    eq("repeatType", "exception")
                }
                between("startTime", eventSC.startTime, eventSC.endTime)
                between("endTime", eventSC.startTime, eventSC.endTime)
            }
            order 'startTime'
            order ('endTime', 'desc')
        }
        HashMap<String,String> hm = new HashMap<String,String>();
        events.each {
            String origStartTime = DateUtil.format(it.startTime, 'HH:mm')
            Date upStartTime = DateUtil.parse(eventSC.dropDay + " " + origStartTime, "yyyy-MM-dd HH:mm")
            String origEndTime = DateUtil.format(it.endTime, 'HH:mm')
            Date upEndTime = DateUtil.parse(eventSC.dropDay + " " + origEndTime, "yyyy-MM-dd HH:mm")
            if("true" != keep){
                it.startTime = upStartTime
                it.endTime = upEndTime
                it.save()
            }else{
                def obj = [
                    author:it.author,
                    calendarType:it.calendarType,
                    startDay:eventSC.dropDay,
                    endDay:eventSC.dropDay,
                    startHMTime:origStartTime,
                    endHMTime:origEndTime,
                    subject:it.subject,
                    description:it.description,
                    repeatType:it.repeatType,                                        
                    locked:it.locked
                ]
                def back = this.createEditEvent(obj)
                calendarEventReminderService.copy(CalendarEvent.get(back.id), it.id)
                hm.put(it.id, back.id);
            }
        }

        // force clean
        events = null

        return [success : "true", info : "You have success update those events", backids:hm]
    }

    def cleanAllEvents(eventSC){
        def events = CalendarEvent.withCriteria{
            eq("author.id", eventSC.author.id)
        }

        deleteEvents(events)

        // force clean
        events = null

        return [success : "true", info : "You have cleaned all event!"];
    }

    // ok now need delete a list of event
    // We need delete calendarEventReminder first and come to this one
    def deleteEvents = { events ->

        groovy.sql.Sql sql = new groovy.sql.Sql(dataSource)

        events.each{
            sql.execute("delete from calendar_event_reminder where event_id = ${it.id}")
            sql.execute("delete from calendar_event where id = ${it.id}")
        }

        sql.close()        
    }    
}
