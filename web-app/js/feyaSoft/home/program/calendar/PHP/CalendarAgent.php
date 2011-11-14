<?php

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
class CalendarAgent {

    public $dbType = "mysql";
    public $dbUser = "root";
    public $dbHost = "localhost";
    public $dbPwd = "123";
    public $dbName = "feyacalendar";
    public $dbPrefix = '';
    public $DOCUMENT_ROOT = "";
    public $handle = NULL;

    /**
     * Connect db and save the document root of the current web server
     * @param   string  $host   host of mysql
     * @param   string  $user   username of mysql
     * @param   string  $passwd password of mysql
     * @param   string  $name   the database's name you want connect
     * @return void
     */
    public function __construct($host="", $user="", $passwd="", $name="") {
        date_default_timezone_set('PRC');
        $this->DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
        $this->_connect($host, $user, $passwd, $name);
    }

    /**
     * Connect db
     * @param   string  $host   host of mysql
     * @param   string  $user   username of mysql
     * @param   string  $passwd password of mysql
     * @param   string  $name   the database's name you want connect
     * @return void
     */
    private function _connect($host="", $user="", $passwd="", $name="") {
        if ($host == "")
            $host = $this->dbHost;
        if ($user == "")
            $user = $this->dbUser;
        if ($passwd == "")
            $passwd = $this->dbPwd;
        if ($name == "")
            $name = $this->dbName;

        $this->dbHost = $host;
        $this->dbUser = $user;
        $this->dbPwd = $passwd;
        $this->dbName = $name;

        $this->handle = mysql_connect($this->dbHost, $this->dbUser, $this->dbPwd) or die("Could not connect");
        mysql_select_db($this->dbName) or die("Could not select database");
        return $this->handle;
    }

    public function setDbPrefix($prefix) {
        $this->dbPrefix = $prefix;
    }

    public function showAllCalendar($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $now = date('Y-m-d H:i:s');
        $userId = $params['userId'];
        if ($userId) {
            $query = "UPDATE " . $this->dbPrefix . "calendar_type SET hide = 0, update_date = '" . $now . "' WHERE userId = " . $userId;
            $rs = mysql_query($query);
            if ($rs) {
                $backStr = "{'success':'true'}";
                return $this->_wrapCallback($backStr, $callback);
            } else {
                return $this->_wrapCallback("{'success':'false'}", $callback);
            }
        }
    }

    public function showOnlyCalendar($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $now = date('Y-m-d H:i:s');
        $id = $params['id'];
        if ($id) {
            $query = "UPDATE " . $this->dbPrefix . "calendar_type SET hide = 1, update_date = '" . $now . "' WHERE id != " . $id;
            $rs = mysql_query($query);
            $query = "UPDATE " . $this->dbPrefix . "calendar_type SET hide = 0, update_date = '" . $now . "' WHERE id = " . $id;
            $rs = mysql_query($query);
            if ($rs) {
                $backStr = "{'success':'true', 'id':" . $id . "}";
                return $this->_wrapCallback($backStr, $callback);
            } else {
                return $this->_wrapCallback("{'success':'false'}", $callback);
            }
        }
    }

