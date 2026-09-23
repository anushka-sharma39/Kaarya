import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { profileData, stats } from '../data/mockData';
import { Camera, CheckCircle2, MapPin, Edit3, Star, Upload, FileCheck, AlertCircle, Phone, Mail, Home, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];


const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { t, language } = useLanguage();
  const [tab, setTab] = useState('Overview');
  const [certifications, setCertifications] = useState(profileData.certifications);
  const [isUploading, setIsUploading] = useState(false);
  const [photoErr, setPhotoErr] = useState('');
  const photoInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    setPhotoErr('');
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoErr('Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setPhotoErr('Image must be smaller than 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      updateProfile({ profileImage: dataUrl, avatar: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    const fallback = `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.email || 'worker')}`;
    updateProfile({ profileImage: null, avatar: fallback });
  };


  const tabs = [
    { id: 'Overview', label: t('profile.overview') || 'Overview' },
    { id: 'Skills', label: t('profile.skills') || 'Skills' },
    { id: 'Certifications', label: t('profile.certifications') || 'Certifications' },
    { id: 'Reviews', label: t('profile.reviews') || 'Reviews' }
  ];

  const handleUploadCert = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setCertifications([...certifications, {
        id: `c${Date.now()}`,
        name: { en: e.target.certName.value, hi: e.target.certName.value },
        organization: e.target.orgName.value,
        year: new Date().getFullYear().toString(),
        status: 'Pending Review'
      }]);
      setIsUploading(false);
      e.target.reset();
    }, 1000);
  };

  const handleAdminAction = (id, action) => {
    setCertifications(certifications.map(c => 
      c.id === id ? { ...c, status: action === 'approve' ? 'Approved' : 'Rejected' } : c
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
        {/* Avatar with change/remove overlay */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover bg-slate-200"
          />
          {/* hidden file input for in-profile photo change */}
          <input
            ref={photoInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          {/* Camera button overlay */}
          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            title="Change profile photo"
            style={{
              position: 'absolute', bottom: 2, right: 2,
              width: 28, height: 28, borderRadius: '50%',
              background: 'var(--primary-700, #1a4731)',
              border: '2px solid white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'transform 0.18s',
            }}
            className="bg-primary-700 hover:scale-110"
          >
            <Camera size={13} color="#fff" />
          </button>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
            {user?.name}
            {user?.verified && <CheckCircle2 className="w-6 h-6 text-primary-600 dark:text-primary-500" />}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{t('profile.verifiedWorker')}</p>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-3 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-900 dark:text-slate-200">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              {stats.avgRating} ({profileData.reviews.length} {t('work.reviews')?.toLowerCase() || 'reviews'})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user?.address || profileData.location}</span>
          </div>
          {/* Photo error */}
          {photoErr && <p style={{ color: '#c4623c', fontSize: '0.8rem', marginTop: '8px' }}>{photoErr}</p>}
          {/* Remove photo button — only shown when user has an uploaded image */}
          {user?.profileImage && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              style={{
                marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.78rem', color: '#c4623c', background: 'none',
                border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
              }}
            >
              <Trash2 size={13} /> Remove photo
            </button>
          )}
        </div>
        <Link to="/worker/settings" className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
          <Edit3 className="w-4 h-4" /> {t('profile.editProfile')}
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 border-y border-slate-200 dark:border-slate-800 py-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.gigsCompleted}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('profile.gigsCompleted')}</p>
        </div>
        <div className="text-center border-l border-slate-200 dark:border-slate-800">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.avgRating}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('profile.avgRating')}</p>
        </div>
        <div className="text-center border-l border-slate-200 dark:border-slate-800">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.earnings}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('profile.earnings')}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800">
        {tabs.map(tOption => (
          <button 
            key={tOption.id}
            onClick={() => setTab(tOption.id)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              tab === tOption.id 
                ? 'text-primary-700 dark:text-primary-400' 
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {tOption.label}
            {tab === tOption.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700 dark:bg-primary-400" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {tab === 'Overview' && (
          <div className="space-y-6">
            {/* Registered contact details */}
            {(user?.phone || user?.email || user?.address) && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Contact Details</h3>
                <div className="space-y-2">
                  {user?.phone && (
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <Phone className="w-4 h-4 shrink-0 text-primary-600" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user?.email && (
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <Mail className="w-4 h-4 shrink-0 text-primary-600" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user?.address && (
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <Home className="w-4 h-4 shrink-0 text-primary-600" />
                      <span>{user.address}</span>
                    </div>
                  )}
                </div>
              </section>
            )}
            <section>
              <h3 className="text-lg font-semibold mb-2">{t('profile.aboutMe')}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{profileData.about[language] || profileData.about.en}</p>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3">{t('profile.topSkills')}</h3>
              <div className="flex flex-wrap gap-2">
                {/* Show registered skills first */}
                {user?.skills && user.skills.length > 0
                  ? user.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-sage-100 text-sage-800 dark:bg-sage-900/40 dark:text-sage-300 text-sm font-medium">
                      {skill}
                    </span>
                  ))
                  : profileData.skills.slice(0, 3).map(skill => (
                    <span key={skill.name.en} className="px-3 py-1.5 rounded-lg bg-sage-100 text-sage-800 dark:bg-sage-900/40 dark:text-sage-300 text-sm font-medium">
                      {skill.name[language] || skill.name.en}
                    </span>
                  ))
                }
              </div>
            </section>
          </div>
        )}

        {tab === 'Skills' && (
          <div className="space-y-4">
            {profileData.skills.map(skill => (
              <Card key={skill.name.en}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{skill.name[language] || skill.name.en}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{skill.experience[language] || skill.experience.en}</p>
                  </div>
                  <Badge variant={skill.level.en === 'Expert' ? 'success' : skill.level.en === 'Advanced' ? 'primary' : 'default'}>
                    {skill.level[language] || skill.level.en}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {tab === 'Certifications' && (
          <div className="space-y-6">
            {user?.role === 'worker' && (
              <Card className="bg-primary-50 dark:bg-primary-950/20 border-primary-200 dark:border-primary-900">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-primary-900 dark:text-primary-400 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5" /> {t('profile.addCertification')}
                  </h3>
                  <form onSubmit={handleUploadCert} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input name="certName" placeholder={t('profile.certName') || "Certification Name"} required className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50" />
                      <input name="orgName" placeholder={t('profile.orgName') || "Issuing Organization"} required className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50" />
                    </div>
                    <Button type="submit" disabled={isUploading}>
                      {isUploading ? t('profile.uploading') : t('profile.submitReview')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {certifications.map(cert => (
                <Card key={cert.id}>
                  <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cert.status === 'Approved' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : cert.status === 'Rejected' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30'}`}>
                        {cert.status === 'Approved' ? <FileCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          {cert.name[language] || cert.name.en}
                          {cert.status === 'Approved' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{cert.organization} • {cert.year}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant={cert.status === 'Approved' ? 'success' : cert.status === 'Rejected' ? 'danger' : 'warning'}>
                        {t(`profile.certStatus${cert.status.replace(' ', '')}`) || cert.status}
                      </Badge>

                      {user?.role === 'admin' && cert.status === 'Pending Review' && (
                        <div className="flex gap-2 ml-4 border-l pl-4 border-slate-200 dark:border-slate-800">
                          <button onClick={() => handleAdminAction(cert.id, 'approve')} className="text-xs font-medium text-green-600 hover:underline">Approve</button>
                          <button onClick={() => handleAdminAction(cert.id, 'reject')} className="text-xs font-medium text-red-600 hover:underline">Reject</button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab === 'Reviews' && (
          <div className="space-y-4">
            {profileData.reviews.map(review => (
              <Card key={review.id}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{review.author}</h4>
                      <p className="text-xs text-slate-500">{review.date[language] || review.date.en}</p>
                    </div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{review.content[language] || review.content.en}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
