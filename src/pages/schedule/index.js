import React from 'react'
import Layout from '../../components/Layout'
import { Link, graphql, StaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import { format } from 'date-fns'

class ScheduleIndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: scheduleDays } = data.allMarkdownRemark

    // Sort schedule days by date
    const sortedScheduleDays = [...scheduleDays].sort((a, b) => {
      const dateA = new Date(a.node.frontmatter.date)
      const dateB = new Date(b.node.frontmatter.date)
      return dateA - dateB
    })

    return (
      <Layout>
        <Helmet>
          <title>Schedule | Conference</title>
          <meta
            name="description"
            content="Conference schedule"
          />
        </Helmet>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/img/conference-schedule.jpg')`,
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
            Schedule
          </h1>
        </div>

        <section className="section">
          <div className="container">
            {sortedScheduleDays.length > 0 ? (
              <div>
                <div className="tabs is-centered is-large mb-5">
                  <ul>
                    {sortedScheduleDays.map(({ node }) => (
                      <li key={node.id}>
                        <a href={`#${node.fields.slug}`}>
                          <span>{node.frontmatter.title}</span>
                          <span className="is-hidden-mobile"> - {format(new Date(node.frontmatter.date), 'MMM d')}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {sortedScheduleDays.map(({ node }) => (
                  <div 
                    key={node.id}
                    id={node.fields.slug.replace(/\//g, '')}
                    className="schedule-day-preview mb-6"
                  >
                    <div className="card">
                      <header className="card-header">
                        <p className="card-header-title is-centered is-size-3">
                          {node.frontmatter.title} - {format(new Date(node.frontmatter.date), 'EEEE, MMMM do, yyyy')}
                        </p>
                      </header>
                      <div className="card-content">
                        <div className="content">
                          <div className="schedule-preview">
                            {node.frontmatter.sessions.slice(0, 3).map((session, index) => (
                              <div className={`schedule-item ${session.type || 'talk'}`} key={index}>
                                <div className="schedule-time">
                                  <span className="time">{session.timeStart} - {session.timeEnd}</span>
                                </div>
                                <div className="schedule-card">
                                  <div className="schedule-content">
                                    <h3 className="title is-size-5">{session.title}</h3>
                                    {session.speaker && (
                                      <h4 className="subtitle is-size-6">{session.speaker}</h4>
                                    )}
                                    {session.location && (
                                      <div className="location">
                                        <i className="fas fa-map-marker-alt mr-2"></i>
                                        {session.location}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}

                            {node.frontmatter.sessions.length > 3 && (
                              <div className="has-text-centered mt-4">
                                <p>... and {node.frontmatter.sessions.length - 3} more sessions</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <footer className="card-footer">
                        <Link to={node.fields.slug} className="card-footer-item">
                          View Full Schedule for {node.frontmatter.title}
                        </Link>
                      </footer>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="content has-text-centered">
                <p>Schedule will be announced soon!</p>
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
      query ScheduleIndexPageQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "schedule-day" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                date
                sessions {
                  timeStart
                  timeEnd
                  title
                  speaker
                  location
                  type
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <ScheduleIndexPage data={data} />}
  />
) 