// 导入数据库操作模块
const db = require('../db/index')
    // 导入全局的配置文件
const config = require('../config')

// 上传题库信息的处理函数
exports.upload_QuestionBank = (req, res) => {
    const info = req.body
        // 定义 SQL 语句，插入员工信息
    const sqlStr = 'insert into question_bank(UId,QBName,QBInformation) values(?,?,?)'
    db.query(sqlStr, [req.user.UId, info.QBName, info.QBInformation], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('题库添加成功！', 0)
    })
}

//获取题库信息的处理函数
exports.get_QuestionBank = (req, res) => {
    page = req.query.page || 0;
    size = req.query.size || 1000;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'select * from question_bank where UId=? limit ' + page + ',' + size;
            conn.query(sql, req.user.UId, (err, result) => {
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

//删除题库信息的处理函数
exports.delete_QuestionBank = (req, res) => {
    QBId = req.query.QBId;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'delete from question_bank where QBId=?';
            conn.query(sql, [QBId], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.affectedRows == 0) {
                        res.cc("不存在该题库", 1);
                    } else {
                        res.cc("删除成功", 0);
                    }
                    conn.release();
                }
            })
        }
    })
}

//更新题库信息的处理函数
exports.update_QuestionBank = (req, res) => {
    const info = req.query
    const sqlStr = 'update question_bank set QBname=?,QBinformation=? where QBId=?'
    db.query(sqlStr, [info.QBName, info.QBInformation, info.QBId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('题库信息修改成功！', 0)
    })
}