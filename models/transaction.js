const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        walletId: {
            type: String,
            required: true,
        },
        os: {
            type: String,
            required: true,
        },
        txId: {
            type: String,
            required: false,
        },
        addedDate: {
            type: Date,
            default: Date.now,
        },
        isBroadcasted: {
            type: Boolean,
            default: false,
        },
        isTestnet: {
            type: Boolean,
            default: false,
        }
    },
    { versionKey: false }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

function validateTransaction(transaction) {
    let error = null;
    if (!transaction) {
        return "transaction payload is not provided"
    }

    if (!transaction.address) {
        return "address is not provided"
    }
    if (!transaction.os) {
        return "os data not provided"
    }
    if (!transaction.token) {
        return "token not provided"
    }
    return error;
}

function validateTransactionToDelete(transaction) {
    let error = null;
    if (!transaction) {
        return "transaction payload is not provided"
    }

    if (!transaction.address) {
        return "address is not provided"
    }
    if (!transaction.txId) {
        return "transaction id not provided"
    }
    return error;
}

exports.Transaction = Transaction;
exports.validate = validateTransaction;
exports.validateTransactionToDelete = validateTransactionToDelete;


