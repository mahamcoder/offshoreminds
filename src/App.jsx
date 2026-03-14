import { createBrowserRouter, RouterProvider, ScrollRestoration, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const SubServiceDetail = lazy(() => import('./pages/SubServiceDetail'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Disclaimers = lazy(() => import('./pages/Disclaimers'));
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const OffshoreMindsAI = lazy(() => import('./pages/OffshoreMindsAI'));
// Loading Component - Matches index.html styling exactly
const PageLoader = () => (
  <div className="min-h-screen bg-bloom-dark flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-bloom-primary/30 border-t-bloom-primary rounded-full animate-spin"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ScrollRestoration />
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Services /> },
      { path: "services/:serviceId", element: <ServiceDetail /> },
      { path: "services/:serviceId/sub/:subServiceId", element: <SubServiceDetail /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "case-studies/:id", element: <CaseStudyDetail /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogDetail /> },
      { path: "careers", element: <Careers /> },
      { path: "careers/:id", element: <Careers /> },
      {
        path: "admin",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
        ]
      },
      { path: "admin/login", element: <Login /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <Terms /> },
      { path: "disclaimers", element: <Disclaimers /> },
      { path: "offshoreminds-ai", element: <OffshoreMindsAI /> },
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
