import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles

import { About, Contact, Credentials, Experience, Highlights, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";


const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary page-depth'>
        {/* Fixed (not absolute) so it stays behind every section as a
            persistent backdrop while scrolling, rather than being sized to
            one section's box. Its negative z-index means it paints beneath
            Hero's own opaque background (.bg-hero-pattern) too, so it's
            invisible there without any extra logic — it only shows up once
            you scroll past Hero, exactly where every other section has no
            opaque background of its own. Never occupies flow space, so no
            fallback content is needed to avoid layout shift. */}
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>

        <Navbar />
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Hero />
        </div>
        <About />
        <Experience />
        <Credentials />
        <Tech />
        <Works />
        <Highlights />
        <Contact />
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