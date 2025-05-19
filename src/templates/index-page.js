import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Speakers from "../components/Speakers";
import BlogRoll from "../components/BlogRoll";
import FullWidthImage from "../components/FullWidthImage";

// Sample speaker data - you'll likely want to move this to your CMS or a data file later
const sampleSpeakers = [
  { 
    name: "Alicja", 
    works: "IDEAS NCBR",
    image: "/img/speakers/alicja.jpg", 
    title: "Title", 
    abstract: "Pioneering researcher in neural networks with focus on deep learning architectures that mimic human cognitive processes. Her work bridges the gap between traditional computational models and biologically-inspired artificial intelligence systems."
  },



  { name: "Jonas", 
    works: "ETH Zurich",
    image: "/img/speakers/jonas.jpg", 
    title: "Specialist in AI ethics.",
    abstract: "Pioneering researcher in neural networks with focus on deep learning architectures that mimic human cognitive processes. Her work bridges the gap between traditional computational models and biologically-inspired artificial intelligence systems."
  },


  { name: "Core Francisco Park", 
    works: "Harvard",
    image: "/img/speakers/francisco.jpg", 
    title: "Specialist in AI ethics.",
    abstract: "Pioneering researcher in neural networks with focus on deep learning architectures that mimic human cognitive processes. Her work bridges the gap between traditional computational models and biologically-inspired artificial intelligence systems."
  },

  { name: "Mikoláš Janota", 
    works: "CIIRC",
    image: "/img/speakers/mikolas.jpg", 
    title: "Specialist in AI ethics.",
    abstract: "Pioneering researcher in neural networks with focus on deep learning architectures that mimic human cognitive processes. Her work bridges the gap between traditional computational models and biologically-inspired artificial intelligence systems."
  },

  { name: "Kazuki", 
    works: "Harvard",
    image: "/img/speakers/kazuki.jpg", 
    title: "Specialist in AI ethics.",
    abstract: "Pioneering researcher in neural networks with focus on deep learning architectures that mimic human cognitive processes. Her work bridges the gap between traditional computational models and biologically-inspired artificial intelligence systems."
  },
  { name: "Federico", 
    works: "Oxford",
    image: "/img/speakers/federico.jpg", 
    title: "Specialist in AI ethics.",
    abstract: "Pioneering researcher in neural networks with focus on deep learning architectures that mimic human cognitive processes. Her work bridges the gap between traditional computational models and biologically-inspired artificial intelligence systems."
  },


];

const scheduleData = {
  day1: [
    { time: "09:00 - 10:00", talk: "Opening Keynote: The Future of AI Reasoning" },
    { time: "10:00 - 10:30", talk: "Coffee Break" },
    { time: "10:30 - 11:30", talk: "Session 1A: Advances in Neural Symbolic Integration" },
    { time: "10:30 - 11:30", talk: "Session 1B: Explainable AI (XAI) Techniques" },
    { time: "11:30 - 12:30", talk: "Invited Talk: Dr. Alicja", speakerKey: "Alicja" },
    { time: "12:30 - 14:00", talk: "Lunch Break" },
    { time: "14:00 - 15:00", talk: "Session 2A: Large Language Models and Reasoning" },
    { time: "14:00 - 15:00", talk: "Session 2B: Reinforcement Learning for Problem Solving" },
    { time: "15:00 - 15:30", talk: "Coffee Break" },
    { time: "15:30 - 16:30", talk: "Panel Discussion: Ethical Implications of Advanced AI" },
  ],
  day2: [
    { time: "09:00 - 10:00", talk: "Keynote 2: Cognitive Architectures & AI" },
    { time: "10:00 - 10:30", talk: "Coffee Break" },
    { time: "10:30 - 11:30", talk: "Session 3A: Causality in Machine Learning" },
    { time: "10:30 - 11:30", talk: "Session 3B: Bayesian Approaches to Reasoning" },
    { time: "11:30 - 12:30", talk: "Invited Talk: Jonas", speakerKey: "Jonas" },
    { time: "12:30 - 14:00", talk: "Lunch Break" },
    { time: "14:00 - 15:30", talk: "Workshop: Hands-on Deep Learning for Reasoning" },
    { time: "15:30 - 16:00", talk: "Coffee Break" },
    { time: "16:00 - 17:00", talk: "Poster Session & Networking" },
  ],
  day3: [
    { time: "09:00 - 10:00", talk: "Keynote 3: The Role of Logic in Next-Gen AI" },
    { time: "10:00 - 10:30", talk: "Coffee Break" },
    { time: "10:30 - 11:30", talk: "Session 4A: Knowledge Representation" },
    { time: "10:30 - 11:30", talk: "Session 4B: Applications of AI in Science & Industry" },
    { time: "11:30 - 12:30", talk: "Invited Talk: Mikoláš Janota", speakerKey: "Mikoláš Janota" },
    { time: "12:30 - 14:00", talk: "Lunch Break" },
    { time: "14:00 - 15:00", talk: "Session 5A: Future Challenges in AI Reasoning" },
    { time: "14:00 - 15:00", talk: "Session 5B: AI and Human Collaboration Models" },
    { time: "15:00 - 15:30", talk: "Closing Remarks & Best Paper Awards" },
  ],
};


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





