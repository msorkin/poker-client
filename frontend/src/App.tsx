import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from './components/Lobby';
import TableView from './components/TableView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/table/:gameId" element={<TableView />} />
      </Routes>
    </Router>
  );
}

export default App;