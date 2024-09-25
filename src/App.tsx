// import "./resolutions.scss";
import Header from "./components/Header/Header.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "./components/Loader/Loader.tsx";

const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const BrowsePage = lazy(() => import("./pages/BrowsePage"));

function App() {
  const { t, i18n } = useTranslation();
  const [searched, setSearched] = useState<string>("");

  const handleSearchQuery = (searched: string) => {
    setSearched(searched);
  };

  return (
    <div className="min-h-screen pt-24">
      <Header searching={handleSearchQuery} i18n={i18n} t={t} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <ProfilePage searched={searched} t={t} />
              </Suspense>
            }
          />
          <Route
            path="browse"
            element={
              <Suspense fallback={<Loader />}>
                <BrowsePage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
