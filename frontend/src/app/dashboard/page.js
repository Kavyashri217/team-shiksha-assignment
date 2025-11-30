'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/signin');
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await res.json();
        setUser(data.user);
        setFormData({
          name: data.user.name,
          phone: data.user.phone || '',
          bio: data.user.bio || '',
        });
      } catch (err) {
        setError(err.message);
        if (err.message && err.message.includes('token')) {
          localStorage.removeItem('token');
          router.push('/signin');
        }
      }
    };

    fetchProfile();
  }, [router]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          throw new Error(data.errors[0].msg);
        }
        throw new Error(data.error || 'Update failed');
      }

      setUser(data.user);
      setEditMode(false);
      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/signin');
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      phone: user.phone || '',
      bio: user.bio || '',
    });
    setEditMode(false);
    setError('');
  };

  if (!user) {
    return (
      <div className="dashboard">
        <div className="navbar">
          <div className="container navbar-content">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="navbar">
        <div className="container navbar-content">
          <h2>Dashboard</h2>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="container dashboard-content">
        <div className="card">
          <div className="card-header">
            <h3>Profile Information</h3>
            {!editMode && (
              <button onClick={() => setEditMode(true)} className="btn btn-primary">
                Edit Profile
              </button>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={500}
                />
              </div>

              <div className="btn-group">
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <span className="info-value">{user.name}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{user.phone || 'Not provided'}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Member Since</span>
                <span className="info-value">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>

              {user.bio && (
                <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="info-label">Bio</span>
                  <span className="info-value">{user.bio}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}