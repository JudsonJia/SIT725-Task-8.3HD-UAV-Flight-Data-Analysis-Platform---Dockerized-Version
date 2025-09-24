const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URI || 'mongodb://localhost:27017/uav_analysis',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);

        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        } else {
            console.log('继续运行应用，但数据库功能可能不可用');
        }
    }
};

module.exports = connectDB;