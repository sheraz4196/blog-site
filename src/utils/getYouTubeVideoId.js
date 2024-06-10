export default function getYoutubeVideoId(url) {
  // Regular expressions for different link formats
  const regexLive = /\/live\/(.+?)(?:\?|$)/;
  const regexWatch = /\?v=([^&]+)/;
  const regexShare = /(?:\/|^)youtu(?:\.be\/|)([^&#?]+)/;
  const regexEmbed = /(?:\/embed\/|.*\/)([^&#?]+)/;

  // Try matching the URL against each regex
  let match;
  if ((match = url.match(regexLive))) {
    return match[1]; // ID for live stream
  } else if ((match = url.match(regexWatch))) {
    return match[1]; // ID from watch link
  } else if ((match = url.match(regexShare))) {
    return match[1]; // ID from share link
  } else if ((match = url.match(regexEmbed))) {
    return match[1]; // ID from embed link
  } else {
    // Invalid URL format
    return null;
  }
}
