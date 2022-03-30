# Description

[https://github.com/jsonform/jsonform](Loader for JSON Form)
Loads dependencies by array of keys.  
Followng are always loaded because required: css, jquery, underscore  
Check ./index.html for a simple demo.
The dependencies required depend on what functionality is needed.
Therefore, I created this demo to load the dependencies programmatically.

## Reason for making

In the Github issue on jsonform below, I inquired about an npm module.
Although there is an npm module([jsonform](https://www.npmjs.com/package/jsonform)) available, the dependencies are not loaded together.

- [Maintainers and going forward](https://github.com/jsonform/jsonform/issues/177)

## Usage

```bash
npm install @theopenweb/jsonform-loader
```

Install dependencies: `npm install`

Place jsonform into lib directory. Default settings work when jsonform is cloned into lib.
Otherwise, use lib from node_modules.

Script is in ./dist/bundle.js  
To build use `npm run build`.

```javascript
// Sets options(mainly urls if using setting non-standard format.)
// const BASE = `../lib/jsonform` // libの場合
const BASE = `../node_modules/jsonform` // node_modulesの場合
const options = {
    depsUrl: `${BASE}/jsonform/deps/`, // deps directory url
    jsonFormUrl: `${BASE}/jsonform/lib/jsonform.js` // jsonform.js url
}
JsonFormSchema.setOptions(options)

// Get array of available keys to set dependencies.
const keys = JsonFormSchema.getKeys()
console.log('available keys', keys)

// Load without any optional dependencies.
JsonFormSchema.load().then(()=>{
    // CAN USE JsonForm here
})

// Load with optional dependencies.
JsonFormSchema.load(keys).then(()=>{
    // CAN USE JsonForm with dependencies in keys loaded
})
```

## Test

Example can be tested via below:

```bash
npx http-server ./
# Go to http://localhost:8080/examples
```
