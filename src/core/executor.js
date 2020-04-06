/**
 * import statement
 */
const yargs = require('yargs');
const _notesConfig = require('../utils/notesConfig');
/**
 * maintainVersion
 */
const maintainVersion = () => {
  yargs.version('1.1.0');
}
/**
 * executeNotesEngine
 */
const executeNotesEngine = () => {
  /**
   * version checking
   */
  maintainVersion();
  /**
   * dynamically invoke note command
   */
  _notesConfig.list().forEach(item => {
    yargs.command({
      command: item,
      ..._notesConfig.config(item),
      handler: argv => {
        _notesConfig.operator(item, argv)
      }
    });
  });
  /**
   * invoke yargs methods
   */
  yargs.help();
  yargs.parse();
}
/**
 * export statement
 */
module.exports = {
  run: executeNotesEngine
};