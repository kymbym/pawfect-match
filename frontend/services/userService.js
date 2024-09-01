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
