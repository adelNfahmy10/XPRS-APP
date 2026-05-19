import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
    private readonly _HttpClient = inject(HttpClient)

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}categories/`)
  }

  getProductsCategory(
    search: string = '',
    categories: any[] = [],
    shop_categories: any[] = [],
    subcategories: any[] = [],
    brands: any[] = [],
    graphicscard: any[] = [],
    processors: any[] = [],
    ram: any[] = [],
    storage: any[] = [],
    sort = "-id",
    page_size = 50,
    page = 5,
    price_low = "",
    price_heigh = "",
    top_offer = "",
    trending = "",
    top_selling = "",
    quickly_30 = "",
    magazine = "",
    black_friday = "",
    just_arrived = "",
    specialoffer1 = "",
    specialoffer2 = "",
    specialoffer3 = ""
  ): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}products/?search=${search}&price_low=${price_low}&price_heigh=${price_heigh}&sort=${sort}&categories=${categories.toString()}&shoppingcategory_id=${shop_categories.toString()}&sub_categories=${subcategories.toString()}&brands=${brands.toString()}&graphicscard=${graphicscard.toString()}&processors=${processors.toString()}&ram=${ram.toString()}&storage=${storage.toString()}&top_offer=${top_offer}&trending=${trending}&top_selling=${top_selling}&quickly_30=${quickly_30}&magazine=${magazine}&black_friday=${black_friday}&just_arrived=${just_arrived}&specialoffer1=${specialoffer1}&specialoffer2=${specialoffer2}&specialoffer3=${specialoffer3}&page_size=${page_size}&page=${page}&is_mobile_app=true`
    );
  }

  getProducts(
    search:string = '',
    categories = [],
    shop_categories = [],
    subcategories = [],
    brands = [],
    graphicscard = [],
    processors = [],
    ram = [],
    storage = [],
    sort = "-id",
    page_size = 50,
    page = 5,
    price_low = "",
    price_heigh = "",
    top_offer = "",
    trending = "",
    top_selling = "",
    quickly_30 = "",
    magazine = "",
    black_friday = "",
    just_arrived = "",
    specialoffer1 = "",
    specialoffer2 = "",
    specialoffer3 = ""
  ): Observable<any> {
   return this._HttpClient.get(`${environment.baseUrl}products/?search=${search}&price_low=${price_low}&price_heigh=${price_heigh}&sort=${sort}&categories=${categories.toString()}&shoppingcategory_id=${shop_categories.toString()}&sub_categories=${subcategories.toString()}&brands=${brands.toString()}&graphicscard=${graphicscard.toString()}&processors=${processors.toString()}&ram=${ram.toString()}&storage=${storage.toString()}&top_offer=${top_offer}&trending=${trending}&top_selling=${top_selling}&quickly_30=${quickly_30}&magazine=${magazine}&black_friday=${black_friday}&just_arrived=${just_arrived}&specialoffer1=${specialoffer1}&specialoffer2=${specialoffer2}&specialoffer3=${specialoffer3}&page_size=${page_size}&page=${page}&is_mobile_app=true`);
  }
}
