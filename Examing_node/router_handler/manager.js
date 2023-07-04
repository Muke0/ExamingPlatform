// 导入数据库操作模块
const db = require('../db/index')
    // 导入全局的配置文件
const config = require('../config')

// 上传员工信息的处理函数
exports.upload_staff = (req, res) => {
    const info = req.body
        // 定义 SQL 语句，插入员工信息
    const sqlStr = 'insert into employee(Sid,Sname,Sposition,Sbasepay,Sbonus,Sworktime) values(?,?,?,?,?,?)'
    db.query(sqlStr, [info.Sid, info.Sname, info.Sposition, info.Sbasepay, info.Sbonus, info.Sworktime], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('员工添加成功！', 0)
    })
}

//获取员工信息的处理函数
exports.get_staff = (req, res) => {
    page = req.query.page || 0;
    size = req.query.size || 1000;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'select * from employee limit ' + page + ',' + size;
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result)
                    conn.release();
                }
            })
        }
    })
}

//删除员工信息的处理函数
exports.delete_staff = (req, res) => {
    Sid = req.body.Sid;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'delete from employee where Sid=?';
            conn.query(sql, [Sid], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.affectedRows == 0) {
                        res.cc("不存在该员工", 1);
                    } else {
                        res.cc("删除成功", 0);
                    }
                    conn.release();
                }
            })
        }
    })
}

//更新员工信息的处理函数
exports.update_staff = (req, res) => {
    const info = req.body
    const sqlStr = 'update employee set Sname=?,Sposition=?,Sbasepay=?,Sbonus=?,Sworktime=? where Sid=?'
    db.query(sqlStr, [info.Sname, info.Sposition, info.Sbasepay, info.Sbonus, info.Sworktime, info.Sid], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('员工信息修改成功！', 0)
    })
}