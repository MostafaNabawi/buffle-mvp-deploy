import { API_URL } from "../config/index";

async function getAllUsers() {
  try {
    const req = await fetch(`${API_URL}/admin/users`, {
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    return { status: req.status, data: res?.payload };
  } catch {
    return { status: 400 };
  }
}
export { getAllUsers };
