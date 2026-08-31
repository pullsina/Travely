import StartPage from "./pages/StartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ContinentPage from "./pages/ContinentPage";
import { useAuth } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const { user, loading, isAuthenticated } = useAuth();

  console.log("Auth:", {
    user,
    loading,
    isAuthenticated,
  });

  //Make sure pages are not visible while AuthContext checks /me
  if (loading) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<StartPage onRegister={() => {}} onLogin={() => {}} />}
        />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/continents" element={<ContinentPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
