import { BASE_URL } from "./loc";

export async function fetchAvailablePlaces() {
  const response = await fetch(`${BASE_URL}/places`);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to fetch places.");
    throw error;
  }

  return data.places;
}

export async function fetchUserPlaces() {
  const response = await fetch(`${BASE_URL}/user-places`);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to fetch places.");
    throw error;
  }

  console.log("fetch user places", data.places);

  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch(`${BASE_URL}/user-places`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(
      responseData.message || "Failed to update user places."
    );
    throw error;
  }

  return responseData.message;
}
