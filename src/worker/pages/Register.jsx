
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
  Camera,
  Eye,
  EyeOff,
  Loader2,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Available skills
// ─────────────────────────────────────────────────────────────

const SKILL_OPTIONS = [
  'Plumbing',
  'Electrical Work',
  'AC Repair',
  'Fridge Repair',
  'Painting',
  'Car Repair',
  'Machine Repair',
  'Carpentry',
  'Cleaning',
  'Welding',
  'Masonry',
  'Pest Control',
];

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export default function WorkerRegister() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ───────────────────────────────────────────────────────────
  // UI state
  // ───────────────────────────────────────────────────────────

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  // ───────────────────────────────────────────────────────────
  // Profile photo state
  // ───────────────────────────────────────────────────────────

  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [photoError, setPhotoError] = useState('');
  const [photoHover, setPhotoHover] = useState(false);

  // ───────────────────────────────────────────────────────────
  // Form state
  // ───────────────────────────────────────────────────────────

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    skills: [],
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // ───────────────────────────────────────────────────────────
  // Page effect
  // ───────────────────────────────────────────────────────────

  useEffect(() => {
    document.body.classList.add('role-login');

    return () => {
      document.body.classList.remove('role-login');
    };
  }, []);

  // ───────────────────────────────────────────────────────────
  // Profile photo handlers
  // ───────────────────────────────────────────────────────────

  const handlePhotoSelect = (file) => {
    setPhotoError('');

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError('Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      setPhotoError('Image must be smaller than 5 MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setPhotoDataUrl(event.target.result);
    };

    reader.onerror = () => {
      setPhotoError('Unable to read the selected image.');
    };

    reader.readAsDataURL(file);
  };

  const handlePhotoInputChange = (event) => {
    handlePhotoSelect(event.target.files?.[0]);
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setPhotoHover(false);

    const file = event.dataTransfer.files?.[0];
    handlePhotoSelect(file);
  };

  const handleRemovePhoto = () => {
    setPhotoDataUrl(null);
    setPhotoError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ───────────────────────────────────────────────────────────
  // Form handlers
  // ───────────────────────────────────────────────────────────

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: '',
      }));
    }
  };

  // ───────────────────────────────────────────────────────────
  // Skills
  // ───────────────────────────────────────────────────────────

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();

    if (!trimmedSkill) return;

    const alreadyExists = formData.skills.some(
      (existingSkill) =>
        existingSkill.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (alreadyExists) return;

    setFormData((previous) => ({
      ...previous,
      skills: [...previous.skills, trimmedSkill],
    }));

    if (errors.skills) {
      setErrors((previous) => ({
        ...previous,
        skills: '',
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((previous) => ({
      ...previous,
      skills: previous.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const handleSkillKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();

      addSkill(skillInput);
      setSkillInput('');
    }
  };

  // ───────────────────────────────────────────────────────────
  // Validation
  // ───────────────────────────────────────────────────────────

  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name cannot be empty';
    }

    // Phone
    const phoneDigits = formData.mobileNumber.replace(/\D/g, '');

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Phone number is required';
    } else if (phoneDigits.length < 10) {
      newErrors.mobileNumber =
        'Please enter a valid phone number (minimum 10 digits)';
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = 'Address cannot be empty';
    }

    // Skills
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please add at least one skill';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password =
        'Password must be at least 6 characters';
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        'Please confirm your password';
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ───────────────────────────────────────────────────────────
  // Submit
  // ───────────────────────────────────────────────────────────

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from('workers').insert({
      full_name: formData.fullName.trim(),
      phone: formData.mobileNumber.trim(),
      address: formData.address.trim(),
      skills: formData.skills,
      email: formData.email.trim().toLowerCase(),
      admin_status: 'pending',
    });

    if (error) {
      console.error('Supabase insert error:', error);

      if (error.code === '23505') {
        setErrors({ email: 'An account with this email or phone already exists.' });
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }

      setIsLoading(false);
      return;
    }

    try {
      const draftProfile = {
        userType: 'worker',
        name: formData.fullName.trim(),
        phone: formData.mobileNumber.trim(),
        email: formData.email.trim().toLowerCase(),
        profileImage: photoDataUrl || null,
      };

      localStorage.setItem('draftWorkerProfile', JSON.stringify(draftProfile));

      // Password is intentionally never sent to Supabase from this form —
      // real worker login/auth is a separate piece of work.

      navigate('/worker/verify');
    } catch (err) {
      console.error('Unable to save worker registration:', err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
      setIsLoading(false);
    }
  };

  // ───────────────────────────────────────────────────────────
  // Input style
  // ───────────────────────────────────────────────────────────

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '12px 16px',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    color: 'var(--rs-ink)',
    background: 'rgba(255, 255, 255, 0.7)',
    border: `1px solid ${hasError
        ? 'var(--rs-terracotta)'
        : 'rgba(42, 33, 89, 0.15)'
      }`,
    borderRadius: '12px',
    outline: 'none',
    transition:
      'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  });

  // ───────────────────────────────────────────────────────────
  // JSX
  // ───────────────────────────────────────────────────────────

  return (
    <div className="rs-page">

      {/* Background */}
      <div className="rs-bg" aria-hidden="true">
        <span className="rs-orb rs-orb-1" />
        <span className="rs-orb rs-orb-2" />
        <span className="rs-orb rs-orb-3" />
        <span className="rs-jaali" />
      </div>

      <main
        className="rs-shell"
        style={{
          alignItems: 'center',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >

        {/* Header */}
        <header className="rs-header">
          <div className="rs-brandmark">
            <span>🛠️</span>
            <span>kaarya</span>
          </div>

          <h1 className="rs-wordmark">
            Gig Worker Registration
          </h1>

          <p className="rs-tagline">
            Create your worker profile to start finding gigs.
          </p>
        </header>

        {/* Registration form */}
        <form
          className="rs-form"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* ────────────────────────────────────────────────
              Profile Photo
          ──────────────────────────────────────────────── */}

          <div
            className="rs-form-group"
            style={{
              textAlign: 'center',
              marginBottom: '28px',
            }}
          >
            <label
              className="rs-label"
              style={{
                display: 'block',
                marginBottom: '14px',
              }}
            >
              Profile Photo{' '}
              <span
                style={{
                  fontWeight: 400,
                  color: 'var(--rs-muted)',
                  fontSize: '0.78rem',
                }}
              >
                (optional)
              </span>
            </label>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={handlePhotoInputChange}
            />

            {photoDataUrl ? (

              /* Photo preview */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border:
                      '3px solid rgba(68,58,134,0.35)',
                    boxShadow:
                      '0 8px 24px -8px rgba(42,33,89,0.4)',
                    animation:
                      'rs-pop-in 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <img
                    src={photoDataUrl}
                    alt="Profile preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <button
                    type="button"
                    onClick={handleDropZoneClick}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '999px',
                      border:
                        '1px solid rgba(42,33,89,0.25)',
                      background:
                        'rgba(255,255,255,0.8)',
                      color: 'var(--rs-indigo)',
                      fontFamily: 'inherit',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.18s',
                    }}
                  >
                    <Camera size={14} />
                    Change Photo
                  </button>

                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '999px',
                      border:
                        '1px solid rgba(196,98,60,0.3)',
                      background:
                        'rgba(255,255,255,0.8)',
                      color: 'var(--rs-terracotta)',
                      fontFamily: 'inherit',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.18s',
                    }}
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>

            ) : (

              /* Upload zone */
              <div
                onClick={handleDropZoneClick}
                onDragOver={(event) => {
                  event.preventDefault();
                  setPhotoHover(true);
                }}
                onDragLeave={() => {
                  setPhotoHover(false);
                }}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleDropZoneClick();
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  border: `2px dashed ${photoHover
                      ? 'var(--rs-terracotta)'
                      : 'rgba(42,33,89,0.25)'
                    }`,
                  background: photoHover
                    ? 'rgba(196,98,60,0.06)'
                    : 'rgba(255,255,255,0.65)',
                  cursor: 'pointer',
                  margin: '0 auto',
                  transition:
                    'border-color 0.2s, background 0.2s',
                  outline: 'none',
                }}
              >
                <UploadCloud
                  size={28}
                  style={{
                    color: photoHover
                      ? 'var(--rs-terracotta)'
                      : 'var(--rs-muted)',
                    transition: 'color 0.2s',
                  }}
                />

                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    color: 'var(--rs-muted)',
                    lineHeight: 1.2,
                    textAlign: 'center',
                  }}
                >
                  Upload
                  <br />
                  Photo
                </span>
              </div>
            )}

            <p
              style={{
                marginTop: '8px',
                fontSize: '0.74rem',
                color: 'var(--rs-muted)',
              }}
            >
              JPG, PNG, WEBP · max 5 MB
            </p>

            {photoError && (
              <span
                className="rs-error-msg"
                style={{
                  display: 'block',
                  marginTop: '6px',
                }}
              >
                {photoError}
              </span>
            )}
          </div>

          {/* ────────────────────────────────────────────────
              Full Name
          ──────────────────────────────────────────────── */}

          <div className="rs-form-group">
            <label
              className="rs-label"
              htmlFor="wFullName"
            >
              Full Name
            </label>

            <input
              id="wFullName"
              name="fullName"
              type="text"
              style={inputStyle(!!errors.fullName)}
              placeholder="Ramesh Kumar"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
            />

            {errors.fullName && (
              <span className="rs-error-msg">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* ────────────────────────────────────────────────
              Phone
          ──────────────────────────────────────────────── */}

          <div className="rs-form-group">
            <label
              className="rs-label"
              htmlFor="wPhone"
            >
              Phone Number
            </label>

            <input
              id="wPhone"
              name="mobileNumber"
              type="tel"
              style={inputStyle(!!errors.mobileNumber)}
              placeholder="+91 98765 43210"
              value={formData.mobileNumber}
              onChange={handleChange}
              autoComplete="tel"
            />

            {errors.mobileNumber && (
              <span className="rs-error-msg">
                {errors.mobileNumber}
              </span>
            )}
          </div>

          {/* ────────────────────────────────────────────────
              Address
          ──────────────────────────────────────────────── */}

          <div className="rs-form-group">
            <label
              className="rs-label"
              htmlFor="wAddress"
            >
              Address
            </label>

            <textarea
              id="wAddress"
              name="address"
              rows="2"
              style={{
                ...inputStyle(!!errors.address),
                resize: 'none',
                paddingTop: '10px',
              }}
              placeholder="City, State"
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
            />

            {errors.address && (
              <span className="rs-error-msg">
                {errors.address}
              </span>
            )}
          </div>

          {/* ────────────────────────────────────────────────
              Skills
          ──────────────────────────────────────────────── */}

          <div className="rs-form-group">
            <label className="rs-label">
              Skills
            </label>

            {/* Suggested skills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '10px',
              }}
            >
              {SKILL_OPTIONS.map((skill) => {
                const selected =
                  formData.skills.includes(skill);

                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    style={{
                      padding: '4px 11px',
                      borderRadius: '999px',
                      border: `1px solid ${selected
                          ? 'var(--rs-indigo)'
                          : 'rgba(42,33,89,0.2)'
                        }`,
                      background: selected
                        ? 'rgba(68,58,134,0.12)'
                        : 'rgba(255,255,255,0.7)',
                      color: selected
                        ? 'var(--rs-indigo)'
                        : 'var(--rs-muted)',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      fontFamily: 'inherit',
                    }}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            {/* Custom skill */}
            <input
              type="text"
              style={inputStyle(!!errors.skills)}
              placeholder="Type a custom skill and press Enter…"
              value={skillInput}
              onChange={(event) =>
                setSkillInput(event.target.value)
              }
              onKeyDown={handleSkillKeyDown}
              onBlur={() => {
                if (skillInput.trim()) {
                  addSkill(skillInput);
                  setSkillInput('');
                }
              }}
            />

            {/* Selected skills */}
            {formData.skills.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginTop: '10px',
                }}
              >
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background:
                        'linear-gradient(120deg, var(--rs-indigo), var(--rs-indigo-soft))',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                    }}
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        color:
                          'rgba(255,255,255,0.8)',
                        cursor: 'pointer',
                        padding: '0',
                        lineHeight: 1,
                        display: 'flex',
                      }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {errors.skills && (
              <span className="rs-error-msg">
                {errors.skills}
              </span>
            )}
          </div>

          {/* ────────────────────────────────────────────────
              Email
          ──────────────────────────────────────────────── */}

          <div className="rs-form-group">
            <label
              className="rs-label"
              htmlFor="wEmail"
            >
              Gmail / Email Address
            </label>

            <input
              id="wEmail"
              name="email"
              type="email"
              style={inputStyle(!!errors.email)}
              placeholder="ramesh@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />

            {errors.email && (
              <span className="rs-error-msg">
                {errors.email}
              </span>
            )}
          </div>

          {/* ────────────────────────────────────────────────
              Password
          ──────────────────────────────────────────────── */}

          <div className="rs-form-group">
            <label
              className="rs-label"
              htmlFor="wPassword"
            >
              Set Password
            </label>

            <div className="rs-input-wrapper">
              <input
                id="wPassword"
                name="password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                className={`rs-input ${errors.password
                    ? 'has-error'
                    : ''
                  }`}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="rs-pwd-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="rs-error-msg">
                {errors.password}
              </span>
            )}
          </div>

          {/* ────────────────────────────────────────────────
              Confirm Password
          ──────────────────────────────────────────────── */}

          <div className="rs-form-group">
            <label
              className="rs-label"
              htmlFor="wConfirmPassword"
            >
              Confirm Password
            </label>

            <div className="rs-input-wrapper">
              <input
                id="wConfirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                className={`rs-input ${errors.confirmPassword
                    ? 'has-error'
                    : ''
                  }`}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="rs-pwd-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <span className="rs-error-msg">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit error */}
          {errors.submit && (
            <span
              className="rs-error-msg"
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              {errors.submit}
            </span>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="rs-submit"
            disabled={isLoading}
            style={{ marginTop: '24px' }}
          >
            {isLoading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Processing…
              </>
            ) : (
              'Continue / Register'
            )}
          </button>

          {/* Login */}
          <div className="rs-link-wrap">
            Already have an account?{' '}
            <Link
              to="/login"
              className="rs-link"
            >
              Sign In
            </Link>
          </div>

        </form>
      </main>
    </div>
  );
}

