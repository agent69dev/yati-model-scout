
const API_URL = "/api/casting/apply/";


const toInstagramURL = (value) => {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  return `https://instagram.com/${value.replace("@", "")}`;
};

const toTikTokURL = (value) => {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  return `https://tiktok.com/@${value.replace("@", "")}`;
};

export const submitCastingApplication = async (formData) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("age", formData.age);
  data.append("location", formData.location);
  data.append("instagram_link", toInstagramURL(formData.instagram));
  data.append("tiktok_link", toTikTokURL(formData.tiktok));

  formData.photos.forEach((photo) => {
    data.append("photos", photo);
  });

  const response = await fetch(API_URL, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    const errors = await response.json();
    throw errors;
  }

  return await response.json();
};

export const fetchApplications = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch applications");
  return await response.json();
};
