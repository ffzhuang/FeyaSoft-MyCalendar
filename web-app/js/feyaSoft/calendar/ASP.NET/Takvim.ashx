<%@ WebHandler Language="C#" Class="Takvim" %>
/*
 * Asp.Net Version of this script made by 
 * Engin Ates
 * http://www.enginates.com
 * http://www.lizgecity.com
 * */
using System;
using System.Web;
using System.Collections;
public class Takvim : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        CalendarAgentx takvim = new CalendarAgentx();
        takvim.userId = 1;
        takvim.connect("", "", "", "");
        context.Response.ContentType = "text/json";

        String action = context.Request["action"];
        if ("search" == action)
        {
            context.Response.Write( takvim.search(context));
        }
        else if ("showAllCalendar" == action)
        {
            context.Response.Write( takvim.showAllCalendar(context));
        }
        else if ("showOnlyCalendar" == action)
        {
            context.Response.Write( takvim.showOnlyCalendar(context));
        }
        else if ("createUpdateCalendar" == action)
        {
            context.Response.Write( takvim.createUpdateCalendar(context));
        }
        else if ("deleteEventsByCalendar" == action)
        {
            context.Response.Write( takvim.deleteEventsByCalendar(context));
        }
        else if ("deleteCalendar" == action)
        {
            context.Response.Write( takvim.deleteCalendar(context));
        }
        else if ("loadCalendar" == action)
        {
            context.Response.Write( takvim.loadCalendar(context));
        }
        else if ("loadEvent" == action)
        {
            context.Response.Write( takvim.loadEvent(context));
        }
        else if ("loadRepeatEvent" == action)
        {
            context.Response.Write( takvim.loadRepeatEvent(context));
        }
        else if ("createEvent" == action)
        {
            context.Response.Write( takvim.createEvent(context));
        }
        else if ("updateEvent" == action)
        {
            context.Response.Write( takvim.updateEvent(context));
        }
        else if ("deleteEvent" == action)
        {
            context.Response.Write( takvim.deleteEvent(context));
        }
        else if ("deleteRepeatEvent" == action)
        {
            context.Response.Write( takvim.deleteRepeatEvent(context));
        }
        else if ("changeDay" == action)
        {
            context.Response.Write( takvim.changeDay(context));
        }
        else if ("deleteDay" == action)
        {
            context.Response.Write( takvim.deleteDay(context));
        }
        else if ("loadSetting" == action)
        {
            context.Response.Write( takvim.loadSetting(context));
        }
        else if ("updateSetting" == action)
        {
            context.Response.Write( takvim.updateSetting(context));
        }
        else if ("createUpdateRepeatEvent" == action)
        {
            context.Response.Write( takvim.createUpdateRepeatEvent(context));
        }
        else if ("initialLoad" == action)
        {
            context.Response.Write( takvim.initialLoad(context));
        }
        else
        {
            context.Response.Write("No such action");
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
