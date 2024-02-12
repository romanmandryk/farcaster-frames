import { redirect, RedirectType } from "next/navigation";
import {
  extractPathParameters,
  getNumberFromFrameId,
  HOST,
  MAX_FRAME_NUMBER,
} from "@/utils";

export async function POST(req: Request) {
  const url = req.url;
  const data = await req.json();
  const { buttonIndex } = data?.untrustedData;
  const { collectionName, frameId } = extractPathParameters(url);
  const currentFrameNumber = getNumberFromFrameId(frameId);
  let nextFrameNumber =
    buttonIndex === 2 ? currentFrameNumber + 1 : currentFrameNumber - 1;
  if (nextFrameNumber < 1) {
    nextFrameNumber = 1;
  }
  if (nextFrameNumber > MAX_FRAME_NUMBER) {
    nextFrameNumber = MAX_FRAME_NUMBER;
  }
  redirect(`${HOST}/${collectionName}/f${nextFrameNumber}`);
}
