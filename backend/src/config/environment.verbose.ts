// THIS IS THE VERBOSE VERSION OF THE ENVIRONMENT
export const config = {

  // application environment mode
  environment: "dev",

  // host domain options
  protocol: 'http',
  host: 'localhost',
  exposedPort: 8080,
  port: 8080,

  // MongoDB connection options
  mongo: {
    uri: "mongodb://localhost:27017/?authSource=admin",
    options: {
      dbName: "ami-fullstack-database",
    }
  },

  // sockets options
  sockets: {
    path: '/socket.io-client'
  }

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
