import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  getUserId() {
    return localStorage.getItem("userId");
  }
  login(idToken, userId) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("userId", userId);

    window.location.assign(`/user/${userId}`);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("userId");
    
    window.location.assign("/");
  }
}

export default new AuthService();
