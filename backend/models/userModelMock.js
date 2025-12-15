// Mock User Model for testing without MongoDB
class MockUserModel {
  static users = [
    {
      _id: "1",
      name: "Demo Teacher",
      email: "teacher@test.com",
      password: "$2b$10$YIjlEWh.G.Wz5F5F5F5F5eZ5F5F5F5F5F5F5F5F5F5F5F5F5F5F5F5F5F", // test@123
      role: "teacher"
    },
    {
      _id: "2",
      name: "Demo Student",
      email: "student@test.com",
      password: "$2b$10$YIjlEWh.G.Wz5F5F5F5F5eZ5F5F5F5F5F5F5F5F5F5F5F5F5F5F5F5F5F", // test@123
      role: "student"
    }
  ];

  static async findOne(query) {
    if (process.env.USE_MOCK_DB !== "true") return null;
    return this.users.find(u => u.email === query.email) || null;
  }

  static async findById(id) {
    if (process.env.USE_MOCK_DB !== "true") return null;
    return this.users.find(u => u._id === id) || null;
  }

  static async create(data) {
    if (process.env.USE_MOCK_DB !== "true") return null;
    const newUser = {
      _id: Date.now().toString(),
      ...data,
      password: data.password // In real app, this would be hashed
    };
    this.users.push(newUser);
    return newUser;
  }

  async matchPassword(enteredPassword) {
    // Mock password matching - just check if it's "test@123"
    return enteredPassword === "test@123" || enteredPassword === this.password;
  }

  async save() {
    return this;
  }
}

export default MockUserModel;
