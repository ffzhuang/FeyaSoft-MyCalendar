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
Ext.ns('Ext.ux.calendar');

Ext.ux.calendar.CalendarEditor = function(config){
	Ext.apply(this, config);

    var lan = Ext.ux.calendar.Mask.CalendarEditor;

    this.nameField = this.nameField || new Ext.form.TextField({
        name:'name',
		fieldLabel:lan['nameField.label'],
        allowBlank:false,
		anchor:'99%'
	});

	this.descriptionField = this.descriptionField || new Ext.form.TextField({
        name:'description',
		fieldLabel:lan['descriptionField.label'],
		anchor:'99%'
	});

    this.colorField = this.colorField || new Ext.ColorPalette({});
    this.colorField.on('select', this.onColorSelectFn, this);
    this.colorField.colors = Ext.ux.calendar.Mask.colors;

	this.clearBtn = this.clearBtn || new Ext.Button({
		iconCls:'icon_feyaCalendar_delete',
		minWidth:80,
		text:lan['clearBtn.text'],
		handler:this.onClearFn,
		scope:this
	});

	this.saveBtn = this.saveBtn || new Ext.Button({
		iconCls:'icon_feyaCalendar_accept',
		minWidth:80,
		text:lan['saveBtn.text'],
		handler:this.onSaveFn,
		scope:this
	});

	this.cancelBtn = this.cancelBtn || new Ext.Button({
		iconCls:'icon_feyaCalendar_cancel',
		minWidth:80,
		text:lan['cancelBtn.text'],
		handler:this.onCancelFn,
		scope:this
	});

	this.formpanel = this.formpanel || new Ext.form.FormPanel({
        cls:'x-calendar-menu',
		border:false,
		style:'padding:10px;',
		labelWidth: 70,
		items:[
            this.nameField,
			this.descriptionField,
            {
                border:false,
                style:'padding-left:60px;',
                items:[this.colorField]
            }
		],
		buttonAlign:'right',
		buttons:[this.clearBtn, this.saveBtn, this.cancelBtn]
	});

	Ext.ux.calendar.CalendarEditor.superclass.constructor.call(this, {		
		items:[{
			border:false,
			layout:'fit',
			items:[this.formpanel]
		}]
	});
};

Ext.extend(Ext.ux.calendar.CalendarEditor, Ext.Window, {
    width:500,

    height:160,

    closable:false,

    closeAction:'hide',

    layout:'fit',

    modal: true,

    resizable:false,

    onColorSelectFn:function(cp, color){
        this.color = Ext.ux.calendar.Mask.getIndexByColor(color);
    },

	popup:function(obj){        
		this.action = obj.action;
        this.show();
        var lan = Ext.ux.calendar.Mask.CalendarEditor;
		if('add' == obj.action){
			this.setTitle(lan['new.title']);
            this.setIconClass('icon_feyaCalendar_calendar');
		}else{
            this.setTitle(lan['edit.title']);
            this.setIconClass('icon_feyaCalendar_calendar_edit');
        }        
        if(obj.cEl){
            this.calendarEl = obj.cEl;
        }else{
            this.calendarEl = null;
        }
        var mask = Ext.ux.calendar.Mask;
        if(obj.data){
            this.calendar = obj.data;
            var data = obj.data;
            this.nameField.setValue(data.name);
            this.descriptionField.setValue(data.description);
            var color = data.color;
            var cl = Ext.ux.calendar.Mask.getColorByIndex(color);
            if(cl){
                this.colorField.select(cl);
            }else{
                this.colorField.select(mask.colors[0]);
            }
        }else{
            this.nameField.reset();
            this.descriptionField.reset();
            this.colorField.select(mask.colors[0]);
        }
	},

	onClearFn:function(){
		this.formpanel.form.reset();
	},

	onSaveFn:function(){
		if(this.formpanel.form.isValid()){
            var params = {};
            if(this.calendar){
                params.id = this.calendar.id;
                params.hide = this.calendar.hide;
            }else{
                params.hide = false;
            }
            params.name = this.nameField.getValue();
            params.description = this.descriptionField.getValue();
            params.color = this.color;
            var eh = this.ehandler;
            eh.ds.createUpdateCalendar(params, function(backObj){
                var cEl = this.calendarEl;
                if(cEl){
                    var oldColor = cEl.calendar.color;
                    var oldName = cEl.calendar.name;
                    Ext.apply(cEl.calendar, params);
                    var color = cEl.calendar.color;
                    eh.calendarSet[cEl.calendar.id] = cEl.calendar;
                    var titleEl = cEl.child('.x-calendar-title-b');
                    if(titleEl){
                        titleEl.dom.innerHTML = '<b>'+params.name+'</b>';                        
                    }
                    if(oldColor != color){
                        cEl.calendar.color = oldColor;
                        eh.changeColor(cEl.calendar, color);
                    }else if(oldName != params.name){
                        eh.checkExpireEvents();
                    }
                }else if(backObj.id){
                    var calendar = Ext.apply({}, params);
                    calendar.id = backObj.id;
                    eh.calendarSet[calendar.id] = calendar;
                    var mc = eh.mainPanel.westPanel.myCalendarPanel;
                    eh.createCalendar(mc.body, null, null, calendar);
                    var css = '.'+eh.id+'-x-calendar-'+calendar.id+'{}';
                    eh.ss[eh.ss.length] = Ext.util.CSS.createStyleSheet(css, Ext.id());
                }
            }, this);
			this.hide();
		}
	},

	onCancelFn:function(){
		this.hide();
	}
});