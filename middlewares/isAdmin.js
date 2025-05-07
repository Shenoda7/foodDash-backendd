const jwtDecode = require("jwt-decode").jwtDecode;

const isAdmin = (req, res, next) => {
  const token =
    req?.headers?.authorization?.split(" ")[1] ||
    req?.headers?.Authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      data: null,
      message: "Unauthorized",
    });
  }
  const decoded = jwtDecode(token);

  if (decoded.role === "admin") {
    next();
  } else {
    res.status(401).json({
      status: 401,
      data: null,
      message: "Unauthorized",
    });
  }
};

module.exports = isAdmin;
