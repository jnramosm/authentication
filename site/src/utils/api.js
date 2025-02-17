import config from "./config";

export const userRegister = async (email, password) => {
  return await requestApi("/register", "POST", { email, password });
};

export const userLogin = async (email, password) => {
  return await requestApi("/login", "POST", { email, password });
};

export const refreshToken = async () => {
  return await requestApi("/refresh_token", "POST");
};

export const userLogout = async () => {
  return await requestApi("/logout", "POST");
};

export const setUsername = async (email, username, accessToken) => {
  return await requestApi(
    "/setusername",
    "POST",
    { email, username },
    { authorization: `bearer ${accessToken}` }
  );
};

export const getUsername = async (email, accessToken) => {
  return await requestApi(
    "/getusername",
    "POST",
    { email },
    { authorization: `bearer ${accessToken}` }
  );
};

const requestApi = async (
  path = "",
  method = "GET",
  data = null,
  headers = {},
  authorization = {}
) => {
  // Check if API URL has been set
  if (!config?.domains?.api) {
    throw new Error(
      `Error: Missing API Domain – Please add the API domain from your serverless Express.js back-end to this front-end application.  You can do this in the "./config.js" file.  Instructions are listed there and in the documentation.`
    );
  }

  // Prepare URL
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  const url = `${config.domains.api}${path}`;

  // Set headers
  headers = Object.assign({ "Content-Type": "application/json" }, headers);

  // Default options are marked with *
  const response = await fetch(url, {
    method: method.toUpperCase(),
    mode: "cors",
    cache: "no-cache",
    headers,
    credentials: "include",
    body: data ? JSON.stringify(data) : null,
  });

  if (response.status < 200 || response.status >= 300) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
};
