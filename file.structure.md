	src/-
    	|–config/-
      |         |-config.js
      |         |-rate-limiter.js
      |         |-redis.js
      |
    	|–constants/-
      |           |-ecosystem.constants.js (constant data)
      |
    	|–controllers/-
      |             |-auth.controller.js
      |
    	|–db/-
      |     |-bootstrap.js (to create database schema)
      |
    	|–docs/-
      |       |-swagger.js
      |
    	|–errors/-
      |         |-codes.js
      |         |-errors.js
      |
    	|–logger/-
      |         |-logs/-
      |         |       |-app/-
      |         |       |-debug/-
      |         |       |-error/-
      |         |
      |         |-dynamic-logger.js
      |         |-get-logger.js
      |         |-log-logger.js
      |         |-logger-logger.js
      |
    	|–middlewares/-
      |              |-authentication.middleware.js
      |              |-error-handler.middleware.js
      |              |-logger.middleware.js
      |              |-rate-limiter.middleware.js
      |              |-request-time.middleware.js
      |              |-request-id.middleware.js
      |              |-response-time.middleware.js
      |              |-upload.middleware.js
      |
    	|–migrations/
    	|–models/-
      |         |-user.js
      |         |-user-profile.js
    	|–routes/
      |         |-index.routes.js
      |         |-auth.routes.js
    	|–seeders/
    	|–services/-
      |           |-auth.service.js
    	|–utils/-
      |       |-validate-fields.js
    	|–repositories/     (don't have yet)
    	|–validators/       (don't have yet) 

  app.js
  server.js
  test/-
        |-auth/-
              |-login.test.js
              |-register.test.js