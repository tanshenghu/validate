define("widget/validate/1.0.0/validate-debug", [ "$-debug", "./validate.extend-debug", "./validate.messages-debug" ], function(require, exports, module) {
    var jQuery = require("$-debug"), $ = jQuery, validate = {
        // 验证 初始化，最终返回布尔值 true/false
        init: function(form, log) {
            this.form = $(form);
            this.log = log;
            // 可选，主要是用于log一下，看哪些元素没有通过，把它console出来
            this.blur();
            this.form.find(".formTip").remove();
            this.form.find(".verify-err").removeClass("verify-err");
            return this.verify() && this.form.find(".formTip").length === 0;
        },
        // 在表单下面捕获所有需要验证的节点元素
        getele: function() {
            return this.form.find("[data-needverify]").not("[verifyignore]");
        },
        // 遍历所有需要验证的节点元素，并逐个去验证
        verify: function() {
            var This = this, eles = this.getele(), result = {
                result: true
            };
            eles.each(function(i, ele) {
                result = This.getrules(ele);
                This.log == "log" && !result.result && window.console && console.log(ele.name + ".value=" + ele.value + "->" + result.rulesName);
            });
            return result.result;
        },
        // 查找需要验证节点元素上面所有验证规则种类，即 必填|地址
        getrules: function(ele) {
            var need = $(ele).data("needverify"), result = true, rulesName = "";
            if (need) {
                var arr = need.split(",");
                for (var i = 0, l = arr.length; i < l; i++) {
                    // 第一个参数是规则，当前验证节点，当前验证到N个规则
                    result = this.exeRules({
                        rls: arr[i],
                        ele: ele,
                        curRules: i
                    });
                    /*
                            在这里做了判断，每个节点按顺序，队列式逐个去规则验证
                            一个规则验证不通过将不再验证下一个规则
                        */
                    if (result === false) {
                        rulesName = arr[i];
                        break;
                    }
                }
            }
            return {
                result: result,
                rulesName: rulesName
            };
        },
        // 调用 验证规则方法
        exeRules: function(param) {
            var rls = param.rls, ele = param.ele, curRules = param.curRules;
            if (typeof this.rules[rls] === "function") {
                var result = this.rules[rls].apply(this.form, [ ele ]);
                // 把验证结果 抛给showmsg方法去处理,  下次抽时间把msg这块的信息尽量配置在js中
                this.showmsg({
                    result: result,
                    ele: ele,
                    curRules: curRules,
                    rls: rls
                });
                return result;
            } else {
                window.console && console.log(rls + " erroneous rules");
            }
        },
        // 校验 规则 只列部分。为减小文件体积将规则写进扩展文件里面
        rules: {
            required: function(ele) {
                var ele = $(ele), type = ele.attr("type") && ele.attr("type").toLowerCase(), form = this, lenVal;
                if (type === "radio" || type === "checkbox") {
                    var name = ele.attr("name");
                    var checked = form.find('[name="' + name + '"]:checked');
                    lenVal = checked.length === 0 ? false : true;
                } else {
                    lenVal = $.trim(ele.val()).length === 0 ? false : true;
                }
                return lenVal;
            },
            "int": function(ele) {
                return /^\d+$|^$/.test($(ele).val());
            }
        },
        // 校验提示信息 这块代码是后来添加的，如果标签上没有配置data-verifymsg，这里就会起效
        verifymsg: {
            required: "必填",
            "int": "请输入整数"
        },
        // 验证结果处理 显示错误信息/移除错误节点标签
        showmsg: function(param) {
            var result = param.result, ele = $(param.ele), curRules = param.curRules, rls = param.rls;
            var fbox = ele.closest("td,.formfield"), messages = ele.data("verifymsg") ? ele.attr("data-verifymsg").split("|") : [];
            // 15-12-21 修改，发现有小bug，data它会数据缓存不会时时去取msg
            var msgTip = messages[curRules] || this.verifymsg[rls] || "错误";
            if (result === false) {
                // 16-03-29添加
                ele.addClass("verify-err");
                if (fbox.find(".formTip").length) {
                    fbox.find(".formTip").first().html(msgTip).attr("inputname", ele.attr("name"));
                } else {
                    fbox.append($('<p class="formTip">' + msgTip + "</p>").attr("inputname", ele.attr("name")));
                }
            } else {
                ele.is(":radio,:checkbox") ? this.form.find(':radio[name="' + ele.attr("name") + '"],:checkbox[name="' + ele.attr("name") + '"]').removeClass("verify-err") : ele.removeClass("verify-err");
                if (fbox.find(".formTip").attr("inputname") == ele.attr("name")) {
                    fbox.find(".formTip").remove();
                }
            }
        },
        // 这里是属性值，给需要验证的节点添加blur事件。这里的属性是防止事件重复绑定
        blurIdx: 0,
        blur: function() {
            var This = this;
            if (this.blurIdx < 1) {
                var This = this;
                //eles = this.getele();
                // o={text:'blur',textarea:'blur',select:'select',checkbox:'change',radio:'change'};
                $("body").on("blur change", "[data-needverify]", function() {
                    $(this).attr("verifyignore") || This.getrules(this);
                });
            }
            this.blurIdx++;
        }
    };
    var rules = require("./validate.extend-debug"), verifymsg = require("./validate.messages-debug");
    validate.rules = $.extend(validate.rules, rules);
    validate.verifymsg = $.extend(validate.verifymsg, verifymsg);
    module.exports = validate;
});

