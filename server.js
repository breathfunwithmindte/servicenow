const http =  require("http"), express = require("express"), Database = require('./database/DatabaseMain'), apis = require('./Routes/api');

console.log(__dirname)

var PORT = process.env.PORT || 5000;
var app = express();
var server = http.createServer(app);
server.listen(PORT, () => console.log('server running (5000) ... =>'));

async function Routing () {
   try{
        const db = new Database('mongodb+srv://multiverse:02580258@agartha.urlvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        await db.connectToDatabase();
        
        // main autheticated server routes /api/v1/
        app.use('/api/v1/', apis);
   }catch(err){
       let resBody = "<h1 style='font-size: 1.9rem'>Status 500 || Server's apis not working at this moment</h1>";
       app.get('/api/v1', (req, res) => res.status(500).send(resBody))
       app.get('/api/v1/*', (req, res) => res.status(500).send(resBody))
       console.log(err);
   }

}


Routing();



