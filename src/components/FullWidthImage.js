import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

export default function FullWidthImage(props) {
  const {
    height = 900,
    img,
    title,
    subheading,
    datum,
    imgPosition = "center left",
  } = props;

  return (
    <React.Fragment>
      <div
        className="margin-top-0"
        style={{
          display: "grid",
          alignItems: "center",
        }}
      >
        {img?.url ? (
          <img
            src={img}
            objectFit={"cover"}
            objectPosition={imgPosition}
            style={{
              gridArea: "1/1",
              // You can set a maximum height for the image, if you wish.
              height: height,
              width: "100%",
            }}
            // This is a presentational image, so the alt should be an empty string
            alt=""
          />
        ) : (
          <GatsbyImage
            image={img}
            objectFit={"cover"}
            objectPosition={imgPosition}
            style={{
              gridArea: "1/1",
              // You can set a maximum height for the image, if you wish.
              maxHeight: height,
            }}
            layout="fullWidth"
            // You can optionally force an aspect ratio for the generated image
            aspectratio={3 / 1}
            // This is a presentational image, so the alt should be an empty string
            alt=""
            formats={["auto", "webp", "avif"]}
          />
        )}
        {(title || subheading) && (
          <div
            style={{
              // By using the same grid area for both, they are stacked on top of each other
              gridArea: "1/1",
              position: "relative",
              // This centers the other elements inside the hero component
              placeItems: "center",
              display: "grid",
              
            }}
          >
            {/* Any content here will be centered in the component */}
            {title && (
              <h1
                className="is-size-2-mobile is-size-1-tablet is-size-1-widescreen"
                style={{
                  boxShadow:
                    "rgb(255, 255, 255) 0.5rem 0px 0px, rgb(255, 255, 255) -0.5rem 0px 0px",
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgb(214, 56, 16)",
                  lineHeight: "1",
                  padding: "17px",
                  marginLeft: "25px",
                  marginRight: "25px",
                  textAlign: "center",
                }}
              >
                {title}
              </h1>
            )}
            {subheading && (
              <h3
                className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-1-widescreen"
                style={{
                  boxShadow:
                    "rgb(255, 255, 255) 0.5rem 0px 0px, rgb(255, 255, 255) -0.5rem 0px 0px",
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgb(82, 82, 82)",
                  lineHeight: "1",
                  padding: "17px",
                  marginTop: "0.5rem",
                  marginLeft: "25px",
                  marginRight: "25px",
                  textAlign: "center",
                }}
              >
                {subheading}
              </h3> 
            )}
            {datum && (
              <h3
                className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-1-widescreen"
                style={{
                  boxShadow:
                    "rgb(255, 255, 255) 0.5rem 0px 0px, rgb(255, 255, 255) -0.5rem 0px 0px",
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgb(82, 82, 82)",
                  lineHeight: "1",
                  padding: "17px",
                  marginLeft: "25px",
                  marginRight: "25px",
                  textAlign: "center",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                {datum}
              </h3>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

FullWidthImage.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  height: PropTypes.number,
  subheading: PropTypes.string,
};
