import { useEffect, useState } from "react";
import { createViewerToken } from "@/actions/token";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [identity, setIdentity] = useState<string | null>(null);

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken?.name;
        const identity = decodedToken?.jti;

        if (name) {
          setName(name);
        }
        if (identity) {
          setIdentity(identity);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };

    createToken();
  }, [hostIdentity]);

  return { token, name, identity };
};
