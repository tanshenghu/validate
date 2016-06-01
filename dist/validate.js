define("widget/validate/1.0.0/validate",["$","./validate.extend","./validate.messages"],function(a,b,c){var d=a("$"),e=d,f={init:function(a,b){return this.form=e(a),this.log=b,this.blur(),this.form.find(".formTip").remove(),this.form.find(".verify-err").removeClass("verify-err"),this.verify()&&0===this.form.find(".formTip").length},getele:function(){return this.form.find("[data-needverify]").not("[verifyignore]")},verify:function(){var a=this,b=this.getele(),c={result:!0};return b.each(function(b,d){c=a.getrules(d),"log"==a.log&&!c.result&&window.console&&console.log(d.name+".value="+d.value+"->"+c.rulesName)}),c.result},getrules:function(a){var b=e(a).data("needverify"),c=!0,d="";if(b)for(var f=b.split(","),g=0,h=f.length;h>g;g++)if(c=this.exeRules({rls:f[g],ele:a,curRules:g}),c===!1){d=f[g];break}return{result:c,rulesName:d}},exeRules:function(a){var b=a.rls,c=a.ele,d=a.curRules;if("function"==typeof this.rules[b]){var e=this.rules[b].apply(this.form,[c]);return this.showmsg({result:e,ele:c,curRules:d,rls:b}),e}window.console&&console.log(b+" erroneous rules")},rules:{required:function(a){var b,a=e(a),c=a.attr("type")&&a.attr("type").toLowerCase(),d=this;if("radio"===c||"checkbox"===c){var f=a.attr("name"),g=d.find('[name="'+f+'"]:checked');b=0===g.length?!1:!0}else b=0===e.trim(a.val()).length?!1:!0;return b},"int":function(a){return/^\d+$|^$/.test(e(a).val())}},verifymsg:{required:"必填","int":"请输入整数"},showmsg:function(a){var b=a.result,c=e(a.ele),d=a.curRules,f=a.rls,g=c.closest("td,.formfield"),h=c.data("verifymsg")?c.attr("data-verifymsg").split("|"):[],i=h[d]||this.verifymsg[f]||"错误";b===!1?(c.addClass("verify-err"),g.find(".formTip").length?g.find(".formTip").first().html(i).attr("inputname",c.attr("name")):g.append(e('<p class="formTip">'+i+"</p>").attr("inputname",c.attr("name")))):(c.is(":radio,:checkbox")?this.form.find(':radio[name="'+c.attr("name")+'"],:checkbox[name="'+c.attr("name")+'"]').removeClass("verify-err"):c.removeClass("verify-err"),g.find(".formTip").attr("inputname")==c.attr("name")&&g.find(".formTip").remove())},blurIdx:0,blur:function(){var a=this;if(this.blurIdx<1){var a=this;e("body").on("blur change","[data-needverify]",function(){e(this).attr("verifyignore")||a.getrules(this)})}this.blurIdx++}},g=a("./validate.extend"),h=a("./validate.messages");f.rules=e.extend(f.rules,g),f.verifymsg=e.extend(f.verifymsg,h),c.exports=f}),define("widget/validate/1.0.0/validate.extend",[],function(){var a={};return a.decimals=function(a){var b=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a.value);return b},a.phone=function(a){var b=/^1[3578][0-9]{9}$|^$/.test(a.value);return b},a.tel=function(a){var b=/^(0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$|^$/.test(a.value);return b},a.QQ=function(a){var b=/^[1-9]\d{5,10}$|^$/.test(a.value);return b},a.Hanzi=function(a){var b=/^[\u4e00-\u9fa5]+$|^$/.test(a.value);return b},a.zipcode=function(a){var b=/^[1-9]\d{5}$|^$/.test(a.value);return b},a.ID=function(a){var b=/^[1-9]\d{16}(\d|X)$|^$/.test(a.value);return b},a.IP=function(a){var b=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$|^$/.test(a.value);return b},a.port=function(a){var b=a.value,c=b>0&&65536>b;return c},a.equalTo=function(a){var b=$(a),c=$(b.attr("eqto")),d=b.val()===c.val();return d},a.date=function(a){var b=/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a.value);return b},a.url=function(a){var b=/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/.test(a.value);return b},a.email=function(a){var b=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a.value);return b},a}),define("widget/validate/1.0.0/validate.messages",[],function(){var a={};return a.phone="请输入正确的手机号码",a.tel="请输入正确的电话号码",a.QQ="请输入正确的QQ号码",a.Hanzi="只能输入中文汉字",a.zipcode="请输入正确的邮编",a.ID="请输入正确的身份证号码",a.IP="请输入正确的IP网段",a.port="请输入正确的端口号",a.equalTo="两次输入的内容不一致",a.date="请输入正确的日期格式",a});