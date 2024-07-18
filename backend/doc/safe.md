query safes {
  safes(safeFilter: {
    label: ""
    description: ""
  }) {
    _id
    label
    secret
    description
  }
}

query safeById {
  safeById(
    id: "66967cc002c1af9e0cefac25"
  	password: "Enter123"
  ) {
    _id
    label
    secret
    description
  }
}

mutation createSafe {
  createSafe(data: {
    label: "Hello World"
    secret: "something that you don't want to see"
    password: "Enter123"
    description: "desc"
  }) {
    _id
    label
    secret
  }
}
