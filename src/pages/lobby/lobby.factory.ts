import { IRaid, Raid } from "src/models/raid.model";

export const generateRaids = (): IRaid[] => {
  const items = [
    new Raid({
      id: undefined,
      name: "time dungeon",
      type: "dungeon",
      levels: [],
      resources: [{ type: "coin", value: 20 }],
      startDate: "01/02/2024",
      endDate: "02/28/2024",
      bgImageUrl: 'https://i.pinimg.com/564x/0b/96/51/0b9651d63e59244ef5bc06cd752b42b5.jpg',
      previewImageUrl: 'https://cdn-icons-png.flaticon.com/128/3302/3302096.png'
    }),
    new Raid({
      id: undefined,
      name: "riddle dungeon",
      type: "dungeon",
      levels: [],
      resources: [
        { type: "coin", value: 60 },
        { type: "energy", value: 100 },
      ],
      startDate: "03/01/2024",
      endDate: "03/30/2024",
      bgImageUrl: 'https://i.pinimg.com/564x/09/1e/cd/091ecd759fdbc625673685ae1622dd5c.jpg',
      previewImageUrl: 'https://cdn-icons-png.flaticon.com/128/3676/3676491.png'
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
      startDate: "03/01/2024",
      endDate: "03/30/2024",
      bgImageUrl: 'https://i.pinimg.com/564x/b9/0f/ad/b90fad7ab5e13aa1df1437365ca14af7.jpg',
      previewImageUrl: "https://cdn-icons-png.flaticon.com/128/1236/1236363.png"
    }),
  ];

  return items;
};
