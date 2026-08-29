import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { useTheme } from '../context/ThemeContext';

const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
  </svg>
);

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-10 h-10 shrink-0 rounded-full flex items-center justify-center
        bg-black-100 text-heading hover:bg-tertiary transition-colors duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          {isDark ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const Navbar = () => {
  const [active, setActive] = useState(' ');
  const [toggle, setToggle] = useState(false); 
  return (
      <nav
       className={`${styles.paddingX}
         w-full flex items-center py-5 fixed top-0 z-20 navbar-surface `}
       >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0,0);
            }}
          >
            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
            <p className="text-heading text-[18px] font-bold cursor-pointer flex">
               Khalid &nbsp;
             <span className="sm:block hidden"> | &nbsp; Dev. Portfolio </span></p>

          </Link>

          <div className="hidden sm:flex flex-row items-center gap-8">
            <ul className="list-none flex flex-row gap-10">
              {navLinks.map((link) => (
                <li
                key={link.id}
                className={`${
                  active == link.title
                    ? "text-heading"
                    :"text-secondary"
                } hover:text-heading text-[18px]
                  font-medium cursor-pointer`}
                  onClick={ () => setActive(link.title)}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>


          <div className='sm:hidden flex flex-1 justify-end items-center gap-4'>
            <ThemeToggle />
            <img
             src={toggle ? close : menu}
             alt="menu"
             className="w-[28px] h-[28px] object-contain cursor-pointer"
             onClick={() => setToggle(!toggle) }
             />

             <div className={`${!toggle ? 'hidden' : 'flex'}
              p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>

                <ul className="list-none flex justify-end items-start flex-col gap-4">
                {navLinks.map((link) => (
                  <li
                  key={link.id}
                  className={`${
                    active == link.title
                      ? "text-heading"
                      :"text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                    onClick={ () => { 
                      setToggle(!toggle);
                      setActive(link.title);
                     }}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                ))}
              </ul>

              </div>

          </div>

        </div>
      </nav>
    )
};

export default Navbar