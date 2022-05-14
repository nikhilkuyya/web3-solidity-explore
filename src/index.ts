import { ethers } from "ethers";

function getEth(){
 // @ts-ignore
 const eth = window.ethereum;
 if(!eth){
  throw new Error("get metamask and a positive atttitude");
 }
 return eth;
}

async function hasSigners(): Promise<boolean> {
 const eth = getEth();
 const signers = await (eth.request({ method: 'eth_accounts'}) as Promise<string[]>);
  return signers && signers.length > 0;
} 

async function requestAccess(): Promise<boolean> {
 const eth = getEth();
 const result = await (eth.request({ method : 'eth_requestAccounts' }) as Promise<string[]>);
 return result && result.length > 0;
}

async function getContract(){
 const contractAddress = process.env.CONTRACT_ADDRESS;
 if(!(await hasSigners()) && !(await requestAccess())){
  console.log("Lets us play, plese give your money");
 }
 const provider = new ethers.providers.Web3Provider(getEth());
 const contract = new ethers.Contract(contractAddress,
 [
  "function hello() public pure returns(string memory)"
 ],
 provider);

 return contract;
}

async function run(){
 const contract = await getContract();
 const helloResponse = await contract.hello();
 document.body.innerHTML = helloResponse;
 console.log(helloResponse);
}

run().then(function(){
 console.log("we are done");
}).catch(function(){
 console.error("something is wrong");
});

