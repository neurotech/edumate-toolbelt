#!/usr/bin/env DYLD_LIBRARY_PATH=node_modules/ibm_db/installer/clidriver/lib/icc node
'use strict';
const updateNotifier = require('update-notifier');
const meow = require('meow');
const chalk = require('chalk');
const edumate = require('./edumate');
const pkg = require('./package.json');

const help = `
  Usage
  -----
    $ ${chalk.yellow('edumate')} ${chalk.blue('<command>')} ${chalk.white('<value>')}

  Commands
  --------
    ${chalk.blue('student')} ${chalk.white('<STUDENT_ID>')}
      Returns the STUDENT_NUMBER associated with STUDENT_ID.

    ${chalk.blue('staff')} ${chalk.white('<STAFF_ID>')}
      Returns the STAFF_NUMBER associated with STAFF_ID.

    ${chalk.blue('period')}
      Returns the current week, period, and end time of period.
`;
const cli = meow(help);

if (cli.input.length === 0) {
  console.log(`  ${chalk.red('No arguments specified!')} \n ${help}`);
} else {
  if (cli.input[0] === 'student') {
    edumate.studentId(cli.input[1]);
  }
  if (cli.input[0] === 'staff') {
    edumate.staffId(cli.input[1]);
  }
  if (cli.input[0] === 'period') {
    edumate.period();
  }
}

updateNotifier({pkg}).notify();
