const {
    check,
} = require('express-validator');

let i18n = module.parent.exports.i18n;
let errorCheck = [];
errorCheck.push(
    check('traceid').not().isEmpty().withMessage(i18n.__("item.traceid") + i18n.__("validation.message.required")).isInt().withMessage(i18n.__("item.traceid") + i18n.__("validation.message.number")),
    check('uniqid').not().isEmpty().withMessage(i18n.__("item.uniqid") + i18n.__("validation.message.required")).isInt().withMessage(i18n.__("item.uniqid") + i18n.__("validation.message.number")),
    check('sample').not().isEmpty().withMessage("error1").isInt().withMessage("error2").if(value => value !== null).withMessage("error3"),


);

const config = {
    ERRORCHECK: errorCheck,
}

module.exports = config;