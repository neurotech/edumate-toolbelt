#!/usr/bin/env node
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
    ${chalk.blue('student_number')} ${chalk.white('<STUDENT_ID>')}
      Returns the STUDENT_NUMBER associated with STUDENT_ID.

    ${chalk.blue('staff_number')} ${chalk.white('<STAFF_ID>')}
      Returns the STAFF_NUMBER associated with STAFF_ID.

    ${chalk.blue('contact')} ${chalk.white('<CONTACT_ID>')}
      Returns the STAFF_NUMBER or STUDENT_NUMBER associated with CONTACT_ID.

    ${chalk.blue('staff')} ${chalk.white('<NAME>')}
      Returns a list of staff whose name matches NAME.

    ${chalk.blue('period')}
      Returns the current week, current period, and end time of current period.
`;
const cli = meow(help);

if (cli.input.length === 0) {
  console.error(`  ${chalk.red('No arguments specified!')} \n ${help}`);
} else {
  if (cli.input[0] === 'student_number') { edumate.studentId(cli.input[1]); }
  if (cli.input[0] === 'staff_number') { edumate.staffId(cli.input[1]); }
  if (cli.input[0] === 'staff') { edumate.findStaff(cli.input[1]); }
  if (cli.input[0] === 'contact') { edumate.contact(cli.input[1]); }
  if (cli.input[0] === 'period') { edumate.period(); }
}

updateNotifier({pkg}).notify();
