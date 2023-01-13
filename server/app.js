const express = require('express')
const mailchimpApi = require('@mailchimp/mailchimp_transactional')
require('dotenv').config()

const port = 3000

console.log('process.env.MAILCHIMP_API_KEY :>> ', process.env.MAILCHIMP_API_KEY)
console.log(
  'process.env.MAILCHIMP_SENDER_ADDR :>> ',
  process.env.MAILCHIMP_SENDER_ADDR
)

const mailchimp = mailchimpApi(process.env.MAILCHIMP_API_KEY)

const server = express()

server.use(express.static('../client'))
server.use(express.urlencoded({ extended: true }))

server.post('/api/email', async (req, res) => {
  const { name, email, phone, message } = req.body

  const msg = {
    from_email: process.env.MAILCHIMP_SENDER_ADDR,
    subject: 'New website form submission',
    text: `From: ${name}
Email: ${email}
Phone: ${phone}

Message:

${message}
  `,
    to: [
      {
        email: process.env.MAILCHIMP_TO_ADDR,
        type: 'to',
      },
    ],
  }

  const response = await mailchimp.messages.send({
    message: msg,
  })

  res.status(200).json(response)
})

server.listen(port, function (error) {
  if (error) {
    console.log('you done messed up', error)
  } else {
    console.log('server is listening on port ' + port)
  }
})

