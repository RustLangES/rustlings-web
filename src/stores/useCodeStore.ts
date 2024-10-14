export class useCodeStore {
  async getCode() {
    return localStorage.getItem("code");
  }

  async setCode(code: string) {
    localStorage.setItem("code", code);
  }

  async clearCode() {
    localStorage.removeItem("code");
  }
}
