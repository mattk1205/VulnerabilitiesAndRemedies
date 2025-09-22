import Layout from "../layouts/Layout.tsx";
import { Link } from "react-router-dom";
import { BrickWallFire, Loader, UserCircle } from "lucide-react";
import InfoBlock from "../components/ui/InfoBlock";
import { currentSize } from "../services/helperFunctions.ts";
import PlayerInfo from "../components/ui/PlayerInfo.tsx";
import NavButton from "../components/ui/NavButton.tsx";
import InventoryInfo from "../components/ui/InventoryInfo.tsx";
import useProfile from "../hooks/useProfile.ts";

export default function Profile() {
  const { loading, profile, refetch } = useProfile();
  if (loading) {
    return <Loader />;
  }

  if (!profile || !profile.player) {
    return (
      <Layout className="place-items-center">
        <div className="flex text-center justify-center p-5">
          <h2>No player data found.</h2>
          <Link to="/" className="home-button mt-4">Go to Home</Link>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="flex min-h-screen items-start justify-center p-4 pt-20 sm:p-8">
        <div className="glass-container w-full max-w-4xl">
          <div className="mb-8 border-b border-white/10 pb-6 text-center">
            <UserCircle className="mx-auto mb-2 h-16 w-16 text-cyan-300" />
            <h1 className="text-4xl font-bold">{profile.player?.name}</h1>
            <p className="text-sm text-slate-400">ID: {profile.player?.id}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
           <PlayerInfo profile={profile} refetch={refetch} />
            <div className="md:col-span-2">
              <InfoBlock
                icon={<BrickWallFire className="text-cyan-400" />}
                title={`Inventory (${currentSize(profile.player?.inventory)}/${profile.player?.inventory.capacity})`}
                className="border-cyan-400/20 transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                to={`/inventory`}
              >
                <InventoryInfo profile={profile} refetch={refetch}/>
              </InfoBlock>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <NavButton to="/game/levels" className="home-button px-8 py-3 text-base" label={"Levels"}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}