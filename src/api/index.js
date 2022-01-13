import { API_URL } from "../config";
// --------------------------USER MANGEMENT ----------------------------------
// signin
async function signin(payload) {
  try {
    const req = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await req.json();
    return { status: req.status, data: res.payload };
  } catch {
    return { status: 400 };
  }
}
async function userStatus() {
  try {
    const req = await fetch(`${API_URL}/auth/status`, {
      credentials: "include",
    });
    return { status: req.status };
  } catch {
    return 401;
  }
}
// logout
async function logout() {
  const req = await fetch(`${API_URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  return { status: req.status };
}
// --------------------------------- NEXT BREAK-------------------
async function addNextBreak(startSeconds, endSeconds) {
  try {
    const req = await fetch(`${API_URL}/next-break/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        start: startSeconds,
        end: endSeconds,
      }),
    });
    return req.status;
  } catch {
    console.error("Error inside client next break!");
  }
}
// ------------------------------Feel-------------------
async function setUserFeel(payload) {
  const req = await fetch(`${API_URL}/user/feel`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      feel: payload,
    }),
  });
  return { status: req.status };
}
// ------------------------get projects-----------
async function getProject() {
  const req = await fetch(`${API_URL}/project/get`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  return { status: req.status, data: req };
}

async function createProject(project_name) {
  const req = await fetch(`${API_URL}/project/new`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      name: project_name,
    }),
  });
  return { status: req.status };
}
async function updateProject() {
  const req = await fetch(`${API_URL}/project/get`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  return { status: req.status, data: req };
}
export {
  signin,
  logout,
  userStatus,
  addNextBreak,
  setUserFeel,
  getProject,
  createProject,
  updateProject,
};
