# Projekt létrehozása

mutation createProject {
  createProject(data: {
    title: "Account project",
    description: "accounts description"
  }) {
    _id
    title
  }
}

# Folyamat létrehozása

mutation createProcess {
  createProcess(data: {
    project: "635e848e46b6c5d9c2ab2418"
    title: "DONE"
    description: "description"
  }) {
    _id
    title
  }
}

# Bejegyzés létrehozása

mutation createEntry {
  createEntry(data: {
    project: "635e848e46b6c5d9c2ab2418"
    process: "635e8519449d381458716282"
    title: "hello new entry"
  }) {
    _id
    project {
      _id
    }
  }
}

# Folyamat módosítása

mutation updateProcess {
  updateProcess(id: "635e8519449d381458716282", data: {
    title: "DONE"
    entryOrder: ["635e899f667df0a6961f7759", "635e85fe92dc08838c04b286"]
  }) {
    _id
  }
}
