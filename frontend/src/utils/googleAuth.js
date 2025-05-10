/**
 * Google Authentication Utility Functions
 * This file contains utility functions for handling Google authentication
 */

// Your Google Client ID - replace with your actual client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "281157823347-achti9dp3chbhk34qbrk87fqskjdacsc.apps.googleusercontent.com";

/**
 * Load the Google Identity Services script
 * @returns {Promise} Promise that resolves when the script is loaded
 */
export const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.getElementById('google-client-script')) {
      if (window.google) {
        resolve();
      } else {
        // Script exists but Google API not initialized yet
        const wait = setInterval(() => {
          if (window.google) {
            clearInterval(wait);
            resolve();
          }
        }, 100);
        
        // Set a timeout to avoid waiting indefinitely
        setTimeout(() => {
          clearInterval(wait);
          reject(new Error('Google API not initialized after timeout'));
        }, 5000);
      }
      return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.id = 'google-client-script';
    
    // Set up listeners
    script.onload = () => {
      // Wait a moment for the Google API to initialize
      setTimeout(() => {
        if (window.google) {
          resolve();
        } else {
          reject(new Error('Google API not initialized after script load'));
        }
      }, 300);
    };
    script.onerror = (error) => reject(new Error(`Google Sign-In script loading failed: ${error}`));
    
    // Append to document
    document.body.appendChild(script);
  });
};

/**
 * Initialize Google Sign-In
 * @param {function} callback Function to be called on successful authentication
 */
export const initializeGoogleSignIn = (callback) => {
  if (!window.google) {
    console.error('Google API not loaded yet - will retry in a moment');
    // Retry after a short delay instead of failing
    setTimeout(() => {
      if (window.google) {
        initializeGoogleConfig(callback);
      } else {
        console.error('Google API still not available after retry');
      }
    }, 500);
    return;
  }
  
  initializeGoogleConfig(callback);
};

/**
 * Helper function to initialize Google configuration
 */
function initializeGoogleConfig(callback) {
  try {
    // Using the updated FedCM-compatible configuration
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: callback,
      use_fedcm_for_prompt: true, // Explicitly enable FedCM
      cancel_on_tap_outside: true,
      context: 'signin',
      ux_mode: 'popup',
      itp_support: true
    });
    
    // Also configure the One Tap UI
    window.google.accounts.id.configure({
      nonce: generateNonce(),
      // Use trusted domains for production
      // allowed_parent_origin: ["http://localhost:3000"]
    });
    
    console.log('Google Sign-In initialized successfully');
  } catch (error) {
    console.error('Error initializing Google Sign-In:', error);
  }
}

/**
 * Generate a nonce for added security with OAuth requests
 * @returns {string} A random nonce value
 */
function generateNonce() {
  const randomArray = new Uint8Array(16);
  window.crypto.getRandomValues(randomArray);
  return Array.from(randomArray).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Prompt the user to sign in with Google
 */
export const promptGoogleSignIn = () => {
  if (!window.google) {
    console.error('Google API not loaded yet');
    return;
  }
  
  try {
    window.google.accounts.id.prompt((notification) => {
      handlePromptNotification(notification);
    });
  } catch (error) {
    console.error('Error prompting Google Sign-In:', error);
  }
};

/**
 * Handle prompt notifications for better error reporting
 */
function handlePromptNotification(notification) {
  // Handle different notification scenarios
  if (notification.isNotDisplayed()) {
    console.warn('Google Sign-In prompt was not displayed: ', notification.getNotDisplayedReason());
    
    // Provide more specific info based on reason
    const reason = notification.getNotDisplayedReason();
    if (reason === 'browser_not_supported') {
      console.warn('Browser does not support FedCM API. Consider using a different sign-in approach.');
    } else if (reason === 'invalid_client') {
      console.error('Client ID is invalid or not properly configured in Google Cloud Console.');
    } else if (reason === 'missing_client_id') {
      console.error('Client ID is missing or not provided correctly.');
    } else if (reason === 'third_party_cookies_blocked') {
      console.warn('Third-party cookies are blocked. FedCM may not work properly.');
    }
    
  } else if (notification.isSkippedMoment()) {
    console.warn('Google Sign-In prompt was skipped: ', notification.getSkippedReason());
    
  } else if (notification.isDismissedMoment()) {
    console.info('Google Sign-In prompt was dismissed: ', notification.getDismissedReason());
  }
}

/**
 * Process Google credential response and extract user information
 * @param {Object} response The response from Google Sign-In
 * @returns {Object} User information extracted from the credential
 */
export const processGoogleCredential = (response) => {
  if (!response || !response.credential) {
    throw new Error('Invalid Google credential response');
  }
  
  try {
    // The JWT token has 3 parts separated by dots
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    // Extract relevant user information
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      firstName: payload.given_name,
      lastName: payload.family_name,
      picture: payload.picture,
      isEmailVerified: payload.email_verified
    };
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    throw new Error('Failed to decode Google authentication token');
  }
};

/**
 * Handle the complete Google Sign-In process
 * @param {Object} response Google Sign-In response
 * @param {Function} onSuccess Function to call on success with user data
 * @param {Function} onError Function to call on error with error message
 */
export const handleGoogleSignInResponse = (response, onSuccess, onError) => {
  try {
    if (!response || !response.credential) {
      onError('Google authentication failed: No credentials received');
      return;
    }
    
    const userData = processGoogleCredential(response);
    onSuccess(userData);
  } catch (error) {
    console.error('Error processing Google credentials:', error);
    onError('Failed to process Google sign-in. Please try again.');
  }
};

/**
 * Render a Google Sign In button in a container element
 * @param {string} elementId ID of the container element
 * @param {string} type Button type ('standard', 'icon')
 * @param {string} theme Button theme ('outline', 'filled_blue', 'filled_black')
 */
export const renderGoogleButton = (elementId, type = 'standard', theme = 'outline') => {
  if (!window.google) {
    console.error('Google API not loaded yet');
    return;
  }

  try {
    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      { 
        type, 
        theme, 
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left'
      }
    );
  } catch (error) {
    console.error('Error rendering Google button:', error);
  }
};
