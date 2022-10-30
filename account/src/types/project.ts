class Project {
  id: string;
  labels: ProjectLabel[] = [];
}

class ProjectLabel {
  id: string;
  entries: ProjectEntry[] = [];
}

class ProjectEntry {
  id: string;
}

export { Project, ProjectLabel, ProjectEntry };
