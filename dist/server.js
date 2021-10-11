"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./db/connection"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./routes/user"));
const movies_1 = __importDefault(require("./routes/movies"));
const admins_1 = __importDefault(require("./routes/admins"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const movie_show_1 = __importDefault(require("./routes/movie-show"));
const purchases_1 = __importDefault(require("./routes/purchases"));
const cars_1 = __importDefault(require("./routes/cars"));
class Server {
    constructor() {
        this.apiPaths = {
            admins: '/api/admin',
            users: '/api/user',
            movies: '/api/movies',
            rooms: '/api/rooms',
            movieShow: '/api/movie-shows',
            purchases: '/api/purchases',
            cars: '/api/cars',
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        // Rutas
        this.routes();
        // Middlewares
        this.middlewares();
        // DB
        this.dbConnection();
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // lectura del body
        this.app.use(express_1.default.json());
        // Directorio publico
        this.app.use(express_1.default.static('dist/public/depool'));
        // Carpeta publica
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, 'public/depool/index.html'));
        });
    }
    routes() {
        this.app.use(this.apiPaths.admins, admins_1.default);
        this.app.use(this.apiPaths.users, user_1.default);
        this.app.use(this.apiPaths.movies, movies_1.default);
        this.app.use(this.apiPaths.rooms, rooms_1.default);
        this.app.use(this.apiPaths.movieShow, movie_show_1.default);
        this.app.use(this.apiPaths.purchases, purchases_1.default);
        this.app.use(this.apiPaths.cars, cars_1.default);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log(' DB ONLINE ');
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map