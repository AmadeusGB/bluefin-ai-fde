import { buildKnowledgeGraph } from "@/lib/knowledge-graph";

export async function GET() {
  return Response.json(buildKnowledgeGraph(), {
    headers: {
      "content-type": "application/ld+json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
