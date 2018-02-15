var metalSmith   = require('metalsmith'),
    markdown     = require('metalsmith-markdown'),
    remarkable   = require('metalsmith-markdown-remarkable'),
    permalinks   = require('metalsmith-permalinks'),
    layouts      = require('metalsmith-layouts'),
    stylus       = require('metalsmith-stylus'),
    nib          = require('nib'),
    serve        = require('metalsmith-serve');

metalSmith(__dirname)
  .source('./src')
  .use(stylus({
      use: [nib()]
  }))
  .use(remarkable('full', {
    breaks: true,
    typographer: true,
    quotes: '«»‘’'
  }))
  .use(layouts({
      engine: 'jade',
      pattern: '**/*.html',
      partials: 'layouts/partials'
  }))
  .use(permalinks())
  .use(serve({
      port: 1114
  }))
  .destination('./build')
  .build(function(err, files) {
    if (err) throw err;
  });
