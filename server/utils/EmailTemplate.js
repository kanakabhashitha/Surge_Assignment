const EmailTemplate = (OTP, firstName, id) => {
  return `

  <h3> Hello ${firstName} </h3>
  <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
  <p>your code ${OTP}</p>
  <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/verify/${id}">Verify Email </a></p>

  <p>Cheers</p>
  <p>Your Application Team</p>
 
  `;
};

const SuccessEmailTemplate = (firstName) => {
  return `
  <h3> Hello ${firstName} </h3>
  <p>Thank you for registering Success...</p>
 
  <p>Cheers</p>
  <p>Your Application Team</p>
  `;
};

export { EmailTemplate, SuccessEmailTemplate };
