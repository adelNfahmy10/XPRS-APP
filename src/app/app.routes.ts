import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./pages/notifications/notifications.page').then( m => m.NotificationsPage)
  },
  {
    path: 'store-locator',
    loadComponent: () => import('./pages/store-locator/store-locator.page').then( m => m.StoreLocatorPage)
  },
  {
    path: 'brands',
    loadComponent: () => import('./pages/brands/brands.page').then( m => m.BrandsPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./pages/contact-us/contact-us.page').then( m => m.ContactUsPage)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.page').then( m => m.PrivacyPage)
  },
  {
    path: 'products/:type/:value',
    loadComponent: () => import('./pages/products/products.page').then(m => m.ProductsPage)
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./pages/product/product.page').then( m => m.ProductPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.page').then( m => m.OrdersPage)
  },
  {
    path: 'tvc-points',
    loadComponent: () => import('./pages/tvc-points/tvc-points.page').then( m => m.TvcPointsPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/auth/change-password/change-password.page').then( m => m.ChangePasswordPage)
  },
];
