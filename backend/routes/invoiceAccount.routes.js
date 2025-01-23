import express from "express";
import {
  createInvoiceAccount,
  getInvoiceAccounts,
  getInvoiceAccount,
  updateInvoiceAccount,
  deleteInvoiceAccount,
} from "../controllers/invoiceAccount.controller.js";

const router = express.Router();

// Invoice account routes
router.post("/invoice-accounts", createInvoiceAccount);
router.get("/invoice-accounts", getInvoiceAccounts);
router.get("/invoice-accounts/:id", getInvoiceAccount);
router.put("/invoice-accounts/:id", updateInvoiceAccount);
router.delete("/invoice-accounts/:id", deleteInvoiceAccount);

export default router;
