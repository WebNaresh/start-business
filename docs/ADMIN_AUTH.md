# Admin Authentication System

This document describes the authentication system implemented for the admin interface.

## Overview

The admin authentication system provides secure access to all admin routes (`/admin/*`) using a simple username/password authentication method with session persistence.

## Features

- ✅ **Simple Authentication**: Username/password login form
- ✅ **Environment-based Credentials**: Credentials stored as environment variables
- ✅ **Session Persistence**: Authentication state persists across browser sessions
- ✅ **Automatic Redirects**: Unauthenticated users redirected to login page
- ✅ **Modern UI**: Clean, responsive login interface
- ✅ **Loading States**: Proper loading indicators during authentication
- ✅ **Error Handling**: Clear error messages for invalid credentials
- ✅ **Logout Functionality**: Secure logout with session clearing

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
# Admin Authentication Credentials
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

**Important**: 
- Choose a strong password for production environments
- Never commit these credentials to version control
- The `.env.local` file is already included in `.gitignore`

### 2. Default Credentials (Development)

For development purposes, you can use these example credentials:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 3. Production Setup

For production environments:

1. Use strong, unique credentials
2. Consider using environment variable management tools
3. Regularly rotate passwords
4. Monitor access logs

## Usage

### Accessing Admin Interface

1. Navigate to `/admin` or any admin route
2. If not authenticated, you'll be redirected to `/admin/login`
3. Enter your credentials and click "Sign In"
4. Upon successful authentication, you'll be redirected to the admin dashboard

### Login Page Features

- **Username/Password Fields**: Standard authentication form
- **Show/Hide Password**: Toggle password visibility
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during authentication
- **Error Messages**: Clear feedback for authentication failures
- **Responsive Design**: Works on all device sizes

### Session Management

- **Automatic Persistence**: Sessions persist across browser restarts
- **24-Hour Expiry**: Sessions automatically expire after 24 hours
- **Cross-Tab Sync**: Logout in one tab affects all admin tabs
- **Secure Storage**: Uses localStorage with expiry timestamps

### Logout

- **User Menu**: Click the user avatar in the admin navigation
- **Confirmation**: Logout requires confirmation to prevent accidental logouts
- **Complete Cleanup**: Clears all session data and redirects to login

## Security Features

### Client-Side Security

- **Route Protection**: All admin routes protected by authentication guards
- **Session Validation**: Automatic session validation on page load
- **Secure Storage**: Session tokens stored with expiry timestamps
- **Input Validation**: Form validation prevents empty submissions

### Server-Side Security

- **Environment Variables**: Credentials never exposed in client code
- **Secure API**: Authentication endpoint validates against environment variables
- **Error Handling**: Generic error messages prevent information disclosure
- **Method Restrictions**: API endpoint only accepts POST requests

## File Structure

```
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with auth provider
│   │   ├── login/
│   │   │   └── page.tsx        # Login page component
│   │   └── ...                 # Other admin pages
│   └── api/
│       └── auth/
│           └── login/
│               └── route.ts    # Authentication API endpoint
├── components/
│   └── admin/
│       ├── admin-navigation.tsx # Navigation with logout
│       └── auth-guard.tsx      # Authentication guard component
├── contexts/
│   └── auth-context.tsx        # Authentication context provider
└── docs/
    └── ADMIN_AUTH.md          # This documentation
```

## API Endpoints

### POST /api/auth/login

Authenticates admin users with username/password credentials.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "base64_encoded_token",
  "message": "Authentication successful"
}
```

**Error Response (401):**
```json
{
  "error": "Invalid username or password"
}
```

## Troubleshooting

### Common Issues

1. **"Authentication service not configured"**
   - Ensure `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set in `.env.local`
   - Restart the development server after adding environment variables

2. **"Invalid username or password"**
   - Verify credentials match those in `.env.local`
   - Check for typos or extra spaces

3. **Redirected to login after successful authentication**
   - Check browser console for JavaScript errors
   - Verify localStorage is enabled in your browser
   - Clear browser cache and try again

4. **Session expires immediately**
   - Check system clock is correct
   - Verify localStorage is working properly

### Development Tips

- Use browser developer tools to inspect localStorage for session data
- Check the Network tab for authentication API calls
- Monitor console for authentication-related errors
- Test logout functionality across multiple tabs

## Future Enhancements

Potential improvements for the authentication system:

- **JWT Tokens**: Replace simple tokens with proper JWT implementation
- **Password Reset**: Add password reset functionality
- **Multi-Factor Authentication**: Add 2FA support
- **Session Management**: Admin interface for managing active sessions
- **Audit Logging**: Track authentication attempts and admin actions
- **Role-Based Access**: Different permission levels for different admin users

## Support

For issues related to the authentication system:

1. Check this documentation first
2. Verify environment variable configuration
3. Test with default development credentials
4. Check browser console for error messages
5. Contact your system administrator if issues persist
