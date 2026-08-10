import { siteConfig } from "@/lib/site-config";
import { profile } from "@/lib/profile";
import { getPublishedBlogPosts, excerptFromContent } from "@/lib/blog";

export const revalidate = 3600;

export async function GET() {
  const posts = await getPublishedBlogPosts();

  const lines = [
    `# ${profile.name}`,
    "",
    `> ${siteConfig.tagline} ${siteConfig.seoDescription}`,
    "",
    "## Pages",
    "",
    `- [Home](${siteConfig.url}/): ${siteConfig.role}, based in ${profile.address}.`,
    `- [Projects](${siteConfig.url}/projects): Selected software projects.`,
    `- [Tech stack](${siteConfig.url}/tech-stack): Tools and technologies used.`,
    `- [Blog](${siteConfig.url}/blog): Writing by ${profile.name}.`,
    "",
  ];

  if (posts.length > 0) {
    lines.push("## Blog posts", "");
    for (const post of posts) {
      const excerpt = excerptFromContent(post.content, 140);
      lines.push(`- [${post.title}](${siteConfig.url}/blog/${post.slug})${excerpt ? `: ${excerpt}` : ""}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
