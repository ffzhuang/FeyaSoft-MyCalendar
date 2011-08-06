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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Fenqiang.Zhuang
 */
public class Helper {

	static final long ONE_HOUR = 60 * 60 * 1000L;

	/**
	 * Convert string to int
	 *
	 * @param in
	 * @return
	 */
	public static int string2Int(String in) {
		return Integer.parseInt(in);
	}

	/**
	 * Convert string to double
	 *
	 * @param in
	 * @return
	 */
	public static double string2Double(String in) {
		return Double.parseDouble(in);
	}

	/**
	 * Convert int to String
	 *
	 * @param in
	 * @return
	 */
	public static String int2String(int in) {
		return Integer.toString(in);
	}

	/**
	 * Convert double to String
	 *
	 * @param in
	 * @return
	 */
	public static String double2String(double in) {
		return Double.toString(in);
	}

	/**
	 * Convert general string stuff to html format.
	 *
	 * @param message
	 *            Text Source
	 * @return Modified Text
	 */
	public static String convert2HTML(String message) {

		// check whether it is empty string
		if (message == null || message.length() == 0) {
			return "";
		}

		StringBuffer buffer = new StringBuffer();
		String[] separator = message.split("(\r?\n)|(\n[^\r])");

		for (int i = 0; i < separator.length; i++) {
			buffer.append(separator[i]);
			if (i < (separator.length - 1)) {
				buffer.append("<br/>");
			}
		}
		return (buffer.toString());
	}

	public static List splitToList(String s, String devider) {
		List result = new ArrayList();
		StringTokenizer stTmp = new StringTokenizer(s, devider, false);

		while (stTmp.hasMoreTokens()) {
			String part = (String) stTmp.nextElement();
			result.add(part);
		}

		return result;
	}

	/**
	 * convert list to string which separate by separator
	 *
	 * @param ids
	 * @return
	 */
	public static String listToString(List<Long> ids, String separator) {
		StringBuffer result = new StringBuffer();
		int total = ids.size();

		if (ids == null || ids.size() == 0) {
			return null;
		}

		for (int i = 0; i < total; i++) {
			Long id = ids.get(i);
			result.append(id.toString());

			// check whether it is last one
			if ((i + 1) < total) {
				result.append(separator);
			}
		}

		return result.toString();
	}

	public static long daysBetween(Date d1, Date d2) {
		return ((d2.getTime() - d1.getTime() + ONE_HOUR) / (ONE_HOUR * 24));
	}

	/**
	 * Check whether the input String is empty or not, if so return true.
	 *
	 * @param aString
	 * @return
	 */
	public static boolean isEmptyString(String aString) {

		if (aString == null) {
			return true;
		}

		if (aString.trim().length() == 0) {
			return true;
		}

		return false;
	}

	/**
	 * Check whether in is integer now...
	 *
	 * @param in
	 * @return
	 */
	public static boolean isInteger(String in) {
		try {
			Integer.parseInt(in);
		} catch (Exception e) {
			return false;
		}

		return true;
	}

    public static String truncateMsg(String message, int limit) {
        // check whether it is empty string
		if (message == null || message.length() == 0) {
			return "";
		}

		StringBuffer buffer = new StringBuffer();
		//String[] separator = message.split("(\r?\n)|(\n[^\r])");
        String[] separator = message.split("(\r?\n)|(\n[^\r])|<br>");

        int totalLength = 0;
		for (int i = 0; i < separator.length; i++) {
            totalLength = totalLength + separator[i].length();
            if (totalLength > limit) break;
            else buffer.append(separator[i]);
		}

        if (totalLength > limit) buffer.append(".....");
		return (buffer.toString());
    }

    public static boolean isEmailValid(String email) {
        boolean isValid = false;

        /*
        Email format: A valid email address will have following format:
        [\\w\\.-]+: Begins with word characters, (may include periods and hypens).
        #     @: It must have a '@' symbol after initial characters.
        #     ([\\w\\-]+\\.)+: '@' must follow by more alphanumeric characters (may include hypens.).
        # This part must also have a "." to separate domain and subdomain names.
        #     [A-Z]{2,4}$ : Must end with two to four alaphabets.
        # (This will allow domain names with 2, 3 and 4 characters e.g pa, com, net, wxyz)
        #
        # Examples: Following email addresses will pass validation
        # abc@xyz.net; ab.c@tx.gov
        # */

        //Initialize reg ex for email.
        String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";
        CharSequence inputStr = email;
        //Make the comparison case-insensitive.
        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(inputStr);
        if (matcher.matches()) {
            isValid = true;
        }
        return isValid;
    }

}
