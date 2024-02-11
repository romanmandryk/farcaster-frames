import { redirect } from "next/navigation";
import descriptions from "./descriptions";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

const HOST = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_HOST;

type Props = {
  params: { collectionName: string; frameId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<any> {
  // read route params
  const { frameId, collectionName } = params;
  const currentFrameNumber = parseInt(frameId?.substring(1), 10); // Extracting the numeric part and converting to integer

  const image = `${HOST}/img/${frameId}.png`;

  return {
    title: collectionName,
    description: descriptions[frameId as keyof typeof descriptions],
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": image,
      "fc:frame:image:aspect_ratio": "1:1",
      "fc:frame:button:1": "Back",
      "fc:frame:button:2": "Next",
      "fc:frame:post_url": `${HOST}/${collectionName}/f${currentFrameNumber + 1}`,
    },
    openGraph: { images: image },
  };
}
export default function Frame({ params }: Props) {
  const currentFrameNumber = parseInt(params.frameId?.substring(1), 10); // Extracting the numeric part and converting to integer
  const getNextFrameUrl = (direction: string): string => {
    let nextFrameNumber =
      direction === "next" ? currentFrameNumber + 1 : currentFrameNumber - 1;
    if (nextFrameNumber < 1) nextFrameNumber = 1;
    if (nextFrameNumber > 7) nextFrameNumber = 7;
    return `/${params.collectionName}/f${nextFrameNumber}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-sm mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={"/img/" + params.frameId + ".png"}
              alt={params.frameId}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="p-4">
            <p className="text-base font-medium text-gray-900">
              {descriptions[params.frameId as keyof typeof descriptions]}
            </p>
          </div>
          <div className="flex justify-between p-4">
            <Link
              href={getNextFrameUrl("back")}
              className={`px-4 py-2 rounded-lg text-white ${currentFrameNumber <= 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
            >
              &#8592; Back
            </Link>
            <Link
              href={getNextFrameUrl("next")}
              className={`px-4 py-2 rounded-lg text-white ${currentFrameNumber >= 7 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
            >
              Next &#8594;
            </Link>
          </div>
        </div>
      </div>

      {/*<p>collectionName: {params.collectionName}</p>
          <p>frameId: {params.frameId}</p>*/}
    </main>
  );
}
