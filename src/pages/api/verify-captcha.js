import axios from 'axios';

export default async function handler(req, res) {
    const { token } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

 

  if (!token) {
    return res.status(400).json({ success: false, message: 'reCAPTCHA token is required' });
  }

  try {
    // Make a request to the Google reCAPTCHA verification API
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET,
          response: token
        }
      }
    );

    const { success, score } = response.data;

    // For reCAPTCHA v3, you may want to check the score
    // Score ranges from 0.0 to 1.0, with 1.0 being very likely a human
    if (score !== undefined && score < 0.5) {
      return res.status(200).json({ 
        success: false, 
        message: 'reCAPTCHA score too low',
        score 
      });
    }

    return res.status(200).json({ 
      success: success, 
      message: success ? 'reCAPTCHA verification successful' : 'reCAPTCHA verification failed',
      score: score
    });
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error verifying reCAPTCHA' 
    });
  }
}