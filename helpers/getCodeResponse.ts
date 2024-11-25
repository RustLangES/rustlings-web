import { hitApi } from "~/services/api";

export async function getCodeResponse(payload: Object): Promise<Object> {
  const response = await hitApi(
    "POST",
    "https://emkc.org/api/v2/piston/execute",
    payload,
  );
  if (response.run.code !== 0) {
    return response.run.stderr;
  }
  return response.run.stdout;
}
