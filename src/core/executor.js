/**
 * import statement
 */
const yargs = require('yargs');
const _notesConfig = require('../utils/notesConfig');

/**
 * executeNotesEngine
 */
const executeNotesEngine = () => {
  /**
   * dynamically invoke note command
   */
  let index=0;
  _notesConfig.list().forEach(item => {
    yargs.command({
      command: item,
      ..._notesConfig.config(index++),
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