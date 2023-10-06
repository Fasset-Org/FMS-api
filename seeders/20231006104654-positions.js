"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert({ schema: "wms", tableName: "positions" }, [
      {
        id: "b19e3259-fa74-4e93-b886-8744b80b9a05",
        jobTitle: "Executive Manager Office of the CEO",
        purposeOfJob:
          "To oversee effective and efficient functioning of the CEO’s office, Quality Assurance, Legal Services\r\nand Audit, Risk & Compliance Departments. Ensure organisational strategies are met through\r\ncontinuous monitoring and submission of accurate and timeous information on organisational\r\nperformance management",
        departmentId: "4cd58ee8-b526-4286-81a8-0aecbfebc614",
        reportingTo: "CEO",
        remuneration: " 1 518 441",
        emailForQueries: "kamzen1994@gmail.com",
        applicationsEmail: "kamzen1994@gmail.com",
        closingDate: "2023-10-31T16:00:00+02:00",
        jobSpecDocumentName: "EM-Advert 25_07_2023.pdf",
        createdAt: "2023-09-19T09:52:49.606+02:00",
        updatedAt: "2023-10-04T09:10:10.379+02:00"
      },
      {
        id: "9889a091-5ffa-4d63-bc0f-0644f93bdd0d",
        jobTitle: "Finance Administrators X2",
        purposeOfJob:
          "To offer financial administration related to finance queries, budget, payroll, reporting and project\r\naccounting.",
        departmentId: "4cd58ee8-b526-4286-81a8-0aecbfebc614",
        reportingTo: "Finance Manager",
        remuneration: "325,789.53",
        emailForQueries: "kamzen1994@gmail.com",
        applicationsEmail: "themba.makamu@smu.ac.za",
        closingDate: "2023-10-31T16:00:00+02:00",
        jobSpecDocumentName:
          "StaffRequisition (449) - Advertisement 20230911 1608 (4).pdf",
        createdAt: "2023-09-19T09:31:56.403+02:00",
        updatedAt: "2023-10-05T10:54:12.499+02:00"
      },
      {
        id: "a70b1e56-bb2a-461d-adc8-431bf990bfba",
        jobTitle: "Programme Manager",
        purposeOfJob:
          "The primary purpose of this position is to fulfill the organizational objectives in managing the\r\noperations of the discretionary projects and quality assurance functions of FASSET. To also provide\r\nsupport to Chief Operations Officer and PQA Department. The incumbent will be responsible for\r\nimplementing mandatory and discretionary projects and assessing, monitoring, and evaluating\r\nprojects that are funded by FASSET. Oversee and manage the staff within the PQA department. The\r\nincumbent will also oversee and supervise quality assurance duties against pre-accreditation\r\nprocesses; monitor allocated FASSET projects budgets; monthly reporting on the implementation of\r\nthe projects and approved as part of the service level agreement (SLA) with the Department of Higher\r\nEducation and Training (DHET).",
        departmentId: "4cd58ee8-b526-4286-81a8-0aecbfebc614",
        reportingTo: "Chief Operations Officer",
        remuneration: "R 992 052",
        emailForQueries: "kamzen1994@gmail.com",
        applicationsEmail: "kamzen1994@gmail.com",
        closingDate: "2023-10-31T00:00:00+02:00",
        jobSpecDocumentName: "Advert_Programme Manager_19 Sep-23 (1).pdf",
        createdAt: "2023-10-05T11:11:12.276+02:00",
        updatedAt: "2023-10-05T11:11:12.276+02:00"
      },
      {
        id: "6b024e96-4e1c-4c8f-9902-673af6fc00c4",
        jobTitle: "Projects Administrators X2",
        purposeOfJob:
          "The primary purpose of this position is to provide administrative and project support to the\r\nProjects Department including project management and coordination.\r\n",
        departmentId: "4e0d2466-4bfa-4523-8582-f954ee300554",
        reportingTo: "PQA Manager",
        remuneration: "325000",
        emailForQueries: "kamzen1994@gmail.com",
        applicationsEmail: "kamzen1994@gmail.com",
        closingDate: "2023-10-31T00:00:00+02:00",
        jobSpecDocumentName:
          "Advert_Projects Administrator X2 WC-KZN_19 Sep-233 (1).pdf",
        createdAt: "2023-10-05T11:27:52.893+02:00",
        updatedAt: "2023-10-05T11:27:52.893+02:00"
      },
      {
        id: "1cea7fd8-9741-4306-b789-263da540574c",
        jobTitle: "Public Relations Specialist",
        purposeOfJob:
          "The primary purpose of this position is planning publicity strategies and campaigns. Writing and\r\nproducing presentations, articles, press releases and social media posts. Designing or project\r\nmanaging the production of visual communications and digital content. Dealing with enquiries from\r\nthe public, the press and related organisations.",
        departmentId: "4e0d2466-4bfa-4523-8582-f954ee300554",
        reportingTo: "PQA Manager",
        remuneration: "325000",
        emailForQueries: "kamzen1994@gmail.com",
        applicationsEmail: "kamzen1994@gmail.com",
        closingDate: "2023-10-31T00:00:00+02:00",
        jobSpecDocumentName: "PR Specialist_19 Sep-2023 (1).pdf",
        createdAt: "2023-10-05T11:30:20.403+02:00",
        updatedAt: "2023-10-05T11:30:20.403+02:00"
      },
      {
        id: "1c84c8d6-2f20-4e99-b3fc-4fd94d9a1b89",
        jobTitle: "Quality Assurance Specialist",
        purposeOfJob:
          "To provide a professional, efficient, and effective quality assurance function and service on FASSET\r\nprojects.",
        departmentId: "4cd58ee8-b526-4286-81a8-0aecbfebc614",
        reportingTo: "PQA Manager",
        remuneration: "325000",
        emailForQueries: "kamzen1994@gmail.com",
        applicationsEmail: "kamzen1994@gmail.com",
        closingDate: "2023-10-31T00:00:00+02:00",
        jobSpecDocumentName: "Quality_Assurance _Specialist_19-Sep-2023.pdf",
        createdAt: "2023-10-05T11:31:39.538+02:00",
        updatedAt: "2023-10-05T11:31:39.538+02:00"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
