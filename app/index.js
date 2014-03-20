'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var GlobegraphicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Globegraphic generator.'));

    this.graphicName = process.argv[3];

    done();

  },

  app: function () {

    this.mkdir('parts');
    this.template('_default.html', 'parts/default.html');
    this.copy('prod.html', 'parts/prod.html');

    this.directory('globe', 'parts/globe');
    this.directory('html');
    this.directory('css');
    this.directory('js');

    this.copy('gulpfile.js');
    this.copy('.bowerrc');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    // this.copy('editorconfig', '.editorconfig');
    // this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = GlobegraphicGenerator;