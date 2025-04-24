import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const RegistrationPageTemplate = ({
  title,
  content,
  contentComponent,
  registrationOpen,
  registrationUrl,
  ticketTypes,
  helmet,
}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      {helmet || ''}
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <div className="content mb-6">
                <PageContent content={content} />
              </div>

              {registrationOpen ? (
                <div>
                  <div className="ticket-types mb-6">
                    <h2 className="title is-size-3 mb-4">Ticket Types</h2>
                    <div className="columns is-multiline">
                      {ticketTypes.map((ticket, index) => (
                        <div className="column is-4" key={index}>
                          <div className="card">
                            <div className="card-content">
                              <p className="title is-size-4">
                                {ticket.type}
                              </p>
                              <p className="subtitle">
                                {ticket.price}
                              </p>
                              {ticket.description && (
                                <div className="content mt-3 mb-3">
                                  {ticket.description}
                                </div>
                              )}
                              {ticket.availableUntil && (
                                <div className="notification is-warning is-light">
                                  <strong>Available until:</strong> {new Date(ticket.availableUntil).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="register-button has-text-centered">
                    <a 
                      href={registrationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button is-primary is-large"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              ) : (
                <div className="notification is-warning">
                  <h3 className="title is-size-4">Registration is currently closed</h3>
                  <p>Please check back later or contact us for more information.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

RegistrationPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  registrationOpen: PropTypes.bool,
  registrationUrl: PropTypes.string,
  ticketTypes: PropTypes.array,
  helmet: PropTypes.object,
}

const RegistrationPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <RegistrationPageTemplate
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Registration">
            <title>{post.frontmatter.title}</title>
            <meta
              name="description"
              content={`Registration information for the conference`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        content={post.html}
        registrationOpen={post.frontmatter.registrationOpen}
        registrationUrl={post.frontmatter.registrationUrl}
        ticketTypes={post.frontmatter.ticketTypes}
      />
    </Layout>
  )
}

RegistrationPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default RegistrationPage

export const registrationPageQuery = graphql`
  query RegistrationPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        registrationOpen
        registrationUrl
        ticketTypes {
          type
          price
          description
          availableUntil
        }
      }
    }
  }
` 