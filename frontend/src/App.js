import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Diagnosis from "./pages/Diagnosis";
import About from "./pages/About";
const base_url = "http://localhost:5000";

function App() {
  /*
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const fetchData = async () => {
    try {
      const res = await fetch(base_url);
      const result = await res.json();
      setData(result.message);
    } catch (error) {
      console.log("fetch data error ->", error);
    }
  };

  const postData = async () => {
    try {
      const res = await fetch(`${base_url}/api/disease-predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "Mohsin", age: 22 }),
      });
      const result = await res.json();
      setData2(result);
    } catch (error) {
      console.log("fetch data error ->", error);
    }
  };
  */
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
