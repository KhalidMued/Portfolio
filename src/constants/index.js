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
    {
      title: "Mobile Developer",
      icon: web,
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
      title: "Job Title",
      company_name: "Company Name",
      icon: java,
      iconBg: "#E6DEDD",
      date: "Start Date - End Date",
      points: [
        "Key responsibility or achievement placeholder.",
        "Key responsibility or achievement placeholder.",
        "Key responsibility or achievement placeholder.",
      ],
    },
    {
      title: "Job Title",
      company_name: "Company Name",
      icon: robusta,
      iconBg: "#383E56",
      date: "Start Date - End Date",
      points: [
        "Key responsibility or achievement placeholder.",
        "Key responsibility or achievement placeholder.",
        "Key responsibility or achievement placeholder.",
      ],
    },
    {
      title: "Job Title",
      company_name: "Company Name",
      icon: flutter,
      iconBg: "#E6DEDD",
      date: "Start Date - End Date",
      points: [
        "Key responsibility or achievement placeholder.",
        "Key responsibility or achievement placeholder.",
        "Key responsibility or achievement placeholder.",
      ],
    },
  ];
  
  const testimonials = [];
  
  const projects = [
    {
      name: "Project Name",
      description:
        "Short project description placeholder — what it does and the value it provides.",
      tags: [
        {
          name: "tag1",
          color: "blue-text-gradient",
        },
        {
          name: "tag2",
          color: "green-text-gradient",
        },
        {
          name: "tag3",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_Link: "https://github.com/username/repo",
    },
    {
      name: "Project Name",
      description:
        "Short project description placeholder — what it does and the value it provides.",
      tags: [
        {
          name: "tag1",
          color: "blue-text-gradient",
        },
        {
          name: "tag2",
          color: "green-text-gradient",
        },
        {
          name: "tag3",
          color: "pink-text-gradient",
        },
      ],
      image: qrgen,
      source_code_Link: "https://github.com/username/repo",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };