import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepository: Repository<Product>;
  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PRODUCT_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((dto) => dto),
            save: jest.fn((dto) => dto),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<Repository<Product>>(
      PRODUCT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product using repository create/save', async () => {
    const mockProductDto = {
      id: 'product1',
      name: 'product1',
      price: 100,
    };
    await service.create(mockProductDto);
    expect(productsRepository.create).toHaveBeenCalledWith(mockProductDto);
    expect(productsRepository.save).toHaveBeenCalledWith(mockProductDto);
  });

  it('should retrieve all users using repository find', async () => {
    await service.findAll();
    expect(productsRepository.find).toHaveBeenCalled();
  });

  it('should find one user using repository findOne', async () => {
    const mockId = 'product1';
    await service.findOne(mockId);
    expect(productsRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
    });
  });
});
