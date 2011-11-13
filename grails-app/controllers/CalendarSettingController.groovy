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
import grails.converters.*

class CalendarSettingController extends GeneralController{
    def calendarSettingService
    def list = {        
        // get login user id
        User loginUser = getLoginUser()

        def json = calendarSettingService.getListOfCalendarSetting(loginUser)

        render json as JSON
    }

    // update calendar setting ...
    def update = {        
        params.author = getLoginUser()

        def json = calendarSettingService.updateCalendarSetting(params)
        
        render json as JSON
    }
    
}
