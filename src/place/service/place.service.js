"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceService = void 0;
const common_1 = require("@nestjs/common");
const place_database_1 = require("database/service/place.database");
let PlaceService = class PlaceService {
    constructor(database) {
        this.database = database;
    }
    async createPlace(body) {
        const { name, companyId } = body;
        const save = await this.database.createPlace(name, companyId);
        return save;
    }
    async findPlaces(companyId) {
        const findAll = await this.database.findAllPlaces(companyId);
        return findAll;
    }
    async updatePlace(id, name) {
        const updatePlace = await this.database.updatePlace(id, name);
        return updatePlace;
    }
    async deletePlace(id) {
        const verifyInUse = await this.database.placeInUse(id);
        if (verifyInUse) {
            return 'Place in use';
        }
        const deletePlace = await this.database.deletePlace(id);
        return deletePlace;
    }
};
exports.PlaceService = PlaceService;
exports.PlaceService = PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof place_database_1.PlaceDatabase !== "undefined" && place_database_1.PlaceDatabase) === "function" ? _a : Object])
], PlaceService);
