// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (id) => {
    const response = await fetch(`/api/articles/${id}/comments`)
    const json = await response.json()
    return json
  }
)

// Create postCommentForArticleId here.
export const postCommentForArticleId = createAsyncThunk(
  'comments/postCommentForArticleId',
  async ({ articleId, comment}) => {
    const requestBody = JSON.stringify(comment)
    const response = await fetch(`/api/articles/${articleId}/comments`, {
      method: "POST",
      body: requestBody
    })
    const json = response.json()
    return json
  }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      // Add initial state properties here.
      byArticleId: {},
      isLoadingComments: false,
      failedToLoadComments: false,
      createCommentIsPending: false,
      failedToCreateComment: false
    },
    // Add extraReducers here.
    extraReducers: {
      [loadCommentsForArticleId.pending]: (state, action) => {
        state.isLoadingComments = true
        state.failedToLoadComments = false
      },
      [loadCommentsForArticleId.fulfilled]: (state, action) => {
        // action.payload is a comment object with an articleId property you can use to add the comment to the correct article’s comment list in state.

          // {
          //   123: ['Great article!' , 'I disagree.']
          //   456: ['This is some great writing.'],
          //   ... 
          // }
        state.byArticleId = action.payload

        state.isLoadingComments = false
        state.failedToLoadComments = true
      },
      [loadCommentsForArticleId.rejected]: (state, action) => {
        state.isLoadingComments = false
        state.failedToLoadComments = true
      }
    }
  });
  
  export const selectComments = (state) => state.comments.byArticleId;
  export const isLoadingComments = (state) => state.comments.isLoadingComments;
  export const createCommentIsPending = (state) => state.comments.createCommentIsPending;
  
  export default commentsSlice.reducer;
  