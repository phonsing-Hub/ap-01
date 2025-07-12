

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://mygoapi";
  }

  async login(credentials: { username: string; password: string }) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return {
      token: data.data.token,
      user: data.data.user
    };
  }

  async logout(token: string) {
    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return response;
  }

  async getCurrentUser(token: string) {
    const response = await fetch(`${this.baseUrl}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get current user");
    }

    const data = await response.json();
    return {
      // token: data.access_token,
      user: data.data
    };
  }
}
