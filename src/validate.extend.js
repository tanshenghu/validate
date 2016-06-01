define(function(require, exports, module){
    
    var validate_rules = {};
    
    // 小数
    validate_rules.decimals = function( ele ){
        var result = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test( ele.value );
        return result;
    };
    // 手机号码
    validate_rules.phone = function( ele ){
        var result = /^1[3578][0-9]{9}$|^$/.test( ele.value );
        return result;
    };
    // 电话/传真
    validate_rules.tel = function( ele ){
        var result = /^(0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$|^$/.test( ele.value );
        return result;
    };
    // QQ号码
    validate_rules.QQ = function( ele ){
        var result = /^[1-9]\d{5,10}$|^$/.test( ele.value );
        return result;
    };
    // 中文汉字
    validate_rules.Hanzi = function( ele ){
        var result = /^[\u4e00-\u9fa5]+$|^$/.test( ele.value );
        return result;
    };
    // 邮编
    validate_rules.zipcode = function( ele ){
        var result = /^[1-9]\d{5}$|^$/.test( ele.value );
        return result;
    };
    // 身份证
    validate_rules.ID = function( ele ){
        var result = /^[1-9]\d{16}(\d|X)$|^$/.test( ele.value );
        return result;
    };
    // ip
    validate_rules.IP = function( ele ){
        var result = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$|^$/.test( ele.value );
        return result;
    };
    // 端口号
    validate_rules.port = function( ele ){
        var value = ele.value;
        var result = (value>0 && value<65536);
        return result;
    };
    // 比较两个文本域的内容是否一致
    validate_rules.equalTo = function( ele ){
        var thisObj = $(ele), eqto = $( thisObj.attr('eqto') );
        var result = thisObj.val()===eqto.val();
        return result;
    };
    // 日历类型 yyyy-mm-dd
    validate_rules.date = function( ele ){
        var result = /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test( ele.value );
        return result;
    };
    // url
    validate_rules.url = function( ele ){
        var result = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/.test( ele.value );
        return result;
    };
    // email
    validate_rules.email = function( ele ){
        var result = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test( ele.value );
        return result;
    };

    return validate_rules;

});