import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddPostScreen from './screens/AddPostScreen';
import EditPostScreen from './screens/EditPostScreen';
import SavedPostsScreen from './screens/SavedPostsScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Routes>
          <Route exact path='/posts/:id' element={<PostScreen />} />
          <Route exact path='/register' element={<RegisterScreen />} />
          <Route exact path='/addpost' element={<AddPostScreen />} />
          <Route exact path='/saved' element={<SavedPostsScreen />} />

          <Route exact path='/editpost/:id' element={<EditPostScreen />} />

          <Route exact path='/profile' element={<ProfileScreen />} />
          <Route exact path='/login' element={<LoginScreen />} />
          <Route path='/search/:keyword' element={<HomeScreen />} />

          <Route exact path='/' element={<HomeScreen />} />
        </Routes>
      </main>

    </Router>
  );
}

export default App;
