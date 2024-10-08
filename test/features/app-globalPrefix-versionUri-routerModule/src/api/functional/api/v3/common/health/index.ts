/**
 * @packageDocumentation
 * @module api.functional.api.v3.common.health
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

/**
 * @controller HealthController.get
 * @path GET /api/v3/common/health
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function get(connection: IConnection): Promise<void> {
  return PlainFetcher.fetch(connection, {
    ...get.METADATA,
    template: get.METADATA.path,
    path: get.path(),
  });
}
export namespace get {
  export const METADATA = {
    method: "GET",
    path: "/api/v3/common/health",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = () => "/api/v3/common/health";
}
