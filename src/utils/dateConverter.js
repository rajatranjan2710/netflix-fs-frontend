export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Unknown Release Date"; // Return a placeholder for invalid dates
  }

  // Format the date to a full format (e.g., September 9, 2024)

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const isAdult = (rating) => {
  if ("false") {
    return "PG-13";
  } else {
    return "18+";
  }
};

export const formatDateV2 = (dateString) => {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long", // Use 'short' for abbreviated month
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
