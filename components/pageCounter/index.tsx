import React from 'react';

interface IProps {
  currentPage: number;
  searchTerm: string;
  totalPages: number;
}

const PageCounter: React.FC<IProps> = ({
  currentPage,
  searchTerm,
  totalPages,
}) => (
  <div className="pages-selector">
    {currentPage !== 1 && (
      <a href={`?terme=${searchTerm}&page=${currentPage - 1}`}>⇠ précédente</a>
    )}
    <div>
      {/* @ts-ignore */}
      {[...Array(totalPages).keys()].map((pageNum) => {
        if (totalPages > 10) {
          if (pageNum === 3) return <div key="none">...</div>;
          if (pageNum > 3 && pageNum < totalPages - 3) {
            return;
          }
        }
        return (
          <a
            href={`?terme=${searchTerm}&page=${pageNum + 1}`}
            className={`${currentPage === pageNum + 1 ? 'active' : ''}`}
            key={pageNum}
          >
            {pageNum + 1}
          </a>
        );
      })}
    </div>
    {currentPage !== totalPages && (
      <a href={`?terme=${searchTerm}&page=${currentPage + 1}`}>suivante ⇢</a>
    )}

    <style jsx>{`
      .pages-selector {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
      }
      .pages-selector > div {
        display: flex;
        margin: 0 30px;
      }
      .pages-selector > div > a {
        border-radius: 3px;
        padding: 0 5px;
        margin: 0 3px;
      }
      .pages-selector > div > a.active {
        border: 1px solid #000091;
      }
    `}</style>
  </div>
);

export default PageCounter;
