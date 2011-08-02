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
    VERSION:'2.5.0',
    /*
     *true to show the language submenu in myCalendar, or not
     *
     */
    SHOW_LANGUAGE_MENU:true,
    
     BLANK_IMAGE_URL:'js/extjs4/examples/sandbox/images/s.gif',
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
    EXT_LANGUAGE_PATH:'js/extjs4/locale/',
    /*
     * define the some url here for datasource
     */
    searchURL:'calendarEvent/search',

    showAllCalendarURL:'calendarType/showAll',

    showOnlyCalendarURL:'calendarType/showOnly',

    createUpdateCalendarURL:'calendarType/createUpdate',

    deleteEventsByCalendarURL:'calendarEvent/deleteByCalendar',

    deleteCalendarURL:'calendarType/delete',

    loadCalendarURL:'calendarType/list',  

    loadEventURL:'calendarEvent/list',

    loadRepeatEventURL:'calendarEvent/loadRepeatEvents',

    createEventURL:'calendarEvent/createEditEvent',

    updateEventURL:'calendarEvent/createEditEvent',

    deleteEventURL:'calendarEvent/deleteEvent',

    deleteRepeatEventURL:'calendarEvent/deleteRepeatEvent',

    changeDayURL:'calendarEvent/updateDayEvents',

    deleteDayURL:'calendarEvent/deleteDayEvents',

    loadSettingURL:'calendarSetting/list',

    updateSettingURL:'calendarSetting/update',

    createUpdateRepeatEventURL:'calendarEvent/createUpdateRepeatEvent',

    initialLoadURL:'calendar/load',

    listUserURL:'calendar/queryUser'
};