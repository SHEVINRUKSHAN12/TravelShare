import React, { useState } from 'react';
import { FaTrash, FaPen, FaRegSmile } from 'react-icons/fa';

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    color: '#666',
  },
  commentsList: {
    marginBottom: '20px',
  },
  commentItem: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    position: 'relative',
  },
  commentUser: {
    fontWeight: 'bold',
    marginBottom: '4px',
    fontSize: '14px',
  },
  commentText: {
    fontSize: '14px',
    marginBottom: '6px',
  },
  commentTime: {
    fontSize: '12px',
    color: '#888',
  },
  commentActions: {
    position: 'absolute',
    right: '12px',
    top: '12px',
    display: 'flex',
    gap: '8px',
  },
  actionIcon: {
    cursor: 'pointer',
    color: '#777',
    fontSize: '14px',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #ddd',
    paddingTop: '15px',
  },
  commentInput: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    resize: 'none',
    marginBottom: '10px',
    fontSize: '14px',
  },
  commentControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emojiButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#777',
    cursor: 'pointer',
    fontSize: '16px',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  emptyComments: {
    textAlign: 'center',
    color: '#888',
    padding: '20px',
  }
};

const CommentModal = ({ post, onClose, onAddComment, onDeleteComment }) => {
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  const startEditing = (comment, index) => {
    setEditingCommentId(index);
    setEditText(comment);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditText('');
  };

  const submitEdit = (index) => {
    if (editText.trim()) {
      // In a real app, this would call an API to update the comment
      // For now we'll just simulate it with console.log
      console.log(`Editing comment ${index} to: ${editText}`);
      cancelEditing();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>Comments on "{post.title}"</h3>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div style={styles.commentsList}>
          {(!post.comments || post.comments.length === 0) ? (
            <div style={styles.emptyComments}>No comments yet. Be the first to comment!</div>
          ) : (
            post.comments.map((comment, index) => (
              <div key={index} style={styles.commentItem}>
                {editingCommentId === index ? (
                  <>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={styles.commentInput}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button onClick={cancelEditing} style={{ ...styles.submitButton, backgroundColor: '#888' }}>
                        Cancel
                      </button>
                      <button onClick={() => submitEdit(index)} style={styles.submitButton}>
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={styles.commentUser}>User</div>
                    <div style={styles.commentText}>{comment}</div>
                    <div style={styles.commentTime}>Just now</div>
                    <div style={styles.commentActions}>
                      <FaPen 
                        style={styles.actionIcon} 
                        onClick={() => startEditing(comment, index)}
                        title="Edit comment"
                      />
                      <FaTrash 
                        style={styles.actionIcon} 
                        onClick={() => onDeleteComment(post.id, index)}
                        title="Delete comment"
                      />
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <form style={styles.commentForm} onSubmit={handleCommentSubmit}>
          <textarea
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
          />
          <div style={styles.commentControls}>
            <button type="button" style={styles.emojiButton} title="Insert emoji">
              <FaRegSmile />
            </button>
            <button type="submit" style={styles.submitButton} disabled={!commentText.trim()}>
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
