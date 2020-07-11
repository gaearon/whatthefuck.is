import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { themeStorageKey } from '@lib/theme'
const bgVariableName = '--bg'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function() {
                try {
                  var outdatedValue = localStorage.getItem('light-mode')

                  if (outdatedValue) {
                    localStorage.setItem('${themeStorageKey}', 'light')
                    localStorage.removeItem('light-mode')
                  }

                  var mode = localStorage.getItem('${themeStorageKey}')
                  if (!mode) return
                  document.documentElement.classList.add(mode)
                  var bgValue = getComputedStyle(document.documentElement)
                    .getPropertyValue('${bgVariableName}')
                  document.documentElement.style.background = bgValue
                } catch (e) {}
              })()`
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
