import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkDetail } from "@/components/works/work-detail";
import { getWorkById } from "@/lib/works";

export function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  return params.then(({ id }) => {
    const work = getWorkById(id);
    if (!work) return {};
    return {
      title: work.title,
      description: work.summary,
      alternates: { canonical: `/works/${work.id}` },
      openGraph: {
        title: work.title,
        description: work.summary,
        url: `/works/${work.id}`,
        // JPEG twin: LinkedIn and several other crawlers ignore WebP previews.
        images: [{ url: work.thumbnail.src.replace(/\.webp$/, '.jpg') }],
      },
    };
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = getWorkById(id);
  if (!work) notFound();

  return <WorkDetail work={work} />;
}
