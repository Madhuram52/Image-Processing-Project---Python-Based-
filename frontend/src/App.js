import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './home/pages/Home';
import Upload from './home/pages/Upload';
import Gallery from './home/pages/Gallery';
import EditImage from './home/pages/EditImage';
import Auth from './home/pages/Auth';

function App() {
  let routes;
  routes = (
    <Routes>
      {/* Specify the route path and the corresponding component */}
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />}></Route>
      <Route path="/gallery/:userId" element={<Gallery />} />
      {/* Replace the current entry in the history stack */}
      {/* Clicking the back button will skip the previous route */}
      {/* Navigate will ensure that route reaches / when any invalid route is there after / ..e.g., /asd */}
      <Route path="/gallery/image" element={<EditImage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <Router>
      {/* <MainNavigation /> */}
      {/* Define the routes */}
      <main>
        {routes}
      </main>
    </Router>
  )
}

export default App;
