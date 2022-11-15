// THIS IS THE DOCKER VERSION OF THE ENVIRONMENT
export const config = {

  // application environment mode
  environment: process.env.ENVIRONMENT || "production",

  // host domain options
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || "localhost",
  exposedPort: process.env.EXPOSED_PORT,
  port: process.env.PORT, // !Do NOT change this option, because it is used by reverse-proxy

  // MongoDB connection options
  mongo: {
    uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/?authSource=admin`,
    options: {
      dbName: process.env.DB_NAME,
      user: process.env.DB_ROOT_USERNAME,
      pass: process.env.DB_ROOT_PASSWORD,
    }
  },
};


/**
 * Indicates whether process is in production mode
 *
 * @export
 * @returns {boolean}
 */
export function isProd(): boolean {
  return config.environment === 'production';
}

/**
 * Indicates whether process is in development mode
 *
 * @export
 * @returns {boolean}
 */
export function isDev(): boolean {
  return config.environment === 'development';
}

/**
 * Get full host domain
 * e.g. http://localhost:8080
 *
 * @export
 * @returns {string}
 */
export function getHostDomain(): string {
  return `${config.protocol}://${config.host}:${config.exposedPort}`;
}
