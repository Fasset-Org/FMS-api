// const footerLogo = require("../images/footer-image.jpg");

const EmailTemplates = {
  autoApplyEmail: (gender, lastName) => {
    return `<p>Dear ${
      gender === "Male" ? "Mr" : "Ms"
    } ${" "} ${lastName}</p><p>We thank you for showing interest to join FASSET and hereby 
                acknowledge receipt of your application for the above position. Please note that your application 
                is receiving attention from the HR Department.</p> <p>If you have not received communication 
                within 6 weeks from the closing date, kindly consider your application as unsuccessful.</p> 
                <p>Kind Regards,</p><p>Human Resources Department Team</p><p>1st Floor, 296 Kent Avenue, Ferndale, Randburg, 2194 
                PO Box 6801, Cresta, 2118</p>
                <br />
                <img src="${process.env.API_URL}/images/footer-image.jpg" alt="" />
                <br />
                `;
  }
};

module.exports = EmailTemplates;
