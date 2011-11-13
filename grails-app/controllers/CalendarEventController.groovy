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
import grails.converters.*
import org.codehaus.groovy.grails.commons.GrailsResourceUtils
import org.springframework.util.ResourceUtils
import java.util.Iterator


class CalendarEventController extends GeneralController{

    // define service
    def calendarEventService

    /**
     * Mapping url: http://localhost:8080/calendar/calendarEvent/list
     *
     * This will lost of events in the system based on search result.
     * Return result will be in JSON format.
     */
    def list = {

        // get from session ...
        CalendarEventSearchCriteria eventSC = new CalendarEventSearchCriteria()
        if (session['CALENDAR_EVENT_SEARCH_CRITERIA']) {
            eventSC = session['CALENDAR_EVENT_SEARCH_CRITERIA']
        }        
        eventSC.author = getLoginUser()
        
        // check to see whether start/end data mentioned...default today
        eventSC.startTime = new Date();
        eventSC.endTime = new Date();                

        if (params.startDay) {
            String startDay = params.startDay
            eventSC.startTime = DateUtil.parse(startDay)
        }

        if (params.endDay) {
            String endDay = params.endDay
            eventSC.endTime = DateUtil.parse(endDay)
        }
        
        session['CALENDAR_EVENT_SEARCH_CRITERIA'] = eventSC

        // get list of services based on condition ...
        def json = calendarEventService.getListOfEvents(eventSC)
        
        render json as JSON
    }

    /**
     * This will deal with create event
     */
    def createEditEvent = {                
        params.author = getLoginUser()

        if (params.calendarId) {
            CalendarType calendarType = CalendarType.get(params.calendarId)
            params.calendarType = calendarType
        }        

        def json = calendarEventService.createEditEvent(params)

        render json as JSON
    }   

    /*
     * This will delete the event now
     */
    def deleteEvent = {      
        def json = calendarEventService.deleteEvent(params)

        render json as JSON
    }
    /*
     *  This will delete the repeat event or make an exception
     */
    def deleteRepeatEvent = {        
        def json = calendarEventService.deleteRepeatEvent(params)

        render json as JSON
    }

    /**
     * This will delete the event now
     */
    def deleteByCalendar = {        
        CalendarEventSearchCriteria eventSC = new CalendarEventSearchCriteria()
        if (session['CALENDAR_EVENT_SEARCH_CRITERIA']) {
            eventSC = session['CALENDAR_EVENT_SEARCH_CRITERIA']
        }
        eventSC.author = User.findByUsername("demo")

        if (params.calendarId) {
            CalendarType calendarType = CalendarType.get(params.calendarId)
            eventSC.calendarType = calendarType
        }

        def json = calendarEventService.deleteByCalendar(eventSC)

        render json as JSON
    }

    /**
     * This will delete one specific day events ...
     * and param is day - format - yyyy-MM-dd
     */
    def deleteDayEvents = {        
        CalendarEventSearchCriteria eventSC = new CalendarEventSearchCriteria()
        if (session['CALENDAR_EVENT_SEARCH_CRITERIA']) {
            eventSC = session['CALENDAR_EVENT_SEARCH_CRITERIA']
        }
        eventSC.author = getLoginUser()
        eventSC.startTime = DateUtil.parse(params.day + " 00:00", "yyyy-MM-dd HH:mm")        
        eventSC.endTime = DateUtil.parse(params.day + " 23:59", "yyyy-MM-dd HH:mm")

        def json = calendarEventService.deleteDayEvents(eventSC)

        render json as JSON
    }

    /**
     * This will update a list of events in this day.
     * FrontEnd will pass 2 params: dragDay, dropDay
     */
    def updateDayEvents = {                
        CalendarEventSearchCriteria eventSC = new CalendarEventSearchCriteria()
        if (session['CALENDAR_EVENT_SEARCH_CRITERIA']) {
            eventSC = session['CALENDAR_EVENT_SEARCH_CRITERIA']
        }
        eventSC.author = getLoginUser()
        eventSC.dragDay = params.dragDay
        eventSC.dropDay = params.dropDay
        eventSC.startTime = DateUtil.parse(params.dragDay + " 00:00", "yyyy-MM-dd HH:mm")
        eventSC.endTime = DateUtil.parse(params.dragDay + " 23:59", "yyyy-MM-dd HH:mm")

        def json = calendarEventService.updateDayEvents(eventSC, params.keep)

        render json as JSON
    }

    // for search event
    def search = {                
        // get from session ...
        CalendarEventSearchCriteria eventSC = new CalendarEventSearchCriteria()
        if (session['CALENDAR_EVENT_SEARCH_CRITERIA']) {
            eventSC = session['CALENDAR_EVENT_SEARCH_CRITERIA']
        }

        // hard code login user at this
        eventSC.author = getLoginUser()
        
        if (params.text) {
            eventSC.subject = params.text
            eventSC.description = params.text
        }else{
            eventSC.subject = ''
            eventSC.description = ''
        }
        eventSC.start = Integer.valueOf(params.start);
        eventSC.limit = Integer.valueOf(params.limit);
        eventSC.sort = params.sort
        eventSC.dir = params.dir

        session['CALENDAR_EVENT_SEARCH_CRITERIA'] = eventSC
        
        def json = calendarEventService.searchListOfEvents(eventSC)
                        
        render json as JSON
    }
    /*
     * load all repeat events of logined user
     */

    def loadRepeatEvents = {
        CalendarEventSearchCriteria eventSC = new CalendarEventSearchCriteria()
        if (session['CALENDAR_EVENT_SEARCH_CRITERIA']) {
            eventSC = session['CALENDAR_EVENT_SEARCH_CRITERIA']
        }

        // hard code login user at this
        eventSC.author = getLoginUser()

        session['CALENDAR_EVENT_SEARCH_CRITERIA'] = eventSC

        def json = calendarEventService.getListOfRepeatEvents(eventSC)

        render json as JSON
    }

    /**
     * This will deal with create event
     */
    def createUpdateRepeatEvent = {                
        params.author = getLoginUser()

        if (params.calendarId) {
            CalendarType calendarType = CalendarType.get(params.calendarId)
            params.calendarType = calendarType
        }               

        def json = calendarEventService.createEditRepeatEvent(params)

        //return json data
        render json as JSON
    }

}
