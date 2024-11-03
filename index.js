const express = require('express')
require('dotenv').config();
const {dbConnection}=require('./database/config')

const cors=require('cors')


const app = express();

app.use(cors());
app.use(express.static('public'));

app.use(express.json());

dbConnection();

app.use('/api/usuarios',require('./routes/user'));
app.use('/api/hospitales',require('./routes/hospital'));
app.use('/api/doctores',require('./routes/doctor'));
app.use('/api/busquedas',require('./routes/busqueda'));
app.use('/api/uploads',require('./routes/upload'));

app.use('/api/login',require('./routes/auth'));




app.listen(process.env.PORT)