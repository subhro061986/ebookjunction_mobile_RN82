import React, { Component, useState, useEffect } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Animated,
    PermissionsAndroid,
    Alert
} from 'react-native';

import FooterPub from '../Global/FooterPub.js';
import TopBar from '../Global/TopBar.js';
import Footer from '../Global/Footer.js';
import { UserProfile } from '../Context/Usercontext.js';
import { useAuth } from '../Context/Authcontext.js';
import Config from "../config/Config.json"
import reactNativeHTMLtoPdf from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
export const MyOrders = () => {

    const { authData } = useAuth()
    const { myorders, getInvoiceById, myOrderList,getInvoiceByIdMobile,
        DeleteInvoiceByIdMobile } = UserProfile()

    useEffect(() => {
        //RNFS.DownloadDirectoryPath
        //var path = RNFS.DocumentDirectoryPath + '/test.txt';
        // var path = RNFS.DownloadDirectoryPath + '/test.pdf';
        // console.log(path)
        // RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        // .then((success) => {
        //     console.log('FILE WRITTEN!');
        // })
        // .catch((err) => {
        //     console.log(err.message);
        // });
        //getMyOrders()
    }, [])

    const calculateTotalCGST = (invoices) => {
        let totalCGST = 0;
        invoices.map((invoice) => {
            totalCGST += invoice.cgst
        })
        return totalCGST
    }
    const calculateTotalSGST = (invoices) => {
        let totalSGST = 0;
        invoices.map((invoice) => {
            totalSGST += invoice.sgst
        })
        return totalSGST
    }
    const calculateTotalIGST = (invoices) => {
        let totalIGST = 0;
        invoices.map((invoice) => {
            totalIGST += invoice.igst
        })
        return totalIGST
    }

    // const downloadBook = async (id) => {

    //     const getInvdet = await getInvoiceById(id)
    //     let invoice = getInvdet.output;
    //     let inv_id = invoice.invoiceno;
    //     console.log("INVOICE DET", invoice.invoiceno);
    //     console.log("INVOICE DET type ", typeof inv_id);
    //     let options = {
    //         html: `
    //         <html>
    //             <body >
    //                 <table width="100%" style="border:none;font-family:verdana;font-size:9px;">
    //                     <tr>
    //                         <td colspan="2" style="text-align:center;" width="33%">
    //                             <div style="border:0;border-bottom:1px solid #333;">
        
    //                                 <h6 style="margin:8px 5px;">TAX INVOICE</h6>
    //                             </div>
    //                         </td>
    //                         <td colspan="2" style="text-align:center;" width="33%">
    //                             <div style="padding: 3px 5px 5px 5px;text-align:left;border:0;border-bottom:1px solid #333;">
    //                                 Order #: <strong> ${invoice.orderno}</strong>
    //                                 <br/>
    //                                 Order Date: <strong>${invoice.ordedate?.split(" ")[0]} </strong>
    //                             </div>
    //                         </td>
    //                         <td colspan="2" style="text-align:center;" width="33%">
    //                             <div style="padding: 3px 5px 5px 5px;text-align:left;border:0;border-bottom:1px solid #333;">
    //                             Invoice #: <strong>${invoice.invoiceno}</strong>
    //                             <br/>
    //                             Invoice Date: <strong>${invoice.invoicedate?.split(" ")[0]}</strong>
    //                             </div>
    //                         </td>
    //                     </tr>
                        
    //                     <tr>
    //                         <td colspan="3" width="50%">
    //                             <div style="text-align:left;padding:5px;border:0;">
    //                                 <h4 style="margin:5px 0;border-bottom:1px solid #333;">Sold By</h4>
    //                                 <address>
    //                                     E-Books Junction <br/>
    //                                     ${invoice.companyname}<br/>
    //                                     ${invoice.companyaddressline} <br/>
    //                                     ${invoice.companycity} , ${invoice.companypincode}<br/>
    //                                     ${invoice.companystate} , ${invoice.companycountry}<br/>
    //                                     GSTIN: <strong> ${invoice.companygstin}</strong>
    //                                 </address>
    //                             </div>
                                
    //                         </td>
    //                         <td colspan="3" width="50%" style="vertical-align:top;">
    //                             <div style="text-align:right;padding:5px 20px 5px 5px;border:0;">
    //                                 <h4 style="margin:5px 0;border-bottom:1px solid #333;">Billing Address</h4>
    //                                 <address>
    //                                     ${invoice.username}<br/>
    //                                     ${invoice.useraddressline}<br/>
    //                                     ${invoice.usercity} , ${invoice.userpincode} <br/>
    //                                     ${invoice.userstate} , ${invoice.usercountry} <br/>
    //                                     ${invoice.usergstin !== "" ? `GSTIN: <strong>${invoice.usergstin}</strong>` : ''}
                                       
    //                                 </address>
    //                             </div>
    //                         </td>
    //                     </tr>
    //                     <tr>
    //                         <td colspan="6">
    //                             <hr style="border:0;border-bottom:1px solid #333;"/>
    //                         </td>
    //                     </tr>
    //                     <tr>
    //                         <td colspan="6">
    //                             <table width="100%" style="border-collapse: collapse;font-family:verdana;font-size:9px;">
    //                                 <thead>
    //                                 <tr style="border-bottom:1px solid #333;">
    //                                     <th style="text-align:left;">Particular</th>
    //                                     <th style="text-align:left;">Publisher</th>
    //                                     <th style="text-align:left;">Qty</th>
    //                                     <th style="text-align:left;">Base Amount</th>
    //                                     <th style="text-align:left;">Discount</th>
    //                                     ${invoice.userstateid == invoice.companystateid ?
    //                 `<th style="text-align:left;">CGST</th>
    //                                          <th style="text-align:left;">SGST</th>` :
    //                 `<th style="text-align:left;">IGST</th>`
    //             }
    //                                     <th style="text-align:left;">Total</th>
    //                                 </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                 ${invoice.invoiceitems.map((invoiceItem, index) => (
    //                 `<tr key=${index} style="border-bottom:1px solid #333;">
    //                                             <td style="text-align:left;">
    //                                             ${invoiceItem.booktitle}<br/>
    //                                                 <small>${invoiceItem.isbn13}</small>
    //                                             </td>
    //                                             <td style="text-align:left;">${invoiceItem.publishername}</td>
    //                                             <td style="text-align:left;">${invoiceItem.quantity}</td>
    //                                             <td style="text-align:left;"> ${invoiceItem.amount}</td>
    //                                             <td style="text-align:left;"> ${invoiceItem.discount}</td>
    //                                             ${invoice.userstateid == invoice.companystateid ?
    //                     `<td style="text-align:left;">${invoiceItem.cgst}</td>
    //                                                 <td style="text-align:left;">${invoiceItem.sgst}</td>` :
    //                     `<td style="text-align:left;">${invoiceItem.igst}</td>`
    //                 }
    //                                             <td style="text-align:left;">${invoiceItem.linetotal}</td>
    //                                         </tr>`
    //             ))}
    //                                 </tbody>
    //                                 <tfoot style="border-top:1px solid #333;">
    //                                     <tr style="border-bottom:1px solid #333;">
                                       
    //                                         ${invoice.userstateid == invoice.companystateid ?
    //                 `
    //                                           <td colspan="5" style="text-align:left;font-weight:bold;">Total</td>
    //                                           <td style="text-align:left;">${calculateTotalCGST(invoice.invoiceitems)}</td>
    //                                            <td style="text-align:left;">${calculateTotalSGST(invoice.invoiceitems)}</td>` :
    //                 `<td colspan="5" style="text-align:left;font-weight:bold;">Total</td>
    //                                           <td style="text-align:left;">${calculateTotalIGST(invoice.invoiceitems)}</td>`
    //             }
    //                                         <td style="text-align:left; font-weight:bold;"> ${invoice.total}</td>
    //                                     </tr>
    //                                 </tfoot>
    //                             </table>
    //                         </td>
    //                     </tr>
    //                 </table>
    //             </body>
    //         </html>`,

    //         fileName: 'invoice',
    //         directory: '',
    //         base64: true

    //     };
    //     // let options={
    //     //     html: '<h1>Heading 1</h1>',
    //     //     fileName: 'invoice',
    //     //     directory: '',
    //     //     base64: true
    //     // }
    //     let file = await reactNativeHTMLtoPdf.convert(options)
    //     console.log("DOWNLOAD", file)
    //     // let orgPath1 = RNFS.DownloadDirectoryPath + '/invoice.pdf';
    //     let orgPath = RNFetchBlob.fs.dirs.DownloadDir+'/invoice.pdf';

    //     // RNFS.moveFile(file.filePath, orgPath1)
    //     //     .then((success) => {
    //     //     console.log('file moved!',success);
    //     //     })
    //     //     .catch((err) => {
    //     //     console.log("Error: " + err.message);
    //     //     });
    //     // try {
    //     //     await RNFS.copyFile(file.filePath, orgPath);
    //     //     console.log("dobro", dest)
    //     //   } catch(err) {
    //     //     console.log("greska", err)
    //     //   } 
    //     // try {
    //     //     await RNFetchBlob.fs.writeFile(orgPath, file.base64, 'base64');
    //     //     console.log("file downloaded")
    //     // } catch (err) {
    //     //     console.log("greska", err)
    //     // }
    //     var timer = setTimeout(()=> {
    //     RNFetchBlob.fs.writeFile(orgPath, file.base64, 'base64')
    //         .then((success) => {
    //             console.log('file moved!', success);
    //             alert("File downloaded successfully");
    //         })
    //         .catch((err) => {
    //             console.log("BASE", file.base64)
    //             console.log("Error: " + err);
    //         });
    //     },3000)


    // }
    const downloadContent=async (id)=>{
        console.log("START")

        const getInvdet = await getInvoiceByIdMobile(id)

        console.log("invoice return= ",getInvdet)
        //var urlDwn='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

        let urlDwn=Config.API_URL+Config.UPLOAD_URL_INVOICES+getInvdet.filePath
        // let urlDwn  = 'https://springandriver.com/img/island.pdf'  
        // let urlDwn  = 'https://ebooksjunction.com/api/uploads/invoices/45.pdf'  
        console.log("urlDwn:",urlDwn)
        var timer = setTimeout(async()=> {
            await RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache : true,
            appendExt: 'pdf',
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              title: 'invoice',
              path: RNFetchBlob.fs.dirs.DownloadDir +'/invoice.pdf', // Android platform
              description: 'Downloading the file',
            },
          })
          
          .fetch('GET', urlDwn, {
            //some headers ..
          })
          .then((res) => {
            // the temp file path
            console.log('The file saved to ', res);
          })
        },1000)
      }

    
    return (
        <SafeAreaView>
            <ScrollView style={xStyle.cartPageBodyBg} stickyHeaderIndices={[0]}>
                <TopBar />
                <View style={xStyle.cartPageHeaderView}>
                    <Text style={xStyle.cartPageHeader}>
                        Orders
                    </Text>
                </View>
                <View style={[xStyle.cartPageBooksMainDiv, {
                    marginBottom: '50%'
                }]}>
                    {myOrderList.map((order, index) => (
                        <View style={xStyle.MyOrdersCard} key={index}>

                            <View style={xStyle.MyOrdersProductDetailsMainView}>

                                <Image
                                    source={{ uri: Config.API_URL + Config.PUB_IMAGES + order.publisherid + "/" + order.image + '?d=' + new Date() }}
                                    style={xStyle.pub_home_best_cover}
                                    height={134}
                                    width={138}
                                />
                                <View style={xStyle.MyOrdersProductDetailsView}>

                                    <View style={xStyle.MyOrdersProductDetailsHeadersView}>

                                        <Text style={xStyle.pub_home_best_card_title}>{order.title}</Text>

                                        <TouchableOpacity >
                                            <Image
                                                source={require('../assets/images/greenTick.png')}
                                            />
                                        </TouchableOpacity>

                                    </View>

                                    <View style={xStyle.pub_home_card_author_view}>
                                        <Text style={xStyle.pub_home_card_author}>Author:
                                            <Text style={xStyle.pub_home_card_author_name}>{order.authors}</Text>
                                        </Text>
                                    </View>

                                    <View style={[xStyle.pub_home_card_author_view, { marginBottom: '5%' }]}>
                                        <Text style={xStyle.pub_home_card_author}>Publisher:
                                            <Text style={xStyle.pub_home_card_author_name}>{order.publisher}</Text>
                                        </Text>
                                    </View>

                                    <View style={xStyle.MyOrderPriceView}>

                                        <Text style={xStyle.MyOrderMainPriceText}>
                                            ₹ {order.price}
                                        </Text>
                                        {/* <Text style={xStyle.MyOrderDiscountedPriceText}>
                                        ₹199
                                    </Text> */}

                                    </View>

                                </View>
                            </View>

                            <View style={xStyle.MyOrdersFooter}>
                                <View>
                                    {/* <Text style={[xStyle.MyOrderFooterText,{paddingBottom:'5%'}]}>
                                    Payment Status: 
                                    <Text  style={[xStyle.MyOrderFooterText,{fontWeight:'500'}]}>{order.price}</Text>
                                </Text> */}
                                    <Text style={xStyle.MyOrderFooterText}>
                                        Order No: <Text style={[xStyle.MyOrderFooterText, { fontWeight: '500' }]}>{order.orderno}</Text>
                                    </Text>

                                </View>

                                <TouchableOpacity style={xStyle.MyOrderFooterDownloadBtn}
                                    onPress={() => { downloadContent(order.invoiceid) }}

                                >

                                    <Text style={xStyle.MyOrderFooterDownloadBtnText}>Download</Text>

                                    <Image
                                        source={require('../assets/images/import.png')}
                                        style={xStyle.MyOrderFooterDownloadBtnImg}
                                        height={16}
                                        width={16}
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))}





                </View>

            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}
export default MyOrders;