import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

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
    return json.token;
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

export const getPartnerById = async (token) => {
  const url = `/api/partner`;

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
    console.error("error getting partner details", error.message);
  }
};

export const getAllPets = async (token, sort, name) => {
  const params = new URLSearchParams();

  if (sort) {
    params.append("sort", sort);
  }
  if (name) {
    params.append("name", name);
  }
  const queryString = params.toString();
  const url = `/api/pets?${queryString}`;

  console.log("fetching pets with token", token, sort, name);
  console.log("request getallpets url", url);

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
      },
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("add new pet response", json);
    return json;
  } catch (error) {
    console.error("error adding pet", error.message);
  }
};

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

export const getPartnerAppointments = async (token) => {
  const url = `/api/appointments`;

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
    console.error("error getting appointments", error.message);
  }
};

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_REGION;

AWS.config.update({
  region: REGION,
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadFile = async (file) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
  };

  try {
    const upload = await s3.putObject(params).promise();
    console.log(upload);
    const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
    return url;
  } catch (error) {
    console.error(error);
    throw new Error("error uploading file", error.message);
  }
};

export const uploadFiles = async (files) => {
  try {
    const uploadPromises = Array.from(files).map((file) => uploadFile(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("error uploading files", error);
    throw new Error("error uploading files");
  }
};

export const deletePhoto = async (photoUrl, petId, token) => {
  const url = `/api/pets/${petId}/delete-photo`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`failed to delete photo: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error deleting photo", error.message);
  }
};
