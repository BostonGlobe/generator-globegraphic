'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var GlobegraphicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.spawnCommand('sh', ['bitbucket.sh']);
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('This generator will create a new project.'));

    var prompts = [{
      name: 'graphicName',
      message: 'Enter the project name:',
      default: this.env.cwd.split('/').slice(-1)[0]
    }, {
      name: 'includeLicense',
      type: 'confirm',
      message: 'Add MIT License?',
      default: false
    }];

    this.prompt(prompts, function(props) {
      this.graphicName = props.graphicName;
      this.includeLicense = props.includeLicense;

      done();
    }.bind(this));

  },

  app: function () {

    this.template('_Makefile', 'Makefile');
    this.template('_README.md', 'README.md');

    this.copy('gulpfile.js');
    this.copy('.bowerrc');
    this.template('_gitignore', '.gitignore');
    this.copy('globegraphic.sublime-project');
    this.copy('.jshintrc');
    this.copy('config.rb');
    this.copy('middleware.json');

    if (this.includeLicense) {
      this.template('_LICENSE.md', 'LICENSE.md');
    }

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_bitbucket.sh', 'bitbucket.sh');

    this.directory('common');

    this.mkdir('data');
    this.template('data/_analysis.Rmd', 'data/' + _.slugify(this.graphicName) + '.Rmd');

    this.directory('parts');

    this.mkdir('js/libs');
  }
});

module.exports = GlobegraphicGenerator;