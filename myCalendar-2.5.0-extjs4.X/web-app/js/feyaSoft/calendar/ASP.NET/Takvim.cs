using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
/*
 * Asp.Net Version of this script made by 
 * Engin Ates
 * http://www.enginates.com
 * http://www.lizgecity.com
 * */
/// <summary>
/// Summary description for Takvim
/// </summary>
public class Takvimx:CalendarAgentx
{
    public Takvimx()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}

public class Eventx{
    String id;
    String authorId;
    String calendarId;
    String color;
    String startTime;
    String endTime;
    String subject;
    String description;
    String alertFlag;
    String locked;
    String repeatType;
}
public class CalendarAgentx
{
    String dbType = "mysql";
    String dbUser = "root";
    String dbHost = "localhost";
    String dbPwd = "";
    String dbName = "feyacalendar";
    String DOCUMENT_ROOT = "";
    String hanlde = "";
    /*
	 *@for constructor, connect db and save the document root of the current web server
	 *@return void
	 *@param host:host of mysql, user: username of mysql, passwd: password of mysql, name: the db you want connect
	 */
    public HttpContext paramsx = null;
    public MySqlCommand cmd = null;
    public MySqlConnection con = null;
    
    public Int64 userId = 1;
    public void CalendarAgent(String host, String user, String passwd, String name)
    {
        // date_default_timezone_set("UTC");
        //this.DOCUMENT_ROOT = _SERVER["DOCUMENT_ROOT"];
        this.connect(host, user, passwd, name);
    }
    /*
	 *@for connect db
	 *@return the handle of db connection
	 *@param host:host of mysql, user: username of mysql, passwd: password of mysql, name: the db you want connect
	 */
    public MySqlConnection connect(String host, String user, String passwd, String name)
    {
        con = BEEmlak.Authentication.fetchByEnvironment(BEEmlak.Authentication.Environment.DEVELOPMENT);
        return con;
    }
    public String date(String Format)
    {

        return DateTime.Now.ToString(Format);
    }
    public String showAllCalendar(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback        
        String now = date("Y-m-d H:i:s");

        if (userId > 0)
        {
            String query = "UPDATE calendar_type SET hide = 0, update_date = '" + now + "' WHERE userId = " + userId;
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            int rs = cmd.ExecuteNonQuery();
            if (rs > 0)
            {
                String backStr = "{'success':'true'}";
                return this.wrapCallback(backStr, callback);
            }
            else
            {
                return this.wrapCallback("{'success':'false'}", callback);
            }
        }
        return null;
    }

    public String showOnlyCalendar(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback        
        String now = date("Y-m-d H:i:s");
        int id = int.Parse(paramsx.Request["id"].ToString());
        int rs = 0;
        if (id > 0)
        {
            String query = "UPDATE calendar_type SET hide = 1, update_date = '" + now + "' WHERE id != " + id;
            cmd = con.CreateCommand(); cmd.CommandText = query;
            rs = cmd.ExecuteNonQuery();
            query = "UPDATE calendar_type SET hide = 0, update_date = '" + now + "' WHERE id = " + id;
            cmd = con.CreateCommand(); cmd.CommandText = query;
            rs = cmd.ExecuteNonQuery();
            if (rs > 0)
            {
                String backStr = "{'success':'true', 'id':" + id + "}";
                return this.wrapCallback(backStr, callback);
            }
            else
            {
                return this.wrapCallback("{'success':'false'}", callback);
            }
        }
        return null;
    }

