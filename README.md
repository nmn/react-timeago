React-TimeAgo
=============

A simple time-ago component for ReactJs.

## Usage: 

React-timeago is a very simple component that takes a date prop and returns a span with live updating date in a time-ago format.

```
TimeAgo({date:'Aug 29, 2014'});

```

#### Props

###### date
Date is a date in the past or the future. This can be a Date Object, A string or number of milliseconds since epoch time.

###### live (optional)
React-Timeago is live by default and will auto update it's value. However, if you don't want this behaviour, you can set live:false.

## Why React-TimeAgo

React-TimeAgo focusses on speed, and simplicity. At less than 100 lines of code, the file size is extremely small.

React-TimeAgo is also set apart from its competitors in that it is one of the only time-ago components that updates itself live.

If this is not for you, please looks at the alternatives out there.

## Contribution

While the code is complete and pretty stable, I welcome issues and pull requests.

New features will be considered if they don't stray from the goals of the project - Keep it simple to use and don't over-complicate the configuration.

## SemVer

I will try my best to follow SemVer, and make React-TimeAgo completely dependable