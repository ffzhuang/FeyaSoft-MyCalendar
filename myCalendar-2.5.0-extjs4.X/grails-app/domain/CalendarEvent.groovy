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
class CalendarEvent {
    
    static belongsTo = [User, CalendarType]

    User author
    CalendarType calendarType = null   
    String subject
    String description
    String repeatType
    Date startTime = new Date()
    Date endTime = new Date()
    Date creationDate = new Date()
    Date updateDate = new Date()
    boolean locked = false
    
    // GORM Events
    def beforeInsert = {
        creationDate = new Date()
        updateDate = new Date()
    }
    
    def beforeUpdate = {
        updateDate = new Date()
    }

    // this is one kind of validation
    static constraints = {
        subject(nullable:true)
        description(nullable:true)        
    }

    static mapping = {
        description type:"text"
        repeatType type:"text"
    }
}
