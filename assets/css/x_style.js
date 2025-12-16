import { StyleSheet, Dimensions } from 'react-native';
// import MyBookshelf from '../../pages/MyBookshelf';

export default StyleSheet.create({


  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBg: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('screen').height,
    width: '100%'
  },
  topnav: {
    backgroundColor: '#03142C',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 25,

  },

  topnav_top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topnavRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'red',
    width: '35%',
  },

  howToSouthShoreView: {
    backgroundColor: '#FFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },

  howToSouthShoreHeader_View: {
    marginVertical: 20,
    paddingHorizontal: 15
  },

  howToSouthShoreHeader: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#26252C',
  },

  howToSouthShoreTagView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  howToSouthShoreTag: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#374755'
  },

  howToSouthShoreTagPart2: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: '#374755'
  },

  howToSouthShoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginVertical: 30,
    marginHorizontal: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#AAB4BA',
    borderWidth: 1,
    width: 290
  },

  howToSouthShoreCardHead: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#26252C',
  },

  howToSouthShoreCardHeadSec_view: {
    marginVertical: 15,
  },

  howToSouthShoreCardHeadSec: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#26252C',
  },

  howToSouthShoreCardTag_view: {
    marginVertical: 10
  },

  howToSouthShoreCardTag: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: '#26252C',
  },

  howToSouthShoreJoinNowBtn: {
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginHorizontal: 46,
    marginVertical: 35,
    backgroundColor: '#007FE3',
  },

  howToSouthShoreJoinNowBtnText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  howToSouthShoreModal_container: {
    marginVertical: 5,
  },

  howToSouthShoreModalHead_view: {
    marginVertical: 10,
  },

  howToSouthShoreModalHead: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#26252C',
  },

  howToSouthShoreModalSubHead: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    color: '#5A6E7A',
  },

  howToSouthShoreModalBody: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    width: '80%',
  },

  howToSouthShoreModalBodyFormView: {
    marginTop: 8,
    marginBottom: 15,
    position: 'relative',
  },



  howToSouthShoreModalBodyFormLabel: {
    color: '#26252C',
    fontSize: 17,
    fontWeight: '600',
  },

  howToSouthShoreModalBodyFormInput: {
    borderColor: '#3F4556',
    borderWidth: 0.5,
    borderRadius: 10,
    width: 250,
    color: '#26252C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '400',
    marginVertical: 10,
  },

  howToSouthShoreModalBodyFormInputIcon: {
    position: 'absolute',
    top: '50%',
    right: '5%'
  },

  howToSouthShoreModalSubmit: {
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginHorizontal: 46,
    marginVertical: 20,
    backgroundColor: '#007FE3',
  },

  howToSouthShoreModalSubmitText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  aboutSouthShoreView: {
    backgroundColor: '#FFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical:35
  },

  aboutSouthShoreHeadView: {
    paddingHorizontal: 25
  },

  aboutSouthShoreHead: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: '#26252C',
  },

  aboutSouthShoreHeadPart2: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#7B8890'
  },

  aboutSouthShoreTagView: {
    padding: 20,
    borderBottomColor: 'rgba(124, 149, 167, 0.73)',
    borderBottomWidth: 0.5
  },

  aboutSouthShoreTag: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#5A6E7A'
  },

  aboutSouthShoreDescPart1View: {
    padding: 20
  },

  aboutSouthShoreDescPart1: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#555562'
  },

  aboutSouthShoreDescPart2View: {
    paddingHorizontal: 15
  },

  aboutSouthShoreDescPart2: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#26252C'
  },

  aboutSouthShoreReadMoreBtn: {
    padding: 20
  },

  aboutSouthShoreReadMore: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007FE3',
    textDecorationLine: 'underline',
    textDecorationColor: '#007FE3'
  },

  southshoreInnovationsView: {
    backgroundColor: '#EBF3FA',
    paddingBottom: '50%',
  },

  southshoreInnovationsHeader_view: {
    padding: 25,
  },

  southshoreInnovationsHeader: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#26252C',
  },

  southshoreInnovationsTag_view: {
    paddingHorizontal: 25,
  },

  southshoreInnovationsTag: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: '#3F4556'
  },

  southshoreInnovationsDesc_view: {
    padding: 20,
  },

  southshoreInnovationsDesc: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#555562'
  },

  southshoreInnovationsReadMore_btn: {
    padding: 20,
  },

  southshoreInnovationsReadMore: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007FE3',
    textDecorationLine: 'underline',
    textDecorationColor: '#007FE3'
  },

  // Cateory Details Page start
  categoryDetailsBodyBg: {
    backgroundColor: '#EFF2FC',
    height: Dimensions.get('screen').height,
    width: '100%'
  },

  categoryDetailsHeaderView: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  categoryDetailsHeader: {
    fontWeight: '900',
    fontSize: 20,
    color: '#26252C'
  },

  categoryDetailsHeaderResults: {
    fontWeight: '400',
    fontSize: 14,
    color: '#555562'
  },

  categoryDetailsSortingMainView: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#9EA1A3',
    borderBottomWidth: 0.5
  },

  categoryDetailsSortText: {
    fontWeight: '400',
    fontSize: 15,
    color: '#26252C'
  },

  categoryDetailsDropDown: {
    backgroundColor: '#fff',
    width: '68%',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderColor: '#777983',
    borderWidth: 0.5,
    borderRadius: 10,
    color: '#141516',
    fontWeight: '500',
    fontSize: 12
  },

  categoryDetailsDropDownPicker: {
    color: '#141516',
    fontWeight: '500',
    fontSize: 12
  },

  categoryDetailsBooksMainDiv: {
    // paddingVertical: '15%',
    paddingHorizontal: '6%',
    paddingBottom: '10%'
  },

  categoryDetailsViewMore_btn: {
    padding: 20,
  },

  categoryDetailsViewMore: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#555562',
    textDecorationLine: 'underline',
    textDecorationColor: '#555562'
  },

  categoryDetailsModalCross: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '90%',
  },

  categoryDetailsModalHeaderView: {
    marginBottom: 10
  },

  categoryDetailsModalHeader: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#26252C',
  },

  categoryDetailsModalBody: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },

  categoryDetailsModalBody: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '90%'
  },

  categoryDetailsModalRadioBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  categoryDetailsModalRadioBtnTextFont: {
    fontSize: 14,
    color: '#64646F',
    fontWeight: '500'
  },

  // Cart Page
  cartPageBodyBg: {
    backgroundColor: '#EFF2FC',
    height: Dimensions.get('screen').height,
    width: '100%'
  },

  cartPageHeaderView: {
    paddingHorizontal: 20,
    paddingVertical: 12
  },

  cartPageHeader: {
    fontWeight: '900',
    fontSize: 22,
    color: '#26252C'
  },

  cartPageHeaderResults: {
    fontWeight: '400',
    fontSize: 14,
    color: '#555562'
  },

  cartPageBooksMainDiv: {
    // paddingVertical: '15%',
    paddingHorizontal: '6%',
    paddingBottom: '5%'
  },

  cartPageOrderSummaryView: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingHorizontal: '6%',
    paddingVertical: '10%',
    borderRadius: 14,
    marginBottom: '55%'
  },

  cartPageOrderSummaryHeaderView: {
    paddingBottom: 20,
    borderBottomColor: 'rgba(179, 185, 195, 0.5)',
    borderBottomWidth: 0.5
  },

  cartPageOrderSummaryBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: 'rgba(179, 185, 195, 0.5)',
    borderBottomWidth: 0.5
  },

  cartPageOrderSummaryBodyItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8
  },

  cartPageOrderSummaryBodyItemsLabelText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#575A63'
  },

  cartPageOrderSummaryBodyItemsValueText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#26252C'
  },

  cartPageOrderSummaryTotal: {
    borderBottomColor: 'rgba(179, 185, 195, 0.5)',
    borderBottomWidth: 0.5,
    paddingVertical: 15
  },

  cartPageOrderSummaryBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginBottom: '2%'
  },

  cartPageOrderSummaryCancelBtn: {
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    borderWidth: 0.5,
    borderColor: '#26252C',
    borderRadius: 100
  },

  cartPageOrderSummaryCancelBtnTxt: {
    fontWeight: '600',
    fontSize: 16,
    color: '#26252C',
  },

  cartPageOrderSummaryCheckoutBtn: {
    backgroundColor: '#007FE3',
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    borderRadius: 100,
    alignItems: 'center',
  },

  cartPageOrderSummaryCheckoutBtnTxT: {
    fontWeight: '600',
    fontSize: 16,
    color: '#ffffff',
  },

  wishlistMoveToCartBtn: {
    alignItems: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '5%',
    borderWidth: 0.5,
    borderColor: '#26252C',
    borderRadius: 100
  },

  wishlistMoveToCartBtnTxt: {
    fontWeight: '600',
    fontSize: 11,
    color: '#26252C',
  },

  logInModalBody: {
    marginVertical: '15%',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },

  forgotPasswordView: {
    display: 'flex',
    alignItems: 'flex-end'
  },

  forgotPasswordTxt: {
    fontWeight: '600',
    fontSize: 14,
    color: '#0355C6'
  },

  logInBtn: {
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 150,
    marginHorizontal: 46,
    backgroundColor: '#007FE3',
  },

  logInBtnText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  signInWithGoogleBtn: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: 200,
    marginHorizontal: 46,
    marginVertical: 16,
    backgroundColor: '#fff',
    borderColor: '#26252C',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  signInWithGoogleBtnTxt: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#575A63',
    // marginRight: 10
  },

  logInFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10%'
  },

  logInFooterTxt: {
    fontSize: 15,
    fontWeight: '400',
    color: '#3F4556',
    marginRight: 5
  },

  signUpModalBody: {
    marginVertical: '10%',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },

  signUpFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },

  footerBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  footerIconText: {
    fontWeight: '500',
    fontSize: 13,
    color: '#FFF',
    marginTop: 3
  },

  bottomnav: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height * 0.1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#03142C',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    //height:100,
    marginHorizontal: 20,
    marginVertical: 10
  },

  topnav_bottom: {
    marginTop: 20,
    position: 'relative',
  },

  search_bar: {
    width: '100%',
    height: 46,
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 50,
    //fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 13,
    color: '#FFFFFF',
  },

  search_pos: {
    position: 'absolute',
    top: '32%',
    left: '5%',
  },

  banner: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
    height: 270,
  },

  paddingTop10: {
    paddingTop: 10,
  },

  intro_1: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#133B72',
  },

  intro_2: {
    fontSize: 57,
    fontWeight: '900',
    textAlign: 'center',
    color: '#3448AF',
  },

  intro_3: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#012860',
  },

  intro_4: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#153562',
  },

  publist_bg: {
    backgroundColor: '#EBF4FC',
    paddingTop: '10%',
    paddingBottom: '13%',
    paddingHorizontal: 15,
  },

  publist_head_view: {
    paddingBottom: '10%',
  },

  publist_head: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#26252C',
  },

  pub_cards: {
    height: 117,
    width: 140,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  pub_name: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#26252C',
  },

  buy_bg: {
    backgroundColor: '#2F4FA0',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  buy_head_1_View: {
    marginBottom: 25
  },

  buy_head_1: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },

  buy_head_2: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FDFDFF',
  },

  buy_head_3_View: {
    marginTop: 20
  },

  buy_head_3: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  buy_head_3_sec: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: '#FFFFFF',
  },



  buy_card: {
    height: 450,
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingVertical: 40,
    paddingHorizontal: 40,
    marginTop: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
    // backgroundColor:'pink',
  },

  buy_card_head_view: {
    marginVertical: 10,
  },

  buy_card_head: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#26252C',
  },

  buy_card_head_sec: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#26252C',
  },

  buy_card_body: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#64646F',
  },

  buy_card_link: {
    //fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#097EDA',
  },

  buy_join_btn: {
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 86,
    marginTop: 50,
  },

  buy_join_txt: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  modal_main_view: {
    marginHorizontal: 50,
    marginVertical: 90,
    backgroundColor: 'white'
  },

  buy_join_modal_cross: {
    display: 'flex',
    alignItems: 'flex-end',
    width: 275,
  },

  buy_join_modal_head_view: {
    marginBottom: 30
  },

  buy_join_modal_head: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#26252C',
  },

  buy_join_modal_sub_head: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    color: '#5A6E7A',
  },

  buy_join_modal_body: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },

  buy_join_modal_legend: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: '#5A6E7A',
  },

  buy_join_modal_input_view: {
    marginTop: 8,
    marginBottom: 15,
    position: 'relative',
  },

  buy_join_modal_input: {
    borderColor: '#3F4556',
    borderWidth: 0.5,
    borderRadius: 6,
    fontSize: 14,
    fontWeight: '400',
    color: '#7B8890',
    width: 260,
    paddingHorizontal: '4%',
  },

  buy_join_modal_input_height: {
    paddingVertical: '2%',
  },

  buy_join_modal_input_icon: {
    position: 'absolute',
    top: '21%',
    right: '5%'
  },

  buy_submit_font: {
    fontSize: 20,
  },

  pub_banner: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: '10%',
    height: 285,
    width: Dimensions.get('screen').width,
  },

  pub_banner_txt_view: {
    width: '45%',
    paddingVertical: '7%',
  },

  pub_banner_head: {
    fontWeight: '500',
    fontSize: 12,
    color: '#42554E',
  },

  pub_banner_body_view: {
    marginTop: '5%',
  },

  pub_banner_body: {
    fontWeight: '600',
    fontSize: 22,
    color: '#202C27',
  },

  pub_about: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingTop: '15%',
    // paddingBottom: '8%',
  },

  pub_about_logo: {
    // marginBottom: '8%'
  },

  pub_about_body: {
    fontWeight: '400',
    fontSize: 14,
    color: '#555562',
    textAlign: 'center',
  },

  pub_cat_cards: {
    height: 82,
    width: 82,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  pub_home_buy_bg: {
    backgroundColor: '#D9F1E8',
    paddingTop: 30,
    paddingBottom: 200,
    paddingHorizontal: 20,
  },

  pub_buy_head_1: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111F2B',
  },

  pub_buy_head_3: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#343545',
  },

  pub_buy_head_3_sec: {
    fontWeight: '600',
  },

  pub_home_new_view: {
    paddingVertical: '6%',
    paddingHorizontal: '5%',
  },

  pub_home_new_head: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#26252C',
  },

  pub_home_new_body: {
    marginVertical: '10%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  pub_home_rec_body: {
    marginVertical: '8%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pub_home_new_card: {
    height: 252,
    width: 156,
    borderColor: '#CDD2DF',
    borderWidth: 1,
    borderRadius: 14,
    display: 'flex',
    marginBottom: '5%',
    position: 'relative',
  },

  pub_home_rec_card: {
    height: 252,
    width: 156,
    borderColor: '#CDD2DF',
    borderWidth: 1,
    borderRadius: 14,
    display: 'flex',
    marginBottom: '3%',
    marginHorizontal: 5,
    position: 'relative',
  },

  pub_home_new_card_img: {
    borderRadius: 13,
    resizeMode: 'contain',
  },

  pub_home_new_card_txtbox: {
    marginHorizontal: '6%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: '5%',
  },

  pub_home_new_card_view_1: {
    borderBottomColor: '#B3B9C3',
    borderBottomWidth: 0.5,
    paddingBottom: '10%',
    marginBottom: '6%'
  },

  pub_home_card_title_view: {
    marginBottom: '3%'
  },

  pub_home_card_title: {
    fontWeight: '500',
    fontSize: 14,
    color: '#26252C',
  },

  pub_home_card_author: {
    fontWeight: '400',
    fontSize: 11,
    color: '#64646F',
  },

  pub_home_card_author_name: {
    fontWeight: '500'
  },

  pub_home_card_price_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pub_home_card_price: {
    fontWeight: '600',
    fontSize: 20,
    color: '#26252C',
  },

  pub_home_new_card_wishbtn: {
    position: 'absolute',
    top: '5%',
    right: '8%',

  },

  pub_home_best_bg: {
    backgroundColor: '#EEF1F9',
    paddingVertical: '10%',
    paddingHorizontal: '6%',
  },

  pub_home_best_head_view: {
    marginBottom: '8%',
  },

  pub_home_best_head: {
    fontWeight: '600',
    fontSize: 26,
    textAlign: 'center',
    color: '#26252C',
  },

  pub_home_best_card: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginVertical: '3%',
  },

  pub_home_best_cover: {
    borderRadius: 13,
    resizeMode: 'contain',
  },

  pub_home_best_card_col2: {
    display: 'flex',
    justifyContent: 'space-between',
    marginVertical: '5%',
    marginLeft: '3%',
    width: '50%',
  },

  pub_home_best_card_col2_top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#B3B9C3',
    borderBottomWidth: 0.5,
    paddingBottom: '5%',
  },

  pub_home_best_card_title: {
    fontWeight: '500',
    fontSize: 16,
    color: '#26252C',
  },

  pub_home_card_author_view: {
    marginTop: '5%'
  },

  pub_home_best_card_col2_bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pub_home_best_card_price: {
    fontWeight: '600',
    fontSize: 20,
    color: '#26252C',
  },

  // kaustav Confirm Order start
  ConfirmOrderView: {

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  ConfirmOrderViewMain: {
    backgroundColor: '#EFF2FC',
    padding: 25,
    height: Dimensions.get('screen').height
  },
  ConfirmOrderMainHeaderText: {
    fontSize: 26,
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'center',
    color: '#26252C'
  },
  ConfirmOrdeSubHeaderText: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: '#555562',
  },
  ConfirmOrderCard: {
    display: 'flex',
    width: '100%',
    borderRadius: 14,

    marginVertical: '15%',
    height: 100,
    alignItems: 'center',

  },
  ConfirmOrderButton: {
    borderRadius: 100,
    borderColor: '#26252C',
    padding: 10,
    borderWidth: 0.5,
    display: 'flex',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '7%',
    borderBottomColor: '#B3B9C3',
    borderBottomWidth: 0.5,
  },
  // Confirm Order end
  prod_det_view: {
    paddingHorizontal: '6%',
    paddingVertical: '10%',
    width: '100%',
  },

  prod_det_cov_img: {
    borderRadius: 20,
  },

  prod_det_head_view: {
    marginTop: '5%'
  },

  prod_det_head: {
    fontWeight: '500',
    fontSize: 28,
    color: '#26252C'
  },

  prod_det_author_view: {
    marginTop: '2%'
  },

  prod_det_card_author: {
    fontWeight: '400',
    fontSize: 16,
    color: '#64646F',
  },

  prod_det_card_author_name: {
    fontWeight: '500'
  },

  prod_det_price_view: {
    marginTop: '4%'
  },

  prod_det_price: {
    fontWeight: '600',
    fontSize: 18,
    color: '#26252C'
  },

  prod_det_price_value: {
    fontWeight: '600',
    fontSize: 32,
    color: '#26252C'
  },

  prod_det_btn_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10%',
  },

  prod_det_add_btn: {
    borderWidth: 0.5,
    borderRadius: 100,
    borderColor: '#26252C',
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },

  prod_det_add_btn_txt: {
    fontWeight: '600',
    fontSize: 18,
    color: '#26252C',
  },

  prod_det_buy_btn: {
    borderRadius: 100,
    backgroundColor: '#007FE3',
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '5%',
  },

  prod_det_add_buy_txt: {
    fontWeight: '600',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  prod_det_border: {
    borderWidth: 0.5,
    borderColor: '#B3B9C3',
  },

  prod_det_des_head_view: {
    marginTop: '8%',
  },

  prod_det_des_head: {
    fontWeight: '600',
    fontSize: 16,
    color: '#26252C',
  },

  prod_det_des_body_view: {
    marginTop: '5%',
  },

  prod_det_des_body: {
    fontWeight: '400',
    fontSize: 14,
    color: '#555562',
  },

  prod_det_details_head_view: {
    marginTop: '5%'
  },

  prod_det_details_head: {
    fontWeight: '500',
    fontSize: 16,
    color: '#26252C',
  },

  prod_det_details_body_view: {
    marginTop: '4%',
  },

  prod_det_details_body_title: {
    fontWeight: '400',
    fontSize: 16,
    color: '#575A63',
  },

  prod_det_details_body_value: {
    fontWeight: '700',
    fontSize: 16,
    color: '#575A63',
  },

  topbar: {
    backgroundColor: '#03142C',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },

  topbar_back_btn: {
    display: 'flex',
    justifyContent: 'center'
  },

  topbar_bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3E4158',
    paddingVertical: '5%'
  },

  topbar_btn_txt: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  topbar_btn_mb: {
    marginBottom: '5%',
  },
  homepaddinng: {
    paddingHorizontal: '6%',
  },

  profbg: {
    backgroundColor: '#EFF2FC',
    height: Dimensions.get('screen').height,
    width: '100%'
  },

  prof_head_view: {
    marginTop: '5%',
    marginBottom: '6%',
  },

  prof_head: {
    fontWeight: '600',
    fontSize: 20,
    color: '#26252C',
  },
  // Billing Address Kaustav

  BillingAddressViewMain: {
    backgroundColor: '#EFF2FC',
    padding: 25,
  },
  BillingAddressMainHeader: {
    fontWeight: '600',
    fontSize: 20,
    color: '#26252C',
  },
  BillingAddressCard: {
    width: '100%',
    backgroundColor: "#FFF",
    borderRadius: 20,
    display: 'flex',
    alignItems: 'flex-start',
    marginVertical: '5%',
    padding: 20,
    justifyContent: 'center',

  },
  BillingAddressApplyCouponBtnText: {
    color: '#007FE3',
    fontWeight: '700',
    fontSize: 16
  },
  BillingAddressFormLabel: {
    color: '#26252C',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'left'
  },
  BillingAddressViewTextInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    position: 'relative'
  },
  BillingAddressIcon: {
    padding: 10,
    position: 'absolute',
    right: 10,
  },
  BillingAddressFormTextInput: {
    border: 1,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#3F4556',
    width: '100%',
    color: '#26252C',
    backgroundColor: '#fff',
    paddingVertical: '2%',
    paddingHorizontal: '5%'

  },
  BillingAddressCardHeaderText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#26252C',
    paddingBottom: 20
  },
  BillingAddressDropDown: {
    backgroundColor: '#fff',
    width: '100%',
    borderColor: '#777983',
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  BillingAddressDropDownPicker: {
    color: '#141516',
    fontWeight: '500',
    fontSize: 12,
    paddingVertical: 10,
  },
  BillingAddressSaveBtn: {
    backgroundColor: '#007FE3',
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginVertical: 20
  },
  BillingAddressApplyCoupnBtn: {

    paddingHorizontal: 25,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: '#007FE3',
    borderRadius: 10,
    marginLeft: 10
  },
  BillingAddressSaveBtnArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  BillingAddressBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18
  },
  BillingAddressApplyCouponView: {
    borderBottomWidth: 0.5,
    borderColor: '#B3B9C3',
    width: '100%',
    marginBottom: 20
  },
  BillingAddressOrderTotalDetailsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%'
  },
  BillingAddressApplyCoupnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%'
  },
  BillingAddressApplyCouponTextInput: {
    border: 1,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#3F4556',
    width: '65%',
    color: '#26252C',
    backgroundColor: '#fff',
    padding: 10,

  },
  BillingAddressApplyCouponCard: {
    width: '100%',
    backgroundColor: "#FFF",
    borderRadius: 20,
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '5%',
    // marginBottom: '55%',
    padding: 20,
    justifyContent: 'center',
  },
  BillingAddressApplyCouponPriceText: {
    fontWeight: '600',
    // fontSize:20,
    color: '#26252C'
  },
  BillingAddressApplyCouponOrderTotalText: {
    fontWeight: '400',
    // fontSize:16,
    color: '#575A63'
  },




  prof_contact_view: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '8%',
  },

  prof_user_img_view: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: '#097EDA',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  prof_user_name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#26252C',
  },

  prof_user_contact_info: {
    fontWeight: '500',
    fontSize: 14,
    color: '#555562',
  },

  prof_user_contact_info_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '78%',
  },

  prof_user_contact_info_txt_view: {
    marginVertical: '3%'
  },

  prof_personal_view: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '8%',
    marginVertical: '5%',
    height: 180,
  },

  prof_user_personal_info_title: {
    fontWeight: '400',
    fontSize: 14,
    color: '#555562',
  },

  prof_personal_text_view: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%'
  },

  prof_upload_img_sec: {
    borderWidth: 0.5,
    borderColor: '#3F4556',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    position: 'relative',
  },

  prof_upload_img_margin: {
    marginBottom: '6%',
    height: 60, width: 60,
    resizeMode: 'contain',
    borderRadius:100,
  },

  prof_upload_img_txt: {
    fontWeight: '400',
    fontSize: 13,
    color: '#7B8890',
  },

  prof_upload_camera_btn: {
    position: 'absolute',
    bottom: '30%',
    right: '20%'
  },

  prof_picker_view: {
    borderColor: '#3F4556',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  pub_home_best_card_col2_top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#B3B9C3',
    borderBottomWidth: 0.5,
    paddingBottom: '5%',
  },

  //MyBookShelf Kaustav

  MyBookshelfMainView: {
    // marginVertical: '5%',
    marginTop:'3%',
    marginLeft: '3%',
    width: '50%',
  },
  MyBookshelfMainTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '10%',
  },
  // MyBookShelf Kaustav end

  // MyOrders kaustav start

  MyOrdersCard: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    padding: '3%',
    marginBottom: '7%'

  },
  MyOrdersProductDetailsMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#B3B9C3',
    borderBottomWidth: 0.5,
    marginBottom: '5%',
    paddingBottom: '5%',
  },
  MyOrdersProductDetailsView: {
    marginLeft: '5%',
    width: '50%',
  },
  MyOrdersProductDetailsHeadersView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: '3%',
  },
  MyOrderPriceView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  MyOrderMainPriceText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#26252C'
  },
  MyOrderDiscountedPriceText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#ACB1B4',
    marginLeft: '3%',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  MyOrdersFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%'
  },
  MyOrderFooterText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#575A63',
  },
  MyOrderFooterDownloadBtn: {
    borderWidth: 0.5,
    borderRadius: 100,
    borderColor: '#26252C',
    position: 'relative',
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: '35%'
  },
  MyOrderFooterDownloadBtnText: {
    color: '#26252C',
    fontWeight: '600',
    fontSize: 12
  },
  MyOrderFooterDownloadBtnImg: {
    position: 'absolute',
    right: 8,
    top: 8,
  },

  // MyOrders Kaustav end 

  mb200: {
    marginBottom: 200,
  },

  prof_change_password_view: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    paddingVertical: '5%',
  },

  prof_change_password_btn_txt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007FE3',
    textDecorationLine: 'underline',
    textDecorationColor: '#007FE3'
  },

  list_modal_view: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },

  list_modal_card_view: {
    width: 90, marginBottom: 10
  },

  list_modal_card: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 14,
    height: 80,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%'
  },

  list_modal_icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },

  list_modal_legend: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    color: 'grey',
  },

  cartCountNumber: {
      backgroundColor:'#ffffff',
      width:20,
      height:20,
      borderRadius:20,
      alignItems:'center',
      position:'absolute',
      top:-10,
      right:-10
  },

  cartCountNumberText :{
    fontWeight:'bold',
    color:'#26252C'
  }
});


