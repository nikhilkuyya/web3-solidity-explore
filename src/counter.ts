import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";

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
 const providerWithSigner = new ethers.providers.Web3Provider(getEth()).getSigner();
 const contract = new ethers.Contract(contractAddress,
 Counter.abi, 
 providerWithSigner);

 return contract;
}

async function run(){
 const contract = await getContract();
 const el = document.createElement("div");

 async function setCount(count?){
  const countObj = count || (await contract.getCounter());
  console.log('counter',countObj);
  el.innerText = countObj.toNumber();
 }
 await setCount();

 const button = document.createElement("button");
 button.innerText = '++';
 button.onclick = async function(){
  await contract.increment();
 }

 const buttonMinus = document.createElement("button");
 buttonMinus.innerText = '--';
 buttonMinus.onclick = async function(){
  await contract.decrement();
 }
 
 contract.on(contract.filters.CounterUpdate(),function(count){
  setCount(count);
 });

 document.body.appendChild(buttonMinus);
 document.body.appendChild(el);
 document.body.appendChild(button);
}

run().then(function(){
 console.log("we are done");
}).catch(function(err){
 console.error("something is wrong",err);
});

