export const signupPartner = async (formData) => {
  const url = "/api/partner/signup";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error creating account", error.message);
  }
};

export const loginPartner = async (formData) => {
  const url = "/api/partner/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("login response", json)
    return json.token;
  } catch (error) {
    console.error("error logging in", error.message);
  }
};