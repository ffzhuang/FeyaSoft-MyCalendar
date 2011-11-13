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

class CalendarTypeController extends GeneralController{

    // define service
    def calendarTypeService

    // list of calendar type 
    def list = {
        User loginUser = getLoginUser()
        
        def json = calendarTypeService.getListOfCalendarType(loginUser)
        
        render json as JSON
    }

    // show all - show all calendar
    def showAll = {
        
        User loginUser = getLoginUser()

        def json = calendarTypeService.showAllCalendarType(loginUser)

        render json as JSON
    }

    // show only - show only one calendar
    def showOnly = {
        params.author = getLoginUser()
        
        def json = calendarTypeService.showOnlyCalendarType(params)
        
        render json as JSON
    }

    // create - edit calendar type ...
    def createUpdate = {                        
        params.author = getLoginUser()
        
        def json = calendarTypeService.creatUpdateCalendarType(params)

        render json as JSON
    }

    // delete calendar type
    def delete = {
        params.author = getLoginUser()

        def json = calendarTypeService.deleteCalendarType(params)

        render json as JSON
    }

    def share = {
        params.author = getLoginUser()

        params.sharedUser = User.get(params.sharedId)
        
        params.calendarType = CalendarType.get(params.calendarId)
        
        def json = calendarTypeService.shareCalendarType(params)

        render json as JSON
    }
}
