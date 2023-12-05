import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/banner.css";

export function OrganizationListItem({ org }) {
  const profilePath = `/profile/${org.id}`;

  const [isHovered, setIsHovered] = useState(false);

  const getCategoryImage = (category) => {
    return require(`../../src/assets/${imageCategories[category] || imageCategories['default']}.png`);
  };

  const customBorderStyle = {
    padding: "1rem",
    marginBottom: "2rem",
    borderRadius: "10px",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    width: "90%"
  };

  const imageCategories = {
    'default': 'icon',
    'Animal Welfare': 'animal-welfare',
    'Arts & Culture': 'arts-and-culture',
    'Elderly Care': 'elderly-care',
    'Environmental': 'environmental',
    'Education': 'education',
    'Food Security': 'food-security',
    'Healthcare': 'healthcare',
    'Housing': 'housing',
    'LGBTQ+': 'lgbtq',
    'Mental Health': 'mental-health',
    'Religion & Faith': 'religious'
  };

  const activeRequestsStyle = {
    color: "rgb(120, 156, 115)",
  };

  const urgentRequestsStyle = {
    color: "rgb(184, 79, 79)",
  };

  const websiteStyle = {
    color: "black",
    fontWeight: 500, 
    fontStyle: "italic",
  };

  const addressStyle = {
    color: "black",
    fontWeight: 500, 
    fontStyle: "italic",
  };
  
  return (
    <Card className="h-100 shadow-lg position-relative w-85 mx-auto" style={customBorderStyle} onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      {/* <Card.Header className='d-flex flex-row' style={{ background: 'linear-gradient(90deg, rgba(243,229,206,1) 0%, rgba(207,218,164,1) 35%, rgba(170,205,170,1) 67%)', backgroundSize: 'cover', height: '150px', position: 'relative' }}>
      </Card.Header> */}
      <Card.Body className="d-flex flex-column">
        <div>
          <div className=" d-flex align-items-center" style={{padding: "0.5rem"}}>
            <img src={getCategoryImage(org.category)} className="icon" alt="icon" />
          <Card.Title>{org.name}</Card.Title>
          </div>
          <Card.Subtitle className="mb-2 text-muted">
            {org.category}
          </Card.Subtitle>

          <Card.Text>
            {org.urgent_requests >= 1 ?
              <>
                <FontAwesomeIcon
                icon={faExclamationCircle}
                className="fa-light fa-circle-exclamation fa-fade fa-xs mr-1 text-danger"
                />
                <strong style={urgentRequestsStyle}>
                  {" "}
                  {org.urgent_requests} urgent requests
                </strong>
                <br />
              </>
              :
              <></>
            }
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              style={{ marginRight: "10px", color: "rgb(120, 156, 115)" }}
            />
            <strong style={activeRequestsStyle}>
              {org.active_requests} active requests
            </strong>
          </Card.Text>

          <Card.Text>
            <span className="text-muted"><i style={websiteStyle}>Website: </i> <br/>{org.website}</span>
            <br />
            <span className="text-muted"><i style={addressStyle}>Address: </i> <br/>{org.address}</span>
          </Card.Text>
          <Card.Text>{org.bio}</Card.Text>
        </div>
        {/* TODO: hook up profile path */}
        <Link
          to={profilePath}
          className="btn btn-link position-absolute bottom-0 end-0 m-1"
          style={{ padding: "1rem" }}
        >
          Visit profile
        </Link>
      </Card.Body>
    </Card>
  );
}
