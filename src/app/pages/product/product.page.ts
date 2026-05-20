import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { ProductService } from 'src/core/services/products/product-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/core/services/cart/cart-service';
import { CategorieService } from 'src/core/services/categories/categorie-service';
import { FavoriteService } from 'src/core/services/favorites/favorite-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonBackButton, IonButtons],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductPage implements OnInit {
  private readonly _ProductService = inject(ProductService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)
  private readonly _CategorieService = inject(CategorieService)
  private readonly _FavoriteService = inject(FavoriteService)

  cart:any[] = []
  cartId = this._CartService.cartId

  productData:any;
  productSlug:any;
  isCheckProduct:boolean = false

  productImages: { src: string; alt: string }[] = [];
  mainIndex = 0;


  get mainImage() {
    return this.productImages[this.mainIndex];
  }

  ngOnInit(): void {
    this.getProductBySlug();
    this.getMessageInstallment()
    this.insuranceTerms()
  }

  getProductBySlug(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productSlug = params.get('slug');
        this._ProductService.getProductDetails(this.productSlug).subscribe({
          next: (res) => {
            this.productData = res;
            this.getAllCart()
            this.getRelatedProducts()

            this.productImages = [
              { src: this.productData?.picture1, alt: this.productData?.picture1_alt },
              { src: this.productData?.picture2, alt: this.productData?.picture2_alt },
              { src: this.productData?.picture3, alt: this.productData?.picture3_alt },
              { src: this.productData?.picture4, alt: this.productData?.picture4_alt },
              { src: this.productData?.picture5, alt: this.productData?.picture5_alt },
            ].filter(img => img.src);

            this.mainIndex = 0;

            // autoplay every 3 seconds
            setInterval(() => {
              this.nextImage();
            }, 6000);
          },
        });

        this.getBanksInstallment(this.productSlug)

      },
    });
  }

  addToCart():void{
    const data = {
      product: this.productSlug,
      cart: this.cartId(),
      quantity: this.productData?.quantity || 1,
      product_property: null,
      card: null,
      branded_page_product: null,
      insurance: null
    };

    this._CartService.addCartProduct(data).subscribe({
      next: () => {
        this.getAllCart();
        this.isCheckProduct = true
        this._ToastrService.success('Product added to cart successfully');
      },
      error:(err)=>{
        this._ToastrService.warning(err.error.detail + '- CartId : ' + this.cartId());

      }
    });
  }

  getAllCart():void{
    if(this.cartId()){
      this._CartService.getCart(this.cartId()).subscribe({
        next:(res)=>{
          this.cart = res?.cartproduct || [];
          this._CartService.cartCount.set(res.cartproduct.length)
          this._CartService.cartProducts.set(res.cartproduct)
          this.isCheckProduct = this.cart.some(
            product => product.product.id == this.productSlug
          );
        }
      })
    }
  }


  changeMain(index: number) {
    this.mainIndex = index;
  }
  nextImage() {
    this.mainIndex = (this.mainIndex + 1) % this.productImages.length;
  }
  prevImage() {
    this.mainIndex = (this.mainIndex - 1 + this.productImages.length) % this.productImages.length;
  }

  notify_checked = false;
  out_of_stock = true;
  userEmail:string = ''
  token = localStorage.getItem('token')

  notifyMe(event: Event) {
    let userEmail = localStorage.getItem('userEmail')
    const input = event.target as HTMLInputElement;
    this.notify_checked = input.checked;

    if (this.notify_checked) {
      let data = {
        product: this.productSlug,
        email: userEmail
      }
      if(this.token){
        this._ProductService.notify(data).subscribe({
          next:(res)=>{
            this._ToastrService.success('Notification registered')
          }
        });
      } else{
        let data = {
          product: this.productSlug,
          email: this.userEmail
        }
        this._ProductService.notify(data).subscribe({
          next:(res)=>{
            this._ToastrService.success('Notification registered')
          }
        });
      }
    }
  }

  quantity: number = 1; // القيمة الافتراضية
  increaseQuantity() {
    this.quantity += 1;
  }
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }


  // حالة كل collapse
  openSection: 'fullPrice' | 'installments' | 'payLater' | 'preOrder' | null = null;
  banksInstallment: any = [];
  filtered_banks: any = [];

  tabsSection:string = 'fullPrice'
  toggleSection(section: 'fullPrice' | 'installments' | 'payLater' | 'preOrder') {
    this.tabsSection = section
  }

  installmentMsg:string = ''
  bank: any = 'cib';
  getMessageInstallment():void{
    this._ProductService.messageInstallment().subscribe({
      next:(res)=>{
        this.installmentMsg = res.message
      }
    })
  }

  insurance_terms:any
  insuranceTerms() {
    this._ProductService.insuranceTerms().subscribe({
      next:(res)=>{
        this.insurance_terms = res.data;
      }
    })
  }

  getBanksInstallment(id:any):void {
    this._ProductService.installment(id).subscribe({
      next:(res)=>{
        this.banksInstallment = res;
        for (let index = 0; index < this.banksInstallment.length; index++) {
          const element = this.banksInstallment[index];
          this.filtered_banks.push(element.bank);
        }

        this.filtered_banks = this.filtered_banks.filter(
          (tag:any, index:any, array:any) =>
            array.findIndex((t:any) => t.id == tag.id) == index
        );

        for ( let banksInstallment_index = 0; banksInstallment_index < this.banksInstallment.length; banksInstallment_index++) {
          const banksInstallment_element = this.banksInstallment[banksInstallment_index];
          for ( let filtered_banks_index = 0; filtered_banks_index < this.filtered_banks.length; filtered_banks_index++ ) {
            const filtered_banks_element =
              this.filtered_banks[filtered_banks_index];
            if (
              banksInstallment_element.bank.id == filtered_banks_element.id
            ) {
              if (filtered_banks_element.months) {
                filtered_banks_element.months.push(banksInstallment_element);
              } else {
                filtered_banks_element.months = [banksInstallment_element];
              }
            }
          }
        }
      }
    });
  }

  install:any;
  interest: any = 0;
  down = 0;
  downPrice: any;
  oldDownPrice: any;
  payment_type: any;
  product_property_id: any;

  choosePaymentType(val:any) {
    this.install = null;
    this.bank = null;
    this.payment_type = val;
  }
  calculate(down:any, install:any, bank:any, interest:any) {
    this.install = install;
    this.interest = interest;
    if (down) {
      if (down.length == undefined) {
        down = '0';
      } else if (down.length == 0) {
        down = '0';
      }
    } else {
      down = '0';
    }
    if (this.product_property_id) {
      this._ProductService.getInstallments(this.product_property_id,install,down,bank,this.interest).subscribe(
          (res: any) => {
            this.downPrice = res.monthly_payment;
            /*
              if (this.product.old_price) {
                this.productDetailsPro.getInstallementWithPrice(bank, this.product.old_price, install, down, this.interest).subscribe((ress: any) => {
                  this.oldDownPrice = ress.monthly_payment;
                  this.spinner.hide();
                }, err => {
                  this.spinner.hide();
                });
              } else {
                this.spinner.hide();
              }
            */

          }
        );
    } else {
      this._ProductService.getAccInstallments(this.productData?.id, install, down, bank, this.interest).subscribe(
          (res: any) => {
            this.downPrice = res.monthly_payment;

            /*
              // Remove this case of display installment price in case old price

              if (this.product.old_price) {
                this.productDetailsPro.getInstallementWithPrice(bank, this.product.old_price, install, down, this.interest).subscribe((ress: any) => {
                  this.oldDownPrice = ress.monthly_payment;
                  this.spinner.hide();
                }, err => {
                  this.spinner.hide();
                });
              } else {
                this.spinner.hide();
              }
            */
          }
        );
    }
  }

  productsRelated:any[] = []

  // get related products
  getRelatedProducts(): void {
    this._CategorieService.getProductsCategory(
      '', // search
      [this.productData?.category.id], // categories
      [], // shop_categories
      [], // subcategories
      [], // brands
      [], // graphicscard
      [], // processors
      [], // ram
      [], // storage
      '-id', // sort
      10, // page_size
      1 // page
    ).subscribe({
      next: (res) => {
        this.productsRelated = res.results.filter(
          (product: any) => product.id !== this.productSlug
        );
      }
    });
  }

  // حفظ العناصر اللي عليها animation
  allFavoriteItems: any[] = JSON.parse(localStorage.getItem('myFavProduct') || '[]');
  fadeItems: Set<number> = new Set();

  // للتحقق إذا العنصر موجود في المفضلة
  isFavorite(item: any): boolean {
    if (!item || !this.allFavoriteItems) return false;

    return this.allFavoriteItems.some(fav => fav.id === item.id);
  }
  // إضافة / إزالة من المفضلة
  addToFavorite(item: any): void {
    const index = this.allFavoriteItems.findIndex(fav => fav.id === item.id);

    if (index === -1) {
      // لو مش موجود أضفه
      this.allFavoriteItems.push(item);
      this._ToastrService.success('Product added to favorites successfully');
      // تشغيل animation
      this.fadeItems.add(item.id);
      setTimeout(() => this.fadeItems.delete(item.id), 1000); // مدة الfade CSS

    } else {
      // لو موجود، ممكن نعمل toggle ونحذفه (اختياري)
      this.allFavoriteItems.splice(index, 1);
      this._ToastrService.warning('Product removed from favorites successfully');
    }

    // تحديث localStorage
    localStorage.setItem('myFavProduct', JSON.stringify(this.allFavoriteItems));
    this._FavoriteService.sync(this.allFavoriteItems.length);
  }

  showFadeAnimation(item: any): boolean {
    return this.fadeItems.has(item.id);
  }

  isCart(item: any): boolean {
    return this.cart.some(
      cartItem => cartItem.product?.id === item.id
    );
  }

  addProductRelatedToCart(item:any):void{
    const cartItem = this.getCartItem(item);

    // 🟥 لو موجود → احذف
    if (cartItem) {
      this._CartService.deleteCart(cartItem.id).subscribe({
        next: (res) => {
          this.getAllCart();
          this._ToastrService.warning('Product removed from cart successfully');
        }
      });
      return;
    }

    const data = {
      product: item.id,
      cart: this.cartId,
      quantity: item.quantity || 1,
      product_property: null,
      card: null,
      branded_page_product: null,
      insurance: null
    };

    this._CartService.addCartProduct(data).subscribe({
      next: () => {
        this.getAllCart();
        this._ToastrService.success('Product added to cart successfully');
      }
    });
  }

  getCartItem(item: any) {
    return this.cart.find(
      cartItem => cartItem.product?.id === item.id
    );
  }
}
