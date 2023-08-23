const { ApiError, ApiResponse } = require("../../utils/response");
const { Tender } = require("../../models");
const { Op } = require("sequelize");

const SCMController = {
  addTender: async (req, res, next) => {
    try {
      const tenderDocument = req?.files?.tenderDocument;

      if (!tenderDocument) throw new ApiError("Error saving  1", 400);

      const save = tenderDocument.mv(
        `${process.env.TENDER_DOCUMENT_FOLDER}/${tenderDocument.name}`
      );

      if (!save) throw new ApiError("Error saving tender 2", 400);

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
