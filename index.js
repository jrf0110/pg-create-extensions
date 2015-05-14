/**
 * Create pg extensions
 *
 * Usage:
 *   require('./lib/pg-create-extensions')
 *     ( connectionStr )
 *     ( ['uuid-ossp'], [callback] )
 *     ( callabck )
 */

var async = require('async');
var pg = require('pg');

var queryTmpl = function( data ){
  return 'create extension if not exists "' + data.name + '"';
};

module.exports = function( connString ){
  return function( extensions, callback ){
    var create = function( callback ){
      async.each( extensions, function( extension, next ){
        pg.connect( connString, function( error, client, release ){
          if ( error ) return callback( error );

          client.query( queryTmpl({ name: extension }), function( error ){
            release();
            next( error );
          });
        });
      }, callback );
    };

    if ( callback ) return create( callback );

    return create;
  };
};