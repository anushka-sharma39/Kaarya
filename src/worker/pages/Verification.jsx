import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { Shield, ShieldAlert, ShieldCheck, FileText, Camera, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Verification = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(user?.verified ? 'completed' : 'pending');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Mock approval
      const updatedUser = { ...user, verified: true };
      login(updatedUser); // Update context
      setStep('completed');
      setIsSubmitting(false);
    }, 2000);
  };

  if (step === 'completed' || user?.verified) {
    return (
      <div className="max-w-xl mx-auto mt-12 text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-600">
          <ShieldCheck className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('verify.successTitle')}</h1>
        <p className="text-slate-600 dark:text-slate-400">
          {t('verify.successDesc')}
        </p>
        <Button onClick={() => navigate('/worker/dashboard')} className="w-full">{t('verify.goToDashboard')}</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto text-amber-600 mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('verify.title')}</h1>
        <p className="text-slate-600 dark:text-slate-400">
          {t('verify.desc')}
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{t('verify.idProof')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{t('verify.idDesc')}</p>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-500">{t('verify.uploadFront')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{t('verify.selfie')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{t('verify.selfieDesc')}</p>
              <Button variant="outline" className="w-full">{t('verify.openCamera')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting} 
        className="w-full mt-8" 
        size="lg"
      >
        {isSubmitting ? t('verify.verifying') : t('verify.submit')}
      </Button>
    </div>
  );
};

export default Verification;
