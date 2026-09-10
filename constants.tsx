
import { Experience, Education, Project, SkillGroup, Achievement, Certification, Stat } from './types';

// All content below is sourced from Zaheer_Resume.pdf — keep it in sync with the résumé rather than embellishing it
export const PERSONAL_INFO = {
  name: "Zaheer Ahamad Mohammed",
  role: "Mechanical Engineer",
  specialism: "CAD Design & Product Development",
  email: "mohammadzaheerahamad786@gmail.com",
  phone: "+91 9121371651",
  linkedin: "linkedin.com/in/mohammed-zaheer-ahamad",
  resume: "/Zaheer_Resume.pdf",
  intro: "I model and validate multi-component mechanical assemblies in NX CAD, and most recently supported new product development for automotive components at Pricol Precision Products.",
  summary: "Mechanical Engineering graduate with hands-on experience in CAD design, product development, SAP MM operations, robotics, embedded systems, and computer vision.",
  skillsLine: "Skilled in SolidWorks, NX CAD, ANSYS, OpenCV, ESP32/Arduino, and industrial workflow practices."
};

export const HERO_DISCIPLINES = [
  { title: "CAD Design", detail: "NX CAD · SolidWorks · Creo" },
  { title: "Product Development", detail: "NPD · GD&T · Documentation" },
  { title: "Robotics", detail: "ESP32 · Arduino · Servo control" },
  { title: "Computer Vision", detail: "OpenCV · YOLO · MediaPipe" }
];

export const FOCUS_AREAS = [
  "CAD Design",
  "Product Development",
  "NPD",
  "Mechanical Engineering",
  "Robotics",
  "Engineering Documentation",
  "SAP MM",
  "Quality / Validation"
];

