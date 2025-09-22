import { useEffect, useState } from "react";
import type { PlayerProfile } from "../services/types.ts";
import { getErrorMessage, getProfile } from "../services/helperFunctions.ts";

export default function useProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  async function refetch() {
    try {
      setLoading(true);
      const profile = await getProfile();
      if (profile) {
        setProfile(profile);
      }
    }
    catch (e) {
      getErrorMessage(e);
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, []);

  return { loading, profile, refetch };
}