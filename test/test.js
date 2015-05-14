var CONNSTRING = 'postgres://localhost:5432/pg_create_extensions_test';
var pg = require('pg');
var createExtensions = require('../')( CONNSTRING );

before(function( done ){
  require('pg-destroy-create-db')
    ( CONNSTRING )
    .destroyCreate( done );
});

describe('PG Create Extensions', function(){
  it('should create extensions', function( done ){
    createExtensions
      (['uuid-ossp'])
      (function( error ){
        if ( error ) return done( error );

        pg.connect( CONNSTRING, function( error, client, release ){
          if ( error ) return done( error );

          client.query( 'select uuid_generate_v1()', function( error ){
            release();

            if ( error ) return done( error );

            done();
          });
        });
      });
  });

  it('should not complain about extensions that already exist', function( done ){
    createExtensions
      (['uuid-ossp'])
      ( done );
  });
});