import React from 'react';
import { ThumbsUp, Reply } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './CommunityCard.css';

export default function CommunityCard({ post }) {
  const { t } = useLanguage();

  return (
    <div className="card community-card">
      <div className="community-header">
        <div className="community-user-avatar">
          {post.userName.charAt(0)}
        </div>
        <div>
          <h4>{post.userName}</h4>
          <span className="community-time">{post.timeAgo}</span>
        </div>
        <span className="community-category-badge">{post.category}</span>
      </div>
      
      <p className="community-content">{post.content}</p>
      
      {post.response && (
        <div className="community-response">
          <div className="response-header">
            <span className="responder-role">{post.response.role}</span>
          </div>
          <p>{post.response.content}</p>
        </div>
      )}

      <div className="community-actions">
        <button className="action-btn"><ThumbsUp size={16} /> {t('community.helpful')}</button>
        <button className="action-btn"><Reply size={16} /> {t('community.reply')}</button>
      </div>
    </div>
  );
}
