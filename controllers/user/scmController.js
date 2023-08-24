const { ApiError, ApiResponse } = require("../../utils/response");
const { Tender } = require("../../models");
const { Op } = require("sequelize");

const SCMController = {
  addTender: async (req, res, next) => {
    try {
      const tenderDocument = req?.files?.tenderDocument;

      if (!tenderDocument) throw new ApiError("Error saving tender", 400);

      const save = tenderDocument.mv(
        `${process.env.TENDER_DOCUMENT_FOLDER}/${tenderDocument.name}`
      );

      if (!save) throw new ApiError("Error saving tender", 400);

      let bidders = req.body.bidders;

      if (bidders.length === 0) bidders = [];
      else bidders = JSON.parse(bidders);

      await Tender.create({
        ...req.body,
        tenderDocument: tenderDocument.name,
        bidders: bidders
      });

      return res.status(201).json(ApiResponse("Tender created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editSCMTender: async (req, res, next) => {
    try {
      const { tenderId } = req.body;

      const tender = await Tender.findOne({ where: { id: tenderId } });

      if (!tender) throw new ApiError("Error updating tender", 404);

      let bidders = req.body.bidders;

      if (bidders.length === 0) bidders = [];
      else bidders = JSON.parse(bidders);

      const tenderDocument = req?.files?.tenderDocument;
      let fileName = "";

      if (tenderDocument) {
        const save = tenderDocument.mv(
          `${process.env.TENDER_DOCUMENT_FOLDER}/${tenderDocument.name}`
        );
        if (!save) throw new ApiError("Error saving tender", 400);
        fileName = tenderDocument.name;
      } else {
        fileName = tender.tenderDocument;
      }

      await tender.update({
        ...req.body,
        bidders: bidders,
        tenderDocument: fileName
      });

      return res.status(200).json(ApiResponse("Tender updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deActivateTender: async (req, res, next) => {
    try {
      const { tenderId } = req.params;

      const tender = await Tender.findOne({ where: { id: tenderId } });

      if (!tender) throw new ApiError("Error deleting tender", 404);

      await tender.update({ closingDate: new Date() });

      return res.status(200).json(ApiResponse("Tender deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllCurrentTenders: async (req, res, next) => {
    try {
      const currentTenders = await Tender.findAll({
        where: { closingDate: { [Op.gte]: new Date() } }
      });

      return res
        .status(200)
        .json(
          ApiResponse(
            "Current tenders fetched",
            "currentTenders",
            currentTenders
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllPreviousTenders: async (req, res, next) => {
    try {
      const previousTenders = await Tender.findAll({
        where: { closingDate: { [Op.lte]: new Date() } }
      });

      return res
        .status(200)
        .json(
          ApiResponse(
            "Current tenders fetched",
            "previousTenders",
            previousTenders
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllCancelledTenders: async (req, res, next) => {
    try {
      const currentTenders = await Tender.findAll({
        where: { tenderStatus: "inactive" }
      });

      return res
        .status(200)
        .json(
          ApiResponse(
            "Current tenders fetched",
            "currentTenders",
            currentTenders
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editTender: async () => {}
};

module.exports = SCMController;
