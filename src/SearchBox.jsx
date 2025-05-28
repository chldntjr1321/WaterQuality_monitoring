function SearchBox({ value, onChange }) {
  return (
    <>
      <input
        type="search"
        placeholder="물과 관련된 궁금한 용어을 검색해보세요!"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default SearchBox;
