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
Ext.ns('Ext.ux.calendar');

Ext.ux.calendar.CalendarWin = Ext.extend(Ext.Window, {    	    
	initComponent: function(){        
        this.mainPanel = new Ext.ux.calendar.MainPanel({
        	border: false,
        	datasource:this.datasource,
            calendarSetting:this.calendarSetting,
            userId:this.userId
        });
        Ext.ux.calendar.CalendarWin.superclass.initComponent.call(Ext.apply(this, {
        	title : 'Calendar | CubeDrive Version [' + Ext.ux.calendar.CONST.VERSION + ']',
		    iconCls : 'icon_feyaCalendar_calendar',		    
		    style:'padding:0px;margin:0px;',
            layout:'fit',
            width:(Ext.getBody()).getWidth(),
            height:(Ext.getBody()).getHeight(),
            items:[this.mainPanel]
        }));                        
    } 
});