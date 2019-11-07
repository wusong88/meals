var express = require('express');
var mysql = require('mysql');
var md5 = require('md5-node');

var models = require('../db');
var $sql = require('../sqlMap');

var router = express.Router();
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();




// 登录接口
router.post('/login', (req, res) => {

  var username = req.body.username;
  var password = md5(req.body.password);
  var sql = $sql.login.normalLogin;
  //var sql = `select * from account_data where Account_Name = '${username}' and Account_Pwd = '${password}'`;
  conn.query(sql,[username,password], function(err, result) {
    if (err) {
      console.log(err);
    }

    if (result == '' || result == 'undefined') {
       return res.json({
        code: '1',
        msg: '账号或密码错误'
      })
    } else {
      result = JSON.stringify(result) //把result对象转为字符串，去掉RowDataPacket
      result = result.substring(1, result.length - 1)
      result = JSON.parse(result) //把result字符串转为json对象

      return res.send(result)
    }

  })

});


// 部门list接口
router.post('/departmentIdList', (req, res) => {
  var sql = $sql.departmentIdList.departmentIdSqlList;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    }

    if (result == '' || result == 'undefined') {
       return res.json({
        code: '1',
        msg: 'server error'
      })
    } else {
      // console.log(result);
      return res.send(result)
    }

  })

});


//  员工基本信息
router.post('/EmployeeBasic', (req, res) => {
  var Account_ID = req.body.Account_ID;
  var sql = $sql.employee.employeeBasic;
  conn.query(sql,[Account_ID], function(err, result) {
    if (err) {
      console.log(err);
    }

    if (result == '' || result == 'undefined') {
       return res.json({
        code: '1',
        msg: 'server error'
      })
    } else {
      result = JSON.stringify(result) //把result对象转为字符串，去掉RowDataPacket
      result = result.substring(1, result.length - 1)
      result = JSON.parse(result) //把result字符串转为json对象
      return res.send(result)
    }

  })

});



//  查询当天报饭数据 返回状态
router.post('/mealSelect', (req, res) => {
  var Account_ID = req.body.Account_ID
  var sql = $sql.mealInfo.mealSelect;
  conn.query(sql,[Account_ID], function(err, result) {
    if (err) {
      return res.json({
        code: '1',
        msg: 'error'
      })
    }

    if (result) {
      if (result == '') {
          return res.json({
           code: '0',
           msg: 'empty'
         })
      } else {
        result = JSON.stringify(result) //把result对象转为字符串，去掉RowDataPacket
        result = result.substring(1, result.length - 1)
        result = JSON.parse(result) //把result字符串转为json对象
        return res.send(result)
      }

    }

  })

});

//  插入报饭数据
router.post('/MealInsert', (req, res) => {
  var Account_ID = req.body.Account_ID
  var userName = req.body.userName
  var departmentId = req.body.departmentId;
  var lunch = req.body.lunch;
  var dinner = req.body.dinner;

  var sql = $sql.mealInfo.mealInsert;

  conn.query(sql,[Account_ID,userName,departmentId,lunch,dinner,userName], function(err, result) {
    if (err) {
     // console.log(err);
      return res.json({
        code: '1',
        msg: 'error'
      })
    }

    if (result) {
       return res.json({
         code: '0',
         msg: 'ok'
       })
    }

  })

});




//  删除报饭数据
router.post('/mealDelete', (req, res) => {
  var Account_ID = req.body.Account_ID
  var sql = $sql.mealInfo.mealDelete;

  conn.query(sql,[Account_ID], function(err, result) {
    if (err) {
      //console.log(err);
      return res.json({
        code: '1',
        msg: 'error'
      })
    }

    if (result) {
       return res.json({
         code: '0',
         msg: 'ok'
       })
    }

  })

});


// 修改报饭数据
router.post('/mealUpdate', (req, res) => {
  console.log(req.body)
  var Account_ID = req.body.Account_ID
  var departmentId = req.body.departmentId;
  var lunch = req.body.lunch;
  var dinner = req.body.dinner;

  var sql = $sql.mealInfo.mealUpdate;

  conn.query(sql,[departmentId,lunch,dinner,Account_ID], function(err, result) {
    if (err) {
     // console.log(err);
      return res.json({
        code: '1',
        msg: 'error'
      })
    }

    if (result) {
       return res.json({
         code: '0',
         msg: 'ok'
       })
    }

  })

});

// 查询当天午饭人数
router.post('/mealCountLunch', (req, res) => {
  var sql = $sql.mealCount.mealCountLunch;
  conn.query(sql, function(err, result) {
    if (err) {
      return res.json({
        code: '1',
        msg: 'error'
      })
    }

    if (result) {

      result = JSON.stringify(result) //把result对象转为字符串，去掉RowDataPacket
      result = result.substring(1, result.length - 1)
      result = result.replace('count(*)', 'lunchNum')
      result = JSON.parse(result) //把result字符串转为json对象

      return res.send(result)
    }

  })

});


// 查询当天晚饭人数
router.post('/mealCountDinner', (req, res) => {
  var sql = $sql.mealCount.mealCountDinner;
  conn.query(sql, function(err, result) {
    if (err) {
      return res.json({
        code: '1',
        msg: 'error'
      })
    }

    if (result) {

      result = JSON.stringify(result) //把result对象转为字符串，去掉RowDataPacket
      result = result.substring(1, result.length - 1)
      result = result.replace('count(*)', 'dinnerNum')
      result = JSON.parse(result) //把result字符串转为json对象

      return res.send(result)
    }

  })

});




// 查询当天 各部门晚饭数和人名
router.post('/whosDinner', (req, res) => {
  var sql = $sql.mealCount.whosDinner;
  conn.query(sql, function(err, result) {
    if (err) {
      return res.json({
        code: '1',
        msg: 'error'
      })
    }

    if (result) {
      result = JSON.stringify(result) //把result对象转为字符串，去掉RowDataPacket
      result = result.replace(/Name/g, 'deptName');
      result = result.replace(/GROUP_CONCAT\(counts.name\)/g, 'epmName');
      result = result.replace(/COUNT\(\*\)/g, 'num');
      result = JSON.parse(result) //把result字符串转为json对象
      console.log(result)
      return res.send(result)

    }

  })

});

module.exports = router;
