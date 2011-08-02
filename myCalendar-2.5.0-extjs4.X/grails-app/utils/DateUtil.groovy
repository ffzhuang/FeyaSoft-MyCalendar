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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.MissingResourceException;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.i18n.LocaleContextHolder;

/**
 *
 * @author Fenqiang.Zhuang
 */
class DateUtil {
	private static String defaultDatePattern = "yyyy-MM-dd";

	static {
		try {
			Locale locale = LocaleContextHolder.getLocale();
		} catch (MissingResourceException mse) {
			// do nothing
		}
	}

	public static String getDatePattern() {
		return defaultDatePattern;
	}

	public static String getToday() {
		Date today = new Date();
		return format(today);
	}

	public static String format(Date date) {
		return date == null ? "" : format(date, getDatePattern());
	}

	public static String format(Date date, String pattern) {
		return date == null ? "" : new SimpleDateFormat(pattern).format(date);
	}

	public static Date parse(String strDate) throws ParseException {
		return StringUtils.isBlank(strDate) ? null : parse(strDate,
				getDatePattern());
	}

	/**
	 * parse string with pattern
	 *
	 * @param strDate
	 * @param pattern
	 * @return
	 * @throws ParseException
	 */
	public static Date parse(String strDate, String pattern)
			throws ParseException {
		return StringUtils.isBlank(strDate) ? null : new SimpleDateFormat(
				pattern).parse(strDate);
	}

    /**
	 * this will add year to this date
	 *
	 * @param date
	 * @param n
	 * @return
	 */
	public static Date addYear(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.YEAR, n);
		return cal.getTime();
	}

	/**
	 * this will add month to this date
	 *
	 * @param date
	 * @param n
	 * @return
	 */
	public static Date addMonth(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, n);
		return cal.getTime();
	}

	/**
	 * this will add day to the this date
	 *
	 * @param date
	 * @param n
	 * @return
	 */
	public static Date addDay(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, n);
		return cal.getTime();
	}

	/**
	 * Add hour min now...
	 *
	 * @param date
	 * @param hour
	 * @param min
	 * @return
	 */
	public static Date addHourMin(Date date, int hour, int min) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.HOUR, hour);
		cal.add(Calendar.MINUTE, min);
		return cal.getTime();
	}

	/**
	 * this just return midnight of date...
	 *
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static Date getDMYDate(Date date) {
		Date result = date;
		try {
			result = parse(format(date));
		} catch (Exception e) {
			// do nothing
		}

		return result;
	}

	/**
	 * return sunday of this week and dayOfWeek should be like: Calendar.SUNDAY
	 *
	 * @param date
	 * @return
	 */
	public static Date getWeekDay(Date date, int dayOfWeek) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_WEEK, dayOfWeek);
		return cal.getTime();
	}

    /**
	 * return year as int
	 *
	 * @param date
	 * @return
	 */
	public static int getYear(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);		
		return cal.get(Calendar.YEAR);
	}

    /**
	 * return month as int
	 *
	 * @param date
	 * @return
	 */
	public static int getMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);		
		return cal.get(Calendar.MONTH);
	}

	/**
	 * This will return Sunday of next week....
	 *
	 * @param date
	 * @return
	 */
	public static String weekdayOfNextWeek(Date date, int weekday) {
		Date thisWeekDay = DateUtil.getWeekDay(date, weekday);
		Date nextWeekDay = DateUtil.addDay(thisWeekDay, 7);
		return format(nextWeekDay, "EEE dd MMM, yyyy");
	}

	/**
	 * This will return Sunday of next week....
	 *
	 * @param date
	 * @return
	 */
	public static String weekdayOfThisWeek(Date date, int weekday) {
		Date thisWeekDay = DateUtil.getWeekDay(date, weekday);
		return format(thisWeekDay, "EEE dd MMM, yyyy");
	}

	/**
	 * return week of day by date
	 * @param date
	 * @return
	 */
	public static int getWeekOfDay(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.DAY_OF_WEEK);
	}

    /**
	 * return week of month by date
	 * @param date
	 * @return
	 */
	public static int getWeekOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.WEEK_OF_MONTH);
	}

	/**
	 * set start end date period...
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static int escapeDays(Date startDate, Date endDate) {
		int result = -1;
		Long mills = endDate.getTime() - startDate.getTime();

		try {
			result = (int)(mills/86400000);
		} catch (Exception e) {
			// do nothing
		}

		return result;
	}

    /**
	 * set start end date period...
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static int escapeMonths(Date startDate, Date endDate) {
		def sy = DateUtil.getYear(startDate)
        def ey = DateUtil.getYear(endDate)
        def sm = DateUtil.getMonth(startDate)
        def em = DateUtil.getMonth(endDate)
        return ey*12+em-sy*12-sm
	}

	/**
	 * set start end date period...
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static int escapeMins(Date startDate, Date endDate) {
		int result = -1;
		Long mills = endDate.getTime() - startDate.getTime();


		try {
			result = (int)(mills/60000);
		} catch (Exception e) {
			// do nothing
		}

		return result;
	}

	public static Date getMidnightDate(Date date) {
		Date midnight = new Date();
		try {
			String temp = DateUtil.format(date, "MMM dd, yyyy") + " 00:00";
			midnight = DateUtil.parse(temp, "MMM dd, yyyy HH:mm");
		} catch (Exception e) {
			// do nothing
		}

		return midnight;
	}
}

