![React-TimeAgo](http://naman.s3.amazonaws.com/react-timeago.png)

A simple time-ago component for [React].

## Usage:

`react-timeago` is a very simple component that takes a `date` prop and returns a `time` element with live updating date in a time-ago format. The date will update only as often as needed. For timestamps below a minute away — every second, for timestamps up to 5 minutes away — every minute, and so on.

`react-timeago` does the minimum amount of updates necessary.

```jsx
<TimeAgo date="Aug 29, 2014" />

// OR in vanilla JS
React.createElement(TimeAgo, {date: 'Aug 29, 2014'})
```

## Intl Formatter

Since v8.2.0 `react-timeago` comes with a formatter that uses the `Intl` that is built-in to Javascript
to create relative time format in any locale you want with little configuration.

However, this option is not the default. (The default is a custom formatter for English). You can use it
by manually importing the `makeIntlFormatter` function.

```tsx
import TimeAgo from 'react-timeago'
import {makeIntlFormatter} from 'react-timeago/defaultFormatter';

const intlFormatter = makeIntlFormatter({
  locale: undefined, // string
  localeMatcher?: 'best fit', // 'lookup' | 'best fit',
  numberingSystem?: 'latn' // Intl$NumberingSystem such as 'arab', 'deva', 'hebr' etc.
  style?: 'long', // 'long' | 'short' | 'narrow',
  numeric?: 'auto', //  'always' | 'auto', Using 'auto` will convert "1 day ago" to "yesterday" etc.
});

<TimeAgo date='Feb 1, 1966' formatter={intlFormatter} />
```

`makeIntlFormatter` can be called without any arguments at all and you'll get good defaults.

This new formatter should be your first choice when using `react-timeago` going forward as long as it
has the [browser support](https://caniuse.com/mdn-javascript_builtins_intl_relativetimeformat_format) you need.

## Language support

Since v3.1.0 `react-timeago` comes with support for a large number of languages out of the box.
This support is based on the string objects taken from `jquery-timeago` and then updated with the help of the
community. Many thanks to all those who contribute language support.

### Usage

To use any of the languages provided, other than the default english, you will have to
import the language strings and build a custom formatter.

```tsx
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(frenchStrings)

// in your react component
<TimeAgo date='Feb 1, 1966' formatter={formatter} />
```

And that's it. You can also customize the language strings or provide your own.
(pull requests are welcome too!). Of course, for maximum control you can write your
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

#### `now` (optional)
A custom function that can be used instead of `Date.now()` to get the current value of `epochSeconds` in `formatter` below.
This can be specifically useful for server rendering when you want the datetime to be the same on the server and client.

#### `formatter` (optional)
A function that takes four arguments:
  - `value` : An integer value, already rounded off
  - `unit` : A string representing the unit in english. This could be one of:
    - 'second'
    - 'minute'
    - 'hour'
    - 'day'
    - 'week'
    - 'month'
    - 'year'
  - `suffix` : A string. This can be one of
    - 'ago'
    - 'from now'
  - `epochMilliseconds`: The result of `Date.now()` or the result of a custom `now` prop.
  - `nextFormatter`: A function that takes no arguments and gives you the result of the defaultFormatter using the same arguments above.

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

React-TimeAgo focuses on speed, and simplicity. At about 100 lines of code, the file size is extremely small. There are many similar libraries, but most of them come with large dependencies that aren't worth it for such a simple use case.

In the spirit of NPM and keeping libraries small, any additional features you may need from TimeAgo can be plugged-in using the formatter function.

In the future, I will be writing formatter functions for various languages, that can be required and passed-in as needed.
As you will only require the parts you actually use, there will be no need to bloat your JavaScript.

React-TimeAgo is also set apart from its competitors in that it is one of the only time-ago components that can update itself live.


## Contribution

While the code is complete and pretty stable, I welcome issues and pull requests.

React-TimeAgo is feature complete from my point of view (discussions welcome).

However, support for various languages can always be improved. So please, contribute strings for the language(s) you're fluent in. I'm specifically looking for strings for the unit 'week'. `jquery-timeago` did not support weeks in its strings, and so in all but the default English, weeks get down-converted to days instead. Help me fix that.

### Changelog and Versioning

After contributing your feature or fix, please update the [changelog](/CHANGELOG.md) describing your change. Don't forget to version `package.json` as well, as the package follows [SemVer] strictly.

See [CHANGELOG.md](/CHANGELOG.md).

[React]: https://reactjs.org/
[SemVer]: https://semver.org/
