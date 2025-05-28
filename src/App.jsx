import axios from 'axios';
import { Navbar, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import CarouselFade from './Banner';
import Searchbar from './Searchbar';
import SearchResult from './SearchResult';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Allword from './Allword';

function App() {
  let [searchInput, setSearchInput] = useState('');
  const handleSearchClick = () => {
    if (!searchInput.trim()) return;
    // 1. 중복 검색 방지
    let historyList = localStorage.getItem('list');
    historyList = historyList ? JSON.parse(historyList) : [];
    if (historyList.includes(searchInput)) {
      console.log('이미 검색한 단어입니다.');
      return;
    }

    // // 3. 개발 환경에서는 API 호출 생략 (optional)
    // if (import.meta.env.DEV) {
    //   console.log('개발 환경입니다. API 호출 생략');
    //   historyList.push(searchInput);
    //   localStorage.setItem('list', JSON.stringify(historyList));
    //   setSearchResult(historyList);
    //   setSearchInput('');
    //   return;
    // }

    // const serviceKey = import.meta.env.VITE_WATER_API_KEY;
    axios
      .get
      //`http://apis.data.go.kr/B500001/myportal/dictionary/dictionarylist?searchNm=&numOfRows=1&pageNo=1&serviceKey=${serviceKey}`
      ()
      .then((result) => {
        const total = result.data.response.body.totalCount;
        console.log('전체 용어 수:', total);
        console.log('검색어 : ', searchInput);

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
        setSearchInput('');
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
  let navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleSearchClick={handleSearchClick}
              recent={recent}
              setRecent={setRecent}
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              navigate={navigate}
            />
          }
        />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/allword" element={<Allword />} />
      </Routes>
    </div>
  );
}

// 메인 화면
function Main({
  searchInput,
  setSearchInput,
  handleSearchClick,
  recent,
  setRecent,
  searchResult,
  setSearchResult,
  navigate,
}) {
  return (
    <>
      <div className="navbtn">
        <button
          onClick={() => {
            navigate('/search');
          }}
        >
          검색창 개발 창
        </button>
        <button
          onClick={() => {
            navigate('/allword');
          }}
        >
          가나다 순으로 보기 👀
        </button>
      </div>
      <CarouselFade></CarouselFade>

      <Searchbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchClick={handleSearchClick}
        recent={recent}
        setRecent={setRecent}
      />
      {recent ? (
        <Recent setSearchResult={setSearchResult} searchResult={searchResult} />
      ) : null}
    </>
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
