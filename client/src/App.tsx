import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';

// import Main from './pages/Main';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import Footer from './components/Footer';
import EditUser from './pages/EditUser';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CreateRecruit from './pages/CreateRecruit';
import CreateFreeboard from './pages/CreateFreeboard';
import EditRecruit from './pages/EditRecruit';
import EditFreeboard from './pages/EditFreeboard';
import Recruits from './pages/Recruits';
import RecruitDetail from './pages/RecruitDetail';
import FreeBoards from './pages/FreeBoards';
import FreeDetail from './pages/FreeDetail';
import Withdraw from './pages/Withdraw';
import RecruitTags from './pages/RecruitTags';
import FreeboardTags from './pages/FreeboardTags';
import SearchPassword from './pages/SearchPassword';
import Loading from './pages/Loading';
import MemberPage from './pages/MemberPage';

const store = createStore(reducer);

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Recruits />} />
          <Route path="/members/mypage" element={<MyPage />} />
          <Route path="/members/:memberId" element={<MemberPage />} />
          <Route path="/members/withdraw" element={<Withdraw />} />
          <Route path="/members/edit" element={<EditUser />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search-password" element={<SearchPassword />} />
          <Route path="/recruits" element={<Recruits />} />
          <Route path="/recruit/:recruitId" element={<RecruitDetail />} />
          <Route path="/recruit/new" element={<CreateRecruit />} />
          <Route path="/recruit/:recruitId/edit" element={<EditRecruit />} />
          <Route path="/recruits/tags" element={<RecruitTags />} />
          <Route path="/freeboards" element={<FreeBoards />} />
          <Route path="/freeboard/new" element={<CreateFreeboard />} />
          <Route path="/freeboard/:freeId" element={<FreeDetail />} />
          <Route path="/recruit/:recruitId/edit" element={<EditRecruit />} />
          <Route path="/freeboard/:freeId/edit" element={<EditFreeboard />} />
          <Route path="/recruits/tags" element={<RecruitTags />} />
          <Route path="/freeboards/tags" element={<FreeboardTags />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </div>
);
export default App;
