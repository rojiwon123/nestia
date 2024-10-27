import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { NestiaEditorIframe } from "./NestiaEditorIframe";
import { NestiaEditorUploader } from "./NestiaEditorUploader";

export function NestiaEditorApplication() {
  const [ready, setReady] = useState(false);
  const [asset, setAsset] = useState<IAsset | null>(null);
  useEffect(() => {
    (async () => {
      try {
        setAsset(await getAsset());
      } catch {
        setAsset(null);
      }
      setReady(true);
    })().catch(() => {});
  }, []);
  if (ready === false) return <></>;
  return asset !== null ? (
    <NestiaEditorIframe
      swagger={asset.url}
      simulate={asset.simulate}
      e2e={asset.e2e}
    />
  ) : (
    <div
      style={{
        padding: 25,
      }}
    >
      <Typography variant="h4">Nestia Editor</Typography>
      <hr />
      <br />
      <NestiaEditorUploader />
    </div>
  );
}

async function getAsset(): Promise<IAsset | null> {
  const index: number = window.location.href.indexOf("?");
  if (index === -1) return null;

  const query: URLSearchParams = new URLSearchParams(
    window.location.href.substring(index + 1),
  );
  const url: string | null = query.get("url") ?? (await findSwagger());
  if (url === null) return null;
  try {
    new URL(url);
  } catch {
    return null;
  }

  const simulate: string | null = query.get("simulate");
  const e2e: string | null = query.get("e2e");
  return {
    url,
    simulate:
      simulate !== null ? simulate === "true" || simulate === "1" : true,
    e2e: e2e !== null ? e2e === "true" || e2e === "1" : true,
  };
}

async function findSwagger(): Promise<string | null> {
  const response: Response = await fetch("./swagger.json");
  return response.status === 200 ? "./swagger.json" : null;
}

interface IAsset {
  url: string;
  simulate: boolean;
  e2e: boolean;
}
