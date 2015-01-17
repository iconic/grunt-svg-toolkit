# grunt-svg-toolkit v0.1.0

> Toolkit for working with SVG

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

### Install

```shell
npm install --save-dev grunt-svg-toolkit
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svg-toolkit');
```


## svgtoolkit task
_Run this task with the `grunt svgtoolkit` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Usage

#### Gruntfile Configuration

```
svgtoolkit: {
  dist: {
    options: {
      generatePNG: true
    },
    files: [
      {
        expand: true,
        cwd: 'src/icons/',
        src: '**/*.svg',
        dest: 'dist/images/icons'
      }
    ]
  }
}
```

#### Options

##### generatePNG
Type: `Boolean`
Default: **true**



## Known Issues

* SVG with external font imports don't generate PNGs using those fonts currently. This will supposedly work in the upcoming PhantomJS 2 which has better font handling. Reference: https://github.com/ariya/phantomjs/issues/10592

```
<defs>
    <style>
        @import url(http://fonts.googleapis.com/css?family=Open+Sans:400,700);
    </style>
</defs>
```


## Release History

### v0.1.0 (01/13/2015)
- Initial release

## License
Copyright (c) 2015 Waybury, contributors. Licensed under the MIT license.
