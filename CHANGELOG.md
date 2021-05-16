# Changelog

#### v6.1.0
- Added `eslint-plugin-react-hooks` and fixed the dependencies for hooks used in the library.
  Should result in a more consistent behaviour when changing props at runtime.
- Updated dependencies

#### v6.0.0
- Added `module` field to the package.json file so you can now import ES6 modules with only 
  a minimal amount of pre-processing applied. Relevant when targeting newer browsers only.
- A bunch of internal changes:
  - Using `rollup` instead of `browserify` to compile the example
  - Updating a bunch of dependencies
- Added support for React 17

#### v5.2.1

- Minor documentation fixes

#### v4.4.0
- Bug Fix: clearTimeout when setting a new timeout. Prevents unnecessary renders.

#### v4.2.0
- Pass in the `now` function as the last argument to the formatters.
- Fix a bug in `buildFormatter` that would ignore the user-specified `now` function and just used `Date.now`

#### v4.2.0
- Fixed the type of `Formatter`.
  - It's last argument is now correctly typed to be `() => React.Node`
  - This last argument is now a documented feature and is going to be set to the value of of the default formatter.
  - Please Note, that you should not use this argument and instead import defaultFormatter from the package directly and use it as a fallback.

#### v4.0.0 - v4.1.9:
- Requires React ^16.
- Flow types updated to the latest version (0.69)
- Various bug-fixes.

#### v3.x.x:

- `minPeriod` and `maxPeriod` now accept seconds not milliseconds. This matches the documentation.
- react-timeago now uses ES6 modules. So if you don't use ES6, your code will go from :

```js
var TimeAgo = require('react-timeago')
```
to:
```js
var TimeAgo = require('react-timeago').default
```
ES6 imports will continue to work the same way.
```js
import TimeAgo from 'react-timeago'
```

#### v2.2.1
* Fixed the many typos introduced by me in 2.2.0. Thanks to insin for the quick PR.

#### v2.2.0
* FEATURE: New Props: `minPeriod` and `maxPeriod` to customize how often the Component updates.

#### v2.1.1

* BUG-FIX: Fixed an issue, where changing the date wouldn't correctly update the update timer.

#### v2.1.0

* FEATURE: Added PropType validation. It will now print a warning if you fail to pass in a date, instead of failing silently.
* BUG-FIX: Pending Timeouts are cleared when the Component is unmounted
* BUG-FIX: When new Props are passed in, the component will update itself correctly. Now you can flip the live switch on and off.
* FEATURE: The formatter function gets the original date as the fourth argument, for more custom date formats.
