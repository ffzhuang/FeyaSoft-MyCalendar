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
class CalendarSetting {

    static belongsTo = [User]

    User author
    String hourFormat = '24'
    String dayFormat = 'l M d Y'
    String weekFormat = 'm/d(D)'
    String monthFormat = 'm/d'
    String fromtoFormat = 'm/d/Y'    
    String language = 'en'
    String activeStartTime = '09:00'
    String activeEndTime = '19:00'
    String intervalSlot = '30'
    String startDay = '1'
    boolean createByDblclick = false
    boolean hideInactiveRow = false
    boolean singleDay = false
    boolean readOnly = false
    int initialView = 1

    Date creationDate = new Date()
    Date updateDate = new Date()

    // GORM Events
    def beforeInsert = {
        creationDate = new Date()
        updateDate = new Date()
    }
    def beforeUpdate = {
        updateDate = new Date()
    }

    static constraints = {
        author(blank: false)
        hourFormat(blank: false)
        dayFormat(blank: false)
        weekFormat(blank: false)
        monthFormat(blank: false)
        fromtoFormat(blank: false)        
        language(blank: false)
        activeStartTime(blank: false)
        activeEndTime(blank: false)
        intervalSlot(blank: false)
    }
}
