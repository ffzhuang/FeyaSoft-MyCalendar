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
class CalendarTypeService {

    def calendarEventService
    boolean transactional = true

    // check to see whether the name already exist in system for this user ...
    def isDuplicateName(author, name){
        def result = true
        // get all name by me
        def calendarLists = CalendarType.withCriteria{
            and{
                eq("author.id", author.id)
                eq("name", name)
            }
        }

        if (calendarLists.size() == 0) {
            result = false
        }

        return result
    }

    def getListOfCalendarType(loginUser){
        def calendars = CalendarShare.withCriteria{
            eq("owner.id", loginUser.id)
        }
        // ok add condition if calendarLists is null, add one new calendar
        if (null == calendars || calendars.size() == 0) {            
            def defaultCalendar = new CalendarType(
                name: loginUser.username,
                author: loginUser
            )
            defaultCalendar.save()
            def calendarShare = new CalendarShare(
                calendarType:defaultCalendar,
                owner:loginUser
            )
            calendarShare.save()
            calendars = CalendarShare.withCriteria{
                and{
                    eq("owner.id", loginUser.id)
                }
            }
        }
        def ownedCalendarList = []
        calendars.each{
            def ct = it.calendarType
            def shares = CalendarShare.withCriteria{
                and{
                    eq("calendarType.id", ct.id)
                    ne("user.id", loginUser.id)
                }
            }
            def userList = []
            shares.each{
                def userUI = new UIUser(
                    id:it.user.id,
                    username:it.user.username,
                    userRealName:it.user.firstName+" "+it.user.lastName,
                    enabled:it.user.enabled,
                    email:it.user.email
                )
                userList.add(userUI)
            }
            def calendarTypeUI = new CalendarTypeUIModel(
                id:it.calendarType.id,
                name:it.calendarType.name,
                description:it.calendarType.description,
                color:it.calendarType.color,
                hide:it.calendarType.hide,
                isShared:false,
                permit:it.permit,
                shares:userList
            )
            ownedCalendarList.add(calendarTypeUI)
        }

        calendars = CalendarShare.withCriteria{
            eq("user.id", loginUser.id)
        }

        def sharedCalendarList = []
        calendars.each{
            def ct = it.calendarType
            def shares = CalendarShare.withCriteria{
                and{
                    eq("calendarType.id", ct.id)
                    ne("user.id", loginUser.id)
                }
            }
            def userList = []
            shares.each{
                def userUI = new UIUser(
                    id:it.user.id,
                    username:it.user.username,
                    userRealName:it.user.firstName+" "+it.user.lastName,
                    enabled:it.user.enabled,
                    email:it.user.email
                )
                userList.add(userUI)
            }
            def calendarTypeUI = new CalendarTypeUIModel(
                id:it.calendarType.id,
                name:it.calendarType.name,
                description:it.calendarType.description,
                color:it.calendarType.color,
                hide:it.calendarType.hide,
                isShared:true,
                permit:it.permit,
                shares:userList
            )
            sharedCalendarList.add(calendarTypeUI)
        }
        //return a bunch of json data with metadata.
        def json = [            
            total: ownedCalendarList.size()+sharedCalendarList.size(),
            owned: ownedCalendarList,
            shared: sharedCalendarList
        ]
        calendars = null
        ownedCalendarList = null
        sharedCalendarList = null

        return json
    }

    def showAllCalendarType(loginUser){
        def json = [success : "true", info : "You have success show all calendars"]
        def calendars = CalendarShare.withCriteria{
            and{
                eq("owner.id", loginUser.id)
            }
        }
        calendars.each {
            it.calendarType.hide = false
            it.calendarType.save()
        }        
        calendars = null

        return json
    }

    def showOnlyCalendarType(params){
        def json
        def item = CalendarType.get(params.id)
        if (item) {
            item.hide = false
            def calendars = CalendarShare.withCriteria{
                and{
                    or{
                        eq("owner.id", params.author.id)
                        eq("user.id", params.author.id)
                    }
                    ne("calendarType.id", new Long(params.id))
                }
            }
            calendars.each{
                it.calendarType.hide = true
                it.save()
            }
        }
        if(!item.hasErrors() && item.save()) {
            json = [success : "true", info : "You have success show this calendar", id : item.id]
        } else {
            def errors = "Error is: "
            item.errors.allErrors.each {
                errors = errors + it
            }
            json = [success : "false", errorInfo: errors]
        }

        return json
    }

    def creatUpdateCalendarType(params){
        def json
        boolean isNew = false
        def item = null
        if(null != params.id){
            item = CalendarType.get(params.id)
        }
        if (item) {
            if ("true" == params.hide)  {
                item.hide = true
            } else {
                item.hide = false
            }
            item.name = params.name
            if (params.description) {
                item.description = params.description
            }
            if (params.color) {
                item.color = params.color
            }
        } else {
            if (isDuplicateName(params.author, params.name)) {
                json = [success : "false", errorInfo : "This calendar name has already been used, please select another one"]
                return json
            }
            if ("true" == params.hide) {
                params.hide = true
            } else {
                params.hide = false
            }            
            item = new CalendarType(params)
            item.save()
            def calendarShare = new CalendarShare(
                calendarType:item,
                owner:params.author
            )
            calendarShare.save()
            isNew = true
        }                
        if(!item.hasErrors() && item.save()) {
            json = [success : "true", info : "You have success creat/update this calendar", id : item.id]
        } else {
            def errors = "Error is: "
            item.errors.allErrors.each {
                errors = errors + it
            }
            json = [success : "false", errorInfo: errors]
        }
        item = null

        return json
    }

    def deleteCalendarType(params){
        def json = [success : "true", info : "You have success delete this calendar"]
        def item = CalendarType.get(params.id)
        if (item) {
            // delete all the calendar event related to this calendarType
            def events = CalendarEvent.withCriteria{
                and{
                    eq("calendarType.id", new Long(params.id))
                }
            }

            // delete stuff ...
            calendarEventService.deleteEvents(events)

            events = null
            def calendars = CalendarShare.withCriteria{
                eq("calendarType.id", item.id)
            }
            calendars.each {
                it.delete()
            }
            calendars = null
            // delete this calendar type
            item.delete();
        }
        return json
    }

    def shareCalendarType(params){        
        def cs = new CalendarShare(
            calendarType:params.calendarType,
            owner:params.author,
            user:params.sharedUser
        )
        def json = [success : "true", info : "You have success share this calendar", id:cs.id]
    }
}
