const express = require('express')
const router = express.Router()

// 导入经理路由处理函数对应的模块
const manager_handler = require('../router_handler/manager')

// 上传教职工信息
router.post('/staff', manager_handler.upload_staff)

//获取教职工信息
router.get('/staff', manager_handler.get_staff)

//删除教职工信息
router.delete('/staff', manager_handler.delete_staff)

//修改教职工信息
router.put('/staff', manager_handler.update_staff)
module.exports = router