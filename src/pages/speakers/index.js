import React from 'react'
import Layout from '../../components/Layout'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from '../../components/PreviewCompatibleImage'
import { Helmet } from 'react-helmet'

const SpeakerCard = ({ speaker }) => {
  return (
    <div className="column is-4 is-3-widescreen">
      <Link to={speaker.fields.slug} className="speaker-card">
        <div className="card">
          <div className="card-image">
            {speaker.frontmatter.speakerImage ? (
              <div className="featured-thumbnail">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: speaker.frontmatter.speakerImage,
                    alt: `Profile picture of ${speaker.frontmatter.name}`,
                  }}
                  style={{ borderRadius: '5px 5px 0 0' }}
                />
              </div>
            ) : null}
          </div>
          <div className="card-content">
            <div className="content">
              <h3 className="has-text-weight-bold is-size-4 mb-1">
                {speaker.frontmatter.name}
              </h3>
              <p className="is-size-6">
                {speaker.frontmatter.position} at {speaker.frontmatter.organization}
              </p>
              <h4 className="is-size-5 mt-3 mb-0 has-text-primary">
                {speaker.frontmatter.talkTitle}
              </h4>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

class SpeakersIndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: speakers } = data.allMarkdownRemark

    // Sort speakers by order, then by name
    const sortedSpeakers = [...speakers].sort((a, b) => {
      // Sort by order first
      const orderA = a.node.frontmatter.order || 999
      const orderB = b.node.frontmatter.order || 999

      if (orderA !== orderB) {
        return orderA - orderB
      }

      // Then by name
      return a.node.frontmatter.name.localeCompare(b.node.frontmatter.name)
    })

    // Separate featured and non-featured speakers
    const featuredSpeakers = sortedSpeakers.filter(
      (speaker) => speaker.node.frontmatter.featured
    )
    const regularSpeakers = sortedSpeakers.filter(
      (speaker) => !speaker.node.frontmatter.featured
    )

    return (
      <Layout>
        <Helmet>
          <title>Speakers | Conference</title>
          <meta
            name="description"
            content="Meet our conference speakers"
          />
        </Helmet>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/img/conference-audience.jpg')`,
            backgroundPosition: `center center`,
            backgroundSize: `cover`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              padding: '1rem',
            }}
          >
            Speakers
          </h1>
        </div>

        <section className="section">
          <div className="container">
            {featuredSpeakers.length > 0 && (
              <div className="featured-speakers mb-6">
                <h2 className="title is-size-3 has-text-centered mb-5">Keynote Speakers</h2>
                <div className="columns is-multiline">
                  {featuredSpeakers.map(({ node }) => (
                    <SpeakerCard key={node.id} speaker={node} />
                  ))}
                </div>
              </div>
            )}

            {regularSpeakers.length > 0 && (
              <div className="regular-speakers">
                <h2 className="title is-size-3 has-text-centered mb-5">Speakers</h2>
                <div className="columns is-multiline">
                  {regularSpeakers.map(({ node }) => (
                    <SpeakerCard key={node.id} speaker={node} />
                  ))}
                </div>
              </div>
            )}

            {speakers.length === 0 && (
              <div className="content has-text-centered">
                <p>Speakers will be announced soon!</p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query SpeakersPageQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "speaker-profile" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                name
                position
                organization
                talkTitle
                featured
                order
                speakerImage {
                  childImageSharp {
                    gatsbyImageData(
                      width: 400
                      height: 300
                      quality: 100
                      layout: CONSTRAINED
                    )
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <SpeakersIndexPage data={data} />}
  />
) 