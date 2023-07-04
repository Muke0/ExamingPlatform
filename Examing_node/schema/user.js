// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const UName = joi.string().min(1).max(20).required()
const UPassword = joi.string().pattern(/^[\S]{8,12}$/).required()

// 定义 id, nickname, email 的验证规则
const id = joi.number().integer().min(1).required()

// 定义验证 avatar 头像的验证规则
const avatar = joi.string().dataUri().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        UName,
        UPassword,
    },
}

exports.reg_register_schema = {
    body: {
        UName,
        UPassword,
    },
}

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    // 需要对 req.body 里面的数据进行验证
    body: {},
}

// 验证规则对象 - 更新密码
exports.update_password_schema = {
    body: {
        oldPwd: UPassword,
        newPwd: joi.not(joi.ref('oldPwd')).concat(UPassword),
    },
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}