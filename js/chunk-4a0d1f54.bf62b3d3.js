(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a0d1f54"],{"46bf":function(e,t,r){"use strict";var n=r("7715"),a=r.n(n);a.a},"6b6f":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",[r("div",{staticClass:"setting-add-area"},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]},[r("loading",{attrs:{id:"loading-box",active:e.isLoading,"can-cancel":!0},on:{"update:active":function(t){e.isLoading=t}}})],1),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],staticClass:"container"},[r("h2",[e._v("新增項目類型")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.newName,expression:"newName"}],attrs:{type:"text",placeholder:"填入類型名稱"},domProps:{value:e.newName},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addItem(t)},input:function(t){t.target.composing||(e.newName=t.target.value)}}}),r("select",{directives:[{name:"model",rawName:"v-model",value:e.newCategory,expression:"newCategory"}],attrs:{name:"add-select",id:"add-select"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.newCategory=t.target.multiple?r:r[0]}}},[r("option",{attrs:{value:"-1",hidden:""}},[e._v("選擇運動類別")]),e._l(e.categories,(function(t){return r("option",{key:t.id,domProps:{value:t.id}},[e._v(e._s(t.name))])}))],2),r("button",{attrs:{disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.addItem(t)}}},[e._v(" "+e._s(e.isProcessing?"新增中":"新增")+" ")])])]),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],staticClass:"setting-table"},[r("div",{staticClass:"container"},[e._m(0),e._l(e.subcategories,(function(t){return r("div",{key:t.id,staticClass:"setting-item"},[r("div",{staticClass:"setting-item-text",class:{editing:e.editingItem.id===t.id}},[r("p",{on:{dblclick:function(r){return e.editItem(t)}}},[e._v(e._s(t.name))]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.editingItem.name,expression:"editingItem.name"},{name:"input-focus",rawName:"v-input-focus",value:e.editingItem.id===t.id,expression:"editingItem.id === subcategory.id"}],attrs:{type:"text",name:"subcategory"},domProps:{value:e.editingItem.name},on:{blur:function(t){return e.submitItem()},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:t.target.blur(t)},input:function(t){t.target.composing||e.$set(e.editingItem,"name",t.target.value)}}})]),r("div",{staticClass:"setting-item-category"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.CategoryId,expression:"subcategory.CategoryId"}],attrs:{name:"edit-select",id:"edit-select",disabled:e.isChangeable(t.Items)},on:{change:[function(r){var n=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(t,"CategoryId",r.target.multiple?n:n[0])},function(r){return e.changeCategory(t)}]}},e._l(e.categories,(function(t){return r("option",{key:t.id,domProps:{value:t.id}},[e._v(e._s(t.name))])})),0)]),r("div",{staticClass:"setting-item-buttons"},[e.isChangeable(t.Items)?e._e():r("button",{on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.deleteItem(t)}}},[e._v(" × ")])])])}))],2)])])},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"setting-table-title"},[r("h2",[e._v(" 目前的項目類型 ")]),r("span",{staticClass:"setting-table-remind"},[e._v("點兩下可編輯名稱，若尚有項目正在使用，則無法改變運動類別與刪除 ")])])}],i=(r("4de4"),r("d81d"),r("b0c0"),r("b85c")),s=r("5530"),o=(r("96cf"),r("1da1")),c=r("a240"),u=r("2fa3"),d={name:"subcategories",data:function(){return{newName:"",newCategory:-1,subcategories:[],categories:[],editingItem:{},editOriName:"",temEditingName:"",temEditCategory:-1,isProcessing:!1,isLoading:!0}},created:function(){this.fetchSubcategories()},methods:{fetchSubcategories:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["a"].getSubcategory();case 3:if(r=t.sent,n=r.data,a=r.statusText,"OK"===a){t.next=8;break}throw new Error;case 8:e.subcategories=n.subcategories.map((function(e){return Object(s["a"])(Object(s["a"])({},e),{},{oriCategoryId:e.CategoryId})})),e.categories=n.categories,e.isLoading=!1,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),u["b"].fire({icon:"error",title:"目前無法取得資料，請稍後再試"});case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},isChangeable:function(e){return e.length>0},editItem:function(e){this.editingItem=Object(s["a"])({},e),this.temEditingName=e.name},submitItem:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.editingItem.name===e.temEditingName){t.next=18;break}if(e.editingItem.name){t.next=5;break}return u["b"].fire({icon:"error",title:"名稱不可空白"}),t.abrupt("return");case 5:return r={name:e.editingItem.name},t.next=8,c["a"].putSubcategory({value:r,id:e.editingItem.id});case 8:if(n=t.sent,a=n.data,i=n.statusText,"OK"===i){t.next=13;break}throw new Error;case 13:if("error"!==a.status){t.next=16;break}return u["b"].fire({icon:"error",title:a.message}),t.abrupt("return");case 16:e.subcategories=e.subcategories.map((function(t){return t.id===e.editingItem.id?e.editingItem:t})),u["b"].fire({icon:"success",title:"成功修改名稱"});case 18:e.editingItem={},t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](0),u["b"].fire({icon:"error",title:"目前無法修改名稱，請稍後再試"});case 24:case"end":return t.stop()}}),t,null,[[0,21]])})))()},changeCategory:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a,s,o,d,l,m;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(r.prev=0,!(e.Items.length>0)){r.next=6;break}n=Object(i["a"])(t.subcategories);try{for(n.s();!(a=n.n()).done;)s=a.value,s.id===e.id&&(s.CategoryId=s.oriCategoryId)}catch(g){n.e(g)}finally{n.f()}return u["b"].fire({icon:"error",title:"此類型仍有項目正在使用，無法修改運動類別唷！"}),r.abrupt("return");case 6:return o={CategoryId:e.CategoryId},r.next=9,c["a"].putSubcategory({value:o,id:e.id});case 9:if(d=r.sent,l=d.data,m=d.statusText,"OK"===m){r.next=14;break}throw new Error;case 14:if("error"!==l.status){r.next=17;break}return u["b"].fire({icon:"error",title:l.message}),r.abrupt("return");case 17:u["b"].fire({icon:"success",title:"成功修改運動類別"}),r.next=23;break;case 20:r.prev=20,r.t0=r["catch"](0),u["b"].fire({icon:"error",title:"目前無法修改運動類別，請稍後再試"});case 23:case"end":return r.stop()}}),r,null,[[0,20]])})))()},deleteItem:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a,i,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e.Items.length>0&&u["b"].fire({icon:"error",title:"此類型尚有項目正在使用，無法刪除"}),r.next=4,u["a"].fire({title:"確定要刪除「".concat(e.name,"」嗎？"),confirmButtonText:"刪除"});case 4:if(n=r.sent,!n.isConfirmed){r.next=18;break}return r.next=8,c["a"].deleteSubcategory({id:e.id});case 8:if(a=r.sent,i=a.data,s=a.statusText,"OK"===s){r.next=13;break}throw new Error;case 13:if("error"!==i.status){r.next=16;break}return u["b"].fire({icon:"error",title:i.message}),r.abrupt("return");case 16:t.subcategories=t.subcategories.filter((function(t){return t.id!==e.id})),u["b"].fire({icon:"success",title:"成功刪除項目類別"});case 18:r.next=23;break;case 20:r.prev=20,r.t0=r["catch"](0),u["b"].fire({icon:"error",title:"目前無法刪除此項目類型，請稍後再試"});case 23:case"end":return r.stop()}}),r,null,[[0,20]])})))()},addItem:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.newName&&!(e.newCategory<0)){t.next=4;break}return u["b"].fire({icon:"error",title:"請填入名稱與選擇運動類型"}),t.abrupt("return");case 4:return r=e.newName,n=e.newCategory,e.isProcessing=!0,t.next=9,c["a"].addSubcategory({name:r,CategoryId:n});case 9:if(a=t.sent,i=a.data,o=a.statusText,"OK"===o){t.next=14;break}throw new Error;case 14:if("error"!==i.status){t.next=17;break}return u["b"].fire({icon:"error",title:i.message}),t.abrupt("return");case 17:e.subcategories.push(Object(s["a"])(Object(s["a"])({},i),{},{Items:[]})),u["b"].fire({icon:"success",title:"成功新增項目類別"}),e.newName="",e.newCategory=-1,e.isProcessing=!1,t.next=28;break;case 24:t.prev=24,t.t0=t["catch"](0),e.isProcessing=!1,u["b"].fire({icon:"error",title:"目前無法新增項目類型，請稍後再試"});case 28:case"end":return t.stop()}}),t,null,[[0,24]])})))()}},directives:{"input-focus":function(e){e.focus()}}},l=d,m=(r("46bf"),r("2877")),g=Object(m["a"])(l,n,a,!1,null,null,null);t["default"]=g.exports},7715:function(e,t,r){}}]);
//# sourceMappingURL=chunk-4a0d1f54.bf62b3d3.js.map