// 导入数据库操作模块
const db = require('../db/index')
    // 导入全局的配置文件
const config = require('../config')

// 上传试卷信息的处理函数
exports.upload_paper = (req, res) => {
    const info = req.body
    console.log(info)
        // 定义 SQL 语句，插入员工信息
    const sqlStr = 'insert into paper(PName,PInformation,UId) values(?,?,?)'
    db.query(sqlStr, [info.PName, info.PInformation, req.user.UId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('试卷添加成功！', 0)
    })
}

//获取试卷信息的处理函数
exports.get_paper = (req, res) => {
    page = req.query.page || 0;
    size = req.query.size || 1000;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'select * from paper limit ' + page + ',' + size;
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

//删除试卷信息的处理函数
exports.delete_paper = (req, res) => {
    PId = req.body.PId;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'delete from paper where PId=?';
            conn.query(sql, [PId], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.affectedRows == 0) {
                        res.cc("不存在该试卷", 1);
                    } else {
                        res.cc("删除成功", 0);
                    }
                    conn.release();
                }
            })
        }
    })
}

//更新试卷信息的处理函数
exports.update_paper = (req, res) => {
    const info = req.body
    const sqlStr = 'update paper set PName=?,PInformation=? where PId=?'
    db.query(sqlStr, [info.PName, info.PInformation, info.PId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('试卷信息修改成功！', 0)
    })
}

exports.choose_question = (req, res) => {
    const info = req.body
    const PId = info.PId
    const QId = info.QId
    console.log(info)
    for (i = 0; i < QId.length; i++) {
        const sqlStr = 'insert into qp(QId,PId) values(?,?)'
        db.query(sqlStr, [QId[i], PId], (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.cc(err)
            }
        })
    }
    return res.cc('题目添加成功！', 0)
}

exports.auto_question = (req, res) => {
    const info = req.body
    const choice = info.choice
        // 定义 SQL 语句，插入员工信息
    const sqlStr = 'insert into qp(QId,PId) values(?,?)'
    db.query(sqlStr, [info.PName, info.PInformation, req.user.UId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('试卷添加成功！', 0)
    })
}

exports.get_paper_question = (req, res) => {
    page = req.query.page || 0;
    size = req.query.size || 1000;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'select * from question where QId in (select QId from paper where PId=?) ';
            conn.query(sql, [req.query.PId], (err, result) => {
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

exports.delete_paper_question = (req, res) => {
    const info = req.body
    const PId = info.PId
    const QId = info.QId
    for (i = 0; i < QId.length; i++) {
        const sqlStr = 'delete from qp where QId=? and PId=?';
        db.query(sqlStr, [QId[i], PId], (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.cc(err)
            }
        })
    }
    return res.cc('题目删除成功！', 0)
}