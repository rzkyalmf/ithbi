import DOMPurify from "isomorphic-dompurify";

interface RenderHTMLProps {
  content: string;
  className?: string;
}

export function RenderHTML({ content, className = "" }: RenderHTMLProps) {
  const processedContent = DOMPurify.sanitize(content, {
    ADD_ATTR: ["target", "rel", "class", "style"], // tambah class dan style ke allowed attributes
    ADD_TAGS: ["s"], // Tambahkan tag s ke allowlist
  })
    .replace(/<li><p>(.*?)<\/p><\/li>/g, "<li>$1</li>")
    .replace(/<ol>/g, '<ol class="list-decimal pl-5 space-y-2 mb-4">')
    .replace(/<ul>/g, '<ul class="list-disc pl-5 space-y-2 mb-4">')
    .replace(
      /<a\s+/g,
      '<a class="text-blue-500 underline hover:text-blue-700" '
    )
    .replace(/<h([1-6])>/g, '<h$1 class="mt-6 mb-4 font-bold">')
    .replace(/<\/p><p>/g, "</p><br /><p>")
    // Perbaiki regex untuk memastikan konten dalam tag s terpelihara
    .replace(/<s>([\s\S]*?)<\/s>/g, '<s class="line-through">$1</s>');

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: processedContent,
      }}
      className={`prose max-w-none prose-ol:mt-0 prose-ul:mt-0 prose-li:my-0 [&_a]:text-blue-500 [&_a]:underline hover:[&_a]:text-blue-700 prose-headings:mt-6 prose-headings:mb-4 prose-ul:list-disc [&_s]:line-through ${className}`}
    />
  );
}
