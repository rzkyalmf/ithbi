"use client";

export const TruncatedText = ({ content = "", maxLength = 30 }) => {
  // Hapus tag HTML untuk menghitung panjang teks sebenarnya
  const plainText = content.replace(/<[^>]+>/g, "");
  const shouldTruncate = plainText.length > maxLength;

  return (
    <span>
      {shouldTruncate ? `${plainText.slice(0, maxLength)}...` : plainText}
    </span>
  );
};
