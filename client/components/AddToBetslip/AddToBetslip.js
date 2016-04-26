
import React, { createClass } from 'react';
import style from './addToBetslip.css';

const AddToBetslip = createClass({

    onClick() {
        let str = "",
        strUrl = '//m.skybet.com/go/class/5/bet?redirectPath=%2Fgo%2Fclass%2F5%2Fbet&sels=';
        this.props.betsInSlip.forEach((bet)=>{
            const obj = bet.toJS();
            str += obj.id + '|' + obj.den + '/' + obj.num + ',';
        })
        window.open(strUrl + encodeURIComponent(str),'_blank').focus();
    },

    render() {
        let button;
        if (this.props.betsInSlip.size > 0) {
            button = <div className={style.root}>
                <button className={style.btn} onClick={this.onClick}>Add to Betslip <span className={style.number}>{this.props.betsInSlip.size}</span></button>
            </div>
        }
        return (
            <div>
                {button}
            </div>
        );
    }
});

export default AddToBetslip;

//http://skybet.com/go/event/19179240/bet?a=112133&dcmp=gpaccordian&sels=250369558|4/7
