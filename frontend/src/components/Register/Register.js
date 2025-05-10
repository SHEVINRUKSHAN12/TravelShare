import React, { useState, useEffect, useCallback, useRef } from 'react'; // Add useRef
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/nav'; // Assuming Navbar is in this path
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  registerPage: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '80px',
    position: 'relative', // Ensure proper layering
    overflow: 'hidden', // Prevent scrollbars from video
  },
  fullPageBgVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -2, // Place the video behind everything
    filter: 'blur(8px)', // Add blur effect
  },
  fullPageVideoOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for readability
    zIndex: -1,
  },
  bgVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1, // Place the video behind other content
    filter: 'blur(8px)', // Add blur effect
  },
  videoOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for readability
    zIndex: -1,
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
    backgroundColor: '#f8f9fa', // Fallback color if video fails to load
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
  video: {
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
  googleButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  profilePhotoContainer: {
    marginBottom: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  photoUploadArea: {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    border: '2px dashed #27ae60',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  photoUploadAreaHover: {
    backgroundColor: '#e8f5e9',
    borderColor: '#219653',
  },
  profilePhotoPreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cameraIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  cameraIconVisible: {
    opacity: 1,
  },
  uploadText: {
    marginTop: '10px',
    color: '#27ae60',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  fileInput: {
    display: 'none',
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
    borderRadius: '5px', // Slightly more rounded corners
    boxSizing: 'border-box',
    color: '#1f1f1f',
    cursor: 'pointer',
    fontFamily: "'Roboto', arial, sans-serif",
    fontSize: '16px', // Increased from 14px
    height: '50px', // Increased from 40px
    letterSpacing: '0.25px',
    outline: 'none',
    overflow: 'hidden',
    padding: '0 20px', // Increased horizontal padding
    position: 'relative',
    textAlign: 'center',
    transition: 'background-color .218s, border-color .218s, box-shadow .218s',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: '100%',
    maxWidth: '420px', // Increased from 400px
    minWidth: 'min-content',
    marginBottom: '10px', // Add some margin at the bottom
  },
  buttonIcon: {
    height: '24px', // Increased from 20px
    marginRight: '16px', // Increased from 12px
    minWidth: '24px', // Increased from 20px
    width: '24px', // Increased from 20px
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
    fontSize: '16px', // Explicitly set font size
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePhoto: null, // Add profilePhoto to form data
  });
  const [photoPreview, setPhotoPreview] = useState(null); // State for photo preview
  const fileInputRef = useRef(null); // Reference to file input element
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const navigate = useNavigate();
  
  // Use useCallback to memoize the handler function
  const handleGoogleSignIn = useCallback((response) => {
    // Decoding the credential to get user information
    if (response.credential) {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      console.log('Google user info:', payload);
      
      toast.success(`Signed in with Google as ${payload.name}`);
      navigate('/'); // Redirect after successful sign-in
    }
  }, [navigate]);
  
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
  }, [handleGoogleSignIn]);
  
  // Define handleCustomGoogleSignIn function to be used in button's onClick
  const handleCustomGoogleSignIn = () => {
    // Trigger the Google Sign-In popup
    window.google?.accounts.id.prompt();
  };

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile photo selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type and size
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      
      if (!validImageTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, GIF, or WebP)");
        return;
      }
      
      if (file.size > maxSizeInBytes) {
        toast.error("File is too large. Please upload an image smaller than 5MB.");
        return;
      }
      
      setFormData({
        ...formData,
        profilePhoto: file,
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formDataForApi = new FormData();
    formDataForApi.append('name', formData.name);
    formDataForApi.append('username', formData.username);
    formDataForApi.append('email', formData.email);
    formDataForApi.append('password', formData.password);
    if (formData.profilePhoto) {
      formDataForApi.append('profilePhoto', formData.profilePhoto);
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        body: formDataForApi,
      });

      if (response.ok) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred during registration!");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div style={styles.registerPage}>
        {/* Full-Page Background Video */}
        <video autoPlay loop muted playsInline style={styles.fullPageBgVideo}>
          <source src="/assets/Travel2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.fullPageVideoOverlay}></div> {/* Overlay for better readability */}

        <div style={styles.contentContainer}>
          <div style={styles.imageSection}>
            {/* Left-Side Video */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={styles.video}
            >
              <source src="/assets/Travel2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={styles.imageOverlay}></div>
          </div>
          
          <div style={styles.formSection}>
            <h1 style={styles.title}>Join TravelShare</h1>
            
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
            
            {/* Divider between Google and form */}
            <div style={styles.dividerContainer}>
              <div style={styles.divider}></div>
              <span style={styles.dividerText}>or</span>
              <div style={styles.divider}></div>
            </div>
            
            {/* Improved Profile Photo Upload */}
            <div style={styles.profilePhotoContainer}>
              <div 
                style={{
                  ...styles.photoUploadArea,
                  ...(isPhotoHovered ? styles.photoUploadAreaHover : {})
                }}
                onClick={() => fileInputRef.current.click()}
                onMouseEnter={() => setIsPhotoHovered(true)}
                onMouseLeave={() => setIsPhotoHovered(false)}
              >
                {photoPreview ? (
                  <img 
                    src={photoPreview}
                    alt="Profile Preview" 
                    style={styles.profilePhotoPreview}
                  />
                ) : (
                  <span role="img" aria-label="User Icon" style={{ fontSize: '40px' }}>👤</span>
                )}
                <div 
                  style={{
                    ...styles.cameraIcon,
                    ...(isPhotoHovered ? styles.cameraIconVisible : {})
                  }}
                >
                  <span role="img" aria-label="Camera Icon">📷</span>
                </div>
              </div>
              <p style={styles.uploadText}>
                {photoPreview ? 'Click to change photo' : 'Click to upload profile photo'}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/jpeg, image/png, image/gif, image/webp"
                style={styles.fileInput}
              />
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
