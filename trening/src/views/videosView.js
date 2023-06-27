export const renderVideos = function (slicedVideoData) {
  const video = slicedVideoData
    .map((value) => {
      return `
      <div class="video-info-wrapper">
      <a href="https://www.youtube.com/watch?v=${value.videoId}" target="_blank " rel="noreferrer">
      <img src="${value.thumbnails.at(0).url}" alt="exercise video link" class="exercise-details-article__video">
      </a>
      <p class="video-title">${value.title}</p>
      <p class="video-channel-name">${value.channelName}</p>
    </div>`;
    })
    .join('');
  return video;
};
