function SearchResult({ searching, words }) {
  return (
    <>
      <article aria-busy={searching}>
        {searching ? (
          '잠시만 기다려주세요. 검색 중입니다!'
        ) : (
          <>
            <header>총 {words.length}개의 단어가 검색되었습니다.</header>
            <ul>
              {words.map((code, en, ko) => {
                <li key={code}>
                  {ko}({en})
                </li>;
              })}
            </ul>
          </>
        )}
      </article>
    </>
  );
}

export default SearchResult;
