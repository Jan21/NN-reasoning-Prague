import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { format } from 'date-fns'

export const CFPPageTemplate = ({
  title,
  content,
  contentComponent,
  cfpOpen,
  cfpDeadline,
  cfpUrl,
  submissionGuidelines,
  importantDates,
  helmet,
}) => {
  const PageContent = contentComponent || Content
  const DeadlineDate = new Date(cfpDeadline)

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
              
              <div className="cfp-status mb-5">
                {cfpOpen ? (
                  <div className="notification is-success">
                    <p className="is-size-4">
                      Call for Papers is open until {format(DeadlineDate, 'MMMM do, yyyy')}
                    </p>
                    <p className="mt-2">
                      Submit your proposal now to be considered for our program!
                    </p>
                  </div>
                ) : (
                  <div className="notification is-warning">
                    <p className="is-size-4">
                      Call for Papers is currently closed
                    </p>
                    <p className="mt-2">
                      Thank you for your interest. Please check back next year for the next edition of our conference.
                    </p>
                  </div>
                )}
              </div>

              <div className="content mb-6">
                <PageContent content={content} />
              </div>

              {importantDates && importantDates.length > 0 && (
                <div className="important-dates mb-6">
                  <h2 className="title is-size-3">Important Dates</h2>
                  <div className="timeline">
                    {importantDates.map((dateItem, index) => (
                      <div className="timeline-item" key={index}>
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <p className="heading">
                            {format(new Date(dateItem.date), 'MMMM do, yyyy')}
                          </p>
                          <p className="title is-5">{dateItem.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {submissionGuidelines && (
                <div className="submission-guidelines mb-6">
                  <h2 className="title is-size-3">Submission Guidelines</h2>
                  <div className="content">
                    <PageContent content={submissionGuidelines} />
                  </div>
                </div>
              )}

              {cfpOpen && cfpUrl && (
                <div className="submit-cfp has-text-centered">
                  <a 
                    href={cfpUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button is-primary is-large"
                  >
                    Submit Your Proposal
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

CFPPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  cfpOpen: PropTypes.bool,
  cfpDeadline: PropTypes.string,
  cfpUrl: PropTypes.string,
  submissionGuidelines: PropTypes.string,
  importantDates: PropTypes.array,
  helmet: PropTypes.object,
}

const CFPPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <CFPPageTemplate
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Call for Papers">
            <title>{post.frontmatter.title}</title>
            <meta
              name="description"
              content={`Call for Papers information for the conference`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        content={post.html}
        cfpOpen={post.frontmatter.cfpOpen}
        cfpDeadline={post.frontmatter.cfpDeadline}
        cfpUrl={post.frontmatter.cfpUrl}
        submissionGuidelines={post.frontmatter.submissionGuidelines}
        importantDates={post.frontmatter.importantDates}
      />
    </Layout>
  )
}

CFPPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default CFPPage

export const cfpPageQuery = graphql`
  query CFPPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        cfpOpen
        cfpDeadline
        cfpUrl
        submissionGuidelines
        importantDates {
          title
          date
        }
      }
    }
  }
` 