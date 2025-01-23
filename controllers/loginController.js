const Login = require('../models/login');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'learning';
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken

const createLogin = (req, res) => {
    const saltRounds = 10;

    console.log(req.body);
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Erro ao encriptar a senha:', err);
        } else {
            const login = new Login({
                email: req.body.email,
                password: hashedPassword,
            });
            login.save()
                .then((result) => {
                    console.log('Usuário criado com sucesso:', result);
                    res.send(result);
                })
                .catch((error) => {
                    console.error('Erro ao criar o usuário:', error);
                    res.status(500).send(error);
                });
        }


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
    console.log(token);

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verifica e decodifica o token
        res.json({ verification: true, user: decoded });
    } catch (err) {
        res.status(403).json({ verification:false, message: 'Token inválido ou expirado' });
    }
    
}
module.exports = {
    createLogin,
    login,
    verifyAuth
};