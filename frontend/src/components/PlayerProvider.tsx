// import React, { useState } from "react";
// import type { Player } from "../services/types.ts";
// import PlayerContext from "./PlayerContext.tsx";
//
// export function PlayerProvider({children} : { children: React.ReactNode }) {
//   const [player, setPlayer] = useState<Player | null>(null);
//
//   return (
//     <PlayerContext.Provider value={{player, setPlayer}}>
//       {children}
//     </PlayerContext.Provider>
//   );
// }