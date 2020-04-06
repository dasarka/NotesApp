/**
 * import statement
 */
const chalk = require('chalk');
const log=console.log;
/**
 * infoMsg
 * @author ARKA DAS
 * @description log all kind of information
 * @param {string} msg string
 */
const infoMsg = msg =>{
    log(chalk.blue(msg));
};
/**
 * warningMsg
 * @author ARKA DAS
 * @description log all kind of warning
 * @param {string} msg string
 */
const warningMsg = msg =>{
    log(chalk.yellow(msg));
}
/**
 * errorMsg
 * @author ARKA DAS
 * @description log all kind of error
 * @param {string} msg string
 */
const errorMsg = msg =>{
    log(chalk.red(msg));
}
/**
 * successMsg
 * @author ARKA DAS
 * @description log all kind of success
 * @param {string} msg string
 */
const successMsg = msg =>{
    log(chalk.green(msg));
}
/**
 * whiteboardMsg
 * @author ARKA DAS
 * @description log all kind of user's output
 * @param {string} msg string
 */
const whiteboardMsg = msg =>{
    log(chalk.whiteBright(msg))
}
/**
 * export statement
 */
module.exports = {
    info: infoMsg,
    warn: warningMsg,
    success: successMsg,
    error: errorMsg,
    whiteboard: whiteboardMsg
};