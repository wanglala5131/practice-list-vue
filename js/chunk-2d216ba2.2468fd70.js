(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d216ba2"],{c461:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("main",[i("Banner",{attrs:{bannerImgURL:t.bannerImgURL}}),i("ToTop"),i("PageTitle",{scopedSlots:t._u([{key:"title",fn:function(){return[t._v(" 編輯菜單 ")]},proxy:!0}])}),i("ListItemTable",{attrs:{"ori-list-items":t.editList,"ori-list-name":t.listName,"list-type":"EditList","is-loading":t.isLoading},on:{deleteListItem:t.deleteListItemHandler,listitemTableToTop:t.listitemTableToTopHandler}})],1)},r=[],n=(i("4de4"),i("d81d"),i("b0c0"),i("96cf"),i("1da1")),a=i("84af"),o=i("89dd"),l=i("a661"),c=i("63ad"),u=i("2a85"),m=i("2fa3"),d={name:"EditList",components:{Banner:a["a"],PageTitle:o["a"],ToTop:l["a"],ListItemTable:c["a"]},data:function(){return{bannerImgURL:"https://github.com/wanglala5131/practice-list-vue/blob/main/src/assets/img/lists-page.jpg?raw=true",list:[],listName:"",editList:[],isLoading:!0}},created:function(){var t=this.$route.params.id;this.fetchList(t)},methods:{fetchList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var s,r,n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,u["a"].getList({id:t});case 3:if(s=i.sent,r=s.data,n=s.statusText,"OK"===n){i.next=8;break}throw new Error;case 8:if("error"!==r.status){i.next=11;break}return m["b"].fire({icon:"error",title:r.message}),i.abrupt("return");case 11:e.list=r,e.listName=r.name,e.editList=r.Items.map((function(t){return{id:t.id,Item:t,reps:t.ListItem.reps,remark:t.ListItem.remark}})),e.isLoading=!1,i.next=20;break;case 17:i.prev=17,i.t0=i["catch"](0),m["b"].fire({icon:"error",title:"無法取得菜單資料，請稍後再試"});case 20:case"end":return i.stop()}}),i,null,[[0,17]])})))()},deleteListItemHandler:function(t){this.editList=this.editList.filter((function(e){return e.Item.id!==t})),this.list.Items=this.list.Items.filter((function(e){return e.id!==t}))},listitemTableToTopHandler:function(t){this.list.Items.push(t.item.Item),this.editList.push(t.item)}}},p=d,f=i("2877"),L=Object(f["a"])(p,s,r,!1,null,null,null);e["default"]=L.exports}}]);
//# sourceMappingURL=chunk-2d216ba2.2468fd70.js.map