// Figures taken from the resume (NX CAD assemblies, Yantra 2K23/24/25 wins, Sanfoundry score)
export const ABOUT_STATS: Stat[] = [
  { value: "10+", label: "NX CAD assemblies modeled" },
  { value: "3×", label: "Project Expo 1st prizes" },
  { value: "94%", label: "Robotics certification (Grade A)" }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "NPD Intern",
    organization: "Pricol Precision Products Pvt. Ltd.",
    duration: "Feb 2026 – May 2026",
    points: [
      "Supported NPD activities for automotive components — design documentation, production follow-ups, and quality processes across departments.",
      "Managed 20+ daily SAP MM transactions (PR creation, Service Entry, R&R, RGP, payment requests) for material and vendor operations.",
      "Reviewed CMM inspection reports and maintained engineering drawings/dispatch documentation to support quality validation and traceability."
    ]
  },
  {
    id: "exp2",
    role: "Intern",
    organization: "IIT Tirupati",
    duration: "May 2025 – Jun 2025",
    points: [
      "Developed a cam-driven ornithopter mechanism (BLDC-powered).",
      "Optimized flapping-wing geometry through simulation-driven aerodynamic analysis."
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    id: "edu1",
    degree: "B.Tech, Mechanical Engineering",
    institution: "JNTUA Narayana Engineering College, Nellore",
    duration: "2022 – 2026",
    grade: { label: "CGPA Equivalent", value: "80%" }
  },
  {
    id: "edu2",
    degree: "Intermediate",
    institution: "Narayana Junior College",
    duration: "2020 – 2022"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    number: "01",
    title: "CAD Assembly Design & Motion Simulation (NX CAD)",
    description: "Modeled 10+ multi-component mechanical assemblies (Pipe Vice, 4-Cylinder Engine, Bench Vice, Knuckle Joint, Wheel Support) with GD&T, BOM, and NX Motion Simulation to validate functional movement and clearances.",
    tech: ["NX CAD", "GD&T", "Motion Simulation"],
    discipline: "CAD / Engineering",
    facts: [
      { label: "Software", value: "Siemens NX CAD" },
      { label: "Scope", value: "10+ assemblies" },
      { label: "Documentation", value: "GD&T · BOM" },
      { label: "Validation", value: "Motion & clearances" }
    ],
    // Alt text describes only what is visible in each render
    gallery: [
      { src: "/projects/nx-engine-assembly", alt: "NX CAD model of a four-cylinder crankshaft, connecting-rod and piston assembly" },
      { src: "/projects/nx-vice-assembly", alt: "NX CAD model of a vice assembly with a sliding jaw, lead screw and T-handle" },
      { src: "/projects/nx-coupling-assembly", alt: "NX CAD model of a two-yoke coupling assembly joined by a centre block and pins" },
      { src: "/projects/nx-housing-assembly", alt: "NX CAD model of a bolted housing assembly with two bearing bores" },
      { src: "/projects/nx-knuckle-part", alt: "NX CAD model of a forked support part with two stepped shafts" },
      { src: "/projects/nx-jack-assembly", alt: "NX CAD model of a threaded lifting assembly on a tapered base" }
    ]
  },
  {
    id: "p2",
    number: "02",
    title: "Face Detection & Recognition Drone (DJI Tello)",
    description: "Built a real-time aerial face detection/tracking system with OpenCV and Tello SDK for perimeter monitoring.",
    tech: ["DJI Tello", "OpenCV", "Python"],
    discipline: "System diagram",
    diagram: "drone"
  },
  {
    id: "p3",
    number: "03",
    title: "Humanoid Robot (ESP8266)",
    description: "Servo-based head/multi-directional movement with Wi-Fi control and AI voice/text interaction.",
    tech: ["ESP8266", "Servo Control", "Wi-Fi"],
    discipline: "System diagram",
    diagram: "humanoid"
  },
  {
    id: "p4",
    number: "04",
    title: "5-DOF Robotic Arm (ESP32 + Arduino)",
    description: "Dual control modes: ESP32 Wi-Fi and OpenCV + MediaPipe gesture control, with optimized PWM servo actuation.",
    tech: ["ESP32", "Arduino", "OpenCV", "MediaPipe"],
    discipline: "System diagram",
    diagram: "arm"
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  { id: "cad", title: "CAD / Design", focus: "3D modeling, assemblies & simulation", items: ["NX CAD", "SolidWorks", "AutoCAD", "Fusion 360", "ANSYS", "Creo"] },
  { id: "sap", title: "SAP / Industrial", focus: "Material & vendor operations", items: ["SAP MM", "PR Processing", "Service Entry", "R&R", "RGP", "Documentation"] },
  { id: "prog", title: "Programming", focus: "Embedded systems & microcontrollers", items: ["Python", "Embedded C", "ESP8266", "ESP32", "Arduino"] },
  { id: "ai", title: "AI & Vision", focus: "Computer vision for robotics & drone systems", items: ["OpenCV", "YOLO", "MediaPipe"] },
  { id: "core", title: "Core Areas", focus: "Product development & validation", items: ["NPD", "Motion Simulation", "Robotics", "GD&T", "Quality Control"] }
];

export const TOOLCHAIN = ["NX CAD", "Creo", "SolidWorks", "AutoCAD", "Fusion 360", "ANSYS", "Embedded C", "Arduino", "PyCharm"];

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "AI Bootcamp — IIT Hyderabad (Techobyte)", description: "40-hour AI Bootcamp — Letter of Recommendation, Appreciation & Internship Offer." },
  { id: "a2", title: "1st Prize — Yantra 2K23, 2K24 & 2K25", description: "Project Expos, recognised for drone innovation." },
  { id: "a3", title: "1st Prize — District-level Competition", description: "Gesture-controlled drone competition." },
  { id: "a4", title: "Grade A (94%) — Sanfoundry", description: "Robotics Certification Test." }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "c1",
    name: "Master Diploma in Mechanical CAD (195 Hrs)",
    issuer: "CAD Desk",
    topics: ["ANSYS Workbench", "Creo", "GD&T", "NX CAD"],
    grade: "Excellent"
  },
  { id: "c2", name: "SolidWorks & AutoCAD Essentials Certifications", issuer: "SourceCAD" },
  { id: "c3", name: "Virtual Internship, Conceptual CAE Design & Simulation", issuer: "EduSkills" },
  { id: "c4", name: "Robotics Certification", issuer: "Sanfoundry" }
];
