import { Routes, Route } from 'react-router';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Post from './pages/Post';
// import NoMatch from './pages/NoMatch';

import './App.css';
import Navbar from './components/Navbar';


function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="posts" element={<Posts />} />
      <Route path="posts/:postId" element={<Post/>} />
      {/* <Route path="posts" element={
        <>
        {selectedPostId === null ? (
        <Posts onSelectPost={(postId) => setSelectedPostId(postId)} />
      ) : (
        <Post postId={selectedPostId} onBack={() => setSelectedPostId(null)} />
      )}
        </>
        } /> */}

      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
    </>
  )
}

export default App
