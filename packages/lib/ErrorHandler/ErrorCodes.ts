export const customError = {
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    http: {
      status: 401,
    },
  },

  NOT_FOUND: {
    code: "NOT_FOUND",
    http: {
      status: 404,
    },
  },

  NOT_ACCEPTABLE: {
    code: "NOT_ACCEPTABLE",
    http: {
      status: 406,
    },
  },

  SERVER_ERROR: {
    code: "SERVER_ERROR",
    http: {
      status: 500,
    },
  },
};
