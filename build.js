var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    autoprefixer = require('metalsmith-autoprefixer'),
    archive = require('metalsmith-archive'),
    templates = require('metalsmith-templates'),
    collections=require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks');
   // inplace = require('metalsmith-in-place');

Metalsmith(__dirname)
    .use(collections({
        pages:{
            pattern: 'content/pages/*.md'
        },
        articles:{
            pattern: 'content/articles/*.md',
            sortBy: 'date'
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':collections/:title'
    }))
    .use(autoprefixer())
    .use(archive())
    .use(templates({
        engine: 'handlebars', 
    	partials: {
    		header: 'partials/header',
    		footer: 'partials/footer'
    	}
    	}))
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })