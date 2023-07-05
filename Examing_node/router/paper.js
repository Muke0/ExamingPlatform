const express = require('express')
const router = express.Router()

// 导入经理路由处理函数对应的模块
const manager_handler = require('../router_handler/paper')

// 上传试卷信息
router.post('/', manager_handler.upload_paper)

//获取试卷信息
router.get('/', manager_handler.get_paper)

//删除试卷信息
router.delete('/', manager_handler.delete_paper)

//修改试卷信息
router.put('/', manager_handler.update_paper)

// 选择题目加入试卷
router.post('/question', manager_handler.choose_question)
module.exports = router