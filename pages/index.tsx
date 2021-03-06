import React from 'react';

import SearchBar from '../components/searchBar';
import Page from '../layouts';

const About: React.FC = () => {
  return (
    <Page>
      <div className="layout-center">
        <div className="centered-search">
          <h1>L’annuaire des Entreprises</h1>
          <h2>
            Retrouvez toutes les informations publiques concernant les
            entreprises françaises
          </h2>
          <div className="layout-center">
            <SearchBar />
          </div>
        </div>
      </div>

      <style jsx>{`
        h1,
        h2 {
          text-align: center;
        }

        .layout-center {
          height: 100%;
        }

        .centered-search {
          padding-bottom: 10vh;
          padding-top: 10vh;
          flex-grow: 1;
        }
        @media only screen and (min-width: 1px) and (max-width: 900px) {
          .centered-search {
            width: calc(100% - 30px);
            flex-grow: 0;
            padding-top: 30px;
          }
        }
      `}</style>
    </Page>
  );
};

export default About;
