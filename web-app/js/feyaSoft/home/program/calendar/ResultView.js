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

Ext.ux.calendar.ResultView = function(config){
    Ext.apply(this, config);
    this.ehandler.applyCalendarSetting(this);
    
    this.pageSize = 20;
    var lan = Ext.ux.calendar.Mask.ResultView;

    var store = Ext.ux.calendar.Mask.getEventStore(Ext.ux.calendar.CONST.searchURL);
    var columns = [
        {header: '', sortable: true, menuDisabled:true, width: 20, dataIndex:'calendarId', renderer:this.hiddenRenderFn.createDelegate(this)},
        {header: '', sortable: true, menuDisabled:true, width: 20, dataIndex:'locked', renderer:this.lockedRenderFn.createDelegate(this)},
        {header: lan['cm.time'], dataIndex:'ymd', sortable: true, width: 140, renderer:this.fromtoRenderFn.createDelegate(this)},
        {header: lan['cm.calendar'], sortable: true, menuDisabled:true, width: 100, dataIndex: 'calendarId', renderer:this.calendarRenderFn.createDelegate(this)},        
        {header: lan['cm.subject'], sortable: true, width: 120, dataIndex:'subject', renderer:this.subjectRenderFn},
        {header: lan['cm.content'], sortable: true, width: 120, dataIndex:'description', renderer:this.contentRenderFn},
        {header: lan['cm.expire'], sortable: true, menuDisabled:true, width: 80, renderer:this.expireRenderFn.createDelegate(this)}        
    ];    
    this.groupBtn = new Ext.Button({
        iconCls:'icon_feyaCalendar_group',
        text:lan['groupBtn.group.text'],
        handler:this.onGroupFn,
        scope:this
    });
    this.returnBtn = new Ext.Button({
        iconCls:'icon_feyaCalendar_door_out',
        text:lan['returnBtn.text'],
        handler:this.onReturnFn,
        scope:this
    });
    var pbar = new Ext.PagingToolbar({
        pageSize:this.pageSize,
        store:store
    });
    pbar.on('render', this.onPageToolbarRenderFn, this);

    this.list = new Ext.grid.GridPanel({
        border:false,
        store:store,
        columns:columns,
        view: new Ext.grid.GroupingView({
            forceFit:true
        }),
        loadMask:{
            msg:lan['loadMask.msg']
        },        
        bbar:pbar
    });
    Ext.ux.calendar.ResultView.superclass.constructor.call(this, {
        layout:'fit',
        items:[this.list]
    });
    this.on('render', this.onRenderFn, this);    
    this.list.on('rowdblclick', this.onRowDblClickFn, this);
    this.list.on('rowclick', this.onRowClickFn, this);
    store.on('beforeload', this.onBeforeLoadFn, this);
    store.on('load', this.onLoadFn, this);
    store.clearGrouping();
};

