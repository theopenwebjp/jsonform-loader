# Description

Loader for JSON Form: https://github.com/jsonform/jsonform  
Loads dependencies by array of keys.  
Followng are always loaded because required: css, jquery, underscore  
Check ./index.html for a simple demo.

## Usage

Place jsonform into lib directory.  
Default settings work when jsonform is cloned into lib.

Install dependencies: `npm install`

Script is in ./dist/bundle.js  
To build use `npm run build`.

```
// Sets options(mainly urls if using setting non-standard format.)
JsonFormSchema.setOptions({
    depsUrl: '...',//deps directory url
    jsonFormUrl: '...'//jsonform.js url
})

// Get array of available keys to set dependencies.
const keys = JsonFormSchema.getKeys()
console.log('available keys', keys)

// Load without any optional dependencies.
JsonFormSchema.load().then(()=>{
    //CAN USE JsonForm here
})

// Load with optional dependencies.
JsonFormSchema.load(keys).then(()=>{
    //CAN USE JsonForm with dependencies in keys loaded
})
```