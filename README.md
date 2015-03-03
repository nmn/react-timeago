![React-TimeAgo](http://naman.s3.amazonaws.com/react-timeago.png)

A simple time-ago component for ReactJs.

## Usage: 

React-timeago is a very simple component that takes a date prop and returns a span with live updating date in a time-ago format.

```
TimeAgo({date:'Aug 29, 2014'});

```

*IMPORTANT* : If you're using React >= 0.12 without JSX, you have to create a factory for the component yourself :

```
var TimeAgo = React.createFactory(require('react-timeago'));

// OR

var TimeAgo = require('react-timeago');

React.createElement(TimeAgo, props, ...children)

```

#### Props

###### date (required)
Date is a date in the past or the future. This can be a Date Object, A UTC datestring or number of milliseconds since epoch time.

###### live (optional)
React-Timeago is live by default and will auto update it's value. However, if you don't want this behaviour, you can set live:false.

###### formatter (optional)
A function that takes three arguments:
  - value : An integer value, already rounded off
  - unit : A string representing the unit in english. This could be one of:
    - 'second'
    - 'minute'
    - 'hour'
    - 'day'
    - 'week'
    - 'month'
    - 'year'
  - suffux : A string. This can be one of 
    - 'ago'
    - 'from now'

Here are some examples of what the formatter function will receive:

- '5 minutes ago' => formatter(5, 'minute', 'ago')
- '1 year from now' => formatter(1, 'year', 'from now')

The formatter function is a simple way to extend the functionality of React-Timeago to support any feature you may need from a fuzzy time display. The formatter function is expected to return a string. But it can also return any React component (or array of components) that would become the child of React-TimeAgo

I recommend using the fantastic [L10ns](http://l10ns.org) for internationalization needs.

###### component (optional) (default: 'span')
A string of ReactClass that is used to wrap the live updating string

###### Anything Else? (optional)
As of v2.0 you can pass in any props. Any props not used by React-TimeAgo will be passed down to the resulting component.
This means that you can pass className, styles, id, title, aria-label, event handlers or anything else you want.

If you pass in a custom component as the component prop, you can also pass props that you want passed down to your custom component.

## Why React-TimeAgo

React-TimeAgo focusses on speed, and simplicity. At less than 100 lines of code, the file size is extremely small. There are many similar libraries, but most of them come with large dependencies that usually isn't worth such a simple use-case

Additionally, in the spirit of NPM and keeping libraries small, any additional features you may need from timeago can be plugged-in using the formatter function.

In the coming months, I will be writing formatter functions for various languages, that can be required and passed-in as needed.
As you will only require the parts you actually use, there will be no need to bloat-up your javascript.

React-TimeAgo is also set apart from its competitors in that it is one of the only time-ago components that updates itself live.

If this is not for you, please looks at the alternatives out there.

## Contribution

While the code is complete and pretty stable, I welcome issues and pull requests.

React-TimeAgo is feature complete from my point of view. (discussions welcome)

For any additional functionality, a formatter function should do the job. I want to build a folder full of pre-built formatter functions. Contributions for languages and other ideas are welcome.

## SemVer

React-TimeAgo follows SemVer strictly.
