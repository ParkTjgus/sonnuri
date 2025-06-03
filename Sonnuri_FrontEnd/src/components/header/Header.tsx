import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full h-[4.5rem] bg-white border-b border-gray-200 px-6">
      <div className="flex items-center justify-between h-full max-w-[1200px] mx-auto w-full">
        <div className="flex-none mr-2">
          <Link to="/">
            <span className="font-['KoPubBatang'] text-lg whitespace-nowrap text-[#F97015]">
              손누리
            </span>
          </Link>
        </div>
        <nav className="flex-1 flex justify-center space-x-8 text-gray-600 whitespace-nowrap">
          <Link to="/learningLevel">학습하기</Link>
          <Link to="/">미니게임</Link>
          <Link to="/">신조어 등록</Link>
          <Link to="/">수어 노래</Link>
          <Link to="/translation">수어 번역</Link>
        </nav>
        <div className="w-[80px]" />
      </div>
    </header>
  );
};

export default Header;
