import React, { useState } from 'react';
import { Card, CardContent } from '../components/Card';
import Button from '../components/Button';
import { communityPosts } from '../data/mockData';
import { Heart, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Community = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState(communityPosts);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: `p${Date.now()}`,
        author: { name: user?.name, avatar: user?.avatar, role: 'Worker' },
        content: newPost,
        likes: 0,
        comments: 0,
        time: { en: 'Just now', hi: 'अभी' }
      },
      ...posts
    ]);
    setNewPost('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('nav.community')}</h1>

      {/* Create Post */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="flex-1">
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={t('community.placeholder') || "Share an update..."}
                className="w-full bg-transparent border-none resize-none focus:outline-none p-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 min-h-[80px]"
              />
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button className="p-2 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <Button onClick={handlePost} size="sm" disabled={!newPost.trim()}>{t('community.post')}</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id}>
            <CardContent className="p-4 sm:p-5">
              <div className="flex gap-3 mb-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full bg-slate-200" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{post.author.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{post.author.role} • {post.time[language] || post.time.en || post.time}</p>
                </div>
              </div>
              <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed mb-3">
                {post.content}
              </p>
              {post.image && (
                <img src={post.image} alt="Post attachment" className="w-full h-48 sm:h-64 object-cover rounded-xl mb-3" />
              )}
              <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <button className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  <Heart className="w-5 h-5" /> <span className="text-xs font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  <MessageCircle className="w-5 h-5" /> <span className="text-xs font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-500 transition-colors ml-auto">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
