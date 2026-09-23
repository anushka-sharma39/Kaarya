import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import '../admin.css';

export default function WorkerVerification() {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const loadWorkers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .eq('admin_status', 'pending')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to load workers:', error);
    } else {
      setWorkers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  const handleApprove = async (worker) => {
    setBusyId(worker.id);
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('workers')
      .update({
        admin_status: 'approved',
        reviewed_by: userData?.user?.id || null,
        reviewed_at: new Date().toISOString(),
        rejection_reason: null,
      })
      .eq('id', worker.id);

    if (error) {
      console.error('Approve failed:', error);
      alert('Could not approve this worker. Please try again.');
    } else {
      setWorkers((prev) => prev.filter((w) => w.id !== worker.id));
    }
    setBusyId(null);
  };

  const handleReject = async (worker) => {
    const reason = window.prompt('Reason for rejecting this application:');
    if (reason === null) return; // cancelled

    setBusyId(worker.id);
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('workers')
      .update({
        admin_status: 'rejected',
        reviewed_by: userData?.user?.id || null,
        reviewed_at: new Date().toISOString(),
        rejection_reason: reason.trim() || 'No reason provided',
      })
      .eq('id', worker.id);

    if (error) {
      console.error('Reject failed:', error);
      alert('Could not reject this worker. Please try again.');
    } else {
      setWorkers((prev) => prev.filter((w) => w.id !== worker.id));
    }
    setBusyId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  return (
    <div className="av-page av-page-wide">
      <div className="av-header">
        <h1 className="av-title">Worker Verification</h1>
        <button className="av-logout-btn" onClick={handleLogout}>Log out</button>
      </div>

      {loading && <p className="av-muted">Loading pending workers…</p>}

      {!loading && workers.length === 0 && (
        <p className="av-muted">No pending worker applications right now.</p>
      )}

      <div className="av-list">
        {workers.map((worker) => (
          <div className="av-worker-card" key={worker.id}>
            <div className="av-worker-info">
              <h3>{worker.full_name}</h3>
              <p>{worker.phone} · {worker.email}</p>
              <p>{worker.address}</p>
              {worker.skills?.length > 0 && (
                <div className="av-skills">
                  {worker.skills.map((skill) => (
                    <span className="av-skill-chip" key={skill}>{skill}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="av-worker-actions">
              <button
                className="av-approve-btn"
                disabled={busyId === worker.id}
                onClick={() => handleApprove(worker)}
              >
                Approve
              </button>
              <button
                className="av-reject-btn"
                disabled={busyId === worker.id}
                onClick={() => handleReject(worker)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}