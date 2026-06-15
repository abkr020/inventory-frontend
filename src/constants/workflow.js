
export const LIBRARY_ISSUE_WORKFLOW = {
  name: "Library Book Issue",

  sequence: [
    {
      id: 1,
      step: "Request Book",
      allowedRoles: ["Student"],
      actions: [
        { lable: "approve", nextId: 12 }
      ],

    },

    {
      id: 12,
      step: "Teacher Approval",
      allowedRoles: ["Class Teacher"],
      actions: [
        { lable: "approve", nextId: 3 },
        { lable: "needUpdate", nextId: 1 },
        { lable: "reject", nextId: "end" },
      ],

    },

    {
      id: 3,
      step: "Check Availability",
      allowedRoles: ["Librarian"],
      actions: [
        { lable: "approve", nextId: 24 },
        { lable: "needUpdate", nextId: 1 },
        { lable: "reject", nextId: "end" },
      ],
      nextId: 24
    },

    {
      id: 24,
      step: "Issue Book",
      allowedRoles: ["Librarian"],
      actions: [
        { lable: "approve", nextId: 5 },

      ],

    },

    {
      id: 5,
      step: "Receive Book",
      allowedRoles: ["Student"],
      actions: [
        { lable: "approve", nextId: "end" },
      ],
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

export const WORKFLOWS = {
  workflows: [
    LIBRARY_ISSUE_WORKFLOW
  ]
};
