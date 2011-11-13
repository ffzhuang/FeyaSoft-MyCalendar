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
Ext.ns('Ext.util');

Ext.util.DatePicker = Ext.extend(Ext.DatePicker, {

    onRender : function(container, position){
        Ext.util.DatePicker.superclass.onRender.call(this, container, position);
    },

    updateRange : function(){
        if(this.startDate && this.endDate){            
            var st = this.startDate.clearTime().getTime();
            var et = this.endDate.clearTime().getTime();
            this.cells.each(function(c){
                var dt = c.dom.firstChild.dateValue;
                if(st <= dt && dt <= et){
                    c.addClass('x-date-selected');
                }else{
                    c.removeClass('x-date-selected');
                }
            });
        }
    },

    setRange : function(startDate, endDate){
        this.startDate = startDate;
        this.endDate = endDate;
    },

    update : function(date, forceRefresh){
        Ext.util.DatePicker.superclass.update.call(this, date, forceRefresh);
        this.updateRange();
    }
});
