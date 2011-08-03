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

Ext.ux.calendar.LayoutGrid = function(config){
	Ext.apply(this, config);
	this.CALENDAR_ROW_NUM = this.ehandler.rowCount;
	this.blockId = 0;
	this.grid = new Array();    
    this.wholeList = [];
    this.heventList = [];
    this.hwholeList = [];
    this.visited = {};
    this.crossVisited = {};
};

Ext.ux.calendar.LayoutGrid.prototype = {    
    getAllEvents: function(){
        var events = this.getEventList();
        events = this.owner.getWholeList(this.cview, this.day, true, true).concat(events);
        return events;
    },
    
	getEventList: function(){		
		var eventList = new Array();        
		var blockId = -1;
		for(var i = 0; i < this.CALENDAR_ROW_NUM; i++){
			var line = this.grid[i];
			if(-1 == blockId){
				if(null != line.block){
					blockId = line.block.id;
					eventList = eventList.concat(line.block.eventList);
				}
			}else if(null != line.block){
				if(blockId != line.block.id){
					blockId = line.block.id;
					eventList = eventList.concat(line.block.eventList);
				}
			}
		}				
		return eventList;
	},

    removeOutDeletedCalendar:function(eventList){
        /*
         *  remove out event of deleted calendar
         */
        var eh = this.ehandler;
        var i, len, arr = [];
        for(i = 0, len = this.heventList.length; i < len; i++){
            var event = this.heventList[i];
            if(eh.calendarSet[event.calendarId]){
               arr.push(event);
            }
        }
        this.heventList = arr;
        arr = [];
        for(i = 0, len = eventList.length; i < len; i++){
			var event = eventList[i];
			if(eh.calendarSet[event.calendarId]){
				arr.push(event);
			}
		}           
        return arr;
    },

    refreshRepeatEvent:function(eventList){
        /*
         *  remove out repeat event from eventlist and heventlist
         */        
        var i, len, arr = [];
        for(i = 0, len = this.heventList.length; i < len; i++){
            var event = this.heventList[i];
            if('string' == Ext.ux.calendar.Mask.typeOf(event.repeatType)){
               arr.push(event);
            }
        }
        this.heventList = arr;
        arr = [];
        for(i = 0, len = eventList.length; i < len; i++){
			var event = eventList[i];
			if('string' == Ext.ux.calendar.Mask.typeOf(event.repeatType)){
				arr.push(event);
			}
		}
        var res = this.owner.getRepeatEvent(this.cview, this.day);
        arr = this.owner.combine2List(res, arr);
        return arr;
    },

	filterEvent:function(eventList){
		var eh = this.ehandler;
		var selist = [];		
		var arr = [];
		var i, j, len;      
        if(this.deleteCalendar){
            this.deleteCalendar = false;
            eventList = this.removeOutDeletedCalendar(eventList);
        }
        if(this.hideCalendar){
            this.hideCalendar = false;            
            for(i = 0, len = this.heventList.length; i < len; i++){
                var event = this.heventList[i];
                if(!eh.calendarSet[event.calendarId].hide){
                    selist.push(event);
                }else{
                    arr.push(event);
                }
            }
            this.heventList = arr;
            arr = [];
            for(i = 0, len = eventList.length; i < len; i++){
                var event = eventList[i];
                if(!eh.calendarSet[event.calendarId].hide){
                    arr.push(event);
                }else{
                    this.heventList.push(event);
                }
            }
            eventList = this.owner.combine2List(arr, selist);
            
            eventList = this.refreshRepeatEvent(eventList);
        }
        if(this.updateRepeat){
            this.updateRepeat = false;
            eventList = this.refreshRepeatEvent(eventList);
        }
		return eventList;
	},		
	
	reLayout: function(single, nowhole){
		return this.generateLayout(this.getEventList(), true, single, nowhole);
	},
		
	increaseLine: function(line, lstArea, lstIndex){
		while(lstIndex > line.areaList.length){
			line.areaList[line.areaList.length]	= null;
		}
		line.areaList[line.areaList.length] = lstArea;
	},
	
	addArea: function(line, area, colIndex){
		if(line.areaList.length < colIndex + 1){
			this.increaseLine(line, area, colIndex);
		}else{
			line.areaList[colIndex] = area;
		}
	},
	
	generateArea: function(event, block, colIndex){
		for(var i = event.startRow; i < event.endRow; i++){
			var line = this.grid[i]; 
			line.block = block;			
			this.addArea(line, event, colIndex);
		}
	},
	
	getColIndex: function(line){
		var colIndex, size;		
		for(colIndex = 0, size = line.areaList.length; colIndex < size; colIndex++){
			var event = line.areaList[colIndex];
			if(null == event){								
				break;
			}
		}		
		return colIndex;
	},
	
	generateLayout: function(eventList, reload, single, nowhole){
        var elist = [], wlist = [];
        if(!reload){
            this.heventList = [];            
            elist = eventList;
        }else{
            elist = eventList;            
        }
   
        if(!nowhole){
            wlist = this.owner.getWholeList(this.cview, this.day, null, single);
        }
        elist = this.filterEvent(elist);
        if(!this.layouted){
            this.visited = {};
            if(this.cview){
                this.visited[this.cview.id] = true;
            }
            this.layouted = true;
			//clear grid first
			for(var i = 0; i < this.CALENDAR_ROW_NUM; i++){
				this.grid[i] = new Ext.ux.calendar.Line();	
			}
			this.blockId = 0;
			//Layouting events
			elist = this.Layouting(elist);
        }else{
            this.visited[this.cview.id] = true;
        }
		this.inited = true;
		return {
            elist:elist,
            wlist:wlist
        };
	},

	Layouting: function(eventList){		
		var eh = this.ehandler;
		var b2eMap = new Array();
		var block = null;
		for(var i = 0, size = eventList.length; i < size; i++){
			var event = eventList[i];
			var line = this.grid[event.startRow];
			//get the free postion in line for the event
			var colIndex = this.getColIndex(line);			
			//for check whether the value changed
			if(event.colIndex != colIndex){
				event.colIndex = colIndex;				
				event.changed = true;
			}
			//generate or update a block
			if(0 == line.areaList.length){
				block = new Ext.ux.calendar.Block();
				block.id = this.blockId++; 
			}else if(null != block){
				if(block.colNum < colIndex)
					block.colNum = colIndex;
			}
			line.block = block;
			//bind the event with a block
			b2eMap[b2eMap.length] = new Ext.ux.calendar.BlockMap(event, block);
			block.addEvent(event);
			//generate the areas covered by event
			this.generateArea(event, block, colIndex);
		}		
		//calculate the span for every event		
		for(var i = 0, size = b2eMap.length; i < size; i++){
			var b2e = b2eMap[i];
			var span = b2e.block.colNum + 1;
			if(span != b2e.event.span){
				b2e.event.span = span;
				b2e.event.changed = true;
			}
		}
		var arr = [];		
		for(var i = 0, len = eventList.length; i < len; i++){
			var event = eventList[i];			
			if(!eh.calendarSet[event.calendarId].hide){
				arr[arr.length] = event;
			}
		}
		eventList = arr;
		//for get max colIndex for every line
		var cols = {};
		for(var i = 0, len = eventList.length; i < len; i++){
			var event = eventList[i];
			var startRow = event.startRow;
			var endRow = event.endRow;
			for(var j = startRow; j < endRow; j++){
				if(!cols[j]){
					cols[j] = event;
				}else if(cols[j].colIndex < event.colIndex){
					cols[j] = event;
				}
			}			
		}
		for(var i = 0, len = eventList.length; i < len; i++){
			var event = eventList[i];
			var startRow = event.startRow;
			var endRow = event.endRow;
			var last = true;
			for(var j = startRow; j < endRow; j++){
				if(cols[j] && event.colIndex < cols[j].colIndex && cols[j].startRow >= event.startRow){
					last = false;
                    break;
				}
			}
			if(true === last){
				if(true !== event.last){
					event.last = true;
					event.changed = true;
				}
			}else{
				if(true === event.last){
					event.changed = true;
				}
				delete(event.last);
			}
		}
		return eventList;
	},

	updateLayout: function(event, action, force){
        this.visited = {};
        this.visited[this.cview.id] = true;
        if((0 == event.startRow && this.CALENDAR_ROW_NUM == event.endRow) || (event.day != event.eday)){
            var arr = [event];
            this.owner.updateWholeList(arr, action);
            return this.owner.getWholeList(this.cview, this.day);
        }else{
            var eventList = new Array();
            var startRow = event.startRow;
            var endRow = event.endRow;
            var i, size, colIndex = -1;
            /*
             * get the start line and end line of changed event
             */
            for(i = 0, size = this.grid.length; i < size; i++){
                var line = this.grid[i];
                if(colIndex == -1){
                    for(var j = 0, colNum = line.areaList.length; j < colNum; j++){
                        var area = line.areaList[j];
                        if(null == area)
                            continue;
                        if(area.eventId == event.eventId){
                            colIndex = j;
                            if(startRow > i){
                                startRow = i;
                            }
                            if(endRow < i+1){
                                endRow = i+1;
                            }
                        }
                    }
                }else{
                    if(line.areaList.length > colIndex){
                        if(null != line.areaList[colIndex]){
                            if(line.areaList[colIndex].eventId == event.eventId){
                                if(endRow < i+1){
                                    endRow = i+1;
                                }
                            }
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
            }
            /*
             * get all events inside the area
             */
            var blockId = -1;
            for(i = startRow; i < endRow; i++){
                var line = this.grid[i];
                if(-1 == blockId){
                    if(null != line.block){
                        blockId = line.block.id;
                        eventList = eventList.concat(line.block.eventList);                       
                    }
                }else if(null != line.block){
                    if(blockId != line.block.id){
                        blockId = line.block.id;
                        eventList = eventList.concat(line.block.eventList);                        
                    }
                }                
            }
            /*
             * update the event
             */
            //remove old one           
            if((action == 'update') || (action == 'delete')){                
                for(i = 0, size = eventList.length; i < size; i++){
                    var be = eventList[i];
                    if(event.eventId == be.eventId){                        
                        if('update' == action && true !== force && event.startRow == be.startRow && event.endRow == be.endRow){
                            delete(be.alertFlag);
                            Ext.apply(be, event);                            
                            return {
                                elist:[event]
                            };
                        }                        
                        eventList.splice(i, 1);
                        break;
                    }
                }
            }
            
            //add new one
            if((action == 'update') || (action == 'add')){
                for(i = 0, size = eventList.length; i < size; i++){
                    var sId = eventList[i].startRow;
                    var eId = eventList[i].endRow;
                    if(sId > event.startRow){
                        eventList.splice(i, 0, event);
                        break;
                    }else if(sId == event.startRow && eId <= event.endRow){
                        eventList.splice(i, 0, event);
                        break;
                    }
                }
                if(i == size){
                    eventList[eventList.length] = event;
                }
            }
            /*
             * get the areas which's layout will change
             */
            if(eventList[0]){
                if(startRow > eventList[0].startRow){
                    startRow = eventList[0].startRow;
                }
            }
            if(null != this.grid[endRow-1].block){
                if(endRow < this.grid[endRow-1].block.endRow){
                    endRow = this.grid[endRow-1].block.endRow;
                }
            }
            //reset changing areas and block
            for(i = startRow; i < endRow; i++){
                if(this.grid[i].areaList.length > 0){
                    this.grid[i].areaList.length = 0;
                }
                this.grid[i].block = null;
            }
            //set changed falg to false
            for(i = 0, size = eventList.length; i < size; i++){
                eventList[i].changed = false;
            }
            event.changed = true;
            //update layout for
            eventList = this.Layouting(eventList);
            //only return position or width changed event to js
            var backList = new Array();
            for(i = 0, size = eventList.length; i < size; i++){
                event = eventList[i];
                if(event.changed == true){
                    backList.push(event);
                }
            }
            return {
                elist:backList
            };
        }
	}
};