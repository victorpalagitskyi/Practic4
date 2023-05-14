import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/Comment';
import { Grid } from '../Grid/Grid';
// import { comments } from '../../helpers/comments';
import { useGetCommentsQuery } from '../../redux/commentApi';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filterSlice';
import fi from 'date-fns/esm/locale/fi/index.js';

export const Comments = () => {
  const { data: comments } = useGetCommentsQuery()
  const filter = useSelector(selectFilter)
  
  const FilterdComments = () => comments.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
  
  console.log(filter)
  return (
    <Grid>
      {comments &&
        FilterdComments().map((comment) => <Comment key={comment.id} {...comment} />)}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
