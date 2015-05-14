# Pg Create Extensions

> Need uuid's in your node.js/postgres app? Create pg extensions from an array.

__usage__

```javascript
require('./lib/pg-create-extensions')
  ( connectionStr )
  (['uuid-ossp'], /* optional callback here */ )
  (function( error ){
    /* ... */
  })
```

__install__

```javascript
npm install -S pg-create-extensions
```