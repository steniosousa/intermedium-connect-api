// email.config.ts

import { Transporter } from 'nodemailer';

const nodemailer = require('nodemailer');

const transporter: Transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'steniosousaf@gmail.com', 
    pass: '88267513steniosousafonteles', 
  },
});

export default transporter;
