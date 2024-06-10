export const calculateReadingTime = (content) => {
  let totalWords = 0;

  // Loop through the content
  const countWords = (node) => {
    switch (node.nodeType) {
      case "paragraph":
      case "heading-1":
      case "heading-2":
      case "heading-3":
      case "heading-4":
      case "heading-5":
      case "heading-6":
      case "blockquote":
        // Extract text from paragraph, headings, blockquotes
        const nodeText = node.content
          .map((child) => {
            if (child.nodeType === "text") {
              return child.value;
            } else if (child.content) {
              return countWords(child);
            }
            return "";
          })
          .join("");

        // Split the text into words and count them
        const words = nodeText.trim().split(/\s+/);
        totalWords += words.length;
        break;
      case "list-item":
        // For list items, count words in nested paragraphs
        node.content.forEach((childNode) => countWords(childNode));
        break;
      // You can add cases for other node types like code, embedded-asset-block, etc.
      case "embedded-asset-block":
      case "code":
        // These might not contribute to reading time, adjust logic accordingly
        break;
      default:
        break;
    }
  };

  content.forEach((node) => countWords(node));
  const wordsPerMinute = 250;
  const readingTime = Math.ceil(totalWords / wordsPerMinute);

  return readingTime;
};
