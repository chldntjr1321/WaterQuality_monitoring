import { Navbar, Form, Button, Row, Col } from 'react-bootstrap';

function Search({ searchInput, setSearchInput, handleSearchClick }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); //새로고침 방지
      handleSearchClick();
    }
  };
  return (
    <>
      <Navbar style={{ display: 'flex', justifyContent: 'center' }}>
        <Form inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="물과 관련된 궁금한 용어를 검색해보세요!"
                style={{ width: '350px' }}
                className=" mr-sm-2"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Col>
            <Col xs="auto">
              <Button onClick={handleSearchClick}>검색</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </>
  );
}

export default Search;
