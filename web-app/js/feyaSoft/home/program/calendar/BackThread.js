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

Ext.ux.calendar.BackThread = function(config){
    Ext.apply(this, config);
    this.runner = new Ext.util.TaskRunner();
    this.timelineTask = {
        run:function(eh){
            var mp = eh.mainPanel;
            var cview = mp.calendarContainer.getLayout().activeItem;            
            if(cview instanceof Ext.ux.calendar.DayView){
                cview.setToday();
                cview.updateTimeline();
            }else if(cview instanceof Ext.ux.calendar.MonthView){
                cview.setToday();
            }
            eh.checkExpireEvents();
        },
        args:[this.ehandler],
        interval:60000
    };
    this.expireTask = {
        run:function(eh){
            var mp = eh.mainPanel;
            var cview = mp.calendarContainer.getLayout().activeItem;
            if(cview instanceof Ext.ux.calendar.ResultView){
                cview.list.getView().refresh();
            }
        },
        args:[this.ehandler],
        interval:1800000
    };
    Ext.ux.calendar.BackThread.superclass.constructor.call(this);
    this.runner.start(this.timelineTask);    
};

Ext.extend(Ext.ux.calendar.BackThread, Ext.util.Observable, {   
    destroy:function(){
        this.runner.stopAll();
    }
});