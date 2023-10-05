import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCommentsForArticleId,
  selectComments,
  isLoadingComments,
} from '../comments/commentsSlice';
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

const Comments = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);
  // Declare additional selected data here.
  const comments = useSelector((state) => state.comments);
  const commentsAreLoading = comments.isLoadingComments;

  // Dispatch loadCommentsForArticleId with useEffect here.
  useEffect(() => {
    if (typeof article !== "undefined") {
      dispatch(loadCommentsForArticleId(article.id))
    }
  }, [article, dispatch])
  
  let commentsForArticleId
  
  if (typeof article == "undefined") {
    commentsForArticleId = []
  } else {
    commentsForArticleId = comments.byArticleId.comments
  }

  if (commentsAreLoading) return <div>Loading Comments</div>;
  if (!article) return null;

  return (
    <div className='comments-container'>
      <h3 className='comments-title'>Comments</h3>
      <CommentList comments={commentsForArticleId} />
      <CommentForm articleId={article.id} />
    </div>
  );
};

export default Comments;
