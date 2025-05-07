import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/nav'; // Assuming Navbar is in this path

const styles = {
  registerPage: {
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
    overflow: 'hidden', // Ensures the image doesn't overflow
  },
  imageSection: {
    flex: '1',
    backgroundColor: '#f8f9fa', // Fallback color if image fails to load
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
    backgroundColor: 'rgba(39, 174, 96, 0.2)', // Slight green tint
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
  registerContainer: {
    padding: '30px 40px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '25px',
    color: '#333',
    fontSize: '2rem',
    fontWeight: 'bold',
    fontFamily: "'Dancing Script', cursive", // Consistent with logo
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
    backgroundColor: '#27ae60', // Green from navbar
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  loginLinkContainer: {
    marginTop: '25px',
    fontSize: '0.9rem',
  },
  loginLink: {
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  
  // Use useCallback to memoize the handler function
  const handleGoogleSignIn = useCallback((response) => {
    // Decoding the credential to get user information
    if (response.credential) {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      console.log('Google user info:', payload);
      
      // In a real app, you would send this token to your backend for verification
      // and create/authenticate the user
      
      alert(`Signed in with Google as ${payload.name}`);
      navigate('/'); // Redirect after successful sign-in
    }
  }, [navigate]); // navigate is the only dependency
  
  // Initialize Google Sign-In
  useEffect(() => {
    // Load the Google Identity Services script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = initializeGoogleSignIn;
      script.async = true;
      script.id = 'google-client-script';
      document.body.appendChild(script);
    };
    
    const initializeGoogleSignIn = () => {
      if (!window.google) return;
      
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual Google Client ID
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
      // Clean up script if component unmounts
      const script = document.getElementById('google-client-script');
      if (script) {
        script.remove();
      }
    };
  }, [handleGoogleSignIn]); // Now handleGoogleSignIn is properly included in the dependencies
  
  const handleCustomGoogleSignIn = () => {
    // Trigger the Google Sign-In popup
    window.google?.accounts.id.prompt();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!"); // Replace with a better notification
      return;
    }
    console.log('Form data submitted:', formData);
    
    // --- Placeholder for your registration logic ---
    // Example:
    // try {
    //   const response = await fetch('/api/register', { // Your backend API endpoint
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     // const data = await response.json();
    //     alert('Registration successful!'); // Replace with toast notification
    //     navigate('/login'); // Navigate to login page
    //   } else {
    //     // const errorData = await response.json();
    //     // alert(`Registration failed: ${errorData.message || response.statusText}`);
    //     alert('Registration failed. Please try again.'); // Replace with toast
    //   }
    // } catch (error) {
    //   console.error('Registration error:', error);
    //   alert('An error occurred during registration.'); // Replace with toast
    // }
    // --- End of placeholder ---

    // For now, let's simulate success and navigate to home or login
    // To use this, uncomment the placeholder above and implement your API call
    alert('Registration successful (simulation)!'); // Simulate success
    navigate('/'); // Or navigate('/login') if you have a login page
  };

  return (
    <>
      <Navbar />
      <div style={styles.registerPage}>
        <div style={styles.contentContainer}>
          {/* Image Section */}
          <div style={styles.imageSection}>
            <img 
              src="/assets/register-bg.jpg" // You'll add your image to public/assets/
              alt="Travel inspiration"
              style={styles.image}
            />
            <div style={styles.imageOverlay}></div>
          </div>

          {/* Form Section */}
          <div style={styles.formSection}>
            <h1 style={styles.title}>Join TravelShare</h1>
            
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
              Continue with Google
            </button>
            
            {/* Divider between Google and form */}
            <div style={styles.dividerContainer}>
              <div style={styles.divider}></div>
              <span style={styles.dividerText}>or</span>
              <div style={styles.divider}></div>
            </div>
            
            {/* Regular registration form */}
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter your full name"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="username" style={styles.label}>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Choose a username"
                />
              </div>
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
                  placeholder="Create a password"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Confirm your password"
                />
              </div>
              <button type="submit" style={styles.button}>
                Create Account
              </button>
            </form>
            <div style={styles.loginLinkContainer}>
              Already have an account? <Link to="/login" style={styles.loginLink}>Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