    public String createUpdateCalendar(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback        
        String now = date("Y-m-d H:i:s");
        long id = int.Parse(paramsx.Request["id"].ToString());
        int flag = 0;
        int rs = 0;
        long bid = 0;
        if ("true" == paramsx.Request["hide"])
        {
            flag = 1;
        }
        if (id > 0)
        {
            String query = "UPDATE calendar_type SET userId = 1, color = '" + paramsx.Request["color"] + "', description = '" + paramsx.Request["description"] + "', "
                + "hide = " + flag + ", name = '" + paramsx.Request["name"] + "', update_date = '" + now + "' "
                + "WHERE id = " + id;
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            rs = cmd.ExecuteNonQuery();
            bid = id;
        }
        else
        {
            String query = "INSERT INTO calendar_type (userId, color, creation_date, description, hide, name, update_date) "
                + "VALUES (1, '" + paramsx.Request["color"] + "', '" + now + "', '" + paramsx.Request["description"] + "', " + flag + ", '" + paramsx.Request["name"] + "', '" + now + "')";
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            rs = cmd.ExecuteNonQuery();
            bid = cmd.LastInsertedId;
        }
        if (rs > 0)
        {
            String backStr = "{'success':'true', 'id':" + bid + "}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public String deleteEventsByCalendar(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        String query = "DELETE FROM calendar_event WHERE calendarId = " + paramsx.Request["calendarId"];
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        long rs = cmd.ExecuteNonQuery();
        if (rs > 0)
        {
            String backStr = "{'success':'true'}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public String deleteCalendar(HttpContext  paramsx)
    {
        int rs = 0;
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        String query = "DELETE FROM calendar_type WHERE id = " + paramsx.Request["id"];
        cmd = con.CreateCommand(); cmd.CommandText = query; rs = cmd.ExecuteNonQuery();
        query = "DELETE FROM calendar_event WHERE calendarId = " + paramsx.Request["id"];
        cmd = con.CreateCommand(); cmd.CommandText = query; rs = cmd.ExecuteNonQuery();
        if (rs > 0)
        {
            String backStr = "{'success':'true'}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public List<object> getCalendar(HttpContext  paramsx)
    {

        String query = "SELECT * FROM calendar_type WHERE calendar_type.userId = '" + userId + "'";
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        MySqlDataReader reader = cmd.ExecuteReader();

        List<object> data = new List<object>();
        if (!reader.HasRows)
        {
            reader.Close();
            query = "SELECT * FROM user WHERE id = " + userId;
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            MySqlDataReader row = cmd.ExecuteReader(); ;
            String username = row.GetString("username");
            String now = date("Y-m-d H:i:s");
            row.Close();

            query = "INSERT INTO calendar_type (userId, name, color, creation_date, update_date)"
                + "VALUES (" + userId + ", '" + username + "', 'blue', '" + now + "', '" + now + "')";
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            cmd.ExecuteNonQuery();

           
            query = "SELECT * FROM calendar_type WHERE calendar_type.userId = '" + userId + "'";
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            reader = cmd.ExecuteReader();
        }
        while (reader.Read())
        {
            bool truefalse = false;
            if (1 == reader.GetInt16("hide"))
            {
                truefalse = true;
            }
            else
            {
                truefalse = false;
            }
            data.Add(new { id = reader.GetString("id"), userId = reader.GetString("userId"), color = reader.GetString("color"), creation_date = reader.GetMySqlDateTime("creation_date").ToString(), description = reader.GetString("description"), hide = truefalse, name = reader.GetString("name"), update_date = reader.GetMySqlDateTime("update_date").ToString() });
        }
        reader.Close();
        return data;
    }

    public String loadCalendar(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        List<object> data = this.getCalendar(paramsx);
        Hashtable arr = new Hashtable();
        arr.Add("total", data.Count);
        arr.Add("data", data);
        return this.backJson(arr, callback);
    }

    public String loadEvent(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback

        String query = "SELECT calendar_event.*, calendar_type.color FROM calendar_event, calendar_type "
                + "WHERE calendar_type.id = calendar_event.calendarId "
                + "AND calendar_event.userId = " + userId + " "
                + "AND (calendar_event.startTime >= '" + paramsx.Request["startDay"] + " 00:00' OR calendar_event.endTime <= '" + paramsx.Request["endDay"] + " 23:59' "
                + "OR (calendar_event.startTime < '" + paramsx.Request["startDay"] + " 00:00' AND calendar_event.endTime > '" + paramsx.Request["endDay"] + " 23:59'))"
                + "AND (calendar_event.repeatType = 'no' OR calendar_event.repeatType = 'exception') "
                + "ORDER BY calendar_event.startTime, calendar_event.endTime DESC";
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        MySqlDataReader obj = cmd.ExecuteReader();
        List<object> data = new List<object>();
        if (obj.HasRows)
        {
            while (obj.Read())
            {
                bool xalertFlag = false;
                if (1 == obj.GetInt16("alertFlag"))
                {
                    xalertFlag = true;
                }
                else
                {
                    xalertFlag = false;
                }
                bool xlocked = false;

                if (1 == obj.GetInt16("locked"))
                {
                    xlocked = true;
                }
                else
                {
                    xlocked = false;
                }
                String[] pies = obj.GetString("startTime").Split(' ');

                String[] piesx = obj.GetString("endTime").Split(' ');

                data.Add(new
                {
                    id = obj.GetString("id"),
                    userId = obj.GetString("userId"),
                    calendarId = obj.GetString("calendarId"),
                    repeatType = obj.GetString("repeatType"),
                    ymd = pies[0],
                    startTime = pies[1],
                    eymd = piesx[0],
                    endTime = piesx[1],
                    alertFlag = xalertFlag,
                    creation_date = obj.GetMySqlDateTime("creation_date").ToString(),
                    description = obj.GetString("description"),
                    subject = obj.GetString("subject"),
                    update_date = obj.GetMySqlDateTime("update_date").ToString(),
                    locked = xlocked,
                    color = obj.GetString("color")
                }
                );


            }
        }
        obj.Close();
        Hashtable arr = new Hashtable();
        arr.Add("total", data.Count);
        arr.Add("data", data);
        return this.backJson(arr, callback);
    }

    public String createEvent(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback        
        String now = date("Y-m-d H:i:s");
        int alertFlag = 0;
        long bid = 0;
        if ("true" == paramsx.Request["alertFlag"].ToString())
        {
            alertFlag = 1;
        }
        int locked = 0;
        if ("true" == paramsx.Request["locked"].ToString())
        {
            locked = 1;
        }
        String query = "INSERT INTO calendar_event (userId, calendarId, creation_date, startTime, endTime, description, alertFlag, subject, update_date, locked, repeatType) "
            + "VALUES (1, " + paramsx.Request["calendarId"] + ", '" + now +
            "', '" + paramsx.Request["startDay"] + " " + paramsx.Request["startHMTime"] + "', '" + paramsx.Request["endDay"] + " " + paramsx.Request["endHMTime"]
            + "', '" + paramsx.Request["description"] + "', " + alertFlag + ", '" + paramsx.Request["subject"] + "', '" + now + "', " + locked + ", '" + paramsx.Request["repeatType"] + "')";
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        int rs = cmd.ExecuteNonQuery();
        if (rs > 0)
        {
            bid = cmd.LastInsertedId;
            String backStr = "{'success':'true', 'id':" + bid + "}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public String updateEvent(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback        
        String now = date("Y-m-d H:i:s");
        int alertFlag = 0;
        if ("true" == paramsx.Request["alertFlag"].ToString())
        {
            alertFlag = 1;
        }
        int locked = 0;
        if ("true" == paramsx.Request["locked"].ToString())
        {
            locked = 1;
        }
        String query = "UPDATE calendar_event SET calendarId = " + paramsx.Request["calendarId"] + ", description = '" + paramsx.Request["description"]
             + "', startTime = '" + paramsx.Request["startDay"] + " " + paramsx.Request["startHMTime"] + "', endTime = '" + paramsx.Request["endDay"] + " " + paramsx.Request["endHMTime"] + "', "
             + "alertFlag = " + alertFlag + ", locked = " + locked + ", subject = '" + paramsx.Request["subject"] + "', update_date = '" + now + "', repeatType = '" + paramsx.Request["repeatType"] + "' "
             + "WHERE id = " + paramsx.Request["id"];
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        long rs = cmd.ExecuteNonQuery();
        if (rs > 0)
        {
            String backStr = "{'success':'true', 'id':" + paramsx.Request["id"] + "}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public String deleteEvent(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        String query = "DELETE FROM calendar_event WHERE id = " + paramsx.Request["id"];
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        long rs = cmd.ExecuteNonQuery();
        if (rs > 0)
        {
            String backStr = "{'success':'true', 'id':" + paramsx.Request["id"] + "}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public String changeDay(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        String keep = paramsx.Request["keep"].ToString();
        Hashtable backids = new Hashtable();
        String now = date("Y-m-d H:i:s");
        String query = "SELECT calendar_event.* FROM calendar_event, calendar_type WHERE calendar_event.startTime >= '" + paramsx.Request["dragDay"] + " 00:00' "
            + "AND calendar_event.endTime <= '" + paramsx.Request["dragDay"] + " 23:59' "
            + "AND (calendar_event.repeatType = 'no' OR calendar_event.repeatType = 'exception') "
            + "AND calendar_type.id = calendar_event.calendarId AND calendar_type.hide = 0 ";

        cmd = con.CreateCommand(); cmd.CommandText = query;
        MySqlDataReader rs = cmd.ExecuteReader();
        while (rs.Read())
        {

            String[] pies = rs.GetString("startTime").Split(' ');
            String[] piesx = rs.GetString("endTime").Split(' ');
            String startTime = paramsx.Request["dropDay"].ToString() + " " + pies[1];
            String endTime = paramsx.Request["dropDay"].ToString() + " " + piesx[1];

            String oid = rs.GetString("id");
            if ("true" == keep)
            {
                query = "INSERT INTO calendar_event (userId, calendarId, creation_date, startTime, endTime, description, alertFlag, subject, update_date, repeatType) "
                    + "VALUES (" + rs.GetString("userId") + ", " + rs.GetString("calendarId") + ", '" + now + "', '" + startTime + "', '" + endTime + "', '" + rs.GetString("description")
                    + "', " + rs.GetString("alertFlag") + ", '" + rs.GetString("subject") + "', '" + now + "', '" + rs.GetString("repeatType") + "')";
                cmd = con.CreateCommand(); cmd.CommandText = query;
                cmd.ExecuteNonQuery();
                backids = new Hashtable();// stdClass();
                backids.Add("oid", cmd.LastInsertedId);
            }
            else
            {
                query = "UPDATE calendar_event SET startTime = '" + startTime + "', endTime = '" + endTime + "' WHERE id = " + oid;
                cmd = con.CreateCommand(); cmd.CommandText = query;
                cmd.ExecuteNonQuery();
            }
        }

        if (rs.HasRows)
        {
            String backStr = "{'success':'true', 'backids':" + json_encode(backids) + "}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
        rs.Close();
    }

    public String deleteDay(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        String query = "DELETE FROM calendar_event WHERE EXISTS "
            + "(SELECT id FROM calendar_type WHERE calendar_event.startTime >= '" + paramsx.Request["day"] + " 00:00' AND calendar_event.endTime <= '" + paramsx.Request["day"]
            + " 23:59' AND (calendar_event.repeatType = 'no' OR calendar_event.repeatType = 'exception') "
            + "AND calendar_event.calendarId = calendar_type.id AND calendar_type.hide = 0)";
        cmd = con.CreateCommand(); cmd.CommandText = query;
        long rs = cmd.ExecuteNonQuery();
        if (rs > 0)
        {
            String backStr = "{'success':'true'}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public String search(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        String start = paramsx.Request["start"].ToString() != "" ? paramsx.Request["start"].ToString() : null; // Undefined index: callback
        String limit = paramsx.Request["limit"].ToString() != "" ? paramsx.Request["limit"].ToString() : null; // Undefined index: callback
        String text = paramsx.Request["text"].ToString();
        if (null == text)
            text = "";
        String like = "";
        if ("" != text)
        {
            like = " AND (calendar_event.subject LIKE '%" + text + "%' OR calendar_event.description LIKE '%" + text + "%')";
        }
        String page = "";
        if (null != start && null != limit)
        {
            page = " LIMIT " + start + "," + limit;
        }
        String from = " FROM calendar_event, calendar_type ";
        String where = " WHERE calendar_event.userId = 1 "
            + like + " AND calendar_event.calendarId = calendar_type.id";
        String query = "SELECT calendar_event.*, calendar_type.color " + from + where + page;
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        MySqlDataReader rs = cmd.ExecuteReader();
        List<object> data = new List<object>();
        int total = 0;
        int totalrs = 0;
        if (rs.HasRows)
        {
            while (rs.Read())
            {
                bool xalertFlag = false;
                if (1 == rs.GetInt16("alertFlag"))
                {
                    xalertFlag = true;
                }
                else
                {
                    xalertFlag = false;
                }
                bool xlocked = false;
                if (1 == rs.GetInt16("locked"))
                {
                    xlocked = true;
                }
                else
                {
                    xlocked = false;
                }

                String[] pies = rs.GetString("startTime").Split(' ');
                String[] piesx = rs.GetString("endTime").Split(' ');

                data.Add(new
                {
                    id = rs.GetString("id"),
                    userId = rs.GetString("userId"),
                    repeatType = rs.GetString("repeatType"),
                    ymd = pies[0],
                    startTime = pies[1],
                    eymd = piesx[0],
                    endTime = piesx[1],
                    alertFlag = xalertFlag,
                    creation_date = rs.GetMySqlDateTime("creation_date").ToString(),
                    description = rs.GetString("description"),
                    subject = rs.GetString("subject"),
                    update_date = rs.GetMySqlDateTime("update_date").ToString(),
                    locked = xlocked,
                    color = rs.GetString("color")
                });


            }
            rs.Close();
            totalrs = data.Count;
        }
        Hashtable arr = new Hashtable();
        arr.Add("total", total);
        arr.Add("data", data);
        return this.backJson(arr, callback);
    }

    public List<object> getSetting(HttpContext  paramsx)
    {

        String query = "SELECT * FROM calendar_setting WHERE calendar_setting.userId = '" + userId + "'";
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        MySqlDataReader rs = cmd.ExecuteReader();
        List<object> data = new List<object>();
        if (!rs.HasRows)
        {
            rs.Close();

            query = "SELECT * FROM user WHERE id = " + userId;
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            rs = cmd.ExecuteReader();
            String username = rs.GetString("username");
            rs.Close();

            String now = date("Y-m-d H:i:s");
            query = "INSERT INTO calendar_setting (userId, hourFormat, dayFormat, weekFormat, monthFormat, fromtoFormat, language, activeStartTime, activeEndTime, intervalSlot, createByDblclick, hideInactiveRow, singleDay, startDay)"
                + "VALUES (" + userId + ", '24', 'l M d Y', 'm/d(D)', 'm/d', 'm/d/Y', 'en_US', '00:00', '24:00', '30', 0, 0, 0, 1)";
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            cmd.ExecuteNonQuery();

            query = "SELECT * FROM calendar_setting WHERE calendar_setting.userId = '" + userId + "'";
            cmd = con.CreateCommand();
            cmd.CommandText = query;
            rs = cmd.ExecuteReader();
        }
        while (rs.Read())
        {
            bool xcreateByDblclick = false;
            if (1 == rs.GetInt16("createByDblclick"))
            {
                xcreateByDblclick = true;
            }
            else
            {
                xcreateByDblclick = false;
            }
            bool xhideInactiveRow = false;
            if (1 == rs.GetInt16("hideInactiveRow"))
            {
                xhideInactiveRow = true;
            }
            else
            {
                xhideInactiveRow = false;
            }
            bool xsingleDay = false;
            if (1 == rs.GetInt16("singleDay"))
            {
                xsingleDay = true;
            }
            else
            {
                xsingleDay = false;
            }

            data.Add(new
            {
                userId = rs.GetString("userId"),
                hourFormat = rs.GetString("hourFormat"),
                dayFormat = rs.GetString("dayFormat"),
                weekFormat = rs.GetString("weekFormat"),
                monthFormat = rs.GetString("monthFormat"),
                fromtoFormat = rs.GetString("fromtoFormat"),
                activeStartTime = rs.GetString("activeStartTime"),
                activeEndTime = rs.GetString("activeEndTime"),
                createByDblclick = xcreateByDblclick,
                hideInactiveRow = xhideInactiveRow,
                singleDay = xsingleDay,
                language = rs.GetString("language"),
                intervalSlot = rs.GetString("intervalSlot"),
                startDay = rs.GetString("startDay")
            });
        }
        rs.Close();
        return data;
    }

    public String loadSetting(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        List<object> data = this.getSetting(paramsx);
        Hashtable arr = new Hashtable();
        arr.Add("total", data.Count);
        arr.Add("data", data);
        return this.backJson(arr, callback);
    }
    public void array_push( ArrayList arr,String txt)
    {
        arr.Add(txt);
    }
    public bool empty(object xxx)
    {
        if (xxx == null)
            return true;
        if (xxx.ToString() == "")
            return true;
        else
            return false;
    }
    public String updateSetting(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback

        ArrayList arr = new ArrayList();
        if (!empty(paramsx.Request["hourFormat"]))
        { // Undefinex index
            array_push(arr, "hourFormat = '" + paramsx.Request["hourFormat"] + "' ");
        }
        if (!empty(paramsx.Request["dayFormat"]))
        { // Undefinex index
            array_push(arr, "dayFormat = '" + paramsx.Request["dayFormat"] + "' ");
        }
        if (!empty(paramsx.Request["weekFormat"]))
        { // Undefinex index
            array_push(arr, "weekFormat = '" + paramsx.Request["weekFormat"] + "' ");
        }
        if (!empty(paramsx.Request["monthFormat"]))
        { // Undefinex index
            array_push(arr, "monthFormat = '" + paramsx.Request["monthFormat"] + "' ");
        }
        if (!empty(paramsx.Request["fromtoFormat"]))
        { // Undefinex index
            array_push(arr, "fromtoFormat = '" + paramsx.Request["fromtoFormat"] + "' ");
        }
        if (!empty(paramsx.Request["language"]))
        { // Undefinex index
            array_push(arr, "language = '" + paramsx.Request["language"] + "' ");
        }
        if (!empty(paramsx.Request["activeStartTime"]))
        { // Undefinex index
            array_push(arr, "activeStartTime = '" + paramsx.Request["activeStartTime"] + "' ");
        }
        if (!empty(paramsx.Request["activeEndTime"]))
        { // Undefinex index
            array_push(arr, "activeEndTime = '" + paramsx.Request["activeEndTime"] + "'");
        }
        if (!empty(paramsx.Request["intervalSlot"]))
        { // Undefinex index
            array_push(arr, "intervalSlot = " + paramsx.Request["intervalSlot"] + " ");
        }
        if (!empty(paramsx.Request["startDay"]) || "0" == paramsx.Request["startDay"])
        { // Undefinex index
            array_push(arr, "startDay = '" + paramsx.Request["startDay"] + "' ");
        }
        if (!empty(paramsx.Request["createByDblclick"]))
        { // Undefinex index
            int createByDblclick = 0;
            if ("true" == paramsx.Request["createByDblclick"])
            {
                createByDblclick = 1;
            }
            array_push(arr, "createByDblclick = " + createByDblclick + " ");
        }
        if (!empty(paramsx.Request["hideInactiveRow"]))
        { // Undefinex index
            int hideInactiveRow = 0;
            if ("true" == paramsx.Request["hideInactiveRow"])
            {
                hideInactiveRow = 1;
            }
            array_push(arr, "hideInactiveRow = " + hideInactiveRow + " ");
        }
        if (!empty(paramsx.Request["singleDay"]))
        { // Undefinex index
            int singleDay = 0;
            if ("true" == paramsx.Request["singleDay"])
            {
                singleDay = 1;
            }
            array_push(arr, "singleDay = " + singleDay + " ");
        }

        String query = "UPDATE calendar_setting SET " + arr[0];
        long len = arr.Count;
        for (int i = 1; i < len; i++)
        {
            query = query + ", " + arr[i];
        }
        query = query + "WHERE userId = " + userId;
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        long rs = cmd.ExecuteNonQuery();
        if (rs > 0)
        {
            String backStr = "{'success':'true'}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public List<object> getRepeatEvent(HttpContext  paramsx)
    {

        String query = "SELECT calendar_event.*, calendar_type.color FROM calendar_event, calendar_type "
                + "WHERE calendar_type.id = calendar_event.calendarId "
                + "AND calendar_event.userId = " + userId + " "
                + "AND calendar_event.repeatType != 'no' AND calendar_event.repeatType != 'exception'";
        cmd = con.CreateCommand();
        cmd.CommandText = query;
        MySqlDataReader rs = cmd.ExecuteReader();
        List<object> data = new List<object>();
        if (rs.HasRows)
        {
            while (rs.Read())
            {
                bool xalertFlag = false;
                if (1 == rs.GetInt16("alertFlag"))
                {
                    xalertFlag = true;
                }
                else
                {
                    xalertFlag = false;
                }
                bool xlocked = false;
                if (1 == rs.GetInt16("locked"))
                {
                    xlocked = true;
                }
                else
                {
                    xlocked = false;
                }

                String[] pies = rs.GetString("startTime").Split(' ');
                String[] piesx = rs.GetString("endTime").Split(' ');

                data.Add(new
                {
                    calendarId = rs.GetString("calendarId"),
                    id = rs.GetString("id"),
                    userId = rs.GetString("userId"),
                    repeatType = rs.GetString("repeatType"),
                    ymd = pies[0],
                    startTime = pies[1],
                    eymd = piesx[0],
                    endTime = piesx[1],
                    alertFlag = xalertFlag,
                    creation_date = rs.GetMySqlDateTime("creation_date").ToString(),
                    description = rs.GetString("description"),
                    subject = rs.GetString("subject"),
                    update_date = rs.GetMySqlDateTime("update_date").ToString(),
                    locked = xlocked,
                    color = rs.GetString("color")
                });

            }
        }
        rs.Close();
        return data;
    }

    public String loadRepeatEvent(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        List<object> data = this.getRepeatEvent(paramsx);
        Hashtable arr = new Hashtable();
        arr.Add("total", data.Count);
        arr.Add("data", data);
        return this.backJson(arr, callback);
    }

    public String createUpdateRepeatEvent(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback        
        String now = date("Y-m-d H:i:s");
        int alertFlag = 0;
        if ("true" == paramsx.Request["alertFlag"].ToString())
        {
            alertFlag = 1;
        }
        int locked = 0;
        if ("true" == paramsx.Request["locked"].ToString())
        {
            locked = 1;
        }
        long rs = 0;
        long id = int.Parse(paramsx.Request["id"].ToString());
        String insertSQL = "INSERT INTO calendar_event (userId, calendarId, creation_date, startTime, endTime, description, alertFlag, subject, update_date, locked, repeatType) "
             + "VALUES (1, " + paramsx.Request["calendarId"] + ", '" + now +
             "', '" + paramsx.Request["startDay"] + " " + paramsx.Request["startHMTime"] + "', '" + paramsx.Request["endDay"] + " " + paramsx.Request["endHMTime"]
             + "', '" + paramsx.Request["description"] + "', " + alertFlag + ", '" + paramsx.Request["subject"] + "', '" + now + "', " + locked + ", '" + paramsx.Request["repeatType"] + "')";
        if (id > 0)
        {
            bool oflag = this.isRepeatEvent(paramsx.Request["oldRepeatType"].ToString());
            bool flag = this.isRepeatEvent(paramsx.Request["repeatType"].ToString());
            if (oflag && flag)
            {
                String query = "UPDATE calendar_event SET calendarId = " + paramsx.Request["calendarId"] + ", description = '" + paramsx.Request["description"]
                    + "', startTime = '" + paramsx.Request["startDay"] + " " + paramsx.Request["startHMTime"] + "', endTime = '" + paramsx.Request["endDay"] + " " + paramsx.Request["endHMTime"] + "', "
                    + "alertFlag = " + alertFlag + ", locked = " + locked + ", subject = '" + paramsx.Request["subject"] + "', update_date = '" + now + "', " + "repeatType = '" + paramsx.Request["repeatType"] + "' "
                    + "WHERE id = " + id;
                cmd = con.CreateCommand(); cmd.CommandText = query; rs = cmd.ExecuteNonQuery();
            }
            else if (oflag)
            {
                if ("exception" == paramsx.Request["repeatType"].ToString())
                {
                    String query = "UPDATE calendar_event SET repeatType = '" + paramsx.Request["oldRepeatType"] + "' "
                        + "WHERE id = " + id;
                    cmd = con.CreateCommand(); cmd.CommandText = query; rs = cmd.ExecuteNonQuery();
                }
                else
                {
                    String query = "DELETE FROM calendar_event " + "WHERE id = " + id;
                    cmd = con.CreateCommand(); cmd.CommandText = query; rs = cmd.ExecuteNonQuery();
                }
                cmd = con.CreateCommand(); cmd.CommandText = insertSQL; rs = cmd.ExecuteNonQuery();
                id = cmd.LastInsertedId;
            }
            else if (flag)
            {
                String query = "DELETE FROM calendar_event " + "WHERE id = " + id;
                cmd = con.CreateCommand(); cmd.CommandText = query; rs = cmd.ExecuteNonQuery();
                cmd = con.CreateCommand(); cmd.CommandText = insertSQL; rs = cmd.ExecuteNonQuery();
                id = cmd.LastInsertedId;
            }
        }
        else
        {
            cmd = con.CreateCommand(); cmd.CommandText = insertSQL; rs = cmd.ExecuteNonQuery();
            id = cmd.LastInsertedId;
        }

        if (rs > 0)
        {
            String backStr = "{'success':'true', 'id':" + id + "}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }
    public String deleteRepeatEvent(HttpContext  paramsx)
    {
        bool callback  = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
        long rs = 0;
        if (paramsx.Request["makeException"].ToString() != "")
        {
            String query = "UPDATE calendar_event SET repeatType = '" + paramsx.Request["repeatType"] + "' "
                + "WHERE id = " + paramsx.Request["id"];
            cmd = con.CreateCommand(); cmd.CommandText = query; rs = cmd.ExecuteNonQuery();
        }
        else
        {
            String query = "DELETE FROM calendar_event WHERE id = " + paramsx.Request["id"];
            cmd = con.CreateCommand(); cmd.CommandText = query; rs = cmd.ExecuteNonQuery();
        }

        if (rs > 0)
        {
            String backStr = "{'success':'true', 'id':" + paramsx.Request["id"] + "}";
            return this.wrapCallback(backStr, callback);
        }
        else
        {
            return this.wrapCallback("{'success':'false'}", callback);
        }
    }

    public String initialLoad(HttpContext  paramsx)
    {
        try
        {
            bool callback = paramsx.Request["callback"] != null? bool.Parse(paramsx.Request["callback"].ToString()) : false; // Undefined index: callback
            List<object> cs = this.getSetting(paramsx);
            List<object> owned = this.getCalendar(paramsx);
            List<object> re = this.getRepeatEvent(paramsx);
            Hashtable backObj = new Hashtable();// stdClass();
            backObj.Add("cs", cs);
            backObj.Add("owned", owned);
            backObj.Add("shared", new Array[0] { });
            backObj.Add("re", re);
            return this.wrapCallback(json_encode(backObj), callback);
        }
        catch (Exception ex) { }
        return "";
    }

    public bool isRepeatEvent(String repeatType)
    {
        if ("no" == repeatType || "exception" == repeatType)
        {
            return false;
        }
        return true;
    }

    public String backJson(Hashtable arr, bool callback)
    {
        long total = long.Parse(arr["total"].ToString());
        List<object> data = (List<object>)arr["data"];
        String backJson = json_encode(data);
        backJson = "{'success':'true','total':'" + total + "','results':" + backJson + "}";
        return this.wrapCallback(backJson, callback);
    }

    public String wrapCallback(String str, bool callback)
    {
        if (false != callback)
        {
            return callback + "(" + str + ");";
        }
        return str;
    }
    public String json_encode(List<object> data)
    {
        string sJSON = Newtonsoft.Json.JsonConvert.SerializeObject(data);
        return sJSON;
    }
    public String json_encode(Hashtable data)
    {
        string sJSON = Newtonsoft.Json.JsonConvert.SerializeObject(data);
        return sJSON;
    }
}