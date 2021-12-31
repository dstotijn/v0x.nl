import { remark } from "remark";
import smartypants from "@ngsctt/remark-smartypants";
import html from "remark-html";

export default async function markdownToHtml(
  markdown: string
): Promise<string> {
  const result = await remark().use(smartypants).use(html, {
    sanitize: false,
  }).process(markdown);
  return result.toString();
}
