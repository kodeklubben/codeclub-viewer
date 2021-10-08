export function getVideoIframeMarkup(url) {
  const providerAndVideoID = getVideoId(url);
  const videoId = Object.values(providerAndVideoID)[0];
  const provider = Object.keys(providerAndVideoID)[0];

  if (!videoId) {
    return '';
  }
  if (provider === 'youtube') {
    // eslint-disable-next-line max-len
    return `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (provider === 'vimeo') {
    // eslint-disable-next-line max-len
    return `<iframe src="https://player.vimeo.com/video/${videoId}" dnt="1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    console.error('markdown custom container error');
  }
}

function getVideoId(url) {
  const youtubeRegEx =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  const vimeoRegEx = /^(http:\/\/|https:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/;

  const isYoutube = url.url.match(youtubeRegEx);
  const isVimeo = url.url.match(vimeoRegEx);

  const match = isYoutube || isVimeo;

  if (isYoutube) {
    return match && match[2].length === 11 ? { youtube: match[2] } : null;
  } else if (isVimeo) {
    return match ? { vimeo: match[match.length - 1] } : null;
  } else {
    console.error('RegEx validate error');
  }
}
