import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const VenuePageTemplate = ({
  title,
  venueName,
  venueAddress,
  venueImage,
  googleMapsUrl,
  content,
  contentComponent,
  accommodations,
  transportation,
  helmet,
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="content">
      <section className="section section--gradient">
        {helmet || ''}
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  {title}
                </h1>
                
                <div className="venue-info mb-6">
                  <div className="columns">
                    <div className="column is-6">
                      <h2 className="title is-size-3">{venueName}</h2>
                      <p className="venue-address">{venueAddress}</p>
                      <div className="venue-description mt-4">
                        <PageContent content={content} />
                      </div>
                    </div>
                    <div className="column is-6">
                      {venueImage && (
                        <div className="featured-thumbnail">
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: venueImage,
                              alt: `Image of ${venueName}`,
                            }}
                            style={{ borderRadius: '5px' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {googleMapsUrl && (
                  <div className="google-maps mb-6">
                    <h3 className="title is-size-4">Location</h3>
                    <div className="maps-container" style={{ height: '400px' }}>
                      <iframe
                        title="Venue Location"
                        src={googleMapsUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                )}

                {accommodations && accommodations.length > 0 && (
                  <div className="accommodations mb-6">
                    <h3 className="title is-size-4">Nearby Accommodations</h3>
                    <div className="columns is-multiline">
                      {accommodations.map((hotel, index) => (
                        <div className="column is-6" key={index}>
                          <div className="card">
                            <div className="card-content">
                              <h4 className="title is-size-5">{hotel.hotelName}</h4>
                              <p>{hotel.hotelAddress}</p>
                              {hotel.hotelDescription && (
                                <p className="mt-3">{hotel.hotelDescription}</p>
                              )}
                              {hotel.specialRate && (
                                <div className="notification is-info mt-3">
                                  <strong>Special Rate:</strong> {hotel.specialRate}
                                </div>
                              )}
                              <a
                                href={hotel.hotelWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button is-primary is-outlined mt-4"
                              >
                                Visit Website
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {transportation && (
                  <div className="transportation">
                    <h3 className="title is-size-4">Transportation</h3>
                    <PageContent content={transportation} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

VenuePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  venueName: PropTypes.string,
  venueAddress: PropTypes.string,
  venueImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  accommodations: PropTypes.array,
  transportation: PropTypes.string,
  googleMapsUrl: PropTypes.string,
  helmet: PropTypes.object,
}

const VenuePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <VenuePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        venueName={post.frontmatter.venueName}
        venueAddress={post.frontmatter.venueAddress}
        venueImage={post.frontmatter.venueImage}
        content={post.html}
        accommodations={post.frontmatter.accommodations}
        transportation={post.frontmatter.transportation}
        googleMapsUrl={post.frontmatter.googleMapsUrl}
        helmet={
          <Helmet titleTemplate="%s | Venue">
            <title>{post.frontmatter.title}</title>
            <meta name="description" content={`Conference venue information: ${post.frontmatter.venueName}`} />
          </Helmet>
        }
      />
    </Layout>
  )
}

VenuePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default VenuePage

export const venuePageQuery = graphql`
  query VenuePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        venueName
        venueAddress
        venueImage {
          childImageSharp {
            gatsbyImageData(
              width: 600
              quality: 100
              layout: CONSTRAINED
            )
          }
        }
        googleMapsUrl
        accommodations {
          hotelName
          hotelAddress
          hotelWebsite
          hotelDescription
          specialRate
        }
        transportation
      }
    }
  }
` 