export const initialBooks = [
  {
    id: 1,
    title: "Java Programming",
    author: "James Gosling",
    genre: "Programming",
    isbn: "9780134685991",
    quantity: 3
  },
  {
    id: 2,
    title: "Database Systems",
    author: "Thomas Connolly",
    genre: "Database",
    isbn: "9780321292494",
    quantity: 1
  },
  {
    id: 3,
    title: "Web Development",
    author: "Jon Duckett",
    genre: "Web Development",
    isbn: "9781118907443",
    quantity: 4
  }
];

export const initialUsers = [
  {
    id: 1,
    name: "John Mokoena",
    email: "john@gmail.com",
    membershipId: "LIB001",
    role: "Admin"
  },
  {
    id: 2,
    name: "Mary Thabo",
    email: "mary@gmail.com",
    membershipId: "LIB002",
    role: "User"
  },
  {
    id: 3,
    name: "Peter Smith",
    email: "peter@gmail.com",
    membershipId: "LIB003",
    role: "User"
  }
];

export const initialTransactions = [
  {
    id: 1,
    user: "John Mokoena",
    book: "Java Programming",
    action: "Borrowed",
    quantity: 1,
    date: new Date().toLocaleDateString()
  }
];