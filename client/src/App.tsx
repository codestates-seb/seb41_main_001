import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CreateRecruit from './pages/CreateRecruit';
import EditRecruit from './pages/EditRecruit';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-recruit" element={<CreateRecruit />} />
          <Route path="/edit-recruit" element={<EditRecruit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
