const db = require("../connection");


  const getOrganizations = () => {
    return db
      .query(
        `SELECT 
        o.name AS "Organization name",
        o.website AS "Website",
        o.category AS "Category",
        COUNT(CASE WHEN i.urgency_level = 'Urgent' THEN 1 END) AS "Number of urgent requests",
        COUNT(CASE WHEN i.status = 'Active' THEN 1 END) AS "Number of active requests",
        CONCAT(
          o.street_number, ' ', o.street_name,
          CASE WHEN o.unit IS NOT NULL THEN CONCAT(', ', o.unit) ELSE '' END,
          ', ', o.city, ', ', o.province, ', ', o.country, ', ', o.postal_code
      ) AS "Address",
        o.description AS "Bio"
    FROM organizations o
    LEFT JOIN projects p ON o.id = p.org_id
    LEFT JOIN items i ON p.id = i.project_id
    GROUP BY
        o.name,
        o.website,
        o.category,
        o.street_number,
        o.street_name,
        o.unit,
        o.city,
        o.province,
        o.country,
        o.postal_code,
        o.description;
    ;`
      )
      .then((data) => {
        return data.rows;
      });
  };

  const getOrganizationById = (id) => {
    return db
      .query(
        `SELECT 
        o.name AS "Organization name",
        o.website AS "Website",
        o.category AS "Category",
        COUNT(CASE WHEN i.urgency_level = 'Urgent' THEN 1 END) AS "Number of urgent requests",
        COUNT(CASE WHEN i.status = 'Active' THEN 1 END) AS "Number of active requests",
        CONCAT(
          o.street_number, ' ', o.street_name,
          CASE WHEN o.unit IS NOT NULL THEN CONCAT(', ', o.unit) ELSE '' END,
          ', ', o.city, ', ', o.province, ', ', o.country, ', ', o.postal_code
      ) AS "Address",
        o.description AS "Bio"
    FROM organizations o
    LEFT JOIN projects p ON o.id = p.org_id
    LEFT JOIN items i ON p.id = i.project_id
    WHERE o.id = $1
    GROUP BY
        o.name,
        o.website,
        o.category,
        o.street_number,
        o.street_name,
        o.unit,
        o.city,
        o.province,
        o.country,
        o.postal_code,
        o.description;
    ;`,
        [id]
      )
      .then((data) => {
        return data.rows;
      });
  }


  const addOrganization = (organization) => {
    const {
      name,
      description,
      street_number,
      street_name,
      unit,
      city,
      province,
      country,
      postal_code,
      email,
      phone,
      category,
      website,
    } = organization;

    return db
    .query(
      `INSERT INTO organizations (name, description, street_number, street_name, unit, city, province, country, postal_code, email, phone, category, website)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 , $12, $13)
      RETURNING *;`,
      [
        name,
        description,
        street_number,
        street_name,
        unit,
        city,
        province,
        country,
        postal_code,
        email,
        phone,
        category,
        website,
      ]
    )
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log("Error registering organization:", err);
    });
  }

  
  module.exports = { getOrganizations, getOrganizationById, addOrganization };