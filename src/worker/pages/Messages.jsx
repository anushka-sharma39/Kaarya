import React from 'react';
import { Card, CardContent } from '../components/Card';
import { messages } from '../data/mockData';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Messages = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('nav.messages')}</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder={t('msg.search') || "Search messages..."} 
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
        />
      </div>

      <div className="space-y-3">
        {messages.map(msg => (
          <Card key={msg.id} className={`cursor-pointer hover:border-primary-300 dark:hover:border-primary-700 transition-colors ${msg.unread ? 'bg-primary-50/50 dark:bg-primary-950/20' : ''}`}>
            <CardContent className="p-4 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-400 flex items-center justify-center text-lg font-bold shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-semibold truncate ${msg.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                    {msg.sender}
                  </h3>
                  <span className={`text-xs whitespace-nowrap ml-2 ${msg.unread ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                    {msg.time[language] || msg.time.en || msg.time}
                  </span>
                </div>
                <p className={`text-sm truncate ${msg.unread ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                  {msg.lastMessage}
                </p>
              </div>
              {msg.unread && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary-600 shrink-0"></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Messages;
