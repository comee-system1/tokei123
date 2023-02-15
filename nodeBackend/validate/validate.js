const {
    check,
} = require('express-validator');

let errorCheck = [];
errorCheck = [
    check('traceid').not().isEmpty().isInt(),
    check('uniqid').not().isEmpty().isInt(),
    //check('sample').not().withMessage("error1").isInt().withMessage("error2").if(value => value !== null).withMessage("error3"),
    check('ymd').isEmpty().custom(value => {
        const matches = value.match(/^[0-9]{8}$/);
        const dt = yyyymmddToDate(value);
        if (!matches || isNaN(dt)) {
            throw new Error();
        }

        return true;
    }).optional({
        checkFalsy: true
    })
];

const config = {
    ERRORCHECK: errorCheck,
}

module.exports = config;

function yyyymmddToDate(s) {
    let y = s.slice(0, 4); // YYYY
    let m = s.slice(4, 6); // MM
    let d = s.slice(6, 8); // DD
    return new Date(+y, +m - 1, d);
}