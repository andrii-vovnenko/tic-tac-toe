import BoardPage from './pages/BoardPage';
import { BoardProvider } from './context/BoardContext';

function App() {

  return (
    <div className="App">
      <BoardProvider>
        <BoardPage />
      </BoardProvider>
    </div>
  )
}

export default App
