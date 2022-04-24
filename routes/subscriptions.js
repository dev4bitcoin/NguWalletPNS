const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

const { Transaction, validate, validateTransactionToDelete } = require("../models/transaction");

function mapTransaction(tx) {
    return {
        token: tx.token,
        address: tx.address,
        os: tx.os,
        txId: tx.txId,
        isBroadcasted: tx.isBroadcasted,
        walletId: tx.walletId,
        isTestnet: tx.isTestnet
    };
}

router.post("/subscribe", async (req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error);
    const tx = await Transaction.findOne({ address: req.body?.address });
    if (!tx || (tx.walletId !== req.body.walletId)) {
        let tx = new Transaction(mapTransaction(req.body));
        tx = await tx.save();
        res.send('Added to queue');
        return;
    }
    res.send('Address is alread added to queue');
});

router.post("/unsubscribe/", async (req, res) => {
    const error = validateTransactionToDelete(req.body);
    if (error) return res.status(400).send(error);
    const { txId } = req.body;
    const tx = await Transaction.findOne({ txId: txId });
    console.log(tx);
    if (!tx) {
        return res.status(400).send("The transaction with given address or transaction is not found.");
    }

    await tx.deleteOne({ "_id": ObjectId(tx._id) });

    res.send(true);
});

module.exports = router;