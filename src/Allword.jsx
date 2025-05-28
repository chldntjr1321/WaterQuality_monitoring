import { useNavigate } from 'react-router-dom';

function Allword() {
  let navigate = useNavigate();
  return (
    <>
      가나다 순으로 보는 페이지
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </button>
    </>
  );
}

export default Allword;
