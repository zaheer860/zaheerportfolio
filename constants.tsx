
import { Experience, Education, Project, Achievement, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Zaheer Ahamad Mohammed",
  title: "Mechanical Engineer & Robotics Specialist",
  location: "Andhra Pradesh, India",
  email: "mohammadzaheerahamad786@gmail.com",
  phone: "+91 9121371651",
  linkedin: "linkedin.com/in/mohammed-zaheer-ahamad",
  summary: "A forward-thinking Mechanical Engineer with a deep expertise in CAD design, robotics, embedded systems, and computer vision. Committed to advancing high-performance automation solutions through a blend of mechanical precision and intelligent software integration."
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Intern",
    organization: "IIT Tirupati",
    duration: "May 2025 – Jun 2025",
    points: [
      "Completed a certified internship on the Ornithopter Project, achieving a 15% improvement in flight efficiency through structural optimization.",
      "Applied advanced engineering principles to enhance flight stability by 20% and improve aerodynamic performance.",
      "Designed and prototyped a cam-driven ornithopter mechanism powered by a BLDC motor for lightweight flight systems."
    ]
  },
  {
    id: "exp2",
    role: "Intern / Assistant Trainer",
    organization: "II Club",
    duration: "Mar 2022 – Apr 2025",
    points: [
      "Taught Fusion 360, AutoCAD, and basic mechatronics to students in robotics and CAD workshops.",
      "Guided participants in assembling, wiring, and programming complex robotic mechanisms.",
      "Fabricated functional robotic prototypes for workshop demonstrations, improving build accuracy and training efficiency.",
      "Supported curriculum preparation for practical lab sessions, increasing participant engagement."
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    id: "edu1",
    degree: "Bachelor of Mechanical Engineering",
    institution: "JNTUA Narayana Engineering College, Nellore",
    duration: "Expected 2026",
    details: "Relevant Coursework: AutoCAD, SolidWorks, ANSYS, IoT. Current Grade: 85%."
  },
  {
    id: "edu2",
    degree: "Intermediate",
    institution: "Narayana Junior College",
    duration: "2020 – 2022",
    details: "Focus on Mathematics, Physics, and Chemistry."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Humanoid Robot (ESP8266-Based)",
    tech: ["ESP8266", "PWM Servo Driver", "AI Interaction", "Web-based Control"],
    description: [
      "Engineered a humanoid robot integrating servo and motor control for 180° neck rotation and multi-directional movement.",
      "Developed AI-based interaction (Robo 4.0) enabling autonomous responses to user voice and text input."
    ],
    impact: [
      "Achieved a 25% improvement in responsiveness.",
      "Reduced manual intervention by 40% through optimized control logic."
    ]
  },
  {
    id: "p2",
    title: "5 DOF Robotic Arm",
    tech: ["ESP32", "Arduino", "OpenCV", "MediaPipe"],
    description: [
      "Designed and prototyped a 5-DOF robotic arm with optimized link geometry and stable joint actuation.",
      "Built a dual-controller system: ESP32 Wi-Fi Mode and Gesture-controlled Mode using computer-vision hand tracking."
    ],
    impact: [
      "Developed modular firmware for seamless mode switching without reconfiguration.",
      "Ensured smooth multi-servo synchronization via optimized PWM signal handling."
    ]
  },
  {
    id: "p3",
    title: "Gesture-Controlled Drone",
    tech: ["DJI Tello", "OpenCV", "MediaPipe", "Python"],
    description: [
      "Interfaced a DJI Tello drone with a laptop to enable real-time control via hand signals.",
      "Implemented hand landmark detection to translate gestures into commands like takeoff, land, and directional movement."
    ],
    impact: [
      "Achieved stable video-stream processing and low-latency control."
    ]
  },
  {
    id: "p4",
    title: "CAD Design Robotics Portfolio",
    tech: ["AutoCAD", "SolidWorks", "3D Printing"],
    description: [
      "Designed detailed 3D models and technical drawings for humanoid robots at II Club.",
      "Utilized CAD tools and 3D printing to build five rapid prototypes."
    ],
    impact: [
      "Reduced design errors by 15%.",
      "Cut design-to-prototype time by 40%."
    ]
  }
];

export const SKILLS = {
  technologies: ["SolidWorks", "ANSYS", "AutoCAD", "Fusion 360", "Arduino", "PyCharm"],
  core: ["CAD Modeling", "Robotics", "Drone Systems", "Simulation", "Computer Vision", "Embedded Systems"],
  ai: ["OpenCV", "YOLO (Object Detection)", "MediaPipe (Pose Tracking)"]
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "AI Bootcamp @ IIT Hyderabad", description: "Completed 40-hour intensive program with LOR and internship offer." },
  { id: "a2", title: "Robotics Certification (Grade A)", description: "Scored 94% in Sanfoundry Robotics Certification Test." },
  { id: "a3", title: "1st Prize - Gesture Drone", description: "Winner at district-level competition DKW College." },
  { id: "a4", title: "1st Prize - Yantra 2K23/24/25", description: "Won consecutively at Project Expos for drone innovations." }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "c1", name: "SolidWorks Essentials", issuer: "SourceCAD" },
  { id: "c2", name: "Conceptual CAE Design & Simulation", issuer: "EduSkills (Virtual Internship)" },
  { id: "c3", name: "AutoCAD Essentials", issuer: "SourceCAD" },
  { id: "c4", name: "Robotics Fundamentals (Grade A)", issuer: "Sanfoundry" }
];
