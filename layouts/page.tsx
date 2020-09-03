import React from 'react';
import SearchBar from '../components/searchBar';

interface IProps {
  small?: boolean;
}

const Page: React.FC<IProps> = ({ small, children }) => (
  <div id="page-layout">
    {small ? (
      <div className="header-small">
        <div className="content-container">
          <a href="/search">
            <img src="/images/logo_RF_small.svg" alt="" />
          </a>
          <SearchBar small={true} />
        </div>
      </div>
    ) : (
      <div className="header">
        <img height={110} src="/images/logo_RF.svg" alt="" />
      </div>
    )}

    <main>{children}</main>
    <div className="footer layout-center">
      🇫🇷 un service officiel du gouvernement français ◦ <a>Etalab</a> ◦ 2020
    </div>
    <style global jsx>{`
      #page-layout {
        width: 100%;
      }
      .header {
        height: 150px;
      }
      .header-small {
        border-bottom: 1px solid #00009166;
        display: flex;
        align-items: center;
      }
      .header-small > div {
        display: flex;
      }
      .header-small img {
        border-radius: 60px;
        overflow: hidden;
        width: 38px;
        height: 32px;
        object-fit: cover;
        margin: 12px 10px;
        margin-left: 0;
        display: block;
      }
      .header img {
        margin: 20px;
      }

      main {
        display: inline-block;
        min-height: calc(100vh - ${small ? 120 : 200}px);
        width: 100%;
        flex-grow: 1;
      }
      .footer {
        border-top: 1px dashed #00009166;
        height: 50px;
      }
    `}</style>
  </div>
);

export default Page;
