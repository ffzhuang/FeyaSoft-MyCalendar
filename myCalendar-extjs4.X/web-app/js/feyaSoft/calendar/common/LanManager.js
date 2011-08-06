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

Ext.ux.calendar.LanManager = {

    addJavaScript:function(lan){
        var flag = true;
        var exist = false;
        var id = 'x-calendar-language';
        var lanel = document.getElementById(id);
        if(lanel){
            if(lanel.name == lan){
                flag = false;
                exist = true;
            }else{
                Ext.get(lanel).remove();
            }
        }
        if(!exist){
            var js = document.createElement('script');
            js.id = id;
            js.name = lan;
            js.setAttribute('type', 'text/javascript');
            var url = Ext.ux.calendar.CONST.CALENDAR_LANGUAGE_PATH+lan+'.js';
            js.setAttribute('src', url);
            document.getElementsByTagName("head")[0].appendChild(js);
        }
        exist = false;
        id = 'ext-language';
        lanel = document.getElementById(id);
        if(lanel){
            if(lanel.name == lan){
                exist = true;
            }else{
                Ext.get(lanel).remove();
            }
        }
        if(!exist){
            js = document.createElement('script');
            js.id = id;
            js.setAttribute('type', 'text/javascript');
            url = Ext.ux.calendar.CONST.EXT_LANGUAGE_PATH+'ext-lang-'+lan+'.js';
            js.setAttribute('src', url);
            document.getElementsByTagName("head")[0].appendChild(js);
        }
        return flag;
    }
};