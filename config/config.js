const env = process.env.NODE_ENV || 'development';
module.exports = {
	development: {
		username: env.MYSQL_USERNAME,
		password: env.MYSQL_PASSWORD,
		database: env.MYSQL_DB_NAME,
		host: env.MYSQL_HOST,
		port: env.MYSQL_PORT,
		dialect: 'mysql',
		operatorsAliases: false
	},
	production: {
		username: env.MYSQL_USERNAME,
		password: env.MYSQL_PASSWORD,
		database: env.MYSQL_DB_NAME,
		host: env.MYSQL_HOST,
		port: env.MYSQL_PORT,
		dialect: 'mysql',
		operatorsAliases: false
	}
};
