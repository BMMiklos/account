mutation createProject {
  createProject(data: {title: "Account project", description: "accounts description"}) {
    _id
    title
  }
}

mutation createProcess {
  createProcess(data: {project: "635eb297a0d8d9e8090a81c6", title: "DONE", description: "description"}) {
    _id
    title
    project {
      _id
      title
      description
      createdAt
      updatedAt
    }
  }
}

mutation createEntry {
  createEntry(data: {project: "635eb297a0d8d9e8090a81c6",  process: "635eb309a0d8d9e8090a81e5", title: "hello new entry"}) {
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
  setEntryToProcess(entry: "635eb403a0d8d9e8090a821d" process: "635eb309a0d8d9e8090a81e5")
}

mutation removeEntryFromProcess {
  removeEntryFromProcess(entry: "635eb403a0d8d9e8090a821d" process: "635eb308a0d8d9e8090a81e1")
}

mutation deleteProject {
  deleteProject(id:"635e848e46b6c5d9c2ab2418")
}

query projectBySearch {
  projectsBySearch(searchQuery: "ACC") {
    _id
    title
    description
    createdAt
    updatedAt
    processes {
      _id
      title
      description
      createdAt
      updatedAt
    }
    entries {
      _id
      title
      description
    }
  }
}

query processById {
  processById(id: "635ea500ea1277614e506c80") {
    _id
    title
    description
    createdAt
    updatedAt
    entries {
      _id
      title
      description
    }
  }
}
