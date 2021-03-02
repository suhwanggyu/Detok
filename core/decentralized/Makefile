Network="ropsten"

help:
	@echo "Network is target network. Now, supporting only ropsten and local"
	@echo "deploy - deploy contract to network"

deploy :
	@echo "Start Deployment"
	@truffle migrate --compile-all --reset --network $(Network)
	@echo "Setting contract configuration"
	@rm -rf ../../client/client_api/contracts
	@cp -r ../../client/client_react/src/contracts ../../client/client_api/
	@echo "Finish"
