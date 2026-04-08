# Issue: Top-level await with `node:diagnostics_channel` breaks browser builds in Webpack 5

## Description

The latest version of `lru-cache` (v11.x) uses top-level await to dynamically import `node:diagnostics_channel`:

```javascript
var C={hasSubscribers:!1},[S,W]=await import("node:diagnostics_channel")...
```

This causes issues in browser environments when building with Webpack 5, as Webpack doesn't handle the `node:` protocol scheme by default.

## Problem

1. **Top-level await**: The use of top-level await makes the entire module asynchronous
2. **Node.js protocol**: `node:diagnostics_channel` is not supported in browser environments
3. **Webpack 5 compatibility**: When Webpack encounters this, it either:
   - Throws an `UnhandledSchemeError` for the `node:` protocol, or
   - Causes the module export to become a Promise instead of the expected object

## Impact

When using `lru-cache` v11.x in a React application built with Webpack 5 (via Create React App / craco):

```javascript
// Expected behavior
import { LRUCache } from 'lru-cache';
const cache = new LRUCache({ max: 100 }); // Works

// Actual behavior
import * as LRUCacheModule from 'lru-cache';
console.log(LRUCacheModule); // Promise { <pending> } instead of module exports
```

This breaks downstream packages that depend on `lru-cache`, such as when used in `@kne/react-enum`, causing the entire module to become a Promise.

## Environment

- Node.js: v20.x
- Webpack: 5.x (via react-scripts 5.0.1)
- Build tool: craco 7.1.0
- Browser target: Modern browsers (Chrome, Firefox, Safari)

## Current Workaround

We can configure Webpack fallbacks, but this requires additional configuration:

```javascript
// In webpack config
webpackConfig.resolve.fallback = {
  "diagnostics_channel": false
};

// Or create a mock module
webpackConfig.resolve.alias = {
  "node:diagnostics_channel": path.resolve(__dirname, "mock-diagnostics-channel.js")
};
```

However, this doesn't solve the top-level await issue.

## Suggested Solution

Could you consider one of the following approaches:

1. **Conditional import**: Check for browser environment before importing `diagnostics_channel`:
   ```javascript
   const hasDiagnostics = typeof process !== 'undefined' && process.versions?.node;
   const diagnosticsChannel = hasDiagnostics ? 
     await import('node:diagnostics_channel') : 
     { channel: () => ({ hasSubscribers: false }) };
   ```

2. **Browser bundle**: Provide a separate browser entry point that doesn't include Node.js-specific features

3. **Optional peer dependency**: Make `diagnostics_channel` an optional feature that can be safely omitted in browser builds

4. **Use synchronous import**: Avoid top-level await to prevent making the module async

## Version Info

- lru-cache version: 11.3.2
- Node.js: 20.x
- Webpack: 5.x

## Additional Context

This issue was discovered when upgrading from lru-cache v10.x to v11.x. Version 10.x works fine in browser environments because it doesn't use `node:diagnostics_channel` or top-level await.

Thank you for considering this issue! Let me know if you need any additional information or if I can help test a potential fix.
