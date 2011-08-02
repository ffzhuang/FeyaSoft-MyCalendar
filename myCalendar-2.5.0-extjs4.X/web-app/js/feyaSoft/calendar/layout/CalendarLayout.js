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

Ext.ux.calendar.CalendarLayout = function(config){	
	Ext.apply(this, config);
	this.layoutSet = {};
    this.wholeList = [];
    this.repeatSet = {};
    this.tesdf="teddfd"
	Ext.ux.calendar.CalendarLayout.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.calendar.CalendarLayout, Ext.util.Observable, {
    getWholeList:function(cview, day, all, single){
    	var vDate=Ext.Date;
        var eh = this.ehandler;
        var cs = eh.calendarSet;
        var wlist = [];
        var arr = [];
        var sday, eday;
        if(single){
            sday = day;
            eday = day;
        }else{
            if(1 == cview.dayNum){
                sday = day;
                eday = day;
            }else{
                var colNum = cview.colNum || cview.dayNum;
                var cd =  vDate.parseDate(day, 'Y-m-d');
                var sd = eh.getStartDateInWeek(cd, cview);
                sday =  vDate.format(sd,'Y-m-d');
                eday =   vDate.format(vDate.add(sd,vDate.DAY, colNum-1),'Y-m-d');
            }
        }
        for(var i = 0, len = this.wholeList.length; i < len; i++){
            var e = this.wholeList[i];
            if(cs[e.calendarId]){
                if(!cs[e.calendarId].hide || all){
                    if(e.day == day || (sday == day && e.day < day && e.eday >= day)){
                        if(e.day < sday){
                            e.lflag = true;
                        }else{
                            delete(e.lflag);
                        }
                        if(e.eday > eday){
                            e.rflag = true;
                        }else{
                            delete(e.rflag);
                        }
                        wlist.push(e);
                    }
                }
                arr.push(e);
            }
        }
        this.wholeList = arr;
        wlist = this.combine2List(this.getRepeatEvent(cview, day, true, all, single), wlist);
        return wlist;
    },

    updateWholeList:function(arr, action){        
        if(arr){            
            if('add' == action){
                this.wholeList = this.combine2List(this.wholeList, arr);
            }else if('update' == action){
                for(var i = 0, len = arr.length; i < len; i++){
                    this.deleteFromList(this.wholeList, arr[i]);
                }
                this.wholeList = this.combine2List(this.wholeList, arr);
            }else if('delete' == action){
                for(var i = 0, len = arr.length; i < len; i++){
                    this.deleteFromList(this.wholeList, arr[i]);
                }
            }
        }
    },

    deleteFromList:function(arr, e){
        for(var i = 0, len = arr.length; i < len; i++){
            var w = arr[i];
            if(w.eventId == e.eventId){
                arr.splice(i, 1);
                break;
            }
        }
    },    

    deleteDayFromWholeList:function(day, eday, prevent){
        var cs = this.ehandler.calendarSet;
        eday = eday || day;
        var i, j, len = this.wholeList.length, wlist = [];;
        for(i = 0; i < len; i++){
            var w = this.wholeList[i];
            if(w.day > day){
                return wlist;
            }else if(!cs[w.calendarId].hide && w.day >= day && w.eday <= eday){
                break;
            }
        }        
        for(j = i; j < len; j++){
            var w = this.wholeList[j];
            if(!cs[w.calendarId].hide && w.day >= day && w.eday <= eday){                
                wlist.push(Ext.apply({}, w));
            }else{
                break;
            }
        }        
        if(!prevent){
            this.wholeList.splice(i, j-i);
        }
        return wlist;
    },

    changeDayInWholeList:function(oday, tday, keep){
        var cs = this.ehandler.calendarSet;
        var i, j, len = this.wholeList.length;
        for(i = 0; i < len; i++){
            var w = this.wholeList[i];
            if(w.day > oday){
                i = len;
                break;
            }else if(!cs[w.calendarId].hide && w.day >= oday && w.eday <= oday){
                break;
            }
        }
        var arr = [];
        for(j = i; j < len; j++){
            var w = this.wholeList[j];
            if(!cs[w.calendarId].hide && w.day >= oday && w.eday <= oday){
                var o = Ext.apply({}, w);
                o.day = tday;
                o.eday = tday;
                arr.push(o);                
            }else{
                break;
            }
        }        
        if(!keep){
            this.wholeList.splice(i, j-i);
        }
        this.wholeList = this.combine2List(this.wholeList, arr);
    },

	getLayout:function(day, cview, eventList, newFlag, refresh){
		if(day instanceof Date){
			day =  Ext.Date.format(day,'Y-m-d');
		}
	
        var fn = function(){
            var eh = this.ehandler;                
            var layout = new Ext.ux.calendar.LayoutGrid({
                owner:this,
                ehandler:eh,
                cview:cview,
                day:day,
                hideCalendar:true
            });   
         
            layout.viewChanged = true;    
            layout.generateLayout(eventList || []);
            this.layoutSet[day] = layout;
        };
        if(refresh){
            fn.call(this);
        }else{
        	
            if(!this.layoutSet[day]){
                if(true == newFlag){
                    fn.call(this);
                }else{
                    return null;
                }
            }else{
                if(this.layoutSet[day].cview !== cview){
                    this.layoutSet[day].viewChanged = true;
                }else{
                    this.layoutSet[day].viewChanged = false;
                }
                this.layoutSet[day].cview = cview;
            }
        }
      
		return this.layoutSet[day];
	},

    resetSingleLayout:function(layout, config, reLayout){
        layout.hideCalendar = config.hideCalendar;
        layout.deleteCalendar = config.deleteCalendar;
        layout.updateRepeat = config.updateRepeat;
        delete(layout.layouted);
        var v = layout.visited;
        if(reLayout){
            layout.reLayout();
        }
        if(layout.hideCalendar){
            for(var p in v){
                v[p] = 'hideCalendar';
            }
            layout.visited = v;
        }else if(layout.deleteCalendar){
            for(var p in v){
                v[p] = 'deleteCalendar';
            }
            layout.visited = v;
        }else if(layout.updateRepeat){
            for(var p in v){
                v[p] = 'updateRepeat';
            }
            layout.visited = v;
        }else{
            layout.visited = {};
        }
    },

    resetLayout:function(config, reLayout){
        for(var p in this.layoutSet){
            var layout = this.layoutSet[p];
            this.resetSingleLayout(layout, config, reLayout);
        }
    },

    checkRepeat:function(c, list, i){
        for(var len = list.length; i < len; i++){
            var e = list[i];
            if(!(e.day == c.day && e.eday == c.eday && e.startRow == c.startRow && e.endRow == c.endRow)){
                return false;
            }
            if(e.eventId == c.eventId){
                return true;
            }
        }
        return false;
    },

    wrapRowIndex:function(rowIndex){
        if(rowIndex < 10){
            rowIndex = '0'+rowIndex;
        }
        return rowIndex;
    },

    combine2List:function(alist, blist){
		var nlist = [];
		var alen = 0, blen = 0;
        if(alist){
            alen = alist.length;
        }
        if(blist){
            blen = blist.length
        }
        var i, j;
		for(i = 0, j = 0; i < alen && j < blen; ){
			var a = alist[i];
			var b = blist[j];
            var ast = a.day+'-'+this.wrapRowIndex(a.startRow), aet = a.eday+'-'+this.wrapRowIndex(a.endRow);
            var bst = b.day+'-'+this.wrapRowIndex(b.startRow), bet = b.eday+'-'+this.wrapRowIndex(b.endRow);
			if(ast < bst || (ast == bst && aet > bet)){
				nlist.push(a);
				i++;
			}else{
                if(!this.checkRepeat(b, alist, i)){
                    nlist.push(b);
                }
				j++;
			}
		}
		if(i == alen){
			for(; j < blen; j++){
				var b = blist[j];
				nlist.push(b);
			}
		}
		if(j == blen){
			for(; i < alen; i++){
				var a = alist[i];
				nlist.push(a);
			}
		}
		return nlist;
	},

    updateRepeatEventList:function(cview, arr, action){
        if('add' == action || 'update' == action){
            for(var i = 0, len = arr.length; i < len; i++){
                var e = arr[i];
                this.repeatSet[e.eventId] = e;
            }
        }else if('delete' == action){
            for(var i = 0, len = arr.length; i < len; i++){
                var e = arr[i];
                delete(this.repeatSet[e.eventId]);
            }
        }        
        this.resetLayout({
            hideCalendar:false,
            deleteCalendar:false,
            updateRepeat:true
        }, true);
        cview.checkLayout();
    },

    getRepeatEvent:function(cview, day, whole, all, single){
        var eh = this.ehandler;
        var cd, sday, eday;
        if(whole){
            cd = Ext.Date.parseDate(day, 'Y-m-d');
            if(single){
                sday = day;
                eday = day;
            }else{
                if(1 == cview.dayNum){
                    sday = day;
                    eday = day;
                }else{
                    var colNum = cview.colNum || cview.dayNum;
                    var sd = eh.getStartDateInWeek(cd, cview);
                    sday =  Ext.Date.format(sd,'Y-m-d');
                    eday = Ext.Date.format( Ext.Date.add(sd,Date.DAY, colNum-1),'Y-m-d');
                }
            }
        }        
        var arr = [], newset = {};
        var rset = this.repeatSet, cs = eh.calendarSet;
        for(var p in rset){
            var re = rset[p];
            var c = cs[re.calendarId];
            if(c){
                if(!c.hide || all){
                    var e;
                    var rt = re.repeatType;
                    var dspan = rt.dspan;
                    if(!whole){
                        if(0 == dspan && (0 != re.startRow || eh.rowCount != re.endRow)){
                            /*
                             * handle in-day event
                             */
                            e = Ext.ux.calendar.RepeatType.getEvent(re, day);
                            if(e){
                                arr = this.combine2List(arr, [e]);
                            }
                        }                        
                    }else if(0 < dspan || (0 == re.startRow && eh.rowCount == re.endRow)){
                        /*
                         * handle whole day event
                         */
                        if(sday == day){
                            /*
                             * handle the left-join event
                             */
                            for(var i = 0; i <= dspan; i++){
                                var d = Ext.Date.format(Ext.Date.add(cd,Date.DAY, -i),'Y-m-d');
                                e = Ext.ux.calendar.RepeatType.getEvent(re, d);
                                if(e){
                                    if(e.day < sday){
                                        e.lflag = true;
                                    }else{
                                        delete(e.lflag);
                                    }
                                    if(e.eday > eday){
                                        e.rflag = true;
                                    }else{
                                        delete(e.rflag);
                                    }
                                    arr = this.combine2List(arr, [e]);
                                }
                            }
                        }else{
                            e = Ext.ux.calendar.RepeatType.getEvent(re, day);
                            if(e){
                                if(e.day < sday){
                                    e.lflag = true;
                                }else{
                                    delete(e.lflag);
                                }
                                if(e.eday > eday){
                                    e.rflag = true;
                                }else{
                                    delete(e.rflag);
                                }
                                arr = this.combine2List(arr, [e]);
                            }
                        }                        
                    }                    
                }
                newset[re.eventId] = re;
            }
        }
        this.repeatSet = newset;
        return arr;
    },

    showWeek:function(cview, tbody, week, eventSet, stop){
        var eh = this.ehandler;
        var vDate=Ext.Date;
        cview.cleanup(week, true);
        var colNum = cview.colNum || cview.dayNum, dayNum = cview.shiftDay || cview.dayNum, daySet = cview.daySet;
        var table = [], mline = [];
        for(var j = 0; j < dayNum; j++){
            mline.push(0);
        }
        var sdate = eh.getStartDateInWeek(cview.daySet[week*dayNum], cview);
        var sday =  vDate.format(sdate,'Y-m-d');
        var si = cview.startColIndex, ei = cview.endColIndex;
        for(var j = 0; j < colNum; j++){
            var index = week*dayNum+j+si;
            var day = daySet[index];
            var dayStr =  vDate.format(day,'Y-m-d');
            var eventList = eventSet[dayStr];
            /*
             * if stop is true, then no need relayout
             */
            if(!stop){
                var layout = this.getLayout(dayStr, cview, eventList || [], true);
                var rs = layout.reLayout();
                eventList = rs.wlist.concat(rs.elist);
            }
            for(var k = 0, len = eventList.length; k < len; k++){
                var e = Ext.apply({}, eventList[k]);
                var dnum = Ext.ux.calendar.Mask.getDayOffset((sday < e.day)?e.day:sday, e.eday);
                var epos = j+dnum;
                if(epos >= colNum){
                    epos = colNum-1;
                }
                this.insert2Table(table, j, epos, e, mline, cview.lineNum);
            }
        }
        /*
         * need relayout for weekend too, or will have exception
         * 
         */
        for(var j = 0; j < si; j++){
            var index = week*dayNum+j;
            var day = daySet[index];
            var dayStr =  vDate.format(day,'Y-m-d');
            var eventList = eventSet[dayStr];
            if(!stop){
                var layout = this.getLayout(dayStr, cview, eventList || [], true);
                var rs = layout.reLayout();
                eventList = rs.wlist.concat(rs.elist);
            }
        }
        for(var j = ei; j < cview.dayNum; j++){
            var index = week*dayNum+j;
            var day = daySet[index];
            var dayStr =  vDate.format(day,'Y-m-d');
            var eventList = eventSet[dayStr];
            if(!stop){
                var layout = this.getLayout(dayStr, cview, eventList || [], true);
                var rs = layout.reLayout();
                eventList = rs.wlist.concat(rs.elist);
            }
        }
        this.checkMore(cview, mline, table);
        var tr = this.generateTR(cview, table, week);
        if(tr && 0 < tr.length){
            if(tbody.insertAdjacentHTML && !Ext.isIE){
                tr = tr.join('');
                tbody.insertAdjacentHTML('beforeEnd', tr);
            }else{
                for(var k = 0, len = tr.length; k < len; k++){
                    Ext.core.DomHelper.append(tbody, tr[k]);
                }
            }
            this.bindEvent2Table(cview, table, tbody);
        }
    },

    insert2Table:function(table, spos, epos, e, mline, limit){
        var flag = false, tr;
        for(var i = 0, len = table.length; i < len; i++){
            tr = table[i];
            flag = true;
            for(var j = spos; j <= epos; j++){
                if(tr[j]){
                    flag = false;
                    break;
                }
            }
            if(flag){
                break;
            }
        }
        if(!flag){
            if(!limit || table.length < limit){
                tr = {};
                table.push(tr);
                flag = true;
            }else{
                for(var j = spos; j <= epos; j++){
                    mline[j]++;
                }
            }
        }
        if(flag){
            var span = epos-spos+1;
            for(var j = spos; j <= epos; j++){
                tr[j] = {
                    span:span,
                    event:e
                };
            }
        }
        return flag;
    },

    checkMore:function(cview, mline, table){
        if(0 < table.length){
            var colNum = cview.colNum || cview.dayNum;
            var tr = table[table.length-1];
            for(var i = 0; i < colNum; ){
                var td = tr[i];
                if(td){
                    var span = td.span;
                    var flag = false;
                    for(var j = 0; j < span; j++){
                        if(0 < mline[i+j]){
                            flag = true;
                            break;
                        }
                    }
                    if(flag){
                        for(var j = 0; j < span; j++){
                            var index = i+j;
                            var t = tr[index];
                            t.span = 1;
                            t.event = (0 >= mline[index])?1:mline[index]+1;
                        }
                    }
                    i += span;
                }else{
                    if(0 < mline[i]){
                        tr[i] = {
                            span:1,
                            event:mline[i]
                        };
                    }
                    i++;
                }
            }
        }
        return table;
    },

    generateTR:function(cview, rows, w){
        var eh = this.ehandler;
        var lan = Ext.ux.calendar.Mask.EventHandler;
        var colNum = cview.colNum || cview.dayNum, dayNum = cview.shiftDay, daySet = cview.daySet;
        var si = cview.startColIndex;
        var tr = [];
        var rowNum = rows.length;
        for(var i = 0; i < rowNum; i++){
            var row = rows[i];
            var str = '';
            for(var j = 0; j < colNum; ){
                if(!row[j]){
                    str += '<td></td>';
                    j++;
                }else{
                    var span = row[j].span;
                    var e = row[j].event;
                    var html;
                    if('number' == Ext.type(e)){
                        var day = Ext.Date.format(daySet[w*dayNum+j+si],'Y-m-d');
                        html = '<div class="x-event-more-ct">' +
                        '<u><b name="'+day+'" class="x-event-more">&nbsp;&nbsp;&nbsp;&nbsp;'+e+' '+lan['more']+'...</b></u>' +
                        '</div>';
                    }else{
                        html = eh.generateLegend(cview, e);
                    }
                    str += '<td colspan="'+span+'">'+html+'</td>';
                    j += span;
                }
            }
            str = '<tr>'+str+'</tr>';
            tr.push(str);
        }
        if(0 < tr.length){
            return tr;
        }
    },

    bindEvent2Table:function(cview, rows, root){
        var colNum = cview.colNum || cview.dayNum;
        var rowNum = rows.length;
        for(var i = 0; i < rowNum; i++){
            var row = rows[i];
            for(var j = 0; j < colNum; ){
                if(!row[j]){
                    j++;
                }else{
                    var span = row[j].span;
                    var e = row[j].event;
                    var els = Ext.DomQuery.select('div[name=x-event-'+e.day+'-'+e.eday+'-'+e.eventId+']', root);
                    for(var k = 0, len = els.length; k < len; k++){
                        var El = Ext.get(els[k]);
                        El.bindEvent = e;
                        El.cview = cview;
                    }
                    j += span;
                }
            }
        }
    }
});