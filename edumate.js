'use strict';
const db = require('node-edumate');
const moment = require('moment');
const Table = require('tty-table');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const Ora = require('ora');
const style = require('./style');
const edumate = {};

const config = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
};

const spinner = new Ora({ spinner: 'earth' });

edumate.studentId = id => {
  var sql = `SELECT student_number FROM EDUMATE.student WHERE student_id = ${id}`;
  _spinner('Searching for STUDENT_NUMBER that is linked with STUDENT_ID', id);
  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('student_number'); } else {
        spinner.stop();
        console.log(results[0].studentNumber);
      }
    })
    .catch(error => {
      spinner.stop();
      console.error(error);
    });
};

edumate.staffId = id => {
  var sql = `SELECT staff_number FROM EDUMATE.staff WHERE staff_id = ${id}`;
  _spinner('Searching for STAFF_NUMBER that is linked with STAFF_ID', id);
  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('staff_number'); } else {
        spinner.stop();
        console.log(results[0].staffNumber);
      }
    })
    .catch(error => {
      spinner.stop();
      console.error(error);
    });
};

edumate.findStaff = search => {
  var rows = [];
  var header = style.staffHeader;
  var sql = `SELECT * FROM DB2INST1.VIEW_API_V1_STAFF_USERS WHERE firstname LIKE '%${search}%' OR surname LIKE '%${search}%' ORDER BY LOWER(surname), firstname`;

  _spinner('Searching for staff members with names containing', search);
  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('staff'); } else {
        spinner.stop();
        results.forEach((value, index) => {
          rows.push([
            value.staffId,
            value.firstname + ' ' + value.surname,
            value.email,
            value.house
          ]);
        });
        var table = Table(header, rows, {
          borderStyle: 1,
          paddingBottom: 0,
          headerAlign: 'center',
          align: 'center'
        });
        console.log(table.render());
      }
    })
    .catch(error => {
      spinner.stop();
      console.error(error);
    });
};

edumate.contact = id => {
  var sql = `SELECT * FROM TABLE(DB2INST1.GET_API_V1_CONTACT_NUMBER(${id}))`;
  _spinner('Searching for STAFF/STUDENT_NUMBER linked to CONTACT_ID', id);

  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('contact'); } else {
        spinner.stop();
        console.log(results[0].contactNumber);
      }
    })
    .catch(error => {
      spinner.stop();
      console.error(error);
    });
};

edumate.period = () => {
  var sql = `SELECT * FROM DB2INST1.view_api_v1_periods WHERE current = 1`;
  _spinner('Searching for information on', 'current period');

  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('period'); } else {
        spinner.stop();
        var endTime = moment(results[0].endTime, 'HH:mm:ss').format('h:mm A');
        console.log(`We are in week ${chalk.blue(results[0].week)}.\nIt's currently ${chalk.yellow(results[0].period.toLowerCase())}.\nThis period will end at ${chalk.magenta(endTime)}.`);
      }
    })
    .catch(error => {
      spinner.stop();
      console.error(error);
    });
};

const _spinner = (action, search) => {
  spinner.text = `${action}: ${search}`;
  spinner.start();
};

const _noResults = type => {
  spinner.stop();
  console.log(`${logSymbols.error} No ${type} results.`);
};

module.exports = edumate;
