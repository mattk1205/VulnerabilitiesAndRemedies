import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import InfoBlock from "../components/ui/InfoBlock";
import { BaggageClaim, Loader, UserCircle } from "lucide-react";
import PlayerInfo from "../components/ui/PlayerInfo.tsx";
import InventoryInfo from "../components/ui/InventoryInfo.tsx";
import useProfile from "../hooks/useProfile.ts";


export default function InventoryPage() {
  const {loading, profile, refetch} = useProfile();

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
      <div className="flex min-h-screen items-start justify-center pt-20 sm:p-8">
        <div className="glass-container w-full max-w-6xl">
          <div className="mb-8 border-b border-white/10 pb-6 text-center">
            <UserCircle className="mx-auto h-16 w-12 text-cyan-300" />
            <h1 className="!text-3xl font-bold">Inventory</h1>
            <p className="text-sm text-slate-400">Use, Remove or Equip Items</p>
          </div>
          <div className="md:col-span-1">
            <InfoBlock
              icon={<BaggageClaim className="text-rose-400" />}
              title="Inventory"
              className="border-rose-400/20 my-4"
            >
              <InventoryInfo expand={true} profile={profile} refetch={refetch}/>
            </InfoBlock>
          </div>
          <PlayerInfo profile={profile} refetch={refetch}/>
          <Link to="/profile" className="home-button mt-4">
            Go to Profile
          </Link>
        </div>
      </div>
    </Layout>
  );
}
