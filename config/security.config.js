// BackendPfe/config/security.config.js
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

const securityConfig = (app) => {
  // Protection des en-têtes HTTP
  // app.use(helmet());
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // Allow inline scripts and WebAssembly execution
          "script-src": [
            "'self'", // Default: Only allow scripts from the same origin
            "'unsafe-inline'", // Allow inline scripts
            "'unsafe-eval'", // Allow eval for WebAssembly (optional, less secure)
            "'wasm-unsafe-eval'", // Allow WebAssembly execution
          ],
          // Allow the specific domain of your frontend to embed content via iframe
          "frame-ancestors": [
            "'self'", // Keep 'self' to allow embedding from the same origin
            process.env.FRONTEND_URL,
            "https://localhost:3000", // Add your frontend's origin here
            // "https://192.168.150.153:3000", // Add any additional domains you need
          ],
          // Allow loading of WebAssembly files
          "object-src": ["'self'"],
          // Allow inline event handlers (like onclick, onload, etc.)
          "script-src-attr": ["'self'", "'unsafe-inline'"],
        },
      },
    })
  );

  // Configuration CORS
  const corsOptions = {
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Limitation des requêtes
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite chaque IP à 100 requêtes par fenêtre
  });
  app.use("/api/", limiter);

  // Protection contre la pollution des paramètres HTTP
  app.use(hpp());

  // Validation des fichiers WASM
  app.use("/api/upload", (req, res, next) => {
    if (!req.files) return next();

    const file = req.files.wasm;
    if (!file.name.endsWith(".wasm")) {
      return res.status(400).json({
        error:
          "Format de fichier non valide. Seuls les fichiers .wasm sont acceptés.",
      });
    }

    // Vérification de la taille du fichier (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return res.status(400).json({
        error: "Le fichier est trop volumineux. Taille maximale: 5MB",
      });
    }

    next();
  });
};

module.exports = securityConfig;
