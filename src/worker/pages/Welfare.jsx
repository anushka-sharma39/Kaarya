import React from 'react';
import { Card, CardContent } from '../components/Card';
import { HeartPulse, Shield, PhoneCall, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Welfare = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Worker Welfare & Support</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Your well-being is our priority. Explore the benefits, insurance, and support services available to you as a verified Kaarya worker.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mb-4">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Health Insurance</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Get comprehensive health coverage for you and your family at subsidized rates. Includes accidental coverage during active gigs.
            </p>
            <Link to="#" className="text-primary-600 dark:text-primary-400 font-medium flex items-center hover:underline">
              View Plans <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Legal & Financial Aid</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Access free legal consultation for workplace disputes and financial counseling for managing your earnings and taxes.
            </p>
            <Link to="#" className="text-primary-600 dark:text-primary-400 font-medium flex items-center hover:underline">
              Get Support <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-sage-200 dark:bg-sage-900/50 text-sage-800 dark:text-sage-300 rounded-2xl flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upskilling Programs</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Enhance your skills with free online and offline courses. Get certified to apply for higher-paying premium gigs.
            </p>
            <Link to="#" className="text-primary-600 dark:text-primary-400 font-medium flex items-center hover:underline">
              Explore Courses <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary-300 dark:hover:border-primary-700 transition-colors bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-800">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-2xl flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">24/7 Helpline</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Facing an emergency or need urgent assistance at a job site? Call our toll-free support line anytime.
            </p>
            <div className="flex items-center gap-4">
              <a href="tel:18001234567" className="px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
                Call Now
              </a>
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300">1800-123-4567</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Welfare;
