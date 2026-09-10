
export interface Experience {
  id: string;
  role: string;
  organization: string;
  duration: string;
  points: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  grade?: { label: string; value: string };
}

export interface ProjectImage {
  // Base path in /public without the size suffix, e.g. "/projects/nx-engine-assembly" -> "-1600.webp", "-800.webp", "-240.webp"
  src: string;
  alt: string;
}

export type ProjectDiagram = 'drone' | 'humanoid' | 'arm';

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  tech: string[];
  // Short label shown on the media frame
  discipline: string;
  // Real CAD renders; projects without photography fall back to a system diagram drawn from the stated architecture
  gallery?: ProjectImage[];
  diagram?: ProjectDiagram;
  facts?: { label: string; value: string }[];
}

export interface SkillGroup {
  id: string;
  title: string;
  focus: string;
  items: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  topics?: string[];
  grade?: string;
}

export interface Stat {
  value: string;
  label: string;
}
