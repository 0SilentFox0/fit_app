import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION || 'v1',
  appName: process.env.APP_NAME || 'FitConnect',
  appUrl: process.env.APP_URL || 'http://localhost:3001',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Database configuration
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    database: process.env.POSTGRES_DB || 'fitconnect_db',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fitconnect',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  // AWS configuration
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET || 'fitconnect-uploads',
  },

  // Stripe configuration
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },

  // Firebase configuration
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || 'fitconnect-app',
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },

  // Google APIs
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    calendarApiKey: process.env.GOOGLE_CALENDAR_API_KEY,
  },

  // Email configuration
  email: {
    provider: process.env.EMAIL_PROVIDER || 'sendgrid',
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },

  // SMS configuration (Twilio)
  sms: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },

  // Monitoring & Analytics
  monitoring: {
    sentryDsn: process.env.SENTRY_DSN,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // File upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
    allowedFileTypes: process.env.ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/quicktime',
    ],
  },

  // Feature flags
  features: {
    graphql: process.env.ENABLE_GRAPHQL === 'true',
    websockets: process.env.ENABLE_WEBSOCKETS === 'true',
    pushNotifications: process.env.ENABLE_PUSH_NOTIFICATIONS === 'true',
    emailVerification: process.env.ENABLE_EMAIL_VERIFICATION === 'true',
    smsVerification: process.env.ENABLE_SMS_VERIFICATION === 'true',
  },
} as const;

export type Config = typeof config; 