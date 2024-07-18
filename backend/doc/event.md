mutation CreateEvent {
  createEvent(data: { 
  	title: "Hello World",
    description:"Descrtiption",
    isCompleted: false,
    from: 0,
    to: 1,
  	type: "task",
  }) {
    _id
  }
}

mutation DeleteEvent {
  deleteEvent(id: "66990c0943ffd17bdbf5fadc")
}

query Events {
  eventsByFilter(eventFilter: {
    title: "",
    description: "",
  }) {
    _id
    title
    description
  }
}

query EventById {
  eventById(id:"66990c0b43ffd17bdbf5fade") {
    _id
    title
    description
    isCompleted
    type
    from
    to
    createdAt
    updatedAt
  } 
}