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

class CalendarController extends GeneralController{
    def calendarSettingService

    def calendarTypeService

    def calendarEventService

    def userService

    def load = {
        User loginUser = getLoginUser()

        def json

        def cs = calendarSettingService.getListOfCalendarSetting(loginUser)

        def ct = calendarTypeService.getListOfCalendarType(loginUser)

        CalendarEventSearchCriteria eventSC = new CalendarEventSearchCriteria()
        if (session['CALENDAR_EVENT_SEARCH_CRITERIA']) {
            eventSC = session['CALENDAR_EVENT_SEARCH_CRITERIA']
        }
        eventSC.author = getLoginUser()

        def re = calendarEventService.getListOfRepeatEvents(eventSC)
        
        json = [
            cs:cs.results,
            owned:ct.owned,
            shared:ct.shared,
            re:re.results
        ]

        render json as JSON
    }

    def queryUser = {
        params.author = getLoginUser()

        def json = userService.getListOfUser(params)

        render json as JSON
    }
}
