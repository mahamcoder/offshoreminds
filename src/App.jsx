import { createBrowserRouter, RouterProvider, ScrollRestoration, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import CaseStudies from './pages/CaseStudies';
import Blogs from './pages/Blogs';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';import Disclaimers from './pages/Disclaimers';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import BlogDetail from './pages/BlogDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <><ScrollRestoration /><Layout /></>,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Services /> },
      { path: "services/:serviceId", element: <ServiceDetail /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogDetail /> },
      { path: "careers", element: <Careers /> },
      {
        path: "admin",
        element: <ProtectedRoute />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <Dashboard /> },
        ]
      },
      { path: "admin/login", element: <Login /> },
      { path: "careers", element: <Careers /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <Terms /> },
      { path: "disclaimers", element: <Disclaimers /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
