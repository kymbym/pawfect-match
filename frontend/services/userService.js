import { useParams } from "react-router-dom";
import { extractPayload } from "../utils/jwtUtils";

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

//user posts appointment
export async function createAppointment(formData, token) {
  // console.log("post function form data", formData);
  // console.log("pet id in create appt function", formData.pet);
  const url = "/api/appointments";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

//user delete appointment
export async function deleteSpecificAppointment(appointmentId, token) {
  const url = `/api/appointments/${appointmentId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("deleted:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//edit appointment
export async function editSpecificAppointment(appointmentId, formData, token) {
  const url = `/api/appointments/${appointmentId}`;
  try {
    console.log("appointment id: ", appointmentId);
    console.log("token", token);
    console.log("form data received", formData);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//user search pets
export async function searchPetsByName(query, token) {
  const url = `/api/pets?name=${query}`;
  try {
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
    console.log("search result:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// user follow dogs
export async function followDog(petId, token) {
  const decoded = extractPayload(token);
  const userId = decoded._id;
  console.log("token user id in follow dog function", userId);
  console.log("pet id in follow dog function", petId);
  const petAndUserId = { petId, userId }; //pass to be put in user controller
  const url = "/api/user";
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petAndUserId),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// user unfollow dogs
export async function unfollowDog(petId, token) {
  const decoded = extractPayload(token);
  const userId = decoded._id;

  const petAndUserId = { petId, userId }; //pass to be put in user controller
  const url = "/api/user";
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petAndUserId),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//get favourite pets
export async function getUserFavorites(token) {
  const url = "/api/user";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("user fav pets", response);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    }
    const json = await response.json();
    console.log("return fav pets json:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//get pets from search categories
export async function getFilteredPets(filteredPet, token) {
  const url = "api/pets/filter";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(filteredPet),
    });
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    }
    const json = await response.json();
    console.log("return filtered pets json:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
