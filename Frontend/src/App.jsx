import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoutes";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Root />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/dashboard",
  //     element: <PrivateRoute element={<Dashboard />} />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //     errorElement: <ErrorPage />,
  //   },
  // ]);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={reactLogo} className="App-logo" alt="logo" />
          <img src={viteLogo} className="App-logo" alt="logo" />
        </header>
      </div>
      {/* <RouterProvider router={router}>
        <Outlet />
      </RouterProvider> */}

      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Root />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
