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
  googleButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '10px',
  },
};

// Material button styles for Google Sign-In
const gsiButtonStyles = {
  button: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitAppearance: 'none',
    backgroundColor: 'white',
    backgroundImage: 'none',
    border: '1px solid #747775',
    borderRadius: '5px',
    boxSizing: 'border-box',
    color: '#1f1f1f',
    cursor: 'pointer',
    fontFamily: "'Roboto', arial, sans-serif",
    fontSize: '16px',
    height: '50px',
    letterSpacing: '0.25px',
    outline: 'none',
    overflow: 'hidden',
    padding: '0 20px',
    position: 'relative',
    textAlign: 'center',
    transition: 'background-color .218s, border-color .218s, box-shadow .218s',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: '100%',
    maxWidth: '420px',
    minWidth: 'min-content',
    marginBottom: '10px',
  },
  buttonIcon: {
    height: '24px',
    marginRight: '16px',
    minWidth: '24px',
    width: '24px',
  },
  buttonContentWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
  },
  buttonContents: {
    flexGrow: 1,
    fontFamily: "'Roboto', arial, sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'top',
  },
  buttonState: {
    transition: 'opacity .218s',
    bottom: 0,
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  }
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Implement Google Sign-In callback - this uses useCallback
  const handleGoogleSignIn = useCallback((response) => {
    if (response.credential) {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      console.log('Google user info:', payload);
      
      // In a real app, send this token to your backend
      alert(`Signed in with Google as ${payload.name}`);
      navigate('/'); // Now navigate is being used
    }
  }, [navigate]);

  // Implement Google sign-in script loading - this uses useEffect
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
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
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

  // Add mouse event handlers for button styling
  const handleButtonMouseOver = (e) => {
    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)';
    const stateEl = e.currentTarget.querySelector('.gsi-button-state');
    if (stateEl) {
      stateEl.style.backgroundColor = '#303030';
      stateEl.style.opacity = '8%';
    }
  };

  const handleButtonMouseOut = (e) => {
    e.currentTarget.style.boxShadow = '';
    const stateEl = e.currentTarget.querySelector('.gsi-button-state');
    if (stateEl) {
      stateEl.style.opacity = '0';
    }
  };

  // Trigger Google sign-in popup
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
    navigate('/'); // Navigate is used here too
  };

  return (
    <>
      <Navbar />
      <div style={styles.loginPage}>
        <div style={styles.contentContainer}>
          <div style={styles.imageSection}>
            <img 
              src="/assets/login-bg.jpg"
              alt="Travel inspiration"
              style={styles.image}
            />
            <div style={styles.imageOverlay}></div>
          </div>

          <div style={styles.formSection}>
            <h1 style={styles.title}>Welcome Back</h1>
            
            {/* Centered Google Sign-In Button with Material Design */}
            <div style={styles.googleButtonContainer}>
              <button 
                style={gsiButtonStyles.button}
                onClick={handleCustomGoogleSignIn}
                onMouseOver={handleButtonMouseOver}
                onMouseOut={handleButtonMouseOut}
                type="button"
              >
                <div className="gsi-button-state" style={gsiButtonStyles.buttonState}></div>
                <div style={gsiButtonStyles.buttonContentWrapper}>
                  <div style={gsiButtonStyles.buttonIcon}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span style={gsiButtonStyles.buttonContents}>Sign in with Google</span>
                </div>
              </button>
            </div>
            
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
