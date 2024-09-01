export const signupPartner = async (formData, token) => {
  const url = "/api/partner/signup";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const loginPartner = async (formData, token) => {
  const url = "/api/partner/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("login response", json);
    return json.token;
  } catch (error) {
    console.error("error logging in", error.message);
  }
};

export const getPetById = async (petId, token) => {
  const url = `/api/pets/${petId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error getting pet", error.message);
  }
};

export const getAllPets = async (token) => {
  const url = `/api/pets`;
  console.log("fetching pets with token", token);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("received response", response);
    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error fetching all pets", error.message);
    return { pets: [] };
  }
};

export const addPet = async (petData, token) => {
  const url = `/api/pets`;
  console.log("upload new pet with token", token);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(petData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      }
    });

    if (!response.ok) {
      throw new Error (`response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("add new pet response", json)
    return json;
  } catch (error) {
    console.error("error adding pet", error.message);
  }
}

export const updatePet = async (petId, petData, token) => {
  const url = `/api/pets/${petId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(petData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`failed to update pet: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error updating pet", error.message);
  }
};

export const deletePet = async (petId, token) => {
  const url = `/api/pets/${petId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`failed to delete pet: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error deleting pet", error.message);
  }
};
