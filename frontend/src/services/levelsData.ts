import type { Level } from "./types.ts";

export function getLevels(): Level[] {
  return levelsInfo;
}

export const levelsInfo: Level[] = [
  {
    number: 1,
    description:
      "UltraComp Technologies is under attack! \n\n " +
      "Our employees are failing victim to a complex phishing campaign. \n\n " +
      "Do you know what to do?",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "phishing",
  },
  {
    number: 2,
    description: "Low 2 ",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "",
  },
  {
    number: 3,
    description: "Low 3 ",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "",
  },
  {
    number: 4,
    description: "Medium 5",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "",
  },
  {
    number: 5,
    description: "Medium 5",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "",
  },
  {
    number: 6,
    description: "Medium 6",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "",
  },
  {
    number: 7,
    description: "Medium 7",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "",
  },
  {
    number: 8,
    description: "Hard 8",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "",
  },
  {
    number: 9,
    description: "Hard 9",
    enemies: {
      "Script Kiddy": 1,
    },
    available: true,
    type: "",
  },
  {
    number: 10,
    description: "Hard 10",
    enemies: {
      "Script Kiddy": 1,
    },
    available: false,
    type: "buffer overflow"
  },
];
