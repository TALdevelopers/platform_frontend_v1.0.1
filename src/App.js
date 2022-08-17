import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import Navigationbar from "./components/navbar/Navigationbar";
import Offer from "./components/offer/Offer";
import Courses from "./pages/Courses";
import CoursesDetails from "./pages/CoursesDetails";
import Course from "./pages/Course";
import Error from "./pages/Error";
import Footer from "./components/footer/Footer";
// import '../src/components/navbar/Navigationbar.css';

// import your route components too

function App() {
  return (
    <BrowserRouter>
    <Offer/>
    <Navigationbar />
      <Routes>
      <Route exact path="/" element={<Home />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<Error />} />
      <Route path="registration" element={<Register />}>
      </Route>
      <Route path="registration/verify" element={<Verify />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="courses" element={<Courses />} />
      <Route path="course-details" element={<CoursesDetails />} />
      <Route path="course" element={<Course />} />
    </Routes>
    <Footer />
    </BrowserRouter>

  );
}

export default App;
