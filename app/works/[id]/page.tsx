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
        images: [{ url: work.thumbnail.src }],
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
