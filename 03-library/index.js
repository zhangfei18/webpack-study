if(process.env.NODE_ENV === 'production'){
    module.exports = require('./dist/zfmath.js')
}else{
    module.exports = require('./dist/zfmath.min.js')
}