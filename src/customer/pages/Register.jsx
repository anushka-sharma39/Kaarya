import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import '../../pages/Login/RoleSelection.css';
import '../../pages/Login/Register.css';

export default function CustomerRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.classList.add('role-login');
    return () => document.body.classList.remove('role-login');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name cannot be empty';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const mobileRegex = /^\d{10,}$/;
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Phone Number is required';
    } else if (!mobileRegex.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address cannot be empty';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      // Simulate frontend processing
      setTimeout(() => {
        setIsLoading(false);
        // Save to localStorage without password
        const draftProfile = {
          userType: 'customer',
          name: formData.fullName,
          phone: formData.mobileNumber,
          address: formData.address,
          email: formData.email
        };
        localStorage.setItem('draftCustomerProfile', JSON.stringify(draftProfile));
        navigate('/customer/verify');
      }, 1000);
    }
  };

  return (
    <div className="rs-page">
      <div className="rs-bg" aria-hidden="true">
        <span className="rs-orb rs-orb-1" />
        <span className="rs-orb rs-orb-2" />
        <span className="rs-orb rs-orb-3" />
        <span className="rs-jaali" />
      </div>

      <main className="rs-shell" style={{ alignItems: 'center' }}>
        <header className="rs-header">
          <div className="rs-brandmark">
            <Sparkles size={14} />
            <span>kaarya</span>
          </div>
          <h1 className="rs-wordmark">Customer Registration</h1>
          <p className="rs-tagline">Create your customer account to get started.</p>
        </header>

        <form className="rs-form" onSubmit={handleSubmit} noValidate>
          
          <div className="rs-form-group">
            <label className="rs-label" htmlFor="fullName">Full Name</label>
            <div className="rs-input-wrapper">
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`rs-input ${errors.fullName ? 'has-error' : ''}`}
                placeholder="Rahul Sharma"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && <span className="rs-error-msg">{errors.fullName}</span>}
          </div>

          <div className="rs-form-group">
            <label className="rs-label" htmlFor="mobileNumber">Phone Number</label>
            <div className="rs-input-wrapper">
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                className={`rs-input ${errors.mobileNumber ? 'has-error' : ''}`}
                placeholder="+91 98765 43210"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            {errors.mobileNumber && <span className="rs-error-msg">{errors.mobileNumber}</span>}
          </div>

          <div className="rs-form-group">
            <label className="rs-label" htmlFor="address">Address</label>
            <div className="rs-input-wrapper">
              <textarea
                id="address"
                name="address"
                rows="2"
                className={`rs-input ${errors.address ? 'has-error' : ''}`}
                placeholder="123 Main St, City"
                value={formData.address}
                onChange={handleChange}
                style={{ resize: 'none', paddingTop: '10px' }}
              />
            </div>
            {errors.address && <span className="rs-error-msg">{errors.address}</span>}
          </div>

          <div className="rs-form-group">
            <label className="rs-label" htmlFor="email">Gmail / Email Address</label>
            <div className="rs-input-wrapper">
              <input
                id="email"
                name="email"
                type="email"
                className={`rs-input ${errors.email ? 'has-error' : ''}`}
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="rs-error-msg">{errors.email}</span>}
          </div>

          <div className="rs-form-group">
            <label className="rs-label" htmlFor="password">Set Password</label>
            <div className="rs-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`rs-input ${errors.password ? 'has-error' : ''}`}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="rs-pwd-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="rs-error-msg">{errors.password}</span>}
          </div>

          <div className="rs-form-group">
            <label className="rs-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="rs-input-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`rs-input ${errors.confirmPassword ? 'has-error' : ''}`}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="rs-pwd-toggle" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="rs-error-msg">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="rs-submit" disabled={isLoading} style={{ marginTop: '24px' }}>
            {isLoading ? (
              <><Loader2 size={18} className="animate-spin" /> Processing...</>
            ) : (
              'Continue / Register'
            )}
          </button>

        </form>
      </main>
    </div>
  );
}
