import { ok } from "assert";
import { ServiceContext } from "typescript-rest";

export interface Status {
  status: string;
}

export const StatusOK = { status: "ok" };
export const StatusErr = { status: "err" };
