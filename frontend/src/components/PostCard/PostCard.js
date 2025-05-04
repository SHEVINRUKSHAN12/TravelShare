import React from 'react';
import { Link } from 'react-router-dom';

// Inline Styles
const styles = {
  card: {
    width: '300px',
    margin: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
  },
  title: {
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '12px',
    lineHeight: '1.4',
  },
  author: {
    color: '#888',
    fontSize: '12px',
    fontStyle: 'italic',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

function PostCard({ post }) {
  const [isHovered, setIsHovered] = React.useState(false);

  // For now, we'll just link to a placeholder detail page
  // Later you can implement actual post detail pages
  const postDetailUrl = `/diaries/${post.id}`;

  return (
    <Link to={postDetailUrl} style={styles.link}>
      <div 
        style={{
          ...styles.card,
          ...(isHovered ? styles.cardHover : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={post.imageUrl} alt={post.title} style={styles.image} />
        <div style={styles.content}>
          <h3 style={styles.title}>{post.title}</h3>
          <p style={styles.description}>
            {post.description.length > 100
              ? `${post.description.substring(0, 100)}...`
              : post.description}
          </p>
          <p style={styles.author}>By {post.author}</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
