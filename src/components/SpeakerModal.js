import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'; // Import the styles

const SpeakerModal = ({ speaker, onClose }) => {
  if (!speaker) return null;

  // Custom styles for the modal content (optional, but good for layout)
  const modalStyles = {
    modal: {
      maxWidth: '800px',
      width: '90%',
      borderRadius: '8px',
      padding: '30px', // Increased padding for a bit more space
    },
  };

  const imageContainerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const imageStyle = {
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #eee',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Added a subtle shadow
  };

  const speakerNameStyle = {
    textAlign: 'center',
    fontSize: '1.8em', // Larger name
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  };

  const bioStyle = {
    fontSize: '1.1em',
    lineHeight: '1.6',
    color: '#555',
    textAlign: 'justify',
  };

  return (
    <Modal open={!!speaker} onClose={onClose} center styles={modalStyles}>
      {/* The library handles its own modal structure, background, and close button internally */}
      {/* We just need to provide the content */}
      {speaker && (
        <>
          <h2 style={speakerNameStyle}>{speaker.name}</h2>
          <div style={imageContainerStyle}>
            <img
              src={speaker.image} // Path like /img/speakers/alicja.jpg
              alt={speaker.name}
              style={imageStyle}
            />
          </div>
          <h3 style={{textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', marginBottom: '15px', color: '#333'}}>{speaker.title}</h3>
          <p style={bioStyle}>
            {speaker.abstract || "Further details about the speaker will be shown here."}
          </p>
          {/* You can add more speaker details here, e.g., talk title, abstract, etc. */}
        </>
      )}
    </Modal>
  );
};

SpeakerModal.propTypes = {
  speaker: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bio: PropTypes.string,
    // any other details you want to show
  }),
  onClose: PropTypes.func.isRequired,
};

export default SpeakerModal; 