import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CartComponent } from "./cart.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../../shared/module/material.module";
import { of } from "rxjs";

// Mock CartService for testing purposes
class MockCartService {
  getCartItems() {
    // Return a sample observable for testing
    return of([{ model: "item1" }, { model: "item2" }]);
  }
}
describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: MockCartService;

  beforeEach(() => {
    mockCartService = new MockCartService(); // Create an instance of the mock service
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, MaterialModule],

    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should filter out item on orderPlaced", () => {
    const mockCartItem = {
      productId: "1",
      brand: "Brand",
      model: "Model",
      color: "Red",
      tax: "0.1",
      basePrice: "100",
      quantity: "2",
    };

    component.cartItems = [
      {
        productId: "1",
        brand: "Brand",
        model: "Model",
        color: "Red",
        tax: "0.1",
        basePrice: "100",
        quantity: "2",
      },
    ];
    component.orderPlaced(mockCartItem);

    expect(component.cartItems.length).toBe(1);
  });

  it('should render app-cart-items for each cart item', () => {
    const mockCartItems = [{
      productId: "1",
      brand: "Brand",
      model: "Model",
      color: "Red",
      tax: "0.1",
      basePrice: "100",
      quantity: "2",
    },{
      productId: "2",
      brand: "Brand",
      model: "Model",
      color: "Red",
      tax: "0.1",
      basePrice: "100",
      quantity: "2",
    },];

    component.cartItems = mockCartItems;

    fixture.detectChanges();

    const cartItemElements = fixture.nativeElement.querySelectorAll('app-cart-items');

    expect(cartItemElements.length).toBe(mockCartItems.length);
  });

  it('should display empty cart image when cartItems length is 0', () => {
    component.cartItems = [];

    fixture.detectChanges();

    const emptyCartImage = fixture.nativeElement.querySelector('.centered-content img');

    expect(emptyCartImage).toBeTruthy();
    expect(emptyCartImage.getAttribute('src')).toContain('assets/images/emptyCart.png');
  });

  it('should not filter out other items on orderPlaced', () => {
    const mockCartItem1 = {
      productId: "1",
      brand: "Brand",
      model: "Model",
      color: "Red",
      tax: "0.1",
      basePrice: "100",
      quantity: "2",
    };
    const mockCartItem2 ={
      productId: "2",
      brand: "Brand",
      model: "Model",
      color: "Red",
      tax: "0.1",
      basePrice: "100",
      quantity: "2",
    };

    component.cartItems = [mockCartItem1, mockCartItem2];
    component.orderPlaced(mockCartItem1);

    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0]).toEqual(mockCartItem2);
  });
});
