import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/SignUp.jsx';
import AddPost from './components/UserPost/AddPost.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/Register/AddPost" element={<AddPost/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
