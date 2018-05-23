webpackJsonp([38],{"0toz":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("mof7"),s=a("dPTl"),i=a("KjR5"),n={data:function(){return{applist:[],packagelist:[],release:{appName:void 0,jsVersion:void 0,filterType:0,grayScale:1,iOS:void 0,android:void 0,deviceIDs:[],showUpdateAlert:!1,isForceUpdate:!0,changelog:void 0},inputVisible:!1,inputValue:"",creating:!1}},created:function(){this.getApplist()},methods:{getApplist:function(){var e=this;Object(l.a)().then(function(t){e.applist=t.data.results})},getPackagelist:function(e){var t=this,a={appName:e};Object(s.b)(a).then(function(e){t.packagelist=e.data})},appChange:function(e){this.release.jsVersion=void 0,this.getPackagelist(e)},handleClose:function(e){this.release.deviceIDs.splice(this.release.deviceIDs.indexOf(e),1)},showInput:function(){var e=this;this.inputVisible=!0,this.$nextTick(function(t){e.$refs.saveTagInput.$refs.input.focus()})},handleInputConfirm:function(){var e=this.inputValue;e&&this.release.deviceIDs.push(e),this.inputVisible=!1,this.inputValue=""},package_change:function(e){console.log("item:",e),this.release.jsVersion=e.jsVersion,this.release.iOS=e.ios,this.release.android=e.android},createRelease:function(){var e=this;this.creating=!0,this.release.deviceIDs=this.release.deviceIDs.join(","),Object(i.a)(this.release).then(function(t){e.creating=!1,e.$router.push("/release/list"),e.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})}).catch(function(t){e.creating=!1,console.log("erros",t)})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"form",attrs:{model:e.release,"label-width":"150px"}},[a("el-form-item",{attrs:{label:e.$t("release.appName"),prop:"appName"}},[a("el-select",{attrs:{placeholder:"请选择APP"},on:{change:e.appChange},model:{value:e.release.appName,callback:function(t){e.$set(e.release,"appName",t)},expression:"release.appName"}},e._l(e.applist,function(e){return a("el-option",{key:e.appName,attrs:{label:e.name,value:e.appName}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("release.jsVersion"),prop:"jsVersion"}},[a("el-select",{attrs:{placeholder:"请选择更新包"},on:{change:e.package_change},model:{value:e.release.jsVersion,callback:function(t){e.$set(e.release,"jsVersion",t)},expression:"release.jsVersion"}},e._l(e.packagelist,function(e){return a("el-option",{key:e,attrs:{label:e.jsVersion,value:e}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("release.releaseType"),prop:"filterType"}},[a("el-radio-group",{attrs:{type:"number"},model:{value:e.release.filterType,callback:function(t){e.$set(e.release,"filterType",t)},expression:"release.filterType"}},[a("el-radio",{attrs:{label:0,border:""}},[e._v("灰度值")]),e._v(" "),a("el-radio",{attrs:{label:1,border:""}},[e._v("指定设备")])],1)],1),e._v(" "),0==e.release.filterType?a("el-form-item",{attrs:{label:e.$t("release.grayscale"),prop:"grayscale"}},[a("el-slider",{attrs:{"show-input":"",max:1,step:.01},model:{value:e.release.grayScale,callback:function(t){e.$set(e.release,"grayScale",t)},expression:"release.grayScale"}})],1):e._e(),e._v(" "),1==e.release.filterType?a("el-form-item",{attrs:{label:e.$t("release.deviceIDs"),prop:"deviceIDs"}},[e._l(e.release.deviceIDs,function(t){return a("el-tag",{key:t,attrs:{closable:"","disable-transitions":!1},on:{close:function(a){e.handleClose(t)}}},[e._v("\n          "+e._s(t)+"\n        ")])}),e._v(" "),e.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:e.handleInputConfirm},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleInputConfirm(t)}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:e.showInput}},[e._v("+ New Tag")])],2):e._e(),e._v(" "),a("el-form-item",{attrs:{label:e.$t("release.showUpdateAlert")}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#f2f2f2"},model:{value:e.release.showUpdateAlert,callback:function(t){e.$set(e.release,"showUpdateAlert",t)},expression:"release.showUpdateAlert"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("release.isForceUpdate")}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#f2f2f2"},model:{value:e.release.isForceUpdate,callback:function(t){e.$set(e.release,"isForceUpdate",t)},expression:"release.isForceUpdate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("release.changelog")}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"Please input"},model:{value:e.release.changelog,callback:function(t){e.$set(e.release,"changelog",t)},expression:"release.changelog"}})],1)],1),e._v(" "),a("el-row",{attrs:{type:"flex",justify:"end"}},[a("el-button",{on:{click:function(t){e.upload_success=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),a("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.creating,expression:"creating",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary"},on:{click:e.createRelease}},[e._v(e._s(e.$t("table.confirm")))])],1)],1)},staticRenderFns:[]};var o=a("VU/8")(n,r,!1,function(e){a("qDRZ")},"data-v-44e7b017",null);t.default=o.exports},pQox:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.el-tag + .el-tag[data-v-44e7b017] {\n  margin-left: 10px;\n}\n.button-new-tag[data-v-44e7b017] {\n  margin-left: 10px;\n  height: 32px;\n  line-height: 30px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.input-new-tag[data-v-44e7b017] {\n  width: 90px;\n  margin-left: 10px;\n  vertical-align: bottom;\n}\n",""])},qDRZ:function(e,t,a){var l=a("pQox");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("660ddfda",l,!0)}});