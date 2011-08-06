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
class CalendarEventUIModel {
	String subject
    String description
    String startTime
    String endTime
    String id
    String calendarId
    String color
    String ymd
    String eymd
    String alertFlag
    int alertEarlyTime
    String repeatType        
    boolean locked  // true or false - this is for locking events.
}

