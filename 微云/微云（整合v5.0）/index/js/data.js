var fileData = [
     {
        id : 0,
        pid : -1,
        name : '微云',
        type : 'rootfolder',
        time : '2015-01-12 15:41',
        size : '12.5k'
    },
    {
        id : 1,
        pid : 0,//pid是0的节点是顶级节点
        name : 'QQ文件1',
        type : 'folder',
        time : '2015-01-11 14:27',
        size : '17.2k'
    },
    {
        id : 2,
        pid : 4,//pid是0的节点是顶级节点
        name : 'QQ文件2',
        type : 'folder',
        time : '2015-01-05 13:02',
        size : '18k'
    },
    {
        id : 3,
        pid : 4,
        name : 'QQ文件3',
        type : 'folder',
        time : '2015-01-02 13:50',
        size : '16.5k'
    },
    {
        id : 4,
        pid : 0,//pid是0的节点是顶级节点
        name : 'CQQ文件4',
        type : 'folder',
        time : '2015-01-13 09:52',
        size : '22.8k'
    },
    {
        id : 5,
        pid : 4,//pid是0的节点是顶级节点
        name : 'QQ文件5',
        type : 'folder',
        time : '2015-01-05 18:07',
        size : '32.6k'
    },
    {
        id : 6,
        pid : 2,
        name : 'QQ文件6',
        type : 'folder',
        time : '2014-12-13 10:06',
        size : '23.5k'
    },
    {
        id : 7,
        pid : 0,
        name : '最新QQ文件7QQ文件7QQ文件7QQ文件7QQ文件7QQ文件7QQ文件7',
        type : 'folder',
        time : '2015-01-10 12:06',
        size : '16.2k'
    },
    {
        id : 8,
        pid : 2,
        name : 'QQ文件8',
        type : 'folder',
        time : '2014-12-17 09:32',
        size : '18.3k'
    },
    {
        id : 9,
        pid : 0,
        name : 'FQQ文件9-mp3',
        type : 'mp3',
        time : '2015-01-11 12:25',
        size : '19.5k'
    },
    {
        id : 10,
        pid : 0,
        name : '更新QQ文件10',
        type : 'folder',
        time : '2015-01-02 16:45',
        size : '35.3k'
    },
    {
        id : 11,
        pid : 1,
        name : 'QQ文件11',
        type : 'folder',
        time : '2015-01-02 12:36',
        size : '13.3k'
    },
    {
        id : 12,
        pid : 2,
        name : 'QQ文件12',
        type : 'folder',
        time : '2015-01-04 22:05',
        size : '32.9k'
    },
    {
        id : 13,
        pid : 0,
        name : 'AQQ文件13-doc',
        type : 'doc',
        time : '2015-01-06 20:05',
        size : '42.2k'
    },
    {
        id : 14,
        pid : 8,
        name : 'QQ文件14',
        type : 'folder',
        time : '2015-01-04 20:17',
        size : '30.9k'
    },
    {
        id : 15,
        pid : 18,
        name : 'QQ文件15-jpg',
        type : 'jpg',
        time : '2015-01-03 01:12',
        size : '29.3k'
    },
    {
        id : 16,
        pid : 1,
        name : 'QQ文件16',
        type : 'folder',
        time : '2015-01-01 21:42',
        size : '52.1k'
    },
    {
        id : 17,
        pid : 0,
        name : 'QQ文件17-xls',
        type : 'xls',
        time : '2015-01-06 13:42',
        size : '34.7k'
    },
    {
        id : 18,
        pid : 10,
        name : 'QQ文件18',
        type : 'folder',
        time : '2015-01-03 11:15',
        size : '53.8k'
    },
    {
        id : 19,
        pid : 0,
        name : 'PQQ文件19-jpg',
        type : 'jpg',
        time : '2015-01-05 03:42',
        size : '53.8k'
    },
    {
        id : 20,
        pid : 4,
        name : 'QQ文件20-avi',
        type : 'avi',
        time : '2015-01-02 21:20',
        size : '19.2k'
    },
    {
        id : 21,
        pid : 0,
        name : 'KQQ文件21-ppt',
        type : 'ppt',
        time : '2015-01-01 11:32',
        size : '25.2k'
    },
    {
        id : 22,
        pid : 0,
        name : 'DQQ文件22-pdf',
        type : 'pdf',
        time : '2015-01-02 22:37',
        size : '32.5k'
    }/*,
    {
        id : 23,
        pid : 18,
        name : 'QQ文件23',
        type : 'folder'
    },
    {
        id : 24,
        pid : 0,
        name : 'QQ文件24-pdf',
        type : 'pdf'
    },
    {
        id : 25,
        pid : 0,
        name : 'QQ文件25-mp3',
        type : 'mp3'
    },
    {
        id : 26,
        pid : 0,
        name : 'QQ文件26-ppt',
        type : 'ppt'
    },
    {
        id : 27,
        pid : 0,
        name : 'QQ文件27-xls',
        type : 'xls'
    },
    {
        id : 28,
        pid : 0,
        name : 'QQ文件28',
        type : 'jpg'
    },
    {
        id : 29,
        pid : 0,
        name : 'QQ文件29-doc',
        type : 'doc'
    },
    {
        id : 30,
        pid : 0,
        name : 'QQ文件30-doc',
        type : 'doc'
    }*/
];

var typeData = {
    'folder': 'folder',
    'doc': 'doc',
    'pdf': 'pdf',
    'xls': 'xls',
    'ppt': 'ppt',
    'jpg': 'jpg',
    'avi': 'avi',
    'mp3': 'mp3'
}