// import {createContext} from "react";
// import type { Inventory, Player } from "../services/types.ts";
//
// type State = {
//   data: Player | null;
//   loading: boolean;
//   error: string | null;
//   lastLoadedAt: string | null;
// }
//
// const inventory: Inventory = {
//   capacity: 0,
//   items: {},
//   listView: {
//     id: "",
//     name: "",
//     description: "",
//     quantity: 0,
//     isKnown: false,
//   },
// };
//
// const newPlayer: Player = {
//   id: 0,
//   name: "",
//   inventory: inventory,
//   health: 0,
//   maxHealth: 0,
//   baseDamage: 0,
//   equippedWeapon: null,
// };
//
// const initialState: State = {
//   data: newPlayer,
//   loading: true,
//   error: null,
//   lastLoadedAt: null,
// }
//
// type Action =
//   | { type: "REQUEST" }
//   | { type: "SUCCESS"; payload: Player }
//   | { type: "FAILURE"; error: string };
//
// function createPlayer(state: State, action: Action): State {
//   switch (action.type) {
//     case "REQUEST":
//       return {...state, loading: true, error: null};
//     case "SUCCESS":
//       return {
//         data: action.payload,
//         loading: false,
//         error: null,
//         lastLoadedAt: Date().toString(),
//       };
//     case "FAILURE":
//         return {
//           ...state,
//           loading: false,
//           error: action.error || "Unknown error",
//         }
//     default: {
//       const _exhaustive: never = action;
//       return state;
//     }
//   }
// }
//
// const PlayerContext = createContext<
//   {
//     player: Player | null;
//     setPlayer: (player: Player | null) => void;
//   } | null>(null);
//
//
// export default PlayerContext;