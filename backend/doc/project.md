mutation createProject {
  createProject(data: {title: "Account project", description: "accounts description"}) {
    _id
    title
  }
}

mutation createProcess {
  createProcess(data: {project: "635e848e46b6c5d9c2ab2418", title: "DONE", description: "description"}) {
    _id
    title
  }
}

mutation createEntry {
  createEntry(data: {project: "635e848e46b6c5d9c2ab2418", title: "hello new entry"}) {
    _id
    project {
      _id
    }
  }
}

mutation updateProcess {
  updateProcess(id: "635e8519449d381458716282", data: {title: "DONE", entryOrder: ["635e899f667df0a6961f7759"]}) {
    _id
  }
}

mutation updateProject {
  updateProject(id: "635e848e46b6c5d9c2ab2418", data: {title: "Csicskak", description: "desc.", processOrder: ["635e8519449d381458716282", "635ea500ea1277614e506c80"]}) {
    _id
  }
}

mutation updateEntry {
  updateEntry(id: "635e899f667df0a6961f7759" data: {
    title: "Sziasztok"
    description: "Nincsen köztünk csicska"
  }) {
    _id
    title
    description
  } 
}

mutation setEntryToProcess {
  setEntryToProcess(entry: "635e899f667df0a6961f7759" process: "635ea500ea1277614e506c80")
}

mutation removeEntryFromProcess {
  removeEntryFromProcess(entry: "635e899f667df0a6961f7759" process: "635ea500ea1277614e506c80")
}