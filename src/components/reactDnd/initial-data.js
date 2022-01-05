import { COMPONENT, ROW, COLUMN } from "./constants";

const initialData = {
  layout: [
    {
      type: ROW,
      id: "row0",
      children: [
        {
          type: COLUMN,
          id: "Sunday",
          children: [
            {
              type: COMPONENT,
              id: "component0",
            },
            {
              type: COMPONENT,
              id: "component1",
            },
          ],
        },
        {
          type: COLUMN,
          id: "Monday",
          children: [
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },

        {
          type: COLUMN,
          id: "Tusday",
          children: [
            {
              type: COMPONENT,
              id: "component3",
            },
          ],
        },
        {
          type: COLUMN,
          id: "Wednesday",
          children: [
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },
        {
          type: COLUMN,
          id: "Thursday",
          children: [
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },
        {
          type: COLUMN,
          id: "Friday",
          children: [
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },
        {
          type: COLUMN,
          id: "Saturday",
          children: [
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },
      ],
    },
    {
      type: ROW,
      id: "row1",
      children: [
        {
          type: COLUMN,
          id: "Buffle Project",
          children: [
            {
              type: COMPONENT,
              id: "component3",
            },
            {
              type: COMPONENT,
              id: "component0",
            },
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },
      ],
    },
  ],
  components: {
    component0: { id: "component0", type: "input", content: "Some input" },
    component1: { id: "component1", type: "image", content: "Some image" },
    component2: { id: "component2", type: "email", content: "Some email" },
    component3: { id: "component3", type: "name", content: "Some name" },
    component4: { id: "component4", type: "phone", content: "Some phone" },
  },
};

export default initialData;
