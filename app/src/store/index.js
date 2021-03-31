import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        topId: 0,
        nowId: 0,
        nowPid: -1,
        leve: 1,
        allParent:[],
        data: [
            {
                id: 0,
                pid: -1,
                title: "微云",
            },
            {
                id: 1,
                pid: 0,
                title: "我的文档",
            },
            {
                id: 2,
                pid: 0,
                title: "我的音乐"
            },
            {
                id: 2999,
                pid: 1,
                title: "js程序设计"
            },
            {
                id: 29000,
                pid: 1,
                title: "js权威指南"
            },
            {
                id: 23333,
                pid: 2,
                title: "王杰"
            },
            {
                id: 244444,
                pid: 2,
                title: "张国荣"
            },
            {
                id: 3,
                pid: 2,
                title: "周杰伦"
            },
            {
                id: 4000,
                pid: 3,
                title: "稻香"
            },
            {
                id: 4,
                pid: 3,
                title: "发如雪"
            },
            {
                id: 600,
                pid: 3,
                title: "夜曲"
            }
        ],
        //遮罩层mask
        maskBool:'none',
        //全选
        allPicked: false,
        //选中的文件对应的data合集
        checkChild:[],
        //移动弹窗
        moveType:null,
        alertId:null,
        moveAlertShow:false,
        //重命名
        eleLi:null,
        
        //提示弹窗
        confirm:{
            confirmOnoff: false,
            confirmText: null,
            confirmType:null,
        },
        //成功弹窗
        succPromptText:null,
        succAlertOnoff:false,
        //警告弹窗
        faiPromptText:null,
        faiAlertOnoff:false,
        //右键菜单开关
        contextmenuOnOff: false,
        contextmenuTop: 0,
        contextmenuLeft: 0,
        //右键点击元素的id值
        contextmenuId: null,
        //延迟器
        succtimer:null,
        faitimer:null
    },
    getters: {
        topData(state) {
            for (var i = 0; i < state.data.length; i++) {
                if (state.data[i].id == state.topId) {
                    return state.data[i];
                }
            }
        },
        getSelf(state) {
            for (var i = 0; i < state.data.length; i++) {
                if (state.data[i].id == state.nowId) {
                    return state.data[i];
                }
            }
        },
        getSelfAlert(state) {
            for (var i = 0; i < state.data.length; i++) {
                if (state.data[i].id == state.alertId) {
                    return state.data[i];
                }
            }
        },
        getChild(state) {
            var child = [];
            for (var i = 0; i < state.data.length; i++) {
                if (state.data[i].pid == state.nowId) {
                    child.push(state.data[i]);
                }
            }
            return child;
        },
        getParent(state) {
            for (var i = 0; i < state.data.length; i++) {
                if (state.data[i].id == state.nowPid) {
                    return state.data[i];
                }
            }
        },
        getAllParent(state, getters){
            let allParent = [];
            function getParent(data, n) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == n) {
                        return data[i];
                    }
                }
            }
            var pid = getters.getSelf.pid;
            while (pid > -1) {
                var parent = getParent(state.data, pid);
                pid = parent.pid;
                allParent.unshift(parent);
            }
            allParent.push(getters.getSelf);
            return allParent
        },
        getTitle(state) {
            var child = [];
            for (var i = 0; i < state.data.length; i++) {
                if (state.data[i].pid == state.nowId) {
                    child.push(state.data[i]);
                }
            }
            let names = child.map((item) => item.title);
            names = names.filter((item) => {
                if (item === "新建文件夹") {
                    return true;
                }
                if (
                    item.substring(0, 6) === "新建文件夹(" &&
                    Number(item.substring(6, item.length - 1)) >= 2 &&
                    item[item.length - 1] == ")"
                ) {
                    return true;
                }
                return false;
            });
            names.sort((n1, n2) => {
                n1 = n1.substring(6, n1.length - 1);
                n2 = n2.substring(6, n2.length - 1);
                n1 = isNaN(n1) ? 0 : n1;
                n2 = isNaN(n2) ? 0 : n2;
                return n1 - n2;
            });
            if (names[0] !== "新建文件夹") {
                return "新建文件夹";
            }
            for (let i = 1; i < names.length; i++) {
                if (Number(names[i].substring(6, names[i].length - 1)) !== i + 1) {
                    return `新建文件夹(${i + 1})`;
                }
            }
            return `新建文件夹(${names.length + 1})`;
        }
    },
    mutations: {
        //mask遮罩层
        changeMaskBool(state,payload){
            state.maskBool=payload.display
        },
        //清空checkChild
        removeCheckChild(state){
            state.checkChild = []
            state.allPicked=false
        },
        //选中的集合
        changeCheckChild(state, payload){
            if (state.checkChild.includes(payload.child)){
                state.checkChild = state.checkChild.filter(item => item != payload.child)
                if (state.allPicked){
                    state.allPicked = false;
                }
            } else if (state.checkChild.includes(payload.child)==false){
                state.checkChild.push(payload.child)
                if (payload.getChild.length == state.checkChild.length){
                    state.allPicked = true;
                }
            }
        },
        //全选框
        changeAllPicked(state,payload) {
            if (state.allPicked){
                state.allPicked = false;
                state.checkChild = []
            }else{
                const { checkChild}=payload
                state.allPicked = true;
                state.checkChild.push(...checkChild)
            }
            
        },
        //
        changeNowId(state, payload) {
            const { id } = payload;
            state.nowId = id;
        },
        //移动弹窗
        moveSure(state, payload){
            const { id,type} = payload;
            if(type==1){
                state.data.forEach(item => {
                    if (item.id == state.contextmenuId) {
                        item.pid = id
                        state.nowId = item.pid
                    }
                });
            }
            if(type==2){
                state.data.forEach(item => {
                    if (state.checkChild.includes(item)) {
                        item.pid = id
                        state.nowId = item.pid
                    }
                });
                state.checkChild=[]
            }
            

        },
        changeAlertId(state, payload) {
            const { id } = payload;
            state.alertId = id;
        },
        changeMoveAlertShow(state,payload){
            const {bool,type}=payload;
            state.moveAlertShow=bool;
            state.moveType=type
        },
        //重命名
        changeTitle(state, payload) {
            const{newTitle,id}=payload;
            state.data.forEach(item=>{
                if(item.id==id){
                    item.title=newTitle
                }
            })
        },
        changeEle(state, payload){
            state.eleLi=payload.eleLi
        },
        changeTitleShow(state,payload){
            state.titleShow=payload
        },
        //右键功能区
        contextmenuDelete(state) {
            state.data = state.data.filter(item =>item.id != state.contextmenuId);
            state.data = state.data.filter(item => item.pid != state.contextmenuId);
        },
        changeContextmenuId(state, payload) {
            const { id } = payload;
            state.contextmenuId = id;
            state.alertId = id;
        },
        changeContextmenuOnOff(state, payload) {
            const { bool, top, left } = payload;
            state.contextmenuOnOff = bool;
            state.contextmenuTop = top;
            state.contextmenuLeft = left;
        },
        //删除选中文件夹
        delCheckChild(state){
            state.data=state.data.filter(item=>{
                if(state.checkChild.includes(item)){
                    return false
                }else{
                    return true
                }
            })
            state.checkChild=[];
            if (state.allPicked){
                state.allPicked=false
            }
        },
        //新建文件夹
        createHandle(state, payload) {
            const { id, title} = payload;
            state.data.push({
                id: id,
                pid: state.nowId,
                title: title
            })
        },
        changeSuccAlertOnoff(state, payload){
            const { bool, info} = payload;
            state.succAlertOnoff = bool;
            state.succPromptText = info;
        },
        changeFaiAlertOnoff(state, payload) {
            const { bool, info } = payload;
            state.faiAlertOnoff = bool;
            state.faiPromptText = info;
        },
        changeConfirm(state, payload){
            const { bool ,info,type} = payload;
            state.confirm={
                confirmOnoff: bool,
                confirmText: info,
                confirmType:type
            }
        }
    },
    actions: {
        changeSuccAlertOnoffAsync(context, payload) {
            clearTimeout(context.state.succtimer);
            context.state.timer=setTimeout(()=>{
                context.commit('changeSuccAlertOnoff',{
                    bool: payload.bool,
                    info:null
                })
            },1000)
        },
        changeFaiAlertOnoffAsync(context, payload) {
            clearTimeout(context.state.faitimer);
            context.state.timer = setTimeout(() => {
                context.commit('changeFaiAlertOnoff', {
                    bool: payload.bool,
                    info:null
                })
            }, 1000)
        }
    },
    modules: {}
});
