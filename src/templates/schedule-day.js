import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { format } from 'date-fns'

export const ScheduleDayTemplate = ({
  title,
  date,
  sessions,
  helmet,
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <h3 className="subtitle">
              {format(new Date(date), 'EEEE, MMMM do, yyyy')}
            </h3>
            
            <div className="schedule-timeline mt-6">
              {sessions.map((session, index) => (
                <div 
                  className={`schedule-item ${session.type || 'talk'}`} 
                  key={index}
                >
                  <div className="schedule-time">
                    <span className="time">{session.timeStart} - {session.timeEnd}</span>
                  </div>
                  <div className="schedule-card">
                    <div className="schedule-content">
                      <h3 className="title is-size-4">{session.title}</h3>
                      {session.speaker && (
                        <h4 className="subtitle is-size-5">{session.speaker}</h4>
                      )}
                      {session.location && (
                        <div className="location">
                          <i className="fas fa-map-marker-alt mr-2"></i>
                          {session.location}
                        </div>
                      )}
                      {session.description && (
                        <div className="description mt-3">
                          {session.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

ScheduleDayTemplate.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  sessions: PropTypes.array,
  helmet: PropTypes.object,
}

const ScheduleDay = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ScheduleDayTemplate
        helmet={
          <Helmet titleTemplate="%s | Schedule">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`Conference schedule for ${post.frontmatter.title}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        sessions={post.frontmatter.sessions}
      />
    </Layout>
  )
}

ScheduleDay.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ScheduleDay

export const pageQuery = graphql`
  query ScheduleDayByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        date
        sessions {
          timeStart
          timeEnd
          title
          speaker
          description
          location
          type
        }
      }
    }
  }
` 