# grunt-svg-toolkit

**A toolkit for working with, styling and converting SVG files.**

SVG Toolkit helps you work with SVG files by normalizing, colorizing, styling and optionally converting them to other formats, ready for production use.

A few example uses:

* Create colorized SVGs and PNGs across an entire SVG icon set. Colors in your design changing? No problem... update your grunt file and re-run. Done. No need to open your design tools to update and re-export all your assets.

* Use a CSS file to generate customized, themed SVG and PNG output assets. 

* SVG markup cleanup and normalization, decreasing asset size and increasing performance.

Vector workflow powerup ProTip:

> SVG Toolkit works great with the output generated from our [Illustrator SVG Exporter](https://github.com/iconic/illustrator-svg-exporter)!

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
      generatePNGs: true,
      style: 'src/css/themes/blue.css',
      colorize: '#808000',
      debug: false
    },
    files: [
      {
        expand: true,
        cwd: 'src/icons/',
        src: '**/*.svg',
        dest: 'dist/icons'
      }
    ]
  }
```

#### Options

##### generatePNGs
Type: `Boolean`  
Default: **true**

Should PNGs be generated.

##### style
Type: `String`  
Default: undefined

The location of a CSS file that should be applied to the SVG files. Great for creating a theme across an icon set and generating a matching set of SVGs/PNGs.

##### colorize
Type: `String`  
Default: undefined

Define a hex color value (e.g. #d8dfd8) or HTML color name (e.g. thistle) to colorize the SVG files by setting their `stroke` and `fill` attributes. Great for colorizing a set of icons.

> Note: The `colorize` setting, if set, will override the `style` setting.

##### debug
Type: `Boolean`  
Default: **false**

Log task progress and details about the processing of each SVG.


## Known Issues

* SVG files with external font imports don't generate PNGs using those fonts currently. This will supposedly work in the upcoming [PhantomJS 2](https://github.com/ariya/phantomjs/wiki/PhantomJS-2), which has better font handling. Reference: https://github.com/ariya/phantomjs/issues/10592

```
<defs>
    <style>
        @import url(http://fonts.googleapis.com/css?family=Open+Sans:400,700);
    </style>
</defs>
```

## Contributing

Your feedback is most welcome.

Have a troublesome SVG you are using that isn't generating the output you'd expect? Open an [issue](https://github.com/iconic/grunt-svg-toolkit/issues) with the details and include the SVG markup for us to test with.

Have an awesome idea for a new feature or additional output format that would be useful? Create a [`feature request` issue](https://github.com/iconic/grunt-svg-toolkit/labels/feature%20request) describing it, or even better... send a [pull request](https://github.com/iconic/grunt-svg-toolkit/pulls)!

Bugs? You know what to [do](https://github.com/iconic/grunt-svg-toolkit/issues).

## Background

This project is the result of abstracting and generalizing the icon production process tools used in building [Iconic](https://useiconic.com/), and to open source those pieces that might be more widely useful and applicable to the design and development communities. 

## Release History

### v0.1.0 (01/20/2015)
- Initial release

## License
Copyright (c) 2015 Waybury, contributors. Licensed under the MIT license.
