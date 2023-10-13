const messages = require("../../../../config/messages");

module.exports = {
  Create_Department: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.success,
          },
        },
      },
    },
  },
  GetDepartment: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.success,
            data: [
              {
                id: "BG1YSESVFAR9BKV94Y83",
                name: "marketing",
              },
            ],
          },
        },
      },
    },
  },
  Admin_SignIn: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.loggedIn,
            token: {
              accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDViN2RhNWY1Zjc2ZTJiOGVmNDBlMmUiLCJwaG9uZSI6IjExMjIzMzQ0NTUiLCJlbWFpbCI6InNhbXBsZUBnbWFpbC5jb20iLCJzZXNzaW9uSWQiOiJlNTg0ZGZkOC1hYzUzLTRiNjgtODViNC05ZmI0YTczYjUxNzEiLCJpYXQiOjE2ODU4OTAzNzUsImV4cCI6MTY4NjA2MzE3NX0.gtyvLzkhdGVcfbrZXLEPRcy-DI5RuRgQwHQz-gMVocE",
              refreshToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDViN2RhNWY1Zjc2ZTJiOGVmNDBlMmUiLCJwaG9uZSI6IjExMjIzMzQ0NTUiLCJlbWFpbCI6InNhbXBsZUBnbWFpbC5jb20iLCJzZXNzaW9uSWQiOiJlNTg0ZGZkOC1hYzUzLTRiNjgtODViNC05ZmI0YTczYjUxNzEiLCJpYXQiOjE2ODU4OTAzNzUsImV4cCI6MTY4NjIzNTk3NX0.3tWXaFjaexb9fHTXchYdn480awR5vk1RHv-i8-Zi6-c",
            },
          },
        },
      },
    },
  },
  Save_Admin: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.created,
          },
        },
      },
    },
  },
  Edit_Department: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.success,
          },
        },
      },
    },
  },
  Create_Agent: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.success,
          },
        },
      },
    },
  },
  GetAgent: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.success,
            data: [
              {
                username: "anu",
                department: "market",
                id: "3140442e-5f32-4190-ac15-7e0d766401a0",
                Status: "active",
              },
              {
                username: "manu",
                department: "market",
                id: "1e94c678-8773-40ab-ae4a-1e96a6116739",
                Status: "active",
              },
            ],
          },
        },
      },
    },
  },
  Agent_Set_Pwd_And_Name: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.success,
          },
        },
      },
    },
  },
  Delete_Agent: {
    code: 200,
    response: {
      description: "Success",
      content: {
        "application/json": {
          example: {
            statusCode: 200,
            message: messages?.success,
          },
        },
      },
    },
  },
};
