const  {ethers}  = require("ethers");
const SIGNING_DOMAIN_NAME = "Voucher-Domain";
        const SIGNING_DOMAIN_VERSION = "1";
        const chainId= 1;
        const contractAddress = "0xa131AD247055FD2e2aA8b156A11bdEc81b9eAD95";
        const signer = new ethers.Wallet("9eb20d9e6960462f8e059f8ceead5d1d709bf5932531bd60adffbdd46491a5b8");
        const domain = {
            name: SIGNING_DOMAIN_NAME,
            version : SIGNING_DOMAIN_VERSION,
            verifyingContract :contractAddress,
            chainId,
        }
        async function createVoucher(tokenId, price, uri ){
            const voucher= {tokenId, price, uri ,buyer};
            const types = {
                LazyNFTVoucher: [
                    {name :"tokenId", type : "uint256"},
                    {name :"price", type : "uint256"},
                    {name :"uri", type : "string"},
                    {name :"buyer", type : "address"},

                ]
            }
            const signature = await signer._signTypedData(domain, types, voucher);
            return {
                ...voucher,
                signature
            }
           
        }
        async function main() {
            const voucher = await createVoucher(1,0,"uri");
            console.log(`[${voucher.tokenId},  ${voucher.price}, "${voucher.uri}", "${voucher.buyer}", "${voucher.signature}"]`)
        }
        main();