import { hitApi } from "~/services/api";

export type RustPlaygroundResponse = {
  body: {
    result: string,
    error?: string
  },
  status: number
}

export async function getCodeResponse(payload: Object): Promise<RustPlaygroundResponse> {
  const response = await hitApi(
    "POST",
    "https://play.rust-lang.org/evaluate.json",
    payload,
  );
  return response;
}
