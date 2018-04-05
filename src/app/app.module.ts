import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { LocationPage, UpdateLocationPage } from '../pages/location/location';
import { PhoneVerificationPage } from '../pages/phone-verification/phone-verification';
import { CodeVerificationPage } from '../pages/code-verification/code-verification'
import { FieldsPage, UpdateFieldsPage } from '../pages/fields/fields';
import { MainCategoryPage, SearchMainCategoryPage, UpdateMainCategoryPage } from '../pages/main-category/main-category';
import { SubCategoryPage, SearchSubCategoryPage, UpdateSubCategoryPage } from '../pages/sub-category/sub-category';
import { SearchFieldsPage } from '../pages/search-fields/search-fields';
import { FindServicesPage } from '../pages/find-services/find-services';
import { SettingPage } from '../pages/setting/setting';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { MyAccountPage } from '../pages/my-account/my-account';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MyLowProfilePage } from '../pages/my-low-profile/my-low-profile';
import { PersonalOnePage } from '../pages/personal-one/personal-one';
import { PersonalTwoPage } from '../pages/personal-two/personal-two';
import { CategoryPage } from '../pages/category/category';
import { ProfessionPage } from '../pages/profession/profession';
import { BusinessDataOnePage } from '../pages/business-data-one/business-data-one';
import { BusinessDataTwoPage } from '../pages/business-data-two/business-data-two';
import { ContactDataPage } from '../pages/contact-data/contact-data';
import { OtherDataPage } from '../pages/other-data/other-data';
import { SuggestionPage } from  '../pages/suggestion/suggestion';
import { ThankYouPage } from '../pages/thank-you/thank-you';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { ViewLocationPage } from '../pages/view-location/view-location';
import { ViewReviewsPage } from '../pages/view-reviews/view-reviews';
import { HelpPage } from '../pages/help/help';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';
import { Contacts }  from '@ionic-native/contacts';
import { Geolocation } from '@ionic-native/geolocation';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Push } from '@ionic-native/push';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterPage,
    LocationPage,
    UpdateLocationPage,
    PhoneVerificationPage,
    CodeVerificationPage,
    FieldsPage,
    UpdateFieldsPage,
    MainCategoryPage,
    SearchMainCategoryPage,
    UpdateMainCategoryPage,
    SubCategoryPage,
    SearchSubCategoryPage,
    UpdateSubCategoryPage,
    SearchFieldsPage,
    FindServicesPage,
    SettingPage,
    TermsAndConditionsPage,
    MyAccountPage,
    MyProfilePage,
    MyLowProfilePage,
    PersonalOnePage,
    PersonalTwoPage,
    CategoryPage,
    ProfessionPage,
    BusinessDataOnePage,
    BusinessDataTwoPage,
    ContactDataPage,
    OtherDataPage,
    SuggestionPage,
    ThankYouPage,
    ViewProfilePage,
    ViewLocationPage,
    ViewReviewsPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: false,
      platforms: {
        ios: {
          tabsHideOnSubPages: false,
        },
        android: {
          tabsHideOnSubPages: false,
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterPage,
    LocationPage,
    UpdateLocationPage,
    PhoneVerificationPage,
    CodeVerificationPage,
    FieldsPage,
    UpdateFieldsPage,
    MainCategoryPage,
    SearchMainCategoryPage,
    UpdateMainCategoryPage,
    SubCategoryPage,
    SearchSubCategoryPage,
    UpdateSubCategoryPage,
    SearchFieldsPage,
    FindServicesPage,
    SettingPage,
    TermsAndConditionsPage,
    MyAccountPage,
    MyProfilePage,
    MyLowProfilePage,
    PersonalOnePage,
    PersonalTwoPage,
    CategoryPage,
    ProfessionPage,
    BusinessDataOnePage,
    BusinessDataTwoPage,
    ContactDataPage,
    OtherDataPage,
    SuggestionPage,
    ThankYouPage,
    ViewProfilePage,
    ViewLocationPage,
    ViewReviewsPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    HTTP,
    Contacts,
    EmailComposer,
    CallNumber,
    NativeStorage,
    Geolocation,
    Camera,
    FileTransfer,
    SocialSharing,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider
  ]
})
export class AppModule {}
