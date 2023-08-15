module.exports = {
  development: {
    dialect: "mssql",
    server: "THEMBAM-IT-NB",
    option: {
      trustedConnection: true,
    },
    dialectOptions: {
      authentication: {
        type: "ntlm",
        options: {
          domain: "AzureAD"
        }
      }
    }
  }
};
