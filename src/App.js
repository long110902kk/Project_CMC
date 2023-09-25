import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screen/homepage';
import Post from './screen/Post';
import Login from './screen/Login';
import Register from './screen/Register';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './screen/Add';
import Edit from './screen/Edit';
import Update from './screen/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/post' element={<Post/>} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<Add/>}/>
        <Route path='/update/:id' element={<Edit/>}/>
        <Route path='/update2/:id' element={<Update/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
