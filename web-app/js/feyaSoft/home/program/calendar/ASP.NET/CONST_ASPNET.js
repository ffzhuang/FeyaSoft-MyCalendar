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
     *true to show the language submenu in myCalendar, or not
     */
    SHOW_LANGUAGE_MENU:true,
    
    BLANK_IMAGE_URL:'../../extjs/resources/images/default/s.gif',
    /*
     *define the main path of myCalendar
     */
    MAIN_PATH:'',
    /*
     *define the multi-language path of myCalendar
     */
    CALENDAR_LANGUAGE_PATH:'multi-language/',
    /*
     *define the multi-language path of EXT
     */
    EXT_LANGUAGE_PATH:'../../extjs/src/locale/',
    /*
     * define the some url here for datasource
     */
    searchURL:'/Takvim.ashx?action=search',

    showAllCalendarURL:'/Takvim.ashx?action=showAllCalendar',

    showOnlyCalendarURL:'/Takvim.ashx?action=showOnlyCalendar',

    createUpdateCalendarURL:'/Takvim.ashx?action=createUpdateCalendar',

    deleteEventsByCalendarURL:'/Takvim.ashx?action=deleteEventsByCalendar',

    deleteCalendarURL:'/Takvim.ashx?action=deleteCalendar',

    loadCalendarURL:'/Takvim.ashx?action=loadCalendar',

    loadEventURL:'/Takvim.ashx?action=loadEvent',

    loadRepeatEventURL:'/Takvim.ashx?action=loadRepeatEvent',

    createEventURL:'/Takvim.ashx?action=createEvent',

    updateEventURL:'/Takvim.ashx?action=updateEvent',

    deleteEventURL:'/Takvim.ashx?action=deleteEvent',

    deleteRepeatEventURL:'/Takvim.ashx?action=deleteRepeatEvent',

    changeDayURL:'/Takvim.ashx?action=changeDay',

    deleteDayURL:'/Takvim.ashx?action=deleteDay',

    loadSettingURL:'/Takvim.ashx?action=loadSetting',

    updateSettingURL:'/Takvim.ashx?action=updateSetting',

    createUpdateRepeatEventURL:'/Takvim.ashx?action=createUpdateRepeatEvent',

    initialLoadURL:'/Takvim.ashx?action=initialLoad'
};