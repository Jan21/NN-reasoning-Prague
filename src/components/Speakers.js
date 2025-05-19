import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getImage, StaticImage } from "gatsby-plugin-image";

import SpeakerModal from './SpeakerModal'; //  the modal
//import "../src/style/bulma-style.sass" // Adjust path as needed

const speakerContainerStyle = {
  textAlign: 'center',
  //margin: '20px',
  cursor: 'pointer',
  //width: '150px', // Fixed width for each speaker item
};

const speakerImageStyle = {
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '10px',
  border: '3px solid #ddd',
  transition: 'transform 0.2s ease-in-out',
};

const speakerNameStyle = {
  marginTop: '8px',
  fontSize: '1.8em',
  fontWeight: '600',
  color: 'rgb(123 123 123)',
  marginBottom: '0px',
  lineHeight: '1',
};  

const speakerWorksStyle = {
  marginTop: '8px',
  fontSize: '1.3em',
  color: '#333',
};

const Speakers = ({ speakers }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const openModal = (speaker) => {
    setSelectedSpeaker(speaker);
  };

  const closeModal = () => {
    setSelectedSpeaker(null);
  };

  if (!speakers || speakers.length === 0) {
    return <p>No speakers to display.</p>;
  }

  return (
    <div className="columns is-multiline is-centered">
      {speakers.map((speaker, index) => (
        <div
          key={index}
          className="column is-one-quarter-desktop is-one-quarter-tablet"
          style={speakerContainerStyle}
          onClick={() => openModal(speaker)}
          onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
        >
          <StaticImage
            src={speaker.image} // Expecting path like /img/speakers/alicja.jpg
            alt={speaker.name}
            width={300}
            height={300}
            objectFit="cover"
            style={{
              borderRadius: '50%',
              border: '3px solid #ddd',
              transition: 'transform 0.2s ease-in-out',
              marginBottom: '10px',
            }}
          />
          <p style={speakerNameStyle}>{speaker.name}</p>
          <p style={speakerWorksStyle}>({speaker.works})</p>
        </div>
      ))}
      {selectedSpeaker && (
        <SpeakerModal speaker={selectedSpeaker} onClose={closeModal} />
      )}
    </div>
  );
};

Speakers.propTypes = {
  speakers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      bio: PropTypes.string, // Optional: for the modal
      // Add any other speaker properties you expect
    })
  ).isRequired,
};

export default Speakers; 