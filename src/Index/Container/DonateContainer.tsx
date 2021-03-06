import React from 'react';
import $ from 'jquery';
import Clipboard from 'react-clipboard.js';
import { HistoryInterface } from '../../Utils/Interfaces';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import '../Style/DonateContainer.scss';
import AliPayQR from '../images/AliPayQR.jpeg';
import WeChanSQ from '../images/WeChanSQ.jpeg';
import BTCQR from '../images/BTCQR.png';

class DonateContainer extends React.Component<HistoryInterface> {
  getText() {
    return 'bc1qfkyqc6awydsqv7jtn0429mcdd296ftfejuxgxp';
  }
  
  componentDidMount() {
    var MainBox	=	$('#MainBox');
    var QRBox	=	$('#QRBox');
    var showQR = (QR: any) => {
      var MainBox	=	$('#MainBox');
      var QRBox	=	$('#QRBox');
      if (QR) {
        MainBox.css('background-image',`url(${QR})`);
      }
      $('#DonateText,#donateBox,#github').addClass('blur');
      QRBox.fadeIn(300,function() {
        MainBox.addClass('showQR');
      });
    }

    $('#donateBox>li').click(function() {
      var thisID	=	$(this).attr('id');
      if (thisID === 'BTC') {
        showQR(BTCQR);
      } else if (thisID === 'AliPay') {
        showQR(AliPayQR);
      } else if (thisID === 'WeChat') {
        showQR(WeChanSQ);
      }
    });
    MainBox.click(function(event) {
      MainBox.removeClass('showQR').addClass('hideQR');
      setTimeout (function(a) {
        QRBox.fadeOut(300,function() {
          MainBox.removeClass('hideQR');
        });
        $('#DonateText,#donateBox,#github').removeClass('blur');
      },600);
  
    });
  }
  render() {
    return (
      <div className="donate-container" >
        <Header history={this.props.history} />
        <div className="donate-main" >
          <h1>This is a personal project</h1>
          <h1>If you think this website can help you</h1>
          <h1>Just donate for a cup of coffee</h1>
          <div className="donate-plugin-container" >
            <div id="DonateText" className="tr3">Sponsor</div>
            <ul id="donateBox" className="list pos-f tr3">
              <li id="PayPal"><a href="https://www.paypal.me/lzkmylz" target="_blank" rel="noopener noreferrer" >PayPal</a></li>
              <li id="BTC" data-footnote="Copy addres and show QRCod"><Clipboard option-text={this.getText} >Bitcoin</Clipboard></li>
              <li id="AliPay">AliPay</li>
              <li id="WeChat">WeChat</li>
            </ul>
            <div id="QRBox" className="pos-f left-100">
              <div id="MainBox"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DonateContainer;