const TimeSchedule = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const [selectedSpeakerData, setSelectedSpeakerData] = useState(null);

  const conferenceDays = [
    { key: 'day1', label: 'Day 1 (July 10)' },
    { key: 'day2', label: 'Day 2 (July 11)' },
    { key: 'day3', label: 'Day 3 (July 12)' },
  ];

  const tabButtonContainerStyle = {
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const tabButtonStyle = (isActive) => ({
    padding: '10px 20px',
    margin: '0 5px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: isActive ? '3px solid #3273dc' : '3px solid transparent', // #3273dc is a common Bulma primary blue
    color: isActive ? '#3273dc' : '#4a4a4a', // Bulma default text color
    fontSize: '1.4em',
    fontWeight: isActive ? '600' : '400',
    transition: 'border-color 0.3s, color 0.3s',
  });

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    textAlign: 'left',
    padding: '12px 10px',
    borderBottom: '2px solid #363636', // Darker bottom border for table headers
    fontWeight: '600',
    fontSize: '1.05em',
  };

  const tdStyle = (isLastRow) => ({
    textAlign: 'left',
    padding: '10px 10px',
    borderBottom: isLastRow ? 'none' : '1px solid #dbdbdb', // Standard Bulma border color for horizontal lines
  });

  const handleSpeakerTalkClick = (speakerKey) => {
    const speaker = sampleSpeakers.find(s => s.name === speakerKey);
    if (speaker) {
      setSelectedSpeakerData(speaker);
    }
  };

  const closeModal = () => {
    setSelectedSpeakerData(null);
  };

  const clickableTalkStyle = {
    color: '#3273dc', // Bulma primary blue
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',
    textDecoration: 'underline',
    textAlign: 'left', // Ensure text aligns with other non-clickable talks
    fontSize: 'inherit', // Inherit font size from td
    fontFamily: 'inherit', // Inherit font family
  };

  // Modal Styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '85vh',
    overflowY: 'auto',
    textAlign: 'left',
    position: 'relative', // For close button positioning
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const modalCloseButtonStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.8em',
    cursor: 'pointer',
    color: '#666',
  };

  const modalSpeakerImageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: '3px solid #ddd',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <div>
      <div style={tabButtonContainerStyle}>
        {conferenceDays.map(day => (
          <button
            key={day.key}
            onClick={() => setActiveDay(day.key)}
            style={tabButtonStyle(activeDay === day.key)}
          >
            {day.label}
          </button>
        ))}
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: '25%' }}>Time</th>
            <th style={thStyle}>Event</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData[activeDay].map((item, index, arr) => {
            const isLast = index === arr.length - 1;
            if (item.speakerKey) {
              return (
                <tr key={index}>
                  <td style={tdStyle(isLast)}>{item.time}</td>
                  <td style={tdStyle(isLast)}>
                    <button 
                      onClick={() => handleSpeakerTalkClick(item.speakerKey)}
                      style={clickableTalkStyle}
                    >
                      {item.talk}
                    </button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td style={tdStyle(isLast)}>{item.time}</td>
                  <td style={tdStyle(isLast)}>{item.talk}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      {selectedSpeakerData && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button style={modalCloseButtonStyle} onClick={closeModal}>&times;</button>
            <img src={selectedSpeakerData.image} alt={selectedSpeakerData.name} style={modalSpeakerImageStyle} />
            <h3 style={{ ...speakerNameStyle, textAlign: 'center', marginBottom: '5px' }}>{selectedSpeakerData.name}</h3>
            <p style={{ ...speakerWorksStyle, textAlign: 'center', fontSize: '1.1em', marginBottom: '15px' }}>{selectedSpeakerData.works}</p>
            <h4 style={{ marginTop: '20px', marginBottom: '8px', color: '#333', fontSize: '1.2em', fontWeight: '600' }}>{selectedSpeakerData.title}</h4>
            <p style={{ fontSize: '1em', lineHeight: '1.6', color: '#4a4a4a' }}>{selectedSpeakerData.abstract}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  datum,
  mainpitch,
  description,
  intro,
  speakers,
}) => {
  const heroImage = getImage(image) || image;
  const descStyle = {
    fontSize: '1.5em',
    fontWeight: '400',
    lineHeight: '1.6',
    textAlign: 'center',
  }
  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} datum={datum} />
      <section className="section section--gradient">
        <div>
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="content">

                    <div className="tile">
                      <h3 className="subtitle" style={descStyle}>{mainpitch.description}</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center' }}>
                        <a id="speakers">{"Invited Speakers"}</a>
                      </h3>
                      
                    </div>
                  </div>
                  <Speakers speakers={speakers} />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2.5rem' }}>
                  <a id="program" href="#program">{"Workshop Program"}</a>
                </h3>
                <TimeSchedule />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ padding: '0px' }}>
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <a id="location" href="#location">{"Location"}</a>
                      </h3>
                      <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.4em' }}>Jugoslávských partyzánů 1580/3, 160 00 Dejvice (exact location will be announced soon)</p>
                      <div className="map-container" style={{ 
                          width: 'calc(100% + 1.5rem)', /* Expand width to cover column padding */
                          marginLeft: '-0.75rem',       /* Offset to the left by column padding */
                          marginRight: '-0.75rem',      /* Offset to the right by column padding */
                          height: '500px', 
                          marginTop: '2rem'             /* Preserve existing margin-top */
                        }}>
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.120683199204!2d14.389829498243165!3d50.10274803892883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f1543cd64f%3A0x86719e9058705de4!2s%C4%8Cesk%C3%BD%20institut%20informatiky%2C%20robotiky%20a%20kybernetiky%2C%20%C4%8CVUT%20v%20Praze%20(CIIRC)!5e0!3m2!1scs!2scz!4v1747607689901!5m2!1scs!2scz"
                          width="100%" 
                          height="100%" 
                          style={{ border: 0, display: 'block' }} /* Add display: 'block' */
                          allowFullScreen="" 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Conference Location"
                        ></iframe>
                      </div>
                    </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center', marginTop: '3rem' }}>
                <a id="participate" href="#participate">{"Participate"}</a>
              </h3>
              <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.4em' }}>
                The workshop is in-person only and free of charge. There are about 50 seats for people who wish to attend the talks. 
                If you are interested in participating, please fill <a href="http://docs.google.com/forms/d/e/1FAIpQLSfWr_5Os_C0q1DML3-vrU_FBc9kPAxNMJ475GGG0O72L7IBmA/viewform">this form</a> or contact us at <a href="mailto:prague.synapse@gmail.com">prague.synapse@gmail.com</a>.
    
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center', marginTop: '3rem' }}>
                <a id="organizers" href="#organizers">{"Organizers"}</a>
              </h3>
              <div
          className="column is-one-quarter-desktop is-one-quarter-tablet"
          style={speakerContainerStyle}
        >
          <img
            src={"/img/speakers/alicja.jpg"} // Expecting path like /img/speakers/alicja.jpg
            alt={"Jan Hula"}
            style={speakerImageStyle}
          />  
          <p style={speakerNameStyle}>{"Jan Hula"}</p>
        </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  datum: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  speakers: PropTypes.array,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        datum={frontmatter.datum}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        speakers={sampleSpeakers}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        datum
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
