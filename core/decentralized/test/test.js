var DefendContract = artifacts.require("./DefendContract.sol");



//address("0x52eb3D364348571C257494367EE4CcC8514449F5").call(abi.encodeWithSignature("buyTokens(address)"),"0xe074B1921633af015B3FD9925D99D9Bc09afa7a0",{value : "1500000000000000000"});

contract('DefendContract', function(accounts){
    var realEstateInstance;

    it("컨트렉의 소유자 초기화 테스팅", function(){
        return DefendContract.deployed().then(function(instance){ 
            DefendContract = instance;
            
            return address(DefendContract.DFDtoken).call();
        }).then(function(ins){
            ins.transfer(accounts[2],200);
            assert.equal(200, ins.balanceOf(accounts[2]), "전송이 안됬습니다.");
        }); 
    });

});