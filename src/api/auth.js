const BASE_URL = "http://127.0.0.1:8000/api/accounts";

// ✅ Helper for fetch requests
async function apiRequest(url, method, body = null) {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || data.detail || "Request failed");
    }

    return data;
  } catch (err) {
    console.error(`API Error [${method} ${url}]:`, err.message);
    throw err;
  }
}

// ✅ Signup user (with email instead of phone)
export function signupUser(username, email, password, password2) {
  return apiRequest(`${BASE_URL}/signup/`, "POST", {
    username,
    email,
    password,
    password2,
  });
}

// ✅ Login user
export function loginUser(username, password) {
  return apiRequest(`${BASE_URL}/login/`, "POST", { username, password });
}

// ✅ Refresh token
export function refreshToken(refresh) {
  return apiRequest(`${BASE_URL}/token/refresh/`, "POST", { refresh });
}

// ✅ Forgot password
export function forgotPassword(email) {
  return apiRequest(`${BASE_URL}/password_reset/`, "POST", { email });
}

// ✅ Reset password
export function resetPassword(uidb64, token, newPassword, confirmPassword) {
  return apiRequest(
    `${BASE_URL}/password_reset_confirm/${uidb64}/${token}/`,
    "POST",
    {
      new_password: newPassword,
      confirm_password: confirmPassword,
    }
  );
}
