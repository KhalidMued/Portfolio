import { useState, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const formRef = useRef();
  const honeypotRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
 const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({ ...form, [name]: value })
 }

 const handleSubmit = (e) => {
  e.preventDefault();

  // Honeypot: real visitors never see or fill this field, so any value here
  // means a bot filled every input it could find — drop the submission
  // silently, no error shown, no request sent.
  if (honeypotRef.current?.value) {
    return;
  }

  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
    toast.error('Please fill in all fields with a valid email address.');
    return;
  }

  setLoading(true);

  emailjs.send(
    'service_ptvv27j',
    'template_7iy3t04',
    {
      from_name: name,
      to_name:'Khalid',
      from_email: email,
      to_email:'khalid.mued@gmail.com',
      message: message,
    },
    '2CJVeRwsf_o57mnSM'
    )
    .then(() => {
      setLoading(false);
      toast.success("Thank you! I'll get back to you soon.");

      setForm({
        name: '',
        email: '',
        message: '',
      })
    }, (error) => {
      setLoading(false);
      if (import.meta.env.DEV) console.error(error);
      toast.error("Something went wrong. Please try again.");
    })
 }


  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
      variants={slideIn('left', "tween", 0.2, 1)}
      className="flex-[0.75] bg-black-100 surface-elevate p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8"
        >
          {/* Honeypot: visually hidden and unreachable by keyboard/screen reader
              for real users, but a plain <input> a naive bot's form-filler will
              still find and populate. */}
          <input
           type="text"
           name="contact_hp"
           ref={honeypotRef}
           tabIndex={-1}
           autoComplete="off"
           aria-hidden="true"
           className="absolute -left-[9999px] w-px h-px overflow-hidden"
          />

          <label className="flex flex-col">
            <span className="text-heading font-medium mb-4">Your Name</span>
            <input
             type="text"
             name="name"
             value={form.name}
             onChange={handleChange}
             placeholder="What's Your name?"
             required
             maxLength={100}
             className="bg-tertiary py-4 px-6 placeholder:text-secondary
              text-heading rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-heading font-medium mb-4">Your Email</span>
            <input
             type="email"
             name="email"
             value={form.email}
             onChange={handleChange}
             placeholder="What's Your email?"
             required
             maxLength={254}
             pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
             className="bg-tertiary py-4 px-6 placeholder:text-secondary
              text-heading rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-heading font-medium mb-4">Your Message</span>
            <textarea
            rows="7"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What Do You Want To Say"
            required
            maxLength={2000}
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
              text-heading rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
          type="submit"
          className="bg-tertiary py-3 px-8 outline-none w-fit
           text-heading font-bold shadow-md shadow-primary rounded-xl"
          >
          {loading ? 'Sending...' : 'Send'}  
          </button>
        </form>
      </motion.div>

      <motion.div
      variants={slideIn('right', "tween", 0.2, 1)}
      className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        {/* This wrapper's own size classes are fixed regardless of the fallback,
            so there's no layout shift while the 3D chunk loads. */}
        <Suspense fallback={<div className="w-full h-full" />}>
          <EarthCanvas />
        </Suspense>
      </motion.div>

    </div>
    )
}

export default SectionWrapper(Contact,"contact")