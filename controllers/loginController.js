const Login = require('../models/login');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'learning';
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken
const email = require('email-validator');

const createLogin = (req, res) => {
    const saltRounds = 10;

    if ((req.body.password).length < 5) {
        return res.status(422).json({message: "Password must be at least 5 characters long"})
    } 

    if (!email.validate(req.body.email)) {
        return res.status(422).json({message: "Invalid email"})
    } 

    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.log("Erro no bcrypt");
            return res.status(500).json({ message: 'Error encrypting password' });
        }
        const login = new Login({
            email: req.body.email,
            password: hashedPassword,
        });
        
        login.save()
            .then((result) => {
                console.log("Salvando");
                res.status(201).json({ message: 'User created successfully' });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Error creating user' });
            });
    });
}
const login = (req, res) => {
    const email = req.body.email;
    Login.findOne({ email: email })
        .then((user) => {
            const senha = req.body.password;
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log(user);

            bcrypt.compare(senha, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { _id: user._id }, // Payload (dados que estarão no token)
                        SECRET_KEY,             // Chave secreta para assinatura
                        { expiresIn: '1h' }     // define o tempo de expiração
                    );

                    res.cookie('token', token, {
                        httpOnly: false,
                        secure: false,
                        sameSite: 'lax',
                    });

                    return res.status(200).json({ message: "Success" });

                }
                else {

                }
            });

        })
        .catch((error) => {
            console.error('Error finding user:', error);
            res.status(500).json({ message: 'Server error' });
        });
}
const verifyAuth = (req, res) => {
    const token = req.cookies.token; // Acessa o cookie chamado 'token'

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verifica e decodifica o token
        res.json({ verification: true, user: decoded });
    } catch (err) {
        res.status(403).json({ verification: false, message: 'Token inválido ou expirado' });
    }

}
module.exports = {
    createLogin,
    login,
    verifyAuth
};