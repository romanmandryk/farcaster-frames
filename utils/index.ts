export const HOST =
  process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_HOST;

export const MAX_FRAME_NUMBER = 7;

export function getNumberFromFrameId(frameId: string): number {
  return parseInt(frameId?.substring(1), 10);
}

export function extractPathParameters(url: string): {
  collectionName: string;
  frameId: string;
} {
  // Parse the URL
  const parsedUrl = new URL(url);

  // Split the pathname by '/' and filter out empty strings
  const pathSegments = parsedUrl.pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  // Extract the last two path segments
  const frameId = pathSegments.pop() || ""; // Removes and returns the last element
  const collectionName = pathSegments.pop() || ""; // Removes and returns the new last element

  return { collectionName, frameId };
}
