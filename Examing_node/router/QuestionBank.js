const express = require('express')
const router = express.Router()

// 导入经理路由处理函数对应的模块
const QuestionBank_handler = require('../router_handler/QuestionBank')

// 上传题库信息
router.post('/', QuestionBank_handler.upload_QuestionBank)

//获取题库信息
router.get('/', QuestionBank_handler.get_QuestionBank)

//删除题库信息
router.delete('/', QuestionBank_handler.delete_QuestionBank)

//修改题库信息
router.put('/', QuestionBank_handler.update_QuestionBank)

// 上传题目信息
router.post('/question', QuestionBank_handler.upload_Question)

//获取题目信息
router.get('/question', QuestionBank_handler.get_Question)

//删除题目信息
router.delete('/question', QuestionBank_handler.delete_Question)

//修改题目信息
router.put('/question', QuestionBank_handler.update_Question)
module.exports = router