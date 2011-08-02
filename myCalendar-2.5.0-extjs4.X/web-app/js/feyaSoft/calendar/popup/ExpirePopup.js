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
Ext.ns("Ext.ux.calendar.popup");

Ext.ux.calendar.popup.ExpirePopup = function(config){
    Ext.apply(this, config);

    var lan = Ext.ux.calendar.Mask.ExpirePopup;
    
    var p;
    if(Ext.isIE){
        p = 96;
    }else{
        p = 100;
    }
    this.tpl = new Ext.XTemplate(
        '<tpl for=".">' +
            '<div style="background-color:{color};" class="x-calendar-alert-board" >' +
                '<div><table width="'+p+'%"><tbody>' +
                    '<tr>' +
                        '<td style="font-size:11px;"><b>From: {startDate}</b><br><b>To: </b><b>{endDate}</b></td>' +
                        '<td style="text-align:right;font-size:11px;">'+lan['tpl.calendar']+': <b>{calendar}</b></td>' +
                    '</tr>' +
                '</tbody></table></div>' +
                lan['tpl.subject']+': <b><u>{subject}</u></b><br>' +
                lan['tpl.content']+': {content}<br>' +
                '<table width="'+p+'%"><tbody><tr>' +
                    '<td style="font-size:11px;">'+lan['tpl.leftTime']+': <b>{left}</b></td>' +
                    '<td style="font-size:11px;"><a eid="{eventId}" class="x-calendar-edit-event" href="#">'+lan['editEvent']+'</a></td>' +
                '</tr></tbody></table></div>' +
            '</div>' +
        '</tpl>'
    );
    this.tpl.compile();

    this.viewpanel = new Ext.Panel({
        region:'center',
        autoScroll:true,
        bodyStyle:'background:transparent;',
        border:false
    });

    this.hideCB = new Ext.form.Checkbox({
        boxLabel:lan['hideCB.label']
    });

    Ext.ux.calendar.popup.ExpirePopup.superclass.constructor.call(this, {
        iconCls:'icon_feyaCalendar_clock',
        title:lan['title'],
        width:300,
        height:200,
        closable:true,
        plain:false,
        draggable:false,
        resizable:false,
        closeAction:'hide',
        layout:'border',
        animCollapse:false,
        tools:[{
            id:'down',
            handler:this.onDownFn,
            scope:this
        }, {
            id:'up',
            hidden:true,
            handler:this.onUpFn,
            scope:this
        }],
        items:[
            this.viewpanel,
            {
                border:false,
                region:'south',
                height:25,
                bodyStyle:'background:transparent;padding:5px;',
                items:[this.hideCB]
            }
        ]
    });
    this.on('render', this.onRenderFn, this);
    this.on('show', this.onShowFn, this);
};

Ext.extend(Ext.ux.calendar.popup.ExpirePopup, Ext.Window, {
    manager:{
		register:Ext.emptyFn,
		unregister:Ext.emptyFn,
		bringToFront:Ext.emptyFn,
		sendToBack:Ext.emptyFn
	},

    onRenderFn:function(p){
        p.body.on('click', this.onBodyClickFn, this);
    },

    onBodyClickFn:function(e){
        var target = e.getTarget();
        var tgEl = Ext.get(target);
        if(tgEl.hasClass('x-calendar-edit-event')){
            var eh = this.ehandler;
            var cc = eh.mainPanel.calendarContainer;
            var cview = cc.currentView;
            var eid = target.getAttribute('eid');
            var els = Ext.DomQuery.select('div[eid='+eid+']');
            if(0 < els.length){
                var eEl = Ext.get(els[0]);                                
                cc.onShowDetailSettingFn({
                    bindEl:eEl,
                    action:'update',
                    cview:cview
                });
            }
        }
    },

    changeTool:function(id){
        if('up' == id){
            this.tools['down'].hide();
            this.tools['up'].show();
        }else{
            this.tools['up'].hide();
            this.tools['down'].show();
        }
    },

    onUpFn:function(event, tEl, p){
        this.changeTool('down');
        var ch = this.getSize().height;
        this.expand();
        var eh = this.getSize().height;
        var pos = this.getPosition(true);
        this.setPosition(pos[0], pos[1]+ch-eh);
    },

    onDownFn:function(event, tEl, p){
        this.changeTool('up');
        var eh = this.getSize().height;
        this.collapse();
        var ch = this.getSize().height;
        var pos = this.getPosition(true);
        this.setPosition(pos[0], pos[1]+eh-ch);
    },

    sortEvents:function(events){
        var arr = [];
        for(var k = 0, count = events.length; k < count; k++){
            var e = events[k];
            var len = arr.length;
            for(var i = len-1; i >= 0; i--){
                var a = arr[i];
                if(a.endRow > e.endRow){
                    arr[i+1] = a;
                }else{
                    break;
                }
            }
            arr[i+1] = e;
        }
        return arr;
    },

    isChanged:function(events){
        if(this.activedEvents){
            var len = events.length;
            if(len == this.activedEvents.length && 0 != len){
                for(var i = 0; i < len; i++){
                    var e = events[i];
                    var a = this.activedEvents[i];
                    if(!(e.eventId == a.eventId && e.day == a.day && e.eday == a.eday && e.startRow == a.startRow && e.endRow == a.endRow)){
                        return true;
                    }
                }
            }else{                
                return true;
            }
        }else{            
            return true;
        }
        return false;
    },

    popup:function(events){
        var eh = this.ehandler;        
        var lan = Ext.ux.calendar.Mask.ExpirePopup;
        var now = new Date();        
        for(var i = 0, len = events.length; i < len; i++){
            var event = events[i];            
            var time = Date.parseDate(event.endDate, 'Y-m-d H:i');
            var left = Math.round(now.getElapsed(time)/60000);            
            var hour = Math.floor(left/60);
            var minute = left%60;
            event['subject'] = event['subject'] || lan['untitled'];
            event['content'] = event['content'] || lan['noContent'];
            event['calendar'] = eh.calendarSet[event.calendarId].name;
            event['left'] = hour+' '+lan['hour']+' '+minute+' '+lan['minute'];
        }
        var sFlag = !this.hideCB.getValue() && this.isChanged(events);        
        
        if(this.isVisible()){
            this.activedEvents = events;
            if(this.collapsed){
                this.onUpFn();
            }
            this.onShowFn();
        }else if(sFlag){
            this.activedEvents = events;
            this.show();
            this.expand();
            this.changeTool('down');
            var taskBar = Ext.get('ux-taskbar');
            if(taskBar){
                this.el.alignTo(taskBar, "br-tr", [ -1, -1]);
            }else{
                this.el.alignTo(Ext.getBody(), "br-br", [ -10, -10]);
            }
            this.el.slideIn('b', {
                duration:.7
            });
        }
    },

    onShowFn:function(p){
        var len = this.activedEvents.length;
        if(0 < len){
            this.setTitle(Ext.ux.calendar.Mask.ExpirePopup['title']+'('+len+')');
            var html = this.tpl.apply(this.activedEvents);
            this.viewpanel.body.update(html);
            this.viewpanel.body.highlight('#c3daf9', {block:true});
        }else{
            this.hide();
        }
    }
});