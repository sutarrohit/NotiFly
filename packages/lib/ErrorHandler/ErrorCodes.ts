export const customError = {
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    http: {
      status: 200,
      // 401
    },
  },

  NOT_FOUND: {
    code: "NOT_FOUND",
    http: {
      status: 200,
      // 404
    },
  },

  NOT_ACCEPTABLE: {
    code: "NOT_ACCEPTABLE",
    http: {
      status: 200,
      // 406
    },
  },

  SERVER_ERROR: {
    code: "SERVER_ERROR",
    http: {
      status: 200,
      // 500
    },
  },

  CONFLICT: {
    code: "CONFLICT",
    http: {
      status: 200,
      // 409
    },
  },
};
