define(function(require, exports, module){

    var jQuery = require( '$' ), $ = jQuery,

    validate = {
        
        // 验证 初始化，最终返回布尔值 true/false
        init: function( form, log ){
            this.form = $( form );
            this.log  = log; // 可选，主要是用于log一下，看哪些元素没有通过，把它console出来
            this.blur();
            
            this.form.find('.formTip').remove();
            this.form.find('.verify-err').removeClass('verify-err');
            
            return this.verify() && this.form.find('.formTip').length===0;
        },
        // 在表单下面捕获所有需要验证的节点元素
        getele: function(){
            return this.form.find('[data-needverify]').not('[verifyignore]');
        },
        // 遍历所有需要验证的节点元素，并逐个去验证
        verify: function(){
            var This = this, eles = this.getele(), result = {result:true};
            eles.each(function(i, ele){
                result = This.getrules( ele );
                This.log=='log' && !result.result && window.console&&console.log( ele.name+'.value='+ele.value+'->'+result.rulesName );
            });
            
            return result.result;
        },
        // 查找需要验证节点元素上面所有验证规则种类，即 必填|地址
        getrules: function( ele ){
            var need = $(ele).data('needverify'), result = true, rulesName = '';
                if( need ){
                    var arr = need.split(',');
                    for(var i=0,l=arr.length; i<l; i++){
                        // 第一个参数是规则，当前验证节点，当前验证到N个规则
                        result = this.exeRules( {rls:arr[i], ele:ele, curRules:i} );
                        /*
                            在这里做了判断，每个节点按顺序，队列式逐个去规则验证
                            一个规则验证不通过将不再验证下一个规则
                        */
                        if( result===false ){
                            rulesName = arr[i];
                            break;
                        }
                    }
                }
                
            return {result:result,rulesName:rulesName};
                
        },
        // 调用 验证规则方法
        exeRules: function( param ){
            var rls      = param.rls,
                ele      = param.ele,
                curRules = param.curRules;
            
            if ( typeof this.rules[ rls ] === 'function' ){
                var result = this.rules[ rls ].apply( this.form, [ele] );
                // 把验证结果 抛给showmsg方法去处理,  下次抽时间把msg这块的信息尽量配置在js中
                this.showmsg( {result:result, ele:ele, curRules:curRules, rls:rls} );
                return result;
            }else{
                window.console&&console.log(rls+' erroneous rules');
            }
            
        },
        // 校验 规则 只列部分。为减小文件体积将规则写进扩展文件里面
        rules: {
            required: function( ele ){
                
                var ele = $( ele ), type = ele.attr('type') && ele.attr('type').toLowerCase(), form = this, lenVal;
                
                if( type==='radio' || type==='checkbox' ){
                    
                    var name = ele.attr('name');
                    var checked = form.find( '[name="'+name+'"]:checked' );
                    lenVal = checked.length===0 ? false : true;
                    
                }else{
                    lenVal = $.trim( ele.val() ).length===0 ? false : true;
                }

                return lenVal
            },
            int: function( ele ){
                return /^\d+$|^$/.test( $(ele).val() );
            }
        },
        // 校验提示信息 这块代码是后来添加的，如果标签上没有配置data-verifymsg，这里就会起效
        verifymsg: {
            required: '必填',
            int: '请输入整数'
        },
        // 验证结果处理 显示错误信息/移除错误节点标签
        showmsg: function( param ){
            var result   = param.result,
                ele      = $(param.ele),
                curRules = param.curRules,
                rls      = param.rls;
                
            var fbox     = ele.closest('td,.formfield'),
                messages = ele.data('verifymsg') ? ele.attr('data-verifymsg').split('|') : []; // 15-12-21 修改，发现有小bug，data它会数据缓存不会时时去取msg
            
            var msgTip   = messages[ curRules ] || this.verifymsg[ rls ] || '错误';
            
            if( result===false ){
                // 16-03-29添加
                ele.addClass('verify-err');
                if( fbox.find('.formTip').length ){
                    fbox.find('.formTip').first().html( msgTip  ).attr('inputname', ele.attr('name'));
                }else{
                    fbox.append( $('<p class="formTip">'+ msgTip +'</p>').attr('inputname', ele.attr('name')) );
                }
            }else{
                ele.is(':radio,:checkbox')?this.form.find(':radio[name="'+ele.attr('name')+'"],:checkbox[name="'+ele.attr('name')+'"]').removeClass('verify-err'):ele.removeClass('verify-err');
                
                if ( fbox.find('.formTip').attr('inputname')==ele.attr('name') ){
                    fbox.find('.formTip').remove();
                }
                
            }
        },
        // 这里是属性值，给需要验证的节点添加blur事件。这里的属性是防止事件重复绑定
        blurIdx : 0,
        blur: function(){
            
            var This = this;
            if( this.blurIdx<1 ){
                var This = this; //eles = this.getele();
                // o={text:'blur',textarea:'blur',select:'select',checkbox:'change',radio:'change'};
                
                $("body").on('blur change', '[data-needverify]', function( ){
                    
                    $(this).attr('verifyignore') || This.getrules( this );
                    
                });
                //=========fuck 阿里下拉框组件。为此验证还得另外写代码做付出===========
                
            }
            
            
            this.blurIdx++;
        }
        
    };
    
    var rules     = require( './validate.extend' ),
        verifymsg = require( './validate.messages' );

    validate.rules = $.extend( validate.rules, rules );
    validate.verifymsg = $.extend( validate.verifymsg, verifymsg );
    
    module.exports = validate;

});