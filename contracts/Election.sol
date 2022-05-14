//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10; 
pragma abicoder v2; 
 
contract Election { 
  
 address owner; 
 struct Candidate {
  uint8 id; 
  string name; 
  uint voteCount; 
 } 
 
 mapping(address => bool) public voters; 
  
 mapping(uint8 => Candidate) public candidates; 
 
 uint8 public candidatesCount; 
 
 event votedEvent(uint8 indexed _candidateId); 
 
 constructor() { 
  owner = msg.sender; 
  candidatesCount = 0; 
 }


 
 function addCandidate(string memory _name) public { 
   require(msg.sender == owner);
   uint8 candidateId = candidatesCount + 1; 
   Candidate memory newCandidate = Candidate({id : candidateId, name: _name, voteCount: 0}); 
   candidates[candidateId] = newCandidate; 
   candidatesCount = candidatesCount + 1; 
 } 
             
 function vote(uint8 _candidateId) public { 
   require(voters[msg.sender] == false); 
   Candidate memory voteCandidate = candidates[_candidateId];
   require(voteCandidate.id != 0);
   voteCandidate.voteCount = voteCandidate.voteCount + 1;
   candidates[_candidateId] = voteCandidate;
   voters[msg.sender] = true;
   emit votedEvent(_candidateId);  
 } 
 
}   

