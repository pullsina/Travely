import StartPage from "./pages/StartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ContinentPage from "./pages/ContinentPage";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState("start");

  let currentPage;

  if (page === "register") {
    currentPage = (
      <RegisterPage
        onBack={() => setPage("start")}
        onLogin={() => setPage("login")}
        onRegisterSuccess={() => setPage("continents")}
      />
    );
  } else if (page === "login") {
    currentPage = (
      <LoginPage
        onBack={() => setPage("start")}
        onRegister={() => setPage("register")}
        onLoginSuccess={() => setPage("continents")}
      />
    );
  } else if (page === "continents") {
    currentPage = <ContinentPage onBack={() => setPage("start")} />;
  } else {
    currentPage = (
      <StartPage
        onRegister={() => setPage("register")}
        onLogin={() => setPage("login")}
      />
    );
  }

  return (
    <>
      {currentPage}
      <Footer />
    </>
  );
}

export default App;
