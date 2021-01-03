(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4adc9a15"],{"1d9f":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",[n("div",{staticClass:"setting-add-area"},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]},[n("loading",{attrs:{id:"loading-box",active:e.isLoading,"can-cancel":!0},on:{"update:active":function(t){e.isLoading=t}}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],staticClass:"container"},[n("h2",[e._v("新增運動項目")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newName,expression:"newName"}],attrs:{type:"text",placeholder:"填入運動項目"},domProps:{value:e.newName},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addItem(t)},input:function(t){t.target.composing||(e.newName=t.target.value)}}}),n("button",{attrs:{disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.addItem(t)}}},[e._v(" "+e._s(e.isProcessing?"新增中":"新增")+" ")])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],staticClass:"setting-table"},[n("div",{staticClass:"container"},[e._m(0),e._l(e.categories,(function(t){return n("div",{key:t.id,staticClass:"setting-item"},[n("div",{staticClass:"setting-item-text",class:{editing:e.editingItem.id===t.id}},[n("p",{on:{dblclick:function(n){return e.editItem(t)}}},[e._v(e._s(t.name))]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.editingItem.name,expression:"editingItem.name"},{name:"input-focus",rawName:"v-input-focus",value:e.editingItem.id===t.id,expression:"editingItem.id === category.id"}],attrs:{type:"text",name:"category"},domProps:{value:e.editingItem.name},on:{blur:function(t){return e.submitItem()},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:t.target.blur(t)},input:function(t){t.target.composing||e.$set(e.editingItem,"name",t.target.value)}}})]),n("div",{staticClass:"setting-item-buttons"},[e.isChangeable(t.Subcategories)?e._e():n("button",{on:{click:function(n){return n.stopPropagation(),n.preventDefault(),e.deleteItem(t)}}},[e._v(" × ")])])])}))],2)])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"setting-table-title"},[n("h2",[e._v(" 目前的運動項目 ")]),n("span",{staticClass:"setting-table-remind"},[e._v("點兩下可編輯名稱，若此項目尚有類別正在使用，則無法刪除 ")])])}],a=(n("4de4"),n("d81d"),n("b0c0"),n("5530")),s=(n("96cf"),n("1da1")),c=n("a240"),o=n("2fa3"),u={name:"categories",data:function(){return{newName:"",newCategory:-1,categories:[],editingItem:{},temEditingName:"",isProcessing:!1,isLoading:!0}},created:function(){this.fetchCategories()},methods:{fetchCategories:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["a"].getCategory();case 3:if(n=t.sent,r=n.data,i=n.statusText,"OK"===i){t.next=8;break}throw new Error;case 8:e.categories=r,e.isLoading=!1,t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),o["b"].fire({icon:"error",title:"目前無法取得資料，請稍後再試"});case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))()},isChangeable:function(e){return e.length>0},editItem:function(e){this.editingItem=Object(a["a"])({},e),this.temEditingName=e.name},submitItem:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.editingItem.name===e.temEditingName){t.next=17;break}if(e.editingItem.name){t.next=5;break}return o["b"].fire({icon:"error",title:"名稱不可空白"}),t.abrupt("return");case 5:return t.next=7,c["a"].putCategory({name:e.editingItem.name,id:e.editingItem.id});case 7:if(n=t.sent,r=n.data,i=n.statusText,"OK"===i){t.next=12;break}throw new Error;case 12:if("error"!==r.status){t.next=15;break}return o["b"].fire({icon:"error",title:r.message}),t.abrupt("return");case 15:e.categories=e.categories.map((function(t){return t.id===e.editingItem.id?e.editingItem:t})),o["b"].fire({icon:"success",title:"成功修改名稱"});case 17:e.editingItem={},t.next=23;break;case 20:t.prev=20,t.t0=t["catch"](0),o["b"].fire({icon:"error",title:"目前無法修改名稱，請稍後再試"});case 23:case"end":return t.stop()}}),t,null,[[0,20]])})))()},deleteItem:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r,i,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,e.Subcategories.length>0&&o["b"].fire({icon:"error",title:"此類型尚有項目正在使用，無法刪除"}),n.next=4,o["a"].fire({title:"確定要刪除「".concat(e.name,"」嗎？"),confirmButtonText:"刪除"});case 4:if(r=n.sent,!r.isConfirmed){n.next=18;break}return n.next=8,c["a"].deleteCategory({id:e.id});case 8:if(i=n.sent,a=i.data,s=i.statusText,"OK"===s){n.next=13;break}throw new Error;case 13:if("error"!==a.status){n.next=16;break}return o["b"].fire({icon:"error",title:a.message}),n.abrupt("return");case 16:t.categories=t.categories.filter((function(t){return t.id!==e.id})),o["b"].fire({icon:"success",title:"成功刪除項目類型"});case 18:n.next=23;break;case 20:n.prev=20,n.t0=n["catch"](0),o["b"].fire({icon:"error",title:"目前無法刪除此項目類型，請稍後再試"});case 23:case"end":return n.stop()}}),n,null,[[0,20]])})))()},addItem:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.newName){t.next=4;break}return o["b"].fire({icon:"error",title:"請填入名稱"}),t.abrupt("return");case 4:return e.isProcessing=!0,t.next=7,c["a"].addCategory({name:e.newName});case 7:if(n=t.sent,r=n.data,i=n.statusText,"OK"===i){t.next=12;break}throw new Error;case 12:if("error"!==r.status){t.next=15;break}return o["b"].fire({icon:"error",title:r.message}),t.abrupt("return");case 15:e.categories.push(Object(a["a"])(Object(a["a"])({},r),{},{Subcategories:[]})),o["b"].fire({icon:"success",title:"成功新增項目類型"}),e.newName="",e.isProcessing=!1,t.next=25;break;case 21:t.prev=21,t.t0=t["catch"](0),e.isProcessing=!1,o["b"].fire({icon:"error",title:"目前無法新增項目類型，請稍後再試"});case 25:case"end":return t.stop()}}),t,null,[[0,21]])})))()}},directives:{"input-focus":function(e){e.focus()}}},d=u,m=(n("8e02"),n("2877")),l=Object(m["a"])(d,r,i,!1,null,null,null);t["default"]=l.exports},"7e57":function(e,t,n){},"8e02":function(e,t,n){"use strict";var r=n("7e57"),i=n.n(r);i.a}}]);
//# sourceMappingURL=chunk-4adc9a15.3060d599.js.map