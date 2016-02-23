'use strict';
const db = require('node-edumate');
const moment = require('moment');
const Table = require('tty-table');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const style = require('./style');
const edumate = {};

const config = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
};

edumate.studentId = function (id) {
  var sql = `SELECT student_number FROM EDUMATE.student WHERE student_id = ${id}`;
  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('student_number'); } else {
        console.log(results[0].studentNumber);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

edumate.staffId = function (id) {
  var sql = `SELECT staff_number FROM EDUMATE.staff WHERE staff_id = ${id}`;
  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('staff_number'); } else {
        console.log(results[0].staffNumber);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

edumate.findStaff = function (search) {
  var rows = [];
  var header = style.staffHeader;
  var sql = `SELECT * FROM DB2INST1.VIEW_API_V1_STAFF_USERS WHERE firstname LIKE '%${search}%' OR surname LIKE '%${search}%' ORDER BY LOWER(surname), firstname`;

  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('staff'); } else {
        results.forEach(function (value, index) {
          rows.push(
            [value.id, value.firstname + ' ' + value.surname, value.email, value.house, value.location]
          );
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
      console.error(error);
    });
};

edumate.contact = function (id) {
  var sql = `SELECT * FROM TABLE(DB2INST1.GET_API_V1_CONTACT_NUMBER(${id}))`;
  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('contact'); } else {
        console.log(results[0].contactNumber);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

edumate.period = function () {
  var sql = `SELECT * FROM DB2INST1.view_api_v1_periods WHERE current = 1`;
  db.query(config, sql, {clean: true})
    .then(results => {
      if (results.length === 0) { _noResults('period'); } else {
        var endTime = moment(results[0].endTime, 'HH:mm:ss').format('h:mm A');
        console.log(`We are in week ${chalk.blue(results[0].week)}.\nIt's currently ${chalk.yellow(results[0].period.toLowerCase())}.\nThis period will end at ${chalk.magenta(endTime)}.`);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

function _noResults (type) {
  console.log(`${logSymbols.error} No ${type} results.`);
}

module.exports = edumate;
