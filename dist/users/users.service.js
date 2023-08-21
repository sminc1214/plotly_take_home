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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const products_service_1 = require("../products/products.service");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository, productsService) {
        this.usersRepository = usersRepository;
        this.productsService = productsService;
    }
    create(createUserInput) {
        const newUser = this.usersRepository.create(createUserInput);
        return this.usersRepository.save(newUser);
    }
    async orderProduct(user_id, product_id) {
        const product = await this.productsService.findOne(product_id);
        const user = await this.usersRepository.findOne({
            where: { id: user_id },
        });
        if (product && user) {
            user.orders = user.orders ? [...user.orders, product] : [product];
            await this.usersRepository.save(user);
            product.user = user;
            await this.productsService.getRepository().save(product);
        }
        return user;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOne(id) {
        return this.usersRepository.findOne({ where: { id: id } });
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService])
], UsersService);
//# sourceMappingURL=users.service.js.map