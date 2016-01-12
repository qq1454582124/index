function File(dataList) {
    this.dataList = [];
    this.recycle = [];//把删除的对象存入文件对象的回收站
    this.length = dataList.length;
    this.init(dataList);//调用File.prototype.init
}
File.prototype.init = function(dataList) {//把json格式的dataList转成以id作为下标的数组
	var arr = [];
	this.length = 0;
    for (var i=0; i<dataList.length; i++) {
    	if (dataList[i]) {
    		this.length++;
    		arr[dataList[i].id] = dataList[i];
    	}
    }
    this.dataList = arr;
    //console.log(this);
}
File.prototype.getChildren = function(id) {//获取子节点
    var arr = [];
    for (var i in this.dataList) {
        if (this.dataList[i].pid == id) {//通过父id找子节点
            arr.push(this.dataList[i]);
        }
    }
    return arr;
}
File.prototype.getChildrenByRecent = function(deadline) {//获取最近文件列表，deadline是转成数字的日期
    var arr = [];
    for (var i in this.dataList) {
        if (Date.parse(this.dataList[i].time) > deadline) {//如果文件日期大于deadline
            arr.push(this.dataList[i]);
        }
    }
    return arr;
}
File.prototype.getChildrenByNameSort = function(id) {//数据按名称正序排序
    var arr = [];
    for (var i in this.dataList) {
        if (this.dataList[i].pid == id) {//通过父id找子节点
            arr.push(this.dataList[i]);
        }
    }
    arr.sort( function( a , b ){
        return a.name.charCodeAt() - b.name.charCodeAt();
    });
    return arr;
}
File.prototype.getChildrenByTimeSort = function(id) {//数据按时间倒序排序
    var arr = [];
    for (var i in this.dataList) {
        if (this.dataList[i].pid == id) {//通过父id找子节点
            arr.push(this.dataList[i]);
        }
    }
    arr.sort( function( a , b ){
        return Date.parse(b.time) - Date.parse(a.time);//把时间字符串转成日期
    });
    return arr;
}
File.prototype.getChildrenByType = function(type) {//获取子节点
    var arr = [];
    for (var i in this.dataList) {
        if (this.dataList[i].type == type) {//通过父id找子节点
            arr.push(this.dataList[i]);
        }
    }
    return arr;
}
File.prototype.getChildrenByTypes = function(types) {//根据多种类型获取子节点
    var arr = [];
    for (var i in this.dataList) {
        for(var j=0;j<types.length;j++){
            if (this.dataList[i].type == types[j]) {//通过父id找子节点
                arr.push(this.dataList[i]);
            }
        }
    }
    return arr;
}
File.prototype.isParent = function(id) {//判断是否是父节点
    return !!this.getChildren(id).length;
}
File.prototype.getInfo = function(id) {

}
File.prototype.setPid = function(id,childrenIds) {//拖拽后产生新的子节点，id是碰撞上的元素，childrenIds是选中的被拖拽元素
    for (var i in this.dataList) {
        for(var j=0;j<childrenIds.length;j++){
            if (this.dataList[i].id == childrenIds[j]) {
                this.dataList[i].pid = id;
            }
        }
    }
}

/*新建div保存到this.dataList中*/
File.prototype.save = function(d) {
    this.dataList[d.id] = d;
}

/*从this.dataList中批量删除div*/
File.prototype.remove = function(ids) {
    for (var i in this.dataList) {
        for(var j=0;j<ids.length;j++){
            if (this.dataList[i].id == ids[j]) {
                this.recycle.push(this.dataList[i]);//把删除的对象存入文件对象的回收站
                this.dataList[i] = null;
                break;
            }
        }
    }
    this.init(this.dataList);
}


/*根据id重命名this.dataList中的当前元素*/
File.prototype.rename = function(id, name) {
    for (var i in this.dataList) {
        if (this.dataList[i].id == id) {
            this.dataList[i].name = name;
            //console.log(this.dataList[i].name);
            break;//找到后就退出循环，提高性能
        }
    }
}

/*根据id获取当前元素*/
File.prototype.getById = function(id) {
    return this.dataList[id];
}

/*获取当前元素的pid*/
File.prototype.getPid = function(id) {
    return this.dataList[id].pid;
}

/*返回this.dataList所有id的最大值*/
File.prototype.getMaxId = function() {
    var maxId = 0;
    for (var i in this.dataList) {
        if (maxId < this.dataList[i].id) {
            maxId = this.dataList[i].id;
        }
    }
    return maxId;
}


/*从文件对象的回收站中获取被删除了的元素*/
File.prototype.getFormRecycle = function() {
    return this.recycle;
}


/*清空文件对象的回收站*/
File.prototype.clearRecycle = function() {
    this.recycle = [];
}


/*通过ID获取元素的类型*/
File.prototype.getTypeById = function(id) {//获取子节点
    return this.dataList[id].type;
}



/*通过ID判断子级元素的类型是否包含folder类型的子级*/
File.prototype.isChildrenContainFolder = function(id) {//获取子节点
    for (var i in this.dataList) {
        if ((this.dataList[i].pid == id) && (this.dataList[i].type == 'folder')) {//通过父id找子节点
            return true;//子级类型是folder类型
        }
    }
    return false;
}