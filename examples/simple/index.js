/* @flow strict */
import * as React from 'react'
import { useMemo } from 'react'
import ReactDom from 'react-dom/client'
import TimeAgo from '../../src/index'
import { makeIntlFormatter } from '../../src/defaultFormatter'

const appElement = document.getElementById('app')

function Bare({ date }: { date: number }) {
  return (
    <>
      You opened this page <TimeAgo date={date} />
    </>
  )
}

const intlFormatter = makeIntlFormatter({
  locale: 'en',
  style: 'long',
  numeric: 'auto',
})

function Intl({ date }: { date: number }) {
  const [locale, setLocale] = React.useState('en')
  const [style, setStyle] = React.useState('long')
  const [numeric, setNumeric] = React.useState('auto')

  const intlFormatter = useMemo(
    () =>
      makeIntlFormatter({
        locale,
        style,
        numeric,
      }),
    [locale, style, numeric],
  )
  return (
    <div>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        <option value="en">en</option>
        <option value="fr">fr</option>
        <option value="es">es</option>
        <option value="de">de</option>
        <option value="it">it</option>
        <option value="ja">ja</option>
        <option value="ko">ko</option>
        <option value="zh">zh</option>
      </select>
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option value="long">long</option>
        <option value="short">short</option>
        <option value="narrow">narrow</option>
      </select>
      <select value={numeric} onChange={(e) => setNumeric(e.target.value)}>
        <option value="auto">auto</option>
        <option value="always">always</option>
      </select>
      <TimeAgo date={date} formatter={intlFormatter} />
    </div>
  )
}

function App() {
  const [date, setDate] = React.useState(Date.now())

  return (
    <>
      <h1>Bare</h1>
      <Bare date={date} />
      <h1>Intl</h1>
      You opened this page <Intl date={date} />
      <hr />
      <button onClick={() => setDate(Date.now())}>Reset Time</button>
    </>
  )
}

appElement && ReactDom.createRoot(appElement).render(<App />)
