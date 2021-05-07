export const defaultValidationOptions = {
  enableDebugMessages: process.env.NODE_ENV === 'development',
  forbidNonWhitelisted: true,
  whitelist: true,
  transform: true
}
