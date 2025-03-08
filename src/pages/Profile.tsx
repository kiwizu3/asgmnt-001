import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchUsers } from '../features/postSlice';
import { RootState } from '../store';
import './Profile.css'; // Import regular CSS file

const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '($1) $2 $3');
  }

  if (cleaned.length > 9) {
    const countryCode = cleaned.slice(0, cleaned.length - 9);
    const localNumber = cleaned.slice(cleaned.length - 9);

    return `+${countryCode} (${localNumber.slice(0, 3)}) ${localNumber.slice(3, 6)} ${localNumber.slice(6, 9)}`;
  }

  return phone;
};

// Helper function to format date
const formatDate = (date: string) => {
  const options: {
    year: "numeric";
    month: "long";
    day: "numeric";
  } = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Access loggedInUser from the post slice
  const { loggedInUser, loading, error } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle loading state
  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="profile-container">Error: {error}</div>;
  }

  // Handle case where loggedInUser is not available yet
  if (!loggedInUser) {
    return <div className="profile-container">No user data</div>;
  }

  // Phone and email buttons
  const handlePhoneClick = () => {
    window.location.href = `tel:${loggedInUser.phone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${loggedInUser.email}`;
  };

  return (
    <>
      <div className="container-fluid vh-100 other-bg">
        <div className="row h-100">
          <div className="col-12 my-auto">
            <div className="profile-container">
              <div className="profile-header">
                <h1>{loggedInUser.name}</h1>
                <p>{loggedInUser.city}</p>
              </div>
              <img
                className="profile-img"
                src={loggedInUser.img}
                alt={loggedInUser.name}
              />
              <div className="profile-info">
                <div className="contact-info">

                  <button
                    className="contact-button"
                    onClick={handleEmailClick}
                  >
                    Send Email
                  </button>

                  <button
                    className="contact-button"
                    onClick={handlePhoneClick}
                  >
                    Call {formatPhoneNumber(loggedInUser.phone)}
                  </button>

                  <p>
                    <span>Birthday:</span> {formatDate(loggedInUser.birthday)}
                  </p>
                  <p>
                    <span>Registered:</span> {formatDate(loggedInUser.registered)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