    public function createUpdateCalendar($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $now = date('Y-m-d H:i:s');
        $id = $params['id'];
        $flag = 0;
        if ("true" == $params['hide']) {
            $flag = 1;
        }
        if ($id) {
            $query = "UPDATE " . $this->dbPrefix . "calendar_type SET userId = " . $params['userId'] . ", color = '" . $params['color'] . "', description = '" . $params['description'] . "', "
                    . "hide = " . $flag . ", name = '" . $params['name'] . "', update_date = '" . $now . "' "
                    . "WHERE id = " . $id;
            $rs = mysql_query($query);
            $bid = $id;
        } else {
            $query = "INSERT INTO " . $this->dbPrefix . "calendar_type (userId, color, creation_date, description, hide, name, update_date) "
                    . "VALUES (" . $params['userId'] . ", '" . $params['color'] . "', '" . $now . "', '" . $params['description'] . "', " . $flag . ", '" . $params['name'] . "', '" . $now . "')";
            $rs = mysql_query($query);
            $bid = mysql_insert_id();
        }
        if ($rs) {
            $backStr = "{'success':'true', 'id':" . $bid . "}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function deleteEventsByCalendar($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $query = "DELETE FROM " . $this->dbPrefix . "calendar_event WHERE calendarId = " . $params['calendarId'];
        $rs = mysql_query($query);
        if ($rs) {
            $backStr = "{'success':'true'}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function deleteCalendar($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $query = "DELETE FROM " . $this->dbPrefix . "calendar_type WHERE id = " . $params['id'];
        $rs = mysql_query($query);
        $query = "DELETE FROM " . $this->dbPrefix . "calendar_event WHERE calendarId = " . $params['id'];
        $rs = mysql_query($query);
        if ($rs) {
            $backStr = "{'success':'true'}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    private function _getCalendar($params) {
        $userId = $params['userId'];
        $query = "SELECT * FROM " . $this->dbPrefix . "calendar_type WHERE userId = '" . $userId . "'";
        $rs = mysql_query($query);
        $data = array();
        if (0 == mysql_num_rows($rs)) {
            $query = "SELECT * FROM user WHERE id = " . $userId;
            $rs = mysql_query($query);
            $row = mysql_fetch_object($rs);
            $username = $row->{'username'};
            $now = date('Y-m-d H:i:s');
            $query = "INSERT INTO " . $this->dbPrefix . "calendar_type (userId, name, color, creation_date, update_date)"
                    . "VALUES (" . $userId . ", '" . $username . "', 'blue', '" . $now . "', '" . $now . "')";
            $rs = mysql_query($query);
            $query = "SELECT * FROM " . $this->dbPrefix . "calendar_type WHERE userId = '" . $userId . "'";
            $rs = mysql_query($query);
        }
        while ($obj = mysql_fetch_object($rs)) {
            if (1 == $obj->{'hide'}) {
                $obj->{'hide'} = true;
            } else {
                $obj->{'hide'} = false;
            }
            $data[] = $obj;
        }
        return $data;
    }

    public function loadCalendar($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $data = $this->_getCalendar($params);
        $arr = array();
        $arr['total'] = count($data);
        $arr['data'] = $data;
        return $this->_backJson($arr, $callback);
    }

    public function loadEvent($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $userId = $params['userId'];
        $query = "SELECT CE.*, CT.color FROM " . $this->dbPrefix . "calendar_event AS CE, " . $this->dbPrefix . "calendar_type AS CT "
                . "WHERE CT.id = CE.calendarId "
                . "AND CE.userId = " . $userId . " "
                . "AND (CE.startTime >= '" . $params['startDay'] . " 00:00' OR CE.endTime <= '" . $params['endDay'] . " 23:59' "
                . "OR (CE.startTime < '" . $params['startDay'] . " 00:00' AND CE.endTime > '" . $params['endDay'] . " 23:59'))"
                . "AND (CE.repeatType = 'no' OR CE.repeatType = 'exception') "
                . "ORDER BY CE.startTime, CE.endTime DESC";
        $rs = mysql_query($query);
        $data = array();
        if (0 < mysql_num_rows($rs)) {
            while ($obj = mysql_fetch_object($rs)) {
                if (1 == $obj->{'locked'}) {
                    $obj->{'locked'} = true;
                } else {
                    $obj->{'locked'} = false;
                }
                $pies = explode(' ', $obj->{'startTime'});
                $obj->{'ymd'} = $pies[0];
                $obj->{'startTime'} = $pies[1];
                $pies = explode(' ', $obj->{'endTime'});
                $obj->{'eymd'} = $pies[0];
                $obj->{'endTime'} = $pies[1];
                $obj->{'alertFlag'} = $this->_getEventReminders($obj->{'id'});
                $data[] = $obj;
            }
        }
        $arr = array();
        $arr['total'] = count($data);
        $arr['data'] = $data;
        return $this->_backJson($arr, $callback);
    }

    public function createEvent($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $now = date('Y-m-d H:i:s');
        $locked = 0;
        if ("true" == $params['locked']) {
            $locked = 1;
        }
        $query = "INSERT INTO " . $this->dbPrefix . "calendar_event (userId, calendarId, creation_date, startTime, endTime, description, subject, update_date, locked, repeatType) "
                . "VALUES (" . $params['userId'] . ", " . $params['calendarId'] . ", '" . $now .
                "', '" . $params['startDay'] . " " . $params['startHMTime'] . "', '" . $params['endDay'] . " " . $params['endHMTime']
                . "', '" . $params['description'] . "', '" . $params['subject'] . "', '" . $now . "', " . $locked . ", '" . $params['repeatType'] . "')";
        $rs = mysql_query($query);
        if ($rs) {
            $bid = mysql_insert_id();
            $alertFlag = $params['alertFlag'];
            if (!is_null($alertFlag)) {
                $info;
                $alertFlag = stripslashes($alertFlag);
                $alertJson = json_decode($alertFlag, true);
                try {
                    for ($i = 0, $len = count($alertJson); $i < $len; $i++) {
                        $alertObj = $alertJson[$i];
                        $rid = $this->_createEventReminder($bid, $alertObj['type'], $alertObj['early'], $alertObj['unit']);
                        $eventReminder = $this->_getReminderWithEvent($rid);
                        $info = $this->_checkEmailReminder($eventReminder, true);
                    }
                } catch (Exception $e) {

                }
            }
            $backStr = "{'success':'true', 'id':" . $bid . ", 'info':'" . $info . "'}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function updateEvent($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $now = date('Y-m-d H:i:s');
        $alertFlag = 0;
        if ("true" == $params['alertFlag']) {
            $alertFlag = 1;
        }
        $locked = 0;
        if ("true" == $params['locked']) {
            $locked = 1;
        }
        $query = "UPDATE " . $this->dbPrefix . "calendar_event SET calendarId = " . $params['calendarId'] . ", description = '" . $params['description']
                . "', startTime = '" . $params['startDay'] . " " . $params['startHMTime'] . "', endTime = '" . $params['endDay'] . " " . $params['endHMTime'] . "', "
                . "locked = " . $locked . ", subject = '" . $params['subject'] . "', update_date = '" . $now . "', repeatType = '" . $params['repeatType'] . "' "
                . "WHERE id = " . $params['id'];
        $rs = mysql_query($query);
        if ($rs) {
            $info;
            $bid = $params['id'];
            $alertFlag = $params['alertFlag'];
            if (!is_null($alertFlag)) {
                $this->_deleteEventReminder($bid);
                $alertFlag = stripslashes($alertFlag);
                $alertJson = json_decode($alertFlag, true);
                try {
                    for ($i = 0, $len = count($alertJson); $i < $len; $i++) {
                        $alertObj = $alertJson[$i];
                        $rid = $this->_createEventReminder($bid, $alertObj['type'], $alertObj['early'], $alertObj['unit']);
                        $eventReminder = $this->_getReminderWithEvent($rid);
                        $info = $this->_checkEmailReminder($eventReminder, true);
                    }
                } catch (Exception $e) {

                }
            }
            $backStr = "{'success':'true', 'id':" . $bid . ", 'info':'" . $info . "'}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function deleteEvent($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $id = $params['id'];
        $query = "DELETE FROM " . $this->dbPrefix . "calendar_event WHERE id = " . $id;
        $rs = mysql_query($query);
        if ($rs) {
            $this->_deleteEventReminder($id);
            $backStr = "{'success':'true', 'id':" . $id . "}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function changeDay($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $keep = $params['keep'];
        $backids;
        $now = date('Y-m-d H:i:s');
        $query = "SELECT CE.* FROM " . $this->dbPrefix . "calendar_event AS CE, " . $this->dbPrefix . "calendar_type AS CT WHERE CE.startTime >= '" . $params['dragDay'] . " 00:00' "
                . "AND CE.endTime <= '" . $params['dragDay'] . " 23:59' "
                . "AND (CE.repeatType = 'no' OR CE.repeatType = 'exception') "
                . "AND CT.id = CE.calendarId AND (CT.hide = 0 OR CT.hide IS NULL) ";
        $rs = mysql_query($query);
        while ($obj = mysql_fetch_object($rs)) {
            $pies = explode(' ', $obj->{'startTime'});
            $startTime = $params['dropDay'] . ' ' . $pies[1];
            $pies = explode(' ', $obj->{'endTime'});
            $endTime = $params['dropDay'] . ' ' . $pies[1];
            $oid = $obj->{'id'};
            if ("true" == $keep) {
                $query = "INSERT INTO " . $this->dbPrefix . "calendar_event (userId, calendarId, creation_date, startTime, endTime, description, locked, subject, update_date, repeatType) "
                        . "VALUES (" . $obj->{'userId'} . ", " . $obj->{'calendarId'} . ", '" . $now . "', '" . $startTime . "', '" . $endTime . "', '" . $obj->{'description'}
                        . "', " . $obj->{'locked'} . ", '" . $obj->{'subject'} . "', '" . $now . "', '" . $obj->{'repeatType'} . "')";
                mysql_query($query);
                $backids = new stdClass();
                $nid = mysql_insert_id();
                $backids->{$oid} = $nid;
                $this->_copyEventReminders($nid, $oid);
            } else {
                $query = "UPDATE " . $this->dbPrefix . "calendar_event SET startTime = '" . $startTime . "', endTime = '" . $endTime . "' WHERE id = " . $oid;
                mysql_query($query);
            }
        }

        if ($rs) {
            $backStr = "{'success':'true', 'backids':" . json_encode($backids) . "}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function deleteDay($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $select = "(SELECT " . $this->dbPrefix . "calendar_event.id FROM " . $this->dbPrefix . "calendar_event, " . $this->dbPrefix . "calendar_type WHERE " . $this->dbPrefix . "calendar_event.startTime >= '" . $params['day'] . " 00:00' AND " . $this->dbPrefix . "calendar_event.endTime <= '" . $params['day']
                . " 24:00' AND (" . $this->dbPrefix . "calendar_event.repeatType = 'no' OR " . $this->dbPrefix . "calendar_event.repeatType = 'exception') "
                . "AND " . $this->dbPrefix . "calendar_event.calendarId = " . $this->dbPrefix . "calendar_type.id AND ("
                . $this->dbPrefix . "calendar_type.hide = 0 OR " . $this->dbPrefix . "calendar_type.hide IS NULL))";
        $delsql = "DELETE FROM " . $this->dbPrefix . "calendar_event_reminder WHERE eventId IN " . $select;
        $rs = mysql_query($delsql);
        $query = "DELETE FROM " . $this->dbPrefix . "calendar_event WHERE EXISTS (SELECT id FROM " . $this->dbPrefix . "calendar_type WHERE " . $this->dbPrefix . "calendar_event.startTime >= '" . $params['day'] . " 00:00' AND " . $this->dbPrefix . "calendar_event.endTime <= '" . $params['day']
                . " 24:00' AND (" . $this->dbPrefix . "calendar_event.repeatType = 'no' OR " . $this->dbPrefix . "calendar_event.repeatType = 'exception') "
                . "AND " . $this->dbPrefix . "calendar_event.calendarId = " . $this->dbPrefix . "calendar_type.id AND ("
                . $this->dbPrefix . "calendar_type.hide = 0 OR " . $this->dbPrefix . "calendar_type.hide IS NULL))";
        $rs = mysql_query($query);
        if ($rs) {
            $backStr = "{'success':'true'}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function search($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $start = isset($params['start']) ? $params['start'] : null; // Undefined index: callback
        $limit = isset($params['limit']) ? $params['limit'] : null; // Undefined index: callback
        $text = $params['text'];
        if (null == $text)
            $text = "";
        $like = "";
        if ("" != $text) {
            $like = " AND (CE.subject LIKE '%" . $text . "%' OR CE.description LIKE '%" . $text . "%')";
        }
        $page = "";
        if (null != $start && null != $limit) {
            $page = " LIMIT " . $start . "," . $limit;
        }
        $from = " FROM " . $this->dbPrefix . "calendar_event AS CE, " . $this->dbPrefix . "calendar_type AS CT ";
        $where = " WHERE CE.userId = " . $params['userId'] . " "
                . $like . " AND CE.calendarId = CT.id";
        $query = "SELECT CE.*, CT.color " . $from . $where . $page;
        $rs = mysql_query($query);
        $data = array();
        $total = 0;
        if ($rs) {
            if (0 < mysql_num_rows($rs)) {
                $totalrs = mysql_query("SELECT COUNT(*) " . $from . $where);
                if ($totalrs) {
                    $total = mysql_result($totalrs, 0, 0);
                }
                while ($obj = mysql_fetch_object($rs)) {
                    if (1 == $obj->{'locked'}) {
                        $obj->{'locked'} = true;
                    } else {
                        $obj->{'locked'} = false;
                    }
                    $pies = explode(' ', $obj->{'startTime'});
                    $obj->{'ymd'} = $pies[0];
                    $obj->{'startTime'} = $pies[1];
                    $pies = explode(' ', $obj->{'endTime'});
                    $obj->{'eymd'} = $pies[0];
                    $obj->{'endTime'} = $pies[1];
                    $obj->{'alertFlag'} = $this->_getEventReminders($obj->{'id'});
                    $data[] = $obj;
                }
            }
        }
        $arr = array();
        $arr['total'] = $total;
        $arr['data'] = $data;
        return $this->_backJson($arr, $callback);
    }

    private function _getSetting($params) {
        $userId = $params['userId'];
        $query = "SELECT * FROM " . $this->dbPrefix . "calendar_setting WHERE userId = '" . $userId . "'";
        $rs = mysql_query($query);
        $data = array();
        if (0 == mysql_num_rows($rs)) {
            $query = "SELECT * FROM user WHERE id = " . $userId;
            $rs = mysql_query($query);
            $row = mysql_fetch_object($rs);
            $username = $row->{'username'};
            $now = date('Y-m-d H:i:s');
            $query = "INSERT INTO " . $this->dbPrefix . "calendar_setting (userId, hourFormat, dayFormat, weekFormat, monthFormat, fromtoFormat, language, activeStartTime, activeEndTime, intervalSlot, createByDblclick, hideInactiveRow, singleDay, startDay, readOnly, initialView)"
                    . "VALUES (" . $userId . ", '24', 'l M d Y', 'm/d(D)', 'm/d', 'm/d/Y', 'en_US', '00:00', '24:00', '30', 0, 0, 0, 1, 0, 1)";
            $rs = mysql_query($query);
            $query = "SELECT * FROM " . $this->dbPrefix . "calendar_setting WHERE userId = '" . $userId . "'";
            $rs = mysql_query($query);
        }
        while ($obj = mysql_fetch_object($rs)) {
            if (1 == $obj->{'createByDblclick'}) {
                $obj->{'createByDblclick'} = true;
            } else {
                $obj->{'createByDblclick'} = false;
            }
            if (1 == $obj->{'hideInactiveRow'}) {
                $obj->{'hideInactiveRow'} = true;
            } else {
                $obj->{'hideInactiveRow'} = false;
            }
            if (1 == $obj->{'singleDay'}) {
                $obj->{'singleDay'} = true;
            } else {
                $obj->{'singleDay'} = false;
            }
            if (1 == $obj->{'readOnly'}) {
                $obj->{'readOnly'} = true;
            } else {
                $obj->{'readOnly'} = false;
            }
            $data[] = $obj;
        }
        return $data;
    }

    public function loadSetting($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $data = $this->_getSetting($params);
        $arr = array();
        $arr['total'] = count($data);
        $arr['data'] = $data;
        return $this->_backJson($arr, $callback);
    }

    public function updateSetting($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback

        $arr = array();
        if (!is_null($params['hourFormat'])) { // Undefinex index
            array_push($arr, "hourFormat = '" . $params['hourFormat'] . "' ");
        }
        if (!is_null($params['dayFormat'])) { // Undefinex index
            array_push($arr, "dayFormat = '" . $params['dayFormat'] . "' ");
        }
        if (!is_null($params['weekFormat'])) { // Undefinex index
            array_push($arr, "weekFormat = '" . $params['weekFormat'] . "' ");
        }
        if (!is_null($params['monthFormat'])) { // Undefinex index
            array_push($arr, "monthFormat = '" . $params['monthFormat'] . "' ");
        }
        if (!is_null($params['fromtoFormat'])) { // Undefinex index
            array_push($arr, "fromtoFormat = '" . $params['fromtoFormat'] . "' ");
        }
        if (!is_null($params['language'])) { // Undefinex index
            array_push($arr, "language = '" . $params['language'] . "' ");
        }
        if (!is_null($params['activeStartTime'])) { // Undefinex index
            array_push($arr, "activeStartTime = '" . $params['activeStartTime'] . "' ");
        }
        if (!is_null($params['activeEndTime'])) { // Undefinex index
            array_push($arr, 'activeEndTime = "' . $params['activeEndTime'] . '" ');
        }
        if (!is_null($params['intervalSlot'])) { // Undefinex index
            array_push($arr, "intervalSlot = " . $params['intervalSlot'] . " ");
        }
        if (!is_null($params['startDay']) || '0' == $params['startDay']) { // Undefinex index
            array_push($arr, "startDay = '" . $params['startDay'] . "' ");
        }
        if (!is_null($params['createByDblclick'])) { // Undefinex index
            $createByDblclick = 0;
            if ("true" == $params['createByDblclick']) {
                $createByDblclick = 1;
            }
            array_push($arr, "createByDblclick = " . $createByDblclick . " ");
        }
        if (!is_null($params['hideInactiveRow'])) { // Undefinex index
            $hideInactiveRow = 0;
            if ("true" == $params['hideInactiveRow']) {
                $hideInactiveRow = 1;
            }
            array_push($arr, "hideInactiveRow = " . $hideInactiveRow . " ");
        }
        if (!is_null($params['readOnly'])) { // Undefinex index
            $readOnly = 0;
            if ("true" == $params['readOnly']) {
                $readOnly = 1;
            }
            array_push($arr, "readOnly = " . $readOnly . " ");
        }
        if (!is_null($params['singleDay'])) { // Undefinex index
            $singleDay = 0;
            if ("true" == $params['singleDay']) {
                $singleDay = 1;
            }
            array_push($arr, "singleDay = " . $singleDay . " ");
        }
        if (!is_null($params['initialView'])) { // Undefinex index
            array_push($arr, "initialView = " . $params['initialView'] . " ");
        }

        $query = "UPDATE " . $this->dbPrefix . "calendar_setting SET " . $arr[0];

        $len = count($arr);

        for ($i = 1; $i < $len; $i++) {
            $query = $query . ', ' . $arr[$i];
        }
        $query = $query . "WHERE userId = " . $params['userId'];

        $rs = mysql_query($query);
        if ($rs) {
            $backStr = "{'success':'true'}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function getRepeatEvent($params) {
        $userId = $params['userId'];
        $query = "SELECT CE.*, CT.color FROM " . $this->dbPrefix . "calendar_event AS CE, " . $this->dbPrefix . "calendar_type AS CT "
                . "WHERE CT.id = CE.calendarId "
                . "AND CE.userId = " . $userId . " "
                . "AND CE.repeatType != 'no' AND CE.repeatType != 'exception'";
        $rs = mysql_query($query);
        $data = array();
        if (0 < mysql_num_rows($rs)) {
            while ($obj = mysql_fetch_object($rs)) {
                if (1 == $obj->{'locked'}) {
                    $obj->{'locked'} = true;
                } else {
                    $obj->{'locked'} = false;
                }
                $pies = explode(' ', $obj->{'startTime'});
                $obj->{'ymd'} = $pies[0];
                $obj->{'startTime'} = $pies[1];
                $pies = explode(' ', $obj->{'endTime'});
                $obj->{'eymd'} = $pies[0];
                $obj->{'endTime'} = $pies[1];
                $obj->{'alertFlag'} = $this->_getEventReminders($obj->{'id'});
                $data[] = $obj;
            }
        }
        return $data;
    }

    public function loadRepeatEvent($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $data = $this->getRepeatEvent($params);
        $arr = array();
        $arr['total'] = count($data);
        $arr['data'] = $data;
        return $this->_backJson($arr, $callback);
    }

    public function createUpdateRepeatEvent($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $now = date('Y-m-d H:i:s');
        $locked = 0;
        if ("true" == $params['locked']) {
            $locked = 1;
        }
        $id = $params['id'];
        $insertSQL = "INSERT INTO " . $this->dbPrefix . "calendar_event (userId, calendarId, creation_date, startTime, endTime, description, subject, update_date, locked, repeatType) "
                . "VALUES (" . $params['userId'] . ", " . $params['calendarId'] . ", '" . $now .
                "', '" . $params['startDay'] . " " . $params['startHMTime'] . "', '" . $params['endDay'] . " " . $params['endHMTime']
                . "', '" . $params['description'] . "', '" . $params['subject'] . "', '" . $now . "', " . $locked . ", '" . $params['repeatType'] . "')";
        if ($id) {
            $oflag = $this->_isRepeatEvent($params['oldRepeatType']);
            $flag = $this->_isRepeatEvent($params['repeatType']);
            if ($oflag && $flag) {
                $query = "UPDATE " . $this->dbPrefix . "calendar_event SET calendarId = " . $params['calendarId'] . ", description = '" . $params['description']
                        . "', startTime = '" . $params['startDay'] . " " . $params['startHMTime'] . "', endTime = '" . $params['endDay'] . " " . $params['endHMTime'] . "', "
                        . "locked = " . $locked . ", subject = '" . $params['subject'] . "', update_date = '" . $now . "', " . "repeatType = '" . $params['repeatType'] . "' "
                        . "WHERE id = " . $id;
                $rs = mysql_query($query);
                $this->_deleteEventReminder($id);
            } else if ($oflag) {
                if ("exception" == $params['repeatType']) {
                    $query = "UPDATE " . $this->dbPrefix . "calendar_event SET repeatType = '" . $params['oldRepeatType'] . "' "
                            . 'WHERE id = ' . $id;
                    $rs = mysql_query($query);
                } else {
                    $query = "DELETE FROM " . $this->dbPrefix . "calendar_event " . "WHERE id = " . $id;
                    $rs = mysql_query($query);
                    $this->_deleteEventReminder($id);
                }
                $rs = mysql_query($insertSQL);
                $id = mysql_insert_id();
            } else if ($flag) {
                $query = "DELETE FROM " . $this->dbPrefix . "calendar_event " . "WHERE id = " . $id;
                $rs = mysql_query($query);
                $this->_deleteEventReminder($id);
                $rs = mysql_query($insertSQL);
                $id = mysql_insert_id();
            }
        } else {
            $rs = mysql_query($insertSQL);
            $id = mysql_insert_id();
        }

        if ($rs) {
            $info;
            $alertFlag = $params['alertFlag'];
            if (!is_null($alertFlag)) {
                $alertFlag = stripslashes($alertFlag);
                $alertJson = json_decode($alertFlag, true);
                try {
                    for ($i = 0, $len = count($alertJson); $i < $len; $i++) {
                        $alertObj = $alertJson[$i];
                        $rid = $this->_createEventReminder($id, $alertObj['type'], $alertObj['early'], $alertObj['unit']);
                        $eventReminder = $this->_getReminderWithEvent($rid);
                        $info = $this->_checkEmailReminder($eventReminder, true);
                    }
                } catch (Exception $e) {

                }
            }
            $this->_sendReminderEmail();
            $backStr = "{'success':'true', 'id':" . $id . ", 'info':'" . $info . "'}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function deleteRepeatEvent($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $id = $params['id'];
        if ($params['makeException']) {
            $query = "UPDATE " . $this->dbPrefix . "calendar_event SET repeatType = '" . $params['repeatType'] . "' "
                    . "WHERE id = " . $id;
            $rs = mysql_query($query);
        } else {
            $query = "DELETE FROM " . $this->dbPrefix . "calendar_event WHERE id = " . $id;
            $this->_deleteEventReminder($id);
        }
        $rs = mysql_query($query);
        if ($rs) {
            $backStr = "{'success':'true', 'id':" . $id . "}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    public function initialLoad($params) {
        $callback = isset($params['callback']) ? $params['callback'] : null; // Undefined index: callback
        $cs = $this->_getSetting($params);
        $owned = $this->_getCalendar($params);
        $re = $this->getRepeatEvent($params);
        $backObj = new stdClass();
        $backObj->{'cs'} = $cs;
        $backObj->{'owned'} = $owned;
        $backObj->{'shared'} = array();
        $backObj->{'re'} = $re;
        return $this->_wrapCallback(json_encode($backObj), $callback);
    }

    private function _isRepeatEvent($repeatType) {
        if ('no' == $repeatType || 'exception' == $repeatType) {
            return false;
        }
        return true;
    }

    private function _backJson($arr, $callback = null) {
        $total = $arr['total'];
        $backJson = json_encode($arr['data']);
        $backJson = "{'success':'true','total':'" . $total . "','results':" . $backJson . "}";
        return $this->_wrapCallback($backJson, $callback);
    }

    private function _wrapCallback($str, $callback) {
        if (null != $callback) {
            return $callback . '(' . $str . ');';
        }
        return $str;
    }

    private function _deleteEventReminder($eventId) {
        $query = "DELETE FROM " . $this->dbPrefix . "calendar_event_reminder WHERE eventId = " . $eventId;
        mysql_query($query);
    }

    private function _createEventReminder($eventId, $alertType, $alertEarly, $timeUnit) {
        $query = "INSERT INTO " . $this->dbPrefix . "calendar_event_reminder (eventId, type, early, unit, alerted) "
                . "VALUES (" . $eventId . ", '" . $alertType . "', " . $alertEarly . ", '" . $timeUnit . "', 0)";
        $rs = mysql_query($query);
        if ($rs) {
            $bid = mysql_insert_id();
            return $bid;
        } else {
            return false;
        }
    }

    private function _getEventReminders($eventId) {
        $query = "SELECT type, early, unit FROM " . $this->dbPrefix . "calendar_event_reminder WHERE eventId = " . $eventId;
        $rs = mysql_query($query);
        $arr = array();
        if (0 < mysql_num_rows($rs)) {
            while ($obj = mysql_fetch_object($rs)) {
                $arr[] = $obj;
            }
            return json_encode($arr);
        }
        return NULL;
    }

    private function _copyEventReminders($newId, $oldId) {
        $query = "SELECT * FROM " . $this->dbPrefix . "calendar_event_reminder WHERE eventId = " . $oldId;
        $rs = mysql_query($query);
        if (0 < mysql_num_rows($rs)) {
            while ($obj = mysql_fetch_object($rs)) {
                $this->_createEventReminder($nid, $obj->{'type'}, $obj->{'early'}, $obj->{'unit'});
            }
        }
    }

    private function _saveEventReminder($params) {
        $arr = array();
        if (!is_null($params['eventId'])) { // Undefinex index
            array_push($arr, 'eventId = ' . $params['eventId'] . ' ');
        }
        if (!is_null($params['type'])) { // Undefinex index
            array_push($arr, "type = '" . $params['type'] . "' ");
        }
        if (!is_null($params['early'])) { // Undefinex index
            array_push($arr, "early = " . $params['early'] . " ");
        }
        if (!is_null($params['unit'])) { // Undefinex index
            array_push($arr, "unit = '" . $params['unit'] . "' ");
        }
        if (!is_null($params['alerted'])) { // Undefinex index
            array_push($arr, "alerted = '" . $params['alerted'] . "' ");
        }

        $query = "UPDATE " . $this->dbPrefix . "calendar_event_reminder SET " . $arr[0];

        $len = count($arr);

        for ($i = 1; $i < $len; $i++) {
            $query = $query . ', ' . $arr[$i];
        }
        $query = $query . "WHERE id = " . $params['id'];

        $rs = mysql_query($query);
        if ($rs) {
            $backStr = "{'success':'true'}";
            return $this->_wrapCallback($backStr, $callback);
        } else {
            return $this->_wrapCallback("{'success':'false'}", $callback);
        }
    }

    private function _getReminderWithEvent($id) {
        $query = "SELECT * FROM " . $this->dbPrefix . "calendar_event, "
                . $this->dbPrefix . "calendar_event_reminder WHERE " . $this->dbPrefix . "calendar_event_reminder.id = " . $id . " AND "
                . $this->dbPrefix . "calendar_event_reminder.eventId = " . $this->dbPrefix . "calendar_event.id";
        $rs = mysql_query($query);
        if (0 < mysql_num_rows($rs)) {
            while ($obj = mysql_fetch_object($rs)) {
                return $obj;
            }
        }
        return null;
    }

    /*
     * NOTICE: To complete the email alert function, you need build a standalone thread
     * to call this function, for example, every 5 minutes
     */

    private function _sendReminderEmail() {
        $query = "SELECT * FROM " . $this->dbPrefix . "calendar_event, "
                . $this->dbPrefix . "calendar_event_reminder WHERE type = 'email' AND (alerted != 'forever' OR alerted IS NULL) AND "
                . $this->dbPrefix . "calendar_event_reminder.eventId = " . $this->dbPrefix . "calendar_event.id";
        $rs = mysql_query($query);
        if (0 < mysql_num_rows($rs)) {
            while ($obj = mysql_fetch_object($rs)) {
                $this->_checkEmailReminder($obj, false);
            }
        }
    }

    private function _checkEmailReminder($eventReminder, $checkAll) {
        $info;
        $repeatType = $eventReminder->{'repeatType'};
        $startTime = $eventReminder->{'startTime'};
        $endTime = $eventReminder->{'endTime'};
        $earlyTime = $eventReminder->{'early'};
        $alertType = $eventReminder->{'type'};
        $timeUnit = $eventReminder->{'unit'};
        $alerted = $eventReminder->{'alerted'};
        $nowTime = date("Y-m-d H:i:s");
        $nowday = date("Y-m-d");
        if ('hour' == $timeUnit) {
            $earlyTime = $earlyTime * 60;
        } else if ('day' == $timeUnit) {
            $earlyTime = $earlyTime * 60 * 24;
        } else if ('week' == $timeUnit) {
            $earlyTime = $earlyTime * 60 * 24 * 7;
        }
        if ('no' == $repeatType || 'exception' == $repeatType) {
            if (!is_null($alerted)) {
                if ($endTime >= $nowTime) {
                    $limitTime = date("Y-m-d H:i:s", mktime(date("H"), date("i") + $earlyTime, date("s"), date("m"), date("d"), date("Y")));
                    if ($startTime <= $limitTime) {
                        $info = $this->_sendEmail($eventReminder);
                    }
                }
                $this->_saveEventReminder(array('alerted' => 'forever', 'id' => $eventReminder->{'id'}));
            }
        } else if ($alerted != $nowday && 'forever' != $alerted) {
            $limitTime = date("Y-m-d H:i:s", mktime(date("H"), date("i") + $earlyTime, date("s"), date("m"), date("d"), date("Y")));
            $repeatJson = json_decode(stripslashes($repeatType), true);
            if (true == $checkAll) {
                $dspan = $repeatJson['dspan'];
                for ($i = $dspan; $i >= 0; $i--) {
                    $limitTime = date("Y-m-d H:i:s", mktime(date("H"), date("i") + $earlyTime, date("s"), date("m"), date("d") - $i, date("Y")));
                    $nowday = date("Y-m-d H:i:s", mktime(date("H"), date("i"), date("s"), date("m"), date("d") - $i, date("Y")));
                    $ret = $this->_checkEmailReminderOfRepeatEvent($earlyTime, $nowday, $limitTime, $repeatJson, $eventReminder);
                    if (!is_null($ret))
                        $info = $ret;
                }
            }else {
                $info = $this->_checkEmailReminderOfRepeatEvent($earlyTime, $nowday, $limitTime, $repeatJson, $eventReminder);
            }
        }
        return $info;
    }

    private function _checkEmailReminderOfRepeatEvent($earlyTime, $nowDay, $limitTime, $repeatJson, $eventReminder) {
        $startTime = $eventReminder->{'startTime'};
        $endTime = $eventReminder->{'endTime'};
        $dspan = $repeatJson['dspan'];
        $limitDay = date("Y-m-d", strtotime($limitTime));
        $beginDay = $repeatJson['beginDay'];
        $beginTime = $beginDay . " 00:00";
        $startHM = date("H:i", strtotime($startTime));
        $endHM = date("H:i", strtotime($endTime));
        if ($beginTime <= $limitTime) {
            $rtype = $repeatJson['rtype'];
            $endDay = $repeatJson['endDay'];
            $rtime = $repeatJson['rtime'];
            $intervalSlot = $repeatJson['intervalSlot'];
            $flag = true;
            if ('no' != $endDay) {
                $endTime = $endDay . ' ' . $endHM;
                if ($limitTime >= $endTime) {
                    $this->_saveEventReminder(array('alerted' => 'forever', 'id' => $eventReminder->{'id'}));
                    $flag = false;
                }
            }
            if ($flag) {
                $epts = json_decode(stripslashes($repeatJson['exceptions']), true);
                if (!is_null($epts)) {
                    if (!is_null($epts[limitDay])) {
                        $this->_saveEventReminder(array('alerted' => $nowday, 'id' => $eventReminder->{'id'}));
                        return;
                    }
                }
            }
            $offset;
            $match = false;
            $times;
            if ('week' == $rtype) {
                $bw = date("N", strtotime($beginTime));
                $lw = date("N", strtotime($limitTime));
                $offset = floor((strtotime($limitDay) - strtotime($beginDay)) / (3600 * 24));
                $offset = floor(($offset - $bw - $lw) / 7) + 1;
                $times = floor($offset / $intervalSlot);
                $rest = $offset % $intervalSlot;
                if (0 == $rest) {
                    $rday = $repeatJson['rday'];
                    $match = (!is_null($rday[$lw]));
                }
            } else if ('month' == $rtype) {
                $by = date("Y", strtotime($beginDay));
                $ly = date("Y", strtotime($limitDay));
                $bm = date("m", strtotime($beginDay));
                $lm = date("m", strtotime($limitDay));
                $offset = 12 * ($ly - $by) + ($lm - $bm);
                $times = floor($offset / $intervalSlot);
                $match = (0 == $offset % $intervalSlot);
                if ($match) {
                    $bd = date("d", strtotime($beginTime));
                    $ld = date("d", strtotime($limitTime));
                    $rby = $repeatJson['rby'];
                    if ('date' == $rby) {
                        $match = ($bd == $ld);
                    } else {
                        $bw = date("N", strtotime($beginTime));
                        $lw = date("N", strtotime($limitTime));
                        $bc = floor($bd / 7);
                        $lc = floor($ld / 7);
                        $match = ($bw == $lw && $bc == $lc);
                    }
                }
            } else if ('year' == $rtype) {
                $byear = date("Y", strtotime($beginTime));
                $lyear = date("Y", strtotime($limitTime));
                $bd = date("d", strtotime($beginTime));
                $ld = date("d", strtotime($limitTime));
                $offset = $lyear - $byear;
                $times = floor($offset / $intervalSlot);
                $match = (0 == $offset % $intervalSlot && $bd == $ld);
            } else {
                $offset = floor((strtotime($limitDay) - strtotime($beginDay)) / (3600 * 24));
                $times = floor($offset / $intervalSlot);
                $match = (0 == $offset % $intervalSlot);
            }
            if ($match) {
                if (!is_null($rtime)) {
                    $match = ($times < $rtime);
                }
            }
            if ($match) {
                $limitHM = date("H:i", strtotime($limitTime));
                if ($startHM <= $limitHM) {/* if start hour and minute is earlier than limit hour minute, it means we should send email to alert user */
                    // send email
                    $eventReminder->{'startTime'} = $nowDay + " " + startHM;
                    $nowTime = strtotime($nowDay);
                    $eventReminder->{'endTime'} = date("Y-m-d", mktime(0, 0, 0, date("m", $nowTime), date("d", $nowTime) + $dspan, date("Y", $nowTime))) + " " + endHM;
                    $this->_saveEventReminder(array('alerted' => $nowday, 'id' => $eventReminder->{'id'}));
                    return $this->_sendEmail($eventReminder);
                }
            } else {
                $this->_saveEventReminder(array('alerted' => $nowday, 'id' => $eventReminder->{'id'}));
            }
        }
    }

    /*
     * NOTICE: Here you need add your own code to send an email, all the information of event and event reminder is
     * saved in $eventReminder
     */
    private function _sendEmail($eventReminder) {
        return json_encode($eventReminder);
    }

}
