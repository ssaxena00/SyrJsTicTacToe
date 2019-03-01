# SyrJsTicTacToe
Take-home assignment for PayPal

***The app does not run from here!*** To run the app, copy the `src` folder into the core Syr repo and run from there. 
In the core repo, change this line in the `webpack.config.js` file:

```diff
module.exports = {
   entry: {
-    app: ['./samples/example.js']
+    app: ['./src/app.js']
   },
```
