class SessionProvider {
  getSessionToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.clear();
  }
}

export default new SessionProvider();
