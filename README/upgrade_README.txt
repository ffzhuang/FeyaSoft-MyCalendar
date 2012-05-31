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

//////////////////////////////////////////////////////////////////////////////
To upgrade from myCalendar2.0.3 to myCalendar 2.0.5, you need know following:
//////////////////////////////////////////////////////////////////////////////

    new table calendar_event_reminder is added which is used to hold event
    reminder information.

    For PHP backend, if you want to complete the email alert function, you have to add 2 things by yourself:
    First, add a function which will send a email to user, see @line985 of CalendarAgent.php;
    Second, add a standalone thread run in backend, which check all the events with email alertFlag, find actived one and send
    out an email, see @line823 of CalendarAgent.php;

    In this version, we modified the alert part to let user add multi-reminders, if you want the alert part work as the old way,
    you just need change the "VERSION" in Ext.ux.calendar.CONST_XXX.js to '2.0.4' or lower version number.

    in calendarSetting table, you need insert this field:

    `initial_view` int(10) NOT NULL DEFAULT '1',
    update calendar_setting set initial_view = 1;


//////////////////////////////////////////////////////////////////////////////
To upgrade from myCalendar2.0.0 to myCalendar 2.0.3, you need know following:
//////////////////////////////////////////////////////////////////////////////

    in calendarSetting table, you need insert this field:

    `readOnly` tinyint(1) DEFAULT NULL,

    update calendarSetting set readOnly = 0;

//////////////////////////////////////////////////////////////////////////////
To upgrade from myCalendar1.1.0 to myCalendar 2.0, you need know following:
//////////////////////////////////////////////////////////////////////////////

1. Datebase table field upgrade:

1.1: please add 7 more fields in calendar_setting table,

      	`activeStartTime` varchar(255) NOT NULL,
  	`activeEndTime` varchar(255) NOT NULL,
	`createByDblclick` tinyint(1) NOT NULL,
  	`hideInactiveRow` tinyint(1) NOT NULL,
  	`singleDay` tinyint(1) NOT NULL,
  	`intervalSlot` int(255) NOT NULL DEFAULT '30',
	`startDay` varchar(255) NOT NULL DEFAULT '0'

and delete 'scroll_start_row field' in calendar_setting table;
	
1.2: please add those 2 fields in calendar_event table,

  	`repeatType` longtext NOT NULL,
  	`alertFlag` tinyint(1) NOT NULL,

see README/php/myCalendar2.0-tables for detail;

1.3: Update the data in the table:

    And you can run the following comments line to update table:

    update calendar_setting set active_start_time = '09:00',
                                active_end_time = '19:00',
                                interval_slot = '30',
                                create_by_dblclick = 0,
                                hide_inactive_row = 0,
                                single_day = 0;
    update calendar_setting set start_day = '1';
    alter table calendar_setting drop column scroll_start_row;
    update calendar_event set alert_flag = flag;
    update calendar_event set repeat_type='no';
    alter table calendar_event drop column flag;
    commit;

2: we merge DataSoure_PHP.js with DataSource.js,
   and put all request URL in common/CONST_XXX.js, you can change them as you need.

3: 2.0.0 version may have some issues under Extjs2.2, we did not do enough test at this moment.

4: 2.0.1 version support Extjs 3.1.0 and Extjs 3.0.0

5: 2.0.2 version fixed several bugs and add Test.js for render panel

6: 2.0.3 version fixed several bugs and add a new setting option called 'readOnly'
   which can make myCalendar read-only.

