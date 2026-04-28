module.exports = {
HOST: "db",       
USER: "trade-app",         
PASSWORD: "123456",    
DB: "trade-app-db",      
dialect: "postgres",
port: 5432,           
pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}
};