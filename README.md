# y

> y

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



# 九博报饭系统 [本地项目地址](http://localhost:8080/#/login)

# 准备用 vue + nodejs + express + mysql 去实现
	其他依赖：bootstrap

			body-parser（处理表单post请求）

	* 最大的难点在选择部门登录，数据库部分



# 路由设计

	/meals/login		报饭登录页
	/meals/countoff		主页
	/meals/hrlogin		人力登录页
	/meals/total		结果页



1.选择部门登录
	选择部门
	填写账号
	填写密码
	忘记密码
	修改重置密码


2.报饭
	午饭	：填写数量，可以修改（9点之后不可修改）
	晚饭	：填写数量，具体人名，可以修改（9点之后不可修改）

	8点50前系统提示报饭




账号密码登录 > 获取Account_ID 账号 密码

进入报饭页 根据获取的Account_ID select里显示所在的部门

部门可以选择

报饭>提交>入库>
#每天报饭一次，并且产生一条数据
查询姓名和时间来判断今天有没有报饭，
如果没有报饭数据入库
如果有提示已经报饭




INSERT INTO table(field1, field2, fieldn)
SELECT 'field1', 'field2', 'fieldn'
FROM DUAL
WHERE NOT EXISTS(SELECT field FROM table WHERE field = ?);


查询当天数据，如果没有姓名，插入

INSERT INTO counts(name)
SELECT '赵四'
FROM DUAL
WHERE NOT EXISTS(SELECT name FROM counts WHERE to_days(update_time) = to_days(now()) and name = '赵四');




select *
from counts
where to_days(update_time) = to_days(now());



select * from counts where to_days(update_time) = to_days(now()) and Account_ID = 1585;
delete from  counts where to_days(update_time) = to_days(now()) and Account_ID = 1585;
update counts set lunch = '', dinner = '1' where to_days(update_time) = to_days(now()) and Account_ID = 1585;

登录成功进入报饭页面，
查询今天有没有报饭
  如果没有 显示报饭模块
  如果有 显示修改和删除模块


实例：


update counts
set
    lunch = '1',
    dinner = '1'
where
    to_days(update_time) = to_days(now()) and Account_ID = 1585;




select count(*) from counts;
select count(*) from counts where lunch = '1';
select count(*) from counts where dinner = '1';


select * from counts where to_days(update_time) = to_days(now()) and dinner = '1';


查 当天 每个部门晚饭人数
查 当天 每个部门订晚饭的人名

select * from counts group by department;
select department ,group_concat(name) ,count(*) from counts group by department;



select department,count(*) from counts where to_days(update_time) = to_days(now()) group by department;





7：查询每个部门各有多少人，显示部门名字和人数，按人数倒序，


SELECT t_department.Name,COUNT(*) FROM t_department,counts WHERE
t_department.ID=counts.department
GROUP BY t_department.ID
ORDER BY COUNT(*)DESC;






##最终版
SELECT t_department.Name,GROUP_CONCAT(counts.name),COUNT(*)FROM t_department,counts WHERE
t_department.ID=counts.department AND
to_days(update_time) = to_days(now()) AND
dinner = '1'
GROUP BY t_department.ID
ORDER BY COUNT(*)DESC;
