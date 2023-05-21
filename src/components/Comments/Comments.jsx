import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/Comment';
import { Grid } from '../Grid/Grid';
// import { comments } from '../../helpers/comments';
import { useDeleteCommentsMutation, useGetCommentsQuery } from '../../redux/commentApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filterSlice';
import fi from 'date-fns/esm/locale/fi/index.js';
import { selectCommentsData, setCommentsData } from '../../redux/commentsDataSlice';
import { comment } from 'postcss';

export const Comments = () => {
  const dispatch = useDispatch()
  const { data } = useGetCommentsQuery()
  const filter = useSelector(selectFilter)
  const [deleteComment, { isLoading } ] = useDeleteCommentsMutation()
  // const comments = useSelector(selectCommentsData)
  const [comments, setComments] = useState([])
  const FilterdComments = () => comments.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
  useEffect(() => { 
    if (Array.isArray(data)) { 
      //  dispatch(setCommentsData(data))
      setComments(data)
    } 
  }, [data])
  const handleUpdateLike = (id, newComment) => {
    const updateComments = comments.map(comment => {
      if (comment.id === id)
      {
        return { ...comment, ...newComment }
      } else return comment
    })
    setComments(updateComments)
  }
  const handleDeleteComments = (id) => {
    deleteComment(id)
    const newComments = comments.filter((comment) => comment.id !== id)
   setComments(newComments)
  }
  
  return (
    <Grid>
      {comments &&
        FilterdComments().map((comment) => <Comment key={comment.id} {...comment} onUpdateLike={handleUpdateLike} onDelete={handleDeleteComments} />)}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
