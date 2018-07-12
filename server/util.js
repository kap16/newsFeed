const chalk = require('chalk');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    /** 
     * Logs error message to console
     * @param str message 
     */
    logError(str){
        console.log(chalk.red('['+moment().format('L-LTS')+'] ERROR ')+str);
    },

    /** 
     * Logs warning message to console
     * @param str message 
     */
    logWarning(str){
        console.log(chalk.yellow('['+moment().format('L-LTS')+'] WARNING ')+str);
    },

    /** 
     * Logs success message to console
     * @param str message 
     */
    logSuccess(str){
        console.log(chalk.green('['+moment().format('L-LTS')+'] ')+str);
    },

    /** 
     * Logs message to console
     * @param str message 
     */
    log(str){
        console.log(chalk.blue('['+moment().format('L-LTS')+'] ')+str);
    },

    /** 
     * Generates session token
     * @param payload object containing information regaring the session 
     */
    generateToken(payload) {  
        return jwt.sign(payload, config.secret, {
            expiresIn: 60 * 60 * 24 // 1day
        });
    }
};