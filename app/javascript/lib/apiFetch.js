//
// Convenience wrapper for fetch() calls to JSON API endpoints
//

export async function apiFetch({ url, options = {} }) {
  const { method = "GET", headers, ...rest } = options;

  const fetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
    mode: "cors",
    ...rest,
  };

  const response = await fetch(url, fetchOptions);

  if (response.status < 500) {
    let json = null;
    try {
      json = await response.json();
    } catch (error) {
      return {
        code: response.status,
        errorCode: response.status,
        error: "Server error",
        data: null,
      };
    }

    if (response.status >= 200 && response.status < 300) {
      return { code: response.status, errorCode: null, data: json };
    }

    return {
      code: response.status,
      errorCode: response.status,
      error: response.error || json.error || null,
      errors: json.errors,
      data: null,
    };
  } else {
    return {
      code: response.status,
      errorCode: response.status,
      error: "Server error",
      data: null,
    };
  }
}
