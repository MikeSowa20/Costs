import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Company from './components/pages/company';
import Contact from './components/pages/contact';
import Home from './components/pages/home';
import NewProject from './components/pages/newproject';
import Projects from './components/pages/projects';
import Project from './components/pages/project';
import Login from './components/login/login';
import Signup from './components/login/signup';
import ProtectedRoute from './components/login/ProtectRoute';

import Container from './components/layouts/container';
import NavBar from './components/layouts/navBar'
import Footer from './components/layouts/footer';

function App() {
  return (
   <Router>
    <NavBar/>
    <Container customClass="min-heigth" >
        <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route exact  path="/" element={ <Login /> } />
          
          <Route path="/company" element={ <Company /> } />
          
          <Route element={ <ProtectedRoute /> }>
            <Route path="/contact" element={ <Contact /> } />
            <Route path="/home" element={ <Home /> } />
            <Route path="/projects" element={ <Projects /> } />
            <Route path="/newproject" element={ <NewProject /> } />
            <Route path="/project/:id" element={ <Project /> } />
          </Route>
        </Routes>
    </Container>
    <Footer/>
    
   </Router>
  );
}

export default App;
