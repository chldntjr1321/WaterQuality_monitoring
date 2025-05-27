import { Navbar, Form, Button, Row, Col } from 'react-bootstrap';

function Search({
  searchInput,
  setSearchInput,
  handleSearchClick,
  recent,
  setRecent,
}) {
  return (
    <>
      <Navbar
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 0 0 50px',
        }}
      >
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault(); // 새로고침 방지
            handleSearchClick();
          }}
        >
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="물과 관련된 궁금한 용어를 검색해보세요!"
                style={{ width: '450px' }}
                className=" mr-sm-2"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">검색</Button>
            </Col>
          </Row>
        </Form>
        <button
          className="recentbtn"
          onClick={() => {
            recent ? setRecent(false) : setRecent(true);
          }}
        >
          최근 검색🔍
        </button>
      </Navbar>
    </>
  );
}

export default Search;
