(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5f41"],{"974a":function(e,t,c){"use strict";c.r(t);var o=c("7a23"),l={class:"d-flex flex-column w-100 bg-light"},a=Object(o["createElementVNode"])("div",{class:"bg-info"},[Object(o["createElementVNode"])("div",{class:"container"},[Object(o["createElementVNode"])("h3",{class:"fs-3 py-3 text-white text-shadow"},"產品")])],-1),n={class:"container bg-light"},r={class:"d-flex flex-column"},d={class:"d-flex py-3"},i=Object(o["createElementVNode"])("h3",{class:"fs-4"},"產品列表",-1),s={class:"mb-6"},m=Object(o["createElementVNode"])("thead",null,[Object(o["createElementVNode"])("tr",{class:"border border-top-0 border-start-0 border-end-0 border-3"},[Object(o["createElementVNode"])("th",{width:"100",class:"py-4"}),Object(o["createElementVNode"])("th",{width:"100"}," 產品名稱 "),Object(o["createElementVNode"])("th",{width:"100"}," 分類 "),Object(o["createElementVNode"])("th",{width:"60"}," 原價 "),Object(o["createElementVNode"])("th",{width:"60"}," 售價 "),Object(o["createElementVNode"])("th",{width:"60"}," 啟用 "),Object(o["createElementVNode"])("th",{width:"120"}," 編輯 ")])],-1),u=["src"],b=["checked"],p=Object(o["createElementVNode"])("span",{class:"check-btn-box"},[Object(o["createElementVNode"])("span",{class:"check-btn"})],-1),j={class:"d-flex"},O=["onClick"],h=["onClick"];function V(e,t,c,V,N,E){var f=Object(o["resolveComponent"])("Pagination"),g=Object(o["resolveComponent"])("ProductModal"),v=Object(o["resolveComponent"])("DeleteModal"),P=Object(o["resolveComponent"])("Loading");return Object(o["openBlock"])(),Object(o["createElementBlock"])("section",l,[a,Object(o["createElementVNode"])("div",n,[Object(o["createElementVNode"])("div",r,[Object(o["createElementVNode"])("div",d,[i,Object(o["createElementVNode"])("button",{onClick:t[0]||(t[0]=function(e){return E.openModal(!0)}),class:"btn btn-secondary ms-auto"},"新增產品")]),Object(o["createElementVNode"])("table",s,[m,Object(o["createElementVNode"])("tbody",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(N.products,(function(e){return Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{key:e.id,class:"border-bottom"},[Object(o["createElementVNode"])("td",null,[Object(o["createElementVNode"])("img",{src:e.imageUrl,alt:"",class:"pe-3 vh-10 vw-20"},null,8,u)]),Object(o["createElementVNode"])("td",null,Object(o["toDisplayString"])(e.title),1),Object(o["createElementVNode"])("td",null,Object(o["toDisplayString"])(e.category),1),Object(o["createElementVNode"])("td",null,Object(o["toDisplayString"])(E.currency(e.origin_price)),1),Object(o["createElementVNode"])("td",null,Object(o["toDisplayString"])(E.currency(e.price)),1),Object(o["createElementVNode"])("td",null,[Object(o["createElementVNode"])("div",null,[Object(o["createElementVNode"])("label",null,[Object(o["createElementVNode"])("input",{disabled:"",checked:e.is_enabled,type:"checkbox",class:"checkbox",name:"",id:""},null,8,b),p])])]),Object(o["createElementVNode"])("td",null,[Object(o["createElementVNode"])("div",j,[Object(o["createElementVNode"])("button",{onClick:function(t){return E.openModal(!1,e)},type:"button",class:"btn btn-primary"},"編輯",8,O),Object(o["createElementVNode"])("button",{onClick:function(t){return E.openDeleteModal(e)},type:"button",class:"btn btn-danger"},"刪除",8,h)])])])})),128))])]),Object(o["createVNode"])(f,{onUpdatePage:E.getProducts,pagination:N.pagination,class:"mx-auto"},null,8,["onUpdatePage","pagination"])])]),Object(o["createVNode"])(g,{ref:"modal",product:N.tempProduct,productIsNew:N.productIsNew,onEmitUpdateProduct:E.updateProduct},null,8,["product","productIsNew","onEmitUpdateProduct"]),Object(o["createVNode"])(v,{ref:"deletModal",item:N.tempProduct,onEmitDelete:E.deleteProduct},null,8,["item","onEmitDelete"]),Object(o["createVNode"])(P,{active:N.isLoading,"z-index":1060},null,8,["active"])])}var N=c("5530"),E=(c("99af"),c("a434"),c("a4d3"),c("e01a"),{ref:"modal",class:"modal fade z-index-999",id:"productModal",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"}),f={class:"modal-dialog modal-xl"},g={class:"modal-content"},v={class:"modal-header bg-secondary"},P={class:"modal-title text-white",id:"productModalLabel"},y={key:0},k={key:1},w=Object(o["createElementVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),x={class:"modal-body"},M={class:"container"},U={class:"row"},C={class:"col-4"},B={class:"mb-3"},D=Object(o["createElementVNode"])("label",{for:"imageUrl",class:"form-label"},"輸入主圖片網址",-1),_=["src"],L={key:0,class:"mb-3"},T=["for"],I=["onUpdate:modelValue","id"],$=["src"],S=["onClick"],z={class:"col-8"},F={class:"row mb-3"},J={class:"col-12"},A=Object(o["createElementVNode"])("label",{for:"title",class:"form-label"},"標題",-1),R={class:"row mb-3"},q={class:"col-6"},G=Object(o["createElementVNode"])("label",{for:"due_date",class:"form-label"},"建立日期",-1),H={class:"col-6"},K=Object(o["createElementVNode"])("label",{for:"serious",class:"form-label"},"系列",-1),Q={class:"row mb-6"},W={class:"col-6"},X=Object(o["createElementVNode"])("label",{for:"category",class:"form-label"},"分類",-1),Y={class:"col-6"},Z=Object(o["createElementVNode"])("label",{for:"unit",class:"form-label"},"單位",-1),ee={class:"row mb-6"},te={class:"col-6"},ce=Object(o["createElementVNode"])("label",{for:"origin_price",class:"form-label"},"原價",-1),oe={class:"col-6"},le=Object(o["createElementVNode"])("label",{for:"price",class:"form-label"},"售價",-1),ae=Object(o["createElementVNode"])("hr",{class:"mb-6"},null,-1),ne={class:"row mb-6"},re={class:"col-12"},de=Object(o["createElementVNode"])("label",{for:"description",class:"form-label"},"產品簡單描述",-1),ie={class:"row"},se={class:"col-12 mb-6"},me=Object(o["createElementVNode"])("p",{class:"mb-2"},"產品詳細說明",-1),ue={action:"",enctype:"multipart/form-data",method:"post",ref:"imageForm"},be={class:"mb-3"},pe={for:"isEnable",class:"d-flex align-items-center"},je=Object(o["createElementVNode"])("span",{class:"check-btn-box"},[Object(o["createElementVNode"])("span",{class:"check-btn"})],-1),Oe=Object(o["createElementVNode"])("span",{class:"ms-4"},"是否啟用",-1),he={class:"modal-footer"},Ve=Object(o["createElementVNode"])("button",{type:"button",class:"btn btn-light","data-bs-dismiss":"modal"},"取消",-1);function Ne(e,t,c,l,a,n){var r,d,i=Object(o["resolveComponent"])("Ckeditor");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",E,[Object(o["createElementVNode"])("div",f,[Object(o["createElementVNode"])("div",g,[Object(o["createElementVNode"])("div",v,[Object(o["createElementVNode"])("h5",P,[c.productIsNew?(Object(o["openBlock"])(),Object(o["createElementBlock"])("span",y,"新增產品")):(Object(o["openBlock"])(),Object(o["createElementBlock"])("span",k,"編輯產品"))]),w]),Object(o["createElementVNode"])("div",x,[Object(o["createElementVNode"])("div",M,[Object(o["createElementVNode"])("div",U,[Object(o["createElementVNode"])("div",C,[Object(o["createElementVNode"])("div",B,[D,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{onChange:t[0]||(t[0]=function(){return e.upLoadImage&&e.upLoadImage.apply(e,arguments)}),"onUpdate:modelValue":t[1]||(t[1]=function(e){return a.tempProduct.imageUrl=e}),type:"text",class:"form-control",id:"imageUrl",placeholder:"輸入圖片網址"},null,544),[[o["vModelText"],a.tempProduct.imageUrl]]),Object(o["createElementVNode"])("img",{src:a.tempProduct.imageUrl},null,8,_)]),null!==(r=a.tempProduct.imagesUrl)&&void 0!==r&&r.length?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",L,[Object(o["createElementVNode"])("button",{onClick:t[2]||(t[2]=function(e){return a.tempProduct.imagesUrl.push("")}),type:"button",class:"btn btn-outline-success w-100"},"新增副圖片")])),null!==(d=a.tempProduct.imagesUrl)&&void 0!==d&&d.length?(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],{key:1},Object(o["renderList"])(a.tempProduct.imagesUrl,(function(e,c){var l,n;return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{key:e,class:"mb-3"},[Object(o["createElementVNode"])("label",{for:"imageUrl-".concat(c),class:"form-label"},"輸入副圖片網址",8,T),Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":function(e){return a.tempProduct.imagesUrl[c]=e},type:"text",class:"form-control",id:"imageUrl-".concat(c),placeholder:"輸入圖片網址"},null,8,I),[[o["vModelText"],a.tempProduct.imagesUrl[c]]]),Object(o["createElementVNode"])("img",{src:a.tempProduct.imagesUrl[c]},null,8,$),Object(o["createElementVNode"])("button",{onClick:function(e){return a.tempProduct.imagesUrl.splice(c,1)},type:"button",class:"btn btn-outline-danger mt-3 w-100"},"移除圖片",8,S),a.tempProduct.imagesUrl[(null===(l=a.tempProduct.imagesUrl)||void 0===l?void 0:l.length)-1].length&&(null===(n=a.tempProduct.imagesUrl)||void 0===n?void 0:n.length)-1==c?(Object(o["openBlock"])(),Object(o["createElementBlock"])("button",{key:0,onClick:t[3]||(t[3]=function(e){return a.tempProduct.imagesUrl.push("")}),type:"button",class:"btn btn-outline-success w-100"},"新增副圖片")):Object(o["createCommentVNode"])("",!0)])})),128)):Object(o["createCommentVNode"])("",!0)]),Object(o["createElementVNode"])("div",z,[Object(o["createElementVNode"])("div",F,[Object(o["createElementVNode"])("div",J,[Object(o["createElementVNode"])("div",null,[A,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[4]||(t[4]=function(e){return a.tempProduct.title=e}),type:"text",class:"form-control",id:"title",placeholder:"輸入標題"},null,512),[[o["vModelText"],a.tempProduct.title]])])])]),Object(o["createElementVNode"])("div",R,[Object(o["createElementVNode"])("div",q,[Object(o["createElementVNode"])("div",null,[G,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[5]||(t[5]=function(e){return a.create_at=e}),type:"date",class:"form-control",id:"due_date"},null,512),[[o["vModelText"],a.create_at]])])]),Object(o["createElementVNode"])("div",H,[Object(o["createElementVNode"])("div",null,[K,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[6]||(t[6]=function(e){return a.tempProduct.serious=e}),type:"text",class:"form-control",id:"serious"},null,512),[[o["vModelText"],a.tempProduct.serious]])])])]),Object(o["createElementVNode"])("div",Q,[Object(o["createElementVNode"])("div",W,[X,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[7]||(t[7]=function(e){return a.tempProduct.category=e}),type:"text",class:"form-control",id:"category",placeholder:"輸入分類"},null,512),[[o["vModelText"],a.tempProduct.category]])]),Object(o["createElementVNode"])("div",Y,[Z,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[8]||(t[8]=function(e){return a.tempProduct.unit=e}),type:"text",class:"form-control",id:"unit",placeholder:"輸入單位"},null,512),[[o["vModelText"],a.tempProduct.unit]])])]),Object(o["createElementVNode"])("div",ee,[Object(o["createElementVNode"])("div",te,[ce,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[9]||(t[9]=function(e){return a.tempProduct.origin_price=e}),type:"number",class:"form-control",id:"origin_price",placeholder:"輸入原價"},null,512),[[o["vModelText"],a.tempProduct.origin_price]])]),Object(o["createElementVNode"])("div",oe,[le,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[10]||(t[10]=function(e){return a.tempProduct.price=e}),type:"number",class:"form-control",id:"price",placeholder:"輸入售價"},null,512),[[o["vModelText"],a.tempProduct.price]])])]),ae,Object(o["createElementVNode"])("div",ne,[Object(o["createElementVNode"])("div",re,[Object(o["createElementVNode"])("div",null,[de,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[11]||(t[11]=function(e){return a.tempProduct.description=e}),type:"text",class:"form-control",id:"description",placeholder:"輸入產品描述"},null,512),[[o["vModelText"],a.tempProduct.description]])])])]),Object(o["createElementVNode"])("div",ie,[Object(o["createElementVNode"])("div",se,[me,Object(o["createElementVNode"])("form",ue,[Object(o["createVNode"])(i,{editor:a.editor,modelValue:a.tempProduct.content,"onUpdate:modelValue":t[12]||(t[12]=function(e){return a.tempProduct.content=e}),config:a.editorConfig,class:"w-50",id:"content"},null,8,["editor","modelValue","config"])],512)])]),Object(o["createElementVNode"])("div",be,[Object(o["createElementVNode"])("label",pe,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{"onUpdate:modelValue":t[13]||(t[13]=function(e){return a.tempProduct.is_enabled=e}),"true-value":1,"false-value":0,type:"checkbox",class:"checkbox pt-8",name:"",id:"isEnable"},null,512),[[o["vModelCheckbox"],a.tempProduct.is_enabled]]),je,Oe])])])])])]),Object(o["createElementVNode"])("div",he,[Ve,Object(o["createElementVNode"])("button",{onClick:t[14]||(t[14]=function(){return n.updateProduct&&n.updateProduct.apply(n,arguments)}),type:"button",class:"btn btn-primary"},"確認")])])])],512)}var Ee=c("3730"),fe=c.n(Ee),ge=c("c9c0"),ve=c("fb3d"),Pe=c.n(ve),ye=c("2178"),ke={inject:["toNormalTime","toTimestamp"],mixins:[ge["a"]],components:{Ckeditor:fe.a.component},props:{product:{type:Object,default:function(){return{}}},productIsNew:{type:Boolean,default:!1}},emits:["emit-updateProduct"],data:function(){return{tempProduct:{},create_at:"",editor:Pe.a,editorConfig:{extraPlugins:[this.uploader]}}},watch:{product:function(){this.tempProduct=Object(N["a"])({},this.product),this.tempProduct.imagesUrl||(this.tempProduct.imagesUrl=[]),this.couponIsNew?(this.create_at=this.toNormalTime(),this.tempProduct.create_at=this.toTimestamp(this.create_at),this.tempProduct.is_enabled=0,this.tempProduct.content=""):this.create_at=this.toNormalTime(this.tempProduct.create_at)},create_at:function(){this.tempProduct.create_at=this.toTimestamp(this.create_at)}},methods:{updateProduct:function(){this.$emit("emit-updateProduct",this.tempProduct)},uploader:function(e){e.plugins.get("FileRepository").createUploadAdapter=function(e){return new ye["a"](e)}}}},we=c("d959"),xe=c.n(we);const Me=xe()(ke,[["render",Ne]]);var Ue=Me,Ce=c("627b"),Be=c("1799"),De={name:"DashBoardProducts",components:{ProductModal:Ue,Pagination:Be["a"],DeleteModal:Ce["a"]},data:function(){return{products:[],pagination:{},tempProduct:{},productIsNew:"",isLoading:!1}},methods:{getProducts:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("z80823","/admin/products?page=").concat(t);this.$http.get(c).then((function(t){e.products=t.data.products,e.pagination=t.data.pagination,e.isLoading=!1})).catch((function(){e.isLoading=!1,e.emitter.emit("push-message",{content:"發生錯誤，請重新整理頁面",state:!1})}))},openModal:function(e,t){this.productIsNew=e,this.productIsNew?this.tempProduct={}:this.tempProduct=Object(N["a"])({},t),this.$refs.modal.openModal()},openDeleteModal:function(e){this.tempProduct=Object(N["a"])({},e),this.$refs.deletModal.openModal()},deleteProduct:function(e){var t=this;this.tempProduct=Object(N["a"])({},e),this.isLoading=!0;var c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("z80823","/admin/product/").concat(this.tempProduct.id);this.$http.delete(c).then((function(e){e.data.success?(t.getProducts(),t.isLoading=!1,t.$refs.deletModal.closeModal(),t.putMessageState(e,"刪除".concat(t.tempProduct.title))):(t.isLoading=!1,t.$refs.deletModal.closeModal(),t.putMessageState(e,"刪除".concat(t.tempProduct.title)))})).catch((function(e){t.isLoading=!1,t.$refs.deletModal.closeModal(),t.putMessageState(e,"刪除".concat(t.tempProduct.title))}))},updateProduct:function(e){var t=this;this.tempProduct=e,this.isLoading=!0;var c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("z80823","/admin/product"),o="post",l="建立產品";this.productIsNew||(c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("z80823","/admin/product/").concat(this.tempProduct.id),o="put",l="更新產品"),this.$http[o](c,{data:this.tempProduct}).then((function(e){e.data.success?(t.getProducts(),t.isLoading=!1,t.$refs.modal.closeModal(),t.putMessageState(e,l)):(t.isLoading=!1,t.$refs.modal.closeModal(),t.putMessageState(e,l))})).catch((function(){t.isLoading=!1,t.$refs.modal.closeModal(),t.emitter.emit("push-message",{content:"更新產品錯誤",state:!1})}))}},inject:["putMessageState","emitter","currency"],mounted:function(){this.getProducts()}};const _e=xe()(De,[["render",V]]);t["default"]=_e}}]);
//# sourceMappingURL=chunk-2d0e5f41.20fe59cb.js.map