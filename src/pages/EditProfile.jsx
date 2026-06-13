


import { useState, useEffect } from "react";
import "./EditProfile.css";

const BASE = import.meta.env.VITE_API_URL;


export default function EditProfile({ user, setUser }) {
  const [form, setForm] = useState({
    name: "",
    // username: "",
    location: "",
    bio: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ── LOAD USER DATA ── */
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        // username: user.username || "",
        location: user.location || "",
        bio: user.bio || "",
      });

      if (user.avatarUrl) {
        setPreview(`${BASE}${user.avatarUrl}`);
      }
    }
  }, [user]);

  /* ── INPUT CHANGE ── */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ── AVATAR SELECT ── */
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ── SAVE PROFILE ── */
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      let avatarUrl = user?.avatarUrl;

      // upload avatar if changed
      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);

        const uploadRes = await fetch(
          `${BASE}/api/users/avatar`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const uploadedUser = await uploadRes.json();
        avatarUrl = uploadedUser.avatarUrl;
      }

      // update profile
      const res = await fetch(`${BASE}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          avatarUrl,
        }),
      });

      

      const updatedUser = await res.json();

      // update UI
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (
    <div className="ep-page">
      <div className="ep-container">

        {/* Breadcrumb */}
        <div className="ep-breadcrumb">
          <a href="/">Home</a>
          <span className="ep-breadcrumb-sep">/</span>
          <span className="ep-breadcrumb-current">Edit Profile</span>
        </div>

        {/* Header */}
        <div className="ep-page-header">
          <div>
            <h1 className="ep-page-title">Edit Profile</h1>
            <p className="ep-page-subtitle">
              Update your personal information
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="ep-layout">

          {/* Sidebar */}
          <div className="ep-sidebar">
            <div className="ep-sidebar-section">Settings</div>
            <button className="ep-sidebar-link active">Profile</button>
            {/* <button className="ep-sidebar-link">Password</button> */}
          </div>

          {/* Main */}
          <div className="ep-main">

            {/* Profile Card */}
            <div className="ep-card">
              <h3 className="ep-card-title">Profile Info</h3>

              {/* Avatar */}
              <div className="ep-avatar-row">
                <div className="ep-avatar-wrap">
                  <div className="ep-avatar">
                    {preview ? (
                      <img src={preview} alt="avatar" />
                    ) : (
                      "U"
                    )}
                  </div>
                </div>

                <div className="ep-avatar-btns">
                  <label className="ep-btn-upload">
                    Upload
                    <input
                      type="file"
                      className="ep-file-input"
                      onChange={handleAvatar}
                    />
                  </label>

                  <button
                    className="ep-btn-delete"
                    onClick={() => {
                      setAvatar(null);
                      setPreview(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Form */}
              <form className="ep-form" onSubmit={(e) => e.preventDefault()}>

                {/* <div className="ep-field-row"> */}
                  <div className="ep-field">
                    <label className="ep-label">Name</label>
                    <input
                      className="ep-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>

                  {/* <div className="ep-field">
                    <label className="ep-label">Username</label>
                    <input
                      className="ep-input"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="@username"
                    />
                  </div> */}
                {/* </div> */}

                <div className="ep-field">
                  <label className="ep-label">Location</label>
                  <input
                    className="ep-input"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>

                <div className="ep-field">
                  <label className="ep-label">Bio</label>
                  <textarea
                    className="ep-textarea"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell something about yourself..."
                  />
                </div>

                {/* Actions */}
                <div className="ep-form-actions">
                  <button
                    type="button"
                    className="ep-btn-save"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="ep-btn-cancel"
                    onClick={() => window.location.reload()}
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}