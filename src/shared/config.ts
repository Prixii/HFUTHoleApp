export const Config = {
  request: {
    baseURL: 'http://192.168.47.34:8000/',
    imgBaseURL: 'http://121.5.130.107:8080/',
    timeout: 5000,
  },
}

export const Limit = {
  holeBodyMaxLength: 4096,
  holeVoteMaxLength: 5,
  holeVoteOptionLength: 10,
  holeTagsMaxLength: 5,
  holeCommentBodyMaxLength: 1000,
  holeCommentBodyMinLength: 1,
  commentMaxImgLength: 2,
  reportReasonMaxLength: 500,
  reportReasonMinLength: 10,
  hole: {
    maxInfoCommentBodyLength: 50,
  },
}

export function setupGlobalConfig() {}
