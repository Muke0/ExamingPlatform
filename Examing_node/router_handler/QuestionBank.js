// 导入数据库操作模块
const db = require('../db/index')
    // 导入全局的配置文件
const config = require('../config')
const formidable = require('formidable');
var xlsx = require('node-xlsx');
const fs = require('fs')
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");
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


// 上传单个题目信息的处理函数
exports.upload_Question = (req, res) => {
    const info = req.body
        // 定义 SQL 语句，插入员工信息
    const sqlStr = 'insert into question(QBId,UId,Stem,A,B,C,D,Type,Answer,Difficulty) values(?,?,?,?,?,?,?,?,?,?)'
    db.query(sqlStr, [info.QBId, req.user.UId, info.Stem, info.A, info.B, info.C, info.D, info.Type, info.Answer, info.Difficulty], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('题目添加成功！', 0)
    })
}

//获取单个题库中的题目信息的处理函数
exports.get_Question = (req, res) => {
    page = req.query.page || 0;
    size = req.query.size || 1000;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'select * from question where QBId=? limit ' + page + ',' + size;
            conn.query(sql, req.query.QBId, (err, result) => {
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

//删除单个题目信息的处理函数
exports.delete_Question = (req, res) => {
    QId = req.query.QId;
    db.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'delete from question where QId=?';
            conn.query(sql, [QId], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.affectedRows == 0) {
                        res.cc("不存在该题目", 1);
                    } else {
                        res.cc("删除成功", 0);
                    }
                    conn.release();
                }
            })
        }
    })
}

//更新单个题目信息的处理函数
exports.update_Question = (req, res) => {
    const info = req.query
    const sqlStr = 'update question set QBId=?,UId=?,Stem=?,A=?,B=?,C=?,D=?,Type=?,Answer=?,Difficulty=? where QId=?'
    db.query(sqlStr, [info.QBId, req.user.UId, info.Stem, info.A, info.B, info.C, info.D, info.Type, info.Answer, info.Difficulty, info.QId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        res.cc('题目信息修改成功！', 0)
    })
}

exports.upload_Question_excel = (req, res) => {
    const QBId = req.body.QBId
    path = "./public/uploads/" + QBId + ".xlsx"
    readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();
        let excelData = [];
        rows.forEach((row) => {
            let info = {
                Stem: row[0],
                A: row[1],
                B: row[2],
                C: row[3],
                D: row[4],
                Type: row[5],
                Answer: row[6],
                Difficulty: row[7],
            };
            const sqlStr = 'insert into question(QBId,UId,Stem,A,B,C,D,Type,Answer,Difficulty) values(?,?,?,?,?,?,?,?,?,?)'
            db.query(sqlStr, [QBId, req.user.UId, info.Stem, info.A, info.B, info.C, info.D, info.Type, info.Answer, info.Difficulty], (err, results) => {
                // 执行 SQL 语句失败
                if (err) {
                    return res.cc(err)
                }
            })
            excelData.push(info);
            //console.log(excelData)
        });
    })
    res.cc('题目导入成功！', 0)
}