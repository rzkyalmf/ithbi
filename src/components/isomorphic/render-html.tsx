import DOMPurify from "isomorphic-dompurify";

interface RenderHTMLProps {
  content: string;
  className?: string;
}

export function RenderHTML({ content, className = "" }: RenderHTMLProps) {
  const processedContent = DOMPurify.sanitize(content, {
    ADD_ATTR: ["target", "rel"],
  })
    .replace(/<li><p>(.*?)<\/p><\/li>/g, "<li>$1</li>")
    .replace(/<ol>/g, '<ol class="list-decimal pl-5 space-y-2 mb-4">')
    .replace(
      /<a\s+/g,
      '<a class="text-blue-500 underline hover:text-blue-700" '
    )
    // Tambahkan class untuk header agar sejajar dengan konten
    .replace(/<h([1-6])>/g, '<h$1 class="mt-6 mb-4 font-bold">');

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: processedContent,
      }}
      className={`prose max-w-none prose-ol:mt-0 prose-li:my-0 [&_a]:text-blue-500 [&_a]:underline hover:[&_a]:text-blue-700 prose-headings:mt-6 prose-headings:mb-4 ${className}`}
    />
  );
}
