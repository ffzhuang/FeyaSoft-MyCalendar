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
Ext.ns("Ext.ux.calendar");

Ext.ux.calendar.CONST = {
    /*
     * The version number of myCalendar
     */
    VERSION:'2.5.2',
    /*
     *true to show the language submenu in myCalendar, or not
     */
    SHOW_LANGUAGE_MENU:true,
    
    /*
     *define the main path of myCalendar
     */
    MAIN_PATH:'js/feyaSoft/calendar/',
    /*
     *define the multi-language path of myCalendar
     */
    CALENDAR_LANGUAGE_PATH:'js/feyaSoft/calendar/multi-language/',
    /*
     *define the multi-language path of EXT
     */
    EXT_LANGUAGE_PATH:'js/extjs/locale/',
    /*
     * define the some url here for datasource
     */
    searchURL:'php/db-proxy.php?action=search',

    showAllCalendarURL:'php/db-proxy.php?action=showAllCalendar',

    showOnlyCalendarURL:'php/db-proxy.php?action=showOnlyCalendar',

    createUpdateCalendarURL:'php/db-proxy.php?action=createUpdateCalendar',

    deleteEventsByCalendarURL:'php/db-proxy.php?action=deleteEventsByCalendar',

    deleteCalendarURL:'php/db-proxy.php?action=deleteCalendar',

    loadCalendarURL:'php/db-proxy.php?action=loadCalendar',

    loadEventURL:'php/db-proxy.php?action=loadEvent',

    loadRepeatEventURL:'php/db-proxy.php?action=loadRepeatEvent',

    createEventURL:'php/db-proxy.php?action=createEvent',

    updateEventURL:'php/db-proxy.php?action=updateEvent',

    deleteEventURL:'php/db-proxy.php?action=deleteEvent',

    deleteRepeatEventURL:'php/db-proxy.php?action=deleteRepeatEvent',

    changeDayURL:'php/db-proxy.php?action=changeDay',

    deleteDayURL:'php/db-proxy.php?action=deleteDay',

    loadSettingURL:'php/db-proxy.php?action=loadSetting',

    updateSettingURL:'php/db-proxy.php?action=updateSetting',

    createUpdateRepeatEventURL:'php/db-proxy.php?action=createUpdateRepeatEvent',

    initialLoadURL:'php/db-proxy.php?action=initialLoad'
};