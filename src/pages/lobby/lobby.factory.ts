import { IRaid, Raid } from "src/models/raid.model";

export const generateRaids = (): IRaid[] => {
  const items = [
    new Raid({
      id: undefined,
      name: "speed dungeon",
      type: "dungeon",
      levels: [],
      resources: [{ type: "coin", value: 20 }],
      startDate: "01/02/2024",
      endDate: "28/02/2024",
    }),
    new Raid({
      id: undefined,
      name: "memory dungeon",
      type: "dungeon",
      levels: [],
      resources: [
        { type: "coin", value: 60 },
        { type: "energy", value: 100 },
      ],
      startDate: "01/03/2024",
      endDate: "30/03/2024",
    }),
    new Raid({
      id: undefined,
      name: "world boss",
      type: "boss",
      levels: [],
      resources: [
        { type: "coin", value: 1000 },
        { type: "energy", value: 1000 },
      ],
      startDate: "01/03/2024",
      endDate: "30/03/2024",
    }),
  ];

  return items;
};
