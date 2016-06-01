## `validate` By TanShenghu

<br>

**validate方法是我在阿里信息平台做财资系统时所写，当时阿里内外组件库中也有这类的组件，觉得不是很合适我这边项目的场景，于是自己抽了点时间写了一个**

<br>

---

> - 简单的表单验证方法，需要把验证规则写进标签中，message可配置标签中或js文件中，验证支持临时创建新添加的节点

---

[demo](http://www.tanshenghu.com/widget/validate/examples/validate.html)

## html


````html

<form>
		<table>
			<tr>
				<th>用户名：</th>
				<td><input type="text" name="username" data-needverify="required" data-verifymsg="一定要填写用户名哦"></td>
			</tr>
			<tr>
				<th>性别：</th>
				<td>
					<input type="radio" name="sex" value="男" data-needverify="required">男
					<input type="radio" name="sex" value="女" data-needverify="required">女
				</td>
			</tr>
			<tr>
				<th>出生年份：</th>
				<td>
					<select name="year" data-needverify="required">
						<option value="">请选择</option>
						<option value="1985">1985</option>
						<option value="1986">1986</option>
						<option value="1987">1987</option>
						<option value="1988">1988</option>
						<option value="1989">1989</option>
						<option value="1990">1990</option>
					</select>
				</td>
			</tr>
			<tr>
				<th>兴趣爱好：</th>
				<td>
					<label><input type="checkbox" name="hobby" value="咏春拳" data-needverify="required">咏春拳</label> 
			        <label><input type="checkbox" name="hobby" value="陈式太极" data-needverify="required">陈式太极</label> 
			        <label><input type="checkbox" name="hobby" value="八卦掌" data-needverify="required">八卦掌</label> 
			        <label><input type="checkbox" name="hobby" value="形意拳" data-needverify="required">形意拳</label> 
			        <label><input type="checkbox" name="hobby" value="洪拳" data-needverify="required">洪拳</label> 
			        <label><input type="checkbox" name="hobby" value="铁线拳" data-needverify="required">铁线拳</label> 
			        <label><input type="checkbox" name="hobby" value="蔡李佛" data-needverify="required">蔡李佛</label> 
			        <label><input type="checkbox" name="hobby" value="自然门" data-needverify="required">自然门</label> 
			        <label><input type="checkbox" name="hobby" value="截拳道" data-needverify="required">截拳道</label>
				</td>
			</tr>
			<tr>
				<th>邮箱：</th>
				<td><input type="text" name="email" data-needverify="required,email" data-verifymsg="邮箱必填|邮箱格式不对哦"></td>
			</tr>
			<tr>
				<th>手机：</th>
				<td><input type="text" name="phone" data-needverify="required,phone"></td>
			</tr>
			<tr>
				<th>备注</th>
				<td>
					<textarea name="content" data-needverify="required"></textarea>
				</td>
			</tr>
		</table>
		<p align="center"><input type="button" value="提 交" id="submit"></p>
	</form>

````


## javascript


```javascript

seajs.use(['$','validate'], function($, Validate){
		
	$('#submit').on('click', function(){
	
		var form = Validate.init( 'form' );
		if( form ){
			
			// 验证通过准备ajax提交后端...
			
		}
		
	});
	
});

```

## 参数说明

```

 只有一个参数，当前表单的form节点，不限于form标签，div也行
 
 另外验证项需要配置在标签中，验证信息可配置在标签或者js文件中，标签配置优先于js文件配置
 
 注意点：验证的文本域还需要配name属性
 
 另外有一些特殊的操作情况，偶尔会因用户某些操作行为有一些节点元素不需要参数验证了，那么在这个节点上赋verifyignore属性就可以了
 
 具体在上面的实例标签、代码中都有体现...

```


### 完 End