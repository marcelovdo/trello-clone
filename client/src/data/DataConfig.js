module.exports = {
  BACKEND_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:80"
      : "https://desolate-castle-09081.herokuapp.com",
};
