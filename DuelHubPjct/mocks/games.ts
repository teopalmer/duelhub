import { GameType } from "@/requests/games";
const mock_gameList: GameType[] = [
  {
    id: "123456",
    name: "Mafia",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 10,
    category: "Detective",
  },
  {
    id: "133456",
    name: "Splendor",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 2,
    maxPlayers: 4,
  },
  {
    id: "133416",
    name: "Citadels",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 8,
  },

  {
    id: "139456",
    name: "Kunhandel",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 6,
  },
  {
    id: "184456",
    name: "Agricola",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 1,
    maxPlayers: 5,
    category: "Strategy",
  },
];

export const mock_getGameList = (times?: number): GameType[] => {
  if (!times) return mock_gameList;
  const result = [] as GameType[];

  for (let i = 0; i < times; i++) {
    result.push(
      ...mock_gameList.map((game) => ({
        ...game,
        id: game.id + i.toString(),
      }))
    );
  }
  return result;
};
