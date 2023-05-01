import Navbar from "./components/navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import About from "./pages/about";
import Games from "./pages/games";
import Tech from "./pages/tech";
import Community from "./pages/community";
import Article from "./pages/article";
import "./styles/App.scss";
import TyPage from "./pages/portfolios/ty";
import JohnPage from "./pages/portfolios/john";
import PaulPage from "./pages/portfolios/paul";
import Footer from "./components/footer";
import AuthVerify from "./services/AuthVerify";
import AuthService from "./services/AuthService";
import Profile from "./components/profile";

// Contains the Routing for the layout of the website.
// If app acts up with CORS, whitelabel error, switch to HashRouter.
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/games/:id" element={<Article />} />
        <Route exact path="/tech/:id" element={<Article />} />
        <Route path="/games" element={<Games />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio/tyheir" element={<TyPage />} />
        <Route path="/portfolio/john" element={<JohnPage />} />
        <Route path="/portfolio/paul" element={<PaulPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <AuthVerify logOut={AuthService.logout} />
      <Footer />
    </div>
  );
};
export default App;
