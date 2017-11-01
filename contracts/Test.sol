pragma solidity ^0.4.15;
contract Test {
  uint256 num;
  // constructor
  function Test(){
    num = 0;
  }
  // uint128 add Test
  function add(uint128 a, uint128 b) public returns(uint128){
    return a + b;
  }
  // increment Test
  function increment() public returns(uint256) {
    num += 1;
    return num;
  }
}
