const createLetter = ({ email, text }) => {
     const emailServer = "prappaxauhadou-3021@yopmail.com"
     const helpLetter = {
        to: emailServer,
        subject: "Need help",
        html: `<p>${text}</p> Send answer to email ${email} `
    }
    return helpLetter;
}

export default createLetter;