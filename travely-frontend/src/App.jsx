import StartPage from "./pages/StartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ContinentPage from "./pages/ContinentPage";
import GamePage from "./pages/GamePage";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
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
        {/* public routes-------------------- */}
        <Route
          path="/"
          element={<StartPage onRegister={() => {}} onLogin={() => {}} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* --------------------------------- */}

        {/* protected routes----------------- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/continents" element={<ContinentPage />} />
          // This route is for the game page, which takes a continent as a URL
          parameter.
          <Route path="/game/:continent" element={<GamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* --------------------------------- */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
