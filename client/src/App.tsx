import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
import Main from './pages/Main';
import Withdrawl from './pages/Withdrawl';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import Footer from './components/Footer';
import EditUser from './pages/EditUser';

const App = () => (
  // const [login, setLogin] = useState(false);
  <div className="App">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/members/mypage" element={<MyPage />} />
        <Route path="/members/withdrawl" element={<Withdrawl />} />
        <Route path="/members/edit" element={<EditUser />} />
      </Routes>
      <Footer />
    </Router>
  </div>
);

export default App;
