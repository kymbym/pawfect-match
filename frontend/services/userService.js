//signing up user
export async function signUpUser(formData) {
  const url = "/api/user/signup";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//logging in user
export async function logInUser(formData) {
  const url = "/api/user/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // console.log("json", json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//get appointments made by user
export async function getUserAppointments(token) {
  const url = "/api/appointments";
  try {
    console.log("token", token);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("appointments:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
