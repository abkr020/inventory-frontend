export const LIBRARY_ISSUE_WORKFLOW = {
  name: "Library Book Issue",

  sequence: [
    {
      id: 1,
      step: "Request Book",
      allowedRoles: ["Student"],
      nextId=12
    },

    {
      id: 12,
      step: "Teacher Approval",
      allowedRoles: ["Class Teacher"],
      nextId=3
    },

    {
      id: 3,
      step: "Check Availability",
      allowedRoles: ["Librarian"],
      nextId=24
    },

    {
      id: 24,
      step: "Issue Book",
      allowedRoles: ["Librarian"],
      nextId=5
    },

    {
      id: 5,
      step: "Receive Book",
      allowedRoles: ["Student"],
      nextId="end"
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