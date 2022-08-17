import {
  BrowserRouter,
  Routes,
  Route,Navigate
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
import { useEffect, useState } from "react";
import axios from "axios";
import LocalStorageService from "./api/localstorage";
// import '../src/components/navbar/Navigationbar.css';
// import your route components too

function App() {
  const [fromtoken, setFromtoken] = useState(false);
  const [user, setUser] = useState(null);
	const getUser = async () => {
		try {
			const url = `http://localhost:8081/api/login/success`;
			const { data } = await axios.get(url, { 'Access-Control-Allow-Credentials': true,withCredentials: true });
			setUser(data.user.passport.user.displayName);
			console.log(data.user.passport.user.displayName);

		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		getUser();
    const localStorageService = LocalStorageService.getService();
    const token = localStorageService.getAccessToken();
    if(token){
      setUser("User")
      setFromtoken(true)
    }
	}, []);

  return (
    <BrowserRouter>
    <Offer/>
    <Navigationbar user={user} fromtoken={fromtoken}/>
      <Routes>
      <Route exact path="/" element={<Home />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<Error />} />
      <Route path="registration" element={user ? <Navigate to="/courses" /> : <Register />}>
      </Route>
      <Route path="registration/verify" element={<Verify />} />
      <Route path="login" element={user ? <Navigate to="/courses" /> : <Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="courses" element={<Courses />} />
      <Route path="course-details" element={<CoursesDetails />} />
      <Route path="course" element={user ? <Course /> : <Navigate to="/login" />} />
    </Routes>
    <Footer />
    </BrowserRouter>

  );
}

export default App;
