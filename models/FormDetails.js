import mongoose from "mongoose";

const formDetails = mongoose.Schema({
  investmentDetails: {
    accountType: {
      type: String,
      required: true,
    },
    portfolioName: {
      type: String,
      required: true,
    },
    fundFeesCategory: {
      type: String,
      required: true,
    },
    investmentCategory: {
      type: String,
      required: true,
    },
    communicationAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    numberOfAccHolders: {
      type: String,
      required: true,
    },
    quantumOfInvestment: {
      type: String,
      required: true,
    },
    investmentMode: {
      type: String,
      required: true,
    },
  },
  applicantDetails: {
    applicantName: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    panNo: {
      type: String,
      required: true,
    },
    dob: {
      day: {
        type: Number,
      },
      month: {
        type: Number,
      },
      year: {
        type: Number,
      },
    },
  },
  bankingPreference: {
    bankName: {
      type: String,
      required: true,
    },
    accountNo: {
      type: String,
      required: true,
    },
    accountTitle: {
      type: String,
      required: true,
    },
    bankIFSC: {
      type: String,
      required: true,
    },
  },
  nomineeDetails: {
    noOfNominees: {
      type: String,
      required: true,
    },
    nomineeName: {
      type: String,
      required: true,
    },
    nomineePAN: {
      type: String,
      required: true,
    },
    nomineeEmail: {
      type: String,
      required: true,
    },
    nomineeContact: {
      type: String,
      required: true,
    },
    dob: {
      day: {
        type: Number,
      },
      month: {
        type: Number,
      },
      year: {
        type: Number,
      },
    },
    nomineeRelationship: {
      type: String,
      required: true,
    },
    nomineePercent: {
      type: String,
      required: true,
    },
  },
  investmentRisk: {
    investmentExperience: {
      type: String,
      required: true,
    },
    investmentStyle: {
      type: String,
      required: true,
    },
    portfolioFell: {
      type: String,
      required: true,
    },
    investementObjective: {
      type: String,
      required: true,
    },
    riskTolerance: {
      type: String,
      required: true,
    },
    investmentHorizon: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model("FormDetails", formDetails);
