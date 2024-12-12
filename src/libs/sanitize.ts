import DOMPurify from "isomorphic-dompurify";

export const sanitizeHTML = (content: string) => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "br",
      "s",
    ],
    ALLOWED_ATTR: ["href", "style"],
  });
};
