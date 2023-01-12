import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CreateRecruit from './pages/CreateRecruit';
import EditRecruit from './pages/EditRecruit';

const App = () => (
  <div className="App">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recruit/new" element={<CreateRecruit />} />
        <Route path="/recruit/1/edit" element={<EditRecruit />} />
      </Routes>
      <Footer />
    </Router>
  </div>
);

export default App;
