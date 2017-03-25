var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator.js');


describe('valid.isArrayOfTxObjects', function() {

    var tests = [
        // test 0: false
        {
            bundle: [],
            expected: false
        },
        // test 1: false
        {
            bundle: "ASDFDSAFDSAja9fd",
            expected: false
        },
        // test 2: false
        {
            bundle: [
                {
                    "hash":"IPQYUNLDGKCLJVEJGVVISSQYVDJJWOXCW9RZXIDFKMBXDVZDXFBZNZJKBSTIMBKAXHFTGETEIPTZGNTJK",
                    "signatureMessageFragment":"ASDF",
                    "address":"A9RGRKVGWMWMKOLVMDFWJUHNUNYWZTJADGGPZGXNLERLXYWJE9WQHWWBMCPZMVVMJUMWWBLZLNMLDCGDJ",
                    "tag":"999999999999999999999999999",
                    "timestamp":1482522289,
                    "currentIndex":0,
                    "lastIndex":0,
                    "bundle":"TXEFLKNPJRBYZPORHZU9CEMFIFVVQBUSTDGSJCZMBTZCDTTJVUFPTCCVHHORPMGCURKTH9VGJIXUQJVHK",
                    "trunkTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
                    "branchTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
                    "nonce":"999999999999999999999999999999999999999999999999999999999999999999999999999999999"
                }
            ],
            expected: false
        },
        // test 3: true
        {
            bundle: [
                {
                    "hash":"IPQYUNLDGKCLJVEJGVVISSQYVDJJWOXCW9RZXIDFKMBXDVZDXFBZNZJKBSTIMBKAXHFTGETEIPTZGNTJK",
                    "signatureMessageFragment":"",
                    "address":"A9RGRKVGWMWMKOLVMDFWJUHNUNYWZTJADGGPZGXNLERLXYWJE9WQHWWBMCPZMVVMJUMWWBLZLNMLDCGDJ",
                    "value":0,
                    "tag":"999999999999999999999999999",
                    "timestamp":1482522289,
                    "currentIndex":0,
                    "lastIndex":0,
                    "bundle":"TXEFLKNPJRBYZPORHZU9CEMFIFVVQBUSTDGSJCZMBTZCDTTJVUFPTCCVHHORPMGCURKTH9VGJIXUQJVHK",
                    "trunkTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
                    "branchTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
                    "nonce":"999999999999999999999999999999999999999999999999999999999999999999999999999999999"
                }
            ],
            expected: true
        },
        // test 4: true
        {
            bundle: [
                {
                    "hash":"IPQYUNLDGKCLJVEJGVVISSQYVDJJWOXCW9RZXIDFKMBXDVZDXFBZNZJKBSTIMBKAXHFTGETEIPTZGNTJK",
                    "signatureMessageFragment":"",
                    "address":"A9RGRKVGWMWMKOLVMDFWJUHNUNYWZTJADGGPZGXNLERLXYWJE9WQHWWBMCPZMVVMJUMWWBLZLNMLDCGDJ",
                    "value":0,
                    "tag":"999999999999999999999999999",
                    "timestamp":1482522289,
                    "currentIndex":0,
                    "lastIndex":0,
                    "bundle":"TXEFLKNPJRBYZPORHZU9CEMFIFVVQBUSTDGSJCZMBTZCDTTJVUFPTCCVHHORPMGCURKTH9VGJIXUQJVHK",
                    "trunkTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
                    "branchTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
                    "nonce":"999999999999999999999999999999999999999999999999999999999999999999999999999999999"
                },
                {
                    "hash":"IPQYUNLDGKCLJVEJGVVISSQYVDJJWOXCW9RZXIDFKMBXDVZDXFBZNZJKBSTIMBKAXHFTGETEIPTZGNTJK",
                    "signatureMessageFragment":"",
                    "address":"A9RGRKVGWMWMKOLVMDFWJUHNUNYWZTJADGGPZGXNLERLXYWJE9WQHWWBMCPZMVVMJUMWWBLZLNMLDCGDJ",
                    "value":0,
                    "tag":"999999999999999999999999999",
                    "timestamp":1482522289,
                    "currentIndex":0,
                    "lastIndex":0,
                    "bundle":"TXEFLKNPJRBYZPORHZU9CEMFIFVVQBUSTDGSJCZMBTZCDTTJVUFPTCCVHHORPMGCURKTH9VGJIXUQJVHK",
                    "trunkTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
                    "branchTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
                    "nonce":"999999999999999999999999999999999999999999999999999999999999999999999999999999999"
                }
            ],
            expected: true
        }
    ]

    tests.forEach(function(test) {

        it('should should be array of tx objects: ' + test.expected, function() {

            var isValid = valid.isArrayOfTxObjects(test.bundle);

            assert.equal(isValid, test.expected);
        });

    })
});
