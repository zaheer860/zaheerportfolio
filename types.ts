
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
  details: string;
}

export interface Project {
  id: string;
  title: string;
  tech: string[];
  description: string[];
  impact: string[];
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
}
