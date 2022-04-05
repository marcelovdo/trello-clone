module.exports = {
  BACKEND_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost"
      : "http://desolate-castle-09081.herokuapp.com",
};
