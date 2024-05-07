import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Diagnosis from "./pages/Diagnosis";
import About from "./pages/About";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
