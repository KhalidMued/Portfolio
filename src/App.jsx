import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";


const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary page-depth'>
        <Navbar />
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Hero />
          <div className="hero-transition" aria-hidden="true" />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          {/* Absolutely positioned decorative background layer (inset-0, z-[-1]
              inside StarsCanvas itself) — it never occupies flow space, so no
              fallback content is needed to avoid layout shift. */}
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={3000} // Closes after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
    </BrowserRouter>
  );
}

export default App;