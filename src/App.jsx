import axios from 'axios';
import { Navbar, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import CarouselFade from './Banner';
import Search from './Search';

function App() {
  let [searchInput, setSearchInput] = useState('');
  const handleSearchClick = () => {
    axios
      .get(
        'http://apis.data.go.kr/B500001/myportal/dictionary/dictionarylist?searchNm=%EA%B0%95%EC%88%98%EB%9F%89&numOfRows=10&pageNo=1&serviceKey=IXPiDICNoweAadzYxfFl5DSMrgRYBqWZ1n3r%2B5%2BR0ZUixnveIHWUYbKrgQKBnw2ARc4JQ%2BY2cMKZ8Ah3xld0UA%3D%3D'
      )
      .then((result) => {
        const itemList = result.data.response.body.items.item;
        console.log('검색어 : ', searchInput);
        console.log('뜻 : ', itemList[0].explain); //기본 값은 가강수량의 뜻 : 단위면적당 연직기주 내의 수증기 총량으로 강수 가능한 최대 수분량
        setSearchInput('');
      })
      .catch((error) => {
        console.log('실패함');
        console.log(error);
      });
    setSearchResult(searchInput);
  };
  let [searchResult, setSearchResult] = useState('');

  return (
    <div className="App">
      <CarouselFade></CarouselFade>
      <div className="searchOption">
        <button>직접 검색하기 🔍</button>
        <button>가나다 순으로 보기 👀</button>
      </div>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchClick={handleSearchClick}
      />

      {/*로컬스토리지에 검색기록 저장해서 띄울 예정*/}
      <div>{'최근 검색 단어 : ' + searchResult}</div>
    </div>
  );
}

export default App;
