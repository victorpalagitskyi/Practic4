import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.css';
import { useUpdateCommentsLikeMutation } from '../../redux/commentApi';

export const Button = ({ children, counter, role = 'thumbsUp', id, onUpdateLike }) => {
 const [updateContactLike, { isLoading } ] = useUpdateCommentsLikeMutation()

  const variants = {
    [styles.thumbsUp]: role === 'thumbsUp',
    [styles.thumbsDown]: role === 'thumbsDown',
  };

  const onBtnHandleClick = async (e) => {
    e.preventDefault();
    try { 
      let newCount 
      if (role === 'thumbsUp') { newCount = counter + 1 }
      else { newCount = counter - 1 } 
      onUpdateLike(id, { [role]: newCount })
        await updateContactLike({ id, [role]: newCount })
    } catch (error) { console.log(error)}
    console.log('click');
  };

  return (
    <button
      className={classNames(styles.button, variants)}
      type='button'
      counter={counter}
      onClick={onBtnHandleClick}
      id={id}
    >
      {children}

      <span className={styles.counter}>
        <span></span>
        {counter}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};
