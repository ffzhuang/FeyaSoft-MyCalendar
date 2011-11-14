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
Ext.ns("Ext.ux.calendar");

Ext.ux.calendar.CONST = {
    /*
     * The version number of myCalendar
     */
    VERSION:'2.1.2',
    /*
     *true to show the language submenu in myCalendar, or not
     *
     */
    SHOW_LANGUAGE_MENU:true,

    BLANK_IMAGE_URL:'/myCalendar/js/extjs/resources/images/default/s.gif',
    /*
     *define the main path of myCalendar
     */
    MAIN_PATH:'/myCalendar/js/feyaSoft/home/program/calendar/',
    /*
     *define the multi-language path of myCalendar
     */
    CALENDAR_LANGUAGE_PATH:'/myCalendar/js/feyaSoft/home/program/calendar/multi-language/',
    /*
     *define the multi-language path of EXT
     */
    EXT_LANGUAGE_PATH:'/myCalendar/js/extjs/src/locale/',
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

    loadEventURL:'fakeData/listEvent.json',

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

    initialLoadURL:'fakeData/initLoad.json',

    listUserURL:'calendar/queryUser'
};