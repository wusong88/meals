// sql语句
var sqlMap = {

    //登录
    login: {
        normalLogin: `select * from account_data where Account_Name = ? and Account_Pwd = ?`
    },
    //部门list
    departmentIdList: {
        departmentIdSqlList: `select ID,Name from t_department`
    },
    //员工基本信息
    employee: {
        employeeBasic: `select * from t_employee_basic where Account = ?`
    },
    // 报饭信息
    mealInfo: {
        mealInsert: `INSERT INTO counts(Account_ID,name,department,lunch,dinner)
                     SELECT ?, ?, ?, ?,?
                     FROM DUAL
                     WHERE NOT EXISTS(SELECT name FROM counts WHERE to_days(update_time) = to_days(now()) and name = ?)`,

        mealSelect:`select * from counts where to_days(update_time) = to_days(now()) and Account_ID = ?`,
        mealDelete:`delete from  counts where to_days(update_time) = to_days(now()) and Account_ID = ?`,
        mealUpdate:`update counts set department = ? , lunch = ? , dinner = ? where to_days(update_time) = to_days(now()) and Account_ID = ?;`,
    },
    //查结果信息
    mealCount: {
        mealCountLunch: `select count(*) from counts where to_days(update_time) = to_days(now()) and lunch = '1'`,
        mealCountDinner: `select count(*) from counts where to_days(update_time) = to_days(now()) and dinner = '1'`,
        whosDinner:`SELECT t_department.Name,GROUP_CONCAT(counts.name),COUNT(*)FROM t_department,counts WHERE
                    t_department.ID=counts.department AND
                    to_days(update_time) = to_days(now()) AND
                    dinner = '1'
                    GROUP BY t_department.ID
                    ORDER BY COUNT(*)DESC`,
    },

}

module.exports = sqlMap;
