export const LIBRARY_ISSUE_WORKFLOW = {
  name: "Library Book Issue",

  sequence: [
    {
      id: 1,
      step: "Request Book",
      allowedRoles: ["Student"],
    },

    {
      id: 2,
      step: "Teacher Approval",
      allowedRoles: ["Class Teacher"],
    },

    {
      id: 3,
      step: "Check Availability",
      allowedRoles: ["Librarian"],
    },

    {
      id: 4,
      step: "Issue Book",
      allowedRoles: ["Librarian"],
    },

    {
      id: 5,
      step: "Receive Book",
      allowedRoles: ["Student"],
    },

    // {
    //   id: 6,
    //   step: "Return Book",
    //   allowedRoles: ["Student"],
    // },

    // {
    //   id: 7,
    //   step: "Verify Return",
    //   allowedRoles: ["Librarian"],
    // },
  ],
};