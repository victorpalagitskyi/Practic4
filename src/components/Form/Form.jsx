import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiMailSend } from 'react-icons/bi';
import styles from './Form.module.css';
import { useAddCommentsMutation } from '../../redux/commentApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommentsData, setCommentsData } from '../../redux/commentsDataSlice';

export const Form = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const comments = useSelector(selectCommentsData)
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [addContact, { isLoading } ] = useAddCommentsMutation()
  useEffect(() => { 
    if (data.length > 0) { 
      dispatch(setCommentsData([...comments, data[0]]))
    }
  }, [data])
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    switch (name) { 
      case 'name':
        setAuthor(value)
        break;
      case 'text':
        setContent(value)
        break
    }
  };
  
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
  const resalut = await addContact({
        author,
        content,
  })
        setData([resalut.data])  
        
    }
    catch (error) { console.log(error)}
      
    setAuthor('');
    setContent('');
  }; 

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input
            type='text'
            name='name'
            className={styles.input}
            value={author}
            onChange={onHandleChange}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea
            className={styles.input}
            name='text'
            rows='5'
            value={content}
            onChange={onHandleChange}
          ></textarea>
        </label>

        <button className={styles.formBtn}>
          <BiMailSend className={styles.icon} />
          Send
        </button>
      </form>
    </div>
  );
};
