export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://mygoapi";
  }

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message ||
        errorData?.message ||
        errorData?.error ||
        `Registration failed: ${response.status} ${response.statusText}`;

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      token: data.data.token,
      user: data.data.user,
    };
  }

  async register(credentials: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    display_name: string;
  }) {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message ||
        errorData?.message ||
        errorData?.error ||
        `Registration failed: ${response.status} ${response.statusText}`;

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      token: data.data.token,
      user: data.data.user,
    };
  }

  async googleLogin(code: string) {
    const response = await fetch(`${this.baseUrl}/auth/google/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message ||
        errorData?.message ||
        errorData?.error ||
        `Google login failed: ${response.status} ${response.statusText}`;

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      token: data.data.token,
      user: data.data.user,
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
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message ||
        errorData?.message ||
        errorData?.error ||
        `Registration failed: ${response.status} ${response.statusText}`;

      throw new Error(errorMessage);
    }

    return response;
  }

  async getCurrentUser(token: string) {
    const response = await fetch(`${this.baseUrl}/auth/userinfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message ||
        errorData?.message ||
        errorData?.error ||
        `Registration failed: ${response.status} ${response.statusText}`;

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      token: data.data.token,
      user: data.data.user,
    };
  }
}
