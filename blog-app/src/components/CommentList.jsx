import { useState } from 'react'

const CommentForm = ({ onComment }) => {
  const [comment, setComment] = useState('')
  const handleComment = async (e) => {
    e.preventDefault()
    onComment(comment)
    setComment('')
  }
  return (
    <form className='input-group' onSubmit={handleComment} >
      <input
      className='form-control'
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Insert your comment here...'
      />
      <button className='btn btn-success' type='submit'>add comment</button>
    </form>
  )
}

const CommentList = ({ comments, onComment }) => {
  return (
    <>
      <div>
        <h4>comments</h4>
        <CommentForm onComment={onComment} />
        <hr className="dropdown-divider my-3" />
        {/* <div className="my-3 border-bottom"></div> */}
        <ul className='list-group'>
          {comments.length === 0
            ? 'no comments yet'
            : comments.map((c) => <li className='list-group-item' key={c.id}>{c.content}</li>)}
        </ul>
      </div>
    </>
  )
}

export default CommentList
