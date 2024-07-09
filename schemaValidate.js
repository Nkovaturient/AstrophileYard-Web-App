const Joi = require('joi');

module.exports.archiveSchema= Joi.object({
        title: Joi.string().min(5).max(60).required(),
        description: Joi.string().required(),
        caption: Joi.string().min(5).max(100).required(),
        facts: Joi.string().min(5).max(500).required(),
        image: Joi.string().allow("", null)
    }).required();


    module.exports.signUser= Joi.object({
        username: Joi.string().min(5).max(60).required(),
        password: Joi.string().min(5).max(60).required(),
        email: Joi.string().email().min(5).max(100).required(),
        category:Joi.string().valid("student", "astrophile", "working professional", "photographer", "stargazer", "just checking in"),
    }).required();

    
    module.exports.loginUser= Joi.object({
        password: Joi.string().min(5).max(60).required(),
        email: Joi.string().email().min(5).max(100).required(),
    }).required();

