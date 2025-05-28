// js/fetchData.js
import axios from 'axios';
import fs from 'fs';

const SERVICE_KEY =
  'IXPiDICNoweAadzYxfFl5DSMrgRYBqWZ1n3r%2B5%2BR0ZUixnveIHWUYbKrgQKBnw2ARc4JQ%2BY2cMKZ8Ah3xld0UA%3D%3D';
const TOTAL_COUNT = 9611;
const MAX_ROWS = 320;
const TOTAL_PAGES = Math.ceil(TOTAL_COUNT / MAX_ROWS);

const fetchAllData = async () => {
  const allItems = [];

  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const url = `http://apis.data.go.kr/B500001/myportal/dictionary/dictionarylist?searchNm=&numOfRows=${MAX_ROWS}&pageNo=${page}&serviceKey=${SERVICE_KEY}&_type=json`;

    try {
      const res = await axios.get(url);
      const items = res.data?.response?.body?.items?.item || [];

      console.log(`✅ ${page}페이지 완료`);
      allItems.push(...items);
    } catch (error) {
      console.error(`❌ ${page}페이지 실패`, error.message);
    }
  }

  fs.writeFileSync('dictionaryData.json', JSON.stringify(allItems, null, 2));
  console.log('✅ 모든 데이터 저장 완료!');
};

fetchAllData();
