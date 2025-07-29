const express = require("express")
const router = express.Router()
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  // Google Callback Route
router.get('/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    async (req, res) => {
        // Generate JWT Token for the user
        let user= await req.user.populate("additionalDetails");
        const payload = {
            email: user.email,
            id: user._id,
            accountType:user.accountType,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.token = token;
        user.password= undefined;

        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
            secure: false, // Use true in production with HTTPS
            sameSite: 'lax', // Allows cookies to be sent across subdomains
        }
        res.cookie("user", JSON.stringify(user), { ...options, httpOnly: false }); // Non-httpOnly for client-side access
       

        // Redirect to the dashboard
        res.redirect('http://localhost:3000/google-auth');
    }
);



module.exports = router