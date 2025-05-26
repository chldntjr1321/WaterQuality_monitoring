import axios from 'axios';
import { Navbar, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import CarouselFade from './Banner';
import Search from './Search';

function App() {
  let [searchInput, setSearchInput] = useState('');
  const handleSearchClick = () => {
    const serviceKey = import.meta.env.VITE_WATER_API_KEY;
    axios
      .get(
        `http://apis.data.go.kr/B500001/myportal/dictionary/dictionarylist?searchNm=%EA%B0%95%EC%88%98%EB%9F%89&numOfRows=10&pageNo=1&serviceKey=${serviceKey}`
      )
      .then((result) => {
        const itemList = result.data.response.body.items.item;
        console.log('검색어 : ', searchInput);
        console.log('뜻 : ', itemList[0].explain); //기본 값은 가강수량의 뜻 : 단위면적당 연직기주 내의 수증기 총량으로 강수 가능한 최대 수분량
        // 로컬스토리지에서 기존 목록 불러오기
        let historyList = localStorage.getItem('list');
        historyList = historyList ? JSON.parse(historyList) : [];

        // 중복 제거 및 추가
        if (!historyList.includes(searchInput)) {
          historyList.push(searchInput);
          localStorage.setItem('list', JSON.stringify(historyList));
        }

        setSearchResult(searchInput);
        setSearchInput('');
      })
      .catch((error) => {
        console.log('실패함');
        console.log(error);
      });
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
