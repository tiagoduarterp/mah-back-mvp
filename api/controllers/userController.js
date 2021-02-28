const jwt      = require("jsonwebtoken");
const mysql    = require('../../mysql').pool;
const bcrypt   = require('bcrypt')
const email    = require('./sendController')

class oUser{
  constructor(){ }
  async userLogin(req, res, next){
    let values
    mysql.getConnection((error, conn) =>{
      if(error) {return res.status(500).send({error: error})}
      conn.query('SELECT * FROM users WHERE email = ?',
      [req.body.email],
      (error, result, fields) => {
        conn.release();
        if(error){return res.status(500).send({ error: error})}
        if(result.length < 1){
          return res.status(401).send({ message: 'Falha na autenticação'})
        }
        values = result
        bcrypt.compare(req.body.password, result[0].password,
           (err, result)=>{
             if(err){
               values = ''
               res.status(401).send({ message: 'Falha na autenticação'})
             }
             /* console.log(result) */
             if(result){
               /* console.log(nivel) */
              try{
                const token = jwt.sign({
                   email: req.body.email,
                   nivel:values[0].level,
                   
                },process.env.JWT_KEY,{expiresIn:"1h"}
                )
                const expiries = new Date().getTime()+((1000*(60*60))*1)
                /* email(req.body.email,values[0].nickname, 'ola') */
                res.status(200).json({
                    message:'Autenticado com sucesso',
                    token:token,
                    expire:expiries,
                    nivel:values[0].level,
                    email:req.body.email,
                    nickname:values[0].nickname
                    
                })
                }catch(e){
                  values = ''
                    console.log(e)
                    res.status(500).json({
                        message:'Ok',
                        token:'',
                        expire:''
                    })
                }
             }
           } 
        )
      }
      )
    })
   /*  res.status(200).json({
      message:'Aqui logado',
      teste:req.body
  }) */
  }

  async createUser(req, res, next){
    console.log(req.body)
    
    mysql.getConnection((error, conn) =>{
      if(error){return res.status(500).send({error:error})}
      conn.query('SELECT * FROM users WHERE nickname = ?',
        [req.body.nickname],
        (error, result, field) => {
          if(result.length > 0){
            res.status(409).send({message:'Usuario ja cadastrado'})
          }else{
            bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
              if(errBcrypt){
                  return res.status(500).send({error: errBcrypt})
              }
              conn.query(
                'INSERT INTO users (nickname,email,password,level,firstname,lastname,birth) VALUES (?,?,?,?,?,?,?)',
                [req.body.nickname,req.body.email, hash,req.body.level,req.body.firstname,req.body.lastname,req.body.birth],
                (error, result, field) => {
                  conn.release();
                  if(error){
                    return res.status(500).send({error:error})
                  }
                  res.status(201).send({
                    message:'cadastrado com sucesso',
                    usuario:req.body.username,
                    id:result.insertId
                })
                }
              )
          })
          }
        }
      )
     
    } )
  }

  testeToken(req, res, next){
    const permission = req.userData.nivel
    console.log('Ace', req.userData)
    res.status(200).send({
      message:'Acesso autorizado',
      acesso:permission
  })

  }
  
}//EndClass

module.exports = new oUser();