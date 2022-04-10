import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atom';

// styled-components 로 reset.css 적용
// createGlobalStyle - 렌더링 될 때 컴포넌트는 전역 스코프에 스타일들을 올려준다.
const GlobalStyled = createGlobalStyle`
/* 글자 폰드 import */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;1,300&display=swap');

// reset.css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Ubuntu', sans-serif;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor}
}
a {
  text-decoration: none;
  color: inherit;
}
`



function App() {
  const isDark = useRecoilValue(isDarkAtom)

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyled />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
