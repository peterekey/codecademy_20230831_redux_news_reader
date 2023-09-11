// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (id, thunkAPI) => {
    const response = await fetch(`api/articles/${id}/comments`)
    const json = await response.json()
    return json
  }
)

// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      // Add initial state properties here.
      byArticleId: {},
      isLoadingComments: false,
      failedToLoadComments: false
    },
    // Add extraReducers here.
    extraReducers: {
      [loadCommentsForArticleId.pending]: (state, action) => {
        state.isLoading = true
        state.hasError = false
      },
      [loadCommentsForArticleId.fulfilled]: (state, action) => {
        // action.payload is a comment object with an articleId property you can use to add the comment to the correct article’s comment list in state.

          // {
          //   123: ['Great article!' , 'I disagree.']
          //   456: ['This is some great writing.'],
          //   ... 
          // }
        state.byArticleId = action.payload
        state.isLoading = false
        state.hasError = true
      },
      [loadCommentsForArticleId.rejected]: (state, action) => {

      }
    }
  });
  
  export const selectComments = (state) => state.comments.byArticleId;
  export const isLoadingComments = (state) => state.comments.isLoadingComments;
  export const createCommentIsPending = (state) => state.comments.createCommentIsPending;
  
  export default commentsSlice.reducer;
  