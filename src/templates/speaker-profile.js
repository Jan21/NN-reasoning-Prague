import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const SpeakerProfileTemplate = ({
  content,
  contentComponent,
  name,
  position,
  organization,
  speakerImage,
  talkTitle,
  talkAbstract,
  socialLinks,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="speaker-profile">
              <div className="columns">
                <div className="column is-4">
                  {speakerImage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: speakerImage,
                          alt: `Profile picture of ${name}`,
                        }}
                        style={{ borderRadius: '5px' }}
                      />
                    </div>
                  ) : null}
                  <h1 className="title is-size-2 has-text-weight-bold mt-4">
                    {name}
                  </h1>
                  <h3 className="subtitle">
                    {position} at {organization}
                  </h3>
                  {socialLinks && (
                    <div className="social-links">
                      {socialLinks.twitter && (
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-icon mr-2">
                          <i className="fab fa-twitter fa-lg"></i>
                        </a>
                      )}
                      {socialLinks.linkedin && (
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon mr-2">
                          <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                      )}
                      {socialLinks.website && (
                        <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-icon mr-2">
                          <i className="fas fa-globe fa-lg"></i>
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="column is-8">
                  <div className="speaker-bio mb-5">
                    <h2 className="title is-size-4">About</h2>
                    <PostContent content={content} />
                  </div>
                  <div className="speaker-talk">
                    <h2 className="title is-size-4">Talk</h2>
                    <h3 className="title is-size-5">{talkTitle}</h3>
                    <div className="talk-abstract">
                      <PostContent content={talkAbstract} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/speakers" className="button is-primary">
                Back to All Speakers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

SpeakerProfileTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  name: PropTypes.string,
  position: PropTypes.string,
  organization: PropTypes.string,
  speakerImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  talkTitle: PropTypes.string,
  talkAbstract: PropTypes.string,
  socialLinks: PropTypes.object,
  helmet: PropTypes.object,
}

const SpeakerProfile = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SpeakerProfileTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Speaker">
            <title>{`${post.frontmatter.name}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.name} - ${post.frontmatter.talkTitle}`}
            />
          </Helmet>
        }
        name={post.frontmatter.name}
        position={post.frontmatter.position}
        organization={post.frontmatter.organization}
        speakerImage={post.frontmatter.speakerImage}
        talkTitle={post.frontmatter.talkTitle}
        talkAbstract={post.frontmatter.talkAbstract}
        socialLinks={post.frontmatter.socialLinks}
      />
    </Layout>
  )
}

SpeakerProfile.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default SpeakerProfile

export const pageQuery = graphql`
  query SpeakerProfileByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        position
        organization
        speakerImage {
          childImageSharp {
            gatsbyImageData(
              width: 400
              quality: 100
              layout: CONSTRAINED
            )
          }
        }
        talkTitle
        talkAbstract
        socialLinks {
          twitter
          linkedin
          website
        }
      }
    }
  }
` 