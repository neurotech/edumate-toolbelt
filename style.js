'use strict';

const chalk = require('chalk');
const style = {};

style.staffHeader = [
  {
    value: 'ID',
    headerColor: 'cyan',
    color: 'white',
    align: 'center',
    width: 8
  },
  {
    value: 'Name',
    headerColor: 'cyan',
    color: 'white',
    align: 'center',
    width: 25
  },
  {
    value: 'Email',
    headerColor: 'cyan',
    color: 'white',
    align: 'center',
    width: 45
  },
  {
    value: 'House',
    headerColor: 'cyan',
    color: 'white',
    align: 'center',
    width: 15,
    formatter: value => {
      if (value === 'None') {
        value = chalk.bgRed.white(value);
      }
      if (value === 'Brady') {
        value = chalk.green(value);
      }
      if (value === 'Cassidy') {
        value = chalk.red(value);
      }
      if (value === 'Caulfield') {
        value = chalk.yellow(value);
      }
      if (value === 'Delaney') {
        value = chalk.magenta(value);
      }
      if (value === 'Dwyer') {
        value = chalk.yellow(value);
      }
      if (value === 'McLaughlin') {
        value = chalk.blue(value);
      }
      if (value === 'O\'Connor') {
        value = chalk.grey(value);
      }
      if (value === 'Vaughan') {
        value = chalk.red(value);
      }
      return value;
    }
  }
];

module.exports = style;
