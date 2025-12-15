// Mock Database - In-Memory Storage
class MockDatabase {
  constructor() {
    this.users = [];
    this.exams = [];
    this.questions = [];
    this.cheatingLogs = [];
  }

  // User methods
  addUser(user) {
    const id = Date.now().toString();
    const newUser = { ...user, _id: id };
    this.users.push(newUser);
    return newUser;
  }

  findUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  findUserById(id) {
    return this.users.find(u => u._id === id);
  }

  getAllUsers() {
    return this.users;
  }

  // Exam methods
  addExam(exam) {
    const id = Date.now().toString();
    const newExam = { ...exam, _id: id };
    this.exams.push(newExam);
    return newExam;
  }

  getAllExams() {
    return this.exams;
  }

  getExamById(id) {
    return this.exams.find(e => e._id === id);
  }

  // Question methods
  addQuestion(question) {
    const id = Date.now().toString();
    const newQuestion = { ...question, _id: id };
    this.questions.push(newQuestion);
    return newQuestion;
  }

  getQuestionsByExamId(examId) {
    return this.questions.filter(q => q.examId === examId);
  }

  // Cheating Log methods
  addCheatingLog(log) {
    const id = Date.now().toString();
    const newLog = { ...log, _id: id };
    this.cheatingLogs.push(newLog);
    return newLog;
  }

  getCheatingLogs() {
    return this.cheatingLogs;
  }
}

export default new MockDatabase();
