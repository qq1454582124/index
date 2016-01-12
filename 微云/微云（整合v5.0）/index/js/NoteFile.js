function NoteFile(dataList) {
    this.dataList = [];
    this.length = dataList.length;
    this.init(dataList);//NoteFile.prototype.init
}
NoteFile.prototype.init = function(dataList) {//把json格式的dataList转成以id作为下标的数组
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


NoteFile.prototype.getNoteList = function() {//获取笔记列表
    var arr = [];
    for (var i in this.dataList) {
        arr.push(this.dataList[i]);
    }
    return arr;
}


/*新建笔记保存到this.dataList中*/
NoteFile.prototype.save = function(d) {
    this.dataList[d.id] = d;
}


/*返回this.dataList所有id的最大值*/
NoteFile.prototype.getMaxId = function() {
    var maxId = 0;
    for (var i in this.dataList) {
        if (maxId < this.dataList[i].id) {
            maxId = this.dataList[i].id;
        }
    }
    return maxId;
}