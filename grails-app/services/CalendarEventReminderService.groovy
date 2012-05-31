/**
 * FeyaSoft MyCalendar
 * Copyright(c) 2006-2010, FeyaSoft Inc. All right reserved.
 * info@feyasoft.com
 * http://www.feyasoft.com
 *
 * Please read license first before your use myCalendar, For more detail
 * information, please can visit our link: http://www.feyasoft.com.
 *
 * You need buy one of the Feyasoft's License if you want to use MyCalendar in
 * your product. You must not remove, obscure or interfere with any FeyaSoft
 * copyright, acknowledgment, attribution, trademark, warning or disclaimer
 * statement affixed to, incorporated in or otherwise applied in connection
 * with the Software and User Interface.
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
import org.json.JSONArray

import groovy.sql.Sql

class CalendarEventReminderService {

    def mailService   
    def dataSource
    boolean transactional = true
    
    // this will return a list of reminder based on this event.
    def getReminder = { event ->
        // retrun result
        CalendarEventReminder reminder = new CalendarEventReminder();

        def eventReminders = CalendarEventReminder.withCriteria{
            eq("event.id", event.id)
        }
        if(eventReminders){
            def json = new JSONArray()
            eventReminders.each {
                def obj = new JSONObject()
                obj.put('type', it.alertType)
                obj.put('early', it.alertEarlyTime)
                obj.put('unit', it.timeUnit)
                json.put(obj)
            }           
            return json.toString()
        }
        return null;
    }

    // clean any reminder related to this event ..
    // Then start to create a new one
    def cleanCreate = {event, alertEarlyTime, alertType ->

        delete(event)

        CalendarEventReminder reminder = new CalendarEventReminder(
            event: event,
            alertType: alertType,
            alertEarlyTime: alertEarlyTime
        )

        return reminder.save();
    }

    def create = {event, alertEarlyTime, alertType, alertTimeUnit ->

        CalendarEventReminder reminder = new CalendarEventReminder(
            event: event,
            alertType: alertType,
            alertEarlyTime: alertEarlyTime,
            timeUnit: alertTimeUnit
        )
        reminder.save();        
        return reminder;
    }

    def copy = {event, id->
        def eventReminders = CalendarEventReminder.withCriteria{
            eq("event.id", id)
        }
        if(eventReminders){
            eventReminders.each {
                this.create(event, it.alertEarlyTime, it.alertType, it.timeUnit)
            }
        }
    }

    /**
     * delete any reminders under this event
     */
    def delete = {event ->
         // clean first
        def eventReminders = CalendarEventReminder.withCriteria{
            eq("event.id", event.id)
        }

        eventReminders.each {
            it.delete();
        }
    }

    /**
     * This will search through reminder and send email now ...
     * Be care of the performance ... this double think this...
     * Maybe disable for future if it impact server too much ..
     * A backend job is running to check this.
     */
    def sendReminderEmail = {
        log.info('Start checking email reminder...' + new Date())
        def eventReminders = CalendarEventReminder.withCriteria{
            and {                
                ge("alertEarlyTime", 0)
                or {
                    ne("alerted", "forever")
                    isNull("alerted")
                }
                eq("alertType", "email")
            }
        }

        // loop each reminder 
        eventReminders.each {              
            checkSendEmail(it, false)
        }
        log.info('End checking email reminder...'  + new Date())
    }    

    def checkSendEmail = {eventReminder, fullcheck ->

        // first I need check whether email is correct, if yes, continue, otherwise stop ...
        def emailAddress = eventReminder.event.author.email;
        if (emailAddress == null  || !Helper.isEmailValid(emailAddress)) {
            return null;
        }
        
        //  ok email address is ok now.... start to further step ..
        def earlyTime = eventReminder.alertEarlyTime;
        def timeUnit = eventReminder.timeUnit
        if('hour' == timeUnit) earlyTime = earlyTime*60;
        else if('day' == timeUnit) earlyTime = earlyTime*60*24;
        else if('week' == timeUnit) earlyTime = earlyTime*60*24*7;
        
        def event = eventReminder.event;
        def repeatType = event.repeatType;
        def alerted = eventReminder.alerted        
        def nowTime = new Date();
        def nowDay = DateUtil.format(nowTime, 'yyyy-MM-dd');
        // check whether it is repeat event or not
        if("no" == repeatType || "exception" == repeatType){
            if(!alerted){
                if (event.endTime.before(nowTime)){
                    eventReminder.alerted = 'forever';
                    eventReminder.save();
                }else{
                    def limitTime = DateUtil.addHourMin(nowTime, 0, earlyTime);
                    if (event.startTime.before(limitTime)) {                        
                        // send email
                        emailNotify(event);

                        // set this event alerted as true - one time send
                        /*
                         * I changed the alerted from boolean to string, because for repeat event we can not just set alerted to true,
                         * because some repeat event, we need send email for it every day
                         * if it's set to forever, means the event is alerted or out ot date
                         */
                        eventReminder.alerted = 'forever';
                        eventReminder.save();
                    }
                }
            }
        }else if(nowDay != alerted && 'forever' != alerted){
            /* for repeat event, if alerted == forever means the repeat event is out of date;
             * if alerted == nowDay, means it send email today
             * */
            def limitTime = DateUtil.addHourMin(nowTime, 0, earlyTime);
            def repeatJson = new JSONObject(repeatType)
            if(fullcheck){
                def dspan = repeatJson.getInt('dspan')                
                int i;                
                for(i = dspan; i >= 0; i--){
                    limitTime = DateUtil.addDay(limitTime, -i)
                    nowTime = DateUtil.addDay(nowTime, -i)
                    nowDay = DateUtil.format(nowTime, 'yyyy-MM-dd')
                    checkSendRepeatEmail(earlyTime, nowDay, limitTime, repeatJson, eventReminder)                    
                }
            }else{
                checkSendRepeatEmail(earlyTime, nowDay, limitTime, repeatJson, eventReminder)
            }
        }
    }

    def checkSendRepeatEmail = {earlyTime, nowDay, limitTime, repeatJson, eventReminder->
        def dspan = repeatJson.getInt('dspan')    
        def limitDay = limitTime.format("yyyy-MM-dd")
        def event = eventReminder.event
        def beginDay = repeatJson.getString('beginDay')
        def beginTime = DateUtil.parse(beginDay + " 00:00", "yyyy-MM-dd HH:mm")
        def startHM = DateUtil.format(event.startTime, 'HH:mm');
        def endHM = DateUtil.format(event.endTime, 'HH:mm');        
        if(!beginTime.after(limitTime)){/*means it could be in the window of alert*/
            def rtype = repeatJson.getString('rtype')                    
            def endDay = repeatJson.getString('endDay')

            def rtime = null
            if(false == repeatJson.isNull('rtime')){
                rtime = repeatJson.getInt('rtime')
            }
            def intervalSlot = repeatJson.getInt('intervalSlot')

            def flag = true
            if("no" != endDay){/* repeat with end date*/
                def endDate = DateUtil.parse(endDay + " " + endHM, "yyyy-MM-dd HH:mm")                
                if(!limitTime.before(endDate)){/*false means this repeat event is already out of date, so we set alerted = forever, which keep us from checking it again*/
                    eventReminder.alerted = 'forever';
                    eventReminder.save();
                    flag = false
                }
            }            
            if(true == flag){                
                def epts
                if(false == repeatJson.isNull('exceptions')){                    
                    epts = repeatJson.getJSONObject('exceptions')
                }
                if(epts){                    
                    if(false == epts.isNull(limitDay)){/*if it's ture means no repeat event in the limit day*/
                        /*
                         * for repeat event, if we checked it today, we set alerted = nowday, so we don't need check it again in the same day
                         * in this case, the exception won't change, so we only need check once
                         */                        
                        eventReminder.alerted = nowDay;
                        eventReminder.save();                        
                        return;
                    }
                }                
                def offset, match = false, times
                if('week' == rtype){                    
                    def bw = DateUtil.getWeekOfDay(beginTime)-1;                    
                    def lw = DateUtil.getWeekOfDay(limitTime)-1;
                    offset = DateUtil.escapeDays(beginTime, limitTime);
                    offset = Math.floor((offset-bw-lw)/7)+1;
                    times = Math.floor(offset/intervalSlot)                    
                    int rest = offset%intervalSlot                    
                    if(0 == rest){                        
                        def rday = repeatJson.getJSONObject('rday')
                        match = rday.getBoolean(Integer.toString(lw))
                    }
                }else if('month' == rtype){                    
                    offset = DateUtil.escapeMonths(beginTime, limitTime)                    
                    times = Math.floor(offset / intervalSlot)                    
                    match = (0 == offset % intervalSlot)
                    if(match){
                        def rby = repeatJson.getString('rby');
                        if('date' == rby){
                            def bd = beginTime.format("d")
                            def ld = limitTime.format("d")
                            match = (bd == ld)
                        }else{
                            match = false                            
                            if(DateUtil.getWeekOfMonth(beginTime) == DateUtil.getWeekOfMonth(limitTime)){
                                if(DateUtil.getWeekOfDay(beginTime) == DateUtil.getWeekOfDay(limitTime)){
                                    match = true
                                }
                            }
                        }
                    }
                }else if('year' == rtype){
                    def lyear = DateUtil.getYear(limitTime);
                    def byear = DateUtil.getYear(beginTime);
                    def bd = beginTime.format("d")
                    def ld = limitTime.format("d")
                    offset = lyear - byear
                    times = Math.floor(offset / intervalSlot)
                    match = (0 == offset % intervalSlot && bd == ld)
                }else{                    
                    offset = DateUtil.escapeDays(beginTime, limitTime);
                    times = Math.floor(offset / intervalSlot)
                    match = (0 == offset % intervalSlot)                    
                }
                /*
                 * if rtime is set, we need check wether the limit day is not beyond the rtime
                 */
                if(match){
                    if(rtime){
                        match = (times < rtime)
                    }
                }
                if(match){
                    def limitHM = DateUtil.format(limitTime, 'HH:mm')                    
                    if(startHM <= limitHM){/*if start hour and minute is earlier than limit hour minute, it means we should send email to alert user*/                                                
                        // send email
                        event.startTime = DateUtil.parse(nowDay+" "+startHM, "yyyy-MM-dd HH:mm")
                        event.endTime = DateUtil.parse(nowDay+" "+endHM, "yyyy-MM-dd HH:mm")
                        event.endTime = DateUtil.addDay(event.endTime, dspan)                        
                        boolean emailOk = emailNotify(event);
                        // to reduce annoy email - if email address is not correct - that is exception - never send again
                        if (emailOk) {
                            eventReminder.alerted = nowDay;
                        } else {
                            eventReminder.alerted = 'forever';
                        }
                        eventReminder.save();
                    }
                }else{/*if the day not match, we don't need check it again during this day*/
                    eventReminder.alerted = nowDay;
                    eventReminder.save();
                }
            }
        }
    }

    // now send an email to notify this user...
    // addd more condition - if email is wrong and we get exception
    // we will not send this email again - set it as forever ...
    def emailNotify = { event ->

        boolean sendEmailOk = true;

        // get email from user ...
        def emailAddress = event.author.email;
        if (emailAddress && Helper.isEmailValid(emailAddress)) {

            def startTimeString = DateUtil.format(event.startTime, "EEE, MMM d, yyyy HH:mm");
            def endTimeString = DateUtil.format(event.endTime, "EEE, MMM d, yyyy HH:mm");

            def bodyInfo = "<b>${event.subject}</b><br><br>When: ${startTimeString} - ${endTimeString}"
            def title = "Reminder: ${event.subject} @ ${startTimeString} - ${endTimeString}"

            // log
            log.info("${bodyInfo} - ${title}")

            try {
                mailService.sendMail {
                    to emailAddress
                    from "noreply@feyasoft.com"
                    subject title
                    html bodyInfo
                }

            } catch (Exception e) {
                sendEmailOk = false;
                log.error("Send event notification to ${emailAddress} failed - Exception")
            }
        }

        return sendEmailOk;
    }
}
