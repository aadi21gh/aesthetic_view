export const truncate = (text, length = 100) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  
  export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  