define("widget/validate/1.0.0/validate.extend-debug", [], function(require, exports, module) {
    var validate_rules = {};
    // 小数
    validate_rules.decimals = function(ele) {
        var result = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(ele.value);
        return result;
    };
    // 手机号码
    validate_rules.phone = function(ele) {
        var result = /^1[3578][0-9]{9}$|^$/.test(ele.value);
        return result;
    };
    // 电话/传真
    validate_rules.tel = function(ele) {
        var result = /^(0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$|^$/.test(ele.value);
        return result;
    };
    // QQ号码
    validate_rules.QQ = function(ele) {
        var result = /^[1-9]\d{5,10}$|^$/.test(ele.value);
        return result;
    };
    // 中文汉字
    validate_rules.Hanzi = function(ele) {
        var result = /^[\u4e00-\u9fa5]+$|^$/.test(ele.value);
        return result;
    };
    // 邮编
    validate_rules.zipcode = function(ele) {
        var result = /^[1-9]\d{5}$|^$/.test(ele.value);
        return result;
    };
    // 身份证
    validate_rules.ID = function(ele) {
        var result = /^[1-9]\d{16}(\d|X)$|^$/.test(ele.value);
        return result;
    };
    // ip
    validate_rules.IP = function(ele) {
        var result = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$|^$/.test(ele.value);
        return result;
    };
    // 端口号
    validate_rules.port = function(ele) {
        var value = ele.value;
        var result = value > 0 && value < 65536;
        return result;
    };
    // 比较两个文本域的内容是否一致
    validate_rules.equalTo = function(ele) {
        var thisObj = $(ele), eqto = $(thisObj.attr("eqto"));
        var result = thisObj.val() === eqto.val();
        return result;
    };
    // 日历类型 yyyy-mm-dd
    validate_rules.date = function(ele) {
        var result = /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(ele.value);
        return result;
    };
    // url
    validate_rules.url = function(ele) {
        var result = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/.test(ele.value);
        return result;
    };
    // email
    validate_rules.email = function(ele) {
        var result = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(ele.value);
        return result;
    };
    return validate_rules;
});

define("widget/validate/1.0.0/validate.messages-debug", [], function(require, exports, module) {
    var verifymsg = {};
    verifymsg.phone = "请输入正确的手机号码";
    verifymsg.tel = "请输入正确的电话号码";
    verifymsg.QQ = "请输入正确的QQ号码";
    verifymsg.Hanzi = "只能输入中文汉字";
    verifymsg.zipcode = "请输入正确的邮编";
    verifymsg.ID = "请输入正确的身份证号码";
    verifymsg.IP = "请输入正确的IP网段";
    verifymsg.port = "请输入正确的端口号";
    verifymsg.equalTo = "两次输入的内容不一致";
    verifymsg.date = "请输入正确的日期格式";
    return verifymsg;
});
