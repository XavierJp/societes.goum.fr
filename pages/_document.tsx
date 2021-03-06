import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

const INIT_STYLE = `
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#__next {
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

/* open-sans-regular - latin */
@font-face {
  font-family: 'Marianne';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/Marianne-Bold.woff2');
}


/* open-sans-regular - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/open-sans-v17-latin-regular.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
    url('/fonts/open-sans-v17-latin-regular.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/open-sans-v17-latin-regular.woff2')
      format('woff2'),
    /* Super Modern Browsers */
      url('/fonts/open-sans-v17-latin-regular.woff') format('woff'),
    /* Modern Browsers */
      url('/fonts/open-sans-v17-latin-regular.ttf')
      format('truetype'),
    /* Safari, Android, iOS */
      url('/fonts/open-sans-v17-latin-regular.svg#OpenSans')
      format('svg'); /* Legacy iOS */
}
/* open-sans-700 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/open-sans-v17-latin-700.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Bold'), local('OpenSans-Bold'),
    url('/fonts/open-sans-v17-latin-700.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/open-sans-v17-latin-700.woff2')
      format('woff2'),
    /* Super Modern Browsers */
      url('/fonts/open-sans-v17-latin-700.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/open-sans-v17-latin-700.ttf')
      format('truetype'),
    /* Safari, Android, iOS */
      url('/fonts/open-sans-v17-latin-700.svg#OpenSans')
      format('svg'); /* Legacy iOS */
}

/* source-sans-pro-regular - latin */
@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/source-sans-pro-v13-latin-regular.eot');
  src: local('Source Sans Pro Regular'),
    local('SourceSansPro-Regular'),
    url('/fonts/source-sans-pro-v13-latin-regular.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/source-sans-pro-v13-latin-regular.woff2')
      format('woff2'),
    url('/fonts/source-sans-pro-v13-latin-regular.woff')
      format('woff'),
    url('/fonts/source-sans-pro-v13-latin-regular.ttf')
      format('truetype'),
    url('/fonts/source-sans-pro-v13-latin-regular.svg#SourceSansPro')
      format('svg');
}

/* source-sans-pro-700 - latin */
@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/source-sans-pro-v13-latin-700.eot');
  src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
    url('/fonts/source-sans-pro-v13-latin-700.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/source-sans-pro-v13-latin-700.woff2')
      format('woff2'),
    url('/fonts/source-sans-pro-v13-latin-700.woff') format('woff'),
    url('/fonts/source-sans-pro-v13-latin-700.ttf')
      format('truetype'),
    url('/fonts/source-sans-pro-v13-latin-700.svg#SourceSansPro');
}

html,
body {
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.78);
}

html,
body,
div,
p,
span,
a {
  font-family: 'Source Sans Pro', sans-serif;
}

h1,
h2,
h3,
h4 {
  font-family: 'Marianne', 'Open Sans', sans-serif;
}
`;

const COPY_TO_CLIPBOARD = (
  <script
    dangerouslySetInnerHTML={{
      __html: `
    (function addCopyFunction() {
      const copyList = document.getElementsByClassName('copy-to-clipboard-anchor');
      for (var i=0; i<copyList.length; i++) {
        const element = copyList[i];
        element.onclick = () => {
          element.classList.toggle('copy-done');
          var el = document.createElement('textarea');
          el.value = element.children[0].innerHTML;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
          window.setTimeout(function() {
            element.classList.toggle('copy-done');
          },800)
        }
      }
    })();
  `,
    }}
  />
);
class CustomHead extends Head {
  render() {
    const res = super.render();

    function transform(node: any): any {
      // remove all link preloads
      if (
        node &&
        node.type === 'link' &&
        node.props &&
        node.props.rel === 'preload'
      ) {
        return null;
      }
      if (node && node.props && node.props.children) {
        return {
          ...node,
          props: {
            ...node.props,
            children: node.props.children.map(transform),
          },
        };
      }
      if (Array.isArray(node)) {
        return node.map(transform);
      }

      return node;
    }

    return transform(res);
  }
}

class DevDocument extends Document {
  render() {
    return (
      <html lang="fr">
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: INIT_STYLE,
            }}
          />

          <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {COPY_TO_CLIPBOARD}
        </body>
      </html>
    );
  }
}

class StaticDocument extends Document {
  render() {
    return (
      <html lang="fr">
        <CustomHead>
          {/* Standard Meta */}

          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="/fonts/open-sans-v17-latin-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/open-sans-v17-latin-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/source-sans-pro-v13-latin-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/source-sans-pro-v13-latin-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <style
            dangerouslySetInnerHTML={{
              __html: INIT_STYLE,
            }}
          />

          <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </CustomHead>

        <body>
          <Main />
          {process.env.NODE_ENV === 'production' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
            <!-- Piwik -->
            var _paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://stats.data.gouv.fr/";
              _paq.push(['setTrackerUrl', u+'piwik.php']);
              _paq.push(['setSiteId', 145]);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
            })();
            `,
              }}
            />
          )}

          {COPY_TO_CLIPBOARD}
        </body>
      </html>
    );
  }
}

// export default DevDocument;

export default process.env.NODE_ENV === 'production'
  ? StaticDocument
  : DevDocument;