Ext.extend(Ext.ux.calendar.ResultView, Ext.ux.calendar.BasicView, {    
    
    onBeforeLoadFn:function(store){
        store.removeAll();
    },

    onLoadFn:function(store, rds, options){
        for(var i = 0, len = rds.length; i < len; i++){
            var rd = rds[i];
            var rt = rd.data.repeatType;
            if('no' != rt && 'exception' != rt){
                rd.data.repeatType = Ext.decode(rt);
            }
        }
    },

    onGroupFn:function(btn){
        var lan = Ext.ux.calendar.Mask.ResultView;
        var store = this.list.getStore();
        if(lan['groupBtn.group.text'] == btn.getText()){
            btn.setText(lan['groupBtn.unGroup.text']);
            btn.setIconClass('icon_feyaCalendar_ungroup');
            store.groupBy('ymd');
        }else{
            btn.setText(lan['groupBtn.group.text']);
            btn.setIconClass('icon_feyaCalendar_group');
            store.clearGrouping();
        }
    },   

    onReturnFn:function(){
        var calendarContainer = this.ownerCt;
        calendarContainer.getLayout().setActiveItem(calendarContainer.currentIdx);
        calendarContainer.currentView.checkLayout(true);
    },

    onRenderFn:function(p){
        p.port = p.body;        
    },

    onPageToolbarRenderFn:function(t){
        t.add('->', this.groupBtn, '-', this.returnBtn);
    },

    onRowClickFn:function(grid, rowIndex, e){
        var target = e.getTarget();
        var tgEl = Ext.get(target);
        var eh = this.ehandler;
        var store = grid.getStore();
        var rd = store.getAt(rowIndex);
        var event = {
            eventId:rd.data.id,
            calendarId:rd.data.calendarId,
            startRow:parseInt(rd.data.startRow),
            endRow:parseInt(rd.data.endRow),
            subject:rd.data.subject,
            content:rd.data.description,
            day:rd.data.ymd,
            eday:rd.data.eymd,
            isShared:rd.data.isShared,
            alertFlag:rd.data.alertFlag,
            repeatType:rd.data.repeatType
        };
        var oevent = Ext.apply({}, event);
        if(tgEl.hasClass('x-calendar-resultview-lock')){
            if(tgEl.hasClass('icon_feyaCalendar_event_lock')){
                tgEl.removeClass('icon_feyaCalendar_event_lock');
                tgEl.addClass('icon_feyaCalendar_event_unlock');
                rd.set('locked', false);
                event['locked'] = false;
            }else if(tgEl.hasClass('icon_feyaCalendar_event_unlock')){
                tgEl.removeClass('icon_feyaCalendar_event_unlock');
                tgEl.addClass('icon_feyaCalendar_event_lock');
                rd.set('locked', true);
                event['locked'] = true;
            }
            store.commitChanges();
            var cc = this.ownerCt;
            var cview = cc.currentView;
            if('string' == Ext.type(rd.data.repeatType)){                
                eh.updateEvent(event, cview);
            }else{                
                eh.updateRepeatEvent(event, cview, oevent);
            }
        }
    },

    onRowDblClickFn:function(grid, rowIndex, e){
        var cc = this.ownerCt;
        var cview = cc.currentView;
        var eh = this.ehandler;
        var store = grid.getStore();
        var rd = store.getAt(rowIndex);
        if(!rd.data.locked){
            var rowEl = grid.getView().getRow(rowIndex);
            if(rowEl){
                rowEl = Ext.get(rowEl);
                rowEl.bindEvent = {
                    eventId:rd.data.id,
                    calendarId:rd.data.calendarId,
                    startRow:parseInt(rd.data.startRow),
                    endRow:parseInt(rd.data.endRow),
                    subject:rd.data.subject,
                    content:rd.data.description,
                    day:rd.data.ymd,
                    eday:rd.data.eymd,
                    isShared:rd.data.isShared,
                    alertFlag:rd.data.alertFlag,
                    locked:rd.data.locked,
                    repeatType:rd.data.repeatType
                };
                rowEl.cview = cview;
                var obj = {
                    bindEl:rowEl,
                    cview:this,
                    onLayout:function(event){
                        rd.set('calendarId', event.calendarId);
                        rd.set('subject', event.subject);
                        rd.set('description', event.content);
                        rd.set('ymd', event.day);
                        rd.set('eymd', event.eday);
                        rd.set('isShared', event.isShared);
                        rd.set('alertFlag', event.alertFlag);
                        rd.set('locked', event.locked);
                        rd.set('repeatType', event.repeatType);
                        store.commitChanges();
                    },
                    action:'update'
                }
                eh.editor.fireEvent('showdetailsetting', obj);
            }            
        }
    },

    calendarRenderFn:function(value, meta, rd, row, col, store){
        var legendStyle = 'height:9px;';
		var calendarId = rd.data.calendarId;
        var eh = this.ehandler;
        var calendar = eh.calendarSet[calendarId];
		var html = eh.calendarTpl.apply({
			'calendarId':calendar.id,
			'legend-style':legendStyle,
			'title':calendar.name,
            'color':calendar.color
		});
        return html;
    },

    fromtoRenderFn:function(value, meta, rd, row, col, store){
        var data = rd.data;
        data.startRow = Ext.ux.calendar.Mask.getRowFromHM(rd.data.startTime, this.intervalSlot);
        data.endRow = Ext.ux.calendar.Mask.getRowFromHM(rd.data.endTime, this.intervalSlot);
        data.day = data.ymd;
        data.eday = data.eymd;
        var html = this.ehandler.generateInfo(data);
        return html;
    },

    subjectRenderFn:function(value, meta, rd, row, col, store){
        var html = value || '';
        if('' == html.trim()){
            html = Ext.ux.calendar.Mask.ResultView['noSubject'];
        }
        return html;
    },

    contentRenderFn:function(value, meta, rd, row, col, store){
        var html = value || '';
        if('' == html.trim()){
            html = Ext.ux.calendar.Mask.ResultView['noContent'];
        }
        return html;
    },

    generateExpireHTML:function(data){
        var lan = Ext.ux.calendar.Mask.ResultView;
        var hour = data.hour;
        var html;
        if(-1 == hour){
            html = '<div style="border:1px solid silver;height:20px;line-height:20px;background:rgb(231,231,231);text-align:center;">' +
                '<b>Out of date</b>' +
           '</div>';
        }else if(0 <= hour && hour <= 24){
            html = '<div style="border:1px solid silver;height:20px;line-height:20px;background:rgb(249,66,51);text-align:center;">' +
                '<b>'+hour+' '+lan['hour']+'</b>' +
           '</div>';
        }else if(24 < hour && hour <= 72){
            html = '<div style="border:1px solid silver;height:20px;line-height:20px;background:rgb(255,255,164);text-align:center;">' +
                '<b>'+hour+' '+lan['hour']+'</b>' +
           '</div>';
        }else if(72 < hour){
            html = '<div style="border:1px solid silver;height:20px;line-height:20px;background:rgb(147,250,97);text-align:center;">' +
                '<b>'+hour+' '+lan['hour']+'</b>' +
           '</div>';
        }
        return html;
    },

    expireRenderFn:function(value, meta, rd, row, col, store){
        var endRow = Ext.ux.calendar.Mask.getRowFromHM(rd.data.endTime, this.intervalSlot);        
        var str = rd.data.ymd+' '+rd.data.endTime;
        var day = Date.parseDate(str, 'Y-m-d H:i');
        if(this.rowCount == endRow){
            day = day.add(Date.DAY, 1);
            str = day.format('Y-m-d H:i');
        }
        var offset = day.getElapsed();
        if((new Date()).format('Y-m-d H:i') >= str){
            return this.generateExpireHTML({
                hour:-1
            });
        }else{
            var hour = Math.round(offset/3600000);
            return this.generateExpireHTML({
                hour:hour                
            });
        }
    },

    hiddenRenderFn:function(value, meta, rd, row, col, store){
        var html;
        var cs = this.ehandler.calendarSet;
        if(cs[rd.data.calendarId].hide){
            html = '<div class="x-resultview-event-hide"></div>';
        }else{
            html = '<div class="x-resultview-event-show"></div>';
        }
        return html;
    },

    lockedRenderFn:function(value, meta, rd, row, col, store){
        var html;
        if(rd.data.locked){
            html = '<div class="x-calendar-resultview-lock icon_feyaCalendar_event_lock"></div>';
        }else{
            html = '<div class="x-calendar-resultview-lock icon_feyaCalendar_event_unlock"></div>';
        }
        return html;
    },

    loadEvents:function(text){
        var store = this.list.getStore();
        store.removeAll();
        this.matchText = text;
        store.baseParams = {
            text:text,
            userId:this.ehandler.mainPanel.userId
        };
        store.load({
            params:{                
                start:0,
                limit:this.pageSize
            }
        });
    },

    checkLayout:function(){        
        var store = this.list.getStore();
        store.reload();
    }    
});