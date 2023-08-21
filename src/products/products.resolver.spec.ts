import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;
  const mockProductService = {
    findOne: jest.fn(),
    orderProduct: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };

  const mockProductDto = {
    id: 'mockId',
    name: 'mockName',
    price: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsResolver, ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductService)
      .compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create user using usersService create', async () => {
    await resolver.createProduct(mockProductDto);
    expect(mockProductService.create).toHaveBeenCalledWith(mockProductDto);
  });

  it('should find all users using usersService findAll', async () => {
    await resolver.findAll();
    expect(mockProductService.findAll).toHaveBeenCalled();
  });

  it('should find one user using usersService findOne', async () => {
    await resolver.findOne('mockId');
    expect(mockProductService.findOne).toHaveBeenCalledWith('mockId');
  });
});
