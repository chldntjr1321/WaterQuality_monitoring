import axios from 'axios';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="maintext">
        안녕하세요 이것은 상수도 관제 프로그램입니다!
      </div>
      <button
        onClick={() => {
          axios
            .get(
              'http://apis.data.go.kr/B500001/myportal/dictionary/dictionarylist?searchNm=%EA%B0%95%EC%88%98%EB%9F%89&numOfRows=10&pageNo=1&serviceKey=IXPiDICNoweAadzYxfFl5DSMrgRYBqWZ1n3r%2B5%2BR0ZUixnveIHWUYbKrgQKBnw2ARc4JQ%2BY2cMKZ8Ah3xld0UA%3D%3D'
            )
            .then((result) => {
              const itemList = result.data.response.body.items.item;
              console.log('용어 : ', itemList[0].hNm); // 가강수량
              console.log('뜻 : ', itemList[0].explain); //단위면적당 연직기주 내의 수증기 총량으로 강수 가능한 최대 수분량
            })
            .catch((error) => {
              console.log('실패함');
              console.log(error);
            });
        }}
      >
        버튼버튼
      </button>
    </div>
  );
}

export default App;
