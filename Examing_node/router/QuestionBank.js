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
module.exports = router