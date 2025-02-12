import {
    java,
    flutter,
    robusta,
    mobile,
    backend,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    git,
    carrent,
    qrgen,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Java Developer",
      icon: backend,
    },
  ];
  
  const technologies = [
    
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "Java",
      icon: java,
    },
  ];
  
  const experiences = [
    {
      title: "Java Developer",
      company_name: "Java",
      icon: java,
      iconBg: "#E6DEDD",
      date: " Present",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
      title: "React.js Developer",
      //company_name: "Robusta",
      icon: robusta,
      iconBg: "#383E56",
      date: "March 2020 - April 2021",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
      title: "Flutter Developer",
      company_name: "Dart",
      icon: flutter, // Make sure you have a valid Flutter logo
      iconBg: "#E6DEDD",
      date: "March 2023 - Present",
      points: [
        "Building and maintaining cross-platform mobile applications using Flutter.",
        "Collaborating with UI/UX designers to create visually appealing mobile experiences.",
        "Ensuring smooth performance and responsiveness of apps across different devices.",
        "Writing clean and maintainable Dart code for mobile applications.",
      ],
    },
  ];
  
  const testimonials = [
    {
      id: 1,
      testimonial: "",
      name: "",
      designation: "",
      company: "",
      image: "",
    },
    {
      id: 2,
      testimonial:"",
      name: "",
      designation: "",
      company: "",
      image: "",
    },
    {
      id: 3,
      testimonial: "",
      name: "",
      designation: "",
      company: "",
      image: "",
    },
  ];
  
  const projects = [
    {
      name: "Coffee Roastery",
      description:
        "Web-based platform designed for a coffee store, allowing users to explore the menu, place orders, and learn about the store’s offerings. Provides a seamless and engaging experience for coffee lovers, enhancing convenience and customer interaction.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_Link: "https://github.com/KhalidMued/",
    },
    {
      name: "QrCode Generator",
      description:
        "I built a QR Code generator web app using React, allowing users to create and download custom QR Codes effortlessly.",
      tags: [
        {
          name: "Reactjs",
          color: "blue-text-gradient",
        },
        {
          name: "ReactPrime",
          color: "green-text-gradient",
        },
        {
          name: "QrCode",
          color: "pink-text-gradient",
        },
      ],
      image: qrgen,
      source_code_Link: "https://github.com/KhalidMued/QrCodeGenerator.git",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };