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

    await queryInterface.bulkInsert(
      { schema: "wms", tableName: "applications" },
      [
        {
          id: "f97cfc92-c2fb-47e8-9c23-0df08a1b4b9c",
          fullname: "Tiyisela Themba",
          email: "Themba.Makamu@fasset.org.za",
          nationality: "South Africa",
          idNumber: "9804046210080",
          gender: "Male",
          cellphone: "0797126016",
          idDocumentName: "Advert-SCM Manager 19-09-2023 (1) (1).pdf",
          resumeDocumentName: "EM-Advert 25_07_2023 (1).pdf",
          matricDocumentName: "Exexcutive Manager-Re-Advert-19-09-2023 (1).pdf",
          qualificationDocumentName: "Polo (1).pdf",
          status: "shortlisted",
          rejectReason: null,
          positionId: "b19e3259-fa74-4e93-b886-8744b80b9a05",
          createdAt: "2023-09-27T21:36:26.741+02:00",
          updatedAt: "2023-09-28T11:01:18.236+02:00"
        },
        {
          id: "fc8f346e-4261-4475-9084-4850ca26be19",
          fullname: "Kateko Makamu",
          email: "kamzen1994@gmail.com",
          nationality: "South Africa",
          idNumber: "0103011538081",
          gender: "Male",
          cellphone: "0797126016",
          idDocumentName: "Research Specialist-19-09-2023 (2).pdf",
          resumeDocumentName: "Research Specialist-19-09-2023 (2).pdf",
          matricDocumentName: "Research Specialist-19-09-2023 (2).pdf",
          qualificationDocumentName: "Research Specialist-19-09-2023 (2).pdf",
          status: "rejected",
          rejectReason: null,
          positionId: "b19e3259-fa74-4e93-b886-8744b80b9a05",
          createdAt: "2023-09-27T09:46:57.967+02:00",
          updatedAt: "2023-09-27T20:39:32.684+02:00"
        },
        {
          id: "4e0552ed-1ccb-45ec-a80b-ae5bb1864bb3",
          fullname: "Tiyisela Themba",
          email: "themba.makamu@smu.ac.za",
          nationality: "South Africa",
          idNumber: "9804046210080",
          gender: "Male",
          cellphone: "0797126016",
          idDocumentName: "Research Specialist-19-09-2023 (1).pdf",
          resumeDocumentName: "Research Specialist-19-09-2023 (1).pdf",
          matricDocumentName: "Research Specialist-19-09-2023 (1).pdf",
          qualificationDocumentName: "Research Specialist-19-09-2023 (1).pdf",
          status: "submitted",
          rejectReason: null,
          positionId: "b19e3259-fa74-4e93-b886-8744b80b9a05",
          createdAt: "2023-09-19T17:42:29.169+02:00",
          updatedAt: "2023-09-27T19:48:37.361+02:00"
        },
        {
          id: "f5e17c45-8b41-4b1e-aeb9-57c95b5919d9",
          fullname: "Thato Modise",
          email: "Thato.Modise@fasset.org.za",
          nationality: "South Africa",
          idNumber: "9804046210080",
          gender: "Male",
          cellphone: "+27797126016",
          idDocumentName: "Research Specialist-19-09-2023 (2).pdf",
          resumeDocumentName: "PR Specialist_19 Sep-2023.pdf",
          matricDocumentName: "Research Specialist-19-09-2023 (2).pdf",
          qualificationDocumentName: "Research Specialist-19-09-2023 (2).pdf",
          status: "submitted",
          rejectReason: null,
          positionId: "b19e3259-fa74-4e93-b886-8744b80b9a05",
          createdAt: "2023-09-27T13:37:33.247+02:00",
          updatedAt: "2023-09-27T22:36:51.618+02:00"
        },
        {
          id: "8781d621-b269-4db9-af03-00bc4d175ddd",
          fullname: "Sandi Silivane",
          email: "Sandi.Silevana@fasset.org.za",
          nationality: "South Africa",
          idNumber: "9804046210080",
          gender: "Male",
          cellphone: "0797126016",
          idDocumentName: "Polo.pdf",
          resumeDocumentName: "Advert-SCM Manager 19-09-2023 (1).pdf",
          matricDocumentName: "Exexcutive Manager-Re-Advert-19-09-2023.pdf",
          qualificationDocumentName: "EM-Advert 25_07_2023.pdf",
          status: "shortlisted",
          rejectReason: null,
          positionId: "b19e3259-fa74-4e93-b886-8744b80b9a05",
          createdAt: "2023-09-21T10:04:32.458+02:00",
          updatedAt: "2023-09-27T22:37:00.262+02:00"
        }
      ]
    );
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
