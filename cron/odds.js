#!/bin/env node

const jsonfile = require("jsonfile");
const rp = require("request-promise");
const Q = require("q");

const urls = [
    "https://services.skybet.com/sportsapi/v2/event/18686295?api_user=test", // group A
    "https://services.skybet.com/sportsapi/v2/event/18686296?api_user=test", // group B
    "https://services.skybet.com/sportsapi/v2/event/18686297?api_user=test", // group C
    "https://services.skybet.com/sportsapi/v2/event/18686298?api_user=test", // group D
    "https://services.skybet.com/sportsapi/v2/event/18686299?api_user=test", // group E
    "https://services.skybet.com/sportsapi/v2/event/18686300?api_user=test", // group F
    "https://services.skybet.com/sportsapi/v2/event/18614725?api_user=test", // reach quarter final
    "https://services.skybet.com/sportsapi/v2/event/18614724?api_user=test", // reach semi final
    "https://services.skybet.com/sportsapi/v2/event/18614723?api_user=test", // reach final
    "https://services.skybet.com/sportsapi/v2/event/16251028?api_user=test" // winner
];

const output = {};

const urlArray = [];
urls.forEach((url) => {
    const options = {
        uri: url,
        qs: {
            api_user: "test"
        },
        headers: {
            "User-Agent": "Request-Promise"
        },
        json: true
    };
    urlArray.push(rp(options));
});

const sortOutGroup = (outcomes, idx, round) => {
    const alpha = ['A','B','C','D','E','F'];
    if (!outcomes) return;
    Object.keys(outcomes).forEach((outId) => {
        if(!outcomes[outId].desc) return;
        const teamName = outcomes[outId].desc.replace(/\s+/g, "").toLowerCase();
        if (!output[teamName]) {
            output[teamName] = {};
            output[teamName].group = alpha[idx];
            output[teamName].name = outcomes[outId].desc;
            output[teamName].teamName = output[teamName];
        }
        const team = output[teamName];
        team[round] = {};
        team[round].id = outId;
        team[round].lp_num = outcomes[outId].lp_num;
        team[round].lp_den = outcomes[outId].lp_den;
    });
};

const sortOutGroupMarkets = (markets, idx) => {
    Object.keys(markets).forEach((mktId) => {
        if(markets[mktId].name === "Winner") {
            return sortOutGroup(markets[mktId].outcomes, idx, "g1");
        }
        if(markets[mktId].name === "Runner Up") {
            return sortOutGroup(markets[mktId].outcomes, idx, "g2");
        }
        if(markets[mktId].name === "3rd Place Finish") {
            return sortOutGroup(markets[mktId].outcomes, idx, "g3");
        }
        if(markets[mktId].name === "Last Place Finish") {
            return sortOutGroup(markets[mktId].outcomes, idx, "g4");
        }
    });
};

const sortOutKnockoutMarkets = (knockout, idx, round) => {
    Object.keys(knockout).forEach((mkt) => {
        Object.keys(knockout[mkt]).forEach((outcomes) =>
            sortOutGroup(knockout[mkt][outcomes], idx, round)
        );
    });
};

const sortResults = (result) => {
    result.forEach((res, idx) => {
        if (res.state === "fulfilled") {
            if (idx < 6) {
                return sortOutGroupMarkets(res.value.markets, idx);
            }
            if (idx === 6) {
                return sortOutKnockoutMarkets(res.value.markets, idx, "qf");
            }
            if (idx === 7) {
                return sortOutKnockoutMarkets(res.value.markets, idx, "sf");
            }
            if (idx === 8) {
                return sortOutKnockoutMarkets(res.value.markets, idx, "f");
            }
            if (idx === 9) {
                Object.keys(res.value.markets).forEach((d) =>
                    sortOutGroup(res.value.markets[d].outcomes, idx, "w")
                );
            }
        }
    });

    Object.assign(output.repofireland,output.republicofireland);
    delete output.republicofireland;
    const  file = "../server/api/odds.json";
    jsonfile.writeFileSync(file, output);
};

Q.allSettled(urlArray).then(sortResults);
