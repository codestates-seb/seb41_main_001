import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
import Main from './pages/Main';
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
import TaggedRecruit from './pages/TaggedRecruit';
// import FreeBoards from './pages/FreeBoards';
import FreeBoards from './pages/FreeBoards';
import FreeDetail from './pages/FreeDetail';
import FreeTags from './pages/FreeTags';
import Withdraw from './pages/Withdraw';
import RecruitTags from './pages/RecruitTags';
import FreeboardTags from './pages/FreeboardTags';

const App = () => (
  // const [login, setLogin] = useState(false);
  <div className="App">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/members/mypage/:id" element={<MyPage />} />
        <Route path="/members/withdraw/:id" element={<Withdraw />} />
        <Route path="/members/edit/:id" element={<EditUser />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recruits" element={<Recruits />} />
        <Route path="recruit/:recruitId" element={<RecruitDetail />} />
        <Route path="/recruit/new" element={<CreateRecruit />} />
        <Route path="/freeboard" element={<FreeBoards />} />
        <Route path="/freeboard/new" element={<CreateFreeboard />} />
        <Route path="/freeboard/:freeId" element={<FreeDetail />} />
        <Route path="/recruit/1/edit" element={<EditRecruit />} />
        <Route path="/freeboard/:freeId/edit" element={<EditFreeboard />} />
        <Route path="/freeboard/tags" element={<FreeTags />} />
        <Route
          path="recruits/tags/:tagId/:tagName"
          element={<TaggedRecruit />}
        />
        <Route path="/recruits" element={<Recruits />} />
        <Route path="/recruit/:recruitId" element={<RecruitDetail />} />
        <Route path="/recruits/tags" element={<RecruitTags />} />
        <Route path="/freeboard/tags" element={<FreeboardTags />} />
      </Routes>
      <Footer />
    </Router>
  </div>
);

export default App;
