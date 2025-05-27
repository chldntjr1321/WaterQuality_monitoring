import axios from 'axios';
import { Navbar, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import CarouselFade from './Banner';
import Search from './Search';

function App() {
  let [searchInput, setSearchInput] = useState('');
  const handleSearchClick = () => {
    if (!searchInput.trim()) return; //공백 입력하면 무시하고 스토리지에 값 저장하지 않기
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
        setSearchResult(historyList);

        // 중복 제거 및 추가
        if (!historyList.includes(searchInput)) {
          historyList.push(searchInput);
          localStorage.setItem('list', JSON.stringify(historyList));
          setSearchResult(historyList);
        }
        setSearchInput('');
      })
      .catch((error) => {
        console.log('실패함');
        console.log(error);
      });
  };
  let [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const existList = localStorage.getItem('list');
    if (existList) {
      setSearchResult(JSON.parse(existList));
    }
  }, []);
  let [recent, setRecent] = useState(false);

  return (
    <div className="App">
      <div className="navbtn">
        <button>가나다 순으로 보기 👀</button>
      </div>
      <CarouselFade></CarouselFade>

      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchClick={handleSearchClick}
        recent={recent}
        setRecent={setRecent}
      />
      {recent ? (
        <Recent setSearchResult={setSearchResult} searchResult={searchResult} />
      ) : null}
    </div>
  );
}

// 최근 검색 기록창
function Recent({ setSearchResult, searchResult }) {
  return (
    <>
      <div className="recent__title">
        <button
          onClick={() => {
            localStorage.removeItem('list');
            setSearchResult([]);
          }}
        >
          전체삭제🗑️
        </button>
      </div>
      <div className="recent__list">{searchResult.join(', ')}</div>
    </>
  );
}

export default App;
