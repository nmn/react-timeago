![React-TimeAgo](http://naman.s3.amazonaws.com/react-timeago.png)

A simple time-ago component for ReactJs.


## Changes in V4.X:
- Requires React ^16.
- Flow types updated to the latest version (0.69)
- Various bug-fixes.

## Changes in V3.X:

- `minPeriod` and `maxPeriod` now accept seconds not milliseconds. This matches the documentation.
- react-timeago now uses ES6 modules. So if you don't use ES6, your code will go from :
```js
var TimeAgo = require('react-timeago')
```
to:
```js
var TimeAgo = require('react-timeago').default
```
ES6 imports will obviously continue to work just fine:
```js
import TimeAgo from 'react-timeago'
```


## Usage:

React-timeago is a very simple component that takes a date prop and returns a span with live updating date in a time-ago format. The date will update only as often as needed. For timestamps below a minute away — every second, for timestamps up to 5 minutes away — every hour, and so on.

React-TimeAgo does the minimum amount of updates necessary.

```jsx
<TimeAgo date="Aug 29, 2014" />

// OR in vanilla JS

React.createElement(TimeAgo, {date: 'Aug 29, 2014'})

```

## Language support

Since v3.1.0 `react-timeago` now comes with support for a large number of languages out of the box.
This support is based on the string objects taken from `jquery-timeago`

#### Usage:
To use any of the languages provided, other than the default english, you will have to
import the language strings and build a custom formatter.

```jsx
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(frenchStrings)

// in your react component
<TimeAgo date='Feb 1, 1966' formatter={formatter} />
```

And that's it. You can also customize the language strings or provide your own.
(Pull Requests are welcome too!). Of course, for maximum control you can write your
own formatter function.

For best performance, I recommend that you build formatters that you're going to use once,
and pass them around.

## Flow Types

Since v3.0.0 `react-timeago` comes with flow type definitions out of the box.

In v3.1.0, the React.PropType validations have been removed in favour of just flow types.
Further, many type definitions are now exported for use in your own code.

Look through the source for more details.

## Props

#### `date` (required)
Date is a date in the past or the future. This can be a Date Object, A UTC date-string or number of milliseconds since epoch time.

#### `live` (optional)
React-Timeago is live by default and will auto update it's value. However, if you don't want this behaviour, you can set live:false.

#### `formatter` (optional)
A function that takes four arguments:
  - value : An integer value, already rounded off
  - unit : A string representing the unit in english. This could be one of:
    - 'second'
    - 'minute'
    - 'hour'
    - 'day'
    - 'week'
    - 'month'
    - 'year'
  - suffix : A string. This can be one of
    - 'ago'
    - 'from now'
  - date: The actual date you are trying to represent. Use this for a more custom format for showing your date.

Here are some examples of what the formatter function will receive:

- '5 minutes ago' => formatter(5, 'minute', 'ago')
- '1 year from now' => formatter(1, 'year', 'from now')

The formatter function is a simple way to extend the functionality of React-Timeago to support any feature you may need from a fuzzy time display.
The formatter function is expected to return a string.
But it can also return any React component (or array of components) that would become the child of React-TimeAgo

The project comes with a set of languages and a formatter function builder based on those language strings.
You can customize the strings, or provide your own custom formatter function.

I recommend using the fantastic [L10ns](http://l10ns.org) for other internationalization needs.

#### `component` (optional) (default: 'time')
A string of ReactClass that is used to wrap the live updating string

#### `title` (optional)
If the component is left as the default 'time' component, a title attribute is passed to it.
You can customize this by passing a string, or a UTC date-string will be used based on
the given date.

#### `minPeriod` (optional) (default: 0)
The minimum number of seconds that the component should wait before updating. The component will still update if you pass new props.
Use this if, for example, you don't want to update every second for recent times.

#### `maxPeriod` (optional) (default: Infinity)
The opposite of minPeriod. Use this to force dates to update more often than the default behaviour.
For example, you can use this update a time every 5 minutes even after it is more than an hour old.

#### Anything Else? (optional)
As of v2.0 you can pass in any props. Any props not used by React-TimeAgo will be passed down to the resulting component.
This means that you can pass className, styles, id, title, aria-label, event handlers or anything else you want.

## Why React-TimeAgo

React-TimeAgo focusses on speed, and simplicity. At about 100 lines of code, the file size is extremely small. There are many similar libraries, but most of them come with large dependencies that usually isn't worth such a simple use-case

Additionally, in the spirit of NPM and keeping libraries small, any additional features you may need from TimeAgo can be plugged-in using the formatter function.

In the future, I will be writing formatter functions for various languages, that can be required and passed-in as needed.
As you will only require the parts you actually use, there will be no need to bloat-up your javascript.

React-TimeAgo is also set apart from its competitors in that it is one of the only time-ago components that updates itself live.

If this is not for you, please looks at the alternatives out there.

## Contribution

While the code is complete and pretty stable, I welcome issues and pull requests.

React-TimeAgo is feature complete from my point of view. (discussions welcome)

However, support for various languages can always be improved. So please, conrtibute
strings for the language(s) you're fluent in. I'm specifically looking for strings for
the unit 'week'. `jquery-timeago` did not support weeks in its strings, and so in all but the
default english, weeks get down-converted to days instead. Help me fix that.

## SemVer

React-TimeAgo follows SemVer strictly.

## Changelog

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
