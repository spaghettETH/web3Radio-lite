// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title Web3RadioNFT
 * @dev Contratto NFT semplice per il token gating della piattaforma Web3Radio
 */
contract Web3RadioNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    
    uint256 public cost = 0.05 ether;
    uint256 public maxSupply = 10000;
    uint256 public maxMintAmount = 5;
    bool public paused = false;
    string public baseURI;
    
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
    }
    
    // Funzioni interne
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
    
    // Funzioni pubbliche
    function mint(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(!paused, "La funzione di minting è attualmente in pausa");
        require(_mintAmount > 0, "È necessario mintare almeno 1 NFT");
        require(_mintAmount <= maxMintAmount, "Superato il numero massimo di NFT per transazione");
        require(supply + _mintAmount <= maxSupply, "Superata la quantità massima di NFT nella collezione");
        
        if (msg.sender != owner()) {
            require(msg.value >= cost * _mintAmount, "Fondi insufficienti");
        }
        
        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }
    
    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
            : "";
    }
    
    // Funzioni riservate all'owner
    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }
    
    function setMaxMintAmount(uint256 _newMaxMintAmount) public onlyOwner {
        maxMintAmount = _newMaxMintAmount;
    }
    
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
    
    function pause(bool _state) public onlyOwner {
        paused = _state;
    }
    
    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Il trasferimento è fallito");
    }
} 