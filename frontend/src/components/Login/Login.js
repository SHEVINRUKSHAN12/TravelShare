import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/nav';

const styles = {
  loginPage: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '80px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  contentContainer: {
    display: 'flex',
    width: '90%',
    maxWidth: '1200px',
    margin: '2rem auto',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  imageSection: {
    flex: '1',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: '600px',
    overflow: 'hidden',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(39, 174, 96, 0.2)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  },
  formSection: {
    flex: '1',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '25px',
    color: '#333',
    fontSize: '2rem',
    fontWeight: 'bold',
    fontFamily: "'Dancing Script', cursive",
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px 15px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: '10px',
    fontSize: '0.9rem',
  },
  forgotPasswordLink: {
    color: '#27ae60',
    textDecoration: 'none',
    fontWeight: '600',
  },
  registerLinkContainer: {
    marginTop: '25px',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  registerLink: {
    color: '#27ae60',
    textDecoration: 'none',
    fontWeight: '600',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  divider: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    padding: '0 15px',
    color: '#757575',
    fontSize: '0.9rem',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  googleIcon: {
    marginRight: '10px',
    width: '20px',
    height: '20px',
  }
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = useCallback((response) => {
    if (response.credential) {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      console.log('Google user info:', payload);
      
      // In a real app, send this token to your backend
      alert(`Signed in with Google as ${payload.name}`);
      navigate('/');
    }
  }, [navigate]);
  
  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = initializeGoogleSignIn;
      script.id = 'google-client-script';
      document.body.appendChild(script);
    };
    
    const initializeGoogleSignIn = () => {
      if (!window.google) return;
      
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleGoogleSignIn,
        ux_mode: 'popup',
      });
    };
    
    if (!document.getElementById('google-client-script')) {
      loadGoogleScript();
    } else {
      initializeGoogleSignIn();
    }
    
    return () => {
      const script = document.getElementById('google-client-script');
      if (script) {
        script.remove();
      }
    };
  }, [handleGoogleSignIn]);
  
  const handleCustomGoogleSignIn = () => {
    window.google?.accounts.id.prompt();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login data submitted:', formData);
    console.log('Remember me:', rememberMe);
    
    // Add your login logic here
    // For now, simulate a successful login
    alert('Login successful (simulation)!');
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div style={styles.loginPage}>
        <div style={styles.contentContainer}>
          {/* Image Section */}
          <div style={styles.imageSection}>
            <img 
              src="/assets/login-bg.jpg" // You'll need to add this image
              alt="Travel inspiration"
              style={styles.image}
            />
            <div style={styles.imageOverlay}></div>
          </div>

          {/* Form Section */}
          <div style={styles.formSection}>
            <h1 style={styles.title}>Welcome Back</h1>
            
            {/* Google Sign-In Button */}
            <button 
              style={styles.googleButton}
              onClick={handleCustomGoogleSignIn}
              type="button"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google logo"
                style={styles.googleIcon}
              />
              Sign in with Google
            </button>
            
            {/* Divider */}
            <div style={styles.dividerContainer}>
              <div style={styles.divider}></div>
              <span style={styles.dividerText}>or</span>
              <div style={styles.divider}></div>
            </div>
            
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter your email"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter your password"
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor="rememberMe" style={{ fontSize: '0.9rem' }}>Remember me</label>
                </div>
                <div style={styles.forgotPassword}>
                  <Link to="/forgot-password" style={styles.forgotPasswordLink}>
                    Forgot Password?
                  </Link>
                </div>
              </div>
              
              <button type="submit" style={styles.button}>
                Sign In
              </button>
            </form>
            
            <div style={styles.registerLinkContainer}>
              Don't have an account? <Link to="/register" style={styles.registerLink}>Sign up here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
